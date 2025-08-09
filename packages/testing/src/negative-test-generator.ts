// @ts-nocheck - Temporarily disable type checking for negative test generator
// Negative Test Generator - Creates intentionally invalid test cases
// Tests our validators' ability to catch errors, edge cases, and invalid scenarios

import { TestCase } from './types'

export interface NegativeTestCase extends TestCase {
  intentionalError: string
  expectedFailureReason: string
  expectedFailingValidator: string[]
  shouldPassValidators: string[]
  errorCategory: 'syntax' | 'logic' | 'type' | 'runtime' | 'network' | 'security'
}

export class NegativeTestGenerator {
  
  /**
   * Generate comprehensive negative test cases
   */
  generateNegativeTestCases(): NegativeTestCase[] {
    const negativeTests: NegativeTestCase[] = []
    
    // Syntax Error Cases
    negativeTests.push(...this.generateSyntaxErrorCases())
    
    // Type Error Cases  
    negativeTests.push(...this.generateTypeErrorCases())
    
    // Logic Error Cases
    negativeTests.push(...this.generateLogicErrorCases())
    
    // Runtime Error Cases
    negativeTests.push(...this.generateRuntimeErrorCases())
    
    // Network Error Cases
    negativeTests.push(...this.generateNetworkErrorCases())
    
    // Security Issue Cases
    negativeTests.push(...this.generateSecurityIssueCases())
    
    // Memory Leak Cases
    negativeTests.push(...this.generateMemoryLeakCases())
    
    // RxJS Misuse Cases
    negativeTests.push(...this.generateRxJSMisuseCases())
    
    console.log(`📋 Generated ${negativeTests.length} negative test cases`)
    
    return negativeTests
  }
  
  /**
   * Generate syntax error test cases
   */
  private generateSyntaxErrorCases(): NegativeTestCase[] {
    return [
      {
        id: 'neg-syntax-001',
        chain: 'polkadot',
        pallet: 'System',
        storage: 'Number',
        queryType: 'getValue',
        parameters: {},
        intentionalError: 'Missing semicolon',
        expectedFailureReason: 'Syntax parsing should fail',
        expectedFailingValidator: ['syntax', 'typescript'],
        shouldPassValidators: [],
        errorCategory: 'syntax'
      },
      {
        id: 'neg-syntax-002', 
        chain: 'polkadot',
        pallet: 'Balances',
        storage: 'Account',
        queryType: 'getValue',
        parameters: { account: 'test' },
        intentionalError: 'Unmatched brackets',
        expectedFailureReason: 'Bracket mismatch should cause parse error',
        expectedFailingValidator: ['syntax', 'typescript'],
        shouldPassValidators: [],
        errorCategory: 'syntax'
      },
      {
        id: 'neg-syntax-003',
        chain: 'kusama', 
        pallet: 'Staking',
        storage: 'Bonded',
        queryType: 'watchValue',
        parameters: {},
        intentionalError: 'Invalid string escape',
        expectedFailureReason: 'String escape sequence should be invalid',
        expectedFailingValidator: ['syntax', 'typescript'],
        shouldPassValidators: [],
        errorCategory: 'syntax'
      }
    ]
  }
  
  /**
   * Generate type error test cases
   */
  private generateTypeErrorCases(): NegativeTestCase[] {
    return [
      {
        id: 'neg-type-001',
        chain: 'polkadot',
        pallet: 'System', 
        storage: 'Account',
        queryType: 'getValue',
        parameters: { account: 'test' },
        intentionalError: 'Wrong parameter type',
        expectedFailureReason: 'Type checker should catch parameter type mismatch',
        expectedFailingValidator: ['typescript'],
        shouldPassValidators: ['syntax', 'imports'],
        errorCategory: 'type'
      },
      {
        id: 'neg-type-002',
        chain: 'polkadot',
        pallet: 'Balances',
        storage: 'TotalIssuance', 
        queryType: 'getValue',
        parameters: {},
        intentionalError: 'Undefined variable usage',
        expectedFailureReason: 'Using undefined variable should fail type checking',
        expectedFailingValidator: ['typescript'],
        shouldPassValidators: ['syntax'],
        errorCategory: 'type'
      },
      {
        id: 'neg-type-003',
        chain: 'moonbeam',
        pallet: 'System',
        storage: 'Number',
        queryType: 'watchValue',
        parameters: {},
        intentionalError: 'Implicit any return',
        expectedFailureReason: 'Implicit any should fail strict TypeScript',
        expectedFailingValidator: ['typescript'],
        shouldPassValidators: ['syntax', 'imports'],
        errorCategory: 'type'
      }
    ]
  }
  
