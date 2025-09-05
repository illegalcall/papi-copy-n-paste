import { test, expect } from '@playwright/test'

test.describe('Debug Tests', () => {
  test('debug DOM content', async ({ page }) => {
    console.log('🔍 Starting DOM debug...')
    
    await page.goto('/')
    await page.waitForLoadState('domcontentloaded')
    console.log('✅ Page loaded')
    
    // Wait a bit for any dynamic content
    await page.waitForTimeout(3000)
    console.log('✅ Waited 3 seconds')
    
    // Get basic DOM info
    const bodyHTML = await page.locator('body').innerHTML()
    const bodyText = await page.locator('body').textContent()
    
    console.log('📊 DOM Analysis:')
    console.log(`- Body HTML length: ${bodyHTML.length}`)
    console.log(`- Body text length: ${bodyText ? bodyText.length : 0}`)
    
    // Count different element types
    const buttonCount = await page.locator('button').count()
    const divCount = await page.locator('div').count()
    const inputCount = await page.locator('input').count()
    const linkCount = await page.locator('a').count()
    
    console.log(`- Buttons: ${buttonCount}`)
    console.log(`- Divs: ${divCount}`)
    console.log(`- Inputs: ${inputCount}`)
    console.log(`- Links: ${linkCount}`)
    
    // Get first few buttons if they exist
    if (buttonCount > 0) {
      console.log('🔍 Button details:')
      for (let i = 0; i < Math.min(5, buttonCount); i++) {
        try {
          const buttonText = await page.locator('button').nth(i).textContent()
          const isVisible = await page.locator('button').nth(i).isVisible()
          console.log(`  Button ${i+1}: "${buttonText}" (visible: ${isVisible})`)
        } catch (err) {
          console.log(`  Button ${i+1}: Error - ${err.message}`)
        }
      }
    }
    
    // Look for any text that indicates what's loaded
    if (bodyText) {
      const keywords = ['papi', 'polkadot', 'chain', 'pallet', 'method', 'system', 'balances']
      console.log('🔍 Keyword analysis:')
      keywords.forEach(keyword => {
        const found = bodyText.toLowerCase().includes(keyword)
        console.log(`  "${keyword}": ${found ? '✅' : '❌'}`)
      })
    }
    
    // Check for errors in the page
    const errorElements = await page.locator('[class*="error"], .text-red').count()
    console.log(`⚠️ Error elements: ${errorElements}`)
    
    // Sample of the actual body text
    if (bodyText && bodyText.length > 100) {
      console.log('📄 Body text sample:')
      console.log(bodyText.substring(0, 300) + '...')
    } else if (bodyText) {
      console.log('📄 Complete body text:')
      console.log(bodyText)
    } else {
      console.log('❌ No body text found')
    }
    
    // Sample of HTML structure
    console.log('📄 HTML structure sample:')
    console.log(bodyHTML.substring(0, 500) + '...')
    
    // The test should pass just to see the debug info
    expect(true).toBe(true)
  })
})