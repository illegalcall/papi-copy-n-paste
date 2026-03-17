/**
 * Asset Hub Migration hero cards.
 *
 * In November 2025 Polkadot migrated Staking, Balances, and Governance from
 * the relay chain to Polkadot Asset Hub, and Identity onto Polkadot People.
 * Snippets that still target `polkadot` for these pallets are now wrong — the
 * pallets exist on the Asset Hub / People system parachains instead. These
 * cards show the correct post-migration targets.
 */

import type { HeroCard } from "./hero-cards";

const STAKING_NOMINATE_ON_ASSET_HUB: HeroCard = {
  id: "migrate-staking-asset-hub",
  name: "Staking on Asset Hub",
  description:
    "Nominate validators on Polkadot Asset Hub. Staking moved from the relay chain to Asset Hub on Nov 4, 2025.",
  category: "migration",
  chainKey: "polkadot_asset_hub",
  pallet: "Staking",
  target: "nominate",
  kind: "tx",
  tags: ["staking", "migration", "asset-hub"],
  code: `import { createClient, MultiAddress } from "polkadot-api"
import { getWsProvider } from "polkadot-api/ws-provider/web"
import { polkadot_asset_hub } from "@polkadot-api/descriptors"

// Post-migration: Staking now lives on Asset Hub, not the relay chain.
const client = createClient(getWsProvider("wss://polkadot-asset-hub-rpc.polkadot.io"))
const typedApi = client.getTypedApi(polkadot_asset_hub)

// Nominate up to 16 validators (addresses are examples — replace with real ones).
const tx = typedApi.tx.Staking.nominate({
  targets: [
    MultiAddress.Id("15j4dg5GzsL1bw2U2AWgeyAk6QTxq43V7ZPbXdAmbVLjvDCK"),
    MultiAddress.Id("14Gjs1TD93gnwEBfDMHoCgsuf1s2TVKUP6Z1qKmAZnZ8cW5q"),
  ],
})

const fee = await tx.getEstimatedFees(senderAddress)
console.log("Estimated fee:", Number(fee) / 1e10, "DOT") // DOT has 10 decimals

const result = await tx.signAndSubmit(signer)
console.log("Nominated on Asset Hub! Block:", result.block.number)

client.destroy()
`,
};

const BALANCES_ON_ASSET_HUB: HeroCard = {
  id: "migrate-balances-asset-hub",
  name: "Balances on Asset Hub",
  description:
    "Read total issuance and send DOT via transfer_keep_alive on Polkadot Asset Hub — native balances now live here.",
  category: "migration",
  chainKey: "polkadot_asset_hub",
  pallet: "Balances",
  target: "transfer_keep_alive",
  kind: "tx",
  tags: ["balances", "migration", "asset-hub"],
  code: `import { createClient, MultiAddress } from "polkadot-api"
import { getWsProvider } from "polkadot-api/ws-provider/web"
import { polkadot_asset_hub } from "@polkadot-api/descriptors"

const client = createClient(getWsProvider("wss://polkadot-asset-hub-rpc.polkadot.io"))
const typedApi = client.getTypedApi(polkadot_asset_hub)

// Read: native DOT total issuance on Asset Hub (not the relay chain anymore).
const totalIssuance = await typedApi.query.Balances.TotalIssuance.getValue()
console.log("Total DOT issuance (Asset Hub):", Number(totalIssuance) / 1e10)

// Write: send 0.5 DOT (10 decimals) via keep-alive transfer.
const tx = typedApi.tx.Balances.transfer_keep_alive({
  dest: MultiAddress.Id("15j4dg5GzsL1bw2U2AWgeyAk6QTxq43V7ZPbXdAmbVLjvDCK"),
  value: 5_000_000_000n, // 0.5 DOT
})

const result = await tx.signAndSubmit(signer)
console.log("Transferred on Asset Hub! Block:", result.block.number)

client.destroy()
`,
};

