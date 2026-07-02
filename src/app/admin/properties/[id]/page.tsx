'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export default function EditPropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState<string>('');

  useEffect(() => {
    params.then(p => setId(p.id));
  }, [params]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Mock save
    setTimeout(() => {
      setLoading(false);
      router.push('/admin/properties');
    }, 1000);
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <Link href="/admin/properties" className="inline-flex items-center text-sm text-slate-500 hover:text-blue-900 mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Daftar Properti
        </Link>
        <h1 className="text-3xl font-bold text-slate-900">Edit Properti</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="title">Nama Properti</Label>
              <Input id="title" required defaultValue="Tipe 45/90 Minimalis Modern" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Harga (Rp)</Label>
              <Input id="price" type="number" required defaultValue="850000000" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="imageUrl">URL Gambar</Label>
              <Input id="imageUrl" defaultValue="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bedrooms">Kamar Tidur</Label>
              <Input id="bedrooms" type="number" required defaultValue="2" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bathrooms">Kamar Mandi</Label>
              <Input id="bathrooms" type="number" required defaultValue="1" />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">Deskripsi</Label>
              <Textarea 
                id="description" 
                required 
                defaultValue="Rumah compact dengan desain fasad modern minimalis. Sangat cocok untuk keluarga muda dengan ruang terbuka yang efisien."
                className="min-h-[150px]"
              />
            </div>
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
