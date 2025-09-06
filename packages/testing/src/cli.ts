#!/usr/bin/env node

// CLI Tool for Running PAPI Code Generation Tests

import { Command } from 'commander'
import chalk from 'chalk'
import { TestRunner } from './test-runner'
import { testMatrixGenerator } from './test-matrix-generator'
import { codeValidator } from './code-validator'
import { runQuickValidation, runFullTestSuite } from './index'
import { TestCase } from './types'

const program = new Command()

program
  .name('papi-test')
  .description('CLI tool for validating PAPI code generation and testing all storage query patterns')
  .version('1.0.0')

// Quick validation command
program
  .command('quick')
  .description('Run quick validation with sample test cases')
  .option('-v, --verbose', 'Enable verbose output')
  .action(async (options) => {
    console.log(chalk.blue('🚀 Running quick validation...\\n'))
    
    try {
      const results = await runQuickValidation()
      
      displayResults(results, options.verbose)
      
      if (results.failed > 0) {
        console.log(chalk.red('\\n❌ Quick validation failed'))
        process.exit(1)
      } else {
        console.log(chalk.green('\\n✅ Quick validation passed!'))
      }
    } catch (error) {
      console.error(chalk.red('\\n💥 Quick validation crashed:'), error instanceof Error ? error.message : String(error))
      process.exit(1)
    }
  })

// Full test suite command
program
  .command('test')
  .description('Run comprehensive test suite')
  .option('-p, --parallel', 'Run tests in parallel', true)
  .option('-b, --batch-size <number>', 'Batch size for parallel execution', '50')
  .option('-t, --timeout <number>', 'Timeout per test in milliseconds', '30000')
  .option('-c, --chains <chains>', 'Comma-separated list of chains to test', 'polkadot,kusama')
  .option('--categories <categories>', 'Comma-separated list of categories', 'basic,observable,advanced')
  .option('-v, --verbose', 'Enable verbose output')
  .option('--skip-slow', 'Skip slow/long-running tests')
  .option('--report', 'Generate detailed HTML report', true)
  .action(async (options) => {
    console.log(chalk.blue('🧪 Starting comprehensive test suite...\\n'))
    
    const config = {
      parallel: options.parallel,
      batchSize: parseInt(options.batchSize),
      timeout: parseInt(options.timeout),
      chains: options.chains.split(','),
      categories: options.categories.split(','),
      verbose: options.verbose,
      skipSlow: options.skipSlow,
      generateReport: options.report
    }
    
    console.log(chalk.gray('Configuration:'))
    console.log(chalk.gray(`  • Chains: ${config.chains.join(', ')}`))
    console.log(chalk.gray(`  • Categories: ${config.categories.join(', ')}`))
    console.log(chalk.gray(`  • Parallel: ${config.parallel} (batch size: ${config.batchSize})`))
    console.log(chalk.gray(`  • Timeout: ${config.timeout}ms`))
    if (config.skipSlow) {
      console.log(chalk.yellow('  • Skipping slow tests'))
    }
    console.log()
    
    try {
      const results = await runFullTestSuite(config)
      
      displayResults(results, options.verbose)
      
      if (results.failed > 0) {
        console.log(chalk.red('\\n❌ Test suite failed'))
        process.exit(1)
      } else {
        console.log(chalk.green('\\n🎉 All tests passed!'))
      }
    } catch (error) {
      console.error(chalk.red('\\n💥 Test suite crashed:'), error instanceof Error ? error.message : String(error))
      if (options.verbose) {
        console.error(error instanceof Error ? error.stack : error)
      }
      process.exit(1)
    }
  })

