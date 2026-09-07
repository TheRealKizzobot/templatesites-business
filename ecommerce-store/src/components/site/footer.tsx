const LEGAL_LINKS = [
  { href: '/terms', label: 'Terms of Service' },
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/cookies', label: 'Cookie Policy' },
];

export default function SiteFooter() {
  return (
    <footer id="contact" className="mt-3xl border-t border-border bg-bg-secondary">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-5 lg:px-8">
        <div className="md:col-span-2">
          <p className="font-display text-2xl font-semibold text-brand-800">Northlight Goods</p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-text-secondary">
            Furniture, lighting, textiles, tableware and decor for slower, warmer homes. Every piece is chosen to
            outlast trends — and built to be lived with.
          </p>
          <p className="mt-3 text-sm text-text-secondary">
            Free US shipping on orders over $100. Flat $8 under that.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold text-brand-800">Shop</p>
          <ul className="mt-3 space-y-1 text-sm text-text-secondary">
            <li>
              <a href="/shop" className="inline-flex min-h-[44px] items-center hover:text-brand-800">
                All products
              </a>
            </li>
            <li>
              <a href="/shop?category=Furniture" className="inline-flex min-h-[44px] items-center hover:text-brand-800">
                Furniture
              </a>
            </li>
            <li>
              <a href="/shop?category=Lighting" className="inline-flex min-h-[44px] items-center hover:text-brand-800">
                Lighting
              </a>
            </li>
            <li>
              <a href="/shop?category=Textiles" className="inline-flex min-h-[44px] items-center hover:text-brand-800">
                Textiles
              </a>
            </li>
            <li>
              <a href="/shop?category=Tableware" className="inline-flex min-h-[44px] items-center hover:text-brand-800">
                Tableware
              </a>
            </li>
            <li>
              <a href="/shop?category=Decor" className="inline-flex min-h-[44px] items-center hover:text-brand-800">
                Decor
              </a>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-brand-800">Visit</p>
          <ul className="mt-3 space-y-1 text-sm text-text-secondary">
            <li>
              <a href="mailto:hello@northlightgoods.example" className="inline-flex min-h-[44px] items-center hover:text-brand-800">
                hello@northlightgoods.example
              </a>
            </li>
            <li>
              <span className="inline-flex min-h-[44px] items-center">Mon–Sat, 10am–6pm</span>
            </li>
            <li>
              <a href="/admin" className="inline-flex min-h-[44px] items-center hover:text-brand-800">
                Store admin
              </a>
            </li>
          </ul>
        </div>
        <nav aria-label="Legal">
          <p className="text-sm font-semibold text-brand-800">Legal</p>
          <ul className="mt-3 space-y-1 text-sm text-text-secondary">
            {LEGAL_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="inline-flex min-h-[44px] items-center hover:text-brand-800">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-border/60">
        <p className="mx-auto max-w-7xl px-4 py-6 text-xs text-text-secondary sm:px-6 lg:px-8">
          © {new Date().getFullYear()} Northlight Goods. A template built with Next.js, SQLite and care.
        </p>
      </div>
    </footer>
  );
}