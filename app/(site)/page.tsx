import Image from 'next/image';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import ServiceCard from '@/components/ServiceCard';
import CategoryCard from '@/components/CategoryCard';
import Reveal from '@/components/Reveal';
import PlaceholderImage from '@/components/PlaceholderImage';
import CallButton from '@/components/CallButton';
import WhatsAppButton from '@/components/WhatsAppButton';
import { getCategoriesWithCover } from '@/lib/gallery';
import { serviceCategories, whyChooseUs, siteConfig, telHref, mailHref } from '@/lib/config';

export default async function HomePage() {
  const categories = await getCategoriesWithCover();
  const heroImage = categories.find((c) => c.cover_image)?.cover_image || null;
  const aboutImages = categories.map((c) => c.cover_image).filter(Boolean).slice(0, 2);

  return (
    <>
      {/* ── HERO ── */}
      <div id="home">
        <Hero heroImage={heroImage} />
      </div>

      {/* ── STATS ── */}
      <Stats />

      {/* ── ABOUT — white bg ── */}
      <section id="about" className="bg-white py-20 md:py-28 scroll-mt-20">
        <div className="container-edge grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <Reveal className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-black/8">
            {aboutImages[0] ? (
              <Image
                src={aboutImages[0]!.image_url}
                alt={`${siteConfig.name} fabrication project`}
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
              completed projects, we work with MS, SS and GI to deliver fabrication for industrial,
              commercial and residential requirements.
            </p>
            <p className="mt-4 text-base leading-relaxed text-ink/65">
              From industrial sheds and structural steel fabrication to pergolas, rooftop sit-outs,
              staircases, gates, railings and custom fabrication, our experienced fabricators and
              welders focus on strong workmanship, precise execution and durable results.
            </p>
            <p className="mt-5 font-display text-lg font-bold uppercase tracking-tight text-primary">
              {siteConfig.tagline}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── SERVICES — surface bg ── */}
      <section id="services" className="bg-surface py-20 md:py-28 scroll-mt-20">
        <div className="container-edge">
          <Reveal className="max-w-xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Our Services
            </p>
            <h2 className="mt-3 font-display text-3xl font-black uppercase tracking-tight text-ink sm:text-4xl">
              Fabrication Across Every Requirement
            </h2>
            <p className="mt-4 text-base text-ink/60">
              Five focused service categories covering industrial, residential and custom fabrication
              in MS, SS and GI — from first cut to final installation.
            </p>
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

      {/* ── OUR WORK — white bg ── */}
      <section id="our-work" className="bg-white py-20 md:py-28 scroll-mt-20">
        <div className="container-edge">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Our Work</p>
            <h2 className="mt-3 font-display text-3xl font-black uppercase tracking-tight text-ink sm:text-4xl">
              A Look At Our Projects
            </h2>
            <p className="mt-4 text-base text-ink/60">
              Browse our work across categories — click any category to view the full gallery.
            </p>
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

      {/* ── WHY CHOOSE US — dark ink bg ── */}
      <section id="why-us" className="bg-ink py-20 md:py-28 scroll-mt-20">
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

      {/* ── CONTACT — surface bg ── */}
      <section id="contact" className="bg-surface py-20 md:py-28 scroll-mt-20">
        <div className="container-edge">
          <Reveal className="max-w-xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Contact Us</p>
            <h2 className="mt-3 font-display text-3xl font-black uppercase tracking-tight text-ink sm:text-4xl">
              Let&rsquo;s Talk Fabrication.
            </h2>
            <p className="mt-4 text-base text-ink/60">
              Have a fabrication requirement? Reach us by phone, WhatsApp or visit us in Coimbatore.
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-2">
            {/* Contact details */}
            <Reveal className="space-y-5">
              <div className="flex items-start gap-4 rounded-xl border border-black/8 bg-white p-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/8 text-primary">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor"/>
                  </svg>
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-ink/50">Address</p>
                  <p className="mt-1 text-sm text-ink/70">
                    {siteConfig.name}<br />
                    {siteConfig.address.line1}, {siteConfig.address.city} – {siteConfig.address.postalCode}<br />
                    {siteConfig.address.state}, {siteConfig.address.country}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-xl border border-black/8 bg-white p-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/8 text-primary">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" fill="currentColor"/>
                  </svg>
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-ink/50">Phone</p>
                  <div className="mt-1 flex flex-col gap-1">
                    {siteConfig.phonesDisplay.map((p, i) => (
                      <a key={p} href={telHref(siteConfig.phones[i])}
                        className="text-base font-semibold text-ink hover:text-primary transition-colors">
                        {p}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-xl border border-black/8 bg-white p-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/8 text-primary">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="currentColor"/>
                  </svg>
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-ink/50">Email</p>
                  <a href={mailHref()}
                    className="mt-1 block text-sm font-medium text-ink hover:text-primary transition-colors break-all">
                    {siteConfig.email}
                  </a>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <CallButton variant="primary" label="Call Us Now" />
                <WhatsAppButton variant="primary" label="WhatsApp Us" />
                <a
                  href={siteConfig.maps.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg border-2 border-ink/15 px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-primary hover:text-primary"
                >
                  Get Directions
                </a>
              </div>
            </Reveal>

            {/* Google Maps */}
            <Reveal delay={100} className="flex flex-col gap-4">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-black/8 shadow-sm">
                <iframe
                  title={`${siteConfig.name} location on Google Maps`}
                  src={siteConfig.maps.embedUrl}
                  className="absolute inset-0 h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <p className="text-sm text-ink/50">
                📍 {siteConfig.address.line1}, {siteConfig.address.city}, {siteConfig.address.state} – {siteConfig.address.postalCode}
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
