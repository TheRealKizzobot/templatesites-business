import type { Metadata } from "next";
import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}