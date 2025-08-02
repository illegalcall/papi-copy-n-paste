export interface PalletCall {
  name: string
  args: { name: string; type: string }[]
  docs: string[]
}

export interface PalletStorage {
  name: string
  type: string
  docs: string[]
}

export interface PalletEvent {
  name: string
  args: { name: string; type: string }[]
  docs: string[]
}

export interface PalletInfo {
  name: string
  calls: PalletCall[]
  storage: PalletStorage[]
  events: PalletEvent[]
}

export interface ChainMetadata {
  pallets: PalletInfo[]
  chainHash: string
  specVersion: number
}

const METADATA_CACHE_KEY = 'papi-metadata-cache'
const METADATA_CACHE_VERSION = '1.0.0' // Increment when cache format changes
const DEFAULT_CACHE_TTL = 24 * 60 * 60 * 1000 // 24 hours
const MAX_CACHE_SIZE = 10 // Maximum number of chains to cache

// Enhanced retry utility with better timeout handling
async function fetchWithRetry<T>(
  fn: () => Promise<T>,
  maxRetries: number,
  timeoutMs: number
): Promise<T> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`Attempt ${attempt}/${maxRetries} to fetch metadata (${timeoutMs}ms timeout)...`)

      // Create abort controller for better cleanup
      const abortController = new AbortController()
      let timeoutHandle: NodeJS.Timeout

      // Create a timeout promise with cleanup
      const timeoutPromise = new Promise<never>((_, reject) => {
        timeoutHandle = setTimeout(() => {
          console.warn(`⏰ Metadata fetch timeout after ${timeoutMs}ms on attempt ${attempt}`)
          abortController.abort()
          reject(new Error(`Timeout after ${timeoutMs}ms`))
        }, timeoutMs)
      })

      try {
        // Race between the actual request and timeout
        const result = await Promise.race([fn(), timeoutPromise])
        clearTimeout(timeoutHandle)
        console.log(`✅ Metadata fetch succeeded on attempt ${attempt}`)
        return result
      } catch (raceError) {
        clearTimeout(timeoutHandle)
        throw raceError
      }

    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error'
      console.warn(`❌ Attempt ${attempt}/${maxRetries} failed:`, errorMsg)

      if (attempt === maxRetries) {
        console.error(`💥 All ${maxRetries} attempts failed, throwing error`)
        throw error
      }

      // Wait before retry (exponential backoff with jitter)
      const baseDelay = Math.min(1000 * Math.pow(2, attempt - 1), 5000)
      const jitter = Math.random() * 1000 // Add some randomness
      const delay = Math.floor(baseDelay + jitter)
      console.log(`⏳ Waiting ${delay}ms before retry...`)
      await new Promise(resolve => setTimeout(resolve, delay))
    }
  }

  throw new Error('All retry attempts failed')
}

interface CachedMetadata {
  version: string
  chains: {
    [chainKey: string]: {
      metadata: ChainMetadata
      timestamp: number
      specVersion: number
      rawMetadataHash?: string // Hash of raw metadata for validation
      ttl: number // Time to live in milliseconds
    }
  }
}

