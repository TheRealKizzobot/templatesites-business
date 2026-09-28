export default function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative isolate flex min-h-screen flex-col overflow-hidden bg-bg-dark"
    >
      {/* Background grid pattern */}
      <div aria-hidden="true" className="absolute inset-0 opacity-[0.035]">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--text-on-dark)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Gradient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2"
      >
        <div className="size-[600px] rounded-full bg-brand/10 blur-[120px]" />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0"
      >
        <div className="size-[400px] rounded-full bg-brand/5 blur-[100px]" />
      </div>

      {/* Main hero content */}
      <div className="container-page flex flex-1 items-end pb-20 pt-12 sm:pt-20 lg:pb-28">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-text-on-dark/10 bg-text-on-dark/5 px-3.5 py-1.5 text-xs text-text-on-dark/60 backdrop-blur-sm">
            <span className="flex size-1.5 rounded-full bg-brand" />
            <span>5 production templates · Next.js + SQLite + Tailwind</span>
          </div>

          {/* Headline */}
          <h1
            id="hero-heading"
            className="animate-fade-up delay-100 mt-6 font-display text-5xl font-semibold leading-[1.05] text-text-on-dark sm:text-6xl lg:text-7xl"
          >
            Websites that
            <br />
            <span className="gradient-text">actually ship.</span>
          </h1>

          {/* Subheadline */}
          <p className="animate-fade-up delay-200 mt-6 max-w-lg text-lg leading-relaxed text-text-on-dark/60 sm:text-xl">
            Production-ready templates for restaurants, SaaS products, e-commerce stores,
            and dashboards. No placeholders. No mockups. Just real, deployable code.
          </p>

          {/* CTAs */}
          <div className="animate-fade-up delay-300 mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#templates"
              className="btn btn-brand text-base px-8"
            >
              View the Templates
            </a>
            <a
              href="#about"
              className="btn border border-text-on-dark/20 bg-text-on-dark/5 text-base px-8 text-text-on-dark backdrop-blur-sm transition-colors hover:border-text-on-dark/40 hover:bg-text-on-dark/10"
            >
              Learn More
            </a>
          </div>

          {/* Stats strip */}
          <div className="animate-fade-up delay-400 mt-12 flex flex-wrap gap-x-8 gap-y-4">
            {[
              { value: '5', label: 'Live templates' },
              { value: '100%', label: 'Static export' },
              { value: 'WCAG', label: 'AA accessible' },
              { value: 'SQLite', label: 'Backend ready' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-semibold text-text-on-dark">{stat.value}</div>
                <div className="text-sm text-text-on-dark/40">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div aria-hidden="true" className="absolute bottom-6 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2 text-text-on-dark/30">
          <span className="text-xs font-mono tracking-widest uppercase">Scroll</span>
          <div className="size-5 rotate-45 border-r border-t border-text-on-dark/30" />
        </div>
      </div>
    </section>
  );
}
