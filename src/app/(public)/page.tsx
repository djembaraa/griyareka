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
import { getPosts, getPublishedTestimonials } from '@/lib/db';
import { MotionDiv, MotionSection } from '@/components/MotionDiv';
import { TestimonialForm } from '@/components/TestimonialForm';
import { TestimonialCarousel } from '@/components/TestimonialCarousel';
import DOMPurify from 'isomorphic-dompurify';

export default async function HomePage() {
  const posts = await getPosts();
  const recentPosts = posts.slice(0, 3);
  const testimonials = await getPublishedTestimonials();

  const slideUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

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
          <MotionDiv 
            className="max-w-2xl text-white"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
              Membangun Ruang, <br />
              <span className="text-orange-500">Merangkai Masa Depan.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8">
              GriyaReka menghadirkan inovasi desain rumah modern yang berkelanjutan, memadukan estetika premium dengan fungsionalitas cerdas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white border-none h-12 px-8 text-base cursor-pointer">
                Konsultasi Sekarang
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border-white h-12 px-8 text-base backdrop-blur cursor-pointer">
                Lihat Portfolio
              </Button>
            </div>
          </MotionDiv>
        </div>
      </section>

      {/* Quick About */}
      <MotionSection {...slideUp} className="container mx-auto px-4 sm:px-6 lg:px-8">
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
      </MotionSection>

      {/* Featured Services */}
      <section className="bg-slate-50 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <MotionDiv {...slideUp} className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Layanan Unggulan Kami</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Solusi komprehensif untuk setiap tahap pembangunan dan renovasi rumah Anda.
            </p>
          </MotionDiv>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Custom Home Design', icon: <Home className="h-6 w-6 text-blue-900" />, bg: 'bg-blue-100', desc: 'Desain arsitektur yang disesuaikan sepenuhnya dengan gaya hidup dan preferensi Anda.' },
              { title: 'Smart Home Integration', icon: <Shield className="h-6 w-6 text-orange-600" />, bg: 'bg-orange-100', desc: 'Integrasi teknologi pintar yang seamlessly terpasang pada saat proses konstruksi.' },
              { title: 'Green Building', icon: <Leaf className="h-6 w-6 text-green-600" />, bg: 'bg-green-100', desc: 'Konstruksi berkelanjutan menggunakan material ramah lingkungan dan efisiensi energi.' }
            ].map((service, idx) => (
              <MotionDiv 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <Card className="border-none shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer h-full">
                  <CardHeader>
                    <div className={`h-12 w-12 rounded-lg ${service.bg} flex items-center justify-center mb-4`}>
                      {service.icon}
                    </div>
                    <CardTitle>{service.title}</CardTitle>
                    <CardDescription>{service.desc}</CardDescription>
                  </CardHeader>
                </Card>
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>

      {/* Recent News */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <MotionDiv {...slideUp} className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Berita & Inspirasi</h2>
            <p className="text-slate-600">Temukan tren terbaru dan tips seputar hunian.</p>
          </div>
          <Link href="/blog" className="hidden sm:inline-flex items-center text-blue-900 font-semibold hover:text-blue-800 group">
            Lihat Semua Artikel
            <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </MotionDiv>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {recentPosts.map((post, idx) => (
            <MotionDiv 
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <Link href={`/blog/${post.id}`} className="group flex flex-col gap-4">
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
            </MotionDiv>
          ))}
        </div>
      </section>

      {/* Testimonials & Form */}
      <section className="bg-blue-950 py-20 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Testimonials */}
            <MotionDiv {...slideUp}>
              <h2 className="text-3xl font-bold mb-8">Apa Kata Klien Kami</h2>
              <TestimonialCarousel testimonials={testimonials} />
            </MotionDiv>

            {/* Public Form */}
            <MotionDiv {...slideUp}>
              <TestimonialForm />
            </MotionDiv>

          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <MotionDiv {...slideUp} className="text-center mb-10">
          <h2 className="text-3xl font-bold text-slate-900">FAQ (Pertanyaan Umum)</h2>
        </MotionDiv>
        <Accordion className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-left font-semibold cursor-pointer">
              Berapa lama estimasi proses pembangunan rumah?
            </AccordionTrigger>
            <AccordionContent className="text-slate-600 text-base leading-relaxed">
              Estimasi waktu bervariasi antara 6 hingga 12 bulan, tergantung pada ukuran, kompleksitas desain, dan faktor cuaca. Kami akan memberikan jadwal terperinci sebelum proyek dimulai.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-left font-semibold cursor-pointer">
              Apakah GriyaReka melayani renovasi?
            </AccordionTrigger>
            <AccordionContent className="text-slate-600 text-base leading-relaxed">
              Ya, kami menyediakan layanan renovasi total maupun parsial, terutama untuk meningkatkan fungsionalitas dan menambahkan fitur smart home pada rumah yang sudah ada.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-left font-semibold cursor-pointer">
              Bagaimana sistem pembayarannya?
            </AccordionTrigger>
            <AccordionContent className="text-slate-600 text-base leading-relaxed">
              Sistem pembayaran dilakukan secara bertahap (termin) sesuai dengan progress pembangunan yang disepakati bersama dalam kontrak kerja.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

    </div>
  );
}

