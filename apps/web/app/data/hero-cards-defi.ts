/**
 * Hydration + Bifrost DeFi hero cards.
 *
 * Hydration is the omnipool DEX + money-market on Polkadot. Bifrost is the LST
 * hub (vDOT, vKSM, ...). Both are WebSocket parachains with descriptors named
 * `hydration` and `bifrost` in `utils/chainConfig.ts`.
 *
 * NOTE ON EXTRINSIC NAMES: Hydration's `Router.sell` and Bifrost's
 * `VtokenMinting.mint` / `Tokens.Accounts` field shapes below are based on
 * publicly documented runtime metadata as of 2025. Fields marked TODO should
 * be verified against the current on-chain metadata before shipping to
 * production. Do not fabricate field names — regenerate from metadata if in
 * doubt.
 */

import type { HeroCard } from "./hero-cards";

const HYDRATION_OMNIPOOL_SWAP: HeroCard = {
  id: "defi-hydration-swap",
  name: "Swap on Hydration omnipool",
  description:
    "Swap one asset for another through Hydration's Router pallet. Uses the omnipool for liquidity.",
  category: "defi",
  chainKey: "hydration",
  pallet: "Router",
  target: "sell",
  kind: "tx",
  tags: ["defi", "dex", "hydration", "swap"],
  code: `import { createClient } from "polkadot-api"
import { getWsProvider } from "polkadot-api/ws-provider/web"
import { hydration } from "@polkadot-api/descriptors"

const client = createClient(getWsProvider("wss://hydration-rpc.n.dwellir.com"))
const typedApi = client.getTypedApi(hydration)

// Swap 1 HDX (12 decimals) for DOT via Hydration's Router pallet.
// Asset IDs on Hydration: 0 = HDX, 5 = DOT (verify on-chain before production).
// TODO: verify field names on current Hydration Router.sell metadata.
const tx = typedApi.tx.Router.sell({
  asset_in: 0,  // HDX
  asset_out: 5, // DOT
  amount_in: 1_000_000_000_000n, // 1 HDX
  min_amount_out: 0n, // set a real slippage floor in production!
  route: [], // empty route = let router pick best path through omnipool
})

const fee = await tx.getEstimatedFees(senderAddress)
console.log("Estimated fee (HDX):", Number(fee) / 1e12)

const result = await tx.signAndSubmit(signer)
console.log("Swapped! Block:", result.block.number)

client.destroy()
`,
};

const HYDRATION_ASSET_REGISTRY: HeroCard = {
  id: "defi-hydration-assets",
  name: "Read Hydration asset list",
  description:
    "List every asset registered in Hydration's AssetRegistry — symbol, decimals, asset id.",
  category: "defi",
  chainKey: "hydration",
  pallet: "AssetRegistry",
  target: "Assets",
  kind: "query",
  tags: ["defi", "hydration", "registry", "read"],
  code: `import { createClient } from "polkadot-api"
import { getWsProvider } from "polkadot-api/ws-provider/web"
import { hydration } from "@polkadot-api/descriptors"

const client = createClient(getWsProvider("wss://hydration-rpc.n.dwellir.com"))
const typedApi = client.getTypedApi(hydration)

// Every Hydration-supported asset (HDX, DOT, USDT, vDOT, etc.)
const entries = await typedApi.query.AssetRegistry.Assets.getEntries()

for (const entry of entries) {
  const [assetId] = entry.keyArgs
  const asset = entry.value
  console.log("Asset", assetId, "name:", asset?.name, "decimals:", asset?.decimals)
}

client.destroy()
`,
};

const BIFROST_MINT_VDOT: HeroCard = {
  id: "defi-bifrost-vdot-mint",
  name: "Mint vDOT on Bifrost",
  description:
    "Liquid-stake DOT for vDOT via Bifrost's VtokenMinting.mint extrinsic. vDOT is the leading Polkadot LST.",
  category: "defi",
  chainKey: "bifrost",
  pallet: "VtokenMinting",
  target: "mint",
  kind: "tx",
  tags: ["defi", "lst", "bifrost", "vdot"],
  code: `import { createClient } from "polkadot-api"
import { getWsProvider } from "polkadot-api/ws-provider/web"
import { bifrost } from "@polkadot-api/descriptors"

const client = createClient(getWsProvider("wss://hk.p.bifrost-rpc.liebi.com/ws"))
const typedApi = client.getTypedApi(bifrost)

// Bifrost token enum: DOT is represented as { type: "Token2", value: 0 } on
// current runtimes (DOT is Token2#0). vDOT is minted ~1:1 against DOT.
// TODO: verify the Token/Token2 variant index on current Bifrost metadata.
const tx = typedApi.tx.VtokenMinting.mint({
  currency_id: { type: "Token2", value: 0 }, // DOT
  currency_amount: 10_000_000_000n,           // 1 DOT (10 decimals)
  remark: undefined,
  channel_id: undefined,
})

const fee = await tx.getEstimatedFees(senderAddress)
console.log("Estimated fee (BNC):", Number(fee) / 1e12)

const result = await tx.signAndSubmit(signer)
console.log("Minted vDOT! Block:", result.block.number)

client.destroy()
`,
};

const BIFROST_READ_VDOT_BALANCE: HeroCard = {
  id: "defi-bifrost-vdot-balance",
  name: "Read Bifrost vDOT balance",
  description:
    "Read a user's vDOT balance via Tokens.Accounts on Bifrost. vDOT is a non-native token tracked by the Tokens pallet.",
  category: "defi",
  chainKey: "bifrost",
  pallet: "Tokens",
  target: "Accounts",
  kind: "query",
  tags: ["defi", "lst", "bifrost", "vdot", "read"],
  code: `import { createClient } from "polkadot-api"
import { getWsProvider } from "polkadot-api/ws-provider/web"
import { bifrost } from "@polkadot-api/descriptors"

const client = createClient(getWsProvider("wss://hk.p.bifrost-rpc.liebi.com/ws"))
const typedApi = client.getTypedApi(bifrost)

const accountId = "15j4dg5GzsL1bw2U2AWgeyAk6QTxq43V7ZPbXdAmbVLjvDCK"

// vDOT is a Bifrost-side Tokens asset: { type: "VToken2", value: 0 }.
// TODO: verify VToken2 index for vDOT on current Bifrost metadata.
const vdot = { type: "VToken2" as const, value: 0 }

const account = await typedApi.query.Tokens.Accounts.getValue(accountId, vdot)
console.log("vDOT free:", Number(account?.free ?? 0n) / 1e10)
console.log("vDOT frozen:", Number(account?.frozen ?? 0n) / 1e10)

client.destroy()
`,
};

export const DEFI_HERO_CARDS: HeroCard[] = [
  HYDRATION_OMNIPOOL_SWAP,
  HYDRATION_ASSET_REGISTRY,
  BIFROST_MINT_VDOT,
  BIFROST_READ_VDOT_BALANCE,
];
