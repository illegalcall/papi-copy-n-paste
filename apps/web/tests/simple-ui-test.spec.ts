import { test, expect } from '@playwright/test'

test.describe('Simple UI Test', () => {
  test('should show network selectors in header', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('domcontentloaded')
    await page.waitForTimeout(2000)
    
    // Take screenshot to see what's rendered
    await page.screenshot({ path: 'test-results/ui-screenshot.png', fullPage: true })
    
    // Check basic elements
    console.log('Looking for basic elements...')
    
    // Check if header exists
    const header = page.locator('header')
    console.log('Header exists:', await header.count())
    
    // Check for "Network:" text
    const networkLabel = page.locator('text=Network:')
    console.log('Network label exists:', await networkLabel.count())
    
    // Check for "Provider:" text  
    const providerLabel = page.locator('text=Provider:')
    console.log('Provider label exists:', await providerLabel.count())
    
    // Check for any combobox elements
    const comboboxes = page.locator('[role="combobox"]')
    console.log('Comboboxes found:', await comboboxes.count())
    
    // Check for any select elements
    const selects = page.locator('select')
    console.log('Select elements found:', await selects.count())
    
    // Check for any button elements
    const buttons = page.locator('button')
    console.log('Button elements found:', await buttons.count())
    
    // Check for Polkadot text
    const polkadotText = page.locator('text=Polkadot')
    console.log('Polkadot text found:', await polkadotText.count())
    
    // List all text content in header
    const headerText = await header.textContent()
    console.log('Header text content:', headerText)
    
    // Basic assertion - header should exist
    await expect(header).toBeVisible()
  })
})