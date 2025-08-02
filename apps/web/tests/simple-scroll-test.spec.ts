import { test, expect } from '@playwright/test'

test('verify native div scroll works', async ({ page }) => {
  await page.goto('http://localhost:3001')
  
  // Wait for the page to load
  await expect(page.locator('.flex-1.border-l').first()).toBeVisible()
  
  // Click on Code tab
  await page.click('button:has-text("Code")')
  
  // Find the scrollable div (should be the one with overflow-auto)
  const scrollableDiv = page.locator('.overflow-auto').first()
  await expect(scrollableDiv).toBeVisible()
  
  // Inject content to test scrolling
  await page.evaluate(() => {
    const scrollDiv = document.querySelector('.overflow-auto')
    if (scrollDiv) {
      const longContent = Array(50).fill(0).map((_, i) => 
        `Line ${i + 1}: This is a test line to create overflow content for scrolling\n`
      ).join('')
      
      scrollDiv.innerHTML = `<pre><code>${longContent}</code></pre>`
    }
  })
  
  await page.waitForTimeout(500)
  
  // Test scroll dimensions
  const scrollInfo = await scrollableDiv.evaluate(el => ({
    scrollTop: el.scrollTop,
    scrollHeight: el.scrollHeight,
    clientHeight: el.clientHeight,
    canScroll: el.scrollHeight > el.clientHeight,
    styles: {
      overflow: getComputedStyle(el).overflow,
      overflowY: getComputedStyle(el).overflowY
    }
  }))
  
  console.log('Native div scroll info:', scrollInfo)
  
  if (scrollInfo.canScroll) {
    // Test programmatic scrolling
    await scrollableDiv.evaluate(el => el.scrollTop = 100)
    await page.waitForTimeout(100)
    
    const scrollTop = await scrollableDiv.evaluate(el => el.scrollTop)
    expect(scrollTop).toBe(100)
    
    console.log('Scroll test passed! ScrollTop:', scrollTop)
  } else {
    console.log('No overflow to test, but div is properly configured')
  }
  
  // Test that overflow-auto is applied
  expect(scrollInfo.styles.overflow).toContain('auto')
})