// Matrix generation command
program
  .command('matrix')
  .description('Generate and display test matrix information')
  .option('-f, --full', 'Show full matrix (can be very large)')
  .option('--chains <chains>', 'Filter by chains', 'polkadot')
  .option('--categories <categories>', 'Filter by categories', 'basic,observable')
  .action(async (options) => {
    console.log(chalk.blue('📊 Generating test matrix...\\n'))
    
    try {
      const matrix = options.full 
        ? testMatrixGenerator.generateFullMatrix()
        : testMatrixGenerator.generateFilteredMatrix({
            chains: options.chains.split(','),
            categories: options.categories.split(',')
          })
      
      const stats = testMatrixGenerator.getMatrixStats(matrix)
      
      console.log(chalk.green('📈 Test Matrix Statistics:'))
      console.log(`  Total test cases: ${chalk.bold(stats.total)}`)
      console.log(`  Estimated time: ${chalk.bold(Math.round(stats.estimatedTime / 1000 / 60))} minutes`)
      console.log()
      
      console.log(chalk.cyan('By Chain:'))
      Object.entries(stats.byChain).forEach(([chain, count]) => {
        console.log(`  ${chain}: ${count}`)
      })
      console.log()
      
      console.log(chalk.magenta('By Category:'))
      Object.entries(stats.byCategory).forEach(([category, count]) => {
        console.log(`  ${category}: ${count}`)
      })
      console.log()
      
      console.log(chalk.blue('By Query Type:'))
      Object.entries(stats.byQueryType)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 10)
        .forEach(([queryType, count]) => {
          console.log(`  ${queryType}: ${count}`)
        })
      
      if (options.full) {
        console.log(chalk.yellow('\\n⚠️  Full matrix contains', stats.total, 'test cases'))
        console.log(chalk.gray('Use --verbose to see individual test cases'))
      }
      
    } catch (error) {
      console.error(chalk.red('💥 Matrix generation failed:'), error instanceof Error ? error.message : String(error))
      process.exit(1)
    }
  })

// Code validation command
program
  .command('validate <file>')
  .description('Validate a specific code file against PAPI standards')
  .option('-t, --type <type>', 'Query type for validation context')
  .option('--pallet <pallet>', 'Pallet name for validation context')
  .option('--storage <storage>', 'Storage name for validation context')
  .action(async (file, options) => {
    console.log(chalk.blue(`🔍 Validating ${file}...\\n`))
    
    try {
      const fs = await import('fs/promises')
      const code = await fs.readFile(file, 'utf-8')
      
      const testCase: TestCase | undefined = options.type ? {
        id: `validate-${options.type}-${options.pallet || 'System'}-${options.storage || 'Number'}`,
        chain: 'polkadot',
        pallet: options.pallet || 'System',
        storage: options.storage || 'Number',
        queryType: options.type,
        parameters: {},
        expectedPattern: 'basic',
        shouldSucceed: true,
        validationRules: [],
        category: options.type.startsWith('watch') ? 'observable' : 'basic',
        estimatedDuration: 5000
      } : undefined
      
      const results = await codeValidator.validateCode(code, testCase)
      
      let allPassed = true
      
      console.log(chalk.green('Validation Results:'))
      Object.entries(results).forEach(([name, result]) => {
        const status = result.passed ? 
          chalk.green('✅ PASS') : 
          chalk.red('❌ FAIL')
        
        console.log(`  ${name}: ${status}`)
        
        if (!result.passed) {
          allPassed = false
          if (result.message) {
            console.log(chalk.red(`    Error: ${result.message}`))
          }
          if (result.details?.errors) {
            result.details.errors.forEach((error: string) => {
              console.log(chalk.red(`    • ${error}`))
            })
          }
        }
        
        if (result.warnings?.length) {
          result.warnings.forEach(warning => {
            console.log(chalk.yellow(`    ⚠️  ${warning}`))
          })
        }
        
        if (result.executionTime) {
          console.log(chalk.gray(`    Time: ${result.executionTime}ms`))
        }
      })
      
      if (allPassed) {
        console.log(chalk.green('\\n🎉 Code validation passed!'))
      } else {
        console.log(chalk.red('\\n❌ Code validation failed'))
        process.exit(1)
      }
      
    } catch (error) {
      console.error(chalk.red('💥 Validation failed:'), error instanceof Error ? error.message : String(error))
      process.exit(1)
    }
  })

