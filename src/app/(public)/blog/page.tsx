import Link from 'next/link';
import Image from 'next/image';
import { getPosts } from '@/lib/db';

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="pb-20">
      <section className="bg-blue-950 py-20 text-white mb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Berita & Inspirasi</h1>
          <p className="text-xl max-w-2xl mx-auto text-gray-300">
            Temukan tren arsitektur terbaru, tips merawat rumah, dan kisah inspiratif dari proyek kami.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {posts.map((post) => (
            <Link href={`/blog/${post.id}`} key={post.id} className="group flex flex-col h-full bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all border overflow-hidden">
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
                
                {/* We just show a snippet of text if possible, but since it's HTML, we might just leave it out of the card or use a small description field if it existed. */}
                <div className="mt-auto pt-4 border-t flex justify-between items-center text-sm text-slate-500">
                  <span>Ditulis oleh Admin</span>
                  <span className="text-blue-900 font-medium group-hover:underline">Baca selengkapnya &rarr;</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
