'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X, Home } from 'lucide-react';
import { Button } from './ui/button';

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const routes = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <Home className="h-6 w-6 text-blue-900" />
              <span className="text-xl font-bold text-blue-900">GriyaReka</span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            {routes.map((route) => (
              <Link
                key={route.path}
                href={route.path}
                className={`text-sm font-medium transition-colors hover:text-orange-600 ${
                  isActive(route.path) ? 'text-orange-600' : 'text-slate-600'
                }`}
              >
                {route.name}
              </Link>
            ))}
            <Button className="bg-orange-600 hover:bg-orange-700 text-white">
              Konsultasi Sekarang
            </Button>
          </nav>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-blue-900 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t">
          <div className="space-y-1 px-4 pb-3 pt-2">
            {routes.map((route) => (
              <Link
                key={route.path}
                href={route.path}
                onClick={() => setIsOpen(false)}
                className={`block rounded-md px-3 py-2 text-base font-medium ${
                  isActive(route.path)
                    ? 'bg-blue-50 text-orange-600'
                    : 'text-slate-600 hover:bg-gray-50 hover:text-blue-900'
                }`}
              >
                {route.name}
              </Link>
            ))}
            <div className="pt-2">
              <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white">
                Konsultasi Sekarang
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
