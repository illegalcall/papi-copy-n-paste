// Test Matrix Generation Engine

import { TestCase, ChainInfo, PalletInfo, StorageInfo, QueryType } from './types'

// All supported chains with their metadata
const SUPPORTED_CHAINS: ChainInfo[] = [
  {
    name: 'polkadot',
    pallets: [
      {
        name: 'System',
        storage: [
          { name: 'Number', type: 'u32', hasKeys: false, isOptional: false },
          { name: 'Account', type: 'AccountInfo', parameters: ['AccountId'], hasKeys: true, isOptional: false },
          { name: 'BlockHash', type: 'Hash', parameters: ['BlockNumber'], hasKeys: true, isOptional: true }
        ]
      },
      {
        name: 'Balances', 
        storage: [
          { name: 'TotalIssuance', type: 'u128', hasKeys: false, isOptional: false },
          { name: 'Account', type: 'AccountData', parameters: ['AccountId'], hasKeys: true, isOptional: false },
          { name: 'Locks', type: 'Vec<BalanceLock>', parameters: ['AccountId'], hasKeys: true, isOptional: true }
        ]
      },
      {
        name: 'Staking',
        storage: [
          { name: 'ValidatorCount', type: 'u32', hasKeys: false, isOptional: false },
          { name: 'Bonded', type: 'AccountId', parameters: ['AccountId'], hasKeys: true, isOptional: true },
          { name: 'Ledger', type: 'StakingLedger', parameters: ['AccountId'], hasKeys: true, isOptional: true }
        ]
      }
    ]
  },
  {
    name: 'kusama',
    pallets: [
      {
        name: 'System',
        storage: [
          { name: 'Number', type: 'u32', hasKeys: false, isOptional: false },
          { name: 'Account', type: 'AccountInfo', parameters: ['AccountId'], hasKeys: true, isOptional: false }
        ]
      }
    ]
  }
]

// All query types with their characteristics
const QUERY_TYPES: Array<{
  type: QueryType
  category: 'basic' | 'observable' | 'advanced' | 'complete'
  requiresKeys: boolean
  isObservable: boolean
  estimatedDuration: number
  complexityScore: number
}> = [
  // Basic queries
  { type: 'getValue', category: 'basic', requiresKeys: false, isObservable: false, estimatedDuration: 100, complexityScore: 1 },
  { type: 'getValues', category: 'basic', requiresKeys: true, isObservable: false, estimatedDuration: 200, complexityScore: 2 },
  { type: 'getEntries', category: 'basic', requiresKeys: false, isObservable: false, estimatedDuration: 300, complexityScore: 2 },
  { type: 'getValueAt', category: 'basic', requiresKeys: false, isObservable: false, estimatedDuration: 150, complexityScore: 2 },
  
  // Observable queries
  { type: 'watchValue', category: 'observable', requiresKeys: false, isObservable: true, estimatedDuration: 2000, complexityScore: 3 },
  { type: 'watchValueFinalized', category: 'observable', requiresKeys: false, isObservable: true, estimatedDuration: 2500, complexityScore: 3 },
  { type: 'watchValueBest', category: 'observable', requiresKeys: false, isObservable: true, estimatedDuration: 2000, complexityScore: 3 },
  { type: 'watchEntries', category: 'observable', requiresKeys: false, isObservable: true, estimatedDuration: 3000, complexityScore: 4 },
  { type: 'watchEntriesPartial', category: 'observable', requiresKeys: true, isObservable: true, estimatedDuration: 3500, complexityScore: 4 },
  
  // Advanced patterns
  { type: 'multiWatch', category: 'advanced', requiresKeys: false, isObservable: true, estimatedDuration: 4000, complexityScore: 5 },
  { type: 'conditionalWatch', category: 'advanced', requiresKeys: false, isObservable: true, estimatedDuration: 3500, complexityScore: 5 },
  { type: 'bufferedWatch', category: 'advanced', requiresKeys: false, isObservable: true, estimatedDuration: 3000, complexityScore: 4 },
  { type: 'errorHandledWatch', category: 'advanced', requiresKeys: false, isObservable: true, estimatedDuration: 4500, complexityScore: 6 },
  { type: 'distinctWatch', category: 'advanced', requiresKeys: false, isObservable: true, estimatedDuration: 3000, complexityScore: 4 },
  { type: 'throttledWatch', category: 'advanced', requiresKeys: false, isObservable: true, estimatedDuration: 3500, complexityScore: 4 },
  
  // Complete examples
  { type: 'comprehensive', category: 'complete', requiresKeys: false, isObservable: true, estimatedDuration: 8000, complexityScore: 8 }
]

