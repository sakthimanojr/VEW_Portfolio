'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { navLinks, siteConfig } from '@/lib/config';
import CallButton from './CallButton';

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-colors duration-300 ${
        scrolled ? 'bg-ink/95 shadow-lg shadow-black/20 backdrop-blur' : 'bg-ink'
      }`}
    >
      <div className="container-edge flex h-16 items-center justify-between md:h-20">
        <Link href="/" className="flex items-center" aria-label={`${siteConfig.name} home`}>
          <Image
            src="/logo.png"
            alt="Vinayaga Engineering Works Logo"
            width={160}
            height={64}
            className="h-12 w-auto object-contain md:h-14"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-sm font-medium uppercase tracking-wide transition-colors ${
                  isActive ? 'text-white' : 'text-white/70 hover:text-white'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute -bottom-2 left-0 h-0.5 w-full bg-primary-light" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <CallButton variant="primary" label="Call Now" className="px-5 py-2.5" />
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="flex h-11 w-11 items-center justify-center rounded-md text-white lg:hidden"
        >
          <span className="relative flex h-4 w-6 flex-col justify-between">
            <span
              className={`h-0.5 w-full bg-white transition-transform duration-200 ${
                open ? 'translate-y-[7px] rotate-45' : ''
              }`}
            />
            <span
              className={`h-0.5 w-full bg-white transition-opacity duration-200 ${
                open ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`h-0.5 w-full bg-white transition-transform duration-200 ${
                open ? '-translate-y-[7px] -rotate-45' : ''
              }`}
            />
          </span>
        </button>
      </div>

      <div
        id="mobile-menu"
        className={`fixed inset-x-0 top-16 z-40 origin-top overflow-hidden bg-ink transition-[max-height] duration-300 ease-in-out lg:hidden ${
          open ? 'max-h-[calc(100vh-4rem)]' : 'max-h-0'
        }`}
      >
        <nav className="container-edge flex flex-col gap-1 py-6" aria-label="Mobile">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-3.5 text-base font-medium uppercase tracking-wide text-white/85 hover:bg-white/5 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-4 flex flex-col gap-3">
            <CallButton variant="primary" label="Call Now" />
          </div>
        </nav>
      </div>
    </header>
  );
}
