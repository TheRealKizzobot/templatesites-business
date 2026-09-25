import { GitHubIcon, LinkedInIcon, LogoMark, XSocialIcon } from '@/components/icons';

const PRODUCT_LINKS = [
  { href: '#features', label: 'Features' },
  { href: '#demo', label: 'Live demo' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#testimonials', label: 'Testimonials' },
];

const GET_STARTED_LINKS = [
  { href: '#demo', label: 'Try the demo' },
  { href: '#pricing', label: 'View plans' },
  { href: '#cta', label: 'Get a trial' },
  { href: 'mailto:hello@taskflow.app', label: 'Contact us' },
];

const LEGAL_LINKS = [
  { href: '/terms', label: 'Terms of Service' },
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/cookies', label: 'Cookie Policy' },
];

const SOCIALS = [
  { href: 'https://x.com/', label: 'TaskFlow on X', icon: XSocialIcon },
  { href: 'https://www.linkedin.com/', label: 'TaskFlow on LinkedIn', icon: LinkedInIcon },
  { href: 'https://github.com/', label: 'TaskFlow on GitHub', icon: GitHubIcon },
];

export default function Footer() {
  return (
    <footer className="border-t border-border/70 bg-bg-secondary">
      <div className="mx-auto max-w-6xl px-4 py-3xl sm:px-6 lg:px-8">
        <div className="grid gap-xl md:grid-cols-5">
          <div className="md:col-span-2">
            <a
              href="#top"
              className="inline-flex min-h-11 items-center gap-sm rounded-full pr-md"
              aria-label="TaskFlow — back to top"
            >
              <span className="grid size-9 place-items-center rounded-full bg-brand-600 text-white">
                <LogoMark className="size-5" />
              </span>
              <span className="font-display text-xl font-semibold tracking-tight text-text-primary">
                TaskFlow
              </span>
            </a>
            <p className="mt-md max-w-sm text-md text-text-secondary">
              The calm, private way to get things done. Capture fast, watch progress move,
              and keep your list yours.
            </p>
          </div>

          <nav aria-label="Product">
            <h3 className="text-sm font-semibold tracking-wide text-text-primary uppercase">
              Product
            </h3>
            <ul className="mt-md space-y-xs">
              {PRODUCT_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="inline-flex min-h-11 items-center rounded-md text-md text-text-secondary transition-colors hover:text-text-primary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Get started">
            <h3 className="text-sm font-semibold tracking-wide text-text-primary uppercase">
              Get started
            </h3>
            <ul className="mt-md space-y-xs">
              {GET_STARTED_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="inline-flex min-h-11 items-center rounded-md text-md text-text-secondary transition-colors hover:text-text-primary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Legal">
            <h3 className="text-sm font-semibold tracking-wide text-text-primary uppercase">
              Legal
            </h3>
            <ul className="mt-md space-y-xs">
              {LEGAL_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="inline-flex min-h-11 items-center rounded-md text-md text-text-secondary transition-colors hover:text-text-primary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-3xl flex flex-col items-center justify-between gap-lg border-t border-border/70 pt-lg sm:flex-row">
          <p className="text-sm text-text-secondary">
            Made with <a href="https://dkservers.space" className="underline hover:no-underline" style={{ color: "var(--brand)" }}>MoshineSites</a>.
          </p>
          <ul className="flex items-center gap-xs" aria-label="Social media">
            {SOCIALS.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="grid size-11 place-items-center rounded-full text-text-secondary transition-colors hover:bg-brand-100 hover:text-text-primary"
                >
                  <social.icon className="size-5" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}