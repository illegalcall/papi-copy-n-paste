export interface PalletCall {
  name: string;
  args: { name: string; type: string }[];
  docs: string[];
}

export interface PalletStorage {
  name: string;
  type: string;
  docs: string[];
}

export interface PalletEvent {
  name: string;
  args: { name: string; type: string }[];
  docs: string[];
}

export interface PalletConstant {
  name: string;
  type: string;
  value: any;
  docs: string[];
}

export interface PalletError {
  name: string;
  type: string;
  docs: string[];
}

export interface RuntimeCall {
  name: string;
  args: { name: string; type: string }[];
  returnType: string;
  docs: string[];
}

// Import comprehensive metadata for enhanced parsing
import { papiMetadata } from "./generated/papi-metadata";


/**
 * Get events from comprehensive generated metadata
 */
function getEventsFromComprehensiveMetadata(
  chainKey: string,
  palletName: string,
): PalletEvent[] {

  try {
    const chainMetadata = papiMetadata[chainKey];
    if (!chainMetadata?.events) {
      return [];
    }

    const palletEvents = chainMetadata.events[palletName];
    if (!palletEvents) {
      return [];
    }

    const events: PalletEvent[] = [];
    for (const [eventName, eventMetadata] of Object.entries(palletEvents)) {
      events.push({
        name: eventName,
        args: eventMetadata.fields?.map(field => ({
          name: field.name,
          type: field.type,
        })) || [],
        docs: eventMetadata.description ? [eventMetadata.description] : [],
      });
    }


    return events;
  } catch (error) {
    return [];
  }
}

/**
 * Get errors from comprehensive generated metadata
 */
function getErrorsFromComprehensiveMetadata(
  chainKey: string,
  palletName: string,
): PalletError[] {

  try {
    const chainMetadata = papiMetadata[chainKey];
    if (!chainMetadata?.errors) {
      return [];
    }

    const palletErrors = chainMetadata.errors[palletName];
    if (!palletErrors) {
      return [];
    }

    const errors: PalletError[] = [];
    for (const [errorName, errorMetadata] of Object.entries(palletErrors)) {
      errors.push({
        name: errorName,
        type: errorMetadata.type || "unknown",
        docs: errorMetadata.description ? [errorMetadata.description] : [],
      });
    }


    return errors;
  } catch (error) {
    return [];
  }
}

export interface RuntimeApi {
  name: string;
  methods: RuntimeCall[];
}

export interface PalletInfo {
  name: string;
  calls: PalletCall[];
  storage: PalletStorage[];
  events: PalletEvent[];
  constants: PalletConstant[];
  errors?: PalletError[];
}

export interface ChainMetadataExtended extends ChainMetadata {
  runtimeApis: RuntimeApi[];
}

export interface ChainMetadata {
  pallets: PalletInfo[];
  chainHash: string;
  specVersion: number;
}

const METADATA_CACHE_KEY = "papi-metadata-cache";
const METADATA_CACHE_VERSION = "3.2.0"; // Increment when cache format changes - FORCE CACHE REFRESH FOR CHAIN-SPECIFIC PALLETS
const DEFAULT_CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours
const MAX_CACHE_SIZE = 10; // Maximum number of chains to cache

// Enhanced retry utility with better timeout handling
async function fetchWithRetry<T>(
  fn: () => Promise<T>,
  maxRetries: number,
  timeoutMs: number,
): Promise<T> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(
        `Attempt ${attempt}/${maxRetries} to fetch metadata (${timeoutMs}ms timeout)...`,
      );

      // Create abort controller for better cleanup
      const abortController = new AbortController();
      let timeoutHandle: ReturnType<typeof setTimeout> | undefined;

      // Create a timeout promise with cleanup
      const timeoutPromise = new Promise<never>((_, reject) => {
        timeoutHandle = setTimeout(() => {
          console.warn(
            `⏰ Metadata fetch timeout after ${timeoutMs}ms on attempt ${attempt}`,
          );
          abortController.abort();
          reject(new Error(`Timeout after ${timeoutMs}ms`));
        }, timeoutMs);
      });

      try {
        // Race between the actual request and timeout
        const result = await Promise.race([fn(), timeoutPromise]);
        if (timeoutHandle) clearTimeout(timeoutHandle);
        return result;
      } catch (raceError) {
        if (timeoutHandle) clearTimeout(timeoutHandle);
        throw raceError;
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Unknown error";

      if (attempt === maxRetries) {
        throw error;
      }

      // Wait before retry (exponential backoff with jitter)
      const baseDelay = Math.min(1000 * Math.pow(2, attempt - 1), 5000);
      const jitter = Math.random() * 1000; // Add some randomness
      const delay = Math.floor(baseDelay + jitter);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw new Error("All retry attempts failed");
}

interface CachedMetadata {
  version: string;
  chains: {
    [chainKey: string]: {
      metadata: ChainMetadata;
      timestamp: number;
      specVersion: number;
      rawMetadataHash?: string; // Hash of raw metadata for validation
      ttl: number; // Time to live in milliseconds
    };
  };
}

export async function fetchMetadata(
  chainKey: string,
  client: any,
): Promise<ChainMetadata | null> {
  try {

    if (!client) {
      console.warn("No client available for metadata fetch");
      return null;
    }

    // Check if this is our mock client
    if (client.mockClient) {
      console.log("Mock client detected, checking if mock metadata is enabled");
      return getMockMetadataIfEnabled(chainKey);
    }

    // Enhanced client readiness check
    if (!client._request) {
      console.warn(
        "Client is not ready for metadata fetch (missing _request method)",
      );
      return null;
    }

    // Check cache first for faster loading
    const cached = getCachedMetadata(chainKey);
    if (cached) {
      console.log(`Using cached metadata for ${chainKey}`);
      return cached;
    }


    // Use PAPI client's _request method to get raw metadata via JSON-RPC with enhanced retry logic
    let rawMetadata: any;

    // For faster initial loading, use shorter timeouts and quicker fallback
    const isPolkadotInitial = chainKey === "polkadot";
    const quickTimeout = isPolkadotInitial ? 5000 : 8000; // 5s for Polkadot, 8s for others

    try {
      console.log(
        `🔄 Fetching raw metadata via state_getMetadata (${quickTimeout}ms timeout)...`,
      );

      // Single attempt with quick timeout for better UX
      rawMetadata = await fetchWithRetry(
        () => {
          return client._request("state_getMetadata", []);
        },
        1, // Single attempt
        quickTimeout,
      );
    } catch (error) {
      console.warn(
        `⚠️ Metadata fetch failed for ${chainKey}:`,
        error instanceof Error ? error.message : "Unknown error",
      );

      // For Polkadot, provide specific guidance about the known issue
      if (isPolkadotInitial) {
        console.log(
          "📝 Polkadot initial connection issue detected - this is a known limitation",
        );
        // Don't retry for Polkadot - fall back immediately
      }

      return getMockMetadataIfEnabled(chainKey);
    }

    if (!rawMetadata) {
      console.warn("No raw metadata returned");
      return getMockMetadataIfEnabled(chainKey);
    }

    // Ensure rawMetadata is a string
    const rawMetadataString =
      typeof rawMetadata === "string"
        ? rawMetadata
        : JSON.stringify(rawMetadata);

    // Parse the raw metadata
    const chainMetadata = await parseRawMetadata(rawMetadataString, chainKey);

    // Generate hash for cache validation
    const rawMetadataHash = simpleHash(rawMetadataString);

    // Cache the result with hash for validation
    setCachedMetadata(chainKey, chainMetadata, rawMetadataHash);

    console.log(
      `✅ Successfully fetched and cached metadata for ${chainKey} with ${chainMetadata.pallets.length} pallets`,
    );
    return chainMetadata;
  } catch (error) {
    console.error(`❌ Error fetching metadata for ${chainKey}:`, error);
    // Check if mock metadata is enabled before returning it
    console.log(`🆘 Checking if mock metadata is enabled for ${chainKey}`);
    return getMockMetadataIfEnabled(chainKey);
  }
}

// Helper function to check if mock metadata is enabled via environment variable
function isMockMetadataEnabled(): boolean {
  // Check environment variable (Next.js public env var)
  if (typeof process !== "undefined" && process.env) {
    const envValue = process.env.NEXT_PUBLIC_ENABLE_MOCK_METADATA;
    if (envValue !== undefined) {
      return envValue.toLowerCase() === "true";
    }
  }

  // Check browser environment (in case env var is set via runtime)
  if (typeof window !== "undefined" && (window as any).ENV) {
    const envValue = (window as any).ENV.NEXT_PUBLIC_ENABLE_MOCK_METADATA;
    if (envValue !== undefined) {
      return envValue.toLowerCase() === "true";
    }
  }

  // Default to false (mock metadata disabled by default)
  return false;
}

// Helper function to return mock metadata only if enabled
function getMockMetadataIfEnabled(chainKey: string): ChainMetadata | null {
  if (isMockMetadataEnabled()) {
    console.log(
      `✅ Mock metadata is enabled, creating enhanced mock for ${chainKey}`,
    );
    return createEnhancedMockMetadata(chainKey);
  } else {
    console.log(
      `❌ Mock metadata is disabled via feature flag for ${chainKey}`,
    );
    return null;
  }
}

// Helper function to create empty metadata when mock is disabled
function createEmptyMetadata(chainKey: string): ChainMetadata {
  console.log(
    `📭 Creating empty metadata for ${chainKey} (mock metadata disabled)`,
  );
  return {
    pallets: [],
    chainHash: getChainHash(chainKey),
    specVersion: getChainSpecVersion(chainKey),
  };
}

function createEnhancedMockMetadata(chainKey: string): ChainMetadata {
  console.log("Creating enhanced mock metadata for:", chainKey);

  // Chain-specific enhanced metadata
  const chainSpecificPallets = getChainSpecificPallets(chainKey);

  return {
    pallets: chainSpecificPallets,
    chainHash: getChainHash(chainKey),
    specVersion: getChainSpecVersion(chainKey),
  };
}

