// Real Descriptor-Based Testing - Tests complete PAPI workflow with real descriptors
// NO MOCKS - Real chainSpec → descriptor → typedApi → query workflow

import { createClient } from "polkadot-api"
import { getSmProvider } from "polkadot-api/sm-provider"
import { start } from "polkadot-api/smoldot"
import { ValidationResult, TestCase } from './types'

export interface RealDescriptorValidationResult extends ValidationResult {
  descriptorInfo?: {
    chainName: string
    descriptorLoaded: boolean
    typedApiCreated: boolean
    palletFound: boolean
    storageFound: boolean
  }
  realQuery?: {
    queryType: string
    pallet: string
    storage: string
    result: any
    executionTime: number
  }
  blockchainData?: any
}

export class RealDescriptorValidator {
  
  /**
   * Test complete PAPI workflow: chainSpec → descriptor → typedApi → query
   */
  async validateDescriptorWorkflow(
    testCase: TestCase
  ): Promise<RealDescriptorValidationResult> {
    console.log(`🔧 REAL DESCRIPTOR TESTING: ${testCase.id}`)
    const startTime = Date.now()
    
    let smoldotInstance: any = null
    let client: any = null
    let connection: any = null
    
    try {
      // Step 1: Real blockchain connection
      console.log('  🔗 Connecting to real blockchain...')
      smoldotInstance = start()
      const { chainSpec } = await import('polkadot-api/chains/polkadot')
      connection = await smoldotInstance.addChain({ chainSpec })
      client = createClient(getSmProvider(connection))
      
      // Step 2: Load real descriptor
      console.log('  📦 Loading real descriptor...')
      const { polkadot } = await import('@polkadot-api/descriptors')
      
      // Step 3: Create real typed API
      console.log('  🔧 Creating real typed API...')
      const typedApi = client.getTypedApi(polkadot)
      
      // Step 4: Validate descriptor structure
      const descriptorInfo = this.validateDescriptorStructure(typedApi, testCase)
      
      // Step 5: Execute real query if structure is valid
      let realQuery: any = null
      let blockchainData: any = null
      
      if (descriptorInfo.palletFound && descriptorInfo.storageFound) {
        console.log(`  📊 Executing real query: ${testCase.pallet}.${testCase.storage}.${testCase.queryType}...`)
        const queryResult = await this.executeRealDescriptorQuery(typedApi, testCase)
        realQuery = queryResult.queryData
        blockchainData = queryResult.blockchainData
      }
      
      return {
        passed: descriptorInfo.palletFound && descriptorInfo.storageFound && realQuery !== null,
        message: realQuery 
          ? `Real descriptor workflow successful: ${testCase.pallet}.${testCase.storage}.${testCase.queryType}`
          : `Descriptor validation failed: ${!descriptorInfo.palletFound ? 'Pallet not found' : 'Storage not found'}`,
        descriptorInfo,
        realQuery,
        blockchainData,
        executionTime: Date.now() - startTime
      }
      
    } catch (error) {
      return {
        passed: false,
        message: `Real descriptor testing failed: ${error instanceof Error ? error.message : String(error)}`,
        executionTime: Date.now() - startTime
      }
    } finally {
      // Cleanup
      try {
        if (client) await client.destroy?.()
        if (connection) await connection.remove?.()
        if (smoldotInstance) await smoldotInstance.terminate?.()
      } catch (cleanupError) {
        console.log(`  ⚠️  Cleanup warning: ${cleanupError instanceof Error ? cleanupError.message : String(cleanupError)}`)
      }
    }
  }
  
  /**
   * Validate that the descriptor has the expected structure
   */
  private validateDescriptorStructure(typedApi: any, testCase: TestCase): {
    chainName: string
    descriptorLoaded: boolean
    typedApiCreated: boolean
    palletFound: boolean
    storageFound: boolean
  } {
    
    const result = {
      chainName: testCase.chain,
      descriptorLoaded: false,
      typedApiCreated: false,
      palletFound: false,
      storageFound: false
    }
    
    try {
      // Check if typedApi was created
      if (typedApi && typeof typedApi === 'object') {
        result.typedApiCreated = true
        result.descriptorLoaded = true
        
        console.log(`    🔍 Checking for pallet: ${testCase.pallet}`)
        
        // Check if the pallet exists
        if (typedApi.query && typedApi.query[testCase.pallet]) {
          result.palletFound = true
          console.log(`    ✅ Pallet found: ${testCase.pallet}`)
          
          console.log(`    🔍 Checking for storage: ${testCase.storage}`)
          
          // Check if the storage item exists
          if (typedApi.query[testCase.pallet][testCase.storage]) {
            result.storageFound = true
            console.log(`    ✅ Storage found: ${testCase.pallet}.${testCase.storage}`)
            
            // Check if the query method exists
            const storageItem = typedApi.query[testCase.pallet][testCase.storage]
            const hasGetValue = typeof storageItem.getValue === 'function'
            const hasWatchValue = typeof storageItem.watchValue === 'function'
            const hasGetEntries = typeof storageItem.getEntries === 'function'
            
            console.log(`    📋 Available methods:`)
            console.log(`      getValue: ${hasGetValue ? '✅' : '❌'}`)
            console.log(`      watchValue: ${hasWatchValue ? '✅' : '❌'}`)
            console.log(`      getEntries: ${hasGetEntries ? '✅' : '❌'}`)
          } else {
            console.log(`    ❌ Storage not found: ${testCase.pallet}.${testCase.storage}`)
            
            // List available storage items
            const availableStorage = Object.keys(typedApi.query[testCase.pallet] || {})
            console.log(`    📋 Available storage items: ${availableStorage.slice(0, 5).join(', ')}${availableStorage.length > 5 ? '...' : ''}`)
          }
        } else {
          console.log(`    ❌ Pallet not found: ${testCase.pallet}`)
          
          // List available pallets
          const availablePallets = Object.keys(typedApi.query || {})
          console.log(`    📋 Available pallets: ${availablePallets.slice(0, 5).join(', ')}${availablePallets.length > 5 ? '...' : ''}`)
        }
      } else {
        console.log('    ❌ TypedApi creation failed')
      }
    } catch (error) {
      console.log(`    ❌ Descriptor structure validation error: ${error instanceof Error ? error.message : String(error)}`)
    }
    
    return result
  }
  
