import { test, expect } from '@playwright/test'

test.describe('Pallet Calls Verification', () => {
  test('should show calls for all major pallets', async ({ page }) => {
    // Navigate to the page
    await page.goto('http://localhost:3001')
    
    // Wait for the page to load and pallets to appear
    await page.waitForSelector('[data-testid="pallet-tree"]', { timeout: 10000 })
    
    // Define pallets that should have calls
    const palletsWithCalls = [
      'Balances',
      'Treasury', 
      'Utility',
      'Vesting',
      'System',
      'Timestamp'
    ]
    
    for (const palletName of palletsWithCalls) {
      console.log(`\n🔍 Checking pallet: ${palletName}`)
      
      // Find the pallet
      const pallet = page.locator(`[data-testid="pallet-item"]:has-text("${palletName}")`)
      await expect(pallet).toBeVisible()
      
      // Click to expand the pallet if not already expanded
      const palletButton = pallet.locator('button').first()
      await palletButton.click()
      
      // Wait a bit for expansion
      await page.waitForTimeout(500)
      
      // Look for the Calls section under this pallet
      const callsSection = page.locator(`button:has-text("Calls")`)
        .filter({ has: page.locator(`text=${palletName}`) })
      
      // Check if calls section exists
      const callsSectionExists = await callsSection.count() > 0
      
      if (callsSectionExists) {
        console.log(`✅ ${palletName}: Found Calls section`)
        
        // Get the calls count from the section text
        const callsText = await callsSection.textContent()
        const callsMatch = callsText?.match(/Calls \((\d+)\)/)
        const callsCount = callsMatch ? parseInt(callsMatch[1]) : 0
        
        console.log(`   Calls count: ${callsCount}`)
        
        // Verify the pallet has at least 1 call
        expect(callsCount).toBeGreaterThan(0)
        
        // Click to expand calls section
        await callsSection.click()
        await page.waitForTimeout(300)
        
        // Verify individual calls are visible
        const calls = page.locator(`button[class*="w-full justify-start h-6"]:near(${callsSection})`)
        const actualCallsCount = await calls.count()
        console.log(`   Visible calls: ${actualCallsCount}`)
        
        expect(actualCallsCount).toBeGreaterThan(0)
        
        // Log the first few call names
        for (let i = 0; i < Math.min(3, actualCallsCount); i++) {
          const callText = await calls.nth(i).textContent()
          console.log(`   - ${callText}`)
        }
      } else {
        console.log(`❌ ${palletName}: No Calls section found`)
        
        // This should fail the test
        expect(callsSectionExists).toBe(true)
      }
    }
  })
  
  test('should show specific transfer calls in Balances pallet', async ({ page }) => {
    await page.goto('http://localhost:3001')
    await page.waitForSelector('[data-testid="pallet-tree"]', { timeout: 10000 })
    
    // Find and expand Balances pallet
    const balancesPallet = page.locator(`[data-testid="pallet-item"]:has-text("Balances")`)
    await expect(balancesPallet).toBeVisible()
    
    const palletButton = balancesPallet.locator('button').first()
    await palletButton.click()
    await page.waitForTimeout(500)
    
    // Find and expand calls section
    const callsSection = balancesPallet.locator(`button:has-text("Calls")`)
    await expect(callsSection).toBeVisible()
    await callsSection.click()
    await page.waitForTimeout(300)
    
    // Check for specific transfer functions
    const expectedCalls = [
      'transfer',
      'transfer_allow_death',
      'transfer_keep_alive'
    ]
    
    for (const callName of expectedCalls) {
      const callButton = page.locator(`button:has-text("${callName}")`)
      await expect(callButton).toBeVisible()
      console.log(`✅ Found ${callName} in Balances calls`)
    }
  })

  test('should show Treasury calls', async ({ page }) => {
    await page.goto('http://localhost:3001')
    await page.waitForSelector('[data-testid="pallet-tree"]', { timeout: 10000 })
    
    // Find and expand Treasury pallet
    const treasuryPallet = page.locator(`[data-testid="pallet-item"]:has-text("Treasury")`)
    await expect(treasuryPallet).toBeVisible()
    
    const palletButton = treasuryPallet.locator('button').first()
    await palletButton.click()
    await page.waitForTimeout(500)
    
    // Find and expand calls section
    const callsSection = treasuryPallet.locator(`button:has-text("Calls")`)
    await expect(callsSection).toBeVisible()
    
    // Get calls count
    const callsText = await callsSection.textContent()
    const callsMatch = callsText?.match(/Calls \((\d+)\)/)
    const callsCount = callsMatch ? parseInt(callsMatch[1]) : 0
    
    console.log(`Treasury calls count: ${callsCount}`)
    expect(callsCount).toBeGreaterThan(0)
  })
})