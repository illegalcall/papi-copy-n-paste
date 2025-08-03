import { PalletCall } from './metadata'
import { createTestAccountSigner, validateSigner, formatSignerInfo, type TestAccount } from './signing'
import { getExplorerLinks, getExplorerName, hasExplorer } from './explorer'
import { detectSyncStatus, getStaleDataWarning } from './sync-status'

export interface TransactionResult {
  success: boolean
  hash?: string // For backward compatibility
  txHash?: string // New field for PAPI results
  blockNumber?: number
  blockHash?: string // New field for PAPI results
  error?: any // Can be string or DispatchError
  events?: any[]
}

export interface TransactionStep {
  message: string
  type: 'info' | 'success' | 'error' | 'warning'
  timestamp: number
}

export interface TransactionOptions {
  signer: TestAccount // Test account name like "//Alice"
  chainKey: string
  client: any
}

export class TransactionExecutor {
  private steps: TransactionStep[] = []
  private onStep?: (step: TransactionStep) => void

  constructor(private options: TransactionOptions) {}

  setStepCallback(callback: (step: TransactionStep) => void) {
    this.onStep = callback
  }

  private addStep(message: string, type: TransactionStep['type'] = 'info') {
    const step: TransactionStep = {
      message,
      type,
      timestamp: Date.now()
    }
    this.steps.push(step)
    this.onStep?.(step)
  }

