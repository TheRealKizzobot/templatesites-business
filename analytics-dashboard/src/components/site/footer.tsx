import Link from 'next/link';

const LEGAL_LINKS = [
  { href: '/terms', label: 'Terms of Service' },
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/cookies', label: 'Cookie Policy' },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-border bg-bg-secondary dark:border-brand-700 dark:bg-brand-900/30">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 sm:px-6 md:grid-cols-3">
        <div className="md:col-span-1">
          <Link
            href="/dashboard"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-100 font-display text-sm font-bold text-brand-800 dark:bg-brand-800 dark:text-brand-50">
              M
            </span>
            <span className="font-display text-lg font-semibold tracking-tight text-text-primary">
              Metrics
            </span>
          </Link>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-text-secondary">
            A live content analytics dashboard — metric cards, polling feed, and 7-day charts.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-text-primary">
            Navigate
          </p>
          <ul className="mt-3 space-y-1 text-sm text-text-secondary">
            <li>
              <Link href="/dashboard" className="inline-flex min-h-[44px] items-center hover:text-text-primary">
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/analytics" className="inline-flex min-h-[44px] items-center hover:text-text-primary">
                Analytics
              </Link>
            </li>
            <li>
              <Link href="/settings" className="inline-flex min-h-[44px] items-center hover:text-text-primary">
                Settings
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-text-primary">
            Legal
          </p>
          <ul className="mt-3 space-y-1 text-sm text-text-secondary">
            {LEGAL_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="inline-flex min-h-[44px] items-center hover:text-text-primary">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60 dark:border-brand-700">
        <p className="mx-auto max-w-6xl px-4 py-6 text-xs text-text-secondary sm:px-6">
          Made with <a href="https://dkservers.space" className="underline hover:no-underline" style={{ color: "var(--brand)" }}>MoshineSites</a>.
        </p>
      </div>
    </footer>
  );
}