export async function fetchMetadata(chainKey: string, client: any): Promise<ChainMetadata | null> {
  try {
    console.log('Fetching metadata for:', chainKey, 'with client:', !!client)

    if (!client) {
      console.warn('No client available for metadata fetch')
      return null
    }

    // Check if this is our mock client
    if (client.mockClient) {
      console.log('Mock client detected, returning mock metadata')
      return createEnhancedMockMetadata(chainKey)
    }

    // Enhanced client readiness check
    if (!client._request) {
      console.warn('Client is not ready for metadata fetch (missing _request method)')
      return null
    }

    // Check cache first for faster loading
    const cached = getCachedMetadata(chainKey)
    if (cached) {
      console.log(`Using cached metadata for ${chainKey}`)
      return cached
    }

    console.log('Client object keys:', Object.keys(client))

    // Use PAPI client's _request method to get raw metadata via JSON-RPC with enhanced retry logic
    let rawMetadata: any;

    // For faster initial loading, use shorter timeouts and quicker fallback  
    const isPolkadotInitial = chainKey === 'polkadot'
    const quickTimeout = isPolkadotInitial ? 5000 : 8000 // 5s for Polkadot, 8s for others
    
    try {
      console.log(`🔄 Fetching raw metadata via state_getMetadata (${quickTimeout}ms timeout)...`)
      
      // Single attempt with quick timeout for better UX
      rawMetadata = await fetchWithRetry(
        () => {
          console.log('🚀 Executing state_getMetadata request...')
          return client._request('state_getMetadata', [])
        },
        1, // Single attempt
        quickTimeout
      )
      console.log('✅ Raw metadata received successfully!')
    } catch (error) {
      console.warn(`⚠️ Metadata fetch failed for ${chainKey}:`, error instanceof Error ? error.message : 'Unknown error')
      
      // For Polkadot, provide specific guidance about the known issue
      if (isPolkadotInitial) {
        console.log('📝 Polkadot initial connection issue detected - this is a known limitation')
        // Don't retry for Polkadot - fall back immediately
      }
      
      console.log(`🔄 Using enhanced mock metadata for ${chainKey} to maintain functionality`)
      return createEnhancedMockMetadata(chainKey)
    }

    if (!rawMetadata) {
      console.warn('No raw metadata returned')
      return createEnhancedMockMetadata(chainKey)
    }

    // Ensure rawMetadata is a string
    const rawMetadataString = typeof rawMetadata === 'string' ? rawMetadata : JSON.stringify(rawMetadata)

    // Parse the raw metadata
    const chainMetadata = await parseRawMetadata(rawMetadataString, chainKey)

    // Generate hash for cache validation
    const rawMetadataHash = simpleHash(rawMetadataString)

    // Cache the result with hash for validation
    setCachedMetadata(chainKey, chainMetadata, rawMetadataHash)

    console.log(`✅ Successfully fetched and cached metadata for ${chainKey} with ${chainMetadata.pallets.length} pallets`)
    return chainMetadata
  } catch (error) {
    console.error(`❌ Error fetching metadata for ${chainKey}:`, error)
    // Return mock metadata so the app still works
    console.log(`🆘 Returning enhanced mock metadata for ${chainKey}`)
    return createEnhancedMockMetadata(chainKey)
  }
}

function createEnhancedMockMetadata(chainKey: string): ChainMetadata {
  console.log('Creating enhanced mock metadata for:', chainKey)

  // Chain-specific enhanced metadata
  const chainSpecificPallets = getChainSpecificPallets(chainKey)

  return {
    pallets: chainSpecificPallets,
    chainHash: getChainHash(chainKey),
    specVersion: getChainSpecVersion(chainKey)
  }
}

