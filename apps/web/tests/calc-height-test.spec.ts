import { test, expect } from '@playwright/test'

test.describe('Calc Height Tests', () => {
  test('console uses calc height and scrolls properly', async ({ page }) => {
    await page.goto('http://localhost:3001')
    
    await page.click('button:has-text("Console")')
    
    // Find the element with calc height
    const consoleDiv = page.locator('.overflow-auto.font-mono').first()
    await expect(consoleDiv).toBeVisible()
    
    // Check dimensions
    const dimensions = await consoleDiv.evaluate(el => ({
      clientHeight: el.clientHeight,
      computedHeight: getComputedStyle(el).height,
      overflow: getComputedStyle(el).overflow,
      viewportHeight: window.innerHeight
    }))
    
    console.log('Console calc dimensions:', dimensions)
    
    // Should be significantly larger than the old 384px but smaller than full viewport
    expect(dimensions.clientHeight).toBeGreaterThan(400)
    expect(dimensions.clientHeight).toBeLessThan(dimensions.viewportHeight)
    
    // Add content that will definitely overflow
    await page.evaluate(() => {
      const consoleEl = document.querySelector('.overflow-auto.font-mono')
      if (consoleEl) {
        const lines = Array(150).fill(0).map((_, i) => 
          `<div class="break-words whitespace-pre-wrap leading-relaxed">> Line ${i + 1}: This is a long console output line to test calc height scrolling</div>`
        ).join('')
        consoleEl.innerHTML = lines
      }
    })
    
    await page.waitForTimeout(500)
    
    const scrollInfo = await consoleDiv.evaluate(el => ({
      scrollTop: el.scrollTop,
      scrollHeight: el.scrollHeight,
      clientHeight: el.clientHeight,
      canScroll: el.scrollHeight > el.clientHeight
    }))
    
    console.log('Console scroll info:', scrollInfo)
    
    expect(scrollInfo.canScroll).toBe(true)
    
    // Test scrolling
    await consoleDiv.evaluate(el => el.scrollTop = 500)
    const scrollTop = await consoleDiv.evaluate(el => el.scrollTop)
    expect(scrollTop).toBe(500)
    
    console.log('✅ Console with calc height scrolls perfectly!')
  })

  test('code uses calc height and scrolls properly', async ({ page }) => {
    await page.goto('http://localhost:3001')
    
    await page.click('button:has-text("Code")')
    
    const codeDiv = page.locator('.overflow-auto.bg-muted').first()
    await expect(codeDiv).toBeVisible()
    
    const dimensions = await codeDiv.evaluate(el => ({
      clientHeight: el.clientHeight,
      computedHeight: getComputedStyle(el).height,
      viewportHeight: window.innerHeight
    }))
    
    console.log('Code calc dimensions:', dimensions)
    
    expect(dimensions.clientHeight).toBeGreaterThan(400)
    expect(dimensions.clientHeight).toBeLessThan(dimensions.viewportHeight)
    
    // Add long code content
    await page.evaluate(() => {
      const codeEl = document.querySelector('.overflow-auto.bg-muted')
      if (codeEl) {
        const code = Array(120).fill(0).map((_, i) => 
          `// Line ${i + 1}: This is a long code line to test calc height scrolling functionality
const variable${i} = "Testing calc height approach with line ${i + 1}";
console.log("Calc height test line ${i + 1}");`
        ).join('\n')
        codeEl.innerHTML = `<pre><code>${code}</code></pre>`
      }
    })
    
    await page.waitForTimeout(500)
    
    const scrollInfo = await codeDiv.evaluate(el => ({
      scrollHeight: el.scrollHeight,
      clientHeight: el.clientHeight,
      canScroll: el.scrollHeight > el.clientHeight
    }))
    
    console.log('Code scroll info:', scrollInfo)
    
    expect(scrollInfo.canScroll).toBe(true)
    
    // Test scrolling
    await codeDiv.evaluate(el => el.scrollTop = 800)
    const scrollTop = await codeDiv.evaluate(el => el.scrollTop)
    expect(scrollTop).toBe(800)
    
    console.log('✅ Code with calc height scrolls perfectly!')
  })

  test('calc height adapts to viewport changes', async ({ page }) => {
    await page.goto('http://localhost:3001')
    
    await page.click('button:has-text("Code")')
    
    const codeDiv = page.locator('.overflow-auto.bg-muted').first()
    
    // Test larger viewport
    await page.setViewportSize({ width: 1400, height: 900 })
    await page.waitForTimeout(200)
    
    const largeHeight = await codeDiv.evaluate(el => el.clientHeight)
    
    // Test smaller viewport  
    await page.setViewportSize({ width: 1400, height: 600 })
    await page.waitForTimeout(200)
    
    const smallHeight = await codeDiv.evaluate(el => el.clientHeight)
    
    console.log('Height adaptation - Large:', largeHeight, 'Small:', smallHeight)
    
    // Should adapt to viewport size
    expect(smallHeight).toBeLessThan(largeHeight)
    expect(smallHeight).toBeGreaterThan(200)
    
    console.log('✅ Calc height adapts properly!')
  })
})