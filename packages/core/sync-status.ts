// Blockchain sync status detection utilities

export interface SyncStatus {
  isSyncing: boolean
  currentBlock: number | null
  targetBlock: number | null
  blocksBehind: number | null
  estimatedAge: string | null
  syncPercentage: number | null
}

export interface ChainInfo {
  name: string
  currentBlock: number
  timestamp: Date
  isLive: boolean
  chainLag: number
}

// Known approximate block numbers for different chains (updated Aug 30, 2025)
const EXPECTED_CURRENT_BLOCKS: Record<string, number> = {
  'polkadot': 27545638, // Updated Aug 30, 2025
  'kusama': 29900000,   // Updated Aug 30, 2025 (current blocks are ~29.9M)
  'acala': 7100000,     // Updated Aug 30, 2025 (current blocks are ~7.1M)
  'moonbeam': 8200000,  // Updated Aug 30, 2025 (current blocks are ~8.2M)
  'astar': 7300000,     // Updated Aug 30, 2025 (current blocks are ~7.3M)
  'bifrost': 4500000,   // Updated Aug 30, 2025 (current blocks are ~4.5M)
  'hydration': 7800000, // Updated Aug 30, 2025 (current blocks are ~7.8M)
}

const BLOCK_TIMES: Record<string, number> = {
  'polkadot': 6,   // seconds per block
  'kusama': 6,     // seconds per block
  'acala': 12,     // seconds per block
  'moonbeam': 12,  // seconds per block
  'astar': 12,     // seconds per block
  'bifrost': 12,   // seconds per block
  'hydration': 12, // seconds per block
}

/**
 * Detect if blockchain data is stale/syncing
 */
export function detectSyncStatus(
  chainKey: string,
  currentBlock: number,
  blockTimestamp?: Date
): SyncStatus {
  const expectedBlock = EXPECTED_CURRENT_BLOCKS[chainKey]
  const blockTime = BLOCK_TIMES[chainKey] || 6
  
  if (!expectedBlock) {
    // Unknown chain, can't determine sync status
    return {
      isSyncing: false,
      currentBlock,
      targetBlock: null,
      blocksBehind: null,
      estimatedAge: null,
      syncPercentage: null
    }
  }
  
  const blocksBehind = Math.max(0, expectedBlock - currentBlock)
  const isSyncing = blocksBehind > 100 // Consider syncing if more than 100 blocks behind
  
  // Calculate estimated age of the current block
  const secondsBehind = blocksBehind * blockTime
  const estimatedAge = formatTimeAgo(secondsBehind)
  
  // Calculate sync percentage (rough estimate)
  const syncPercentage = isSyncing 
    ? Math.max(0, Math.min(100, ((currentBlock / expectedBlock) * 100)))
    : 100
    
  return {
    isSyncing,
    currentBlock,
    targetBlock: expectedBlock,
    blocksBehind: blocksBehind > 0 ? blocksBehind : null,
    estimatedAge,
    syncPercentage: Math.round(syncPercentage * 10) / 10 // Round to 1 decimal
  }
}

/**
 * Extract blockchain info from client responses
 */
export async function getChainInfo(client: any, chainKey: string): Promise<ChainInfo | null> {
  try {
    if (!client || !client._request) {
      return null
    }
    
    // Try to get current block information
    const [finalizedHash, bestHash] = await Promise.all([
      client._request('chain_getFinalizedHead', []).catch(() => null),
      client._request('chain_getHead', []).catch(() => null)
    ])
    
    if (!finalizedHash && !bestHash) {
      return null
    }
    
    // Get block information
    const blockHash = bestHash || finalizedHash
    const [header, blockInfo] = await Promise.all([
      client._request('chain_getHeader', [blockHash]).catch(() => null),
      client._request('chain_getBlock', [blockHash]).catch(() => null)
    ])
    
    if (!header) {
      return null
    }
    
    const currentBlock = parseInt(header.number, 16) // Convert from hex
    const timestamp = new Date() // We'll use current time as approximation
    
    // Determine if this looks like live data
    const syncStatus = detectSyncStatus(chainKey, currentBlock, timestamp)
    const isLive = !syncStatus.isSyncing
    
    return {
      name: chainKey,
      currentBlock,
      timestamp,
      isLive,
      chainLag: syncStatus.blocksBehind || 0
    }
    
  } catch (error) {
    console.warn(`Failed to get chain info for ${chainKey}:`, error)
    return null
  }
}

/**
 * Format time difference in human readable format
 */
function formatTimeAgo(seconds: number): string {
  if (seconds < 60) {
    return `${seconds} seconds ago`
  }
  
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) {
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
  }
  
  const hours = Math.floor(minutes / 60)
  if (hours < 24) {
    return `${hours} hour${hours > 1 ? 's' : ''} ago`
  }
  
  const days = Math.floor(hours / 24)
  if (days < 30) {
    return `${days} day${days > 1 ? 's' : ''} ago`
  }
  
  const months = Math.floor(days / 30)
  return `${months} month${months > 1 ? 's' : ''} ago`
}

/**
 * Check if chain data should be considered stale
 */
export function isStaleData(chainKey: string, blockNumber: number): boolean {
  const expectedBlock = EXPECTED_CURRENT_BLOCKS[chainKey]
  if (!expectedBlock) return false
  
  const blocksBehind = expectedBlock - blockNumber
  
  // Consider stale if more than 1 hour behind (600 blocks at 6s each)
  return blocksBehind > 600
}

/**
 * Get a warning message for stale data
 */
export function getStaleDataWarning(syncStatus: SyncStatus, chainKey: string): string | null {
  if (!syncStatus.isSyncing) {
    return null
  }
  
  if (syncStatus.blocksBehind && syncStatus.blocksBehind > 1000) {
    return `⚠️ Chain data is ${syncStatus.estimatedAge} - light client is syncing`
  }
  
  if (syncStatus.blocksBehind && syncStatus.blocksBehind > 100) {
    return `🔄 Syncing... ${syncStatus.blocksBehind.toLocaleString()} blocks behind`
  }
  
  return null
}