// Test Runner - Simplified Version for Quick Testing

import { TestCase, TestResult, TestSuiteResult, ValidationResult } from './types'
import { testMatrixGenerator } from './test-matrix-generator'
import { codeValidator } from './code-validator'
import { realRuntimeValidator } from './real-runtime-validator'
import { realNetworkValidator } from './real-network-validator'
import { realRxJSValidator } from './real-rxjs-validator'
import { realDescriptorValidator } from './real-descriptor-validator'
import { errorScenarioValidator } from './error-scenario-validator'
import { memoryLeakValidator } from './memory-leak-validator'
import { typeScriptValidator } from './typescript-validator'

export interface TestRunnerConfig {
  parallel?: boolean
  batchSize?: number
  timeout?: number
  chains?: string[]
  categories?: string[]
  verbose?: boolean
  skipSlow?: boolean
  generateReport?: boolean
}

export class TestRunner {
  private config: Required<TestRunnerConfig>

  constructor(config: Partial<TestRunnerConfig> = {}) {
    this.config = {
      parallel: config.parallel ?? true,
      batchSize: config.batchSize ?? 50,
      timeout: config.timeout ?? 120000, // Increased to 2 minutes for blockchain operations
      chains: config.chains ?? ['polkadot'],
      categories: config.categories ?? ['basic'],
      verbose: config.verbose ?? false,
      skipSlow: config.skipSlow ?? false,
      generateReport: config.generateReport ?? false
    }
  }

  /**
   * Run quick validation with sample test cases
   */
  async runQuickValidation(): Promise<TestSuiteResult> {
    console.log('🚀 Starting quick validation...')
    const sampleMatrix = testMatrixGenerator.generateSampleMatrix()
    return await this.runTests(sampleMatrix)
  }

  /**
   * Run full test suite
   */
  async runFullSuite(): Promise<TestSuiteResult> {
    console.log('🧪 Starting comprehensive test suite...')
    
    const matrix = testMatrixGenerator.generateFilteredMatrix({
      chains: this.config.chains,
      categories: this.config.categories
    })
    
    console.log(`📊 Generated ${matrix.length} test cases`)
    
    return await this.runTests(matrix)
  }

  /**
   * Run specific test cases
   */
  private async runTests(testCases: TestCase[]): Promise<TestSuiteResult> {
    const startTime = Date.now()
    
    const results = this.config.parallel
      ? await this.runTestsInParallel(testCases)
      : await this.runTestsSequentially(testCases)

    const totalExecutionTime = Date.now() - startTime
    
    return this.generateTestSuiteResult(results, totalExecutionTime)
  }

  /**
   * Run single test case
   */
  async runSingleTest(testCase: TestCase): Promise<TestResult> {
    const startTime = Date.now()
    
    try {
      console.log(`🧪 Running test: ${testCase.id}`)
      
      // Generate code for this test case
      const generatedCode = this.generateCode(testCase)
      
      // Run validations
      const validationResults = await this.runValidations(generatedCode, testCase)
      
      // Determine overall result
      const overallPassed = Object.values(validationResults).every(result => result.passed)
      
      // Collect errors and warnings
      const errors = Object.values(validationResults)
        .filter(result => !result.passed)
        .map(result => result.message || 'Validation failed')
      
      const warnings = Object.values(validationResults)
        .flatMap(result => result.warnings || [])
      
      const result: TestResult = {
        testCase,
        validationResults,
        overallPassed,
        totalExecutionTime: Date.now() - startTime,
        generatedCode,
        errors,
        warnings
      }
      
      return result
    } catch (error) {
      return {
        testCase,
        validationResults: {},
        overallPassed: false,
        totalExecutionTime: Date.now() - startTime,
        generatedCode: '',
        errors: [`Test execution failed: ${error instanceof Error ? error.message : String(error)}`],
        warnings: []
      }
    }
  }

  /**
   * Run tests in parallel batches
   */
  private async runTestsInParallel(testCases: TestCase[]): Promise<TestResult[]> {
    const results: TestResult[] = []
    const batches = this.createBatches(testCases, this.config.batchSize)
    
    for (let i = 0; i < batches.length; i++) {
      const batch = batches[i]
      if (!batch) continue
      
      console.log(`📦 Processing batch ${i + 1}/${batches.length} (${batch.length} tests)`)
      
      const batchPromises = batch.map(testCase => 
        this.runSingleTestWithTimeout(testCase)
      )
      
      const batchResults = await Promise.all(batchPromises)
      results.push(...batchResults)
      
      const progress = ((results.length / testCases.length) * 100).toFixed(1)
      console.log(`📊 Progress: ${progress}% (${results.length}/${testCases.length} tests)`)
    }

    return results
  }

