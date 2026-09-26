'use client';

import SiteNav from '@/components/site/nav';
import SiteFooter from '@/components/site/footer';
import FadeIn from '@/components/site/fade-in';
import BookingWidget from '@/components/booking-widget';

const SIGNATURE_DISHES = [
  {
    name: 'Wood-Roasted Half Chicken',
    blurb: 'Smoked chili glaze, charred allium, bread drippings',
    price: '$34',
  },
  {
    name: 'Fire-Roasted Squash',
    blurb: 'Brown butter, crispy sage, toasted seeds',
    price: '$18',
  },
  {
    name: 'Ember Flatbread',
    blurb: 'Burrata, market greens, smoked olive oil',
    price: '$16',
  },
];

const TESTIMONIALS = [
  {
    quote:
      'The wood-roasted chicken alone is worth the trip — the dining room fills up fast, so book ahead.',
    name: 'Camille R.',
    role: 'Window-seat regular',
  },
  {
    quote:
      'Quiet, warm, and genuinely seasonal. Ember & Wood has become our family\'s Sunday ritual.',
    name: 'Daniel K.',
    role: 'Four-year regular',
  },
  {
    quote:
      'Came for a birthday, left planning the next visit. The service and the fire are both extraordinary.',
    name: 'Priya S.',
    role: 'Celebrated here twice in 2025',
  },
];

const HOURS = [
  {
    day: 'Monday',
    note: 'Closed',
    lunch: '—',
    dinner: '—',
    closed: true,
  },
  {
    day: 'Tuesday – Friday',
    note: '',
    lunch: '11:00 – 12:30',
    dinner: '17:00 – 21:00',
  },
  {
    day: 'Saturday',
    note: '',
    lunch: '11:00 – 12:30',
    dinner: '17:00 – 21:00',
  },
  {
    day: 'Sunday',
    note: '',
    lunch: '11:00 – 12:30',
    dinner: '17:00 – 21:00',
  },
];

