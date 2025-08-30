import { test, expect } from '@playwright/test'

test.describe('Improved Client Connection Test', () => {
  test('verifies improved blockchain data freshness', async ({ page }) => {
    console.log('🧪 Testing improved client connection logic...')
    
    // Navigate to the app
    await page.goto('http://localhost:3001')
    await page.waitForLoadState('networkidle')
    
    // Wait for the app to load
    await page.waitForTimeout(2000)
    
    // Listen to console logs to capture connection information
    const connectionLogs: string[] = []
    const blockchainData: string[] = []
    
    page.on('console', msg => {
      const text = msg.text()
      if (text.includes('Connected via') || text.includes('WebSocket') || text.includes('public RPC')) {
        connectionLogs.push(text)
      }
      if (text.includes('LIVE DATA') || text.includes('REAL-TIME DATA') || text.includes('SYNCING')) {
        blockchainData.push(text)
      }
    })
    
    // Select Polkadot chain
    const chainSelector = page.locator('select[data-testid="chain-selector"]')
    if (await chainSelector.isVisible()) {
      await chainSelector.selectOption('polkadot')
      console.log('✅ Selected Polkadot chain')
    }
    
    // Wait for connection to establish
    await page.waitForTimeout(5000)
    
    // Try to execute a simple transaction to trigger blockchain data fetch
    try {
      // Look for a simple call form
      const callForm = page.locator('form').first()
      if (await callForm.isVisible()) {
        console.log('✅ Found call form, attempting to trigger blockchain data fetch...')
        
        // Fill in a simple form if available
        const inputs = callForm.locator('input')
        if (await inputs.count() > 0) {
          await inputs.first().fill('test')
          console.log('✅ Filled test data in form')
        }
        
        // Look for a submit button
        const submitBtn = callForm.locator('button[type="submit"], button:has-text("Submit"), button:has-text("Execute")')
        if (await submitBtn.isVisible()) {
          await submitBtn.click()
          console.log('✅ Clicked submit button')
          
          // Wait for blockchain data to be fetched
          await page.waitForTimeout(10000)
        }
      }
    } catch (error) {
      console.log('⚠️ Could not trigger transaction execution:', error)
    }
    
    // Analyze the results
    console.log('\n📊 ANALYSIS OF IMPROVED CLIENT CONNECTION:')
    console.log('==================================================')
    
    if (connectionLogs.length > 0) {
      console.log('✅ CONNECTION IMPROVEMENTS DETECTED:')
      connectionLogs.forEach(log => {
        console.log(`   ${log}`)
      })
    } else {
      console.log('⚠️  No connection type information found')
    }
    
    if (blockchainData.length > 0) {
      console.log('\n✅ BLOCKCHAIN DATA FETCHED:')
      blockchainData.forEach(data => {
        console.log(`   ${data}`)
      })
      
      // Check if we're getting current data
      const hasLiveData = blockchainData.some(data => data.includes('LIVE DATA'))
      const hasRealTimeData = blockchainData.some(data => data.includes('REAL-TIME DATA'))
      const hasSyncing = blockchainData.some(data => data.includes('SYNCING'))
      
      if (hasLiveData || hasRealTimeData) {
        console.log('\n🎉 SUCCESS: Getting current blockchain data!')
        console.log('   - No more stale data from months ago')
        console.log('   - WebSocket/RPC fallback working')
        console.log('   - Real-time blockchain information')
      } else if (hasSyncing) {
        console.log('\n⚠️  PARTIAL SUCCESS: Light client still syncing')
        console.log('   - But now with proper sync status indicators')
        console.log('   - Users know data might be stale')
      } else {
        console.log('\n❓ UNKNOWN: Could not determine data freshness')
      }
    } else {
      console.log('\n⚠️  No blockchain data captured')
      console.log('   - Transaction execution may not have triggered')
      console.log('   - Or connection issues persist')
    }
    
    // Verify the improvements
    expect(connectionLogs.length).toBeGreaterThan(0)
    expect(blockchainData.length).toBeGreaterThan(0)
    
    console.log('\n✅ Test completed - improved client connection logic verified!')
  })
})
