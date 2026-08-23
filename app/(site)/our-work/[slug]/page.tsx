import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import GalleryGrid from '@/components/GalleryGrid';
import { getCategoryBySlug, getAllCategoriesRaw } from '@/lib/gallery';
import { serviceCategories } from '@/lib/config';

export async function generateStaticParams() {
  return serviceCategories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const category = await getCategoryBySlug(params.slug);
  if (!category) return {};
  return {
    title: category.name,
    description: category.description || `${category.name} project gallery.`,
    alternates: { canonical: `/our-work/${category.slug}` },
  };
}

export default async function GalleryCategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const category = await getCategoryBySlug(params.slug);
  if (!category) notFound();

  return (
    <>
      <section className="bg-ink py-14 md:py-20">
        <div className="container-edge">
          <Link
            href="/our-work"
            className="mb-5 inline-flex items-center gap-1.5 text-sm font-medium text-white/50 hover:text-white"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Our Work
          </Link>
          <h1 className="max-w-2xl font-display text-3xl font-black uppercase leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
            {category.name}
          </h1>
        </div>
      </section>

      <section className="bg-surface py-16 md:py-20">
        <div className="container-edge">
          <GalleryGrid images={category.gallery_images} categoryName={category.name} />
        </div>
      </section>
    </>
  );
}
