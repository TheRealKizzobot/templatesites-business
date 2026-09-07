'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import type { ReactNode } from 'react';

const NAV = [
  { href: '/admin', label: 'Dashboard', icon: 'M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z' },
  { href: '/admin/orders', label: 'Orders', icon: 'M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4H6zM3 6h18M16 10a4 4 0 0 1-8 0' },
  { href: '/admin/products', label: 'Products', icon: 'M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16zM3.3 7 12 12l8.7-5M12 22V12' },
  { href: '/admin/settings', label: 'Settings', icon: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z' },
];

function NavIcon({ label, href }: { label: string; href: string }) {
  const d = NAV.find((n) => n.href === href)?.icon ?? '';
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

export default function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  // Close the drawer on navigation.
  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  // Close the drawer with Escape.
  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDrawerOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [drawerOpen]);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
    } finally {
      router.replace('/admin/login');
      router.refresh();
    }
  };

  const isActive = (href: string) =>
    href === '/admin' ? pathname === '/admin' : pathname.startsWith(href);

  const SidebarContent = (
    <nav aria-label="Admin" className="flex h-full flex-col gap-1">
      <p className="px-3 pb-4 pt-1 font-display text-xl font-semibold text-brand-800">
        Northlight
        <span className="block text-xs font-sans font-semibold uppercase tracking-[0.18em] text-text-secondary">
          Admin panel
        </span>
      </p>
      <ul className="space-y-1">
        {NAV.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={isActive(item.href) ? 'page' : undefined}
              className={`flex min-h-[44px] items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors ${
                isActive(item.href)
                  ? 'bg-brand-100 text-brand-800'
                  : 'text-text-secondary hover:bg-brand-50 hover:text-brand-800'
              }`}
            >
              <NavIcon label={item.label} href={item.href} />
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-auto">
        <button
          type="button"
          onClick={handleLogout}
          disabled={loggingOut}
          className="flex min-h-[44px] w-full items-center gap-3 rounded-lg px-3 text-sm font-medium text-text-secondary transition-colors hover:bg-error/5 hover:text-error"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
          </svg>
          {loggingOut ? 'Signing out…' : 'Log out'}
        </button>
      </div>
    </nav>
  );

  return (
    <div className="min-h-screen bg-bg-secondary">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-60 border-r border-border bg-white p-4 lg:block">
        {SidebarContent}
      </aside>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-40 lg:hidden" role="presentation">
          <div
            className="absolute inset-0 bg-brand-900/40"
            onClick={() => setDrawerOpen(false)}
            aria-hidden="true"
          />
          <div
            className="absolute inset-y-0 left-0 w-72 bg-white p-4 shadow-lift"
            role="dialog"
            aria-modal="true"
            aria-label="Admin navigation"
          >
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full text-text-secondary hover:bg-brand-50"
                aria-label="Close navigation"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            {SidebarContent}
          </div>
        </div>
      )}

      {/* Main column */}
      <div className="lg:pl-60">
        <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-border bg-white/95 px-4 backdrop-blur sm:px-6">
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full text-brand-800 hover:bg-brand-50 lg:hidden"
            aria-label="Open navigation"
            aria-expanded={drawerOpen}
            aria-controls="admin-drawer"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-lg font-semibold text-text-primary">Admin Panel</h1>
          <span className="ml-auto hidden sm:block">
            <span className="pill bg-success/10 text-success">
              <span className="h-1.5 w-1.5 rounded-full bg-success" aria-hidden="true" />
              Signed in
            </span>
          </span>
        </header>
        <main id="main" className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:py-10">
          {children}
        </main>
      </div>
    </div>
  );
}