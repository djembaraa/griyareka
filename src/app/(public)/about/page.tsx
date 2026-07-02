import Image from 'next/image';
import { Target, Eye, Users } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="pb-20">
      <section className="bg-blue-950 py-20 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Tentang GriyaReka</h1>
          <p className="text-xl max-w-2xl mx-auto text-gray-300">
            Mengenal lebih dekat siapa kami dan apa yang mendorong kami untuk menciptakan hunian impian Anda.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-slate-900">Siapa GriyaReka?</h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              Didirikan pada tahun 2023, GriyaReka adalah startup proptech dan kontraktor yang berdedikasi untuk merevolusi pengalaman membangun rumah. Kami memadukan keahlian arsitektur tradisional dengan inovasi teknologi modern.
            </p>
            <p className="text-slate-600 text-lg leading-relaxed">
              Misi utama kami adalah membuat proses pembangunan rumah menjadi lebih transparan, efisien, dan berpusat pada kebutuhan pemilik rumah.
            </p>
          </div>
          <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
             {/* Placeholder for Company Video/Image */}
            <div className="absolute inset-0 bg-slate-200 flex items-center justify-center">
               <span className="text-slate-400 font-medium">Company Video / Image Placeholder</span>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm text-center space-y-4">
              <div className="w-16 h-16 bg-blue-100 text-blue-900 rounded-full flex items-center justify-center mx-auto">
                <Target className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Misi Kami</h3>
              <p className="text-slate-600">
                Memberikan solusi pembangunan rumah yang inovatif, berkualitas tinggi, dan ramah lingkungan dengan transparansi penuh bagi klien.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm text-center space-y-4">
              <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto">
                <Eye className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Visi Kami</h3>
              <p className="text-slate-600">
                Menjadi pelopor kontraktor masa depan di Indonesia yang menetapkan standar baru dalam desain rumah pintar dan berkelanjutan.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Nilai Kami</h3>
              <p className="text-slate-600">
                Integritas, Inovasi, Keberlanjutan, dan Kepuasan Pelanggan adalah pondasi dari setiap keputusan yang kami ambil.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="text-3xl font-bold text-slate-900 mb-12">Tim Kami</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-64 space-y-4">
              <div className="relative w-48 h-48 mx-auto rounded-full overflow-hidden bg-slate-200">
                 {/* Team Member Placeholder */}
              </div>
              <div>
                <h4 className="text-xl font-bold text-slate-900">Nama Anggota {i}</h4>
                <p className="text-orange-600">Posisi / Jabatan</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
