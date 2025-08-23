/**
 * MetadataAnalyzer - Enhanced metadata parameter extraction for UI
 *
 * Ported from POC script with UI-specific enhancements:
 * - Rich parameter information for forms
 * - Enum variant extraction for dropdowns
 * - Optional parameter detection
 * - Type complexity assessment
 * - UI-ready parameter descriptions
 */

import { getDynamicBuilder, getLookupFn } from '@polkadot-api/metadata-builders'
import {
  unifyMetadata,
  decAnyMetadata,
  type UnifiedMetadata
} from '@polkadot-api/substrate-bindings'

export interface ParameterInfo {
  name: string
  type: string
  codec: any | null
  isOptional: boolean
  isComplex: boolean
  description?: string
  enumVariants?: EnumVariant[]
  defaultValue?: any
}

export interface EnumVariant {
  name: string
  type: 'void' | 'data'
  dataType?: string
  description?: string
}

export interface CallInfo {
  pallet: string
  call: string
  parameters: ParameterInfo[]
  documentation?: string[]
  complexity: 'simple' | 'medium' | 'complex'
}

export interface ExtrinsicInfo {
  pallets: string[]
  calls: Record<string, CallInfo[]>
  totalCalls: number
}

export class MetadataAnalyzer {
  private metadata: UnifiedMetadata
  private lookup: any
  private dynamicBuilder: any

  constructor(metadataHex: string) {
    // Convert hex string to Uint8Array
    const metadataBytes = new Uint8Array(
      metadataHex.slice(2).match(/.{2}/g)!.map(byte => parseInt(byte, 16))
    )
    // Decode and unify metadata first, then create lookup and builder
    this.metadata = unifyMetadata(decAnyMetadata(metadataBytes))
    this.lookup = getLookupFn(this.metadata)
    this.dynamicBuilder = getDynamicBuilder(this.lookup)
  }

  /**
   * Extract complete extrinsic information from metadata using proper PAPI substrate-bindings
   */
  extractExtrinsicInfo(): ExtrinsicInfo {
    console.log('🔍 Extracting extrinsic information from metadata...')

    const extrinsicInfo: ExtrinsicInfo = {
      pallets: [],
      calls: {},
      totalCalls: 0
    }

    try {
      // Use the properly unified metadata's pallets array
      console.log(`📋 Found ${this.metadata.pallets.length} pallets in unified metadata`)

      this.metadata.pallets.forEach((pallet) => {
        // Only process pallets that have calls
        if (!pallet.calls) {
          console.log(`⏭️ Skipping ${pallet.name} - no calls defined`)
          return
        }

        console.log(`📦 Processing pallet: ${pallet.name}`)

        // Get the call type from the pallet
        const callType = this.lookup(pallet.calls.type)
        if (!callType || callType.type !== 'enum' || !callType.value) {
          console.log(`  ⚠️ Invalid call type for ${pallet.name}`)
          return
        }

        // Extract calls for this pallet
        const calls = this.extractPalletCalls(pallet.name, callType)

        if (calls.length > 0) {
          extrinsicInfo.pallets.push(pallet.name)
          extrinsicInfo.calls[pallet.name] = calls
          extrinsicInfo.totalCalls += calls.length

          console.log(`  ⚡ Found ${calls.length} calls in ${pallet.name}`)
        }
      })

      console.log(`✅ Extraction complete: ${extrinsicInfo.pallets.length} pallets, ${extrinsicInfo.totalCalls} calls`)
      return extrinsicInfo

    } catch (error) {
      console.error('❌ Failed to extract extrinsic info:', error)
      throw error
    }
  }

  /**
   * Extract calls for a specific pallet
   */
  private extractPalletCalls(palletName: string, palletCallType: any): CallInfo[] {
    const calls: CallInfo[] = []

    if (!palletCallType || palletCallType.type !== 'enum' || !palletCallType.value) {
      return calls
    }

    Object.entries(palletCallType.value).forEach(([callName, callData]: [string, any]) => {
      try {
        const callInfo = this.extractSingleCallInfo(palletName, callName, callData)
        calls.push(callInfo)
      } catch (error) {
        console.warn(`⚠️ Failed to extract call ${palletName}.${callName}:`, error)
      }
    })

    return calls
  }

