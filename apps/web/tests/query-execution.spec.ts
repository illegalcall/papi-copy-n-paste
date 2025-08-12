import { test, expect } from '@playwright/test'

test.describe('Query Execution and Code Generation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('domcontentloaded')
    // Allow time for initial connection
    await page.waitForTimeout(5000)
  })

  test('should execute System.chain query', async ({ page }) => {
    // Navigate to System pallet
    const systemPallet = page.locator('text=System').first()
    await expect(systemPallet).toBeVisible()
    await systemPallet.click()
    
    await page.waitForTimeout(1000)
    
    // Look for chain query
    const chainQuery = page.locator('text=chain').first()
    await expect(chainQuery).toBeVisible()
    await chainQuery.click()
    
    await page.waitForTimeout(2000)
    
    // Should generate code
    const codeDisplay = page.locator('pre, code, [data-testid="generated-code"], [class*="syntax"]')
    await expect(codeDisplay).toBeVisible()
    
    // Code should contain expected imports and setup
    const generatedCode = await codeDisplay.first().textContent()
    expect(generatedCode).toContain('import')
    expect(generatedCode).toContain('createClient')
    expect(generatedCode).toContain('System')
    expect(generatedCode).toContain('chain')
  })

  test('should execute Balances.totalIssuance query', async ({ page }) => {
    // Navigate to Balances pallet
    const balancesPallet = page.locator('text=Balances').first()
    
    if (await balancesPallet.isVisible()) {
      await balancesPallet.click()
      await page.waitForTimeout(1000)
      
      // Look for totalIssuance storage query
      const totalIssuanceQuery = page.locator('text=totalIssuance, text=total_issuance').first()
      
      if (await totalIssuanceQuery.isVisible()) {
        await totalIssuanceQuery.click()
        await page.waitForTimeout(2000)
        
        // Should generate storage query code
        const codeDisplay = page.locator('pre, code')
        await expect(codeDisplay).toBeVisible()
        
        const generatedCode = await codeDisplay.first().textContent()
        expect(generatedCode).toContain('Balances')
        expect(generatedCode).toContain('totalIssuance')
        expect(generatedCode).toContain('query')
      }
    }
  })

  test('should generate code with setup commands', async ({ page }) => {
    // Execute any query
    const systemPallet = page.locator('text=System').first()
    await systemPallet.click()
    await page.waitForTimeout(1000)
    
    const chainQuery = page.locator('text=chain').first()
    await chainQuery.click()
    await page.waitForTimeout(2000)
    
    // Generated code should include setup commands
    const codeDisplay = page.locator('pre, code').first()
    const generatedCode = await codeDisplay.textContent()
    
    // Should contain setup instructions
    expect(generatedCode).toContain('npm install')
    expect(generatedCode).toContain('papi add')
    expect(generatedCode).toContain('papi generate')
  })

  test('should generate different code for different providers', async ({ page }) => {
    // Test with default provider (likely Smoldot)
    const systemPallet = page.locator('text=System').first()
    await systemPallet.click()
    await page.waitForTimeout(1000)
    
    const chainQuery = page.locator('text=chain').first()
    await chainQuery.click()
    await page.waitForTimeout(2000)
    
    const codeDisplay = page.locator('pre, code').first()
    const smoldotCode = await codeDisplay.textContent()
    
    // Switch to RPC provider
    const networkButton = page.locator('[data-testid="network-button"], button:has-text("Polkadot")').first()
    await networkButton.click()
    await page.waitForTimeout(1000)
    
    const rpcProvider = page.locator('text=RPC, [title*="RPC"], .text-blue-600').first()
    
    if (await rpcProvider.isVisible()) {
      await rpcProvider.click()
      await page.waitForTimeout(3000)
      
      // Execute same query with RPC provider
      await systemPallet.click()
      await page.waitForTimeout(1000)
      await chainQuery.click()
      await page.waitForTimeout(2000)
      
      const rpcCode = await codeDisplay.textContent()
      
      // Code should be different for different providers
      expect(smoldotCode).not.toBe(rpcCode)
      
      // RPC code should contain specific imports
      expect(rpcCode).toContain('getWsProvider')
      expect(rpcCode).toContain('withPolkadotSdkCompat')
    }
  })

  test('should handle transaction calls', async ({ page }) => {
    // Navigate to Balances pallet
    const balancesPallet = page.locator('text=Balances').first()
    
    if (await balancesPallet.isVisible()) {
      await balancesPallet.click()
      await page.waitForTimeout(1000)
      
      // Look for transfer transaction
      const transferCall = page.locator('text=transfer, text=transfer_allow_death').first()
      
      if (await transferCall.isVisible()) {
        await transferCall.click()
        await page.waitForTimeout(2000)
        
        // Should show parameter form
        const parameterForm = page.locator('form, input, [data-testid="parameter-form"]')
        await expect(parameterForm).toBeVisible()
        
        // Should generate transaction code
        const codeDisplay = page.locator('pre, code')
        await expect(codeDisplay).toBeVisible()
        
        const generatedCode = await codeDisplay.first().textContent()
        expect(generatedCode).toContain('transfer')
        expect(generatedCode).toContain('tx')
      }
    }
  })

  test('should show parameter forms for complex calls', async ({ page }) => {
    // Find a call that requires parameters
    const balancesPallet = page.locator('text=Balances').first()
    
    if (await balancesPallet.isVisible()) {
      await balancesPallet.click()
      await page.waitForTimeout(1000)
      
      const transferCall = page.locator('text=transfer, text=transfer_allow_death').first()
      
      if (await transferCall.isVisible()) {
        await transferCall.click()
        await page.waitForTimeout(2000)
        
        // Should show input fields for parameters
        const inputs = page.locator('input[type="text"], input[type="number"], textarea')
        const inputCount = await inputs.count()
        expect(inputCount).toBeGreaterThan(0)
        
        // Fill in some test parameters
        if (inputCount > 0) {
          await inputs.first().fill('5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY')
          
          if (inputCount > 1) {
            await inputs.nth(1).fill('1000000000000') // 1 DOT in planck
          }
          
          await page.waitForTimeout(1000)
          
          // Code should update with parameters
          const codeDisplay = page.locator('pre, code').first()
          const updatedCode = await codeDisplay.textContent()
          expect(updatedCode).toContain('transfer')
        }
      }
    }
  })

  test('should copy generated code to clipboard', async ({ page }) => {
    // Execute a query
    const systemPallet = page.locator('text=System').first()
    await systemPallet.click()
    await page.waitForTimeout(1000)
    
    const chainQuery = page.locator('text=chain').first()
    await chainQuery.click()
    await page.waitForTimeout(2000)
    
    // Look for copy button
    const copyButton = page.locator('button:has-text("Copy"), [title="Copy"], [data-testid="copy-button"]')
    
    if (await copyButton.isVisible()) {
      // Grant clipboard permissions
      await page.context().grantPermissions(['clipboard-read', 'clipboard-write'])
      
      await copyButton.click()
      await page.waitForTimeout(500)
      
      // Verify copy success (button might change text or show checkmark)
      const copySuccess = page.locator('button:has-text("Copied"), [title="Copied"], .text-green-500')
      await expect(copySuccess).toBeVisible({ timeout: 3000 })
    }
  })

  test('should maintain state when switching between pallets', async ({ page }) => {
    // Select System pallet
    const systemPallet = page.locator('text=System').first()
    await systemPallet.click()
    await page.waitForTimeout(1000)
    
    const chainQuery = page.locator('text=chain').first()
    await chainQuery.click()
    await page.waitForTimeout(2000)
    
    // Verify System chain code is displayed
    let codeDisplay = page.locator('pre, code').first()
    let generatedCode = await codeDisplay.textContent()
    expect(generatedCode).toContain('System')
    expect(generatedCode).toContain('chain')
    
    // Switch to Balances
    const balancesPallet = page.locator('text=Balances').first()
    
    if (await balancesPallet.isVisible()) {
      await balancesPallet.click()
      await page.waitForTimeout(1000)
      
      const totalIssuanceQuery = page.locator('text=totalIssuance').first()
      
      if (await totalIssuanceQuery.isVisible()) {
        await totalIssuanceQuery.click()
        await page.waitForTimeout(2000)
        
        // Code should update to Balances
        generatedCode = await codeDisplay.textContent()
        expect(generatedCode).toContain('Balances')
        expect(generatedCode).toContain('totalIssuance')
        
        // Switch back to System
        await systemPallet.click()
        await page.waitForTimeout(1000)
        await chainQuery.click()
        await page.waitForTimeout(2000)
        
        // Should show System code again
        generatedCode = await codeDisplay.textContent()
        expect(generatedCode).toContain('System')
        expect(generatedCode).toContain('chain')
      }
    }
  })
})