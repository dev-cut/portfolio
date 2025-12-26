import { MetadataRoute } from 'next';
import { SITE_METADATA } from '@/lib/data/site';
import { PROJECT_DESCRIPTIONS } from '@/lib/data/projectDescriptions';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_METADATA.siteUrl;
  const lastModified = new Date().toISOString().split('T')[0];

  const projectRoutes = Object.keys(PROJECT_DESCRIPTIONS).map((id) => ({
    url: `${baseUrl}/board/${id}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/board`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...projectRoutes,
  ];
}
