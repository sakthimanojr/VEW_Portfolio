// Clearly labeled placeholder used until the owner uploads real project
// photos via the admin dashboard. Never presented as an actual project photo.
export default function PlaceholderImage({
  label,
  className = '',
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`relative flex h-full w-full items-center justify-center overflow-hidden bg-ink ${className}`}
      role="img"
      aria-label={`Placeholder image for ${label}`}
    >
      <svg
        className="absolute inset-0 h-full w-full opacity-25"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <pattern id={`stripes-${label.replace(/\s+/g, '')}`} width="18" height="18" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="0" y2="18" stroke="#3A26B0" strokeWidth="6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#stripes-${label.replace(/\s+/g, '')})`} />
      </svg>
      <div className="relative z-10 flex flex-col items-center gap-2 px-4 text-center">
        <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white/70">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="8.5" cy="10" r="1.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M21 16l-5.5-5-4 4-2-2L3 18" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </span>
        <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/60">
          Photos coming soon
        </p>
        <p className="font-display text-sm font-bold uppercase tracking-wide text-white/90">
          {label}
        </p>
      </div>
    </div>
  );
}
