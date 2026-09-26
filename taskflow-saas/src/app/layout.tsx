import type { Metadata } from 'next';
import { Fraunces, Inter } from 'next/font/google';
import './globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'TaskFlow — Your work, finally in flow',
  description:
    'TaskFlow is the simple, private task app that turns scattered to-dos into a focused plan. Try the live demo, no account needed.',
  openGraph: {
    title: 'TaskFlow — Your work, finally in flow',
    description:
      'TaskFlow is the simple, private task app that turns scattered to-dos into a focused plan. Try the live demo, no account needed.',
    url: 'https://taskflow.app',
    siteName: 'TaskFlow',
    type: 'website',
    images: [{ url: '/icon.svg', width: 512, height: 512, alt: 'TaskFlow' }],
  },
  twitter: {
    card: 'summary',
    title: 'TaskFlow — Your work, finally in flow',
    description:
      'TaskFlow is the simple, private task app that turns scattered to-dos into a focused plan. Try the live demo, no account needed.',
  },
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="bg-bg-primary font-body text-text-primary antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:rounded-md focus:bg-brand-600 focus:px-md focus:py-sm focus:text-white"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}