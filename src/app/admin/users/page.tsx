import { getPaginatedUsers } from '@/app/actions/users';
import { UserManagementClient } from '@/components/admin/UserManagementClient';

export const dynamic = 'force-dynamic';

export default async function AdminUsersPage(props: { searchParams: Promise<{ page?: string }> }) {
  const searchParams = await props.searchParams;
  const page = parseInt(searchParams.page || '1', 10) || 1;
  const limit = 10;
  
  const { data: users, count } = await getPaginatedUsers(page, limit);
  const totalPages = Math.ceil(count / limit);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Kelola User</h1>
      </div>
      <UserManagementClient 
        initialUsers={users} 
        totalPages={totalPages} 
        currentPage={page} 
      />
    </div>
  );
}
