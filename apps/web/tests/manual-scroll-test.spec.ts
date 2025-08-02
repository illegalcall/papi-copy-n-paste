import { test, expect } from '@playwright/test'

test('manual scroll test with generated content', async ({ page }) => {
  await page.goto('http://localhost:3001')
  
  // Wait for app to load
  await expect(page.locator('.flex-1.border-l').first()).toBeVisible()
  
  // Click Code tab
  await page.click('button:has-text("Code")')
  
  // Create a long code snippet by injecting it directly to test scrolling
  await page.evaluate(() => {
    // Find the syntax highlighter element and replace with long content
    const codeElement = document.querySelector('pre code')
    if (codeElement) {
      const longCode = 'import { createClient } from "polkadot-api"\n' +
'import { start } from "polkadot-api/smoldot"\n' +  
'import { getSmProvider } from "polkadot-api/sm-provider"\n\n' +
'async function main() {\n' +
'  // Initialize smoldot light client\n' +
'  const smoldot = start()\n' +
'  const chain = await smoldot.addChain({ \n' +
'    chainSpec: "kusama" \n' +
'  })\n' +
'  \n' +
'  // Create PAPI client\n' +
'  const client = createClient(getSmProvider(chain))\n' +
'  \n' +
'  // Get typed API (PAPI v1.14+ pattern)\n' +
'  // const typedApi = client.getTypedApi(polkadot)\n' +
'  // const call = typedApi.tx.Balances.transfer_allow_death({\n' +
'  \n' +
'  // For now, using deprecated pattern (will be removed):\n' +
'  const call = client.tx.Balances.transfer_allow_death({\n' +
'    dest: "//Alice",\n' +
'    value: ""\n' +
'  })\n' +
'  \n' +
'  // Sign and submit\n' +
'  const hash = await call.signAndSubmit("//Alice")\n' +
'  console.log("Transaction hash:", hash)\n' +
'  \n' +
'  // Additional lines to make content longer...\n' +
'  // Line 1 of many additional lines to test scrolling functionality\n' +
'  // Line 2 of many additional lines to test scrolling functionality\n' +
'  // Line 3 of many additional lines to test scrolling functionality\n' +
'  // Line 4 of many additional lines to test scrolling functionality\n' +
'  // Line 5 of many additional lines to test scrolling functionality\n' +
'  // Line 6 of many additional lines to test scrolling functionality\n' +
'  // Line 7 of many additional lines to test scrolling functionality\n' +
'  // Line 8 of many additional lines to test scrolling functionality\n' +
'  // Line 9 of many additional lines to test scrolling functionality\n' +
'  // Line 10 of many additional lines to test scrolling functionality\n' +
'  // Line 11 of many additional lines to test scrolling functionality\n' +
'  // Line 12 of many additional lines to test scrolling functionality\n' +
'  // Line 13 of many additional lines to test scrolling functionality\n' +
'  // Line 14 of many additional lines to test scrolling functionality\n' +
'  // Line 15 of many additional lines to test scrolling functionality\n' +
'  // Line 16 of many additional lines to test scrolling functionality\n' +
'  // Line 17 of many additional lines to test scrolling functionality\n' +
'  // Line 18 of many additional lines to test scrolling functionality\n' +
'  // Line 19 of many additional lines to test scrolling functionality\n' +
'  // Line 20 of many additional lines to test scrolling functionality\n' +
'  // More lines to ensure overflow...\n' +
'  \n' +
'  // Cleanup\n' +
'  smoldot.terminate()\n' +
'}\n\n' +
'main().catch(console.error)'
      
      codeElement.textContent = longCode
      
      // Update the parent div to have the code
      const parentDiv = codeElement.closest('.p-4')
      if (parentDiv) {
        parentDiv.innerHTML = '<pre><code>' + longCode + '</code></pre>'
      }
    }
  })
  
  // Wait a moment for content to render
  await page.waitForTimeout(500)
  
  // Now test scrolling
  const scrollViewport = page.locator('[data-radix-scroll-area-viewport]').first()
  await expect(scrollViewport).toBeVisible()
  
  // Get initial scroll position
  const initialScrollTop = await scrollViewport.evaluate(el => el.scrollTop)
  console.log('Initial scroll position:', initialScrollTop)
  
  // Try scrolling with mouse wheel
  await scrollViewport.hover()
  await page.mouse.wheel(0, 200) // Scroll down 200px
  
  await page.waitForTimeout(100) // Give time for scroll
  
  const afterWheelScroll = await scrollViewport.evaluate(el => el.scrollTop)
  console.log('After wheel scroll:', afterWheelScroll)
  
  // Try programmatic scroll
  await scrollViewport.evaluate(el => el.scrollTop = 100)
  await page.waitForTimeout(100)
  
  const afterProgrammaticScroll = await scrollViewport.evaluate(el => el.scrollTop)
  console.log('After programmatic scroll:', afterProgrammaticScroll)
  
  // Check scroll dimensions
  const scrollInfo = await scrollViewport.evaluate(el => ({
    scrollTop: el.scrollTop,
    scrollHeight: el.scrollHeight,
    clientHeight: el.clientHeight,
    canScroll: el.scrollHeight > el.clientHeight
  }))
  
  console.log('Scroll info:', scrollInfo)
  
  expect(scrollInfo.canScroll).toBe(true) // Should be able to scroll with our long content
  expect(scrollInfo.scrollHeight).toBeGreaterThan(scrollInfo.clientHeight)
})