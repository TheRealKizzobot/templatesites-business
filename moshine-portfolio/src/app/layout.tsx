import type { Metadata } from "next";
import "./globals.css";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "MoshineSites — Web Development for Small Businesses",
  description: "Portfolio of production-ready website templates and custom web development services for local businesses.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}