import Link from 'next/link';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getPaginatedProperties } from '@/lib/db';
import { formatCurrency } from '@/lib/utils';
import { PaginationControls } from '@/components/PaginationControls';

export default async function AdminPropertiesPage(props: { searchParams: Promise<{ page?: string }> }) {
  const searchParams = await props.searchParams;
  const page = parseInt(searchParams.page || '1', 10) || 1;
  const limit = 10;
  
  const { data: properties, count } = await getPaginatedProperties(page, limit);
  const totalPages = Math.ceil(count / limit);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Properti</h1>
          <p className="text-slate-500 mt-2">Kelola daftar rumah dan properti Anda.</p>
        </div>
        <Link href="/admin/properties/new">
          <Button className="bg-orange-600 hover:bg-orange-700 text-white">
            <Plus className="mr-2 h-4 w-4" /> Tambah Properti Baru
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-sm font-medium text-slate-600">
                <th className="p-4 pl-6">Nama Properti</th>
                <th className="p-4">Harga</th>
                <th className="p-4">Kamar</th>
                <th className="p-4 text-right pr-6">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {properties.map((property) => (
                <tr key={property.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="p-4 pl-6 font-medium text-slate-900 max-w-[300px] truncate">
                    {property.title}
                  </td>
                  <td className="p-4 text-slate-500 text-sm">
                    {formatCurrency(property.price)}
                  </td>
                  <td className="p-4 text-slate-500 text-sm">
                    {property.bedrooms} KT, {property.bathrooms} KM
                  </td>
                  <td className="p-4 text-right pr-6 space-x-2">
                    <Link href={`/admin/properties/${property.id}`}>
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
              {properties.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-slate-500">
                    Belum ada properti terdaftar.
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
