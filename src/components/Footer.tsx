import Link from 'next/link';
import { MapPin, Phone, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-blue-950 text-slate-300">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">GriyaReka</h3>
            <p className="text-sm">
              Membangun rumah impian masa depan dengan desain modern dan teknologi ramah lingkungan.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-white transition-colors text-sm font-bold">FB</Link>
              <Link href="#" className="hover:text-white transition-colors text-sm font-bold">IG</Link>
              <Link href="#" className="hover:text-white transition-colors text-sm font-bold">TW</Link>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-orange-400 transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-orange-400 transition-colors">About Us</Link></li>
              <li><Link href="/services" className="hover:text-orange-400 transition-colors">Services</Link></li>
              <li><Link href="/blog" className="hover:text-orange-400 transition-colors">Blog</Link></li>
              <li><Link href="/contact" className="hover:text-orange-400 transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li>Custom Home Design</li>
              <li>Smart Home Integration</li>
              <li>Green Building</li>
              <li>Renovation & Remodeling</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-orange-500 shrink-0" />
                <span>Jl. Sudirman No. 45, Jakarta Selatan, Indonesia 12190</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-orange-500 shrink-0" />
                <span>+62 811 2345 6789</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-orange-500 shrink-0" />
                <span>hello@griyareka.id</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-blue-900 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} GriyaReka. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
