import { createClient } from 'polkadot-api'
import { start } from "polkadot-api/smoldot"
import { getSmProvider } from "polkadot-api/sm-provider"
import { getWsProvider } from "polkadot-api/ws-provider/web"
import { withPolkadotSdkCompat } from "polkadot-api/polkadot-sdk-compat"
import { withLogsRecorder } from "polkadot-api/logs-provider"
import { chainSpec as polkadotChainSpec } from "polkadot-api/chains/polkadot"
import { chainSpec as kusamaChainSpec } from "polkadot-api/chains/ksmcc3"
import { useEffect, useState } from 'react'
import { withChopsticksEnhancer } from './chopsticks-enhancer'
import { NetworkProvider, NetworkProviderType, getNetworkConfig, getProvider } from './network-providers'

export interface ConnectionState {
  status: 'connecting' | 'connected' | 'error' | 'disconnected'
  client: any | null
  provider: NetworkProvider | null
  chainKey: string
  error?: string
  connectionTime?: number
}

// Smoldot instance management
let smoldotInstance: any = null

function getSmoldotInstance() {
  if (!smoldotInstance) {
    smoldotInstance = start({
      logCallback: (level, target, message) => {
        console.debug("smoldot[%s(%s)] %s", target, level, message);
      },
      forbidWs: false,
    });
  }
  return smoldotInstance
}

// Chain spec mapping for static imports
const chainSpecMap: Record<string, any> = {
  'polkadot-api/chains/polkadot': polkadotChainSpec,
  'polkadot-api/chains/ksmcc3': kusamaChainSpec,
}

function getChainSpec(chainSpecPath: string) {
  const chainSpec = chainSpecMap[chainSpecPath]
  if (!chainSpec) {
    console.warn(`Chain spec not found for ${chainSpecPath}, using Polkadot as fallback`)
    return polkadotChainSpec
  }
  return chainSpec
}

// Provider factory functions
async function createSmoldotProvider(networkConfig: any, provider: NetworkProvider) {
  console.log(`🌟 Creating Smoldot provider for ${networkConfig.chainName}`)
  
  const smoldot = getSmoldotInstance()
  
  if (!networkConfig.chainSpecPath) {
    throw new Error(`Chain spec path not configured for ${networkConfig.chainName}`)
  }
  
  const chainSpec = getChainSpec(networkConfig.chainSpecPath)
  const chain = await smoldot.addChain({ chainSpec })
  
  return getSmProvider(chain)
}

function createRpcProvider(networkConfig: any, provider: NetworkProvider) {
  console.log(`🔗 Creating RPC provider for ${networkConfig.chainName}: ${provider.url}`)
  
  if (!provider.url) {
    throw new Error(`RPC URL not configured for provider ${provider.name}`)
  }
  
  return withPolkadotSdkCompat(getWsProvider(provider.url))
}

function createChopsticksProvider(networkConfig: any, provider: NetworkProvider) {
  console.log(`🥢 Creating Chopsticks provider for ${networkConfig.chainName}: ${provider.url}`)
  
  if (!provider.url) {
    throw new Error(`Chopsticks URL not configured for provider ${provider.name}`)
  }
  
  return withChopsticksEnhancer(getWsProvider(provider.url))
}

function createCustomProvider(networkConfig: any, provider: NetworkProvider) {
  console.log(`⚙️ Creating custom provider for ${networkConfig.chainName}: ${provider.url}`)
  
  if (!provider.url) {
    throw new Error(`Custom URL not configured for provider ${provider.name}`)
  }
  
  return withPolkadotSdkCompat(getWsProvider(provider.url))
}

// Connection cache
const connectionCache = new Map<string, { client: any; provider: NetworkProvider; timestamp: number }>()
const CONNECTION_CACHE_TTL = 5 * 60 * 1000 // 5 minutes

function getCacheKey(chainKey: string, providerId: string): string {
  return `${chainKey}:${providerId}`
}

function getCachedConnection(chainKey: string, providerId: string) {
  const cacheKey = getCacheKey(chainKey, providerId)
  const cached = connectionCache.get(cacheKey)
  
  if (!cached) return null
  
  // Check if cache is still valid
  if (Date.now() - cached.timestamp > CONNECTION_CACHE_TTL) {
    connectionCache.delete(cacheKey)
    return null
  }
  
  return cached
}

function setCachedConnection(chainKey: string, providerId: string, client: any, provider: NetworkProvider) {
  const cacheKey = getCacheKey(chainKey, providerId)
  connectionCache.set(cacheKey, {
    client,
    provider,
    timestamp: Date.now()
  })
}

