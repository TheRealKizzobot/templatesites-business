import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/site/nav";
import Footer from "@/components/site/footer";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dkservers.space"),
  title: "MoshineSites — Production-Ready Website Templates",
  description:
    "Five production-ready website templates built with Next.js, Tailwind, and SQLite. Restaurant, SaaS, e-commerce, booking, and analytics dashboards for small businesses.",
  openGraph: {
    title: "MoshineSites — Production-Ready Website Templates",
    description:
      "Five production-ready website templates built with Next.js, Tailwind, and SQLite. Restaurant, SaaS, e-commerce, booking, and analytics dashboards for small businesses.",
    type: "website",
    siteName: "MoshineSites",
    locale: "en_US",
    url: "https://dkservers.space",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "MoshineSites — Production-ready website templates",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MoshineSites — Production-Ready Website Templates",
    description:
      "Five production-ready website templates built with Next.js, Tailwind, and SQLite. Restaurant, SaaS, e-commerce, booking, and analytics dashboards for small businesses.",
    images: ["/og-image.png"],
    creator: "@dkservers",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="flex min-h-screen flex-col bg-bg-primary font-body text-text-primary antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:rounded-md focus:bg-brand focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to main content
        </a>
        <Nav />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
