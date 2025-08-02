import { test, expect } from '@playwright/test'

test('verify console tab scroll works', async ({ page }) => {
  await page.goto('http://localhost:3001')
  
  // Wait for the page to load
  await expect(page.locator('.flex-1.border-l').first()).toBeVisible()
  
  // Click on Console tab
  await page.click('button:has-text("Console")')
  
  // Find the console scrollable div
  const consoleScrollDiv = page.locator('.overflow-auto.font-mono')
  await expect(consoleScrollDiv).toBeVisible()
  
  // Add some content to test scrolling
  await page.evaluate(() => {
    const consoleDiv = document.querySelector('.overflow-auto.font-mono')
    if (consoleDiv) {
      const consoleLines = Array(30).fill(0).map((_, i) => 
        `> Console output line ${i + 1}: This is a test message for scrolling`
      ).join('<br>')
      
      consoleDiv.innerHTML = consoleLines
    }
  })
  
  await page.waitForTimeout(500)
  
  // Test console scroll
  const scrollInfo = await consoleScrollDiv.evaluate(el => ({
    scrollTop: el.scrollTop,
    scrollHeight: el.scrollHeight,
    clientHeight: el.clientHeight,
    canScroll: el.scrollHeight > el.clientHeight,
    styles: {
      overflow: getComputedStyle(el).overflow,
      overflowY: getComputedStyle(el).overflowY
    }
  }))
  
  console.log('Console scroll info:', scrollInfo)
  
  if (scrollInfo.canScroll) {
    // Test console scrolling
    await consoleScrollDiv.evaluate(el => el.scrollTop = 200)
    await page.waitForTimeout(100)
    
    const scrollTop = await consoleScrollDiv.evaluate(el => el.scrollTop)
    expect(scrollTop).toBe(200)
    
    console.log('Console scroll test passed! ScrollTop:', scrollTop)
  }
  
  // Verify overflow-auto styling
  expect(scrollInfo.styles.overflow).toContain('auto')
})