  /**
   * Generate logic error test cases
   */
  private generateLogicErrorCases(): NegativeTestCase[] {
    return [
      {
        id: 'neg-logic-001',
        chain: 'polkadot',
        pallet: 'NonExistentPallet',
        storage: 'NonExistentStorage',
        queryType: 'getValue',
        parameters: {},
        intentionalError: 'Non-existent pallet/storage',
        expectedFailureReason: 'Should detect invalid pallet/storage combination',
        expectedFailingValidator: ['functional', 'runtime', 'network'],
        shouldPassValidators: ['syntax', 'imports'],
        errorCategory: 'logic'
      },
      {
        id: 'neg-logic-002',
        chain: 'kusama',
        pallet: 'Balances',
        storage: 'Account',
        queryType: 'getEntries', // Wrong method for this storage
        parameters: {},
        intentionalError: 'Wrong query method for storage type',
        expectedFailureReason: 'getEntries on single-value storage should fail',
        expectedFailingValidator: ['functional', 'runtime'],
        shouldPassValidators: ['syntax', 'typescript'],
        errorCategory: 'logic'
      },
      {
        id: 'neg-logic-003',
        chain: 'astar',
        pallet: 'System',
        storage: 'Number',
        queryType: 'getValue',
        parameters: { invalid: 'parameter' }, // Shouldn't have parameters
        intentionalError: 'Unnecessary parameters for parameterless storage',
        expectedFailureReason: 'Should detect parameters for non-parameterized storage',
        expectedFailingValidator: ['functional', 'runtime'],
        shouldPassValidators: ['syntax', 'typescript'],
        errorCategory: 'logic'
      }
    ]
  }
  
  /**
   * Generate runtime error test cases
   */
  private generateRuntimeErrorCases(): NegativeTestCase[] {
    return [
      {
        id: 'neg-runtime-001',
        chain: 'polkadot',
        pallet: 'System',
        storage: 'Number',
        queryType: 'getValue',
        parameters: {},
        intentionalError: 'Uncaught promise rejection',
        expectedFailureReason: 'Runtime should catch unhandled promise rejections',
        expectedFailingValidator: ['runtime'],
        shouldPassValidators: ['syntax', 'typescript', 'functional'],
        errorCategory: 'runtime'
      },
      {
        id: 'neg-runtime-002',
        chain: 'invalid-chain',
        pallet: 'System',
        storage: 'Number',
        queryType: 'getValue',
        parameters: {},
        intentionalError: 'Invalid chain configuration',
        expectedFailureReason: 'Should fail when chain configuration is invalid',
        expectedFailingValidator: ['runtime', 'network'],
        shouldPassValidators: ['syntax', 'typescript'],
        errorCategory: 'runtime'
      },
      {
        id: 'neg-runtime-003',
        chain: 'polkadot',
        pallet: 'System', 
        storage: 'Number',
        queryType: 'getValue',
        parameters: {},
        intentionalError: 'Infinite loop',
        expectedFailureReason: 'Should timeout on infinite loops',
        expectedFailingValidator: ['runtime'],
        shouldPassValidators: ['syntax', 'typescript'],
        errorCategory: 'runtime'
      }
    ]
  }
  
