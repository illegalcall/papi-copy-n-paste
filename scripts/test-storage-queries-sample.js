#!/usr/bin/env node

/**
 * Sample Storage Query Test
 * Tests a few storage queries to validate the approach
 */

const { createClient } = require('polkadot-api');
const { getWsProvider } = require('polkadot-api/ws-provider/node');

async function testSampleQueries() {
  console.log('🧪 Testing sample storage queries...\n');

  let client = null;
  const results = [];

  try {
    // Test 1: Connect to Polkadot and test System.Account
    console.log('🔌 Connecting to Polkadot...');
    const wsProvider = getWsProvider('wss://rpc.polkadot.io');
    client = createClient(wsProvider);

    // Load Polkadot descriptor
    const { polkadot } = require('../.papi/descriptors/dist');
    const typedApi = client.getTypedApi(polkadot);

    console.log('✅ Connected and loaded typed API');

    // Test System.Account - requires parameter
    console.log('\n🧪 Testing System.Account.getValue() - should fail (needs parameter)');
    try {
      const account = await Promise.race([
        typedApi.query.System.Account.getValue("5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY"),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 10000))
      ]);
      console.log('✅ System.Account succeeded:', typeof account);
      results.push({ query: 'System.Account.getValue', success: true, result: 'data_returned' });
    } catch (error) {
      console.log('❌ System.Account failed:', error.message);
      results.push({ query: 'System.Account.getValue', success: false, error: error.message });
    }

    // Test System.Number - no parameters needed
    console.log('\n🧪 Testing System.Number.getValue() - should succeed');
    try {
      const blockNumber = await Promise.race([
        typedApi.query.System.Number.getValue(),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 10000))
      ]);
      console.log('✅ System.Number succeeded:', typeof blockNumber, blockNumber?.toString());
      results.push({ query: 'System.Number.getValue', success: true, result: 'data_returned' });
    } catch (error) {
      console.log('❌ System.Number failed:', error.message);
      results.push({ query: 'System.Number.getValue', success: false, error: error.message });
    }

    // Test System.ExtrinsicCount - should succeed
    console.log('\n🧪 Testing System.ExtrinsicCount.getValue()');
    try {
      const extrinsicCount = await Promise.race([
        typedApi.query.System.ExtrinsicCount.getValue(),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 10000))
      ]);
      console.log('✅ System.ExtrinsicCount succeeded:', typeof extrinsicCount, extrinsicCount?.toString());
      results.push({ query: 'System.ExtrinsicCount.getValue', success: true, result: 'data_returned' });
    } catch (error) {
      console.log('❌ System.ExtrinsicCount failed:', error.message);
      results.push({ query: 'System.ExtrinsicCount.getValue', success: false, error: error.message });
    }

    // Test Balances.TotalIssuance - should succeed
    console.log('\n🧪 Testing Balances.TotalIssuance.getValue()');
    try {
      const totalIssuance = await Promise.race([
        typedApi.query.Balances.TotalIssuance.getValue(),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 10000))
      ]);
      console.log('✅ Balances.TotalIssuance succeeded:', typeof totalIssuance, totalIssuance?.toString());
      results.push({ query: 'Balances.TotalIssuance.getValue', success: true, result: 'data_returned' });
    } catch (error) {
      console.log('❌ Balances.TotalIssuance failed:', error.message);
      results.push({ query: 'Balances.TotalIssuance.getValue', success: false, error: error.message });
    }

    // Test Balances.Accounts - requires parameter
    console.log('\n🧪 Testing Balances.Accounts.getValue() - with parameter');
    try {
      const accounts = await Promise.race([
        typedApi.query.Balances.Accounts.getValue("5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY"),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 10000))
      ]);
      console.log('✅ Balances.Accounts succeeded:', typeof accounts);
      results.push({ query: 'Balances.Accounts.getValue', success: true, result: 'data_returned' });
    } catch (error) {
      console.log('❌ Balances.Accounts failed:', error.message);
      results.push({ query: 'Balances.Accounts.getValue', success: false, error: error.message });
    }

  } catch (error) {
    console.error('💥 Connection failed:', error.message);
    return { success: false, error: error.message };
  } finally {
    if (client) {
      console.log('\n🧹 Cleaning up connection...');
      client.destroy();
    }
  }

  // Summary
  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;

  console.log('\n📊 Sample Test Results:');
  console.log('======================');
  console.log(`✅ Successful: ${successful}/${results.length}`);
  console.log(`❌ Failed: ${failed}/${results.length}`);

  if (failed > 0) {
    console.log('\n❌ Failures:');
    results.filter(r => !r.success).forEach(r => {
      console.log(`   ${r.query}: ${r.error}`);
    });
  }

  return {
    success: successful > 0,
    total: results.length,
    successful,
    failed,
    results
  };
}

// Test available chains
async function testChainAvailability() {
  console.log('\n🔍 Testing chain descriptor availability...');

  try {
    const descriptors = require('../.papi/descriptors/dist');
    const availableChains = Object.keys(descriptors).filter(key =>
      typeof descriptors[key] === 'object' &&
      key !== 'getMetadata' &&
      !key.includes('Types')
    );

    console.log(`✅ Available chain descriptors: ${availableChains.join(', ')}`);

    // Test structure of each descriptor
    for (const chainKey of availableChains) {
      const descriptor = descriptors[chainKey];
      console.log(`\n📦 ${chainKey} descriptor structure:`);
      console.log(`   Keys: ${Object.keys(descriptor).join(', ')}`);

      if (descriptor.descriptors) {
        console.log(`   Has descriptors property: true`);
      }

      // Try to see if we can access query structure
      try {
        const hasQuery = !!(descriptor.query || (descriptor.descriptors && descriptor.descriptors.query));
        console.log(`   Has query structure: ${hasQuery}`);
      } catch (e) {
        console.log(`   Query structure check failed: ${e.message}`);
      }
    }

    return availableChains;

  } catch (error) {
    console.error('❌ Failed to load descriptors:', error.message);
    return [];
  }
}

// Run tests
async function main() {
  try {
    // Test 1: Check descriptor availability
    const chains = await testChainAvailability();

    if (chains.length === 0) {
      console.error('❌ No chain descriptors available');
      return;
    }

    // Test 2: Run sample queries
    await testSampleQueries();

  } catch (error) {
    console.error('💥 Test execution failed:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}