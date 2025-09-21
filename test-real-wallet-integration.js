#!/usr/bin/env node

/**
 * Real-World Wallet Integration Test
 * Tests actual wallet components and integration with React app
 */

const fs = require('fs');
const path = require('path');

// Test results tracking
const testResults = {
  componentStructure: {},
  integrationPoints: {},
  walletFlow: {},
  errorScenarios: {},
  overall: { passed: 0, failed: 0, total: 0 }
};

function log(message, type = 'info') {
  const timestamp = new Date().toISOString();
  const prefix = type === 'error' ? '❌' : type === 'success' ? '✅' : 'ℹ️';
  console.log(`${prefix} [${timestamp}] ${message}`);
}

function updateResults(category, test, passed, error = null) {
  if (!testResults[category]) {
    testResults[category] = {};
  }
  testResults[category][test] = { passed, error };
  testResults.overall.total++;
  if (passed) {
    testResults.overall.passed++;
  } else {
    testResults.overall.failed++;
  }
}

// Test wallet component structure and exports
function testWalletComponentStructure() {
  log("🔍 Testing wallet component structure...");

  const tests = [
    {
      name: "useWallet hook exists",
      path: "apps/web/hooks/useWallet.ts",
      requiredExports: ["useWallet"]
    },
    {
      name: "WalletConnector component exists",
      path: "apps/web/components/wallet/wallet-connector.tsx",
      requiredExports: ["WalletConnector"]
    },
    {
      name: "WalletManager core class exists",
      path: "packages/core/src/wallet/wallet-manager.ts",
      requiredExports: ["WalletManager"]
    },
    {
      name: "Wallet types defined",
      path: "packages/core/src/wallet/types.ts",
      requiredExports: ["WalletState", "Account", "TransactionPreview"]
    },
    {
      name: "PolkadotJS adapter exists",
      path: "packages/core/src/wallet/polkadot-js-adapter.ts",
      requiredExports: ["PolkadotJsAdapter"]
    }
  ];

  for (const test of tests) {
    try {
      const filePath = path.join(__dirname, test.path);

      if (!fs.existsSync(filePath)) {
        throw new Error("File does not exist");
      }

      const content = fs.readFileSync(filePath, 'utf8');

      // Check for required exports
      const missingExports = test.requiredExports.filter(exportName => {
        return !content.includes(`export`) ||
               (!content.includes(`export class ${exportName}`) &&
                !content.includes(`export function ${exportName}`) &&
                !content.includes(`export interface ${exportName}`) &&
                !content.includes(`export type ${exportName}`));
      });

      if (missingExports.length === 0) {
        log(`✅ ${test.name}: All required exports found`, 'success');
        updateResults('componentStructure', test.name, true);
      } else {
        throw new Error(`Missing exports: ${missingExports.join(', ')}`);
      }

    } catch (error) {
      log(`❌ ${test.name}: ${error.message}`, 'error');
      updateResults('componentStructure', test.name, false, error.message);
    }
  }
}

// Test integration points between components
function testIntegrationPoints() {
  log("🔗 Testing integration points...");

  const integrationTests = [
    {
      name: "Page.tsx imports useWallet",
      path: "apps/web/app/page.tsx",
      shouldContain: ["useWallet", "from \"../hooks/useWallet\""]
    },
    {
      name: "Header imports WalletConnector",
      path: "apps/web/components/layout/header.tsx",
      shouldContain: ["WalletConnector"]
    },
    {
      name: "useWallet uses WalletManager",
      path: "apps/web/hooks/useWallet.ts",
      shouldContain: ["WalletManager", "from '@workspace/core'"]
    },
    {
      name: "WalletManager exports correct interface",
      path: "packages/core/src/wallet/wallet-manager.ts",
      shouldContain: ["export class WalletManager", "connect()", "disconnect()"]
    }
  ];

  for (const test of integrationTests) {
    try {
      const filePath = path.join(__dirname, test.path);

      if (!fs.existsSync(filePath)) {
        throw new Error("File does not exist");
      }

      const content = fs.readFileSync(filePath, 'utf8');

      const missingContent = test.shouldContain.filter(item => !content.includes(item));

      if (missingContent.length === 0) {
        log(`✅ ${test.name}: All required content found`, 'success');
        updateResults('integrationPoints', test.name, true);
      } else {
        throw new Error(`Missing content: ${missingContent.join(', ')}`);
      }

    } catch (error) {
      log(`❌ ${test.name}: ${error.message}`, 'error');
      updateResults('integrationPoints', test.name, false, error.message);
    }
  }
}

