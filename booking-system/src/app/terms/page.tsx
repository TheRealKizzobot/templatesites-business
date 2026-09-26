import type { Metadata } from 'next';
import SiteNav from '@/components/site/nav';
import SiteFooter from '@/components/site/footer';

export const metadata: Metadata = {
  title: 'Terms of Service — Ember & Wood',
  description: 'Terms of Service for Ember & Wood restaurant bookings.',
  openGraph: {
    title: 'Terms of Service — Ember & Wood',
    description: 'Terms of Service for Ember & Wood restaurant bookings.',
    type: 'website',
    siteName: 'Ember & Wood',
    url: 'https://emberandwood.com/terms',
  },
  twitter: {
    card: 'summary',
    title: 'Terms of Service — Ember & Wood',
    description: 'Terms of Service for Ember & Wood restaurant bookings.',
  },
};

export default function TermsOfService() {
  return (
    <>
      <SiteNav />
      <main id="main" className="min-h-screen bg-white">
        <section className="section pt-20 md:pt-32">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-8 text-text-primary">
              Terms of Service
            </h1>
            <p className="text-lg mb-8 text-text-secondary">
              Last updated: September 2026
            </p>

            <div className="space-y-12 text-text-secondary">
              <section>
                <h2 className="text-2xl font-semibold mb-4 text-text-primary">
                  1. Agreement
                </h2>
                <p className="mb-4">
                  By using Ember & Wood, you agree to these Terms. If you disagree, do not use the site.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-text-primary">
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
                <h2 className="text-2xl font-semibold mb-4 text-text-primary">
                  3. Booking Policies
                </h2>
                <p className="mb-4">
                  All bookings are confirmed on a first-come, first-served basis. We seat on a first-confirmed basis
                  &mdash; so reserve early, especially for dinner. Parties over 8 guests must contact us directly.
                </p>
                <ul className="list-disc list-inside space-y-2 mt-2">
                  <li>Monday: Closed</li>
                  <li>Tuesday &ndash; Friday: 11:00 &ndash; 12:30 (lunch) & 17:00 &ndash; 21:00 (dinner)</li>
                  <li>Saturday &ndash; Sunday: 11:00 &ndash; 12:30 (lunch) & 17:00 &ndash; 21:00 (dinner)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-text-primary">
                  4. Intellectual Property
                </h2>
                <p>
                  All content, design, and code is owned by Ember & Wood. You may not copy, reproduce, or
                  redistribute without permission.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-text-primary">
                  5. Limitation of Liability
                </h2>
                <p>
                  Site provided &ldquo;as-is.&rdquo; No warranties regarding availability, accuracy, or fitness for
                  purpose.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-text-primary">
                  6. Governing Law
                </h2>
                <p>
                  Governed by the laws of Oregon, USA.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-text-primary">
                  7. Contact
                </h2>
                <p>
                  Questions? Email{' '}
                  <a href="mailto:hello@emberandwood.com" className="underline text-brand-600 hover:text-brand-700">
                    hello@emberandwood.com
                  </a>
                </p>
              </section>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}