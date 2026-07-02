'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Loader2, Upload, Calendar, User } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createPost } from '@/app/actions/posts';
import { supabase } from '@/lib/supabase';
import DOMPurify from 'isomorphic-dompurify';
import dynamic from 'next/dynamic';
import Image from 'next/image';

// Import react-quill styles globally
import 'react-quill-new/dist/quill.snow.css';

// Dynamically import ReactQuill to prevent SSR issues
const ReactQuill = dynamic(() => import('react-quill-new'), { 
  ssr: false,
  loading: () => <div className="h-64 flex items-center justify-center border rounded-md bg-slate-50"><Loader2 className="animate-spin text-slate-400" /></div>
});

const modules = {
  toolbar: [
    [{ 'header': [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    ['link'],
    ['clean']
  ],
};

export default function NewPostPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string>('');
  
  // Form States
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewImageUrl, setPreviewImageUrl] = useState<string>('');

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) setUserId(user.id);
    });
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreviewImageUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userId) {
      alert("Memuat data sesi... Harap tunggu sebentar.");
      return;
    }
    
    if (!title.trim() || !content.trim() || content === '<p><br></p>') {
      alert("Judul dan Konten tidak boleh kosong!");
      return;
    }

    setLoading(true);
    let finalImageUrl = '';

    try {
      // 1. Upload Image if provided
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${userId}-${Date.now()}.${fileExt}`;
        const filePath = `thumbnails/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('posts')
          .upload(filePath, imageFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('posts')
          .getPublicUrl(filePath);

        finalImageUrl = publicUrl;
      }

      // 2. Submit Data
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      if (finalImageUrl) formData.append('image_url', finalImageUrl);

      const res = await createPost(userId, formData);
      
      if (res.success) {
        alert(res.message);
        router.push('/admin/posts');
      } else {
        alert(res.message);
        setLoading(false);
      }
    } catch (error: any) {
      console.error("Error creating post:", error);
      alert("Terjadi kesalahan saat mengunggah artikel: " + error.message);
      setLoading(false);
    }
  };

  const cleanContent = DOMPurify.sanitize(content);

  return (
    <div className="max-w-7xl mx-auto pb-12">
      <div className="mb-6">
        <Link href="/admin/posts" className="inline-flex items-center text-sm text-slate-500 hover:text-blue-900 mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Daftar Artikel
        </Link>
        <h1 className="text-3xl font-bold text-slate-900">Tulis Artikel Baru</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Kolom Kiri: Form Editor */}
        <div className="bg-white rounded-xl shadow-sm border p-6 lg:p-8 sticky top-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Judul Artikel</Label>
              <Input 
                id="title" 
                required 
                placeholder="Cth: 5 Tren Desain Rumah Minimalis 2024" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="imageFile">Gambar Thumbnail</Label>
              <div className="flex items-center gap-4">
                <Input 
                  id="imageFile" 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageChange}
                  className="cursor-pointer file:cursor-pointer"
                />
              </div>
              <p className="text-xs text-slate-500">Pilih gambar dari komputer Anda. (Opsional, kosongkan untuk gambar bawaan)</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Konten</Label>
              <div className="bg-white [&_.ql-editor]:min-h-[300px] [&_.ql-editor]:text-base">
                <ReactQuill 
                  theme="snow" 
                  value={content} 
                  onChange={setContent}
                  modules={modules}
                  placeholder="Mulai menulis cerita Anda di sini..."
                />
              </div>
            </div>

            <div className="pt-4 border-t flex justify-end">
              <Button type="submit" disabled={loading} className="bg-blue-900 hover:bg-blue-800 text-white w-full sm:w-auto">
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Menyimpan...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" /> Simpan sebagai Draft
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>

        {/* Kolom Kanan: Live Preview */}
        <div className="hidden lg:block bg-slate-50 rounded-xl shadow-inner border p-8 h-full min-h-[600px]">
          <div className="mb-6 border-b pb-4">
            <h2 className="text-lg font-semibold text-slate-700 flex items-center">
              Live Preview
              <span className="ml-3 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium animate-pulse">Real-time</span>
            </h2>
            <p className="text-xs text-slate-500 mt-1">Beginilah tampilan artikel Anda di website nantinya.</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm overflow-hidden p-6 pointer-events-none">
            {/* Preview Judul & Meta */}
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold text-slate-900 mb-4 leading-tight">
                {title || 'Judul Artikel Anda Akan Muncul di Sini'}
              </h1>
              <div className="flex items-center justify-center gap-6 text-slate-500 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Penulis
                </div>
              </div>
            </div>

            {/* Preview Gambar */}
            <div className="relative w-full h-[300px] rounded-xl overflow-hidden mb-8 bg-slate-100 border flex items-center justify-center">
              {previewImageUrl ? (
                <Image src={previewImageUrl} alt="Preview" fill className="object-cover" />
              ) : (
                <span className="text-slate-400">Belum ada gambar</span>
              )}
            </div>

            {/* Preview Konten */}
            <div className="prose prose-blue max-w-none prose-headings:text-slate-900 prose-p:text-slate-700 prose-a:text-orange-600">
              {content && content !== '<p><br></p>' ? (
                <div dangerouslySetInnerHTML={{ __html: cleanContent }} />
              ) : (
                <div className="text-slate-400 italic text-center py-10">Mulai mengetik untuk melihat preview konten...</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
