export default function Pricing() {
  const tiers = [
    {
      name: 'Template Kit',
      price: '$499',
      period: 'one-time',
      blurb: 'Get all five templates with full source code and the shared design system.',
      features: [
        'All 5 templates',
        'Complete source code',
        'Design system tokens',
        'Static export builds',
        'MIT license',
      ],
      cta: 'Get the Kit',
      featured: false,
    },
    {
      name: 'Custom Build',
      price: 'Custom',
      period: 'scope-based',
      blurb: 'Start from a template or build from scratch. Your brand, your domain, your specs.',
      features: [
        'Everything in Template Kit',
        'Custom branding & colors',
        'Your domain setup',
        '2 rounds of revisions',
        'Deploy support',
      ],
      cta: 'Start a Project',
      featured: true,
    },
    {
      name: 'Maintenance',
      price: '$99',
      period: '/month',
      blurb: 'Keep your site running smoothly with hosting, updates, and priority support.',
      features: [
        'Hosting & SSL',
        'Monthly updates',
        'Security patches',
        'Bug fixes',
        'Priority email support',
      ],
      cta: 'Get Support',
      featured: false,
    },
  ];

  return (
    <section id="pricing" className="section bg-bg-elevated" aria-labelledby="pricing-title">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-kicker">Pricing</p>
          <h2
            id="pricing-title"
            className="section-title"
          >
            Simple, transparent pricing
          </h2>
          <p className="section-lede">
            Every template is a starting point. Pick what fits your needs — or let us build something custom.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {tiers.map((tier, i) => (
            <article
              key={tier.name}
              className={`relative flex flex-col rounded-xl border bg-bg-surface p-6 ${
                tier.featured
                  ? 'border-brand/30 shadow-card'
                  : 'border-border shadow-soft'
              }`}
            >
              {tier.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand px-3 py-1 text-xs font-semibold text-white">
                  Most popular
                </span>
              )}

              <h3 className="font-display text-lg font-semibold text-text-primary">
                {tier.name}
              </h3>
              <p className="mt-1 text-sm text-text-tertiary">{tier.period}</p>

              <p className="mt-3 flex items-baseline gap-1">
                <span className="font-display text-4xl font-semibold text-text-primary">
                  {tier.price}
                </span>
              </p>

              <p className="mt-2 text-sm text-text-secondary">{tier.blurb}</p>

              <ul className="mt-6 space-y-3 flex-1" aria-label={`${tier.name} features`}>
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-text-secondary">
                    <svg
                      viewBox="0 0 16 16"
                      className={`mt-0.5 size-4 shrink-0 ${tier.featured ? 'text-brand' : 'text-green-600'}`}
                      aria-hidden="true"
                      fill="currentColor"
                    >
                      <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 0 1 1.06-1.06L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z" />
                    </svg>
                    <span className="text-text-primary">{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`focus-ring mt-8 inline-flex w-full items-center justify-center rounded-lg py-2.5 text-sm font-medium transition-colors ${
                  tier.featured
                    ? 'bg-brand text-white hover:bg-brand-dark'
                    : 'border border-border bg-bg-elevated text-text-primary hover:border-text-primary'
                }`}
              >
                {tier.cta}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
