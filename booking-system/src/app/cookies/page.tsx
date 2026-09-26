import type { Metadata } from 'next';
import SiteNav from '@/components/site/nav';
import SiteFooter from '@/components/site/footer';

export const metadata: Metadata = {
  title: 'Cookie Policy — Ember & Wood',
  description: 'Cookie Policy for Ember & Wood restaurant bookings.',
  openGraph: {
    title: 'Cookie Policy — Ember & Wood',
    description: 'Cookie Policy for Ember & Wood restaurant bookings.',
    type: 'website',
    siteName: 'Ember & Wood',
    url: 'https://emberandwood.com/cookies',
  },
  twitter: {
    card: 'summary',
    title: 'Cookie Policy — Ember & Wood',
    description: 'Cookie Policy for Ember & Wood restaurant bookings.',
  },
};

export default function CookiePolicy() {
  return (
    <>
      <SiteNav />
      <main id="main" className="min-h-screen bg-white">
        <section className="section pt-20 md:pt-32">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-8 text-text-primary">
              Cookie Policy
            </h1>
            <p className="text-lg mb-8 text-text-secondary">
              Last updated: September 2026
            </p>

            <div className="space-y-12 text-text-secondary">
              <section>
                <h2 className="text-2xl font-semibold mb-4 text-text-primary">
                  1. What Are Cookies
                </h2>
                <p>
                  Cookies are small text files stored on your device when you visit a website. They help
                  sites function properly and provide analytics.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-text-primary">
                  2. Cookies We Use
                </h2>
                <p>Ember & Wood uses the following categories of cookies:</p>
                <ul className="list-disc list-inside space-y-2 mt-2">
                  <li><strong>Essential cookies:</strong> Session management, authentication, booking form functionality</li>
                  <li><strong>Analytics cookies:</strong> Anonymous page views and performance metrics</li>
                  <li><strong>Preference cookies:</strong> Theme or language preferences</li>
                </ul>
                <p className="mt-2">
                  We do not use advertising or tracking cookies. No third-party advertising cookies are set.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-text-primary">
                  3. Cookie Details
                </h2>
                <table className="w-full border-collapse text-sm text-text-secondary">
                  <thead>
                    <tr className="border-b border-hairline">
                      <th className="text-left py-2 px-3">Cookie</th>
                      <th className="text-left py-2 px-3">Purpose</th>
                      <th className="text-left py-2 px-3">Duration</th>
                      <th className="text-left py-2 px-3">Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-hairline">
                      <td className="py-2 px-3 font-mono">__session</td>
                      <td className="py-2 px-3">Session management</td>
                      <td className="py-2 px-3">Session</td>
                      <td className="py-2 px-3">Essential</td>
                    </tr>
                    <tr className="border-b border-hairline">
                      <td className="py-2 px-3 font-mono">vercel-analytics</td>
                      <td className="py-2 px-3">Anonymous page views</td>
                      <td className="py-2 px-3">1 year</td>
                      <td className="py-2 px-3">Analytics</td>
                    </tr>
                    <tr className="border-b border-hairline">
                      <td className="py-2 px-3 font-mono">theme</td>
                      <td className="py-2 px-3">Theme preference</td>
                      <td className="py-2 px-3">1 year</td>
                      <td className="py-2 px-3">Preference</td>
                    </tr>
                  </tbody>
                </table>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-text-primary">
                  4. Managing Cookies
                </h2>
                <p>You can manage cookies via your browser settings:</p>
                <ul className="list-disc list-inside space-y-2 mt-2">
                  <li>Block all cookies (may break site functionality)</li>
                  <li>Block third-party cookies only</li>
                  <li>Clear cookies on browser close</li>
                </ul>
                <p className="mt-2">
                  Note: Disabling essential cookies will break booking and confirmation functionality.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-text-primary">
                  5. Contact
                </h2>
                <p>
                  Questions about this policy? Email{' '}
                  <a href="mailto:connect@dkservers.space" className="underline text-brand-600 hover:text-brand-700">
                    connect@dkservers.space
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