'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface PostFiltersProps {
  authors: { id: string, display_name: string }[];
}

export function PostFilters({ authors }: PostFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const authorId = searchParams.get('authorId') || 'all';
  const sortBy = searchParams.get('sortBy') || 'newest';

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(name, value);
    params.set('page', '1'); // Reset to page 1 on filter change
    return params.toString();
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6 bg-white p-4 rounded-xl border shadow-sm">
      <div className="flex-1 space-y-1">
        <Label className="text-xs text-slate-500 uppercase font-semibold tracking-wider">Filter Penulis</Label>
        <Select 
          value={authorId} 
          onValueChange={(val) => router.push(`${pathname}?${createQueryString('authorId', val || '')}`)}
        >
          <SelectTrigger className="w-full bg-slate-50">
            <SelectValue placeholder="Pilih Penulis" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Penulis</SelectItem>
            {authors.map(author => (
              <SelectItem key={author.id} value={author.id}>
                {author.display_name || 'Admin'}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex-1 space-y-1">
        <Label className="text-xs text-slate-500 uppercase font-semibold tracking-wider">Urutkan Berdasarkan</Label>
        <Select 
          value={sortBy} 
          onValueChange={(val) => router.push(`${pathname}?${createQueryString('sortBy', val || '')}`)}
        >
          <SelectTrigger className="w-full bg-slate-50">
            <SelectValue placeholder="Urutkan" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Terbaru (Paling Atas)</SelectItem>
            <SelectItem value="oldest">Terlama (Paling Atas)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