// Interactive mode command
program
  .command('interactive')
  .description('Run interactive test explorer')
  .action(async () => {
    console.log(chalk.blue('🎮 Interactive Test Explorer\\n'))
    console.log(chalk.gray('This feature will be implemented in a future version'))
    console.log(chalk.gray('For now, use specific commands like:'))
    console.log(chalk.cyan('  papi-test quick        # Quick validation'))
    console.log(chalk.cyan('  papi-test test         # Full test suite'))
    console.log(chalk.cyan('  papi-test matrix       # View test matrix'))
  })

// Utility function to display test results
function displayResults(results: any, verbose: boolean = false) {
  const successRate = ((results.passed / results.total) * 100).toFixed(1)
  const failRate = ((results.failed / results.total) * 100).toFixed(1)
  
  console.log(chalk.green('📊 Test Results Summary:'))
  console.log(`  Total: ${chalk.bold(results.total)} tests`)
  console.log(`  Passed: ${chalk.green(results.passed)} (${successRate}%)`)
  console.log(`  Failed: ${chalk.red(results.failed)} (${failRate}%)`)
  if (results.warnings > 0) {
    console.log(`  Warnings: ${chalk.yellow(results.warnings)}`)
  }
  console.log(`  Duration: ${chalk.blue(Math.round(results.totalExecutionTime / 1000))}s`)
  
  if (results.summary) {
    console.log()
    console.log(chalk.cyan('By Category:'))
    Object.entries(results.summary.byCategory).forEach(([category, stats]: [string, any]) => {
      const categoryRate = ((stats.passed / (stats.passed + stats.failed)) * 100).toFixed(1)
      console.log(`  ${category}: ${stats.passed}/${stats.passed + stats.failed} (${categoryRate}%)`)
    })
    
    if (results.summary.byChain && Object.keys(results.summary.byChain).length > 1) {
      console.log()
      console.log(chalk.magenta('By Chain:'))
      Object.entries(results.summary.byChain).forEach(([chain, stats]: [string, any]) => {
        const chainRate = ((stats.passed / (stats.passed + stats.failed)) * 100).toFixed(1)
        console.log(`  ${chain}: ${stats.passed}/${stats.passed + stats.failed} (${chainRate}%)`)
      })
    }
    
    if (results.summary.topErrors.length > 0) {
      console.log()
      console.log(chalk.red('Top Errors:'))
      results.summary.topErrors.slice(0, 5).forEach((errorInfo: any) => {
        console.log(`  ${chalk.red(errorInfo.count + 'x')}: ${errorInfo.error}`)
      })
    }
    
    if (results.summary.performanceStats) {
      console.log()
      console.log(chalk.blue('Performance:'))
      console.log(`  Avg time: ${results.summary.performanceStats.avgExecutionTime.toFixed(1)}ms`)
      if (verbose && results.summary.performanceStats.slowestTests.length > 0) {
        console.log('  Slowest tests:')
        results.summary.performanceStats.slowestTests.slice(0, 3).forEach((test: any) => {
          console.log(`    ${test.id}: ${test.time}ms`)
        })
      }
    }
  }
  
  if (verbose && results.results) {
    console.log()
    console.log(chalk.gray('Detailed Results:'))
    const failedTests = results.results.filter((r: any) => !r.overallPassed)
    if (failedTests.length > 0) {
      console.log(chalk.red(`Failed Tests (${failedTests.length}):`))
      failedTests.slice(0, 10).forEach((result: any) => {
        console.log(`  ❌ ${result.testCase.id}`)
        result.errors.forEach((error: string) => {
          console.log(`     ${chalk.red(error)}`)
        })
      })
      if (failedTests.length > 10) {
        console.log(chalk.gray(`     ... and ${failedTests.length - 10} more`))
      }
    }
  }
}

// Error handling
process.on('unhandledRejection', (reason, promise) => {
  console.error(chalk.red('💥 Unhandled Rejection:'), reason)
  process.exit(1)
})

process.on('uncaughtException', (error) => {
  console.error(chalk.red('💥 Uncaught Exception:'), error instanceof Error ? error.message : String(error))
  if (process.env.NODE_ENV === 'development') {
    console.error(error.stack)
  }
  process.exit(1)
})

// Parse command line arguments
program.parse()

// Show help if no command provided
if (!process.argv.slice(2).length) {
  program.outputHelp()
}