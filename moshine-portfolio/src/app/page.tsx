import Link from "next/link";

const templates = [
  {
    id: "restaurant",
    title: "Ember & Wood",
    subtitle: "Fine Dining Restaurant",
    description: "A high-polish marketing site for a wood-fired kitchen and natural wine bar. Features a stunning hero, dish gallery with lightbox, testimonials, and a live reservation system.",
    type: "Frontend + Backend",
    tags: ["Next.js", "Static Export", "Reservation System"],
    status: "Live",
    href: "https://restaurant-site-tawny.vercel.app",
    icon: "🍽️",
    adminPassword: "admin123",
  },
  {
    id: "taskflow",
    title: "TaskFlow",
    subtitle: "Productivity SaaS",
    description: "A task management app landing page with a fully interactive live taskboard demo. Shows real-time drag-and-drop, state persistence, and pricing tiers.",
    type: "Frontend Only",
    tags: ["Next.js", "Framer Motion", "Interactive Demo"],
    status: "Live",
    href: "https://taskflow-saas-lac.vercel.app",
    icon: "📋",
    adminPassword: null,
  },
  {
    id: "booking",
    title: "Book & Dine",
    subtitle: "Restaurant Booking System",
    description: "Full-stack reservation platform with a customer booking flow and an admin panel. Real-time table management, date/time selection, and order tracking.",
    type: "Full-Stack",
    tags: ["Next.js", "SQLite", "Admin Panel"],
    status: "Live",
    href: "https://booking-system-olive-eight.vercel.app",
    icon: "🗓️",
    adminPassword: "admin123",
  },
  {
    id: "shop",
    title: "Northlight Goods",
    subtitle: "E-Commerce Store",
    description: "Complete online store with product catalog, shopping cart, checkout, order confirmation, and a full admin panel for managing products and orders.",
    type: "Full-Stack",
    tags: ["Next.js", "SQLite", "Cart System"],
    status: "Live",
    href: "https://ecommerce-store-five-phi.vercel.app",
    icon: "🛒",
    adminPassword: "admin123",
  },
  {
    id: "metrics",
    title: "Metrics",
    subtitle: "Analytics Dashboard",
    description: "TweetDeck-style content analytics dashboard with real-time metric cards, live feed, trending topics, and 7-day charts. Full backend API integration.",
    type: "Full-Stack",
    tags: ["Next.js", "SQLite", "Recharts"],
    status: "Live",
    href: "https://analytics-dashboard-five-kohl.vercel.app",
    icon: "📊",
    adminPassword: null,
  },
];

