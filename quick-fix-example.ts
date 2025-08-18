import { createClient } from "polkadot-api"
import { hydration } from "@polkadot-api/descriptors"
import { getWsProvider } from "polkadot-api/ws-provider/web"

// 🚀 QUICK FIX: Just add proper timing
async function queryBalancesTotalIssuanceQuickFix() {
  const wsProvider = getWsProvider("wss://hydration-rpc.n.dwellir.com")
  const client = createClient(wsProvider)
  const typedApi = client.getTypedApi(hydration)

  console.log('🔄 Starting watchValue...')

  const subscription = typedApi.query.Balances.TotalIssuance.watchValue().subscribe({
    next: (value) => {
      console.log('✅ Value changed:', value.toString())
    },
    error: (error) => {
      console.error('❌ Watch error:', error)
    }
  })

  // ✅ WAIT INSTEAD OF IMMEDIATE DESTROY
  console.log('⏳ Watching for 15 seconds...')

  // Let it run for 15 seconds
  await new Promise(resolve => setTimeout(resolve, 15000))

  // Now cleanup
  console.log('🛑 Stopping...')
  subscription.unsubscribe()
  client.destroy()

  console.log('✅ Complete')
}

// Run it
queryBalancesTotalIssuanceQuickFix().catch(console.error)