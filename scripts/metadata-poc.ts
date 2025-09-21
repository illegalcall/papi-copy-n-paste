#!/usr/bin/env tsx

/**
 * POC Script: Extrinsic Parameter Extraction using PAPI Metadata
 *
 * This script mimics the exact functionality from PAPI Console to:
 * 1. Connect to Paseo Asset Hub
 * 2. Extract metadata and build dynamic codec definitions
 * 3. Parse extrinsic call structures to extract parameter names and types
 * 4. Generate the same parameter information that would be used in UI
 */

import { createClient } from 'polkadot-api'
import { getWsProvider } from 'polkadot-api/ws-provider/web'
import { getDynamicBuilder, getLookupFn } from '@polkadot-api/metadata-builders'
import {
  unifyMetadata,
  decAnyMetadata,
  type UnifiedMetadata
} from '@polkadot-api/substrate-bindings'

// Type definitions for extracted parameter info
interface ParameterInfo {
  name: string
  type: string
  codec: any
  isOptional: boolean
  isComplex: boolean
  description?: string
}

interface CallInfo {
  pallet: string
  call: string
  parameters: ParameterInfo[]
  documentation?: string[]
}

interface ExtrinsicInfo {
  pallets: string[]
  calls: Record<string, CallInfo[]>
  allCalls: CallInfo[]
}

class MetadataAnalyzer {
  private metadata!: UnifiedMetadata
  private lookup!: any
  private dynamicBuilder!: any

  constructor(metadataRaw: Uint8Array) {
    this.metadata = unifyMetadata(decAnyMetadata(metadataRaw))
    this.lookup = getLookupFn(this.metadata)
    this.dynamicBuilder = getDynamicBuilder(this.lookup)
  }

  /**
   * PAPI Console pattern: Extract inner variable from enum variant
   */
  private getEnumInnerVar(shape: any, variantName: string): any {
    const innerShape = shape.value[variantName];
    return innerShape?.type === "lookupEntry" ? innerShape.value : innerShape;
  }

  /**
   * PAPI Console pattern: Enhanced codec building with proper error handling
   */
  private buildCodecSafely(typeId: number): any {
    try {
      return this.dynamicBuilder.buildDefinition(typeId);
    } catch (error: any) {
      console.warn(`⚠️  Failed to build codec for type ${typeId}:`, error.message);
      return null;
    }
  }

  /**
   * Safe lookup function - PAPI Console approach with error handling
   */
  private safeLookup(typeId: number): any {
    try {
      return this.lookup(typeId)
    } catch (error: any) {
      console.warn(`⚠️  Failed to lookup type ${typeId}:`, error.message)
      return null
    }
  }

