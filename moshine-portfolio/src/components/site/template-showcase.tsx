import Link from 'next/link';

const TEMPLATES = [
  {
    id: 'restaurant',
    title: 'Ember & Wood',
    subtitle: 'Restaurant & Dining',
    description: 'A wood-fired kitchen marketing site with dish gallery, lightbox, testimonials, and a live reservation system. Static export with smooth animations.',
    type: 'Frontend + Backend',
    tags: ['Next.js', 'Static Export', 'Tailwind'],
    status: 'Live',
    href: 'https://restaurant-site-tawny.vercel.app',
    hasAdmin: false,
    colors: {
      accent: '#b45309',
      bg: '#fef3e2',
      bgAlt: '#fdf0db',
      surface: '#fff8f0',
    },
    mockupContent: () => (
      <div className="flex h-full flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-amber-200" />
          <div className="flex-1">
            <div className="mb-1 h-2 w-16 rounded-full bg-amber-200/60" />
            <div className="h-1.5 w-10 rounded-full bg-amber-200/40" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="aspect-square rounded-md bg-amber-100" />
          <div className="aspect-square rounded-md bg-amber-200/60" />
          <div className="aspect-square rounded-md bg-amber-200/40" />
          <div className="aspect-square rounded-md bg-amber-100" />
        </div>
      </div>
    ),
  },
  {
    id: 'taskflow',
    title: 'TaskFlow',
    subtitle: 'SaaS Dashboard',
    description: 'A productivity app landing page with an interactive live taskboard demo. Drag-and-drop tasks, state persistence, and pricing tiers all working in real time.',
    type: 'Frontend Only',
    tags: ['Next.js', 'Framer Motion', 'Tailwind'],
    status: 'Live',
    href: 'https://taskflow-saas-lac.vercel.app',
    hasAdmin: false,
    colors: {
      accent: '#7c3aed',
      bg: '#f0edff',
      bgAlt: '#e8e4ff',
      surface: '#faf8ff',
    },
    mockupContent: () => (
      <div className="flex h-full flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="h-6 w-6 rounded-lg bg-violet-200" />
          <div className="flex-1 h-2 rounded-full bg-violet-200/60" />
        </div>
        <div className="flex gap-2">
          <div className="flex-1 space-y-1.5">
            <div className="h-2 rounded-full bg-violet-100 w-3/4" />
            <div className="h-2 rounded-full bg-violet-100 w-full" />
            <div className="h-2 rounded-full bg-violet-100 w-5/6" />
          </div>
          <div className="flex-1 space-y-1.5">
            <div className="h-2 rounded-full bg-violet-100 w-2/3" />
            <div className="h-2 rounded-full bg-violet-100 w-full" />
            <div className="h-2 rounded-full bg-violet-100 w-4/5" />
          </div>
        </div>
        <div className="mt-auto h-8 rounded-lg bg-violet-100" />
      </div>
    ),
  },
  {
    id: 'booking',
    title: 'Book & Dine',
    subtitle: 'Reservation System',
    description: 'Full-stack reservation platform with customer booking flow and admin panel. Real-time table management, date/time selection, and order tracking via SQLite.',
    type: 'Full-Stack',
    tags: ['Next.js', 'SQLite', 'API Routes'],
    status: 'Live',
    href: 'https://booking-system-olive-eight.vercel.app',
    hasAdmin: true,
    colors: {
      accent: '#059669',
      bg: '#ecfdf5',
      bgAlt: '#d1fae5',
      surface: '#f0fdf4',
    },
    mockupContent: () => (
      <div className="flex h-full flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-5 w-5 rounded-full bg-emerald-200" />
            ))}
          </div>
          <div className="flex-1 h-2 rounded-full bg-emerald-100" />
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className={`aspect-square rounded-md ${i % 2 === 0 ? 'bg-emerald-100' : 'bg-emerald-200/50'}`} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'shop',
    title: 'Northlight Goods',
    subtitle: 'E-Commerce Store',
    description: 'Complete online store with product catalog, shopping cart, checkout flow, order confirmation, and a full admin panel for managing products and orders.',
    type: 'Full-Stack',
    tags: ['Next.js', 'SQLite', 'Cart System'],
    status: 'Live',
    href: 'https://ecommerce-store-five-phi.vercel.app',
    hasAdmin: true,
    colors: {
      accent: '#dc2626',
      bg: '#fff1f0',
      bgAlt: '#fee2e2',
      surface: '#fef2f2',
    },
    mockupContent: () => (
      <div className="flex h-full flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 rounded-md bg-red-200" />
          <div className="flex-1 h-2 rounded-full bg-red-100" />
          <div className="h-5 w-5 rounded-md bg-red-200" />
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className={`aspect-[3/4] rounded-md ${i % 3 === 0 ? 'bg-red-100' : i % 3 === 1 ? 'bg-red-200/40' : 'bg-red-100/60'}`} />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'metrics',
    title: 'Metrics',
    subtitle: 'Analytics Dashboard',
    description: 'TweetDeck-style content analytics dashboard with real-time metric cards, live feed, trending topics, and 7-day charts. Full backend API with SQLite.',
    type: 'Full-Stack',
    tags: ['Next.js', 'SQLite', 'Recharts'],
    status: 'Live',
    href: 'https://analytics-dashboard-five-kohl.vercel.app',
    hasAdmin: false,
    colors: {
      accent: '#0891b2',
      bg: '#ecfeff',
      bgAlt: '#cffafe',
      surface: '#f0fdfa',
    },
    mockupContent: () => (
      <div className="flex h-full flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 rounded-md bg-cyan-200" />
          <div className="flex-1 h-2 rounded-full bg-cyan-100" />
        </div>
        <div className="flex gap-1.5 items-end h-12">
          {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
            <div key={i} className="flex-1 bg-cyan-300 rounded-t" style={{ height: `${h}%` }} />
          ))}
        </div>
        <div className="space-y-1">
          <div className="h-1.5 rounded-full bg-cyan-100 w-full" />
          <div className="h-1.5 rounded-full bg-cyan-100 w-4/5" />
          <div className="h-1.5 rounded-full bg-cyan-100 w-3/5" />
        </div>
      </div>
    ),
  },
];

