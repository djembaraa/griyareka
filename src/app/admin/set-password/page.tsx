'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function SetPasswordPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setUserId(user.id);
      } else {
        // If not logged in, they shouldn't be here
        router.push('/admin/login');
      }
    });
  }, [router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    const formData = new FormData(e.currentTarget);
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirm_password') as string;
    const displayName = formData.get('display_name') as string;

    if (password !== confirmPassword) {
      setError('Password dan Konfirmasi Password tidak cocok.');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password minimal 6 karakter.');
      setLoading(false);
      return;
    }

    if (displayName.length < 2) {
      setError('Display Name minimal 2 karakter.');
      setLoading(false);
      return;
    }

    try {
      // 1. Update password in Auth
      const { error: authError } = await supabase.auth.updateUser({
        password: password
      });

      if (authError) throw authError;

      // 2. Update display name in profiles table
      if (userId) {
        const { error: profileError } = await supabase
          .from('profiles')
          .update({ display_name: displayName })
          .eq('id', userId);
        
        if (profileError) {
          console.error('Failed to update profile name:', profileError);
          // Non-fatal, they can still login
        }
      }

      // Success, redirect to dashboard
      alert('Password berhasil disimpan! Selamat datang di Dashboard.');
      router.push('/admin/dashboard');

    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Gagal menyimpan password.');
    } finally {
      setLoading(false);
    }
  };

  if (!userId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border">
        <div className="p-8 pb-6 border-b bg-blue-900 text-white text-center">
          <h1 className="text-2xl font-bold mb-2">Selamat Datang!</h1>
          <p className="text-blue-100 text-sm">Silakan buat password dan masukkan nama Anda untuk mengaktifkan akun.</p>
        </div>
        <div className="p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="display_name">Nama Lengkap</Label>
              <Input 
                id="display_name" 
                name="display_name" 
                required 
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password Baru</Label>
              <Input 
                id="password" 
                name="password" 
                type="password" 
                required 
                placeholder="••••••••"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm_password">Konfirmasi Password Baru</Label>
              <Input 
                id="confirm_password" 
                name="confirm_password" 
                type="password" 
                required 
                placeholder="••••••••"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full h-12 bg-orange-600 hover:bg-orange-700 text-white text-base font-semibold"
              disabled={loading}
            >
              {loading ? 'Menyimpan...' : 'Simpan & Masuk'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
