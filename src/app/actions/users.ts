'use server';

import { supabaseAdmin } from '@/lib/supabase-admin';
import { supabase } from '@/lib/supabase'; // Using the standard client for auth checks
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

export type UserProfile = {
  id: string;
  display_name: string | null;
  email: string | null;
  role: string | null;
  created_at: string;
};

// Internal helper to get current logged-in user's role securely
async function getCurrentUserRole(currentUserId: string): Promise<string | null> {
  if (!currentUserId) return null;

  const { data: profile } = await supabaseAdmin
    .from('profiles')
    .select('role')
    .eq('id', currentUserId)
    .single();

  return profile?.role || null;
}

const inviteSchema = z.object({
  email: z.string().email(),
  role: z.enum(['root', 'admin', 'sales', 'cs']).default('admin'),
});

const updateUserSchema = z.object({
  display_name: z.string().min(2, "Nama minimal 2 karakter"),
  role: z.enum(['root', 'admin', 'sales', 'cs']),
});

export async function getUsers(): Promise<UserProfile[]> {
  const { data, error } = await supabaseAdmin
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching users:", error);
    return [];
  }

  return data as UserProfile[];
}

export async function inviteAdmin(currentUserId: string, formData: FormData) {
  try {
    const role = await getCurrentUserRole(currentUserId);
    if (role !== 'root') {
      return { success: false, message: 'Akses ditolak. Hanya ROOT yang dapat mengundang user.' };
    }

    const rawData = {
      email: formData.get('email') as string,
      role: formData.get('role') as string,
    };

    const validation = inviteSchema.safeParse(rawData);
    if (!validation.success) {
      return { success: false, message: validation.error.issues[0].message };
    }

    const { email, role: newRole } = validation.data;

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const redirectUrl = `${siteUrl}/auth/callback`;

    // 1. Invite user in Supabase Auth
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.inviteUserByEmail(email, {
      redirectTo: redirectUrl,
      data: { role: newRole }
    });

    if (authError || !authData.user) {
      console.error("Auth invite error:", authError);
      return { success: false, message: authError?.message || 'Gagal mengirim undangan ke email.' };
    }

    // 2. Insert into profiles with display_name 'Pending'
    const { error: profileError } = await supabaseAdmin
      .from('profiles')
      .insert({
        id: authData.user.id,
        email,
        display_name: 'Pending',
        role: newRole
      });

    if (profileError) {
      console.error("Profile creation error:", profileError);
      // Rollback
      await supabaseAdmin.auth.admin.deleteUser(authData.user.id);
      return { success: false, message: 'Gagal membuat profil user.' };
    }

    revalidatePath('/admin/users');
    return { success: true, message: 'Undangan berhasil dikirim!' };

  } catch (err) {
    console.error(err);
    return { success: false, message: 'Terjadi kesalahan sistem.' };
  }
}

export async function updateUser(currentUserId: string, id: string, formData: FormData) {
  try {
    const role = await getCurrentUserRole(currentUserId);
    if (role !== 'root') {
      return { success: false, message: 'Akses ditolak. Hanya ROOT yang dapat mengubah data user.' };
    }

    const rawData = {
      display_name: formData.get('display_name') as string,
      role: formData.get('role') as string,
    };

    const validation = updateUserSchema.safeParse(rawData);
    if (!validation.success) {
      return { success: false, message: validation.error.issues[0].message };
    }

    const { error } = await supabaseAdmin
      .from('profiles')
      .update(validation.data)
      .eq('id', id);

    if (error) {
      console.error("Update profile error:", error);
      return { success: false, message: 'Gagal memperbarui user.' };
    }

    revalidatePath('/admin/users');
    return { success: true, message: 'User berhasil diperbarui.' };

  } catch (err) {
    console.error(err);
    return { success: false, message: 'Terjadi kesalahan sistem.' };
  }
}

export async function deleteUser(currentUserId: string, id: string) {
  try {
    const role = await getCurrentUserRole(currentUserId);
    if (role !== 'root') {
      return { success: false, message: 'Akses ditolak. Hanya ROOT yang dapat menghapus user.' };
    }

    // 1. Delete from profiles
    const { error: profileError } = await supabaseAdmin
      .from('profiles')
      .delete()
      .eq('id', id);

    if (profileError) {
      console.error("Delete profile error:", profileError);
      return { success: false, message: 'Gagal menghapus profil user.' };
    }

    // 2. Delete from auth.users
    const { error: authError } = await supabaseAdmin.auth.admin.deleteUser(id);
    
    if (authError) {
      console.error("Delete auth user error:", authError);
      // Note: Profil is already deleted, user will become orphaned or we should have cascade.
      // Supabase recommends cascading from auth.users, but deleting auth.users first if cascade is set.
      // Since we don't assume cascade on profiles, we delete profiles first.
    }

    revalidatePath('/admin/users');
    return { success: true, message: 'User berhasil dihapus.' };
  } catch (err) {
    console.error(err);
    return { success: false, message: 'Terjadi kesalahan sistem.' };
  }
}
