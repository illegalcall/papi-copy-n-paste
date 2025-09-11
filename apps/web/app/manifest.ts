import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Copy‑n‑Paste PAPI | Multi-Chain Polkadot API Explorer",
    short_name: "PAPI Explorer",
    description:
      "Interactive multi-chain explorer for Polkadot API (PAPI). Connect to Polkadot, Kusama, and parachains. Generate ready-to-use code snippets for transactions, queries, and storage operations across the entire Polkadot ecosystem.",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#e6007a",
    categories: ["developer", "tools", "blockchain", "web3"],
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
    orientation: "portrait-primary",
    scope: "/",
    lang: "en",
    dir: "ltr",
  };
}