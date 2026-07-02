'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { createProperty } from '@/lib/db';

export default function NewPropertyPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    imageUrl: '',
    bedrooms: '',
    bathrooms: '',
    description: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const slug = formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      await createProperty({
        title: formData.title,
        slug,
        description: formData.description,
        price: Number(formData.price),
        bedrooms: Number(formData.bedrooms),
        bathrooms: Number(formData.bathrooms),
        image_url: formData.imageUrl || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80',
      });
      router.push('/admin/properties');
    } catch (error) {
      console.error('Failed to create property:', error);
      alert('Gagal menyimpan properti.');
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <Link href="/admin/properties" className="inline-flex items-center text-sm text-slate-500 hover:text-blue-900 mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Daftar Properti
        </Link>
        <h1 className="text-3xl font-bold text-slate-900">Tambah Properti Baru</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="title">Nama Properti</Label>
              <Input id="title" required placeholder="Cth: Tipe 45/90 Minimalis" value={formData.title} onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Harga (Rp)</Label>
              <Input id="price" type="number" required placeholder="850000000" value={formData.price} onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="imageUrl">URL Gambar</Label>
              <Input id="imageUrl" placeholder="https://..." value={formData.imageUrl} onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bedrooms">Kamar Tidur</Label>
              <Input id="bedrooms" type="number" required placeholder="2" value={formData.bedrooms} onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bathrooms">Kamar Mandi</Label>
              <Input id="bathrooms" type="number" required placeholder="1" value={formData.bathrooms} onChange={handleChange} />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">Deskripsi</Label>
              <Textarea 
                id="description" 
                required 
                placeholder="Deskripsikan fitur dan keunggulan rumah ini..."
                className="min-h-[150px]"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <Button type="submit" disabled={loading} className="bg-blue-900 hover:bg-blue-800 text-white">
              <Save className="mr-2 h-4 w-4" /> {loading ? 'Menyimpan...' : 'Simpan Properti'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
