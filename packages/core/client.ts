import { start } from "polkadot-api/smoldot"
import { getSmProvider } from "polkadot-api/sm-provider"
import { getWsProvider } from "polkadot-api/ws-provider/web"
import { withPolkadotSdkCompat } from "polkadot-api/polkadot-sdk-compat"
import { createClient } from 'polkadot-api'
import { useEffect, useState } from 'react'
import chainsData from './chains.json' with { type: 'json' }

export interface ChainConfig {
  key: string
  name: string
  ws: string
  specVersion: number
  paraId: number | null
  genesisHash: string
  chainSpecPath?: string
  icon: string
  color: string
  explorerUrl?: string
  explorerName?: string
}

export interface ClientState {
  status: 'connecting' | 'ready' | 'error'
  head: number | null
  api: any | null
  error?: string
  chainKey?: string
}

export const chains: ChainConfig[] = chainsData

// Enhanced client cache with performance optimizations
const clientCache = new Map<string, any>()
const connectionPromises = new Map<string, Promise<any>>()
const connectionHealth = new Map<string, { lastCheck: number; isHealthy: boolean }>()
const CONNECTION_HEALTH_TTL = 30000 // 30 seconds

// Connection pool management
const MAX_CONCURRENT_CONNECTIONS = 3
const activeConnections = new Set<string>()

// Performance metrics
const connectionMetrics = new Map<string, {
  connectTime: number
  lastUsed: number
  errorCount: number
  successCount: number
}>()

// Preload popular chains for faster switching
const PRELOAD_CHAINS = ['polkadot', 'kusama']

// Health check for existing connections
function isConnectionHealthy(chainKey: string): boolean {
  const health = connectionHealth.get(chainKey)
  if (!health) return false

  const now = Date.now()
  return health.isHealthy && (now - health.lastCheck) < CONNECTION_HEALTH_TTL
}

// Update connection health status
function updateConnectionHealth(chainKey: string, isHealthy: boolean) {
  connectionHealth.set(chainKey, {
    lastCheck: Date.now(),
    isHealthy
  })
}

// Update performance metrics
function updateMetrics(chainKey: string, success: boolean, connectTime?: number) {
  const existing = connectionMetrics.get(chainKey) || {
    connectTime: 0,
    lastUsed: 0,
    errorCount: 0,
    successCount: 0
  }

  connectionMetrics.set(chainKey, {
    connectTime: connectTime || existing.connectTime,
    lastUsed: Date.now(),
    errorCount: success ? existing.errorCount : existing.errorCount + 1,
    successCount: success ? existing.successCount + 1 : existing.successCount
  })
}

// Preload connections for popular chains
async function preloadConnections() {
  console.log('🚀 Preloading popular chains for faster switching...')

  for (const chainKey of PRELOAD_CHAINS) {
    if (!clientCache.has(chainKey) && activeConnections.size < MAX_CONCURRENT_CONNECTIONS) {
      try {
        console.log(`⚡ Preloading ${chainKey}...`)
        await createSmoldotClient(chainKey)
        console.log(`✅ Preloaded ${chainKey}`)
      } catch (error) {
        console.warn(`⚠️ Failed to preload ${chainKey}:`, error)
      }
    }
  }
}

// Initialize preloading (non-blocking)
if (typeof window !== 'undefined') {
  setTimeout(preloadConnections, 1000) // Delay to avoid blocking initial load
}

