import { test, expect } from '@playwright/test'

test('Simple Polkadot connection test', async ({ page }) => {
  console.log('Starting simple connection test...')
  
  // Listen to console logs to debug the issue
  page.on('console', msg => console.log(`[BROWSER] ${msg.type()}: ${msg.text()}`))
  page.on('pageerror', error => console.log(`[PAGE ERROR] ${error.message}`))
  
  await page.goto('http://localhost:3001')
  await page.waitForLoadState('networkidle')
  
  console.log('Page loaded, waiting for connection...')
  
  // Wait a bit and check what's in the left pane
  await page.waitForTimeout(10000)
  
  const leftPaneContent = await page.locator('.p-4').first().textContent()
  console.log('Left pane content:', leftPaneContent)
  
  // Check if we have loading, error, or success states
  const isLoading = await page.locator('text=Loading pallets...').isVisible()
  const hasError = await page.locator('text=Connection Issue').isVisible()
  const hasPallets = await page.locator('text=System').or(page.locator('text=Balances')).isVisible()
  
  console.log('States - Loading:', isLoading, 'Error:', hasError, 'Has pallets:', hasPallets)
  
  // Take a screenshot for debugging
  await page.screenshot({ path: 'test-results/debug-screenshot.png', fullPage: true })
  
  // The test should eventually resolve to either pallets or an error (not stuck loading)
  expect(hasPallets || hasError).toBe(true)
})