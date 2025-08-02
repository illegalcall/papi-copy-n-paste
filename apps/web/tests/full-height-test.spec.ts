import { test, expect } from '@playwright/test'

test.describe('Full Height Usage Tests', () => {
  test('code section uses full available height', async ({ page }) => {
    await page.goto('http://localhost:3001')
    
    await page.click('button:has-text("Code")')
    
    // Get the scrollable code div
    const codeDiv = page.locator('.h-full.overflow-auto.bg-muted')
    await expect(codeDiv).toBeVisible()
    
    // Get dimensions of the code container and its parent
    const dimensions = await page.evaluate(() => {
      const codeEl = document.querySelector('.h-full.overflow-auto.bg-muted')
      const cardContent = codeEl?.closest('.p-0.flex-1.flex.flex-col')
      const tabContent = cardContent?.closest('[role="tabpanel"]')
      
      return {
        codeHeight: codeEl?.clientHeight,
        cardContentHeight: cardContent?.clientHeight,
        tabContentHeight: tabContent?.clientHeight,
        viewportHeight: window.innerHeight,
        styles: {
          codeHeight: getComputedStyle(codeEl as Element).height,
          maxHeight: getComputedStyle(codeEl as Element).maxHeight
        }
      }
    })
    
    console.log('Code dimensions:', dimensions)
    
    // The code div should use most of the available height
    expect(dimensions.codeHeight).toBeGreaterThan(400) // Should be much larger than the old 384px
    expect(dimensions.styles.maxHeight).toBe('none') // No max-height constraint
    
    // Add some content and verify scrolling
    await page.evaluate(() => {
      const codeEl = document.querySelector('.h-full.overflow-auto.bg-muted')
      if (codeEl) {
        const longCode = Array(100).fill(0).map((_, i) => 
          `// Line ${i + 1}: Long code line to test full height scrolling functionality
const variable${i} = "This is line ${i + 1} for testing";
console.log("Testing full height usage with line ${i + 1}");`
        ).join('\n')
        
        codeEl.innerHTML = `<pre><code>${longCode}</code></pre>`
      }
    })
    
    await page.waitForTimeout(300)
    
    const scrollInfo = await codeDiv.evaluate(el => ({
      scrollTop: el.scrollTop,
      scrollHeight: el.scrollHeight,
      clientHeight: el.clientHeight,
      canScroll: el.scrollHeight > el.clientHeight
    }))
    
    console.log('Code scroll info:', scrollInfo)
    
    expect(scrollInfo.canScroll).toBe(true)
    expect(scrollInfo.clientHeight).toBeGreaterThan(400) // Much more space than before
    
    // Test scrolling still works
    await codeDiv.evaluate(el => el.scrollTop = 500)
    const scrollTop = await codeDiv.evaluate(el => el.scrollTop)
    expect(scrollTop).toBe(500)
    
    console.log('✅ Code uses full height and scrolls properly!')
  })

  test('console section uses full available height', async ({ page }) => {
    await page.goto('http://localhost:3001')
    
    await page.click('button:has-text("Console")')
    
    const consoleDiv = page.locator('.h-full.overflow-auto.font-mono')
    await expect(consoleDiv).toBeVisible()
    
    const dimensions = await page.evaluate(() => {
      const consoleEl = document.querySelector('.h-full.overflow-auto.font-mono')
      const cardContent = consoleEl?.closest('.p-0.flex-1.flex.flex-col')
      
      return {
        consoleHeight: consoleEl?.clientHeight,
        cardContentHeight: cardContent?.clientHeight,
        styles: {
          height: getComputedStyle(consoleEl as Element).height,
          maxHeight: getComputedStyle(consoleEl as Element).maxHeight
        }
      }
    })
    
    console.log('Console dimensions:', dimensions)
    
    expect(dimensions.consoleHeight).toBeGreaterThan(400) // Much larger than 384px
    expect(dimensions.styles.maxHeight).toBe('none') // No constraint
    
    // Add console content and test scrolling
    await page.evaluate(() => {
      const consoleEl = document.querySelector('.h-full.overflow-auto.font-mono')
      if (consoleEl) {
        const lines = Array(80).fill(0).map((_, i) => 
          `<div class="break-words whitespace-pre-wrap leading-relaxed">> Console line ${i + 1}: Full height test with long output content</div>`
        ).join('')
        
        consoleEl.innerHTML = lines
      }
    })
    
    await page.waitForTimeout(300)
    
    const scrollInfo = await consoleDiv.evaluate(el => ({
      scrollHeight: el.scrollHeight,
      clientHeight: el.clientHeight,
      canScroll: el.scrollHeight > el.clientHeight
    }))
    
    console.log('Console scroll info:', scrollInfo)
    
    expect(scrollInfo.canScroll).toBe(true)
    expect(scrollInfo.clientHeight).toBeGreaterThan(400)
    
    console.log('✅ Console uses full height and scrolls properly!')
  })

  test('height adjusts to viewport changes', async ({ page }) => {
    await page.goto('http://localhost:3001')
    
    // Test with larger viewport
    await page.setViewportSize({ width: 1400, height: 900 })
    await page.click('button:has-text("Code")')
    
    const codeDiv = page.locator('.h-full.overflow-auto.bg-muted')
    const largeHeight = await codeDiv.evaluate(el => el.clientHeight)
    
    // Test with smaller viewport
    await page.setViewportSize({ width: 1400, height: 600 })
    await page.waitForTimeout(200)
    
    const smallHeight = await codeDiv.evaluate(el => el.clientHeight)
    
    console.log('Height adaptation - Large:', largeHeight, 'Small:', smallHeight)
    
    // Height should adapt to viewport size
    expect(smallHeight).toBeLessThan(largeHeight)
    expect(smallHeight).toBeGreaterThan(200) // Still reasonable size
    
    console.log('✅ Height adapts properly to viewport changes!')
  })
})