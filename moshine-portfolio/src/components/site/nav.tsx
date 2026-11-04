'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const NAV_LINKS = [
  { href: '/', label: 'Templates' },
  { href: '/', label: 'About' },
  { href: '/', label: 'Pricing' },
  { href: '/', label: 'Contact' },
];

const TEMPLATE_LINKS = [
  { href: 'https://restaurant-site-tawny.vercel.app', label: 'Restaurant' },
  { href: 'https://taskflow-saas-lac.vercel.app', label: 'SaaS' },
  { href: 'https://booking-system-olive-eight.vercel.app', label: 'Booking' },
  { href: 'https://ecommerce-store-five-phi.vercel.app', label: 'Shop' },
  { href: 'https://analytics-dashboard-five-kohl.vercel.app', label: 'Analytics' },
];

export default function Nav() {
  const pathname = usePathname();
  // On subpages (no dark hero) or after scrolling, the nav must be solid and opaque
  // so text is always readable. On the homepage before scroll, keep it transparent
  // so it sits cleanly over the dark hero.
  const isSubpage = pathname !== '/' && !pathname.startsWith('/_next');
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const readyRef = useRef(false);
  const hasSolidBg = scrolled || isSubpage;

  useEffect(() => {
    if (readyRef.current) return;
    readyRef.current = true;
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        hasSolidBg
          ? 'bg-bg-surface backdrop-blur-lg border-b border-border shadow-soft'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <nav aria-label="Primary" className="container-page flex h-18 items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className={`flex items-center gap-2.5 transition-colors hover:text-brand ${hasSolidBg ? 'text-text-primary' : 'text-text-on-dark'}`}
          aria-label="MoshineSites — back to homepage"
        >
          {/* Geometric mark */}
          <svg viewBox="0 0 28 28" className="size-7" aria-hidden="true">
            <rect x="2" y="2" width="10" height="10" rx="2.5" fill="currentColor" opacity="0.9" />
            <rect x="16" y="2" width="10" height="10" rx="2.5" fill="currentColor" opacity="0.5" />
            <rect x="2" y="16" width="10" height="10" rx="2.5" fill="currentColor" opacity="0.5" />
            <rect x="16" y="16" width="10" height="10" rx="2.5" fill="currentColor" opacity="0.25" />
          </svg>
          <span className="font-display text-lg font-semibold tracking-tight">
            Moshine<span className="text-brand">Sites</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          <a href="/" className={`nav-link ${hasSolidBg ? 'text-text-secondary hover:text-text-primary' : 'text-text-on-dark-muted hover:text-text-on-dark'}`}>Templates</a>
          <a href="/" className={`nav-link ${hasSolidBg ? 'text-text-secondary hover:text-text-primary' : 'text-text-on-dark-muted hover:text-text-on-dark'}`}>About</a>
          <a href="/" className={`nav-link ${hasSolidBg ? 'text-text-secondary hover:text-text-primary' : 'text-text-on-dark-muted hover:text-text-on-dark'}`}>Pricing</a>
          <a href="/" className={`nav-link ${hasSolidBg ? 'text-text-secondary hover:text-text-primary' : 'text-text-on-dark-muted hover:text-text-on-dark'}`}>Contact</a>
          </div>

        {/* CTA + mobile toggle */}
        <div className="flex items-center gap-2">
          <a
            href="/#contact"
            className={`hidden min-h-11 items-center rounded-full px-5 text-sm font-medium transition-colors sm:inline-flex ${
              hasSolidBg
                ? 'bg-text-primary text-white hover:bg-brand-dark'
                : 'bg-text-on-dark/15 text-text-on-dark border border-text-on-dark/20 hover:bg-text-on-dark/25'
            }`}
          >
            Start a Project
          </a>
          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            className={`inline-flex size-11 items-center justify-center rounded-lg transition-colors hover:bg-bg-elevated md:hidden ${
              hasSolidBg
                ? 'text-text-primary'
                : 'text-text-on-dark hover:text-white'
            }`}
          >
            {mobileOpen ? (
              <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
                <path d="M18 6 6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          className="md:hidden border-b border-border bg-bg-surface"
        >
          <nav aria-label="Mobile">
            <ul className="flex flex-col py-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex min-h-12 items-center px-6 text-sm font-medium text-text-secondary hover:text-text-primary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="px-6 py-3">
                <a
                  href="/#contact"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-text-primary px-5 text-sm font-medium text-white hover:bg-brand-dark"
                >
                  Start a Project
                </a>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
