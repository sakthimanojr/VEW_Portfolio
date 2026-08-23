import { telHref, siteConfig } from '@/lib/config';

export default function CallButton({
  phoneIndex = 0,
  variant = 'primary',
  className = '',
  label = 'Call Now',
}: {
  phoneIndex?: number;
  variant?: 'primary' | 'outline' | 'dark';
  className?: string;
  label?: string;
}) {
  const phone = siteConfig.phones[phoneIndex];
  const styles: Record<string, string> = {
    primary: 'bg-primary text-white hover:bg-primary-light',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
    dark: 'bg-ink text-white hover:bg-primary',
  };

  return (
    <a
      href={telHref(phone)}
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3.5 font-semibold text-sm md:text-base transition-colors duration-200 min-h-[48px] ${styles[variant]} ${className}`}
      aria-label={`Call ${siteConfig.name}`}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M6.6 10.8a15.1 15.1 0 006.6 6.6l2.2-2.2a1 1 0 011-.25c1.1.37 2.3.57 3.5.57a1 1 0 011 1V20a1 1 0 01-1 1C10.4 21 3 13.6 3 4.5a1 1 0 011-1h3.5a1 1 0 011 1c0 1.2.2 2.4.57 3.5a1 1 0 01-.25 1l-2.22 2.3z"
          fill="currentColor"
        />
      </svg>
      {label}
    </a>
  );
}
