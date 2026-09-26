export const metadata = {
  title: "Terms of Service — Metrics",
  description: "Terms of Service for Metrics.",
};

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-bg-primary dark:bg-bg-primary">
      <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6 md:pt-32 pt-20">
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
              <p>
                By using Metrics, you agree to these Terms. If you disagree, do not use the site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-text-primary">
                2. Use of Site
              </h2>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>You must be 18+ or have parental consent</li>
                <li>You agree to provide accurate information</li>
                <li>You are responsible for your account security</li>
                <li>No unauthorized access, scraping, or abuse</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-text-primary">
                3. Orders & Payments
              </h2>
              <p className="mb-4">For e-commerce and booking sites:</p>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>Prices are in USD unless stated otherwise</li>
                <li>Payment processed via secure providers (Stripe)</li>
                <li>Orders confirmed via email</li>
                <li>Refunds per individual site policy</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-text-primary">
                4. Intellectual Property
              </h2>
              <p>
                All content, design, and code is owned by MoshineSites or licensed. You may not copy, reproduce, or redistribute without permission.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-text-primary">
                5. Disclaimer
              </h2>
              <p>
                Site provided "as-is." No warranties regarding availability, accuracy, or fitness for purpose.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-text-primary">
                6. Limitation of Liability
              </h2>
              <p>
                Liability limited to amount paid. Not liable for indirect, incidental, or consequential damages.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-text-primary">
                7. Governing Law
              </h2>
              <p>Governed by laws of North Carolina, USA.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-text-primary">
                8. Contact
              </h2>
              <p>
                Questions? Email <a href="mailto:connect@dkservers.space" className="underline text-brand">connect@dkservers.space</a>
              </p>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
