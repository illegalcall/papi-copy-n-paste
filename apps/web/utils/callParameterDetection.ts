
import { MetadataAnalyzer, type CallInfo, type ParameterInfo } from './metadataAnalyzer'
import { metadataService, getChainConfig } from '../services/metadataService'

export interface CallParameterInfo {
  required: ParameterInfo[]
  optional: ParameterInfo[]
  all: ParameterInfo[]
  description?: string
  complexity: 'simple' | 'medium' | 'complex'
}

export class CallParameterDetector {
  private static instance: CallParameterDetector
  private analyzerCache = new Map<string, MetadataAnalyzer>()
  private callInfoCache = new Map<string, CallParameterInfo>()

  private constructor() {}

  static getInstance(): CallParameterDetector {
    if (!CallParameterDetector.instance) {
      CallParameterDetector.instance = new CallParameterDetector()
    }
    return CallParameterDetector.instance
  }

  /**
   * Get rich parameter information for a call
   */
  async getCallParameterInfo(
    chainKey: string,
    pallet: string,
    call: string
  ): Promise<CallParameterInfo> {
    const cacheKey = `${chainKey}:${pallet}:${call}`

    if (this.callInfoCache.has(cacheKey)) {
      return this.callInfoCache.get(cacheKey)!
    }

    try {
      const analyzer = await this.getMetadataAnalyzer(chainKey)

      const callInfo = analyzer.getCallInfo(pallet, call)

      if (!callInfo) {
        throw new Error(`Call ${pallet}.${call} not found`)
      }

      const parameterInfo = this.convertToParameterInfo(callInfo)

      this.callInfoCache.set(cacheKey, parameterInfo)

      return parameterInfo

    } catch (error) {
      console.error(`❌ Failed to get parameter info for ${chainKey}.${pallet}.${call}:`, error)
      throw error
    }
  }

  /**
   * Get all parameters (required + optional) for UI display
   */
  async getAllCallParameters(
    chainKey: string,
    pallet: string,
    call: string
  ): Promise<{ required: ParameterInfo[]; optional: ParameterInfo[] }> {
    const parameterInfo = await this.getCallParameterInfo(chainKey, pallet, call)

    return {
      required: parameterInfo.required,
      optional: parameterInfo.optional
    }
  }

  /**
   * Check if call is valid based on provided parameters
   */
  async isCallValid(
    chainKey: string,
    pallet: string,
    call: string,
    callParams: Record<string, any>
  ): Promise<boolean> {
    try {
      const parameterInfo = await this.getCallParameterInfo(chainKey, pallet, call)

      for (const param of parameterInfo.required) {
        const value = callParams[param.name]
        if (value === undefined || value === null || value === '') {
          return false
        }
      }

      return true

    } catch (error) {
      console.error(`Failed to validate call ${chainKey}.${pallet}.${call}:`, error)
      return false
    }
  }

  /**
   * Get complete call information
   */
  async getCompleteCallInfo(
    chainKey: string,
    pallet: string,
    call: string
  ): Promise<CallInfo> {
    const analyzer = await this.getMetadataAnalyzer(chainKey)
    const callInfo = analyzer.getCallInfo(pallet, call)

    if (!callInfo) {
      throw new Error(`Call ${pallet}.${call} not found`)
    }

    return callInfo
  }

  /**
   * Search calls across all pallets
   */
  async searchCalls(chainKey: string, pattern: string): Promise<CallInfo[]> {
    const analyzer = await this.getMetadataAnalyzer(chainKey)
    return analyzer.searchCalls(pattern)
  }

  /**
   * Get all calls for a specific pallet
   */
  async getPalletCalls(chainKey: string, pallet: string): Promise<CallInfo[]> {
    const analyzer = await this.getMetadataAnalyzer(chainKey)
    return analyzer.getPalletCalls(pallet)
  }

