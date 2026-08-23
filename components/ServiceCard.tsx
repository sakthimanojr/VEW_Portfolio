import Link from 'next/link';
import type { ServiceCategoryDef } from '@/lib/config';

const icons: Record<string, JSX.Element> = {
  'industrial-structural': (
    <path d="M4 21V9l8-5 8 5v12M9 21v-6h6v6M4 12h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  ),
  'residential-architectural': (
    <path d="M3 12h18M6 12V6a1 1 0 011-1h10a1 1 0 011 1v6M9 21v-6h6v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  ),
  'custom-fabrication': (
    <path d="M14.7 6.3l3 3-8.4 8.4-4 1 1-4 8.4-8.4zM17 4l3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  ),
  'ms-ss-gi-fabrication': (
    <path d="M4 7h16M4 12h16M4 17h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  ),
  'installation-erection': (
    <path d="M12 3v6m0 0l-4 3m4-3l4 3M6 12l-2 9h16l-2-9M6 12h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  ),
};

export default function ServiceCard({ service }: { service: ServiceCategoryDef }) {
  return (
    <Link
      href={`/our-work/${service.slug}`}
      className="group relative flex flex-col rounded-xl border border-black/8 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10"
    >
      <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/8 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          {icons[service.slug]}
        </svg>
      </span>
      <h3 className="font-display text-lg font-bold uppercase tracking-tight text-ink">
        {service.name}
      </h3>
      <p className="mt-2.5 text-sm leading-relaxed text-ink/60">{service.description}</p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
        View Work
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="transition-transform group-hover:translate-x-1" aria-hidden="true">
          <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </Link>
  );
}
