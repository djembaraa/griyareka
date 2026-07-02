import Link from 'next/link';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getPosts } from '@/lib/db';

export default async function AdminPostsPage() {
  const posts = await getPosts();

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Blog Posts</h1>
          <p className="text-slate-500 mt-2">Kelola semua artikel blog di sini.</p>
        </div>
        <Link href="/admin/posts/new">
          <Button className="bg-orange-600 hover:bg-orange-700 text-white">
            <Plus className="mr-2 h-4 w-4" /> Tulis Artikel Baru
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-sm font-medium text-slate-600">
                <th className="p-4 pl-6">Judul Artikel</th>
                <th className="p-4">Tanggal Publikasi</th>
                <th className="p-4">Author</th>
                <th className="p-4 text-right pr-6">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="p-4 pl-6 font-medium text-slate-900 max-w-[300px] truncate">
                    {post.title}
                  </td>
                  <td className="p-4 text-slate-500 text-sm">
                    {new Date(post.created_at).toLocaleDateString('id-ID')}
                  </td>
                  <td className="p-4 text-slate-500 text-sm">
                    Admin GriyaReka
                  </td>
                  <td className="p-4 text-right pr-6 space-x-2">
                    <Link href={`/admin/posts/${post.id}`}>
                      <Button variant="outline" size="sm" className="h-8 px-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button variant="outline" size="sm" className="h-8 px-2 text-red-600 hover:text-red-700 hover:bg-red-50">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
              {posts.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-slate-500">
                    Belum ada artikel. Silakan buat artikel baru.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