export default function Home() {
  return (
    <>
      <SiteNav />

      <main id="main">
        <section id="top" aria-labelledby="hero-title" className="bg-bg-secondary">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_auto] lg:py-24">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">
                Ember & Wood · Wood-fired kitchen & natural wine
              </p>
              <h1 id="hero-title" className="mt-4 text-4xl leading-tight text-brand-900 sm:text-5xl">
                Reserve your table
              </h1>
              <p className="mt-4 max-w-md text-lg leading-relaxed text-text-secondary">
                Seasonal plates cooked over live fire, in a room that feels like
                a slow Sunday afternoon. Tuesday to Sunday, lunch and dinner.
              </p>
              <div className="mt-8">
                <a
                  href="#book"
                  className="btn px-8 py-3.5 text-base bg-brand-800 text-brand-50 hover:bg-brand-700"
                >
                  Book a table
                </a>
              </div>
            </div>

            <div aria-hidden="true" className="hidden lg:flex">
              <svg
                className="h-64 w-64 text-brand-500"
                viewBox="0 0 200 200"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="100" cy="100" r="88" strokeOpacity="0.4" />
                <circle cx="100" cy="100" r="60" strokeOpacity="0.3" />
                <path
                  d="M100 40c26 14 34 46 16 64-10 10-30 8-36-8-16 6-28 20-24 40"
                  strokeLinecap="round"
                />
                <path
                  d="M100 40c-26 14-34 46-16 64 10 10 30 8 36-8 16 6 28 20 24 40"
                  strokeLinecap="round"
                  strokeOpacity="0.6"
                />
                <circle cx="100" cy="132" r="6" fill="currentColor" stroke="none" />
              </svg>
            </div>
          </div>
        </section>

        <section id="about" aria-labelledby="about-title" className="bg-white">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:py-20">
            <FadeIn>
              <h2 id="about-title" className="text-3xl text-brand-900">
                Cooked over fire, poured by the glass
              </h2>
              <p className="mt-5 leading-relaxed text-text-secondary">
                We roast, sear, and smoke over a single wood fireplace in the
                middle of the room. Menus change with the market — what arrives
                in the morning decides what we cook that night.
              </p>
              <p className="mt-4 leading-relaxed text-text-secondary">
                The wine list leans natural and low-intervention, with a rotating
                roster by the glass. Sixteen seats at the bar, thirty-two at the
                tables, and one long counter for those who want to watch the fire.
              </p>
              <p className="mt-4 leading-relaxed text-text-secondary">
                Every booking is confirmed by email, and we seat on a
                first-confirmed basis — so reserve early, especially for dinner.
              </p>
            </FadeIn>

            <div className="overflow-hidden rounded-xl shadow-soft">
              <img
                src="/images/about.svg"
                alt="Flat illustration of Ember & Wood's wood-fired dining room"
                width={800}
                height={560}
                loading="lazy"
                className="h-auto w-full"
              />
            </div>
          </div>
        </section>

        <section id="menu" aria-labelledby="menu-title" className="bg-bg-secondary">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
            <h2 id="menu-title" className="text-3xl text-brand-900">
              Signature dishes
            </h2>
            <p className="mt-3 max-w-xl text-text-secondary">
              A few plates that never leave the menu. The rest changes with the
              market every week.
            </p>
            <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {SIGNATURE_DISHES.map((d) => (
                <li
                  key={d.name}
                  className="card flex flex-col gap-2 p-6 transition-transform duration-200 hover:-translate-y-1"
                >
                  <h3 className="text-xl text-brand-900">{d.name}</h3>
                  <p className="flex-1 text-sm leading-relaxed text-text-secondary">
                    {d.blurb}
                  </p>
                  <p className="font-display text-lg font-semibold text-brand-700">
                    {d.price}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="book" aria-labelledby="book-title" className="bg-white">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
              <div>
                <h2 id="book-title" className="text-3xl text-brand-900">
                  Reserve your table
                </h2>
                <p className="mt-4 max-w-md leading-relaxed text-text-secondary">
                  Room for more than eight guests? Email us directly and
                  we&apos;ll sort you out. For everything else, a quick form is
                  all it takes — every request is confirmed by email.
                </p>
                <dl className="mt-8 space-y-2 text-sm">
                  <div className="flex gap-3">
                    <dt className="w-20 shrink-0 font-medium text-text-primary">Lunch</dt>
                    <dd className="text-text-secondary">11:00 – 12:30, every 15 minutes</dd>
                  </div>
                  <div className="flex gap-3">
                    <dt className="w-20 shrink-0 font-medium text-text-primary">Dinner</dt>
                    <dd className="text-text-secondary">17:00 – 21:00, every 15 minutes</dd>
                  </div>
                  <div className="flex gap-3">
                    <dt className="w-20 shrink-0 font-medium text-text-primary">Parties</dt>
                    <dd className="text-text-secondary">1 – 8 guests per table request</dd>
                  </div>
                </dl>
              </div>

              <BookingWidget />
            </div>
          </div>
        </section>

        <section
          id="testimonials"
          aria-labelledby="testimonials-title"
          className="bg-bg-secondary"
        >
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
            <h2 id="testimonials-title" className="text-3xl text-brand-900">
              Word of mouth
            </h2>
            <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {TESTIMONIALS.map((t) => (
                <li
                  key={t.name}
                  className="card flex flex-col gap-4 p-6 transition-transform duration-200 hover:-translate-y-1"
                >
                  <svg
                    aria-hidden="true"
                    className="h-5 w-5 text-brand-400"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M10 7H6a3 3 0 0 0-3 3v7h7v-7H7a3 3 0 0 1 3-3V7Zm11 0h-4a3 3 0 0 0-3 3v7h7v-7h-3a3 3 0 0 1 3-3V7Z" />
                  </svg>
                  <blockquote className="leading-relaxed text-text-primary">
                    {t.quote}
                  </blockquote>
                  <footer className="mt-auto border-t border-hairline pt-3">
                    <p className="font-medium">{t.name}</p>
                    <p className="text-sm text-text-secondary">{t.role}</p>
                  </footer>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="contact" aria-labelledby="hours-title" className="bg-white">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
              <div id="hours">
                <h2 id="hours-title" className="text-3xl text-brand-900">
                  Hours & contact
                </h2>
                <table className="mt-6 w-full max-w-md border-collapse text-sm">
                  <caption className="sr-only">Opening hours</caption>
                  <thead>
                    <tr className="border-b border-hairline text-left text-text-secondary">
                      <th scope="col" className="py-2 pr-4 font-medium">Day</th>
                      <th scope="col" className="py-2 pr-4 font-medium">Lunch</th>
                      <th scope="col" className="py-2 font-medium">Dinner</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-hairline">
                    {HOURS.map((h) => (
                      <tr key={h.day}>
                        <td className="py-3 pr-4 font-medium">{h.day}</td>
                        <td className="py-3 pr-4 text-text-secondary">
                          {h.closed ? h.note : h.lunch}
                        </td>
                        <td className="py-3 text-text-secondary">
                          {h.closed ? h.note : h.dinner}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <address className="not-italic">
                <ul className="space-y-4">
                  <li className="card flex items-start gap-4 p-5">
                    <span aria-hidden="true" className="mt-0.5 text-brand-500">
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
                        <circle cx="12" cy="10" r="2.5" />
                      </svg>
                    </span>
                    <div>
                      <p className="font-medium">Find us</p>
                      <p className="text-text-secondary">
                        14 Mill Lane, Old Town
                        <br />
                        Portland, OR 97205
                      </p>
                    </div>
                  </li>
                  <li className="card flex items-start gap-4 p-5">
                    <span aria-hidden="true" className="mt-0.5 text-brand-500">
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.5-1.1a2 2 0 0 1 2.1-.5c.8.3 1.7.5 2.6.6a2 2 0 0 1 1.7 2Z" />
                      </svg>
                    </span>
                    <div>
                      <p className="font-medium">Call or write</p>
                      <p className="text-text-secondary">
                        <a href="tel:+15035550142" className="underline-offset-2 hover:underline">(503) 555-0142</a>
                        <br />
                        <a href="mailto:hello@emberandwood.com" className="underline-offset-2 hover:underline">hello@emberandwood.com</a>
                      </p>
                    </div>
                  </li>
                  <li className="card flex items-start gap-4 p-5">
                    <span aria-hidden="true" className="mt-0.5 text-brand-500">
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="9" />
                        <path d="M12 7v5l3 2" />
                      </svg>
                    </span>
                    <div>
                      <p className="font-medium">Good to know</p>
                      <p className="text-text-secondary">
                        Closed Mondays. Parties over 8 by email — we&apos;ll make room.
                      </p>
                    </div>
                  </li>
                </ul>
              </address>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}