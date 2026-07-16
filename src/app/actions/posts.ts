'use server';

import { supabaseAdmin } from '@/lib/supabase-admin';
import { revalidatePath } from 'next/cache';
import { logActivityServer } from '@/lib/activity';

const DEFAULT_IMAGE =
  'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80';

function asString(value: FormDataEntryValue | null): string {
  return typeof value === 'string' ? value : '';
}

export async function createPost(currentUserId: string, formData: FormData) {
  try {
    if (!currentUserId) {
      return { success: false, message: 'Harus login untuk membuat artikel.' };
    }

    // Verify user is admin or root
    const { data: profile, error: profileError } = await supabaseAdmin
      .from('profiles')
      .select('role')
      .eq('id', currentUserId)
      .single();

    if (profileError) {
      console.error('Profile lookup error:', profileError);
      return {
        success: false,
        message: `Gagal cek profil: ${profileError.message}`,
      };
    }

    if (!profile || (profile.role !== 'admin' && profile.role !== 'root')) {
      return {
        success: false,
        message: `Akses ditolak. Role Anda: ${profile?.role ?? 'tidak ditemukan'}. Butuh admin/root.`,
      };
    }

    const title = asString(formData.get('title')).trim();
    const content = asString(formData.get('content')).trim();
    const imageFromForm = asString(formData.get('image_url')).trim();

    if (!title) {
      return { success: false, message: 'Judul tidak boleh kosong.' };
    }
    if (!content || content === '<p><br></p>' || content === '<p></p>') {
      return { success: false, message: 'Konten tidak boleh kosong.' };
    }

    // image_url optional — empty is fine; only validate if non-empty
    if (imageFromForm && !/^https?:\/\//i.test(imageFromForm)) {
      return {
        success: false,
        message: 'URL gambar tidak valid (harus diawali http:// atau https://).',
      };
    }

    const finalImageUrl = imageFromForm || DEFAULT_IMAGE;

    // Generate slug
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') || `post-${Date.now()}`;

    // Insert with columns used by the app. If optional columns (slug/status)
    // are missing in older DB schemas, retry with a minimal payload.
    const fullRow = {
      title,
      content,
      image_url: finalImageUrl,
      slug,
      author_id: currentUserId,
      status: 'draft' as const,
    };

    let { error, data: newPost } = await supabaseAdmin
      .from('posts')
      .insert(fullRow)
      .select()
      .single();

    // Fallback for DBs that don't have slug/status yet
    if (error && (error.message?.includes('slug') || error.message?.includes('status') || error.code === 'PGRST204')) {
      console.warn('Retrying insert without slug/status:', error.message);
      const retry = await supabaseAdmin
        .from('posts')
        .insert({
          title,
          content,
          image_url: finalImageUrl,
          author_id: currentUserId,
        })
        .select()
        .single();
      error = retry.error;
      newPost = retry.data;
    }

    if (error) {
      console.error('Insert post error:', error);
      if (error.code === '23505') {
        return {
          success: false,
          message: 'Judul ini sudah digunakan (slug duplikat). Gunakan judul lain.',
        };
      }
      // Surface real DB error so lab debugging is possible
      return {
        success: false,
        message: `Gagal menyimpan ke database: ${error.message} (code: ${error.code ?? 'n/a'})`,
      };
    }

    if (!newPost) {
      return { success: false, message: 'Gagal menyimpan: tidak ada data yang dikembalikan.' };
    }

    await logActivityServer(
      currentUserId,
      'created',
      'post',
      newPost.id,
      newPost.title,
      newPost.slug
    );

    revalidatePath('/admin/posts');
    revalidatePath('/blog');
    return {
      success: true,
      message: `Artikel berhasil disimpan! ID: ${newPost.id}`,
    };
  } catch (err) {
    console.error(err);
    const msg = err instanceof Error ? err.message : String(err);
    return { success: false, message: `Terjadi kesalahan sistem: ${msg}` };
  }
}
