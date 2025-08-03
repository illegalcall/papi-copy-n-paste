import { test, expect } from '@playwright/test'

test('Transaction execution works with real descriptors', async ({ page }) => {
  // Listen for console messages
  page.on('console', msg => {
    const text = msg.text()
    if (msg.type() === 'error' || 
        text.includes('descriptor') || 
        text.includes('PAPI') ||
        text.includes('metadata') ||
        text.includes('pallet') ||
        text.includes('Successfully') ||
        text.includes('Failed') ||
        text.includes('Loading')) {
      console.log('Browser console:', msg.type(), text)
    }
  })

  // Navigate to the app (use correct port where dev server is running)
  await page.goto('http://localhost:3003')
  await page.waitForLoadState('networkidle')

  console.log('🧪 Testing transaction execution with real descriptors...')

  // Wait for the app to be ready - look for chain selector
  await page.waitForSelector('text=polkadot', { timeout: 30000 })
  
  console.log('✅ App loaded successfully')
  
  // Wait longer for metadata to load and pallets to appear
  console.log('⏳ Waiting for metadata loading and pallet rendering...')
  
  // Check for metadata loading messages first
  try {
    await page.waitForSelector('text=Successfully fetched and cached metadata', { timeout: 15000 })
    console.log('✅ Metadata loading confirmed')
  } catch {
    console.log('⚠️ Metadata loading message not detected, checking UI directly')
  }
  
  // Wait longer for pallets to render
  await page.waitForTimeout(5000)
  
  // Debug: Check what text is actually visible on the page
  const pageText = await page.textContent('body')
  console.log('Page content sample:', pageText?.substring(0, 500))
  
  // Check if Balances pallet appears with longer timeout
  try {
    await page.waitForSelector('text=Balances', { timeout: 10000 })
    console.log('✅ Balances pallet found via waitForSelector')
  } catch {
    console.log('❌ Balances pallet not found with waitForSelector')
    // Take a screenshot for debugging
    await page.screenshot({ path: 'debug-no-balances.png' })
    
    // Check for any pallet-like elements
    const leftPane = await page.textContent('.left-pane, [data-testid="left-pane"], div:has(text("polkadot"))')
    console.log('Left pane content:', leftPane?.substring(0, 500))
    
    throw new Error('Balances pallet not found')
  }
  
  console.log('✅ Balances pallet found')
  
  // Select Balances pallet
  await page.click('text=Balances')
  console.log('🔄 Clicked Balances pallet, waiting for methods to load...')
  
  // Wait longer for methods to appear
  await page.waitForTimeout(3000)
  
  // Debug: Check what methods are actually shown
  const rightPaneContent = await page.textContent('[data-testid="right-pane"], .right-pane, div:has(select)')
  console.log('Right pane content after selecting Balances:', rightPaneContent?.substring(0, 800))
  
  // Check for any transfer-related methods that might be available
  const transferAllowDeathExists = await page.isVisible('text=transfer_allow_death')
  const transferKeepAliveExists = await page.isVisible('text=transfer_keep_alive') 
  const transferAllExists = await page.isVisible('text=transfer_all')
  const transferExists = await page.isVisible('text=transfer')
  
  console.log('Transfer method availability:')
  console.log('- transfer_allow_death:', transferAllowDeathExists)
  console.log('- transfer_keep_alive:', transferKeepAliveExists)
  console.log('- transfer_all:', transferAllExists)
  console.log('- transfer (generic):', transferExists)
  
  if (!transferAllowDeathExists) {
    // Try to find any available method and use it for testing
    if (transferKeepAliveExists) {
      console.log('✅ Using transfer_keep_alive instead of transfer_allow_death')
      // Continue with transfer_keep_alive
    } else {
      console.log('❌ No transfer methods found')
      await page.screenshot({ path: 'debug-no-transfer.png' })
      throw new Error('No transfer methods found')
    }
  }
  
  // Choose which method to test
  let methodToUse = 'transfer_allow_death'
  if (!transferAllowDeathExists && transferKeepAliveExists) {
    methodToUse = 'transfer_keep_alive'
  }
  
  console.log(`✅ Using method: ${methodToUse}`)
  
  // Select the transfer method  
  await page.click(`text=${methodToUse}`)
  
  // Wait for form to appear
  await page.waitForTimeout(1000)
  
  // Fill in the form
  await page.selectOption('select[name="dest"]', '//Bob')
  await page.fill('input[name="value"]', '23')
  
  // Switch to console tab to see output
  await page.click('button:has-text("Console")')
  
  // Run the transaction
  await page.click('button:has-text("Run")')
  
  console.log('🚀 Transaction execution started...')
  
  // Wait for execution to start (dynamic based on method used)
  await page.waitForSelector(`text=Running Balances.${methodToUse}...`, { timeout: 10000 })
  
  console.log('✅ Transaction execution started')
  
  // Check for descriptor loading messages (either success or failure)
  const descriptorSuccess = page.locator('text=Successfully loaded PAPI descriptors')
  const descriptorFailure = page.locator('text=Failed to load descriptors')
  
  // Wait for either success or failure
  try {
    await Promise.race([
      descriptorSuccess.waitFor({ timeout: 10000 }),
      descriptorFailure.waitFor({ timeout: 10000 })
    ])
    
    const hasSuccess = await descriptorSuccess.isVisible()
    const hasFailure = await descriptorFailure.isVisible()
    
    if (hasSuccess) {
      console.log('✅ Descriptors loaded successfully!')
      
      // Check that transaction creation succeeds
      await page.waitForSelector('text=✓ Real transaction object created successfully', { timeout: 10000 })
      console.log('✅ Real transaction object created!')
      
      // Check that it stops before signing (safe mode)
      await page.waitForSelector('text=Stopping before signing/submission for safety', { timeout: 5000 })
      console.log('✅ Safe mode working - stops before signing')
      
    } else if (hasFailure) {
      console.log('❌ Descriptor loading failed')
      await page.screenshot({ path: 'debug-descriptor-failure.png' })
      throw new Error('Descriptor loading failed')
    }
  } catch (error) {
    console.log('❌ Timeout waiting for descriptor loading result')
    await page.screenshot({ path: 'debug-timeout.png' })
    throw error
  }
  
  console.log('✅ Transaction execution test passed!')
})