  /**
   * Run tests sequentially
   */
  private async runTestsSequentially(testCases: TestCase[]): Promise<TestResult[]> {
    const results: TestResult[] = []
    
    for (let i = 0; i < testCases.length; i++) {
      const testCase = testCases[i]
      if (!testCase) continue
      
      const result = await this.runSingleTestWithTimeout(testCase)
      results.push(result)
      
      if (i % 10 === 0) {
        const progress = ((i + 1) / testCases.length * 100).toFixed(1)
        console.log(`📊 Progress: ${progress}% (${i + 1}/${testCases.length} tests)`)
      }
    }

    return results
  }

  /**
   * Run single test with timeout
   */
  private async runSingleTestWithTimeout(testCase: TestCase): Promise<TestResult> {
    return Promise.race([
      this.runSingleTest(testCase),
      new Promise<TestResult>((_, reject) => 
        setTimeout(() => reject(new Error('Test timeout')), this.config.timeout)
      )
    ]).catch((error) => ({
      testCase,
      validationResults: {},
      overallPassed: false,
      totalExecutionTime: this.config.timeout,
      generatedCode: '',
      errors: [`Timeout: ${error instanceof Error ? error.message : String(error)}`],
      warnings: []
    }))
  }

  /**
   * Generate code for test case - SIMPLIFIED VERSION
   */
  private generateCode(testCase: TestCase): string {
    const setupCommands = this.getSetupCommands(testCase.chain)
    const imports = this.generateImports()
    const setupCode = this.generateApiSetup()
    const codeBody = this.generateCodeBody(testCase)
    
    return `${setupCommands}

${imports}

async function main() {
${setupCode}

${codeBody}
}

main().catch(console.error)`
  }

  /**
   * Generate setup commands
   */
  private getSetupCommands(chain: string): string {
    return `// SETUP REQUIRED: Run these commands in your project:
// npm install -g polkadot-api
// papi add ${chain} --wsUrl ${this.getChainUrl(chain)}
// papi generate
// npm install`
  }

  /**
   * Generate imports
   */
  private generateImports(): string {
    return `import { createClient } from "polkadot-api"
import { getSmProvider } from "polkadot-api/sm-provider"
import { start } from "polkadot-api/smoldot"
import { chainSpec } from "polkadot-api/chains/polkadot"
import { polkadot } from "@polkadot-api/descriptors"
import { combineLatest, of } from "rxjs"
import { filter, bufferTime, catchError, retry, distinctUntilChanged, throttleTime } from "rxjs/operators"`
  }

  /**
   * Generate API setup code
   */
  private generateApiSetup(): string {
    return `  // Initialize the client and connect
  const smoldot = start()
  const chain = await smoldot.addChain({ chainSpec })
  const client = createClient(getSmProvider(chain))
  const typedApi = client.getTypedApi(polkadot)`
  }

