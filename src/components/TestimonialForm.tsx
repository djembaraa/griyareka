'use client';

import { useState } from 'react';
import { submitTestimonial } from '@/app/actions/testimonials';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
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
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl text-slate-900 mt-10 lg:mt-0">
      <h3 className="text-xl md:text-2xl font-bold mb-6">Bagikan Pengalaman Anda</h3>
      <form action={handleAction} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">Nama / Asal Kota <span className="text-red-500">*</span></label>
          <Input id="name" name="name" placeholder="Cth: Budi Santoso, Jakarta" required minLength={2} maxLength={50} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">Email Address <span className="text-red-500">*</span></label>
            <Input id="email" name="email" type="email" placeholder="budi@example.com" required />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone Number (Opsional)</label>
            <Input id="phone" name="phone" type="tel" placeholder="+62 812-3456-7890" maxLength={20} />
          </div>
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium mb-1">Ulasan Anda <span className="text-red-500">*</span></label>
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
        
        <div className="flex items-start space-x-3 pt-2">
          <Checkbox id="is_subscribed" name="is_subscribed" className="mt-0.5" />
          <div className="grid gap-1.5 leading-snug">
            <label
              htmlFor="is_subscribed"
              className="text-sm font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-600"
            >
              Saya setuju untuk menerima pembaruan, buletin, dan penawaran dari GriyaReka via email.
            </label>
          </div>
        </div>
        
        {status && (
          <div className={`p-3 rounded-md text-sm ${status.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
            {status.message}
          </div>
        )}

        <Button type="submit" disabled={isPending} className="w-full bg-orange-600 hover:bg-orange-700 text-white cursor-pointer">
          {isPending ? 'Mengirim...' : 'Kirim Ulasan'}
        </Button>
      </form>
    </div>
  );
}
