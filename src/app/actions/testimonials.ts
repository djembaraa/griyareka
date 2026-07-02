'use server';

import { z } from 'zod';
import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

const testimonialSchema = z.object({
  name: z.string().min(2, "Nama terlalu pendek").max(50, "Nama maksimal 50 karakter"),
  email: z.string().min(1, "Email wajib diisi").email("Format email tidak valid"),
  phone: z.string().max(20, "Nomor telepon terlalu panjang").optional().or(z.literal('')),
  content: z.string().min(10, "Ulasan terlalu pendek").max(500, "Ulasan maksimal 500 karakter"),
  is_subscribed: z.boolean().default(false),
});

export async function submitTestimonial(formData: FormData) {
  try {
    const rawData = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      content: formData.get('content'),
      is_subscribed: formData.get('is_subscribed') === 'on',
    };
    
    // Validate inputs safely
    const validationResult = testimonialSchema.safeParse(rawData);

    if (!validationResult.success) {
      return { success: false, message: validationResult.error.issues[0].message };
    }

    const validatedData = validationResult.data;

    // Rate Limiting Placeholder
    // TODO: Implement proper IP-based rate limiting here (e.g., using Redis or Upstash)
    // to prevent spam attacks from the same IP.
    
    // Email Automation Placeholder
    // TODO: Integrate Resend API here to send an automated "Thank you for subscribing" welcome email if is_subscribed === true.
    /*
    if (validatedData.is_subscribed && validatedData.email) {
      // Call Resend API
    }
    */
    
    // Insert into Supabase
    // Note: is_published defaults to false in the DB schema
    const { error } = await supabase
      .from('testimonials')
      .insert([validatedData]);
      
    if (error) {
      console.error("Supabase Error:", error);
      return { success: false, message: 'Gagal mengirim ulasan. Silakan coba lagi.' };
    }
    
    revalidatePath('/'); // Not strictly necessary unless we are fetching pending ones, but good practice
    return { success: true, message: 'Terima kasih! Ulasan Anda akan ditampilkan setelah dimoderasi.' };
    
  } catch (err: unknown) {
    console.error("Unknown Error:", err);
    return { success: false, message: 'Terjadi kesalahan sistem.' };
  }
}

export async function toggleTestimonialStatus(id: string, is_published: boolean) {
  const { error } = await supabase
    .from('testimonials')
    .update({ is_published })
    .eq('id', id);
    
  if (error) {
    console.error("Toggle error:", error);
    return { success: false };
  }
  revalidatePath('/admin/testimonials');
  revalidatePath('/');
  return { success: true };
}

export async function deleteTestimonialAction(id: string) {
  const { error } = await supabase
    .from('testimonials')
    .delete()
    .eq('id', id);
    
  if (error) {
    console.error("Delete error:", error);
    return { success: false };
  }
  revalidatePath('/admin/testimonials');
  revalidatePath('/');
  return { success: true };
}
