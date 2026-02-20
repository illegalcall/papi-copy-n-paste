import Fuse, { type IFuseOptions } from "fuse.js";
import type { PalletInfo } from "@workspace/core";

export type SearchItemType =
  | "pallet"
  | "call"
  | "storage"
  | "event"
  | "constant"
  | "error";

export interface SearchItem {
  type: SearchItemType;
  pallet: string;
  name: string;
  fullPath: string;
  docs: string;
  params?: string;
}

export function buildSearchItems(pallets: PalletInfo[]): SearchItem[] {
  const items: SearchItem[] = [];

  for (const pallet of pallets) {
    items.push({
      type: "pallet",
      pallet: pallet.name,
      name: pallet.name,
      fullPath: pallet.name,
      docs: "",
    });

    for (const call of pallet.calls) {
      items.push({
        type: "call",
        pallet: pallet.name,
        name: call.name,
        fullPath: `${pallet.name}.${call.name}`,
        docs: call.docs?.[0] ?? "",
        params: call.args.map((a) => a.name).join(", "),
      });
    }

    for (const storage of pallet.storage) {
      items.push({
        type: "storage",
        pallet: pallet.name,
        name: storage.name,
        fullPath: `${pallet.name}.${storage.name}`,
        docs: storage.docs?.[0] ?? "",
      });
    }

    for (const event of pallet.events) {
      items.push({
        type: "event",
        pallet: pallet.name,
        name: event.name,
        fullPath: `${pallet.name}.${event.name}`,
        docs: event.docs?.[0] ?? "",
      });
    }

    for (const constant of pallet.constants ?? []) {
      items.push({
        type: "constant",
        pallet: pallet.name,
        name: constant.name,
        fullPath: `${pallet.name}.${constant.name}`,
        docs: constant.docs?.[0] ?? "",
      });
    }

    for (const error of pallet.errors ?? []) {
      items.push({
        type: "error",
        pallet: pallet.name,
        name: error.name,
        fullPath: `${pallet.name}.${error.name}`,
        docs: error.docs?.[0] ?? "",
      });
    }
  }

  return items;
}

const FUSE_OPTIONS: IFuseOptions<SearchItem> = {
  keys: [
    { name: "fullPath", weight: 0.4 },
    { name: "name", weight: 0.3 },
    { name: "pallet", weight: 0.15 },
    { name: "docs", weight: 0.15 },
  ],
  threshold: 0.4,
  includeScore: true,
  includeMatches: true,
};

export function createFuseIndex(
  items: SearchItem[],
): Fuse<SearchItem> {
  return new Fuse(items, FUSE_OPTIONS);
}

export interface FuzzyMatchSet {
  pallets: Set<string>;
  calls: Map<string, Set<string>>;
  storage: Map<string, Set<string>>;
  events: Map<string, Set<string>>;
  constants: Map<string, Set<string>>;
  errors: Map<string, Set<string>>;
}

/**
 * Run a fuzzy search and return sets of matched pallet+item combos
 * that can be used to filter the existing PalletTree structure.
 */
export function fuzzySearch(
  fuse: Fuse<SearchItem>,
  query: string,
  limit = 100,
): FuzzyMatchSet {
  const results = fuse.search(query, { limit });

  const matchSet: FuzzyMatchSet = {
    pallets: new Set(),
    calls: new Map(),
    storage: new Map(),
    events: new Map(),
    constants: new Map(),
    errors: new Map(),
  };

  for (const result of results) {
    const item = result.item;
    matchSet.pallets.add(item.pallet);

    if (item.type === "pallet") continue;

    const mapKey =
      item.type === "call"
        ? "calls"
        : item.type === "storage"
          ? "storage"
          : item.type === "event"
            ? "events"
            : item.type === "constant"
              ? "constants"
              : "errors";

    const map = matchSet[mapKey];
    if (!map.has(item.pallet)) {
      map.set(item.pallet, new Set());
    }
    map.get(item.pallet)!.add(item.name);
  }

  return matchSet;
}
