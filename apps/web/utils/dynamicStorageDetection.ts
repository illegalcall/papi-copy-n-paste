/**
 * Dynamic Storage Parameter Detection Engine
 *
 * Replaces hard-coded storage parameter detection with a metadata-driven approach
 * that automatically supports all PAPI chains and storage items.
 *
 * This is Phase 2 of the Dynamic Storage Detection Plan implementation.
 */

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

  /**
   * Detect storage parameters for a given chain, pallet, and storage item
   */
  detectParameters(
    chainKey: string,
    pallet: string,
    storage: string
  ): StorageParameterInfo {
    const cacheKey = `${chainKey}:${pallet}:${storage}`;

    this.totalRequests++;

    // Check cache first
    if (this.cache.has(cacheKey)) {
      this.hitRate++;
      return this.cache.get(cacheKey)!;
    }

    // Primary: Use generated metadata
    const result = this.detectFromMetadata(chainKey, pallet, storage) ||
                  this.detectFromCrossChain(chainKey, pallet, storage) ||
                  this.detectFromPatterns(pallet, storage);

    // Cache the result
    this.cache.set(cacheKey, result);

    return result;
  }

  /**
   * Primary detection: Use generated metadata for the specific chain
   */
  private detectFromMetadata(chainKey: string, pallet: string, storage: string): StorageParameterInfo | null {
    if (!hasStorage(chainKey, pallet, storage)) {
      return null;
    }

    const paramTypes = getStorageParameters(chainKey, pallet, storage);
    const metadata = storageMetadata[chainKey]?.pallets?.[pallet]?.[storage];

    if (metadata) {
      return {
        required: paramTypes,
        optional: [],
        description: metadata.description,
        returnType: metadata.returnType
      };
    }

    return null;
  }

  /**
   * Secondary detection: Cross-chain lookup (try other chains)
   */
  private detectFromCrossChain(chainKey: string, pallet: string, storage: string): StorageParameterInfo | null {
    const supportedChains = getSupportedChains();

    for (const otherChain of supportedChains) {
      if (otherChain === chainKey) continue; // Skip the original chain

      if (hasStorage(otherChain, pallet, storage)) {
        const paramTypes = getStorageParameters(otherChain, pallet, storage);
        const metadata = storageMetadata[otherChain]?.pallets?.[pallet]?.[storage];

        console.warn(`🔄 Using ${otherChain} metadata for ${chainKey}.${pallet}.${storage}`);

        return {
          required: paramTypes,
          optional: [],
          description: `Cross-chain metadata from ${otherChain}: ${metadata?.description || ''}`,
          returnType: metadata?.returnType
        };
      }
    }

    return null;
  }

  /**
   * Tertiary detection: Enhanced pattern matching with semantic analysis
   */
  private detectFromPatterns(pallet: string, storage: string): StorageParameterInfo {
    // Comprehensive patterns from complete Hydration descriptor analysis (275 storage items across 71 pallets)
    // IMPORTANT: Pallet-specific patterns must come FIRST to override generic patterns
    const patterns = [
      // Pallet-specific patterns (FIRST - highest priority)
      ...(pallet === 'AssetRegistry' ? [
        { pattern: /^(Assets|AssetLocations|BannedAssets)$/, params: ["u32"] },
        { pattern: /^(NextAssetId|ExistentialDepositCounter)$/, params: [] },
        { pattern: /^AssetIds$/, params: ["Binary"] },
        { pattern: /^LocationAssets$/, params: ["u32","u32"] }
      ] : []),
      ...(pallet === 'Aura' ? [
        { pattern: /^Authorities$/, params: ["u32","u32"] },
        { pattern: /^CurrentSlot$/, params: [] }
      ] : []),
      ...(pallet === 'AuraExt' ? [
        { pattern: /^(Authorities|SlotInfo)$/, params: ["u32","u32"] }
      ] : []),
      ...(pallet === 'Authorship' ? [
        { pattern: /^Author$/, params: [] }
      ] : []),
      ...(pallet === 'Balances' ? [
        { pattern: /^(TotalIssuance|InactiveIssuance)$/, params: [] },
        { pattern: /^(Account|Locks|Reserves|Holds|Freezes)$/, params: ["SS58String"] }
      ] : []),
      ...(pallet === 'Bonds' ? [
        { pattern: /^BondIds$/, params: ["u32","u32"] },
        { pattern: /^Bonds$/, params: ["u32"] }
      ] : []),
      ...(pallet === 'Broadcast' ? [
        { pattern: /^(IncrementalId|Swapper)$/, params: [] },
        { pattern: /^ExecutionContext$/, params: ["u32","u32"] }
      ] : []),
      ...(pallet === 'CircuitBreaker' ? [
        { pattern: /^(TradeVolumeLimitPerAsset|AllowedTradeVolumeLimitPerAsset|LiquidityAddLimitPerAsset|AllowedAddLiquidityAmountPerAsset|AssetLockdownState|LiquidityRemoveLimitPerAsset|AllowedRemoveLiquidityAmountPerAsset)$/, params: ["u32"] }
      ] : []),
      ...(pallet === 'Claims' ? [
        { pattern: /^Claims$/, params: [] }
      ] : []),
      ...(pallet === 'CollatorRewards' ? [
        { pattern: /^Collators$/, params: ["u32"] }
      ] : []),
      ...(pallet === 'CollatorSelection' ? [
        { pattern: /^(Invulnerables|CandidateList)$/, params: ["u32","u32"] },
        { pattern: /^LastAuthoredBlock$/, params: ["SS58String"] },
        { pattern: /^(DesiredCandidates|CandidacyBond)$/, params: [] }
      ] : []),
      ...(pallet === 'ConvictionVoting' ? [
        { pattern: /^VotingFor$/, params: ["u32","u32"] },
        { pattern: /^ClassLocksFor$/, params: ["SS58String"] }
      ] : []),
      ...(pallet === 'DCA' ? [
        { pattern: /^ScheduleIdSequencer$/, params: [] },
        { pattern: /^(Schedules|RemainingAmounts|RetriesOnError|ScheduleExecutionBlock|ScheduleIdsPerBlock)$/, params: ["u32"] },
        { pattern: /^ScheduleOwnership$/, params: ["u32","u32"] }
      ] : []),
      ...(pallet === 'Democracy' ? [
        { pattern: /^(PublicPropCount|ReferendumCount|LowestUnbaked|LastTabledWasExternal)$/, params: [] },
        { pattern: /^(Blacklist|Cancellations)$/, params: ["Hash"] },
        { pattern: /^(PublicProps|NextExternal|MetadataOf)$/, params: ["u32","u32"] },
        { pattern: /^(DepositOf|ReferendumInfoOf)$/, params: ["u32"] },
        { pattern: /^VotingOf$/, params: ["SS58String"] }
      ] : []),
      ...(pallet === 'Dispatcher' ? [
        { pattern: /^(AaveManagerAccount|ExtraGas)$/, params: [] }
      ] : []),
      ...(pallet === 'Duster' ? [
        { pattern: /^AccountBlacklist$/, params: ["SS58String"] },
        { pattern: /^(RewardAccount|DustAccount)$/, params: [] }
      ] : []),
      ...(pallet === 'DynamicEvmFee' ? [
        { pattern: /^BaseFeePerGas$/, params: ["u32","u32"] }
      ] : []),
      ...(pallet === 'DynamicFees' ? [
        { pattern: /^(AssetFee|AssetFeeConfiguration)$/, params: ["u32"] }
      ] : []),
      ...(pallet === 'EVM' ? [
        { pattern: /^(AccountCodes|AccountCodesMetadata|Suicided)$/, params: [] },
        { pattern: /^AccountStorages$/, params: ["u32","u32"] }
      ] : []),
      ...(pallet === 'EVMAccounts' ? [
        { pattern: /^(AccountExtension|ContractDeployer|ApprovedContract)$/, params: [] }
      ] : []),
      ...(pallet === 'EVMChainId' ? [
        { pattern: /^ChainId$/, params: [] }
      ] : []),
      ...(pallet === 'EmaOracle' ? [
        { pattern: /^(Accumulator|Oracles|WhitelistedAssets)$/, params: ["u32","u32"] }
      ] : []),
      ...(pallet === 'Ethereum' ? [
        { pattern: /^Pending$/, params: ["u32"] },
        { pattern: /^CounterForPending$/, params: [] },
        { pattern: /^(CurrentBlock|CurrentReceipts|CurrentTransactionStatuses|BlockHash)$/, params: ["u32","u32"] }
      ] : []),
      ...(pallet === 'GenesisHistory' ? [
        { pattern: /^PreviousChain$/, params: ["u32","u32"] }
      ] : []),
      ...(pallet === 'HSM' ? [
        { pattern: /^(Collaterals|HollarAmountReceived)$/, params: ["u32"] },
        { pattern: /^FlashMinter$/, params: [] }
      ] : []),
      ...(pallet === 'Identity' ? [
        { pattern: /^(IdentityOf|SuperOf|SubsOf|UsernameAuthorities)$/, params: ["SS58String"] },
        { pattern: /^Registrars$/, params: ["u32","u32"] },
        { pattern: /^(AccountOfUsername|PendingUsernames)$/, params: ["Binary"] }
      ] : []),
      ...(pallet === 'LBP' ? [
        { pattern: /^PoolData$/, params: ["SS58String"] },
        { pattern: /^FeeCollectorWithAsset$/, params: ["u32","u32"] }
      ] : []),
      ...(pallet === 'Liquidation' ? [
        { pattern: /^BorrowingContract$/, params: [] }
      ] : []),
      ...(pallet === 'MessageQueue' ? [
        { pattern: /^(BookStateFor|ServiceHead|Pages)$/, params: ["u32","u32"] }
      ] : []),
      ...(pallet === 'MultiTransactionPayment' ? [
        { pattern: /^(AccountCurrencyMap|TransactionCurrencyOverride)$/, params: ["SS58String"] },
        { pattern: /^(AcceptedCurrencies|AcceptedCurrencyPrice)$/, params: ["u32"] }
      ] : []),
      ...(pallet === 'Multisig' ? [
        { pattern: /^Multisigs$/, params: ["u32","u32"] }
      ] : []),
      ...(pallet === 'OTC' ? [
        { pattern: /^NextOrderId$/, params: [] },
        { pattern: /^Orders$/, params: ["u32"] }
      ] : []),
      ...(pallet === 'Omnipool' ? [
        { pattern: /^(Assets|Positions)$/, params: ["u32"] },
        { pattern: /^(HubAssetTradability|NextPositionId)$/, params: [] }
      ] : []),
      ...(pallet === 'OmnipoolLiquidityMining' ? [
        { pattern: /^OmniPositionId$/, params: ["u32"] }
      ] : []),
      ...(pallet === 'OmnipoolWarehouseLM' ? [
        { pattern: /^(FarmSequencer|DepositSequencer)$/, params: [] },
        { pattern: /^(GlobalFarm|Deposit)$/, params: ["u32"] },
        { pattern: /^(YieldFarm|ActiveYieldFarm)$/, params: ["u32","u32"] }
      ] : []),
      ...(pallet === 'ParachainInfo' ? [
        { pattern: /^ParachainId$/, params: [] }
      ] : []),
      ...(pallet === 'ParachainSystem' ? [
        { pattern: /^(UnincludedSegment|AggregatedUnincludedSegment|ValidationData|UpgradeRestrictionSignal|UpgradeGoAhead|RelayStateProof|RelevantMessagingState|HostConfiguration|LastHrmpMqcHeads|HrmpOutboundMessages|UpwardMessages|PendingUpwardMessages|ReservedXcmpWeightOverride|ReservedDmpWeightOverride)$/, params: ["u32","u32"] },
        { pattern: /^(PendingValidationCode|NewValidationCode|DidSetValidationCode|LastRelayChainBlockNumber|LastDmqMqcHead|ProcessedDownwardMessages|HrmpWatermark|UpwardDeliveryFeeFactor|AnnouncedHrmpMessagesPerCandidate|CustomValidationHeadData)$/, params: [] }
      ] : []),
      ...(pallet === 'Parameters' ? [
        { pattern: /^IsTestnet$/, params: [] }
      ] : []),
      ...(pallet === 'PolkadotXcm' ? [
        { pattern: /^(QueryCounter|AssetTraps|SafeXcmVersion|CurrentMigration|XcmExecutionSuspended|ShouldRecordXcm)$/, params: [] },
        { pattern: /^Queries$/, params: ["u32"] },
        { pattern: /^(SupportedVersion|VersionNotifiers|VersionNotifyTargets|VersionDiscoveryQueue|RemoteLockedFungibles|RecordedXcm)$/, params: ["u32","u32"] },
        { pattern: /^LockedFungibles$/, params: ["SS58String"] }
      ] : []),
      ...(pallet === 'Preimage' ? [
        { pattern: /^(StatusFor|RequestStatusFor)$/, params: ["Hash"] },
        { pattern: /^PreimageFor$/, params: ["u32","u32"] }
      ] : []),
      ...(pallet === 'Proxy' ? [
        { pattern: /^(Proxies|Announcements)$/, params: ["SS58String"] }
      ] : []),
      ...(pallet === 'Referenda' ? [
        { pattern: /^ReferendumCount$/, params: [] },
        { pattern: /^(ReferendumInfoFor|TrackQueue|DecidingCount|MetadataOf)$/, params: ["u32"] }
      ] : []),
      ...(pallet === 'Referrals' ? [
        { pattern: /^ReferralCodes$/, params: ["Binary"] },
        { pattern: /^(ReferralAccounts|LinkedAccounts|ReferrerShares|TraderShares|Referrer)$/, params: ["SS58String"] },
        { pattern: /^(TotalShares|CounterForPendingConversions)$/, params: [] },
        { pattern: /^AssetRewards$/, params: ["u32","u32"] },
        { pattern: /^PendingConversions$/, params: ["u32"] }
      ] : []),
      ...(pallet === 'Router' ? [
        { pattern: /^Routes$/, params: ["u32","u32"] }
      ] : []),
      ...(pallet === 'Scheduler' ? [
        { pattern: /^(IncompleteSince|Lookup)$/, params: [] },
        { pattern: /^Agenda$/, params: ["u32"] },
        { pattern: /^Retries$/, params: ["u32","u32"] }
      ] : []),
      ...(pallet === 'Session' ? [
        { pattern: /^(Validators|QueuedKeys|DisabledValidators|KeyOwner)$/, params: ["u32","u32"] },
        { pattern: /^(CurrentIndex|QueuedChanged)$/, params: [] },
        { pattern: /^NextKeys$/, params: ["SS58String"] }
      ] : []),
      ...(pallet === 'Stableswap' ? [
        { pattern: /^(Pools|PoolPegs|PoolSnapshots)$/, params: ["u32"] },
        { pattern: /^AssetTradability$/, params: ["u32","u32"] }
      ] : []),
      ...(pallet === 'Staking' ? [
        { pattern: /^(Staking|VotesRewarded|ProcessedVotes)$/, params: ["u32","u32"] },
        { pattern: /^(Positions|Votes|PositionVotes)$/, params: ["u32"] },
        { pattern: /^(NextPositionId|SixSecBlocksSince)$/, params: [] }
      ] : []),
      ...(pallet === 'StateTrieMigration' ? [
        { pattern: /^(MigrationProcess|AutoLimits|SignedMigrationMaxLimits)$/, params: ["u32","u32"] }
      ] : []),
      ...(pallet === 'System' ? [
        { pattern: /^Account$/, params: ["SS58String"] },
        { pattern: /^(ExtrinsicCount|InherentsApplied|AllExtrinsicsLen|Number|ParentHash|EventCount|UpgradedToU32RefCount|UpgradedToTripleRefCount|ExecutionPhase)$/, params: [] },
        { pattern: /^EventTopics$/, params: ["Hash"] },
        { pattern: /^(BlockWeight|Digest|Events|LastRuntimeUpgrade|AuthorizedUpgrade)$/, params: ["u32","u32"] },
        { pattern: /^(BlockHash|ExtrinsicData)$/, params: ["u32"] }
      ] : []),
      ...(pallet === 'TechnicalCommittee' ? [
        { pattern: /^(Proposals|Members)$/, params: ["u32","u32"] },
        { pattern: /^(ProposalOf|Voting)$/, params: ["Hash"] },
        { pattern: /^(ProposalCount|Prime)$/, params: [] }
      ] : []),
      ...(pallet === 'Timestamp' ? [
        { pattern: /^(Now|DidUpdate)$/, params: [] }
      ] : []),
      ...(pallet === 'Tokens' ? [
        { pattern: /^TotalIssuance$/, params: ["u32"] },
        { pattern: /^(Locks|Accounts|Reserves)$/, params: ["u32","u32"] }
      ] : []),
      ...(pallet === 'TransactionPause' ? [
        { pattern: /^PausedTransactions$/, params: ["u32","u32"] }
      ] : []),
      ...(pallet === 'TransactionPayment' ? [
        { pattern: /^(NextFeeMultiplier|StorageVersion)$/, params: [] }
      ] : []),
      ...(pallet === 'Treasury' ? [
        { pattern: /^(ProposalCount|Deactivated|SpendCount)$/, params: [] },
        { pattern: /^(Proposals|Spends)$/, params: ["u32"] },
        { pattern: /^Approvals$/, params: ["u32","u32"] }
      ] : []),
      ...(pallet === 'Uniques' ? [
        { pattern: /^(Class|ClassMetadataOf|CollectionMaxSupply)$/, params: ["u32"] },
        { pattern: /^OwnershipAcceptance$/, params: ["SS58String"] },
        { pattern: /^(Account|ClassAccount|Asset|InstanceMetadataOf|Attribute|ItemPriceOf)$/, params: ["u32","u32"] }
      ] : []),
      ...(pallet === 'UnknownTokens' ? [
        { pattern: /^(ConcreteFungibleBalances|AbstractFungibleBalances)$/, params: ["u32","u32"] }
      ] : []),
      ...(pallet === 'Vesting' ? [
        { pattern: /^VestingSchedules$/, params: ["SS58String"] }
      ] : []),
      ...(pallet === 'Whitelist' ? [
        { pattern: /^WhitelistedCall$/, params: ["Hash"] }
      ] : []),
      ...(pallet === 'XYK' ? [
        { pattern: /^(ShareToken|TotalLiquidity|PoolAssets)$/, params: ["SS58String"] }
      ] : []),
      ...(pallet === 'XYKWarehouseLM' ? [
        { pattern: /^(FarmSequencer|DepositSequencer)$/, params: [] },
        { pattern: /^(GlobalFarm|Deposit)$/, params: ["u32"] },
        { pattern: /^(YieldFarm|ActiveYieldFarm)$/, params: ["u32","u32"] }
      ] : []),
      ...(pallet === 'XcmpQueue' ? [
        { pattern: /^(InboundXcmpSuspended|OutboundXcmpStatus|OutboundXcmpMessages|QueueConfig)$/, params: ["u32","u32"] },
        { pattern: /^(SignalMessages|DeliveryFeeFactor)$/, params: ["u32"] },
        { pattern: /^QueueSuspended$/, params: [] }
      ] : []),

      // Generic patterns (LOWER PRIORITY - only used if no pallet-specific match)
      // No parameters (common global state)
      { pattern: /^(Total|Current|Next|Last|Min|Max)/, params: [] },
      { pattern: /^(Issuance|Supply|Index|Number|Now|Deposit)$/, params: [] },
      { pattern: /Count$/, params: [] }, // Anything ending with Count (BountyCount, EventCount, etc.)
      { pattern: /^(InactiveIssuance|TotalIssuance|ExtrinsicCount|EventCount|BountyCount)$/, params: [] },

      // Account-based (single AccountId parameter)
      { pattern: /^(Account|Balance|Lock|Reserve|Hold|Freeze)s?$/, params: ["AccountId"] },
      { pattern: /(Of|For)Account$/, params: ["AccountId"] },
      { pattern: /^(Bonded|Payee|Validators|Nominators|Ledger)$/, params: ["AccountId"] },

      // ID-based (requires numeric/hash ID)
      { pattern: /^(Proposal|Referendum|Era|Session|Block)/, params: ["u32"] },
      { pattern: /(Of|For)(Proposal|Referendum|Era|Session|Block)/, params: ["u32"] },
      { pattern: /^(Agenda|Lookup|Reports|Disputes)$/, params: ["u32"] },

      // Complex mappings (multiple parameters)
      { pattern: /^(Era.*Staker|Session.*Validator)/, params: ["u32", "AccountId"] },
      { pattern: /^Asset(Account|Approval)/, params: ["AssetId", "AccountId"] },
      { pattern: /^(Claimed|Slashing|Validator.*Era|Nominator.*Era)/, params: ["u32", "AccountId"] },

      // Hash-based storage
      { pattern: /^(BlockHash|ParentHash|CodeHash)$/, params: ["Hash"] },
      { pattern: /^(Preimage|Code)For$/, params: ["Hash"] },

      // Multi-key mappings
      { pattern: /^(Keys|QueuedKeys|NextKeys)$/, params: ["AccountId"] },
      { pattern: /^(Proxies|Announcements|Multisigs)$/, params: ["AccountId"] }
    ];

    // Try each pattern
    for (const { pattern, params } of patterns) {
      if (pattern.test(storage)) {
        return {
          required: params,
          optional: [],
          description: `Pattern-matched: ${pattern.source} → [${params.join(', ')}]`,
          returnType: 'Codec'
        };
      }
    }

    // Default: assume no parameters for safety
    console.warn(`⚠️  No pattern match for ${pallet}.${storage}, defaulting to no parameters`);
    return {
      required: [],
      optional: [],
      description: 'Default: no parameters (pattern fallback)',
      returnType: 'Codec'
    };
  }

  /**
   * Get cache performance statistics
   */
  getCacheStats() {
    return {
      hitRate: this.totalRequests > 0 ? (this.hitRate / this.totalRequests) * 100 : 0,
      cacheSize: this.cache.size,
      totalRequests: this.totalRequests
    };
  }

  /**
   * Get supported chains
   */
  getSupportedChains(): string[] {
    return getSupportedChains();
  }

  /**
   * Get supported pallets for a chain
   */
  getSupportedPallets(chainKey: string): string[] {
    return getSupportedPallets(chainKey);
  }

  /**
   * Get supported storage items for a pallet
   */
  getSupportedStorage(chainKey: string, pallet: string): string[] {
    return getSupportedStorage(chainKey, pallet);
  }

  /**
   * Check if a storage item exists
   */
  hasStorage(chainKey: string, pallet: string, storage: string): boolean {
    return hasStorage(chainKey, pallet, storage);
  }

  /**
   * Clear the cache (useful for testing)
   */
  clearCache(): void {
    this.cache.clear();
    this.hitRate = 0;
    this.totalRequests = 0;
  }
}

