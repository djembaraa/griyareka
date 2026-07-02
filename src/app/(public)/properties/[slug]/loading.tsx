import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function PropertyDetailLoading() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-20">
      <Link 
        href="/properties" 
        className="inline-flex items-center text-slate-500 hover:text-slate-900 mb-8"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Kembali ke Katalog
      </Link>

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border">
        <Skeleton className="w-full h-[400px] md:h-[600px]" />
        
        <div className="p-8 md:p-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div className="w-full max-w-2xl">
              <Skeleton className="h-10 w-3/4 mb-4" />
              <div className="flex flex-wrap gap-4">
                <Skeleton className="h-6 w-24 rounded-full" />
                <Skeleton className="h-6 w-24 rounded-full" />
              </div>
            </div>
            <div className="md:text-right">
              <Skeleton className="h-4 w-20 mb-2 md:ml-auto" />
              <Skeleton className="h-10 w-48" />
            </div>
          </div>
          
          <div className="w-full h-px bg-slate-100 my-8" />
          
          <div className="space-y-4">
            <Skeleton className="h-8 w-48 mb-4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </div>
    </div>
  );
}
