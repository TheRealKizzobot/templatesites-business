import { RESTAURANT } from '@/lib/data';

export default function ReservationCTA() {
  return (
    <section
      id="reserve"
      className="section bg-brand-800 text-white"
      aria-labelledby="reserve-title"
    >
      <div className="container-page flex flex-col items-center gap-lg text-center">
        <p className="section-kicker text-brand-300">Reservations</p>
        <h2 id="reserve-title" className="font-display text-3xl text-white sm:text-4xl">
          The hearth is waiting.
        </h2>
        <p className="max-w-xl text-brand-100">
          Book by phone and we’ll hold the table by the fire. For same-week
          availability, the bar is first come, first seated.
        </p>
        <div className="mt-md flex flex-col items-center gap-md sm:flex-row sm:gap-lg">
          <a href={RESTAURANT.phoneHref} className="btn btn-on-dark">
            {RESTAURANT.phone}
          </a>
          <a
            href="#contact"
            className="btn border border-brand-300/70 text-brand-100 hover:border-white hover:bg-white/10"
          >
            Contact the host
          </a>
        </div>
      </div>
    </section>
  );
}