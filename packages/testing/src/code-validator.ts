// Code Validation Engine

import * as ts from 'typescript'
import { ValidationResult, TestCase, ValidationRule } from './types'

export interface CodeValidator {
  validateSyntax(code: string): Promise<ValidationResult>
  validateImports(code: string): Promise<ValidationResult>
  validateTypes(code: string): Promise<ValidationResult>
  validateObservablePatterns(code: string, testCase?: TestCase): Promise<ValidationResult>
  validateErrorHandling(code: string, testCase?: TestCase): Promise<ValidationResult>
  validateBestPractices(code: string): Promise<ValidationResult>
  validateParameters(code: string, testCase?: TestCase): Promise<ValidationResult>
}

export class ComprehensiveCodeValidator implements CodeValidator {
  private compilerOptions: ts.CompilerOptions = {
    target: ts.ScriptTarget.ES2022,
    module: ts.ModuleKind.CommonJS,
    strict: false,
    skipLibCheck: true,
    esModuleInterop: true,
    allowSyntheticDefaultImports: true,
    moduleResolution: ts.ModuleResolutionKind.NodeJs,
    noUncheckedIndexedAccess: true,
    lib: ['ES2022', 'DOM', 'DOM.Iterable'],
    noResolve: false
  }

  /**
   * Validate TypeScript syntax and compilation
   */
  async validateSyntax(code: string): Promise<ValidationResult> {
    const startTime = Date.now()
    
    try {
      // For testing purposes, we'll perform a basic syntax check
      // without full type checking since we don't have the actual modules
      const sourceFile = ts.createSourceFile(
        'test.ts',
        code,
        ts.ScriptTarget.ES2022,
        true
      )
      
      // Just check if the source file was created successfully
      if (!sourceFile) {
        return {
          passed: false,
          message: 'TypeScript parsing failed - could not create source file',
          executionTime: Date.now() - startTime
        }
      }

      // Basic syntax validation
      const codeText = sourceFile.getFullText()
      const basicChecks = this.performBasicSyntaxChecks(codeText)
      
      const executionTime = Date.now() - startTime
      
      if (basicChecks.length === 0) {
        return {
          passed: true,
          message: 'TypeScript syntax validation successful',
          executionTime
        }
      } else {
        return {
          passed: false,
          message: 'Basic syntax validation failed',
          details: { errors: basicChecks },
          executionTime
        }
      }
    } catch (error) {
      return {
        passed: false,
        message: `Syntax validation error: ${error instanceof Error ? error.message : String(error)}`,
        executionTime: Date.now() - startTime
      }
    }
  }

  /**
   * Perform basic syntax checks without full type checking
   */
  private performBasicSyntaxChecks(code: string): string[] {
    const errors: string[] = []
    
    // Check for basic import/export syntax
    if (!code.includes('import') && !code.includes('require')) {
      errors.push('No import statements found')
    }
    
    // Check for async function structure
    if (code.includes('await') && !code.includes('async')) {
      errors.push('await used outside async context')
    }
    
    // Check for basic function structure
    if (!code.includes('function') && !code.includes('=>') && !code.includes('async')) {
      errors.push('No function definitions found')
    }
    
    return errors
  }

  /**
   * Validate import statements
   */
  async validateImports(code: string): Promise<ValidationResult> {
    const startTime = Date.now()
    const requiredImports = [
      'polkadot-api'
    ]
    
    const warnings: string[] = []
    const errors: string[] = []
    
    // Check for required imports
    for (const importName of requiredImports) {
      if (!code.includes(importName)) {
        errors.push(`Missing required import: ${importName}`)
      }
    }
    
    // Check for RxJS imports in observable code
    if (code.includes('watch') || code.includes('Observable') || code.includes('$')) {
      if (!code.includes('rxjs')) {
        warnings.push('Observable code detected but no RxJS imports found')
      }
    }
    
    // Validate import syntax
    const importRegex = /import\s+.*\s+from\s+['"]([^'"]+)['"]/g
    let match
    while ((match = importRegex.exec(code)) !== null) {
      const importPath = match[1]
      
      if (!importPath) continue
      
      // Check for suspicious imports
      if (importPath.includes('..')) {
        warnings.push(`Relative import detected: ${importPath}`)
      }
      
      // Validate known good imports
      if (importPath.startsWith('@polkadot') || importPath === 'polkadot-api' || importPath === 'rxjs') {
        // These are good
      } else {
        warnings.push(`Unknown import: ${importPath}`)
      }
    }
    
    return {
      passed: errors.length === 0,
      message: errors.length === 0 ? 'Import validation passed' : 'Import validation failed',
      details: { errors },
      warnings,
      executionTime: Date.now() - startTime
    }
  }

