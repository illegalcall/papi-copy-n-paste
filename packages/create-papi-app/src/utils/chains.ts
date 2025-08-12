import type { ChainConfig, ChainType } from '../types.js'

export const supportedChains: Record<ChainType, ChainConfig> = {
  polkadot: {
    name: 'polkadot',
    displayName: 'Polkadot',
    wsUrls: [
      'wss://rpc.polkadot.io',
      'wss://polkadot.api.onfinality.io/public-ws',
      'wss://polkadot-rpc.publicnode.com'
    ],
    chainSpecImport: 'polkadot-api/chains/polkadot',
    descriptorName: 'polkadot'
  },
  kusama: {
    name: 'kusama', 
    displayName: 'Kusama',
    wsUrls: [
      'wss://kusama-rpc.polkadot.io',
      'wss://kusama.api.onfinality.io/public-ws',
      'wss://kusama-rpc.publicnode.com'
    ],
    chainSpecImport: 'polkadot-api/chains/ksmcc3',
    descriptorName: 'kusama'
  },
  westend: {
    name: 'westend',
    displayName: 'Westend',
    wsUrls: [
      'wss://westend-rpc.polkadot.io',
      'wss://westend.api.onfinality.io/public-ws'
    ],
    chainSpecImport: 'polkadot-api/chains/westend2',
    descriptorName: 'westend'
  },
  paseo: {
    name: 'paseo',
    displayName: 'Paseo',
    wsUrls: [
      'wss://paseo-rpc.dwellir.com',
      'wss://paseo.dotters.network'
    ],
    chainSpecImport: 'polkadot-api/chains/paseo',
    descriptorName: 'paseo'
  }
}

export function getChainConfig(chain: ChainType): ChainConfig {
  return supportedChains[chain]
}

export function getChainList(): Array<{ name: ChainType; displayName: string; description: string }> {
  return [
    { name: 'polkadot', displayName: 'Polkadot', description: 'Polkadot mainnet' },
    { name: 'kusama', displayName: 'Kusama', description: 'Kusama network' },
    { name: 'westend', displayName: 'Westend', description: 'Westend testnet' },
    { name: 'paseo', displayName: 'Paseo', description: 'Paseo testnet' }
  ]
}