  /**
   * Extract information for a single call
   */
  private extractSingleCallInfo(palletName: string, callName: string, callData: any): CallInfo {
    const parameters: ParameterInfo[] = []

    // Extract parameters from call structure
    if (callData && callData.type === 'struct' && callData.value) {
      Object.entries(callData.value).forEach(([fieldName, fieldData]: [string, any]) => {
        try {
          const parameter = this.extractParameterInfo(fieldName, fieldData)
          parameters.push(parameter)
        } catch (error) {
          console.warn(`⚠️ Failed to extract parameter ${fieldName}:`, error)
        }
      })
    }

    // Determine complexity
    const complexity = this.assessCallComplexity(parameters)

    return {
      pallet: palletName,
      call: callName,
      parameters,
      documentation: callData.docs || [],
      complexity
    }
  }

  /**
   * Create fallback parameter info when metadata extraction fails
   */
  private createFallbackParameterInfo(fieldName: string): ParameterInfo {
    return {
      name: fieldName,
      type: 'unknown',
      codec: null,
      isOptional: false,
      isComplex: false,
      description: `Parameter ${fieldName} (metadata extraction failed)`,
      defaultValue: ''
    }
  }

  /**
   * Extract detailed parameter information
   */
  private extractParameterInfo(fieldName: string, fieldData: any): ParameterInfo {
    // Add null checks to prevent undefined destructuring errors
    if (!fieldData || fieldData.id === undefined) {
      console.warn(`⚠️ Invalid field data for ${fieldName}:`, fieldData)
      return this.createFallbackParameterInfo(fieldName)
    }

    const typeId = fieldData.id
    let typeInfo
    try {
      typeInfo = this.lookup(typeId)
    } catch (error) {
      console.warn(`⚠️ Failed to lookup type ${typeId} for ${fieldName}:`, error)
      return this.createFallbackParameterInfo(fieldName)
    }

    // Build codec for this parameter
    let codec = null
    try {
      codec = this.dynamicBuilder.buildDefinition(typeId)
    } catch (error) {
      console.warn(`Failed to build codec for ${fieldName}:`, error)
    }

    // Get type description with error handling
    let type, isOptional, isComplex, enumVariants, defaultValue
    try {
      type = this.getTypeDescription(typeId, typeInfo)
      isOptional = this.isOptionalType(typeInfo)
      isComplex = this.isComplexType(typeInfo)
      enumVariants = this.extractEnumVariants(typeInfo)
      defaultValue = this.getDefaultValue(typeInfo)
    } catch (error) {
      console.warn(`⚠️ Error processing type info for ${fieldName}:`, error)
      return this.createFallbackParameterInfo(fieldName)
    }

    return {
      name: fieldName,
      type,
      codec,
      isOptional,
      isComplex,
      description: fieldData.docs?.join(' ') || undefined,
      enumVariants,
      defaultValue
    }
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
        if (typeInfo.size) {
          return `Compact<${typeInfo.size}>`
        } else if (typeInfo.value && typeInfo.value.type !== undefined) {
          const innerType = this.lookup(typeInfo.value.type)
          return `Compact<${this.getTypeDescription(typeInfo.value.type, innerType)}>`
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

      case 'tuple':
        if (typeInfo.value && Array.isArray(typeInfo.value)) {
          const tupleTypes = typeInfo.value.map((t: number) => {
            const innerType = this.lookup(t)
            return this.getTypeDescription(t, innerType)
          })
          return `(${tupleTypes.join(', ')})`
        }
        return `Tuple(${typeId})`

      case 'composite':
        if (typeInfo.path && typeInfo.path.length > 0) {
          return typeInfo.path.join('::')
        }
        return `Composite(${typeId})`

      default:
        return `${typeInfo.type}(${typeId})`
    }
  }

  /**
   * Extract enum variants for UI dropdown
   */
  private extractEnumVariants(typeInfo: any): EnumVariant[] | undefined {
    if (!typeInfo || typeInfo.type !== 'enum' || !typeInfo.value) {
      return undefined
    }

    const variants: EnumVariant[] = []

    Object.entries(typeInfo.value).forEach(([variantName, variantData]: [string, any]) => {
      const variant: EnumVariant = {
        name: variantName,
        type: this.isVoidVariant(variantData) ? 'void' : 'data',
        description: variantData.docs?.join(' ') || undefined
      }

      // Add data type information if variant has data
      if (variant.type === 'data') {
        variant.dataType = this.getVariantDataType(variantData)
      }

      variants.push(variant)
    })

    return variants
  }

