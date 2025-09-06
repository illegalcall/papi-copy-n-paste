// Test Infrastructure Types

export interface TestCase {
  id: string
  chain: string
  pallet: string
  storage: string
  queryType: string
  parameters: Record<string, any>
  expectedPattern: string
  shouldSucceed: boolean
  validationRules: ValidationRule[]
  category: 'basic' | 'observable' | 'advanced' | 'complete'
  estimatedDuration: number // in milliseconds
}

export interface ValidationRule {
  name: string
  type: 'syntax' | 'functional' | 'runtime' | 'observable'
  validator: (code: string, testCase?: TestCase) => Promise<ValidationResult>
  required: boolean
  timeout?: number
}

export interface ValidationResult {
  passed: boolean
  message?: string
  details?: any
  executionTime?: number
  warnings?: string[]
}

export interface TestResult {
  testCase: TestCase
  validationResults: Record<string, ValidationResult>
  overallPassed: boolean
  totalExecutionTime: number
  generatedCode: string
  errors: string[]
  warnings: string[]
}

export interface TestSuiteResult {
  total: number
  passed: number
  failed: number
  warnings: number
  totalExecutionTime: number
  results: TestResult[]
  summary: TestSummary
}

export interface TestSummary {
  byChain: Record<string, { passed: number; failed: number }>
  byQueryType: Record<string, { passed: number; failed: number }>
  byCategory: Record<string, { passed: number; failed: number }>
  topErrors: Array<{ error: string; count: number }>
  performanceStats: {
    avgExecutionTime: number
    slowestTests: Array<{ id: string; time: number }>
    fastestTests: Array<{ id: string; time: number }>
  }
}

// Storage-specific types
export interface StorageInfo {
  name: string
  type: string
  parameters?: string[]
  docs?: string[]
  hasKeys: boolean
  isOptional: boolean
}

export interface PalletInfo {
  name: string
  storage: StorageInfo[]
}

export interface ChainInfo {
  name: string
  pallets: PalletInfo[]
  rpcUrl?: string
  chainHash?: string
}

// Query type definitions
export type QueryType = 
  | 'getValue' | 'getValues' | 'getEntries' | 'getValueAt'
  | 'watchValue' | 'watchValueFinalized' | 'watchValueBest' 
  | 'watchEntries' | 'watchEntriesPartial'
  | 'multiWatch' | 'conditionalWatch' | 'bufferedWatch' 
  | 'errorHandledWatch' | 'distinctWatch' | 'throttledWatch'
  | 'comprehensive'

// Mock API types
export interface MockApiConfig {
  chain: string
  mockResponses: Record<string, any>
  latency?: number
  failureRate?: number
  observableEmissions?: number
}

export interface MockStorageEntry {
  getValue: () => Promise<any>
  getValues: (keys: any[]) => Promise<any[]>
  getEntries: () => Promise<Array<[any, any]>>
  watchValue: () => any // Observable
  watchEntries: () => any // Observable
  getKey: (...args: any[]) => string
}

// Test execution configuration
export interface TestConfig {
  parallel: boolean
  batchSize: number
  timeout: number
  skipSlow: boolean
  categories: string[]
  chains: string[]
  generateReport: boolean
  verbose: boolean
}

// Observable testing types
export interface ObservableExpectation {
  emissionCount?: number
  values?: any[]
  timeout?: number
  shouldComplete?: boolean
  shouldError?: boolean
  distinctValues?: boolean
  throttleTime?: number
}

export interface ObservableTestResult extends ValidationResult {
  emissions: any[]
  completed: boolean
  errored: boolean
  subscriptionTime: number
  unsubscriptionTime: number
}