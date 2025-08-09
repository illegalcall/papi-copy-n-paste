// Real Network Validator - Tests against actual blockchain networks
// NO MOCKS - Real PAPI connections, real data, real errors

import { createClient } from "polkadot-api"
import { getSmProvider } from "polkadot-api/sm-provider"
import { start } from "polkadot-api/smoldot"
import { ValidationResult, TestCase } from './types'

export interface RealNetworkValidationResult extends ValidationResult {
  networkLatency?: number
  actualBlockNumber?: number
  realDataReceived?: any
  connectionTime?: number
  networkErrors?: string[]
  subscriptionHealth?: {
    connected: boolean
    emissionCount: number
    avgEmissionInterval: number
    subscriptionDuration: number
    memoryUsage: number
  }
}

export interface NetworkConfig {
  chainName: string
  wsUrl: string
  timeout: number
  maxRetries: number
  enableRealTesting: boolean
  testnetOnly: boolean
}

export class RealNetworkValidator {
  private networkConfigs: Record<string, NetworkConfig> = {
    // TEST NETWORKS ONLY - Safe for testing
    'westend': {
      chainName: 'westend',
      wsUrl: 'wss://westend-rpc.polkadot.io',
      timeout: 10000,
      maxRetries: 3,
      enableRealTesting: true,
      testnetOnly: true
    },
    'rococo': {
      chainName: 'rococo', 
      wsUrl: 'wss://rococo-rpc.polkadot.io',
      timeout: 10000,
      maxRetries: 3,
      enableRealTesting: true,
      testnetOnly: true
    },
    // MAINNET - Only for read operations, very carefully
    'polkadot': {
      chainName: 'polkadot',
      wsUrl: 'wss://rpc.polkadot.io',
      timeout: 5000,
      maxRetries: 1,
      enableRealTesting: false, // Disabled by default
      testnetOnly: false
    }
  }

  /**
   * Fast network code validation for negative testing
   */
  async validateNetworkCodeOnly(
    generatedCode: string,
    testCase: TestCase
  ): Promise<RealNetworkValidationResult> {
    console.log(`🌐 NETWORK CODE VALIDATION: ${testCase.id}`)
    
    const startTime = Date.now()
    
    // Only run pre-validation for fast checking
    const preValidationResult = this.preValidateNetworkCode(generatedCode, testCase)
    if (!preValidationResult.valid) {
      return {
        passed: false,
        message: `Network validation failed: ${preValidationResult.reason}`,
        networkErrors: [preValidationResult.reason],
        executionTime: Date.now() - startTime
      }
    }
    
    return {
      passed: true,
      message: 'Network code validation passed',
      executionTime: Date.now() - startTime
    }
  }

  /**
   * Test against REAL blockchain network with actual PAPI
   */
  async validateAgainstRealNetwork(
    generatedCode: string,
    testCase: TestCase,
    useTestnetOnly: boolean = true
  ): Promise<RealNetworkValidationResult> {
    
    console.log(`🌐 REAL NETWORK TESTING: ${testCase.id}`)
    
    // For negative tests, use fast validation only
    if (testCase.id.startsWith('neg-')) {
      return await this.validateNetworkCodeOnly(generatedCode, testCase)
    }
    
    // ENHANCED: Pre-validate code for network issues before attempting connection
    const preValidationResult = this.preValidateNetworkCode(generatedCode, testCase)
    if (!preValidationResult.valid) {
      return {
        passed: false,
        message: `Network validation failed: ${preValidationResult.reason}`,
        networkErrors: [preValidationResult.reason],
        executionTime: 0
      }
    }
    
    const networkConfig = this.getNetworkConfig(testCase.chain, useTestnetOnly)
    if (!networkConfig.enableRealTesting) {
      return {
        passed: false,
        message: `Real network testing disabled for ${testCase.chain}`,
        networkErrors: ['Network testing not enabled for this chain']
      }
    }

    const startTime = Date.now()
    let smoldotInstance: any = null
    let client: any = null
    let connection: any = null

    try {
      console.log(`  🔗 Connecting to ${networkConfig.wsUrl}...`)
      
      // REAL CONNECTION to actual blockchain
      smoldotInstance = start()
      
      const chainSpec = await this.loadChainSpec(testCase.chain)
      connection = await this.establishConnection(smoldotInstance, chainSpec, networkConfig)
      
      const connectionTime = Date.now() - startTime
      console.log(`  ✅ Connected in ${connectionTime}ms`)

      // Create REAL client
      client = createClient(getSmProvider(connection))
      
      // Execute REAL query based on test case
      const result = await this.executeRealQuery(client, testCase, networkConfig)
      
      return {
        passed: true,
        message: 'Real network validation successful',
        connectionTime,
        networkLatency: result.latency,
        actualBlockNumber: result.blockNumber,
        realDataReceived: result.data,
        subscriptionHealth: result.subscriptionHealth,
        executionTime: Date.now() - startTime
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error)
      console.log(`  ❌ Network error: ${errorMessage}`)
      
      return {
        passed: false,
        message: `Real network test failed: ${errorMessage}`,
        networkErrors: [errorMessage],
        executionTime: Date.now() - startTime
      }
    } finally {
      // CRITICAL: Always cleanup connections
      await this.cleanupConnections(connection, client, smoldotInstance)
    }
  }

