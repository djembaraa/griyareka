'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { createPost } from '@/app/actions/posts';
import { supabase } from '@/lib/supabase';

export default function NewPostPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string>('');

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) setUserId(user.id);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userId) {
      alert("Memuat data sesi... Harap tunggu sebentar.");
      return;
    }
    
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    
    // Validasi Sederhana
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    
    if (!title.trim() || !content.trim()) {
      alert("Judul dan Konten tidak boleh kosong!");
      setLoading(false);
      return;
    }

    const res = await createPost(userId, formData);
    
    if (res.success) {
      alert(res.message);
      router.push('/admin/posts');
    } else {
      alert(res.message);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <Link href="/admin/posts" className="inline-flex items-center text-sm text-slate-500 hover:text-blue-900 mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Daftar Artikel
        </Link>
        <h1 className="text-3xl font-bold text-slate-900">Tulis Artikel Baru</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Judul Artikel</Label>
            <Input name="title" id="title" required placeholder="Cth: 5 Tren Desain Rumah Minimalis 2024" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image_url">URL Gambar Thumbnail</Label>
            <Input name="image_url" id="image_url" placeholder="https://..." />
            <p className="text-xs text-slate-500">Gunakan rasio 16:9 untuk hasil terbaik. (Kosongkan untuk gambar bawaan)</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Konten (HTML)</Label>
            <Textarea 
              name="content"
              id="content" 
              required 
              placeholder="<p>Mulai menulis di sini...</p>"
              className="min-h-[300px] font-mono text-sm"
            />
            <p className="text-xs text-slate-500">Anda dapat menggunakan tag HTML standar seperti &lt;p&gt;, &lt;h2&gt;, &lt;ul&gt;, dll.</p>
          </div>

          <div className="pt-4 flex justify-end">
            <Button type="submit" disabled={loading} className="bg-blue-900 hover:bg-blue-800 text-white">
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
    </div>
  );
}