export async function createEnhancedClient(chainKey: string, providerId: string) {
  const startTime = Date.now()
  
  // Check cache first
  const cached = getCachedConnection(chainKey, providerId)
  if (cached) {
    console.log(`⚡ Using cached connection for ${chainKey}:${providerId}`)
    return { client: cached.client, provider: cached.provider, connectionTime: 0 }
  }
  
  const networkConfig = getNetworkConfig(chainKey)
  if (!networkConfig) {
    throw new Error(`Network configuration not found for chain: ${chainKey}`)
  }
  
  const provider = getProvider(chainKey, providerId)
  if (!provider) {
    throw new Error(`Provider not found: ${providerId} for chain: ${chainKey}`)
  }
  
  console.log(`🔄 Creating client for ${networkConfig.chainName} using ${provider.name} (${provider.type})`)
  
  let rawProvider: any
  
  try {
    switch (provider.type) {
      case 'smoldot':
        rawProvider = await createSmoldotProvider(networkConfig, provider)
        break
        
      case 'rpc':
        rawProvider = createRpcProvider(networkConfig, provider)
        break
        
      case 'chopsticks':
        rawProvider = createChopsticksProvider(networkConfig, provider)
        break
        
      case 'custom':
        rawProvider = createCustomProvider(networkConfig, provider)
        break
        
      default:
        throw new Error(`Unsupported provider type: ${provider.type}`)
    }
    
    const client = createClient(
      withLogsRecorder(
        (...args) => console.debug(`[${networkConfig.chainName}:${provider.name}]`, ...args),
        rawProvider
      )
    )
    
    // Test connection with timeout
    await Promise.race([
      client._request('system_chain', []),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Connection test timeout after 10s')), 10000)
      )
    ])
    
    const connectionTime = Date.now() - startTime
    console.log(`✅ Successfully connected to ${networkConfig.chainName} via ${provider.name} (${connectionTime}ms)`)
    
    // Cache the connection
    setCachedConnection(chainKey, providerId, client, provider)
    
    return { client, provider, connectionTime }
    
  } catch (error) {
    const connectionTime = Date.now() - startTime
    console.error(`❌ Failed to connect to ${networkConfig.chainName} via ${provider.name} (${connectionTime}ms):`, error)
    throw error
  }
}

export function useEnhancedClient(chainKey: string, providerId: string): ConnectionState {
  const [state, setState] = useState<ConnectionState>({
    status: 'connecting',
    client: null,
    provider: null,
    chainKey
  })
  
  useEffect(() => {
    let mounted = true
    let cleanup: (() => void) | undefined
    
    async function connect() {
      try {
        setState(prev => ({ 
          ...prev, 
          status: 'connecting', 
          error: undefined,
          chainKey
        }))
        
        const { client, provider, connectionTime } = await createEnhancedClient(chainKey, providerId)
        
        if (!mounted) {
          console.log(`⚠️ Component unmounted, cleaning up ${chainKey}:${providerId}`)
          client?.destroy?.()
          return
        }
        
        setState({
          status: 'connected',
          client,
          provider,
          chainKey,
          connectionTime
        })
        
        cleanup = () => {
          console.log(`🧹 Cleaning up connection ${chainKey}:${providerId}`)
          client?.destroy?.()
        }
        
      } catch (error) {
        if (!mounted) return
        
        const errorMessage = error instanceof Error ? error.message : 'Unknown connection error'
        console.error(`❌ Connection failed for ${chainKey}:${providerId}:`, errorMessage)
        
        setState(prev => ({
          ...prev,
          status: 'error',
          error: errorMessage
        }))
      }
    }
    
    connect()
    
    return () => {
      mounted = false
      cleanup?.()
    }
  }, [chainKey, providerId])
  
  return state
}

