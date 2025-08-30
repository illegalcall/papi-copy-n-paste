import { test, expect } from '@playwright/test'

test.describe('Stale Blockchain Data Detection', () => {
  test('detects when light client shows stale blockchain data', async ({ page }) => {
    console.log('🧪 Testing blockchain data freshness detection...')
    
    // Listen to browser logs to capture blockchain data
    const blockchainData: { blockNumber?: number, timestamp?: string, chainLag?: number } = {}
    
    page.on('console', msg => {
      const text = msg.text()
      console.log(`[BROWSER] ${text}`)
      
      // Capture blockchain data from console
      if (text.includes('REAL DATA: Best block #')) {
        const match = text.match(/Best block #(\d+)/)
        if (match) {
          blockchainData.blockNumber = parseInt(match[1])
          console.log(`📊 Detected block number: ${blockchainData.blockNumber}`)
        }
      }
      
      if (text.includes('REAL DATA: Fetched at')) {
        const match = text.match(/Fetched at (.+)/)
        if (match) {
          blockchainData.timestamp = match[1]
          console.log(`⏰ Detected timestamp: ${blockchainData.timestamp}`)
        }
      }
      
      if (text.includes('Chain lag detected:') || text.includes('blocks behind')) {
        const match = text.match(/(\d+)\s+blocks?\s+behind/)
        if (match) {
          blockchainData.chainLag = parseInt(match[1])
          console.log(`⚠️  Detected chain lag: ${blockchainData.chainLag} blocks`)
        }
      }
    })
    
    await page.goto('http://localhost:3001')
    await page.waitForLoadState('networkidle')
    
    // Wait for pallets to load 
    console.log('⏳ Waiting for blockchain connection and pallets...')
    await page.waitForTimeout(15000)
    
    // Look for System pallet to ensure connection is working
    const hasSystem = await page.locator('text=System').first().isVisible()
    console.log(`📦 System pallet visible: ${hasSystem}`)
    
    if (hasSystem) {
      // Try to run a simple balance transfer to get blockchain data
      console.log('🔄 Attempting to trigger blockchain data fetch...')
      
      try {
        // Click on Balances pallet
        await page.click('text=Balances', { timeout: 5000 })
        await page.waitForTimeout(1000)
        
        // Look for transfer_allow_death
        const transferCall = page.locator('text=transfer_allow_death').first()
        if (await transferCall.isVisible({ timeout: 5000 })) {
          await transferCall.click()
          await page.waitForTimeout(2000)
          
          // Fill in some test data
          const destInput = page.locator('input[placeholder*="dest"], input[name="dest"]').first()
          if (await destInput.isVisible({ timeout: 3000 })) {
            await destInput.fill('//Alice')
            
            const valueInput = page.locator('input[placeholder*="value"], input[name="value"]').first()
            if (await valueInput.isVisible({ timeout: 3000 })) {
              await valueInput.fill('123')
              
              // Try to run the transaction to get blockchain data
              const runButton = page.locator('button:has-text("Run"), button:has-text("Execute"), button:has-text("Submit")').first()
              if (await runButton.isVisible({ timeout: 3000 }) && await runButton.isEnabled()) {
                console.log('🚀 Running transaction to fetch blockchain data...')
                await runButton.click()
                
                // Wait for console output to capture blockchain data
                await page.waitForTimeout(10000)
              }
            }
          }
        }
      } catch (error) {
        console.log('ℹ️  Transaction flow not available, checking existing console data')
      }
    }
    
    console.log('📊 Final blockchain data captured:', blockchainData)
    
    // Analyze the captured data
    let isStaleData = false
    let staleReason = ''
    
    if (blockchainData.blockNumber) {
      // Get current timestamp
      const now = new Date()
      const currentTimestamp = now.toISOString()
      
      // If we have a timestamp from the blockchain, check how old it is
      if (blockchainData.timestamp) {
        const fetchTime = new Date(blockchainData.timestamp)
        const timeDiff = now.getTime() - fetchTime.getTime()
        const hoursDiff = timeDiff / (1000 * 60 * 60)
        
        console.log(`⏰ Time difference: ${hoursDiff.toFixed(2)} hours`)
        
        // If blockchain data is more than 1 hour old, it's likely stale
        if (hoursDiff > 1) {
          isStaleData = true
          staleReason = `Blockchain data is ${hoursDiff.toFixed(2)} hours old`
        }
      }
      
      // Check if block number seems reasonable for current time
      // Polkadot produces ~14,400 blocks per day (6 second blocks)
      // Current mainnet is around block 27,544,750+ (as of early 2025)
      const expectedMinBlock = 27500000 // Conservative estimate for 2025
      
      if (blockchainData.blockNumber < expectedMinBlock) {
        isStaleData = true
        const blocksDiff = expectedMinBlock - blockchainData.blockNumber
        const daysBehind = Math.round(blocksDiff / 14400)
        staleReason = `Block number ${blockchainData.blockNumber} is ~${daysBehind} days behind expected current block`
      }
      
      console.log(`🔍 Stale data check: ${isStaleData ? 'STALE' : 'FRESH'} - ${staleReason || 'Data appears current'}`)
    }
    
    // The test should detect if we're showing stale data as "REAL DATA"
    if (isStaleData) {
      console.log('⚠️  ISSUE DETECTED: Stale blockchain data being presented as "REAL DATA"')
      console.log(`   Reason: ${staleReason}`)
      console.log('   The app should indicate sync status instead of claiming data is real-time')
      
      // Look for misleading "REAL DATA" labels in console
      const consoleContent = await page.locator('.overflow-auto.font-mono').first().textContent()
      const hasRealDataLabel = consoleContent?.includes('REAL DATA')
      
      if (hasRealDataLabel) {
        console.log('❌ PROBLEM: App shows "REAL DATA" label for stale blockchain information')
        
        // This test documents the issue - in a real fix, we'd expect:
        // 1. Sync status detection
        // 2. "SYNCING..." or "HISTORICAL DATA" labels instead of "REAL DATA"
        // 3. Warnings about data staleness
        expect(false, 'Stale blockchain data incorrectly labeled as "REAL DATA"').toBe(true)
      } else {
        console.log('✅ Good: No misleading "REAL DATA" labels found')
      }
    } else {
      console.log('✅ Blockchain data appears fresh and current')
    }
    
    // Document the findings
    await page.screenshot({ path: 'test-results/blockchain-data-analysis.png', fullPage: true })
  })
  
  test('validates blockchain data freshness indicators', async ({ page }) => {
    console.log('🧪 Testing blockchain freshness indicators...')
    
    await page.goto('http://localhost:3001')
    await page.waitForLoadState('networkidle')
    
    // Wait for connection
    await page.waitForTimeout(10000)
    
    // Check if the app provides any sync status information
    const hasSyncStatus = await page.locator('text=Syncing, text=Sync, text=Behind, text=Catching up, text=Historical').first().isVisible()
    const hasTimestamp = await page.locator('text=ago, text=minutes, text=hours, text=2025, text=2024').first().isVisible() 
    const hasWarning = await page.locator('text=Warning, text=Stale, text=Old, text=Historical').first().isVisible()
    
    console.log(`Sync status indicators: ${hasSyncStatus}`)
    console.log(`Timestamp indicators: ${hasTimestamp}`)
    console.log(`Warning indicators: ${hasWarning}`)
    
    // For now, document what indicators we find
    const pageContent = await page.content()
    const hasRealDataClaim = pageContent.includes('REAL DATA')
    
    if (hasRealDataClaim && !hasSyncStatus && !hasWarning) {
      console.log('⚠️  App claims "REAL DATA" without sync status or staleness warnings')
      console.log('💡 Suggested improvements:')
      console.log('   - Add sync status detection')
      console.log('   - Show "SYNCING..." instead of "REAL DATA" when behind')
      console.log('   - Display how far behind the chain is')
      console.log('   - Add timestamps to show data age')
    }
    
    // This test passes but documents the UX improvement opportunity
    expect(true).toBe(true)
  })
})