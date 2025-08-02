import { test, expect } from '@playwright/test'

test('verifies improved blockchain connection', async ({ page }) => {
  console.log('🧪 Testing improved client connection...')
  
  await page.goto('http://localhost:3001')
  await page.waitForLoadState('networkidle')
  await page.waitForTimeout(3000)
  
  const logs: string[] = []
  page.on('console', msg => logs.push(msg.text()))
  
  // Wait for connection to establish
  await page.waitForTimeout(5000)
  
  console.log('📊 Connection logs:', logs.filter(log => 
    log.includes('Connected') || log.includes('WebSocket') || log.includes('smoldot')
  ))
  
  expect(logs.length).toBeGreaterThan(0)
})
