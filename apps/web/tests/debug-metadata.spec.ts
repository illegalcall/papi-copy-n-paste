import { test, expect } from '@playwright/test'

test('Debug metadata fetching', async ({ page }) => {
  console.log('Starting metadata debug test...')
  
  // Listen to all console logs and errors
  page.on('console', msg => {
    const text = msg.text()
    console.log(`[BROWSER-${msg.type().toUpperCase()}] ${text}`)
  })
  
  page.on('pageerror', error => console.log(`[PAGE ERROR] ${error.message}`))
  
  await page.goto('http://localhost:3001')
  await page.waitForLoadState('networkidle')
  
  console.log('Waiting for metadata fetch to complete or timeout...')
  
  // Wait longer and watch for specific log messages
  let hasCompleted = false
  let attempt = 0
  const maxWait = 60000 // 60 seconds
  const startTime = Date.now()
  
  while (!hasCompleted && (Date.now() - startTime) < maxWait) {
    await page.waitForTimeout(5000)
    attempt++
    
    console.log(`Check ${attempt}: Waiting for metadata completion...`)
    
    const isLoading = await page.locator('text=Loading pallets...').isVisible()
    const hasError = await page.locator('text=Connection Issue').isVisible()
    const hasPallets = await page.locator('text=System').or(page.locator('text=Balances')).isVisible()
    
    console.log(`  - Loading: ${isLoading}, Error: ${hasError}, Pallets: ${hasPallets}`)
    
    if (!isLoading || hasError || hasPallets) {
      hasCompleted = true
      console.log('✓ Metadata fetch completed or resolved to error state')
      break
    }
    
    if (attempt >= 8) { // Max 8 checks (40 seconds)
      console.log('⚠️  Metadata fetch is taking too long, will wait a bit more...')
    }
  }
  
  // Final state check
  const finalLoading = await page.locator('text=Loading pallets...').isVisible()
  const finalError = await page.locator('text=Connection Issue').isVisible()
  const finalPallets = await page.locator('text=System').or(page.locator('text=Balances')).isVisible()
  
  console.log(`Final state - Loading: ${finalLoading}, Error: ${finalError}, Pallets: ${finalPallets}`)
  
  // Take screenshot for debugging
  await page.screenshot({ path: 'test-results/debug-metadata.png', fullPage: true })
  
  // We should not be stuck in loading state
  expect(finalLoading).toBe(false)
})