import type { Metadata } from 'next';
import { Archivo, Inter } from 'next/font/google';
import './globals.css';
import { siteConfig } from '@/lib/config';

const archivo = Archivo({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['500', '700', '800', '900'],
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Fabrication & Structural Works in Coimbatore`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: `${siteConfig.name} | Fabrication & Structural Works in Coimbatore`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: 'en_IN',
    type: 'website',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} | Fabrication & Structural Works in Coimbatore`,
    description: siteConfig.description,
  },
  alternates: { canonical: '/' },
  icons: { icon: '/favicon.ico' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: siteConfig.name,
  description: siteConfig.description,
  address: {
    '@type': 'PostalAddress',
    streetAddress: siteConfig.address.line1,
    addressLocality: siteConfig.address.city,
    postalCode: siteConfig.address.postalCode,
    addressRegion: siteConfig.address.state,
    addressCountry: 'IN',
  },
  telephone: siteConfig.phonesDisplay[0],
  email: siteConfig.email,
  url: siteConfig.url,
  sameAs: [siteConfig.socials.instagram, siteConfig.socials.facebook].filter(
    (u) => u && u !== '#'
  ),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${inter.variable}`}>
      <body className="font-body antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[200] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