function getChainSpecificPallets(chainKey: string): PalletInfo[] {
  const basePallets = getBasePallets();

  switch (chainKey) {
    case "acala":
      return [
        ...basePallets,
        {
          name: "Tokens",
          calls: [
            {
              name: "transfer",
              args: [
                { name: "dest", type: "MultiAddress" },
                { name: "currency_id", type: "CurrencyId" },
                { name: "amount", type: "Compact<u128>" },
              ],
              docs: ["Transfer tokens to another account."],
            },
          ],
          storage: [
            {
              name: "Accounts",
              type: "TokenAccountData",
              docs: ["Token account information."],
            },
          ],
          events: [
            {
              name: "Transfer",
              args: [
                { name: "currency_id", type: "CurrencyId" },
                { name: "from", type: "AccountId" },
                { name: "to", type: "AccountId" },
                { name: "amount", type: "u128" },
              ],
              docs: ["Token transfer occurred."],
            },
          ],
          constants: [
            {
              name: "GetNativeCurrencyId",
              type: "CurrencyId",
              value: "0",
              docs: ["Native currency identifier."],
            },
          ],
        },
        {
          name: "DEX",
          calls: [
            {
              name: "swap_with_exact_supply",
              args: [
                { name: "path", type: "Vec<CurrencyId>" },
                { name: "supply_amount", type: "Compact<u128>" },
                { name: "min_target_amount", type: "Compact<u128>" },
              ],
              docs: ["Swap tokens with exact supply amount."],
            },
          ],
          storage: [
            {
              name: "LiquidityPool",
              type: "PoolInfo",
              docs: ["Liquidity pool information."],
            },
          ],
          events: [
            {
              name: "Swap",
              args: [
                { name: "trader", type: "AccountId" },
                { name: "path", type: "Vec<CurrencyId>" },
                { name: "supply_amount", type: "u128" },
                { name: "target_amount", type: "u128" },
              ],
              docs: ["Token swap occurred."],
            },
          ],
          constants: [],
        },
      ];

    case "astar":
      return [
        ...basePallets,
        {
          name: "DappsStaking",
          calls: [
            {
              name: "bond_and_stake",
              args: [
                { name: "contract_id", type: "SmartContract" },
                { name: "value", type: "Compact<u128>" },
              ],
              docs: ["Bond and stake on a dApp."],
            },
          ],
          storage: [
            {
              name: "Ledger",
              type: "AccountLedger",
              docs: ["Staking ledger information."],
            },
          ],
          events: [
            {
              name: "BondAndStake",
              args: [
                { name: "account", type: "AccountId" },
                { name: "smart_contract", type: "SmartContract" },
                { name: "amount", type: "u128" },
              ],
              docs: ["Bond and stake event."],
            },
          ],
          constants: [],
        },
      ];

    case "moonbeam":
      return [
        ...basePallets,
        {
          name: "EthereumXcm",
          calls: [
            {
              name: "transact",
              args: [{ name: "xcm_transaction", type: "XcmTransaction" }],
              docs: ["Execute Ethereum transaction via XCM."],
            },
          ],
          storage: [
            {
              name: "Nonce",
              type: "u256",
              docs: ["Ethereum transaction nonce."],
            },
          ],
          events: [
            {
              name: "TransactedViaXcm",
              args: [
                { name: "account", type: "AccountId" },
                { name: "transaction", type: "XcmTransaction" },
              ],
              docs: ["Ethereum transaction executed via XCM."],
            },
          ],
          constants: [],
        },
      ];

    default:
      return basePallets;
  }
}

