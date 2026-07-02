import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Bed, Bath, Maximize, CheckCircle2, MessageSquare } from 'lucide-react';
import { getPropertyBySlug } from '@/lib/db';
import { formatCurrency } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export default async function PropertyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const property = await getPropertyBySlug(resolvedParams.slug);

  if (!property) {
    notFound();
  }

  return (
    <div className="pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl pt-12">
        <Link href="/properties" className="inline-flex items-center text-slate-500 hover:text-blue-900 mb-8 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Kembali ke Katalog
        </Link>

        {/* Featured Image */}
        <div className="relative w-full h-[400px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl mb-12">
          <Image
            src={property.image_url}
            alt={property.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute top-6 right-6 bg-white/90 backdrop-blur text-blue-900 px-6 py-2 rounded-full font-bold shadow-lg text-lg">
            {formatCurrency(property.price)}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">
            <div>
              <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
                {property.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 pb-8 border-b">
                <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-lg">
                  <Bed className="h-6 w-6 text-slate-400" />
                  <span className="font-semibold text-slate-700">{property.bedrooms} Kamar Tidur</span>
                </div>
                <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-lg">
                  <Bath className="h-6 w-6 text-slate-400" />
                  <span className="font-semibold text-slate-700">{property.bathrooms} Kamar Mandi</span>
                </div>
                <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-lg">
                  <Maximize className="h-6 w-6 text-slate-400" />
                  <span className="font-semibold text-slate-700">Premium Space</span>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Deskripsi Properti</h2>
              <div className="prose prose-lg prose-slate text-slate-600 leading-relaxed max-w-none">
                <p>{property.description}</p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Fitur & Keunggulan</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Lokasi Strategis & Bebas Banjir",
                  "Sertifikat Hak Milik (SHM)",
                  "Instalasi Smart Home Ready",
                  "Material Bangunan Kualitas Premium",
                  "Desain Sirkulasi Udara Optimal",
                  "Sistem Keamanan 24 Jam"
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-slate-700">
                    <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar CTA */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-2xl shadow-xl border p-6 space-y-6">
              <h3 className="text-xl font-bold text-slate-900 text-center">Tertarik dengan hunian ini?</h3>
              <p className="text-slate-600 text-center text-sm">
                Hubungi tim marketing kami sekarang untuk menjadwalkan kunjungan lokasi atau konsultasi lebih lanjut.
              </p>
              
              <div className="space-y-3 pt-4 border-t">
                <Link href="/contact" className="w-full block">
                  <Button className="w-full h-14 bg-orange-600 hover:bg-orange-700 text-white font-semibold text-base">
                    Hubungi Marketing
                  </Button>
                </Link>
                <a href="https://wa.me/6281123456789" target="_blank" rel="noopener noreferrer" className="w-full block">
                  <Button variant="outline" className="w-full h-14 border-green-500 text-green-600 hover:bg-green-50 font-semibold text-base">
                    <MessageSquare className="mr-2 h-5 w-5" /> Chat via WhatsApp
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
