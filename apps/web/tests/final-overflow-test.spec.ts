import { test, expect } from '@playwright/test'

test.describe('Final Scroll Verification', () => {
  test('console tab with max-h-96 constraint allows scrolling', async ({ page }) => {
    await page.goto('http://localhost:3001')
    
    // Click Console tab
    await page.click('button:has-text("Console")')
    
    const consoleDiv = page.locator('.max-h-96.overflow-auto.font-mono')
    await expect(consoleDiv).toBeVisible()
    
    // Add overflow content
    await page.evaluate(() => {
      const el = document.querySelector('.max-h-96.overflow-auto.font-mono')
      if (el) {
        const lines = Array(50).fill(0).map((_, i) => 
          `<div class="break-words whitespace-pre-wrap leading-relaxed">> Console line ${i + 1}: This creates scrollable overflow content for testing the console scroll functionality.</div>`
        ).join('')
        el.innerHTML = lines
      }
    })
    
    await page.waitForTimeout(300)
    
    // Test scroll functionality
    const scrollInfo = await consoleDiv.evaluate(el => ({
      scrollTop: el.scrollTop,
      clientHeight: el.clientHeight,
      scrollHeight: el.scrollHeight,
      canScroll: el.scrollHeight > el.clientHeight,
      maxHeight: getComputedStyle(el).maxHeight
    }))
    
    console.log('Console scroll info:', scrollInfo)
    
    expect(scrollInfo.canScroll).toBe(true)
    expect(scrollInfo.maxHeight).toBe('384px') // max-h-96 = 24rem = 384px
    
    if (scrollInfo.canScroll) {
      await consoleDiv.evaluate(el => el.scrollTop = 100)
      const newScrollTop = await consoleDiv.evaluate(el => el.scrollTop)
      expect(newScrollTop).toBe(100)
      console.log('✅ Console scrolling works!')
    }
  })

  test('code tab with max-h-96 constraint allows scrolling', async ({ page }) => {
    await page.goto('http://localhost:3001')
    
    // Click Code tab
    await page.click('button:has-text("Code")')
    
    const codeDiv = page.locator('.max-h-96.overflow-auto.bg-muted')
    await expect(codeDiv).toBeVisible()
    
    // Add overflow content
    await page.evaluate(() => {
      const el = document.querySelector('.max-h-96.overflow-auto.bg-muted')
      if (el) {
        const code = Array(60).fill(0).map((_, i) => 
          `// Line ${i + 1}: Long code example for scrolling test
const variable${i} = "This is a test line ${i + 1} for code scrolling";
console.log("Testing code scroll functionality on line ${i + 1}");`
        ).join('\n')
        el.innerHTML = `<pre><code>${code}</code></pre>`
      }
    })
    
    await page.waitForTimeout(300)
    
    const scrollInfo = await codeDiv.evaluate(el => ({
      scrollTop: el.scrollTop,
      clientHeight: el.clientHeight,
      scrollHeight: el.scrollHeight,
      canScroll: el.scrollHeight > el.clientHeight,
      maxHeight: getComputedStyle(el).maxHeight
    }))
    
    console.log('Code scroll info:', scrollInfo)
    
    expect(scrollInfo.canScroll).toBe(true)
    expect(scrollInfo.maxHeight).toBe('384px') // max-h-96
    
    if (scrollInfo.canScroll) {
      await codeDiv.evaluate(el => el.scrollTop = 150)
      const newScrollTop = await codeDiv.evaluate(el => el.scrollTop)
      expect(newScrollTop).toBe(150)
      console.log('✅ Code scrolling works!')
    }
  })

  test('both tabs maintain 384px max height', async ({ page }) => {
    await page.goto('http://localhost:3001')
    
    // Test Console tab
    await page.click('button:has-text("Console")')
    const consoleDiv = page.locator('.max-h-96.overflow-auto.font-mono')
    const consoleHeight = await consoleDiv.evaluate(el => ({
      clientHeight: el.clientHeight,
      maxHeight: getComputedStyle(el).maxHeight
    }))
    
    // Test Code tab
    await page.click('button:has-text("Code")')
    const codeDiv = page.locator('.max-h-96.overflow-auto.bg-muted')
    const codeHeight = await codeDiv.evaluate(el => ({
      clientHeight: el.clientHeight,
      maxHeight: getComputedStyle(el).maxHeight
    }))
    
    console.log('Heights - Console:', consoleHeight, 'Code:', codeHeight)
    
    // Both should respect max-h-96 (384px)
    expect(consoleHeight.maxHeight).toBe('384px')
    expect(codeHeight.maxHeight).toBe('384px')
    
    // Heights should be at or below max height
    expect(consoleHeight.clientHeight).toBeLessThanOrEqual(384)
    expect(codeHeight.clientHeight).toBeLessThanOrEqual(384)
  })
})