import { MetadataRoute } from 'next';
import { getEnvConfig } from '@/lib/utils/env';

export default function robots(): MetadataRoute.Robots {
  const { NEXT_PUBLIC_SITE_URL: baseUrl } = getEnvConfig();

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/check-connection/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

