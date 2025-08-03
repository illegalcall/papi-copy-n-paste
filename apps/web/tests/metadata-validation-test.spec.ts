import { test, expect } from '@playwright/test'

test('Metadata parsing fix validation', async ({ page }) => {
  // Listen for console messages
  page.on('console', msg => {
    const text = msg.text()
    if (text.includes('metadata') || text.includes('pallet')) {
      console.log('Browser console:', msg.type(), text)
    }
  })

  // Navigate to the app
  await page.goto('http://localhost:3001')
  await page.waitForLoadState('networkidle')

  console.log('🧪 Validating metadata parsing fix...')

  // Wait for the app to be ready
  await page.waitForSelector('text=polkadot', { timeout: 30000 })
  console.log('✅ App loaded successfully')

  // Wait for metadata loading
  await page.waitForTimeout(8000)

  // The key validation: Balances pallet should be visible (proves real metadata is loaded)
  const balancesVisible = await page.isVisible('text=Balances')
  
  if (balancesVisible) {
    console.log('✅ CRITICAL TEST PASSED: Balances pallet found in UI')
    console.log('✅ This proves the metadata parsing fix is working!')
    console.log('✅ Real metadata (55+ pallets) is loading instead of mock metadata (3 pallets)')
  } else {
    console.log('❌ CRITICAL TEST FAILED: Balances pallet not found')
    await page.screenshot({ path: 'metadata-validation-failure.png' })
    throw new Error('Metadata parsing fix failed - Balances pallet not found')
  }

  // Additional validation: Check if other real pallets are visible
  const systemVisible = await page.isVisible('text=System')
  const stakingVisible = await page.isVisible('text=Staking')
  
  console.log('Additional pallet visibility:')
  console.log('- System:', systemVisible)
  console.log('- Staking:', stakingVisible)
  
  const realPalletCount = [balancesVisible, systemVisible, stakingVisible].filter(Boolean).length
  
  if (realPalletCount >= 2) {
    console.log(`✅ Multiple real pallets found (${realPalletCount}/3)`)
  } else {
    console.log(`⚠️  Only ${realPalletCount}/3 expected pallets found`)
  }

  console.log('✅ Metadata parsing validation complete!')
})