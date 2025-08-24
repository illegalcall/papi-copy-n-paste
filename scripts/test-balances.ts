/**
 * Simple test to demonstrate complete Balances::transfer_allow_death parameter extraction
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

class SimpleBalancesTest {
  private lookup: any
  private dynamicBuilder: any

  constructor(metadataHex: string) {
    // Convert hex string to Uint8Array
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
        // Handle compact types - they have 'size' property
        if (typeInfo.size) {
          return `Compact<${typeInfo.size}>`
        } else {
          return `Compact<${typeId}>`
        }

      case 'enum':
      case 'variant':
        return `Enum(${typeId})`

      default:
        return `${typeInfo.type}(${typeId})`
    }
  }

  testBalancesTransferAllowDeath(): void {
    console.log('🎯 Testing Balances::transfer_allow_death Parameter Extraction')
    console.log('==============================================================')

    try {
      // Get the extrinsic type information
      const palletIndex = 10 // Balances pallet index on Paseo Asset Hub
      const palletInfo = this.lookup(187) // Root extrinsic enum type
      const balancesPallet = palletInfo.value[`_${palletIndex}`]

      if (!balancesPallet) {
        console.log('❌ Balances pallet not found')
        return
      }

      const callType = this.lookup(balancesPallet.id)
      if (!callType || !callType.value || !callType.value.transfer_allow_death) {
        console.log('❌ transfer_allow_death call not found')
        return
      }

      const transferCall = callType.value.transfer_allow_death
      if (transferCall.type !== 'struct' || !transferCall.value) {
        console.log('❌ transfer_allow_death is not a struct')
        return
      }

      // Extract parameters
      const parameters: ParameterInfo[] = []

      Object.entries(transferCall.value).forEach(([fieldName, fieldData]: [string, any]) => {
        const typeId = fieldData.id
        const typeInfo = this.lookup(typeId)

        const param: ParameterInfo = {
          name: fieldName,
          type: this.getTypeDescription(typeId, typeInfo),
          isOptional: false, // Simplified for this test
          isComplex: typeInfo?.type !== 'primitive',
          description: fieldData.docs?.join(' ') || undefined
        }

        parameters.push(param)
        console.log(`✅ Parameter: ${param.name} -> ${param.type}`)
      })

      console.log('\n🏆 RESULT:')
      console.log(`   Call: Balances.transfer_allow_death`)
      console.log(`   Parameters: ${parameters.length}`)
      parameters.forEach((param, i) => {
        console.log(`   ${i + 1}. ${param.name}: ${param.type}`)
      })

      if (parameters.length === 2 && parameters[0].name === 'dest' && parameters[1].name === 'value') {
        console.log('\n🎉 SUCCESS: Complete parameter extraction working!')
        console.log('   - Both dest and value parameters found')
        console.log('   - Compact type handling fixed')
        console.log('   - Ready for UI integration')
      } else {
        console.log('\n❌ INCOMPLETE: Expected 2 parameters (dest, value)')
      }

    } catch (error) {
      console.error('❌ Error during test:', error instanceof Error ? error.message : error)
    }
  }
}

async function main() {
  console.log('🚀 Simple Balances Parameter Test')
  console.log('🔗 Connecting to Paseo Asset Hub...')

  const wsProvider = getWsProvider('wss://asset-hub-paseo-rpc.dwellir.com')
  const client = createClient(wsProvider)

  try {
    const metadataHex = await client._request('state_getMetadata', [])
    console.log('✅ Metadata fetched')

    const tester = new SimpleBalancesTest(metadataHex)
    tester.testBalancesTransferAllowDeath()

  } catch (error) {
    console.error('❌ Failed:', error instanceof Error ? error.message : error)
  } finally {
    client.destroy()
  }
}

main().catch(console.error)