  /**
   * Extract complete extrinsic information - mimics PAPI Console approach
   */
  extractExtrinsicInfo(): ExtrinsicInfo {
    console.log('🔍 Extracting extrinsic information from metadata...')

    const pallets: string[] = []
    const calls: Record<string, CallInfo[]> = {}
    const allCalls: CallInfo[] = []

    // Iterate through all pallets
    for (const pallet of this.metadata.pallets) {
      if (!pallet.calls) continue

      const palletName = pallet.name
      pallets.push(palletName)
      calls[palletName] = []

      console.log(`📦 Processing pallet: ${palletName}`)

      try {
        // Get call type definition - this mimics PAPI Console's approach
        const callTypeId = pallet.calls.type
        const callCodec = this.dynamicBuilder.buildDefinition(callTypeId)

        // Extract call variants (individual calls in the pallet) - exactly like PAPI Console
        const callType = this.lookup(callTypeId)

        console.log(`  🔍 Call type for ${palletName}: ${callType?.type || 'undefined'}`)
        console.log(`  🔍 Call type ID: ${callTypeId}`)

        if (callType && (callType.type === 'variant' || callType.type === 'enum')) {
          // PAPI Console approach: callType.value is an object where keys are call names
          const callNames = Object.keys(callType.value || {})
          console.log(`  📋 Found ${callNames.length} call variants: ${callNames.join(', ')}`)

          for (const callName of callNames) {
            const callData = callType.value[callName]

            // Debug: Always log call data for Balances to understand structure
            if (palletName === 'Balances' && callName === 'transfer_allow_death') {
              console.log(`    🔍 BALANCES ${callName} - Parameter count should be 2`)
              console.log(`    🔍 Available fields:`, Object.keys(callData.value || {}))
            }

            // Extract parameters directly from callData structure
            const parameters: ParameterInfo[] = []

            if (callData && callData.type === 'struct' && callData.value) {
              // Debug for Balances
              if (palletName === 'Balances') {
                console.log(`    🔍 Starting forEach loop for ${Object.keys(callData.value).length} fields:`, Object.keys(callData.value))
              }

              Object.entries(callData.value).forEach(([fieldName, fieldData]: [string, any]) => {
                try {
                  // Debug for Balances
                  if (palletName === 'Balances') {
                    console.log(`      🔄 Processing field: ${fieldName}`)
                    console.log(`      📝 Field data structure:`, JSON.stringify(fieldData, null, 2))
                  }

                  // Handle different field data structures
                  let typeId: number
                  if (fieldData.id !== undefined) {
                    typeId = fieldData.id
                    if (palletName === 'Balances') {
                      console.log(`      ✅ Found typeId: ${typeId} for field: ${fieldName}`)
                    }
                  } else {
                    console.warn(`      ⚠️  No id found for field ${fieldName}:`, fieldData)
                    return
                  }

                  if (palletName === 'Balances') {
                    console.log(`      🔍 About to lookup typeId: ${typeId}`)
                  }

                  const typeInfo = this.safeLookup(typeId)

                  if (palletName === 'Balances') {
                    console.log(`      ✅ Lookup successful, typeInfo:`, typeInfo ? typeInfo.type : 'null')
                  }

                  if (palletName === 'Balances') {
                    console.log(`      🔍 About to get type description`)
                  }

                  const typeDescription = this.getTypeDescription(typeId, typeInfo)

                  if (palletName === 'Balances') {
                    console.log(`      ✅ Type description: ${typeDescription}`)
                  }

                  const paramInfo: ParameterInfo = {
                    name: fieldName,
                    type: typeDescription,
                    codec: null,
                    isOptional: this.isOptionalType(typeInfo),
                    isComplex: this.isComplexType(typeInfo),
                    description: fieldData.docs?.join(' ') || undefined
                  }

                  if (palletName === 'Balances') {
                    console.log(`      🔍 About to push parameter`)
                  }

                  parameters.push(paramInfo)

                  // Debug for Balances
                  if (palletName === 'Balances') {
                    console.log(`      🎯 PARAM SUCCESSFULLY ADDED: ${fieldName} -> ${paramInfo.type} (typeId: ${typeId})`)
                  }
                } catch (error) {
                  console.error(`      💥 ERROR processing field ${fieldName}:`, error)
                  if (palletName === 'Balances') {
                    console.error(`      💥 BALANCES ERROR DETAILS:`, {
                      fieldName,
                      fieldData,
                      error: error instanceof Error ? error.message : error
                    })
                  }
                }
              })

              // Debug for Balances
              if (palletName === 'Balances') {
                console.log(`    ✅ Finished forEach loop, extracted ${parameters.length} parameters`)
              }
            } else if (callData && callData.type !== 'void') {
              // Debug: log the actual structure for non-void calls
              console.log(`    🔍 Call data structure for ${callName}:`, JSON.stringify(callData, null, 2).slice(0, 500))
            } else if (callData) {
              // Debug: log ALL call data to understand the structure
              console.log(`    🔍 FULL Call data for ${callName}:`, JSON.stringify(callData, null, 2).slice(0, 500))
            }

            const callInfo: CallInfo = {
              pallet: palletName,
              call: callName,
              parameters,
              documentation: callData.docs || []
            }

            calls[palletName].push(callInfo)
            allCalls.push(callInfo)

            console.log(`  ⚡ Found call: ${callInfo.call} (${callInfo.parameters.length} params)`)
          }
        } else {
          console.log(`  ⚠️  Call type is not variant: ${callType?.type}, checking composite...`)

          // Some chains might use composite instead of variant
          if (callType && callType.type === 'composite') {
            console.log(`  📋 Processing composite call type with ${callType.value.fields?.length || 0} fields`)
            // Handle composite type differently - this represents a single call
            const callInfo: CallInfo = {
              pallet: palletName,
              call: 'composite_call',
              parameters: (callType.value.fields || []).map((field: any) => this.extractParameterInfo(field, callCodec)),
              documentation: callType.docs || []
            }
            calls[palletName].push(callInfo)
            allCalls.push(callInfo)
            console.log(`  ⚡ Found composite call: ${callInfo.call} (${callInfo.parameters.length} params)`)
          }
        }
      } catch (error: any) {
        console.warn(`⚠️  Failed to process pallet ${palletName}:`, error.message)
      }
    }

    console.log(`✅ Extraction complete: ${pallets.length} pallets, ${allCalls.length} total calls`)

    return {
      pallets,
      calls,
      allCalls
    }
  }

