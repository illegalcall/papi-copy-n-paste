/**
 * Contract-capable chain registry
 * Defines which chains support ink! and/or EVM contracts
 */

import type { ContractType } from "./types";

export interface ContractChain {
  key: string;
  name: string;
  ws: string;
  isTestnet?: boolean;
  chainId?: number; // EVM chain ID (for EVM chains only)
}

export const CONTRACT_CHAINS: Record<ContractType, ContractChain[]> = {
  ink: [
    { key: "astar", name: "Astar", ws: "wss://rpc.astar.network" },
    { key: "shiden", name: "Shiden", ws: "wss://rpc.shiden.astar.network" },
    {
      key: "shibuya",
      name: "Shibuya (testnet)",
      ws: "wss://rpc.shibuya.astar.network",
      isTestnet: true,
    },
    {
      key: "aleph_zero",
      name: "Aleph Zero",
      ws: "wss://ws.azero.dev",
    },
    {
      key: "aleph_zero_testnet",
      name: "Aleph Zero Testnet",
      ws: "wss://ws.test.azero.dev",
      isTestnet: true,
    },
  ],
  evm: [
    {
      key: "moonbeam",
      name: "Moonbeam",
      ws: "wss://wss.api.moonbeam.network",
      chainId: 1284,
    },
    {
      key: "moonriver",
      name: "Moonriver",
      ws: "wss://wss.api.moonriver.moonbeam.network",
      chainId: 1285,
    },
    {
      key: "moonbase",
      name: "Moonbase Alpha (testnet)",
      ws: "wss://wss.api.moonbase.moonbeam.network",
      chainId: 1287,
      isTestnet: true,
    },
    {
      key: "astar_evm",
      name: "Astar (EVM)",
      ws: "wss://rpc.astar.network",
      chainId: 592,
    },
  ],
} as const;

/** Get all chains that support a given contract type */
export function getChainsForType(type: ContractType): ContractChain[] {
  return CONTRACT_CHAINS[type];
}

/** Get all available contract chains (both ink! and EVM) */
export function getAllContractChains(): Array<ContractChain & { type: ContractType }> {
  return [
    ...CONTRACT_CHAINS.ink.map((c) => ({ ...c, type: "ink" as const })),
    ...CONTRACT_CHAINS.evm.map((c) => ({ ...c, type: "evm" as const })),
  ];
}

/** Find a chain by its key across both ink! and EVM */
export function findContractChain(
  key: string,
): (ContractChain & { type: ContractType }) | undefined {
  const ink = CONTRACT_CHAINS.ink.find((c) => c.key === key);
  if (ink) return { ...ink, type: "ink" };

  const evm = CONTRACT_CHAINS.evm.find((c) => c.key === key);
  if (evm) return { ...evm, type: "evm" };

  return undefined;
}

/** Get the default testnet for a contract type */
export function getDefaultTestnet(type: ContractType): ContractChain {
  const chains = CONTRACT_CHAINS[type];
  return chains.find((c) => c.isTestnet) ?? chains[0]!;
}