// Create a singleton instance for use across the application
export const dynamicStorageDetector = new DynamicStorageDetector();

/**
 * Legacy compatibility function - replaces the old detectStorageParameters
 */
export function detectStorageParameters(
  pallet: string,
  storage: string,
  chainKey: string = 'polkadot'
): string[] {
  const info = dynamicStorageDetector.detectParameters(chainKey, pallet, storage);
  return info.required;
}

/**
 * Enhanced function with full parameter information
 */
export function getStorageParameterInfo(
  chainKey: string,
  pallet: string,
  storage: string
): StorageParameterInfo {
  return dynamicStorageDetector.detectParameters(chainKey, pallet, storage);
}

/**
 * Validation function for storage parameters
 */
export function validateStorageParameters(
  chainKey: string,
  pallet: string,
  storage: string,
  providedParams: any[]
): { valid: boolean; error?: string; expected: string[] } {
  const info = dynamicStorageDetector.detectParameters(chainKey, pallet, storage);

  if (providedParams.length !== info.required.length) {
    return {
      valid: false,
      error: `Expected ${info.required.length} parameters, got ${providedParams.length}`,
      expected: info.required
    };
  }

  return {
    valid: true,
    expected: info.required
  };
}

/**
 * Generate smart defaults for storage parameters
 */
