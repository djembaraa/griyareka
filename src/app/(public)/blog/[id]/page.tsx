import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { getPostById } from '@/lib/db';

export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const post = await getPostById(resolvedParams.id);

  if (!post) {
    notFound();
  }

  // Intentionally leaving this vulnerable to XSS as requested
  const rawContent = post.content;

  return (
    <div className="pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl pt-12">
        <Link href="/blog" className="inline-flex items-center text-slate-500 hover:text-blue-900 mb-8 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Kembali ke Blog
        </Link>

        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center justify-center gap-6 text-slate-500 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {new Date(post.created_at).toLocaleDateString('id-ID', {
                day: 'numeric', month: 'long', year: 'numeric'
              })}
            </div>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              {post.profiles?.display_name || 'Admin GriyaReka'}
            </div>
          </div>
        </div>

        <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-lg mb-12">
          <Image
            src={post.image_url || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80'}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="prose prose-lg prose-blue max-w-none prose-headings:text-slate-900 prose-p:text-slate-700 prose-a:text-orange-600 hover:prose-a:text-orange-700">
          <div dangerouslySetInnerHTML={{ __html: rawContent }} />
        </div>
      </div>
    </div>
  );
}
