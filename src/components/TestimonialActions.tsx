'use client';

import { useTransition } from 'react';
import { toggleTestimonialStatus, deleteTestimonialAction } from '@/app/actions/testimonials';
import { Button } from '@/components/ui/button';
import { Check, X, Trash2 } from 'lucide-react';

export function TestimonialActions({ id, isPublished }: { id: string, isPublished: boolean }) {
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    startTransition(async () => {
      await toggleTestimonialStatus(id, !isPublished);
    });
  };

  const handleDelete = () => {
    if (confirm('Yakin ingin menghapus ulasan ini?')) {
      startTransition(async () => {
        await deleteTestimonialAction(id);
      });
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button 
        variant={isPublished ? "outline" : "default"} 
        size="sm" 
        onClick={handleToggle}
        disabled={isPending}
        className={isPublished ? "text-orange-600 border-orange-600" : "bg-green-600 hover:bg-green-700"}
      >
        {isPublished ? <><X className="w-4 h-4 mr-1" /> Tarik</> : <><Check className="w-4 h-4 mr-1" /> Setujui</>}
      </Button>
      <Button 
        variant="destructive" 
        size="sm" 
        onClick={handleDelete}
        disabled={isPending}
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  );
}