export class TestMatrixGenerator {
  /**
   * Generate comprehensive test matrix for all combinations
   */
  generateFullMatrix(): TestCase[] {
    console.log('🏗️ Generating comprehensive test matrix...')
    const testCases: TestCase[] = []
    
    for (const chain of SUPPORTED_CHAINS) {
      for (const pallet of chain.pallets) {
        for (const storage of pallet.storage) {
          for (const queryTypeInfo of QUERY_TYPES) {
            // Skip incompatible combinations
            if (this.isCompatible(queryTypeInfo, storage)) {
              const paramSets = this.generateParameterSets(storage)
              
              for (const params of paramSets) {
                const testCase = this.createTestCase(
                  chain.name,
                  pallet.name,
                  storage,
                  queryTypeInfo,
                  params
                )
                testCases.push(testCase)
              }
            }
          }
        }
      }
    }
    
    console.log(`✅ Generated ${testCases.length} test cases`)
    return testCases
  }

  /**
   * Generate filtered test matrix based on criteria
   */
  generateFilteredMatrix(filters: {
    chains?: string[]
    categories?: string[]
    maxComplexity?: number
    includeObservables?: boolean
  }): TestCase[] {
    const fullMatrix = this.generateFullMatrix()
    
    return fullMatrix.filter(testCase => {
      if (filters.chains && !filters.chains.includes(testCase.chain)) {
        return false
      }
      
      if (filters.categories && !filters.categories.includes(testCase.category)) {
        return false
      }
      
      if (filters.maxComplexity) {
        const queryTypeInfo = QUERY_TYPES.find(qt => qt.type === testCase.queryType)
        if (queryTypeInfo && queryTypeInfo.complexityScore > filters.maxComplexity) {
          return false
        }
      }
      
      if (filters.includeObservables === false) {
        const queryTypeInfo = QUERY_TYPES.find(qt => qt.type === testCase.queryType)
        if (queryTypeInfo && queryTypeInfo.isObservable) {
          return false
        }
      }
      
      return true
    })
  }

  /**
   * Generate sample test matrix for quick validation
   */
  generateSampleMatrix(): TestCase[] {
    const sampleQueries: QueryType[] = [
      'getValue', 'watchValue', 'multiWatch', 'comprehensive'
    ]
    
    const sampleChain = SUPPORTED_CHAINS[0]
    if (!sampleChain) throw new Error('No supported chains available')
    
    const samplePallet = sampleChain.pallets[0]
    if (!samplePallet) throw new Error('No pallets available for sample chain')
    
    const sampleStorage = samplePallet.storage[0]
    if (!sampleStorage) throw new Error('No storage available for sample pallet')
    
    return sampleQueries.map(queryType => {
      const queryTypeInfo = QUERY_TYPES.find(qt => qt.type === queryType)!
      return this.createTestCase(
        sampleChain.name,
        samplePallet.name,
        sampleStorage,
        queryTypeInfo,
        {}
      )
    })
  }

  /**
   * Check if query type is compatible with storage type
   */
  private isCompatible(queryTypeInfo: { type: QueryType; requiresKeys: boolean }, storage: StorageInfo): boolean {
    // getValues requires storage with keys
    if (queryTypeInfo.type === 'getValues' && !storage.hasKeys) {
      return false
    }
    
    // Some advanced patterns work better with keyed storage
    if (queryTypeInfo.type === 'watchEntriesPartial' && !storage.hasKeys) {
      return false
    }
    
    return true
  }

  /**
   * Generate parameter combinations for storage entry
   */
  private generateParameterSets(storage: StorageInfo): Array<Record<string, any>> {
    if (!storage.hasKeys || !storage.parameters) {
      return [{}] // No parameters needed
    }
    
    const paramSets: Array<Record<string, any>> = []
    
    // Generate test parameters based on parameter types
    for (const paramType of storage.parameters) {
      const testValues = this.generateTestValues(paramType)
      
      for (const value of testValues) {
        paramSets.push({
          [paramType.toLowerCase()]: value,
          key: value // Generic key field
        })
      }
    }
    
    // Also include empty params for optional storage
    if (storage.isOptional) {
      paramSets.push({})
    }
    
    return paramSets.length > 0 ? paramSets : [{}]
  }

  /**
   * Generate test values for different parameter types
   */
  private generateTestValues(paramType: string): any[] {
    switch (paramType) {
      case 'AccountId':
        return [
          '//Alice',
          '//Bob', 
          '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY'
        ]
      
      case 'BlockNumber':
      case 'u32':
        return [0, 1, 100, 1000000]
      
      case 'u128':
        return [0, 1000000000000, '1000000000000000000']
      
      case 'Hash':
        return [
          '0x0000000000000000000000000000000000000000000000000000000000000000',
          '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef'
        ]
      
      default:
        return ['test_value', '']
    }
  }