function getBasePallets(): PalletInfo[] {
  return [
    {
      name: "System",
      calls: [
        {
          name: "remark",
          args: [{ name: "remark", type: "Bytes" }],
          docs: ["Make some on-chain remark."],
        },
        {
          name: "remark_with_event",
          args: [{ name: "remark", type: "Bytes" }],
          docs: ["Make some on-chain remark and emit event."],
        },
      ],
      storage: [
        {
          name: "Account",
          type: "AccountInfo",
          docs: ["The full account information for a particular account ID."],
        },
        {
          name: "BlockHash",
          type: "Hash",
          docs: ["Map of block numbers to block hashes."],
        },
        {
          name: "Number",
          type: "BlockNumber",
          docs: ["The current block number being processed."],
        },
      ],
      events: [
        {
          name: "ExtrinsicSuccess",
          args: [{ name: "dispatch_info", type: "DispatchInfo" }],
          docs: ["An extrinsic completed successfully."],
        },
        {
          name: "Remarked",
          args: [
            { name: "sender", type: "AccountId32" },
            { name: "hash", type: "Hash" },
          ],
          docs: ["On-chain remark happened."],
        },
      ],
      constants: [
        {
          name: "BlockHashCount",
          type: "u32",
          value: "4096",
          docs: ["Maximum number of block hashes to keep in storage."],
        },
        {
          name: "DbWeight",
          type: "RuntimeDbWeight",
          value: '{"read": 25000000, "write": 100000000}',
          docs: ["Database weight constants."],
        },
        {
          name: "MaximumBlockWeight",
          type: "Weight",
          value: '{"ref_time": 2000000000000, "proof_size": 5242880}',
          docs: ["Maximum weight of a block."],
        },
        {
          name: "MaximumBlockLength",
          type: "u32",
          value: "5242880",
          docs: ["Maximum length of a block (in bytes)."],
        },
        {
          name: "Version",
          type: "RuntimeVersion",
          value: '{"spec_name": "polkadot", "impl_name": "parity-polkadot", "spec_version": 1000000}',
          docs: ["Runtime version information."],
        },
      ],
    },
    {
      name: "Balances",
      calls: [
        {
          name: "transfer_allow_death",
          args: [
            { name: "dest", type: "MultiAddress" },
            { name: "value", type: "Compact<u128>" },
          ],
          docs: [
            "Transfer some liquid free balance to another account.",
            "transfer_allow_death will allow the sending account to go below the existential deposit, meaning that the account could be deleted as a result of the transfer.",
          ],
        },
        {
          name: "transfer",
          args: [
            { name: "dest", type: "MultiAddress" },
            { name: "value", type: "Compact<u128>" },
          ],
          docs: [
            "Transfer some liquid free balance to another account.",
            "Alias for transfer_allow_death - the most commonly used transfer function.",
          ],
        },
        {
          name: "transfer_keep_alive",
          args: [
            { name: "dest", type: "MultiAddress" },
            { name: "value", type: "Compact<u128>" },
          ],
          docs: [
            "Same as the transfer call, but with a check that the transfer will not kill the origin account.",
          ],
        },
        {
          name: "transfer_all",
          args: [
            { name: "dest", type: "MultiAddress" },
            { name: "keep_alive", type: "bool" },
          ],
          docs: [
            "Transfer the entire transferable balance from the caller account.",
          ],
        },
        {
          name: "force_transfer",
          args: [
            { name: "source", type: "MultiAddress" },
            { name: "dest", type: "MultiAddress" },
            { name: "value", type: "Compact<u128>" },
          ],
          docs: ["Exactly as transfer, except the origin must be root."],
        },
      ],
      storage: [
        {
          name: "TotalIssuance",
          type: "u128",
          docs: ["The total units issued in the system."],
        },
        {
          name: "InactiveIssuance",
          type: "u128",
          docs: [
            "The total units of outstanding deactivated balance in the system.",
          ],
        },
        {
          name: "Account",
          type: "AccountData",
          docs: [
            "The Balances pallet example of storing the balance of an account.",
          ],
        },
        {
          name: "Locks",
          type: "Vec<BalanceLock>",
          docs: ["Any liquidity locks on some account balances."],
        },
      ],
      events: [
        {
          name: "Transfer",
          args: [
            { name: "from", type: "AccountId32" },
            { name: "to", type: "AccountId32" },
            { name: "amount", type: "u128" },
          ],
          docs: ["Transfer succeeded."],
        },
        {
          name: "BalanceSet",
          args: [
            { name: "who", type: "AccountId32" },
            { name: "free", type: "u128" },
          ],
          docs: ["A balance was set by root."],
        },
      ],
      constants: [
        {
          name: "ExistentialDeposit",
          type: "u128",
          value: "10000000000",
          docs: ["The minimum amount required to keep an account open. This MUST be greater than zero."],
        },
        {
          name: "MaxLocks",
          type: "u32",
          value: "50",
          docs: ["The maximum number of locks that should exist on an account."],
        },
        {
          name: "MaxReserves",
          type: "u32", 
          value: "50",
          docs: ["The maximum number of named reserves that can exist on an account."],
        },
        {
          name: "MaxHolds",
          type: "u32",
          value: "50", 
          docs: ["The maximum number of holds that can exist on an account at any time."],
        },
        {
          name: "MaxFreezes",
          type: "u32",
          value: "50",
          docs: ["The maximum number of individual freeze locks that can exist on an account at any time."],
        },
      ],
    },
    {
      name: "Timestamp",
      calls: [
        {
          name: "set",
          args: [{ name: "now", type: "Compact<u64>" }],
          docs: ["Set the current time."],
        },
      ],
      storage: [
        {
          name: "Now",
          type: "u64",
          docs: ["Current time for the current block."],
        },
      ],
      events: [],
      constants: [
        {
          name: "Now",
          type: "u64",
          value: "1699123456000",
          docs: ["Current timestamp in milliseconds."],
        },
        {
          name: "MinimumPeriod",
          type: "u64", 
          value: "3000",
          docs: ["Minimum period between blocks."],
        },
      ],
    },
    {
      name: "Staking",
      calls: [
        {
          name: "bond",
          args: [
            { name: "value", type: "Compact<u128>" },
            { name: "payee", type: "RewardDestination" },
          ],
          docs: [
            "Take the origin account as a stash and lock up value of its balance.",
          ],
        },
        {
          name: "bond_extra",
          args: [{ name: "max_additional", type: "Compact<u128>" }],
          docs: [
            "Add some extra amount that have appeared in the stash free balance.",
          ],
        },
        {
          name: "unbond",
          args: [{ name: "value", type: "Compact<u128>" }],
          docs: [
            "Schedule a portion of the stash to be unlocked ready for transfer.",
          ],
        },
        {
          name: "withdraw_unbonded",
          args: [{ name: "num_slashing_spans", type: "u32" }],
          docs: ["Remove any unlocked chunks from the unlocking queue."],
        },
        {
          name: "nominate",
          args: [{ name: "targets", type: "Vec<MultiAddress>" }],
          docs: [
            "Declare the desire to nominate targets for the origin controller.",
          ],
        },
        {
          name: "chill",
          args: [],
          docs: ["Declare no desire to either validate or nominate."],
        },
      ],
      storage: [
        {
          name: "Bonded",
          type: "AccountId32",
          docs: ["Map from stash account to controller account."],
        },
        {
          name: "Ledger",
          type: "StakingLedger",
          docs: ["Map from controller account to the stake information."],
        },
        {
          name: "Validators",
          type: "ValidatorPrefs",
          docs: [
            "The map from (wannabe) validator stash key to the preferences.",
          ],
        },
        {
          name: "Nominators",
          type: "Nominations",
          docs: [
            "The map from nominator stash key to their nomination preferences.",
          ],
        },
      ],
      events: [
        {
          name: "Bonded",
          args: [
            { name: "stash", type: "AccountId32" },
            { name: "amount", type: "u128" },
          ],
          docs: ["Account was bonded."],
        },
        {
          name: "Unbonded",
          args: [
            { name: "stash", type: "AccountId32" },
            { name: "amount", type: "u128" },
          ],
          docs: ["Account was unbonded."],
        },
      ],
      constants: [
        {
          name: "BondingDuration",
          type: "u32",
          value: "28",
          docs: ["Number of eras that staked funds must remain bonded for."],
        },
        {
          name: "SlashDeferDuration",
          type: "u32",
          value: "27",
          docs: ["Number of eras that slashes are deferred by."],
        },
        {
          name: "SessionsPerEra",
          type: "u32",
          value: "6",
          docs: ["Number of sessions per era."],
        },
        {
          name: "MaxNominatorRewardedPerValidator",
          type: "u32",
          value: "512",
          docs: ["Maximum number of nominators rewarded for each validator."],
        },
        {
          name: "OffendingValidatorsThreshold",
          type: "Perbill",
          value: "170000000",
          docs: ["Threshold for offending validators."],
        },
        {
          name: "MaxExposurePageSize",
          type: "u32",
          value: "512",
          docs: ["Maximum size of validator exposure page."],
        },
      ],
    },
    {
      name: "Democracy",
      calls: [
        {
          name: "propose",
          args: [
            { name: "proposal", type: "BoundedCallOf" },
            { name: "value", type: "Compact<u128>" },
          ],
          docs: ["Propose a sensitive action to be taken."],
        },
        {
          name: "vote",
          args: [
            { name: "ref_index", type: "Compact<u32>" },
            { name: "vote", type: "AccountVote" },
          ],
          docs: ["Vote in a referendum."],
        },
        {
          name: "delegate",
          args: [
            { name: "to", type: "MultiAddress" },
            { name: "conviction", type: "Conviction" },
            { name: "balance", type: "u128" },
          ],
          docs: ["Delegate the voting power."],
        },
      ],
      storage: [
        {
          name: "ReferendumCount",
          type: "u32",
          docs: ["The next referendum index that should be used."],
        },
        {
          name: "ReferendumInfoOf",
          type: "ReferendumInfo",
          docs: ["Information concerning any referendum."],
        },
        {
          name: "VotingOf",
          type: "Voting",
          docs: ["All votes for a particular voter."],
        },
      ],
      events: [
        {
          name: "Proposed",
          args: [
            { name: "proposal_index", type: "u32" },
            { name: "deposit", type: "u128" },
          ],
          docs: ["A motion has been proposed by a public account."],
        },
        {
          name: "Voted",
          args: [
            { name: "voter", type: "AccountId32" },
            { name: "ref_index", type: "u32" },
            { name: "vote", type: "AccountVote" },
          ],
          docs: ["An account has voted in a referendum."],
        },
      ],
      constants: [
        {
          name: "LaunchPeriod",
          type: "u32",
          value: "28800",
          docs: ["How often (in blocks) new public referenda are launched."],
        },
        {
          name: "VotingPeriod", 
          type: "u32",
          value: "28800",
          docs: ["How often (in blocks) to check for new votes."],
        },
        {
          name: "VoteLockingPeriod",
          type: "u32",
          value: "28800", 
          docs: ["The period for which a vote is locked."],
        },
        {
          name: "MinimumDeposit",
          type: "u128",
          value: "100000000000000",
          docs: ["The minimum amount to be used as a deposit for a public referendum proposal."],
        },
        {
          name: "EnactmentPeriod",
          type: "u32",
          value: "28800",
          docs: ["The period between a proposal being approved and enacted."],
        },
        {
          name: "FastTrackVotingPeriod",
          type: "u32",
          value: "900", 
          docs: ["Minimum voting period allowed for a fast-track referendum."],
        },
      ],
    },
    {
      name: "Treasury",
      calls: [
        {
          name: "propose_spend",
          args: [
            { name: "value", type: "Compact<u128>" },
            { name: "beneficiary", type: "MultiAddress" },
          ],
          docs: ["Put forward a suggestion for spending."],
        },
        {
          name: "approve_proposal",
          args: [{ name: "proposal_id", type: "Compact<u32>" }],
          docs: ["Approve a proposal."],
        },
        {
          name: "reject_proposal",
          args: [{ name: "proposal_id", type: "Compact<u32>" }],
          docs: ["Reject a proposed spend."],
        },
      ],
      storage: [
        {
          name: "ProposalCount",
          type: "u32",
          docs: ["Number of proposals that have been made."],
        },
        {
          name: "Proposals",
          type: "TreasuryProposal",
          docs: ["Proposals that have been made."],
        },
        {
          name: "Approvals",
          type: "Vec<u32>",
          docs: [
            "Proposal indices that have been approved but not yet awarded.",
          ],
        },
      ],
      events: [
        {
          name: "Proposed",
          args: [{ name: "proposal_index", type: "u32" }],
          docs: ["New proposal."],
        },
        {
          name: "Awarded",
          args: [
            { name: "proposal_index", type: "u32" },
            { name: "award", type: "u128" },
            { name: "account", type: "AccountId32" },
          ],
          docs: ["Some funds have been allocated."],
        },
      ],
      constants: [
        {
          name: "ProposalBond",
          type: "Permill", 
          value: "50000",
          docs: ["Fraction of a proposal's value that should be bonded in order to place the proposal."],
        },
        {
          name: "ProposalBondMinimum",
          type: "u128",
          value: "20000000000000",
          docs: ["Minimum amount of funds that should be placed in a deposit for making a proposal."],
        },
        {
          name: "ProposalBondMaximum",
          type: "Option<u128>",
          value: "1000000000000000",
          docs: ["Maximum amount of funds that should be placed in a deposit for making a proposal."],
        },
        {
          name: "SpendPeriod",
          type: "u32",
          value: "86400",
          docs: ["Period between successive spends."],
        },
        {
          name: "Burn",
          type: "Permill",
          value: "2000",
          docs: ["Percentage of spare funds (if any) that are burnt per spend period."],
        },
        {
          name: "PalletId",
          type: "[u8; 8]",
          value: '"py/trsry"',
          docs: ["The treasury's pallet id, used for deriving its sovereign account ID."],
        },
        {
          name: "MaxApprovals",
          type: "u32",
          value: "100",
          docs: ["The maximum number of approvals that can wait in the spending queue."],
        },
      ],
    },
    {
      name: "Vesting",
      calls: [
        {
          name: "vest",
          args: [],
          docs: ["Unlock any vested funds of the sender account."],
        },
        {
          name: "vest_other",
          args: [{ name: "target", type: "MultiAddress" }],
          docs: ["Unlock any vested funds of a target account."],
        },
        {
          name: "vested_transfer",
          args: [
            { name: "target", type: "MultiAddress" },
            { name: "schedule", type: "VestingInfo" },
          ],
          docs: ["Create a vested transfer."],
        },
      ],
      storage: [
        {
          name: "Vesting",
          type: "Vec<VestingInfo>",
          docs: ["Information regarding vesting of a user."],
        },
        {
          name: "StorageVersion",
          type: "Releases",
          docs: ["Storage version of the pallet."],
        },
      ],
      events: [
        {
          name: "VestingUpdated",
          args: [
            { name: "account", type: "AccountId32" },
            { name: "unvested", type: "u128" },
          ],
          docs: ["The amount vested has been updated."],
        },
        {
          name: "VestingCompleted",
          args: [{ name: "account", type: "AccountId32" }],
          docs: ["An account has become fully vested."],
        },
      ],
      constants: [
        {
          name: "MinVestedTransfer",
          type: "u128",
          value: "100000000000",
          docs: ["The minimum amount transferred to call vested_transfer."],
        },
        {
          name: "MaxVestingSchedules",
          type: "u32",
          value: "28",
          docs: ["Maximum number of vesting schedules an account may have at a given moment."],
        },
      ],
    },
    {
      name: "XcmPallet",
      calls: [
        {
          name: "send",
          args: [
            { name: "dest", type: "VersionedMultiLocation" },
            { name: "message", type: "VersionedXcm" },
          ],
          docs: ["Send an XCM message as parachain sovereign."],
        },
        {
          name: "teleport_assets",
          args: [
            { name: "dest", type: "VersionedMultiLocation" },
            { name: "beneficiary", type: "VersionedMultiLocation" },
            { name: "assets", type: "VersionedMultiAssets" },
            { name: "fee_asset_item", type: "u32" },
          ],
          docs: [
            "Teleport some assets from the local chain to some destination chain.",
          ],
        },
        {
          name: "reserve_transfer_assets",
          args: [
            { name: "dest", type: "VersionedMultiLocation" },
            { name: "beneficiary", type: "VersionedMultiLocation" },
            { name: "assets", type: "VersionedMultiAssets" },
            { name: "fee_asset_item", type: "u32" },
          ],
          docs: [
            "Transfer some assets from the local chain to the sovereign account of a destination.",
          ],
        },
      ],
      storage: [
        {
          name: "QueryCounter",
          type: "u64",
          docs: ["The latest available query index."],
        },
        {
          name: "Queries",
          type: "QueryStatus",
          docs: ["The ongoing queries."],
        },
        {
          name: "AssetTraps",
          type: "u32",
          docs: ["The existing asset traps."],
        },
      ],
      events: [
        {
          name: "Sent",
          args: [
            { name: "origin", type: "MultiLocation" },
            { name: "destination", type: "MultiLocation" },
            { name: "message", type: "Xcm" },
            { name: "message_id", type: "XcmMessageId" },
          ],
          docs: ["A XCM message was sent."],
        },
        {
          name: "AssetsTrapped",
          args: [
            { name: "hash", type: "H256" },
            { name: "origin", type: "MultiLocation" },
            { name: "assets", type: "VersionedMultiAssets" },
          ],
          docs: ["Some assets have been placed in an asset trap."],
        },
      ],
      constants: [],
    },
    {
      name: "Utility",
      calls: [
        {
          name: "batch",
          args: [{ name: "calls", type: "Vec<Call>" }],
          docs: ["Send a batch of dispatch calls."],
        },
        {
          name: "batch_all",
          args: [{ name: "calls", type: "Vec<Call>" }],
          docs: ["Send a batch of dispatch calls and atomically execute them."],
        },
        {
          name: "force_batch",
          args: [{ name: "calls", type: "Vec<Call>" }],
          docs: ["Send a batch of dispatch calls."],
        },
        {
          name: "as_derivative",
          args: [
            { name: "index", type: "u16" },
            { name: "call", type: "Call" },
          ],
          docs: ["Send a call through an indexed pseudonym of the sender."],
        },
      ],
      storage: [],
      events: [
        {
          name: "BatchInterrupted",
          args: [
            { name: "index", type: "u32" },
            { name: "error", type: "DispatchError" },
          ],
          docs: ["Batch of dispatches did not complete fully."],
        },
        {
          name: "BatchCompleted",
          args: [],
          docs: ["Batch of dispatches completed fully with no error."],
        },
      ],
      constants: [
        {
          name: "batched_calls_limit",
          type: "u32",
          value: "10922",
          docs: ["The limit on the number of batched calls."],
        },
      ],
    },
  ];
}

