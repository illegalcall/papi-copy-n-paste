
import { storageMetadata, getStorageParameters, hasStorage, getSupportedChains, getSupportedPallets, getSupportedStorage } from '../../../packages/core/generated/storage-metadata';


export interface StorageParameterInfo {
  required: string[];
  optional: string[];
  description?: string;
  returnType?: string;
}

export class DynamicStorageDetector {
  private cache = new Map<string, StorageParameterInfo>();
  private hitRate = 0;
  private totalRequests = 0;

  detectParameters(
    chainKey: string,
    pallet: string,
    storage: string
  ): StorageParameterInfo {
    const cacheKey = `${chainKey}:${pallet}:${storage}`;
    this.totalRequests++;


    if (this.cache.has(cacheKey)) {
      this.hitRate++;
      const result = this.cache.get(cacheKey)!;


      return result;
    }


    const metadataResult = this.detectFromMetadata(chainKey, pallet, storage);
    if (metadataResult) {

      this.cache.set(cacheKey, metadataResult);
      return metadataResult;
    }

    const liveResult = this.detectFromLiveMetadata(chainKey, pallet, storage);
    if (liveResult) {

      this.cache.set(cacheKey, liveResult);
      return liveResult;
    }
    throw new Error(`No metadata available for ${chainKey}.${pallet}.${storage} - metadata may be incomplete or missing`);
  }


  private detectFromLiveMetadata(chainKey: string, pallet: string, storage: string): StorageParameterInfo | null {
    try {
      if (typeof window !== 'undefined' && (window as any).__PAPI_LIVE_METADATA__) {
        const liveMetadata = (window as any).__PAPI_LIVE_METADATA__[chainKey];

        if (liveMetadata?.pallets) {
          const palletData = liveMetadata.pallets.find((p: any) => p.name === pallet);

          if (palletData?.storage) {
            const storageItem = palletData.storage.find((s: any) => s.name === storage);

            if (storageItem) {
              const parameters = this.inferParametersFromStorageType(storageItem.type);

              return {
                required: parameters.required,
                optional: parameters.optional,
                description: `Live metadata for ${chainKey}.${pallet}.${storage}`,
                returnType: storageItem.type || 'unknown'
              };
            }
          }
        }
      }

      return null;
    } catch (error) {
      return null;
    }
  }

  private inferParametersFromStorageType(storageType: string): { required: string[], optional: string[] } {
    if (storageType.includes('Map<')) {
      const match = storageType.match(/Map<([^,]+),/);
      if (match && match[1]) {
        return { required: [match[1].trim()], optional: [] };
      }
    }

    if (storageType.includes('DoubleMap<')) {
      const match = storageType.match(/DoubleMap<([^,]+),\s*([^,]+),/);
      if (match && match[1] && match[2]) {
        return { required: [match[1].trim(), match[2].trim()], optional: [] };
      }
    }

    return { required: [], optional: [] };
  }

  private detectFromMetadata(chainKey: string, pallet: string, storage: string): StorageParameterInfo | null {
    try {
      const knownFix = this.getKnownStorageFix(chainKey, pallet, storage);
      if (knownFix) {
        return knownFix;
      }

      if (!hasStorage(chainKey, pallet, storage)) {
        return null;
      }

      const paramTypes = getStorageParameters(chainKey, pallet, storage);
      const metadata = storageMetadata[chainKey]?.pallets?.[pallet]?.[storage];

      if (paramTypes && paramTypes.length >= 0) {
        return {
          required: paramTypes,
          optional: [],
          description: metadata?.description || `Generated metadata for ${chainKey}.${pallet}.${storage}`,
          returnType: metadata?.returnType || 'Codec'
        };
      }
    } catch (error) {
    }

    return null;
  }