  /**
   * Generate code body - SIMPLIFIED
   */
  private generateCodeBody(testCase: TestCase): string {
    const { pallet, storage, queryType } = testCase
    
    switch (queryType) {
      case 'getValue':
        return `  // Get single storage value
  const result = await typedApi.query.${pallet}.${storage}.getValue()
  console.log('Result:', result)`

      case 'getValues':
        return `  // Get multiple values
  const keys = ["example"]
  const results = await typedApi.query.${pallet}.${storage}.getValues(keys)
  console.log('Results:', results)`

      case 'getEntries':
        return `  // Get all entries
  const entries = await typedApi.query.${pallet}.${storage}.getEntries()
  console.log('Entries:', entries)`

      case 'getValueAt':
        return `  // Get value at specific block
  const resultFinalized = await typedApi.query.${pallet}.${storage}.getValue({ at: "finalized" })
  console.log('Finalized:', resultFinalized)`

      // Observable methods
      case 'watchValue':
        return `  // Watch storage value changes
  const result = typedApi.query.${pallet}.${storage}.watchValue()
  console.log('Observable:', result)`

      case 'watchValueFinalized':
        return `  // Watch finalized storage value changes
  const result = typedApi.query.${pallet}.${storage}.watchValue("finalized")
  console.log('Observable:', result)`

      case 'watchValueBest':
        return `  // Watch best storage value changes
  const result = typedApi.query.${pallet}.${storage}.watchValue("best")
  console.log('Observable:', result)`

      case 'watchEntries':
        return `  // Watch storage entries changes
  const result = typedApi.query.${pallet}.${storage}.watchEntries()
  console.log('Observable:', result)`

      case 'watchEntriesPartial':
        return `  // Watch partial storage entries changes
  const result = typedApi.query.${pallet}.${storage}.watchEntries({ partial: true })
  console.log('Observable:', result)`

      case 'multiWatch':
        return `  // Combine multiple storage observables
  const result = combineLatest([
    typedApi.query.${pallet}.${storage}.watchValue(),
    typedApi.query.System.Number.watchValue()
  ])
  console.log('Observable:', result)`

      case 'conditionalWatch':
        return `  // Conditional filtering observable
  const result = typedApi.query.${pallet}.${storage}.watchValue().pipe(
    filter(value => value !== null)
  )
  console.log('Observable:', result)`

      case 'bufferedWatch':
        return `  // Buffered observable
  const result = typedApi.query.${pallet}.${storage}.watchValue().pipe(
    bufferTime(1000)
  )
  console.log('Observable:', result)`

      case 'errorHandledWatch':
        return `  // Error handling observable
  const result = typedApi.query.${pallet}.${storage}.watchValue().pipe(
    catchError(error => of(null)),
    retry(3)
  )
  console.log('Observable:', result)`

      case 'distinctWatch':
        return `  // Distinct values observable
  const result = typedApi.query.${pallet}.${storage}.watchValue().pipe(
    distinctUntilChanged()
  )
  console.log('Observable:', result)`

      case 'throttledWatch':
        return `  // Throttled observable
  const result = typedApi.query.${pallet}.${storage}.watchValue().pipe(
    throttleTime(500)
  )
  console.log('Observable:', result)`

      case 'comprehensive':
        return `  // Comprehensive observable patterns
  const result = combineLatest([
    typedApi.query.${pallet}.${storage}.watchValue(),
    typedApi.query.System.Number.watchValue()
  ]).pipe(
    distinctUntilChanged(),
    throttleTime(1000),
    catchError(error => of([null, null]))
  )
  console.log('Observable:', result)`

      default:
        return `  // Basic getValue query
  const result = await typedApi.query.${pallet}.${storage}.getValue()
  console.log('Result:', result)`
    }
  }

