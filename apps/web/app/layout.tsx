import { Geist, Geist_Mono } from "next/font/google"
import type { Metadata } from "next"

import "@workspace/ui/globals.css"
import "../styles/prism-polkadot.css"
import { Providers } from "@/components/providers"

export const metadata: Metadata = {
  title: "Copy‑n‑Paste PAPI | Multi-Chain Polkadot API Explorer",
  description: "Interactive multi-chain explorer for Polkadot API (PAPI). Connect to Polkadot, Kusama, and parachains. Generate ready-to-use code snippets for transactions, queries, and storage operations across the entire Polkadot ecosystem.",
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
    "developer tools"
  ],
  authors: [{ name: "illegalcall", url: "https://github.com/illegalcall" }],
  creator: "illegalcall",
  publisher: "Polkadot Ecosystem",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://papi-copy-paste.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Copy‑n‑Paste PAPI | Multi-Chain Polkadot API Explorer",
    description: "Interactive multi-chain explorer for Polkadot API. Connect to Polkadot, Kusama, and parachains. Generate ready-to-use code snippets for the entire Polkadot ecosystem.",
    url: "https://papi-copy-paste.vercel.app",
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
    description: "Interactive multi-chain explorer for Polkadot API. Generate ready-to-use code snippets for Polkadot, Kusama, and parachains.",
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
}

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="overflow-hidden">
      <body
        className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased overflow-hidden`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
