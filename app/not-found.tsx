import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-surface px-6 text-center">
      <p className="font-display text-6xl font-black text-primary">404</p>
      <h1 className="mt-4 font-display text-2xl font-bold uppercase tracking-tight text-ink">
        Page Not Found
      </h1>
      <p className="mt-2 max-w-sm text-ink/60">
        The page you&rsquo;re looking for doesn&rsquo;t exist or may have moved.
      </p>
      <Link
        href="/"
        className="mt-7 inline-flex min-h-[48px] items-center justify-center rounded-lg bg-primary px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary-light"
      >
        Back to Home
      </Link>
    </div>
  );
}
