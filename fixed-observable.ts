import { createClient } from "polkadot-api"
import { hydration } from "@polkadot-api/descriptors"
import { getWsProvider } from "polkadot-api/ws-provider/web"
import { throttleTime, distinctUntilChanged, retry, takeUntil } from 'rxjs'
import { Subject } from 'rxjs'

async function queryBalancesTotalIssuanceFixed() {
  const wsProvider = getWsProvider("wss://hydration-rpc.n.dwellir.com")
  const client = createClient(wsProvider)
  const typedApi = client.getTypedApi(hydration)

  console.log('🔄 Setting up Balances.TotalIssuance observable...')

  try {
    // ✅ METHOD 1: Use the correct watchValue() syntax (no parameters needed)
    console.log('📊 Method 1: Direct watchValue()')

    const stopSignal = new Subject<void>()

    const subscription = typedApi.query.Balances.TotalIssuance.watchValue()
      .pipe(
        distinctUntilChanged(),
        throttleTime(1000),
        takeUntil(stopSignal),
        retry(3)
      )
      .subscribe({
        next: (value) => {
          console.log('✅ TotalIssuance (watchValue):', value.toString())
        },
        error: (error) => {
          console.error('❌ watchValue error:', error)
          // Try alternative method
          tryAlternativeMethod()
        },
        complete: () => {
          console.log('🔄 watchValue completed')
        }
      })

    // ✅ METHOD 2: Alternative using getValue() in a polling setup
    async function tryAlternativeMethod() {
      console.log('📊 Method 2: Polling with getValue()')

      let previousValue: string | null = null

      const pollInterval = setInterval(async () => {
        try {
          const currentValue = await typedApi.query.Balances.TotalIssuance.getValue()
          const valueStr = currentValue.toString()

          if (valueStr !== previousValue) {
            console.log('✅ TotalIssuance (polling):', valueStr)
            previousValue = valueStr
          }
        } catch (error) {
          console.error('❌ Polling error:', error)
        }
      }, 2000) // Poll every 2 seconds

      // Stop polling after 30 seconds
      setTimeout(() => {
        clearInterval(pollInterval)
        console.log('🛑 Polling stopped')
      }, 30000)
    }

    // Let it run for 15 seconds
    setTimeout(() => {
      console.log('🛑 Stopping watchValue...')
      stopSignal.next()
      stopSignal.complete()
      subscription.unsubscribe()
      client.destroy()
    }, 15000)

  } catch (error) {
    console.error('❌ Setup error:', error)
    client.destroy()
  }
}

// ✅ METHOD 3: Simple one-time query (to verify the storage works)
async function simpleQuery() {
  const wsProvider = getWsProvider("wss://hydration-rpc.n.dwellir.com")
  const client = createClient(wsProvider)
  const typedApi = client.getTypedApi(hydration)

  try {
    console.log('📊 Simple one-time query...')
    const value = await typedApi.query.Balances.TotalIssuance.getValue()
    console.log('✅ TotalIssuance (one-time):', value.toString())
  } catch (error) {
    console.error('❌ Simple query error:', error)
  } finally {
    client.destroy()
  }
}

// ✅ METHOD 4: Check if the storage entry exists and is correctly typed
async function debugStorageEntry() {
  const wsProvider = getWsProvider("wss://hydration-rpc.n.dwellir.com")
  const client = createClient(wsProvider)
  const typedApi = client.getTypedApi(hydration)

  try {
    console.log('🔍 Debugging storage entry...')

    // Check if the storage entry exists
    console.log('Storage entry type:', typeof typedApi.query.Balances.TotalIssuance)
    console.log('Has watchValue?', typeof typedApi.query.Balances.TotalIssuance.watchValue)
    console.log('Has getValue?', typeof typedApi.query.Balances.TotalIssuance.getValue)

    // Try to get metadata about the storage
    const palletInfo = typedApi.query.Balances
    console.log('Balances pallet methods:', Object.keys(palletInfo))

  } catch (error) {
    console.error('❌ Debug error:', error)
  } finally {
    client.destroy()
  }
}

// Run all methods
async function runAllTests() {
  console.log('🚀 Testing all methods...\n')

  console.log('=== DEBUG STORAGE ENTRY ===')
  await debugStorageEntry()

  console.log('\n=== SIMPLE QUERY TEST ===')
  await simpleQuery()

  console.log('\n=== OBSERVABLE TEST ===')
  await queryBalancesTotalIssuanceFixed()
}

runAllTests().catch(console.error)