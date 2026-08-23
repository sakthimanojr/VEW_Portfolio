'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/gallery', label: 'Gallery' },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  return (
    <nav className="flex gap-1 lg:flex-col lg:gap-1.5" aria-label="Admin">
      {links.map((l) => {
        const active = pathname === l.href;
        return (
          <Link
            key={l.href}
            href={l.href}
            className={`rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
              active ? 'bg-primary text-white' : 'text-white/60 hover:bg-white/5 hover:text-white'
            }`}
          >
            {l.label}
          </Link>
        );
      })}
    </nav>
  );
}