function getChainSpecificPallets(chainKey: string): PalletInfo[] {
  const basePallets = getBasePallets()

  switch (chainKey) {
    case 'acala':
      return [
        ...basePallets,
        {
          name: 'Tokens',
          calls: [
            {
              name: 'transfer',
              args: [
                { name: 'dest', type: 'MultiAddress' },
                { name: 'currency_id', type: 'CurrencyId' },
                { name: 'amount', type: 'Compact<u128>' }
              ],
              docs: ['Transfer tokens to another account.']
            }
          ],
          storage: [
            {
              name: 'Accounts',
              type: 'TokenAccountData',
              docs: ['Token account information.']
            }
          ],
          events: [
            {
              name: 'Transfer',
              args: [
                { name: 'currency_id', type: 'CurrencyId' },
                { name: 'from', type: 'AccountId' },
                { name: 'to', type: 'AccountId' },
                { name: 'amount', type: 'u128' }
              ],
              docs: ['Token transfer occurred.']
            }
          ]
        },
        {
          name: 'DEX',
          calls: [
            {
              name: 'swap_with_exact_supply',
              args: [
                { name: 'path', type: 'Vec<CurrencyId>' },
                { name: 'supply_amount', type: 'Compact<u128>' },
                { name: 'min_target_amount', type: 'Compact<u128>' }
              ],
              docs: ['Swap tokens with exact supply amount.']
            }
          ],
          storage: [
            {
              name: 'LiquidityPool',
              type: 'PoolInfo',
              docs: ['Liquidity pool information.']
            }
          ],
          events: [
            {
              name: 'Swap',
              args: [
                { name: 'trader', type: 'AccountId' },
                { name: 'path', type: 'Vec<CurrencyId>' },
                { name: 'supply_amount', type: 'u128' },
                { name: 'target_amount', type: 'u128' }
              ],
              docs: ['Token swap occurred.']
            }
          ]
        }
      ]

    case 'astar':
      return [
        ...basePallets,
        {
          name: 'DappsStaking',
          calls: [
            {
              name: 'bond_and_stake',
              args: [
                { name: 'contract_id', type: 'SmartContract' },
                { name: 'value', type: 'Compact<u128>' }
              ],
              docs: ['Bond and stake on a dApp.']
            }
          ],
          storage: [
            {
              name: 'Ledger',
              type: 'AccountLedger',
              docs: ['Staking ledger information.']
            }
          ],
          events: [
            {
              name: 'BondAndStake',
              args: [
                { name: 'account', type: 'AccountId' },
                { name: 'smart_contract', type: 'SmartContract' },
                { name: 'amount', type: 'u128' }
              ],
              docs: ['Bond and stake event.']
            }
          ]
        }
      ]

    case 'moonbeam':
      return [
        ...basePallets,
        {
          name: 'EthereumXcm',
          calls: [
            {
              name: 'transact',
              args: [
                { name: 'xcm_transaction', type: 'XcmTransaction' }
              ],
              docs: ['Execute Ethereum transaction via XCM.']
            }
          ],
          storage: [
            {
              name: 'Nonce',
              type: 'u256',
              docs: ['Ethereum transaction nonce.']
            }
          ],
          events: [
            {
              name: 'TransactedViaXcm',
              args: [
                { name: 'account', type: 'AccountId' },
                { name: 'transaction', type: 'XcmTransaction' }
              ],
              docs: ['Ethereum transaction executed via XCM.']
            }
          ]
        }
      ]

    default:
      return basePallets
  }
}

function getBasePallets(): PalletInfo[] {
  return [
    {
      name: 'System',
      calls: [
        {
          name: 'remark',
          args: [{ name: 'remark', type: 'Bytes' }],
          docs: ['Make some on-chain remark.']
        }
      ],
      storage: [
        {
          name: 'Account',
          type: 'AccountInfo',
          docs: ['The full account information for a particular account ID.']
        }
      ],
      events: [
        {
          name: 'ExtrinsicSuccess',
          args: [{ name: 'dispatch_info', type: 'DispatchInfo' }],
          docs: ['An extrinsic completed successfully.']
        }
      ]
    },
    {
      name: 'Balances',
      calls: [
        {
          name: 'transfer_allow_death',
          args: [
            { name: 'dest', type: 'MultiAddress' },
            { name: 'value', type: 'Compact<u128>' }
          ],
          docs: ['Transfer some liquid free balance to another account.']
        },
        {
          name: 'transfer_keep_alive',
          args: [
            { name: 'dest', type: 'MultiAddress' },
            { name: 'value', type: 'Compact<u128>' }
          ],
          docs: ['Same as the transfer call, but with a check that the transfer will not kill the origin account.']
        }
      ],
      storage: [
        {
          name: 'TotalIssuance',
          type: 'u128',
          docs: ['The total units issued in the system.']
        }
      ],
      events: [
        {
          name: 'Transfer',
          args: [
            { name: 'from', type: 'AccountId32' },
            { name: 'to', type: 'AccountId32' },
            { name: 'amount', type: 'u128' }
          ],
          docs: ['Transfer succeeded.']
        }
      ]
    },
    {
      name: 'Timestamp',
      calls: [
        {
          name: 'set',
          args: [{ name: 'now', type: 'Compact<u64>' }],
          docs: ['Set the current time.']
        }
      ],
      storage: [
        {
          name: 'Now',
          type: 'u64',
          docs: ['Current time for the current block.']
        }
      ],
      events: []
    }
  ]
}

