import { test, expect } from '@playwright/test'

test('verify scroll functionality with proper height constraints', async ({ page }) => {
  await page.goto('http://localhost:3001')
  
  // Wait for the page to load
  await expect(page.locator('.flex-1.border-l').first()).toBeVisible()
  
  // Click on Code tab
  await page.click('button:has-text("Code")')
  
  // Find the scroll area viewport
  const scrollViewport = page.locator('[data-radix-scroll-area-viewport]').first()
  await expect(scrollViewport).toBeVisible()
  
  // Inject a very long code snippet to ensure overflow
  await page.evaluate(() => {
    const scrollArea = document.querySelector('[data-radix-scroll-area-viewport]')
    if (scrollArea) {
      // Create very long content that will definitely overflow
      const longCode = Array(100).fill(0).map((_, i) => 
        `// This is line ${i + 1} of a very long code example to test scrolling
import { createClient } from "polkadot-api"
const client = createClient() // Line ${i + 1}
console.log("Testing scrolling functionality line ${i + 1}")
`).join('\n')
      
      // Find and replace the content
      const contentDiv = scrollArea.querySelector('div')
      if (contentDiv) {
        contentDiv.innerHTML = `<pre><code>${longCode}</code></pre>`
      }
    }
  })
  
  // Wait for content to render
  await page.waitForTimeout(500)
  
  // Check scroll dimensions
  const scrollInfo = await scrollViewport.evaluate(el => ({
    scrollTop: el.scrollTop,
    scrollHeight: el.scrollHeight,
    clientHeight: el.clientHeight,
    canScroll: el.scrollHeight > el.clientHeight,
    styles: {
      overflow: getComputedStyle(el).overflow,
      overflowY: getComputedStyle(el).overflowY,
      height: getComputedStyle(el).height,
      maxHeight: getComputedStyle(el).maxHeight
    }
  }))
  
  console.log('Scroll info:', scrollInfo)
  
  // Verify that content can scroll
  expect(scrollInfo.canScroll).toBe(true)
  expect(scrollInfo.scrollHeight).toBeGreaterThan(scrollInfo.clientHeight)
  
  // Test actual scrolling
  const initialScrollTop = scrollInfo.scrollTop
  
  // Programmatic scroll test
  await scrollViewport.evaluate(el => el.scrollTop = 200)
  await page.waitForTimeout(100)
  
  const afterScroll = await scrollViewport.evaluate(el => el.scrollTop)
  expect(afterScroll).toBeGreaterThan(initialScrollTop)
  expect(afterScroll).toBe(200)
  
  // Mouse wheel scroll test  
  await scrollViewport.hover()
  await page.mouse.wheel(0, 300) // Scroll down
  await page.waitForTimeout(100)
  
  const afterWheelScroll = await scrollViewport.evaluate(el => el.scrollTop)
  expect(afterWheelScroll).toBeGreaterThan(200) // Should have scrolled further
  
  console.log('Final scroll position:', afterWheelScroll)
})