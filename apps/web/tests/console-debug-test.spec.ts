import { test, expect } from '@playwright/test'

test('Debug console output and errors', async ({ page }) => {
  // Listen for all console messages and errors
  page.on('console', msg => {
    console.log(`[${msg.type()}]`, msg.text())
  })

  page.on('pageerror', error => {
    console.log('❌ Page error:', error.message)
  })

  // Navigate to the app
  await page.goto('http://localhost:3001')
  await page.waitForLoadState('networkidle')

  console.log('🧪 Debugging console output and metadata loading...')

  // Wait for the app to be ready
  await page.waitForSelector('text=polkadot', { timeout: 30000 })
  
  console.log('✅ App loaded, chain selector visible')
  
  // Wait longer for metadata loading
  await page.waitForTimeout(10000)
  
  // Take a screenshot
  await page.screenshot({ path: 'debug-app-state.png', fullPage: true })
  
  console.log('📸 Screenshot taken: debug-app-state.png')
  
  // Check what's actually visible on the page
  const leftPaneContent = await page.textContent('.left-pane, [data-testid="left-pane"], div:has(text("polkadot"))')
  console.log('Left pane content:', leftPaneContent?.substring(0, 500))
  
  console.log('✅ Debug test completed')
})