async function parseRawMetadata(rawMetadata: string, chainKey: string): Promise<ChainMetadata> {
  try {
    console.log('Parsing raw metadata for:', chainKey)
    console.log('Raw metadata length:', rawMetadata.length)

    // Import the metadata builders for SCALE decoding
    const { metadata: metadataCodec } = await import('@polkadot-api/substrate-bindings')

    // Remove the '0x' prefix if present
    const hexData = rawMetadata.startsWith('0x') ? rawMetadata.slice(2) : rawMetadata

    // Convert hex string to Uint8Array
    const bytes = new Uint8Array(hexData.match(/.{1,2}/g)?.map(byte => parseInt(byte, 16)) || [])
    console.log('Decoded bytes length:', bytes.length)

    // Decode the SCALE-encoded metadata
    console.log('Decoding SCALE metadata...')
    const decodedMetadata = metadataCodec.dec(bytes)
    console.log('Successfully decoded metadata:', decodedMetadata)

    // Parse the decoded metadata into our format
    const chainMetadata = parseDecodedMetadata(decodedMetadata, chainKey)

    return chainMetadata
  } catch (error) {
    console.error('Error parsing raw metadata:', error)
    console.log('Falling back to enhanced mock metadata')
    // Fallback to enhanced mock metadata if parsing fails
    return createEnhancedMockMetadata(chainKey)
  }
}

function parseDecodedMetadata(decodedMetadata: any, chainKey: string): ChainMetadata {
  try {
    console.log('Parsing decoded metadata structure...')

    const pallets: PalletInfo[] = []

    // Handle different metadata versions (v14, v15, etc.)
    const metadataVersion = decodedMetadata.metadata
    let palletData: any[] = []

    if (metadataVersion?.v15?.pallets) {
      console.log('Processing metadata v15')
      palletData = metadataVersion.v15.pallets
    } else if (metadataVersion?.v14?.pallets) {
      console.log('Processing metadata v14')
      palletData = metadataVersion.v14.pallets
    } else {
      console.warn('Unknown metadata version, falling back to enhanced mock')
      return createEnhancedMockMetadata(chainKey)
    }

    console.log(`Found ${palletData.length} pallets in metadata`)

    // Parse each pallet
    for (const pallet of palletData) {
      const palletInfo: PalletInfo = {
        name: pallet.name || 'Unknown',
        calls: [],
        storage: [],
        events: []
      }

      // Parse calls
      if (pallet.calls?.type !== undefined) {
        // In real metadata, calls are referenced by type index
        // For now, we'll create some basic calls based on common patterns
        palletInfo.calls = parseCallsFromPallet(pallet)
      }

      // Parse storage
      if (pallet.storage?.items) {
        for (const item of pallet.storage.items) {
          palletInfo.storage.push({
            name: item.name || 'Unknown',
            type: formatStorageType(item.type),
            docs: Array.isArray(item.docs) ? item.docs : []
          })
        }
      }

      // Parse events
      if (pallet.events?.type !== undefined) {
        // Similar to calls, events are referenced by type index
        palletInfo.events = parseEventsFromPallet(pallet)
      }

      pallets.push(palletInfo)
    }

    console.log(`Successfully parsed ${pallets.length} pallets from real metadata`)

    return {
      pallets: pallets.filter(p => p.calls.length > 0 || p.storage.length > 0 || p.events.length > 0),
      chainHash: chainKey === 'polkadot' ? '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3' : '0x' + '0'.repeat(64),
      specVersion: metadataVersion?.v15?.specVersion || metadataVersion?.v14?.specVersion || 1000
    }
  } catch (error) {
    console.error('Error parsing decoded metadata:', error)
    return createEnhancedMockMetadata(chainKey)
  }
}