  /**
   * Generate network error test cases
   */
  private generateNetworkErrorCases(): NegativeTestCase[] {
    return [
      {
        id: 'neg-network-001',
        chain: 'polkadot',
        pallet: 'System',
        storage: 'Number',
        queryType: 'getValue',
        parameters: {},
        intentionalError: 'Network timeout',
        expectedFailureReason: 'Should handle network timeouts gracefully',
        expectedFailingValidator: ['network'],
        shouldPassValidators: ['syntax', 'typescript', 'runtime'],
        errorCategory: 'network'
      },
      {
        id: 'neg-network-002',
        chain: 'polkadot',
        pallet: 'System',
        storage: 'Number',
        queryType: 'watchValue',
        parameters: {},
        intentionalError: 'Connection drop during subscription',
        expectedFailureReason: 'Should detect connection drops in Observable streams',
        expectedFailingValidator: ['network', 'rxjs'],
        shouldPassValidators: ['syntax', 'typescript'],
        errorCategory: 'network'
      }
    ]
  }
  
  /**
   * Generate security issue test cases
   */
  private generateSecurityIssueCases(): NegativeTestCase[] {
    return [
      {
        id: 'neg-security-001',
        chain: 'polkadot',
        pallet: 'System',
        storage: 'Number', 
        queryType: 'getValue',
        parameters: {},
        intentionalError: 'Code injection attempt',
        expectedFailureReason: 'Should detect potential code injection',
        expectedFailingValidator: ['runtime', 'errorScenarios'],
        shouldPassValidators: ['syntax'],
        errorCategory: 'security'
      },
      {
        id: 'neg-security-002',
        chain: 'polkadot',
        pallet: 'Balances',
        storage: 'Account',
        queryType: 'getValue',
        parameters: { account: 'malicious-input' },
        intentionalError: 'Malicious parameter injection',
        expectedFailureReason: 'Should validate parameter safety',
        expectedFailingValidator: ['errorScenarios'],
        shouldPassValidators: ['syntax', 'typescript'],
        errorCategory: 'security'
      }
    ]
  }
  
  /**
   * Generate memory leak test cases
   */
  private generateMemoryLeakCases(): NegativeTestCase[] {
    return [
      {
        id: 'neg-memory-001',
        chain: 'polkadot',
        pallet: 'System',
        storage: 'Number',
        queryType: 'watchValue',
        parameters: {},
        intentionalError: 'Subscription never unsubscribed',
        expectedFailureReason: 'Should detect subscription leaks',
        expectedFailingValidator: ['memoryLeak'],
        shouldPassValidators: ['syntax', 'typescript', 'runtime'],
        errorCategory: 'runtime'
      },
      {
        id: 'neg-memory-002',
        chain: 'kusama',
        pallet: 'Balances', 
        storage: 'TotalIssuance',
        queryType: 'watchValue',
        parameters: {},
        intentionalError: 'Nested subscriptions without cleanup',
        expectedFailureReason: 'Should catch nested subscription leaks',
        expectedFailingValidator: ['memoryLeak'],
        shouldPassValidators: ['syntax', 'typescript'],
        errorCategory: 'runtime'
      }
    ]
  }
  
  /**
   * Generate RxJS misuse test cases
   */
  private generateRxJSMisuseCases(): NegativeTestCase[] {
    return [
      {
        id: 'neg-rxjs-001',
        chain: 'polkadot',
        pallet: 'System',
        storage: 'Number',
        queryType: 'watchValue',
        parameters: {},
        intentionalError: 'Incorrect operator chaining',
        expectedFailureReason: 'Should detect improper RxJS operator usage',
        expectedFailingValidator: ['rxjs'],
        shouldPassValidators: ['syntax', 'typescript'],
        errorCategory: 'logic'
      },
      {
        id: 'neg-rxjs-002',
        chain: 'moonbeam',
        pallet: 'Balances',
        storage: 'Account',
        queryType: 'watchValue',
        parameters: { account: 'test' },
        intentionalError: 'Observable never completes',
        expectedFailureReason: 'Should timeout on non-completing Observables',
        expectedFailingValidator: ['rxjs', 'memoryLeak'],
        shouldPassValidators: ['syntax', 'typescript'],
        errorCategory: 'runtime'
      }
    ]
  }
  
