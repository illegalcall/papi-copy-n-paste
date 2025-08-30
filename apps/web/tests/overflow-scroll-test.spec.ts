import { test, expect } from '@playwright/test'

test.describe('Overflow and Scroll Tests', () => {
  test('console tab properly constrains height and allows scrolling', async ({ page }) => {
    await page.goto('http://localhost:3001')
    
    // Wait for the page to load
    await expect(page.locator('.flex-1.border-l').first()).toBeVisible()
    
    // Click on Console tab
    await page.click('button:has-text("Console")')
    
    // Find the console container
    const consoleDiv = page.locator('.overflow-auto.font-mono').first()
    await expect(consoleDiv).toBeVisible()
    
    // Check initial dimensions
    const initialDimensions = await consoleDiv.evaluate(el => ({
      clientHeight: el.clientHeight,
      scrollHeight: el.scrollHeight,
      parentHeight: el.parentElement?.clientHeight
    }))
    
    console.log('Initial console dimensions:', initialDimensions)
    
    // Inject a lot of content to test overflow
    await page.evaluate(() => {
      const consoleEl = document.querySelector('.overflow-auto.font-mono')
      if (consoleEl) {
        // Create 100 lines of console output
        const lines = Array(100).fill(0).map((_, i) => 
          `<div class="break-words whitespace-pre-wrap leading-relaxed">> Line ${i + 1}: This is console output that should create overflow and enable scrolling functionality. Testing scroll behavior with long content lines.</div>`
        ).join('')
        
        consoleEl.innerHTML = lines
      }
    })
    
    await page.waitForTimeout(500) // Allow rendering
    
    // Check dimensions after content injection
    const afterContent = await consoleDiv.evaluate(el => ({
      scrollTop: el.scrollTop,
      clientHeight: el.clientHeight,
      scrollHeight: el.scrollHeight,
      canScroll: el.scrollHeight > el.clientHeight,
      styles: {
        overflow: getComputedStyle(el).overflow,
        overflowY: getComputedStyle(el).overflowY,
        maxHeight: getComputedStyle(el).maxHeight,
        height: getComputedStyle(el).height
      }
    }))
    
    console.log('After content injection:', afterContent)
    
    // Verify scrolling is possible
    expect(afterContent.canScroll).toBe(true)
    expect(afterContent.scrollHeight).toBeGreaterThan(afterContent.clientHeight)
    expect(['auto', 'scroll']).toContain(afterContent.styles.overflowY)
    
    // Test actual scrolling
    if (afterContent.canScroll) {
      // Scroll to middle
      await consoleDiv.evaluate(el => el.scrollTop = el.scrollHeight / 2)
      await page.waitForTimeout(100)
      
      const midScrollTop = await consoleDiv.evaluate(el => el.scrollTop)
      expect(midScrollTop).toBeGreaterThan(0)
      
      // Scroll to bottom
      await consoleDiv.evaluate(el => el.scrollTop = el.scrollHeight)
      await page.waitForTimeout(100)
      
      const bottomScrollTop = await consoleDiv.evaluate(el => el.scrollTop)
      expect(bottomScrollTop).toBeGreaterThan(midScrollTop)
      
      console.log('Scroll test passed! Mid:', midScrollTop, 'Bottom:', bottomScrollTop)
    }
  })

  test('code tab properly constrains height and allows scrolling', async ({ page }) => {
    await page.goto('http://localhost:3001')
    
    // Click on Code tab
    await page.click('button:has-text("Code")')
    
    const codeDiv = page.locator('.overflow-auto').first()
    await expect(codeDiv).toBeVisible()
    
    // Inject long code content
    await page.evaluate(() => {
      const codeEl = document.querySelector('.overflow-auto')
      if (codeEl) {
        const longCode = Array(80).fill(0).map((_, i) => 
          `// Line ${i + 1}: This is a very long line of code to test scrolling functionality in the code panel
import { someVeryLongVariableName${i} } from "some-very-long-package-name-${i}"
const anotherVeryLongVariableName${i} = someVeryLongVariableName${i}.methodWithAVeryLongName()
console.log("Testing line ${i + 1} with very long content to ensure proper scrolling behavior")`
        ).join('\n')
        
        codeEl.innerHTML = `<pre><code>${longCode}</code></pre>`
      }
    })
    
    await page.waitForTimeout(500)
    
    const codeScrollInfo = await codeDiv.evaluate(el => ({
      scrollTop: el.scrollTop,
      clientHeight: el.clientHeight,
      scrollHeight: el.scrollHeight,
      canScroll: el.scrollHeight > el.clientHeight,
      styles: {
        overflow: getComputedStyle(el).overflow,
        overflowY: getComputedStyle(el).overflowY,
        maxHeight: getComputedStyle(el).maxHeight
      }
    }))
    
    console.log('Code scroll info:', codeScrollInfo)
    
    expect(codeScrollInfo.canScroll).toBe(true)
    expect(codeScrollInfo.scrollHeight).toBeGreaterThan(codeScrollInfo.clientHeight)
    
    // Test scrolling
    if (codeScrollInfo.canScroll) {
      await codeDiv.evaluate(el => el.scrollTop = 200)
      const scrollTop = await codeDiv.evaluate(el => el.scrollTop)
      expect(scrollTop).toBe(200)
      console.log('Code scroll test passed!')
    }
  })

  test('height constraints prevent page overflow', async ({ page }) => {
    await page.goto('http://localhost:3001')
    
    // Check that the main container has proper height constraints
    const mainContainer = page.locator('.h-screen.flex.flex-col')
    await expect(mainContainer).toBeVisible()
    
    const containerInfo = await mainContainer.evaluate(el => ({
      height: el.clientHeight,
      scrollHeight: el.scrollHeight,
      hasOverflow: el.scrollHeight > el.clientHeight,
      styles: {
        height: getComputedStyle(el).height,
        overflow: getComputedStyle(el).overflow
      }
    }))
    
    console.log('Main container info:', containerInfo)
    
    // The main container should not have vertical overflow
    expect(containerInfo.hasOverflow).toBe(false)
    
    // Check the flex content area
    const flexContent = page.locator('.flex-1.flex.overflow-hidden')
    const flexInfo = await flexContent.evaluate(el => ({
      height: el.clientHeight,
      styles: {
        overflow: getComputedStyle(el).overflow
      }
    }))
    
    console.log('Flex content info:', flexInfo)
    expect(flexInfo.styles.overflow).toContain('hidden')
  })
})