'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/components/cart/cart-provider';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Shop' },
  { href: '/#about', label: 'About' },
  { href: '/#contact', label: 'Contact' },
];

export default function SiteNav() {
  const pathname = usePathname();
  const { count, bump } = useCart();
  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    if (href.startsWith('/#')) return false;
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white/95 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8" aria-label="Primary">
        <Link href="/" className="flex min-h-[44px] items-center gap-2 text-lg font-semibold text-brand-800">
          <svg width="24" height="24" viewBox="0 0 24 24" className="text-brand-500" aria-hidden="true">
            <path d="M12 3a5 5 0 0 1 5 5c0 2.5-1.2 4.2-2.3 5.6-.8 1-1.7 2-1.7 2s-.9-1-1.7-2C8.2 12.2 7 10.5 7 8a5 5 0 0 1 5-5z" fill="#5a4a42" />
            <path d="M7 14a6 6 0 0 0 3 5.2A7 7 0 0 1 6 16.5 6.4 6.4 0 0 1 7 14z" fill="#c4b7ae" />
          </svg>
          Northlight Goods
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`inline-flex min-h-[44px] items-center rounded-full px-4 text-sm font-medium transition-colors ${
                isActive(link.href)
                  ? 'bg-brand-100 text-brand-800'
                  : 'text-text-secondary hover:bg-brand-50 hover:text-brand-800'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/shop"
            className="inline-flex min-h-[44px] items-center rounded-full px-4 text-sm font-medium text-brand-800 hover:bg-brand-50 md:hidden"
          >
            Shop
          </Link>
          <Link
            href="/cart"
            aria-label={`Cart with ${count} item${count === 1 ? '' : 's'}`}
            className={`relative inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full transition-colors ${
              pathname === '/cart' ? 'bg-brand-100 text-brand-800' : 'text-brand-800 hover:bg-brand-50'
            }`}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            {count > 0 && (
              <span
                key={String(bump)}
                className="cart-bump absolute -right-0.5 -top-0.5 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-brand-500 px-1 text-[11px] font-bold text-white"
                aria-hidden="true"
              >
                {count > 99 ? '99+' : count}
              </span>
            )}
          </Link>
        </div>
      </nav>
      {/* mobile nav links */}
      <div className="flex justify-start gap-1 overflow-x-auto px-4 pb-2 md:hidden" aria-label="Mobile">
        {NAV_LINKS.filter((l) => l.href !== '/').map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`inline-flex min-h-[44px] shrink-0 items-center rounded-full px-4 text-sm font-medium transition-colors ${
              isActive(link.href)
                ? 'bg-brand-100 text-brand-800'
                : 'text-text-secondary hover:bg-brand-50 hover:text-brand-800'
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </header>
  );
}