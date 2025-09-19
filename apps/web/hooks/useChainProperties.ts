import { useState, useEffect } from 'react';

export interface ChainProperties {
  tokenSymbol: string;
  tokenDecimals: number;
}

// Chain properties based on papi-console-main data
const CHAIN_PROPERTIES: Record<string, ChainProperties> = {
  // Polkadot ecosystem
  polkadot: { tokenSymbol: 'DOT', tokenDecimals: 10 },
  kusama: { tokenSymbol: 'KSM', tokenDecimals: 12 },

  // Paseo testnet ecosystem
  paseo: { tokenSymbol: 'PAS', tokenDecimals: 10 },
  paseo_asset_hub: { tokenSymbol: 'PAS', tokenDecimals: 10 },

  // Other chains
  moonbeam: { tokenSymbol: 'GLMR', tokenDecimals: 18 },
  bifrost: { tokenSymbol: 'BNC', tokenDecimals: 12 },
  astar: { tokenSymbol: 'ASTR', tokenDecimals: 18 },
  acala: { tokenSymbol: 'ACA', tokenDecimals: 12 },
  hydration: { tokenSymbol: 'HDX', tokenDecimals: 12 },

  // Westend testnet
  westend: { tokenSymbol: 'WND', tokenDecimals: 12 },
  westend_asset_hub: { tokenSymbol: 'WND', tokenDecimals: 12 },
};

// Default properties for unknown chains
const DEFAULT_PROPERTIES: ChainProperties = {
  tokenSymbol: 'UNIT',
  tokenDecimals: 12
};

export function useChainProperties(chainKey: string): ChainProperties {
  const [properties, setProperties] = useState<ChainProperties>(
    CHAIN_PROPERTIES[chainKey.toLowerCase()] || DEFAULT_PROPERTIES
  );

  useEffect(() => {
    const chainProps = CHAIN_PROPERTIES[chainKey.toLowerCase()];
    if (chainProps) {
      setProperties(chainProps);
    } else {
      // For unknown chains, try to fetch from API if available
      setProperties(DEFAULT_PROPERTIES);
    }
  }, [chainKey]);

  return properties;
}

// Utility function to format token amounts
export function formatTokenAmount(
  amount: string | number | bigint,
  decimals: number,
  symbol: string,
  precision: number = 4
): string {
  const value = typeof amount === 'bigint' ? amount : BigInt(amount);
  const divisor = BigInt(10 ** decimals);
  const formatted = (Number(value) / Number(divisor)).toFixed(precision);
  return `${formatted} ${symbol}`;
}