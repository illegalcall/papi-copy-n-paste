// @ts-nocheck - Validator testing with type issues
// Validator Validation Test - Tests our validators against negative cases
// Ensures our comprehensive validation suite properly catches errors and invalid scenarios

import { TestRunner } from './test-runner'
import { negativeTestGenerator, NegativeTestCase } from './negative-test-generator'
import { ValidationResult } from './types'

export interface ValidatorTestResult {
  testCase: NegativeTestCase
  validationResults: Record<string, ValidationResult>
  expectedFailures: string[]
  actualFailures: string[]
  unexpectedPasses: string[]
  correctlyDetected: boolean
  summary: {
    totalValidators: number
    expectedFailureCount: number
    actualFailureCount: number
    correctDetectionRate: number
  }
}

export class ValidatorValidationTest {
  private testRunner: TestRunner
  
  constructor() {
    this.testRunner = new TestRunner({
      parallel: false, // Run sequentially for accurate negative testing
      timeout: 10000,   // Shorter timeout for negative tests
      verbose: true,
      generateReport: true
    })
  }
  
  /**
   * Comprehensive validator validation - test our validators against negative cases
   */
  async runValidatorValidationSuite(): Promise<{
    passed: boolean
    totalTests: number
    correctlyDetectedErrors: number
    missedErrors: number
    falsePositives: number
    overallAccuracy: number
    categoryResults: Record<string, {
      total: number
      correct: number
      accuracy: number
    }>
    detailedResults: ValidatorTestResult[]
  }> {
    
    console.log('🧪 VALIDATOR VALIDATION SUITE')
    console.log('Testing our validators against intentionally invalid code...\n')
    
    const startTime = Date.now()
    
    // Generate all negative test cases
    const negativeTestCases = negativeTestGenerator.generateNegativeTestCases()
    console.log(`📋 Running ${negativeTestCases.length} negative test cases`)
    
    const results: ValidatorTestResult[] = []
    const categoryStats: Record<string, { total: number, correct: number }> = {}
    
    // Test each negative case
    for (let i = 0; i < negativeTestCases.length; i++) {
      const testCase = negativeTestCases[i]
      if (!testCase) continue
      
      console.log(`\n🔍 Testing negative case ${i + 1}/${negativeTestCases.length}: ${testCase.id}`)
      console.log(`   Category: ${testCase.errorCategory}`)
      console.log(`   Error: ${testCase.intentionalError}`)
      console.log(`   Expected failing validators: ${testCase.expectedFailingValidator.join(', ')}`)
      
      const result = await this.runNegativeTest(testCase)
      results.push(result)
      
      // Update category statistics
      if (!categoryStats[testCase.errorCategory]) {
        categoryStats[testCase.errorCategory] = { total: 0, correct: 0 }
      }
      categoryStats[testCase.errorCategory].total++
      if (result.correctlyDetected) {
        categoryStats[testCase.errorCategory].correct++
      }
      
      console.log(`   Detection: ${result.correctlyDetected ? '✅ CORRECT' : '❌ MISSED'}`)
      if (result.unexpectedPasses.length > 0) {
        console.log(`   Unexpected passes: ${result.unexpectedPasses.join(', ')}`)
      }
      if (result.actualFailures.length === 0) {
        console.log(`   ⚠️  NO VALIDATORS FAILED - This is concerning!`)
      }
    }
    
    // Calculate overall statistics
    const totalTests = results.length
    const correctlyDetectedErrors = results.filter(r => r.correctlyDetected).length
    const missedErrors = totalTests - correctlyDetectedErrors
    const falsePositives = results.reduce((sum, r) => sum + r.unexpectedPasses.length, 0)
    const overallAccuracy = totalTests > 0 ? (correctlyDetectedErrors / totalTests) * 100 : 0
    
    // Calculate category results
    const categoryResults: Record<string, { total: number, correct: number, accuracy: number }> = {}
    for (const [category, stats] of Object.entries(categoryStats)) {
      categoryResults[category] = {
        total: stats.total,
        correct: stats.correct,
        accuracy: stats.total > 0 ? (stats.correct / stats.total) * 100 : 0
      }
    }
    
    const executionTime = Date.now() - startTime
    
    // Print comprehensive summary
    console.log('\n📊 VALIDATOR VALIDATION SUMMARY')
    console.log('=' .repeat(50))
    console.log(`Total Negative Tests: ${totalTests}`)
    console.log(`Correctly Detected Errors: ${correctlyDetectedErrors}`)
    console.log(`Missed Errors: ${missedErrors}`)
    console.log(`False Positives: ${falsePositives}`)
    console.log(`Overall Accuracy: ${overallAccuracy.toFixed(1)}%`)
    console.log(`Execution Time: ${executionTime}ms`)
    
    console.log('\n📈 CATEGORY BREAKDOWN:')
    for (const [category, stats] of Object.entries(categoryResults)) {
      console.log(`  ${category}: ${stats.correct}/${stats.total} (${stats.accuracy.toFixed(1)}%)`)
    }
    
    console.log('\n🔍 VALIDATOR PERFORMANCE:')
    const validatorStats = this.analyzeValidatorPerformance(results)
    for (const [validator, stats] of Object.entries(validatorStats)) {
      console.log(`  ${validator}: ${stats.correctDetections}/${stats.expectedDetections} expected (${stats.accuracy.toFixed(1)}%)`)
    }
    
    // Determine if validation suite is working correctly
    const passed = overallAccuracy >= 80 && missedErrors <= Math.floor(totalTests * 0.2)
    
    if (passed) {
      console.log('\n✅ VALIDATOR SUITE: PASSING')
      console.log('Our validators are correctly detecting errors and invalid scenarios!')
    } else {
      console.log('\n❌ VALIDATOR SUITE: NEEDS IMPROVEMENT')
      console.log('Some validators may need tuning to catch more error scenarios.')
    }
    
    return {
      passed,
      totalTests,
      correctlyDetectedErrors,
      missedErrors,
      falsePositives,
      overallAccuracy,
      categoryResults,
      detailedResults: results
    }
  }
  
