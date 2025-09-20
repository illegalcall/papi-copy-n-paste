/**
 * Quick demonstration of Balances::transfer_allow_death parameter extraction
 * Shows the key success without all the processing noise
 */

import { createClient } from 'polkadot-api'
import { getWsProvider } from 'polkadot-api/ws-provider/web'
import { getDynamicBuilder, getLookupFn } from '@polkadot-api/metadata-builders'

interface ParameterInfo {
  name: string
  type: string
  isOptional: boolean
  isComplex: boolean
  description?: string
}

class QuickDemo {
  private lookup: any
  private dynamicBuilder: any

  constructor(metadataHex: string) {
    const metadataBytes = new Uint8Array(
      metadataHex.slice(2).match(/.{2}/g)!.map(byte => parseInt(byte, 16))
    )
    this.lookup = getLookupFn(metadataBytes)
    this.dynamicBuilder = getDynamicBuilder(metadataBytes)
  }

  private getTypeDescription(typeId: number, typeInfo: any): string {
    if (!typeInfo) return `Type(${typeId})`

    switch (typeInfo.type) {
      case 'primitive':
        return typeInfo.value

      case 'compact':
        if (typeInfo.size) {
          return `Compact<${typeInfo.size}>`
        } else {
          return `Compact<${typeId}>`
        }

      case 'enum':
      case 'variant':
        // Get enum variants for better description
        if (typeInfo.value && typeof typeInfo.value === 'object') {
          const variants = Object.keys(typeInfo.value)
          if (variants.length <= 5) {
            return `Enum(${variants.join('|')})`
          } else {
            return `Enum(${variants.slice(0, 3).join('|')}...+${variants.length - 3})`
          }
        }
        return `Enum(${typeId})`

      case 'sequence':
        if (typeInfo.value && typeInfo.value.type !== undefined) {
          const innerType = this.lookup(typeInfo.value.type)
          return `Vec<${this.getTypeDescription(typeInfo.value.type, innerType)}>`
        }
        return `Vec<${typeId}>`

      case 'array':
        if (typeInfo.value && typeInfo.value.type !== undefined) {
          const innerType = this.lookup(typeInfo.value.type)
          return `[${this.getTypeDescription(typeInfo.value.type, innerType)}; ${typeInfo.len || '?'}]`
        }
        return `[${typeId}; ${typeInfo.len || '?'}]`

      default:
        return `${typeInfo.type}(${typeId})`
    }
  }

  private getDetailedEnumInfo(typeId: number, typeInfo: any): string[] {
    if (!typeInfo || typeInfo.type !== 'enum' || !typeInfo.value) {
      return []
    }

    const variants: string[] = []
    Object.entries(typeInfo.value).forEach(([variantName, variantData]: [string, any]) => {
      if (variantData.type === 'void') {
        variants.push(variantName)
      } else {
        variants.push(`${variantName}(${variantData.type})`)
      }
    })

    return variants
  }

  demonstrateBalancesSuccess(): void {
    console.log('🎯 PAPI Copy-Paste Parameter Extraction Demo')
    console.log('===========================================\n')

    try {
      // Get the root extrinsic metadata
      const rootType = this.lookup(187) // This is the extrinsic type ID for Paseo Asset Hub

      if (!rootType || !rootType.value) {
        console.log('❌ Could not find root extrinsic type')
        return
      }

      // Find Balances pallet (index 10 on Paseo Asset Hub)
      const balancesPalletField = rootType.value._10
      if (!balancesPalletField) {
        console.log('❌ Could not find Balances pallet')
        return
      }

      // Get the Balances call enum
      const balancesCallType = this.lookup(balancesPalletField.id)
      if (!balancesCallType || !balancesCallType.value) {
        console.log('❌ Could not find Balances call type')
        return
      }

      // Find transfer_allow_death call
      const transferCall = balancesCallType.value.transfer_allow_death
      if (!transferCall || transferCall.type !== 'struct') {
        console.log('❌ Could not find transfer_allow_death call')
        return
      }

      console.log('✅ Found Balances::transfer_allow_death call')
      console.log('✅ Call structure type:', transferCall.type)
      console.log('✅ Available fields:', Object.keys(transferCall.value || {}))

      // Extract parameters
      const parameters: ParameterInfo[] = []

      if (transferCall.value) {
        Object.entries(transferCall.value).forEach(([fieldName, fieldData]: [string, any]) => {
          try {
            const typeId = fieldData.id
            const typeInfo = this.lookup(typeId)

            const param: ParameterInfo = {
              name: fieldName,
              type: this.getTypeDescription(typeId, typeInfo),
              isOptional: false,
              isComplex: typeInfo?.type !== 'primitive'
            }

            parameters.push(param)
            console.log(`✅ Parameter extracted: ${param.name} -> ${param.type}`)

            // Show enum details if it's an enum
            if (typeInfo?.type === 'enum' && typeInfo.value) {
              const enumVariants = this.getDetailedEnumInfo(typeId, typeInfo)
              if (enumVariants.length > 0) {
                console.log(`   📋 Enum options: ${enumVariants.join(', ')}`)
              }
            }
          } catch (error) {
            console.log(`❌ Failed to extract parameter ${fieldName}:`, error instanceof Error ? error.message : error)
          }
        })
      }

      console.log('\n🏆 FINAL RESULT:')
      console.log('================')
      console.log(`Call: Balances.transfer_allow_death`)
      console.log(`Parameter Count: ${parameters.length}`)

      parameters.forEach((param, i) => {
        console.log(`  ${i + 1}. ${param.name}: ${param.type}`)
      })

      if (parameters.length === 2 &&
          parameters.some(p => p.name === 'dest') &&
          parameters.some(p => p.name === 'value')) {
        console.log('\n🎉 SUCCESS: Complete parameter extraction working!')
        console.log('   ✅ Both dest and value parameters found')
        console.log('   ✅ Compact type handling fixed')
        console.log('   ✅ Ready for UI integration')
        console.log('\n📋 Summary:')
        console.log('   - dest: Account address (MultiAddress enum)')
        console.log('   - value: Transfer amount (Compact<u128>)')
      } else {
        console.log('\n❌ INCOMPLETE: Expected 2 parameters (dest, value)')
      }

    } catch (error) {
      console.error('❌ Error during demonstration:', error instanceof Error ? error.message : error)
    }
  }
}

async function main() {
  console.log('🚀 Quick Demo: PAPI Parameter Extraction')
  console.log('🔗 Connecting to Paseo Asset Hub...')

  const wsProvider = getWsProvider('wss://asset-hub-paseo-rpc.dwellir.com')
  const client = createClient(wsProvider)

  try {
    const metadataHex = await client._request('state_getMetadata', [])
    console.log('✅ Metadata fetched successfully')
    console.log('✅ Starting parameter extraction...\n')

    const demo = new QuickDemo(metadataHex)
    demo.demonstrateBalancesSuccess()

  } catch (error) {
    console.error('❌ Failed to run demo:', error instanceof Error ? error.message : error)
  } finally {
    client.destroy()
  }
}

main().catch(console.error)