/**
 * Transaction response templates for different pallets and calls
 */

import { balancesTransactionTemplates } from './balances'
import { systemTransactionTemplates } from './system'
import { stakingTransactionTemplates } from './staking'
import { genericTransactionTemplate } from './generic'

// Combined transaction templates by pallet
export const transactionTemplates = {
  Balances: balancesTransactionTemplates,
  System: systemTransactionTemplates,
  Staking: stakingTransactionTemplates,
} as const

/**
 * Get transaction template for a specific pallet and call
 */
export function getTransactionTemplate(pallet: string, callName: string): string {
  // First, try to find a specific template for this pallet/call combination
  const palletTemplates = transactionTemplates[pallet as keyof typeof transactionTemplates]
  
  if (palletTemplates) {
    const callTemplate = (palletTemplates as any)[callName]
    
    if (callTemplate && callTemplate.success && callTemplate.error) {
      const successExample = callTemplate.success
      const errorExample = callTemplate.error
      return `Promise<TransactionResult>\n\n// Example successful response:\n${successExample}\n\n// Example error response:\n${errorExample}`
    }
  }
  
  // Fallback to generic template
  const successExample = genericTransactionTemplate.success.replace('{{pallet}}', pallet)
  const errorExample = genericTransactionTemplate.error
  
  return `Promise<TransactionResult>\n\n// Example successful response:\n${successExample}\n\n// Example error response:\n${errorExample}`
}

export * from './balances'
export * from './system' 
export * from './staking'
export * from './generic'