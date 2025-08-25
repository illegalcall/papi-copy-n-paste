
import { createClient } from 'polkadot-api'
import { getWsProvider } from 'polkadot-api/ws-provider/web'

export interface MetadataCache {
  chainKey: string
  metadata: string
  timestamp: number
  version?: string
}

export interface ChainConfig {
  chainKey: string
  wsUrl: string
  name: string
}

export class MetadataService {
  private static instance: MetadataService
  private cache = new Map<string, MetadataCache>()
  private activeConnections = new Map<string, any>()
  private backgroundRefreshPromises = new Map<string, Promise<void>>()

  // Cache settings
  private readonly CACHE_DURATION = 1000 * 60 * 60 * 24 // 24 hours
  private readonly CACHE_KEY_PREFIX = 'papi_metadata_'
  private readonly DB_NAME = 'PAPIMetadataCache'
  private readonly DB_VERSION = 1
  private readonly STORE_NAME = 'metadata'

  private db: IDBDatabase | null = null

  private constructor() {
    this.initIndexedDB()
  }

  static getInstance(): MetadataService {
    if (!MetadataService.instance) {
      MetadataService.instance = new MetadataService()
    }
    return MetadataService.instance
  }

  /**
   * Initialize IndexedDB for persistent caching
   */
  private async initIndexedDB(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.DB_NAME, this.DB_VERSION)

      request.onerror = () => {
        console.warn('IndexedDB not available, falling back to localStorage')
        resolve()
      }

      request.onsuccess = () => {
        this.db = request.result
        resolve()
      }

