'use client';

import * as React from 'react';
import { Star } from 'lucide-react';
import DOMPurify from 'isomorphic-dompurify';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { Testimonial } from '@/lib/db';

export function TestimonialCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  if (testimonials.length === 0) {
    return <p className="text-gray-300 italic">Belum ada ulasan yang dipublikasikan.</p>;
  }

  return (
    <div className="relative px-4 md:px-12">
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        plugins={[plugin.current]}
        className="w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent className="-ml-4">
          {testimonials.map((testi) => (
            <CarouselItem key={testi.id} className="pl-4 md:basis-1/1 lg:basis-1/2">
              <div className="h-full bg-white/10 p-6 rounded-2xl backdrop-blur border border-white/10 flex flex-col">
                <div className="flex gap-1 text-orange-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="fill-current w-5 h-5" />
                  ))}
                </div>
                <div 
                  className="text-gray-200 mb-6 italic whitespace-pre-wrap flex-grow"
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(testi.content) }}
                />
                <p className="font-semibold text-white mt-auto">- {DOMPurify.sanitize(testi.name)}</p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="bg-white/20 hover:bg-white/40 border-none text-white -left-2 md:-left-12 h-10 w-10" />
        <CarouselNext className="bg-white/20 hover:bg-white/40 border-none text-white -right-2 md:-right-12 h-10 w-10" />
      </Carousel>
    </div>
  );
}
