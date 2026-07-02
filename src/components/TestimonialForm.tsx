'use client';

import { useState } from 'react';
import { submitTestimonial } from '@/app/actions/testimonials';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Star } from 'lucide-react';

export function TestimonialForm() {
  const [status, setStatus] = useState<{ success?: boolean; message?: string } | null>(null);
  const [isPending, setIsPending] = useState(false);

  async function handleAction(formData: FormData) {
    setIsPending(true);
    setStatus(null);
    const result = await submitTestimonial(formData);
    setStatus(result);
    setIsPending(false);
  }

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl text-slate-900 mt-10 lg:mt-0">
      <h3 className="text-2xl font-bold mb-6">Bagikan Pengalaman Anda</h3>
      <form action={handleAction} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">Nama / Asal Kota</label>
          <Input id="name" name="name" placeholder="Cth: Budi Santoso, Jakarta" required minLength={2} maxLength={50} />
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium mb-1">Ulasan Anda</label>
          <Textarea 
            id="content" 
            name="content" 
            placeholder="Ceritakan pengalaman Anda bersama GriyaReka..." 
            rows={4} 
            required 
            minLength={10} 
            maxLength={500} 
          />
        </div>
        
        {status && (
          <div className={`p-3 rounded-md text-sm ${status.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
            {status.message}
          </div>
        )}

        <Button type="submit" disabled={isPending} className="w-full bg-orange-600 hover:bg-orange-700 text-white">
          {isPending ? 'Mengirim...' : 'Kirim Ulasan'}
        </Button>
      </form>
    </div>
  );
}