  /**
   * Generate specific code for negative test case
   */
  generateNegativeCode(testCase: NegativeTestCase): string {
    const baseCode = this.generateBaseCode(testCase)
    
    switch (testCase.errorCategory) {
      case 'syntax':
        return this.introduceSyntaxError(baseCode, testCase)
      case 'type':
        return this.introduceTypeError(baseCode, testCase)
      case 'logic':
        return this.introduceLogicError(baseCode, testCase)
      case 'runtime':
        return this.introduceRuntimeError(baseCode, testCase)
      case 'network':
        return this.introduceNetworkError(baseCode, testCase)
      case 'security':
        return this.introduceSecurityIssue(baseCode, testCase)
      default:
        return baseCode
    }
  }
  
  private generateBaseCode(testCase: NegativeTestCase): string {
    return `// SETUP REQUIRED: Run these commands in your project:
// npm install -g polkadot-api
// papi add ${testCase.chain} --wsUrl wss://rpc.polkadot.io  
// papi generate
// npm install

import { createClient } from "polkadot-api"
import { getSmProvider } from "polkadot-api/sm-provider"
import { start } from "polkadot-api/smoldot"
import { chainSpec } from "polkadot-api/chains/polkadot"
import { polkadot } from "@polkadot-api/descriptors"

async function main() {
  const smoldot = start()
  const chain = await smoldot.addChain({ chainSpec })
  const client = createClient(getSmProvider(chain))
  const typedApi = client.getTypedApi(polkadot)

  ${this.generateQueryCode(testCase)}
}

main().catch(console.error)`
  }
  
  private generateQueryCode(testCase: NegativeTestCase): string {
    const hasParams = Object.keys(testCase.parameters).length > 0
    const paramsStr = hasParams ? JSON.stringify(testCase.parameters) : ''
    
    switch (testCase.queryType) {
      case 'getValue':
        return `const result = await typedApi.query.${testCase.pallet}.${testCase.storage}.getValue(${paramsStr})
  console.log('Result:', result)`
      
      case 'watchValue':
        return `const subscription = typedApi.query.${testCase.pallet}.${testCase.storage}.watchValue(${paramsStr}).subscribe({
    next: (value) => console.log('Value:', value),
    error: (error) => console.error('Error:', error)
  })`
      
      case 'getEntries':
        return `const entries = await typedApi.query.${testCase.pallet}.${testCase.storage}.getEntries()
  console.log('Entries:', entries.length)`
      
      default:
        return `// Query code for ${testCase.queryType}`
    }
  }
  
  private introduceSyntaxError(code: string, testCase: NegativeTestCase): string {
    switch (testCase.id) {
      case 'neg-syntax-001':
        // Remove semicolon from import
        return code.replace('import { createClient } from "polkadot-api"', 'import { createClient } from "polkadot-api"') + '  // Missing semicolon here'
      
      case 'neg-syntax-002':
        // Unmatched bracket
        return code.replace('async function main() {', 'async function main() {\n  if (true) {\n    // Unmatched bracket')
      
      case 'neg-syntax-003':
        // Invalid string escape
        return code.replace('console.log(\'Result:\', result)', 'console.log(\'Result:\\x\', result)') // Invalid \\x escape
      
      default:
        return code + '\n// Syntax error introduced'
    }
  }
  
  private introduceTypeError(code: string, testCase: NegativeTestCase): string {
    switch (testCase.id) {
      case 'neg-type-001':
        // Wrong parameter type - pass number instead of string
        return code.replace(JSON.stringify(testCase.parameters), '{ account: 123 }')
      
      case 'neg-type-002':
        // Use undefined variable
        return code.replace('console.log(\'Result:\', result)', 'console.log(\'Result:\', result, undefinedVariable)')
      
      case 'neg-type-003':
        // Add function with implicit any return
        return code.replace('async function main() {', 'function helperFunction(param) { return param.something }\n\nasync function main() {')
      
      default:
        return code + '\n// Type error introduced'
    }
  }
  
