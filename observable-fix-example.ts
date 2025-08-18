import { createClient } from "polkadot-api"
import { hydration } from "@polkadot-api/descriptors"
import { getWsProvider } from "polkadot-api/ws-provider/web"
import { throttleTime, takeUntil, distinctUntilChanged, retry, startWith } from 'rxjs'
import { Subject } from 'rxjs'

// ✅ CORRECTED VERSION 1: Proper Async/Await with Observable
async function queryBalancesTotalIssuanceCorrect() {
  const wsProvider = getWsProvider("wss://hydration-rpc.n.dwellir.com")
  const client = createClient(wsProvider)
  const typedApi = client.getTypedApi(hydration)

  try {
    // Create a stop signal for cleanup
    const stopSignal = new Subject<void>()

    console.log('Starting observable subscription...')

    // Set up the observable with proper operators
    const subscription = typedApi.query.Balances.TotalIssuance.watchValue()
      .pipe(
        distinctUntilChanged(), // Only emit when value actually changes
        throttleTime(1000),     // Throttle to max 1 emission per second
        retry(3),               // Retry up to 3 times on error
        takeUntil(stopSignal)   // Stop when signal is emitted
      )
      .subscribe({
        next: (value) => {
          console.log('✅ TotalIssuance changed:', value.toString())
        },
        error: (error) => {
          console.error('❌ Watch error:', error)
        },
        complete: () => {
          console.log('🔄 Observable completed')
        }
      })

    // ✅ KEEP ALIVE: Return cleanup function instead of destroying immediately
    return {
      subscription,
      client,
      stop: () => {
        console.log('🛑 Stopping observable...')
        stopSignal.next()
        stopSignal.complete()
        subscription.unsubscribe()
        client.destroy()
      }
    }

  } catch (error) {
    console.error('❌ Setup error:', error)
    client.destroy()
    throw error
  }
}

// ✅ CORRECTED VERSION 2: Promise-based with timeout
async function queryWithTimeout() {
  const wsProvider = getWsProvider("wss://hydration-rpc.n.dwellir.com")
  const client = createClient(wsProvider)
  const typedApi = client.getTypedApi(hydration)

  try {
    console.log('⏳ Watching for 30 seconds...')

    return new Promise<void>((resolve, reject) => {
      let valueCount = 0

      const subscription = typedApi.query.Balances.TotalIssuance.watchValue()
        .pipe(
          distinctUntilChanged(),
          throttleTime(500)
        )
        .subscribe({
          next: (value) => {
            valueCount++
            console.log(`📊 Value #${valueCount}:`, value.toString())
          },
          error: reject
        })

      // Auto-cleanup after 30 seconds
      setTimeout(() => {
        console.log(`✅ Completed after receiving ${valueCount} values`)
        subscription.unsubscribe()
        client.destroy()
        resolve()
      }, 30000)
    })

  } catch (error) {
    client.destroy()
    throw error
  }
}

// ✅ USAGE EXAMPLES:

// Example 1: Manual control
async function example1() {
  const observable = await queryBalancesTotalIssuanceCorrect()

  // Let it run for 10 seconds, then stop
  setTimeout(() => {
    observable.stop()
  }, 10000)
}

// Example 2: Auto-timeout
async function example2() {
  await queryWithTimeout()
  console.log('✅ Finished watching')
}

// Example 3: React/Component usage
export function useBalanceWatcher() {
  const [totalIssuance, setTotalIssuance] = useState<string>('')
  const [isWatching, setIsWatching] = useState(false)

  useEffect(() => {
    let cleanup: (() => void) | null = null

    async function startWatching() {
      try {
        setIsWatching(true)
        const observable = await queryBalancesTotalIssuanceCorrect()
        cleanup = observable.stop

        // Update state with new values
        const subscription = observable.subscription
        subscription.add(() => {
          setIsWatching(false)
        })

      } catch (error) {
        console.error('Failed to start watching:', error)
        setIsWatching(false)
      }
    }

    startWatching()

    // Cleanup on unmount
    return () => {
      cleanup?.()
    }
  }, [])

  return { totalIssuance, isWatching }
}

export { queryBalancesTotalIssuanceCorrect, queryWithTimeout }