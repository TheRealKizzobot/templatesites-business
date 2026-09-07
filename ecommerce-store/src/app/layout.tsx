import type { Metadata, Viewport } from 'next';
import { Fraunces, Inter } from 'next/font/google';
import './globals.css';
import SiteChrome from '@/components/site/chrome';
import { CartProvider } from '@/components/cart/cart-provider';

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
    default: 'Northlight Goods — Home Goods, Carefully Made',
    template: '%s — Northlight Goods',
  },
  description:
    'Furniture, lighting, textiles, tableware and decor for slower, warmer homes. Free shipping on orders over $100.',
};

export const viewport: Viewport = {
  themeColor: '#2c2521',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-brand-800 focus:px-4 focus:py-2 focus:text-brand-50"
        >
          Skip to content
        </a>
        <CartProvider>
          <SiteChrome>{children}</SiteChrome>
        </CartProvider>
      </body>
    </html>
  );
}