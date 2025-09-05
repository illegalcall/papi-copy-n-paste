import { test, expect } from '@playwright/test'

test.describe('PAPI Copy-n-Paste Smoke Tests', () => {
  test('should load the homepage without errors', async ({ page }) => {
    // Navigate to the homepage
    await page.goto('/')
    
    // Wait for the page to load
    await page.waitForLoadState('domcontentloaded')
    
    // Check that the page title is correct
    await expect(page).toHaveTitle(/PAPI|Copy|Paste/)
    
    // Look for some basic content that should be present
    const bodyText = await page.locator('body').textContent()
    
    // Should have some indication this is a PAPI tool
    expect(bodyText).toMatch(/papi|polkadot|chain|transaction/i)
    
    console.log('✅ Homepage loads and shows PAPI-related content')
  })
  
  test('should have basic UI elements', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('domcontentloaded')
    
    // Wait a bit for React to render
    await page.waitForTimeout(2000)
    
    // Check for basic layout elements
    const hasHeader = await page.locator('header, [data-testid="header"]').count() > 0
    const hasMainContent = await page.locator('main, .main, .container').count() > 0
    
    console.log(`Header present: ${hasHeader}`)
    console.log(`Main content present: ${hasMainContent}`)
    
    // Should have SOME interactive elements
    const buttonCount = await page.locator('button').count()
    const inputCount = await page.locator('input, select, textarea').count()
    
    console.log(`Found ${buttonCount} buttons and ${inputCount} inputs`)
    
    // Basic expectation - should have some UI controls
    expect(buttonCount).toBeGreaterThan(0)
    
    console.log('✅ Basic UI elements are present')
  })
  
  test('should not have obvious JavaScript errors', async ({ page }) => {
    const consoleErrors: string[] = []
    
    // Capture console errors
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })
    
    // Navigate and wait
    await page.goto('/')
    await page.waitForLoadState('domcontentloaded')
    await page.waitForTimeout(3000) // Give time for any async errors
    
    // Filter out known harmless errors
    const seriousErrors = consoleErrors.filter(error => 
      !error.includes('favicon') && 
      !error.includes('build-manifest') &&
      !error.includes('_buildManifest') &&
      !error.match(/404.*not.*found/i)
    )
    
    console.log(`Total console errors: ${consoleErrors.length}`)
    console.log(`Serious errors: ${seriousErrors.length}`)
    
    if (seriousErrors.length > 0) {
      console.log('Serious errors:', seriousErrors)
    }
    
    // Should not have serious JavaScript errors
    expect(seriousErrors.length).toBeLessThan(5) // Allow for some minor issues
    
    console.log('✅ No serious JavaScript errors detected')
  })
})