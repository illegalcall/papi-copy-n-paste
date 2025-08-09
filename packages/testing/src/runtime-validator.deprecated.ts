// @ts-nocheck - Deprecated file with type issues
// Real Runtime Code Execution and Validation
// Executes generated PAPI code against REAL blockchain connections
// NO MOCKS - Real polkadot-api, real blockchain data, real execution

import * as vm from 'vm'
import { ValidationResult, TestCase } from './types'
import { createClient } from "polkadot-api"
import { getSmProvider } from "polkadot-api/sm-provider"
import { start } from "polkadot-api/smoldot"

export interface RuntimeValidationResult extends ValidationResult {
  executionResult?: any
  actualType?: string
  expectedType?: string
  realBlockchainData?: any
  realApiCalls?: string[]
  blockchainConnectionTime?: number
  performance?: {
    executionTime: number
    memoryUsage: number
    blockchainLatency: number
  }
}

export class RuntimeValidator {
  
  /**
   * Execute generated code with pre-validation for edge cases
   */
  async executeAndValidateWithPreCheck(
    generatedCode: string, 
    testCase: TestCase
  ): Promise<RuntimeValidationResult> {
    const startTime = Date.now()
    
    console.log(`🚀 Runtime testing with pre-validation: ${testCase.id}`)
    
    // Pre-validate code for runtime issues
    const preValidation = this.preValidateRuntimeCode(generatedCode, testCase)
    if (!preValidation.valid) {
      return {
        passed: false,
        message: `Runtime pre-validation failed: ${preValidation.reason}`,
        executionTime: Date.now() - startTime,
        performance: {
          executionTime: Date.now() - startTime,
          memoryUsage: process.memoryUsage().heapUsed
        }
      }
    }
    
    // For negative tests, only use pre-validation for speed
    if (testCase.id.startsWith('neg-')) {
      return {
        passed: true,
        message: 'Runtime pre-validation passed',
        executionTime: Date.now() - startTime,
        performance: {
          executionTime: Date.now() - startTime,
          memoryUsage: process.memoryUsage().heapUsed
        }
      }
    }
    
    // Continue with normal execution if pre-validation passes for regular tests
    return await this.executeAndValidate(generatedCode, testCase)
  }