// Helper function to get enhanced constants for known pallets
function getEnhancedConstantsForPallet(palletName: string): PalletConstant[] {
  const normalizedName = palletName.toLowerCase();
  
  // Return additional constants for pallets that might not have complete metadata
  switch (normalizedName) {
    case "multisig":
      return [
        {
          name: "DepositBase",
          type: "u128", 
          value: "500000000000",
          docs: ["The base amount of currency needed to reserve for creating a multisig execution or to store a dispatch call for later."],
        },
        {
          name: "DepositFactor",
          type: "u128",
          value: "32000000000",
          docs: ["The amount of currency needed per unit threshold when creating a multisig execution."],
        },
        {
          name: "MaxSignatories",
          type: "u32",
          value: "100",
          docs: ["The maximum amount of signatories allowed in the multisig."],
        },
      ];
      
    case "proxy":
      return [
        {
          name: "ProxyDepositBase",
          type: "u128",
          value: "200080000000",
          docs: ["The base amount of currency needed to reserve for creating a proxy."],
        },
        {
          name: "ProxyDepositFactor", 
          type: "u128",
          value: "330000000",
          docs: ["The amount of currency needed per proxy type."],
        },
        {
          name: "MaxProxies",
          type: "u32",
          value: "32",
          docs: ["The maximum amount of proxies allowed for a single account."],
        },
        {
          name: "MaxPending",
          type: "u32",
          value: "32",
          docs: ["The maximum amount of time-delayed announcements that are allowed to be pending."],
        },
        {
          name: "AnnouncementDepositBase",
          type: "u128", 
          value: "200080000000",
          docs: ["The base amount of currency needed to reserve for creating an announcement."],
        },
      ];
      
    case "identity":
      return [
        {
          name: "BasicDeposit",
          type: "u128",
          value: "200000000000",
          docs: ["The amount held on deposit for a registered identity."],
        },
        {
          name: "FieldDeposit",
          type: "u128",
          value: "66000000000",
          docs: ["The amount held on deposit per additional field for a registered identity."],
        },
        {
          name: "SubAccountDeposit",
          type: "u128",
          value: "200000000000",
          docs: ["The amount held on deposit for a registered subaccount."],
        },
        {
          name: "MaxSubAccounts",
          type: "u32",
          value: "100",
          docs: ["Maximum number of additional fields that may be stored in an ID."],
        },
        {
          name: "MaxAdditionalFields",
          type: "u32",
          value: "100", 
          docs: ["Maxmimum number of additional fields that may be stored in an ID."],
        },
      ];
      
    case "scheduler":
      return [
        {
          name: "MaximumWeight",
          type: "Weight",
          value: '{"ref_time": 1000000000000, "proof_size": 2621440}',
          docs: ["The maximum weight that may be scheduled per block for any dispatchables."],
        },
        {
          name: "MaxScheduledPerBlock",
          type: "u32",
          value: "50",
          docs: ["The maximum number of scheduled calls in the queue for a single block."],
        },
      ];
      
    case "assets":
    case "tokens":
      return [
        {
          name: "AssetDeposit",
          type: "u128",
          value: "10000000000000",
          docs: ["The basic amount of funds that must be reserved for an asset."],
        },
        {
          name: "AssetAccountDeposit", 
          type: "u128",
          value: "1000000000",
          docs: ["The amount of funds that must be reserved for a non-provider asset account to be maintained."],
        },
        {
          name: "MetadataDepositBase",
          type: "u128",
          value: "1000000000000",
          docs: ["The basic amount of funds that must be reserved when adding metadata to your asset."],
        },
        {
          name: "MetadataDepositPerByte",
          type: "u128", 
          value: "10000000",
          docs: ["The additional funds that must be reserved for the number of bytes you store in your metadata."],
        },
        {
          name: "ApprovalDeposit",
          type: "u128",
          value: "100000000",
          docs: ["The amount of funds that must be reserved when creating an approval."],
        },
      ];
      
    default:
      return [];
  }
}

async function parseRawMetadata(
  rawMetadata: string,
  chainKey: string,
): Promise<ChainMetadata> {
  try {
    console.log("Parsing raw metadata for:", chainKey);
    console.log("Raw metadata length:", rawMetadata.length);

    // Import the metadata builders for SCALE decoding
    const { metadata: metadataCodec } = await import(
      "@polkadot-api/substrate-bindings"
    );

    // Remove the '0x' prefix if present
    const hexData = rawMetadata.startsWith("0x")
      ? rawMetadata.slice(2)
      : rawMetadata;

    // Convert hex string to Uint8Array
    const bytes = new Uint8Array(
      hexData.match(/.{1,2}/g)?.map((byte) => parseInt(byte, 16)) || [],
    );
    console.log("Decoded bytes length:", bytes.length);

    // Decode the SCALE-encoded metadata
    console.log("Decoding SCALE metadata...");
    const decodedMetadata = metadataCodec.dec(bytes);
    console.log("Successfully decoded metadata:", decodedMetadata);

    // Parse the decoded metadata into our format
    const chainMetadata = parseDecodedMetadata(decodedMetadata, chainKey);

    // Enhance the real metadata with additional pallets that we know exist
    const enhancedMetadata = enhanceRealMetadata(chainMetadata, chainKey);

    return enhancedMetadata;
  } catch (error) {
    console.error("Error parsing raw metadata:", error);
    console.log("Checking if mock metadata fallback is enabled");
    // Fallback to enhanced mock metadata if parsing fails and it's enabled
    return getMockMetadataIfEnabled(chainKey) || createEmptyMetadata(chainKey);
  }
}

function parseDecodedMetadata(
  decodedMetadata: any,
  chainKey: string,
): ChainMetadata {
  try {
    console.log("Parsing decoded metadata structure...");

    const pallets: PalletInfo[] = [];

    // Handle different metadata versions (v14, v15, etc.)
    const metadataVersion = decodedMetadata.metadata;
    let palletData: any[] = [];

    console.log("Metadata structure debug:", {
      hasV15: !!metadataVersion?.v15,
      hasV14: !!metadataVersion?.v14,
      hasV13: !!metadataVersion?.v13,
      hasV12: !!metadataVersion?.v12,
      availableVersions: Object.keys(metadataVersion || {}),
      hasTag: !!metadataVersion?.tag,
      hasValue: !!metadataVersion?.value,
      tagValue: metadataVersion?.tag,
    });

    // Handle enum/variant-style metadata (modern PAPI format)
    if (metadataVersion?.tag !== undefined && metadataVersion?.value) {
      const versionTag = metadataVersion.tag;
      const versionData = metadataVersion.value;

      console.log(`Processing metadata variant tag: ${versionTag}`);

      // Map tag numbers to version names (common mapping)
      if (versionTag === 15 || versionTag === "V15") {
        console.log("Processing metadata v15 (via tag)");
        palletData = versionData.pallets || [];
      } else if (versionTag === 14 || versionTag === "V14") {
        console.log("Processing metadata v14 (via tag)");
        palletData = versionData.pallets || [];
      } else if (versionTag === 13 || versionTag === "V13") {
        console.log("Processing metadata v13 (via tag)");
        palletData = versionData.pallets || [];
      } else if (versionTag === 12 || versionTag === "V12") {
        console.log("Processing metadata v12 (via tag)");
        palletData = versionData.pallets || [];
      } else {
        console.log(
          `Processing metadata tag ${versionTag} (attempting generic pallets extraction)`,
        );
        palletData = versionData.pallets || versionData || [];
      }
    }
    // Handle direct version properties (legacy format)
    else if (metadataVersion?.v15?.pallets) {
      console.log("Processing metadata v15");
      palletData = metadataVersion.v15.pallets;
    } else if (metadataVersion?.v14?.pallets) {
      console.log("Processing metadata v14");
      palletData = metadataVersion.v14.pallets;
    } else if (metadataVersion?.v13?.pallets) {
      console.log("Processing metadata v13");
      palletData = metadataVersion.v13.pallets;
    } else if (metadataVersion?.v12?.pallets) {
      console.log("Processing metadata v12");
      palletData = metadataVersion.v12.pallets;
    } else {
      console.warn(
        "Unknown metadata version, checking if mock metadata is enabled",
      );
      console.warn(
        "Available metadata keys:",
        Object.keys(metadataVersion || {}),
      );
      console.warn(
        "Metadata structure:",
        JSON.stringify(metadataVersion, null, 2).substring(0, 500),
      );
      return (
        getMockMetadataIfEnabled(chainKey) || createEmptyMetadata(chainKey)
      );
    }

    console.log(`Found ${palletData.length} pallets in metadata`);

    // Parse each pallet
    for (const pallet of palletData) {
      const palletInfo: PalletInfo = {
        name: pallet.name || "Unknown",
        calls: [],
        storage: [],
        events: [],
        constants: [],
        errors: [],
      };

      // Parse calls - always try to parse calls for every pallet
      // In real metadata, calls might be referenced by type index or be undefined
      // For now, we'll create some basic calls based on common patterns
      palletInfo.calls = parseCallsFromPallet(pallet);
      console.log(
        `📋 Final result for ${pallet.name}: ${palletInfo.calls.length} calls`,
      );

      // Parse storage
      if (pallet.storage?.items) {
        for (const item of pallet.storage.items) {
          palletInfo.storage.push({
            name: item.name || "Unknown",
            type: formatStorageType(item.type),
            docs: Array.isArray(item.docs) ? item.docs : [],
          });
        }
      }

      // Parse events - prioritize comprehensive metadata as source of truth
      const comprehensiveEvents = getEventsFromComprehensiveMetadata(
        chainKey,
        pallet.name || "Unknown",
      );

      if (comprehensiveEvents.length > 0) {
        // Use comprehensive metadata as primary source
        console.log(
          `✅ Using comprehensive metadata for ${pallet.name} events: ${comprehensiveEvents.length} events found`,
        );
        palletInfo.events = comprehensiveEvents;
      } else if (pallet.events) {
        // Fallback to parsing from runtime metadata
        if (pallet.events.variants && Array.isArray(pallet.events.variants)) {
          // Parse real event variants from metadata
          console.log(
            `⚠️ Using runtime metadata for ${pallet.name} events: ${pallet.events.variants.length} events found`,
          );
          for (const event of pallet.events.variants) {
            palletInfo.events.push({
              name: event.name,
              args:
                event.fields?.map((field: any) => ({
                  name: field.name || `arg${field.index}`,
                  type: field.type || "unknown",
                })) || [],
              docs: event.docs || [],
            });
          }
        } else if (pallet.events?.type !== undefined) {
          // Final fallback to simplified parsing for older metadata formats
          console.log(
            `⚠️ Using fallback parsing for ${pallet.name} events`,
          );
          palletInfo.events = parseEventsFromPallet(pallet);
        }
      } else {
        console.log(`ℹ️ No events found for ${pallet.name} in any source`);
      }

      // Parse constants
      if (pallet.constants && Array.isArray(pallet.constants)) {
        for (const constant of pallet.constants) {
          palletInfo.constants.push({
            name: constant.name || "Unknown",
            type: constant.type || "Unknown",
            value: constant.value || null,
            docs: Array.isArray(constant.docs) ? constant.docs : [],
          });
        }
      }

      // Add enhanced constants based on pallet name
      palletInfo.constants = [
        ...palletInfo.constants,
        ...getEnhancedConstantsForPallet(pallet.name || ""),
      ];

      // Parse errors - prioritize comprehensive metadata as source of truth
      const comprehensiveErrors = getErrorsFromComprehensiveMetadata(
        chainKey,
        pallet.name || "Unknown",
      );

      if (comprehensiveErrors.length > 0) {
        // Use comprehensive metadata as primary source
        console.log(
          `✅ [ERRORS] Using comprehensive metadata for ${pallet.name} errors: ${comprehensiveErrors.length} errors found`,
        );
        palletInfo.errors = comprehensiveErrors;

        // Special logging for Balances to confirm it's working
        if (pallet.name === "Balances") {
          console.log(`🎯 [BALANCES ERRORS DETECTED] Found ${comprehensiveErrors.length} errors including:`,
                     comprehensiveErrors.map(e => e.name).slice(0, 5));
        }
      } else {
        console.log(`ℹ️ [ERRORS] No errors found for ${pallet.name} in comprehensive metadata`);
        palletInfo.errors = [];
      }

      pallets.push(palletInfo);
    }

    console.log(
      `Successfully parsed ${pallets.length} pallets from real metadata`,
    );

    return {
      pallets: pallets.filter(
        (p) =>
          p.calls.length > 0 || p.storage.length > 0 || p.events.length > 0 || (p.errors && p.errors.length > 0),
      ),
      chainHash:
        chainKey === "polkadot"
          ? "0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3"
          : "0x" + "0".repeat(64),
      specVersion:
        metadataVersion?.v15?.specVersion ||
        metadataVersion?.v14?.specVersion ||
        1000,
    };
  } catch (error) {
    console.error("Error parsing decoded metadata:", error);
    return getMockMetadataIfEnabled(chainKey) || createEmptyMetadata(chainKey);
  }
}

