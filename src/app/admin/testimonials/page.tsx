import { getPaginatedTestimonials } from '@/lib/db';
import { TestimonialActions } from '@/components/TestimonialActions';
import { PaginationControls } from '@/components/PaginationControls';

export const dynamic = 'force-dynamic';

export default async function AdminTestimonialsPage(props: { searchParams: Promise<{ page?: string }> }) {
  const searchParams = await props.searchParams;
  const page = parseInt(searchParams.page || '1', 10) || 1;
  const limit = 10;
  
  const { data: testimonials, count } = await getPaginatedTestimonials(page, limit);
  const totalPages = Math.ceil(count / limit);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Kelola Ulasan</h1>
      </div>

      <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 border-b text-slate-500 uppercase text-xs">
              <tr>
                <th className="px-6 py-4 font-medium">Tanggal</th>
                <th className="px-6 py-4 font-medium">Nama/Asal</th>
                <th className="px-6 py-4 font-medium">Ulasan</th>
                <th className="px-6 py-4 font-medium">Info Kontak</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {testimonials.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                    Belum ada ulasan.
                  </td>
                </tr>
              ) : (
                testimonials.map((testi) => (
                  <tr key={testi.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-slate-500">
                      {new Date(testi.created_at).toLocaleDateString('id-ID')}
                    </td>
                    <td className="px-6 py-4 font-medium min-w-[150px]">
                      {testi.name}
                    </td>
                    <td className="px-6 py-4 text-slate-600 max-w-md min-w-[200px]">
                      <div className="line-clamp-3 whitespace-pre-wrap">
                        {testi.content}
                      </div>
                    </td>
                    <td className="px-6 py-4 min-w-[150px]">
                      <div className="flex flex-col space-y-1">
                        <span className="text-slate-800 text-sm font-medium">{testi.email}</span>
                        {testi.phone && <span className="text-slate-500 text-xs">{testi.phone}</span>}
                        {testi.is_subscribed && (
                          <span className="inline-flex items-center px-2 py-0.5 mt-1 rounded text-[10px] font-medium bg-blue-100 text-blue-800 w-fit">
                            Newsletter
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        testi.is_published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {testi.is_published ? 'Publik' : 'Pending'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <TestimonialActions id={testi.id} isPublished={testi.is_published} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <PaginationControls currentPage={page} totalPages={totalPages} />
      </div>
    </div>
  );
}
