'use client';

import { useState } from 'react';
import Image from 'next/image';
import GalleryLightbox from './GalleryLightbox';
import type { GalleryImage } from '@/types';

export default function GalleryGrid({
  images,
  categoryName,
}: {
  images: GalleryImage[];
  categoryName: string;
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  if (images.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-black/15 bg-white/60 py-24 text-center">
        <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/8 text-primary">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
            <circle cx="8.5" cy="10" r="1.5" stroke="currentColor" strokeWidth="1.6" />
            <path d="M21 16l-5.5-5-4 4-2-2L3 18" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        </span>
        <p className="font-display text-lg font-bold uppercase tracking-tight text-ink">
          Project images coming soon
        </p>
        <p className="mt-1.5 max-w-sm text-sm text-ink/55">
          Photos for {categoryName} will appear here once uploaded.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="columns-2 gap-3 sm:columns-3 sm:gap-4 lg:columns-4 [&>*]:mb-3 sm:[&>*]:mb-4">
        {images.map((image, i) => (
          <button
            key={image.id}
            onClick={() => setActiveIndex(i)}
            className="group relative block w-full overflow-hidden rounded-lg border border-black/8 bg-ink focus-visible:outline focus-visible:outline-3 focus-visible:outline-primary"
            style={{ breakInside: 'avoid' }}
            aria-label={`Open photo ${i + 1} of ${images.length}`}
          >
            <Image
              src={image.image_url}
              alt=""
              width={image.width || 600}
              height={image.height || 800}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <span className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
          </button>
        ))}
      </div>

      {activeIndex !== null && (
        <GalleryLightbox
          images={images}
          activeIndex={activeIndex}
          onClose={() => setActiveIndex(null)}
          onNavigate={setActiveIndex}
        />
      )}
    </>
  );
}
