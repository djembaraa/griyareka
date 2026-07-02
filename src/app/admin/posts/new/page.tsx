'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export default function NewPostPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Mock save
    setTimeout(() => {
      setLoading(false);
      router.push('/admin/posts');
    }, 1000);
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
            <Input id="title" required placeholder="Cth: 5 Tren Desain Rumah Minimalis 2024" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="imageUrl">URL Gambar Thumbnail</Label>
            <Input id="imageUrl" placeholder="https://..." />
            <p className="text-xs text-slate-500">Gunakan rasio 16:9 untuk hasil terbaik.</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Konten (HTML)</Label>
            <Textarea 
              id="content" 
              required 
              placeholder="<p>Mulai menulis di sini...</p>"
              className="min-h-[300px] font-mono text-sm"
            />
            <p className="text-xs text-slate-500">Anda dapat menggunakan tag HTML standar seperti &lt;p&gt;, &lt;h2&gt;, &lt;ul&gt;, dll.</p>
          </div>

          <div className="pt-4 flex justify-end">
            <Button type="submit" disabled={loading} className="bg-blue-900 hover:bg-blue-800 text-white">
              <Save className="mr-2 h-4 w-4" /> {loading ? 'Menyimpan...' : 'Simpan & Publikasikan'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
