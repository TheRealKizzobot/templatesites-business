'use client';

import { useEffect, useRef, useState } from 'react';
import { NAV_LINKS } from '@/lib/data';

function FlameMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <defs>
        <linearGradient id="flame-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--warning)" />
          <stop offset="0.55" stopColor="var(--brand-400)" />
          <stop offset="1" stopColor="var(--brand-700)" />
        </linearGradient>
      </defs>
      <path
        d="M16 2c5.5 5.8 8.9 9.9 8.9 14.2A8.9 8.9 0 0 1 16 25.1a8.9 8.9 0 0 1-8.9-8.9C7.1 11.9 10.5 7.8 16 2Z"
        fill="url(#flame-g)"
      />
      <path
        d="M16 9c2.6 3.2 4.2 5.4 4.2 7.5A4.2 4.2 0 0 1 16 20.7a4.2 4.2 0 0 1-4.2-4.2C11.8 14.4 13.4 12.2 16 9Z"
        fill="var(--brand-900)"
        opacity="0.55"
      />
      <circle cx="13.4" cy="23.2" r="1.1" fill="var(--warning)" opacity="0.9" />
      <circle cx="17.8" cy="25" r="0.8" fill="var(--brand-300)" opacity="0.8" />
    </svg>
  );
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    const firstFocusable = drawerRef.current?.querySelector<HTMLElement>(
      'a, button',
    );
    firstFocusable?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div
        className={`transition-colors duration-300 ${
          scrolled
            ? 'border-b border-brand-900/20 bg-brand-800'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <nav
          aria-label="Primary"
          className="container-page flex h-[72px] items-center justify-between"
        >
          <a
            href="#top"
            className="flex items-center gap-sm text-brand-100 hover:text-white"
            onClick={close}
          >
            <FlameMark className="h-8 w-8" />
            <span className="font-display text-xl font-semibold tracking-tight">
              Ember & Wood
            </span>
          </a>

          <ul className="hidden items-center gap-lg md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="inline-flex min-h-[44px] items-center text-sm font-medium text-brand-100 transition-colors hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-sm">
            <a
              href="#reserve"
              className="btn btn-on-dark hidden md:inline-flex"
            >
              Reserve a Table
            </a>
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full text-brand-100 transition-colors hover:bg-white/10 md:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? (
                <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
                  <path
                    d="M18 6 6 18M6 6l12 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
                  <path
                    d="M4 7h16M4 12h16M4 17h16"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              )}
            </button>
          </div>
        </nav>
      </div>

      <div
        id="mobile-menu"
        ref={drawerRef}
        className={`md:hidden ${open ? 'block' : 'hidden'}`}
      >
        <nav
          aria-label="Mobile"
          className="border-b border-brand-900/20 bg-brand-800"
        >
          <ul className="container-page flex flex-col py-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.href} className="border-b border-white/10 last:border-0">
                <a
                  href={link.href}
                  onClick={close}
                  className="flex min-h-[52px] items-center font-display text-lg text-brand-100 hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-md">
              <a
                href="#reserve"
                onClick={close}
                className="btn btn-on-dark w-full"
              >
                Reserve a Table
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}