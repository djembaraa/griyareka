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
  bio?: string | null;
  avatar_url?: string | null;
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

const createAdminSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password minimal 6 karakter"),
  display_name: z.string().min(2, "Nama minimal 2 karakter"),
  role: z.enum(['root', 'admin', 'sales', 'cs']).default('admin'),
});

const updateUserSchema = z.object({
  display_name: z.string().min(2, "Nama minimal 2 karakter"),
  role: z.enum(['root', 'admin', 'sales', 'cs']),
});

const updateOwnProfileSchema = z.object({
  display_name: z.string().min(2, "Nama minimal 2 karakter"),
  bio: z.string().nullable().optional(),
  avatar_url: z.string().url().nullable().optional(),
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

export async function getOwnProfile(currentUserId: string): Promise<UserProfile | null> {
  if (!currentUserId) return null;
  
  const { data, error } = await supabaseAdmin
    .from('profiles')
    .select('*')
    .eq('id', currentUserId)
    .single();
    
  if (error) {
    console.error("Error fetching own profile:", error);
    return null;
  }
  
  return data as UserProfile;
}

export async function updateOwnProfile(currentUserId: string, formData: FormData) {
  try {
    if (!currentUserId) {
      return { success: false, message: 'Harus login untuk memperbarui profil.' };
    }

    const rawData = {
      display_name: formData.get('display_name') as string,
      bio: formData.get('bio') as string || null,
      avatar_url: formData.get('avatar_url') as string || null,
    };

    const validation = updateOwnProfileSchema.safeParse(rawData);
    if (!validation.success) {
      return { success: false, message: validation.error.issues[0].message };
    }

    const { error } = await supabaseAdmin
      .from('profiles')
      .update(validation.data)
      .eq('id', currentUserId);

    if (error) {
      console.error("Update own profile error:", error);
      return { success: false, message: 'Gagal memperbarui profil.' };
    }

    revalidatePath('/admin/profile');
    return { success: true, message: 'Profil berhasil diperbarui.' };

  } catch (err) {
    console.error(err);
    return { success: false, message: 'Terjadi kesalahan sistem.' };
  }
}

export async function createAdmin(currentUserId: string, formData: FormData) {
  try {
    const role = await getCurrentUserRole(currentUserId);
    if (role !== 'root') {
      return { success: false, message: 'Akses ditolak. Hanya ROOT yang dapat membuat user baru.' };
    }

    const rawData = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      display_name: formData.get('display_name') as string,
      role: formData.get('role') as string,
    };

    const validation = createAdminSchema.safeParse(rawData);
    if (!validation.success) {
      return { success: false, message: validation.error.issues[0].message };
    }

    const { email, password, display_name, role: newRole } = validation.data;

    // 1. Create user in Supabase Auth (Auto confirmed)
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { role: newRole }
    });

    if (authError || !authData.user) {
      console.error("Auth create user error:", authError);
      return { success: false, message: authError?.message || 'Gagal membuat akun.' };
    }

    // 2. Insert into profiles with actual display_name
    const { error: profileError } = await supabaseAdmin
      .from('profiles')
      .insert({
        id: authData.user.id,
        email,
        display_name,
        role: newRole
      });

    if (profileError) {
      console.error("Profile creation error:", profileError);
      // Rollback
      await supabaseAdmin.auth.admin.deleteUser(authData.user.id);
      return { success: false, message: 'Gagal membuat profil user.' };
    }

    revalidatePath('/admin/users');
    return { success: true, message: 'User berhasil dibuat! Silakan bagikan email dan password kepada yang bersangkutan.' };

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
    }

    revalidatePath('/admin/users');
    return { success: true, message: 'User berhasil dihapus.' };
  } catch (err) {
    console.error(err);
    return { success: false, message: 'Terjadi kesalahan sistem.' };
  }
}
