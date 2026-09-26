import type { Metadata, Viewport } from 'next';
import { Fraunces, Inter } from 'next/font/google';
import './globals.css';
import SiteNav from '@/components/site/nav';
import SiteFooter from '@/components/site/footer';
import { SettingsProvider } from '@/components/site/settings-context';

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
  title: {
    default: 'Metrics — Content Analytics',
    template: '%s — Metrics',
  },
  description:
    'A TweetDeck-style content analytics dashboard: live metric cards, a polling feed of content items, trending topics, and 7-day charts.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://dkservers.space',
    siteName: 'Metrics',
    title: 'Metrics — Content Analytics',
    description:
      'A TweetDeck-style content analytics dashboard: live metric cards, a polling feed of content items, trending topics, and 7-day charts.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Metrics Analytics Dashboard',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Metrics — Content Analytics',
    description:
      'A TweetDeck-style content analytics dashboard: live metric cards, a polling feed of content items, trending topics, and 7-day charts.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
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
};

export const viewport: Viewport = {
  themeColor: 'var(--brand-800)',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`} suppressHydrationWarning>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-brand-800 focus:px-4 focus:py-2 focus:text-brand-50"
        >
          Skip to content
        </a>
        <SettingsProvider>
          <SiteNav />
          <main id="main" className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
            {children}
          </main>
          <SiteFooter />
        </SettingsProvider>
      </body>
    </html>
  );
}