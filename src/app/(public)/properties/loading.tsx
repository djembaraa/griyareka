import { Skeleton } from '@/components/ui/skeleton';

export default function PropertiesLoading() {
  return (
    <div className="pb-20">
      <section className="bg-blue-950 py-20 text-white mb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Skeleton className="h-12 w-64 mx-auto mb-6 bg-white/20" />
          <Skeleton className="h-6 w-full max-w-2xl mx-auto bg-white/10" />
          <Skeleton className="h-6 w-3/4 max-w-xl mx-auto mt-2 bg-white/10" />
        </div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className="rounded-xl overflow-hidden shadow-md border bg-white h-full flex flex-col">
              <Skeleton className="h-64 w-full" />
              <div className="p-6 flex-1 flex flex-col">
                <Skeleton className="h-8 w-3/4 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-5/6 mb-6" />
                
                <div className="flex gap-6 mb-6 pb-6 border-b">
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-5 w-16" />
                </div>
                
                <div className="flex items-center justify-between mt-auto">
                  <Skeleton className="h-8 w-32" />
                  <Skeleton className="h-5 w-24" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
