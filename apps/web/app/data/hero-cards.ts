/**
 * Main explorer hero cards — curated, one-click PAPI snippets.
 *
 * Each card is a self-contained TypeScript example that matches the shape of
 * code produced by `utils/codeGenerators.ts`:
 *   - `polkadot-api` (PAPI v1.14+) only, no `@polkadot/api`
 *   - PascalCase pallet names, `.getValue()` on storage, object-style tx args
 *   - `signAndSubmit(signer)` for transactions, `MultiAddress.Id(...)` for addresses
 *   - Native BigInt literals (10 decimals for DOT, 12 for KSM/WND/HDX/BNC)
 *
 * Cards are grouped into packs; each pack lives in its own file and registers
 * itself here so the UI can render either category independently.
 */

export type HeroCardCategory = "migration" | "defi";

export interface HeroCard {
  /** Stable slug, used as React key and linkable id. */
  id: string;
  /** Short human title shown on the card button. */
  name: string;
  /** 1–2 sentence description used under the title. */
  description: string;
  /** Pack grouping so the UI can render the two sets separately. */
  category: HeroCardCategory;
  /** Target chain key from `utils/chainConfig.ts` DESCRIPTOR_MAP. */
  chainKey: string;
  /** PascalCase pallet the snippet operates on (e.g. "Staking"). */
  pallet: string;
  /** Specific call or storage item touched (e.g. "nominate"). */
  target: string;
  /** Whether the snippet is a read (storage query) or write (extrinsic). */
  kind: "query" | "tx";
  /** The full, copy-pasteable TypeScript snippet. */
  code: string;
  /** Tag chips displayed on the card. */
  tags: string[];
}

import { MIGRATION_HERO_CARDS } from "./hero-cards-migration";

export { MIGRATION_HERO_CARDS } from "./hero-cards-migration";

export const HERO_CARDS: HeroCard[] = [...MIGRATION_HERO_CARDS];

/** Get cards filtered by category. */
export function getHeroCardsByCategory(category: HeroCardCategory): HeroCard[] {
  return HERO_CARDS.filter((card) => card.category === category);
}
