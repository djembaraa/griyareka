'use server';

import { supabaseAdmin } from '@/lib/supabase-admin';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const createPostSchema = z.object({
  title: z.string().min(1, 'Judul tidak boleh kosong'),
  content: z.string().min(1, 'Konten tidak boleh kosong'),
  image_url: z.string().url().optional().or(z.literal('')),
});

export async function createPost(currentUserId: string, formData: FormData) {
  try {
    if (!currentUserId) {
      return { success: false, message: 'Harus login untuk membuat artikel.' };
    }

    // Verify user is admin or root
    const { data: profile } = await supabaseAdmin
      .from('profiles')
      .select('role')
      .eq('id', currentUserId)
      .single();

    if (!profile || (profile.role !== 'admin' && profile.role !== 'root')) {
      return { success: false, message: 'Akses ditolak. Anda tidak memiliki izin untuk membuat artikel.' };
    }

    const rawData = {
      title: formData.get('title') as string,
      content: formData.get('content') as string,
      image_url: formData.get('image_url') as string,
    };

    const validation = createPostSchema.safeParse(rawData);
    if (!validation.success) {
      return { success: false, message: validation.error.issues[0].message };
    }

    const { title, content, image_url } = validation.data;
    
    // Generate slug
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphens
      .replace(/(^-|-$)/g, ''); // Remove leading/trailing hyphens

    // Use default image if not provided
    const finalImageUrl = image_url || 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80';

    const { error } = await supabaseAdmin
      .from('posts')
      .insert({
        title,
        content,
        image_url: finalImageUrl,
        slug,
        author_id: currentUserId,
        status: 'draft'
      });

    if (error) {
      console.error('Insert post error:', error);
      // Handle unique slug error
      if (error.code === '23505') {
        return { success: false, message: 'Judul ini sudah digunakan (slug duplikat). Gunakan judul lain.' };
      }
      return { success: false, message: 'Gagal menyimpan artikel ke database.' };
    }

    revalidatePath('/admin/posts');
    return { success: true, message: 'Artikel berhasil disimpan sebagai draft!' };
  } catch (err) {
    console.error(err);
    return { success: false, message: 'Terjadi kesalahan sistem.' };
  }
}
