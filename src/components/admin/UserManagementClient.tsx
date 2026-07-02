'use client';

import { useState, useEffect } from 'react';
import { UserProfile, createAdmin, updateUser, deleteUser } from '@/app/actions/users';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { PaginationControls } from '@/components/PaginationControls';

export function UserManagementClient({ 
  initialUsers, 
  totalPages, 
  currentPage 
}: { 
  initialUsers: UserProfile[], 
  totalPages: number, 
  currentPage: number 
}) {
  const [users, setUsers] = useState<UserProfile[]>(initialUsers);
  const [currentUserId, setCurrentUserId] = useState<string>('');
  
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) setCurrentUserId(user.id);
    });
  }, []);

  async function handleAdd(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const res = await createAdmin(currentUserId, formData);
    if (res.success) {
      alert(res.message);
      setIsAddOpen(false);
      window.location.reload();
    } else {
      alert(res.message);
    }
    setLoading(false);
  }

  async function handleEdit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!editingUser) return;
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const res = await updateUser(currentUserId, editingUser.id, formData);
    if (res.success) {
      alert(res.message);
      setIsEditOpen(false);
      window.location.reload();
    } else {
      alert(res.message);
    }
    setLoading(false);
  }

  async function handleDelete(id: string) {
    if (!confirm('Apakah Anda yakin ingin menghapus user ini?')) return;
    const res = await deleteUser(currentUserId, id);
    if (res.success) {
      alert(res.message);
      window.location.reload();
    } else {
      alert(res.message);
    }
  }

  return (
    <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
      <div className="p-4 flex sm:justify-end">
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button className="w-full sm:w-auto bg-slate-900 text-white hover:bg-slate-800">
              Tambah User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tambah User Baru</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAdd} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label>Nama Lengkap</Label>
                <Input name="display_name" required placeholder="Budi Santoso" />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input name="email" type="email" required placeholder="staf@griyareka.id" />
              </div>
              <div className="space-y-2">
                <Label>Password Awal</Label>
                <Input name="password" type="password" required placeholder="Minimal 6 karakter" minLength={6} />
              </div>
              <div className="space-y-2">
                <Label>Role</Label>
                <Select name="role" defaultValue="admin">
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="root">Root</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="sales">Sales</SelectItem>
                    <SelectItem value="cs">CS</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" disabled={loading} className="w-full bg-blue-900 hover:bg-blue-800 text-white">
                {loading ? 'Menyimpan...' : 'Buat Akun'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 border-b text-slate-500 uppercase text-xs">
            <tr>
              <th className="px-6 py-4 font-medium">Email</th>
              <th className="px-6 py-4 font-medium">Display Name</th>
              <th className="px-6 py-4 font-medium">Role</th>
              <th className="px-6 py-4 font-medium text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 whitespace-nowrap">{u.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{u.display_name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="bg-slate-100 text-slate-800 border px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase">{u.role}</span>
                </td>
                <td className="px-6 py-4 text-right space-x-2 whitespace-nowrap">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => {
                      setEditingUser(u);
                      setIsEditOpen(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    onClick={() => handleDelete(u.id)}
                    disabled={u.id === currentUserId}
                  >
                    Hapus
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <PaginationControls currentPage={currentPage} totalPages={totalPages} />

      {editingUser && (
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit User</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleEdit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label>Email</Label>
                <Input value={editingUser.email || ''} disabled />
              </div>
              <div className="space-y-2">
                <Label>Display Name</Label>
                <Input name="display_name" defaultValue={editingUser.display_name || ''} required />
              </div>
              <div className="space-y-2">
                <Label>Role</Label>
                <Select name="role" defaultValue={editingUser.role || 'admin'}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="root">Root</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="sales">Sales</SelectItem>
                    <SelectItem value="cs">CS</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? 'Menyimpan...' : 'Perbarui User'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
