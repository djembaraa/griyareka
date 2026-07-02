import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Eye, Users, MessageSquare } from 'lucide-react';
import { getPosts, getPaginatedActivities, getDashboardStats } from '@/lib/db';
import { PaginationControls } from '@/components/PaginationControls';
import Link from 'next/link';

export default async function AdminDashboardPage(props: { searchParams: Promise<{ page?: string }> }) {
  const searchParams = await props.searchParams;
  const page = parseInt(searchParams.page || '1', 10) || 1;
  const limit = 5;
  const stats = await getDashboardStats();
  const { data: activities, count } = await getPaginatedActivities(page, limit);
  const totalPages = Math.ceil(count / limit);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-500 mt-2">Selamat datang di panel admin GriyaReka.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-slate-500">Total Posts</CardTitle>
            <FileText className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.posts}</div>
            <p className="text-xs text-slate-500 mt-1">Artikel blog terdaftar</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-slate-500">Total Activity</CardTitle>
            <Eye className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activities}</div>
            <p className="text-xs text-slate-500 mt-1">Aktivitas di log sistem</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-slate-500">Testimonials</CardTitle>
            <MessageSquare className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.testimonials}</div>
            <p className="text-xs text-slate-500 mt-1">Ulasan dari klien</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-slate-500">Total Users</CardTitle>
            <Users className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.users}</div>
            <p className="text-xs text-slate-500 mt-1">Pengguna sistem</p>
          </CardContent>
        </Card>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h3 className="font-semibold text-lg mb-4">Aktivitas Terkini</h3>
        <div className="space-y-4">
          {activities.map((activity) => {
            let actionText = '';
            if (activity.action_type === 'created') actionText = 'membuat';
            if (activity.action_type === 'updated') actionText = 'memperbarui';
            if (activity.action_type === 'deleted') actionText = 'menghapus';

            let entityText = '';
            if (activity.entity_type === 'post') entityText = 'artikel';
            if (activity.entity_type === 'property') entityText = 'properti';
            if (activity.entity_type === 'testimonial') entityText = 'testimonial';
            if (activity.entity_type === 'user') entityText = 'pengguna';

            const authorName = activity.profiles?.display_name || 'Admin';

            return (
              <div key={activity.id} className="flex items-center gap-4 py-3 border-b last:border-0">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-900 font-bold shrink-0">
                  {authorName[0].toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">
                    {authorName} {actionText} {entityText} {activity.entity_type === 'post' && activity.entity_slug ? (
                      <Link href={`/blog/${activity.entity_slug}`} className="text-blue-600 hover:underline">
                        &quot;{activity.entity_title}&quot;
                      </Link>
                    ) : (
                      <span className="italic">&quot;{activity.entity_title}&quot;</span>
                    )}
                  </p>
                </div>
                <div className="ml-auto text-xs text-slate-400">
                  {new Date(activity.created_at).toLocaleDateString('id-ID', {
                    day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
                  })}
                </div>
              </div>
            );
          })}
          {activities.length === 0 && (
            <p className="text-sm text-slate-500 italic">Belum ada aktivitas yang tercatat.</p>
          )}
        </div>
        <PaginationControls currentPage={page} totalPages={totalPages} />
      </div>
    </div>
  );
}