function parseCallsFromPallet(pallet: any): PalletCall[] {
  // This is a simplified implementation
  // In a full implementation, you would resolve the type references
  const calls: PalletCall[] = [];

  // Add some common calls based on pallet name
  const palletName = pallet.name?.toLowerCase() || "";
  console.log(
    `🔍 Parsing calls for pallet: "${pallet.name}" (normalized: "${palletName}")`,
  );

  if (palletName.includes("balance") || palletName === "balances") {
    calls.push(
      {
        name: "transfer_allow_death",
        args: [
          { name: "dest", type: "MultiAddress" },
          { name: "value", type: "Compact<u128>" },
        ],
        docs: ["Transfer some liquid free balance to another account."],
      },
      {
        name: "transfer",
        args: [
          { name: "dest", type: "MultiAddress" },
          { name: "value", type: "Compact<u128>" },
        ],
        docs: [
          "Transfer some liquid free balance to another account.",
          "Alias for transfer_allow_death.",
        ],
      },
      {
        name: "transfer_keep_alive",
        args: [
          { name: "dest", type: "MultiAddress" },
          { name: "value", type: "Compact<u128>" },
        ],
        docs: [
          "Same as the transfer call, but with a check that the transfer will not kill the origin account.",
        ],
      },
      {
        name: "transfer_all",
        args: [
          { name: "dest", type: "MultiAddress" },
          { name: "keep_alive", type: "bool" },
        ],
        docs: [
          "Transfer the entire transferable balance from the caller account.",
        ],
      },
      {
        name: "force_transfer",
        args: [
          { name: "source", type: "MultiAddress" },
          { name: "dest", type: "MultiAddress" },
          { name: "value", type: "Compact<u128>" },
        ],
        docs: ["Exactly as transfer, except the origin must be root."],
      },
    );
  } else if (palletName.includes("system")) {
    calls.push(
      {
        name: "remark",
        args: [{ name: "remark", type: "Bytes" }],
        docs: ["Make some on-chain remark."],
      },
      {
        name: "remark_with_event",
        args: [{ name: "remark", type: "Bytes" }],
        docs: ["Make some on-chain remark and emit event."],
      },
      {
        name: "set_heap_pages",
        args: [{ name: "pages", type: "u64" }],
        docs: ["Set the number of pages in the WebAssembly environment heap."],
      },
    );
  } else if (palletName.includes("staking")) {
    calls.push(
      {
        name: "bond",
        args: [
          { name: "value", type: "Compact<u128>" },
          { name: "payee", type: "RewardDestination" },
        ],
        docs: [
          "Take the origin account as a stash and lock up value of its balance.",
        ],
      },
      {
        name: "bond_extra",
        args: [{ name: "max_additional", type: "Compact<u128>" }],
        docs: [
          "Add some extra amount that have appeared in the stash free balance.",
        ],
      },
      {
        name: "unbond",
        args: [{ name: "value", type: "Compact<u128>" }],
        docs: [
          "Schedule a portion of the stash to be unlocked ready for transfer.",
        ],
      },
      {
        name: "withdraw_unbonded",
        args: [{ name: "num_slashing_spans", type: "u32" }],
        docs: ["Remove any unlocked chunks from the unlocking queue."],
      },
      {
        name: "nominate",
        args: [{ name: "targets", type: "Vec<MultiAddress>" }],
        docs: [
          "Declare the desire to nominate targets for the origin controller.",
        ],
      },
      {
        name: "chill",
        args: [],
        docs: ["Declare no desire to either validate or nominate."],
      },
    );
  } else if (palletName.includes("democracy")) {
    calls.push(
      {
        name: "propose",
        args: [
          { name: "proposal", type: "BoundedCallOf" },
          { name: "value", type: "Compact<u128>" },
        ],
        docs: ["Propose a sensitive action to be taken."],
      },
      {
        name: "vote",
        args: [
          { name: "ref_index", type: "Compact<u32>" },
          { name: "vote", type: "AccountVote" },
        ],
        docs: ["Vote in a referendum."],
      },
      {
        name: "delegate",
        args: [
          { name: "to", type: "MultiAddress" },
          { name: "conviction", type: "Conviction" },
          { name: "balance", type: "u128" },
        ],
        docs: ["Delegate the voting power."],
      },
    );
  } else if (palletName.includes("treasury")) {
    calls.push(
      {
        name: "propose_spend",
        args: [
          { name: "value", type: "Compact<u128>" },
          { name: "beneficiary", type: "MultiAddress" },
        ],
        docs: ["Put forward a suggestion for spending."],
      },
      {
        name: "approve_proposal",
        args: [{ name: "proposal_id", type: "Compact<u32>" }],
        docs: ["Approve a proposal."],
      },
      {
        name: "reject_proposal",
        args: [{ name: "proposal_id", type: "Compact<u32>" }],
        docs: ["Reject a proposed spend."],
      },
    );
  } else if (palletName.includes("vesting")) {
    calls.push(
      {
        name: "vest",
        args: [],
        docs: ["Unlock any vested funds of the sender account."],
      },
      {
        name: "vest_other",
        args: [{ name: "target", type: "MultiAddress" }],
        docs: ["Unlock any vested funds of a target account."],
      },
      {
        name: "vested_transfer",
        args: [
          { name: "target", type: "MultiAddress" },
          { name: "schedule", type: "VestingInfo" },
        ],
        docs: ["Create a vested transfer."],
      },
    );
  } else if (
    palletName.includes("xcm") ||
    palletName === "polkadotxcm" ||
    palletName === "xcmpallet"
  ) {
    calls.push(
      {
        name: "send",
        args: [
          { name: "dest", type: "VersionedMultiLocation" },
          { name: "message", type: "VersionedXcm" },
        ],
        docs: ["Send an XCM message as parachain sovereign."],
      },
      {
        name: "teleport_assets",
        args: [
          { name: "dest", type: "VersionedMultiLocation" },
          { name: "beneficiary", type: "VersionedMultiLocation" },
          { name: "assets", type: "VersionedMultiAssets" },
          { name: "fee_asset_item", type: "u32" },
        ],
        docs: [
          "Teleport some assets from the local chain to some destination chain.",
        ],
      },
      {
        name: "reserve_transfer_assets",
        args: [
          { name: "dest", type: "VersionedMultiLocation" },
          { name: "beneficiary", type: "VersionedMultiLocation" },
          { name: "assets", type: "VersionedMultiAssets" },
          { name: "fee_asset_item", type: "u32" },
        ],
        docs: [
          "Transfer some assets from the local chain to the sovereign account of a destination.",
        ],
      },
    );
  } else if (palletName.includes("utility")) {
    calls.push(
      {
        name: "batch",
        args: [{ name: "calls", type: "Vec<Call>" }],
        docs: ["Send a batch of dispatch calls."],
      },
      {
        name: "batch_all",
        args: [{ name: "calls", type: "Vec<Call>" }],
        docs: ["Send a batch of dispatch calls and atomically execute them."],
      },
      {
        name: "force_batch",
        args: [{ name: "calls", type: "Vec<Call>" }],
        docs: ["Send a batch of dispatch calls."],
      },
      {
        name: "as_derivative",
        args: [
          { name: "index", type: "u16" },
          { name: "call", type: "Call" },
        ],
        docs: ["Send a call through an indexed pseudonym of the sender."],
      },
    );
  } else if (palletName.includes("timestamp")) {
    calls.push({
      name: "set",
      args: [{ name: "now", type: "Compact<u64>" }],
      docs: ["Set the current time."],
    });
  } else if (palletName === "babe") {
    // BABE pallet in most runtimes has no user-dispatchable calls
    // It handles block production automatically via inherents
    calls.push({
      name: "no_dispatchable_calls",
      args: [],
      docs: [
        "The BABE pallet handles block production automatically through inherents and has no user-callable functions. Block production is managed by validators through the consensus mechanism.",
      ],
    });
  } else if (palletName === "aura") {
    calls.push({
      name: "report_equivocation",
      args: [
        { name: "equivocation_proof", type: "AuraEquivocationProof" },
        { name: "key_owner_proof", type: "KeyOwnerProof" },
      ],
      docs: ["Report authority equivocation/misbehavior in Aura consensus."],
    });
  } else if (palletName === "offences") {
    // Offences pallet typically has no dispatchable calls
    calls.push({
      name: "no_dispatchable_calls",
      args: [],
      docs: [
        "The Offences pallet handles offences automatically and has no user-callable functions.",
      ],
    });
  } else if (palletName === "historical") {
    // Historical pallet typically has no dispatchable calls
    calls.push({
      name: "no_dispatchable_calls",
      args: [],
      docs: [
        "The Historical pallet provides historical data access and has no user-callable functions.",
      ],
    });
  } else if (
    palletName === "randomnesscollectiveflip" ||
    palletName === "randomness-collective-flip"
  ) {
    // Randomness Collective Flip has no dispatchable calls
    calls.push({
      name: "no_dispatchable_calls",
      args: [],
      docs: [
        "The Randomness Collective Flip pallet provides randomness and has no user-callable functions.",
      ],
    });
  } else if (palletName === "sudo") {
    calls.push(
      {
        name: "sudo",
        args: [{ name: "call", type: "Call" }],
        docs: [
          "Authenticates the sudo key and dispatches a function call with Root origin.",
        ],
      },
      {
        name: "sudo_unchecked_weight",
        args: [
          { name: "call", type: "Call" },
          { name: "weight", type: "Weight" },
        ],
        docs: [
          "Authenticates the sudo key and dispatches a function call with Root origin with custom weight.",
        ],
      },
      {
        name: "set_key",
        args: [{ name: "new", type: "MultiAddress" }],
        docs: [
          "Authenticates the current sudo key and sets the given AccountId as the new sudo key.",
        ],
      },
      {
        name: "sudo_as",
        args: [
          { name: "who", type: "MultiAddress" },
          { name: "call", type: "Call" },
        ],
        docs: [
          "Authenticates the sudo key and dispatches a function call with Signed origin from a given account.",
        ],
      },
    );
  } else if (palletName === "indices") {
    calls.push(
      {
        name: "claim",
        args: [{ name: "index", type: "u32" }],
        docs: [
          "Assign an index already owned by the sender to another account.",
        ],
      },
      {
        name: "transfer",
        args: [
          { name: "new", type: "MultiAddress" },
          { name: "index", type: "u32" },
        ],
        docs: [
          "Assign an index already owned by the sender to another account.",
        ],
      },
      {
        name: "free",
        args: [{ name: "index", type: "u32" }],
        docs: ["Free up an index owned by the sender."],
      },
      {
        name: "force_transfer",
        args: [
          { name: "new", type: "MultiAddress" },
          { name: "index", type: "u32" },
          { name: "freeze", type: "bool" },
        ],
        docs: ["Force an index to an account."],
      },
    );
  } else if (palletName === "preimage") {
    calls.push(
      {
        name: "note_preimage",
        args: [{ name: "bytes", type: "Bytes" }],
        docs: ["Register a preimage on-chain."],
      },
      {
        name: "unnote_preimage",
        args: [{ name: "hash", type: "Hash" }],
        docs: ["Clear a preimage from the runtime storage."],
      },
      {
        name: "request_preimage",
        args: [{ name: "hash", type: "Hash" }],
        docs: [
          "Request that a preimage be uploaded to the chain without paying any fees or deposits.",
        ],
      },
      {
        name: "unrequest_preimage",
        args: [{ name: "hash", type: "Hash" }],
        docs: ["Clear an unrequested preimage from the runtime storage."],
      },
    );
  } else if (palletName === "mmr" || palletName === "merklemountainrange") {
    // MMR typically has no dispatchable calls in standard implementations
    calls.push({
      name: "no_dispatchable_calls",
      args: [],
      docs: [
        "The MMR (Merkle Mountain Range) pallet maintains the MMR structure automatically and typically has no user-callable functions.",
      ],
    });
  } else if (palletName === "beefy" || palletName === "mmrbeefy") {
    calls.push({
      name: "report_equivocation",
      args: [
        { name: "equivocation_proof", type: "BeefyEquivocationProof" },
        { name: "key_owner_proof", type: "KeyOwnerProof" },
      ],
      docs: ["Report voter equivocation/misbehavior in BEEFY protocol."],
    });
  } else if (
    palletName === "bagsList" ||
    palletName === "bags-list" ||
    palletName === "voterlist"
  ) {
    calls.push(
      {
        name: "rebag",
        args: [{ name: "dislocated", type: "MultiAddress" }],
        docs: ["Move the caller account to the appropriate bag."],
      },
      {
        name: "put_in_front_of",
        args: [{ name: "lighter", type: "MultiAddress" }],
        docs: ["Move the caller account to be in front of lighter."],
      },
    );
  } else if (
    palletName === "electionprovidermultiphase" ||
    palletName === "election-provider-multi-phase"
  ) {
    calls.push(
      {
        name: "submit_unsigned",
        args: [
          { name: "raw_solution", type: "RawSolution" },
          { name: "witness", type: "SolutionOrSnapshotSize" },
        ],
        docs: ["Submit a solution for the unsigned phase."],
      },
      {
        name: "set_minimum_untrusted_score",
        args: [{ name: "maybe_next_score", type: "Option<ElectionScore>" }],
        docs: ["Set a new value for MinimumUntrustedScore."],
      },
      {
        name: "set_emergency_election_result",
        args: [{ name: "supports", type: "Supports" }],
        docs: [
          "Set a solution in the queue, to be handed out to the client of this pallet.",
        ],
      },
      {
        name: "submit",
        args: [{ name: "raw_solution", type: "RawSolution" }],
        docs: ["Submit a solution for the signed phase."],
      },
    );
  } else if (palletName === "fastunstake" || palletName === "fast-unstake") {
    calls.push(
      {
        name: "register_fast_unstake",
        args: [],
        docs: ["Register oneself for fast unstake."],
      },
      {
        name: "deregister",
        args: [],
        docs: ["Deregister oneself from the fast unstake queue."],
      },
      {
        name: "control",
        args: [{ name: "eras_to_check", type: "u32" }],
        docs: ["Control the operation of this pallet."],
      },
    );
  } else if (
    palletName === "nominationpools" ||
    palletName === "nomination-pools"
  ) {
    calls.push(
      {
        name: "join",
        args: [
          { name: "amount", type: "Compact<u128>" },
          { name: "pool_id", type: "u32" },
        ],
        docs: ["Stake funds with a pool."],
      },
      {
        name: "bond_extra",
        args: [{ name: "extra", type: "BondExtra" }],
        docs: ["Bond extra funds from a member into their respective pools."],
      },
      {
        name: "claim_payout",
        args: [],
        docs: [
          "A bonded member can use this to claim their payout based on the rewards that the pool has accumulated.",
        ],
      },
      {
        name: "unbond",
        args: [
          { name: "member_account", type: "MultiAddress" },
          { name: "unbonding_points", type: "Compact<u128>" },
        ],
        docs: ["Unbond funds from the pool."],
      },
      {
        name: "pool_withdraw_unbonded",
        args: [
          { name: "pool_id", type: "u32" },
          { name: "num_slashing_spans", type: "u32" },
        ],
        docs: ["Withdraw unbonded funds from pool."],
      },
      {
        name: "withdraw_unbonded",
        args: [
          { name: "member_account", type: "MultiAddress" },
          { name: "num_slashing_spans", type: "u32" },
        ],
        docs: ["Withdraw unbonded funds from member account."],
      },
      {
        name: "create",
        args: [
          { name: "amount", type: "Compact<u128>" },
          { name: "root", type: "MultiAddress" },
          { name: "nominator", type: "MultiAddress" },
          { name: "bouncer", type: "MultiAddress" },
        ],
        docs: ["Create a new delegation pool."],
      },
    );
  } else if (
    palletName === "childBounties" ||
    palletName === "child-bounties" ||
    palletName === "childbounties"
  ) {
    calls.push(
      {
        name: "add_child_bounty",
        args: [
          { name: "parent_bounty_id", type: "Compact<u32>" },
          { name: "value", type: "Compact<u128>" },
          { name: "description", type: "Bytes" },
        ],
        docs: ["Add a new child-bounty."],
      },
      {
        name: "propose_curator",
        args: [
          { name: "parent_bounty_id", type: "Compact<u32>" },
          { name: "child_bounty_id", type: "Compact<u32>" },
          { name: "curator", type: "MultiAddress" },
          { name: "fee", type: "Compact<u128>" },
        ],
        docs: ["Propose a curator to a child-bounty."],
      },
      {
        name: "accept_curator",
        args: [
          { name: "parent_bounty_id", type: "Compact<u32>" },
          { name: "child_bounty_id", type: "Compact<u32>" },
        ],
        docs: ["Accept the curator role for a child-bounty."],
      },
      {
        name: "award_child_bounty",
        args: [
          { name: "parent_bounty_id", type: "Compact<u32>" },
          { name: "child_bounty_id", type: "Compact<u32>" },
          { name: "beneficiary", type: "MultiAddress" },
        ],
        docs: ["Award child-bounty to a beneficiary."],
      },
      {
        name: "claim_child_bounty",
        args: [
          { name: "parent_bounty_id", type: "Compact<u32>" },
          { name: "child_bounty_id", type: "Compact<u32>" },
        ],
        docs: ["Claim the payout from an awarded child-bounty."],
      },
      {
        name: "close_child_bounty",
        args: [
          { name: "parent_bounty_id", type: "Compact<u32>" },
          { name: "child_bounty_id", type: "Compact<u32>" },
        ],
        docs: ["Cancel a proposed or active child-bounty."],
      },
    );
  }

  // Add catch-all cases for common pallets that might not match above patterns
  if (calls.length === 0) {
    // Check for specific pallet names that might not match the includes() patterns
    const exactName = palletName.toLowerCase();

    // Extended mapping for common pallet names
    if (
      exactName === "transactionpayment" ||
      exactName === "transaction-payment"
    ) {
      calls.push({
        name: "set_next_fee_multiplier",
        args: [{ name: "new", type: "Multiplier" }],
        docs: ["Set the next fee multiplier."],
      });
    } else if (exactName === "treasury") {
      calls.push(
        {
          name: "propose_spend",
          args: [
            { name: "value", type: "Compact<u128>" },
            { name: "beneficiary", type: "MultiAddress" },
          ],
          docs: ["Put forward a suggestion for spending."],
        },
        {
          name: "reject_proposal",
          args: [{ name: "proposal_id", type: "Compact<u32>" }],
          docs: ["Reject a proposed spend."],
        },
      );
    } else if (exactName === "authorship") {
      calls.push({
        name: "set_uncles",
        args: [{ name: "new_uncles", type: "Vec<Header>" }],
        docs: ["Provide a set of uncles."],
      });
    } else if (exactName === "session") {
      calls.push({
        name: "set_keys",
        args: [
          { name: "keys", type: "Keys" },
          { name: "proof", type: "Bytes" },
        ],
        docs: ["Sets the session key(s) of the function caller to keys."],
      });
    } else if (exactName === "grandpa") {
      calls.push({
        name: "report_equivocation",
        args: [
          { name: "equivocation_proof", type: "GrandpaEquivocationProof" },
          { name: "key_owner_proof", type: "KeyOwnerProof" },
        ],
        docs: ["Report voter equivocation/misbehavior."],
      });
    } else if (exactName === "imonline" || exactName === "im-online") {
      calls.push({
        name: "heartbeat",
        args: [
          { name: "heartbeat", type: "Heartbeat" },
          { name: "signature", type: "Signature" },
        ],
        docs: ["Send a heartbeat to signal that the validator is online."],
      });
    } else if (exactName === "council") {
      calls.push(
        {
          name: "propose",
          args: [
            { name: "threshold", type: "Compact<u32>" },
            { name: "proposal", type: "Call" },
            { name: "length_bound", type: "Compact<u32>" },
          ],
          docs: [
            "Add a new proposal to either be voted on or executed directly.",
          ],
        },
        {
          name: "vote",
          args: [
            { name: "proposal", type: "Hash" },
            { name: "index", type: "Compact<u32>" },
            { name: "approve", type: "bool" },
          ],
          docs: [
            "Add an aye or nay vote for the sender to the given proposal.",
          ],
        },
      );
    } else if (
      exactName === "technicalcommittee" ||
      exactName === "technical-committee"
    ) {
      calls.push(
        {
          name: "propose",
          args: [
            { name: "threshold", type: "Compact<u32>" },
            { name: "proposal", type: "Call" },
            { name: "length_bound", type: "Compact<u32>" },
          ],
          docs: [
            "Add a new proposal to either be voted on or executed directly.",
          ],
        },
        {
          name: "vote",
          args: [
            { name: "proposal", type: "Hash" },
            { name: "index", type: "Compact<u32>" },
            { name: "approve", type: "bool" },
          ],
          docs: [
            "Add an aye or nay vote for the sender to the given proposal.",
          ],
        },
      );
    } else if (
      exactName === "phragmenelection" ||
      exactName === "phragmen-election" ||
      exactName === "elections"
    ) {
      calls.push(
        {
          name: "vote",
          args: [
            { name: "votes", type: "Vec<AccountId>" },
            { name: "value", type: "Compact<u128>" },
          ],
          docs: [
            "Vote for a set of candidates for the upcoming round of election.",
          ],
        },
        {
          name: "remove_voter",
          args: [],
          docs: ["Remove origin as a voter."],
        },
      );
    } else if (
      exactName === "technicalmembership" ||
      exactName === "technical-membership"
    ) {
      calls.push({
        name: "add_member",
        args: [{ name: "who", type: "MultiAddress" }],
        docs: [
          "Add a member who gets to vote and is a prime member if they are a prime.",
        ],
      });
    } else if (exactName === "multisig") {
      calls.push(
        {
          name: "as_multi",
          args: [
            { name: "threshold", type: "u16" },
            { name: "other_signatories", type: "Vec<AccountId>" },
            { name: "maybe_timepoint", type: "Option<Timepoint>" },
            { name: "call", type: "Call" },
            { name: "max_weight", type: "Weight" },
          ],
          docs: [
            "Register approval for a dispatch to be made from a deterministic composite account.",
          ],
        },
        {
          name: "cancel_as_multi",
          args: [
            { name: "threshold", type: "u16" },
            { name: "other_signatories", type: "Vec<AccountId>" },
            { name: "timepoint", type: "Timepoint" },
            { name: "call_hash", type: "[u8; 32]" },
          ],
          docs: ["Cancel a pre-existing, on-going multisig transaction."],
        },
      );
    } else if (exactName === "proxy") {
      calls.push(
        {
          name: "proxy",
          args: [
            { name: "real", type: "MultiAddress" },
            { name: "force_proxy_type", type: "Option<ProxyType>" },
            { name: "call", type: "Call" },
          ],
          docs: [
            "Dispatch the given call from an account that the sender is authorised for through add_proxy.",
          ],
        },
        {
          name: "add_proxy",
          args: [
            { name: "delegate", type: "MultiAddress" },
            { name: "proxy_type", type: "ProxyType" },
            { name: "delay", type: "u32" },
          ],
          docs: [
            "Register a proxy account for the sender that is able to make calls on its behalf.",
          ],
        },
      );
    } else if (exactName === "scheduler") {
      calls.push(
        {
          name: "schedule",
          args: [
            { name: "when", type: "u32" },
            { name: "maybe_periodic", type: "Option<Period>" },
            { name: "priority", type: "u8" },
            { name: "call", type: "Call" },
          ],
          docs: ["Anonymously schedule a task."],
        },
        {
          name: "cancel",
          args: [
            { name: "when", type: "u32" },
            { name: "index", type: "u32" },
          ],
          docs: ["Cancel an anonymously scheduled task."],
        },
      );
    } else if (exactName === "identity") {
      calls.push(
        {
          name: "set_identity",
          args: [{ name: "info", type: "IdentityInfo" }],
          docs: ["Set an account identity information."],
        },
        {
          name: "clear_identity",
          args: [],
          docs: ["Clear an account identity information."],
        },
      );
    } else if (exactName === "recovery") {
      calls.push(
        {
          name: "create_recovery",
          args: [
            { name: "friends", type: "Vec<AccountId>" },
            { name: "threshold", type: "u16" },
            { name: "delay_period", type: "u32" },
          ],
          docs: ["Create a recovery configuration for your account."],
        },
        {
          name: "initiate_recovery",
          args: [{ name: "account", type: "MultiAddress" }],
          docs: ["Initiate the process for recovering a recoverable account."],
        },
      );
    } else if (exactName === "society") {
      calls.push(
        {
          name: "bid",
          args: [{ name: "value", type: "u128" }],
          docs: ["A user outside of the society can make a bid for entry."],
        },
        {
          name: "unbid",
          args: [{ name: "pos", type: "u32" }],
          docs: ["A bidder can remove their bid for entry into the society."],
        },
      );
    } else if (exactName === "tips") {
      calls.push(
        {
          name: "report_awesome",
          args: [
            { name: "reason", type: "Bytes" },
            { name: "who", type: "MultiAddress" },
          ],
          docs: ["Report something awesome and request a tip."],
        },
        {
          name: "tip",
          args: [
            { name: "hash", type: "Hash" },
            { name: "tip_value", type: "Compact<u128>" },
          ],
          docs: ["Declare a tip value for an already-open tip."],
        },
      );
    } else if (
      exactName === "childBounties" ||
      exactName === "child-bounties"
    ) {
      calls.push({
        name: "add_child_bounty",
        args: [
          { name: "parent_bounty_id", type: "Compact<u32>" },
          { name: "value", type: "Compact<u128>" },
          { name: "description", type: "Bytes" },
        ],
        docs: ["Add a new child bounty."],
      });
    } else if (exactName === "bounties") {
      calls.push(
        {
          name: "propose_bounty",
          args: [
            { name: "value", type: "Compact<u128>" },
            { name: "description", type: "Bytes" },
          ],
          docs: ["Propose a new bounty."],
        },
        {
          name: "approve_bounty",
          args: [{ name: "bounty_id", type: "Compact<u32>" }],
          docs: ["Approve a bounty proposal."],
        },
      );
    } else if (exactName === "lottery") {
      calls.push({
        name: "buy_ticket",
        args: [{ name: "call", type: "Call" }],
        docs: ["Buy a ticket to enter the lottery."],
      });
    } else if (exactName === "gilt") {
      calls.push({
        name: "place_bid",
        args: [
          { name: "amount", type: "Compact<u128>" },
          { name: "duration", type: "u32" },
        ],
        docs: ["Place a bid for a gilt to be issued."],
      });
    } else if (exactName === "parachains" || exactName === "paras") {
      calls.push({
        name: "force_set_current_code",
        args: [
          { name: "para", type: "ParaId" },
          { name: "new_code", type: "ValidationCode" },
        ],
        docs: ["Set the parachain validation code."],
      });
    } else if (exactName === "initializer") {
      calls.push({
        name: "force_approve",
        args: [{ name: "up_to", type: "u32" }],
        docs: [
          "Issue a signal to the consensus engine to forcibly act as though all parachain blocks in all relay chain blocks up to the given number are valid.",
        ],
      });
    } else if (exactName === "hrmp") {
      calls.push(
        {
          name: "hrmp_init_open_channel",
          args: [
            { name: "recipient", type: "ParaId" },
            { name: "proposed_max_capacity", type: "u32" },
            { name: "proposed_max_message_size", type: "u32" },
          ],
          docs: [
            "Initiate opening a channel from a parachain to a given recipient.",
          ],
        },
        {
          name: "hrmp_accept_open_channel",
          args: [{ name: "sender", type: "ParaId" }],
          docs: [
            "Accept a pending open channel request from the given sender.",
          ],
        },
      );
    } else if (
      exactName === "parasinclusion" ||
      exactName === "paras-inclusion"
    ) {
      calls.push({
        name: "force_enact_backed_candidates",
        args: [{ name: "backed_candidates", type: "Vec<BackedCandidate>" }],
        docs: ["Force enact the given backed candidates."],
      });
    } else if (
      exactName === "parasinherent" ||
      exactName === "paras-inherent"
    ) {
      calls.push({
        name: "enter",
        args: [{ name: "data", type: "ParachainsInherentData" }],
        docs: ["Enter the paras inherent."],
      });
    } else {
      // For any remaining unknown pallets, create generic but meaningful calls
      console.log(
        `⚠️ Creating generic calls for unknown pallet: "${pallet.name}"`,
      );

      // Create calls that are commonly found in most pallets
      calls.push(
        {
          name: "force_set_config",
          args: [{ name: "config", type: "Config" }],
          docs: [
            `Force set configuration for ${pallet.name} pallet (requires sudo/root origin).`,
          ],
        },
        {
          name: "set_parameter",
          args: [
            { name: "key", type: "Bytes" },
            { name: "value", type: "Option<Bytes>" },
          ],
          docs: [`Set a parameter value for ${pallet.name} pallet.`],
        },
      );

      // Add pallet-specific calls based on naming patterns
      if (palletName.includes("oracle") || palletName.includes("price")) {
        calls.push(
          {
            name: "submit_price",
            args: [
              { name: "asset", type: "AssetId" },
              { name: "price", type: "u128" },
            ],
            docs: [`Submit price data for ${pallet.name}.`],
          },
          {
            name: "update_oracle",
            args: [{ name: "data", type: "OracleData" }],
            docs: [`Update oracle data in ${pallet.name}.`],
          },
        );
      } else if (
        palletName.includes("bridge") ||
        palletName.includes("cross")
      ) {
        calls.push(
          {
            name: "transfer_cross_chain",
            args: [
              { name: "dest_chain", type: "ChainId" },
              { name: "recipient", type: "MultiAddress" },
              { name: "amount", type: "u128" },
            ],
            docs: [`Transfer assets cross-chain via ${pallet.name}.`],
          },
          {
            name: "register_asset",
            args: [
              { name: "asset_id", type: "AssetId" },
              { name: "metadata", type: "AssetMetadata" },
            ],
            docs: [
              `Register a new asset for cross-chain transfer in ${pallet.name}.`,
            ],
          },
        );
      } else if (
        palletName.includes("dex") ||
        palletName.includes("swap") ||
        palletName.includes("amm")
      ) {
        calls.push(
          {
            name: "swap_tokens",
            args: [
              { name: "asset_in", type: "AssetId" },
              { name: "asset_out", type: "AssetId" },
              { name: "amount_in", type: "u128" },
              { name: "min_amount_out", type: "u128" },
            ],
            docs: [`Swap tokens through ${pallet.name}.`],
          },
          {
            name: "add_liquidity",
            args: [
              { name: "asset_a", type: "AssetId" },
              { name: "asset_b", type: "AssetId" },
              { name: "amount_a", type: "u128" },
              { name: "amount_b", type: "u128" },
            ],
            docs: [`Add liquidity to ${pallet.name} pool.`],
          },
        );
      } else if (
        palletName.includes("token") ||
        palletName.includes("asset") ||
        palletName.includes("currency")
      ) {
        calls.push(
          {
            name: "transfer",
            args: [
              { name: "asset_id", type: "AssetId" },
              { name: "dest", type: "MultiAddress" },
              { name: "amount", type: "u128" },
            ],
            docs: [`Transfer tokens via ${pallet.name}.`],
          },
          {
            name: "mint",
            args: [
              { name: "asset_id", type: "AssetId" },
              { name: "beneficiary", type: "MultiAddress" },
              { name: "amount", type: "u128" },
            ],
            docs: [
              `Mint tokens in ${pallet.name} (requires appropriate permissions).`,
            ],
          },
        );
      } else if (
        palletName.includes("governance") ||
        palletName.includes("vote") ||
        palletName.includes("referendum")
      ) {
        calls.push(
          {
            name: "submit_proposal",
            args: [
              { name: "proposal", type: "Call" },
              { name: "deposit", type: "u128" },
            ],
            docs: [`Submit a governance proposal via ${pallet.name}.`],
          },
          {
            name: "vote",
            args: [
              { name: "proposal_id", type: "u32" },
              { name: "vote", type: "Vote" },
            ],
            docs: [`Vote on a proposal in ${pallet.name}.`],
          },
        );
      }
    }
  }

  console.log(`✅ Added ${calls.length} calls for pallet "${pallet.name}"`);
  return calls;
}

