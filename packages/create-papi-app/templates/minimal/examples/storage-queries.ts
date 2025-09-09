{{#includeExamples}}import { createClient } from "polkadot-api"
import { getWsProvider } from "polkadot-api/ws-provider/node"
import { {{descriptorName}} } from "{{descriptorImport}}"

// Example: Various storage queries
async function storageQueries() {
  console.log("📚 Running storage queries on {{chainDisplayName}}")
  
  const client = createClient(getWsProvider("{{wsUrl}}"))
  const api = client.getTypedApi({{descriptorName}})
  
  try {
    // 1. Chain constants (these don't change)
    console.log("\n🔧 Chain Constants:")
    const version = await api.constants.System.Version()
    console.log("- Chain name:", version.spec_name)
    console.log("- Runtime version:", version.spec_version)
    
    const blockWeights = await api.constants.System.BlockWeights()
    console.log("- Max block weight:", blockWeights.max_block.toString())
    
    // 2. Current chain state queries
    console.log("\n📊 Current State:")
    const blockNumber = await api.query.System.Number()
    console.log("- Block number:", blockNumber.toString())
    
    const timestamp = await api.query.Timestamp.Now()
    console.log("- Timestamp:", new Date(Number(timestamp)).toISOString())
    
    // 3. Account-specific queries
    console.log("\n👤 Account Queries:")
    const ALICE = "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY"
    
    const account = await api.query.System.Account(ALICE)
    console.log("- Alice's nonce:", account.nonce.toString())
    console.log("- Alice's free balance:", account.data.free.toString())
    
    // 4. Multiple entries query
    console.log("\n📋 Multiple Entries:")
    const accounts = await api.query.System.Account.getEntries()
    console.log(`- Total accounts: ${accounts.length}`)
    
    // Show first few accounts
    accounts.slice(0, 3).forEach(([key, value], index) => {
      console.log(`  ${index + 1}. Account ${key[0]} has balance: ${value.data.free.toString()}`)
    })
    
    // 5. Storage keys and metadata
    console.log("\n🔍 Storage Metadata:")
    const accountMeta = api.query.System.Account.meta
    console.log("- Storage key:", `${accountMeta.pallet}.${accountMeta.name}`)
    console.log("- Documentation:", accountMeta.docs.join(" "))
    
  } catch (error) {
    console.error("❌ Error in storage queries:", error)
  } finally {
    client.destroy()
  }
}

if (require.main === module) {
  storageQueries().catch(console.error)
}

export { storageQueries }{{/includeExamples}}