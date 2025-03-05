import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SEO from "./components/SEO";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <SEO
        title="Your Blog Name"
        description="Your blog's main description"
        keywords={["blog", "articles", "main keywords"]}
        ogType="website"
      />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
