{{#includeExamples}}import { createClient } from "polkadot-api"
import { getWsProvider } from "polkadot-api/ws-provider/node"
import { {{descriptorName}} } from "{{descriptorImport}}"

// Example: Query account balance
async function queryBalance() {
  console.log("💰 Querying account balance on {{chainDisplayName}}")
  
  const client = createClient(getWsProvider("{{wsUrl}}"))
  const api = client.getTypedApi({{descriptorName}})
  
  try {
    // Alice's account (well-known test account)
    const ALICE = "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY"
    
    // Query account information
    const accountInfo = await api.query.System.Account(ALICE)
    
    console.log("👤 Account:", ALICE)
    console.log("💎 Free balance:", accountInfo.data.free.toString())
    console.log("🔒 Reserved balance:", accountInfo.data.reserved.toString())
    console.log("📊 Nonce:", accountInfo.nonce.toString())
    
    // You can also query multiple accounts at once
    const BOB = "5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty"
    const multiQuery = await api.query.System.Account.getEntries()
    
    console.log(`\n📋 Total accounts with balance: ${multiQuery.length}`)
    
  } catch (error) {
    console.error("❌ Error querying balance:", error)
  } finally {
    client.destroy()
  }
}

if (require.main === module) {
  queryBalance().catch(console.error)
}

export { queryBalance }{{/includeExamples}}