function parseCallsFromPallet(pallet: any): PalletCall[] {
  // This is a simplified implementation
  // In a full implementation, you would resolve the type references
  const calls: PalletCall[] = []

  // Add some common calls based on pallet name
  const palletName = pallet.name?.toLowerCase() || ''

  if (palletName.includes('balance')) {
    calls.push(
      {
        name: 'transfer_allow_death',
        args: [
          { name: 'dest', type: 'MultiAddress' },
          { name: 'value', type: 'Compact<u128>' }
        ],
        docs: ['Transfer some liquid free balance to another account.']
      },
      {
        name: 'transfer_keep_alive',
        args: [
          { name: 'dest', type: 'MultiAddress' },
          { name: 'value', type: 'Compact<u128>' }
        ],
        docs: ['Same as the transfer call, but with a check that the transfer will not kill the origin account.']
      },
      {
        name: 'transfer_all',
        args: [
          { name: 'dest', type: 'MultiAddress' },
          { name: 'keep_alive', type: 'bool' }
        ],
        docs: ['Transfer the entire transferable balance from the caller account.']
      }
    )
  } else if (palletName.includes('system')) {
    calls.push(
      {
        name: 'remark',
        args: [{ name: 'remark', type: 'Bytes' }],
        docs: ['Make some on-chain remark.']
      },
      {
        name: 'set_heap_pages',
        args: [{ name: 'pages', type: 'u64' }],
        docs: ['Set the number of pages in the WebAssembly environment heap.']
      }
    )
  } else if (palletName.includes('staking')) {
    calls.push(
      {
        name: 'bond',
        args: [
          { name: 'value', type: 'Compact<u128>' },
          { name: 'payee', type: 'RewardDestination' }
        ],
        docs: ['Take the origin account as a stash and lock up value of its balance.']
      },
      {
        name: 'nominate',
        args: [{ name: 'targets', type: 'Vec<MultiAddress>' }],
        docs: ['Declare the desire to nominate targets for the origin controller.']
      }
    )
  } else if (palletName.includes('timestamp')) {
    calls.push({
      name: 'set',
      args: [{ name: 'now', type: 'Compact<u64>' }],
      docs: ['Set the current time.']
    })
  }

  return calls
}

function parseEventsFromPallet(pallet: any): PalletEvent[] {
  // Simplified event parsing based on pallet name
  const events: PalletEvent[] = []
  const palletName = pallet.name?.toLowerCase() || ''

  if (palletName.includes('balance')) {
    events.push({
      name: 'Transfer',
      args: [
        { name: 'from', type: 'AccountId32' },
        { name: 'to', type: 'AccountId32' },
        { name: 'amount', type: 'u128' }
      ],
      docs: ['Transfer succeeded.']
    })
  } else if (palletName.includes('system')) {
    events.push({
      name: 'ExtrinsicSuccess',
      args: [{ name: 'dispatch_info', type: 'DispatchInfo' }],
      docs: ['An extrinsic completed successfully.']
    })
  }

  return events
}

function formatStorageType(storageType: any): string {
  if (typeof storageType === 'string') return storageType
  if (storageType?.Plain) return storageType.Plain
  if (storageType?.Map) return `Map<${storageType.Map.key || 'Key'}, ${storageType.Map.value || 'Value'}>`
  return 'Unknown'
}



function parseMetadata(metadata: any, chainKey: string): ChainMetadata {
  // If it's already our mock metadata format, return it directly
  if (metadata && metadata.pallets && Array.isArray(metadata.pallets) && metadata.chainHash !== undefined) {
    console.log('Metadata already in correct format')
    return metadata as ChainMetadata
  }

  const pallets: PalletInfo[] = []
  
  if (metadata && metadata.pallets) {
    for (const pallet of metadata.pallets) {
      const palletInfo: PalletInfo = {
        name: pallet.name,
        calls: [],
        storage: [],
        events: []
      }

      // Parse calls
      if (pallet.calls) {
        for (const call of pallet.calls.variants || []) {
          palletInfo.calls.push({
            name: call.name,
            args: call.fields?.map((field: any) => ({
              name: field.name || `arg${field.index}`,
              type: field.type || 'unknown'
            })) || [],
            docs: call.docs || []
          })
        }
      }

      // Parse storage
      if (pallet.storage?.items) {
        for (const item of pallet.storage.items) {
          palletInfo.storage.push({
            name: item.name,
            type: item.type?.type || 'unknown',
            docs: item.docs || []
          })
        }
      }

      // Parse events
      if (pallet.events) {
        for (const event of pallet.events.variants || []) {
          palletInfo.events.push({
            name: event.name,
            args: event.fields?.map((field: any) => ({
              name: field.name || `arg${field.index}`,
              type: field.type || 'unknown'
            })) || [],
            docs: event.docs || []
          })
        }
      }

      pallets.push(palletInfo)
    }
  }

  return {
    pallets,
    chainHash: metadata.genesisHash || '',
    specVersion: metadata.specVersion || 0
  }
}

