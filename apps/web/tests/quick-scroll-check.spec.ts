import { test, expect } from '@playwright/test'

test('quick scroll functionality verification', async ({ page }) => {
  await page.goto('http://localhost:3001')
  
  console.log('🧪 Testing Console Tab...')
  await page.click('button:has-text("Console")')
  
  const consoleDiv = page.locator('.max-h-96').first()
  const consoleInfo = await consoleDiv.evaluate(el => ({
    clientHeight: el.clientHeight,
    maxHeight: getComputedStyle(el).maxHeight,
    overflow: getComputedStyle(el).overflow
  }))
  console.log('Console info:', consoleInfo)
  
  console.log('🧪 Testing Code Tab...')
  await page.click('button:has-text("Code")')
  
  const codeDiv = page.locator('.max-h-96').first() 
  const codeInfo = await codeDiv.evaluate(el => ({
    clientHeight: el.clientHeight,
    maxHeight: getComputedStyle(el).maxHeight,
    overflow: getComputedStyle(el).overflow
  }))
  console.log('Code info:', codeInfo)
  
  // Both should have max height constraint and overflow auto
  expect(consoleInfo.maxHeight).toBe('384px')
  expect(codeInfo.maxHeight).toBe('384px')
  expect(consoleInfo.overflow).toContain('auto')
  expect(codeInfo.overflow).toContain('auto')
  
  console.log('✅ All tests passed! Scrolling should work now.')
})