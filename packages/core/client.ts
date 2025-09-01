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
  connectionType?: 'smoldot' | 'websocket' | 'public-rpc'
}

export const chains: ChainConfig[] = chainsData

// Enhanced client cache with performance optimizations
const clientCache = new Map<string, any>()
const connectionPromises = new Map<string, Promise<any>>()
const connectionHealth = new Map<string, { lastCheck: number; isHealthy: boolean; failureCount: number }>()
const CONNECTION_HEALTH_TTL = 30000 // 30 seconds
const MAX_FAILURE_COUNT = 5 // Maximum consecutive failures before marking as unhealthy

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

// Public RPC endpoints for fallback when light client fails
const PUBLIC_RPC_ENDPOINTS = {
  polkadot: [
    'wss://rpc.polkadot.io',
    'wss://polkadot.api.onfinality.io/public-ws',
    'wss://polkadot-rpc.dwellir.com'
  ],
  kusama: [
    'wss://kusama-rpc.dwellir.com',
    'wss://kusama.api.onfinality.io/public-ws',
    'wss://kusama-rpc.polkadot.io'
  ],
  acala: [
    'wss://acala-rpc.dwellir.com',
    'wss://acala-rpc-0.aca-api.network',
    'wss://acala.api.onfinality.io/public-ws',
    'wss://acala-rpc.polkadot.io'
  ],
  moonbeam: [
    'wss://wss.api.moonbeam.network',
    'wss://moonbeam.api.onfinality.io/public-ws',
    'wss://moonbeam-rpc.dwellir.com'
  ],
  astar: [
    'wss://rpc.astar.network',
    'wss://astar.api.onfinality.io/public-ws',
    'wss://astar-rpc.dwellir.com'
  ],
  bifrost: [
    'wss://hk.p.bifrost-rpc.liebi.com/ws',
    'wss://bifrost.api.onfinality.io/public-ws',
    'wss://bifrost-rpc.dwellir.com'
  ]
}

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
  const currentHealth = connectionHealth.get(chainKey) || { 
    lastCheck: 0, 
    isHealthy: false, 
    failureCount: 0 
  }
  
  if (isHealthy) {
    connectionHealth.set(chainKey, {
      lastCheck: Date.now(),
      isHealthy: true,
      failureCount: 0
    })
  } else {
    const newFailureCount = currentHealth.failureCount + 1
    const isHealthyAfterFailure = newFailureCount < MAX_FAILURE_COUNT
    
    connectionHealth.set(chainKey, {
      lastCheck: Date.now(),
      isHealthy: isHealthyAfterFailure,
      failureCount: newFailureCount
    })
    
    if (!isHealthyAfterFailure) {
      console.warn(`⚠️ Chain ${chainKey} marked as unhealthy after ${newFailureCount} consecutive failures`)
    }
  }
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

// Check if blockchain data is current (within last 100 blocks)
async function isDataCurrent(client: any, chainKey: string): Promise<boolean> {
  try {
    const finalizedBlock = await client.getFinalizedBlock()
    const currentTime = Date.now()
    
    // If we can't get timestamp, assume data is current if block number is reasonable
    if (!finalizedBlock.timestamp) {
      return true
    }
    
    // Check if block timestamp is recent (within last hour)
    const blockTime = new Date(finalizedBlock.timestamp).getTime()
    const timeDiff = currentTime - blockTime
    const oneHour = 60 * 60 * 1000
    
    return timeDiff < oneHour
  } catch (error) {
    console.warn(`Could not verify data freshness for ${chainKey}:`, error)
    return false
  }
}

// Create WebSocket client with fallback endpoints and timeout
async function createWebSocketClient(chainKey: string, endpoints: string[]): Promise<any> {
  const CONNECTION_TIMEOUT = 8000 // 8 seconds timeout
  const MAX_RETRIES = 3
  
  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    for (const endpoint of endpoints) {
      try {
        console.log(`🔌 Trying WebSocket endpoint: ${endpoint} (attempt ${attempt + 1}/${MAX_RETRIES})`)
        const client = createClient(
          withPolkadotSdkCompat(getWsProvider(endpoint))
        )
        
        // Test the connection with timeout
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Connection timeout')), CONNECTION_TIMEOUT)
        )
        
        const connectionPromise = client._request('system_chain', [])
        await Promise.race([connectionPromise, timeoutPromise])
        
        console.log(`✅ WebSocket connection successful: ${endpoint}`)
        return client
      } catch (error) {
        console.warn(`⚠️ WebSocket endpoint failed: ${endpoint}`, error)
        continue
      }
    }
    
    // If all endpoints failed, wait before retrying
    if (attempt < MAX_RETRIES - 1) {
      const retryDelay = Math.min(1000 * Math.pow(2, attempt), 5000) // Exponential backoff, max 5s
      console.log(`⏳ All endpoints failed, retrying in ${retryDelay}ms...`)
      await new Promise(resolve => setTimeout(resolve, retryDelay))
    }
  }
  
  throw new Error(`All WebSocket endpoints failed for ${chainKey} after ${MAX_RETRIES} attempts`)
}

// Removed preloading to avoid connection issues

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

  console.log(`🔄 Creating client for ${chainKey}`)

  // Create connection promise to avoid duplicates
  const connectionPromise = (async () => {
    try {
      // Add to active connections
      activeConnections.add(chainKey)

      let result: any
      let connectionType: 'smoldot' | 'websocket' | 'public-rpc' = 'websocket'

      // Use WebSocket connection for better reliability and speed
      try {
        if (PUBLIC_RPC_ENDPOINTS[chainKey as keyof typeof PUBLIC_RPC_ENDPOINTS]) {
          const endpoints = PUBLIC_RPC_ENDPOINTS[chainKey as keyof typeof PUBLIC_RPC_ENDPOINTS]
          console.log(`🔄 Connecting to ${chainKey} via public RPC endpoints:`, endpoints)
          const client = await createWebSocketClient(chainKey, endpoints)
          connectionType = 'public-rpc'
          result = { client, smoldot: null, chain: null, connectionType }
          console.log(`✅ Connected to ${chainKey} via public RPC endpoint`)
        } else {
          // Use configured WebSocket endpoint
          console.log(`Connecting to ${chainConfig.name} via WebSocket: ${chainConfig.ws}`)
          const client = createClient(
            withPolkadotSdkCompat(getWsProvider(chainConfig.ws))
          )
          connectionType = 'websocket'
          result = { client, smoldot: null, chain: null, connectionType }
          console.log(`✅ Connected to ${chainKey} via WebSocket`)
        }
      } catch (wsError) {
        console.error(`❌ WebSocket connection failed for ${chainKey}:`, wsError)
        throw wsError
      }

      // Cache the successful connection
      clientCache.set(chainKey, result)
      updateConnectionHealth(chainKey, true)
      updateMetrics(chainKey, true, Date.now() - startTime)

      console.log(`🎯 Cached connection for ${chainKey} via ${connectionType} (${Date.now() - startTime}ms)`)
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

        const { client, smoldot, chain, connectionType } = await createSmoldotClient(chainKey)

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

        console.log(`✅ Successfully connected to ${chainKey} via ${connectionType}`)
        setState({
          status: 'ready',
          head: null,
          api: client,
          chainKey,
          connectionType
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