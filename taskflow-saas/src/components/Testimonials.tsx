import { StarIcon } from '@/components/icons';

const TESTIMONIALS = [
  {
    quote:
      'TaskFlow replaced three tools for our team. The live demo sold everyone in five minutes — they felt the momentum before we even wrote a contract.',
    name: 'Maya Chen',
    role: 'Product Lead, Lumen',
  },
  {
    quote:
      'I have tried every todo app that exists. This is the first one I have kept using for a year straight. The counter alone keeps me honest every day.',
    name: 'Diego Ramírez',
    role: 'Freelance Designer',
  },
  {
    quote:
      'Our support team shaves two hours a day off tracking work. Tasks just flow through the day without anyone chasing anyone else.',
    name: 'Priya Nair',
    role: 'Head of Ops, Northbeam',
  },
];

function Stars() {
  return (
    <div
      className="flex items-center gap-[2px] text-warning"
      role="img"
      aria-label="Rated 5 out of 5 stars"
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon key={i} className="size-4" />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-title"
      className="bg-bg-primary py-3xl"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold tracking-wide text-brand-600 uppercase">
            Testimonials
          </p>
          <h2
            id="testimonials-title"
            className="mt-sm font-display text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl"
          >
            Loved at every level
          </h2>
          <p className="mt-md text-md text-text-secondary">
            From solo makers to whole teams — TaskFlow meets people where they are.
          </p>
        </div>

        <ul className="mt-3xl grid gap-md md:grid-cols-3">
          {TESTIMONIALS.map((item) => (
            <li key={item.name}>
              <figure className="flex h-full flex-col rounded-xl bg-bg-secondary p-xl">
                <Stars />
                <blockquote className="mt-lg flex-1 text-md text-text-primary">
                  “{item.quote}”
                </blockquote>
                <figcaption className="mt-lg border-t border-border/70 pt-lg">
                  <p className="font-display text-lg font-semibold tracking-tight text-text-primary">
                    {item.name}
                  </p>
                  <p className="mt-xs text-sm text-text-secondary">{item.role}</p>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}