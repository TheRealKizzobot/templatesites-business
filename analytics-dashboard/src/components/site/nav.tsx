'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LINKS = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/analytics', label: 'Analytics' },
  { href: '/settings', label: 'Settings' },
];

export default function SiteNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white/95 backdrop-blur dark:bg-bg-primary">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6" aria-label="Primary">
        <Link
          href="/dashboard"
          className="inline-flex min-h-[44px] items-center gap-2 rounded-full"
          aria-label="Metrics home"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-50 font-display text-sm font-bold text-brand-800 dark:bg-brand-800 dark:text-brand-50">
            M
          </span>
          <span className="font-display text-xl font-semibold tracking-tight text-text-primary">
            Metrics
          </span>
        </Link>

        <div className="flex items-center gap-1" role="list">
          {LINKS.map((link) => {
            const active = pathname === link.href || pathname.startsWith(link.href + '/');
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? 'page' : undefined}
                className={`nav-link ${active ? 'nav-link-active' : ''}`}
              >
                <span className="hidden sm:inline">{link.label}</span>
                <span className="sm:hidden">{link.label.charAt(0)}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}