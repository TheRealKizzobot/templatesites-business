import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — TaskFlow',
  description: 'Privacy Policy for TaskFlow.',
  openGraph: {
    title: 'Privacy Policy — TaskFlow',
    description: 'Privacy Policy for TaskFlow.',
    url: 'https://taskflow.app/privacy',
    siteName: 'TaskFlow',
    type: 'website',
  },
};

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-bg-primary">
      <section className="pt-20 md:pt-32">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
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
                When you interact with TaskFlow, we may collect:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Contact information (name, email) when you submit forms</li>
                <li>Technical data (IP address, browser type, pages visited) via standard web analytics</li>
                <li>Any information you voluntarily provide</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-text-primary">
                2. How We Use Your Information
              </h2>
              <ul className="list-disc list-inside space-y-2">
                <li>To provide and improve our services</li>
                <li>To communicate about updates and support</li>
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
                We retain contact form data as long as needed for the purpose it was submitted or as needed for legal compliance.
                Analytics data is retained per provider policies (Vercel: 30 days). You may request deletion at any time.
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
                Questions about this policy? Email us at <a href="mailto:connect@dkservers.space" className="underline text-brand hover:no-underline">connect@dkservers.space</a>
              </p>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}