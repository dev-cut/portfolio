import type { Metadata } from 'next';
import Script from 'next/script';
import {
  Inter,
  Playfair_Display,
  Cormorant_Garamond,
  Noto_Sans_KR,
  Rammetto_One,
} from 'next/font/google';
import { ThemeProvider } from '@/components/ThemeProvider';
import { generateStructuredData } from '@/lib/utils/structured-data';
import './globals.scss';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const notoSansKr = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
  display: 'swap',
  variable: '--font-noto-sans-kr',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
});

const rammettoOne = Rammetto_One({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-rammetto-one',
});

// ITC Clearface와 유사한 스타일의 Google Fonts
// Cormorant Garamond는 ITC Clearface와 유사한 우아한 세리프 폰트입니다
// 웹폰트로 바로 사용 가능합니다
const clearface = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-clearface',
});

import { SITE_METADATA } from '@/lib/data/site';

export const metadata: Metadata = {
  title: SITE_METADATA.title,
  description: SITE_METADATA.description,
  keywords: SITE_METADATA.keywords,
  authors: [{ name: SITE_METADATA.author }],
  creator: SITE_METADATA.author,
  openGraph: {
    title: SITE_METADATA.title,
    description: SITE_METADATA.description,
    type: 'website',
    locale: 'ko_KR',
    siteName: 'Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_METADATA.title,
    description: SITE_METADATA.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {},
  alternates: {
    canonical: SITE_METADATA.siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = generateStructuredData([]); // Pass empty array or update utility
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';

  return (
    <html
      lang="ko"
      className={`${inter.variable} ${notoSansKr.variable} ${playfair.variable} ${clearface.variable} ${rammettoOne.variable}`}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <head>
        <link rel="canonical" href={siteUrl} />
      </head>
      <body suppressHydrationWarning>
        <a href="#main-content" className="skip-link">
          본문으로 건너뛰기
        </a>
        <Script
          id="structured-data-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData.website),
          }}
        />
        <Script
          id="structured-data-person"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData.person),
          }}
        />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
