import type { Metadata } from 'next';
import SiteNav from '@/components/site/nav';
import SiteFooter from '@/components/site/footer';

export const metadata: Metadata = {
  title: 'Privacy Policy — Ember & Wood',
  description: 'Privacy Policy for Ember & Wood restaurant bookings.',
  openGraph: {
    title: 'Privacy Policy — Ember & Wood',
    description: 'Privacy Policy for Ember & Wood restaurant bookings.',
    type: 'website',
    siteName: 'Ember & Wood',
    url: 'https://emberandwood.com/privacy',
  },
  twitter: {
    card: 'summary',
    title: 'Privacy Policy — Ember & Wood',
    description: 'Privacy Policy for Ember & Wood restaurant bookings.',
  },
};

export default function PrivacyPolicy() {
  return (
    <>
      <SiteNav />
      <main id="main" className="min-h-screen bg-white">
        <section className="section pt-20 md:pt-32">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-8 text-text-primary">
              Privacy Policy
            </h1>
            <p className="text-lg mb-8 text-text-secondary">
              Last updated: September 2026
            </p>

            <div className="space-y-12 text-text-secondary">
              <section>
                <h2 className="text-2xl font-semibold mb-4 text-text-primary">
                  1. Information We Collect
                </h2>
                <p className="mb-4">
                  When you interact with Ember & Wood, we may collect:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Contact information (name, email, phone) when you submit a booking request</li>
                  <li>Booking details (party size, date, time, dietary notes)</li>
                  <li>Technical data (IP address, browser type, pages visited) via standard web analytics</li>
                  <li>Any information you voluntarily provide</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-text-primary">
                  2. How We Use Your Information
                </h2>
                <ul className="list-disc list-inside space-y-2">
                  <li>To confirm and manage your table reservation</li>
                  <li>To communicate about bookings, changes, and updates</li>
                  <li>To improve our service and the booking experience</li>
                  <li>To comply with legal obligations</li>
                  <li>To send relevant updates (you can unsubscribe anytime)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-text-primary">
                  3. Data Sharing
                </h2>
                <p>
                  We do not sell your personal information. We may share data with:
                </p>
                <ul className="list-disc list-inside space-y-2 mt-2">
                  <li>Hosting providers (Vercel) for site deployment</li>
                  <li>Legal authorities when required by law</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-text-primary">
                  4. Data Retention
                </h2>
                <p>
                  We retain booking data as long as it is needed to manage your reservation and for
                  record-keeping. Analytics data is retained per provider policies (Vercel: 30 days).
                  You may request deletion at any time.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-text-primary">
                  5. Your Rights
                </h2>
                <p>
                  You may request access, correction, or deletion of your personal data by contacting us.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-text-primary">
                  6. Contact
                </h2>
                <p>
                  Questions about this policy? Email{' '}
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