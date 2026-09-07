'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { CloseIcon, LogoMark, MenuIcon } from '@/components/icons';

const NAV_LINKS = [
  { href: '#features', label: 'Features' },
  { href: '#demo', label: 'Demo' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#testimonials', label: 'Testimonials' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-bg-primary/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-md px-4 sm:px-6 lg:px-8">
        <a
          href="#top"
          className="group inline-flex min-h-11 items-center gap-sm rounded-full pr-md"
          aria-label="TaskFlow — back to top"
        >
          <span className="grid size-9 place-items-center rounded-full bg-brand-600 text-white transition-colors group-hover:bg-brand-700">
            <LogoMark className="size-5" />
          </span>
          <span className="font-display text-xl font-semibold tracking-tight text-text-primary">
            TaskFlow
          </span>
        </a>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-xs">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="inline-flex min-h-11 items-center rounded-full px-md text-md text-text-secondary transition-colors hover:bg-brand-100 hover:text-text-primary"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-sm">
          <a
            href="#cta"
            className="hidden min-h-11 items-center rounded-full bg-brand-600 px-lg text-sm font-medium text-white shadow-soft transition-colors hover:bg-brand-700 sm:inline-flex"
          >
            Start Free
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
            className="grid size-11 place-items-center rounded-md text-text-primary hover:bg-brand-100 md:hidden"
          >
            {open ? <CloseIcon className="size-5" /> : <MenuIcon className="size-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Primary"
            initial={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, height: 'auto' }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={reduce ? { duration: 0.01 } : { duration: 0.25, ease: 'easeOut' }}
            className="overflow-hidden border-t border-border/70 bg-bg-primary/95 backdrop-blur-md md:hidden"
          >
            <ul className="space-y-xs px-4 py-lg sm:px-6 lg:px-8">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex min-h-11 items-center rounded-md px-md text-md text-text-secondary hover:bg-brand-100 hover:text-text-primary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#cta"
                  onClick={() => setOpen(false)}
                  className="mt-sm flex min-h-11 items-center justify-center rounded-full bg-brand-600 px-lg text-sm font-medium text-white shadow-soft hover:bg-brand-700"
                >
                  Start Free
                </a>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}