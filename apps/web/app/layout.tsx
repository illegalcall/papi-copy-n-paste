import { Geist, Geist_Mono } from "next/font/google";
import type { Metadata } from "next";

import "@workspace/ui/globals.css";
import "../styles/prism-polkadot.css";
import { Providers } from "@/components/providers";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "Copy‑n‑Paste PAPI | Multi-Chain Polkadot API Explorer",
  description:
    "Interactive multi-chain explorer for Polkadot API (PAPI). Connect to Polkadot, Kusama, and parachains. Generate ready-to-use code snippets for transactions, queries, and storage operations across the entire Polkadot ecosystem.",
  keywords: [
    "Polkadot",
    "Kusama",
    "PAPI",
    "Polkadot API",
    "blockchain",
    "Web3",
    "substrate",
    "parachains",
    "transactions",
    "multi-chain",
    "code generator",
    "developer tools",
  ],
  authors: [{ name: "illegalcall", url: "https://github.com/illegalcall" }],
  creator: "illegalcall",
  publisher: "Polkadot Ecosystem",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://papi-copy-n-paste-web.vercel.app"),
  alternates: {
    canonical: "/",
  },
  category: "technology",
  classification: "Web3 Developer Tools",
  referrer: "origin-when-cross-origin",
  openGraph: {
    title: "Copy‑n‑Paste PAPI | Multi-Chain Polkadot API Explorer",
    description:
      "Interactive multi-chain explorer for Polkadot API. Connect to Polkadot, Kusama, and parachains. Generate ready-to-use code snippets for the entire Polkadot ecosystem.",
    url: "https://papi-copy-n-paste-web.vercel.app",
    siteName: "Copy‑n‑Paste PAPI",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Copy‑n‑Paste PAPI - Multi-Chain Polkadot API Explorer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Copy‑n‑Paste PAPI | Multi-Chain Polkadot API Explorer",
    description:
      "Interactive multi-chain explorer for Polkadot API. Generate ready-to-use code snippets for Polkadot, Kusama, and parachains.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Copy‑n‑Paste PAPI",
    "description": "Interactive multi-chain explorer for Polkadot API (PAPI). Connect to Polkadot, Kusama, and parachains. Generate ready-to-use code snippets for transactions, queries, and storage operations across the entire Polkadot ecosystem.",
    "url": "https://papi-copy-n-paste-web.vercel.app",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Polkadot Ecosystem",
      "url": "https://polkadot.network"
    },
    "creator": {
      "@type": "Person",
      "name": "illegalcall",
      "url": "https://github.com/illegalcall"
    },
    "keywords": "Polkadot, Kusama, PAPI, Polkadot API, blockchain, Web3, substrate, parachains, transactions, multi-chain, code generator, developer tools",
    "featureList": [
      "Multi-chain support for Polkadot ecosystem",
      "Interactive pallet explorer",
      "Ready-to-use code generation",
      "Transaction and storage query builders",
      "Real-time blockchain interaction",
      "Developer-friendly interface"
    ]
  };

  return (
    <html lang="en" suppressHydrationWarning className="overflow-hidden">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.svg" sizes="any" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://vercel.com" />
        <link rel="dns-prefetch" href="https://analytics.vercel.com" />
      </head>
      <body
        className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased overflow-hidden`}
      >
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}
