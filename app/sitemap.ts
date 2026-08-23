import type { MetadataRoute } from 'next';
import { siteConfig, serviceCategories } from '@/lib/config';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ['', '/about', '/services', '/our-work', '/contact'].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: path === '' ? 1 : 0.8,
  }));

  const categoryRoutes = serviceCategories.map((c) => ({
    url: `${siteConfig.url}/our-work/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...categoryRoutes];
}
