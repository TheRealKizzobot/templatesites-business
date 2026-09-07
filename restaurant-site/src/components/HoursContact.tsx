import { HOURS, RESTAURANT } from '@/lib/data';

export default function HoursContact() {
  return (
    <section
      id="contact"
      className="section bg-bg-secondary"
      aria-labelledby="contact-title"
    >
      <div className="container-page grid gap-xl lg:grid-cols-2 lg:gap-2xl">
        <div>
          <p className="section-kicker">Hours &amp; contact</p>
          <h2 id="contact-title" className="section-title">
            Find us by the river
          </h2>
          <p className="section-lede">
            Walk-ins are welcome at the bar. Reservations open three weeks out.
          </p>

          <table className="mt-xl w-full max-w-md text-left">
            <caption className="sr-only">Weekly opening hours</caption>
            <thead className="sr-only">
              <tr>
                <th scope="col">Days</th>
                <th scope="col">Hours</th>
              </tr>
            </thead>
            <tbody>
              {HOURS.map((row) => (
                <tr
                  key={row.days}
                  className="border-b border-border last:border-0"
                >
                  <th
                    scope="row"
                    className="py-md pr-md font-display text-lg font-medium text-text-primary"
                  >
                    {row.days}
                  </th>
                  <td className="py-md text-right text-text-secondary">
                    {row.hours}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <address className="mt-xl flex flex-col gap-md not-italic">
            <p className="text-text-primary">{RESTAURANT.address}</p>
            <a
              href={RESTAURANT.phoneHref}
              className="inline-flex min-h-[44px] items-center text-brand-600 underline decoration-brand-300 underline-offset-4 hover:text-brand-800"
            >
              {RESTAURANT.phone}
            </a>
            <a
              href={`mailto:${RESTAURANT.email}`}
              className="inline-flex min-h-[44px] items-center text-brand-600 underline decoration-brand-300 underline-offset-4 hover:text-brand-800"
            >
              {RESTAURANT.email}
            </a>
          </address>
        </div>

        <div className="flex">
          <div className="flex w-full flex-col justify-center rounded-xl bg-bg-primary p-lg shadow-lift sm:p-xl">
            <h3 className="font-display text-2xl text-text-primary">
              Plan your evening
            </h3>
            <p className="mt-md text-text-secondary">
              For parties of seven or more, a private event, or a quiet
              anniversary window, call us — a real person answers the phone.
            </p>
            <a
              href={RESTAURANT.phoneHref}
              className="btn btn-primary mt-lg self-start"
            >
              Call {RESTAURANT.phone}
            </a>
            <p className="mt-lg text-sm text-text-secondary">
              Dinner service begins at 5 PM. The kitchen closes 30 minutes
              before last seating.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}