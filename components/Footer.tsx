import Link from 'next/link';
import { navLinks, serviceCategories, siteConfig, telHref, mailHref } from '@/lib/config';

export default function Footer() {
  return (
    <footer className="bg-ink text-white/70">
      <div className="container-edge grid grid-cols-1 gap-10 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="mb-4 flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded bg-primary text-sm font-black text-white">
              {siteConfig.name.split(' ').map(w => w[0]).join('')}
            </span>
            <span className="font-display text-base font-bold uppercase tracking-wide text-white">
              {siteConfig.name}
            </span>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-white/60">
            Coimbatore-based fabrication company delivering industrial, commercial and residential
            fabrication solutions in MS, SS and GI — built strong, crafted right.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <a
              href={siteConfig.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 transition-colors hover:border-primary-light hover:text-white"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
                <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
                <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
              </svg>
            </a>
            <a
              href={siteConfig.socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 transition-colors hover:border-primary-light hover:text-white"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M14 8.5h2V5.5h-2c-2 0-3.3 1.4-3.3 3.4V11H8.5v3H10.7v6.5h3V14h2.2l.4-3h-2.6V9.2c0-.5.3-.7.7-.7z"
                  fill="currentColor"
                />
              </svg>
            </a>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.15em] text-white">Navigate</h3>
          <ul className="space-y-2.5 text-sm">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="transition-colors hover:text-white">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.15em] text-white">Services</h3>
          <ul className="space-y-2.5 text-sm">
            {serviceCategories.map((c) => (
              <li key={c.slug}>
                <a href="#services" className="transition-colors hover:text-white">
                  {c.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container-edge grid grid-cols-1 gap-8 border-t border-white/10 py-10 md:grid-cols-3">
        <div>
          <h4 className="mb-2 text-xs font-bold uppercase tracking-[0.15em] text-white">Address</h4>
          <p className="text-sm text-white/60">
            {siteConfig.name}
            <br />
            {siteConfig.address.line1}, {siteConfig.address.city} – {siteConfig.address.postalCode}
            <br />
            {siteConfig.address.state}, {siteConfig.address.country}
          </p>
        </div>
        <div>
          <h4 className="mb-2 text-xs font-bold uppercase tracking-[0.15em] text-white">Phone</h4>
          <p className="flex flex-col gap-1 text-sm text-white/60">
            {siteConfig.phonesDisplay.map((p, i) => (
              <a key={p} href={telHref(siteConfig.phones[i])} className="w-fit hover:text-white">
                {p}
              </a>
            ))}
          </p>
        </div>
        <div>
          <h4 className="mb-2 text-xs font-bold uppercase tracking-[0.15em] text-white">Email</h4>
          <a href={mailHref()} className="text-sm text-white/60 hover:text-white">
            {siteConfig.email}
          </a>
          <div className="mt-3">
            <a
              href={siteConfig.maps.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-primary-light hover:underline"
            >
              View on Google Maps →
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-6">
        <div className="container-edge flex flex-col items-center justify-between gap-4 sm:flex-row text-xs text-white/40">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <Link
            href="/admin/login"
            className="rounded border border-white/15 px-3 py-1.5 hover:border-white hover:text-white transition-colors"
          >
            Admin Login
          </Link>
        </div>
      </div>
    </footer>
  );
}