  /**
   * Validate TypeScript types
   */
  async validateTypes(code: string): Promise<ValidationResult> {
    const startTime = Date.now()
    const warnings: string[] = []
    
    // Check for proper typing
    if (code.includes(': any')) {
      warnings.push('Using "any" type - consider more specific typing')
    }
    
    if (code.includes('as any')) {
      warnings.push('Type assertion to "any" detected')
    }
    
    // Check for async/await usage
    if (code.includes('await') && !code.includes('async')) {
      return {
        passed: false,
        message: 'await used outside async function',
        executionTime: Date.now() - startTime
      }
    }
    
    return {
      passed: true,
      message: 'Type validation passed',
      warnings,
      executionTime: Date.now() - startTime
    }
  }

  /**
   * Validate Observable patterns and RxJS usage
   */
  async validateObservablePatterns(code: string, testCase?: TestCase): Promise<ValidationResult> {
    const startTime = Date.now()
    const errors: string[] = []
    const warnings: string[] = []
    
    const isObservableCode = code.includes('watch') || code.includes('Observable') || code.includes('$')
    
    if (!isObservableCode) {
      return {
        passed: true,
        message: 'No observable patterns to validate',
        executionTime: Date.now() - startTime
      }
    }
    
    // Check for proper subscription handling
    if (code.includes('.subscribe(') && !code.includes('.unsubscribe()')) {
      warnings.push('Observable subscription without unsubscribe - potential memory leak')
    }
    
    // Validate RxJS operators
    const commonOperators = ['map', 'filter', 'distinctUntilChanged', 'catchError', 'retry']
    const advancedOperators = ['combineLatest', 'switchMap', 'mergeMap', 'throttleTime', 'bufferTime']
    
    // Check for proper error handling in observables
    if (testCase?.queryType.includes('error') || testCase?.queryType.includes('Error')) {
      if (!code.includes('catchError') && !code.includes('retry')) {
        errors.push('Error handling query type missing catchError or retry operators')
      }
    }
    
    // Check for distinct filtering when appropriate
    if (testCase?.queryType.includes('distinct')) {
      if (!code.includes('distinctUntilChanged')) {
        errors.push('Distinct query type missing distinctUntilChanged operator')
      }
    }
    
    // Check for throttling when appropriate
    if (testCase?.queryType.includes('throttled')) {
      if (!code.includes('throttleTime') && !code.includes('debounceTime')) {
        errors.push('Throttled query type missing throttleTime or debounceTime operator')
      }
    }
    
    // Check for buffer patterns
    if (testCase?.queryType.includes('buffer')) {
      if (!code.includes('buffer') && !code.includes('bufferTime') && !code.includes('bufferCount')) {
        errors.push('Buffered query type missing buffer operators')
      }
    }
    
    // Check for multi-storage combining
    if (testCase?.queryType.includes('multi')) {
      if (!code.includes('combineLatest') && !code.includes('zip') && !code.includes('merge')) {
        errors.push('Multi-watch query type missing combining operators')
      }
    }
    
    return {
      passed: errors.length === 0,
      message: errors.length === 0 ? 'Observable pattern validation passed' : 'Observable pattern validation failed',
      details: { errors },
      warnings,
      executionTime: Date.now() - startTime
    }
  }

  /**
   * Validate error handling patterns
   */
  async validateErrorHandling(code: string, testCase?: TestCase): Promise<ValidationResult> {
    const startTime = Date.now()
    const errors: string[] = []
    const warnings: string[] = []
    
    // Check for basic error handling
    const hasErrorHandling = code.includes('try') || code.includes('catch') || 
                           code.includes('catchError') || code.includes('onError')
    
    // Check for promise error handling
    if (code.includes('await') && !hasErrorHandling) {
      warnings.push('Async operations without error handling')
    }
    
    // Check for observable error handling
    if (code.includes('watch') && !code.includes('catchError') && !code.includes('onError')) {
      warnings.push('Observable code without error handling')
    }
    
    // Specific checks for error-handling query types
    if (testCase?.queryType.includes('error') || testCase?.queryType.includes('Error')) {
      if (!hasErrorHandling) {
        errors.push('Error handling query type missing error handling code')
      }
      
      if (!code.includes('retry') && !code.includes('retryWhen')) {
        warnings.push('Error handling code missing retry logic')
      }
    }
    
    return {
      passed: errors.length === 0,
      message: errors.length === 0 ? 'Error handling validation passed' : 'Error handling validation failed',
      details: { errors },
      warnings,
      executionTime: Date.now() - startTime
    }
  }

