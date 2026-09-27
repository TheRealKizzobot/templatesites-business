export default function About() {
  const stats = [
    { value: '5', label: 'Templates built' },
    { value: '10K+', label: 'Lines of production code' },
    { value: 'SQLite', label: 'Database backed' },
    { value: '0', label: 'External UI libraries' },
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
              who ships.
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
            <div aria-hidden="true" className="absolute -inset-4 rounded-2xl bg-gradient-to-br from-brand/5 via-transparent to-transparent" />
            <div className="relative grid gap-3">
              {[
                { name: 'Next.js', desc: 'App Router, static export', color: 'from-gray-800 to-gray-900' },
                { name: 'Tailwind CSS', desc: 'Utility-first, design tokens', color: 'from-cyan-500 to-blue-600' },
                { name: 'SQLite', desc: 'Zero-config, file-based DB', color: 'from-blue-500 to-indigo-600' },
                { name: 'TypeScript', desc: 'Type-safe, modern syntax', color: 'from-blue-600 to-blue-700' },
              ].map((tech, i) => (
                <div
                  key={tech.name}
                  className="flex items-center gap-4 rounded-xl border border-border bg-bg-surface p-4 transition-all hover:border-brand/30 hover:shadow-soft"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className={`flex size-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${tech.color}`}>
                    <span className="text-xs font-bold text-white">{tech.name[0]}</span>
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
