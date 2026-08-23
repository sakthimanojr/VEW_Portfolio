import Link from 'next/link';
import { siteConfig } from '@/lib/config';

export default function Hero({ heroImage: _heroImage }: { heroImage: unknown }) {
  return (
    <section className="relative overflow-hidden bg-ink">

      {/* ── Video background ── */}
      <video
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        src="/welder_working.mp4"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
        style={{ opacity: 0.35 }}
      />

      {/* ── Dark gradient overlay for readability ── */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.30) 50%, rgba(10,10,10,0.75) 100%)',
        }}
        aria-hidden="true"
      />

      {/* ── Ambient glow ── */}
      <div
        className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-primary/20 blur-[130px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-40 bottom-0 h-[400px] w-[400px] rounded-full bg-primary/10 blur-[120px]"
        aria-hidden="true"
      />


      {/* ── Hero content ── */}
      <div className="container-edge relative flex flex-col items-center py-28 md:py-40 lg:py-52 text-center">
        <div className="animate-fadeUp max-w-3xl">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary-light/40 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-primary-light backdrop-blur-sm">
            Fabrication · Coimbatore
          </p>
          <h1 className="font-display text-4xl font-black uppercase leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-7xl">
            We Build
            <br />
            With <span className="text-primary-light">Strength.</span>
          </h1>
          <p className="mt-6 mx-auto max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
            Industrial, commercial and residential fabrication solutions — from structural steel
            and sheds to custom fabrication, pergolas and rooftop sit-outs.
          </p>
          <p className="mt-5 text-sm font-semibold uppercase tracking-[0.15em] text-white/80">
            {siteConfig.stats.years} Years Experience &nbsp;•&nbsp; {siteConfig.stats.projects} Projects Completed
          </p>

          <div className="mt-10 flex flex-col gap-3.5 items-center sm:flex-row sm:justify-center">
            <Link
              href="/our-work"
              className="inline-flex min-h-[52px] items-center justify-center rounded-lg bg-primary px-9 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition-all hover:bg-primary-light hover:shadow-primary/50 sm:text-base"
            >
              Explore Our Work
            </Link>
            <Link
              href="/contact"
              className="inline-flex min-h-[52px] items-center justify-center rounded-lg border-2 border-white/30 px-9 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:border-white hover:bg-white/10 sm:text-base"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
