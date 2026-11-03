export default function About() {
  const stats = [
    { value: '5', label: 'Templates built' },
    { value: 'SQLite', label: 'Database backed' },
    { value: '0', label: 'External UI libraries' },
    { value: 'MIT', label: 'Open source' },
  ];

  return (
    <section id="about" className="section bg-bg-surface" aria-labelledby="about-title">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left: text */}
          <div>
            <p className="section-kicker">About</p>
            <h2
              id="about-title"
              className="section-title mt-2"
            >
              Built by a developer
              <br />
              who ships
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-text-secondary">
              <p>
                Every template here is a complete, deployed project — not a sketch or a Figma file.
                Each one has real data, working forms, API routes, and admin panels where it makes sense.
              </p>
              <p>
                The stack is intentional: Next.js App Router for structure, Tailwind for styling,
                and SQLite for persistence. No heavy frameworks, no vendor lock-in, no bloat.
                Just clean code that you can adapt and extend.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-lg border border-border bg-bg-primary p-3 text-center">
                  <div className="text-xl font-semibold text-text-primary">{stat.value}</div>
                  <div className="mt-1 text-xs text-text-tertiary">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: visual element - tech stack cards */}
          <div className="relative">
            {/* Decorative grid */}
            <div aria-hidden="true" className="absolute -inset-4 rounded-2xl bg-bg-elevated" />
            <div className="relative grid gap-3">
              {[
                { name: 'Next.js', desc: 'App Router, static export' },
                { name: 'Tailwind CSS', desc: 'Utility-first, design tokens' },
                { name: 'SQLite', desc: 'Zero-config, file-based DB' },
                { name: 'TypeScript', desc: 'Type-safe, modern syntax' },
              ].map((tech) => (
                <div
                  key={tech.name}
                  className="flex items-center gap-4 rounded-xl border border-border bg-bg-surface p-4 transition-colors hover:border-brand/30"
                >
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-brand/15">
                    <span className="text-xs font-bold text-brand-dark">{tech.name[0]}</span>
                  </div>
                  <div>
                    <div className="font-semibold text-text-primary">{tech.name}</div>
                    <div className="text-sm text-text-tertiary">{tech.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
