'use client';

import { useState } from 'react';
import { MapPin, Phone, Mail, Send, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="pb-20">
      <section className="bg-blue-950 py-20 text-white mb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Hubungi Kami</h1>
          <p className="text-xl max-w-2xl mx-auto text-gray-300">
            Punya pertanyaan atau ingin mulai berkonsultasi? Tim kami siap membantu mewujudkan rumah impian Anda.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Contact Info & Map */}
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Informasi Kontak</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-50 text-blue-900 rounded-full flex items-center justify-center shrink-0">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Kantor Pusat</h4>
                    <p className="text-slate-600 leading-relaxed">
                      Jl. Sudirman No. 45, Jakarta Selatan,<br />
                      DKI Jakarta, Indonesia 12190
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-50 text-blue-900 rounded-full flex items-center justify-center shrink-0">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Telepon / WhatsApp</h4>
                    <p className="text-slate-600">+62 811 2345 6789</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-50 text-blue-900 rounded-full flex items-center justify-center shrink-0">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Email</h4>
                    <p className="text-slate-600">hello@griyareka.id</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-[300px] w-full rounded-2xl overflow-hidden bg-slate-200 shadow-md relative">
              {/* Placeholder for Google Maps iframe */}
              <div className="absolute inset-0 flex items-center justify-center">
                 <span className="text-slate-400 font-medium">Google Maps iframe Placeholder</span>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Kirim Pesan</h2>
            
            {submitted ? (
              <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-center space-y-4">
                <CheckCircle2 className="h-16 w-16 text-green-500" />
                <h3 className="text-2xl font-bold text-slate-900">Pesan Terkirim!</h3>
                <p className="text-slate-600">
                  Terima kasih telah menghubungi kami. Tim GriyaReka akan segera merespon pesan Anda.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-slate-700">Nama Lengkap</Label>
                  <Input id="name" required placeholder="Cth: Budi Santoso" className="h-12" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-700">Alamat Email</Label>
                  <Input id="email" type="email" required placeholder="Cth: budi@example.com" className="h-12" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="service" className="text-slate-700">Layanan yang Diminati</Label>
                  <select id="service" className="flex h-12 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                    <option value="">Pilih layanan...</option>
                    <option value="custom-design">Custom Home Design</option>
                    <option value="smart-home">Smart Home Integration</option>
                    <option value="green-building">Green Building</option>
                    <option value="renovation">Renovation</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-slate-700">Pesan / Kebutuhan Anda</Label>
                  <Textarea id="message" required placeholder="Ceritakan detail kebutuhan pembangunan atau renovasi Anda..." className="min-h-[150px] resize-none" />
                </div>

                <Button type="submit" className="w-full h-12 bg-orange-600 hover:bg-orange-700 text-white text-base">
                  <Send className="mr-2 h-5 w-5" /> Kirim Pesan Sekarang
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
