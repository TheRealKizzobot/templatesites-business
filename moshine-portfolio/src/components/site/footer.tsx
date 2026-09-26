const LEGAL_LINKS = [
  { href: '/terms', label: 'Terms of Service' },
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/cookies', label: 'Cookie Policy' },
];

const SOCIALS = [
  { href: 'https://x.com/dkservers', label: 'MoshineSites on X', icon: 'X' },
  { href: 'https://www.linkedin.com/in/daniel-kingston', label: 'MoshineSites on LinkedIn', icon: 'in' },
  { href: 'https://github.com/TheRealKizzobot', label: 'MoshineSites on GitHub', icon: 'GitHub' },
];

export default function Footer() {
  return (
    <footer className="border-t border-border/70 bg-bg-secondary">
      <div className="mx-auto max-w-6xl px-4 py-3xl sm:px-6 lg:px-8">
        <div className="grid gap-xl md:grid-cols-5">
          <div className="md:col-span-2">
            <a href="#top" className="inline-flex min-h-11 items-center gap-sm rounded-full pr-md" aria-label="MoshineSites — back to top">
              <span className="grid size-9 place-items-center rounded-full bg-brand-600 text-white">
                <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </span>
              <span className="font-display text-xl font-semibold tracking-tight text-text-primary">MoshineSites</span>
            </a>
            <p className="mt-md max-w-sm text-md text-text-secondary">
              Production-ready website templates and custom web development for small and local businesses.
            </p>
          </div>

          <nav aria-label="Templates">
            <h3 className="text-sm font-semibold tracking-wide text-text-primary uppercase">Templates</h3>
            <ul className="mt-md space-y-xs">
              <li><a href="https://restaurant-site-tawny.vercel.app" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center rounded-md text-md text-text-secondary transition-colors hover:text-text-primary">Ember & Wood</a></li>
              <li><a href="https://taskflow-saas-lac.vercel.app" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center rounded-md text-md text-text-secondary transition-colors hover:text-text-primary">TaskFlow</a></li>
              <li><a href="https://booking-system-olive-eight.vercel.app" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center rounded-md text-md text-text-secondary transition-colors hover:text-text-primary">Book & Dine</a></li>
              <li><a href="https://ecommerce-store-five-phi.vercel.app" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center rounded-md text-md text-text-secondary transition-colors hover:text-text-primary">Northlight Goods</a></li>
              <li><a href="https://analytics-dashboard-five-kohl.vercel.app" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center rounded-md text-md text-text-secondary transition-colors hover:text-text-primary">Metrics</a></li>
            </ul>
          </nav>

          <nav aria-label="Services">
            <h3 className="text-sm font-semibold tracking-wide text-text-primary uppercase">Services</h3>
            <ul className="mt-md space-y-xs">
              <li><a href="#contact" className="inline-flex min-h-11 items-center rounded-md text-md text-text-secondary transition-colors hover:text-text-primary">Custom Development</a></li>
              <li><a href="#contact" className="inline-flex min-h-11 items-center rounded-md text-md text-text-secondary transition-colors hover:text-text-primary">Template Customization</a></li>
              <li><a href="#contact" className="inline-flex min-h-11 items-center rounded-md text-md text-text-secondary transition-colors hover:text-text-primary">Maintenance Plans</a></li>
            </ul>
          </nav>

          <nav aria-label="Legal">
            <h3 className="text-sm font-semibold tracking-wide text-text-primary uppercase">Legal</h3>
            <ul className="mt-md space-y-xs">
              {LEGAL_LINKS.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="inline-flex min-h-11 items-center rounded-md text-md text-text-secondary transition-colors hover:text-text-primary">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-3xl flex flex-col items-center justify-between gap-lg border-t border-border/70 pt-lg sm:flex-row">
          <p className="text-sm text-text-secondary">
            Made with <a href="https://dkservers.space" className="underline hover:no-underline text-brand" target="_blank" rel="noopener noreferrer">MoshineSites</a>.
          </p>
          <ul className="flex items-center gap-xs" aria-label="Social media">
            {SOCIALS.map((social) => (
              <li key={social.label}>
                <a href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label} className="grid size-11 place-items-center rounded-full text-text-secondary transition-colors hover:bg-brand-100 hover:text-text-primary">
                  <span className="text-sm font-semibold">{social.icon}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}