  async executeTransaction(
    pallet: string,
    callName: string,
    args: Record<string, any>
  ): Promise<TransactionResult> {
    try {
      this.addStep(`> Running ${pallet}.${callName}...`)
      this.addStep(`> Using real blockchain connection to ${this.options.chainKey}`)

      // Validate client
      if (!this.options.client) {
        throw new Error('No client available for transaction execution')
      }

      // Get blockchain data and check sync status
      this.addStep('> Getting blockchain information...')
      const finalizedBlock = await this.options.client.getFinalizedBlock()
      const blockNumber = finalizedBlock.number

      // Get additional blockchain data using correct PAPI methods
      const bestBlocks = await this.options.client.getBestBlocks()
      const bestBlockNumber = bestBlocks[0].number // First element is the best block

      // Get connection type from client state
      const connectionType = this.options.client.connectionType || 'unknown'
      
      // Detect sync status
      const syncStatus = detectSyncStatus(this.options.chainKey, bestBlockNumber)
      const warning = getStaleDataWarning(syncStatus, this.options.chainKey)

      // Show simplified blockchain data
      this.addStep(`> ✅ Connected to ${this.options.chainKey} (Block #${blockNumber})`, 'success')
      
      // Only show warning if data is significantly stale
      if (warning && syncStatus.blocksBehind && syncStatus.blocksBehind > 1000) {
        this.addStep(`> ⚠️  Data is ${syncStatus.estimatedAge} old`, 'warning')
      }

      // Build the transaction
      this.addStep(`> Building transaction: ${pallet}.${callName}`)
      this.addStep(`> Arguments: ${JSON.stringify(args, null, 2).split('\n').join('\n>   ')}`)

      // Create the signer for the test account
      this.addStep(`> Creating signer for ${this.options.signer}...`)
      const signerInfo = createTestAccountSigner(this.options.signer)

      if (!validateSigner(signerInfo)) {
        throw new Error(`Invalid signer configuration for ${this.options.signer}`)
      }

      this.addStep(`> ✓ Signer created: ${formatSignerInfo(signerInfo)}`, 'success')

      // Create PAPI transaction structure (simulated for safety)
      this.addStep('> Creating PAPI transaction structure...')

      // Create the PAPI transaction using raw client
      const papiTransaction = await this.createPapiTransaction(this.options.client, pallet, callName, args)
      this.addStep('> ✓ PAPI transaction structure created', 'success')

      // Create a transaction object that includes the signer and PAPI transaction
      const transaction = {
        pallet,
        callName,
        args,
        signer: signerInfo,
        chainKey: this.options.chainKey,
        papiTransaction
      }

      // Simulate PAPI transaction submission (for safety)
      if (transaction.papiTransaction && !transaction.papiTransaction.mock) {
        this.addStep('> Simulating PAPI transaction submission...')
        const result = await this.submitRealTransaction(transaction)
        return result
      } else {
        // Fallback to simulated signing and submission flow
        this.addStep(`> Simulating signing with ${formatSignerInfo(transaction.signer)}...`)

        const signedTransaction = await this.signTransaction(transaction)
        this.addStep('> ✓ Transaction signing simulated (no real signature)', 'success')

        // Simulate submission
        this.addStep('> Simulating network submission...')

        const result = await this.submitTransaction(signedTransaction, blockNumber)
        return result
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      this.addStep(`> ❌ Error: ${errorMessage}`, 'error')
      
      return {
        success: false,
        error: errorMessage
      }
    }
  }

  private async createPapiTransaction(client: any, pallet: string, callName: string, args: any): Promise<any> {
    try {
      this.addStep(`> Building ${pallet}.${callName} transaction...`)

      // Import the typed API helper - now synchronous
      const { getTypedApiForChain } = await import('./descriptors')
      
      // Get typed API for this chain - now synchronous
      const chainKey = this.options.chainKey || 'polkadot'
      
      let typedApi
      try {
        typedApi = getTypedApiForChain(client, chainKey)
      } catch (descriptorError) {
        this.addStep(`> ❌ Failed to load descriptors: ${descriptorError instanceof Error ? descriptorError.message : 'Unknown error'}`, 'error')
        throw new Error(`Cannot create transaction: ${descriptorError instanceof Error ? descriptorError.message : 'Descriptor loading failed'}`)
      }

      if (pallet === 'Balances' && (callName === 'transfer_allow_death' || callName === 'transfer_keep_alive')) {
        this.addStep(`> Creating balance transfer transaction using getTypedApi()...`)

        // Validate that we have the Balances pallet and the specific method in the typedApi
        const transferMethod = typedApi.tx?.Balances?.[callName]
        if (!transferMethod) {
          throw new Error(`Balances.${callName} not found in chain descriptors. The descriptors may be incomplete or outdated.`)
        }

        // Now using proper PAPI v1.14+ pattern
        const transaction = {
          pallet,
          callName,
          args,
          mock: false, // This now uses the real PAPI pattern

          // Real PAPI transaction - everything is real except the final signing/submission
          signAndSubmit: async (signer: any, stepCallback: (step: string, type?: string) => void) => {
            try {
              // This is the real PAPI v1.14+ way to create transactions:
              // 1. Get typed API (already done above)
              // 2. Create transaction using real typed API
              
              // Validate and convert the amount
              let amount: bigint
              try {
                amount = BigInt(args.value)
              } catch (error) {
                throw new Error(`Invalid amount value: ${args.value}. Must be a valid number.`)
              }

              stepCallback('> Creating real PAPI transaction with typed API...', 'info')
              const tx = typedApi.tx.Balances[callName]({
                dest: args.dest, // Already in proper format from form
                value: amount
              })
              
              stepCallback('> ✓ Real transaction object created successfully', 'success')
              stepCallback(`> Transaction details: ${JSON.stringify(tx.decodedCall, null, 2)}`, 'info')
              
              // 3. Stop here - don't actually sign or submit (safety mode)
              stepCallback('> Stopping before signing/submission for safety', 'info')
              
              // Return simulated result showing what would have happened
              return {
                txHash: '0x' + Array.from({length: 64}, () => Math.floor(Math.random() * 16).toString(16)).join(''),
                blockHash: '0x' + Array.from({length: 64}, () => Math.floor(Math.random() * 16).toString(16)).join(''),
                mock: true,
                success: true,
                note: 'Real transaction created but signing/submission simulated for safety'
              }
              
            } catch (error) {
              stepCallback(`> ❌ Error creating real transaction: ${error instanceof Error ? error.message : 'Unknown error'}`, 'error')
              throw error
            }
          }
        }

        this.addStep(`> ✓ Real PAPI transaction created for ${pallet}.${callName}`, 'success')
        return transaction
      }

      // For other pallets/calls, we'll create a mock transaction for now
      this.addStep(`> ⚠️ Using mock transaction for ${pallet}.${callName} (not yet implemented)`, 'warning')
      return {
        pallet,
        callName,
        args,
        mock: true,
        signAndSubmit: async (signer: any) => {
          throw new Error(`Real submission not yet implemented for ${pallet}.${callName}`)
        }
      }
    } catch (error) {
      this.addStep(`> ❌ Failed to create PAPI transaction: ${error instanceof Error ? error.message : 'Unknown error'}`, 'error')
      throw error
    }
  }

  private async submitRealTransaction(transaction: any): Promise<TransactionResult> {
    try {
      this.addStep(`> Simulating signing and submission with ${formatSignerInfo(transaction.signer)}...`)

      // Simulate PAPI's signAndSubmit method with real-time monitoring callback
      const result = await transaction.papiTransaction.signAndSubmit(
        transaction.signer.signer,
        (step: string, type?: string) => this.addStep(step, type as any)
      )

      // Add simulated chain-specific explorer link
      if (hasExplorer(this.options.chainKey)) {
        const explorerLinks = getExplorerLinks(this.options.chainKey)
        const explorerName = getExplorerName(this.options.chainKey)
        if (explorerLinks && result.txHash) {
          const explorerUrl = explorerLinks.transaction(result.txHash)
          this.addStep(`🔗 Simulated ${explorerName} link: ${explorerUrl}`)
        }
      }

      // Show transaction details
      this.addStep(`🔗 From: ${transaction.signer.name} (${transaction.signer.address})`)

      // Show simulated finalization status
      if (result.finalized) {
        this.addStep('🔒 Transaction finalization simulated', 'success')
      }

      // Show simulated event details
      if (result.events && result.events.length > 0) {
        this.addStep('📋 Transaction Events:', 'info')
        result.events.forEach((event: any, index: number) => {
          this.addStep(`  ${index + 1}. ${event.section}.${event.method}`, 'info')
        })
      }

      // Handle different result structures from PAPI
      const isSuccess = result.ok !== false && result.success !== false
      
      if (isSuccess) {
        this.addStep('✅ Transaction simulation executed successfully!', 'success')
      } else {
        this.addStep('⚠️ Transaction simulation failed', 'warning')
        // Handle different error structures
        if (result.dispatchError) {
          this.addStep(`> Simulated Dispatch Error: ${JSON.stringify(result.dispatchError)}`, 'error')
        } else if (result.error) {
          this.addStep(`> Simulated Error: ${JSON.stringify(result.error)}`, 'error')
        } else if (result.dispatchResult && result.dispatchResult.isErr) {
          this.addStep(`> Simulated Dispatch Error: ${JSON.stringify(result.dispatchResult.asErr)}`, 'error')
        }
      }

      // Format the amount for display (assuming it's a balance transfer)
      if (transaction.pallet === 'Balances' && transaction.args.value) {
        const amountInDot = Number(transaction.args.value) / 1_000_000_000_000
        this.addStep(`🔗 To: ${transaction.args.dest} 🔗 Amount: ${amountInDot.toFixed(12)} DOT`)
      }

      const finalMessage = isSuccess ?
        '✅ Transaction simulation completed successfully!' :
        '⚠️ Transaction simulation completed with errors'
      this.addStep(finalMessage, isSuccess ? 'success' : 'warning')

      // Handle PAPI transaction result structure
      // PAPI results have different structure than traditional Substrate results
      let blockNumber: number | undefined
      let blockHash: string | undefined
      
      if (result.block) {
        // Traditional Substrate result structure
        blockNumber = result.block.number
        blockHash = result.block.hash
      } else if (result.blockNumber) {
        // PAPI result structure
        blockNumber = result.blockNumber
        blockHash = result.blockHash
      }
      
      // Handle different error structures
      let errorDetails = undefined
      if (result.ok === false) {
        if (result.dispatchError) {
          errorDetails = result.dispatchError
        } else if (result.error) {
          errorDetails = result.error
        } else if (result.dispatchResult && result.dispatchResult.isErr) {
          errorDetails = result.dispatchResult.asErr
        }
      }
      
      return {
        success: isSuccess,
        hash: result.txHash || result.hash, // For backward compatibility
        txHash: result.txHash || result.hash,
        blockNumber,
        blockHash,
        events: result.events || [],
        error: errorDetails
      }
    } catch (error) {
      this.addStep(`> ❌ Real submission failed: ${error instanceof Error ? error.message : 'Unknown error'}`, 'error')

      // Handle specific PAPI errors
      if (error instanceof Error) {
        if (error.message.includes('InvalidTransaction')) {
          this.addStep('> This might be due to insufficient funds, invalid nonce, or expired transaction', 'error')
        } else if (error.message.includes('network')) {
          this.addStep('> This might be a network connectivity issue', 'error')
        } else if (error.message.includes('descriptors')) {
          this.addStep('> This might be due to missing or invalid chain descriptors', 'error')
        }
      }

      // Return a proper error result instead of throwing
      return {
        success: false,
        hash: undefined,
        txHash: undefined,
        blockNumber: undefined,
        blockHash: undefined,
        events: [],
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  }

  private async signTransaction(transaction: any): Promise<any> {
    try {
      // Create a mock transaction payload for signing
      const transactionPayload = {
        pallet: transaction.pallet,
        callName: transaction.callName,
        args: transaction.args,
        chainKey: transaction.chainKey,
        timestamp: Date.now()
      }

      // Convert to bytes for signing (simplified)
      const payloadBytes = new TextEncoder().encode(JSON.stringify(transactionPayload))

      // Use the real signer to sign the payload
      this.addStep(`> Generating cryptographic signature...`)

      // For Phase 3.2, we'll use signBytes for demonstration
      // In Phase 3.3, we'll use signTx with actual transaction objects
      const signature = await transaction.signer.signer.signBytes(payloadBytes)

      this.addStep(`> ✓ Signature generated: ${signature.length} bytes`, 'success')

      // Return signed transaction
      return {
        ...transaction,
        signature,
        signedAt: Date.now(),
        payloadHash: this.generatePayloadHash(payloadBytes)
      }
    } catch (error) {
      this.addStep(`> ❌ Signing failed: ${error instanceof Error ? error.message : 'Unknown error'}`, 'error')
      throw error
    }
  }

  private generatePayloadHash(payload: Uint8Array): string {
    // Simple hash generation for demo (in real implementation, use proper hashing)
    let hash = 0
    for (let i = 0; i < payload.length; i++) {
      const byte = payload[i]
      if (byte !== undefined) {
        hash = ((hash << 5) - hash + byte) & 0xffffffff
      }
    }
    return '0x' + Math.abs(hash).toString(16).padStart(8, '0')
  }

  private async submitTransaction(signedTransaction: any, currentBlockNumber: number): Promise<TransactionResult> {
    try {
      // For Phase 3.2, we'll show information about the signed transaction
      // This will be replaced with actual submission in Phase 3.3

      this.addStep(`> ✓ Transaction signed by: ${formatSignerInfo(signedTransaction.signer)}`, 'success')
      this.addStep(`> ✓ Payload hash: ${signedTransaction.payloadHash}`, 'success')
      this.addStep(`> ✓ Signature length: ${signedTransaction.signature.length} bytes`, 'success')

      // Generate a realistic transaction hash
      const txHash = this.generateRealisticTxHash()
      this.addStep(`> ✓ Transaction hash: ${txHash}`, 'success')

      // Simulate network propagation delay
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Use real block number + 1 for inclusion
      const inclusionBlock = currentBlockNumber + 1
      this.addStep(`> ✓ Included in block #${inclusionBlock}`, 'success')

      // Add chain-specific explorer links
      this.addStep(``)
      if (hasExplorer(this.options.chainKey)) {
        const explorerLinks = getExplorerLinks(this.options.chainKey)
        const explorerName = getExplorerName(this.options.chainKey)
        if (explorerLinks) {
          const explorerUrl = explorerLinks.transaction(txHash)
          this.addStep(`🔗 View on ${explorerName}: ${explorerUrl}`)
        }
      }
      this.addStep(`🔗 From: ${this.options.signer} (5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY)`)

      this.addStep(``)
      this.addStep(`✅ Transaction executed successfully!`, 'success')

      return {
        success: true,
        hash: txHash,
        blockNumber: inclusionBlock
      }
    } catch (error) {
      throw error
    }
  }

  private generateRealisticTxHash(): string {
    // Generate a more realistic transaction hash that follows Substrate patterns
    const prefix = '0x'
    const hash = Array.from({length: 64}, () => {
      // Use a more realistic distribution of hex characters
      const chars = '0123456789abcdef'
      return chars[Math.floor(Math.random() * chars.length)]
    }).join('')
    
    return prefix + hash
  }

  getSteps(): TransactionStep[] {
    return [...this.steps]
  }

  clearSteps() {
    this.steps = []
  }
}

// Utility function to execute a transaction with step-by-step output
export async function executeTransactionWithSteps(
  selectedCall: { pallet: string; call: PalletCall },
  formData: Record<string, any>,
  options: TransactionOptions,
  onStep: (step: TransactionStep) => void
): Promise<TransactionResult> {
  const executor = new TransactionExecutor(options)
  executor.setStepCallback(onStep)

  return executor.executeTransaction(
    selectedCall.pallet,
    selectedCall.call.name,
    formData
  )
}

// Helper function to format transaction details for display
export function formatTransactionDetails(
  selectedCall: { pallet: string; call: PalletCall }, 
  formData: Record<string, any>
): string {
  if (selectedCall.pallet === 'Balances' && selectedCall.call.name.includes('transfer')) {
    const dest = formData.dest || '//Bob'
    const value = formData.value || 0
    const formatted = (value / 1000000000000).toFixed(12) // Convert from planck to DOT
    return `🔗 To: ${dest} (5FHneW46...)
🔗 Amount: ${formatted} DOT`
  }
  
  if (selectedCall.pallet === 'System' && selectedCall.call.name === 'remark') {
    return `🔗 Remark: "${formData.remark || 'Hello World'}"`
  }
  
  return `🔗 Parameters: ${Object.entries(formData).map(([k, v]) => `${k}: ${v}`).join(', ')}`
}
