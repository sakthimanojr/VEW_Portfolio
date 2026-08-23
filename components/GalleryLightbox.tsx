'use client';

import { useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import type { GalleryImage } from '@/types';

export default function GalleryLightbox({
  images,
  activeIndex,
  onClose,
  onNavigate,
}: {
  images: GalleryImage[];
  activeIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const touchStartX = useRef<number | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const goNext = useCallback(
    () => onNavigate((activeIndex + 1) % images.length),
    [activeIndex, images.length, onNavigate]
  );
  const goPrev = useCallback(
    () => onNavigate((activeIndex - 1 + images.length) % images.length),
    [activeIndex, images.length, onNavigate]
  );

  useEffect(() => {
    closeBtnRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose, goNext, goPrev]);

  const image = images[activeIndex];
  if (!image) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 animate-fadeIn"
      onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return;
        const delta = e.changedTouches[0].clientX - touchStartX.current;
        if (delta > 50) goPrev();
        if (delta < -50) goNext();
        touchStartX.current = null;
      }}
    >
      <button
        ref={closeBtnRef}
        onClick={onClose}
        aria-label="Close image viewer"
        className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>

      {images.length > 1 && (
        <>
          <button
            onClick={goPrev}
            aria-label="Previous image"
            className="absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 md:left-6"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={goNext}
            aria-label="Next image"
            className="absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 md:right-6"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </>
      )}

      <div className="relative h-[80vh] w-full max-w-5xl">
        <Image
          src={image.image_url}
          alt="Project photo"
          fill
          sizes="100vw"
          className="object-contain"
          priority
        />
      </div>

      <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs font-medium tracking-wide text-white/50">
        {activeIndex + 1} / {images.length}
      </p>
    </div>
  );
}
