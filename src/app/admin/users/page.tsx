import { getUsers } from '@/app/actions/users';
import { UserManagementClient } from '@/components/admin/UserManagementClient';

export const dynamic = 'force-dynamic';

export default async function AdminUsersPage() {
  const users = await getUsers();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Kelola User</h1>
      </div>
      <UserManagementClient initialUsers={users} />
    </div>
  );
}
