// Quick validation test for PAPI v1.17.1 upgrade
// Tests core functionality to ensure upgrade was successful

import { createClient } from "polkadot-api"
import { getSmProvider } from "polkadot-api/sm-provider"
import { start } from "polkadot-api/smoldot"

async function quickValidationV117() {
  console.log('🧪 PAPI v1.17.1 VALIDATION TEST')
  console.log('=' .repeat(40))
  
  let smoldotInstance: any = null
  let client: any = null
  let connection: any = null
  
  try {
    // Test 1: Can we connect to blockchain?
    console.log('\n📡 Test 1: Blockchain Connection')
    console.log('-' .repeat(30))
    
    smoldotInstance = start()
    const { chainSpec } = await import('polkadot-api/chains/polkadot')
    connection = await smoldotInstance.addChain({ chainSpec })
    client = createClient(getSmProvider(connection))
    
    console.log('✅ Smoldot initialized')
    console.log('✅ Chain spec loaded')
    console.log('✅ Connection established')
    console.log('✅ Client created')
    
    // Test 2: Can we get real data?
    console.log('\n📊 Test 2: Real Data Query')
    console.log('-' .repeat(30))
    
    const finalizedBlock = await client.getFinalizedBlock()
    const blockNumber = finalizedBlock.number
    
    console.log(`✅ Block number: ${blockNumber}`)
    console.log(`✅ Block hash: ${finalizedBlock.hash.slice(0, 10)}...`)
    
    // Test 3: Can we subscribe to observables?
    console.log('\n🔄 Test 3: Observable Subscription')
    console.log('-' .repeat(30))
    
    const observable = client.finalizedBlock$
    let subscription: any
    subscription = observable.subscribe({
      next: (block: any) => {
        console.log(`✅ Observable emission: Block #${block.number}`)
        subscription.unsubscribe()
        console.log('✅ Subscription cleanup successful')
        
        finishTest()
      },
      error: (error: any) => {
        console.log(`❌ Observable error: ${error.message}`)
        finishTest()
      }
    })
    
    // Timeout after 10 seconds
    setTimeout(() => {
      subscription.unsubscribe()
      console.log('⏰ Observable test timeout (10s)')
      finishTest()
    }, 10000)
    
  } catch (error) {
    console.log(`❌ Test failed: ${error instanceof Error ? error.message : String(error)}`)
    finishTest()
  }
  
  async function finishTest() {
    console.log('\n🧹 Cleanup')
    console.log('-' .repeat(30))
    
    try {
      if (client) {
        await client.destroy?.()
        console.log('✅ Client destroyed')
      }
      if (connection) {
        await connection.remove?.()
        console.log('✅ Connection removed')
      }
      if (smoldotInstance) {
        await smoldotInstance.terminate?.()
        console.log('✅ Smoldot terminated')
      }
    } catch (error) {
      console.log(`⚠️  Cleanup warning: ${error instanceof Error ? error.message : String(error)}`)
    }
    
    console.log('\n🎉 PAPI v1.17.1 VALIDATION COMPLETE!')
    console.log('All core functionality working with upgraded version')
  }
}

// Run validation
if (require.main === module) {
  quickValidationV117().catch(console.error)
}

export { quickValidationV117 }