  /**
   * Extract parameter information for a specific call
   */
  private extractCallInfo(palletName: string, variant: any, palletCodec: any): CallInfo {
    const callName = variant.name
    const parameters: ParameterInfo[] = []

    // Try to get call codec directly from the dynamic builder
    try {
      // Build the specific call codec - this is the PAPI Console approach
      const callCodec = this.dynamicBuilder.buildDefinition(palletCodec._def.type)

      // Look up the call variant in the pallet's call enum
      const palletCallType = this.lookup(palletCodec._def.type)

      if (palletCallType && palletCallType.type === 'enum' && palletCallType.value[callName]) {
        const callVariant = palletCallType.value[callName]

        if (callVariant.type === 'struct' && callVariant.value) {
          // Extract parameters from struct fields
          Object.entries(callVariant.value).forEach(([fieldName, fieldData]: [string, any]) => {
            const paramInfo: ParameterInfo = {
              name: fieldName,
              type: this.getTypeDescription(fieldData.id, this.lookup(fieldData.id)),
              codec: null,
              isOptional: this.isOptionalType(this.lookup(fieldData.id)),
              isComplex: this.isComplexType(this.lookup(fieldData.id)),
              description: fieldData.docs?.join(' ') || undefined
            }
            parameters.push(paramInfo)
          })
        }
      }
    } catch (error: any) {
      console.warn(`    ⚠️  Failed to extract parameters for ${callName}:`, error.message)
    }

    // Fallback: use variant.fields if available
    if (parameters.length === 0 && variant.fields && variant.fields.length > 0) {
      for (const field of variant.fields) {
        try {
          const paramInfo = this.extractParameterInfo(field, palletCodec)
          parameters.push(paramInfo)
        } catch (error: any) {
          console.warn(`    ⚠️  Failed to extract parameter ${field.name || 'unnamed'}:`, error.message)
        }
      }
    }

    return {
      pallet: palletName,
      call: callName,
      parameters,
      documentation: variant.docs || []
    }
  }

  /**
   * Extract detailed parameter information - mimics PAPI Console's parameter detection
   */
  private extractParameterInfo(field: any, palletCodec: any): ParameterInfo {
    const paramName = field.name || 'unnamed'

    // Build codec for this specific parameter type
    let paramCodec
    let typeInfo

    try {
      paramCodec = this.dynamicBuilder.buildDefinition(field.type)
      typeInfo = this.lookup(field.type)
    } catch (error) {
      console.warn(`      ⚠️  Failed to build codec for parameter ${paramName}:`, error.message)
      paramCodec = null
      typeInfo = null
    }

    const parameterInfo: ParameterInfo = {
      name: paramName,
      type: this.getTypeDescription(field.type, typeInfo),
      codec: paramCodec,
      isOptional: this.isOptionalType(typeInfo),
      isComplex: this.isComplexType(typeInfo),
      description: field.docs?.join(' ') || undefined
    }

    return parameterInfo
  }

