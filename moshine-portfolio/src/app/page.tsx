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
    href: "/restaurant",
    icon: "🍽️",
  },
  {
    id: "taskflow",
    title: "TaskFlow",
    subtitle: "Productivity SaaS",
    description: "A task management app landing page with a fully interactive live taskboard demo. Shows real-time drag-and-drop, state persistence, and pricing tiers.",
    type: "Frontend Only",
    tags: ["Next.js", "Framer Motion", "Interactive Demo"],
    status: "Live",
    href: "/taskflow",
    icon: "📋",
  },
  {
    id: "booking",
    title: "Book & Dine",
    subtitle: "Restaurant Booking System",
    description: "Full-stack reservation platform with a customer booking flow and an admin panel. Real-time table management, date/time selection, and order tracking.",
    type: "Full-Stack",
    tags: ["Next.js", "SQLite", "Admin Panel"],
    status: "Live",
    href: "/booking",
    icon: "🗓️",
  },
  {
    id: "shop",
    title: "Northlight Goods",
    subtitle: "E-Commerce Store",
    description: "Complete online store with product catalog, shopping cart, checkout, order confirmation, and a full admin panel for managing products and orders.",
    type: "Full-Stack",
    tags: ["Next.js", "SQLite", "Cart System"],
    status: "Live",
    href: "/shop",
    icon: "🛒",
  },
  {
    id: "metrics",
    title: "Metrics",
    subtitle: "Analytics Dashboard",
    description: "TweetDeck-style content analytics dashboard with real-time metric cards, live feed, trending topics, and 7-day charts. Full backend API integration.",
    type: "Full-Stack",
    tags: ["Next.js", "SQLite", "Recharts"],
    status: "Live",
    href: "/metrics",
    icon: "📊",
  },
];

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="section pt-20 md:pt-32">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            MoshineSites
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-6" style={{ color: "var(--text-secondary)" }}>
            Production-ready website templates and custom web development for small and local businesses.
          </p>
          <Link href="#templates" className="btn btn-primary text-lg">
            View All Templates
          </Link>
        </div>
      </section>

      {/* About / Bio */}
      <section className="section" style={{ backgroundColor: "var(--bg-secondary)" }}>
        <h2 className="section-title">Who We Are</h2>
        <div className="max-w-3xl">
          <p className="text-lg" style={{ color: "var(--text-secondary)" }}>
            MoshineSites is built by a self-taught developer passionate about creating clean, functional websites
            for local businesses. With experience building apps like{" "}
            <a href="https://sipsterra.dkservers.space" target="_blank" rel="noopener" className="underline" style={{ color: "var(--brand)" }}>
              sipsterra
            </a>
            , each template showcases real, deployable projects — not mockups or placeholders.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <div className="bg-white rounded-lg px-4 py-2 border" style={{ borderColor: "var(--border)" }}>
              <span className="text-sm" style={{ color: "var(--text-muted)" }}>Services:</span>
              <p className="font-semibold mt-1">Custom Sites & Templates</p>
            </div>
            <div className="bg-white rounded-lg px-4 py-2 border" style={{ borderColor: "var(--border)" }}>
              <span className="text-sm" style={{ color: "var(--text-muted)" }}>Stack:</span>
              <p className="font-semibold mt-1">Next.js, React, Tailwind, SQLite</p>
            </div>
            <div className="bg-white rounded-lg px-4 py-2 border" style={{ borderColor: "var(--border)" }}>
              <span className="text-sm" style={{ color: "var(--text-muted)" }}>Location:</span>
              <p className="font-semibold mt-1">Raleigh, NC (Remote OK)</p>
            </div>
          </div>
        </div>
      </section>

      {/* Templates Grid */}
      <section id="templates" className="section">
        <h2 className="section-title">Template Showcase</h2>
        <p className="section-subtitle">
          Each template is a production-ready, deployable site. Click any card to try it live.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((t) => (
            <Link key={t.id} href={t.href} passHref>
              <div className="template-card cursor-pointer card">
                <div className="preview">{t.icon}</div>
                <div className="info">
                  <h3>{t.title}</h3>
                  <p style={{ fontSize: "13px", color: "var(--brand)", marginBottom: "8px" }}>
                    {t.subtitle}
                  </p>
                  <p>{t.description}</p>
                  <div className="tags">
                    {t.tags.map((tag) => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                  <button className="btn btn-secondary mt-auto">
                    Try It →
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="section" style={{ backgroundColor: "var(--bg-secondary)" }}>
        <h2 className="section-title">Pricing</h2>
        <p className="section-subtitle">
          Every template is a starting point. Customize it to fit your brand, or commission something custom.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
          <div className="bg-white rounded-lg p-6 border card" style={{ borderColor: "var(--border)" }}>
            <h3 className="text-xl font-semibold mb-2">Template Kit</h3>
            <p className="text-3xl font-bold mb-4" style={{ color: "var(--brand)" }}>$499</p>
            <ul className="space-y-2 text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
              <li>✅ All 5 templates</li>
              <li>✅ Full source code</li>
              <li>✅ Design system included</li>
              <li>❌ Custom branding</li>
            </ul>
            <button className="btn btn-primary w-full">Get Started</button>
          </div>
          <div className="bg-white rounded-lg p-6 border card" style={{ borderColor: "var(--brand)" }}>
            <h3 className="text-xl font-semibold mb-2">Custom Build</h3>
            <p className="text-3xl font-bold mb-4" style={{ color: "var(--brand)" }}>Custom</p>
            <ul className="space-y-2 text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
              <li>✅ Everything in Template Kit</li>
              <li>✅ Custom branding & design</li>
              <li>✅ Your own domain setup</li>
              <li>✅ 2 rounds of revisions</li>
            </ul>
            <button className="btn btn-primary w-full">Get Started</button>
          </div>
          <div className="bg-white rounded-lg p-6 border card" style={{ borderColor: "var(--border)" }}>
            <h3 className="text-xl font-semibold mb-2">Maintain</h3>
            <p className="text-3xl font-bold mb-4" style={{ color: "var(--brand)" }}>From $99/mo</p>
            <ul className="space-y-2 text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
              <li>✅ Hosting & SSL</li>
              <li>✅ Updates & security</li>
              <li>✅ Bug fixes</li>
              <li>✅ Priority support</li>
            </ul>
            <button className="btn btn-primary w-full">Get Started</button>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="section text-center">
        <h2 className="section-title">Ready to Build?</h2>
        <p className="section-subtitle mx-auto">
          Have a project in mind? Get in touch and let&apos;s talk about what you need.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="btn btn-primary text-lg">Contact Me</button>
          <a href="mailto:daniel@example.com" className="btn btn-secondary text-lg">
            Email Directly
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-sm" style={{ color: "var(--text-muted)", borderTop: "1px solid var(--border)" }}>
        <p>© 2026 MoshineSites. Built with Next.js, React, and Tailwind CSS.</p>
        <p className="mt-2">
          Templates deployed on{" "}
          <a href="https://dkservers.space" target="_blank" rel="noopener" className="underline" style={{ color: "var(--brand)" }}>
            dkservers.space
          </a>
        </p>
      </footer>
    </main>
  );
}