function BrowserMockup({ template }: { template: typeof TEMPLATES[0] }) {
  return (
    <div className="browser-mockup">
      <div className="browser-mockup-bar">
        <span className="browser-dot" style={{ background: '#ff5f57' }} />
        <span className="browser-dot" style={{ background: '#febc2e' }} />
        <span className="browser-dot" style={{ background: '#28c840' }} />
        <div className="ml-2 flex-1 rounded-md bg-bg-elevated px-2 py-0.5 text-xs text-text-tertiary">
          {template.href.replace('https://', '')}
        </div>
      </div>
      <div className="browser-content" style={{ background: template.colors.bg }}>
        <div style={{ background: template.colors.surface }}>
          {template.mockupContent()}
        </div>
      </div>
    </div>
  );
}

function TemplateCard({ template, index }: { template: typeof TEMPLATES[0]; index: number }) {
  const delay = index * 80;
  return (
    <article
      className="group flex flex-col rounded-xl border border-border bg-bg-surface transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Preview */}
      <div className="p-4 pb-0">
        <BrowserMockup template={template} />
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col p-4 pt-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-base font-semibold tracking-tight text-text-primary">
              {template.title}
            </h3>
            <p className="mt-0.5 text-sm text-brand font-medium">{template.subtitle}</p>
          </div>
          <span className="shrink-0 rounded-full border border-border bg-bg-elevated px-2.5 py-1 text-[11px] font-medium text-text-secondary">
            {template.status}
          </span>
        </div>

        <p className="mt-2.5 text-sm leading-relaxed text-text-secondary flex-1">
          {template.description}
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {template.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-border bg-bg-elevated px-2 py-0.5 text-[11px] font-medium text-text-secondary"
            >
              {tag}
            </span>
          ))}
          {template.hasAdmin && (
            <span className="rounded-md bg-brand/10 px-2 py-0.5 text-[11px] font-medium text-brand">
              Admin panel
            </span>
          )}
        </div>
      </div>

      {/* CTA */}
      <div className="border-t border-border p-4 pt-3">
        <a
          href={template.href}
          target="_blank"
          rel="noopener noreferrer"
          className="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-bg-elevated py-2.5 text-sm font-medium text-text-primary transition-all hover:border-brand/40 hover:bg-brand/5 hover:text-brand-dark"
        >
          Try it live
          <svg viewBox="0 0 16 16" className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M6 3l5 5-5 5" />
            <path d="M11 3H6v5" />
          </svg>
        </a>
      </div>
    </article>
  );
}

export default function TemplateShowcase() {
  return (
    <section id="templates" className="section py-20 sm:py-24" aria-labelledby="templates-title">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-kicker">The Collection</p>
          <h2
            id="templates-title"
            className="section-title"
          >
            Production-ready templates for every business
          </h2>
          <p className="section-lede">
            Five complete, deployable websites. Each one built with the same design system,
            clean code, and attention to detail — ready to adapt or inspire your next project.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TEMPLATES.slice(0, 3).map((t, i) => (
            <TemplateCard key={t.id} template={t} index={i} />
          ))}
        </div>
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          {TEMPLATES.slice(3).map((t, i) => (
            <TemplateCard key={t.id} template={t} index={i + 3} />
          ))}
        </div>
      </div>
    </section>
  );
}