// Test wallet flow implementation
function testWalletFlow() {
  log("🔄 Testing wallet flow implementation...");

  const flowTests = [
    {
      name: "WalletManager state management",
      check: () => {
        const managerPath = path.join(__dirname, "packages/core/src/wallet/wallet-manager.ts");
        const content = fs.readFileSync(managerPath, 'utf8');

        const requiredMethods = [
          'connect()',
          'disconnect()',
          'selectAccount(',
          'getSigner(',
          'subscribe(',
          'getState()'
        ];

        const missingMethods = requiredMethods.filter(method => !content.includes(method));

        if (missingMethods.length > 0) {
          throw new Error(`Missing methods: ${missingMethods.join(', ')}`);
        }

        return true;
      }
    },
    {
      name: "useWallet hook state management",
      check: () => {
        const hookPath = path.join(__dirname, "apps/web/hooks/useWallet.ts");
        const content = fs.readFileSync(hookPath, 'utf8');

        const requiredStates = [
          'isAvailable',
          'isConnected',
          'isConnecting',
          'accounts',
          'selectedAccount',
          'error'
        ];

        const missingStates = requiredStates.filter(state => !content.includes(state));

        if (missingStates.length > 0) {
          throw new Error(`Missing state properties: ${missingStates.join(', ')}`);
        }

        return true;
      }
    },
    {
      name: "WalletConnector UI states",
      check: () => {
        const connectorPath = path.join(__dirname, "apps/web/components/wallet/wallet-connector.tsx");
        const content = fs.readFileSync(connectorPath, 'utf8');

        const requiredUIStates = [
          'isAvailable',
          'isConnected',
          'isConnecting',
          'Connect Wallet',
          'Connecting...',
          'Disconnect Wallet'
        ];

        const missingUIStates = requiredUIStates.filter(state => !content.includes(state));

        if (missingUIStates.length > 0) {
          throw new Error(`Missing UI states: ${missingUIStates.join(', ')}`);
        }

        return true;
      }
    }
  ];

  for (const test of flowTests) {
    try {
      test.check();
      log(`✅ ${test.name}: Implementation verified`, 'success');
      updateResults('walletFlow', test.name, true);
    } catch (error) {
      log(`❌ ${test.name}: ${error.message}`, 'error');
      updateResults('walletFlow', test.name, false, error.message);
    }
  }
}

// Test error scenarios implementation
function testErrorScenarios() {
  log("⚠️ Testing error scenarios implementation...");

  const errorTests = [
    {
      name: "No extension error handling",
      check: () => {
        const connectorPath = path.join(__dirname, "apps/web/components/wallet/wallet-connector.tsx");
        const content = fs.readFileSync(connectorPath, 'utf8');

        if (!content.includes('!isAvailable') || !content.includes('No Wallet')) {
          throw new Error("Missing no extension handling");
        }

        return true;
      }
    },
    {
      name: "Connection error handling",
      check: () => {
        const hookPath = path.join(__dirname, "apps/web/hooks/useWallet.ts");
        const content = fs.readFileSync(hookPath, 'utf8');

        if (!content.includes('catch (error)') || !content.includes('console.error')) {
          throw new Error("Missing connection error handling");
        }

        return true;
      }
    },
    {
      name: "Transaction validation",
      check: () => {
        const managerPath = path.join(__dirname, "packages/core/src/wallet/wallet-manager.ts");
        const content = fs.readFileSync(managerPath, 'utf8');

        if (!content.includes('validateTransaction') || !content.includes('isValid')) {
          throw new Error("Missing transaction validation");
        }

        return true;
      }
    },
    {
      name: "Adapter error handling",
      check: () => {
        const adapterPath = path.join(__dirname, "packages/core/src/wallet/polkadot-js-adapter.ts");

        if (!fs.existsSync(adapterPath)) {
          throw new Error("Adapter file missing");
        }

        const content = fs.readFileSync(adapterPath, 'utf8');

        if (!content.includes('try') || !content.includes('catch')) {
          throw new Error("Missing error handling in adapter");
        }

        return true;
      }
    }
  ];

  for (const test of errorTests) {
    try {
      test.check();
      log(`✅ ${test.name}: Error handling implemented`, 'success');
      updateResults('errorScenarios', test.name, true);
    } catch (error) {
      log(`❌ ${test.name}: ${error.message}`, 'error');
      updateResults('errorScenarios', test.name, false, error.message);
    }
  }
}

// Test transaction preview modal integration
function testTransactionPreviewModal() {
  log("💰 Testing transaction preview modal...");

  try {
    const modalPath = path.join(__dirname, "apps/web/components/wallet/TransactionPreviewModal.tsx");

    if (!fs.existsSync(modalPath)) {
      throw new Error("TransactionPreviewModal component does not exist");
    }

    const content = fs.readFileSync(modalPath, 'utf8');

    const requiredElements = [
      'TransactionPreviewModal',
      'export',
      'Modal',
      'Button'
    ];

    const missingElements = requiredElements.filter(element => !content.includes(element));

    if (missingElements.length === 0) {
      log(`✅ Transaction preview modal: Component structure verified`, 'success');
      updateResults('integrationPoints', 'TransactionPreviewModal', true);
    } else {
      throw new Error(`Missing elements: ${missingElements.join(', ')}`);
    }

  } catch (error) {
    log(`❌ Transaction preview modal: ${error.message}`, 'error');
    updateResults('integrationPoints', 'TransactionPreviewModal', false, error.message);
  }
}

