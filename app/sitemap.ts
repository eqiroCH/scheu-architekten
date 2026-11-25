import type { MetadataRoute } from 'next';
import { projects } from '@/lib/projects';
import { siteUrl } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, priority: 1 },
    { url: `${siteUrl}/buero`, priority: 0.8 },
    ...projects.map((p) => ({ url: `${siteUrl}/projekte/${p.slug}`, priority: 0.7 })),
    { url: `${siteUrl}/impressum`, priority: 0.2 },
  ];
}
