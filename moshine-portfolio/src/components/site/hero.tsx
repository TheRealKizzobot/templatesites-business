export default function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative isolate flex min-h-screen flex-col overflow-hidden bg-bg-dark"
    >
      {/* Main hero content */}
      <div className="container-page flex flex-1 items-end pb-20 pt-20 sm:pt-28 lg:pb-28">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-text-on-dark/30 px-4 py-2 text-xs text-text-on-dark-muted">
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
            <span className="text-brand">actually ship.</span>
          </h1>

          {/* Subheadline */}
          <p className="animate-fade-up delay-200 mt-6 max-w-lg text-lg leading-relaxed text-text-on-dark sm:text-xl">
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
              className="btn border border-text-on-dark/30 bg-text-on-dark/5 text-base px-8 text-text-on-dark backdrop-blur-sm transition-colors hover:border-text-on-dark/60 hover:bg-text-on-dark/15"
            >
              Learn More
            </a>
          </div>

          {/* Tech row */}
          <div className="animate-fade-up delay-400 mt-12 flex flex-wrap items-center gap-x-6 gap-y-2">
            <div>
              <div className="text-2xl font-semibold text-text-on-dark tabular-nums">5</div>
              <div className="text-sm text-text-on-dark-muted">Live templates</div>
            </div>
            <div className="h-8 w-px bg-text-on-dark/15" />
            {['Next.js', 'App Router', 'SQLite', 'Tailwind', 'TypeScript'].map((tech) => (
              <span key={tech} className="text-sm text-text-on-dark-muted">{tech}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div aria-hidden="true" className="absolute bottom-6 left-1/2 -translate-x-1/2">
        <div className="animate-fade-up flex flex-col items-center gap-2 text-text-on-dark-muted">
          <span className="text-xs font-mono tracking-widest uppercase">Scroll</span>
          <div className="size-5 rotate-45 border-r border-t border-text-on-dark-muted" />
        </div>
      </div>
    </section>
  );
}
