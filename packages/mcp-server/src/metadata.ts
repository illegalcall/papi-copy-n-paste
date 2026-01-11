/**
 * Metadata loader — reads generated metadata from @workspace/core.
 * Uses lazy loading to avoid reading multi-MB JSON files until needed.
 */

import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// In the monorepo:
//   src/metadata.ts  → packages/mcp-server/src/  → ../../core/
//   dist/metadata.js → packages/mcp-server/dist/ → ../../core/
const CORE_DIR = resolve(__dirname, "../../core");
const GENERATED_DIR = resolve(CORE_DIR, "generated");

// ---------------------------------------------------------------------------
// Chain configuration
// ---------------------------------------------------------------------------

export interface ChainConfig {
  key: string;
  name: string;
  ws: string;
  specVersion: number;
  paraId: number | null;
  genesisHash: string;
  chainSpecPath?: string;
  icon: string;
  color: string;
  explorerUrl?: string;
  explorerName?: string;
}

function loadChains(): ChainConfig[] {
  const chainsPath = resolve(CORE_DIR, "chains.json");
  if (!existsSync(chainsPath)) {
    console.error(`chains.json not found at ${chainsPath}`);
    return [];
  }
  return JSON.parse(readFileSync(chainsPath, "utf-8"));
}

export const chains: ChainConfig[] = loadChains();

export function getChainConfig(chainKey: string): ChainConfig | undefined {
  return chains.find((c) => c.key === chainKey);
}

export function getChainKeys(): string[] {
  return chains.map((c) => c.key);
}

// ---------------------------------------------------------------------------
// Generated metadata (lazy-loaded)
// ---------------------------------------------------------------------------

function readJsonFile(filename: string): any {
  const filepath = resolve(GENERATED_DIR, filename);
  if (!existsSync(filepath)) {
    console.error(`Metadata file not found: ${filepath}`);
    return null;
  }
  return JSON.parse(readFileSync(filepath, "utf-8"));
}

let _papiMetadata: any = null;
let _callMetadata: any = null;
let _storageMetadata: any = null;
let _decodedConstants: any = null;

export function getPapiMetadata(): Record<string, any> {
  if (!_papiMetadata) {
    _papiMetadata = readJsonFile("papi-metadata.json") ?? {};
  }
  return _papiMetadata;
}

export function getCallMetadata(): Record<string, any> {
  if (!_callMetadata) {
    _callMetadata = readJsonFile("call-metadata.json") ?? {};
  }
  return _callMetadata;
}

export function getStorageMetadata(): Record<string, any> {
  if (!_storageMetadata) {
    _storageMetadata = readJsonFile("storage-metadata.json") ?? {};
  }
  return _storageMetadata;
}

export function getDecodedConstants(): Record<string, any> {
  if (!_decodedConstants) {
    _decodedConstants = readJsonFile("decoded-constants.json") ?? {};
  }
  return _decodedConstants;
}

// ---------------------------------------------------------------------------
// Metadata helpers
// ---------------------------------------------------------------------------

/** Get all pallet names for a chain (union of all categories). */
export function getPalletNames(chainKey: string): string[] {
  const meta = getPapiMetadata()[chainKey];
  if (!meta) return [];

  const pallets = new Set<string>();
  for (const category of ["storage", "calls", "events", "constants", "errors"]) {
    const section = meta[category];
    if (section && typeof section === "object") {
      for (const name of Object.keys(section)) {
        pallets.add(name);
      }
    }
  }
  return Array.from(pallets).sort();
}

/** Detailed pallet breakdown. Returns null if pallet doesn't exist. */
export function getPalletInfo(chainKey: string, palletName: string) {
  const meta = getPapiMetadata()[chainKey];
  if (!meta) return null;

  // Check if pallet exists in any metadata category
  const existsInAny = ["storage", "calls", "events", "constants", "errors"].some(
    (cat) => meta[cat]?.[palletName] != null,
  );
  if (!existsInAny) return null;

  const mapEntries = (
    section: Record<string, any> | undefined,
    mapper: (name: string, info: any) => any,
  ) => {
    if (!section) return [];
    return Object.entries(section).map(([name, info]) => mapper(name, info));
  };

  // Merge call parameter info from call-metadata (has type info)
  const callMeta = getCallMetadata()[chainKey]?.pallets?.[palletName];

  return {
    calls: mapEntries(meta.calls?.[palletName], (name, info) => {
      // If papi-metadata has no parameters, try call-metadata for types
      const params = info.parameters?.length > 0
        ? info.parameters
        : (callMeta?.[name]?.required ?? []).map((type: string) => ({ name: type, type }));
      return {
        name,
        parameters: params,
        description: info.description ?? "",
      };
    }),
    storage: mapEntries(meta.storage?.[palletName], (name, info) => ({
      name,
      description: info.description ?? "",
      returnType: info.returnType ?? "unknown",
      required: info.required ?? [],
      optional: info.optional ?? [],
    })),
    events: mapEntries(meta.events?.[palletName], (name, info) => ({
      name,
      fields: info.fields ?? [],
      description: info.description ?? "",
    })),
    constants: mapEntries(meta.constants?.[palletName], (name, info) => ({
      name,
      type: info.type ?? "unknown",
      value: info.value,
      description: info.description ?? "",
    })),
    errors: mapEntries(meta.errors?.[palletName], (name, info) => ({
      name,
      type: info.type ?? "unknown",
      description: info.description ?? "",
    })),
  };
}

/** Look up a single decoded constant. */
export function getConstantValue(
  chainKey: string,
  palletName: string,
  constantName: string,
): any | null {
  const chainData = getDecodedConstants()[chainKey];
  if (!chainData?.constants) return null;

  return (
    chainData.constants.find(
      (c: any) => c.palletName === palletName && c.constantName === constantName,
    ) ?? null
  );
}

/** Get storage item metadata for a specific item. */
export function getStorageItemMeta(
  chainKey: string,
  palletName: string,
  itemName: string,
): any | null {
  const meta = getStorageMetadata();
  return meta[chainKey]?.pallets?.[palletName]?.[itemName] ?? null;
}

/** Get call metadata for a specific call. */
export function getCallMeta(
  chainKey: string,
  palletName: string,
  callName: string,
): any | null {
  const meta = getCallMetadata();
  return meta[chainKey]?.pallets?.[palletName]?.[callName] ?? null;
}