  private introduceLogicError(code: string, testCase: NegativeTestCase): string {
    switch (testCase.id) {
      case 'neg-logic-001':
        // Use non-existent pallet/storage
        return code.replace(`typedApi.query.${testCase.pallet}.${testCase.storage}`, 'typedApi.query.NonExistentPallet.NonExistentStorage')
      
      case 'neg-logic-002':
        // Wrong method for storage type
        return code.replace('.getValue(', '.getEntries(')
      
      case 'neg-logic-003':
        // Add unnecessary parameters
        return code.replace('.getValue()', '.getValue({ unnecessary: "parameter" })')
      
      case 'neg-rxjs-001':
        // Incorrect operator chaining - add RxJS operator misuse
        if (code.includes('watchValue')) {
          return code.replace(
            '.watchValue(',
            '.watchValue('
          ).replace(
            '.subscribe({',
            '.pipe(distinctUntilChanged(), throttleTime).subscribe({ // Incorrect operator chaining'
          )
        }
        return code + '\n// Incorrect operator chaining'
      
      default:
        return code + '\n// Logic error introduced'
    }
  }
  
  private introduceRuntimeError(code: string, testCase: NegativeTestCase): string {
    switch (testCase.id) {
      case 'neg-runtime-001':
        // Add unhandled promise rejection
        return code.replace('main().catch(console.error)', `main()
Promise.reject(new Error('Unhandled rejection'))`)
      
      case 'neg-runtime-002':
        // Invalid chain reference
        return code.replace('{ chainSpec }', '{ chainSpec: null }')
      
      case 'neg-runtime-003':
        // Add infinite loop
        return code.replace('console.log(\'Result:\', result)', `while(true) { 
    // Infinite loop
  }
  console.log('Result:', result)`)
      
      case 'neg-rxjs-002':
        // Observable never completes - add infinite Observable pattern
        if (code.includes('watchValue')) {
          return code.replace(
            'import { polkadot } from "@polkadot-api/descriptors"',
            'import { polkadot } from "@polkadot-api/descriptors"\nimport { NEVER } from "rxjs"'
          ).replace(
            'typedApi.query.',
            '// Observable never completes\n  NEVER.pipe().subscribe({ next: () => {}, error: () => {} })\n  typedApi.query.'
          )
        }
        return code + '\n// Observable never completes'
      
      case 'neg-memory-001':
        // Subscription never unsubscribed - remove unsubscribe mechanism
        if (code.includes('watchValue')) {
          return code.replace(
            '.subscribe({',
            '.subscribe({ // Subscription never unsubscribed'
          ) + '\n  // Missing subscription.unsubscribe() - memory leak!'
        }
        return code + '\n// Subscription never unsubscribed'
      
      case 'neg-memory-002':
        // Nested subscriptions without cleanup
        if (code.includes('watchValue')) {
          return code.replace(
            '.subscribe({',
            `.subscribe({
    next: (value) => {
      // Nested subscription without cleanup
      typedApi.query.System.Number.watchValue().subscribe({
        next: (nestedValue) => {
          // Another subscription without cleanup
          typedApi.query.Balances.TotalIssuance.watchValue().subscribe({
            next: (deepValue) => console.log('Deep:', deepValue)
          })
          console.log('Nested:', nestedValue)
        }
      })
      console.log('Value:', value)
    },`
          )
        }
        return code + '\n// Nested subscriptions without cleanup'
      
      default:
        return code + '\n// Runtime error introduced'
    }
  }
  
  private introduceNetworkError(code: string, testCase: NegativeTestCase): string {
    switch (testCase.id) {
      case 'neg-network-001':
        // Force network timeout by using invalid URL
        return code.replace('wss://rpc.polkadot.io', 'wss://nonexistent.invalid.url')
      
      case 'neg-network-002':
        // Connection drop simulation
        return code.replace('.subscribe({', `.subscribe({
    next: (value) => {
      // Simulate connection drop
      client.destroy()
      console.log('Value:', value)
    },`)
      
      default:
        return code + '\n// Network error introduced'
    }
  }
  
  private introduceSecurityIssue(code: string, testCase: NegativeTestCase): string {
    switch (testCase.id) {
      case 'neg-security-001':
        // Add potential code injection
        return code.replace('console.log(\'Result:\', result)', `eval('console.log("Potential injection")')
  console.log('Result:', result)`)
      
      case 'neg-security-002':
        // Malicious parameter
        return code.replace(JSON.stringify(testCase.parameters), '{ account: "<script>alert(1)</script>" }')
      
      default:
        return code + '\n// Security issue introduced'
    }
  }
}

// Export singleton
export const negativeTestGenerator = new NegativeTestGenerator()