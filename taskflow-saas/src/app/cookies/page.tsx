import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Policy — TaskFlow',
  description: 'Cookie Policy for TaskFlow.',
  openGraph: {
    title: 'Cookie Policy — TaskFlow',
    description: 'Cookie Policy for TaskFlow.',
    url: 'https://taskflow.app/cookies',
    siteName: 'TaskFlow',
    type: 'website',
  },
};

export default function CookiePolicy() {
  return (
    <main className="min-h-screen bg-bg-primary">
      <section className="pt-20 md:pt-32">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
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
                Cookies are small text files stored on your device when you visit a website. They help sites function properly and provide analytics.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-text-primary">
                2. Cookies We Use
              </h2>
              <p>TaskFlow uses only the following cookies:</p>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li><strong>Essential cookies:</strong> Theme selection preference</li>
                <li><strong>Analytics cookies:</strong> Vercel Analytics (page views, performance metrics) — anonymized</li>
              </ul>
              <p className="mt-2">
                We do not use advertising, tracking, session, or authentication cookies. TaskFlow has no user accounts, no shopping cart, and no server-side sessions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-text-primary">
                3. Cookie Details
              </h2>
              <table className="w-full border-collapse text-sm text-text-secondary">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 px-3">Cookie</th>
                    <th className="text-left py-2 px-3">Purpose</th>
                    <th className="text-left py-2 px-3">Duration</th>
                    <th className="text-left py-2 px-3">Type</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="py-2 px-3 font-mono">theme</td>
                    <td className="py-2 px-3">Theme preference (light/dark)</td>
                    <td className="py-2 px-3">1 year</td>
                    <td className="py-2 px-3">Essential</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 px-3 font-mono">vercel-analytics</td>
                    <td className="py-2 px-3">Anonymous page views</td>
                    <td className="py-2 px-3">1 year</td>
                    <td className="py-2 px-3">Analytics</td>
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
                <li>Block all cookies (may break theme persistence)</li>
                <li>Block third-party cookies only</li>
                <li>Clear cookies on browser close</li>
                <li>Use browser extensions for granular control</li>
              </ul>
              <p className="mt-2">
                Note: Disabling the theme cookie will prevent your dark/light mode preference from being remembered.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-text-primary">
                5. Third-Party Cookies
              </h2>
              <p>
                We do not set third-party cookies. Vercel Analytics sets first-party cookies on our domain. No advertising networks, social media pixels, or tracking pixels are used.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-text-primary">
                6. Consent
              </h2>
              <p>
                By using our site, you consent to essential cookies (theme preference). Analytics cookies are optional &mdash; you can disable them in your browser or via Vercel&rsquo;s privacy settings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-text-primary">
                7. Contact
              </h2>
              <p>
                Questions about this policy? Email <a href="mailto:connect@dkservers.space" className="underline text-brand hover:no-underline">connect@dkservers.space</a>
              </p>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}