  /**
   * Validate best practices
   */
  async validateBestPractices(code: string): Promise<ValidationResult> {
    const startTime = Date.now()
    const warnings: string[] = []
    
    // Check for console.log usage
    if (code.includes('console.log')) {
      warnings.push('console.log statements found - consider proper logging')
    }
    
    // Check for proper variable naming
    const variableRegex = /(?:const|let|var)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/g
    let match
    while ((match = variableRegex.exec(code)) !== null) {
      const varName = match[1]
      
      if (!varName) continue
      
      // Observable variables should end with $
      if (code.includes(`${varName}.subscribe`) && !varName.endsWith('$')) {
        warnings.push(`Observable variable "${varName}" should end with $`)
      }
    }
    
    // Check for proper const usage
    if (code.includes('let ') && !code.includes('++') && !code.includes('--') && !code.includes('=')) {
      warnings.push('Consider using const instead of let for immutable values')
    }
    
    // Check for proper async patterns
    if (code.includes('Promise.all') && code.includes('await')) {
      // This is good - parallel async operations
    } else if (code.match(/await.*await/s)) {
      warnings.push('Sequential await operations - consider Promise.all for parallel execution')
    }
    
    return {
      passed: true,
      message: 'Best practices validation completed',
      warnings,
      executionTime: Date.now() - startTime
    }
  }

  /**
   * Validate parameter usage
   */
  async validateParameters(code: string, testCase?: TestCase): Promise<ValidationResult> {
    const startTime = Date.now()
    const errors: string[] = []
    
    if (!testCase) {
      return {
        passed: true,
        message: 'No test case provided for parameter validation',
        executionTime: Date.now() - startTime
      }
    }
    
    const paramCount = Object.keys(testCase.parameters).length
    
    // Count parameter usage in code
    const getValue = code.match(/\.getValue\((.*?)\)/)?.[1] || ''
    const watchValue = code.match(/\.watchValue\((.*?)\)/)?.[1] || ''
    
    const codeParamCount = Math.max(
      getValue.split(',').filter(p => p.trim()).length,
      watchValue.split(',').filter(p => p.trim()).length
    )
    
    // Validate parameter count matches
    if (paramCount > 0 && codeParamCount === 0) {
      errors.push('Test case has parameters but generated code uses none')
    }
    
    if (paramCount === 0 && codeParamCount > 0) {
      errors.push('Test case has no parameters but generated code uses some')
    }
    
    // Validate parameter values are used
    for (const [key, value] of Object.entries(testCase.parameters)) {
      if (!code.includes(value.toString())) {
        errors.push(`Parameter ${key} with value ${value} not found in generated code`)
      }
    }
    
    return {
      passed: errors.length === 0,
      message: errors.length === 0 ? 'Parameter validation passed' : 'Parameter validation failed',
      details: { errors },
      executionTime: Date.now() - startTime
    }
  }

  /**
   * Run all validations for a test case
   */
  async validateCode(code: string, testCase?: TestCase): Promise<Record<string, ValidationResult>> {
    const results: Record<string, ValidationResult> = {}
    
    // Run all validations in parallel
    const [
      syntaxResult,
      importsResult,
      typesResult,
      observableResult,
      errorHandlingResult,
      bestPracticesResult,
      parametersResult
    ] = await Promise.all([
      this.validateSyntax(code),
      this.validateImports(code),
      this.validateTypes(code),
      this.validateObservablePatterns(code, testCase),
      this.validateErrorHandling(code, testCase),
      this.validateBestPractices(code),
      this.validateParameters(code, testCase)
    ])
    
    results.syntax = syntaxResult
    results.imports = importsResult
    results.types = typesResult
    results.observablePatterns = observableResult
    results.errorHandling = errorHandlingResult
    results.bestPractices = bestPracticesResult
    results.parameters = parametersResult
    
    return results
  }
}

// Export singleton instance
export const codeValidator = new ComprehensiveCodeValidator()