      request.onupgradeneeded = () => {
        const db = request.result
        if (!db.objectStoreNames.contains(this.STORE_NAME)) {
          const store = db.createObjectStore(this.STORE_NAME, { keyPath: 'chainKey' })
          store.createIndex('timestamp', 'timestamp', { unique: false })
        }
      }
    })
  }

  /**
   * Get metadata with cache-first strategy
   */
  async getMetadata(chainConfig: ChainConfig): Promise<string> {
    const { chainKey } = chainConfig

    try {
      // 1. Check memory cache first
      const memoryCache = this.cache.get(chainKey)
      if (memoryCache && !this.isCacheExpired(memoryCache)) {
        console.log(`📋 Memory cache hit for ${chainKey}`)
        // Start background refresh
        this.refreshMetadataBackground(chainConfig)
        return memoryCache.metadata
      }

      // 2. Check persistent cache (IndexedDB/localStorage)
      const persistentCache = await this.getCachedMetadata(chainKey)
      if (persistentCache && !this.isCacheExpired(persistentCache)) {
        console.log(`💾 Persistent cache hit for ${chainKey}`)
        // Update memory cache
        this.cache.set(chainKey, persistentCache)
        // Start background refresh
        this.refreshMetadataBackground(chainConfig)
        return persistentCache.metadata
      }

      // 3. No valid cache, fetch live metadata
      console.log(`🔗 Cache miss, fetching live metadata for ${chainKey}`)
      const metadata = await this.fetchLiveMetadata(chainConfig)

      // Cache the result
      await this.cacheMetadata(chainKey, metadata)

      return metadata

    } catch (error) {
      console.error(`❌ Failed to get metadata for ${chainKey}:`, error)

      // Try to return expired cache as last resort
      const expiredCache = await this.getCachedMetadata(chainKey)
      if (expiredCache) {
        console.warn(`⚠️ Using expired cache for ${chainKey}`)
        return expiredCache.metadata
      }

      throw new Error(`Failed to fetch metadata for ${chainKey}: ${error instanceof Error ? error.message : error}`)
    }
  }

  /**
   * Background metadata refresh (non-blocking)
   */
  async refreshMetadataBackground(chainConfig: ChainConfig): Promise<void> {
    const { chainKey } = chainConfig

    // Prevent multiple background refreshes for the same chain
    if (this.backgroundRefreshPromises.has(chainKey)) {
      return this.backgroundRefreshPromises.get(chainKey)!
    }

    const refreshPromise = this.performBackgroundRefresh(chainConfig)
    this.backgroundRefreshPromises.set(chainKey, refreshPromise)

    try {
      await refreshPromise
    } finally {
      this.backgroundRefreshPromises.delete(chainKey)
    }
  }

  /**
   * Perform the actual background refresh
   */
  private async performBackgroundRefresh(chainConfig: ChainConfig): Promise<void> {
    const { chainKey } = chainConfig

    try {
      console.log(`🔄 Background refresh started for ${chainKey}`)
      const freshMetadata = await this.fetchLiveMetadata(chainConfig)

      // Update cache with fresh metadata
      await this.cacheMetadata(chainKey, freshMetadata)

      console.log(`✅ Background refresh completed for ${chainKey}`)

      // Emit event for UI to refresh if needed
      this.emitMetadataUpdated(chainKey)

    } catch (error) {
      console.warn(`⚠️ Background refresh failed for ${chainKey}:`, error)
      // Don't throw error for background refresh failures
    }
  }

  /**
   * Fetch live metadata from chain with timeout handling
   */
  private async fetchLiveMetadata(chainConfig: ChainConfig): Promise<string> {
    const { chainKey, wsUrl } = chainConfig
    let client: any = null
    const FETCH_TIMEOUT = 15000 // 15 second timeout

    try {
      // Reuse existing connection if available
      if (this.activeConnections.has(chainKey)) {
        client = this.activeConnections.get(chainKey)
      } else {
        console.log(`🔗 Creating new connection to ${chainKey} at ${wsUrl}`)
        const wsProvider = getWsProvider(wsUrl)
        client = createClient(wsProvider)
        this.activeConnections.set(chainKey, client)
      }

      // Create timeout promise
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => {
          reject(new Error(`Metadata fetch timeout after ${FETCH_TIMEOUT}ms for ${chainKey}`))
        }, FETCH_TIMEOUT)
      })

      // Race metadata fetch against timeout
      const metadataHex = await Promise.race([
        client._request('state_getMetadata', []),
        timeoutPromise
      ])

      if (!metadataHex || typeof metadataHex !== 'string') {
        throw new Error('Invalid metadata response')
      }

      console.log(`✅ Fetched live metadata for ${chainKey} (${metadataHex.length} chars)`)
      return metadataHex

    } catch (error) {
      console.error(`❌ Failed to fetch metadata for ${chainKey}:`, error)

      // Clean up failed connection
      if (client) {
        try {
          client.destroy()
        } catch {}
        this.activeConnections.delete(chainKey)
      }
      throw error
    }
  }

  /**
   * Cache metadata in both memory and persistent storage
   */
  private async cacheMetadata(chainKey: string, metadata: string): Promise<void> {
    const cacheEntry: MetadataCache = {
      chainKey,
      metadata,
      timestamp: Date.now(),
      version: this.getMetadataVersion(metadata)
    }

    // Update memory cache
    this.cache.set(chainKey, cacheEntry)

    // Update persistent cache
    try {
      if (this.db) {
        await this.saveToIndexedDB(cacheEntry)
      } else {
        await this.saveToLocalStorage(cacheEntry)
      }
    } catch (error) {
      console.warn('Failed to persist metadata cache:', error)
    }
  }

  /**
   * Get cached metadata from persistent storage
   */
  private async getCachedMetadata(chainKey: string): Promise<MetadataCache | null> {
    try {
      if (this.db) {
        return await this.getFromIndexedDB(chainKey)
      } else {
        return await this.getFromLocalStorage(chainKey)
      }
    } catch (error) {
      console.warn('Failed to read cached metadata:', error)
      return null
    }
  }

  /**
   * IndexedDB operations
   */
  private async saveToIndexedDB(cacheEntry: MetadataCache): Promise<void> {
    if (!this.db) return

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.STORE_NAME], 'readwrite')
      const store = transaction.objectStore(this.STORE_NAME)
      const request = store.put(cacheEntry)

      request.onsuccess = () => resolve()
      request.onerror = () => reject(request.error)
    })
  }

  private async getFromIndexedDB(chainKey: string): Promise<MetadataCache | null> {
    if (!this.db) return null

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([this.STORE_NAME], 'readonly')
      const store = transaction.objectStore(this.STORE_NAME)
      const request = store.get(chainKey)

      request.onsuccess = () => resolve(request.result || null)
      request.onerror = () => reject(request.error)
    })
  }

  /**
   * localStorage operations (fallback)
   */
  private async saveToLocalStorage(cacheEntry: MetadataCache): Promise<void> {
    const key = this.CACHE_KEY_PREFIX + cacheEntry.chainKey
    localStorage.setItem(key, JSON.stringify(cacheEntry))
  }

  private async getFromLocalStorage(chainKey: string): Promise<MetadataCache | null> {
    const key = this.CACHE_KEY_PREFIX + chainKey
    const cached = localStorage.getItem(key)
    return cached ? JSON.parse(cached) : null
  }

  /**
   * Cache utilities
   */
  private isCacheExpired(cache: MetadataCache): boolean {
    return Date.now() - cache.timestamp > this.CACHE_DURATION
  }

  private getMetadataVersion(metadata: string): string {
    // Simple version based on metadata hash
    return metadata.slice(0, 16)
  }

  /**
   * Event emission for UI updates
   */
  private emitMetadataUpdated(chainKey: string): void {
    // Emit custom event for UI components to listen
    window.dispatchEvent(new CustomEvent('metadataUpdated', {
      detail: { chainKey }
    }))
  }

  /**
   * Cleanup connections
   */
  async cleanup(): Promise<void> {
    for (const [chainKey, client] of this.activeConnections) {
      try {
        client.destroy()
      } catch (error) {
        console.warn(`Failed to cleanup connection for ${chainKey}:`, error)
      }
    }
    this.activeConnections.clear()
  }

  /**
   * Clear cache for specific chain or all chains
   */
  async clearCache(chainKey?: string): Promise<void> {
    if (chainKey) {
      // Clear specific chain cache
      this.cache.delete(chainKey)

      if (this.db) {
        const transaction = this.db.transaction([this.STORE_NAME], 'readwrite')
        const store = transaction.objectStore(this.STORE_NAME)
        store.delete(chainKey)
      } else {
        localStorage.removeItem(this.CACHE_KEY_PREFIX + chainKey)
      }
    } else {
      // Clear all cache
      this.cache.clear()

      if (this.db) {
        const transaction = this.db.transaction([this.STORE_NAME], 'readwrite')
        const store = transaction.objectStore(this.STORE_NAME)
        store.clear()
      } else {
        Object.keys(localStorage)
          .filter(key => key.startsWith(this.CACHE_KEY_PREFIX))
          .forEach(key => localStorage.removeItem(key))
      }
    }
  }

  /**
   * Get cache statistics
   */
  getCacheStats(): { chainCount: number; totalSize: number; memoryHits: number } {
    let totalSize = 0
    for (const cache of this.cache.values()) {
      totalSize += cache.metadata.length
    }

    return {
      chainCount: this.cache.size,
      totalSize,
      memoryHits: this.cache.size
    }
  }
}