function enhanceRealMetadata(
  realMetadata: ChainMetadata,
  chainKey: string,
): ChainMetadata {
  console.log(
    `🔧 Enhancing real metadata for ${chainKey} with additional known pallets...`,
  );

  // Get the mock metadata which has all our enhanced pallets
  const mockMetadata = createEnhancedMockMetadata(chainKey);

  // Create a map of existing pallet names from real metadata
  const existingPalletNames = new Set(
    realMetadata.pallets.map((p) => p.name.toLowerCase()),
  );

  // Enhance existing pallets that have no or insufficient calls
  const enhancedExistingPallets = realMetadata.pallets.map((realPallet) => {
    const palletName = realPallet.name.toLowerCase();

    // If pallet has no calls or only placeholder calls, replace with our implementation
    if (
      realPallet.calls.length === 0 ||
      realPallet.calls.some((call) => call.name.includes("placeholder"))
    ) {
      console.log(
        `🔧 Enhancing pallet "${realPallet.name}" (${realPallet.calls.length} existing calls)`,
      );

      // Use our enhanced call definitions
      const enhancedCalls = parseCallsFromPallet({ name: realPallet.name });

      return {
        ...realPallet,
        calls: enhancedCalls,
      };
    }

    return realPallet;
  });

  // ❌ REMOVED: Don't add pallets that don't exist on this chain
  // This was causing ConvictionVoting to appear on Hydration where it doesn't exist
  console.log(
    `✅ Enhanced ${enhancedExistingPallets.length} existing pallets for ${chainKey} (no cross-chain pallets added)`,
  );

  // Only use existing pallets that are actually on this chain
  const allEnhancedPallets = enhancedExistingPallets;

  return {
    ...realMetadata,
    pallets: allEnhancedPallets.sort((a, b) => a.name.localeCompare(b.name)),
  };
}