function getCachedMetadata(chainKey: string, specVersion?: number): ChainMetadata | null {
  try {
    if (typeof window === 'undefined') return null

    const cached = localStorage.getItem(METADATA_CACHE_KEY)
    if (!cached) return null

    const data: CachedMetadata = JSON.parse(cached)

    // Check cache version compatibility
    if (data.version !== METADATA_CACHE_VERSION) {
      console.log('Cache version mismatch, clearing cache')
      localStorage.removeItem(METADATA_CACHE_KEY)
      return null
    }

    const entry = data.chains?.[chainKey]
    if (!entry) return null

    // Check if cache is still valid based on TTL
    const now = Date.now()
    const cacheAge = now - entry.timestamp

    if (cacheAge > entry.ttl) {
      console.log(`Cache expired for ${chainKey} (age: ${Math.round(cacheAge / 1000 / 60)} minutes)`)
      delete data.chains[chainKey]
      localStorage.setItem(METADATA_CACHE_KEY, JSON.stringify(data))
      return null
    }

    // Check spec version if provided
    if (specVersion && entry.specVersion !== specVersion) {
      console.log(`Spec version mismatch for ${chainKey}: cached ${entry.specVersion}, current ${specVersion}`)
      delete data.chains[chainKey]
      localStorage.setItem(METADATA_CACHE_KEY, JSON.stringify(data))
      return null
    }

    console.log(`Using cached metadata for ${chainKey} (age: ${Math.round(cacheAge / 1000 / 60)} minutes)`)
    return entry.metadata
  } catch (error) {
    console.warn('Error reading metadata cache:', error)
    // Clear corrupted cache
    try {
      localStorage.removeItem(METADATA_CACHE_KEY)
    } catch {}
    return null
  }
}

function setCachedMetadata(chainKey: string, metadata: ChainMetadata, rawMetadataHash?: string): void {
  try {
    if (typeof window === 'undefined') return

    let data: CachedMetadata = {
      version: METADATA_CACHE_VERSION,
      chains: {}
    }

    try {
      const existing = localStorage.getItem(METADATA_CACHE_KEY)
      if (existing) {
        const parsed = JSON.parse(existing)
        if (parsed.version === METADATA_CACHE_VERSION) {
          data = parsed
        }
      }
    } catch {
      // Start fresh if corrupted
      console.log('Starting fresh metadata cache due to corruption')
    }

    // Implement LRU cache eviction if we exceed max size
    const chainKeys = Object.keys(data.chains)
    if (chainKeys.length >= MAX_CACHE_SIZE && !data.chains[chainKey]) {
      // Remove oldest entry
      const oldestChain = chainKeys.reduce((oldest, current) => {
        const currentEntry = data.chains[current]
        const oldestEntry = data.chains[oldest]
        if (!currentEntry || !oldestEntry) return oldest
        return currentEntry.timestamp < oldestEntry.timestamp ? current : oldest
      })
      console.log(`Evicting oldest cache entry: ${oldestChain}`)
      delete data.chains[oldestChain]
    }

    // Set cache entry with enhanced metadata
    data.chains[chainKey] = {
      metadata,
      timestamp: Date.now(),
      specVersion: metadata.specVersion,
      rawMetadataHash,
      ttl: DEFAULT_CACHE_TTL
    }

    localStorage.setItem(METADATA_CACHE_KEY, JSON.stringify(data))
    console.log(`Cached metadata for ${chainKey} (spec version: ${metadata.specVersion})`)
  } catch (error) {
    console.warn('Error caching metadata:', error)
    // If localStorage is full, try to clear old entries
    if (error instanceof Error && error.name === 'QuotaExceededError') {
      try {
        clearOldCacheEntries()
        // Retry caching
        setCachedMetadata(chainKey, metadata, rawMetadataHash)
      } catch {
        console.warn('Failed to cache metadata even after cleanup')
      }
    }
  }
}