const GOVERNANCE_ON_ASSET_HUB: HeroCard = {
  id: "migrate-governance-asset-hub",
  name: "Governance on Asset Hub",
  description:
    "List every OpenGov referendum via Referenda.ReferendumInfoFor.getEntries() on Asset Hub.",
  category: "migration",
  chainKey: "polkadot_asset_hub",
  pallet: "Referenda",
  target: "ReferendumInfoFor",
  kind: "query",
  tags: ["governance", "migration", "asset-hub"],
  code: `import { createClient } from "polkadot-api"
import { getWsProvider } from "polkadot-api/ws-provider/web"
import { polkadot_asset_hub } from "@polkadot-api/descriptors"

const client = createClient(getWsProvider("wss://polkadot-asset-hub-rpc.polkadot.io"))
const typedApi = client.getTypedApi(polkadot_asset_hub)

// Post-migration: OpenGov (Referenda + ConvictionVoting) now lives on Asset Hub.
const entries = await typedApi.query.Referenda.ReferendumInfoFor.getEntries()

for (const entry of entries) {
  const [refIndex] = entry.keyArgs
  const info = entry.value
  console.log("Referendum", refIndex, "status:", info?.type)
}

client.destroy()
`,
};

const IDENTITY_ON_PEOPLE_CHAIN: HeroCard = {
  id: "migrate-identity-people-chain",
  name: "Identity on People chain",
  description:
    "Look up an account's on-chain identity on Polkadot People — Identity migrated off the relay chain.",
  category: "migration",
  chainKey: "polkadot_people",
  pallet: "Identity",
  target: "IdentityOf",
  kind: "query",
  tags: ["identity", "migration", "people-chain"],
  code: `import { createClient } from "polkadot-api"
import { getWsProvider } from "polkadot-api/ws-provider/web"
import { polkadot_people } from "@polkadot-api/descriptors"

const client = createClient(getWsProvider("wss://polkadot-people-rpc.polkadot.io"))
const typedApi = client.getTypedApi(polkadot_people)

const accountId = "15j4dg5GzsL1bw2U2AWgeyAk6QTxq43V7ZPbXdAmbVLjvDCK"

// Identity now lives on the People system parachain, not the relay chain.
const identity = await typedApi.query.Identity.IdentityOf.getValue(accountId)

if (identity) {
  const info = Array.isArray(identity) ? identity[0] : identity
  console.log("Display:", info?.info?.display)
  console.log("Email:", info?.info?.email)
  console.log("Twitter:", info?.info?.twitter)
} else {
  console.log("No identity set for", accountId)
}

client.destroy()
`,
};

const POST_MIGRATION_STAKING_READER: HeroCard = {
  id: "migrate-staking-reader",
  name: "Post-migration staking reader",
  description:
    "Pull a specific account's nomination + ledger state from Staking on Asset Hub, plus the current active era.",
  category: "migration",
  chainKey: "polkadot_asset_hub",
  pallet: "Staking",
  target: "Nominators",
  kind: "query",
  tags: ["staking", "migration", "asset-hub", "read"],
  code: `import { createClient } from "polkadot-api"
import { getWsProvider } from "polkadot-api/ws-provider/web"
import { polkadot_asset_hub } from "@polkadot-api/descriptors"

const client = createClient(getWsProvider("wss://polkadot-asset-hub-rpc.polkadot.io"))
const typedApi = client.getTypedApi(polkadot_asset_hub)

const accountId = "15j4dg5GzsL1bw2U2AWgeyAk6QTxq43V7ZPbXdAmbVLjvDCK"

// Current active era
const activeEra = await typedApi.query.Staking.ActiveEra.getValue()
console.log("Active era:", activeEra?.index)

// Who is this account nominating?
const nominators = await typedApi.query.Staking.Nominators.getValue(accountId)
console.log("Targets:", nominators?.targets)

// How much is bonded?
const ledger = await typedApi.query.Staking.Ledger.getValue(accountId)
console.log("Bonded (DOT):", ledger ? Number(ledger.total) / 1e10 : 0)

client.destroy()
`,
};

export const MIGRATION_HERO_CARDS: HeroCard[] = [
  STAKING_NOMINATE_ON_ASSET_HUB,
  BALANCES_ON_ASSET_HUB,
  GOVERNANCE_ON_ASSET_HUB,
  IDENTITY_ON_PEOPLE_CHAIN,
  POST_MIGRATION_STAKING_READER,
];
