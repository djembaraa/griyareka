import Link from 'next/link';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getPaginatedPosts, getAuthors } from '@/lib/db';
import { PaginationControls } from '@/components/PaginationControls';
import { PostFilters } from '@/components/admin/PostFilters';

export default async function AdminPostsPage(props: { searchParams: Promise<{ page?: string, authorId?: string, sortBy?: string }> }) {
  const searchParams = await props.searchParams;
  const page = parseInt(searchParams.page || '1', 10) || 1;
  const authorId = searchParams.authorId || 'all';
  const sortBy = searchParams.sortBy || 'newest';
  const limit = 10;
  
  const authors = await getAuthors();
  const { data: posts, count } = await getPaginatedPosts(page, limit, authorId, sortBy);
  const totalPages = Math.ceil(count / limit);

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Blog Posts</h1>
          <p className="text-slate-500 mt-2">Kelola semua artikel blog di sini.</p>
        </div>
        <Link href="/admin/posts/new" className="w-full sm:w-auto">
          <Button className="bg-orange-600 hover:bg-orange-700 text-white w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" /> Tulis Artikel Baru
          </Button>
        </Link>
      </div>

      <PostFilters authors={authors} />

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-sm font-medium text-slate-600">
                <th className="p-4 pl-6 whitespace-nowrap">Judul Artikel</th>
                <th className="p-4 whitespace-nowrap">Tanggal Publikasi</th>
                <th className="p-4 whitespace-nowrap">Author</th>
                <th className="p-4 text-right pr-6 whitespace-nowrap">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="p-4 pl-6 font-medium text-slate-900 max-w-[300px] truncate">
                    {post.title}
                  </td>
                  <td className="p-4 text-slate-500 text-sm whitespace-nowrap">
                    {new Date(post.created_at).toLocaleDateString('id-ID')}
                  </td>
                  <td className="p-4 text-slate-500 text-sm whitespace-nowrap">
                    {post.profiles?.display_name || 'Admin'}
                  </td>
                  <td className="p-4 text-right pr-6">
                    <div className="flex items-center justify-end gap-2 whitespace-nowrap">
                      <Link href={`/admin/posts/${post.id}`}>
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {posts.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-slate-500">
                    Belum ada artikel yang cocok dengan filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <PaginationControls currentPage={page} totalPages={totalPages} />
      </div>
    </div>
  );
}