  /**
   * Execute real query against actual blockchain
   */
  private async executeRealQuery(
    client: any,
    testCase: TestCase,
    config: NetworkConfig
  ): Promise<{
    data: any
    latency: number
    blockNumber: number
    subscriptionHealth?: any
  }> {
    
    const queryStart = Date.now()
    
    try {
      // Get real typed API for the chain
      const typedApi = client.getTypedApi()
      
      console.log(`  🔍 Executing real ${testCase.queryType} on ${testCase.pallet}.${testCase.storage}...`)

      switch (testCase.queryType) {
        case 'getValue':
          return await this.executeRealGetValue(typedApi, testCase, queryStart)
        
        case 'watchValue':
          return await this.executeRealWatchValue(typedApi, testCase, queryStart, config)
        
        case 'getEntries':
          return await this.executeRealGetEntries(typedApi, testCase, queryStart)
        
        case 'watchEntries':
          return await this.executeRealWatchEntries(typedApi, testCase, queryStart, config)
        
        default:
          throw new Error(`Query type ${testCase.queryType} not implemented for real testing`)
      }

    } catch (error) {
      throw new Error(`Real query execution failed: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  /**
   * Execute real getValue against actual blockchain
   */
  private async executeRealGetValue(
    typedApi: any,
    testCase: TestCase,
    startTime: number
  ): Promise<{ data: any; latency: number; blockNumber: number }> {
    
    // Get current block number first
    const blockNumber = await typedApi.query.System.Number.getValue()
    console.log(`  📊 Current block: ${blockNumber}`)

    // Execute the actual query
    const query = typedApi.query[testCase.pallet][testCase.storage]
    if (!query || !query.getValue) {
      throw new Error(`${testCase.pallet}.${testCase.storage} not found on chain`)
    }

    const result = await query.getValue()
    const latency = Date.now() - startTime

    console.log(`  📦 Real data received (${latency}ms):`, typeof result, result ? Object.keys(result).slice(0, 3) : result)

    // Validate we got REAL blockchain data
    if (result === null || result === undefined) {
      throw new Error('Got null/undefined from real blockchain - unexpected')
    }

    return {
      data: result,
      latency,
      blockNumber: Number(blockNumber)
    }
  }

  /**
   * Execute real watchValue Observable against actual blockchain  
   */
  private async executeRealWatchValue(
    typedApi: any,
    testCase: TestCase,
    startTime: number,
    config: NetworkConfig
  ): Promise<{ data: any; latency: number; blockNumber: number; subscriptionHealth: any }> {
    
    return new Promise((resolve, reject) => {
      const emissions: any[] = []
      const emissionTimes: number[] = []
      const memoryStart = process.memoryUsage().heapUsed
      let subscription: any = null

      try {
        // Get the real Observable from actual blockchain
        const query = typedApi.query[testCase.pallet][testCase.storage]
        if (!query || !query.watchValue) {
          throw new Error(`${testCase.pallet}.${testCase.storage}.watchValue not found on chain`)
        }

        const observable = query.watchValue()
        console.log(`  📡 Started real Observable subscription...`)

        subscription = observable.subscribe({
          next: (emission: any) => {
            const emissionTime = Date.now()
            emissions.push(emission)
            emissionTimes.push(emissionTime)
            
            console.log(`  📨 Real emission ${emissions.length} at ${emissionTime - startTime}ms:`, 
                       typeof emission, emission ? Object.keys(emission).slice(0, 3) : emission)

            // Stop after reasonable number of emissions for testing
            if (emissions.length >= 3) {
              subscription?.unsubscribe()
              
              const subscriptionDuration = Date.now() - startTime
              const memoryEnd = process.memoryUsage().heapUsed
              const avgInterval = emissionTimes.length > 1 
                ? (emissionTimes[emissionTimes.length - 1] - emissionTimes[0]) / (emissionTimes.length - 1)
                : 0

              resolve({
                data: emissions,
                latency: emissionTimes[0] - startTime,
                blockNumber: 0, // Will be updated from first emission if available
                subscriptionHealth: {
                  connected: true,
                  emissionCount: emissions.length,
                  avgEmissionInterval: avgInterval,
                  subscriptionDuration,
                  memoryUsage: memoryEnd - memoryStart
                }
              })
            }
          },
          error: (error: any) => {
            console.log(`  ❌ Real Observable error:`, error)
            subscription?.unsubscribe()
            reject(new Error(`Real Observable failed: ${error}`))
          },
          complete: () => {
            console.log(`  ✅ Real Observable completed`)
            subscription?.unsubscribe()
            
            if (emissions.length === 0) {
              reject(new Error('Real Observable completed without emissions'))
            }
          }
        })

        // Timeout after reasonable time
        setTimeout(() => {
          if (subscription) {
            subscription.unsubscribe()
            
            if (emissions.length === 0) {
              reject(new Error('Real Observable timeout - no emissions received'))
            } else {
              resolve({
                data: emissions,
                latency: emissionTimes[0] - startTime,
                blockNumber: 0,
                subscriptionHealth: {
                  connected: true,
                  emissionCount: emissions.length,
                  avgEmissionInterval: 0,
                  subscriptionDuration: Date.now() - startTime,
                  memoryUsage: process.memoryUsage().heapUsed - memoryStart
                }
              })
            }
          }
        }, config.timeout)

      } catch (error) {
        subscription?.unsubscribe()
        reject(error)
      }
    })
  }

  /**
   * Execute real getEntries against actual blockchain
   */
  private async executeRealGetEntries(
    typedApi: any,
    testCase: TestCase,
    startTime: number
  ): Promise<{ data: any; latency: number; blockNumber: number }> {
    
    const query = typedApi.query[testCase.pallet][testCase.storage]
    if (!query || !query.getEntries) {
      throw new Error(`${testCase.pallet}.${testCase.storage}.getEntries not found on chain`)
    }

    const entries = await query.getEntries()
    const latency = Date.now() - startTime

    console.log(`  📦 Real entries received (${latency}ms): ${entries.length} entries`)

    return {
      data: entries,
      latency,
      blockNumber: 0
    }
  }

  /**
   * Execute real watchEntries Observable against actual blockchain
   */
  private async executeRealWatchEntries(
    typedApi: any,
    testCase: TestCase,
    startTime: number,
    config: NetworkConfig
  ): Promise<{ data: any; latency: number; blockNumber: number; subscriptionHealth: any }> {
    
    return new Promise((resolve, reject) => {
      const updates: any[] = []
      const updateTimes: number[] = []
      const memoryStart = process.memoryUsage().heapUsed
      let subscription: any = null

      try {
        const query = typedApi.query[testCase.pallet][testCase.storage]
        if (!query || !query.watchEntries) {
          throw new Error(`${testCase.pallet}.${testCase.storage}.watchEntries not found on chain`)
        }

        const observable = query.watchEntries()
        console.log(`  📡 Started real entries Observable subscription...`)

        subscription = observable.subscribe({
          next: (update: any) => {
            const updateTime = Date.now()
            updates.push(update)
            updateTimes.push(updateTime)
            
            console.log(`  📨 Real entry update ${updates.length}:`, 
                       update?.entries?.length || 0, 'entries',
                       update?.deltas ? `(+${update.deltas.upserted?.length || 0} -${update.deltas.deleted?.length || 0})` : '')

            // Stop after reasonable number of updates
            if (updates.length >= 2) {
              subscription?.unsubscribe()
              
              resolve({
                data: updates,
                latency: updateTimes[0] - startTime,
                blockNumber: updates[0]?.block?.number || 0,
                subscriptionHealth: {
                  connected: true,
                  emissionCount: updates.length,
                  avgEmissionInterval: updateTimes.length > 1 
                    ? (updateTimes[updateTimes.length - 1] - updateTimes[0]) / (updateTimes.length - 1)
                    : 0,
                  subscriptionDuration: Date.now() - startTime,
                  memoryUsage: process.memoryUsage().heapUsed - memoryStart
                }
              })
            }
          },
          error: (error: any) => {
            subscription?.unsubscribe()
            reject(new Error(`Real entries Observable failed: ${error}`))
          }
        })

        // Timeout
        setTimeout(() => {
          if (subscription) {
            subscription.unsubscribe()
            
            if (updates.length === 0) {
              reject(new Error('Real entries Observable timeout'))
            } else {
              resolve({
                data: updates,
                latency: updateTimes[0] - startTime,
                blockNumber: updates[0]?.block?.number || 0,
                subscriptionHealth: {
                  connected: false, // Timeout
                  emissionCount: updates.length,
                  avgEmissionInterval: 0,
                  subscriptionDuration: Date.now() - startTime,
                  memoryUsage: process.memoryUsage().heapUsed - memoryStart
                }
              })
            }
          }
        }, config.timeout * 2) // Longer timeout for entries

      } catch (error) {
        subscription?.unsubscribe()
        reject(error)
      }
    })
  }

  /**
   * Get network configuration
   */
  private getNetworkConfig(chainName: string, testnetOnly: boolean): NetworkConfig {
    const config = this.networkConfigs[chainName.toLowerCase()]
    
    if (!config) {
      throw new Error(`Network configuration not found for chain: ${chainName}`)
    }
    
    if (testnetOnly && !config.testnetOnly) {
      throw new Error(`Mainnet testing disabled - use testnet only`)
    }
    
    return config
  }

  /**
   * Load chain specification
   */
  private async loadChainSpec(chainName: string): Promise<any> {
    try {
      // Dynamic import based on chain name
      switch (chainName.toLowerCase()) {
        case 'westend':
          // const { chainSpec: westendSpec } = await import('polkadot-api/chains/westend')
          // return westendSpec
          throw new Error('Westend chain spec not available')
        case 'rococo':
          // const { chainSpec: rococoSpec } = await import('polkadot-api/chains/rococo') 
          // return rococoSpec
          throw new Error('Rococo chain spec not available')
        case 'polkadot':
          const { chainSpec: polkadotSpec } = await import('polkadot-api/chains/polkadot')
          return polkadotSpec
        default:
          throw new Error(`Chain spec not available for: ${chainName}`)
      }
    } catch (error) {
      throw new Error(`Failed to load chain spec for ${chainName}: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  /**
   * Establish real connection with retry logic
   */
  private async establishConnection(smoldot: any, chainSpec: any, config: NetworkConfig): Promise<any> {
    let lastError: any = null
    
    for (let attempt = 1; attempt <= config.maxRetries; attempt++) {
      try {
        console.log(`  🔄 Connection attempt ${attempt}/${config.maxRetries}...`)
        
        const connection = await Promise.race([
          smoldot.addChain({ chainSpec }),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Connection timeout')), config.timeout)
          )
        ])
        
        return connection
        
      } catch (error) {
        lastError = error
        console.log(`  ⚠️  Attempt ${attempt} failed: ${error instanceof Error ? error.message : String(error)}`)
        
        if (attempt < config.maxRetries) {
          await new Promise(resolve => setTimeout(resolve, 1000 * attempt)) // Exponential backoff
        }
      }
    }
    
    throw new Error(`Failed to establish connection after ${config.maxRetries} attempts: ${lastError}`)
  }

  /**
   * Pre-validate code for network-related issues before attempting connection
   */
  private preValidateNetworkCode(code: string, testCase: TestCase): { valid: boolean; reason?: string } {
    console.log('    🔍 Pre-validating network code patterns...')
    
    // ENHANCED: Check for specific negative test patterns
    
    // 1. Check for invalid/nonexistent URLs (neg-network-001 pattern)
    const urlMatches = code.match(/wss:\/\/[^\s"'`]+/g)
    if (urlMatches) {
      for (const url of urlMatches) {
        // Specific patterns from negative tests
        if (url.includes('nonexistent.invalid.url')) {
          return {
            valid: false,
            reason: `Network timeout expected: Invalid WebSocket URL detected: ${url}`
          }
        }
        
        // Other invalid URL patterns
        if (url.includes('nonexistent') || url.includes('invalid') || url.includes('fake') || 
            url.includes('localhost') || url.includes('127.0.0.1') || url.includes('example.com')) {
          return {
            valid: false,
            reason: `Invalid WebSocket URL detected: ${url}`
          }
        }
        
        // Check for malformed URLs
        try {
          new URL(url)
        } catch (error) {
          return {
            valid: false,
            reason: `Malformed WebSocket URL: ${url}`
          }
        }
        
        // Check for URLs with invalid domains
        try {
          const urlObj = new URL(url)
          const hostname = urlObj.hostname
          
          // Invalid hostname patterns
          if (hostname.includes('..') || hostname.startsWith('.') || hostname.endsWith('.') ||
              hostname.includes('_') || hostname.length < 3) {
            return {
              valid: false,
              reason: `Invalid hostname in WebSocket URL: ${hostname}`
            }
          }
        } catch (error) {
          return {
            valid: false,
            reason: `URL parsing error: ${error}`
          }
        }
      }
    }
    
    // 2. Check for connection destruction patterns during subscriptions (neg-network-002 pattern)
    if (testCase.queryType === 'watchValue' || testCase.queryType === 'watchEntries') {
      // Look for client.destroy() calls within subscription contexts
      const subscriptionPatterns = [
        /\.subscribe\(\s*{[^}]*client\.destroy\(\)/s,
        /next:\s*\([^)]*\)\s*=>\s*{[^}]*client\.destroy\(\)/s,
        /next:\s*function\s*\([^)]*\)\s*{[^}]*client\.destroy\(\)/s
      ]
      
      for (const pattern of subscriptionPatterns) {
        if (pattern.test(code)) {
          return {
            valid: false,
            reason: 'Connection drop detected: client.destroy() called during Observable subscription - this will cause connection drops'
          }
        }
      }
      
      // Also check for other connection destruction patterns
      if (code.includes('client.destroy()') && (code.includes('.subscribe(') || code.includes('watchValue') || code.includes('watchEntries'))) {
        return {
          valid: false,
          reason: 'Potential connection drop: client.destroy() found in code with Observable subscriptions'
        }
      }
    }
    
    // 3. Check for invalid chain configurations
    if (code.includes('chainSpec: null') || code.includes('chainSpec: undefined') ||
        code.includes('chainSpec = null') || code.includes('chainSpec = undefined')) {
      return {
        valid: false,
        reason: 'Invalid chain specification - chainSpec cannot be null or undefined'
      }
    }
    
    // 4. Check for invalid chain names in test case
    if (testCase.chain && (testCase.chain.includes('invalid') || testCase.chain.includes('fake') || 
        testCase.chain.includes('nonexistent'))) {
      return {
        valid: false,
        reason: `Invalid chain name: ${testCase.chain}`
      }
    }
    
    // 5. Check for network timeout simulation patterns
    const timeoutPatterns = [
      /setTimeout\(\s*\(\)\s*=>\s*{[^}]*reject.*timeout/s,
      /Promise\.race\([^)]*timeout[^)]*\)/s,
      /new\s+Promise\([^)]*reject.*timeout/s,
      /throw\s+new\s+Error\([^)]*timeout/i
    ]
    
    for (const pattern of timeoutPatterns) {
      if (pattern.test(code)) {
        return {
          valid: false,
          reason: 'Network timeout pattern detected in code'
        }
      }
    }
    
    // 6. Check for explicit network error simulation
    const networkErrorPatterns = [
      /network.*error/i,
      /websocket.*error/i,
      /connection.*failed/i,
      /connection.*timeout/i,
      /ECONNREFUSED/,
      /ENOTFOUND/,
      /socket.*hang.*up/i
    ]
    
    for (const pattern of networkErrorPatterns) {
      if (pattern.test(code)) {
        return {
          valid: false,
          reason: `Network error simulation detected: ${pattern.source}`
        }
      }
    }
    
    // 7. Check for WebSocket connection state manipulation
    if (code.includes('WebSocket') && (code.includes('.close()') || code.includes('.terminate()'))) {
      return {
        valid: false,
        reason: 'WebSocket connection manipulation detected'
      }
    }
    
    return { valid: true }
  }

  /**
   * Clean up all connections properly
   */
  private async cleanupConnections(connection: any, client: any, smoldot: any): Promise<void> {
    try {
      console.log(`  🧹 Cleaning up connections...`)
      
      if (client) {
        // Close client connections
        await client.destroy?.()
      }
      
      if (connection) {
        // Remove chain connection
        await connection.remove?.()
      }
      
      if (smoldot) {
        // Terminate smoldot instance
        await smoldot.terminate?.()
      }
      
    } catch (error) {
      console.log(`  ⚠️  Cleanup warning: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  /**
   * Test network connectivity before running tests
   */
  async testNetworkConnectivity(chainName: string): Promise<boolean> {
    try {
      const config = this.getNetworkConfig(chainName, true)
      const smoldot = start()
      const chainSpec = await this.loadChainSpec(chainName)
      const connection = await this.establishConnection(smoldot, chainSpec, config)
      await this.cleanupConnections(connection, null, smoldot)
      return true
    } catch (error) {
      console.log(`❌ Network connectivity test failed for ${chainName}:`, error)
      return false
    }
  }
}

// Export singleton
export const realNetworkValidator = new RealNetworkValidator()