'use client';

const LEGAL_LINKS = [
  { href: '/terms', label: 'Terms of Service' },
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/cookies', label: 'Cookie Policy' },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-brand-200/40 bg-brand-900 text-brand-100">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-lg text-brand-50">Ember & Wood</p>
          <p className="mt-2 text-sm leading-relaxed text-brand-300">
            Seasonal wood-fired cooking and natural wine, in Portland&apos;s Old Town.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-200">
            Hours
          </p>
          <ul className="mt-3 space-y-1 text-sm text-brand-300">
            <li>Monday &middot; Closed</li>
            <li>Tue &ndash; Fri &middot; 11:00 &ndash; 12:30 & 17:00 &ndash; 21:00</li>
            <li>Sat &ndash; Sun &middot; 11:00 &ndash; 12:30 & 17:00 &ndash; 21:00</li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-200">
            Find us
          </p>
          <ul className="mt-3 space-y-1 text-sm text-brand-300">
            <li>14 Mill Lane, Old Town</li>
            <li>Portland, OR 97205</li>
            <li>
              <a href="tel:+15035550142" className="hover:text-white">
                (503) 555-0142
              </a>
            </li>
            <li>
              <a href="mailto:hello@emberandwood.com" className="hover:text-white">
                hello@emberandwood.com
              </a>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-200">
            Follow
          </p>
          <ul className="mt-3 flex gap-2">
            <li>
              <a
                href="https://instagram.com/emberandwood"
                aria-label="Instagram"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full text-brand-200 transition-colors hover:bg-brand-700 hover:text-white"
              >
                <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <path d="M16 11.37a4 4 0 1 1-7.9 1.26 4 4 0 0 1 7.9-1.26Z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
            </li>
            <li>
              <a
                href="https://facebook.com/emberandwood"
                aria-label="Facebook"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full text-brand-200 transition-colors hover:bg-brand-700 hover:text-white"
              >
                <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14 9h3l-.5 2.5H14v9h-3v-9H9V9h2V7.5C11 5 12.3 4 14.6 4H17v2.5h-1.7c-.8 0-1.3.3-1.3 1.2V9Z" />
                </svg>
              </a>
            </li>
            <li>
              <a
                href="https://x.com/emberandwood"
                aria-label="X"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full text-brand-200 transition-colors hover:bg-brand-700 hover:text-white"
              >
                <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.9 2h3.7l-8.1 9.3L23.8 22h-7.5l-5.9-7.7L3.8 22H0l8.7-9.9L0 2h7.7l5.3 7L18.9 2Zm-1.3 18h2L6.5 4H4.3L17.6 20Z" />
                </svg>
              </a>
            </li>
          </ul>
          <nav aria-label="Footer" className="mt-4">
            <ul className="flex flex-wrap gap-2 text-sm">
              <li><a className="rounded-full px-3 py-2 text-brand-200 hover:text-white" href="#about">About</a></li>
              <li><a className="rounded-full px-3 py-2 text-brand-200 hover:text-white" href="#book">Book</a></li>
            </ul>
          </nav>
          <nav aria-label="Legal" className="mt-2">
            <ul className="flex flex-wrap gap-2 text-sm">
              {LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <a className="rounded-full px-3 py-2 text-brand-200 hover:text-white" href={link.href}>
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a className="rounded-full px-3 py-2 text-brand-200 hover:text-white" href="/admin">
                  Admin *
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div className="border-t border-brand-800 py-6">
        <p className="mx-auto max-w-6xl px-4 text-sm text-brand-300 sm:px-6">
          &copy; {new Date().getFullYear()} Ember & Wood.
        </p>
      </div>
    </footer>
  );
}