export async function createSmoldotClient(chainKey: string) {
  const startTime = Date.now()

  // Check cache first for faster switching
  if (clientCache.has(chainKey)) {
    console.log(`⚡ Using cached connection for ${chainKey}`)
    updateMetrics(chainKey, true)
    return clientCache.get(chainKey)
  }

  // Check if we're already connecting to avoid duplicate connections
  if (connectionPromises.has(chainKey)) {
    console.log(`⏳ Waiting for existing connection to ${chainKey}...`)
    return await connectionPromises.get(chainKey)!
  }

  const chainConfig = chains.find(c => c.key === chainKey)
  if (!chainConfig) {
    throw new Error(`Chain ${chainKey} not found`)
  }

  console.log(`🔄 Creating optimized client for ${chainKey}`)

  // Create connection promise to avoid duplicates
  const connectionPromise = (async () => {
    try {
      // Add to active connections
      activeConnections.add(chainKey)

      let result: any

      // Use different connection methods based on chain type
      if (chainKey === 'polkadot') {
        console.log(`Loading Polkadot chainspec from @polkadot-api/known-chains`)
        const smoldot = start()
        const { chainSpec } = await import('polkadot-api/chains/polkadot')
        const chain = await smoldot.addChain({ chainSpec })
        const client = createClient(getSmProvider(chain))

        console.log(`✓ Successfully connected to ${chainKey} via smoldot`)
        result = { client, smoldot, chain }

      } else if (chainKey === 'kusama') {
        console.log(`Loading Kusama chainspec from @polkadot-api/known-chains`)
        const smoldot = start()
        const { chainSpec } = await import('polkadot-api/chains/ksmcc3')
        const chain = await smoldot.addChain({ chainSpec })
        const client = createClient(getSmProvider(chain))

        console.log(`✓ Successfully connected to ${chainKey} via smoldot`)
        result = { client, smoldot, chain }

      } else {
        // For other chains, use WebSocket connection
        console.log(`Connecting to ${chainConfig.name} via WebSocket: ${chainConfig.ws}`)
        const client = createClient(
          withPolkadotSdkCompat(getWsProvider(chainConfig.ws))
        )

        console.log(`✓ Successfully connected to ${chainKey} via WebSocket`)
        result = { client, smoldot: null, chain: null }
      }

      // Cache the successful connection
      clientCache.set(chainKey, result)
      updateConnectionHealth(chainKey, true)
      updateMetrics(chainKey, true, Date.now() - startTime)

      console.log(`🎯 Cached connection for ${chainKey} (${Date.now() - startTime}ms)`)
      return result

    } catch (error) {
      updateConnectionHealth(chainKey, false)
      updateMetrics(chainKey, false)
      console.error(`❌ Failed to create client for ${chainKey}:`, error)
      throw error
    } finally {
      // Remove from active connections and promises
      activeConnections.delete(chainKey)
      connectionPromises.delete(chainKey)
    }
  })()

  // Store the promise to avoid duplicate connections
  connectionPromises.set(chainKey, connectionPromise)
  return connectionPromise
}

export function useClient(chainKey: string): ClientState {
  const [state, setState] = useState<ClientState>({
    status: 'connecting',
    head: null,
    api: null,
    chainKey
  })

  useEffect(() => {
    let mounted = true
    let cleanup: (() => void) | undefined
    let initAttempt = 0
    const MAX_INIT_ATTEMPTS = 3

    async function init() {
      initAttempt++
      try {
        console.log(`🔄 Initializing connection to ${chainKey} (attempt ${initAttempt}/${MAX_INIT_ATTEMPTS})...`)
        setState(prev => ({ ...prev, status: 'connecting', error: undefined }))

        const { client, smoldot, chain } = await createSmoldotClient(chainKey)

        if (!mounted) {
          console.log(`⚠️ Component unmounted, cleaning up ${chainKey} connection`)
          if (smoldot) {
            smoldot.terminate()
          }
          return
        }

        // Enhanced stability check - wait for client to be truly ready
        if (client && client._request) {
          console.log(`🔍 Verifying ${chainKey} client stability...`)
          try {
            // Test the connection with a simple query
            await client._request('system_chain', [])
            console.log(`✓ ${chainKey} client verified and stable`)
          } catch (verifyError) {
            console.warn(`⚠️ Client verification failed for ${chainKey}:`, verifyError)
            // If verification fails, retry initialization
            if (initAttempt < MAX_INIT_ATTEMPTS && mounted) {
              console.log(`🔄 Retrying initialization for ${chainKey}...`)
              await new Promise(resolve => setTimeout(resolve, 2000))
              return init()
            }
          }
        }

        console.log(`✅ Successfully connected to ${chainKey}`)
        setState({
          status: 'ready',
          head: null,
          api: client,
          chainKey
        })

        cleanup = () => {
          console.log(`🧹 Cleaning up ${chainKey} connection`)
          if (smoldot) {
            smoldot.terminate()
          }
        }
      } catch (error) {
        if (!mounted) return

        const errorMessage = error instanceof Error ? error.message : 'Unknown error'
        console.error(`❌ Failed to connect to ${chainKey} (attempt ${initAttempt}):`, errorMessage)

        // Retry logic for initial connection failures
        if (initAttempt < MAX_INIT_ATTEMPTS && mounted) {
          console.log(`🔄 Retrying connection to ${chainKey} in 3 seconds...`)
          await new Promise(resolve => setTimeout(resolve, 3000))
          return init()
        }

        setState({
          status: 'error',
          head: null,
          api: null,
          error: errorMessage,
          chainKey
        })
      }
    }

    init()

    return () => {
      mounted = false
      cleanup?.()
    }
  }, [chainKey])

  return state
}