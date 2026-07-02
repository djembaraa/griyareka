import Link from 'next/link';
import Image from 'next/image';
import { Bed, Bath } from 'lucide-react';
import { getProperties } from '@/lib/db';
import { formatCurrency } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';

export default async function PropertiesPage() {
  const properties = await getProperties();

  return (
    <div className="pb-20">
      <section className="bg-blue-950 py-20 text-white mb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Katalog Properti</h1>
          <p className="text-xl max-w-2xl mx-auto text-gray-300">
            Temukan desain rumah impian yang sesuai dengan gaya hidup dan kebutuhan keluarga Anda.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {properties.map((property) => (
            <Card key={property.id} className="overflow-hidden group hover:shadow-xl transition-shadow border-none shadow-md">
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src={property.image_url}
                  alt={property.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                  Tersedia
                </div>
              </div>
              
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-slate-900 mb-2 truncate">
                  {property.title}
                </h2>
                <p className="text-slate-600 text-sm mb-6 line-clamp-2">
                  {property.description}
                </p>
                
                <div className="flex items-center gap-6 mb-6 pb-6 border-b">
                  <div className="flex items-center gap-2 text-slate-700">
                    <Bed className="h-5 w-5 text-slate-400" />
                    <span className="font-medium">{property.bedrooms} KT</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <Bath className="h-5 w-5 text-slate-400" />
                    <span className="font-medium">{property.bathrooms} KM</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-xl font-bold text-blue-900">
                    {formatCurrency(property.price)}
                  </div>
                  <Link 
                    href={`/properties/${property.slug}`} 
                    className="text-orange-600 font-semibold hover:text-orange-700 transition-colors text-sm"
                  >
                    Lihat Detail &rarr;
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
