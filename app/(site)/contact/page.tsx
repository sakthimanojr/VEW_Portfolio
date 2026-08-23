import type { Metadata } from 'next';
import CallButton from '@/components/CallButton';
import WhatsAppButton from '@/components/WhatsAppButton';
import Reveal from '@/components/Reveal';
import { siteConfig, telHref, mailHref } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Contact Vinayaga Engineering Works in Kavundampalayam, Coimbatore for industrial, commercial and residential fabrication requirements.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-ink py-16 md:py-24">
        <div className="container-edge">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary-light">
            Contact
          </p>
          <h1 className="mt-3 max-w-2xl font-display text-4xl font-black uppercase leading-tight tracking-tight text-white sm:text-5xl">
            Let&rsquo;s Talk Fabrication.
          </h1>
        </div>
      </section>

      <section className="bg-surface py-20 md:py-28">
        <div className="container-edge grid grid-cols-1 gap-12 lg:grid-cols-2">
          <Reveal className="space-y-8">
            <div>
              <h2 className="font-display text-xl font-bold uppercase tracking-tight text-ink">
                {siteConfig.name}
              </h2>
              <p className="mt-2 text-base text-ink/65">
                {siteConfig.address.line1}, {siteConfig.address.city} –{' '}
                {siteConfig.address.postalCode}
                <br />
                {siteConfig.address.state}, {siteConfig.address.country}
              </p>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-ink/50">
                Phone
              </h3>
              <div className="mt-2 flex flex-col gap-1">
                {siteConfig.phonesDisplay.map((p, i) => (
                  <a
                    key={p}
                    href={telHref(siteConfig.phones[i])}
                    className="w-fit text-base font-medium text-ink hover:text-primary"
                  >
                    {p}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-ink/50">
                Email
              </h3>
              <a
                href={mailHref()}
                className="mt-2 block w-fit text-base font-medium text-ink hover:text-primary"
              >
                {siteConfig.email}
              </a>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <CallButton variant="primary" label="Call" />
              <WhatsAppButton variant="primary" label="WhatsApp" />
              <a
                href={mailHref()}
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg border-2 border-primary px-6 py-3.5 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white md:text-base"
              >
                Email
              </a>
              <a
                href={siteConfig.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg border-2 border-ink/15 px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-ink md:text-base"
              >
                Instagram
              </a>
              <a
                href={siteConfig.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg border-2 border-ink/15 px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-ink md:text-base"
              >
                Facebook
              </a>
            </div>
          </Reveal>

          <Reveal delay={100} className="flex flex-col gap-5">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-black/8">
              <iframe
                title={`${siteConfig.name} location on Google Maps`}
                src={siteConfig.maps.embedUrl}
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <a
              href={siteConfig.maps.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] w-fit items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary-light"
            >
              Open in Google Maps
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
