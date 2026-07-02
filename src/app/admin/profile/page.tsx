'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { CheckCircle2, Upload, Loader2, User } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { getOwnProfile, updateOwnProfile, UserProfile } from '@/app/actions/users';

export default function AdminProfilePage() {
  const [userId, setUserId] = useState<string>('');
  const [profile, setProfile] = useState<UserProfile | null>(null);
  
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function loadData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
        const data = await getOwnProfile(user.id);
        if (data) {
          setProfile(data);
          setDisplayName(data.display_name || '');
          setBio(data.bio || '');
          setAvatarUrl(data.avatar_url || '');
        }
      }
      setLoading(false);
    }
    loadData();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !userId) return;

    try {
      setUploading(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}-${Math.random()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      // Get Public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      setAvatarUrl(publicUrl);
      
    } catch (error: any) {
      console.error("Upload error:", error);
      alert('Gagal mengunggah gambar: ' + (error.message || 'Error tidak diketahui'));
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;
    
    setSaving(true);
    const formData = new FormData();
    formData.append('display_name', displayName);
    formData.append('bio', bio);
    formData.append('avatar_url', avatarUrl);
    
    const res = await updateOwnProfile(userId, formData);
    if (res.success) {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } else {
      alert(res.message);
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-slate-500" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Admin Profile</h1>
        <p className="text-slate-500 mt-2">Kelola informasi profil publik Anda.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-8">
        <form onSubmit={handleSave} className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <div className="relative group shrink-0">
              <div className="h-28 w-28 rounded-full overflow-hidden border-2 border-slate-200 bg-slate-50 flex items-center justify-center">
                {avatarUrl ? (
                  <img src={avatarUrl} alt="Avatar" className="h-full w-full object-cover" />
                ) : (
                  <User className="h-12 w-12 text-slate-400" />
                )}
              </div>
              <label 
                htmlFor="avatar-upload" 
                className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white opacity-0 group-hover:opacity-100 rounded-full cursor-pointer transition-opacity"
              >
                {uploading ? (
                  <Loader2 className="h-6 w-6 animate-spin" />
                ) : (
                  <>
                    <Upload className="h-5 w-5 mb-1" />
                    <span className="text-xs font-medium">Ubah</span>
                  </>
                )}
              </label>
              <input 
                id="avatar-upload" 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={handleFileUpload}
                disabled={uploading}
              />
            </div>
            
            <div className="flex-1 w-full space-y-4">
              <div className="space-y-2">
                <Label htmlFor="displayName">Nama Tampilan</Label>
                <Input 
                  id="displayName" 
                  required
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Mis. Admin Budi" 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  value={profile?.email || ''} 
                  disabled 
                  className="bg-slate-50"
                />
                <p className="text-xs text-slate-500">Email tidak dapat diubah.</p>
              </div>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea 
              id="bio" 
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Ceritakan sedikit tentang Anda dan peran Anda di GriyaReka..."
              className="min-h-[100px]"
            />
          </div>

          <div className="pt-4 flex items-center gap-4 border-t">
            <Button type="submit" disabled={saving} className="bg-blue-900 hover:bg-blue-800 text-white">
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Menyimpan...
                </>
              ) : (
                'Simpan Perubahan'
              )}
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