  /**
   * Get metadata analyzer for a chain (with caching)
   */
  private async getMetadataAnalyzer(chainKey: string): Promise<MetadataAnalyzer> {
    if (this.analyzerCache.has(chainKey)) {
      return this.analyzerCache.get(chainKey)!
    }

    const chainConfig = getChainConfig(chainKey)
    if (!chainConfig) {
      throw new Error(`Unsupported chain: ${chainKey}`)
    }

    try {
      const metadata = await metadataService.getMetadata(chainConfig)

      const analyzer = new MetadataAnalyzer(metadata)

      this.analyzerCache.set(chainKey, analyzer)

      this.setupMetadataUpdateListener(chainKey)

      return analyzer

    } catch (error) {
      console.error(`❌ Failed to create metadata analyzer for ${chainKey}:`, error)
      throw new Error(`Failed to analyze metadata for ${chainKey}: ${error instanceof Error ? error.message : error}`)
    }
  }

  /**
   * Convert CallInfo to CallParameterInfo
   */
  private convertToParameterInfo(callInfo: CallInfo): CallParameterInfo {
    const required: ParameterInfo[] = []
    const optional: ParameterInfo[] = []

    callInfo.parameters.forEach(param => {
      if (param.isOptional) {
        optional.push(param)
      } else {
        required.push(param)
      }
    })

    return {
      required,
      optional,
      all: callInfo.parameters,
      description: callInfo.documentation?.join(' '),
      complexity: callInfo.complexity
    }
  }

  /**
   * Setup listener for metadata updates
   */
  private setupMetadataUpdateListener(chainKey: string): void {
    const handleMetadataUpdate = (event: CustomEvent) => {
      if (event.detail.chainKey === chainKey) {
        this.analyzerCache.delete(chainKey)

        for (const [cacheKey] of this.callInfoCache) {
          if (cacheKey.startsWith(`${chainKey}:`)) {
            this.callInfoCache.delete(cacheKey)
          }
        }

      }
    }

    window.removeEventListener('metadataUpdated', handleMetadataUpdate as EventListener)

    window.addEventListener('metadataUpdated', handleMetadataUpdate as EventListener)
  }

  /**
   * Clear all caches
   */
  clearCache(chainKey?: string): void {
    if (chainKey) {
      this.analyzerCache.delete(chainKey)

      for (const [cacheKey] of this.callInfoCache) {
        if (cacheKey.startsWith(`${chainKey}:`)) {
          this.callInfoCache.delete(cacheKey)
        }
      }
    } else {
      this.analyzerCache.clear()
      this.callInfoCache.clear()
    }
  }

  /**
   * Get cache statistics
   */
  getCacheStats(): {
    analyzerCacheSize: number
    callInfoCacheSize: number
    supportedChains: string[]
  } {
    return {
      analyzerCacheSize: this.analyzerCache.size,
      callInfoCacheSize: this.callInfoCache.size,
      supportedChains: Array.from(this.analyzerCache.keys())
    }
  }

  /**
   * Preload metadata for a chain (for performance)
   */
  async preloadChain(chainKey: string): Promise<void> {
    try {
      await this.getMetadataAnalyzer(chainKey)
    } catch (error) {
      console.warn(`⚠️ Failed to preload metadata for ${chainKey}:`, error)
    }
  }
}

export const callParameterDetector = CallParameterDetector.getInstance()


/**
 * Detect call parameters for a given chain, pallet, and call
 */
export async function getCallParameterInfo(
  chainKey: string,
  pallet: string,
  call: string
): Promise<CallParameterInfo> {
  return callParameterDetector.getCallParameterInfo(chainKey, pallet, call)
}

/**
 * Get all parameters (required + optional) for UI display
 */
export async function getAllCallParameters(
  chainKey: string,
  pallet: string,
  call: string
): Promise<{ required: ParameterInfo[]; optional: ParameterInfo[] }> {
  return callParameterDetector.getAllCallParameters(chainKey, pallet, call)
}

/**
 * Check if call is valid based on provided parameters
 */
export async function isCallValid(
  chainKey: string,
  pallet: string,
  call: string,
  callParams: Record<string, any>
): Promise<boolean> {
  return callParameterDetector.isCallValid(chainKey, pallet, call, callParams)
}

