import type { Metadata } from 'next';
import CategoryCard from '@/components/CategoryCard';
import ContactCTA from '@/components/ContactCTA';
import Reveal from '@/components/Reveal';
import { getCategoriesWithCover } from '@/lib/gallery';

export const metadata: Metadata = {
  title: 'Our Work',
  description:
    'Browse fabrication project photos from Vinayaga Engineering Works across industrial, residential, custom, MS/SS/GI and installation categories.',
  alternates: { canonical: '/our-work' },
};

export default async function OurWorkPage() {
  const categories = await getCategoriesWithCover();

  return (
    <>
      <section className="bg-ink py-16 md:py-24">
        <div className="container-edge">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary-light">
            Our Work
          </p>
          <h1 className="mt-3 max-w-2xl font-display text-4xl font-black uppercase leading-tight tracking-tight text-white sm:text-5xl">
            Photos From The Field
          </h1>
          <p className="mt-5 max-w-xl text-base text-white/60">
            Select a category to view the full photo gallery.
          </p>
        </div>
      </section>

      <section className="bg-surface py-20 md:py-28">
        <div className="container-edge grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, i) => (
            <Reveal key={cat.id} delay={i * 60}>
              <CategoryCard category={cat} />
            </Reveal>
          ))}
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
