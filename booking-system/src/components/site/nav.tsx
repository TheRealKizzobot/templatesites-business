'use client';

import { useEffect, useRef, useState } from 'react';

const LINKS = [
  { href: '#top', label: 'Home' },
  { href: '#menu', label: 'Menu' },
  { href: '#book', label: 'Bookings' },
  { href: '#contact', label: 'Contact' },
];

export default function SiteNav() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-brand-200/40 bg-brand-800">
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6"
      >
        <a
          href="#top"
          className="inline-flex min-h-[44px] items-center font-display text-lg font-semibold tracking-wide text-brand-50"
        >
          Ember &amp; Wood
        </a>

        <button
          ref={toggleRef}
          type="button"
          className="inline-flex min-h-[44px] items-center gap-2 rounded-full px-4 text-sm font-medium text-brand-50 hover:bg-brand-700 sm:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? 'Close' : 'Menu'}
          <svg
            aria-hidden="true"
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>

        <div className="hidden items-center gap-1 sm:flex">
          <ul className="flex items-center gap-1">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="inline-flex min-h-[44px] items-center rounded-full px-4 text-sm font-medium text-brand-100 hover:bg-brand-700 hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#book"
            className="btn ml-2 bg-brand-50 text-brand-900 hover:bg-white"
          >
            Book a table
          </a>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-brand-700 sm:hidden">
          <ul className="space-y-1 px-4 py-3">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-[44px] items-center text-brand-100 hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a
                href="#book"
                onClick={() => setOpen(false)}
                className="btn w-full bg-brand-50 text-brand-900 hover:bg-white"
              >
                Book a table
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}