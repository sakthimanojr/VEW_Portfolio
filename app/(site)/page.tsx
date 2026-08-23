import Link from 'next/link';
import Image from 'next/image';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import ServiceCard from '@/components/ServiceCard';
import CategoryCard from '@/components/CategoryCard';
import ContactCTA from '@/components/ContactCTA';
import PlaceholderImage from '@/components/PlaceholderImage';
import Reveal from '@/components/Reveal';
import { getCategoriesWithCover } from '@/lib/gallery';
import { serviceCategories, whyChooseUs, siteConfig } from '@/lib/config';

export default async function HomePage() {
  const categories = await getCategoriesWithCover();
  const heroImage = categories.find((c) => c.cover_image)?.cover_image || null;

  return (
    <>
      <Hero heroImage={heroImage} />

      <Stats />

      {/* What We Build */}
      <section className="bg-surface py-20 md:py-28">
        <div className="container-edge">
          <Reveal className="max-w-xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              What We Build
            </p>
            <h2 className="mt-3 font-display text-3xl font-black uppercase tracking-tight text-ink sm:text-4xl">
              Fabrication Across Every Requirement
            </h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {serviceCategories.map((service, i) => (
              <Reveal key={service.slug} delay={i * 60}>
                <ServiceCard service={service} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* About preview */}
      <section className="bg-white py-20 md:py-28">
        <div className="container-edge grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <Reveal className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-black/8">
            {categories[0]?.cover_image ? (
              <Image
                src={categories[0].cover_image.image_url}
                alt="Vinayaga Engineering Works fabrication project"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            ) : (
              <PlaceholderImage label="Our Workshop" />
            )}
          </Reveal>
          <Reveal delay={100}>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">About Us</p>
            <h2 className="mt-3 font-display text-3xl font-black uppercase tracking-tight text-ink sm:text-4xl">
              Coimbatore&rsquo;s Trusted Fabrication Partner
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ink/65">
              {siteConfig.name} is a Coimbatore-based fabrication company serving Coimbatore and
              nearby districts with reliable fabrication and structural solutions. With{' '}
              {siteConfig.stats.years} years of experience and {siteConfig.stats.projects}{' '}
              completed projects, we work with MS, SS and GI to deliver fabrication for
              industrial, commercial and residential requirements.
            </p>
            <Link
              href="/about"
              className="mt-7 inline-flex min-h-[48px] items-center justify-center rounded-lg bg-primary px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary-light"
            >
              About Us
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Featured Work */}
      <section className="bg-surface py-20 md:py-28">
        <div className="container-edge">
          <Reveal className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                Featured Work
              </p>
              <h2 className="mt-3 font-display text-3xl font-black uppercase tracking-tight text-ink sm:text-4xl">
                A Look At Our Projects
              </h2>
            </div>
            <Link
              href="/our-work"
              className="text-sm font-semibold text-primary hover:underline"
            >
              View All Work →
            </Link>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat, i) => (
              <Reveal key={cat.id} delay={i * 60}>
                <CategoryCard category={cat} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="why-us" className="bg-ink py-20 md:py-28">
        <div className="container-edge">
          <Reveal className="max-w-xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary-light">
              Why Choose Us
            </p>
            <h2 className="mt-3 font-display text-3xl font-black uppercase tracking-tight text-white sm:text-4xl">
              Workmanship You Can Rely On
            </h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {whyChooseUs.map((item, i) => (
              <Reveal
                key={item}
                delay={i * 50}
                className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.03] px-5 py-4"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary-light">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="text-sm font-medium text-white/85">{item}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