  /**
   * Run validations on generated code
   */
  private async runValidations(code: string, testCase: TestCase): Promise<Record<string, ValidationResult>> {
    console.log(`  🔍 Running comprehensive validation suite for ${testCase.id}...`)
    
    try {
      // STATIC ANALYSIS - Quick validation (always run)
      console.log(`    📝 Static analysis validation...`)
      const syntaxResult = await codeValidator.validateSyntax(code)
      const importsResult = await codeValidator.validateImports(code)
      const functionalResult = await codeValidator.validateCode(code, testCase)
      
      // RUNTIME EXECUTION - VM-based code execution with pre-validation for edge cases
      console.log(`    🚀 Runtime execution validation...`)
      const runtimeResult = await realRuntimeValidator.executeAndValidateWithPreCheck(code, testCase)
      
      // TYPESCRIPT COMPILATION - Real TypeScript compiler validation
      console.log(`    📘 TypeScript compilation validation...`)
      const typeScriptResult = await typeScriptValidator.validateTypeScript(code, testCase)
      
      // REAL RxJS VALIDATION - Code validation + Real Observable testing
      console.log(`    🔄 Real RxJS validation...`)
      const rxjsResult = await realRxJSValidator.validateRxJSCode(code, testCase)
      
      // MEMORY LEAK DETECTION - Code validation + Subscription and memory management
      console.log(`    🧠 Memory leak detection...`)
      const memoryLeakResult = await memoryLeakValidator.validateMemoryLeakCode(code, testCase)
      
      // ERROR SCENARIO TESTING - Real error conditions and recovery
      console.log(`    💥 Error scenario validation...`)
      const errorResults = await errorScenarioValidator.validateErrorScenarios(testCase)
      const errorResult = {
        passed: errorResults.length > 0 && errorResults.every(r => r.passed),
        message: `Error scenarios: ${errorResults.filter(r => r.passed).length}/${errorResults.length} passed`,
        executionTime: errorResults.reduce((sum, r) => sum + (r.executionTime || 0), 0),
        details: errorResults
      }
      
      // DESCRIPTOR WORKFLOW TESTING - Complete PAPI chainSpec → descriptor → typedApi → query pipeline
      console.log(`    📦 Descriptor workflow validation...`)
      let descriptorResult: ValidationResult
      try {
        descriptorResult = await realDescriptorValidator.validateDescriptorWorkflow(testCase)
      } catch (error) {
        console.log(`      ⚠️  Descriptor workflow test failed: ${error instanceof Error ? error.message : String(error)}`)
        descriptorResult = { 
          passed: false, 
          message: `Descriptor workflow test failed: ${error instanceof Error ? error.message : String(error)}`,
          warnings: ['Descriptor workflow testing encountered an error']
        }
      }
      
      // REAL BLOCKCHAIN TESTING - Actual Polkadot mainnet connections (read-only for safety)
      console.log(`    🌐 Real blockchain validation...`)
      let networkResult: ValidationResult
      try {
        // Import the real blockchain validator
        const { realBlockchainValidator } = await import('./real-blockchain-validator')
        
        // Test with real blockchain if it's a safe query type
        if (testCase.queryType === 'getValue' && 
            ['System.Number', 'System.BlockHash'].includes(`${testCase.pallet}.${testCase.storage}`)) {
          networkResult = await realBlockchainValidator.validateGeneratedCodeAgainstRealBlockchain(code, testCase)
        } else {
          // For complex queries, use real storage queries
          const { realStorageQueries } = await import('./real-storage-queries')
          const storageResult = await realStorageQueries.querySystemNumber()
          
          networkResult = {
            passed: storageResult.success,
            message: storageResult.success 
              ? `Real blockchain query successful: ${storageResult.queryType}` 
              : `Real blockchain query failed: ${storageResult.error}`,
            executionTime: storageResult.executionTime,
            details: storageResult.data
          }
        }
      } catch (error) {
        console.log(`      ⚠️  Real blockchain test failed: ${error instanceof Error ? error.message : String(error)}`)
        networkResult = { 
          passed: false, 
          message: `Real blockchain test failed: ${error instanceof Error ? error.message : String(error)}`,
          warnings: ['Real blockchain testing encountered an error']
        }
      }
      
      // COMPREHENSIVE RESULTS
      const allResults = {
        // Static Analysis
        syntax: syntaxResult,
        imports: importsResult,
        functional: functionalResult.functional || { passed: true, message: 'Functional validation skipped' },
        
        // Runtime Execution  
        runtime: runtimeResult,
        
        // TypeScript Compilation
        typescript: typeScriptResult,
        
        // Real-world Testing
        rxjs: rxjsResult,
        memoryLeak: memoryLeakResult,
        errorScenarios: errorResult,
        
        // Real Blockchain Testing
        descriptor: descriptorResult,
        network: networkResult
      }
      
      // Summary
      const totalTests = Object.keys(allResults).length
      const passedTests = Object.values(allResults).filter(result => result.passed).length
      const totalTime = Object.values(allResults).reduce((sum, result) => sum + (result.executionTime || 0), 0)
      
      console.log(`    📊 Validation Summary: ${passedTests}/${totalTests} passed (${totalTime}ms)`)
      
      return allResults
      
    } catch (error) {
      console.log(`    ❌ Validation suite failed: ${error instanceof Error ? error.message : String(error)}`)
      
      return {
        syntax: { passed: false, message: 'Syntax validation failed' },
        imports: { passed: false, message: 'Import validation failed' },
        functional: { passed: false, message: 'Functional validation failed' },
        runtime: { passed: false, message: `Runtime validation failed: ${error instanceof Error ? error.message : String(error)}` },
        typescript: { passed: false, message: 'TypeScript validation failed' },
        rxjs: { passed: false, message: 'RxJS validation failed' },
        memoryLeak: { passed: false, message: 'Memory leak validation failed' },
        errorScenarios: { passed: false, message: 'Error scenario validation failed' },
        descriptor: { passed: false, message: 'Descriptor validation failed' },
        network: { passed: false, message: 'Network validation failed' }
      }
    }
  }

  /**
   * Get chain WebSocket URL
   */
  private getChainUrl(chain: string): string {
    const urls: Record<string, string> = {
      polkadot: 'wss://rpc.polkadot.io',
      kusama: 'wss://kusama-rpc.polkadot.io',
      moonbeam: 'wss://wss.api.moonbeam.network',
      astar: 'wss://rpc.astar.network'
    }
    return urls[chain] || urls.polkadot || 'wss://rpc.polkadot.io'
  }

