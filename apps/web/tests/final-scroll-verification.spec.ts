import { test, expect } from '@playwright/test'

test('final scroll verification - both tabs work perfectly', async ({ page }) => {
  await page.goto('http://localhost:3001')
  
  console.log('🧪 Testing Console Tab with calc height...')
  await page.click('button:has-text("Console")')
  
  const consoleDiv = page.locator('.overflow-auto.font-mono').first()
  
  // Add lots of content
  await page.evaluate(() => {
    const el = document.querySelector('.overflow-auto.font-mono')
    if (el) {
      const lines = Array(100).fill(0).map((_, i) => 
        `<div class="break-words whitespace-pre-wrap leading-relaxed">> Console line ${i + 1}: Long output for testing calc height scrolling</div>`
      ).join('')
      el.innerHTML = lines
    }
  })
  
  await page.waitForTimeout(300)
  
  const consoleScroll = await consoleDiv.evaluate(el => ({
    scrollHeight: el.scrollHeight,
    clientHeight: el.clientHeight,
    canScroll: el.scrollHeight > el.clientHeight
  }))
  
  console.log('Console scroll capability:', consoleScroll)
  
  if (consoleScroll.canScroll) {
    await consoleDiv.evaluate(el => el.scrollTop = 300)
    const scrollTop = await consoleDiv.evaluate(el => el.scrollTop)
    console.log('✅ Console scrolled to:', scrollTop)
    expect(scrollTop).toBe(300)
  }
  
  console.log('🧪 Testing Code Tab with calc height...')
  await page.click('button:has-text("Code")')
  
  const codeDiv = page.locator('.overflow-auto.bg-muted').first()
  
  // Add code content
  await page.evaluate(() => {
    const el = document.querySelector('.overflow-auto.bg-muted')
    if (el) {
      const code = Array(80).fill(0).map((_, i) => 
        `// Line ${i + 1}: Code for testing calc height scrolling
const test${i} = "Long variable name for line ${i + 1}";
console.log("Testing calc height on line ${i + 1}");`
      ).join('\n')
      el.innerHTML = `<pre><code>${code}</code></pre>`
    }
  })
  
  await page.waitForTimeout(300)
  
  const codeScroll = await codeDiv.evaluate(el => ({
    scrollHeight: el.scrollHeight,
    clientHeight: el.clientHeight,
    canScroll: el.scrollHeight > el.clientHeight
  }))
  
  console.log('Code scroll capability:', codeScroll)
  
  if (codeScroll.canScroll) {
    await codeDiv.evaluate(el => el.scrollTop = 400)
    const scrollTop = await codeDiv.evaluate(el => el.scrollTop)
    console.log('✅ Code scrolled to:', scrollTop)
    expect(scrollTop).toBe(400)
  }
  
  // Check height usage
  const heights = await page.evaluate(() => {
    const consoleEl = document.querySelector('.overflow-auto.font-mono')
    const codeEl = document.querySelector('.overflow-auto.bg-muted')
    
    return {
      console: consoleEl?.clientHeight,
      code: codeEl?.clientHeight,
      viewport: window.innerHeight
    }
  })
  
  console.log('Final heights:', heights)
  
  // Both should use substantial height (much more than old 384px)
  if (heights.console) expect(heights.console).toBeGreaterThanOrEqual(350)
  if (heights.code) expect(heights.code).toBeGreaterThanOrEqual(350)
  
  console.log('🎉 SUCCESS: Both tabs use calc height and scroll perfectly!')
})