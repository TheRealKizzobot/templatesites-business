import { NAV_LINKS, RESTAURANT } from '@/lib/data';

function SocialLinks() {
  const socials = [
    {
      label: 'Ember and Wood on Instagram',
      href: '#gallery',
      path: (
        <path
          d="M12 8.4A3.6 3.6 0 1 0 12 15.6 3.6 3.6 0 0 0 12 8.4Zm0 5.9a2.3 2.3 0 1 1 0-4.6 2.3 2.3 0 0 1 0 4.6ZM16.9 7.2a.9.9 0 1 1-.9-.9.9.9 0 0 1 .9.9ZM19 8.7a4 4 0 0 0-2.4-2.4C15.3 5.8 14.8 5.7 12 5.7s-3.3.1-4.6.6A4 4 0 0 0 5 8.7c-.5 1.3-.6 1.8-.6 4.6s.1 3.3.6 4.6a4 4 0 0 0 2.4 2.4c1.3.5 1.8.6 4.6.6s3.3-.1 4.6-.6a4 4 0 0 0 2.4-2.4c.5-1.3.6-1.8.6-4.6s-.1-3.3-.6-4.6ZM17 17a2.4 2.4 0 0 1-1.4 1.4c-.9.34-1.2.4-3.6.4s-2.7-.06-3.6-.4A2.4 2.4 0 0 1 7 17c-.34-.9-.4-1.2-.4-3.6s.06-2.7.4-3.6A2.4 2.4 0 0 1 8.4 8.4c.9-.34 1.2-.4 3.6-.4s2.7.06 3.6.4A2.4 2.4 0 0 1 17 8.4c.34.9.4 1.2.4 3.6s-.06 2.7-.4 3.6Z"
          fill="currentColor"
        />
      ),
    },
    {
      label: 'Ember and Wood on Facebook',
      href: '#about',
      path: (
        <path
          d="M14.3 13.4h2.2l.5-2.4h-2.7V9.3c0-.7.3-1.4 1.4-1.4h1.1V5.7s-1-.2-2-.2c-2 0-3.4 1.2-3.4 3.5v2H8.8v2.4h2.6v5.6h2.9v-5.6Z"
          fill="currentColor"
        />
      ),
    },
    {
      label: 'Ember and Wood on X',
      href: '#testimonials',
      path: (
        <path
          d="M17.6 5h2l-4.4 5 5.2 6.9h-4.1l-3.2-4.2-3.7 4.2H6.4l4.7-5.4L6 5h4.2l2.9 3.8L17.6 5Zm-.7 10.9h1.1L9.4 6.1H8.2l8.7 9.8Z"
          fill="currentColor"
        />
      ),
    },
  ];

  return (
    <ul className="mt-xl flex gap-md">
      {socials.map((social) => (
        <li key={social.label}>
          <a
            href={social.href}
            aria-label={social.label}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-100 text-brand-600 transition-colors hover:bg-brand-200 hover:text-brand-800"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
              {social.path}
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}

export default function Footer() {
  const LEGAL_LINKS = [
    { href: '/terms', label: 'Terms of Service' },
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/cookies', label: 'Cookie Policy' },
  ];

  return (
    <footer className="bg-brand-900 text-brand-100" aria-label="Site footer">
      <div className="container-page py-2xl sm:py-3xl">
        <div className="grid gap-xl sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-display text-2xl text-white">
              Ember <span className="text-brand-400">&</span> Wood
            </p>
            <p className="mt-md max-w-xs text-sm text-brand-200">
              {RESTAURANT.address}
            </p>
            <SocialLinks />
          </div>

          <nav aria-label="Footer">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-300">
              Explore
            </p>
            <ul className="mt-md flex flex-col">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="inline-flex min-h-[44px] items-center text-sm text-brand-100 hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-300">
              Contact
            </p>
            <ul className="mt-md flex flex-col gap-sm text-sm text-brand-100">
              <li>
                <a
                  href={RESTAURANT.phoneHref}
                  className="inline-flex min-h-[44px] items-center hover:text-white"
                >
                  {RESTAURANT.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${RESTAURANT.email}`}
                  className="inline-flex min-h-[44px] items-center hover:text-white"
                >
                  {RESTAURANT.email}
                </a>
              </li>
            </ul>
          </div>

          <nav aria-label="Legal">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-300">
              Legal
            </p>
            <ul className="mt-md flex flex-col gap-sm">
              {LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="inline-flex min-h-[44px] items-center text-sm text-brand-100 hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-xl flex flex-col items-center justify-between gap-md border-t border-brand-800 pt-xl text-sm text-brand-300 sm:flex-row">
          <p>Made with MoshineSites</p>
        </div>
      </div>
    </footer>
  );
}