/**
 * Chain configurations for supported networks
 */
export const SUPPORTED_CHAINS: ChainConfig[] = [
  {
    chainKey: 'polkadot',
    wsUrl: 'wss://rpc.polkadot.io',
    name: 'Polkadot'
  },
  {
    chainKey: 'kusama',
    wsUrl: 'wss://kusama-rpc.polkadot.io',
    name: 'Kusama'
  },
  {
    chainKey: 'moonbeam',
    wsUrl: 'wss://wss.api.moonbeam.network',
    name: 'Moonbeam'
  },
  {
    chainKey: 'bifrost',
    wsUrl: 'wss://hk.p.bifrost-rpc.liebi.com/ws',
    name: 'Bifrost'
  },
  {
    chainKey: 'astar',
    wsUrl: 'wss://rpc.astar.network',
    name: 'Astar'
  },
  {
    chainKey: 'acala',
    wsUrl: 'wss://acala-rpc.dwellir.com',
    name: 'Acala'
  },
  {
    chainKey: 'hydration',
    wsUrl: 'wss://hydration-rpc.n.dwellir.com',
    name: 'Hydration'
  },
  {
    chainKey: 'paseo_asset_hub',
    wsUrl: 'wss://pas-rpc.stakeworld.io/assethub',
    name: 'Asset Hub Paseo'
  }
]

/**
 * Get chain config by key
 */
export function getChainConfig(chainKey: string): ChainConfig | undefined {
  return SUPPORTED_CHAINS.find(chain => chain.chainKey === chainKey)
}

/**
 * Singleton instance
 */
export const metadataService = MetadataService.getInstance()