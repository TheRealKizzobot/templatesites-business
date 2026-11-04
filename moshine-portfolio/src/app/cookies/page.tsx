export const metadata = {
  title: "Cookie Policy — MoshineSites",
  description: "Cookie Policy for MoshineSites.",
  openGraph: {
    title: "Cookie Policy — MoshineSites",
    description: "Cookie Policy for MoshineSites.",
    type: "website",
    siteName: "MoshineSites",
    locale: "en_US",
    url: "https://dkservers.space/cookies",
  },
  twitter: {
    card: "summary",
    title: "Cookie Policy — MoshineSites",
    description: "Cookie Policy for MoshineSites.",
  },
};

export default function CookiePolicy() {
  return (
    <main className="min-h-screen bg-bg-primary dark:bg-bg-primary">
      <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6 md:pt-32 pt-20">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-display font-medium mb-8 text-text-primary">
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
                Cookies are small text files stored on your device when you visit our website.
                They help us provide you with a better experience and understand how you use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-text-primary">
                2. How We Use Cookies
              </h2>
              <p className="mb-4">We use cookies for the following purposes:</p>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>
                  <strong className="text-text-primary">Essential cookies:</strong> Required for the
                  website to function properly, including session management and security.
                </li>
                <li>
                  <strong className="text-text-primary">Functionality cookies:</strong> Remember
                  your preferences and settings.
                </li>
                <li>
                  <strong className="text-text-primary">Analytics cookies:</strong> Help us
                  understand how visitors interact with our website.
                </li>
                <li>
                  <strong className="text-text-primary">Application data cookies:</strong> For our
                  demo templates (Northlight Goods, Book & Dine, Metrics), we store application
                  data like cart items, bookings, and dashboard settings in cookies for
                  demonstration purposes.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-text-primary">
                3. Demo Template Data Storage
              </h2>
              <p className="mb-4">
                Our demo templates use cookies to store data locally in your browser for
                demonstration purposes. This includes:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>
                  <strong className="text-text-primary">Northlight Goods (E-commerce):</strong>
                  {' '}
                  Shopping cart contents, product catalog data, and order information
                </li>
                <li>
                  <strong className="text-text-primary">Book & Dine (Reservations):</strong>
                  {' '}
                  Booking information and reservation data
                </li>
                <li>
                  <strong className="text-text-primary">Metrics (Analytics):</strong>
                  {' '}
                  Dashboard settings and analytics data
                </li>
              </ul>
              <p className="mt-4">
                This data is stored only in your browser cookies and is not transmitted to
                external servers. Each user has their own isolated data that others cannot see.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-text-primary">
                4. Managing Cookies
              </h2>
              <p>
                You can control and/or delete cookies as you wish. You can delete all cookies
                that are already on your computer and you can set most browsers to prevent them
                from being placed. However, if you do this, you may have to manually adjust some
                preferences every time you visit our site and some services and functionalities
                may not work.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-text-primary">
                5. Contact Us
              </h2>
              <p>
                Questions? Email{' '}
                <a href="mailto:connect@dkservers.space" className="underline text-brand">
                  connect@dkservers.space
                </a>
              </p>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}