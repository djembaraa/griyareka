'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function AuthCallback() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Supabase JS client automatically handles the token in the URL hash 
    // and triggers an auth state change event when a session is established.
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' || event === 'INITIAL_SESSION') {
        if (session) {
          // Check if this is a new invite user or a regular login
          // We redirect them to the set-password page if they come from an invite link
          // If we can't tell, we redirect to set-password anyway (if they already have a password, they can skip or change it, but typically we redirect to set-password for safety)
          router.push('/admin/set-password');
        }
      }
    });

    // Check if there is an error in the hash
    if (typeof window !== 'undefined' && window.location.hash.includes('error=')) {
      setError('Tautan tidak valid atau telah kadaluarsa.');
    }

    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4">
        <div className="bg-red-50 text-red-600 p-6 rounded-lg max-w-md text-center border border-red-200 shadow-sm">
          <h2 className="text-xl font-bold mb-2">Terjadi Kesalahan</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
      <div className="animate-pulse flex flex-col items-center">
        <div className="h-8 w-8 rounded-full border-4 border-blue-900 border-t-transparent animate-spin mb-4"></div>
        <p className="text-slate-600 font-medium">Memverifikasi undangan...</p>
      </div>
    </div>
  );
}
