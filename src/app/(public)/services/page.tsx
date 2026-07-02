import { Home, Shield, Leaf, Wrench } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

export default function ServicesPage() {
  const services = [
    {
      title: "Custom Home Design",
      description: "Desain arsitektur personal yang mencerminkan gaya hidup dan kepribadian Anda.",
      icon: <Home className="h-8 w-8 text-blue-900" />,
      features: [
        "Konsultasi arsitektur mendalam",
        "Visualisasi 3D real-time",
        "Pemilihan material premium",
        "Pengurusan IMB & perizinan"
      ],
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80"
    },
    {
      title: "Smart Home Integration",
      description: "Jadikan rumah Anda cerdas dengan integrasi teknologi otomasi sejak tahap konstruksi.",
      icon: <Shield className="h-8 w-8 text-orange-600" />,
      features: [
        "Sistem keamanan terpadu",
        "Otomasi pencahayaan & iklim",
        "Instalasi kabel tersembunyi",
        "Kendali melalui smartphone"
      ],
      image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80"
    },
    {
      title: "Green Building",
      description: "Rumah ramah lingkungan dengan efisiensi energi yang menghemat biaya jangka panjang.",
      icon: <Leaf className="h-8 w-8 text-green-600" />,
      features: [
        "Desain sirkulasi udara optimal",
        "Instalasi panel surya",
        "Sistem penampungan air hujan",
        "Material bangunan daur ulang"
      ],
      image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80"
    },
    {
      title: "Renovation & Remodeling",
      description: "Transformasi total hunian lama Anda menjadi rumah modern yang fungsional.",
      icon: <Wrench className="h-8 w-8 text-slate-700" />,
      features: [
        "Evaluasi struktur bangunan",
        "Redesain tata ruang",
        "Pembaruan instalasi listrik/air",
        "Finishing modern"
      ],
      image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80"
    }
  ];

  return (
    <div className="pb-20">
      <section className="bg-blue-950 py-20 text-white mb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Layanan Kami</h1>
          <p className="text-xl max-w-2xl mx-auto text-gray-300">
            Kami menawarkan solusi ujung-ke-ujung (end-to-end) untuk membangun dan merawat properti investasi terbaik Anda.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        {services.map((service, idx) => (
          <div key={idx} className={`flex flex-col md:flex-row gap-12 items-center ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
            <div className="w-full md:w-1/2">
              <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="w-full md:w-1/2 space-y-6">
              <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center">
                {service.icon}
              </div>
              <h2 className="text-3xl font-bold text-slate-900">{service.title}</h2>
              <p className="text-lg text-slate-600">{service.description}</p>
              
              <ul className="space-y-3 pt-4">
                {service.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-center text-slate-700">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
