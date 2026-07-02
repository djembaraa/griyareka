'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { CheckCircle2 } from 'lucide-react';

export default function AdminProfilePage() {
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Admin Profile</h1>
        <p className="text-slate-500 mt-2">Kelola informasi profil publik Anda.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-8">
        <form onSubmit={handleSave} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="displayName">Display Name</Label>
            <Input id="displayName" defaultValue="Admin GriyaReka" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea 
              id="bio" 
              defaultValue="Administrator resmi website GriyaReka. Bertanggung jawab atas publikasi konten dan manajemen layanan."
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="avatarUrl">Avatar URL</Label>
            <Input id="avatarUrl" defaultValue="https://ui-avatars.com/api/?name=Admin&background=0D8ABC&color=fff" />
          </div>

          <div className="pt-4 flex items-center gap-4">
            <Button type="submit" className="bg-blue-900 hover:bg-blue-800 text-white">
              Simpan Perubahan
            </Button>
            {saved && (
              <span className="flex items-center text-green-600 text-sm font-medium">
                <CheckCircle2 className="h-4 w-4 mr-1" />
                Tersimpan
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
