import { test, expect } from '@playwright/test'

test.describe('Provider-Specific Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('domcontentloaded')
    await page.waitForTimeout(3000)
  })

  test('should test Smoldot Light Client provider', async ({ page }) => {
    // Open network modal
    const networkButton = page.locator('[data-testid="network-button"], button:has-text("Polkadot")').first()
    await networkButton.click()
    
    await page.waitForTimeout(1000)
    
    // Look for Smoldot/Light Client provider
    const lightClientProvider = page.locator('text=Light Client, [title*="Smoldot"], .text-purple-600').first()
    
    if (await lightClientProvider.isVisible()) {
      await lightClientProvider.click()
      
      // Wait for connection
      await page.waitForTimeout(10000) // Smoldot can take longer to connect
      
      // Check connection status
      const connectionStatus = page.locator('.bg-green-500, .bg-yellow-500, text=connected, text=connecting')
      await expect(connectionStatus).toBeVisible()
      
      // Try to perform a query
      await test.step('perform system chain query with Smoldot', async () => {
        // Look for System pallet
        const systemPallet = page.locator('text=System').first()
        if (await systemPallet.isVisible()) {
          await systemPallet.click()
          await page.waitForTimeout(1000)
          
          // Look for chain query
          const chainCall = page.locator('text=chain, text=number').first()
          if (await chainCall.isVisible()) {
            await chainCall.click()
            await page.waitForTimeout(2000)
            
            // Should see generated code
            const codeArea = page.locator('pre, code, [class*="syntax"], [data-testid="generated-code"]')
            await expect(codeArea).toBeVisible()
          }
        }
      })
    }
  })

  test('should test RPC provider connections', async ({ page }) => {
    // Open network modal
    const networkButton = page.locator('[data-testid="network-button"], button:has-text("Polkadot")').first()
    await networkButton.click()
    
    await page.waitForTimeout(1000)
    
    // Look for RPC provider option
    const rpcProvider = page.locator('text=RPC, [title*="RPC"], .text-blue-600').first()
    
    if (await rpcProvider.isVisible()) {
      await rpcProvider.click()
      
      // Wait for RPC connection
      await page.waitForTimeout(5000)
      
      // Check connection status
      const connectionStatus = page.locator('.bg-green-500, .bg-yellow-500, text=connected, text=connecting')
      await expect(connectionStatus).toBeVisible()
      
      // Verify RPC-specific setup in generated code
      await test.step('verify RPC code generation', async () => {
        const systemPallet = page.locator('text=System').first()
        if (await systemPallet.isVisible()) {
          await systemPallet.click()
          await page.waitForTimeout(1000)
          
          const chainCall = page.locator('text=chain').first()
          if (await chainCall.isVisible()) {
            await chainCall.click()
            await page.waitForTimeout(2000)
            
            // Generated code should include RPC-specific imports
            const generatedCode = await page.locator('pre, code').first().textContent()
            expect(generatedCode).toContain('getWsProvider')
            expect(generatedCode).toContain('withPolkadotSdkCompat')
          }
        }
      })
    }
  })

  test('should test Chopsticks provider', async ({ page }) => {
    // Open network modal
    const networkButton = page.locator('[data-testid="network-button"], button:has-text("Polkadot")').first()
    await networkButton.click()
    
    await page.waitForTimeout(1000)
    
    // Look for Chopsticks provider
    const chopsticksProvider = page.locator('text=Chopsticks, [title*="Chopsticks"], .text-orange-600').first()
    
    if (await chopsticksProvider.isVisible()) {
      await chopsticksProvider.click()
      
      // Wait for connection attempt (Chopsticks might fail if not running)
      await page.waitForTimeout(5000)
      
      // Check connection status (could be error if Chopsticks server not running)
      const connectionStatus = page.locator('.bg-green-500, .bg-yellow-500, .bg-red-500, text=connected, text=connecting, text=error')
      await expect(connectionStatus).toBeVisible()
      
      // Verify Chopsticks-specific code generation
      await test.step('verify Chopsticks code generation', async () => {
        const systemPallet = page.locator('text=System').first()
        if (await systemPallet.isVisible()) {
          await systemPallet.click()
          await page.waitForTimeout(1000)
          
          const chainCall = page.locator('text=chain').first()
          if (await chainCall.isVisible()) {
            await chainCall.click()
            await page.waitForTimeout(2000)
            
            // Generated code should include Chopsticks-specific imports
            const generatedCode = await page.locator('pre, code').first().textContent()
            expect(generatedCode).toContain('withChopsticksEnhancer')
          }
        }
      })
    }
  })

  test('should handle provider connection errors gracefully', async ({ page }) => {
    // Open network modal
    const networkButton = page.locator('[data-testid="network-button"], button:has-text("Polkadot")').first()
    await networkButton.click()
    
    await page.waitForTimeout(1000)
    
    // Try Chopsticks (likely to fail if server not running)
    const chopsticksProvider = page.locator('text=Chopsticks, [title*="Chopsticks"], .text-orange-600').first()
    
    if (await chopsticksProvider.isVisible()) {
      await chopsticksProvider.click()
      
      // Wait for connection attempt
      await page.waitForTimeout(8000)
      
      // Should show error state or graceful fallback
      const errorIndicator = page.locator('.bg-red-500, text=error, text=failed, text=disconnected')
      const successIndicator = page.locator('.bg-green-500, text=connected')
      
      // Either error or success should be visible (depends on whether Chopsticks is running)
      const hasStatus = await errorIndicator.isVisible() || await successIndicator.isVisible()
      expect(hasStatus).toBe(true)
      
      // Application should remain functional even with connection errors
      await expect(page.locator('text=System')).toBeVisible()
    }
  })

  test('should switch between providers and maintain functionality', async ({ page }) => {
    // Test switching from default to RPC
    const networkButton = page.locator('[data-testid="network-button"], button:has-text("Polkadot")').first()
    await networkButton.click()
    
    await page.waitForTimeout(1000)
    
    // Switch to RPC first
    const rpcProvider = page.locator('text=RPC, [title*="RPC"], .text-blue-600').first()
    if (await rpcProvider.isVisible()) {
      await rpcProvider.click()
      await page.waitForTimeout(5000)
      
      // Verify RPC connection
      let connectionStatus = page.locator('.bg-green-500, .bg-yellow-500')
      await expect(connectionStatus).toBeVisible()
      
      // Open modal again and switch to Smoldot
      await networkButton.click()
      await page.waitForTimeout(1000)
      
      const smoldotProvider = page.locator('text=Light Client, [title*="Smoldot"], .text-purple-600').first()
      if (await smoldotProvider.isVisible()) {
        await smoldotProvider.click()
        await page.waitForTimeout(8000)
        
        // Verify Smoldot connection
        connectionStatus = page.locator('.bg-green-500, .bg-yellow-500')
        await expect(connectionStatus).toBeVisible()
        
        // Both providers should maintain app functionality
        await expect(page.locator('text=System')).toBeVisible()
      }
    }
  })

  test('should show provider-specific information', async ({ page }) => {
    const networkButton = page.locator('[data-testid="network-button"], button:has-text("Polkadot")').first()
    await networkButton.click()
    
    await page.waitForTimeout(1000)
    
    // Should show provider descriptions or reliability indicators
    const providers = page.locator('[data-testid="provider-option"], .grid > div, .provider-list > *')
    const providerCount = await providers.count()
    
    if (providerCount > 0) {
      // Each provider should have some identifying information
      for (let i = 0; i < Math.min(providerCount, 3); i++) {
        const provider = providers.nth(i)
        
        // Should have provider name/type
        const hasText = await provider.locator('text=Light Client, text=RPC, text=Chopsticks, text=Custom').count() > 0
        if (!hasText) {
          // Or should have visual indicators (icons)
          const hasIcon = await provider.locator('svg, img, [class*="icon"]').count() > 0
          expect(hasIcon).toBe(true)
        }
      }
    }
  })
})