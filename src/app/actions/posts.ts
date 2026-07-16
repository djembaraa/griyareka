'use server';

import { supabaseAdmin } from '@/lib/supabase-admin';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { logActivityServer } from '@/lib/activity';

const createPostSchema = z.object({
  title: z.string().min(1, 'Judul tidak boleh kosong'),
  content: z.string().min(1, 'Konten tidak boleh kosong'),
  // Optional thumbnail: empty string is allowed; null/undefined treated as ""
  image_url: z.union([z.string().url(), z.literal('')]).optional().default(''),
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

    const rawImage = formData.get('image_url');
    const rawData = {
      title: (formData.get('title') as string) ?? '',
      content: (formData.get('content') as string) ?? '',
      // FormData.get returns null when field is omitted → was causing Zod "Invalid input"
      image_url: typeof rawImage === 'string' ? rawImage : '',
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

    const { error, data: newPost } = await supabaseAdmin
      .from('posts')
      .insert({
        title,
        content,
        image_url: finalImageUrl,
        slug,
        author_id: currentUserId,
        status: 'draft'
      })
      .select()
      .single();

    if (error) {
      console.error('Insert post error:', error);
      // Handle unique slug error
      if (error.code === '23505') {
        return { success: false, message: 'Judul ini sudah digunakan (slug duplikat). Gunakan judul lain.' };
      }
      return { success: false, message: 'Gagal menyimpan artikel ke database.' };
    }

    await logActivityServer(currentUserId, 'created', 'post', newPost.id, newPost.title, newPost.slug);

    revalidatePath('/admin/posts');
    return { success: true, message: 'Artikel berhasil disimpan sebagai draft!' };
  } catch (err) {
    console.error(err);
    return { success: false, message: 'Terjadi kesalahan sistem.' };
  }
}
