import { Geist, Geist_Mono } from "next/font/google";
import type { Metadata } from "next";

import "@workspace/ui/globals.css";
import "../styles/prism-polkadot.css";
import { Providers } from "@/components/providers";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "PAPI Copy-n-Paste | Polkadot API Code Generator & Multi-Chain Explorer",
  description:
    "Generate ready-to-use Polkadot API (PAPI) code snippets instantly. Interactive multi-chain explorer supporting Polkadot, Kusama, Moonbeam, Astar, and all parachains. Build transactions, queries, and storage operations with copy-paste TypeScript code.",
  keywords: [
    "Polkadot API",
    "PAPI",
    "Polkadot",
    "Kusama",
    "Moonbeam",
    "Astar",
    "Acala",
    "Bifrost",
    "Hydration",
    "blockchain",
    "Web3",
    "substrate",
    "parachains",
    "transactions",
    "multi-chain",
    "code generator",
    "developer tools",
    "TypeScript",
    "blockchain explorer",
    "smart contracts",
    "DeFi",
    "cryptocurrency",
    "polkadot ecosystem",
    "substrate development",
    "blockchain API",
    "Web3 development",
    "crypto development",
    "polkadot developer",
    "substrate developer",
    "blockchain tools",
    "crypto tools",
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
    title: "PAPI Copy-n-Paste | Polkadot API Code Generator & Multi-Chain Explorer",
    description:
      "Generate ready-to-use Polkadot API (PAPI) code snippets instantly. Interactive multi-chain explorer supporting Polkadot, Kusama, Moonbeam, Astar, and all parachains. Build transactions, queries, and storage operations with copy-paste TypeScript code.",
    url: "https://papi-copy-n-paste-web.vercel.app",
    siteName: "PAPI Copy-n-Paste",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PAPI Copy-n-Paste - Polkadot API Code Generator & Multi-Chain Explorer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PAPI Copy-n-Paste | Polkadot API Code Generator & Multi-Chain Explorer",
    description:
      "Generate ready-to-use Polkadot API (PAPI) code snippets instantly. Interactive multi-chain explorer supporting Polkadot, Kusama, Moonbeam, Astar, and all parachains.",
    images: ["/og-image.png"],
    creator: "@illegalcall",
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
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "PAPI Explorer",
    "mobile-web-app-capable": "yes",
    "theme-color": "#e6007a",
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
    "name": "PAPI Copy-n-Paste",
    "alternateName": "Polkadot API Code Generator",
    "description": "Generate ready-to-use Polkadot API (PAPI) code snippets instantly. Interactive multi-chain explorer supporting Polkadot, Kusama, Moonbeam, Astar, and all parachains. Build transactions, queries, and storage operations with copy-paste TypeScript code.",
    "url": "https://papi-copy-n-paste-web.vercel.app",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web Browser",
    "browserRequirements": "Requires JavaScript. Requires HTML5.",
    "softwareVersion": "2.0",
    "dateCreated": "2024-01-01",
    "dateModified": new Date().toISOString().split('T')[0],
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Polkadot Ecosystem",
      "url": "https://polkadot.network",
      "logo": {
        "@type": "ImageObject",
        "url": "https://polkadot.network/images/polkadot-logo.svg"
      }
    },
    "creator": {
      "@type": "Person",
      "name": "illegalcall",
      "url": "https://github.com/illegalcall",
      "sameAs": "https://github.com/illegalcall"
    },
    "keywords": "Polkadot API, PAPI, Polkadot, Kusama, Moonbeam, Astar, Acala, Bifrost, Hydration, blockchain, Web3, substrate, parachains, transactions, multi-chain, code generator, developer tools, TypeScript, blockchain explorer, smart contracts, DeFi, cryptocurrency, polkadot ecosystem, substrate development, blockchain API, Web3 development, crypto development, polkadot developer, substrate developer, blockchain tools, crypto tools",
    "featureList": [
      "Multi-chain support for Polkadot ecosystem",
      "Interactive pallet explorer",
      "Ready-to-use code generation",
      "Transaction and storage query builders",
      "Real-time blockchain interaction",
      "Developer-friendly interface",
      "TypeScript code generation",
      "Copy-paste functionality",
      "Multi-network support",
      "Educational content integration"
    ],
    "screenshot": "https://papi-copy-n-paste-web.vercel.app/og-image.png",
    "softwareHelp": "https://github.com/illegalcall/papi-copy-paste-setup",
    "license": "https://opensource.org/licenses/MIT",
    "isAccessibleForFree": true,
    "audience": {
      "@type": "Audience",
      "audienceType": "Developers"
    },
    "about": [
      {
        "@type": "Thing",
        "name": "Polkadot",
        "description": "Multi-chain blockchain platform"
      },
      {
        "@type": "Thing", 
        "name": "Blockchain Development",
        "description": "Web3 and cryptocurrency development"
      },
      {
        "@type": "Thing",
        "name": "TypeScript",
        "description": "Programming language for web development"
      }
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
