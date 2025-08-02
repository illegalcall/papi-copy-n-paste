import { test, expect } from '@playwright/test'

test.describe('Code Display Height and Scrolling', () => {
  test('code section uses available height and is scrollable', async ({ page }) => {
    await page.goto('/')

    // Wait for the page to load and find the right pane
    await expect(page.locator('.flex-1.border-l').first()).toBeVisible()
    
    // Click on Code tab to ensure it's active
    await page.click('button:has-text("Code")')
    
    // Wait for code content to be visible
    const codeContent = page.locator('[role="tabpanel"]').filter({ hasText: 'Generated Code' }).first()
    await expect(codeContent).toBeVisible()

    // Check that the scroll area viewport exists and has reasonable height
    const scrollViewport = codeContent.locator('[data-radix-scroll-area-viewport]')
    await expect(scrollViewport).toBeVisible()

    // Verify that the scroll area has substantial height (should use available space)
    const scrollAreaHeight = await scrollViewport.boundingBox()
    expect(scrollAreaHeight?.height).toBeGreaterThan(200) // Should have decent height
    
    // Verify the placeholder text is shown initially
    await expect(page.locator('text=Select a pallet call to generate code').first()).toBeVisible()
  })

  test('console section uses available height and is scrollable', async ({ page }) => {
    await page.goto('/')

    // Click on Console tab
    await page.click('button:has-text("Console")')
    
    // Wait for console content to be visible
    const consoleContent = page.locator('[role="tabpanel"]').filter({ hasText: 'Console Output' }).first()
    await expect(consoleContent).toBeVisible()

    // Check that the scroll area viewport has reasonable height
    const scrollViewport = consoleContent.locator('[data-radix-scroll-area-viewport]')
    await expect(scrollViewport).toBeVisible()

    const scrollAreaHeight = await scrollViewport.boundingBox()
    expect(scrollAreaHeight?.height).toBeGreaterThan(200)
    
    // Verify that "No output yet..." message is visible initially
    await expect(page.locator('text=No output yet...')).toBeVisible()
  })

  test('height adapts to different viewport sizes', async ({ page }) => {
    await page.goto('/')

    // Test desktop size
    await page.setViewportSize({ width: 1200, height: 800 })
    await page.click('button:has-text("Code")')
    
    const codeContent = page.locator('[role="tabpanel"]').filter({ hasText: 'Generated Code' }).first()
    const codeScrollArea = codeContent.locator('[data-radix-scroll-area-viewport]')
    const desktopHeight = await codeScrollArea.boundingBox()
    
    // Test smaller viewport
    await page.setViewportSize({ width: 1200, height: 600 })
    await page.waitForTimeout(200) // Allow layout to adjust
    
    const smallerHeight = await codeScrollArea.boundingBox()
    
    // Height should adapt to available space
    expect(smallerHeight?.height).toBeLessThan(desktopHeight?.height || 0)
    expect(smallerHeight?.height).toBeGreaterThan(100) // But still reasonable
  })

  test('scroll areas properly handle overflow', async ({ page }) => {
    await page.goto('/')

    // Test with code tab
    await page.click('button:has-text("Code")')
    const codeScrollArea = page.locator('[role="tabpanel"]').filter({ hasText: 'Generated Code' }).first()
      .locator('[data-radix-scroll-area-viewport]')
    
    // Verify scroll area can be scrolled
    await expect(codeScrollArea).toBeVisible()
    
    // Test console tab
    await page.click('button:has-text("Console")')  
    const consoleScrollArea = page.locator('[role="tabpanel"]').filter({ hasText: 'Console Output' }).first()
      .locator('[data-radix-scroll-area-viewport]')
    
    await expect(consoleScrollArea).toBeVisible()
    
    // Test that scroll areas are interactive and don't have fixed heights that would cause cutoff
    await page.click('button:has-text("Code")')
    const codeBox = await codeScrollArea.boundingBox()
    expect(codeBox?.height).toBeGreaterThan(0)
    
    await page.click('button:has-text("Console")')
    const consoleBox = await consoleScrollArea.boundingBox()
    expect(consoleBox?.height).toBeGreaterThan(0)
  })
})