function clearOldCacheEntries(): void {
  try {
    const cached = localStorage.getItem(METADATA_CACHE_KEY)
    if (!cached) return

    const data: CachedMetadata = JSON.parse(cached)
    const now = Date.now()

    // Remove entries older than 12 hours
    const cutoffTime = now - (12 * 60 * 60 * 1000)

    for (const [chainKey, entry] of Object.entries(data.chains)) {
      if (entry.timestamp < cutoffTime) {
        delete data.chains[chainKey]
        console.log(`Cleared old cache entry for ${chainKey}`)
      }
    }

    localStorage.setItem(METADATA_CACHE_KEY, JSON.stringify(data))
  } catch (error) {
    console.warn('Error clearing old cache entries:', error)
    // If all else fails, clear the entire cache
    localStorage.removeItem(METADATA_CACHE_KEY)
  }
}

// Simple hash function for cache validation
function simpleHash(str: string): string {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32-bit integer
  }
  return hash.toString(36)
}

// Cache management utilities
export function getCacheInfo(): { size: number; chains: string[]; totalSize: number } {
  try {
    if (typeof window === 'undefined') return { size: 0, chains: [], totalSize: 0 }

    const cached = localStorage.getItem(METADATA_CACHE_KEY)
    if (!cached) return { size: 0, chains: [], totalSize: 0 }

    const data: CachedMetadata = JSON.parse(cached)
    const chains = Object.keys(data.chains || {})

    return {
      size: chains.length,
      chains,
      totalSize: cached.length
    }
  } catch {
    return { size: 0, chains: [], totalSize: 0 }
  }
}

export function clearMetadataCache(): void {
  try {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(METADATA_CACHE_KEY)
      console.log('Metadata cache cleared')
    }
  } catch (error) {
    console.warn('Error clearing metadata cache:', error)
  }
}

export function buildPalletTree(metadata: ChainMetadata | null): PalletInfo[] {
  if (!metadata) return []

  return metadata.pallets.sort((a, b) => a.name.localeCompare(b.name))
}

// Helper functions for enhanced mock metadata
function getChainHash(chainKey: string): string {
  const chainHashes: Record<string, string> = {
    'polkadot': '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3',
    'kusama': '0xb0a8d493285c2df73290dfb7e61f870f17b41801197a149ca93654499ea3dafe',
    'acala': '0xfc41b9bd8ef8fe53d58c7ea67c794c7ec9a73daf05e6d54b14ff6342c99ba64c',
    'astar': '0x9eb76c5184c4ab8679d2d5d819fdf90b9c001403e9e17da2e14b6d8aec4029c6',
    'moonbeam': '0xfe58ea77779b7abda7da4ec526d14db9b1e9cd40a217c34892af80a9b332b76d',
    'bifrost': '0x9f28c6a68e0fc9646eff64935684f6eeeece527e37bbe1f213d22caa1d9d6bed',
    'hydration': '0xafdc188f45c71dacbaa0b62e16a91f726c7b8699a9748cdf715459de6b7f366d'
  }
  return chainHashes[chainKey] || '0x' + '0'.repeat(64)
}

function getChainSpecVersion(chainKey: string): number {
  const specVersions: Record<string, number> = {
    'polkadot': 1015000,
    'kusama': 9430,
    'acala': 2260,
    'astar': 143,
    'moonbeam': 3100,
    'bifrost': 993,
    'hydration': 267
  }
  return specVersions[chainKey] || 1000
}