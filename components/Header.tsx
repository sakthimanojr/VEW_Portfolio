'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { navLinks, siteConfig } from '@/lib/config';
import CallButton from './CallButton';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const nameParts = siteConfig.name.split(' ');
  const firstName = nameParts[0];
  const restName = nameParts.slice(1).join(' ');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    const sectionIds = ['home', 'about', 'services', 'our-work', 'why-us', 'contact'];
    const observers: IntersectionObserver[] = [];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: '-30% 0px -60% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setOpen(false);
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 64;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-colors duration-300 ${
        scrolled ? 'bg-ink/95 shadow-lg shadow-black/20 backdrop-blur' : 'bg-ink'
      }`}
    >
      <div className="container-edge flex h-16 items-center justify-between md:h-20">

        {/* Company branding — logo and name */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          aria-label={`${siteConfig.name} — back to top`}
          className="group flex items-center gap-2.5 leading-none"
        >
          <div className="relative h-9 w-9 flex-shrink-0 overflow-hidden rounded-md bg-white/5 p-1 transition-transform group-hover:scale-105 sm:h-10 sm:w-10">
            <Image
              src="/logo.png"
              alt={`${siteConfig.name} logo`}
              fill
              className="object-contain p-0.5"
              sizes="(max-width: 640px) 36px, 40px"
              priority
            />
          </div>
          <div className="flex flex-col gap-0.5">
            {/* Full company name — single row */}
            <span className="flex items-baseline gap-[0.3em] whitespace-nowrap">
              <span
                className="font-display text-sm font-black uppercase tracking-[0.06em] sm:text-base md:text-lg"
                style={{
                  background: 'linear-gradient(90deg, #a5b4fc 0%, #818cf8 50%, #6366f1 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {firstName}
              </span>
              <span className="font-display text-sm font-black uppercase tracking-[0.06em] text-white transition-colors group-hover:text-white/80 sm:text-base md:text-lg">
                {restName}
              </span>
            </span>

            {/* Subtle location sub-label */}
            <span className="flex items-center gap-1">
              <span className="h-px w-3 bg-indigo-400/50" />
              <span className="font-display text-[8px] font-semibold uppercase tracking-[0.28em] text-white/40 sm:text-[9px]">
                Coimbatore
              </span>
            </span>
          </div>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {navLinks.map((link) => {
            const sectionId = link.href.replace('#', '');
            const isActive = activeSection === sectionId;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`relative text-sm font-medium uppercase tracking-wide transition-colors ${
                  isActive ? 'text-white' : 'text-white/70 hover:text-white'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute -bottom-2 left-0 h-0.5 w-full bg-primary-light" />
                )}
              </a>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <CallButton variant="primary" label="Call Now" className="px-5 py-2.5" />
        </div>

        {/* Hamburger */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="flex h-11 w-11 items-center justify-center rounded-md text-white lg:hidden"
        >
          <span className="relative flex h-4 w-6 flex-col justify-between">
            <span className={`h-0.5 w-full bg-white transition-transform duration-200 ${open ? 'translate-y-[7px] rotate-45' : ''}`} />
            <span className={`h-0.5 w-full bg-white transition-opacity duration-200 ${open ? 'opacity-0' : ''}`} />
            <span className={`h-0.5 w-full bg-white transition-transform duration-200 ${open ? '-translate-y-[7px] -rotate-45' : ''}`} />
          </span>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`fixed inset-x-0 top-16 z-40 origin-top overflow-hidden bg-ink transition-[max-height] duration-300 ease-in-out lg:hidden ${
          open ? 'max-h-[calc(100vh-4rem)]' : 'max-h-0'
        }`}
      >
        <nav className="container-edge flex flex-col gap-1 py-6" aria-label="Mobile">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="rounded-md px-3 py-3.5 text-base font-medium uppercase tracking-wide text-white/85 hover:bg-white/5 hover:text-white"
            >
              {link.label}
            </a>
          ))}
          <div className="mt-4 flex flex-col gap-3">
            <CallButton variant="primary" label="Call Now" />
          </div>
        </nav>
      </div>
    </header>
  );
}
