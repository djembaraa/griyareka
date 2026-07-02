import Link from 'next/link';
import Image from 'next/image';
import { getPaginatedPosts } from '@/lib/db';
import { MotionDiv } from '@/components/MotionDiv';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default async function BlogPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const resolvedParams = await searchParams;
  const currentPage = Number(resolvedParams.page) || 1;
  const limit = 6;

  const { data: posts, count } = await getPaginatedPosts(currentPage, limit);
  const totalPages = Math.ceil(count / limit);

  return (
    <div className="pb-20">
      <section className="bg-blue-950 py-20 text-white mb-20">
        <MotionDiv 
          className="container mx-auto px-4 sm:px-6 lg:px-8 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Berita & Inspirasi</h1>
          <p className="text-xl max-w-2xl mx-auto text-gray-300">
            Temukan tren arsitektur terbaru, tips merawat rumah, dan kisah inspiratif dari proyek kami.
          </p>
        </MotionDiv>
      </section>

      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        {posts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {posts.map((post, idx) => (
                <MotionDiv 
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                >
                  <Link href={`/blog/${post.id}`} className="group flex flex-col h-full bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer border overflow-hidden">
                    <div className="relative h-64 w-full overflow-hidden">
                      <Image
                        src={post.image_url || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80'}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <p className="text-sm text-orange-600 font-medium mb-3">
                        {new Date(post.created_at).toLocaleDateString('id-ID', {
                          day: 'numeric', month: 'long', year: 'numeric'
                        })}
                      </p>
                      <h2 className="text-xl font-bold text-slate-900 group-hover:text-blue-900 transition-colors mb-4 line-clamp-2">
                        {post.title}
                      </h2>
                      
                      <div className="mt-auto pt-4 border-t flex justify-between items-center text-sm text-slate-500">
                        <span>Ditulis oleh {post.profiles?.display_name || 'Admin'}</span>
                        <span className="text-blue-900 font-medium group-hover:underline">Baca selengkapnya &rarr;</span>
                      </div>
                    </div>
                  </Link>
                </MotionDiv>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-16 flex justify-center items-center gap-2">
                {currentPage > 1 ? (
                  <Link href={`/blog?page=${currentPage - 1}`} className="flex items-center justify-center h-10 px-4 rounded-md border bg-white text-slate-700 hover:bg-slate-50 transition-colors">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Sebelumnya
                  </Link>
                ) : (
                  <button disabled className="flex items-center justify-center h-10 px-4 rounded-md border bg-slate-50 text-slate-400 cursor-not-allowed">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Sebelumnya
                  </button>
                )}
                
                <div className="flex items-center gap-1 mx-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Link 
                      key={page}
                      href={`/blog?page=${page}`}
                      className={`flex items-center justify-center h-10 w-10 rounded-md transition-colors ${
                        page === currentPage 
                          ? 'bg-blue-900 text-white font-medium' 
                          : 'border bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {page}
                    </Link>
                  ))}
                </div>

                {currentPage < totalPages ? (
                  <Link href={`/blog?page=${currentPage + 1}`} className="flex items-center justify-center h-10 px-4 rounded-md border bg-white text-slate-700 hover:bg-slate-50 transition-colors">
                    Selanjutnya
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                ) : (
                  <button disabled className="flex items-center justify-center h-10 px-4 rounded-md border bg-slate-50 text-slate-400 cursor-not-allowed">
                    Selanjutnya
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </button>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20 bg-slate-50 rounded-2xl border border-dashed">
            <h3 className="text-xl font-medium text-slate-600 mb-2">Belum ada artikel</h3>
            <p className="text-slate-500">Artikel baru akan segera hadir.</p>
          </div>
        )}
      </section>
    </div>
  );
}