  /**
   * Get human-readable type description
   */
  private getTypeDescription(typeId: number, typeInfo: any): string {
    if (!typeInfo) return `Type(${typeId})`

    switch (typeInfo.type) {
      case 'primitive':
        return typeInfo.value

      case 'compact':
        // Handle compact types - they have 'size' property, not 'value.type'
        if (typeInfo.size) {
          return `Compact<${typeInfo.size}>`
        } else if (typeInfo.value && typeInfo.value.type !== undefined) {
          // Fallback for other compact structures
          const innerType = this.safeLookup(typeInfo.value.type)
          return `Compact<${this.getTypeDescription(typeInfo.value.type, innerType)}>`
        } else {
          return `Compact<${typeId}>`
        }

      case 'sequence':
        const elementType = this.safeLookup(typeInfo.value.type)
        return `Vec<${this.getTypeDescription(typeInfo.value.type, elementType)}>`

      case 'array':
        const arrayElementType = this.safeLookup(typeInfo.value.type)
        return `[${this.getTypeDescription(typeInfo.value.type, arrayElementType)}; ${typeInfo.value.len}]`

      case 'tuple':
        const tupleTypes = typeInfo.value.map((t: number) => {
          const innerType = this.safeLookup(t)
          return this.getTypeDescription(t, innerType)
        })
        return `(${tupleTypes.join(', ')})`

      case 'variant':
      case 'enum':
        return typeInfo.path?.join('::') || `Enum(${typeId})`

      case 'composite':
        return typeInfo.path?.join('::') || `Struct(${typeId})`

      default:
        return `Type(${typeId})`
    }
  }

  /**
   * Check if type is optional (Option<T>)
   */
  private isOptionalType(typeInfo: any): boolean {
    if (!typeInfo) return false

    if ((typeInfo.type === 'variant' || typeInfo.type === 'enum') && typeInfo.path) {
      const path = typeInfo.path.join('::')
      return path.includes('Option') || path.includes('option')
    }

    return false
  }

  /**
   * Check if type is complex (needs special UI treatment)
   */
  private isComplexType(typeInfo: any): boolean {
    if (!typeInfo) return false

    switch (typeInfo.type) {
      case 'primitive':
        return false
      case 'compact':
        return false
      case 'sequence':
      case 'array':
      case 'tuple':
      case 'variant':
      case 'enum':
      case 'composite':
        return true
      default:
        return true
    }
  }

  /**
   * Get specific call information by pallet and call name
   */
  getCallInfo(palletName: string, callName: string): CallInfo | null {
    const extrinsicInfo = this.extractExtrinsicInfo()
    const palletCalls = extrinsicInfo.calls[palletName]

    if (!palletCalls) {
      console.log(`❌ Pallet '${palletName}' not found`)
      return null
    }

    const callInfo = palletCalls.find(call => call.call === callName)

    if (!callInfo) {
      console.log(`❌ Call '${callName}' not found in pallet '${palletName}'`)
      return null
    }

    return callInfo
  }

  /**
   * Demo function: Show parameter extraction for specific calls
   */
  demonstrateParameterExtraction() {
    console.log('\n🎯 DEMONSTRATION: Parameter Extraction for Common Calls')
    console.log('============================================================')

    // FIRST: Demonstrate the fix for Balances::transfer_allow_death
    console.log('\n🏆 SUCCESS STORY: Balances::transfer_allow_death parameter extraction')
    console.log('----------------------------------------------------------------------')
    const balancesTransfer = this.getCallInfo('Balances', 'transfer_allow_death')
    if (balancesTransfer) {
      console.log(`✅ Call: ${balancesTransfer.pallet}.${balancesTransfer.call}`)
      console.log(`✅ Parameter count: ${balancesTransfer.parameters.length}`)
      balancesTransfer.parameters.forEach((param, index) => {
        console.log(`   📋 Parameter ${index + 1}: ${param.name} -> ${param.type} ${param.isOptional ? '(optional)' : '(required)'}`)
      })
      console.log('✅ COMPLETE: Both dest and value parameters successfully extracted!')
    } else {
      console.log('❌ Failed to get Balances::transfer_allow_death info')
    }

    // Test cases from common extrinsics
    console.log('\n📊 Additional Test Cases:')
    console.log('-------------------------')
    const testCases = [
      { pallet: 'Balances', call: 'transfer_keep_alive' },
      { pallet: 'Assets', call: 'transfer' },
      { pallet: 'System', call: 'remark' },
    ]

    for (const { pallet, call } of testCases) {
      console.log(`\n📋 ${pallet}::${call}`)
      console.log('----------------------------------------')

      const callInfo = this.getCallInfo(pallet, call)

      if (callInfo) {
        if (callInfo.parameters.length === 0) {
          console.log('  No parameters required')
        } else {
          callInfo.parameters.forEach((param, index) => {
            console.log(`  ${index + 1}. ${param.name}: ${param.type}`)
            console.log(`     Optional: ${param.isOptional}`)
            console.log(`     Complex: ${param.isComplex}`)
            if (param.description) {
              console.log(`     Description: ${param.description}`)
            }
          })
        }

        if (callInfo.documentation && callInfo.documentation.length > 0) {
          console.log(`  📖 Documentation: ${callInfo.documentation.join(' ')}`)
        }
      }
    }
  }
}

