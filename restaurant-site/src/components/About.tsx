import { STATS } from '@/lib/data';

export default function About() {
  return (
    <section id="about" className="section bg-bg-primary" aria-labelledby="about-title">
      <div className="container-page grid items-center gap-xl lg:grid-cols-2 lg:gap-2xl">
        <div className="overflow-hidden rounded-xl shadow-lift">
          <img
            src="/images/about.svg"
            alt="The Ember and Wood kitchen at work beside the open flame"
            width={800}
            height={800}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>

        <div>
          <p className="section-kicker">Our story</p>
          <h2 id="about-title" className="section-title">
            A neighborhood table, tended with fire.
          </h2>
          <p className="mt-lg text-text-primary">
            Ember &amp; Wood began in 2012 with a single oak-burning hearth and a
            stubborn idea: dinner should taste like the place it comes from. We
            cook over live wood every night, let the seasons write the menu, and
            keep the room small enough that every plate feels personal.
          </p>
          <p className="mt-md text-text-secondary">
            Twelve years later the hearth is still the first thing we light. Our
            butchers, bakers and the long-time regulars at the bar are the heart
            of it — everything else is just smoke and patience.
          </p>

          <div className="mt-xl flex flex-wrap gap-md">
            {STATS.map((stat) => (
              <div
                key={stat.value}
                className="flex-1 min-w-[140px] rounded-xl bg-bg-secondary px-lg py-lg"
              >
                <p className="font-display text-xl text-brand-700">{stat.value}</p>
                <p className="mt-xs text-sm text-text-secondary">{stat.label}</p>
              </div>
            ))}
          </div>

          <p className="mt-lg font-display text-2xl italic text-brand-400">
            — The Ember &amp; Wood kitchen
          </p>
        </div>
      </div>
    </section>
  );
}