// Complete Real Validation Pipeline Test
// Tests the entire transformation from mock-based to real blockchain validation

import { TestRunner } from './test-runner'
import { TestCase } from './types'
import { realBlockchainValidator } from './real-blockchain-validator'
import { realStorageQueries } from './real-storage-queries'
import { realDescriptorValidator } from './real-descriptor-validator'
import { realRuntimeValidator } from './real-runtime-validator'

/**
 * Comprehensive test to validate that all mocking has been eliminated
 * and the entire pipeline uses real blockchain connections
 */
export class CompleteRealPipelineTest {
  
  /**
   * Test the complete validation pipeline with a simple System.Number query
   */
  async testSystemNumberQuery(): Promise<any> {
    console.log('🧪 COMPLETE REAL PIPELINE TEST: System.Number')
    console.log('===============================================')
    
    const testCase: TestCase = {
      id: 'pipeline-test-system-number',
      chain: 'polkadot',
      pallet: 'System',
      storage: 'Number',
      queryType: 'getValue',
      parameters: {},
      expectedPattern: 'number',
      shouldSucceed: true,
      validationRules: [],
      category: 'basic',
      estimatedDuration: 10000
    }
    
    try {
      // 1. Test Real Blockchain Validator
      console.log('\n🔗 1. Testing Real Blockchain Validator...')
      const blockchainResult = await realBlockchainValidator.validateRealBlockchainQuery()
      console.log(`   Result: ${blockchainResult.passed ? '✅ PASSED' : '❌ FAILED'}`)
      console.log(`   Message: ${blockchainResult.message}`)
      if (blockchainResult.blockNumber) {
        console.log(`   Block Number: ${blockchainResult.blockNumber}`)
      }
      
      // 2. Test Real Storage Queries
      console.log('\n📊 2. Testing Real Storage Queries...')
      const storageResult = await realStorageQueries.querySystemNumber()
      console.log(`   Result: ${storageResult.success ? '✅ PASSED' : '❌ FAILED'}`)
      console.log(`   Query Type: ${storageResult.queryType}`)
      if (storageResult.blockNumber) {
        console.log(`   Block Number: ${storageResult.blockNumber}`)
      }
      
      // 3. Test Real Descriptor Validator
      console.log('\n📦 3. Testing Real Descriptor Validator...')
      const descriptorResult = await realDescriptorValidator.validateDescriptorWorkflow(testCase)
      console.log(`   Result: ${descriptorResult.passed ? '✅ PASSED' : '❌ FAILED'}`)
      console.log(`   Message: ${descriptorResult.message}`)
      if (descriptorResult.descriptorInfo) {
        console.log(`   Descriptor loaded: ${descriptorResult.descriptorInfo.descriptorLoaded ? '✅' : '❌'}`)
        console.log(`   Pallet found: ${descriptorResult.descriptorInfo.palletFound ? '✅' : '❌'}`)
        console.log(`   Storage found: ${descriptorResult.descriptorInfo.storageFound ? '✅' : '❌'}`)
      }
      
      // 4. Test Real Runtime Validator
      console.log('\n🚀 4. Testing Real Runtime Validator...')
      const sampleCode = `
// SETUP REQUIRED: Run these commands in your project:
// npm install -g polkadot-api
// papi add polkadot --wsUrl wss://rpc.polkadot.io
// papi generate
// npm install

import { createClient } from "polkadot-api"
import { getSmProvider } from "polkadot-api/sm-provider"
import { start } from "polkadot-api/smoldot"
import { chainSpec } from "polkadot-api/chains/polkadot"
import { polkadot } from "@polkadot-api/descriptors"

async function main() {
  // Initialize the client and connect
  const smoldot = start()
  const chain = await smoldot.addChain({ chainSpec })
  const client = createClient(getSmProvider(chain))
  const typedApi = client.getTypedApi(polkadot)

  // Get single storage value
  const result = await typedApi.query.System.Number.getValue()
  console.log('Result:', result)
}

main().catch(console.error)
      `
      
      const runtimeResult = await realRuntimeValidator.executeAndValidateWithPreCheck(sampleCode, testCase)
      console.log(`   Result: ${runtimeResult.passed ? '✅ PASSED' : '❌ FAILED'}`)
      console.log(`   Message: ${runtimeResult.message}`)
      
      // 5. Test Complete Test Runner Pipeline
      console.log('\n🏃 5. Testing Complete Test Runner Pipeline...')
      const testRunner = new TestRunner({
        parallel: false,
        batchSize: 1,
        timeout: 60000, // 60 second timeout for real blockchain operations
        chains: ['polkadot'],
        categories: ['basic'],
        verbose: true
      })
      
      const pipelineResult = await testRunner.runSingleTest(testCase)
      console.log(`   Overall Result: ${pipelineResult.overallPassed ? '✅ PASSED' : '❌ FAILED'}`)
      console.log(`   Execution Time: ${pipelineResult.totalExecutionTime}ms`)
      
      // Count validation layers
      const validationResults = pipelineResult.validationResults
      const totalValidations = Object.keys(validationResults).length
      const passedValidations = Object.values(validationResults).filter(v => v.passed).length
      console.log(`   Validation Layers: ${passedValidations}/${totalValidations} passed`)
      
      // List validation results
      for (const [layer, result] of Object.entries(validationResults)) {
        const status = result.passed ? '✅' : '❌'
        console.log(`     ${layer}: ${status} ${result.message}`)
      }
      
      // 6. Final Summary
      console.log('\n📋 PIPELINE TEST SUMMARY')
      console.log('========================')
      
      const allResults = [
        { name: 'Real Blockchain Validator', passed: blockchainResult.passed },
        { name: 'Real Storage Queries', passed: storageResult.success },
        { name: 'Real Descriptor Validator', passed: descriptorResult.passed },
        { name: 'Real Runtime Validator', passed: runtimeResult.passed },
        { name: 'Complete Test Runner Pipeline', passed: pipelineResult.overallPassed }
      ]
      
      const passedComponents = allResults.filter(r => r.passed).length
      const totalComponents = allResults.length
      
      console.log(`Overall Success Rate: ${passedComponents}/${totalComponents} components passed`)
      
      for (const result of allResults) {
        const status = result.passed ? '✅' : '❌'
        console.log(`  ${status} ${result.name}`)
      }
      
      const overallSuccess = passedComponents === totalComponents
      console.log(`\n🎯 FINAL RESULT: ${overallSuccess ? '✅ ALL REAL - NO MOCKING!' : '❌ Some components failed'}`)
      
      return {
        success: overallSuccess,
        passedComponents,
        totalComponents,
        results: allResults,
        validationLayers: totalValidations,
        passedValidationLayers: passedValidations,
        details: {
          blockchain: blockchainResult,
          storage: storageResult,
          descriptor: descriptorResult,
          runtime: runtimeResult,
          pipeline: pipelineResult
        }
      }
      
    } catch (error) {
      console.log(`\n❌ PIPELINE TEST FAILED: ${error instanceof Error ? error.message : String(error)}`)
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error)
      }
    }
  }
  
  /**
   * Test multiple query types to ensure comprehensive real validation
   */
  async testMultipleQueryTypes(): Promise<any> {
    console.log('\n🧪 TESTING MULTIPLE QUERY TYPES')
    console.log('================================')
    
    const queryTypes = ['getValue', 'watchValue'] // Start with safe query types
    const results = []
    
    for (const queryType of queryTypes) {
      console.log(`\n📊 Testing queryType: ${queryType}`)
      
      const testCase: TestCase = {
        id: `pipeline-test-${queryType}`,
        chain: 'polkadot',
        pallet: 'System',
        storage: 'Number',
        queryType,
        parameters: {},
        expectedPattern: 'number',
        shouldSucceed: true,
        validationRules: [],
        category: 'basic',
        estimatedDuration: 5000
      }
      
      try {
        // Test with real storage queries
        const storageResult = await realStorageQueries.querySystemNumber()
        
        // Test with descriptor validator
        const descriptorResult = await realDescriptorValidator.validateDescriptorWorkflow(testCase)
        
        const result = {
          queryType,
          storage: storageResult.success,
          descriptor: descriptorResult.passed,
          overall: storageResult.success && descriptorResult.passed
        }
        
        results.push(result)
        console.log(`  Result: ${result.overall ? '✅ PASSED' : '❌ FAILED'}`)
        
      } catch (error) {
        console.log(`  Result: ❌ FAILED - ${error instanceof Error ? error.message : String(error)}`)
        results.push({
          queryType,
          storage: false,
          descriptor: false,
          overall: false,
          error: error instanceof Error ? error.message : String(error)
        })
      }
    }
    
    const passedQueries = results.filter(r => r.overall).length
    console.log(`\n📊 Query Type Summary: ${passedQueries}/${results.length} passed`)
    
    return {
      success: passedQueries === results.length,
      passedQueries,
      totalQueries: results.length,
      results
    }
  }
}

// Export singleton
export const completeRealPipelineTest = new CompleteRealPipelineTest()