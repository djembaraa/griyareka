'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { getPostById, updatePost } from '@/lib/db';

export default function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [id, setId] = useState<string>('');

  const [formData, setFormData] = useState({
    title: '',
    imageUrl: '',
    content: ''
  });

  useEffect(() => {
    params.then(p => {
      setId(p.id);
      getPostById(p.id).then(post => {
        if (post) {
          setFormData({
            title: post.title,
            imageUrl: post.image_url,
            content: post.content
          });
        }
        setFetching(false);
      });
    });
  }, [params]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await updatePost(id, {
        title: formData.title,
        image_url: formData.imageUrl || 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80',
        content: formData.content,
      });
      router.push('/admin/posts');
    } catch (error) {
      console.error('Failed to update post:', error);
      alert('Gagal menyimpan perubahan.');
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  if (fetching) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <Link href="/admin/posts" className="inline-flex items-center text-sm text-slate-500 hover:text-blue-900 mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Daftar Artikel
        </Link>
        <h1 className="text-3xl font-bold text-slate-900">Edit Artikel</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Judul Artikel</Label>
            <Input id="title" required value={formData.title} onChange={handleChange} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="imageUrl">URL Gambar Thumbnail</Label>
            <Input id="imageUrl" value={formData.imageUrl} onChange={handleChange} />
            <p className="text-xs text-slate-500">Gunakan rasio 16:9 untuk hasil terbaik.</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Konten (HTML)</Label>
            <Textarea 
              id="content" 
              required 
              className="min-h-[300px] font-mono text-sm"
              value={formData.content}
              onChange={handleChange}
            />
            <p className="text-xs text-slate-500">Anda dapat menggunakan tag HTML standar seperti &lt;p&gt;, &lt;h2&gt;, &lt;ul&gt;, dll.</p>
          </div>

          <div className="pt-4 flex justify-end">
            <Button type="submit" disabled={loading} className="bg-blue-900 hover:bg-blue-800 text-white">
              <Save className="mr-2 h-4 w-4" /> {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