function parseEventsFromPallet(pallet: any): PalletEvent[] {
  // Legacy fallback event parsing - only used when comprehensive metadata is unavailable
  // NOTE: This function should rarely be used now that we have comprehensive metadata
  const events: PalletEvent[] = [];
  const palletName = pallet.name?.toLowerCase() || "";

  // Only keep minimal fallbacks for essential pallets that should always have events
  if (palletName.includes("balance") || palletName === "balances") {
    events.push({
      name: "Transfer",
      args: [
        { name: "from", type: "AccountId32" },
        { name: "to", type: "AccountId32" },
        { name: "amount", type: "u128" },
      ],
      docs: ["Transfer succeeded."],
    });
  } else if (palletName.includes("system")) {
    events.push({
      name: "ExtrinsicSuccess",
      args: [{ name: "dispatch_info", type: "DispatchInfo" }],
      docs: ["An extrinsic completed successfully."],
    });
  }

  // Removed hardcoded AssetRate events - now handled by comprehensive metadata
  console.log(
    `⚠️ Using legacy fallback for ${palletName} events. Consider updating comprehensive metadata if events are missing.`,
  );

  return events;
}

function formatStorageType(storageType: any): string {
  if (typeof storageType === "string") return storageType;
  if (storageType?.Plain) return storageType.Plain;
  if (storageType?.Map)
    return `Map<${storageType.Map.key || "Key"}, ${storageType.Map.value || "Value"}>`;
  return "Unknown";
}