  /**
   * Execute a real query using the descriptor-based typed API
   */
  private async executeRealDescriptorQuery(
    typedApi: any, 
    testCase: TestCase
  ): Promise<{ queryData: any; blockchainData: any }> {
    
    const queryStart = Date.now()
    
    try {
      const storageItem = typedApi.query[testCase.pallet][testCase.storage]
      
      switch (testCase.queryType) {
        case 'getValue':
          console.log(`    📊 Executing getValue...`)
          const value = await storageItem.getValue()
          const executionTime = Date.now() - queryStart
          
          console.log(`    ✅ Real data received: ${typeof value} ${value}`)
          
          return {
            queryData: {
              queryType: 'getValue',
              pallet: testCase.pallet,
              storage: testCase.storage,
              result: value,
              executionTime,
              resultType: typeof value
            },
            blockchainData: value
          }
          
        case 'watchValue':
          console.log(`    📡 Testing watchValue Observable...`)
          
          return new Promise((resolve, reject) => {
            try {
              const observable = storageItem.watchValue()
              const subscription = observable.subscribe({
                next: (emission: any) => {
                  const executionTime = Date.now() - queryStart
                  console.log(`    📨 Real Observable emission: ${typeof emission} ${emission}`)
                  
                  subscription.unsubscribe()
                  resolve({
                    queryData: {
                      queryType: 'watchValue',
                      pallet: testCase.pallet,
                      storage: testCase.storage,
                      result: emission,
                      executionTime,
                      resultType: typeof emission,
                      observableType: 'watchValue'
                    },
                    blockchainData: emission
                  })
                },
                error: (error: any) => {
                  console.log(`    ❌ Observable error: ${error}`)
                  subscription.unsubscribe()
                  reject(error)
                }
              })
              
              // Timeout after 30 seconds for blockchain operations
              setTimeout(() => {
                subscription.unsubscribe()
                reject(new Error('Observable timeout'))
              }, 30000)
              
            } catch (error) {
              reject(error)
            }
          })
          
        case 'getEntries':
          console.log(`    📊 Executing getEntries...`)
          const entries = await storageItem.getEntries()
          const entriesExecutionTime = Date.now() - queryStart
          
          console.log(`    ✅ Real entries received: ${entries.length} entries`)
          
          return {
            queryData: {
              queryType: 'getEntries',
              pallet: testCase.pallet,
              storage: testCase.storage,
              result: entries,
              executionTime: entriesExecutionTime,
              resultType: 'array',
              entryCount: entries.length
            },
            blockchainData: entries
          }
          
        default:
          throw new Error(`Unsupported query type: ${testCase.queryType}`)
      }
      
    } catch (error) {
      throw new Error(`Query execution failed: ${error instanceof Error ? error.message : String(error)}`)
    }
  }
  
  /**
   * Test multiple chains with their respective descriptors
   */
  async validateMultiChainDescriptors(): Promise<RealDescriptorValidationResult[]> {
    const chains = [
      { name: 'polkadot', chainSpec: 'polkadot-api/chains/polkadot', descriptor: '@polkadot-api/descriptors' },
      // Add more chains as available
    ]
    
    const results: RealDescriptorValidationResult[] = []
    
    for (const chain of chains) {
      const testCase: TestCase = {
        id: `multi-chain-${chain.name}`,
        chain: chain.name,
        pallet: 'System',
        storage: 'Number',
        queryType: 'getValue',
        parameters: {},
        expectedPattern: '',
        shouldSucceed: true,
        validationRules: [],
        category: 'basic',
        estimatedDuration: 5000
      }
      
      const result = await this.validateDescriptorWorkflow(testCase)
      results.push(result)
    }
    
    return results
  }
}

// Export singleton
export const realDescriptorValidator = new RealDescriptorValidator()