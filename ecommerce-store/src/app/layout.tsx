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
  metadataBase: new URL('https://ecommerce-store-five-phi.vercel.app'),
  title: {
    default: 'Northlight Goods — Home Goods, Carefully Made',
    template: '%s — Northlight Goods',
  },
  description:
    'Furniture, lighting, textiles, tableware and decor for slower, warmer homes. Free shipping on orders over $100.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ecommerce-store-five-phi.vercel.app',
    siteName: 'Northlight Goods',
    title: 'Northlight Goods — Home Goods, Carefully Made',
    description:
      'Furniture, lighting, textiles, tableware and decor for slower, warmer homes. Free shipping on orders over $100.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Northlight Goods — Home Goods, Carefully Made',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Northlight Goods — Home Goods, Carefully Made',
    description:
      'Furniture, lighting, textiles, tableware and decor for slower, warmer homes. Free shipping on orders over $100.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: '#5a4a42',
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