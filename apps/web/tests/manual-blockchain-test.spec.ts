import { test, expect } from '@playwright/test'

test.describe('Manual Stale Blockchain Data Test', () => {
  test('observe blockchain data freshness issue', async ({ page }) => {
    console.log('🧪 Testing blockchain data freshness (manual)...')
    
    // Listen to browser logs to capture blockchain data
    const capturedData: string[] = []
    
    page.on('console', msg => {
      const text = msg.text()
      capturedData.push(text)
      
      // Log important blockchain-related messages
      if (text.includes('REAL DATA') || 
          text.includes('block') || 
          text.includes('chain') ||
          text.includes('Fetched at') ||
          text.includes('Best block') ||
          text.includes('Finalized')) {
        console.log(`[BLOCKCHAIN] ${text}`)
      }
    })
    
    await page.goto('http://localhost:3001')
    await page.waitForLoadState('networkidle')
    
    console.log('⏳ Waiting for app to load and connect...')
    await page.waitForTimeout(8000)
    
    // Check if we have pallets loaded
    const hasBalances = await page.locator('text=Balances').first().isVisible()
    console.log(`📦 Balances pallet loaded: ${hasBalances}`)
    
    if (hasBalances) {
      console.log('🔄 Attempting to trigger transaction to see blockchain data...')
      
      try {
        // Click Balances
        await page.click('text=Balances', { timeout: 3000 })
        await page.waitForTimeout(1000)
        
        // Try to find and click a transfer call
        const transferButton = page.locator('text=transfer_allow_death, text=transfer').first()
        if (await transferButton.isVisible({ timeout: 3000 })) {
          await transferButton.click()
          await page.waitForTimeout(2000)
          
          // Fill in dummy data
          const inputs = page.locator('input')
          const inputCount = await inputs.count()
          console.log(`Found ${inputCount} input fields`)
          
          for (let i = 0; i < inputCount && i < 3; i++) {
            try {
              const input = inputs.nth(i)
              const placeholder = await input.getAttribute('placeholder') || ''
              const name = await input.getAttribute('name') || ''
              
              if (placeholder.includes('dest') || name.includes('dest')) {
                await input.fill('//Alice')
                console.log('✓ Filled dest field')
              } else if (placeholder.includes('value') || name.includes('value') || placeholder.includes('amount')) {
                await input.fill('1000000000000') // 1 DOT in planck
                console.log('✓ Filled value field')  
              }
            } catch (e) {
              // Skip if field not fillable
            }
          }
          
          // Try to run the transaction
          const runButtons = page.locator('button:has-text("Run"), button:has-text("Execute"), button:has-text("Submit")')
          const runButton = runButtons.first()
          
          if (await runButton.isVisible({ timeout: 3000 })) {
            const isEnabled = await runButton.isEnabled()
            console.log(`🚀 Run button enabled: ${isEnabled}`)
            
            if (isEnabled) {
              console.log('🚀 Executing transaction to capture blockchain data...')
              await runButton.click()
              
              // Wait for console output with blockchain data
              await page.waitForTimeout(15000)
              
              // Switch to console tab to see the output
              const consoleTab = page.locator('button:has-text("Console")').first()
              if (await consoleTab.isVisible({ timeout: 3000 })) {
                await consoleTab.click()
                await page.waitForTimeout(2000)
              }
            }
          }
        }
      } catch (error) {
        console.log(`ℹ️  Transaction UI interaction failed: ${error}`)
      }
    }
    
    // Take screenshot for manual analysis
    await page.screenshot({ 
      path: 'test-results/blockchain-data-manual.png', 
      fullPage: true 
    })
    
    // Analyze captured console logs for blockchain data
    console.log('\n📊 ANALYSIS OF CAPTURED BLOCKCHAIN DATA:')
    console.log('=' .repeat(50))
    
    const blockchainLogs = capturedData.filter(log => 
      log.includes('REAL DATA') || 
      log.includes('Best block') || 
      log.includes('Finalized') || 
      log.includes('Genesis hash') ||
      log.includes('Chain name') ||
      log.includes('Fetched at')
    )
    
    if (blockchainLogs.length > 0) {
      console.log('🔍 Found blockchain data in logs:')
      blockchainLogs.forEach((log, i) => {
        console.log(`  ${i + 1}. ${log}`)
      })
      
      // Look for specific patterns that indicate stale data
      const bestBlockLog = blockchainLogs.find(log => log.includes('Best block #'))
      if (bestBlockLog) {
        const match = bestBlockLog.match(/Best block #(\d+)/)
        if (match) {
          const blockNumber = parseInt(match[1])
          console.log(`\n📊 DETECTED BLOCK NUMBER: ${blockNumber}`)
          
          // Check if this looks stale (current Polkadot mainnet is ~27.5M blocks)
          if (blockNumber < 27000000) {
            console.log(`⚠️  STALE DATA DETECTED!`)
            console.log(`   Block ${blockNumber} appears to be from months ago`)
            console.log(`   Expected current block: >27,500,000`)
            console.log(`   Difference: ~${(27500000 - blockNumber).toLocaleString()} blocks`)
            console.log(`   Estimated age: ~${Math.round((27500000 - blockNumber) / 14400)} days old`)
          } else {
            console.log(`✅ Block number appears current`)
          }
        }
      }
      
      // Check for "REAL DATA" claims
      const realDataClaims = capturedData.filter(log => log.includes('REAL DATA'))
      if (realDataClaims.length > 0 && bestBlockLog) {
        console.log(`\n❗ ISSUE IDENTIFIED:`)
        console.log(`   App shows ${realDataClaims.length} "REAL DATA" labels`)
        console.log(`   But blockchain data may be stale/syncing`)
        console.log(`   This is misleading to users`)
      }
    } else {
      console.log('ℹ️  No blockchain data found in console logs')
      console.log('   This might indicate the transaction didn\'t execute')
      console.log('   or the blockchain connection isn\'t working')
    }
    
    console.log('\n💡 RECOMMENDATIONS:')
    console.log('   1. Add sync status detection to light client')
    console.log('   2. Show "SYNCING..." instead of "REAL DATA" when behind')
    console.log('   3. Display chain lag (blocks behind current)')
    console.log('   4. Add timestamps to show data age')
    console.log('   5. Warn users when data is more than X minutes old')
    
    // Test passes - we've observed and documented the issue
    expect(true).toBe(true)
  })
})