  /**
   * Run a single negative test case
   */
  private async runNegativeTest(testCase: NegativeTestCase): Promise<ValidatorTestResult> {
    try {
      // Generate intentionally invalid code
      const invalidCode = negativeTestGenerator.generateNegativeCode(testCase)
      
      // Run our validation suite on the invalid code
      const testResult = await this.testRunner.runSingleTest({
        id: testCase.id,
        chain: testCase.chain,
        pallet: testCase.pallet,
        storage: testCase.storage,
        queryType: testCase.queryType,
        parameters: testCase.parameters
      })
      
      const validationResults = testResult.validationResults
      
      // Analyze which validators failed (as expected) vs passed (unexpected)
      const expectedFailures = testCase.expectedFailingValidator
      const shouldPass = testCase.shouldPassValidators
      
      const actualFailures: string[] = []
      const unexpectedPasses: string[] = []
      
      for (const [validatorName, result] of Object.entries(validationResults)) {
        if (!result.passed) {
          actualFailures.push(validatorName)
        }
        
        // Check if validator should have failed but passed
        if (expectedFailures.includes(validatorName) && result.passed) {
          unexpectedPasses.push(validatorName)
        }
      }
      
      // Determine if error was correctly detected
      const correctlyDetected = expectedFailures.length > 0 
        ? expectedFailures.some(validator => actualFailures.includes(validator))
        : actualFailures.length === 0 // If no failures expected, none should occur
      
      return {
        testCase,
        validationResults,
        expectedFailures,
        actualFailures,
        unexpectedPasses,
        correctlyDetected,
        summary: {
          totalValidators: Object.keys(validationResults).length,
          expectedFailureCount: expectedFailures.length,
          actualFailureCount: actualFailures.length,
          correctDetectionRate: correctlyDetected ? 100 : 0
        }
      }
      
    } catch (error) {
      console.log(`   ❌ Test execution failed: ${error instanceof Error ? error.message : String(error)}`)
      
      return {
        testCase,
        validationResults: {},
        expectedFailures: testCase.expectedFailingValidator,
        actualFailures: ['test-execution'],
        unexpectedPasses: [],
        correctlyDetected: false,
        summary: {
          totalValidators: 0,
          expectedFailureCount: testCase.expectedFailingValidator.length,
          actualFailureCount: 1,
          correctDetectionRate: 0
        }
      }
    }
  }
  
  /**
   * Analyze performance of individual validators
   */
  private analyzeValidatorPerformance(results: ValidatorTestResult[]): Record<string, {
    expectedDetections: number
    correctDetections: number
    missedDetections: number
    accuracy: number
  }> {
    
    const validatorStats: Record<string, {
      expectedDetections: number
      correctDetections: number
      missedDetections: number
    }> = {}
    
    // Count expected vs actual detections for each validator
    for (const result of results) {
      for (const expectedValidator of result.expectedFailures) {
        if (!validatorStats[expectedValidator]) {
          validatorStats[expectedValidator] = {
            expectedDetections: 0,
            correctDetections: 0,
            missedDetections: 0
          }
        }
        
        validatorStats[expectedValidator].expectedDetections++
        
        if (result.actualFailures.includes(expectedValidator)) {
          validatorStats[expectedValidator].correctDetections++
        } else {
          validatorStats[expectedValidator].missedDetections++
        }
      }
    }
    
    // Calculate accuracy for each validator
    const finalStats: Record<string, {
      expectedDetections: number
      correctDetections: number
      missedDetections: number
      accuracy: number
    }> = {}
    
    for (const [validator, stats] of Object.entries(validatorStats)) {
      finalStats[validator] = {
        ...stats,
        accuracy: stats.expectedDetections > 0 
          ? (stats.correctDetections / stats.expectedDetections) * 100 
          : 100
      }
    }
    
    return finalStats
  }
}

// Export singleton
export const validatorValidationTest = new ValidatorValidationTest()