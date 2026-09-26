import type { Metadata } from 'next';
import { Fraunces, Inter } from 'next/font/google';
import './globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Ember & Wood — Modern American Restaurant',
  description:
    'Ember & Wood is a wood-fired modern American restaurant in Portland. Reservations, menus, gallery and hours.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://dkservers.space',
    siteName: 'Ember & Wood',
    title: 'Ember & Wood — Modern American Restaurant',
    description:
      'Ember & Wood is a wood-fired modern American restaurant in Portland. Reservations, menus, gallery and hours.',
    images: [
      {
        url: '/images/og-default.svg',
        width: 1200,
        height: 630,
        alt: 'Ember & Wood restaurant — wood-fired modern American dining',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ember & Wood — Modern American Restaurant',
    description:
      'Ember & Wood is a wood-fired modern American restaurant in Portland. Reservations, menus, gallery and hours.',
    images: ['/images/og-default.svg'],
    creator: '@dkservers',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  metadataBase: new URL('https://dkservers.space'),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-white focus:text-brand-700"
        >
          Skip to main content
        </a>
        <main id="main">{children}</main>
      </body>
    </html>
  );
}