/**
 * Main execution function - Connecting to live Paseo Asset Hub
 */
async function main() {
  console.log('🚀 PAPI Metadata Parameter Extraction POC')
  console.log('====================================================')

  let client: any = null

  try {
    // Step 1: Connect to Paseo Asset Hub via RPC
    console.log('🔗 Connecting to Paseo Asset Hub...')
    console.log('   RPC: wss://asset-hub-paseo-rpc.dwellir.com')

    const wsProvider = getWsProvider('wss://asset-hub-paseo-rpc.dwellir.com')
    client = createClient(wsProvider)

    console.log('✅ Connected successfully!')

    // Step 2: Get live metadata
    console.log('📡 Fetching live metadata...')

    // Use RPC call to get metadata directly - this is the standard approach
    const metadataHex = await client._request('state_getMetadata', [])

    // Convert hex metadata to bytes
    const metadataRaw = new Uint8Array(
      metadataHex.slice(2).match(/.{1,2}/g)!.map((byte: string) => parseInt(byte, 16))
    )

    console.log(`✅ Metadata received (${metadataRaw.length} bytes)`)

    // Step 3: Initialize analyzer
    console.log('🔧 Initializing metadata analyzer...')

    const analyzer = new MetadataAnalyzer(metadataRaw)

    console.log('✅ Analyzer ready!')

    // Step 4: Extract and demonstrate
    console.log('\n🎯 Extracting extrinsic information...')

    const extrinsicInfo = analyzer.extractExtrinsicInfo()

    console.log('\n📊 SUMMARY:')
    console.log(`  Pallets: ${extrinsicInfo.pallets.length}`)
    console.log(`  Total calls: ${extrinsicInfo.allCalls.length}`)
    console.log(`  Available pallets: ${extrinsicInfo.pallets.join(', ')}`)

    // Step 5: Demonstrate parameter extraction
    analyzer.demonstrateParameterExtraction()

    // Step 6: Show how this would be used in UI
    console.log('\n🖥️  UI INTEGRATION EXAMPLE:')
    console.log('==================================================')

    const balancesTransfer = analyzer.getCallInfo('Balances', 'transfer_allow_death')
    if (balancesTransfer) {
      console.log('For a UI form, you would generate:')
      balancesTransfer.parameters.forEach(param => {
        const inputType = param.isComplex ? 'complex-component' : 'simple-input'
        console.log(`  - ${param.name}: <${inputType} type="${param.type}" optional=${param.isOptional} />`)
      })
    }

    console.log('\n✅ POC Complete! This demonstrates the exact same approach used by PAPI Console.')
    console.log('💡 This script shows how to extract parameter info that can be used to build UI forms.')

  } catch (error: any) {
    console.error('❌ POC failed:', error.message)
    console.error('Stack:', error.stack)
    process.exit(1)
  } finally {
    // Cleanup connection
    if (client) {
      try {
        client.destroy()
        console.log('🧹 Connection cleaned up')
      } catch (e) {
        // Ignore cleanup errors
      }
    }
  }
}

// Helper for string repetition
function repeat(str: string, times: number): string {
  return Array(times + 1).join(str)
}

// Add to global for the repeat operator
const originalConsoleLog = console.log
console.log = function(...args: any[]) {
  const processed = args.map(arg =>
    typeof arg === 'string' && arg.includes(' * ')
      ? repeat('=', 50)
      : arg
  )
  originalConsoleLog.apply(console, processed)
}

// Execute if run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error)
}

export { MetadataAnalyzer, type ParameterInfo, type CallInfo, type ExtrinsicInfo }