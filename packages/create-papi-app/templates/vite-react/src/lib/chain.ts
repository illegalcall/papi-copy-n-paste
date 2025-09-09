import { {{descriptorName}} } from "@polkadot-api/descriptors"
import { state } from "@react-rxjs/core"
import { createClient } from "polkadot-api"
import { withLogsRecorder } from "polkadot-api/logs-provider"
import { withPolkadotSdkCompat } from "polkadot-api/polkadot-sdk-compat"
import { getSmProvider } from "polkadot-api/sm-provider"
import { startFromWorker } from "polkadot-api/smoldot/from-worker"
import SmWorker from "polkadot-api/smoldot/worker?worker"
import { getWsProvider } from "polkadot-api/ws-provider/web"
import { map, take } from "rxjs"
import { supportedChains, shuffleArray, type SupportedChain } from "./chains"
{{#includeChopsticks}}import { withChopsticksEnhancer } from "./chopsticks"{{/includeChopsticks}}

// Environment configuration
const USE_CHOPSTICKS = import.meta.env.VITE_WITH_CHOPSTICKS
export const DEFAULT_CHAIN: SupportedChain = "{{chainName}}" as SupportedChain

// Initialize Smoldot worker for light client connections
export const smoldot = startFromWorker(new SmWorker(), {
  logCallback: (level, target, message) => {
    if (import.meta.env.DEV) {
      console.debug(`smoldot[${target}(${level})]`, message)
    }
  },
  forbidWs: true,
})

// Chain instances cache
const chainInstances = new Map<SupportedChain, Promise<any>>()

function createChainInstance(chainName: SupportedChain) {
  const config = supportedChains[chainName]
  return config.chainSpec().then(({ chainSpec }) =>
    smoldot.addChain({ chainSpec })
  )
}

function getChainInstance(chainName: SupportedChain) {
  if (!chainInstances.has(chainName)) {
    chainInstances.set(chainName, createChainInstance(chainName))
  }
  return chainInstances.get(chainName)!
}

// Provider selection logic
export const useLightClient =
  new URLSearchParams(location.search).get("smoldot") === "true"

// Simple provider creation with multiple endpoints
function createProvider(urls: string[]) {
  // Randomize endpoints for basic load balancing
  const shuffledUrls = shuffleArray(urls)
  const primaryUrl = shuffledUrls[0]
  
  if (import.meta.env.DEV) {
    console.log(`📡 Connecting to: ${primaryUrl}`)
  }
  
  return withPolkadotSdkCompat(getWsProvider(primaryUrl))
}

function getProvider(chainName: SupportedChain) {
  const config = supportedChains[chainName]
  
  {{#includeChopsticks}}
  // Use Chopsticks for local development
  if (USE_CHOPSTICKS) {
    return withChopsticksEnhancer(getWsProvider("ws://localhost:8132"))
  }
  {{/includeChopsticks}}

  // Use light client (Smoldot) if requested
  if (useLightClient) {
    return getSmProvider(getChainInstance(chainName))
  }

  // Default: WebSocket provider with multiple endpoints
  return createProvider(config.wsUrls)
}

// Create PAPI client for specific chain
export function createChainClient(chainName: SupportedChain = DEFAULT_CHAIN) {
  if (import.meta.env.DEV) {
    console.log(`🚀 Creating PAPI client for: ${chainName}`)
  }
  
  const provider = getProvider(chainName)
  const client = createClient(
    withLogsRecorder((...v) => {
      if (import.meta.env.DEV) console.debug(`${chainName}Chain`, ...v)
    }, provider)
  )
  
  // Get the typed API - in real apps, you'd import different descriptors per chain
  const typedApi = client.getTypedApi({{descriptorName}})
  
  // Expose to browser devtools in development for easy debugging
  if (import.meta.env.DEV && typeof window !== 'undefined') {
    ;(window as any).__PAPI_CLIENT__ = client
    ;(window as any).__PAPI_API__ = typedApi
    console.log('🔧 PAPI client exposed at window.__PAPI_CLIENT__ and window.__PAPI_API__')
  }
  
  return { client, typedApi }
}

// Default client (for backwards compatibility)
export const { client, typedApi } = createChainClient(DEFAULT_CHAIN)

// Simple connection state - true when we receive the first block
export const hasConnected$ = state(
  client.finalizedBlock$.pipe(
    map(() => true),
    take(1)
  ),
  false
)

// Current block information
export const currentBlock$ = state(client.finalizedBlock$, null)