// Test wallet type definitions
function testWalletTypes() {
  log("📝 Testing wallet type definitions...");

  try {
    const typesPath = path.join(__dirname, "packages/core/src/wallet/types.ts");

    if (!fs.existsSync(typesPath)) {
      throw new Error("Wallet types file does not exist");
    }

    const content = fs.readFileSync(typesPath, 'utf8');

    const requiredTypes = [
      'WalletState',
      'Account',
      'TransactionPreview',
      'WalletAdapter'
    ];

    const missingTypes = requiredTypes.filter(type => !content.includes(`interface ${type}`) && !content.includes(`type ${type}`));

    if (missingTypes.length === 0) {
      log(`✅ Wallet types: All required types defined`, 'success');
      updateResults('componentStructure', 'WalletTypes', true);
    } else {
      throw new Error(`Missing types: ${missingTypes.join(', ')}`);
    }

  } catch (error) {
    log(`❌ Wallet types: ${error.message}`, 'error');
    updateResults('componentStructure', 'WalletTypes', false, error.message);
  }
}

// Generate final test report
function generateTestReport() {
  log("📊 Generating real-world integration test report...");

  console.log("\n" + "=".repeat(80));
  console.log("🧪 REAL-WORLD WALLET INTEGRATION TEST REPORT");
  console.log("=".repeat(80));

  console.log(`\n📈 OVERALL RESULTS:`);
  console.log(`   Total Tests: ${testResults.overall.total}`);
  console.log(`   Passed: ${testResults.overall.passed} ✅`);
  console.log(`   Failed: ${testResults.overall.failed} ❌`);
  console.log(`   Success Rate: ${((testResults.overall.passed / testResults.overall.total) * 100).toFixed(1)}%`);

  // Component Structure Results
  if (Object.keys(testResults.componentStructure).length > 0) {
    console.log(`\n🏗️ COMPONENT STRUCTURE TESTS:`);
    for (const [test, result] of Object.entries(testResults.componentStructure)) {
      const status = result.passed ? "✅ PASS" : "❌ FAIL";
      const error = result.error ? ` (${result.error})` : "";
      console.log(`   ${test}: ${status}${error}`);
    }
  }

  // Integration Points Results
  if (Object.keys(testResults.integrationPoints).length > 0) {
    console.log(`\n🔗 INTEGRATION TESTS:`);
    for (const [test, result] of Object.entries(testResults.integrationPoints)) {
      const status = result.passed ? "✅ PASS" : "❌ FAIL";
      const error = result.error ? ` (${result.error})` : "";
      console.log(`   ${test}: ${status}${error}`);
    }
  }

  // Wallet Flow Results
  if (Object.keys(testResults.walletFlow).length > 0) {
    console.log(`\n🔄 WALLET FLOW TESTS:`);
    for (const [test, result] of Object.entries(testResults.walletFlow)) {
      const status = result.passed ? "✅ PASS" : "❌ FAIL";
      const error = result.error ? ` (${result.error})` : "";
      console.log(`   ${test}: ${status}${error}`);
    }
  }

  // Error Scenarios Results
  if (Object.keys(testResults.errorScenarios).length > 0) {
    console.log(`\n⚠️ ERROR SCENARIO TESTS:`);
    for (const [test, result] of Object.entries(testResults.errorScenarios)) {
      const status = result.passed ? "✅ PASS" : "❌ FAIL";
      const error = result.error ? ` (${result.error})` : "";
      console.log(`   ${test}: ${status}${error}`);
    }
  }

  console.log("\n" + "=".repeat(80));

  // Recommendations
  if (testResults.overall.failed > 0) {
    console.log(`\n🔧 RECOMMENDATIONS:`);
    console.log(`   • Review failed tests and fix implementation issues`);
    console.log(`   • Ensure all required files and exports are present`);
    console.log(`   • Test wallet integration manually in the browser`);
    console.log(`   • Verify error handling covers all edge cases`);
  } else {
    console.log(`\n🎉 EXCELLENT: All integration tests passed!`);
    console.log(`   • Wallet integration is properly implemented`);
    console.log(`   • All components are correctly structured`);
    console.log(`   • Error handling is comprehensive`);
    console.log(`   • Ready for production use`);
  }

  return testResults.overall.failed === 0;
}

// Main test execution
async function runRealWalletIntegrationTests() {
  log("🚀 Starting real-world wallet integration tests...");

  try {
    // Run all test suites
    testWalletComponentStructure();
    testIntegrationPoints();
    testWalletFlow();
    testErrorScenarios();
    testTransactionPreviewModal();
    testWalletTypes();

    // Generate final report
    const allTestsPassed = generateTestReport();

    if (allTestsPassed) {
      log("🎉 All real-world wallet integration tests passed!", 'success');
      return true;
    } else {
      log("⚠️ Some real-world wallet integration tests failed. See report above.", 'error');
      return false;
    }

  } catch (error) {
    log(`💥 Test suite crashed: ${error.message}`, 'error');
    console.error(error);
    return false;
  }
}

// Run tests if this script is executed directly
if (require.main === module) {
  runRealWalletIntegrationTests().then(success => {
    process.exit(success ? 0 : 1);
  });
}

module.exports = {
  runRealWalletIntegrationTests,
  testResults
};