export function generateParameterDefaults(paramTypes: string[]): Record<string, any> {
  return paramTypes.reduce((defaults, type, index) => {
    const key = `param${index + 1}`;
    switch(type) {
      case 'AccountId':
      case 'SS58String':
        defaults[key] = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY'; // Alice
        break;
      case 'u32':
      case 'u64':
        defaults[key] = '0';
        break;
      case 'u128':
      case 'Balance':
        defaults[key] = '1000000000000'; // 1 DOT in plancks
        break;
      case 'Hash':
        defaults[key] = '0x0000000000000000000000000000000000000000000000000000000000000000';
        break;
      case 'bool':
        defaults[key] = false;
        break;
      default:
        defaults[key] = '';
    }
    return defaults;
  }, {} as Record<string, any>);
}

/**
 * Debug function to show detection process
 */
export function debugStorageDetection(
  chainKey: string,
  pallet: string,
  storage: string
): {
  fromMetadata: StorageParameterInfo | null;
  fromCrossChain: StorageParameterInfo | null;
  fromPatterns: StorageParameterInfo;
  final: StorageParameterInfo;
} {
  const detector = new DynamicStorageDetector();

  const fromMetadata = detector['detectFromMetadata'](chainKey, pallet, storage);
  const fromCrossChain = !fromMetadata ? detector['detectFromCrossChain'](chainKey, pallet, storage) : null;
  const fromPatterns = detector['detectFromPatterns'](pallet, storage);
  const final = detector.detectParameters(chainKey, pallet, storage);

  return {
    fromMetadata,
    fromCrossChain,
    fromPatterns,
    final
  };
}