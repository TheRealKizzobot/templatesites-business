export const metadata = {
  title: "Privacy Policy — Ember SITE_NAME Wood",
  description: "Privacy Policy for Ember SITE_NAME Wood.",
};

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-white">
      <section className="section pt-20 md:pt-32">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-8" style={{ color: "var(--text-primary)" }}>
            Privacy Policy
          </h1>
          <p className="text-lg mb-8" style={{ color: "var(--text-secondary)" }}>
            Last updated: September 2026
          </p>

          <div className="space-y-12" style={{ color: "var(--text-secondary)" }}>
            <section>
              <h2 className="text-2xl font-semibold mb-4" style={{ color: "var(--text-primary)" }}>
                1. Information We Collect
              </h2>
              <p className="mb-4">
                When you interact with Ember SITE_NAME Wood, we may collect:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Contact information (name, email, phone) when you submit forms</li>
                <li>Account information if you create an account</li>
                <li>Order and payment information for purchases</li>
                <li>Technical data (IP address, browser type, pages visited) via standard web analytics</li>
                <li>Any information you voluntarily provide</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4" style={{ color: "var(--text-primary)" }}>
                2. How We Use Your Information
              </h2>
              <ul className="list-disc list-inside space-y-2">
                <li>To provide and improve our services</li>
                <li>To process orders and manage accounts</li>
                <li>To communicate about orders, updates, and support</li>
                <li>To comply with legal obligations</li>
                <li>To send relevant updates (you can unsubscribe anytime)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4" style={{ color: "var(--text-primary)" }}>
                3. Data Sharing
              </h2>
              <p>
                We do not sell your personal information. We may share data with:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>Payment processors for transactions</li>
                <li>Hosting providers (Vercel) for site deployment</li>
                <li>Legal authorities when required by law</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4" style={{ color: "var(--text-primary)" }}>
                4. Data Retention
              </h2>
              <p>
                We retain account and order data as long as your account is active or as needed for legal compliance.
                Analytics data is retained per provider policies (Vercel: 30 days). You may request deletion at any time.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4" style={{ color: "var(--text-primary)" }}>
                5. Your Rights
              </h2>
              <p>
                You may request access, correction, or deletion of your personal data by contacting us.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4" style={{ color: "var(--text-primary)" }}>
                6. Contact
              </h2>
              <p>
                Questions about this policy? Email us at <a href="mailto:info@emberwood.example.com" className="underline" style={{ color: "var(--brand)" }}>info@emberwood.example.com</a>
              </p>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