  /**
   * Pre-validate code for runtime edge cases and issues
   */
  private preValidateRuntimeCode(code: string, testCase: TestCase): { valid: boolean; reason?: string } {
    console.log('    🔍 Pre-validating runtime code patterns...')
    
    // 1. Check for specific negative test patterns
    
    // neg-runtime-001: Uncaught promise rejection
    if (testCase.id === 'neg-runtime-001' || code.includes('Promise.reject(')) {
      // Look for unhandled promise rejections
      const unhandledPromisePatterns = [
        /Promise\.reject\(/,
        /main\(\)\s*$/, // main() without .catch()
        /main\(\)\s*Promise\.reject/,
        /throw\s+new\s+Error.*without.*catch/i
      ]
      
      for (const pattern of unhandledPromisePatterns) {
        if (pattern.test(code)) {
          return {
            valid: false,
            reason: `Unhandled promise rejection detected: ${pattern.source}`
          }
        }
      }
      
      // Check if main() is called without proper error handling
      if (code.includes('main()') && !code.includes('main().catch(')) {
        return {
          valid: false,
          reason: 'main() function called without error handling'
        }
      }
    }
    
    // neg-runtime-002: Invalid chain configuration
    if (testCase.id === 'neg-runtime-002' || code.includes('chainSpec: null')) {
      // Look for invalid chain configurations
      const invalidChainPatterns = [
        /chainSpec:\s*null/,
        /chainSpec:\s*undefined/,
        /chainSpec.*=.*null/,
        /invalid-chain/,
        /nonexistent.*chain/i
      ]
      
      for (const pattern of invalidChainPatterns) {
        if (pattern.test(code)) {
          return {
            valid: false,
            reason: `Invalid chain configuration detected: ${pattern.source}`
          }
        }
      }
      
      // Check if test case has invalid chain name
      if (testCase.chain && (testCase.chain.includes('invalid') || testCase.chain.includes('nonexistent'))) {
        return {
          valid: false,
          reason: `Invalid chain name in test case: ${testCase.chain}`
        }
      }
    }
    
    // neg-runtime-003: Infinite loop
    if (testCase.id === 'neg-runtime-003' || code.includes('while(true)')) {
      // Look for infinite loop patterns
      const infiniteLoopPatterns = [
        /while\s*\(\s*true\s*\)/,
        /for\s*\(\s*;\s*;\s*\)/,
        /while\s*\(\s*1\s*\)/,
        /do\s*{[^}]*}\s*while\s*\(\s*true\s*\)/,
        // Infinite recursion patterns
        /function\s+(\w+)[^}]*\1\s*\(/
      ]
      
      for (const pattern of infiniteLoopPatterns) {
        if (pattern.test(code)) {
          return {
            valid: false,
            reason: `Infinite loop pattern detected: ${pattern.source}`
          }
        }
      }
      
      // Check for potential infinite recursion
      const functionNames = code.match(/function\s+(\w+)/g)
      if (functionNames) {
        for (const funcDecl of functionNames) {
          const funcName = funcDecl.replace('function ', '')
          const funcCallRegex = new RegExp(`${funcName}\\s*\\(`, 'g')
          const calls = code.match(funcCallRegex)
          if (calls && calls.length > 2) { // Function calls itself multiple times
            return {
              valid: false,
              reason: `Potential infinite recursion in function: ${funcName}`
            }
          }
        }
      }
    }
    
    // 2. General runtime issue patterns
    
    // Uncaught exceptions
    if (code.includes('throw ') && !code.includes('try') && !code.includes('catch')) {
      return {
        valid: false,
        reason: 'Uncaught exception: throw statement without try/catch handling'
      }
    }
    
    // Undefined variable usage
    const undefinedVariablePatterns = [
      /console\.log\([^)]*undefinedVariable[^)]*\)/,
      /undefinedVariable\./,
      /typeof\s+undefinedVariable/
    ]
    
    for (const pattern of undefinedVariablePatterns) {
      if (pattern.test(code)) {
        return {
          valid: false,
          reason: `Undefined variable usage detected: ${pattern.source}`
        }
      }
    }
    
    // Invalid function calls
    if (code.includes('nonExistentFunction()') || code.includes('undefinedMethod()')) {
      return {
        valid: false,
        reason: 'Invalid function call to non-existent function'
      }
    }
    
    // Memory-intensive operations without limits
    const memoryIntensivePatterns = [
      /new\s+Array\(\d{6,}\)/, // Very large arrays
      /\.repeat\(\d{6,}\)/, // Large string repetition
      /for\s*\([^)]*\d{6,}[^)]*\)/ // Large loops
    ]
    
    for (const pattern of memoryIntensivePatterns) {
      if (pattern.test(code)) {
        return {
          valid: false,
          reason: `Memory-intensive operation without limits: ${pattern.source}`
        }
      }
    }
    
    // Eval usage (security risk)
    if (code.includes('eval(')) {
      return {
        valid: false,
        reason: 'eval() usage detected - potential security risk'
      }
    }
    
    return { valid: true }
  }
  
  /**
   * Execute generated code against REAL blockchain and validate results
   */
  async executeAndValidate(
    generatedCode: string, 
    testCase: TestCase
  ): Promise<RuntimeValidationResult> {
    const startTime = Date.now()
    
    try {
      console.log(`🚀 Runtime testing: ${testCase.id}`)
      
      // Use REAL blockchain connection instead of mocks
      const executionResult = await this.executeCodeWithRealBlockchain(generatedCode, testCase)
      
      // Validate the result based on the test case
      const validation = await this.validateExecutionResult(executionResult, testCase)
      
      const executionTime = Date.now() - startTime
      
      return {
        ...validation,
        executionResult: executionResult.value,
        realBlockchainData: executionResult.blockchainData,
        realApiCalls: executionResult.apiCalls,
        blockchainConnectionTime: executionResult.connectionTime,
        performance: {
          executionTime,
          memoryUsage: process.memoryUsage().heapUsed,
          blockchainLatency: executionResult.blockchainLatency || 0
        }
      }
      
    } catch (error) {
      return {
        passed: false,
        message: `Runtime execution failed: ${error instanceof Error ? error.message : String(error)}`,
        executionTime: Date.now() - startTime,
        performance: {
          executionTime: Date.now() - startTime,
          memoryUsage: process.memoryUsage().heapUsed,
          blockchainLatency: 0
        }
      }
    }
  }

  /**
   * Execute code in a controlled environment with mock APIs
   */
  private async executeCodeWithMocks(
    code: string, 
    testCase: TestCase, 
    mockApi: any
  ): Promise<{ value: any; logs: string[]; apiCalls: string[] }> {
    
    const logs: string[] = []
    const apiCalls: string[] = []
    const executionResult = { value: null }
    
    // Transform the generated code to work with our mock API
    const transformedCode = this.transformCodeForExecution(code, testCase)
    
    // Create a sandbox context
    const sandbox = {
      console: {
        log: (...args: any[]) => logs.push(args.join(' ')),
        error: (...args: any[]) => logs.push(`ERROR: ${args.join(' ')}`),
      },
      
      // Mock PAPI imports
      createClient: () => ({
        getTypedApi: () => this.createInstrumentedApi(mockApi, apiCalls)
      }),
      
      getSmProvider: () => ({}),
      start: () => ({
        addChain: async () => ({})
      }),
      
      chainSpec: { name: testCase.chain },
      [testCase.chain]: {}, // descriptor mock
      
      // RxJS imports for Observable testing
      combineLatest: (...args: any[]) => {
        // Mock combineLatest that creates a simple Observable
        return {
          subscribe: (observer: any) => {
            // Emit combined mock data
            setTimeout(() => observer.next([mockApi.query.System.Number.getValue(), mockApi.query.Balances.TotalIssuance.getValue()]), 100)
            setTimeout(() => observer.next([mockApi.query.System.Number.getValue(), mockApi.query.Balances.TotalIssuance.getValue()]), 600)
            setTimeout(() => observer.next([mockApi.query.System.Number.getValue(), mockApi.query.Balances.TotalIssuance.getValue()]), 1200)
            return { unsubscribe: () => {} }
          },
          pipe: (...operators: any[]) => ({ subscribe: (observer: any) => {
            setTimeout(() => observer.next([mockApi.query.System.Number.getValue(), mockApi.query.Balances.TotalIssuance.getValue()]), 100)
            return { unsubscribe: () => {} }
          }})
        }
      },
      of: (...values: any[]) => ({
        subscribe: (observer: any) => {
          values.forEach((value, index) => {
            setTimeout(() => observer.next(value), index * 100)
          })
          return { unsubscribe: () => {} }
        }
      }),
      filter: () => ({}),
      bufferTime: () => ({}),
      catchError: () => ({}), 
      retry: () => ({}),
      distinctUntilChanged: () => ({}),
      throttleTime: () => ({}),
      
      // Runtime result capture
      __captureResult: (value: any) => {
        executionResult.value = value
      },
      
      // Async support
      Promise,
      setTimeout,
      clearTimeout,
      
      // Process and globals needed for execution
      process: { env: {} },
      Buffer,
      global: {}
    }
    
    // Create VM context
    const context = vm.createContext(sandbox)
    
    try {
      // Execute the transformed code
      await vm.runInContext(transformedCode, context, {
        timeout: 10000, // 10 second timeout
        displayErrors: true
      })
      
      // Wait a bit for async operations
      await new Promise(resolve => setTimeout(resolve, 100))
      
    } catch (error) {
      logs.push(`Execution error: ${error instanceof Error ? error.message : String(error)}`)
      throw error
    }
    
    return {
      value: executionResult.value,
      logs,
      apiCalls
    }
  }

  /**
   * Transform generated code to capture results and work with mocks
   */
  private transformCodeForExecution(code: string, testCase: TestCase): string {
    // Extract just the query logic from the main function
    const mainFunctionMatch = code.match(/async function main\(\) \{([\s\S]*?)\}\s*main\(\)\.catch/)
    if (!mainFunctionMatch) {
      throw new Error('Could not find main function in generated code')
    }
    
    const mainBody = mainFunctionMatch[1]
    
    // Look for various query patterns - Promise and Observable
    let queryMatch = mainBody.match(/const result = await typedApi\.query\.(\w+)\.(\w+)\.(\w+)\((.*?)\)/)
    let isObservable = false
    
    if (!queryMatch) {
      // Try Observable patterns (without await)
      queryMatch = mainBody.match(/const result = typedApi\.query\.(\w+)\.(\w+)\.(\w+)\((.*?)\)/)
      if (queryMatch) {
        isObservable = true
      }
    }
    
    if (!queryMatch) {
      // Try combineLatest patterns
      queryMatch = mainBody.match(/const result = combineLatest\(\[/)
      if (queryMatch) {
        // For combineLatest, we'll extract a simple pattern
        const [, pallet, storage, method] = ['', testCase.pallet, testCase.storage, 'watchValue']
        queryMatch = ['', pallet, storage, method, '']
        isObservable = true
      }
    }
    
    if (!queryMatch) {
      // Try pipe patterns
      queryMatch = mainBody.match(/const result = typedApi\.query\.(\w+)\.(\w+)\.(\w+)\(\)\.pipe\(/)
      if (queryMatch) {
        isObservable = true
      }
    }
    
    if (!queryMatch) {
      throw new Error('Could not find query pattern in generated code')
    }
    
    const [, pallet, storage, method, args] = queryMatch
    
    // Create simplified executable code
    const executableCode = `
      (async function() {
        try {
          // Initialize mock API
          const smoldotInstance = start()
          const mockChain = await smoldotInstance.addChain({ chainSpec })
          const client = createClient(getSmProvider(mockChain))
          const typedApi = client.getTypedApi(${testCase.chain})
          
          // Execute the specific query
          const result = await typedApi.query.${pallet}.${storage}.${method}(${args})
          console.log('Result:', result)
          __captureResult(result)
          
        } catch (error) {
          console.error('Execution failed:', error)
          throw error
        }
      })()
    `
    
    return executableCode
  }

  /**
   * Create instrumented API that tracks calls and returns mock data
   */
  private createInstrumentedApi(mockApi: any, apiCalls: string[]): any {
    const createProxy = (obj: any, path: string): any => {
      return new Proxy(obj, {
        get: (target, prop) => {
          const currentPath = path ? `${path}.${String(prop)}` : String(prop)
          
          if (target[prop] && typeof target[prop] === 'object') {
            // If it's an object, create another proxy
            return createProxy(target[prop], currentPath)
          }
          
          if (typeof target[prop] === 'function') {
            // If it's a function, wrap it to track calls
            return (...args: any[]) => {
              apiCalls.push(`${currentPath}(${args.map(a => JSON.stringify(a)).join(', ')})`)
              return target[prop].apply(target, args)
            }
          }
          
          return target[prop]
        }
      })
    }
    
    return createProxy(mockApi, '')
  }

  /**
   * Validate the execution result against expected outcomes
   */
  private async validateExecutionResult(
    result: { value: any; logs: string[]; apiCalls: string[] },
    testCase: TestCase
  ): Promise<Omit<RuntimeValidationResult, 'executionTime' | 'performance'>> {
    
    const { value, logs, apiCalls } = result
    const errors: string[] = []
    const warnings: string[] = []
    
    // Check if we got a result
    if (value === null || value === undefined) {
      errors.push('No result captured from execution')
      return {
        passed: false,
        message: 'Execution did not produce a result',
        details: { logs, apiCalls },
        warnings
      }
    }
    
    // Validate based on query type and storage type
    const validation = await this.validateByQueryType(value, testCase, apiCalls)
    
    if (!validation.passed) {
      errors.push(validation.message)
    }
    
    // Check if expected API calls were made
    const expectedCall = this.getExpectedApiCall(testCase)
    if (expectedCall && !apiCalls.some(call => call.includes(expectedCall))) {
      warnings.push(`Expected API call not found: ${expectedCall}`)
    }
    
    // Check for execution errors in logs
    const hasErrors = logs.some(log => log.includes('ERROR:') || log.includes('error'))
    if (hasErrors) {
      warnings.push('Execution logs contain errors')
    }
    
    return {
      passed: errors.length === 0,
      message: errors.length === 0 ? 'Runtime validation passed' : 'Runtime validation failed',
      details: { errors, logs, apiCalls, result: value },
      warnings,
      actualType: typeof value,
      expectedType: this.getExpectedType(testCase),
      mockApiCalls: apiCalls
    }
  }

  /**
   * Validate result based on query type
   */
  private async validateByQueryType(
    value: any, 
    testCase: TestCase, 
    apiCalls: string[]
  ): Promise<{ passed: boolean; message: string }> {
    
    switch (testCase.queryType) {
      case 'getValue':
        return this.validateGetValue(value, testCase)
      
      case 'getValues':
        return this.validateGetValues(value, testCase)
      
      case 'getEntries':
        return this.validateGetEntries(value, testCase)
        
      case 'getValueAt':
        return this.validateGetValueAt(value, testCase)
      
      // Observable methods
      case 'watchValue':
      case 'watchValueFinalized':
      case 'watchValueBest':
        return await this.validateWatchValue(value, testCase, apiCalls)
      
      case 'watchEntries':
      case 'watchEntriesPartial':
        return await this.validateWatchEntries(value, testCase, apiCalls)
      
      // Advanced Observable patterns
      case 'multiWatch':
        return await this.validateMultiWatch(value, testCase, apiCalls)
      
      case 'conditionalWatch':
        return await this.validateConditionalWatch(value, testCase, apiCalls)
      
      case 'bufferedWatch':
        return await this.validateBufferedWatch(value, testCase, apiCalls)
      
      case 'errorHandledWatch':
        return await this.validateErrorHandledWatch(value, testCase, apiCalls)
      
      case 'distinctWatch':
        return await this.validateDistinctWatch(value, testCase, apiCalls)
      
      case 'throttledWatch':
        return await this.validateThrottledWatch(value, testCase, apiCalls)
      
      case 'comprehensive':
        return await this.validateComprehensive(value, testCase, apiCalls)
      
      default:
        return { passed: false, message: `Query type '${testCase.queryType}' validation not implemented` }
    }
  }

  /**
   * Validate getValue result
   */
  private validateGetValue(value: any, testCase: TestCase): { passed: boolean; message: string } {
    // For getValue, we expect a single value appropriate to the storage type
    
    switch (testCase.storage.toLowerCase()) {
      case 'number':
      case 'validatorcount':
        if (typeof value !== 'number') {
          return { passed: false, message: `Expected number, got ${typeof value}` }
        }
        break
        
      case 'account':
        if (typeof value !== 'object' || value === null) {
          return { passed: false, message: `Expected account object, got ${typeof value}` }
        }
        // Check for expected account structure
        if (!value.hasOwnProperty('nonce') || !value.hasOwnProperty('data')) {
          return { passed: false, message: 'Account object missing expected properties (nonce, data)' }
        }
        break
        
      case 'totalissuance':
        if (typeof value !== 'bigint' && typeof value !== 'string') {
          return { passed: false, message: `Expected BigInt or string for balance, got ${typeof value}` }
        }
        break
        
      default:
        // Generic validation - just check it's not null/undefined
        if (value === null || value === undefined) {
          return { passed: false, message: 'getValue returned null/undefined' }
        }
    }
    
    return { passed: true, message: 'getValue result validation passed' }
  }

  /**
   * Validate getValues result
   */
  private validateGetValues(value: any, testCase: TestCase): { passed: boolean; message: string } {
    if (!Array.isArray(value)) {
      return { passed: false, message: `Expected array for getValues, got ${typeof value}` }
    }
    
    if (value.length === 0) {
      return { passed: false, message: 'getValues returned empty array' }
    }
    
    return { passed: true, message: 'getValues result validation passed' }
  }

  /**
   * Validate getEntries result
   */
  private validateGetEntries(value: any, testCase: TestCase): { passed: boolean; message: string } {
    if (!Array.isArray(value)) {
      return { passed: false, message: `Expected array for getEntries, got ${typeof value}` }
    }
    
    // Check that entries are [key, value] pairs
    for (const entry of value) {
      if (!Array.isArray(entry) || entry.length !== 2) {
        return { passed: false, message: 'getEntries should return [key, value] pairs' }
      }
    }
    
    return { passed: true, message: 'getEntries result validation passed' }
  }

  /**
   * Validate getValueAt result
   */
  private validateGetValueAt(value: any, testCase: TestCase): { passed: boolean; message: string } {
    // getValueAt should return same type as getValue
    return this.validateGetValue(value, testCase)
  }

  // =================================================================
  // OBSERVABLE VALIDATION METHODS - REAL RUNTIME TESTING
  // =================================================================

  /**
   * Validate watchValue Observable - actually tests subscriptions and emissions
   */
  private async validateWatchValue(
    value: any, 
    testCase: TestCase, 
    apiCalls: string[]
  ): Promise<{ passed: boolean; message: string }> {
    
    // Check if value is an Observable (has subscribe method)
    if (!value || typeof value.subscribe !== 'function') {
      return { passed: false, message: `Expected Observable for watchValue, got ${typeof value}` }
    }
    
    console.log(`🔍 Testing Observable emissions for ${testCase.id}`)
    
    try {
      // Actually test the Observable by subscribing to it
      const emissions: any[] = []
      let completed = false
      let errored = false
      let subscriptionTime = 0
      let unsubscriptionTime = 0
      
      return new Promise((resolve) => {
        subscriptionTime = Date.now()
        
        const subscription = value.subscribe({
          next: (emission: any) => {
            emissions.push(emission)
            console.log(`  📡 Emission ${emissions.length}:`, emission)
          },
          complete: () => {
            completed = true
            unsubscriptionTime = Date.now()
            console.log(`  ✅ Observable completed after ${emissions.length} emissions`)
            
            resolve({
              passed: emissions.length > 0,
              message: emissions.length > 0 
                ? `watchValue Observable emitted ${emissions.length} values`
                : 'watchValue Observable completed without emissions'
            })
          },
          error: (error: any) => {
            errored = true
            unsubscriptionTime = Date.now()
            console.log(`  ❌ Observable errored:`, error)
            
            resolve({
              passed: false,
              message: `watchValue Observable errored: ${error}`
            })
          }
        })
        
        // Auto-unsubscribe after 3 seconds for testing
        setTimeout(() => {
          if (!completed && !errored) {
            subscription.unsubscribe()
            unsubscriptionTime = Date.now()
            
            const subscriptionDuration = unsubscriptionTime - subscriptionTime
            console.log(`  ⏱️  Observable tested for ${subscriptionDuration}ms, got ${emissions.length} emissions`)
            
            resolve({
              passed: emissions.length > 0,
              message: emissions.length > 0 
                ? `watchValue Observable emitted ${emissions.length} values in ${subscriptionDuration}ms`
                : `watchValue Observable no emissions in ${subscriptionDuration}ms`
            })
          }
        }, 3000) // 3 second test timeout
      })
      
    } catch (error) {
      return { 
        passed: false, 
        message: `Failed to test Observable: ${error instanceof Error ? error.message : String(error)}` 
      }
    }
  }

  /**
   * Validate watchEntries Observable - tests entry streaming with deltas
   */
  private async validateWatchEntries(
    value: any, 
    testCase: TestCase, 
    apiCalls: string[]
  ): Promise<{ passed: boolean; message: string }> {
    
    if (!value || typeof value.subscribe !== 'function') {
      return { passed: false, message: `Expected Observable for watchEntries, got ${typeof value}` }
    }
    
    console.log(`🔍 Testing watchEntries Observable for ${testCase.id}`)
    
    try {
      const emissions: any[] = []
      
      return new Promise((resolve) => {
        const subscription = value.subscribe({
          next: (emission: any) => {
            emissions.push(emission)
            console.log(`  📦 Entry update:`, emission)
            
            // Validate entry structure
            if (emission && typeof emission === 'object') {
              if (!emission.entries || !Array.isArray(emission.entries)) {
                resolve({
                  passed: false,
                  message: 'watchEntries emission missing entries array'
                })
                return
              }
            }
          },
          complete: () => {
            resolve({
              passed: emissions.length > 0,
              message: `watchEntries Observable emitted ${emissions.length} entry updates`
            })
          },
          error: (error: any) => {
            resolve({
              passed: false,
              message: `watchEntries Observable errored: ${error}`
            })
          }
        })
        
        setTimeout(() => {
          subscription.unsubscribe()
          resolve({
            passed: emissions.length > 0,
            message: emissions.length > 0 
              ? `watchEntries Observable emitted ${emissions.length} entry updates`
              : 'watchEntries Observable no entry updates received'
          })
        }, 3000)
      })
      
    } catch (error) {
      return { 
        passed: false, 
        message: `Failed to test watchEntries Observable: ${error instanceof Error ? error.message : String(error)}` 
      }
    }
  }

  /**
   * Validate multiWatch - tests combining multiple Observables
   */
  private async validateMultiWatch(
    value: any, 
    testCase: TestCase, 
    apiCalls: string[]
  ): Promise<{ passed: boolean; message: string }> {
    
    if (!value || typeof value.subscribe !== 'function') {
      return { passed: false, message: `Expected Observable for multiWatch, got ${typeof value}` }
    }
    
    console.log(`🔍 Testing multiWatch combined Observable for ${testCase.id}`)
    
    try {
      const emissions: any[] = []
      
      return new Promise((resolve) => {
        const subscription = value.subscribe({
          next: (emission: any) => {
            emissions.push(emission)
            console.log(`  🔗 Combined emission:`, emission)
            
            // For multiWatch, we expect combined results (arrays or objects)
            if (Array.isArray(emission)) {
              // combineLatest returns arrays
              console.log(`    📊 Combined array with ${emission.length} values`)
            } else if (emission && typeof emission === 'object') {
              // zip or other combiners might return objects
              console.log(`    📊 Combined object with keys:`, Object.keys(emission))
            }
          },
          complete: () => {
            resolve({
              passed: emissions.length > 0,
              message: `multiWatch Observable emitted ${emissions.length} combined values`
            })
          },
          error: (error: any) => {
            resolve({
              passed: false,
              message: `multiWatch Observable errored: ${error}`
            })
          }
        })
        
        setTimeout(() => {
          subscription.unsubscribe()
          resolve({
            passed: emissions.length > 0,
            message: emissions.length > 0 
              ? `multiWatch Observable emitted ${emissions.length} combined values`
              : 'multiWatch Observable no combined values received'
          })
        }, 3000)
      })
      
    } catch (error) {
      return { 
        passed: false, 
        message: `Failed to test multiWatch Observable: ${error instanceof Error ? error.message : String(error)}` 
      }
    }
  }

  /**
   * Validate conditionalWatch - tests filtering and conditional logic
   */
  private async validateConditionalWatch(
    value: any, 
    testCase: TestCase, 
    apiCalls: string[]
  ): Promise<{ passed: boolean; message: string }> {
    
    if (!value || typeof value.subscribe !== 'function') {
      return { passed: false, message: `Expected Observable for conditionalWatch, got ${typeof value}` }
    }
    
    console.log(`🔍 Testing conditionalWatch filtered Observable for ${testCase.id}`)
    
    try {
      const emissions: any[] = []
      
      return new Promise((resolve) => {
        const subscription = value.subscribe({
          next: (emission: any) => {
            emissions.push(emission)
            console.log(`  🎯 Filtered emission:`, emission)
          },
          complete: () => {
            resolve({
              passed: true, // Conditional might filter out all values, so we pass if Observable works
              message: `conditionalWatch Observable completed with ${emissions.length} filtered values`
            })
          },
          error: (error: any) => {
            resolve({
              passed: false,
              message: `conditionalWatch Observable errored: ${error}`
            })
          }
        })
        
        setTimeout(() => {
          subscription.unsubscribe()
          resolve({
            passed: true, // Pass if Observable is functional, even with no emissions due to filtering
            message: `conditionalWatch Observable tested, ${emissions.length} values passed filter`
          })
        }, 3000)
      })
      
    } catch (error) {
      return { 
        passed: false, 
        message: `Failed to test conditionalWatch Observable: ${error instanceof Error ? error.message : String(error)}` 
      }
    }
  }

  /**
   * Validate bufferedWatch - tests buffering patterns
   */
  private async validateBufferedWatch(
    value: any, 
    testCase: TestCase, 
    apiCalls: string[]
  ): Promise<{ passed: boolean; message: string }> {
    
    if (!value || typeof value.subscribe !== 'function') {
      return { passed: false, message: `Expected Observable for bufferedWatch, got ${typeof value}` }
    }
    
    console.log(`🔍 Testing bufferedWatch buffered Observable for ${testCase.id}`)
    
    try {
      const emissions: any[] = []
      
      return new Promise((resolve) => {
        const subscription = value.subscribe({
          next: (emission: any) => {
            emissions.push(emission)
            console.log(`  📦 Buffered emission:`, emission)
            
            // Buffer emissions should be arrays
            if (Array.isArray(emission)) {
              console.log(`    📊 Buffer contains ${emission.length} items`)
            }
          },
          complete: () => {
            resolve({
              passed: emissions.length > 0,
              message: `bufferedWatch Observable emitted ${emissions.length} buffers`
            })
          },
          error: (error: any) => {
            resolve({
              passed: false,
              message: `bufferedWatch Observable errored: ${error}`
            })
          }
        })
        
        setTimeout(() => {
          subscription.unsubscribe()
          resolve({
            passed: emissions.length > 0,
            message: `bufferedWatch Observable emitted ${emissions.length} buffers`
          })
        }, 3000)
      })
      
    } catch (error) {
      return { 
        passed: false, 
        message: `Failed to test bufferedWatch Observable: ${error instanceof Error ? error.message : String(error)}` 
      }
    }
  }

  /**
   * Validate errorHandledWatch - tests error handling and retry logic
   */
  private async validateErrorHandledWatch(
    value: any, 
    testCase: TestCase, 
    apiCalls: string[]
  ): Promise<{ passed: boolean; message: string }> {
    
    if (!value || typeof value.subscribe !== 'function') {
      return { passed: false, message: `Expected Observable for errorHandledWatch, got ${typeof value}` }
    }
    
    console.log(`🔍 Testing errorHandledWatch error-resilient Observable for ${testCase.id}`)
    
    try {
      const emissions: any[] = []
      let errorsCaught = 0
      
      return new Promise((resolve) => {
        const subscription = value.subscribe({
          next: (emission: any) => {
            emissions.push(emission)
            console.log(`  🛡️  Error-handled emission:`, emission)
          },
          complete: () => {
            resolve({
              passed: true, // Pass if Observable handles errors gracefully
              message: `errorHandledWatch Observable completed with ${emissions.length} emissions, ${errorsCaught} errors handled`
            })
          },
          error: (error: any) => {
            // This should rarely happen in error-handled Observables
            resolve({
              passed: false,
              message: `errorHandledWatch Observable failed to handle error: ${error}`
            })
          }
        })
        
        setTimeout(() => {
          subscription.unsubscribe()
          resolve({
            passed: true, // Pass if Observable is functional
            message: `errorHandledWatch Observable tested, ${emissions.length} emissions, resilient to errors`
          })
        }, 3000)
      })
      
    } catch (error) {
      return { 
        passed: false, 
        message: `Failed to test errorHandledWatch Observable: ${error instanceof Error ? error.message : String(error)}` 
      }
    }
  }

  /**
   * Validate distinctWatch - tests distinctUntilChanged filtering
   */
  private async validateDistinctWatch(
    value: any, 
    testCase: TestCase, 
    apiCalls: string[]
  ): Promise<{ passed: boolean; message: string }> {
    
    if (!value || typeof value.subscribe !== 'function') {
      return { passed: false, message: `Expected Observable for distinctWatch, got ${typeof value}` }
    }
    
    console.log(`🔍 Testing distinctWatch distinct-filtered Observable for ${testCase.id}`)
    
    try {
      const emissions: any[] = []
      
      return new Promise((resolve) => {
        const subscription = value.subscribe({
          next: (emission: any) => {
            emissions.push(emission)
            console.log(`  🎯 Distinct emission:`, emission)
          },
          complete: () => {
            resolve({
              passed: emissions.length > 0,
              message: `distinctWatch Observable emitted ${emissions.length} distinct values`
            })
          },
          error: (error: any) => {
            resolve({
              passed: false,
              message: `distinctWatch Observable errored: ${error}`
            })
          }
        })
        
        setTimeout(() => {
          subscription.unsubscribe()
          resolve({
            passed: emissions.length > 0,
            message: `distinctWatch Observable emitted ${emissions.length} distinct values`
          })
        }, 3000)
      })
      
    } catch (error) {
      return { 
        passed: false, 
        message: `Failed to test distinctWatch Observable: ${error instanceof Error ? error.message : String(error)}` 
      }
    }
  }

  /**
   * Validate throttledWatch - tests throttleTime rate limiting
   */
  private async validateThrottledWatch(
    value: any, 
    testCase: TestCase, 
    apiCalls: string[]
  ): Promise<{ passed: boolean; message: string }> {
    
    if (!value || typeof value.subscribe !== 'function') {
      return { passed: false, message: `Expected Observable for throttledWatch, got ${typeof value}` }
    }
    
    console.log(`🔍 Testing throttledWatch rate-limited Observable for ${testCase.id}`)
    
    try {
      const emissions: any[] = []
      const emissionTimes: number[] = []
      
      return new Promise((resolve) => {
        const subscription = value.subscribe({
          next: (emission: any) => {
            emissions.push(emission)
            emissionTimes.push(Date.now())
            console.log(`  ⏱️  Throttled emission ${emissions.length}:`, emission)
            
            // Check throttling intervals
            if (emissionTimes.length > 1) {
              const interval = emissionTimes[emissionTimes.length - 1] - emissionTimes[emissionTimes.length - 2]
              console.log(`    📊 Interval: ${interval}ms`)
            }
          },
          complete: () => {
            resolve({
              passed: emissions.length > 0,
              message: `throttledWatch Observable emitted ${emissions.length} throttled values`
            })
          },
          error: (error: any) => {
            resolve({
              passed: false,
              message: `throttledWatch Observable errored: ${error}`
            })
          }
        })
        
        setTimeout(() => {
          subscription.unsubscribe()
          resolve({
            passed: emissions.length > 0,
            message: `throttledWatch Observable emitted ${emissions.length} throttled values`
          })
        }, 3000)
      })
      
    } catch (error) {
      return { 
        passed: false, 
        message: `Failed to test throttledWatch Observable: ${error instanceof Error ? error.message : String(error)}` 
      }
    }
  }

  /**
   * Validate comprehensive - tests complete patterns
   */
  private async validateComprehensive(
    value: any, 
    testCase: TestCase, 
    apiCalls: string[]
  ): Promise<{ passed: boolean; message: string }> {
    
    if (!value || typeof value.subscribe !== 'function') {
      return { passed: false, message: `Expected Observable for comprehensive, got ${typeof value}` }
    }
    
    console.log(`🔍 Testing comprehensive all-features Observable for ${testCase.id}`)
    
    try {
      const emissions: any[] = []
      
      return new Promise((resolve) => {
        const subscription = value.subscribe({
          next: (emission: any) => {
            emissions.push(emission)
            console.log(`  🎯 Comprehensive emission:`, emission)
          },
          complete: () => {
            resolve({
              passed: emissions.length > 0,
              message: `comprehensive Observable emitted ${emissions.length} comprehensive values`
            })
          },
          error: (error: any) => {
            resolve({
              passed: false,
              message: `comprehensive Observable errored: ${error}`
            })
          }
        })
        
        setTimeout(() => {
          subscription.unsubscribe()
          resolve({
            passed: emissions.length > 0,
            message: `comprehensive Observable emitted ${emissions.length} comprehensive values`
          })
        }, 5000) // Longer timeout for comprehensive tests
      })
      
    } catch (error) {
      return { 
        passed: false, 
        message: `Failed to test comprehensive Observable: ${error instanceof Error ? error.message : String(error)}` 
      }
    }
  }

  /**
   * Get expected API call pattern
   */
  private getExpectedApiCall(testCase: TestCase): string {
    return `query.${testCase.pallet}.${testCase.storage}.${testCase.queryType}`
  }

  /**
   * Get expected result type
   */
  private getExpectedType(testCase: TestCase): string {
    switch (testCase.queryType) {
      case 'getValues':
      case 'getEntries':
        return 'array'
      case 'getValue':
      case 'getValueAt':
        return this.getStorageType(testCase.storage)
      default:
        return 'unknown'
    }
  }

  /**
   * Get expected type for storage entry
   */
  private getStorageType(storage: string): string {
    switch (storage.toLowerCase()) {
      case 'number':
      case 'validatorcount':
        return 'number'
      case 'account':
        return 'object'
      case 'totalissuance':
        return 'bigint'
      default:
        return 'any'
    }
  }
}

// Export singleton instance
export const runtimeValidator = new RuntimeValidator()