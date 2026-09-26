import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/site/footer";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dkservers.space"),
  title: "MoshineSites — Web Development for Small Businesses",
  description: "Portfolio of production-ready website templates and custom web development services for local businesses.",
  openGraph: {
    title: "MoshineSites — Web Development for Small Businesses",
    description: "Portfolio of production-ready website templates and custom web development services for local businesses.",
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
    title: "MoshineSites — Web Development for Small Businesses",
    description: "Portfolio of production-ready website templates and custom web development services for local businesses.",
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
      <body className="flex flex-col min-h-screen">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-white focus:text-brand-700"
        >
          Skip to main content
        </a>
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}