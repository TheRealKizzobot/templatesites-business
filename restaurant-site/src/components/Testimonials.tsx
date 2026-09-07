import { TESTIMONIALS } from '@/lib/data';
import type { Testimonial } from '@/lib/data';

function Stars({ count }: { count: number }) {
  return (
    <span
      className="inline-flex items-center gap-[2px] text-warning"
      role="img"
      aria-label={`Rated ${count} out of 5 stars`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className="h-4 w-4"
          aria-hidden="true"
          fill={i < count ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            d="m12 3 2.7 5.5 6 .9-4.35 4.2 1 6L12 17.2 6.65 19.6l1-6L3.3 9.4l6-.9L12 3Z"
            strokeLinejoin="round"
          />
        </svg>
      ))}
    </span>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="flex flex-col rounded-xl bg-bg-secondary p-lg shadow-soft">
      <Stars count={testimonial.rating} />
      <blockquote className="mt-md flex-1 text-text-primary">
        <q className="text-lg leading-relaxed">“{testimonial.quote}”</q>
      </blockquote>
      <figcaption className="mt-lg border-t border-border pt-md">
        <p className="font-display text-lg text-text-primary">{testimonial.name}</p>
        <p className="mt-xs text-sm text-text-secondary">{testimonial.role}</p>
      </figcaption>
    </figure>
  );
}

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="section bg-bg-primary"
      aria-labelledby="testimonials-title"
    >
      <div className="container-page">
        <div className="max-w-2xl">
          <p className="section-kicker">Word of mouth</p>
          <h2 id="testimonials-title" className="section-title">
            From our regulars
          </h2>
        </div>

        <div className="mt-xl grid gap-lg sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((testimonial) => (
            <TestimonialCard
              key={testimonial.name}
              testimonial={testimonial}
            />
          ))}
        </div>
      </div>
    </section>
  );
}