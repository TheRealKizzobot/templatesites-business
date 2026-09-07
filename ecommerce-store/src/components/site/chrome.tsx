'use client';

import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import SiteNav from '@/components/site/nav';
import SiteFooter from '@/components/site/footer';

/**
 * Hides the store chrome (nav + footer) on /admin routes so the admin panel
 * renders as its own focused shell.
 */
export default function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  if (isAdmin) return <>{children}</>;

  return (
    <>
      <SiteNav />
      {children}
      <SiteFooter />
    </>
  );
}