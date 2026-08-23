import Link from 'next/link';
import Image from 'next/image';
import PlaceholderImage from './PlaceholderImage';
import type { CategoryWithCover } from '@/types';

export default function CategoryCard({ category }: { category: CategoryWithCover }) {
  return (
    <Link
      href={`/our-work/${category.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-black/8 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-ink">
        {category.cover_image ? (
          <Image
            src={category.cover_image.image_url}
            alt={`${category.name} — cover image`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <PlaceholderImage label={category.name} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-base font-bold uppercase tracking-tight text-ink">
          {category.name}
        </h3>
        {category.description && (
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink/60">
            {category.description}
          </p>
        )}
        <span className="mt-4 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-primary">
          View Gallery
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="transition-transform group-hover:translate-x-1" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