  /**
   * Create a complete test case
   */
  private createTestCase(
    chain: string,
    palletName: string,
    storage: StorageInfo,
    queryTypeInfo: { type: QueryType; category: string; estimatedDuration: number },
    parameters: Record<string, any>
  ): TestCase {
    const testId = this.generateTestId(chain, palletName, storage.name, queryTypeInfo.type, parameters)
    
    return {
      id: testId,
      chain,
      pallet: palletName,
      storage: storage.name,
      queryType: queryTypeInfo.type,
      parameters,
      expectedPattern: this.getExpectedPattern(queryTypeInfo.type),
      shouldSucceed: this.shouldSucceed(queryTypeInfo.type, storage, parameters),
      validationRules: this.getValidationRules(queryTypeInfo.type, storage),
      category: queryTypeInfo.category as any,
      estimatedDuration: queryTypeInfo.estimatedDuration
    }
  }

  /**
   * Generate unique test ID
   */
  private generateTestId(
    chain: string, 
    pallet: string, 
    storage: string, 
    queryType: string, 
    params: Record<string, any>
  ): string {
    const paramHash = Object.keys(params).length > 0 
      ? '-' + Buffer.from(JSON.stringify(params)).toString('base64').slice(0, 8)
      : ''
    
    return `${chain}-${pallet}-${storage}-${queryType}${paramHash}`
  }

  /**
   * Get expected code pattern for query type
   */
  private getExpectedPattern(queryType: QueryType): string {
    const patterns: Record<QueryType, string> = {
      'getValue': /api\.query\..*\.getValue/.source,
      'getValues': /api\.query\..*\.getValues/.source,
      'getEntries': /api\.query\..*\.getEntries/.source,
      'getValueAt': /api\.query\..*\.getValue.*at:/.source,
      'watchValue': /api\.query\..*\.watchValue/.source,
      'watchValueFinalized': /watchValue.*"finalized"/.source,
      'watchValueBest': /watchValue.*"best"/.source,
      'watchEntries': /api\.query\..*\.watchEntries/.source,
      'watchEntriesPartial': /watchEntries.*partial/.source,
      'multiWatch': /combineLatest/.source,
      'conditionalWatch': /pipe.*filter/.source,
      'bufferedWatch': /pipe.*buffer/.source,
      'errorHandledWatch': /catchError|retry/.source,
      'distinctWatch': /distinctUntilChanged/.source,
      'throttledWatch': /throttleTime/.source,
      'comprehensive': /getValue.*watchValue.*combineLatest/.source
    }
    
    return patterns[queryType] || '.*'
  }

  /**
   * Determine if test case should succeed
   */
  private shouldSucceed(queryType: QueryType, storage: StorageInfo, params: Record<string, any>): boolean {
    // getValues should fail if storage has no keys but no params provided
    if (queryType === 'getValues' && !storage.hasKeys && Object.keys(params).length === 0) {
      return false
    }
    
    // Storage queries with required keys should fail if no params provided
    if (storage.hasKeys && !storage.isOptional && Object.keys(params).length === 0) {
      return false
    }
    
    // Most other cases should succeed
    return true
  }

  /**
   * Get validation rules for query type
   */
  private getValidationRules(queryType: QueryType, storage: StorageInfo): any[] {
    const rules = []
    
    // All queries need syntax validation
    rules.push({ name: 'syntax', type: 'syntax', required: true })
    
    // Observable queries need RxJS pattern validation
    if (queryType.includes('watch') || queryType.includes('Watch')) {
      rules.push({ name: 'observable', type: 'observable', required: true })
    }
    
    // Advanced patterns need specific validation
    if (queryType.includes('error') || queryType.includes('Error')) {
      rules.push({ name: 'error_handling', type: 'functional', required: true })
    }
    
    return rules
  }

  /**
   * Get test statistics
   */
  getMatrixStats(testCases: TestCase[]): {
    total: number
    byChain: Record<string, number>
    byCategory: Record<string, number>
    byQueryType: Record<string, number>
    estimatedTime: number
  } {
    const stats = {
      total: testCases.length,
      byChain: {} as Record<string, number>,
      byCategory: {} as Record<string, number>,
      byQueryType: {} as Record<string, number>,
      estimatedTime: 0
    }
    
    for (const testCase of testCases) {
      // Count by chain
      stats.byChain[testCase.chain] = (stats.byChain[testCase.chain] || 0) + 1
      
      // Count by category
      stats.byCategory[testCase.category] = (stats.byCategory[testCase.category] || 0) + 1
      
      // Count by query type
      stats.byQueryType[testCase.queryType] = (stats.byQueryType[testCase.queryType] || 0) + 1
      
      // Sum estimated time
      stats.estimatedTime += testCase.estimatedDuration
    }
    
    return stats
  }
}

// Export singleton instance
export const testMatrixGenerator = new TestMatrixGenerator()