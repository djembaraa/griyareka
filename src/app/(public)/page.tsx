import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Home, Shield, Leaf, Star, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { getPosts } from '@/lib/db';

export default async function HomePage() {
  const posts = await getPosts();
  const recentPosts = posts.slice(0, 3);

  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* Hero Section */}
      <section className="relative h-[600px] w-full flex items-center bg-blue-950">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80"
            alt="Modern home exterior"
            fill
            className="object-cover opacity-40"
            priority
          />
        </div>
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl text-white">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
              Membangun Ruang, <br />
              <span className="text-orange-500">Merangkai Masa Depan.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8">
              GriyaReka menghadirkan inovasi desain rumah modern yang berkelanjutan, memadukan estetika premium dengan fungsionalitas cerdas.
            </p>
            <div className="flex gap-4">
              <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white border-none h-12 px-8 text-base">
                Konsultasi Sekarang
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white h-12 px-8 text-base backdrop-blur">
                Lihat Portfolio
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick About */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="w-full md:w-1/2 relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80"
              alt="Interior design"
              fill
              className="object-cover"
            />
          </div>
          <div className="w-full md:w-1/2 space-y-6">
            <div className="inline-block rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-900">
              TENTANG KAMI
            </div>
            <h2 className="text-3xl font-bold text-slate-900">
              Lebih Dari Sekadar Kontraktor, Kami Adalah Mitra Mewujudkan Impian Anda
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              GriyaReka lahir dari visi untuk merevolusi industri pembangunan rumah. Kami menggabungkan material ramah lingkungan dengan teknologi smart home untuk menciptakan hunian yang tidak hanya indah, tapi juga efisien dan tahan lama.
            </p>
            <Link href="/about" className="inline-flex items-center text-orange-600 font-semibold hover:text-orange-700 group">
              Kenali Kami Lebih Dekat
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="bg-slate-50 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Layanan Unggulan Kami</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Solusi komprehensif untuk setiap tahap pembangunan dan renovasi rumah Anda.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                  <Home className="h-6 w-6 text-blue-900" />
                </div>
                <CardTitle>Custom Home Design</CardTitle>
                <CardDescription>
                  Desain arsitektur yang disesuaikan sepenuhnya dengan gaya hidup dan preferensi Anda.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-orange-100 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle>Smart Home Integration</CardTitle>
                <CardDescription>
                  Integrasi teknologi pintar yang seamlessly terpasang pada saat proses konstruksi.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center mb-4">
                  <Leaf className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Green Building</CardTitle>
                <CardDescription>
                  Konstruksi berkelanjutan menggunakan material ramah lingkungan dan efisiensi energi.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Recent News */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Berita & Inspirasi</h2>
            <p className="text-slate-600">Temukan tren terbaru dan tips seputar hunian.</p>
          </div>
          <Link href="/blog" className="hidden sm:inline-flex items-center text-blue-900 font-semibold hover:text-blue-800 group">
            Lihat Semua Artikel
            <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {recentPosts.map((post) => (
            <Link href={`/blog/${post.id}`} key={post.id} className="group flex flex-col gap-4">
              <div className="relative h-64 w-full rounded-xl overflow-hidden">
                <Image
                  src={post.image_url}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-2">
                  {new Date(post.created_at).toLocaleDateString('id-ID', {
                    day: 'numeric', month: 'long', year: 'numeric'
                  })}
                </p>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-900 transition-colors">
                  {post.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Testimonials & FAQ */}
      <section className="bg-blue-950 py-20 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Testimonials */}
            <div>
              <h2 className="text-3xl font-bold mb-8">Apa Kata Klien Kami</h2>
              <div className="space-y-6">
                <div className="bg-white/10 p-6 rounded-2xl backdrop-blur border border-white/10">
                  <div className="flex gap-1 text-orange-400 mb-4">
                    <Star className="fill-current w-5 h-5" />
                    <Star className="fill-current w-5 h-5" />
                    <Star className="fill-current w-5 h-5" />
                    <Star className="fill-current w-5 h-5" />
                    <Star className="fill-current w-5 h-5" />
                  </div>
                  <p className="text-gray-200 mb-4 italic">
                    "Proses pembangunan berjalan sangat transparan dan hasilnya melebihi ekspektasi. Desain modernnya sangat pas dengan selera keluarga kami."
                  </p>
                  <p className="font-semibold">- Budi Santoso, Jakarta</p>
                </div>
                <div className="bg-white/10 p-6 rounded-2xl backdrop-blur border border-white/10">
                  <div className="flex gap-1 text-orange-400 mb-4">
                    <Star className="fill-current w-5 h-5" />
                    <Star className="fill-current w-5 h-5" />
                    <Star className="fill-current w-5 h-5" />
                    <Star className="fill-current w-5 h-5" />
                    <Star className="fill-current w-5 h-5" />
                  </div>
                  <p className="text-gray-200 mb-4 italic">
                    "Integrasi smart home yang ditawarkan GriyaReka sangat praktis dan rapi. Tim sangat profesional."
                  </p>
                  <p className="font-semibold">- Sarah Wijaya, Tangerang Selatan</p>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div>
              <h2 className="text-3xl font-bold mb-8">FAQ (Pertanyaan Umum)</h2>
              <Accordion className="w-full">
                <AccordionItem value="item-1" className="border-white/20">
                  <AccordionTrigger className="hover:text-orange-400 text-left">
                    Berapa lama estimasi proses pembangunan rumah?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    Estimasi waktu bervariasi antara 6 hingga 12 bulan, tergantung pada ukuran, kompleksitas desain, dan faktor cuaca. Kami akan memberikan jadwal terperinci sebelum proyek dimulai.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2" className="border-white/20">
                  <AccordionTrigger className="hover:text-orange-400 text-left">
                    Apakah GriyaReka melayani renovasi?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    Ya, kami menyediakan layanan renovasi total maupun parsial, terutama untuk meningkatkan fungsionalitas dan menambahkan fitur smart home pada rumah yang sudah ada.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3" className="border-white/20">
                  <AccordionTrigger className="hover:text-orange-400 text-left">
                    Bagaimana sistem pembayarannya?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    Sistem pembayaran dilakukan secara bertahap (termin) sesuai dengan progress pembangunan yang disepakati bersama dalam kontrak kerja.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4" className="border-white/20">
                  <AccordionTrigger className="hover:text-orange-400 text-left">
                    Apakah desain bisa disesuaikan dengan budget?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    Tentu. Tim arsitek kami akan berdiskusi secara mendalam untuk merancang rumah impian Anda dengan mempertimbangkan budget yang tersedia tanpa mengorbankan kualitas.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
