import type { Metadata } from 'next';
import Image from 'next/image';
import PlaceholderImage from '@/components/PlaceholderImage';
import Stats from '@/components/Stats';
import ContactCTA from '@/components/ContactCTA';
import Reveal from '@/components/Reveal';
import { getCategoriesWithCover } from '@/lib/gallery';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    "Learn about Vinayaga Engineering Works — a Coimbatore-based fabrication company with 10+ years of experience and 500+ completed projects in MS, SS and GI.",
  alternates: { canonical: '/about' },
};

export default async function AboutPage() {
  const categories = await getCategoriesWithCover();
  const images = categories.map((c) => c.cover_image).filter(Boolean).slice(0, 2);

  return (
    <>
      <section className="bg-ink py-16 md:py-24">
        <div className="container-edge">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary-light">
            About Us
          </p>
          <h1 className="mt-3 max-w-2xl font-display text-4xl font-black uppercase leading-tight tracking-tight text-white sm:text-5xl">
            {siteConfig.tagline}
          </h1>
        </div>
      </section>

      <Stats />

      <section className="bg-white py-20 md:py-28">
        <div className="container-edge grid grid-cols-1 gap-12 lg:grid-cols-2">
          <Reveal className="space-y-5 text-base leading-relaxed text-ink/70">
            <p>
              {siteConfig.name} is a Coimbatore-based fabrication company serving Coimbatore and
              nearby districts with reliable fabrication and structural solutions. With{' '}
              {siteConfig.stats.years} years of experience and {siteConfig.stats.projects}{' '}
              completed projects, we work with MS, SS and GI to deliver fabrication for
              industrial, commercial and residential requirements.
            </p>
            <p>
              From industrial sheds and structural steel fabrication to pergolas, rooftop
              sit-outs, staircases, gates, railings and custom fabrication, our experienced
              fabricators and welders focus on strong workmanship, precise execution and durable
              results.
            </p>
            <p>
              Our goal is simple: understand the customer&rsquo;s requirement, fabricate it
              right, and deliver work built to last.
            </p>
            <p className="font-display text-xl font-bold uppercase tracking-tight text-primary">
              {siteConfig.tagline}
            </p>
          </Reveal>

          <Reveal delay={100} className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="relative aspect-[3/4] overflow-hidden rounded-xl border border-black/8 sm:mt-8">
              {images[0] ? (
                <Image
                  src={images[0]!.image_url}
                  alt="Vinayaga Engineering Works fabrication project"
                  fill
                  sizes="(max-width: 640px) 100vw, 25vw"
                  className="object-cover"
                />
              ) : (
                <PlaceholderImage label="Our Team at Work" />
              )}
            </div>
            <div className="relative aspect-[3/4] overflow-hidden rounded-xl border border-black/8">
              {images[1] ? (
                <Image
                  src={images[1]!.image_url}
                  alt="Vinayaga Engineering Works fabrication project"
                  fill
                  sizes="(max-width: 640px) 100vw, 25vw"
                  className="object-cover"
                />
              ) : (
                <PlaceholderImage label="Completed Structure" />
              )}
            </div>
          </Reveal>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