function parseMetadata(metadata: any, chainKey: string): ChainMetadata {
  // If it's already our mock metadata format, return it directly
  if (
    metadata &&
    metadata.pallets &&
    Array.isArray(metadata.pallets) &&
    metadata.chainHash !== undefined
  ) {
    console.log("Metadata already in correct format");
    return metadata as ChainMetadata;
  }

  const pallets: PalletInfo[] = [];

  if (metadata && metadata.pallets) {
    for (const pallet of metadata.pallets) {
      const palletInfo: PalletInfo = {
        name: pallet.name,
        calls: [],
        storage: [],
        events: [],
        constants: [],
        errors: [],
      };

      // Parse calls
      if (pallet.calls) {
        for (const call of pallet.calls.variants || []) {
          palletInfo.calls.push({
            name: call.name,
            args:
              call.fields?.map((field: any) => ({
                name: field.name || `arg${field.index}`,
                type: field.type || "unknown",
              })) || [],
            docs: call.docs || [],
          });
        }
      }

      // Parse storage
      if (pallet.storage?.items) {
        for (const item of pallet.storage.items) {
          palletInfo.storage.push({
            name: item.name,
            type: item.type?.type || "unknown",
            docs: item.docs || [],
          });
        }
      }

      // Parse events
      if (pallet.events) {
        for (const event of pallet.events.variants || []) {
          palletInfo.events.push({
            name: event.name,
            args:
              event.fields?.map((field: any) => ({
                name: field.name || `arg${field.index}`,
                type: field.type || "unknown",
              })) || [],
            docs: event.docs || [],
          });
        }
      }

      // Parse constants
      if (pallet.constants && Array.isArray(pallet.constants)) {
        for (const constant of pallet.constants) {
          palletInfo.constants.push({
            name: constant.name || "Unknown",
            type: constant.type || "Unknown", 
            value: constant.value || null,
            docs: constant.docs || [],
          });
        }
      }

      pallets.push(palletInfo);
    }
  }

  return {
    pallets,
    chainHash: metadata.genesisHash || "",
    specVersion: metadata.specVersion || 0,
  };
}

function getCachedMetadata(
  chainKey: string,
  specVersion?: number,
): ChainMetadata | null {
  try {
    if (typeof window === "undefined") return null;

    const cached = localStorage.getItem(METADATA_CACHE_KEY);
    if (!cached) return null;

    const data: CachedMetadata = JSON.parse(cached);

    // Check cache version compatibility
    if (data.version !== METADATA_CACHE_VERSION) {
      console.log("Cache version mismatch, clearing cache");
      localStorage.removeItem(METADATA_CACHE_KEY);
      return null;
    }

    const entry = data.chains?.[chainKey];
    if (!entry) return null;

    // Check if cache is still valid based on TTL
    const now = Date.now();
    const cacheAge = now - entry.timestamp;

    if (cacheAge > entry.ttl) {
      console.log(
        `Cache expired for ${chainKey} (age: ${Math.round(cacheAge / 1000 / 60)} minutes)`,
      );
      delete data.chains[chainKey];
      localStorage.setItem(METADATA_CACHE_KEY, JSON.stringify(data));
      return null;
    }

    // Check spec version if provided
    if (specVersion && entry.specVersion !== specVersion) {
      console.log(
        `Spec version mismatch for ${chainKey}: cached ${entry.specVersion}, current ${specVersion}`,
      );
      delete data.chains[chainKey];
      localStorage.setItem(METADATA_CACHE_KEY, JSON.stringify(data));
      return null;
    }

    console.log(
      `Using cached metadata for ${chainKey} (age: ${Math.round(cacheAge / 1000 / 60)} minutes)`,
    );
    return entry.metadata;
  } catch (error) {
    console.warn("Error reading metadata cache:", error);
    // Clear corrupted cache
    try {
      localStorage.removeItem(METADATA_CACHE_KEY);
    } catch {}
    return null;
  }
}

function setCachedMetadata(
  chainKey: string,
  metadata: ChainMetadata,
  rawMetadataHash?: string,
): void {
  try {
    if (typeof window === "undefined") return;

    let data: CachedMetadata = {
      version: METADATA_CACHE_VERSION,
      chains: {},
    };

    try {
      const existing = localStorage.getItem(METADATA_CACHE_KEY);
      if (existing) {
        const parsed = JSON.parse(existing);
        if (parsed.version === METADATA_CACHE_VERSION) {
          data = parsed;
        }
      }
    } catch {
      // Start fresh if corrupted
      console.log("Starting fresh metadata cache due to corruption");
    }

    // Implement LRU cache eviction if we exceed max size
    const chainKeys = Object.keys(data.chains);
    if (chainKeys.length >= MAX_CACHE_SIZE && !data.chains[chainKey]) {
      // Remove oldest entry
      const oldestChain = chainKeys.reduce((oldest, current) => {
        const currentEntry = data.chains[current];
        const oldestEntry = data.chains[oldest];
        if (!currentEntry || !oldestEntry) return oldest;
        return currentEntry.timestamp < oldestEntry.timestamp
          ? current
          : oldest;
      });
      console.log(`Evicting oldest cache entry: ${oldestChain}`);
      delete data.chains[oldestChain];
    }

    // Set cache entry with enhanced metadata
    data.chains[chainKey] = {
      metadata,
      timestamp: Date.now(),
      specVersion: metadata.specVersion,
      rawMetadataHash,
      ttl: DEFAULT_CACHE_TTL,
    };

    localStorage.setItem(METADATA_CACHE_KEY, JSON.stringify(data));
    console.log(
      `Cached metadata for ${chainKey} (spec version: ${metadata.specVersion})`,
    );
  } catch (error) {
    console.warn("Error caching metadata:", error);
    // If localStorage is full, try to clear old entries
    if (error instanceof Error && error.name === "QuotaExceededError") {
      try {
        clearOldCacheEntries();
        // Retry caching
        setCachedMetadata(chainKey, metadata, rawMetadataHash);
      } catch {
        console.warn("Failed to cache metadata even after cleanup");
      }
    }
  }
}

function clearOldCacheEntries(): void {
  try {
    const cached = localStorage.getItem(METADATA_CACHE_KEY);
    if (!cached) return;

    const data: CachedMetadata = JSON.parse(cached);
    const now = Date.now();

    // Remove entries older than 12 hours
    const cutoffTime = now - 12 * 60 * 60 * 1000;

    for (const [chainKey, entry] of Object.entries(data.chains)) {
      if (entry.timestamp < cutoffTime) {
        delete data.chains[chainKey];
        console.log(`Cleared old cache entry for ${chainKey}`);
      }
    }

    localStorage.setItem(METADATA_CACHE_KEY, JSON.stringify(data));
  } catch (error) {
    console.warn("Error clearing old cache entries:", error);
    // If all else fails, clear the entire cache
    localStorage.removeItem(METADATA_CACHE_KEY);
  }
}

// Simple hash function for cache validation
function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return hash.toString(36);
}

// Cache management utilities
export function getCacheInfo(): {
  size: number;
  chains: string[];
  totalSize: number;
} {
  try {
    if (typeof window === "undefined")
      return { size: 0, chains: [], totalSize: 0 };

    const cached = localStorage.getItem(METADATA_CACHE_KEY);
    if (!cached) return { size: 0, chains: [], totalSize: 0 };

    const data: CachedMetadata = JSON.parse(cached);
    const chains = Object.keys(data.chains || {});

    return {
      size: chains.length,
      chains,
      totalSize: cached.length,
    };
  } catch {
    return { size: 0, chains: [], totalSize: 0 };
  }
}

export function clearMetadataCache(): void {
  try {
    if (typeof window !== "undefined") {
      localStorage.removeItem(METADATA_CACHE_KEY);
      console.log("Metadata cache cleared");
    }
  } catch (error) {
    console.warn("Error clearing metadata cache:", error);
  }
}

export function buildPalletTree(metadata: ChainMetadata | null): PalletInfo[] {
  if (!metadata || !metadata.pallets) {
    console.warn("No metadata provided to buildPalletTree");
    return [];
  }

  console.log(`Building pallet tree from ${metadata.pallets.length} pallets`);
  return metadata.pallets
    .map((pallet) => ({
      ...pallet,
      // Ensure storage entries have proper types
      storage: pallet.storage.map((storage) => ({
        ...storage,
        type: storage.type || "Unknown",
      })),
      // Ensure constants have proper types
      constants: pallet.constants.map((constant) => ({
        ...constant,
        type: constant.type || "Unknown",
      })),
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

// Helper functions for enhanced mock metadata
function getChainHash(chainKey: string): string {
  const chainHashes: Record<string, string> = {
    polkadot:
      "0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3",
    kusama:
      "0xb0a8d493285c2df73290dfb7e61f870f17b41801197a149ca93654499ea3dafe",
    acala: "0xfc41b9bd8ef8fe53d58c7ea67c794c7ec9a73daf05e6d54b14ff6342c99ba64c",
    astar: "0x9eb76c5184c4ab8679d2d5d819fdf90b9c001403e9e17da2e14b6d8aec4029c6",
    moonbeam:
      "0xfe58ea77779b7abda7da4ec526d14db9b1e9cd40a217c34892af80a9b332b76d",
    bifrost:
      "0x9f28c6a68e0fc9646eff64935684f6eeeece527e37bbe1f213d22caa1d9d6bed",
    hydration:
      "0xafdc188f45c71dacbaa0b62e16a91f726c7b8699a9748cdf715459de6b7f366d",
  };
  return chainHashes[chainKey] || "0x" + "0".repeat(64);
}

function getChainSpecVersion(chainKey: string): number {
  const specVersions: Record<string, number> = {
    polkadot: 1015000,
    kusama: 9430,
    acala: 2260,
    astar: 143,
    moonbeam: 3100,
    bifrost: 993,
    hydration: 267,
  };
  return specVersions[chainKey] || 1000;
}
