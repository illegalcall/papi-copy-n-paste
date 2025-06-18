import { chains, ChainConfig } from './client'

export interface ExplorerLinks {
  transaction: (txHash: string) => string
  block: (blockNumber: number | string) => string
  account: (address: string) => string
  extrinsic: (blockNumber: number | string, extrinsicIndex: number) => string
}

/**
 * Get explorer links for a specific chain
 */
export function getExplorerLinks(chainKey: string): ExplorerLinks | null {
  const chain = chains.find(c => c.key === chainKey)
  if (!chain?.explorerUrl) {
    return null
  }

  const baseUrl = chain.explorerUrl

  return {
    transaction: (txHash: string) => `${baseUrl}/extrinsic/${txHash}`,
    block: (blockNumber: number | string) => `${baseUrl}/block/${blockNumber}`,
    account: (address: string) => `${baseUrl}/account/${address}`,
    extrinsic: (blockNumber: number | string, extrinsicIndex: number) => 
      `${baseUrl}/extrinsic/${blockNumber}-${extrinsicIndex}`
  }
}

/**
 * Get the explorer name for a chain
 */
export function getExplorerName(chainKey: string): string {
  const chain = chains.find(c => c.key === chainKey)
  return chain?.explorerName || 'Explorer'
}

/**
 * Check if a chain has explorer support
 */
export function hasExplorer(chainKey: string): boolean {
  const chain = chains.find(c => c.key === chainKey)
  return !!(chain?.explorerUrl)
}

/**
 * Get all chains with explorer support
 */
export function getChainsWithExplorer(): ChainConfig[] {
  return chains.filter(chain => chain.explorerUrl)
}

/**
 * Format explorer link with chain-specific styling
 */
export function formatExplorerLink(
  chainKey: string, 
  type: 'transaction' | 'block' | 'account' | 'extrinsic',
  identifier: string | number,
  extrinsicIndex?: number
): { url: string; label: string; explorerName: string } | null {
  const links = getExplorerLinks(chainKey)
  const explorerName = getExplorerName(chainKey)
  
  if (!links) {
    return null
  }

  let url: string
  let label: string

  switch (type) {
    case 'transaction':
      url = links.transaction(identifier as string)
      label = `View transaction ${(identifier as string).slice(0, 8)}...`
      break
    case 'block':
      url = links.block(identifier)
      label = `View block #${identifier}`
      break
    case 'account':
      url = links.account(identifier as string)
      label = `View account ${(identifier as string).slice(0, 8)}...`
      break
    case 'extrinsic':
      if (extrinsicIndex === undefined) {
        return null
      }
      url = links.extrinsic(identifier, extrinsicIndex)
      label = `View extrinsic ${identifier}-${extrinsicIndex}`
      break
    default:
      return null
  }

  return { url, label, explorerName }
}

/**
 * Open explorer link in new tab
 */
export function openInExplorer(
  chainKey: string,
  type: 'transaction' | 'block' | 'account' | 'extrinsic',
  identifier: string | number,
  extrinsicIndex?: number
): boolean {
  const linkInfo = formatExplorerLink(chainKey, type, identifier, extrinsicIndex)
  
  if (!linkInfo) {
    return false
  }

  window.open(linkInfo.url, '_blank', 'noopener,noreferrer')
  return true
}
