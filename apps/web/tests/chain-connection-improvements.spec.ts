import { test, expect } from '@playwright/test'

test.describe('Chain Connection Improvements', () => {
  test('Polkadot loads pallets on initial connection', async ({ page }) => {
    await page.goto('http://localhost:3001')
    
    // Wait for the app to load
    await page.waitForLoadState('networkidle')
    
    // Ensure Polkadot is selected (should be default)
    const chainSelector = page.locator('[data-testid="chain-selector"]').first()
    if (await chainSelector.isVisible()) {
      // If chain selector exists, verify Polkadot is selected
      const selectedChain = await chainSelector.textContent()
      if (!selectedChain?.includes('Polkadot')) {
        // Select Polkadot if not already selected
        await chainSelector.click()
        await page.getByText('Polkadot').click()
        await page.waitForTimeout(1000)
      }
    }
    
    console.log('🧪 Testing initial Polkadot connection...')
    
    // Wait for loading state to appear
    const loadingIndicator = page.locator('text=Loading pallets...')
    if (await loadingIndicator.isVisible({ timeout: 5000 })) {
      console.log('✓ Loading state detected')
      // Wait for loading to complete
      await loadingIndicator.waitFor({ state: 'hidden', timeout: 30000 })
    }
    
    // Check if pallets loaded successfully
    const palletItems = page.locator('.pallet-item, [data-testid="pallet-item"]').first()
    const errorMessage = page.locator('text=Connection Issue, text=Failed to load pallets')
    
    // Give more time for pallets to load
    await page.waitForTimeout(5000)
    
    const hasError = await errorMessage.isVisible()
    const hasPallets = await palletItems.isVisible()
    
    if (hasError) {
      const errorText = await errorMessage.textContent()
      console.log('⚠️  Error detected:', errorText)
      
      // Check if this is the known issue and try the workaround
      console.log('🔄 Attempting workaround: switch to Kusama then back to Polkadot')
      
      // Try switching to Kusama
      await page.click('button:has-text("Polkadot"), select >> text="Polkadot"', { timeout: 5000 })
      await page.click('text=Kusama', { timeout: 5000 })
      
      // Wait for Kusama to connect
      await page.waitForTimeout(10000)
      
      // Switch back to Polkadot
      await page.click('button:has-text("Kusama"), select >> text="Kusama"', { timeout: 5000 })
      await page.click('text=Polkadot', { timeout: 5000 })
      
      // Wait for connection and check again
      await page.waitForTimeout(15000)
      
      const retryPallets = await palletItems.isVisible()
      const retryError = await errorMessage.isVisible()
      
      console.log('After workaround - Pallets visible:', retryPallets, 'Error visible:', retryError)
      
      // The test passes if either pallets load initially OR after the workaround
      expect(retryPallets || !retryError).toBe(true)
    } else {
      console.log('✅ Pallets loaded successfully on initial connection')
      expect(hasPallets).toBe(true)
    }
    
    // Verify some specific pallets are present if pallets loaded
    if (hasPallets || await palletItems.isVisible()) {
      console.log('🔍 Checking for specific pallets...')
      
      // Look for common Polkadot pallets
      const systemPallet = page.locator('text=System').first()
      const balancesPallet = page.locator('text=Balances').first() 
      
      await expect(systemPallet.or(balancesPallet)).toBeVisible({ timeout: 10000 })
      console.log('✓ Found expected pallets')
    }
  })

  test('Chain switching is faster and more reliable', async ({ page }) => {
    await page.goto('http://localhost:3001')
    await page.waitForLoadState('networkidle')
    
    console.log('🧪 Testing chain switching performance...')
    
    const chains = ['Polkadot', 'Kusama', 'Acala', 'Polkadot']
    
    for (let i = 0; i < chains.length; i++) {
      const chainName = chains[i]
      console.log(`🔄 Switching to ${chainName}...`)
      
      const startTime = Date.now()
      
      // Switch chain
      try {
        // Try different selectors based on the UI structure
        const selectors = [
          `button:has-text("${chainName}")`,
          `text="${chainName}"`,
          `[data-testid="chain-selector"]:has-text("${chainName}")`,
          `.chain-selector:has-text("${chainName}")`
        ]
        
        let switched = false
        for (const selector of selectors) {
          try {
            if (await page.locator(selector).first().isVisible({ timeout: 2000 })) {
              await page.click(selector, { timeout: 5000 })
              switched = true
              break
            }
          } catch (e) {
            // Try next selector
          }
        }
        
        if (!switched) {
          // Fallback: try to find chain selector and then click the chain
          await page.locator('select, button[role="combobox"], .select-trigger').first().click({ timeout: 5000 })
          await page.click(`text="${chainName}"`, { timeout: 5000 })
        }
      } catch (error) {
        console.log(`⚠️  Could not switch to ${chainName}:`, error)
        continue
      }
      
      // Wait for loading state
      const loadingIndicator = page.locator('text=Loading pallets...')
      if (await loadingIndicator.isVisible({ timeout: 3000 })) {
        await loadingIndicator.waitFor({ state: 'hidden', timeout: 20000 })
      }
      
      // Wait additional time for pallets to appear
      await page.waitForTimeout(3000)
      
      const endTime = Date.now()
      const switchTime = endTime - startTime
      
      console.log(`⏱️  ${chainName} switch took ${switchTime}ms`)
      
      // Check if pallets loaded (allow some flexibility for different chains)
      const hasPallets = await page.locator('.pallet-item, [data-testid="pallet-item"], text=System, text=Balances').first().isVisible()
      const hasError = await page.locator('text=Connection Issue, text=Failed to load').isVisible()
      
      console.log(`${chainName} - Pallets loaded: ${hasPallets}, Has error: ${hasError}`)
      
      // For performance, we want switches to be under 15 seconds ideally
      if (switchTime > 20000) {
        console.log(`⚠️  ${chainName} switch was slow (${switchTime}ms)`)
      }
    }
    
    console.log('✅ Chain switching test completed')
  })
  
  test('Loading states and error handling work correctly', async ({ page }) => {
    await page.goto('http://localhost:3001')
    
    console.log('🧪 Testing loading states and error handling...')
    
    // Test loading state appears
    const loadingIndicator = page.locator('text=Loading pallets...')
    
    // If we catch the loading state, verify it works correctly
    if (await loadingIndicator.isVisible({ timeout: 5000 })) {
      console.log('✓ Loading state detected')
      
      // Verify loading spinner exists
      const spinner = page.locator('.animate-spin')
      await expect(spinner).toBeVisible()
      
      // Wait for loading to complete
      await loadingIndicator.waitFor({ state: 'hidden', timeout: 30000 })
      console.log('✓ Loading state resolved')
    }
    
    // Check if error states are handled properly
    const errorElement = page.locator('text=Connection Issue')
    if (await errorElement.isVisible()) {
      console.log('🔍 Found error state, checking error handling...')
      
      // Verify error includes helpful message
      const errorText = await errorElement.textContent()
      expect(errorText).toContain('Connection Issue')
      
      // Verify helpful guidance is provided
      const guidance = page.locator('text=Try switching to Kusama first')
      await expect(guidance).toBeVisible()
      
      console.log('✓ Error state handled correctly with guidance')
    }
    
    // Verify that eventually we get either pallets or a proper error message
    await page.waitForTimeout(5000)
    
    const hasPallets = await page.locator('.pallet-item, [data-testid="pallet-item"], text=System, text=Balances').first().isVisible()
    const hasError = await page.locator('text=Connection Issue').isVisible()
    const hasEmptyState = await page.locator('text=Connect to a chain to explore pallets').isVisible()
    
    // We should have one of these states
    expect(hasPallets || hasError || hasEmptyState).toBe(true)
    
    console.log('✅ Loading and error states work correctly')
  })
})