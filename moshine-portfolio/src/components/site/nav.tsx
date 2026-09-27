'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const NAV_LINKS = [
  { href: '#templates', label: 'Templates' },
  { href: '#about', label: 'About' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#contact', label: 'Contact' },
];

const TEMPLATE_LINKS = [
  { href: 'https://restaurant-site-tawny.vercel.app', label: 'Restaurant' },
  { href: 'https://taskflow-saas-lac.vercel.app', label: 'SaaS' },
  { href: 'https://booking-system-olive-eight.vercel.app', label: 'Booking' },
  { href: 'https://ecommerce-store-five-phi.vercel.app', label: 'Shop' },
  { href: 'https://analytics-dashboard-five-kohl.vercel.app', label: 'Analytics' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
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
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-bg-surface/90 backdrop-blur-lg border-b border-border shadow-soft'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <nav aria-label="Primary" className="container-page flex h-18 items-center justify-between">
        {/* Logo */}
        <Link
          href="#top"
          className="flex items-center gap-2.5 text-text-primary transition-colors hover:text-brand-dark"
          aria-label="MoshineSites — back to top"
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
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="nav-link"
            >
              {link.label}
            </Link>
          ))}
          <span className="mx-1 h-4 w-px bg-border" />
          <a
            href="https://dkservers.space"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link"
          >
            Blog
          </a>
        </div>

        {/* CTA + mobile toggle */}
        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="hidden min-h-11 items-center rounded-full bg-text-primary px-5 text-sm font-medium text-white transition-colors hover:bg-brand-dark sm:inline-flex"
          >
            Start a Project
          </a>
          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            className="inline-flex size-11 items-center justify-center rounded-lg text-text-primary hover:bg-bg-elevated md:hidden"
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
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex min-h-12 items-center px-6 text-sm font-medium text-text-secondary hover:text-text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="px-6 py-3">
                <a
                  href="#contact"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-text-primary px-5 text-sm font-medium text-white"
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
