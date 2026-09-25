export const metadata = {
  title: "Terms of Service — Northlight Goods",
  description: "Terms of Service for Northlight Goods.",
};

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-white">
      <section className="section pt-20 md:pt-32">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-8" style={{ color: "var(--text-primary)" }}>
            Terms of Service
          </h1>
          <p className="text-lg mb-8" style={{ color: "var(--text-secondary)" }}>
            Last updated: September 2026
          </p>

          <div className="space-y-12" style={{ color: "var(--text-secondary)" }}>
            <section>
              <h2 className="text-2xl font-semibold mb-4" style={{ color: "var(--text-primary)" }}>
                1. Agreement
              </h2>
              <p>
                By using Northlight Goods, you agree to these Terms. If you disagree, do not use the site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4" style={{ color: "var(--text-primary)" }}>
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
              <h2 className="text-2xl font-semibold mb-4" style={{ color: "var(--text-primary)" }}>
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
              <h2 className="text-2xl font-semibold mb-4" style={{ color: "var(--text-primary)" }}>
                4. Intellectual Property
              </h2>
              <p>
                All content, design, and code is owned by MoshineSites or licensed. You may not copy, reproduce, or redistribute without permission.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4" style={{ color: "var(--text-primary)" }}>
                5. Disclaimer
              </h2>
              <p>
                Site provided "as-is." No warranties regarding availability, accuracy, or fitness for purpose.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4" style={{ color: "var(--text-primary)" }}>
                6. Limitation of Liability
              </h2>
              <p>
                Liability limited to amount paid. Not liable for indirect, incidental, or consequential damages.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4" style={{ color: "var(--text-primary)" }}>
                7. Governing Law
              </h2>
              <p>Governed by laws of North Carolina, USA.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4" style={{ color: "var(--text-primary)" }}>
                8. Contact
              </h2>
              <p>
                Questions? Email <a href="mailto:info@northlightgoods.example.com" className="underline" style={{ color: "var(--brand)" }}>info@northlightgoods.example.com</a>
              </p>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
