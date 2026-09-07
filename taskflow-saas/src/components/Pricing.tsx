import { CheckIcon } from '@/components/icons';

const TIERS = [
  {
    name: 'Starter',
    price: '$0',
    period: 'forever',
    blurb: 'For getting organized solo.',
    cta: 'Start for free',
    featured: false,
    features: [
      'Unlimited tasks',
      'One project board',
      'Weekly focus digest',
      'Community support',
    ],
  },
  {
    name: 'Pro',
    price: '$12',
    period: '/month',
    blurb: 'For makers who live in their lists.',
    cta: 'Start 14-day trial',
    featured: true,
    features: [
      'Everything in Starter',
      'Unlimited projects',
      'Custom labels & views',
      'Focus reports & analytics',
      'Priority support',
    ],
  },
  {
    name: 'Team',
    price: '$29',
    period: '/month',
    blurb: 'For teams that ship together.',
    cta: 'Talk to sales',
    featured: false,
    features: [
      'Everything in Pro',
      'Shared workspaces',
      'Roles & permissions',
      'Audit log',
      'Dedicated onboarding',
    ],
  },
];

export default function Pricing() {
  return (
    <section
      id="pricing"
      aria-labelledby="pricing-title"
      className="bg-bg-secondary py-3xl"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold tracking-wide text-brand-600 uppercase">
            Pricing
          </p>
          <h2
            id="pricing-title"
            className="mt-sm font-display text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl"
          >
            Simple pricing that scales with you
          </h2>
          <p className="mt-md text-md text-text-secondary">
            Start free. Upgrade when the list gets long.
          </p>
        </div>

        <div className="mt-3xl grid gap-md md:grid-cols-3">
          {TIERS.map((tier) => (
            <article
              key={tier.name}
              className={`relative flex flex-col rounded-xl bg-bg-primary p-xl shadow-soft ${
                tier.featured
                  ? 'ring-2 ring-brand-600'
                  : 'ring-1 ring-border/60'
              }`}
            >
              {tier.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-600 px-md py-xs text-xs font-semibold text-white">
                  Most popular
                </span>
              )}

              <h3 className="font-display text-xl font-semibold tracking-tight text-text-primary">
                {tier.name}
              </h3>
              <p className="mt-xs text-sm text-text-secondary">{tier.blurb}</p>

              <p className="mt-lg flex items-baseline gap-xs">
                <span className="font-display text-4xl font-semibold tracking-tight text-text-primary">
                  {tier.price}
                </span>
                <span className="text-sm text-text-secondary">{tier.period}</span>
              </p>

              <ul className="mt-lg space-y-md" aria-label={`${tier.name} features`}>
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-sm text-md">
                    <span className="mt-xs grid size-5 shrink-0 place-items-center rounded-full bg-brand-100 text-brand-600">
                      <CheckIcon className="size-3" />
                    </span>
                    <span className="text-text-primary">{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#cta"
                className={`mt-3xl inline-flex min-h-11 items-center justify-center rounded-full px-lg text-sm font-medium transition-colors ${
                  tier.featured
                    ? 'bg-brand-600 text-white shadow-soft hover:bg-brand-700'
                    : 'border border-border bg-bg-primary text-text-primary hover:bg-brand-100'
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