'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminSettingsPage() {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
    } finally {
      router.replace('/admin/login');
      router.refresh();
    }
  };

  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-semibold text-text-primary">Settings</h2>
      <p className="mt-1 text-sm text-text-secondary">
        Account and store configuration for the Northlight Goods admin panel.
      </p>

      <section className="mt-8 rounded-xl border border-border bg-white p-6 shadow-soft" aria-labelledby="account-heading">
        <h3 id="account-heading" className="text-xl font-semibold text-text-primary">
          Admin account
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-text-secondary">
          The admin password is configured through the <code className="rounded bg-bg-secondary px-1.5 py-0.5 text-xs">ADMIN_PASSWORD</code>{' '}
          environment variable (see <code className="rounded bg-bg-secondary px-1.5 py-0.5 text-xs">.env.example</code>).
          The default for local development is{' '}
          <code className="rounded bg-bg-secondary px-1.5 py-0.5 text-xs">admin123</code>. Change it before deploying.
        </p>
        <button
          type="button"
          className="btn btn-danger mt-5"
          onClick={handleLogout}
          disabled={loggingOut}
        >
          {loggingOut ? 'Signing out…' : 'Log out'}
        </button>
      </section>

      <section className="mt-6 rounded-xl border border-border bg-white p-6 shadow-soft" aria-labelledby="store-heading">
        <h3 id="store-heading" className="text-xl font-semibold text-text-primary">
          Store defaults
        </h3>
        <dl className="mt-4 space-y-3 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-text-secondary">Shipping</dt>
            <dd className="text-right font-medium">
              Free over $100, otherwise flat $8.00
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-text-secondary">Tax</dt>
            <dd className="font-medium">8.5%</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-text-secondary">Order statuses</dt>
            <dd className="font-medium">placed, shipped, cancelled</dd>
          </div>
        </dl>
        <p className="mt-4 text-xs text-text-secondary">
          Pricing rules are defined once in <code className="rounded bg-bg-secondary px-1.5 py-0.5">lib/format.ts</code> and
          shared by the storefront and the server — the totals always match.
        </p>
      </section>
    </div>
  );
}