  /**
   * Check if enum variant is void (no data)
   */
  private isVoidVariant(variantData: any): boolean {
    if (variantData.type === 'void') return true
    if (variantData.type === 'lookupEntry' && variantData.value?.type === 'void') return true
    return false
  }

  /**
   * Get data type for enum variant
   */
  private getVariantDataType(variantData: any): string {
    if (variantData.type === 'lookupEntry' && variantData.value) {
      const innerType = this.lookup(variantData.value.id)
      return this.getTypeDescription(variantData.value.id, innerType)
    }
    return variantData.type || 'unknown'
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
   * Get default value for parameter type
   */
  private getDefaultValue(typeInfo: any): any {
    if (!typeInfo) return undefined

    switch (typeInfo.type) {
      case 'primitive':
        switch (typeInfo.value) {
          case 'bool': return false
          case 'u8':
          case 'u16':
          case 'u32':
          case 'u64':
          case 'u128':
          case 'i8':
          case 'i16':
          case 'i32':
          case 'i64':
          case 'i128':
            return '0'
          case 'str': return ''
          default: return undefined
        }

      case 'compact':
        return '0'

      case 'sequence':
      case 'array':
        return []

      case 'enum':
      case 'variant':
        // Return first variant name
        if (typeInfo.value && typeof typeInfo.value === 'object') {
          const firstVariant = Object.keys(typeInfo.value)[0]
          return firstVariant || undefined
        }
        return undefined

      default:
        return undefined
    }
  }

  /**
   * Assess call complexity for UI purposes
   */
  private assessCallComplexity(parameters: ParameterInfo[]): 'simple' | 'medium' | 'complex' {
    if (parameters.length === 0) return 'simple'
    if (parameters.length <= 2 && parameters.every(p => !p.isComplex)) return 'simple'
    if (parameters.length <= 4 && parameters.filter(p => p.isComplex).length <= 1) return 'medium'
    return 'complex'
  }

  /**
   * Get pallet name from type information
   */
  private getPalletNameFromType(palletCallType: any, palletIndex: number): string | null {
    // Try to get name from path
    if (palletCallType.path && palletCallType.path.length > 0) {
      const pathSegments = palletCallType.path
      // Look for pallet name in path segments
      const palletSegment = pathSegments.find((segment: string) =>
        segment.includes('pallet') || segment.endsWith('Call')
      )
      if (palletSegment) {
        return palletSegment.replace(/pallet_?/i, '').replace(/Call$/, '')
      }
      // Use last segment as fallback
      return pathSegments[pathSegments.length - 1]
    }

    // Fallback to pallet index
    return `Pallet${palletIndex}`
  }

  /**
   * Get specific call information
   */
  getCallInfo(palletName: string, callName: string): CallInfo | null {
    const extrinsicInfo = this.extractExtrinsicInfo()
    const palletCalls = extrinsicInfo.calls[palletName]

    if (!palletCalls) {
      return null
    }

    return palletCalls.find(call => call.call === callName) || null
  }

  /**
   * Get all calls for a pallet
   */
  getPalletCalls(palletName: string): CallInfo[] {
    const extrinsicInfo = this.extractExtrinsicInfo()
    return extrinsicInfo.calls[palletName] || []
  }

  /**
   * Search calls by name pattern
   */
  searchCalls(pattern: string): CallInfo[] {
    const extrinsicInfo = this.extractExtrinsicInfo()
    const results: CallInfo[] = []
    const lowerPattern = pattern.toLowerCase()

    Object.values(extrinsicInfo.calls).forEach(palletCalls => {
      palletCalls.forEach(call => {
        if (call.call.toLowerCase().includes(lowerPattern) ||
            call.pallet.toLowerCase().includes(lowerPattern)) {
          results.push(call)
        }
      })
    })

    return results
  }

  /**
   * Get metadata statistics
   */
  getStats(): { palletCount: number; callCount: number; complexCalls: number } {
    const extrinsicInfo = this.extractExtrinsicInfo()

    let complexCalls = 0
    Object.values(extrinsicInfo.calls).forEach(palletCalls => {
      complexCalls += palletCalls.filter(call => call.complexity === 'complex').length
    })

    return {
      palletCount: extrinsicInfo.pallets.length,
      callCount: extrinsicInfo.totalCalls,
      complexCalls
    }
  }
}