import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import PlaceholderImage from '@/components/PlaceholderImage';
import ContactCTA from '@/components/ContactCTA';
import Reveal from '@/components/Reveal';
import { getCategoriesWithCover } from '@/lib/gallery';
import { serviceCategories } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Industrial & structural fabrication, residential & architectural work, custom fabrication, MS/SS/GI fabrication, and installation & erection services in Coimbatore.',
  alternates: { canonical: '/services' },
};

export default async function ServicesPage() {
  const categories = await getCategoriesWithCover();

  return (
    <>
      <section className="bg-ink py-16 md:py-24">
        <div className="container-edge">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary-light">
            Services
          </p>
          <h1 className="mt-3 max-w-2xl font-display text-4xl font-black uppercase leading-tight tracking-tight text-white sm:text-5xl">
            Fabrication Services Built For Every Job
          </h1>
          <p className="mt-5 max-w-xl text-base text-white/60">
            Five focused service categories covering industrial, residential and custom
            fabrication in MS, SS and GI — from first cut to final installation.
          </p>
        </div>
      </section>

      <section className="bg-surface py-20 md:py-28">
        <div className="container-edge space-y-8">
          {serviceCategories.map((service, i) => {
            const cat = categories.find((c) => c.slug === service.slug);
            const isEven = i % 2 === 0;
            return (
              <Reveal key={service.slug}>
                <div
                  className={`grid grid-cols-1 items-center gap-0 overflow-hidden rounded-2xl border border-black/8 bg-white lg:grid-cols-2 ${
                    isEven ? '' : 'lg:[direction:rtl]'
                  }`}
                >
                  <div className="relative aspect-[16/10] w-full lg:[direction:ltr]">
                    {cat?.cover_image ? (
                      <Image
                        src={cat.cover_image.image_url}
                        alt={`${service.name} — cover image`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover"
                      />
                    ) : (
                      <PlaceholderImage label={service.name} />
                    )}
                  </div>
                  <div className="p-8 lg:p-12 lg:[direction:ltr]">
                    <h2 className="font-display text-2xl font-black uppercase tracking-tight text-ink sm:text-3xl">
                      {service.name}
                    </h2>
                    <p className="mt-4 text-base leading-relaxed text-ink/65">
                      {service.description}
                    </p>
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {service.items.map((item) => (
                        <li
                          key={item}
                          className="rounded-full border border-black/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-ink/60"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={`/our-work/${service.slug}`}
                      className="mt-7 inline-flex min-h-[48px] items-center justify-center rounded-lg bg-primary px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary-light"
                    >
                      View Work
                    </Link>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
