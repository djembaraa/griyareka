import { Skeleton } from '@/components/ui/skeleton';

export default function BlogLoading() {
  return (
    <div className="pb-20">
      <section className="bg-blue-950 py-20 text-white mb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Skeleton className="h-12 w-80 mx-auto mb-6 bg-white/20" />
          <Skeleton className="h-6 w-full max-w-2xl mx-auto bg-white/10" />
          <Skeleton className="h-6 w-3/4 max-w-xl mx-auto mt-2 bg-white/10" />
        </div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-sm border overflow-hidden flex flex-col h-full">
              <Skeleton className="h-64 w-full" />
              <div className="p-6 flex flex-col flex-1">
                <Skeleton className="h-4 w-32 mb-3" />
                <Skeleton className="h-6 w-full mb-2" />
                <Skeleton className="h-6 w-3/4 mb-4" />
                
                <div className="mt-auto pt-4 border-t flex justify-between items-center">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
