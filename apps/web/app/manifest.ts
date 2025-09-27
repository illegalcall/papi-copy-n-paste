import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "PAPI Copy-n-Paste | Polkadot API Code Generator & Multi-Chain Explorer",
    short_name: "PAPI Explorer",
    description:
      "Generate ready-to-use Polkadot API (PAPI) code snippets instantly. Interactive multi-chain explorer supporting Polkadot, Kusama, Moonbeam, Astar, and all parachains. Build transactions, queries, and storage operations with copy-paste TypeScript code.",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#e6007a",
    categories: ["developer", "tools", "blockchain", "web3", "productivity"],
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