// Utility functions for code generation
export function getSetupCommandsForProvider(chainKey: string, providerId: string): string {
  const networkConfig = getNetworkConfig(chainKey)
  const provider = getProvider(chainKey, providerId)
  
  if (!networkConfig || !provider) {
    return `// Error: Configuration not found for ${chainKey}:${providerId}`
  }
  
  const chainDisplayName = networkConfig.chainName || chainKey
  
  switch (provider.type) {
    case 'smoldot':
      return `// SETUP REQUIRED: Light client setup
// Option 1 - Quick start with create-papi-app:
// npx create-papi-app my-app --template vite-react
// cd my-app && npm run dev
//
// Option 2 - Manual setup:
// npm install -g polkadot-api
// papi add ${chainKey} --wsUrl ${provider.url || 'wss://default-rpc-url.com'}
// papi generate
// npm install polkadot-api
//
// 📚 Docs: https://papi.how/docs/`
      
    case 'rpc':
      return `// SETUP REQUIRED: RPC connection setup for ${chainDisplayName}
// Option 1 - Quick start with create-papi-app:
// npx create-papi-app my-app --template vite-react
// cd my-app && npm run dev
//
// Option 2 - Manual setup in existing project:
// npm install -g polkadot-api
// papi add ${chainKey} --wsUrl ${provider.url}
// papi generate
// npm install polkadot-api
//
// 📚 Docs: https://papi.how/docs/
// 🌐 Provider: ${provider.name || 'Custom RPC'}`
      
    case 'chopsticks':
      return `// SETUP REQUIRED: Chopsticks development setup for ${chainDisplayName}
// Step 1 - Start chopsticks dev environment:
// npm install -g @acala-network/chopsticks
// npx @acala-network/chopsticks --endpoint=${provider.url?.replace('ws://', 'wss://').replace('localhost:8000', 'rpc.polkadot.io')} --port=${provider.url?.split(':')[2] || '8000'}
//
// Step 2 - Setup PAPI:
// npm install -g polkadot-api
// papi add ${chainKey} --wsUrl ${provider.url}
// papi generate
// npm install polkadot-api
//
// 📚 Docs: https://papi.how/docs/
// 🧪 Dev: https://github.com/AcalaNetwork/chopsticks`
      
    case 'custom':
      return `// SETUP REQUIRED: Custom RPC setup for ${chainDisplayName}
// Option 1 - Quick start with create-papi-app:
// npx create-papi-app my-app --template minimal
// cd my-app && npm run start
//
// Option 2 - Manual setup in existing project:
// npm install -g polkadot-api
// papi add ${chainKey} --wsUrl ${provider.url}
// papi generate
// npm install polkadot-api
//
// 📚 Docs: https://papi.how/docs/
// 🌐 Provider: ${provider.name || 'Custom RPC'}`
      
    default:
      return `// SETUP REQUIRED: PAPI setup
// Option 1 - Quick start with create-papi-app:
// npx create-papi-app my-app --template vite-react
// cd my-app && npm run dev
//
// Option 2 - Manual setup:
// npm install -g polkadot-api
// papi generate
// npm install polkadot-api
//
// 📚 Docs: https://papi.how/docs/`
  }
}

export function getProviderImportCode(chainKey: string, providerId: string): string {
  const networkConfig = getNetworkConfig(chainKey)
  const provider = getProvider(chainKey, providerId)
  
  if (!networkConfig || !provider) {
    return `// Error: Configuration not found`
  }
  
  const descriptorName = chainKey === 'kusama' ? 'kusama' : chainKey
  
  switch (provider.type) {
    case 'smoldot':
      return `import { start } from "polkadot-api/smoldot"
import { getSmProvider } from "polkadot-api/sm-provider"
import { chainSpec } from "${networkConfig.chainSpecPath}"
import { ${descriptorName} } from "../.papi/descriptors/dist"

const smoldot = start()
const chain = await smoldot.addChain({ chainSpec })
const client = createClient(getSmProvider(chain))`
      
    case 'rpc':
      return `import { getWsProvider } from "polkadot-api/ws-provider/web"
import { withPolkadotSdkCompat } from "polkadot-api/polkadot-sdk-compat"
import { ${descriptorName} } from "../.papi/descriptors/dist"

const client = createClient(
  withPolkadotSdkCompat(getWsProvider("${provider.url}"))
)`
      
    case 'chopsticks':
      return `import { getWsProvider } from "polkadot-api/ws-provider/web"
import { withChopsticksEnhancer } from "./chopsticks-enhancer" // Copy from PAPI repo
import { ${descriptorName} } from "../.papi/descriptors/dist"

const client = createClient(
  withChopsticksEnhancer(getWsProvider("${provider.url}"))
)`
      
    case 'custom':
      return `import { getWsProvider } from "polkadot-api/ws-provider/web"
import { withPolkadotSdkCompat } from "polkadot-api/polkadot-sdk-compat"
import { ${descriptorName} } from "../.papi/descriptors/dist"

const client = createClient(
  withPolkadotSdkCompat(getWsProvider("${provider.url}"))
)`
      
    default:
      return `// Error: Unknown provider type`
  }
}