import { createClient } from "polkadot-api"
import { getWsProvider } from "polkadot-api/ws-provider/node" 
import { withPolkadotSdkCompat } from "polkadot-api/polkadot-sdk-compat"
import { {{descriptorName}} } from "{{descriptorImport}}"

// Multiple RPC endpoints for reliability - PAPI will use the first one
const RPC_ENDPOINTS = {{wsUrls}}

// Simple utility to randomize endpoints for basic load balancing
function shuffleArray<T>(array: T[]): T[] {
  return array
    .map((v) => ({ v, p: Math.random() }))
    .sort((a, b) => a.p - b.p)
    .map(({ v }) => v)
}

// Create WebSocket provider with SDK compatibility layer
function createProvider() {
  const shuffledEndpoints = shuffleArray(RPC_ENDPOINTS)
  const primaryEndpoint = shuffledEndpoints[0]
  
  console.log("📡 Connecting to:", primaryEndpoint)
  
  // withPolkadotSdkCompat ensures compatibility with older Substrate versions
  return withPolkadotSdkCompat(getWsProvider(primaryEndpoint))
}

async function main() {
  console.log("🚀 Starting {{projectName}} - {{chainDisplayName}} PAPI Client")
  
  // Step 1: Create WebSocket provider
  const wsProvider = createProvider()
  
  // Step 2: Create PAPI client with the provider
  const client = createClient(wsProvider)
  
  // Step 3: Get typed API using generated descriptors
  // This gives you type-safe access to all chain operations
  const typedApi = client.getTypedApi({{descriptorName}})
  
  try {
    console.log("📡 Connecting to {{chainDisplayName}}...")
    
    // Example 1: Query chain constants (available immediately)
    const chainInfo = await typedApi.constants.System.Version()
    console.log("✅ Connected to chain:", chainInfo.spec_name)
    console.log("📦 Runtime version:", chainInfo.spec_version)
    
    // Example 2: Query chain storage (current state)
    const bestBlock = await typedApi.query.System.Number.getValue()
    console.log("🧱 Current block number:", bestBlock.toString())
    
    {{#includeExamples}}
    // Example 3: Query account information (demonstrates storage with parameters)
    const ALICE = "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY"
    const accountInfo = await typedApi.query.System.Account.getValue(ALICE)
    console.log("\n💰 Alice's account info:")
    console.log("- Free balance:", accountInfo.data.free.toString())
    console.log("- Nonce:", accountInfo.nonce.toString())
    {{/includeExamples}}
    
  } catch (error) {
    console.error("❌ Connection failed:", error instanceof Error ? error.message : error)
    console.log("💡 Try running with DEBUG=papi:* for detailed logs")
    process.exit(1)
  } finally {
    // Always clean up connections
    client.destroy()
    console.log("👋 Disconnected successfully")
    process.exit(0)
  }
}

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n👋 Shutting down gracefully...')
  process.exit(0)
})

main().catch(console.error)