export const metadata = {
  title: 'Terms of Service — Ember & Wood',
  description: 'Terms of Service for Ember & Wood restaurant bookings.',
};

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-white">
      <section className="section pt-20 md:pt-32">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-8" style={{ color: 'var(--text-primary)' }}>
            Terms of Service
          </h1>
          <p className="text-lg mb-8" style={{ color: 'var(--text-secondary)' }}>
            Last updated: September 2026
          </p>

          <div className="space-y-12" style={{ color: 'var(--text-secondary)' }}>
            <section>
              <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
                1. Agreement
              </h2>
              <p>
                By using Ember & Wood, you agree to these Terms. If you disagree, do not use the site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
                2. Use of Site
              </h2>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>You must be 18+ or have parental consent</li>
                <li>You agree to provide accurate information for your booking</li>
                <li>You are responsible for your account and booking details</li>
                <li>No unauthorized access, scraping, or abuse of the booking system</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
                3. Booking Policies
              </h2>
              <p className="mb-4">
                All bookings are confirmed on a first-come, first-served basis. We seat on a first-confirmed basis
                — so reserve early, especially for dinner. Parties over 8 guests must contact us directly.
              </p>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>Monday: Closed</li>
                <li>Tuesday – Friday: 11:00 – 12:30 (lunch) & 17:00 – 21:00 (dinner)</li>
                <li>Saturday – Sunday: 11:00 – 12:30 (lunch) & 17:00 – 21:00 (dinner)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
                4. Intellectual Property
              </h2>
              <p>
                All content, design, and code is owned by Ember & Wood. You may not copy, reproduce, or
                redistribute without permission.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
                5. Limitation of Liability
              </h2>
              <p>
                Site provided "as-is." No warranties regarding availability, accuracy, or fitness for
                purpose.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
                6. Governing Law
              </h2>
              <p>
                Governed by the laws of Oregon, USA.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
                7. Contact
              </h2>
              <p>
                Questions? Email <a href="mailto:hello@emberandwood.example" className="underline" style={{ color: 'var(--brand)' }}>hello@emberandwood.example</a>
              </p>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}