import Link from 'next/link';

const TEMPLATE_LINKS = [
  { label: 'Ember & Wood', href: 'https://restaurant-site-tawny.vercel.app', desc: 'Restaurant & dining' },
  { label: 'TaskFlow', href: 'https://taskflow-saas-lac.vercel.app', desc: 'SaaS dashboard' },
  { label: 'Book & Dine', href: 'https://booking-system-olive-eight.vercel.app', desc: 'Reservation system' },
  { label: 'Northlight Goods', href: 'https://ecommerce-store-five-phi.vercel.app', desc: 'E-commerce store' },
  { label: 'Metrics', href: 'https://analytics-dashboard-five-kohl.vercel.app', desc: 'Analytics dashboard' },
];

const SOCIAL_LINKS = [
  {
    label: 'GitHub',
    href: 'https://github.com/TheRealKizzobot',
    path: 'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.578 9.578 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z',
  },
  {
    label: 'X (Twitter)',
    href: 'https://x.com/dkservers',
    path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/danielkingston',
    path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-bg-primary" aria-label="Site footer">
      <div className="container-page py-16 sm:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              href="#top"
              className="inline-flex items-center gap-2 text-text-primary transition-colors hover:text-brand-dark"
            >
              <svg viewBox="0 0 28 28" className="size-6" aria-hidden="true">
                <rect x="2" y="2" width="10" height="10" rx="2.5" fill="currentColor" opacity="0.9" />
                <rect x="16" y="2" width="10" height="10" rx="2.5" fill="currentColor" opacity="0.5" />
                <rect x="2" y="16" width="10" height="10" rx="2.5" fill="currentColor" opacity="0.5" />
                <rect x="16" y="16" width="10" height="10" rx="2.5" fill="currentColor" opacity="0.25" />
              </svg>
              <span className="font-display text-lg font-semibold tracking-tight">
                Moshine<span className="text-brand">Sites</span>
              </span>
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-text-secondary">
              Production-ready website templates and custom development for small businesses.
              Clean code, fast sites, no bloat.
            </p>
            <div className="mt-5 flex gap-2">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex size-9 items-center justify-center rounded-full border border-border text-text-tertiary transition-all hover:border-brand/40 hover:text-brand"
                >
                  <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true" fill="currentColor">
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Templates */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-text-tertiary">
              Templates
            </h3>
            <ul className="mt-4 flex flex-col gap-2">
              {TEMPLATE_LINKS.map((t) => (
                <li key={t.label}>
                  <a
                    href={t.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between text-sm text-text-secondary transition-colors hover:text-text-primary"
                  >
                    <span>{t.label}</span>
                    <svg viewBox="0 0 16 16" className="size-3.5 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M6 3l5 5-5 5" />
                      <path d="M11 3H6v5" />
                    </svg>
                  </a>
                  <p className="text-xs text-text-tertiary">{t.desc}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-text-tertiary">
              Resources
            </h3>
            <ul className="mt-4 flex flex-col gap-2">
              {[
                { label: 'About', href: '#about' },
                { label: 'Pricing', href: '#pricing' },
                { label: 'Contact', href: '#contact' },
                { label: 'Blog', href: 'https://dkservers.space' },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary transition-colors hover:text-text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-text-tertiary">
              Legal
            </h3>
            <ul className="mt-4 flex flex-col gap-2">
              {[
                { label: 'Terms of Service', href: '/terms' },
                { label: 'Privacy Policy', href: '/privacy' },
                { label: 'Cookie Policy', href: '/cookies' },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary transition-colors hover:text-text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-xs text-text-tertiary">
              connect@dkservers.space
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border-subtle pt-8 text-xs text-text-tertiary sm:flex-row">
          <p>&copy; {currentYear} MoshineSites. All rights reserved.</p>
          <p>Built with Next.js, Tailwind & SQLite</p>
        </div>
      </div>
    </footer>
  );
}
