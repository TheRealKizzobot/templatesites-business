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
};

export const viewport: Viewport = {
  themeColor: '#2c2521',
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