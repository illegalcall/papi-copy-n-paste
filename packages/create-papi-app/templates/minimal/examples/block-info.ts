{{#includeExamples}}import { createClient } from "polkadot-api"
import { getWsProvider } from "polkadot-api/ws-provider/node"
import { {{descriptorName}} } from "{{descriptorImport}}"

// Example: Get block information and listen to new blocks
async function getBlockInfo() {
  console.log("🧱 Getting block information from {{chainDisplayName}}")
  
  const client = createClient(getWsProvider("{{wsUrl}}"))
  const api = client.getTypedApi({{descriptorName}})
  
  try {
    // Get current block number
    const blockNumber = await api.query.System.Number()
    console.log("📊 Current block number:", blockNumber.toString())
    
    // Get block hash for current block
    const blockHash = await api.query.System.BlockHash(blockNumber)
    console.log("🔗 Current block hash:", blockHash)
    
    // Listen to new blocks (run for 30 seconds)
    console.log("\n🔴 Listening to new blocks for 30 seconds...")
    let blockCount = 0
    
    const subscription = client.finalizedBlock$.subscribe((block) => {
      blockCount++
      console.log(`🆕 New block #${block.number}: ${block.hash}`)
      
      // Show block details
      console.log(`   ⏱️  Timestamp: ${new Date().toLocaleTimeString()}`)
      console.log(`   📦 Extrinsics: ${block.extrinsics?.length || 'N/A'}`)
    })
    
    // Stop after 30 seconds
    setTimeout(() => {
      subscription.unsubscribe()
      console.log(`\n✅ Received ${blockCount} blocks`)
      client.destroy()
    }, 30000)
    
  } catch (error) {
    console.error("❌ Error getting block info:", error)
    client.destroy()
  }
}

if (require.main === module) {
  getBlockInfo().catch(console.error)
}

export { getBlockInfo }{{/includeExamples}}