  private getKnownStorageFix(chainKey: string, pallet: string, storage: string): StorageParameterInfo | null {
    const key = `${chainKey}:${pallet}:${storage}`;

    const knownFixes: Record<string, StorageParameterInfo> = {
      'polkadot:Staking:ErasStakers': {
        required: [],
        optional: ['u32', 'AccountId'],
        description: 'Exposure of validator at era - query with era+account for specific or without for all entries',
        returnType: 'Exposure'
      },
      'polkadot:Staking:ErasStakersClipped': {
        required: [],
        optional: ['u32', 'AccountId'],
        description: 'Clipped exposure of validator at era - query with era+account for specific or without for all entries',
        returnType: 'Exposure'
      },
      'polkadot:Staking:ErasStakersOverview': {
        required: [],
        optional: ['u32', 'AccountId'],
        description: 'Overview of validator exposure at era - query with era+account for specific or without for all entries',
        returnType: 'PagedExposureMetadata'
      },
      'polkadot:Staking:ErasStakersPaged': {
        required: [],
        optional: ['u32', 'AccountId', 'u32'],
        description: 'Paged exposure of validator at era - query with era+account+page for specific or without for all entries',
        returnType: 'ExposurePage'
      },
      'polkadot:Staking:ErasValidatorReward': {
        required: [],
        optional: ['u32'],
        description: 'Validator reward points for era - query with era for specific or without for all entries',
        returnType: 'Balance'
      },
      'polkadot:Staking:ErasRewardPoints': {
        required: [],
        optional: ['u32'],
        description: 'Reward points for era - query with era for specific or without for all entries',
        returnType: 'EraRewardPoints'
      },
      'polkadot:Staking:ErasValidatorPrefs': {
        required: [],
        optional: ['u32', 'AccountId'],
        description: 'Validator preferences for era - query with era+account for specific or without for all entries',
        returnType: 'ValidatorPrefs'
      },

      'kusama:Staking:ErasStakers': {
        required: [],
        optional: ['u32', 'AccountId'],
        description: 'Exposure of validator at era - query with era+account for specific or without for all entries',
        returnType: 'Exposure'
      },
      'kusama:Staking:ErasStakersClipped': {
        required: [],
        optional: ['u32', 'AccountId'],
        description: 'Clipped exposure of validator at era - query with era+account for specific or without for all entries',
        returnType: 'Exposure'
      },

      'polkadot:Democracy:VotingOf': {
        required: [],
        optional: ['AccountId'],
        description: 'Voting records for account - query with account ID for specific or without for all entries',
        returnType: 'Voting'
      },
      'polkadot:Democracy:ReferendumInfoOf': {
        required: [],
        optional: ['u32'],
        description: 'Information about referendum - query with referendum index for specific or without for all entries',
        returnType: 'Option<ReferendumInfo>'
      },

      'polkadot:ConvictionVoting:VotingFor': {
        required: [],
        optional: ['AccountId', 'u16'],
        description: 'Voting records for account and class - query with account+class for specific or without for all entries',
        returnType: 'Voting'
      },
      'polkadot:ConvictionVoting:ClassLocksFor': {
        required: [],
        optional: ['AccountId'],
        description: 'Class locks for account - query with account ID for specific or without for all entries',
        returnType: 'Vec<(u16, Balance)>'
      },

      'polkadot:Balances:Account': {
        required: [],
        optional: ['AccountId'],
        description: 'Account balance information - query with account ID for specific or without for all entries',
        returnType: 'AccountData'
      },
      'polkadot:Balances:Locks': {
        required: [],
        optional: ['AccountId'],
        description: 'Balance locks for account - query with account ID for specific or without for all entries',
        returnType: 'Vec<BalanceLock>'
      },
      'polkadot:Balances:Reserves': {
        required: [],
        optional: ['AccountId'],
        description: 'Reserved balances for account - query with account ID for specific or without for all entries',
        returnType: 'Vec<ReserveData>'
      },

      'paseo_asset_hub:Claims:Claims': {
        required: ['bytes'],
        optional: [],
        description: 'Claims storage for Paseo Asset Hub - query with ethereum signature/address',
        returnType: 'bigint'
      },
      'polkadot:Claims:Claims': {
        required: ['bytes'],
        optional: [],
        description: 'Claims storage for Polkadot - query with ethereum signature/address',
        returnType: 'bigint'
      },
      'kusama:Claims:Claims': {
        required: ['bytes'],
        optional: [],
        description: 'Claims storage for Kusama - query with ethereum signature/address',
        returnType: 'bigint'
      }
    };

    return knownFixes[key] || null;
  }


  getCacheStats() {
    return {
      hitRate: this.totalRequests > 0 ? (this.hitRate / this.totalRequests) * 100 : 0,
      cacheSize: this.cache.size,
      totalRequests: this.totalRequests
    };
  }

  getSupportedChains(): string[] {
    return getSupportedChains();
  }

  getSupportedPallets(chainKey: string): string[] {
    return getSupportedPallets(chainKey);
  }

  getSupportedStorage(chainKey: string, pallet: string): string[] {
    return getSupportedStorage(chainKey, pallet);
  }

  hasStorage(chainKey: string, pallet: string, storage: string): boolean {
    return hasStorage(chainKey, pallet, storage);
  }

  clearCache(): void {
    this.cache.clear();
    this.hitRate = 0;
    this.totalRequests = 0;
  }
}

export const dynamicStorageDetector = new DynamicStorageDetector();

let clientInitialized = false;

function initializeClientSide() {
  if (clientInitialized || typeof window === 'undefined') return;
  clientInitialized = true;

  dynamicStorageDetector.clearCache();

}


export function getStorageParameterInfo(
  chainKey: string,
  pallet: string,
  storage: string
): StorageParameterInfo {
  initializeClientSide();

  return dynamicStorageDetector.detectParameters(chainKey, pallet, storage);
}