export default function Home() {
  return (
    <main>
      <section className="section pt-20 md:pt-32 bg-gradient-to-b from-brand-50 to-transparent">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
            MoshineSites
          </h1>
          <p className="mt-4 text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto" style={{ color: "var(--text-secondary)" }}>
            Production-ready website templates and custom web development for small and local businesses.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="#templates" className="btn btn-primary text-lg px-8">
              View All Templates
            </Link>
            <Link href="#contact" className="btn btn-secondary text-lg px-8">
              Start a Project
            </Link>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <h2 className="section-title text-center">Who We Are</h2>
        <p className="section-subtitle text-center mx-auto">
          MoshineSites is built by a self-taught developer passionate about creating clean, functional websites
          for local businesses. With experience building apps like{" "}
          <a href="https://sipsterra.dkservers.space" target="_blank" rel="noopener" className="underline hover:no-underline" style={{ color: "var(--brand)" }}>
            sipsterra
          </a>
          , each template showcases real, deployable projects — not mockups or placeholders.
        </p>
        <div className="mt-12 flex flex-wrap gap-4 justify-center">
          <div className="card px-4 py-2 border-0 shadow-sm max-w-xs">
            <span className="text-sm text-text-muted">Services:</span>
            <p className="font-semibold mt-1">Custom Sites & Templates</p>
          </div>
          <div className="card px-4 py-2 border-0 shadow-sm max-w-xs">
            <span className="text-sm text-text-muted">Stack:</span>
            <p className="font-semibold mt-1">Next.js, React, Tailwind, SQLite</p>
          </div>
          <div className="card px-4 py-2 border-0 shadow-sm max-w-xs">
            <span className="text-sm text-text-muted">Location:</span>
            <p className="font-semibold mt-1">Raleigh, NC (Remote OK)</p>
          </div>
        </div>
      </section>

      <section id="templates" className="section bg-[var(--bg-secondary)]">
        <h2 className="section-title text-center">Template Showcase</h2>
        <p className="section-subtitle text-center">
          Each template is a production-ready, deployable site. Click any card to try it live.
        </p>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {templates.map((t) => (
            <Link key={t.id} href={t.href} target="_blank" rel="noopener noreferrer" className="block">
              <div className="card h-full overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                <div className="preview text-6xl flex items-center justify-center min-h-[200px] bg-brand-50">
                  {t.icon}
                </div>
                <div className="info p-6 flex flex-col h-full">
                  <h3 className="text-xl font-bold tracking-tight">{t.title}</h3>
                  <p className="mt-1 text-sm font-medium" style={{ color: "var(--brand)" }}>
                    {t.subtitle}
                  </p>
                  <p className="mt-2 text-sm text-text-secondary flex-1">{t.description}</p>
                  <div className="tags mt-4 flex flex-wrap gap-2">
                    {t.tags.map((tag) => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                  <div className="mt-auto pt-4 border-t border-border">
                    <div className="flex items-center justify-between text-xs text-text-muted">
                      <span>{t.type}</span>
                      {t.adminPassword && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-brand-100 text-brand-800 font-mono text-[11px]">
                          Admin: <code>{t.adminPassword}</code>
                        </span>
                      )}
                    </div>
                    <button className="btn btn-primary mt-4 w-full">
                      Try It →
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section bg-white">
        <h2 className="section-title text-center">Pricing</h2>
        <p className="section-subtitle text-center">
          Every template is a starting point. Customize it to fit your brand, or commission something custom.
        </p>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="card p-6 border-0 shadow-sm flex flex-col">
            <h3 className="text-xl font-semibold">Template Kit</h3>
            <p className="mt-2 text-3xl font-bold" style={{ color: "var(--brand)" }}>$499</p>
            <ul className="mt-6 space-y-3 text-sm flex-1" style={{ color: "var(--text-secondary)" }}>
              <li className="flex items-center gap-2">✅ All 5 templates</li>
              <li className="flex items-center gap-2">✅ Full source code</li>
              <li className="flex items-center gap-2">✅ Design system included</li>
              <li className="flex items-center gap-2 text-text-muted">❌ Custom branding</li>
            </ul>
            <Link href="#contact" className="btn btn-primary w-full mt-6 text-center">
              Get Started
            </Link>
          </div>
          <div className="card p-6 border-2 border-brand-500 flex flex-col relative">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-500 text-brand-50 text-xs font-semibold px-3 py-1 rounded-full">
              Most Popular
            </span>
            <h3 className="text-xl font-semibold">Custom Build</h3>
            <p className="mt-2 text-3xl font-bold" style={{ color: "var(--brand)" }}>Custom</p>
            <ul className="mt-6 space-y-3 text-sm flex-1" style={{ color: "var(--text-secondary)" }}>
              <li className="flex items-center gap-2">✅ Everything in Template Kit</li>
              <li className="flex items-center gap-2">✅ Custom branding & design</li>
              <li className="flex items-center gap-2">✅ Your own domain setup</li>
              <li className="flex items-center gap-2">✅ 2 rounds of revisions</li>
            </ul>
            <Link href="#contact" className="btn btn-primary w-full mt-6 text-center">
              Get Started
            </Link>
          </div>
          <div className="card p-6 border-0 shadow-sm flex flex-col">
            <h3 className="text-xl font-semibold">Maintain</h3>
            <p className="mt-2 text-3xl font-bold" style={{ color: "var(--brand)" }}>From $99/mo</p>
            <ul className="mt-6 space-y-3 text-sm flex-1" style={{ color: "var(--text-secondary)" }}>
              <li className="flex items-center gap-2">✅ Hosting & SSL</li>
              <li className="flex items-center gap-2">✅ Updates & security</li>
              <li className="flex items-center gap-2">✅ Bug fixes</li>
              <li className="flex items-center gap-2">✅ Priority support</li>
            </ul>
            <Link href="#contact" className="btn btn-primary w-full mt-6 text-center">
              Get Started
            </Link>
          </div>
        </div>
      </section>

      <section id="contact" className="section bg-[var(--bg-secondary)] text-center">
        <h2 className="section-title">Ready to Build?</h2>
        <p className="section-subtitle mx-auto">
          Have a project in mind? Get in touch and let&apos;s talk about what you need.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="mailto:connect@dkservers.space" className="btn btn-primary text-lg px-8">
            Email Me
          </Link>
          <a href="https://forms.gle/your-form-link" target="_blank" rel="noopener noreferrer" className="btn btn-secondary text-lg px-8">
            Project Form
          </a>
        </div>
        <p className="mt-8 text-sm text-text-muted">
          Admin password for backend templates: <code className="font-mono bg-brand-100 px-1.5 py-0.5 rounded">admin123</code>
        </p>
      </section>
    </main>
  );
}