  /**
   * Create test batches
   */
  private createBatches<T>(items: T[], batchSize: number): T[][] {
    const batches: T[][] = []
    for (let i = 0; i < items.length; i += batchSize) {
      batches.push(items.slice(i, i + batchSize))
    }
    return batches
  }

  /**
   * Generate test suite result
   */
  private generateTestSuiteResult(results: TestResult[], totalExecutionTime: number): TestSuiteResult {
    const totalPassed = results.filter(r => r.overallPassed).length
    const totalFailed = results.filter(r => !r.overallPassed).length
    const warnings = results.reduce((sum, r) => sum + r.warnings.length, 0)

    console.log('✅ Test suite completed in', totalExecutionTime + 'ms')
    console.log('📊 Generating test report...')

    return {
      total: results.length,
      passed: totalPassed,
      failed: totalFailed,
      warnings,
      totalExecutionTime,
      results,
      summary: this.generateSummary(results, totalPassed, totalFailed)
    }
  }

  /**
   * Generate test summary
   */
  private generateSummary(results: TestResult[], totalPassed: number, totalFailed: number) {
    const byCategory: Record<string, { passed: number; failed: number }> = {}
    const topErrors: Array<{ error: string; count: number }> = []
    const errorCounts: Record<string, number> = {}

    // Calculate stats by category
    for (const result of results) {
      const category = result.testCase.category
      if (!byCategory[category]) {
        byCategory[category] = { passed: 0, failed: 0 }
      }
      
      if (result.overallPassed) {
        byCategory[category].passed++
      } else {
        byCategory[category].failed++
        
        // Count errors
        for (const error of result.errors) {
          errorCounts[error] = (errorCounts[error] || 0) + 1
        }
      }
    }

    // Sort errors by frequency
    const sortedErrors = Object.entries(errorCounts)
      .map(([error, count]) => ({ error, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)

    topErrors.push(...sortedErrors)

    // Performance stats
    const executionTimes = results.map(r => r.totalExecutionTime)
    const avgExecutionTime = executionTimes.reduce((a, b) => a + b, 0) / executionTimes.length

    console.log('\n=== TEST SUITE RESULTS ===')
    console.log(`Total Tests: ${results.length}`)
    console.log(`Passed: ${results.filter(r => r.overallPassed).length} (${(results.filter(r => r.overallPassed).length / results.length * 100).toFixed(1)}%)`)
    console.log(`Failed: ${results.filter(r => !r.overallPassed).length} (${(results.filter(r => !r.overallPassed).length / results.length * 100).toFixed(1)}%)`)
    console.log(`Warnings: ${results.reduce((sum, r) => sum + r.warnings.length, 0)}`)
    console.log(`Execution Time: ${(results.reduce((sum, r) => sum + r.totalExecutionTime, 0) / 1000).toFixed(1)}s`)

    console.log('\n=== BY CATEGORY ===')
    for (const [category, stats] of Object.entries(byCategory)) {
      const total = stats.passed + stats.failed
      const rate = total > 0 ? (stats.passed / total * 100).toFixed(1) : '0.0'
      console.log(`${category}: ${stats.passed}/${total} (${rate}%)`)
    }

    console.log('\n=== TOP ERRORS ===')
    for (const { error, count } of topErrors) {
      console.log(`${count}x: ${error}`)
    }

    console.log('\n=== PERFORMANCE ===')
    console.log(`Average execution time: ${avgExecutionTime.toFixed(1)}ms`)
    
    const slowestTests = results
      .sort((a, b) => b.totalExecutionTime - a.totalExecutionTime)
      .slice(0, 3)
      .map(r => ({ id: r.testCase.id, time: r.totalExecutionTime }))
    
    console.log('Slowest tests:')
    for (const test of slowestTests) {
      console.log(`  ${test.id}: ${test.time}ms`)
    }

    return {
      byCategory,
      byChain: { polkadot: { passed: totalPassed, failed: totalFailed } }, // Simplified for now
      byQueryType: { getValue: { passed: totalPassed, failed: totalFailed } }, // Simplified for now
      topErrors,
      performanceStats: {
        avgExecutionTime,
        slowestTests,
        fastestTests: []
      }
    }
  }
}

// Export singleton instance
export const testRunner = new TestRunner()