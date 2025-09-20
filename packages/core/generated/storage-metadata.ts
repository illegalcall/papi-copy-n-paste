/**
 * Auto-generated storage metadata from PAPI descriptors
 * Generated on: 2025-09-20T09:49:49.979Z
 */

export interface StorageParameterInfo {
  required: string[];
  optional: string[];
  description?: string;
  returnType?: string;
}

export interface ChainStorageMetadata {
  pallets: {
    [pallet: string]: {
      [storage: string]: StorageParameterInfo;
    };
  };
}

export const storageMetadata: { [chainKey: string]: ChainStorageMetadata } = {
  "astar": {
    "pallets": {
      "System": {
        "Account": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Account",
          "returnType": "unknown"
        },
        "ExtrinsicCount": {
          "required": [],
          "optional": [],
          "description": "Storage item ExtrinsicCount",
          "returnType": "number"
        },
        "InherentsApplied": {
          "required": [],
          "optional": [],
          "description": "Storage item InherentsApplied",
          "returnType": "boolean"
        },
        "BlockWeight": {
          "required": [],
          "optional": [],
          "description": "Storage item BlockWeight",
          "returnType": "unknown"
        },
        "AllExtrinsicsLen": {
          "required": [],
          "optional": [],
          "description": "Storage item AllExtrinsicsLen",
          "returnType": "number"
        },
        "BlockHash": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item BlockHash",
          "returnType": "Hash"
        },
        "ExtrinsicData": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item ExtrinsicData",
          "returnType": "Uint8Array"
        },
        "Number": {
          "required": [],
          "optional": [],
          "description": "Storage item Number",
          "returnType": "number"
        },
        "ParentHash": {
          "required": [],
          "optional": [],
          "description": "Storage item ParentHash",
          "returnType": "Hash"
        },
        "Digest": {
          "required": [],
          "optional": [],
          "description": "Storage item Digest",
          "returnType": "unknown"
        },
        "Events": {
          "required": [],
          "optional": [],
          "description": "Storage item Events",
          "returnType": "unknown"
        },
        "EventCount": {
          "required": [],
          "optional": [],
          "description": "Storage item EventCount",
          "returnType": "number"
        },
        "EventTopics": {
          "required": [
            "Hash"
          ],
          "optional": [],
          "description": "Storage item EventTopics",
          "returnType": "unknown"
        },
        "LastRuntimeUpgrade": {
          "required": [],
          "optional": [],
          "description": "Storage item LastRuntimeUpgrade",
          "returnType": "unknown"
        },
        "UpgradedToU32RefCount": {
          "required": [],
          "optional": [],
          "description": "Storage item UpgradedToU32RefCount",
          "returnType": "boolean"
        },
        "UpgradedToTripleRefCount": {
          "required": [],
          "optional": [],
          "description": "Storage item UpgradedToTripleRefCount",
          "returnType": "boolean"
        },
        "ExecutionPhase": {
          "required": [],
          "optional": [],
          "description": "Storage item ExecutionPhase",
          "returnType": "Phase"
        },
        "AuthorizedUpgrade": {
          "required": [],
          "optional": [],
          "description": "Storage item AuthorizedUpgrade",
          "returnType": "unknown"
        }
      },
      "Identity": {
        "IdentityOf": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item IdentityOf",
          "returnType": "unknown"
        },
        "UsernameOf": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item UsernameOf",
          "returnType": "Uint8Array"
        },
        "SuperOf": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item SuperOf",
          "returnType": "unknown"
        },
        "SubsOf": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item SubsOf",
          "returnType": "unknown"
        },
        "Registrars": {
          "required": [],
          "optional": [],
          "description": "Storage item Registrars",
          "returnType": "unknown"
        },
        "AuthorityOf": {
          "required": [
            "bytes"
          ],
          "optional": [],
          "description": "Storage item AuthorityOf",
          "returnType": "unknown"
        },
        "UsernameInfoOf": {
          "required": [
            "bytes"
          ],
          "optional": [],
          "description": "Storage item UsernameInfoOf",
          "returnType": "unknown"
        },
        "PendingUsernames": {
          "required": [
            "bytes"
          ],
          "optional": [],
          "description": "Storage item PendingUsernames",
          "returnType": "unknown"
        },
        "UnbindingUsernames": {
          "required": [
            "bytes"
          ],
          "optional": [],
          "description": "Storage item UnbindingUsernames",
          "returnType": "number"
        }
      },
      "Timestamp": {
        "Now": {
          "required": [],
          "optional": [],
          "description": "Storage item Now",
          "returnType": "bigint"
        },
        "DidUpdate": {
          "required": [],
          "optional": [],
          "description": "Storage item DidUpdate",
          "returnType": "boolean"
        }
      },
      "Multisig": {
        "Multisigs": {
          "required": [],
          "optional": [],
          "description": "Storage item Multisigs",
          "returnType": "unknown"
        }
      },
      "Proxy": {
        "Proxies": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Proxies",
          "returnType": "unknown"
        },
        "Announcements": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Announcements",
          "returnType": "unknown"
        }
      },
      "Scheduler": {
        "IncompleteSince": {
          "required": [],
          "optional": [],
          "description": "Storage item IncompleteSince",
          "returnType": "number"
        },
        "Agenda": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item Agenda",
          "returnType": "unknown"
        },
        "Retries": {
          "required": [
            "Anonymize_I9jd27rnpm8ttv_"
          ],
          "optional": [],
          "description": "Storage item Retries",
          "returnType": "unknown"
        },
        "Lookup": {
          "required": [
            "Hash"
          ],
          "optional": [],
          "description": "Storage item Lookup",
          "returnType": "unknown"
        }
      },
      "ParachainSystem": {
        "UnincludedSegment": {
          "required": [],
          "optional": [],
          "description": "Storage item UnincludedSegment",
          "returnType": "unknown"
        },
        "AggregatedUnincludedSegment": {
          "required": [],
          "optional": [],
          "description": "Storage item AggregatedUnincludedSegment",
          "returnType": "unknown"
        },
        "PendingValidationCode": {
          "required": [],
          "optional": [],
          "description": "Storage item PendingValidationCode",
          "returnType": "Uint8Array"
        },
        "NewValidationCode": {
          "required": [],
          "optional": [],
          "description": "Storage item NewValidationCode",
          "returnType": "Uint8Array"
        },
        "ValidationData": {
          "required": [],
          "optional": [],
          "description": "Storage item ValidationData",
          "returnType": "unknown"
        },
        "DidSetValidationCode": {
          "required": [],
          "optional": [],
          "description": "Storage item DidSetValidationCode",
          "returnType": "boolean"
        },
        "LastRelayChainBlockNumber": {
          "required": [],
          "optional": [],
          "description": "Storage item LastRelayChainBlockNumber",
          "returnType": "number"
        },
        "UpgradeRestrictionSignal": {
          "required": [],
          "optional": [],
          "description": "Storage item UpgradeRestrictionSignal",
          "returnType": "unknown"
        },
        "UpgradeGoAhead": {
          "required": [],
          "optional": [],
          "description": "Storage item UpgradeGoAhead",
          "returnType": "unknown"
        },
        "RelayStateProof": {
          "required": [],
          "optional": [],
          "description": "Storage item RelayStateProof",
          "returnType": "unknown"
        },
        "RelevantMessagingState": {
          "required": [],
          "optional": [],
          "description": "Storage item RelevantMessagingState",
          "returnType": "unknown"
        },
        "HostConfiguration": {
          "required": [],
          "optional": [],
          "description": "Storage item HostConfiguration",
          "returnType": "unknown"
        },
        "LastDmqMqcHead": {
          "required": [],
          "optional": [],
          "description": "Storage item LastDmqMqcHead",
          "returnType": "Hash"
        },
        "LastHrmpMqcHeads": {
          "required": [],
          "optional": [],
          "description": "Storage item LastHrmpMqcHeads",
          "returnType": "unknown"
        },
        "ProcessedDownwardMessages": {
          "required": [],
          "optional": [],
          "description": "Storage item ProcessedDownwardMessages",
          "returnType": "number"
        },
        "HrmpWatermark": {
          "required": [],
          "optional": [],
          "description": "Storage item HrmpWatermark",
          "returnType": "number"
        },
        "HrmpOutboundMessages": {
          "required": [],
          "optional": [],
          "description": "Storage item HrmpOutboundMessages",
          "returnType": "unknown"
        },
        "UpwardMessages": {
          "required": [],
          "optional": [],
          "description": "Storage item UpwardMessages",
          "returnType": "unknown"
        },
        "PendingUpwardMessages": {
          "required": [],
          "optional": [],
          "description": "Storage item PendingUpwardMessages",
          "returnType": "unknown"
        },
        "UpwardDeliveryFeeFactor": {
          "required": [],
          "optional": [],
          "description": "Storage item UpwardDeliveryFeeFactor",
          "returnType": "bigint"
        },
        "AnnouncedHrmpMessagesPerCandidate": {
          "required": [],
          "optional": [],
          "description": "Storage item AnnouncedHrmpMessagesPerCandidate",
          "returnType": "number"
        },
        "ReservedXcmpWeightOverride": {
          "required": [],
          "optional": [],
          "description": "Storage item ReservedXcmpWeightOverride",
          "returnType": "unknown"
        },
        "ReservedDmpWeightOverride": {
          "required": [],
          "optional": [],
          "description": "Storage item ReservedDmpWeightOverride",
          "returnType": "unknown"
        },
        "CustomValidationHeadData": {
          "required": [],
          "optional": [],
          "description": "Storage item CustomValidationHeadData",
          "returnType": "Uint8Array"
        }
      },
      "ParachainInfo": {
        "ParachainId": {
          "required": [],
          "optional": [],
          "description": "Storage item ParachainId",
          "returnType": "number"
        }
      },
      "TransactionPayment": {
        "NextFeeMultiplier": {
          "required": [],
          "optional": [],
          "description": "Storage item NextFeeMultiplier",
          "returnType": "bigint"
        },
        "StorageVersion": {
          "required": [],
          "optional": [],
          "description": "Storage item StorageVersion",
          "returnType": "TransactionPaymentReleases"
        }
      },
      "Balances": {
        "TotalIssuance": {
          "required": [],
          "optional": [],
          "description": "Storage item TotalIssuance",
          "returnType": "bigint"
        },
        "InactiveIssuance": {
          "required": [],
          "optional": [],
          "description": "Storage item InactiveIssuance",
          "returnType": "bigint"
        },
        "Account": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Account",
          "returnType": "unknown"
        },
        "Locks": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Locks",
          "returnType": "unknown"
        },
        "Reserves": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Reserves",
          "returnType": "unknown"
        },
        "Holds": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Holds",
          "returnType": "unknown"
        },
        "Freezes": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Freezes",
          "returnType": "unknown"
        }
      },
      "Vesting": {
        "Vesting": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Vesting",
          "returnType": "unknown"
        },
        "StorageVersion": {
          "required": [],
          "optional": [],
          "description": "Storage item StorageVersion",
          "returnType": "Version"
        }
      },
      "Inflation": {
        "ActiveInflationConfig": {
          "required": [],
          "optional": [],
          "description": "Storage item ActiveInflationConfig",
          "returnType": "unknown"
        },
        "InflationParams": {
          "required": [],
          "optional": [],
          "description": "Storage item InflationParams",
          "returnType": "unknown"
        },
        "DoRecalculation": {
          "required": [],
          "optional": [],
          "description": "Storage item DoRecalculation",
          "returnType": "number"
        }
      },
      "DappStaking": {
        "ActiveProtocolState": {
          "required": [],
          "optional": [],
          "description": "Storage item ActiveProtocolState",
          "returnType": "unknown"
        },
        "NextDAppId": {
          "required": [],
          "optional": [],
          "description": "Storage item NextDAppId",
          "returnType": "number"
        },
        "IntegratedDApps": {
          "required": [
            "Anonymize_Iav11gpk2hk471_"
          ],
          "optional": [],
          "description": "Storage item IntegratedDApps",
          "returnType": "unknown"
        },
        "CounterForIntegratedDApps": {
          "required": [],
          "optional": [],
          "description": "Storage item CounterForIntegratedDApps",
          "returnType": "number"
        },
        "Ledger": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Ledger",
          "returnType": "unknown"
        },
        "StakerInfo": {
          "required": [],
          "optional": [],
          "description": "Storage item StakerInfo",
          "returnType": "unknown"
        },
        "ContractStake": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item ContractStake",
          "returnType": "unknown"
        },
        "CurrentEraInfo": {
          "required": [],
          "optional": [],
          "description": "Storage item CurrentEraInfo",
          "returnType": "unknown"
        },
        "EraRewards": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item EraRewards",
          "returnType": "unknown"
        },
        "PeriodEnd": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item PeriodEnd",
          "returnType": "unknown"
        },
        "StaticTierParams": {
          "required": [],
          "optional": [],
          "description": "Storage item StaticTierParams",
          "returnType": "unknown"
        },
        "TierConfig": {
          "required": [],
          "optional": [],
          "description": "Storage item TierConfig",
          "returnType": "unknown"
        },
        "DAppTiers": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item DAppTiers",
          "returnType": "unknown"
        },
        "HistoryCleanupMarker": {
          "required": [],
          "optional": [],
          "description": "Storage item HistoryCleanupMarker",
          "returnType": "unknown"
        },
        "Safeguard": {
          "required": [],
          "optional": [],
          "description": "Storage item Safeguard",
          "returnType": "boolean"
        }
      },
      "Assets": {
        "Asset": {
          "required": [
            "u64"
          ],
          "optional": [],
          "description": "Storage item Asset",
          "returnType": "unknown"
        },
        "Account": {
          "required": [
            "AssetId",
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Account",
          "returnType": "unknown"
        },
        "Approvals": {
          "required": [
            "AssetId",
            "AccountId",
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Approvals",
          "returnType": "unknown"
        },
        "Metadata": {
          "required": [
            "u64"
          ],
          "optional": [],
          "description": "Storage item Metadata",
          "returnType": "unknown"
        },
        "NextAssetId": {
          "required": [],
          "optional": [],
          "description": "Storage item NextAssetId",
          "returnType": "bigint"
        }
      },
      "PriceAggregator": {
        "CurrentBlockValues": {
          "required": [],
          "optional": [],
          "description": "Storage item CurrentBlockValues",
          "returnType": "unknown"
        },
        "IntermediateValueAggregator": {
          "required": [],
          "optional": [],
          "description": "Storage item IntermediateValueAggregator",
          "returnType": "unknown"
        },
        "ValuesCircularBuffer": {
          "required": [],
          "optional": [],
          "description": "Storage item ValuesCircularBuffer",
          "returnType": "unknown"
        }
      },
      "Oracle": {
        "RawValues": {
          "required": [],
          "optional": [],
          "description": "Storage item RawValues",
          "returnType": "unknown"
        },
        "Values": {
          "required": [
            "Anonymize_I4rgf5d3abfav5_"
          ],
          "optional": [],
          "description": "Storage item Values",
          "returnType": "unknown"
        },
        "HasDispatched": {
          "required": [],
          "optional": [],
          "description": "Storage item HasDispatched",
          "returnType": "unknown"
        }
      },
      "OracleMembership": {
        "Members": {
          "required": [],
          "optional": [],
          "description": "Storage item Members",
          "returnType": "unknown"
        },
        "Prime": {
          "required": [],
          "optional": [],
          "description": "Storage item Prime",
          "returnType": "string"
        }
      },
      "Authorship": {
        "Author": {
          "required": [],
          "optional": [],
          "description": "Storage item Author",
          "returnType": "string"
        }
      },
      "CollatorSelection": {
        "Invulnerables": {
          "required": [],
          "optional": [],
          "description": "Storage item Invulnerables",
          "returnType": "unknown"
        },
        "Candidates": {
          "required": [],
          "optional": [],
          "description": "Storage item Candidates",
          "returnType": "unknown"
        },
        "NonCandidates": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item NonCandidates",
          "returnType": "unknown"
        },
        "LastAuthoredBlock": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item LastAuthoredBlock",
          "returnType": "number"
        },
        "DesiredCandidates": {
          "required": [],
          "optional": [],
          "description": "Storage item DesiredCandidates",
          "returnType": "number"
        },
        "CandidacyBond": {
          "required": [],
          "optional": [],
          "description": "Storage item CandidacyBond",
          "returnType": "bigint"
        },
        "SlashDestination": {
          "required": [],
          "optional": [],
          "description": "Storage item SlashDestination",
          "returnType": "string"
        }
      },
      "Session": {
        "Validators": {
          "required": [],
          "optional": [],
          "description": "Storage item Validators",
          "returnType": "unknown"
        },
        "CurrentIndex": {
          "required": [],
          "optional": [],
          "description": "Storage item CurrentIndex",
          "returnType": "number"
        },
        "QueuedChanged": {
          "required": [],
          "optional": [],
          "description": "Storage item QueuedChanged",
          "returnType": "boolean"
        },
        "QueuedKeys": {
          "required": [],
          "optional": [],
          "description": "Storage item QueuedKeys",
          "returnType": "unknown"
        },
        "DisabledValidators": {
          "required": [],
          "optional": [],
          "description": "Storage item DisabledValidators",
          "returnType": "unknown"
        },
        "NextKeys": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item NextKeys",
          "returnType": "Hash"
        },
        "KeyOwner": {
          "required": [
            "Anonymize_I82jm9g7pufuel_"
          ],
          "optional": [],
          "description": "Storage item KeyOwner",
          "returnType": "string"
        }
      },
      "Aura": {
        "Authorities": {
          "required": [],
          "optional": [],
          "description": "Storage item Authorities",
          "returnType": "unknown"
        },
        "CurrentSlot": {
          "required": [],
          "optional": [],
          "description": "Storage item CurrentSlot",
          "returnType": "bigint"
        }
      },
      "AuraExt": {
        "Authorities": {
          "required": [],
          "optional": [],
          "description": "Storage item Authorities",
          "returnType": "unknown"
        },
        "SlotInfo": {
          "required": [],
          "optional": [],
          "description": "Storage item SlotInfo",
          "returnType": "unknown"
        }
      },
      "XcmpQueue": {
        "InboundXcmpSuspended": {
          "required": [],
          "optional": [],
          "description": "Storage item InboundXcmpSuspended",
          "returnType": "unknown"
        },
        "OutboundXcmpStatus": {
          "required": [],
          "optional": [],
          "description": "Storage item OutboundXcmpStatus",
          "returnType": "unknown"
        },
        "OutboundXcmpMessages": {
          "required": [],
          "optional": [],
          "description": "Storage item OutboundXcmpMessages",
          "returnType": "Uint8Array"
        },
        "SignalMessages": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item SignalMessages",
          "returnType": "Uint8Array"
        },
        "QueueConfig": {
          "required": [],
          "optional": [],
          "description": "Storage item QueueConfig",
          "returnType": "unknown"
        },
        "QueueSuspended": {
          "required": [],
          "optional": [],
          "description": "Storage item QueueSuspended",
          "returnType": "boolean"
        },
        "DeliveryFeeFactor": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item DeliveryFeeFactor",
          "returnType": "bigint"
        }
      },
      "PolkadotXcm": {
        "QueryCounter": {
          "required": [],
          "optional": [],
          "description": "Storage item QueryCounter",
          "returnType": "bigint"
        },
        "Queries": {
          "required": [
            "u64"
          ],
          "optional": [],
          "description": "Storage item Queries",
          "returnType": "unknown"
        },
        "AssetTraps": {
          "required": [
            "Hash"
          ],
          "optional": [],
          "description": "Storage item AssetTraps",
          "returnType": "number"
        },
        "SafeXcmVersion": {
          "required": [],
          "optional": [],
          "description": "Storage item SafeXcmVersion",
          "returnType": "number"
        },
        "SupportedVersion": {
          "required": [],
          "optional": [],
          "description": "Storage item SupportedVersion",
          "returnType": "number"
        },
        "VersionNotifiers": {
          "required": [],
          "optional": [],
          "description": "Storage item VersionNotifiers",
          "returnType": "bigint"
        },
        "VersionNotifyTargets": {
          "required": [],
          "optional": [],
          "description": "Storage item VersionNotifyTargets",
          "returnType": "unknown"
        },
        "VersionDiscoveryQueue": {
          "required": [],
          "optional": [],
          "description": "Storage item VersionDiscoveryQueue",
          "returnType": "unknown"
        },
        "CurrentMigration": {
          "required": [],
          "optional": [],
          "description": "Storage item CurrentMigration",
          "returnType": "XcmPalletVersionMigrationStage"
        },
        "RemoteLockedFungibles": {
          "required": [],
          "optional": [],
          "description": "Storage item RemoteLockedFungibles",
          "returnType": "unknown"
        },
        "LockedFungibles": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item LockedFungibles",
          "returnType": "unknown"
        },
        "XcmExecutionSuspended": {
          "required": [],
          "optional": [],
          "description": "Storage item XcmExecutionSuspended",
          "returnType": "boolean"
        },
        "ShouldRecordXcm": {
          "required": [],
          "optional": [],
          "description": "Storage item ShouldRecordXcm",
          "returnType": "boolean"
        },
        "RecordedXcm": {
          "required": [],
          "optional": [],
          "description": "Storage item RecordedXcm",
          "returnType": "unknown"
        }
      },
      "XcAssetConfig": {
        "AssetIdToLocation": {
          "required": [
            "u64"
          ],
          "optional": [],
          "description": "Storage item AssetIdToLocation",
          "returnType": "XcmVersionedLocation"
        },
        "AssetLocationToId": {
          "required": [
            "XcmVersionedLocation"
          ],
          "optional": [],
          "description": "Storage item AssetLocationToId",
          "returnType": "bigint"
        },
        "AssetLocationUnitsPerSecond": {
          "required": [
            "XcmVersionedLocation"
          ],
          "optional": [],
          "description": "Storage item AssetLocationUnitsPerSecond",
          "returnType": "bigint"
        }
      },
      "MessageQueue": {
        "BookStateFor": {
          "required": [
            "Anonymize_Iejeo53sea6n4q_"
          ],
          "optional": [],
          "description": "Storage item BookStateFor",
          "returnType": "unknown"
        },
        "ServiceHead": {
          "required": [],
          "optional": [],
          "description": "Storage item ServiceHead",
          "returnType": "unknown"
        },
        "Pages": {
          "required": [],
          "optional": [],
          "description": "Storage item Pages",
          "returnType": "unknown"
        }
      },
      "EVM": {
        "AccountCodes": {
          "required": [
            "bytes"
          ],
          "optional": [],
          "description": "Storage item AccountCodes",
          "returnType": "Uint8Array"
        },
        "AccountCodesMetadata": {
          "required": [
            "bytes"
          ],
          "optional": [],
          "description": "Storage item AccountCodesMetadata",
          "returnType": "unknown"
        },
        "AccountStorages": {
          "required": [],
          "optional": [],
          "description": "Storage item AccountStorages",
          "returnType": "Hash"
        }
      },
      "Ethereum": {
        "Pending": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item Pending",
          "returnType": "unknown"
        },
        "CounterForPending": {
          "required": [],
          "optional": [],
          "description": "Storage item CounterForPending",
          "returnType": "number"
        },
        "CurrentBlock": {
          "required": [],
          "optional": [],
          "description": "Storage item CurrentBlock",
          "returnType": "unknown"
        },
        "CurrentReceipts": {
          "required": [],
          "optional": [],
          "description": "Storage item CurrentReceipts",
          "returnType": "unknown"
        },
        "CurrentTransactionStatuses": {
          "required": [],
          "optional": [],
          "description": "Storage item CurrentTransactionStatuses",
          "returnType": "unknown"
        },
        "BlockHash": {
          "required": [
            "Anonymize_I4totqt881mlti_"
          ],
          "optional": [],
          "description": "Storage item BlockHash",
          "returnType": "Hash"
        }
      },
      "DynamicEvmBaseFee": {
        "BaseFeePerGas": {
          "required": [],
          "optional": [],
          "description": "Storage item BaseFeePerGas",
          "returnType": "unknown"
        }
      },
      "Contracts": {
        "PristineCode": {
          "required": [
            "Hash"
          ],
          "optional": [],
          "description": "Storage item PristineCode",
          "returnType": "Uint8Array"
        },
        "CodeInfoOf": {
          "required": [
            "Hash"
          ],
          "optional": [],
          "description": "Storage item CodeInfoOf",
          "returnType": "unknown"
        },
        "Nonce": {
          "required": [],
          "optional": [],
          "description": "Storage item Nonce",
          "returnType": "bigint"
        },
        "ContractInfoOf": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item ContractInfoOf",
          "returnType": "unknown"
        },
        "DeletionQueue": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item DeletionQueue",
          "returnType": "Uint8Array"
        },
        "DeletionQueueCounter": {
          "required": [],
          "optional": [],
          "description": "Storage item DeletionQueueCounter",
          "returnType": "unknown"
        },
        "MigrationInProgress": {
          "required": [],
          "optional": [],
          "description": "Storage item MigrationInProgress",
          "returnType": "Uint8Array"
        }
      },
      "Preimage": {
        "StatusFor": {
          "required": [
            "Hash"
          ],
          "optional": [],
          "description": "Storage item StatusFor",
          "returnType": "PreimageOldRequestStatus"
        },
        "RequestStatusFor": {
          "required": [
            "Hash"
          ],
          "optional": [],
          "description": "Storage item RequestStatusFor",
          "returnType": "PreimageRequestStatus"
        },
        "PreimageFor": {
          "required": [
            "Anonymize_I4pact7n2e9a0i_"
          ],
          "optional": [],
          "description": "Storage item PreimageFor",
          "returnType": "Uint8Array"
        }
      },
      "Sudo": {
        "Key": {
          "required": [],
          "optional": [],
          "description": "Storage item Key",
          "returnType": "string"
        }
      },
      "CouncilMembership": {
        "Members": {
          "required": [],
          "optional": [],
          "description": "Storage item Members",
          "returnType": "unknown"
        },
        "Prime": {
          "required": [],
          "optional": [],
          "description": "Storage item Prime",
          "returnType": "string"
        }
      },
      "TechnicalCommitteeMembership": {
        "Members": {
          "required": [],
          "optional": [],
          "description": "Storage item Members",
          "returnType": "unknown"
        },
        "Prime": {
          "required": [],
          "optional": [],
          "description": "Storage item Prime",
          "returnType": "string"
        }
      },
      "CommunityCouncilMembership": {
        "Members": {
          "required": [],
          "optional": [],
          "description": "Storage item Members",
          "returnType": "unknown"
        },
        "Prime": {
          "required": [],
          "optional": [],
          "description": "Storage item Prime",
          "returnType": "string"
        }
      },
      "Council": {
        "Proposals": {
          "required": [],
          "optional": [],
          "description": "Storage item Proposals",
          "returnType": "unknown"
        },
        "ProposalOf": {
          "required": [
            "Hash"
          ],
          "optional": [],
          "description": "Storage item ProposalOf",
          "returnType": "unknown"
        },
        "CostOf": {
          "required": [
            "Hash"
          ],
          "optional": [],
          "description": "Storage item CostOf",
          "returnType": "unknown"
        },
        "Voting": {
          "required": [
            "Hash"
          ],
          "optional": [],
          "description": "Storage item Voting",
          "returnType": "unknown"
        },
        "ProposalCount": {
          "required": [],
          "optional": [],
          "description": "Storage item ProposalCount",
          "returnType": "number"
        },
        "Members": {
          "required": [],
          "optional": [],
          "description": "Storage item Members",
          "returnType": "unknown"
        },
        "Prime": {
          "required": [],
          "optional": [],
          "description": "Storage item Prime",
          "returnType": "string"
        }
      },
      "TechnicalCommittee": {
        "Proposals": {
          "required": [],
          "optional": [],
          "description": "Storage item Proposals",
          "returnType": "unknown"
        },
        "ProposalOf": {
          "required": [
            "Hash"
          ],
          "optional": [],
          "description": "Storage item ProposalOf",
          "returnType": "unknown"
        },
        "CostOf": {
          "required": [
            "Hash"
          ],
          "optional": [],
          "description": "Storage item CostOf",
          "returnType": "unknown"
        },
        "Voting": {
          "required": [
            "Hash"
          ],
          "optional": [],
          "description": "Storage item Voting",
          "returnType": "unknown"
        },
        "ProposalCount": {
          "required": [],
          "optional": [],
          "description": "Storage item ProposalCount",
          "returnType": "number"
        },
        "Members": {
          "required": [],
          "optional": [],
          "description": "Storage item Members",
          "returnType": "unknown"
        },
        "Prime": {
          "required": [],
          "optional": [],
          "description": "Storage item Prime",
          "returnType": "string"
        }
      },
      "CommunityCouncil": {
        "Proposals": {
          "required": [],
          "optional": [],
          "description": "Storage item Proposals",
          "returnType": "unknown"
        },
        "ProposalOf": {
          "required": [
            "Hash"
          ],
          "optional": [],
          "description": "Storage item ProposalOf",
          "returnType": "unknown"
        },
        "CostOf": {
          "required": [
            "Hash"
          ],
          "optional": [],
          "description": "Storage item CostOf",
          "returnType": "unknown"
        },
        "Voting": {
          "required": [
            "Hash"
          ],
          "optional": [],
          "description": "Storage item Voting",
          "returnType": "unknown"
        },
        "ProposalCount": {
          "required": [],
          "optional": [],
          "description": "Storage item ProposalCount",
          "returnType": "number"
        },
        "Members": {
          "required": [],
          "optional": [],
          "description": "Storage item Members",
          "returnType": "unknown"
        },
        "Prime": {
          "required": [],
          "optional": [],
          "description": "Storage item Prime",
          "returnType": "string"
        }
      },
      "Democracy": {
        "PublicPropCount": {
          "required": [],
          "optional": [],
          "description": "Storage item PublicPropCount",
          "returnType": "number"
        },
        "PublicProps": {
          "required": [],
          "optional": [],
          "description": "Storage item PublicProps",
          "returnType": "unknown"
        },
        "DepositOf": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item DepositOf",
          "returnType": "unknown"
        },
        "ReferendumCount": {
          "required": [],
          "optional": [],
          "description": "Storage item ReferendumCount",
          "returnType": "number"
        },
        "LowestUnbaked": {
          "required": [],
          "optional": [],
          "description": "Storage item LowestUnbaked",
          "returnType": "number"
        },
        "ReferendumInfoOf": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item ReferendumInfoOf",
          "returnType": "unknown"
        },
        "VotingOf": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item VotingOf",
          "returnType": "unknown"
        },
        "LastTabledWasExternal": {
          "required": [],
          "optional": [],
          "description": "Storage item LastTabledWasExternal",
          "returnType": "boolean"
        },
        "NextExternal": {
          "required": [],
          "optional": [],
          "description": "Storage item NextExternal",
          "returnType": "unknown"
        },
        "Blacklist": {
          "required": [
            "Hash"
          ],
          "optional": [],
          "description": "Storage item Blacklist",
          "returnType": "unknown"
        },
        "Cancellations": {
          "required": [
            "Hash"
          ],
          "optional": [],
          "description": "Storage item Cancellations",
          "returnType": "boolean"
        },
        "MetadataOf": {
          "required": [
            "Anonymize_I2itl2k1j2q8nf_"
          ],
          "optional": [],
          "description": "Storage item MetadataOf",
          "returnType": "Hash"
        }
      },
      "Treasury": {
        "ProposalCount": {
          "required": [],
          "optional": [],
          "description": "Storage item ProposalCount",
          "returnType": "number"
        },
        "Proposals": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item Proposals",
          "returnType": "unknown"
        },
        "Deactivated": {
          "required": [],
          "optional": [],
          "description": "Storage item Deactivated",
          "returnType": "bigint"
        },
        "Approvals": {
          "required": [],
          "optional": [],
          "description": "Storage item Approvals",
          "returnType": "unknown"
        }
      },
      "CommunityTreasury": {
        "ProposalCount": {
          "required": [],
          "optional": [],
          "description": "Storage item ProposalCount",
          "returnType": "number"
        },
        "Proposals": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item Proposals",
          "returnType": "unknown"
        },
        "Deactivated": {
          "required": [],
          "optional": [],
          "description": "Storage item Deactivated",
          "returnType": "bigint"
        },
        "Approvals": {
          "required": [],
          "optional": [],
          "description": "Storage item Approvals",
          "returnType": "unknown"
        }
      },
      "SafeMode": {
        "EnteredUntil": {
          "required": [],
          "optional": [],
          "description": "Storage item EnteredUntil",
          "returnType": "number"
        },
        "Deposits": {
          "required": [],
          "optional": [],
          "description": "Storage item Deposits",
          "returnType": "bigint"
        }
      },
      "TxPause": {
        "PausedCalls": {
          "required": [
            "Anonymize_Idkbvh6dahk1v7_"
          ],
          "optional": [],
          "description": "Storage item PausedCalls",
          "returnType": "null"
        }
      },
      "MultiBlockMigrations": {
        "Cursor": {
          "required": [],
          "optional": [],
          "description": "Storage item Cursor",
          "returnType": "unknown"
        },
        "Historic": {
          "required": [
            "bytes"
          ],
          "optional": [],
          "description": "Storage item Historic",
          "returnType": "null"
        }
      }
    }
  },
  "bifrost": {
    "pallets": {
      "System": {
        "Account": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Account",
          "returnType": "unknown"
        },
        "ExtrinsicCount": {
          "required": [],
          "optional": [],
          "description": "Storage item ExtrinsicCount",
          "returnType": "number"
        },
        "InherentsApplied": {
          "required": [],
          "optional": [],
          "description": "Storage item InherentsApplied",
          "returnType": "boolean"
        },
        "BlockWeight": {
          "required": [],
          "optional": [],
          "description": "Storage item BlockWeight",
          "returnType": "unknown"
        },
        "AllExtrinsicsLen": {
          "required": [],
          "optional": [],
          "description": "Storage item AllExtrinsicsLen",
          "returnType": "number"
        },
        "BlockHash": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item BlockHash",
          "returnType": "Hash"
        },
        "ExtrinsicData": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item ExtrinsicData",
          "returnType": "Uint8Array"
        },
        "Number": {
          "required": [],
          "optional": [],
          "description": "Storage item Number",
          "returnType": "number"
        },
        "ParentHash": {
          "required": [],
          "optional": [],
          "description": "Storage item ParentHash",
          "returnType": "Hash"
        },
        "Digest": {
          "required": [],
          "optional": [],
          "description": "Storage item Digest",
          "returnType": "unknown"
        },
        "Events": {
          "required": [],
          "optional": [],
          "description": "Storage item Events",
          "returnType": "unknown"
        },
        "EventCount": {
          "required": [],
          "optional": [],
          "description": "Storage item EventCount",
          "returnType": "number"
        },
        "EventTopics": {
          "required": [
            "Hash"
          ],
          "optional": [],
          "description": "Storage item EventTopics",
          "returnType": "unknown"
        },
        "LastRuntimeUpgrade": {
          "required": [],
          "optional": [],
          "description": "Storage item LastRuntimeUpgrade",
          "returnType": "unknown"
        },
        "UpgradedToU32RefCount": {
          "required": [],
          "optional": [],
          "description": "Storage item UpgradedToU32RefCount",
          "returnType": "boolean"
        },
        "UpgradedToTripleRefCount": {
          "required": [],
          "optional": [],
          "description": "Storage item UpgradedToTripleRefCount",
          "returnType": "boolean"
        },
        "ExecutionPhase": {
          "required": [],
          "optional": [],
          "description": "Storage item ExecutionPhase",
          "returnType": "Phase"
        },
        "AuthorizedUpgrade": {
          "required": [],
          "optional": [],
          "description": "Storage item AuthorizedUpgrade",
          "returnType": "unknown"
        },
        "ExtrinsicWeightReclaimed": {
          "required": [],
          "optional": [],
          "description": "Storage item ExtrinsicWeightReclaimed",
          "returnType": "unknown"
        }
      },
      "Timestamp": {
        "Now": {
          "required": [],
          "optional": [],
          "description": "Storage item Now",
          "returnType": "bigint"
        },
        "DidUpdate": {
          "required": [],
          "optional": [],
          "description": "Storage item DidUpdate",
          "returnType": "boolean"
        }
      },
      "Indices": {
        "Accounts": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item Accounts",
          "returnType": "unknown"
        }
      },
      "ParachainSystem": {
        "UnincludedSegment": {
          "required": [],
          "optional": [],
          "description": "Storage item UnincludedSegment",
          "returnType": "unknown"
        },
        "AggregatedUnincludedSegment": {
          "required": [],
          "optional": [],
          "description": "Storage item AggregatedUnincludedSegment",
          "returnType": "unknown"
        },
        "PendingValidationCode": {
          "required": [],
          "optional": [],
          "description": "Storage item PendingValidationCode",
          "returnType": "Uint8Array"
        },
        "NewValidationCode": {
          "required": [],
          "optional": [],
          "description": "Storage item NewValidationCode",
          "returnType": "Uint8Array"
        },
        "ValidationData": {
          "required": [],
          "optional": [],
          "description": "Storage item ValidationData",
          "returnType": "unknown"
        },
        "DidSetValidationCode": {
          "required": [],
          "optional": [],
          "description": "Storage item DidSetValidationCode",
          "returnType": "boolean"
        },
        "LastRelayChainBlockNumber": {
          "required": [],
          "optional": [],
          "description": "Storage item LastRelayChainBlockNumber",
          "returnType": "number"
        },
        "UpgradeRestrictionSignal": {
          "required": [],
          "optional": [],
          "description": "Storage item UpgradeRestrictionSignal",
          "returnType": "unknown"
        },
        "UpgradeGoAhead": {
          "required": [],
          "optional": [],
          "description": "Storage item UpgradeGoAhead",
          "returnType": "unknown"
        },
        "RelayStateProof": {
          "required": [],
          "optional": [],
          "description": "Storage item RelayStateProof",
          "returnType": "unknown"
        },
        "RelevantMessagingState": {
          "required": [],
          "optional": [],
          "description": "Storage item RelevantMessagingState",
          "returnType": "unknown"
        },
        "HostConfiguration": {
          "required": [],
          "optional": [],
          "description": "Storage item HostConfiguration",
          "returnType": "unknown"
        },
        "LastDmqMqcHead": {
          "required": [],
          "optional": [],
          "description": "Storage item LastDmqMqcHead",
          "returnType": "Hash"
        },
        "LastHrmpMqcHeads": {
          "required": [],
          "optional": [],
          "description": "Storage item LastHrmpMqcHeads",
          "returnType": "unknown"
        },
        "ProcessedDownwardMessages": {
          "required": [],
          "optional": [],
          "description": "Storage item ProcessedDownwardMessages",
          "returnType": "number"
        },
        "HrmpWatermark": {
          "required": [],
          "optional": [],
          "description": "Storage item HrmpWatermark",
          "returnType": "number"
        },
        "HrmpOutboundMessages": {
          "required": [],
          "optional": [],
          "description": "Storage item HrmpOutboundMessages",
          "returnType": "unknown"
        },
        "UpwardMessages": {
          "required": [],
          "optional": [],
          "description": "Storage item UpwardMessages",
          "returnType": "unknown"
        },
        "PendingUpwardMessages": {
          "required": [],
          "optional": [],
          "description": "Storage item PendingUpwardMessages",
          "returnType": "unknown"
        },
        "UpwardDeliveryFeeFactor": {
          "required": [],
          "optional": [],
          "description": "Storage item UpwardDeliveryFeeFactor",
          "returnType": "bigint"
        },
        "AnnouncedHrmpMessagesPerCandidate": {
          "required": [],
          "optional": [],
          "description": "Storage item AnnouncedHrmpMessagesPerCandidate",
          "returnType": "number"
        },
        "ReservedXcmpWeightOverride": {
          "required": [],
          "optional": [],
          "description": "Storage item ReservedXcmpWeightOverride",
          "returnType": "unknown"
        },
        "ReservedDmpWeightOverride": {
          "required": [],
          "optional": [],
          "description": "Storage item ReservedDmpWeightOverride",
          "returnType": "unknown"
        },
        "CustomValidationHeadData": {
          "required": [],
          "optional": [],
          "description": "Storage item CustomValidationHeadData",
          "returnType": "Uint8Array"
        }
      },
      "ParachainInfo": {
        "ParachainId": {
          "required": [],
          "optional": [],
          "description": "Storage item ParachainId",
          "returnType": "number"
        }
      },
      "TxPause": {
        "PausedCalls": {
          "required": [
            "Anonymize_Idkbvh6dahk1v7_"
          ],
          "optional": [],
          "description": "Storage item PausedCalls",
          "returnType": "null"
        }
      },
      "MultiBlockMigrations": {
        "Cursor": {
          "required": [],
          "optional": [],
          "description": "Storage item Cursor",
          "returnType": "unknown"
        },
        "Historic": {
          "required": [
            "bytes"
          ],
          "optional": [],
          "description": "Storage item Historic",
          "returnType": "null"
        }
      },
      "Balances": {
        "TotalIssuance": {
          "required": [],
          "optional": [],
          "description": "Storage item TotalIssuance",
          "returnType": "bigint"
        },
        "InactiveIssuance": {
          "required": [],
          "optional": [],
          "description": "Storage item InactiveIssuance",
          "returnType": "bigint"
        },
        "Account": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Account",
          "returnType": "unknown"
        },
        "Locks": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Locks",
          "returnType": "unknown"
        },
        "Reserves": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Reserves",
          "returnType": "unknown"
        },
        "Holds": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Holds",
          "returnType": "unknown"
        },
        "Freezes": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Freezes",
          "returnType": "unknown"
        }
      },
      "TransactionPayment": {
        "NextFeeMultiplier": {
          "required": [],
          "optional": [],
          "description": "Storage item NextFeeMultiplier",
          "returnType": "bigint"
        },
        "StorageVersion": {
          "required": [],
          "optional": [],
          "description": "Storage item StorageVersion",
          "returnType": "TransactionPaymentReleases"
        }
      },
      "Authorship": {
        "Author": {
          "required": [],
          "optional": [],
          "description": "Storage item Author",
          "returnType": "string"
        }
      },
      "Session": {
        "Validators": {
          "required": [],
          "optional": [],
          "description": "Storage item Validators",
          "returnType": "unknown"
        },
        "CurrentIndex": {
          "required": [],
          "optional": [],
          "description": "Storage item CurrentIndex",
          "returnType": "number"
        },
        "QueuedChanged": {
          "required": [],
          "optional": [],
          "description": "Storage item QueuedChanged",
          "returnType": "boolean"
        },
        "QueuedKeys": {
          "required": [],
          "optional": [],
          "description": "Storage item QueuedKeys",
          "returnType": "unknown"
        },
        "DisabledValidators": {
          "required": [],
          "optional": [],
          "description": "Storage item DisabledValidators",
          "returnType": "unknown"
        },
        "NextKeys": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item NextKeys",
          "returnType": "Hash"
        },
        "KeyOwner": {
          "required": [
            "Anonymize_I82jm9g7pufuel_"
          ],
          "optional": [],
          "description": "Storage item KeyOwner",
          "returnType": "string"
        }
      },
      "Aura": {
        "Authorities": {
          "required": [],
          "optional": [],
          "description": "Storage item Authorities",
          "returnType": "unknown"
        },
        "CurrentSlot": {
          "required": [],
          "optional": [],
          "description": "Storage item CurrentSlot",
          "returnType": "bigint"
        }
      },
      "AuraExt": {
        "Authorities": {
          "required": [],
          "optional": [],
          "description": "Storage item Authorities",
          "returnType": "unknown"
        },
        "RelaySlotInfo": {
          "required": [],
          "optional": [],
          "description": "Storage item RelaySlotInfo",
          "returnType": "unknown"
        }
      },
      "ParachainStaking": {
        "CollatorCommission": {
          "required": [],
          "optional": [],
          "description": "Storage item CollatorCommission",
          "returnType": "number"
        },
        "TotalSelected": {
          "required": [],
          "optional": [],
          "description": "Storage item TotalSelected",
          "returnType": "number"
        },
        "ParachainBondInfo": {
          "required": [],
          "optional": [],
          "description": "Storage item ParachainBondInfo",
          "returnType": "unknown"
        },
        "Round": {
          "required": [],
          "optional": [],
          "description": "Storage item Round",
          "returnType": "unknown"
        },
        "DelegatorState": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item DelegatorState",
          "returnType": "unknown"
        },
        "CandidateInfo": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item CandidateInfo",
          "returnType": "unknown"
        },
        "DelegationScheduledRequests": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item DelegationScheduledRequests",
          "returnType": "unknown"
        },
        "TopDelegations": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item TopDelegations",
          "returnType": "unknown"
        },
        "BottomDelegations": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item BottomDelegations",
          "returnType": "unknown"
        },
        "SelectedCandidates": {
          "required": [],
          "optional": [],
          "description": "Storage item SelectedCandidates",
          "returnType": "unknown"
        },
        "Total": {
          "required": [],
          "optional": [],
          "description": "Storage item Total",
          "returnType": "bigint"
        },
        "CandidatePool": {
          "required": [],
          "optional": [],
          "description": "Storage item CandidatePool",
          "returnType": "unknown"
        },
        "AtStake": {
          "required": [],
          "optional": [],
          "description": "Storage item AtStake",
          "returnType": "unknown"
        },
        "DelayedPayouts": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item DelayedPayouts",
          "returnType": "unknown"
        },
        "Staked": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item Staked",
          "returnType": "bigint"
        },
        "InflationConfig": {
          "required": [],
          "optional": [],
          "description": "Storage item InflationConfig",
          "returnType": "unknown"
        },
        "Points": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item Points",
          "returnType": "number"
        },
        "AwardedPts": {
          "required": [],
          "optional": [],
          "description": "Storage item AwardedPts",
          "returnType": "number"
        }
      },
      "ConvictionVoting": {
        "VotingFor": {
          "required": [],
          "optional": [],
          "description": "Storage item VotingFor",
          "returnType": "ConvictionVotingVoteVoting"
        },
        "ClassLocksFor": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item ClassLocksFor",
          "returnType": "unknown"
        }
      },
      "Referenda": {
        "ReferendumCount": {
          "required": [],
          "optional": [],
          "description": "Storage item ReferendumCount",
          "returnType": "number"
        },
        "ReferendumInfoFor": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item ReferendumInfoFor",
          "returnType": "unknown"
        },
        "TrackQueue": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item TrackQueue",
          "returnType": "unknown"
        },
        "DecidingCount": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item DecidingCount",
          "returnType": "number"
        },
        "MetadataOf": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item MetadataOf",
          "returnType": "Hash"
        }
      },
      "Whitelist": {
        "WhitelistedCall": {
          "required": [
            "Hash"
          ],
          "optional": [],
          "description": "Storage item WhitelistedCall",
          "returnType": "null"
        }
      },
      "XcmpQueue": {
        "InboundXcmpSuspended": {
          "required": [],
          "optional": [],
          "description": "Storage item InboundXcmpSuspended",
          "returnType": "unknown"
        },
        "OutboundXcmpStatus": {
          "required": [],
          "optional": [],
          "description": "Storage item OutboundXcmpStatus",
          "returnType": "unknown"
        },
        "OutboundXcmpMessages": {
          "required": [],
          "optional": [],
          "description": "Storage item OutboundXcmpMessages",
          "returnType": "Uint8Array"
        },
        "SignalMessages": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item SignalMessages",
          "returnType": "Uint8Array"
        },
        "QueueConfig": {
          "required": [],
          "optional": [],
          "description": "Storage item QueueConfig",
          "returnType": "unknown"
        },
        "QueueSuspended": {
          "required": [],
          "optional": [],
          "description": "Storage item QueueSuspended",
          "returnType": "boolean"
        },
        "DeliveryFeeFactor": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item DeliveryFeeFactor",
          "returnType": "bigint"
        }
      },
      "PolkadotXcm": {
        "QueryCounter": {
          "required": [],
          "optional": [],
          "description": "Storage item QueryCounter",
          "returnType": "bigint"
        },
        "Queries": {
          "required": [
            "u64"
          ],
          "optional": [],
          "description": "Storage item Queries",
          "returnType": "unknown"
        },
        "AssetTraps": {
          "required": [
            "Hash"
          ],
          "optional": [],
          "description": "Storage item AssetTraps",
          "returnType": "number"
        },
        "SafeXcmVersion": {
          "required": [],
          "optional": [],
          "description": "Storage item SafeXcmVersion",
          "returnType": "number"
        },
        "SupportedVersion": {
          "required": [],
          "optional": [],
          "description": "Storage item SupportedVersion",
          "returnType": "number"
        },
        "VersionNotifiers": {
          "required": [],
          "optional": [],
          "description": "Storage item VersionNotifiers",
          "returnType": "bigint"
        },
        "VersionNotifyTargets": {
          "required": [],
          "optional": [],
          "description": "Storage item VersionNotifyTargets",
          "returnType": "unknown"
        },
        "VersionDiscoveryQueue": {
          "required": [],
          "optional": [],
          "description": "Storage item VersionDiscoveryQueue",
          "returnType": "unknown"
        },
        "CurrentMigration": {
          "required": [],
          "optional": [],
          "description": "Storage item CurrentMigration",
          "returnType": "XcmPalletVersionMigrationStage"
        },
        "RemoteLockedFungibles": {
          "required": [],
          "optional": [],
          "description": "Storage item RemoteLockedFungibles",
          "returnType": "unknown"
        },
        "LockedFungibles": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item LockedFungibles",
          "returnType": "unknown"
        },
        "XcmExecutionSuspended": {
          "required": [],
          "optional": [],
          "description": "Storage item XcmExecutionSuspended",
          "returnType": "boolean"
        },
        "ShouldRecordXcm": {
          "required": [],
          "optional": [],
          "description": "Storage item ShouldRecordXcm",
          "returnType": "boolean"
        },
        "RecordedXcm": {
          "required": [],
          "optional": [],
          "description": "Storage item RecordedXcm",
          "returnType": "unknown"
        },
        "AuthorizedAliases": {
          "required": [
            "XcmVersionedLocation"
          ],
          "optional": [],
          "description": "Storage item AuthorizedAliases",
          "returnType": "unknown"
        }
      },
      "MessageQueue": {
        "BookStateFor": {
          "required": [
            "Anonymize_Iejeo53sea6n4q_"
          ],
          "optional": [],
          "description": "Storage item BookStateFor",
          "returnType": "unknown"
        },
        "ServiceHead": {
          "required": [],
          "optional": [],
          "description": "Storage item ServiceHead",
          "returnType": "unknown"
        },
        "Pages": {
          "required": [],
          "optional": [],
          "description": "Storage item Pages",
          "returnType": "unknown"
        }
      },
      "Scheduler": {
        "IncompleteSince": {
          "required": [],
          "optional": [],
          "description": "Storage item IncompleteSince",
          "returnType": "number"
        },
        "Agenda": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item Agenda",
          "returnType": "unknown"
        },
        "Retries": {
          "required": [
            "Anonymize_I9jd27rnpm8ttv_"
          ],
          "optional": [],
          "description": "Storage item Retries",
          "returnType": "unknown"
        },
        "Lookup": {
          "required": [
            "Hash"
          ],
          "optional": [],
          "description": "Storage item Lookup",
          "returnType": "unknown"
        }
      },
      "Proxy": {
        "Proxies": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Proxies",
          "returnType": "unknown"
        },
        "Announcements": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Announcements",
          "returnType": "unknown"
        }
      },
      "Multisig": {
        "Multisigs": {
          "required": [],
          "optional": [],
          "description": "Storage item Multisigs",
          "returnType": "unknown"
        }
      },
      "Identity": {
        "IdentityOf": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item IdentityOf",
          "returnType": "unknown"
        },
        "UsernameOf": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item UsernameOf",
          "returnType": "Uint8Array"
        },
        "SuperOf": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item SuperOf",
          "returnType": "unknown"
        },
        "SubsOf": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item SubsOf",
          "returnType": "unknown"
        },
        "Registrars": {
          "required": [],
          "optional": [],
          "description": "Storage item Registrars",
          "returnType": "unknown"
        },
        "AuthorityOf": {
          "required": [
            "bytes"
          ],
          "optional": [],
          "description": "Storage item AuthorityOf",
          "returnType": "unknown"
        },
        "UsernameInfoOf": {
          "required": [
            "bytes"
          ],
          "optional": [],
          "description": "Storage item UsernameInfoOf",
          "returnType": "unknown"
        },
        "PendingUsernames": {
          "required": [
            "bytes"
          ],
          "optional": [],
          "description": "Storage item PendingUsernames",
          "returnType": "unknown"
        },
        "UnbindingUsernames": {
          "required": [
            "bytes"
          ],
          "optional": [],
          "description": "Storage item UnbindingUsernames",
          "returnType": "number"
        }
      },
      "Vesting": {
        "VestingStartAt": {
          "required": [],
          "optional": [],
          "description": "Storage item VestingStartAt",
          "returnType": "number"
        },
        "Cliff": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Cliff",
          "returnType": "number"
        },
        "Vesting": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Vesting",
          "returnType": "unknown"
        },
        "StorageVersion": {
          "required": [],
          "optional": [],
          "description": "Storage item StorageVersion",
          "returnType": "Version"
        }
      },
      "Treasury": {
        "ProposalCount": {
          "required": [],
          "optional": [],
          "description": "Storage item ProposalCount",
          "returnType": "number"
        },
        "Proposals": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item Proposals",
          "returnType": "unknown"
        },
        "Deactivated": {
          "required": [],
          "optional": [],
          "description": "Storage item Deactivated",
          "returnType": "bigint"
        },
        "Approvals": {
          "required": [],
          "optional": [],
          "description": "Storage item Approvals",
          "returnType": "unknown"
        },
        "SpendCount": {
          "required": [],
          "optional": [],
          "description": "Storage item SpendCount",
          "returnType": "number"
        },
        "Spends": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item Spends",
          "returnType": "unknown"
        },
        "LastSpendPeriod": {
          "required": [],
          "optional": [],
          "description": "Storage item LastSpendPeriod",
          "returnType": "number"
        }
      },
      "Preimage": {
        "StatusFor": {
          "required": [
            "Hash"
          ],
          "optional": [],
          "description": "Storage item StatusFor",
          "returnType": "PreimageOldRequestStatus"
        },
        "RequestStatusFor": {
          "required": [
            "Hash"
          ],
          "optional": [],
          "description": "Storage item RequestStatusFor",
          "returnType": "PreimageRequestStatus"
        },
        "PreimageFor": {
          "required": [
            "Anonymize_I4pact7n2e9a0i_"
          ],
          "optional": [],
          "description": "Storage item PreimageFor",
          "returnType": "Uint8Array"
        }
      },
      "Ethereum": {
        "Pending": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item Pending",
          "returnType": "unknown"
        },
        "CounterForPending": {
          "required": [],
          "optional": [],
          "description": "Storage item CounterForPending",
          "returnType": "number"
        },
        "CurrentBlock": {
          "required": [],
          "optional": [],
          "description": "Storage item CurrentBlock",
          "returnType": "unknown"
        },
        "CurrentReceipts": {
          "required": [],
          "optional": [],
          "description": "Storage item CurrentReceipts",
          "returnType": "unknown"
        },
        "CurrentTransactionStatuses": {
          "required": [],
          "optional": [],
          "description": "Storage item CurrentTransactionStatuses",
          "returnType": "unknown"
        },
        "BlockHash": {
          "required": [
            "Anonymize_I4totqt881mlti_"
          ],
          "optional": [],
          "description": "Storage item BlockHash",
          "returnType": "Hash"
        }
      },
      "EVM": {
        "AccountCodes": {
          "required": [
            "bytes"
          ],
          "optional": [],
          "description": "Storage item AccountCodes",
          "returnType": "Uint8Array"
        },
        "AccountCodesMetadata": {
          "required": [
            "bytes"
          ],
          "optional": [],
          "description": "Storage item AccountCodesMetadata",
          "returnType": "unknown"
        },
        "AccountStorages": {
          "required": [],
          "optional": [],
          "description": "Storage item AccountStorages",
          "returnType": "Hash"
        }
      },
      "EVMChainId": {
        "ChainId": {
          "required": [],
          "optional": [],
          "description": "Storage item ChainId",
          "returnType": "bigint"
        }
      },
      "DynamicFee": {
        "MinGasPrice": {
          "required": [],
          "optional": [],
          "description": "Storage item MinGasPrice",
          "returnType": "unknown"
        },
        "TargetMinGasPrice": {
          "required": [],
          "optional": [],
          "description": "Storage item TargetMinGasPrice",
          "returnType": "unknown"
        }
      },
      "EVMAccounts": {
        "AccountExtension": {
          "required": [
            "bytes"
          ],
          "optional": [],
          "description": "Storage item AccountExtension",
          "returnType": "Hash"
        },
        "ContractDeployer": {
          "required": [
            "bytes"
          ],
          "optional": [],
          "description": "Storage item ContractDeployer",
          "returnType": "null"
        }
      },
      "Tokens": {
        "TotalIssuance": {
          "required": [
            "Anonymize_Iebirugq1dbhv6_"
          ],
          "optional": [],
          "description": "Storage item TotalIssuance",
          "returnType": "bigint"
        },
        "Locks": {
          "required": [],
          "optional": [],
          "description": "Storage item Locks",
          "returnType": "unknown"
        },
        "Accounts": {
          "required": [],
          "optional": [],
          "description": "Storage item Accounts",
          "returnType": "unknown"
        },
        "Reserves": {
          "required": [],
          "optional": [],
          "description": "Storage item Reserves",
          "returnType": "unknown"
        }
      },
      "UnknownTokens": {
        "ConcreteFungibleBalances": {
          "required": [],
          "optional": [],
          "description": "Storage item ConcreteFungibleBalances",
          "returnType": "bigint"
        },
        "AbstractFungibleBalances": {
          "required": [],
          "optional": [],
          "description": "Storage item AbstractFungibleBalances",
          "returnType": "bigint"
        }
      },
      "ZenlinkProtocol": {
        "ForeignLedger": {
          "required": [
            "Anonymize_Iettgnma0t3a0g_"
          ],
          "optional": [],
          "description": "Storage item ForeignLedger",
          "returnType": "bigint"
        },
        "ForeignMeta": {
          "required": [
            "Anonymize_Icu3qllmbdnj89_"
          ],
          "optional": [],
          "description": "Storage item ForeignMeta",
          "returnType": "bigint"
        },
        "ForeignList": {
          "required": [],
          "optional": [],
          "description": "Storage item ForeignList",
          "returnType": "unknown"
        },
        "KLast": {
          "required": [
            "Anonymize_I84fmreorpmm3e_"
          ],
          "optional": [],
          "description": "Storage item KLast",
          "returnType": "unknown"
        },
        "FeeMeta": {
          "required": [],
          "optional": [],
          "description": "Storage item FeeMeta",
          "returnType": "unknown"
        },
        "FeeReceiver": {
          "required": [
            "Anonymize_Icu3qllmbdnj89_"
          ],
          "optional": [],
          "description": "Storage item FeeReceiver",
          "returnType": "string"
        },
        "LiquidityPairs": {
          "required": [
            "Anonymize_I84fmreorpmm3e_"
          ],
          "optional": [],
          "description": "Storage item LiquidityPairs",
          "returnType": "unknown"
        },
        "PairStatuses": {
          "required": [
            "Anonymize_I84fmreorpmm3e_"
          ],
          "optional": [],
          "description": "Storage item PairStatuses",
          "returnType": "unknown"
        },
        "BootstrapPersonalSupply": {
          "required": [
            "Anonymize_Iaa4kemhg4eh7v_"
          ],
          "optional": [],
          "description": "Storage item BootstrapPersonalSupply",
          "returnType": "unknown"
        },
        "BootstrapEndStatus": {
          "required": [
            "Anonymize_I84fmreorpmm3e_"
          ],
          "optional": [],
          "description": "End status of bootstrap",
          "returnType": "unknown"
        },
        "BootstrapRewards": {
          "required": [
            "Anonymize_I84fmreorpmm3e_"
          ],
          "optional": [],
          "description": "Storage item BootstrapRewards",
          "returnType": "unknown"
        },
        "BootstrapLimits": {
          "required": [
            "Anonymize_I84fmreorpmm3e_"
          ],
          "optional": [],
          "description": "Storage item BootstrapLimits",
          "returnType": "unknown"
        }
      },
      "Ismp": {
        "StateCommitments": {
          "required": [
            "Anonymize_Ifm3n51g640vse_"
          ],
          "optional": [],
          "description": "Storage item StateCommitments",
          "returnType": "unknown"
        },
        "ConsensusStates": {
          "required": [
            "bytes"
          ],
          "optional": [],
          "description": "Storage item ConsensusStates",
          "returnType": "Uint8Array"
        },
        "ConsensusStateClient": {
          "required": [
            "bytes"
          ],
          "optional": [],
          "description": "Storage item ConsensusStateClient",
          "returnType": "Hash"
        },
        "UnbondingPeriod": {
          "required": [
            "bytes"
          ],
          "optional": [],
          "description": "Storage item UnbondingPeriod",
          "returnType": "bigint"
        },
        "ChallengePeriod": {
          "required": [
            "Anonymize_Ieitt970a26jef_"
          ],
          "optional": [],
          "description": "Storage item ChallengePeriod",
          "returnType": "bigint"
        },
        "FrozenConsensusClients": {
          "required": [
            "bytes"
          ],
          "optional": [],
          "description": "Storage item FrozenConsensusClients",
          "returnType": "boolean"
        },
        "LatestStateMachineHeight": {
          "required": [
            "Anonymize_Ieitt970a26jef_"
          ],
          "optional": [],
          "description": "Storage item LatestStateMachineHeight",
          "returnType": "bigint"
        },
        "PreviousStateMachineHeight": {
          "required": [
            "Anonymize_Ieitt970a26jef_"
          ],
          "optional": [],
          "description": "Storage item PreviousStateMachineHeight",
          "returnType": "bigint"
        },
        "ConsensusClientUpdateTime": {
          "required": [
            "bytes"
          ],
          "optional": [],
          "description": "Storage item ConsensusClientUpdateTime",
          "returnType": "bigint"
        },
        "StateMachineUpdateTime": {
          "required": [
            "Anonymize_Ifm3n51g640vse_"
          ],
          "optional": [],
          "description": "Storage item StateMachineUpdateTime",
          "returnType": "bigint"
        },
        "Responded": {
          "required": [
            "Hash"
          ],
          "optional": [],
          "description": "Storage item Responded",
          "returnType": "boolean"
        },
        "Nonce": {
          "required": [],
          "optional": [],
          "description": "Storage item Nonce",
          "returnType": "bigint"
        },
        "ChildTrieRoot": {
          "required": [],
          "optional": [],
          "description": "Storage item ChildTrieRoot",
          "returnType": "Hash"
        }
      },
      "IsmpParachain": {
        "RelayChainStateCommitments": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item RelayChainStateCommitments",
          "returnType": "Hash"
        },
        "ConsensusUpdated": {
          "required": [],
          "optional": [],
          "description": "Storage item ConsensusUpdated",
          "returnType": "boolean"
        },
        "Parachains": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item Parachains",
          "returnType": "bigint"
        }
      },
      "Hyperbridge": {
        "HostParams": {
          "required": [],
          "optional": [],
          "description": "Storage item HostParams",
          "returnType": "unknown"
        }
      },
      "TokenGateway": {
        "SupportedAssets": {
          "required": [
            "Anonymize_Iebirugq1dbhv6_"
          ],
          "optional": [],
          "description": "Storage item SupportedAssets",
          "returnType": "Hash"
        },
        "NativeAssets": {
          "required": [
            "Anonymize_Iebirugq1dbhv6_"
          ],
          "optional": [],
          "description": "Storage item NativeAssets",
          "returnType": "boolean"
        },
        "LocalAssets": {
          "required": [
            "Hash"
          ],
          "optional": [],
          "description": "Storage item LocalAssets",
          "returnType": "unknown"
        },
        "Decimals": {
          "required": [
            "Anonymize_Iebirugq1dbhv6_"
          ],
          "optional": [],
          "description": "Storage item Decimals",
          "returnType": "number"
        },
        "TokenGatewayAddresses": {
          "required": [
            "Anonymize_Icctse4hug509d_"
          ],
          "optional": [],
          "description": "Storage item TokenGatewayAddresses",
          "returnType": "Uint8Array"
        },
        "WhitelistAddresses": {
          "required": [
            "Anonymize_Icctse4hug509d_"
          ],
          "optional": [],
          "description": "Storage item WhitelistAddresses",
          "returnType": "unknown"
        }
      },
      "FlexibleFee": {
        "UniversalFeeCurrencyOrderList": {
          "required": [],
          "optional": [],
          "description": "Storage item UniversalFeeCurrencyOrderList",
          "returnType": "unknown"
        },
        "UserDefaultFeeCurrency": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item UserDefaultFeeCurrency",
          "returnType": "unknown"
        },
        "ExtraFeeByCall": {
          "required": [
            "bytes"
          ],
          "optional": [],
          "description": "Storage item ExtraFeeByCall",
          "returnType": "unknown"
        }
      },
      "Salp": {
        "MultisigConfirmAccount": {
          "required": [],
          "optional": [],
          "description": "Storage item MultisigConfirmAccount",
          "returnType": "string"
        },
        "CurrentTrieIndex": {
          "required": [],
          "optional": [],
          "description": "Storage item CurrentTrieIndex",
          "returnType": "number"
        },
        "CurrentNonce": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item CurrentNonce",
          "returnType": "number"
        },
        "QueryIdContributionInfo": {
          "required": [
            "u64"
          ],
          "optional": [],
          "description": "Storage item QueryIdContributionInfo",
          "returnType": "unknown"
        },
        "Funds": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item Funds",
          "returnType": "unknown"
        },
        "RedeemPool": {
          "required": [],
          "optional": [],
          "description": "Storage item RedeemPool",
          "returnType": "bigint"
        },
        "FailedFundsToRefund": {
          "required": [],
          "optional": [],
          "description": "Storage item FailedFundsToRefund",
          "returnType": "unknown"
        },
        "ReserveInfos": {
          "required": [],
          "optional": [],
          "description": "Storage item ReserveInfos",
          "returnType": "unknown"
        }
      },
      "AssetRegistry": {
        "NextForeignAssetId": {
          "required": [],
          "optional": [],
          "description": "Next available Foreign AssetId ID.",
          "returnType": "number"
        },
        "NextTokenId": {
          "required": [],
          "optional": [],
          "description": "Next available TokenId ID.",
          "returnType": "number"
        },
        "CurrencyIdToLocations": {
          "required": [
            "Anonymize_Iebirugq1dbhv6_"
          ],
          "optional": [],
          "description": "The storages for Locations.",
          "returnType": "unknown"
        },
        "LocationToCurrencyIds": {
          "required": [
            "Anonymize_If9iqq7i64mur8_"
          ],
          "optional": [],
          "description": "The storages for CurrencyIds.",
          "returnType": "unknown"
        },
        "CurrencyIdToWeights": {
          "required": [
            "Anonymize_Iebirugq1dbhv6_"
          ],
          "optional": [],
          "description": "Storage item CurrencyIdToWeights",
          "returnType": "unknown"
        },
        "AssetMetadatas": {
          "required": [
            "Anonymize_I810b83nplvppm_"
          ],
          "optional": [],
          "description": "The storages for AssetMetadatas.",
          "returnType": "unknown"
        },
        "CurrencyMetadatas": {
          "required": [
            "Anonymize_Iebirugq1dbhv6_"
          ],
          "optional": [],
          "description": "The storages for AssetMetadata.",
          "returnType": "unknown"
        }
      },
      "VtokenMinting": {
        "Fees": {
          "required": [],
          "optional": [],
          "description": "Storage item Fees",
          "returnType": "unknown"
        },
        "TokenPool": {
          "required": [
            "Anonymize_Iebirugq1dbhv6_"
          ],
          "optional": [],
          "description": "Storage item TokenPool",
          "returnType": "bigint"
        },
        "UnlockDuration": {
          "required": [
            "Anonymize_Iebirugq1dbhv6_"
          ],
          "optional": [],
          "description": "Storage item UnlockDuration",
          "returnType": "unknown"
        },
        "OngoingTimeUnit": {
          "required": [
            "Anonymize_Iebirugq1dbhv6_"
          ],
          "optional": [],
          "description": "Storage item OngoingTimeUnit",
          "returnType": "unknown"
        },
        "MinimumMint": {
          "required": [
            "Anonymize_Iebirugq1dbhv6_"
          ],
          "optional": [],
          "description": "Storage item MinimumMint",
          "returnType": "bigint"
        },
        "MinimumRedeem": {
          "required": [
            "Anonymize_Iebirugq1dbhv6_"
          ],
          "optional": [],
          "description": "Storage item MinimumRedeem",
          "returnType": "bigint"
        },
        "TokenUnlockNextId": {
          "required": [
            "Anonymize_Iebirugq1dbhv6_"
          ],
          "optional": [],
          "description": "Storage item TokenUnlockNextId",
          "returnType": "number"
        },
        "TokenUnlockLedger": {
          "required": [],
          "optional": [],
          "description": "Storage item TokenUnlockLedger",
          "returnType": "unknown"
        },
        "UserUnlockLedger": {
          "required": [],
          "optional": [],
          "description": "Storage item UserUnlockLedger",
          "returnType": "unknown"
        },
        "TimeUnitUnlockLedger": {
          "required": [],
          "optional": [],
          "description": "Storage item TimeUnitUnlockLedger",
          "returnType": "unknown"
        },
        "TokenToRebond": {
          "required": [
            "Anonymize_Iebirugq1dbhv6_"
          ],
          "optional": [],
          "description": "Storage item TokenToRebond",
          "returnType": "bigint"
        },
        "MinTimeUnit": {
          "required": [
            "Anonymize_Iebirugq1dbhv6_"
          ],
          "optional": [],
          "description": "Storage item MinTimeUnit",
          "returnType": "unknown"
        },
        "UnlockingTotal": {
          "required": [
            "Anonymize_Iebirugq1dbhv6_"
          ],
          "optional": [],
          "description": "Storage item UnlockingTotal",
          "returnType": "bigint"
        },
        "VtokenIssuance": {
          "required": [
            "Anonymize_Iebirugq1dbhv6_"
          ],
          "optional": [],
          "description": "Storage item VtokenIssuance",
          "returnType": "bigint"
        },
        "HookIterationLimit": {
          "required": [],
          "optional": [],
          "description": "Storage item HookIterationLimit",
          "returnType": "number"
        },
        "SupportedEth": {
          "required": [],
          "optional": [],
          "description": "Storage item SupportedEth",
          "returnType": "unknown"
        },
        "EthUnlockNextId": {
          "required": [],
          "optional": [],
          "description": "Storage item EthUnlockNextId",
          "returnType": "number"
        },
        "MintWithLockBlocks": {
          "required": [
            "Anonymize_Iebirugq1dbhv6_"
          ],
          "optional": [],
          "description": "Storage item MintWithLockBlocks",
          "returnType": "number"
        },
        "VtokenIncentiveCoef": {
          "required": [
            "Anonymize_Iebirugq1dbhv6_"
          ],
          "optional": [],
          "description": "Storage item VtokenIncentiveCoef",
          "returnType": "bigint"
        },
        "VtokenLockLedger": {
          "required": [],
          "optional": [],
          "description": "Storage item VtokenLockLedger",
          "returnType": "unknown"
        }
      },
      "Slp": {
        "OperateOrigins": {
          "required": [
            "Anonymize_Iebirugq1dbhv6_"
          ],
          "optional": [],
          "description": "Storage item OperateOrigins",
          "returnType": "string"
        },
        "FeeSources": {
          "required": [
            "Anonymize_Iebirugq1dbhv6_"
          ],
          "optional": [],
          "description": "Storage item FeeSources",
          "returnType": "unknown"
        },
        "HostingFees": {
          "required": [
            "Anonymize_Iebirugq1dbhv6_"
          ],
          "optional": [],
          "description": "Storage item HostingFees",
          "returnType": "unknown"
        },
        "DelegatorsIndex2Multilocation": {
          "required": [],
          "optional": [],
          "description": "Storage item DelegatorsIndex2Multilocation",
          "returnType": "unknown"
        },
        "DelegatorsMultilocation2Index": {
          "required": [],
          "optional": [],
          "description": "Storage item DelegatorsMultilocation2Index",
          "returnType": "number"
        },
        "DelegatorNextIndex": {
          "required": [
            "Anonymize_Iebirugq1dbhv6_"
          ],
          "optional": [],
          "description": "Storage item DelegatorNextIndex",
          "returnType": "number"
        },
        "Validators": {
          "required": [
            "Anonymize_Iebirugq1dbhv6_"
          ],
          "optional": [],
          "description": "Storage item Validators",
          "returnType": "unknown"
        },
        "ValidatorBoostList": {
          "required": [
            "Anonymize_Iebirugq1dbhv6_"
          ],
          "optional": [],
          "description": "Storage item ValidatorBoostList",
          "returnType": "unknown"
        },
        "ValidatorsByDelegator": {
          "required": [],
          "optional": [],
          "description": "Storage item ValidatorsByDelegator",
          "returnType": "unknown"
        },
        "ValidatorsByDelegatorXcmUpdateQueue": {
          "required": [
            "u64"
          ],
          "optional": [],
          "description": "Storage item ValidatorsByDelegatorXcmUpdateQueue",
          "returnType": "unknown"
        },
        "DelegatorLedgers": {
          "required": [],
          "optional": [],
          "description": "Storage item DelegatorLedgers",
          "returnType": "unknown"
        },
        "DelegatorLedgerXcmUpdateQueue": {
          "required": [
            "u64"
          ],
          "optional": [],
          "description": "Storage item DelegatorLedgerXcmUpdateQueue",
          "returnType": "unknown"
        },
        "MinimumsAndMaximums": {
          "required": [
            "Anonymize_Iebirugq1dbhv6_"
          ],
          "optional": [],
          "description": "Storage item MinimumsAndMaximums",
          "returnType": "unknown"
        },
        "CurrencyDelays": {
          "required": [
            "Anonymize_Iebirugq1dbhv6_"
          ],
          "optional": [],
          "description": "Storage item CurrencyDelays",
          "returnType": "unknown"
        },
        "DelegatorLatestTuneRecord": {
          "required": [],
          "optional": [],
          "description": "Storage item DelegatorLatestTuneRecord",
          "returnType": "unknown"
        },
        "CurrencyLatestTuneRecord": {
          "required": [
            "Anonymize_Iebirugq1dbhv6_"
          ],
          "optional": [],
          "description": "Storage item CurrencyLatestTuneRecord",
          "returnType": "unknown"
        },
        "CurrencyTuneExchangeRateLimit": {
          "required": [
            "Anonymize_Iebirugq1dbhv6_"
          ],
          "optional": [],
          "description": "Storage item CurrencyTuneExchangeRateLimit",
          "returnType": "unknown"
        },
        "DelegationsOccupied": {
          "required": [
            "Anonymize_Iebirugq1dbhv6_"
          ],
          "optional": [],
          "description": "Storage item DelegationsOccupied",
          "returnType": "boolean"
        },
        "LastTimeUpdatedOngoingTimeUnit": {
          "required": [
            "Anonymize_Iebirugq1dbhv6_"
          ],
          "optional": [],
          "description": "Storage item LastTimeUpdatedOngoingTimeUnit",
          "returnType": "number"
        },
        "OngoingTimeUnitUpdateInterval": {
          "required": [
            "Anonymize_Iebirugq1dbhv6_"
          ],
          "optional": [],
          "description": "Storage item OngoingTimeUnitUpdateInterval",
          "returnType": "number"
        },
        "SupplementFeeAccountWhitelist": {
          "required": [
            "Anonymize_Iebirugq1dbhv6_"
          ],
          "optional": [],
          "description": "Storage item SupplementFeeAccountWhitelist",
          "returnType": "unknown"
        }
      },
      "XcmInterface": {
        "XcmWeightAndFee": {
          "required": [],
          "optional": [],
          "description": "sufficient, otherwise the execution of XCM msg on relaychain will fail.",
          "returnType": "unknown"
        }
      },
      "TokenConversion": {
        "RelaychainLease": {
          "required": [],
          "optional": [],
          "description": "Storage item RelaychainLease",
          "returnType": "number"
        },
        "ExchangeRate": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item ExchangeRate",
          "returnType": "unknown"
        },
        "ExchangeFee": {
          "required": [],
          "optional": [],
          "description": "Storage item ExchangeFee",
          "returnType": "unknown"
        }
      },
      "Farming": {
        "PoolNextId": {
          "required": [],
          "optional": [],
          "description": "Storage item PoolNextId",
          "returnType": "number"
        },
        "GaugePoolNextId": {
          "required": [],
          "optional": [],
          "description": "Storage item GaugePoolNextId",
          "returnType": "number"
        },
        "RetireLimit": {
          "required": [],
          "optional": [],
          "description": "Storage item RetireLimit",
          "returnType": "number"
        },
        "PoolInfos": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item PoolInfos",
          "returnType": "unknown"
        },
        "GaugePoolInfos": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item GaugePoolInfos",
          "returnType": "unknown"
        },
        "GaugeInfos": {
          "required": [],
          "optional": [],
          "description": "Storage item GaugeInfos",
          "returnType": "unknown"
        },
        "SharesAndWithdrawnRewards": {
          "required": [],
          "optional": [],
          "description": "Storage item SharesAndWithdrawnRewards",
          "returnType": "unknown"
        },
        "BoostPoolInfos": {
          "required": [],
          "optional": [],
          "description": "Storage item BoostPoolInfos",
          "returnType": "unknown"
        },
        "UserBoostInfos": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item UserBoostInfos",
          "returnType": "unknown"
        },
        "BoostWhitelist": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item BoostWhitelist",
          "returnType": "null"
        },
        "BoostNextRoundWhitelist": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item BoostNextRoundWhitelist",
          "returnType": "null"
        },
        "BoostVotingPools": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item BoostVotingPools",
          "returnType": "bigint"
        },
        "BoostBasicRewards": {
          "required": [],
          "optional": [],
          "description": "Storage item BoostBasicRewards",
          "returnType": "bigint"
        },
        "UserFarmingPool": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item UserFarmingPool",
          "returnType": "unknown"
        }
      },
      "SystemStaking": {
        "Round": {
          "required": [],
          "optional": [],
          "description": "Storage item Round",
          "returnType": "unknown"
        },
        "TokenStatus": {
          "required": [
            "Anonymize_Iebirugq1dbhv6_"
          ],
          "optional": [],
          "description": "Storage item TokenStatus",
          "returnType": "unknown"
        },
        "TokenList": {
          "required": [],
          "optional": [],
          "description": "Storage item TokenList",
          "returnType": "unknown"
        }
      },
      "FeeShare": {
        "DistributionInfos": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item DistributionInfos",
          "returnType": "unknown"
        },
        "TokensProportions": {
          "required": [],
          "optional": [],
          "description": "Storage item TokensProportions",
          "returnType": "number"
        },
        "DollarStandardInfos": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item DollarStandardInfos",
          "returnType": "unknown"
        },
        "DistributionNextId": {
          "required": [],
          "optional": [],
          "description": "Storage item DistributionNextId",
          "returnType": "number"
        },
        "AutoEra": {
          "required": [],
          "optional": [],
          "description": "Storage item AutoEra",
          "returnType": "unknown"
        }
      },
      "CrossInOut": {
        "CrossCurrencyRegistry": {
          "required": [
            "Anonymize_Iebirugq1dbhv6_"
          ],
          "optional": [],
          "description": "Storage item CrossCurrencyRegistry",
          "returnType": "null"
        },
        "IssueWhiteList": {
          "required": [
            "Anonymize_Iebirugq1dbhv6_"
          ],
          "optional": [],
          "description": "Storage item IssueWhiteList",
          "returnType": "unknown"
        },
        "RegisterWhiteList": {
          "required": [
            "Anonymize_Iebirugq1dbhv6_"
          ],
          "optional": [],
          "description": "Storage item RegisterWhiteList",
          "returnType": "unknown"
        },
        "AccountToOuterMultilocation": {
          "required": [],
          "optional": [],
          "description": "Storage item AccountToOuterMultilocation",
          "returnType": "unknown"
        },
        "OuterMultilocationToAccount": {
          "required": [],
          "optional": [],
          "description": "Storage item OuterMultilocationToAccount",
          "returnType": "string"
        },
        "CrossingMinimumAmount": {
          "required": [
            "Anonymize_Iebirugq1dbhv6_"
          ],
          "optional": [],
          "description": "Storage item CrossingMinimumAmount",
          "returnType": "unknown"
        }
      },
      "BbBNC": {
        "Supply": {
          "required": [],
          "optional": [],
          "description": "Storage item Supply",
          "returnType": "bigint"
        },
        "BbConfigs": {
          "required": [],
          "optional": [],
          "description": "Storage item BbConfigs",
          "returnType": "unknown"
        },
        "Epoch": {
          "required": [],
          "optional": [],
          "description": "Storage item Epoch",
          "returnType": "unknown"
        },
        "Locked": {
          "required": [
            "u64"
          ],
          "optional": [],
          "description": "Storage item Locked",
          "returnType": "unknown"
        },
        "UserLocked": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item UserLocked",
          "returnType": "bigint"
        },
        "PointHistory": {
          "required": [
            "Anonymize_I4totqt881mlti_"
          ],
          "optional": [],
          "description": "Storage item PointHistory",
          "returnType": "unknown"
        },
        "UserPointHistory": {
          "required": [],
          "optional": [],
          "description": "Storage item UserPointHistory",
          "returnType": "unknown"
        },
        "UserPointEpoch": {
          "required": [
            "u64"
          ],
          "optional": [],
          "description": "Storage item UserPointEpoch",
          "returnType": "unknown"
        },
        "SlopeChanges": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item SlopeChanges",
          "returnType": "bigint"
        },
        "IncentiveConfigs": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item IncentiveConfigs",
          "returnType": "unknown"
        },
        "UserRewardPerTokenPaid": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item UserRewardPerTokenPaid",
          "returnType": "unknown"
        },
        "Rewards": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Rewards",
          "returnType": "unknown"
        },
        "UserMarkupInfos": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item UserMarkupInfos",
          "returnType": "unknown"
        },
        "LockedTokens": {
          "required": [],
          "optional": [],
          "description": "Storage item LockedTokens",
          "returnType": "unknown"
        },
        "TotalLock": {
          "required": [
            "Anonymize_Iebirugq1dbhv6_"
          ],
          "optional": [],
          "description": "Storage item TotalLock",
          "returnType": "bigint"
        },
        "MarkupCoefficient": {
          "required": [
            "Anonymize_Iebirugq1dbhv6_"
          ],
          "optional": [],
          "description": "Storage item MarkupCoefficient",
          "returnType": "unknown"
        },
        "Position": {
          "required": [],
          "optional": [],
          "description": "Storage item Position",
          "returnType": "bigint"
        },
        "UserPositions": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item UserPositions",
          "returnType": "unknown"
        },
        "ExpiringPositions": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item ExpiringPositions",
          "returnType": "unknown"
        },
        "NextExpiringBlock": {
          "required": [],
          "optional": [],
          "description": "Storage item NextExpiringBlock",
          "returnType": "number"
        },
        "PositionOwner": {
          "required": [
            "u64"
          ],
          "optional": [],
          "description": "Storage item PositionOwner",
          "returnType": "string"
        }
      },
      "Slpx": {
        "WhitelistAccountId": {
          "required": [
            "Anonymize_I3em9l2q88o7if_"
          ],
          "optional": [],
          "description": "Storage item WhitelistAccountId",
          "returnType": "unknown"
        },
        "ExecutionFee": {
          "required": [
            "Anonymize_Iebirugq1dbhv6_"
          ],
          "optional": [],
          "description": "Storage item ExecutionFee",
          "returnType": "bigint"
        },
        "TransferToFee": {
          "required": [
            "Anonymize_I3em9l2q88o7if_"
          ],
          "optional": [],
          "description": "Storage item TransferToFee",
          "returnType": "bigint"
        },
        "XcmEthereumCallConfiguration": {
          "required": [],
          "optional": [],
          "description": "Storage item XcmEthereumCallConfiguration",
          "returnType": "unknown"
        },
        "CurrencyIdList": {
          "required": [],
          "optional": [],
          "description": "Storage item CurrencyIdList",
          "returnType": "unknown"
        },
        "SupportXcmFeeList": {
          "required": [],
          "optional": [],
          "description": "Storage item SupportXcmFeeList",
          "returnType": "unknown"
        },
        "OrderQueue": {
          "required": [],
          "optional": [],
          "description": "Storage item OrderQueue",
          "returnType": "unknown"
        },
        "DelayBlock": {
          "required": [],
          "optional": [],
          "description": "Storage item DelayBlock",
          "returnType": "number"
        },
        "HyperBridgeOracle": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item HyperBridgeOracle",
          "returnType": "unknown"
        },
        "HydrationOracle": {
          "required": [],
          "optional": [],
          "description": "Storage item HydrationOracle",
          "returnType": "unknown"
        },
        "AsyncMintConfig": {
          "required": [],
          "optional": [],
          "description": "Storage item AsyncMintConfig",
          "returnType": "unknown"
        },
        "AsyncMintExecutions": {
          "required": [
            "Anonymize_I3thiua0nporjs_"
          ],
          "optional": [],
          "description": "Storage item AsyncMintExecutions",
          "returnType": "unknown"
        },
        "HyperBridgeFeeExemptAccounts": {
          "required": [],
          "optional": [],
          "description": "Storage item HyperBridgeFeeExemptAccounts",
          "returnType": "unknown"
        }
      },
      "FellowshipCollective": {
        "MemberCount": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item MemberCount",
          "returnType": "number"
        },
        "Members": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Members",
          "returnType": "number"
        },
        "IdToIndex": {
          "required": [],
          "optional": [],
          "description": "Storage item IdToIndex",
          "returnType": "number"
        },
        "IndexToId": {
          "required": [],
          "optional": [],
          "description": "Storage item IndexToId",
          "returnType": "string"
        },
        "Voting": {
          "required": [],
          "optional": [],
          "description": "Storage item Voting",
          "returnType": "unknown"
        },
        "VotingCleanup": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item VotingCleanup",
          "returnType": "Uint8Array"
        }
      },
      "FellowshipReferenda": {
        "ReferendumCount": {
          "required": [],
          "optional": [],
          "description": "Storage item ReferendumCount",
          "returnType": "number"
        },
        "ReferendumInfoFor": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item ReferendumInfoFor",
          "returnType": "unknown"
        },
        "TrackQueue": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item TrackQueue",
          "returnType": "unknown"
        },
        "DecidingCount": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item DecidingCount",
          "returnType": "number"
        },
        "MetadataOf": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item MetadataOf",
          "returnType": "Hash"
        }
      },
      "StableAsset": {
        "PoolCount": {
          "required": [],
          "optional": [],
          "description": "Storage item PoolCount",
          "returnType": "number"
        },
        "Pools": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item Pools",
          "returnType": "unknown"
        },
        "TokenRateCaches": {
          "required": [],
          "optional": [],
          "description": "Storage item TokenRateCaches",
          "returnType": "unknown"
        },
        "TokenRateHardcap": {
          "required": [
            "Anonymize_Iebirugq1dbhv6_"
          ],
          "optional": [],
          "description": "Storage item TokenRateHardcap",
          "returnType": "number"
        }
      },
      "VtokenVoting": {
        "ReferendumInfoFor": {
          "required": [],
          "optional": [],
          "description": "Storage item ReferendumInfoFor",
          "returnType": "unknown"
        },
        "VotingForV2": {
          "required": [],
          "optional": [],
          "description": "Storage item VotingForV2",
          "returnType": "unknown"
        },
        "ClassLocksFor": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item ClassLocksFor",
          "returnType": "unknown"
        },
        "PendingReferendumInfo": {
          "required": [
            "u64"
          ],
          "optional": [],
          "description": "Storage item PendingReferendumInfo",
          "returnType": "unknown"
        },
        "PendingVotingInfo": {
          "required": [
            "u64"
          ],
          "optional": [],
          "description": "Storage item PendingVotingInfo",
          "returnType": "unknown"
        },
        "PendingRemoveDelegatorVote": {
          "required": [
            "u64"
          ],
          "optional": [],
          "description": "Storage item PendingRemoveDelegatorVote",
          "returnType": "unknown"
        },
        "VoteLockingPeriod": {
          "required": [
            "Anonymize_Iebirugq1dbhv6_"
          ],
          "optional": [],
          "description": "Storage item VoteLockingPeriod",
          "returnType": "number"
        },
        "UndecidingTimeout": {
          "required": [
            "Anonymize_Iebirugq1dbhv6_"
          ],
          "optional": [],
          "description": "Storage item UndecidingTimeout",
          "returnType": "number"
        },
        "Delegators": {
          "required": [
            "Anonymize_Iebirugq1dbhv6_"
          ],
          "optional": [],
          "description": "Storage item Delegators",
          "returnType": "unknown"
        },
        "VoteCapRatio": {
          "required": [
            "Anonymize_Iebirugq1dbhv6_"
          ],
          "optional": [],
          "description": "Storage item VoteCapRatio",
          "returnType": "number"
        },
        "DelegatorVotes": {
          "required": [],
          "optional": [],
          "description": "Storage item DelegatorVotes",
          "returnType": "unknown"
        },
        "PendingDelegatorVotes": {
          "required": [],
          "optional": [],
          "description": "Storage item PendingDelegatorVotes",
          "returnType": "unknown"
        },
        "ReferendumTimeoutV3": {
          "required": [],
          "optional": [],
          "description": "Storage item ReferendumTimeoutV3",
          "returnType": "unknown"
        },
        "VoteDelegatorFor": {
          "required": [],
          "optional": [],
          "description": "Storage item VoteDelegatorFor",
          "returnType": "number"
        },
        "ReferendumVoteStatusStore": {
          "required": [],
          "optional": [],
          "description": "Storage item ReferendumVoteStatusStore",
          "returnType": "unknown"
        }
      },
      "LendMarket": {
        "LastAccruedInterestTime": {
          "required": [
            "Anonymize_Iebirugq1dbhv6_"
          ],
          "optional": [],
          "description": "Storage item LastAccruedInterestTime",
          "returnType": "bigint"
        },
        "LiquidationFreeCollaterals": {
          "required": [],
          "optional": [],
          "description": "Storage item LiquidationFreeCollaterals",
          "returnType": "unknown"
        },
        "TotalSupply": {
          "required": [
            "Anonymize_Iebirugq1dbhv6_"
          ],
          "optional": [],
          "description": "Storage item TotalSupply",
          "returnType": "bigint"
        },
        "TotalBorrows": {
          "required": [
            "Anonymize_Iebirugq1dbhv6_"
          ],
          "optional": [],
          "description": "Storage item TotalBorrows",
          "returnType": "bigint"
        },
        "TotalReserves": {
          "required": [
            "Anonymize_Iebirugq1dbhv6_"
          ],
          "optional": [],
          "description": "Storage item TotalReserves",
          "returnType": "bigint"
        },
        "AccountBorrows": {
          "required": [],
          "optional": [],
          "description": "Storage item AccountBorrows",
          "returnType": "unknown"
        },
        "AccountDeposits": {
          "required": [],
          "optional": [],
          "description": "Storage item AccountDeposits",
          "returnType": "unknown"
        },
        "AccountEarned": {
          "required": [],
          "optional": [],
          "description": "Storage item AccountEarned",
          "returnType": "unknown"
        },
        "BorrowIndex": {
          "required": [
            "Anonymize_Iebirugq1dbhv6_"
          ],
          "optional": [],
          "description": "Storage item BorrowIndex",
          "returnType": "bigint"
        },
        "ExchangeRate": {
          "required": [
            "Anonymize_Iebirugq1dbhv6_"
          ],
          "optional": [],
          "description": "Storage item ExchangeRate",
          "returnType": "bigint"
        },
        "BorrowRate": {
          "required": [
            "Anonymize_Iebirugq1dbhv6_"
          ],
          "optional": [],
          "description": "Storage item BorrowRate",
          "returnType": "bigint"
        },
        "SupplyRate": {
          "required": [
            "Anonymize_Iebirugq1dbhv6_"
          ],
          "optional": [],
          "description": "Storage item SupplyRate",
          "returnType": "bigint"
        },
        "UtilizationRatio": {
          "required": [
            "Anonymize_Iebirugq1dbhv6_"
          ],
          "optional": [],
          "description": "Storage item UtilizationRatio",
          "returnType": "number"
        },
        "Markets": {
          "required": [
            "Anonymize_Iebirugq1dbhv6_"
          ],
          "optional": [],
          "description": "Storage item Markets",
          "returnType": "unknown"
        },
        "UnderlyingAssetId": {
          "required": [
            "Anonymize_Iebirugq1dbhv6_"
          ],
          "optional": [],
          "description": "Storage item UnderlyingAssetId",
          "returnType": "unknown"
        },
        "RewardSupplySpeed": {
          "required": [
            "Anonymize_Iebirugq1dbhv6_"
          ],
          "optional": [],
          "description": "Storage item RewardSupplySpeed",
          "returnType": "bigint"
        },
        "RewardBorrowSpeed": {
          "required": [
            "Anonymize_Iebirugq1dbhv6_"
          ],
          "optional": [],
          "description": "Storage item RewardBorrowSpeed",
          "returnType": "bigint"
        },
        "RewardSupplyState": {
          "required": [
            "Anonymize_Iebirugq1dbhv6_"
          ],
          "optional": [],
          "description": "Storage item RewardSupplyState",
          "returnType": "unknown"
        },
        "RewardBorrowState": {
          "required": [
            "Anonymize_Iebirugq1dbhv6_"
          ],
          "optional": [],
          "description": "Storage item RewardBorrowState",
          "returnType": "unknown"
        },
        "RewardSupplierIndex": {
          "required": [],
          "optional": [],
          "description": "Storage item RewardSupplierIndex",
          "returnType": "bigint"
        },
        "RewardBorrowerIndex": {
          "required": [],
          "optional": [],
          "description": "Storage item RewardBorrowerIndex",
          "returnType": "bigint"
        },
        "RewardAccured": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item RewardAccured",
          "returnType": "bigint"
        },
        "MarketBond": {
          "required": [
            "Anonymize_Iebirugq1dbhv6_"
          ],
          "optional": [],
          "description": "Storage item MarketBond",
          "returnType": "unknown"
        }
      },
      "Prices": {
        "EmergencyPrice": {
          "required": [
            "Anonymize_Iebirugq1dbhv6_"
          ],
          "optional": [],
          "description": "Storage item EmergencyPrice",
          "returnType": "bigint"
        },
        "ForeignToNativeAsset": {
          "required": [
            "Anonymize_Iebirugq1dbhv6_"
          ],
          "optional": [],
          "description": "Storage item ForeignToNativeAsset",
          "returnType": "unknown"
        }
      },
      "Oracle": {
        "RawValues": {
          "required": [],
          "optional": [],
          "description": "Storage item RawValues",
          "returnType": "unknown"
        },
        "Values": {
          "required": [
            "Anonymize_Iebirugq1dbhv6_"
          ],
          "optional": [],
          "description": "Storage item Values",
          "returnType": "unknown"
        },
        "HasDispatched": {
          "required": [],
          "optional": [],
          "description": "Storage item HasDispatched",
          "returnType": "unknown"
        }
      },
      "OracleMembership": {
        "Members": {
          "required": [],
          "optional": [],
          "description": "Storage item Members",
          "returnType": "unknown"
        },
        "Prime": {
          "required": [],
          "optional": [],
          "description": "Storage item Prime",
          "returnType": "string"
        }
      },
      "ChannelCommission": {
        "ChannelNextId": {
          "required": [],
          "optional": [],
          "description": "Storage item ChannelNextId",
          "returnType": "number"
        },
        "Channels": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item Channels",
          "returnType": "unknown"
        },
        "CommissionTokens": {
          "required": [
            "Anonymize_Iebirugq1dbhv6_"
          ],
          "optional": [],
          "description": "Storage item CommissionTokens",
          "returnType": "unknown"
        },
        "ChannelCommissionTokenRates": {
          "required": [],
          "optional": [],
          "description": "Storage item ChannelCommissionTokenRates",
          "returnType": "number"
        },
        "ChannelVtokenShares": {
          "required": [],
          "optional": [],
          "description": "Storage item ChannelVtokenShares",
          "returnType": "number"
        },
        "VtokenIssuanceSnapshots": {
          "required": [
            "Anonymize_Iebirugq1dbhv6_"
          ],
          "optional": [],
          "description": "Storage item VtokenIssuanceSnapshots",
          "returnType": "unknown"
        },
        "PeriodVtokenTotalMint": {
          "required": [
            "Anonymize_Iebirugq1dbhv6_"
          ],
          "optional": [],
          "description": "Storage item PeriodVtokenTotalMint",
          "returnType": "unknown"
        },
        "PeriodVtokenTotalRedeem": {
          "required": [
            "Anonymize_Iebirugq1dbhv6_"
          ],
          "optional": [],
          "description": "Storage item PeriodVtokenTotalRedeem",
          "returnType": "unknown"
        },
        "PeriodChannelVtokenMint": {
          "required": [],
          "optional": [],
          "description": "Storage item PeriodChannelVtokenMint",
          "returnType": "unknown"
        },
        "PeriodTotalCommissions": {
          "required": [
            "Anonymize_Iebirugq1dbhv6_"
          ],
          "optional": [],
          "description": "Storage item PeriodTotalCommissions",
          "returnType": "unknown"
        },
        "PeriodClearedCommissions": {
          "required": [
            "Anonymize_Iebirugq1dbhv6_"
          ],
          "optional": [],
          "description": "Storage item PeriodClearedCommissions",
          "returnType": "bigint"
        },
        "ChannelClaimableCommissions": {
          "required": [],
          "optional": [],
          "description": "Storage item ChannelClaimableCommissions",
          "returnType": "bigint"
        }
      },
      "BuyBack": {
        "Infos": {
          "required": [
            "Anonymize_Iebirugq1dbhv6_"
          ],
          "optional": [],
          "description": "Storage item Infos",
          "returnType": "unknown"
        },
        "SwapOutMin": {
          "required": [
            "Anonymize_Iebirugq1dbhv6_"
          ],
          "optional": [],
          "description": "Storage item SwapOutMin",
          "returnType": "bigint"
        },
        "AddLiquiditySwapOutMin": {
          "required": [
            "Anonymize_Iebirugq1dbhv6_"
          ],
          "optional": [],
          "description": "Storage item AddLiquiditySwapOutMin",
          "returnType": "bigint"
        }
      },
      "SlpV2": {
        "ConfigurationByStakingProtocol": {
          "required": [
            "Anonymize_Icj6nnp3j96bc6_"
          ],
          "optional": [],
          "description": "Storage item ConfigurationByStakingProtocol",
          "returnType": "unknown"
        },
        "DelegatorByStakingProtocolAndDelegatorIndex": {
          "required": [],
          "optional": [],
          "description": "Storage item DelegatorByStakingProtocolAndDelegatorIndex",
          "returnType": "unknown"
        },
        "DelegatorIndexByStakingProtocolAndDelegator": {
          "required": [],
          "optional": [],
          "description": "Storage item DelegatorIndexByStakingProtocolAndDelegator",
          "returnType": "number"
        },
        "LedgerByStakingProtocolAndDelegator": {
          "required": [],
          "optional": [],
          "description": "Storage item LedgerByStakingProtocolAndDelegator",
          "returnType": "unknown"
        },
        "ValidatorsByStakingProtocolAndDelegator": {
          "required": [],
          "optional": [],
          "description": "Storage item ValidatorsByStakingProtocolAndDelegator",
          "returnType": "unknown"
        },
        "NextDelegatorIndexByStakingProtocol": {
          "required": [
            "Anonymize_Icj6nnp3j96bc6_"
          ],
          "optional": [],
          "description": "Storage item NextDelegatorIndexByStakingProtocol",
          "returnType": "number"
        },
        "PendingStatusByQueryId": {
          "required": [
            "u64"
          ],
          "optional": [],
          "description": "Storage item PendingStatusByQueryId",
          "returnType": "unknown"
        },
        "LastUpdateOngoingTimeUnitBlockNumber": {
          "required": [
            "Anonymize_Icj6nnp3j96bc6_"
          ],
          "optional": [],
          "description": "Storage item LastUpdateOngoingTimeUnitBlockNumber",
          "returnType": "number"
        },
        "LastUpdateTokenExchangeRateBlockNumber": {
          "required": [],
          "optional": [],
          "description": "Storage item LastUpdateTokenExchangeRateBlockNumber",
          "returnType": "number"
        }
      }
    }
  },
  "hydration": {
    "pallets": {
      "System": {
        "Account": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Account",
          "returnType": "unknown"
        },
        "ExtrinsicCount": {
          "required": [],
          "optional": [],
          "description": "Storage item ExtrinsicCount",
          "returnType": "number"
        },
        "InherentsApplied": {
          "required": [],
          "optional": [],
          "description": "Storage item InherentsApplied",
          "returnType": "boolean"
        },
        "BlockWeight": {
          "required": [],
          "optional": [],
          "description": "Storage item BlockWeight",
          "returnType": "unknown"
        },
        "AllExtrinsicsLen": {
          "required": [],
          "optional": [],
          "description": "Storage item AllExtrinsicsLen",
          "returnType": "number"
        },
        "BlockHash": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item BlockHash",
          "returnType": "Hash"
        },
        "ExtrinsicData": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item ExtrinsicData",
          "returnType": "Uint8Array"
        },
        "Number": {
          "required": [],
          "optional": [],
          "description": "Storage item Number",
          "returnType": "number"
        },
        "ParentHash": {
          "required": [],
          "optional": [],
          "description": "Storage item ParentHash",
          "returnType": "Hash"
        },
        "Digest": {
          "required": [],
          "optional": [],
          "description": "Storage item Digest",
          "returnType": "unknown"
        },
        "Events": {
          "required": [],
          "optional": [],
          "description": "Storage item Events",
          "returnType": "unknown"
        },
        "EventCount": {
          "required": [],
          "optional": [],
          "description": "Storage item EventCount",
          "returnType": "number"
        },
        "EventTopics": {
          "required": [
            "Hash"
          ],
          "optional": [],
          "description": "Storage item EventTopics",
          "returnType": "unknown"
        },
        "LastRuntimeUpgrade": {
          "required": [],
          "optional": [],
          "description": "Storage item LastRuntimeUpgrade",
          "returnType": "unknown"
        },
        "UpgradedToU32RefCount": {
          "required": [],
          "optional": [],
          "description": "Storage item UpgradedToU32RefCount",
          "returnType": "boolean"
        },
        "UpgradedToTripleRefCount": {
          "required": [],
          "optional": [],
          "description": "Storage item UpgradedToTripleRefCount",
          "returnType": "boolean"
        },
        "ExecutionPhase": {
          "required": [],
          "optional": [],
          "description": "Storage item ExecutionPhase",
          "returnType": "Phase"
        },
        "AuthorizedUpgrade": {
          "required": [],
          "optional": [],
          "description": "Storage item AuthorizedUpgrade",
          "returnType": "unknown"
        }
      },
      "Timestamp": {
        "Now": {
          "required": [],
          "optional": [],
          "description": "Storage item Now",
          "returnType": "bigint"
        },
        "DidUpdate": {
          "required": [],
          "optional": [],
          "description": "Storage item DidUpdate",
          "returnType": "boolean"
        }
      },
      "Balances": {
        "TotalIssuance": {
          "required": [],
          "optional": [],
          "description": "Storage item TotalIssuance",
          "returnType": "bigint"
        },
        "InactiveIssuance": {
          "required": [],
          "optional": [],
          "description": "Storage item InactiveIssuance",
          "returnType": "bigint"
        },
        "Account": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Account",
          "returnType": "unknown"
        },
        "Locks": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Locks",
          "returnType": "unknown"
        },
        "Reserves": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Reserves",
          "returnType": "unknown"
        },
        "Holds": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Holds",
          "returnType": "unknown"
        },
        "Freezes": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Freezes",
          "returnType": "unknown"
        }
      },
      "TransactionPayment": {
        "NextFeeMultiplier": {
          "required": [],
          "optional": [],
          "description": "Storage item NextFeeMultiplier",
          "returnType": "bigint"
        },
        "StorageVersion": {
          "required": [],
          "optional": [],
          "description": "Storage item StorageVersion",
          "returnType": "TransactionPaymentReleases"
        }
      },
      "MultiTransactionPayment": {
        "AccountCurrencyMap": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item AccountCurrencyMap",
          "returnType": "number"
        },
        "AcceptedCurrencies": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item AcceptedCurrencies",
          "returnType": "bigint"
        },
        "AcceptedCurrencyPrice": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item AcceptedCurrencyPrice",
          "returnType": "bigint"
        },
        "TransactionCurrencyOverride": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item TransactionCurrencyOverride",
          "returnType": "number"
        }
      },
      "Treasury": {
        "ProposalCount": {
          "required": [],
          "optional": [],
          "description": "Storage item ProposalCount",
          "returnType": "number"
        },
        "Proposals": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item Proposals",
          "returnType": "unknown"
        },
        "Deactivated": {
          "required": [],
          "optional": [],
          "description": "Storage item Deactivated",
          "returnType": "bigint"
        },
        "Approvals": {
          "required": [],
          "optional": [],
          "description": "Storage item Approvals",
          "returnType": "unknown"
        },
        "SpendCount": {
          "required": [],
          "optional": [],
          "description": "Storage item SpendCount",
          "returnType": "number"
        },
        "Spends": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item Spends",
          "returnType": "unknown"
        }
      },
      "Preimage": {
        "StatusFor": {
          "required": [
            "Hash"
          ],
          "optional": [],
          "description": "Storage item StatusFor",
          "returnType": "PreimageOldRequestStatus"
        },
        "RequestStatusFor": {
          "required": [
            "Hash"
          ],
          "optional": [],
          "description": "Storage item RequestStatusFor",
          "returnType": "PreimageRequestStatus"
        },
        "PreimageFor": {
          "required": [
            "Anonymize_I4pact7n2e9a0i_"
          ],
          "optional": [],
          "description": "Storage item PreimageFor",
          "returnType": "Uint8Array"
        }
      },
      "Identity": {
        "IdentityOf": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item IdentityOf",
          "returnType": "unknown"
        },
        "SuperOf": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item SuperOf",
          "returnType": "unknown"
        },
        "SubsOf": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item SubsOf",
          "returnType": "unknown"
        },
        "Registrars": {
          "required": [],
          "optional": [],
          "description": "Storage item Registrars",
          "returnType": "unknown"
        },
        "UsernameAuthorities": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item UsernameAuthorities",
          "returnType": "unknown"
        },
        "AccountOfUsername": {
          "required": [
            "bytes"
          ],
          "optional": [],
          "description": "Storage item AccountOfUsername",
          "returnType": "string"
        },
        "PendingUsernames": {
          "required": [
            "bytes"
          ],
          "optional": [],
          "description": "Storage item PendingUsernames",
          "returnType": "unknown"
        }
      },
      "Democracy": {
        "PublicPropCount": {
          "required": [],
          "optional": [],
          "description": "Storage item PublicPropCount",
          "returnType": "number"
        },
        "PublicProps": {
          "required": [],
          "optional": [],
          "description": "Storage item PublicProps",
          "returnType": "unknown"
        },
        "DepositOf": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item DepositOf",
          "returnType": "unknown"
        },
        "ReferendumCount": {
          "required": [],
          "optional": [],
          "description": "Storage item ReferendumCount",
          "returnType": "number"
        },
        "LowestUnbaked": {
          "required": [],
          "optional": [],
          "description": "Storage item LowestUnbaked",
          "returnType": "number"
        },
        "ReferendumInfoOf": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item ReferendumInfoOf",
          "returnType": "unknown"
        },
        "VotingOf": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item VotingOf",
          "returnType": "unknown"
        },
        "LastTabledWasExternal": {
          "required": [],
          "optional": [],
          "description": "Storage item LastTabledWasExternal",
          "returnType": "boolean"
        },
        "NextExternal": {
          "required": [],
          "optional": [],
          "description": "Storage item NextExternal",
          "returnType": "unknown"
        },
        "Blacklist": {
          "required": [
            "Hash"
          ],
          "optional": [],
          "description": "Storage item Blacklist",
          "returnType": "unknown"
        },
        "Cancellations": {
          "required": [
            "Hash"
          ],
          "optional": [],
          "description": "Storage item Cancellations",
          "returnType": "boolean"
        },
        "MetadataOf": {
          "required": [
            "Anonymize_I2itl2k1j2q8nf_"
          ],
          "optional": [],
          "description": "Storage item MetadataOf",
          "returnType": "Hash"
        }
      },
      "TechnicalCommittee": {
        "Proposals": {
          "required": [],
          "optional": [],
          "description": "Storage item Proposals",
          "returnType": "unknown"
        },
        "ProposalOf": {
          "required": [
            "Hash"
          ],
          "optional": [],
          "description": "Storage item ProposalOf",
          "returnType": "unknown"
        },
        "Voting": {
          "required": [
            "Hash"
          ],
          "optional": [],
          "description": "Storage item Voting",
          "returnType": "unknown"
        },
        "ProposalCount": {
          "required": [],
          "optional": [],
          "description": "Storage item ProposalCount",
          "returnType": "number"
        },
        "Members": {
          "required": [],
          "optional": [],
          "description": "Storage item Members",
          "returnType": "unknown"
        },
        "Prime": {
          "required": [],
          "optional": [],
          "description": "Storage item Prime",
          "returnType": "string"
        }
      },
      "Proxy": {
        "Proxies": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Proxies",
          "returnType": "unknown"
        },
        "Announcements": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Announcements",
          "returnType": "unknown"
        }
      },
      "Multisig": {
        "Multisigs": {
          "required": [],
          "optional": [],
          "description": "Storage item Multisigs",
          "returnType": "unknown"
        }
      },
      "Uniques": {
        "Class": {
          "required": [
            "u64"
          ],
          "optional": [],
          "description": "Storage item Class",
          "returnType": "unknown"
        },
        "OwnershipAcceptance": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item OwnershipAcceptance",
          "returnType": "bigint"
        },
        "Account": {
          "required": [],
          "optional": [],
          "description": "Storage item Account",
          "returnType": "null"
        },
        "ClassAccount": {
          "required": [],
          "optional": [],
          "description": "Storage item ClassAccount",
          "returnType": "null"
        },
        "Asset": {
          "required": [],
          "optional": [],
          "description": "Storage item Asset",
          "returnType": "unknown"
        },
        "ClassMetadataOf": {
          "required": [
            "u64"
          ],
          "optional": [],
          "description": "Storage item ClassMetadataOf",
          "returnType": "unknown"
        },
        "InstanceMetadataOf": {
          "required": [],
          "optional": [],
          "description": "Storage item InstanceMetadataOf",
          "returnType": "unknown"
        },
        "Attribute": {
          "required": [],
          "optional": [],
          "description": "Storage item Attribute",
          "returnType": "unknown"
        },
        "ItemPriceOf": {
          "required": [],
          "optional": [],
          "description": "Storage item ItemPriceOf",
          "returnType": "unknown"
        },
        "CollectionMaxSupply": {
          "required": [
            "u64"
          ],
          "optional": [],
          "description": "Storage item CollectionMaxSupply",
          "returnType": "number"
        }
      },
      "StateTrieMigration": {
        "MigrationProcess": {
          "required": [],
          "optional": [],
          "description": "Storage item MigrationProcess",
          "returnType": "unknown"
        },
        "AutoLimits": {
          "required": [],
          "optional": [],
          "description": "Storage item AutoLimits",
          "returnType": "unknown"
        },
        "SignedMigrationMaxLimits": {
          "required": [],
          "optional": [],
          "description": "Storage item SignedMigrationMaxLimits",
          "returnType": "unknown"
        }
      },
      "ConvictionVoting": {
        "VotingFor": {
          "required": [],
          "optional": [],
          "description": "Storage item VotingFor",
          "returnType": "ConvictionVotingVoteVoting"
        },
        "ClassLocksFor": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item ClassLocksFor",
          "returnType": "unknown"
        }
      },
      "Referenda": {
        "ReferendumCount": {
          "required": [],
          "optional": [],
          "description": "Storage item ReferendumCount",
          "returnType": "number"
        },
        "ReferendumInfoFor": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item ReferendumInfoFor",
          "returnType": "unknown"
        },
        "TrackQueue": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item TrackQueue",
          "returnType": "unknown"
        },
        "DecidingCount": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item DecidingCount",
          "returnType": "number"
        },
        "MetadataOf": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item MetadataOf",
          "returnType": "Hash"
        }
      },
      "Whitelist": {
        "WhitelistedCall": {
          "required": [
            "Hash"
          ],
          "optional": [],
          "description": "Storage item WhitelistedCall",
          "returnType": "null"
        }
      },
      "Dispatcher": {
        "AaveManagerAccount": {
          "required": [],
          "optional": [],
          "description": "Storage item AaveManagerAccount",
          "returnType": "string"
        },
        "ExtraGas": {
          "required": [],
          "optional": [],
          "description": "Storage item ExtraGas",
          "returnType": "bigint"
        }
      },
      "AssetRegistry": {
        "Assets": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item Assets",
          "returnType": "unknown"
        },
        "NextAssetId": {
          "required": [],
          "optional": [],
          "description": "Storage item NextAssetId",
          "returnType": "number"
        },
        "AssetIds": {
          "required": [
            "bytes"
          ],
          "optional": [],
          "description": "Storage item AssetIds",
          "returnType": "number"
        },
        "AssetLocations": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item AssetLocations",
          "returnType": "unknown"
        },
        "BannedAssets": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item BannedAssets",
          "returnType": "null"
        },
        "LocationAssets": {
          "required": [
            "Anonymize_I4c0s5cioidn76_"
          ],
          "optional": [],
          "description": "Storage item LocationAssets",
          "returnType": "number"
        },
        "ExistentialDepositCounter": {
          "required": [],
          "optional": [],
          "description": "Storage item ExistentialDepositCounter",
          "returnType": "bigint"
        }
      },
      "Claims": {
        "Claims": {
          "required": [
            "bytes"
          ],
          "optional": [],
          "description": "Storage item Claims",
          "returnType": "bigint"
        }
      },
      "GenesisHistory": {
        "PreviousChain": {
          "required": [],
          "optional": [],
          "description": "Storage item PreviousChain",
          "returnType": "unknown"
        }
      },
      "CollatorRewards": {
        "Collators": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item Collators",
          "returnType": "unknown"
        }
      },
      "Omnipool": {
        "Assets": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item Assets",
          "returnType": "unknown"
        },
        "HubAssetTradability": {
          "required": [],
          "optional": [],
          "description": "Storage item HubAssetTradability",
          "returnType": "number"
        },
        "Positions": {
          "required": [
            "u64"
          ],
          "optional": [],
          "description": "Storage item Positions",
          "returnType": "unknown"
        },
        "NextPositionId": {
          "required": [],
          "optional": [],
          "description": "Storage item NextPositionId",
          "returnType": "bigint"
        }
      },
      "TransactionPause": {
        "PausedTransactions": {
          "required": [
            "Anonymize_Idkbvh6dahk1v7_"
          ],
          "optional": [],
          "description": "Storage item PausedTransactions",
          "returnType": "null"
        }
      },
      "Duster": {
        "AccountBlacklist": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item AccountBlacklist",
          "returnType": "null"
        },
        "RewardAccount": {
          "required": [],
          "optional": [],
          "description": "Storage item RewardAccount",
          "returnType": "string"
        },
        "DustAccount": {
          "required": [],
          "optional": [],
          "description": "Storage item DustAccount",
          "returnType": "string"
        }
      },
      "OmnipoolWarehouseLM": {
        "FarmSequencer": {
          "required": [],
          "optional": [],
          "description": "Storage item FarmSequencer",
          "returnType": "number"
        },
        "DepositSequencer": {
          "required": [],
          "optional": [],
          "description": "Storage item DepositSequencer",
          "returnType": "bigint"
        },
        "GlobalFarm": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item GlobalFarm",
          "returnType": "unknown"
        },
        "YieldFarm": {
          "required": [],
          "optional": [],
          "description": "Storage item YieldFarm",
          "returnType": "unknown"
        },
        "Deposit": {
          "required": [
            "u64"
          ],
          "optional": [],
          "description": "Storage item Deposit",
          "returnType": "unknown"
        },
        "ActiveYieldFarm": {
          "required": [],
          "optional": [],
          "description": "Storage item ActiveYieldFarm",
          "returnType": "number"
        }
      },
      "OmnipoolLiquidityMining": {
        "OmniPositionId": {
          "required": [
            "u64"
          ],
          "optional": [],
          "description": "Storage item OmniPositionId",
          "returnType": "bigint"
        }
      },
      "OTC": {
        "NextOrderId": {
          "required": [],
          "optional": [],
          "description": "Storage item NextOrderId",
          "returnType": "number"
        },
        "Orders": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item Orders",
          "returnType": "unknown"
        }
      },
      "CircuitBreaker": {
        "TradeVolumeLimitPerAsset": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item TradeVolumeLimitPerAsset",
          "returnType": "unknown"
        },
        "AllowedTradeVolumeLimitPerAsset": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item AllowedTradeVolumeLimitPerAsset",
          "returnType": "unknown"
        },
        "LiquidityAddLimitPerAsset": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item LiquidityAddLimitPerAsset",
          "returnType": "unknown"
        },
        "AllowedAddLiquidityAmountPerAsset": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item AllowedAddLiquidityAmountPerAsset",
          "returnType": "unknown"
        },
        "AssetLockdownState": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item AssetLockdownState",
          "returnType": "unknown"
        },
        "LiquidityRemoveLimitPerAsset": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item LiquidityRemoveLimitPerAsset",
          "returnType": "unknown"
        },
        "AllowedRemoveLiquidityAmountPerAsset": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item AllowedRemoveLiquidityAmountPerAsset",
          "returnType": "unknown"
        }
      },
      "Router": {
        "Routes": {
          "required": [
            "Anonymize_I4kv0johj9i346_"
          ],
          "optional": [],
          "description": "Storage item Routes",
          "returnType": "unknown"
        }
      },
      "DynamicFees": {
        "AssetFee": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item AssetFee",
          "returnType": "unknown"
        },
        "AssetFeeConfiguration": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item AssetFeeConfiguration",
          "returnType": "unknown"
        }
      },
      "Staking": {
        "Staking": {
          "required": [],
          "optional": [],
          "description": "Storage item Staking",
          "returnType": "unknown"
        },
        "Positions": {
          "required": [
            "u64"
          ],
          "optional": [],
          "description": "Storage item Positions",
          "returnType": "unknown"
        },
        "NextPositionId": {
          "required": [],
          "optional": [],
          "description": "Storage item NextPositionId",
          "returnType": "bigint"
        },
        "Votes": {
          "required": [
            "u64"
          ],
          "optional": [],
          "description": "Storage item Votes",
          "returnType": "unknown"
        },
        "VotesRewarded": {
          "required": [],
          "optional": [],
          "description": "Storage item VotesRewarded",
          "returnType": "unknown"
        },
        "PositionVotes": {
          "required": [
            "u64"
          ],
          "optional": [],
          "description": "Storage item PositionVotes",
          "returnType": "unknown"
        },
        "ProcessedVotes": {
          "required": [],
          "optional": [],
          "description": "Storage item ProcessedVotes",
          "returnType": "unknown"
        },
        "SixSecBlocksSince": {
          "required": [],
          "optional": [],
          "description": "Storage item SixSecBlocksSince",
          "returnType": "number"
        }
      },
      "Stableswap": {
        "Pools": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item Pools",
          "returnType": "unknown"
        },
        "PoolPegs": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item PoolPegs",
          "returnType": "unknown"
        },
        "AssetTradability": {
          "required": [],
          "optional": [],
          "description": "Storage item AssetTradability",
          "returnType": "number"
        },
        "PoolSnapshots": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item PoolSnapshots",
          "returnType": "unknown"
        }
      },
      "Bonds": {
        "BondIds": {
          "required": [
            "Anonymize_I4ojmnsk1dchql_"
          ],
          "optional": [],
          "description": "Storage item BondIds",
          "returnType": "number"
        },
        "Bonds": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item Bonds",
          "returnType": "unknown"
        }
      },
      "LBP": {
        "PoolData": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item PoolData",
          "returnType": "unknown"
        },
        "FeeCollectorWithAsset": {
          "required": [],
          "optional": [],
          "description": "Storage item FeeCollectorWithAsset",
          "returnType": "boolean"
        }
      },
      "XYK": {
        "ShareToken": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item ShareToken",
          "returnType": "number"
        },
        "TotalLiquidity": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item TotalLiquidity",
          "returnType": "bigint"
        },
        "PoolAssets": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item PoolAssets",
          "returnType": "unknown"
        }
      },
      "Referrals": {
        "ReferralCodes": {
          "required": [
            "bytes"
          ],
          "optional": [],
          "description": "Storage item ReferralCodes",
          "returnType": "string"
        },
        "ReferralAccounts": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item ReferralAccounts",
          "returnType": "Uint8Array"
        },
        "LinkedAccounts": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item LinkedAccounts",
          "returnType": "string"
        },
        "ReferrerShares": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item ReferrerShares",
          "returnType": "bigint"
        },
        "TraderShares": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item TraderShares",
          "returnType": "bigint"
        },
        "TotalShares": {
          "required": [],
          "optional": [],
          "description": "Storage item TotalShares",
          "returnType": "bigint"
        },
        "Referrer": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Referrer",
          "returnType": "unknown"
        },
        "AssetRewards": {
          "required": [],
          "optional": [],
          "description": "Storage item AssetRewards",
          "returnType": "unknown"
        },
        "PendingConversions": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item PendingConversions",
          "returnType": "null"
        },
        "CounterForPendingConversions": {
          "required": [],
          "optional": [],
          "description": "Storage item CounterForPendingConversions",
          "returnType": "number"
        }
      },
      "Liquidation": {
        "BorrowingContract": {
          "required": [],
          "optional": [],
          "description": "Storage item BorrowingContract",
          "returnType": "Hash"
        }
      },
      "HSM": {
        "Collaterals": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item Collaterals",
          "returnType": "unknown"
        },
        "HollarAmountReceived": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item HollarAmountReceived",
          "returnType": "bigint"
        },
        "FlashMinter": {
          "required": [],
          "optional": [],
          "description": "Storage item FlashMinter",
          "returnType": "Hash"
        }
      },
      "Parameters": {
        "IsTestnet": {
          "required": [],
          "optional": [],
          "description": "Storage item IsTestnet",
          "returnType": "boolean"
        }
      },
      "Tokens": {
        "TotalIssuance": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item TotalIssuance",
          "returnType": "bigint"
        },
        "Locks": {
          "required": [],
          "optional": [],
          "description": "Storage item Locks",
          "returnType": "unknown"
        },
        "Accounts": {
          "required": [],
          "optional": [],
          "description": "Storage item Accounts",
          "returnType": "unknown"
        },
        "Reserves": {
          "required": [],
          "optional": [],
          "description": "Storage item Reserves",
          "returnType": "unknown"
        }
      },
      "Vesting": {
        "VestingSchedules": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Vesting schedules of an account.",
          "returnType": "unknown"
        }
      },
      "EVM": {
        "AccountCodes": {
          "required": [
            "bytes"
          ],
          "optional": [],
          "description": "Storage item AccountCodes",
          "returnType": "Uint8Array"
        },
        "AccountCodesMetadata": {
          "required": [
            "bytes"
          ],
          "optional": [],
          "description": "Storage item AccountCodesMetadata",
          "returnType": "unknown"
        },
        "AccountStorages": {
          "required": [],
          "optional": [],
          "description": "Storage item AccountStorages",
          "returnType": "Hash"
        },
        "Suicided": {
          "required": [
            "bytes"
          ],
          "optional": [],
          "description": "Storage item Suicided",
          "returnType": "null"
        }
      },
      "EVMChainId": {
        "ChainId": {
          "required": [],
          "optional": [],
          "description": "Storage item ChainId",
          "returnType": "bigint"
        }
      },
      "Ethereum": {
        "Pending": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item Pending",
          "returnType": "unknown"
        },
        "CounterForPending": {
          "required": [],
          "optional": [],
          "description": "Storage item CounterForPending",
          "returnType": "number"
        },
        "CurrentBlock": {
          "required": [],
          "optional": [],
          "description": "Storage item CurrentBlock",
          "returnType": "unknown"
        },
        "CurrentReceipts": {
          "required": [],
          "optional": [],
          "description": "Storage item CurrentReceipts",
          "returnType": "unknown"
        },
        "CurrentTransactionStatuses": {
          "required": [],
          "optional": [],
          "description": "Storage item CurrentTransactionStatuses",
          "returnType": "unknown"
        },
        "BlockHash": {
          "required": [
            "Anonymize_I4totqt881mlti_"
          ],
          "optional": [],
          "description": "Storage item BlockHash",
          "returnType": "Hash"
        }
      },
      "EVMAccounts": {
        "AccountExtension": {
          "required": [
            "bytes"
          ],
          "optional": [],
          "description": "Storage item AccountExtension",
          "returnType": "Hash"
        },
        "ContractDeployer": {
          "required": [
            "bytes"
          ],
          "optional": [],
          "description": "Storage item ContractDeployer",
          "returnType": "null"
        },
        "ApprovedContract": {
          "required": [
            "bytes"
          ],
          "optional": [],
          "description": "Storage item ApprovedContract",
          "returnType": "null"
        }
      },
      "DynamicEvmFee": {
        "BaseFeePerGas": {
          "required": [],
          "optional": [],
          "description": "Storage item BaseFeePerGas",
          "returnType": "unknown"
        }
      },
      "XYKWarehouseLM": {
        "FarmSequencer": {
          "required": [],
          "optional": [],
          "description": "Storage item FarmSequencer",
          "returnType": "number"
        },
        "DepositSequencer": {
          "required": [],
          "optional": [],
          "description": "Storage item DepositSequencer",
          "returnType": "bigint"
        },
        "GlobalFarm": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item GlobalFarm",
          "returnType": "unknown"
        },
        "YieldFarm": {
          "required": [],
          "optional": [],
          "description": "Storage item YieldFarm",
          "returnType": "unknown"
        },
        "Deposit": {
          "required": [
            "u64"
          ],
          "optional": [],
          "description": "Storage item Deposit",
          "returnType": "unknown"
        },
        "ActiveYieldFarm": {
          "required": [],
          "optional": [],
          "description": "Storage item ActiveYieldFarm",
          "returnType": "number"
        }
      },
      "DCA": {
        "ScheduleIdSequencer": {
          "required": [],
          "optional": [],
          "description": "Storage item ScheduleIdSequencer",
          "returnType": "number"
        },
        "Schedules": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item Schedules",
          "returnType": "unknown"
        },
        "ScheduleOwnership": {
          "required": [],
          "optional": [],
          "description": "Storage item ScheduleOwnership",
          "returnType": "null"
        },
        "RemainingAmounts": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item RemainingAmounts",
          "returnType": "bigint"
        },
        "RetriesOnError": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item RetriesOnError",
          "returnType": "number"
        },
        "ScheduleExecutionBlock": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item ScheduleExecutionBlock",
          "returnType": "number"
        },
        "ScheduleIdsPerBlock": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item ScheduleIdsPerBlock",
          "returnType": "unknown"
        }
      },
      "Scheduler": {
        "IncompleteSince": {
          "required": [],
          "optional": [],
          "description": "Storage item IncompleteSince",
          "returnType": "number"
        },
        "Agenda": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item Agenda",
          "returnType": "unknown"
        },
        "Retries": {
          "required": [
            "Anonymize_I9jd27rnpm8ttv_"
          ],
          "optional": [],
          "description": "Storage item Retries",
          "returnType": "unknown"
        },
        "Lookup": {
          "required": [
            "Hash"
          ],
          "optional": [],
          "description": "Storage item Lookup",
          "returnType": "unknown"
        }
      },
      "ParachainSystem": {
        "UnincludedSegment": {
          "required": [],
          "optional": [],
          "description": "Storage item UnincludedSegment",
          "returnType": "unknown"
        },
        "AggregatedUnincludedSegment": {
          "required": [],
          "optional": [],
          "description": "Storage item AggregatedUnincludedSegment",
          "returnType": "unknown"
        },
        "PendingValidationCode": {
          "required": [],
          "optional": [],
          "description": "Storage item PendingValidationCode",
          "returnType": "Uint8Array"
        },
        "NewValidationCode": {
          "required": [],
          "optional": [],
          "description": "Storage item NewValidationCode",
          "returnType": "Uint8Array"
        },
        "ValidationData": {
          "required": [],
          "optional": [],
          "description": "Storage item ValidationData",
          "returnType": "unknown"
        },
        "DidSetValidationCode": {
          "required": [],
          "optional": [],
          "description": "Storage item DidSetValidationCode",
          "returnType": "boolean"
        },
        "LastRelayChainBlockNumber": {
          "required": [],
          "optional": [],
          "description": "Storage item LastRelayChainBlockNumber",
          "returnType": "number"
        },
        "UpgradeRestrictionSignal": {
          "required": [],
          "optional": [],
          "description": "Storage item UpgradeRestrictionSignal",
          "returnType": "unknown"
        },
        "UpgradeGoAhead": {
          "required": [],
          "optional": [],
          "description": "Storage item UpgradeGoAhead",
          "returnType": "unknown"
        },
        "RelayStateProof": {
          "required": [],
          "optional": [],
          "description": "Storage item RelayStateProof",
          "returnType": "unknown"
        },
        "RelevantMessagingState": {
          "required": [],
          "optional": [],
          "description": "Storage item RelevantMessagingState",
          "returnType": "unknown"
        },
        "HostConfiguration": {
          "required": [],
          "optional": [],
          "description": "Storage item HostConfiguration",
          "returnType": "unknown"
        },
        "LastDmqMqcHead": {
          "required": [],
          "optional": [],
          "description": "Storage item LastDmqMqcHead",
          "returnType": "Hash"
        },
        "LastHrmpMqcHeads": {
          "required": [],
          "optional": [],
          "description": "Storage item LastHrmpMqcHeads",
          "returnType": "unknown"
        },
        "ProcessedDownwardMessages": {
          "required": [],
          "optional": [],
          "description": "Storage item ProcessedDownwardMessages",
          "returnType": "number"
        },
        "HrmpWatermark": {
          "required": [],
          "optional": [],
          "description": "Storage item HrmpWatermark",
          "returnType": "number"
        },
        "HrmpOutboundMessages": {
          "required": [],
          "optional": [],
          "description": "Storage item HrmpOutboundMessages",
          "returnType": "unknown"
        },
        "UpwardMessages": {
          "required": [],
          "optional": [],
          "description": "Storage item UpwardMessages",
          "returnType": "unknown"
        },
        "PendingUpwardMessages": {
          "required": [],
          "optional": [],
          "description": "Storage item PendingUpwardMessages",
          "returnType": "unknown"
        },
        "UpwardDeliveryFeeFactor": {
          "required": [],
          "optional": [],
          "description": "Storage item UpwardDeliveryFeeFactor",
          "returnType": "bigint"
        },
        "AnnouncedHrmpMessagesPerCandidate": {
          "required": [],
          "optional": [],
          "description": "Storage item AnnouncedHrmpMessagesPerCandidate",
          "returnType": "number"
        },
        "ReservedXcmpWeightOverride": {
          "required": [],
          "optional": [],
          "description": "Storage item ReservedXcmpWeightOverride",
          "returnType": "unknown"
        },
        "ReservedDmpWeightOverride": {
          "required": [],
          "optional": [],
          "description": "Storage item ReservedDmpWeightOverride",
          "returnType": "unknown"
        },
        "CustomValidationHeadData": {
          "required": [],
          "optional": [],
          "description": "Storage item CustomValidationHeadData",
          "returnType": "Uint8Array"
        }
      },
      "ParachainInfo": {
        "ParachainId": {
          "required": [],
          "optional": [],
          "description": "Storage item ParachainId",
          "returnType": "number"
        }
      },
      "PolkadotXcm": {
        "QueryCounter": {
          "required": [],
          "optional": [],
          "description": "Storage item QueryCounter",
          "returnType": "bigint"
        },
        "Queries": {
          "required": [
            "u64"
          ],
          "optional": [],
          "description": "Storage item Queries",
          "returnType": "XcmPalletQueryStatus"
        },
        "AssetTraps": {
          "required": [
            "Hash"
          ],
          "optional": [],
          "description": "Storage item AssetTraps",
          "returnType": "number"
        },
        "SafeXcmVersion": {
          "required": [],
          "optional": [],
          "description": "Storage item SafeXcmVersion",
          "returnType": "number"
        },
        "SupportedVersion": {
          "required": [],
          "optional": [],
          "description": "Storage item SupportedVersion",
          "returnType": "number"
        },
        "VersionNotifiers": {
          "required": [],
          "optional": [],
          "description": "Storage item VersionNotifiers",
          "returnType": "bigint"
        },
        "VersionNotifyTargets": {
          "required": [],
          "optional": [],
          "description": "Storage item VersionNotifyTargets",
          "returnType": "unknown"
        },
        "VersionDiscoveryQueue": {
          "required": [],
          "optional": [],
          "description": "Storage item VersionDiscoveryQueue",
          "returnType": "unknown"
        },
        "CurrentMigration": {
          "required": [],
          "optional": [],
          "description": "Storage item CurrentMigration",
          "returnType": "XcmPalletVersionMigrationStage"
        },
        "RemoteLockedFungibles": {
          "required": [],
          "optional": [],
          "description": "Storage item RemoteLockedFungibles",
          "returnType": "unknown"
        },
        "LockedFungibles": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item LockedFungibles",
          "returnType": "unknown"
        },
        "XcmExecutionSuspended": {
          "required": [],
          "optional": [],
          "description": "Storage item XcmExecutionSuspended",
          "returnType": "boolean"
        },
        "ShouldRecordXcm": {
          "required": [],
          "optional": [],
          "description": "Storage item ShouldRecordXcm",
          "returnType": "boolean"
        },
        "RecordedXcm": {
          "required": [],
          "optional": [],
          "description": "Storage item RecordedXcm",
          "returnType": "unknown"
        }
      },
      "XcmpQueue": {
        "InboundXcmpSuspended": {
          "required": [],
          "optional": [],
          "description": "Storage item InboundXcmpSuspended",
          "returnType": "unknown"
        },
        "OutboundXcmpStatus": {
          "required": [],
          "optional": [],
          "description": "Storage item OutboundXcmpStatus",
          "returnType": "unknown"
        },
        "OutboundXcmpMessages": {
          "required": [],
          "optional": [],
          "description": "Storage item OutboundXcmpMessages",
          "returnType": "Uint8Array"
        },
        "SignalMessages": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item SignalMessages",
          "returnType": "Uint8Array"
        },
        "QueueConfig": {
          "required": [],
          "optional": [],
          "description": "Storage item QueueConfig",
          "returnType": "unknown"
        },
        "QueueSuspended": {
          "required": [],
          "optional": [],
          "description": "Storage item QueueSuspended",
          "returnType": "boolean"
        },
        "DeliveryFeeFactor": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item DeliveryFeeFactor",
          "returnType": "bigint"
        }
      },
      "MessageQueue": {
        "BookStateFor": {
          "required": [
            "Anonymize_Iejeo53sea6n4q_"
          ],
          "optional": [],
          "description": "Storage item BookStateFor",
          "returnType": "unknown"
        },
        "ServiceHead": {
          "required": [],
          "optional": [],
          "description": "Storage item ServiceHead",
          "returnType": "unknown"
        },
        "Pages": {
          "required": [],
          "optional": [],
          "description": "Storage item Pages",
          "returnType": "unknown"
        }
      },
      "UnknownTokens": {
        "ConcreteFungibleBalances": {
          "required": [],
          "optional": [],
          "description": "Storage item ConcreteFungibleBalances",
          "returnType": "bigint"
        },
        "AbstractFungibleBalances": {
          "required": [],
          "optional": [],
          "description": "Storage item AbstractFungibleBalances",
          "returnType": "bigint"
        }
      },
      "Authorship": {
        "Author": {
          "required": [],
          "optional": [],
          "description": "Storage item Author",
          "returnType": "string"
        }
      },
      "CollatorSelection": {
        "Invulnerables": {
          "required": [],
          "optional": [],
          "description": "Storage item Invulnerables",
          "returnType": "unknown"
        },
        "CandidateList": {
          "required": [],
          "optional": [],
          "description": "Storage item CandidateList",
          "returnType": "unknown"
        },
        "LastAuthoredBlock": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item LastAuthoredBlock",
          "returnType": "number"
        },
        "DesiredCandidates": {
          "required": [],
          "optional": [],
          "description": "Storage item DesiredCandidates",
          "returnType": "number"
        },
        "CandidacyBond": {
          "required": [],
          "optional": [],
          "description": "Storage item CandidacyBond",
          "returnType": "bigint"
        }
      },
      "Session": {
        "Validators": {
          "required": [],
          "optional": [],
          "description": "Storage item Validators",
          "returnType": "unknown"
        },
        "CurrentIndex": {
          "required": [],
          "optional": [],
          "description": "Storage item CurrentIndex",
          "returnType": "number"
        },
        "QueuedChanged": {
          "required": [],
          "optional": [],
          "description": "Storage item QueuedChanged",
          "returnType": "boolean"
        },
        "QueuedKeys": {
          "required": [],
          "optional": [],
          "description": "Storage item QueuedKeys",
          "returnType": "unknown"
        },
        "DisabledValidators": {
          "required": [],
          "optional": [],
          "description": "Storage item DisabledValidators",
          "returnType": "unknown"
        },
        "NextKeys": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item NextKeys",
          "returnType": "Hash"
        },
        "KeyOwner": {
          "required": [
            "Anonymize_I82jm9g7pufuel_"
          ],
          "optional": [],
          "description": "Storage item KeyOwner",
          "returnType": "string"
        }
      },
      "Aura": {
        "Authorities": {
          "required": [],
          "optional": [],
          "description": "Storage item Authorities",
          "returnType": "unknown"
        },
        "CurrentSlot": {
          "required": [],
          "optional": [],
          "description": "Storage item CurrentSlot",
          "returnType": "bigint"
        }
      },
      "AuraExt": {
        "Authorities": {
          "required": [],
          "optional": [],
          "description": "Storage item Authorities",
          "returnType": "unknown"
        },
        "SlotInfo": {
          "required": [],
          "optional": [],
          "description": "Storage item SlotInfo",
          "returnType": "unknown"
        }
      },
      "EmaOracle": {
        "Accumulator": {
          "required": [],
          "optional": [],
          "description": "Storage item Accumulator",
          "returnType": "unknown"
        },
        "Oracles": {
          "required": [],
          "optional": [],
          "description": "Storage item Oracles",
          "returnType": "unknown"
        },
        "WhitelistedAssets": {
          "required": [],
          "optional": [],
          "description": "Storage item WhitelistedAssets",
          "returnType": "unknown"
        }
      },
      "Broadcast": {
        "IncrementalId": {
          "required": [],
          "optional": [],
          "description": "Storage item IncrementalId",
          "returnType": "number"
        },
        "ExecutionContext": {
          "required": [],
          "optional": [],
          "description": "Storage item ExecutionContext",
          "returnType": "unknown"
        },
        "Swapper": {
          "required": [],
          "optional": [],
          "description": "Storage item Swapper",
          "returnType": "string"
        }
      }
    }
  },
  "kusama": {
    "pallets": {
      "System": {
        "Account": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Account",
          "returnType": "unknown"
        },
        "ExtrinsicCount": {
          "required": [],
          "optional": [],
          "description": "Storage item ExtrinsicCount",
          "returnType": "number"
        },
        "InherentsApplied": {
          "required": [],
          "optional": [],
          "description": "Storage item InherentsApplied",
          "returnType": "boolean"
        },
        "BlockWeight": {
          "required": [],
          "optional": [],
          "description": "Storage item BlockWeight",
          "returnType": "unknown"
        },
        "AllExtrinsicsLen": {
          "required": [],
          "optional": [],
          "description": "Storage item AllExtrinsicsLen",
          "returnType": "number"
        },
        "BlockHash": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item BlockHash",
          "returnType": "Hash"
        },
        "ExtrinsicData": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item ExtrinsicData",
          "returnType": "Uint8Array"
        },
        "Number": {
          "required": [],
          "optional": [],
          "description": "Storage item Number",
          "returnType": "number"
        },
        "ParentHash": {
          "required": [],
          "optional": [],
          "description": "Storage item ParentHash",
          "returnType": "Hash"
        },
        "Digest": {
          "required": [],
          "optional": [],
          "description": "Storage item Digest",
          "returnType": "unknown"
        },
        "Events": {
          "required": [],
          "optional": [],
          "description": "Storage item Events",
          "returnType": "unknown"
        },
        "EventCount": {
          "required": [],
          "optional": [],
          "description": "Storage item EventCount",
          "returnType": "number"
        },
        "EventTopics": {
          "required": [
            "Hash"
          ],
          "optional": [],
          "description": "Storage item EventTopics",
          "returnType": "unknown"
        },
        "LastRuntimeUpgrade": {
          "required": [],
          "optional": [],
          "description": "Storage item LastRuntimeUpgrade",
          "returnType": "unknown"
        },
        "UpgradedToU32RefCount": {
          "required": [],
          "optional": [],
          "description": "Storage item UpgradedToU32RefCount",
          "returnType": "boolean"
        },
        "UpgradedToTripleRefCount": {
          "required": [],
          "optional": [],
          "description": "Storage item UpgradedToTripleRefCount",
          "returnType": "boolean"
        },
        "ExecutionPhase": {
          "required": [],
          "optional": [],
          "description": "Storage item ExecutionPhase",
          "returnType": "Phase"
        },
        "AuthorizedUpgrade": {
          "required": [],
          "optional": [],
          "description": "Storage item AuthorizedUpgrade",
          "returnType": "unknown"
        },
        "ExtrinsicWeightReclaimed": {
          "required": [],
          "optional": [],
          "description": "Storage item ExtrinsicWeightReclaimed",
          "returnType": "unknown"
        }
      },
      "Babe": {
        "EpochIndex": {
          "required": [],
          "optional": [],
          "description": "Storage item EpochIndex",
          "returnType": "bigint"
        },
        "Authorities": {
          "required": [],
          "optional": [],
          "description": "Storage item Authorities",
          "returnType": "unknown"
        },
        "GenesisSlot": {
          "required": [],
          "optional": [],
          "description": "Storage item GenesisSlot",
          "returnType": "bigint"
        },
        "CurrentSlot": {
          "required": [],
          "optional": [],
          "description": "Storage item CurrentSlot",
          "returnType": "bigint"
        },
        "Randomness": {
          "required": [],
          "optional": [],
          "description": "Storage item Randomness",
          "returnType": "Hash"
        },
        "PendingEpochConfigChange": {
          "required": [],
          "optional": [],
          "description": "Storage item PendingEpochConfigChange",
          "returnType": "BabeDigestsNextConfigDescriptor"
        },
        "NextRandomness": {
          "required": [],
          "optional": [],
          "description": "Storage item NextRandomness",
          "returnType": "Hash"
        },
        "NextAuthorities": {
          "required": [],
          "optional": [],
          "description": "Storage item NextAuthorities",
          "returnType": "unknown"
        },
        "SegmentIndex": {
          "required": [],
          "optional": [],
          "description": "Storage item SegmentIndex",
          "returnType": "number"
        },
        "UnderConstruction": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item UnderConstruction",
          "returnType": "unknown"
        },
        "Initialized": {
          "required": [],
          "optional": [],
          "description": "Storage item Initialized",
          "returnType": "unknown"
        },
        "AuthorVrfRandomness": {
          "required": [],
          "optional": [],
          "description": "Storage item AuthorVrfRandomness",
          "returnType": "unknown"
        },
        "EpochStart": {
          "required": [],
          "optional": [],
          "description": "Storage item EpochStart",
          "returnType": "unknown"
        },
        "Lateness": {
          "required": [],
          "optional": [],
          "description": "Storage item Lateness",
          "returnType": "number"
        },
        "EpochConfig": {
          "required": [],
          "optional": [],
          "description": "Storage item EpochConfig",
          "returnType": "unknown"
        },
        "NextEpochConfig": {
          "required": [],
          "optional": [],
          "description": "Storage item NextEpochConfig",
          "returnType": "unknown"
        },
        "SkippedEpochs": {
          "required": [],
          "optional": [],
          "description": "Storage item SkippedEpochs",
          "returnType": "unknown"
        }
      },
      "Timestamp": {
        "Now": {
          "required": [],
          "optional": [],
          "description": "Storage item Now",
          "returnType": "bigint"
        },
        "DidUpdate": {
          "required": [],
          "optional": [],
          "description": "Storage item DidUpdate",
          "returnType": "boolean"
        }
      },
      "Indices": {
        "Accounts": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item Accounts",
          "returnType": "unknown"
        }
      },
      "Balances": {
        "TotalIssuance": {
          "required": [],
          "optional": [],
          "description": "Storage item TotalIssuance",
          "returnType": "bigint"
        },
        "InactiveIssuance": {
          "required": [],
          "optional": [],
          "description": "Storage item InactiveIssuance",
          "returnType": "bigint"
        },
        "Account": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Account",
          "returnType": "unknown"
        },
        "Locks": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Locks",
          "returnType": "unknown"
        },
        "Reserves": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Reserves",
          "returnType": "unknown"
        },
        "Holds": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Holds",
          "returnType": "unknown"
        },
        "Freezes": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Freezes",
          "returnType": "unknown"
        }
      },
      "TransactionPayment": {
        "NextFeeMultiplier": {
          "required": [],
          "optional": [],
          "description": "Storage item NextFeeMultiplier",
          "returnType": "bigint"
        },
        "StorageVersion": {
          "required": [],
          "optional": [],
          "description": "Storage item StorageVersion",
          "returnType": "TransactionPaymentReleases"
        }
      },
      "Authorship": {
        "Author": {
          "required": [],
          "optional": [],
          "description": "Storage item Author",
          "returnType": "string"
        }
      },
      "Staking": {
        "ValidatorCount": {
          "required": [],
          "optional": [],
          "description": "Storage item ValidatorCount",
          "returnType": "number"
        },
        "MinimumValidatorCount": {
          "required": [],
          "optional": [],
          "description": "Storage item MinimumValidatorCount",
          "returnType": "number"
        },
        "Invulnerables": {
          "required": [],
          "optional": [],
          "description": "Storage item Invulnerables",
          "returnType": "unknown"
        },
        "Bonded": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Bonded",
          "returnType": "string"
        },
        "MinNominatorBond": {
          "required": [],
          "optional": [],
          "description": "Storage item MinNominatorBond",
          "returnType": "bigint"
        },
        "MinValidatorBond": {
          "required": [],
          "optional": [],
          "description": "Storage item MinValidatorBond",
          "returnType": "bigint"
        },
        "MinimumActiveStake": {
          "required": [],
          "optional": [],
          "description": "Storage item MinimumActiveStake",
          "returnType": "bigint"
        },
        "MinCommission": {
          "required": [],
          "optional": [],
          "description": "Storage item MinCommission",
          "returnType": "number"
        },
        "Ledger": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Ledger",
          "returnType": "unknown"
        },
        "Payee": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Payee",
          "returnType": "StakingRewardDestination"
        },
        "Validators": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Validators",
          "returnType": "unknown"
        },
        "CounterForValidators": {
          "required": [],
          "optional": [],
          "description": "Storage item CounterForValidators",
          "returnType": "number"
        },
        "MaxValidatorsCount": {
          "required": [],
          "optional": [],
          "description": "Storage item MaxValidatorsCount",
          "returnType": "number"
        },
        "Nominators": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Nominators",
          "returnType": "unknown"
        },
        "CounterForNominators": {
          "required": [],
          "optional": [],
          "description": "Storage item CounterForNominators",
          "returnType": "number"
        },
        "VirtualStakers": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item VirtualStakers",
          "returnType": "null"
        },
        "CounterForVirtualStakers": {
          "required": [],
          "optional": [],
          "description": "Storage item CounterForVirtualStakers",
          "returnType": "number"
        },
        "MaxNominatorsCount": {
          "required": [],
          "optional": [],
          "description": "Storage item MaxNominatorsCount",
          "returnType": "number"
        },
        "CurrentEra": {
          "required": [],
          "optional": [],
          "description": "Storage item CurrentEra",
          "returnType": "number"
        },
        "ActiveEra": {
          "required": [],
          "optional": [],
          "description": "Storage item ActiveEra",
          "returnType": "unknown"
        },
        "ErasStartSessionIndex": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item ErasStartSessionIndex",
          "returnType": "number"
        },
        "ErasStakers": {
          "required": [],
          "optional": [],
          "description": "Storage item ErasStakers",
          "returnType": "unknown"
        },
        "ErasStakersOverview": {
          "required": [],
          "optional": [],
          "description": "Storage item ErasStakersOverview",
          "returnType": "unknown"
        },
        "ErasStakersClipped": {
          "required": [],
          "optional": [],
          "description": "Storage item ErasStakersClipped",
          "returnType": "unknown"
        },
        "ErasStakersPaged": {
          "required": [],
          "optional": [],
          "description": "Storage item ErasStakersPaged",
          "returnType": "unknown"
        },
        "ClaimedRewards": {
          "required": [],
          "optional": [],
          "description": "Storage item ClaimedRewards",
          "returnType": "unknown"
        },
        "ErasValidatorPrefs": {
          "required": [],
          "optional": [],
          "description": "Storage item ErasValidatorPrefs",
          "returnType": "unknown"
        },
        "ErasValidatorReward": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item ErasValidatorReward",
          "returnType": "bigint"
        },
        "ErasRewardPoints": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item ErasRewardPoints",
          "returnType": "unknown"
        },
        "ErasTotalStake": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item ErasTotalStake",
          "returnType": "bigint"
        },
        "ForceEra": {
          "required": [],
          "optional": [],
          "description": "Storage item ForceEra",
          "returnType": "StakingForcing"
        },
        "MaxStakedRewards": {
          "required": [],
          "optional": [],
          "description": "Storage item MaxStakedRewards",
          "returnType": "number"
        },
        "SlashRewardFraction": {
          "required": [],
          "optional": [],
          "description": "Storage item SlashRewardFraction",
          "returnType": "number"
        },
        "CanceledSlashPayout": {
          "required": [],
          "optional": [],
          "description": "Storage item CanceledSlashPayout",
          "returnType": "bigint"
        },
        "UnappliedSlashes": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item UnappliedSlashes",
          "returnType": "unknown"
        },
        "BondedEras": {
          "required": [],
          "optional": [],
          "description": "Storage item BondedEras",
          "returnType": "unknown"
        },
        "ValidatorSlashInEra": {
          "required": [],
          "optional": [],
          "description": "Storage item ValidatorSlashInEra",
          "returnType": "unknown"
        },
        "NominatorSlashInEra": {
          "required": [],
          "optional": [],
          "description": "Storage item NominatorSlashInEra",
          "returnType": "bigint"
        },
        "SlashingSpans": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item SlashingSpans",
          "returnType": "unknown"
        },
        "SpanSlash": {
          "required": [
            "Anonymize_I6ouflveob4eli_"
          ],
          "optional": [],
          "description": "Storage item SpanSlash",
          "returnType": "unknown"
        },
        "CurrentPlannedSession": {
          "required": [],
          "optional": [],
          "description": "Storage item CurrentPlannedSession",
          "returnType": "number"
        },
        "ChillThreshold": {
          "required": [],
          "optional": [],
          "description": "Storage item ChillThreshold",
          "returnType": "number"
        }
      },
      "Offences": {
        "Reports": {
          "required": [
            "Hash"
          ],
          "optional": [],
          "description": "Storage item Reports",
          "returnType": "unknown"
        },
        "ConcurrentReportsIndex": {
          "required": [],
          "optional": [],
          "description": "Storage item ConcurrentReportsIndex",
          "returnType": "unknown"
        }
      },
      "Historical": {
        "HistoricalSessions": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item HistoricalSessions",
          "returnType": "unknown"
        },
        "StoredRange": {
          "required": [],
          "optional": [],
          "description": "Storage item StoredRange",
          "returnType": "unknown"
        }
      },
      "Session": {
        "Validators": {
          "required": [],
          "optional": [],
          "description": "Storage item Validators",
          "returnType": "unknown"
        },
        "CurrentIndex": {
          "required": [],
          "optional": [],
          "description": "Storage item CurrentIndex",
          "returnType": "number"
        },
        "QueuedChanged": {
          "required": [],
          "optional": [],
          "description": "Storage item QueuedChanged",
          "returnType": "boolean"
        },
        "QueuedKeys": {
          "required": [],
          "optional": [],
          "description": "Storage item QueuedKeys",
          "returnType": "unknown"
        },
        "DisabledValidators": {
          "required": [],
          "optional": [],
          "description": "Storage item DisabledValidators",
          "returnType": "unknown"
        },
        "NextKeys": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item NextKeys",
          "returnType": "unknown"
        },
        "KeyOwner": {
          "required": [
            "Anonymize_I82jm9g7pufuel_"
          ],
          "optional": [],
          "description": "Storage item KeyOwner",
          "returnType": "string"
        }
      },
      "Grandpa": {
        "State": {
          "required": [],
          "optional": [],
          "description": "Storage item State",
          "returnType": "GrandpaStoredState"
        },
        "PendingChange": {
          "required": [],
          "optional": [],
          "description": "Storage item PendingChange",
          "returnType": "unknown"
        },
        "NextForced": {
          "required": [],
          "optional": [],
          "description": "Storage item NextForced",
          "returnType": "number"
        },
        "Stalled": {
          "required": [],
          "optional": [],
          "description": "Storage item Stalled",
          "returnType": "unknown"
        },
        "CurrentSetId": {
          "required": [],
          "optional": [],
          "description": "Storage item CurrentSetId",
          "returnType": "bigint"
        },
        "SetIdSession": {
          "required": [
            "u64"
          ],
          "optional": [],
          "description": "Storage item SetIdSession",
          "returnType": "number"
        },
        "Authorities": {
          "required": [],
          "optional": [],
          "description": "Storage item Authorities",
          "returnType": "unknown"
        }
      },
      "AuthorityDiscovery": {
        "Keys": {
          "required": [],
          "optional": [],
          "description": "Storage item Keys",
          "returnType": "unknown"
        },
        "NextKeys": {
          "required": [],
          "optional": [],
          "description": "Storage item NextKeys",
          "returnType": "unknown"
        }
      },
      "Treasury": {
        "ProposalCount": {
          "required": [],
          "optional": [],
          "description": "Storage item ProposalCount",
          "returnType": "number"
        },
        "Proposals": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item Proposals",
          "returnType": "unknown"
        },
        "Deactivated": {
          "required": [],
          "optional": [],
          "description": "Storage item Deactivated",
          "returnType": "bigint"
        },
        "Approvals": {
          "required": [],
          "optional": [],
          "description": "Storage item Approvals",
          "returnType": "unknown"
        },
        "SpendCount": {
          "required": [],
          "optional": [],
          "description": "Storage item SpendCount",
          "returnType": "number"
        },
        "Spends": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item Spends",
          "returnType": "unknown"
        },
        "LastSpendPeriod": {
          "required": [],
          "optional": [],
          "description": "Storage item LastSpendPeriod",
          "returnType": "number"
        }
      },
      "ConvictionVoting": {
        "VotingFor": {
          "required": [],
          "optional": [],
          "description": "Storage item VotingFor",
          "returnType": "ConvictionVotingVoteVoting"
        },
        "ClassLocksFor": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item ClassLocksFor",
          "returnType": "unknown"
        }
      },
      "Referenda": {
        "ReferendumCount": {
          "required": [],
          "optional": [],
          "description": "Storage item ReferendumCount",
          "returnType": "number"
        },
        "ReferendumInfoFor": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item ReferendumInfoFor",
          "returnType": "unknown"
        },
        "TrackQueue": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item TrackQueue",
          "returnType": "unknown"
        },
        "DecidingCount": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item DecidingCount",
          "returnType": "number"
        },
        "MetadataOf": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item MetadataOf",
          "returnType": "Hash"
        }
      },
      "FellowshipCollective": {
        "MemberCount": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item MemberCount",
          "returnType": "number"
        },
        "Members": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Members",
          "returnType": "number"
        },
        "IdToIndex": {
          "required": [],
          "optional": [],
          "description": "Storage item IdToIndex",
          "returnType": "number"
        },
        "IndexToId": {
          "required": [],
          "optional": [],
          "description": "Storage item IndexToId",
          "returnType": "string"
        },
        "Voting": {
          "required": [],
          "optional": [],
          "description": "Storage item Voting",
          "returnType": "unknown"
        },
        "VotingCleanup": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item VotingCleanup",
          "returnType": "Uint8Array"
        }
      },
      "FellowshipReferenda": {
        "ReferendumCount": {
          "required": [],
          "optional": [],
          "description": "Storage item ReferendumCount",
          "returnType": "number"
        },
        "ReferendumInfoFor": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item ReferendumInfoFor",
          "returnType": "unknown"
        },
        "TrackQueue": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item TrackQueue",
          "returnType": "unknown"
        },
        "DecidingCount": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item DecidingCount",
          "returnType": "number"
        },
        "MetadataOf": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item MetadataOf",
          "returnType": "Hash"
        }
      },
      "Whitelist": {
        "WhitelistedCall": {
          "required": [
            "Hash"
          ],
          "optional": [],
          "description": "Storage item WhitelistedCall",
          "returnType": "null"
        }
      },
      "Parameters": {
        "Parameters": {
          "required": [
            "Anonymize_I5ps9qbqlvun7q_"
          ],
          "optional": [],
          "description": "Storage item Parameters",
          "returnType": "unknown"
        }
      },
      "Claims": {
        "Claims": {
          "required": [
            "bytes"
          ],
          "optional": [],
          "description": "Storage item Claims",
          "returnType": "bigint"
        },
        "Total": {
          "required": [],
          "optional": [],
          "description": "Storage item Total",
          "returnType": "bigint"
        },
        "Vesting": {
          "required": [
            "bytes"
          ],
          "optional": [],
          "description": "Storage item Vesting",
          "returnType": "unknown"
        },
        "Signing": {
          "required": [
            "bytes"
          ],
          "optional": [],
          "description": "Storage item Signing",
          "returnType": "ClaimsStatementKind"
        },
        "Preclaims": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Preclaims",
          "returnType": "Hash"
        }
      },
      "Society": {
        "Parameters": {
          "required": [],
          "optional": [],
          "description": "Storage item Parameters",
          "returnType": "unknown"
        },
        "Pot": {
          "required": [],
          "optional": [],
          "description": "Storage item Pot",
          "returnType": "bigint"
        },
        "Founder": {
          "required": [],
          "optional": [],
          "description": "Storage item Founder",
          "returnType": "string"
        },
        "Head": {
          "required": [],
          "optional": [],
          "description": "Storage item Head",
          "returnType": "string"
        },
        "Rules": {
          "required": [],
          "optional": [],
          "description": "Storage item Rules",
          "returnType": "Hash"
        },
        "Members": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Members",
          "returnType": "unknown"
        },
        "Payouts": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Payouts",
          "returnType": "unknown"
        },
        "MemberCount": {
          "required": [],
          "optional": [],
          "description": "Storage item MemberCount",
          "returnType": "number"
        },
        "MemberByIndex": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item MemberByIndex",
          "returnType": "string"
        },
        "SuspendedMembers": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item SuspendedMembers",
          "returnType": "unknown"
        },
        "RoundCount": {
          "required": [],
          "optional": [],
          "description": "Storage item RoundCount",
          "returnType": "number"
        },
        "Bids": {
          "required": [],
          "optional": [],
          "description": "Storage item Bids",
          "returnType": "unknown"
        },
        "Candidates": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Candidates",
          "returnType": "unknown"
        },
        "Skeptic": {
          "required": [],
          "optional": [],
          "description": "Storage item Skeptic",
          "returnType": "string"
        },
        "Votes": {
          "required": [],
          "optional": [],
          "description": "Storage item Votes",
          "returnType": "unknown"
        },
        "VoteClearCursor": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item VoteClearCursor",
          "returnType": "Uint8Array"
        },
        "NextHead": {
          "required": [],
          "optional": [],
          "description": "Storage item NextHead",
          "returnType": "unknown"
        },
        "ChallengeRoundCount": {
          "required": [],
          "optional": [],
          "description": "Storage item ChallengeRoundCount",
          "returnType": "number"
        },
        "Defending": {
          "required": [],
          "optional": [],
          "description": "Storage item Defending",
          "returnType": "unknown"
        },
        "DefenderVotes": {
          "required": [],
          "optional": [],
          "description": "Storage item DefenderVotes",
          "returnType": "unknown"
        }
      },
      "Recovery": {
        "Recoverable": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Recoverable",
          "returnType": "unknown"
        },
        "ActiveRecoveries": {
          "required": [],
          "optional": [],
          "description": "Storage item ActiveRecoveries",
          "returnType": "unknown"
        },
        "Proxy": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Proxy",
          "returnType": "string"
        }
      },
      "Vesting": {
        "Vesting": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Vesting",
          "returnType": "unknown"
        },
        "StorageVersion": {
          "required": [],
          "optional": [],
          "description": "Storage item StorageVersion",
          "returnType": "Version"
        }
      },
      "Scheduler": {
        "IncompleteSince": {
          "required": [],
          "optional": [],
          "description": "Storage item IncompleteSince",
          "returnType": "number"
        },
        "Agenda": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item Agenda",
          "returnType": "unknown"
        },
        "Retries": {
          "required": [
            "Anonymize_I9jd27rnpm8ttv_"
          ],
          "optional": [],
          "description": "Storage item Retries",
          "returnType": "unknown"
        },
        "Lookup": {
          "required": [
            "Hash"
          ],
          "optional": [],
          "description": "Storage item Lookup",
          "returnType": "unknown"
        }
      },
      "Proxy": {
        "Proxies": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Proxies",
          "returnType": "unknown"
        },
        "Announcements": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Announcements",
          "returnType": "unknown"
        }
      },
      "Multisig": {
        "Multisigs": {
          "required": [],
          "optional": [],
          "description": "Storage item Multisigs",
          "returnType": "unknown"
        }
      },
      "Preimage": {
        "StatusFor": {
          "required": [
            "Hash"
          ],
          "optional": [],
          "description": "Storage item StatusFor",
          "returnType": "PreimageOldRequestStatus"
        },
        "RequestStatusFor": {
          "required": [
            "Hash"
          ],
          "optional": [],
          "description": "Storage item RequestStatusFor",
          "returnType": "PreimageRequestStatus"
        },
        "PreimageFor": {
          "required": [
            "Anonymize_I4pact7n2e9a0i_"
          ],
          "optional": [],
          "description": "Storage item PreimageFor",
          "returnType": "Uint8Array"
        }
      },
      "Bounties": {
        "BountyCount": {
          "required": [],
          "optional": [],
          "description": "Storage item BountyCount",
          "returnType": "number"
        },
        "Bounties": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item Bounties",
          "returnType": "unknown"
        },
        "BountyDescriptions": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item BountyDescriptions",
          "returnType": "Uint8Array"
        },
        "BountyApprovals": {
          "required": [],
          "optional": [],
          "description": "Storage item BountyApprovals",
          "returnType": "unknown"
        }
      },
      "ChildBounties": {
        "ChildBountyCount": {
          "required": [],
          "optional": [],
          "description": "Storage item ChildBountyCount",
          "returnType": "number"
        },
        "ParentChildBounties": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item ParentChildBounties",
          "returnType": "number"
        },
        "ParentTotalChildBounties": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item ParentTotalChildBounties",
          "returnType": "number"
        },
        "ChildBounties": {
          "required": [],
          "optional": [],
          "description": "Storage item ChildBounties",
          "returnType": "unknown"
        },
        "ChildBountyDescriptionsV1": {
          "required": [],
          "optional": [],
          "description": "Storage item ChildBountyDescriptionsV1",
          "returnType": "Uint8Array"
        },
        "V0ToV1ChildBountyIds": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item V0ToV1ChildBountyIds",
          "returnType": "unknown"
        },
        "ChildrenCuratorFees": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item ChildrenCuratorFees",
          "returnType": "bigint"
        }
      },
      "ElectionProviderMultiPhase": {
        "Round": {
          "required": [],
          "optional": [],
          "description": "Storage item Round",
          "returnType": "number"
        },
        "CurrentPhase": {
          "required": [],
          "optional": [],
          "description": "Storage item CurrentPhase",
          "returnType": "ElectionProviderMultiPhasePhase"
        },
        "QueuedSolution": {
          "required": [],
          "optional": [],
          "description": "Storage item QueuedSolution",
          "returnType": "unknown"
        },
        "Snapshot": {
          "required": [],
          "optional": [],
          "description": "Storage item Snapshot",
          "returnType": "unknown"
        },
        "DesiredTargets": {
          "required": [],
          "optional": [],
          "description": "Storage item DesiredTargets",
          "returnType": "number"
        },
        "SnapshotMetadata": {
          "required": [],
          "optional": [],
          "description": "Storage item SnapshotMetadata",
          "returnType": "unknown"
        },
        "SignedSubmissionNextIndex": {
          "required": [],
          "optional": [],
          "description": "Storage item SignedSubmissionNextIndex",
          "returnType": "number"
        },
        "SignedSubmissionIndices": {
          "required": [],
          "optional": [],
          "description": "Storage item SignedSubmissionIndices",
          "returnType": "unknown"
        },
        "SignedSubmissionsMap": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item SignedSubmissionsMap",
          "returnType": "unknown"
        },
        "MinimumUntrustedScore": {
          "required": [],
          "optional": [],
          "description": "Storage item MinimumUntrustedScore",
          "returnType": "unknown"
        }
      },
      "Nis": {
        "QueueTotals": {
          "required": [],
          "optional": [],
          "description": "Storage item QueueTotals",
          "returnType": "unknown"
        },
        "Queues": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item Queues",
          "returnType": "unknown"
        },
        "Summary": {
          "required": [],
          "optional": [],
          "description": "Storage item Summary",
          "returnType": "unknown"
        },
        "Receipts": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item Receipts",
          "returnType": "unknown"
        }
      },
      "NisCounterpartBalances": {
        "TotalIssuance": {
          "required": [],
          "optional": [],
          "description": "Storage item TotalIssuance",
          "returnType": "bigint"
        },
        "InactiveIssuance": {
          "required": [],
          "optional": [],
          "description": "Storage item InactiveIssuance",
          "returnType": "bigint"
        },
        "Account": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Account",
          "returnType": "unknown"
        },
        "Locks": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Locks",
          "returnType": "unknown"
        },
        "Reserves": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Reserves",
          "returnType": "unknown"
        },
        "Holds": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Holds",
          "returnType": "unknown"
        },
        "Freezes": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Freezes",
          "returnType": "unknown"
        }
      },
      "VoterList": {
        "ListNodes": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item ListNodes",
          "returnType": "unknown"
        },
        "CounterForListNodes": {
          "required": [],
          "optional": [],
          "description": "Storage item CounterForListNodes",
          "returnType": "number"
        },
        "ListBags": {
          "required": [
            "u64"
          ],
          "optional": [],
          "description": "Storage item ListBags",
          "returnType": "unknown"
        }
      },
      "NominationPools": {
        "TotalValueLocked": {
          "required": [],
          "optional": [],
          "description": "Storage item TotalValueLocked",
          "returnType": "bigint"
        },
        "MinJoinBond": {
          "required": [],
          "optional": [],
          "description": "Storage item MinJoinBond",
          "returnType": "bigint"
        },
        "MinCreateBond": {
          "required": [],
          "optional": [],
          "description": "Storage item MinCreateBond",
          "returnType": "bigint"
        },
        "MaxPools": {
          "required": [],
          "optional": [],
          "description": "Storage item MaxPools",
          "returnType": "number"
        },
        "MaxPoolMembers": {
          "required": [],
          "optional": [],
          "description": "Storage item MaxPoolMembers",
          "returnType": "number"
        },
        "MaxPoolMembersPerPool": {
          "required": [],
          "optional": [],
          "description": "Storage item MaxPoolMembersPerPool",
          "returnType": "number"
        },
        "GlobalMaxCommission": {
          "required": [],
          "optional": [],
          "description": "Storage item GlobalMaxCommission",
          "returnType": "number"
        },
        "PoolMembers": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item PoolMembers",
          "returnType": "unknown"
        },
        "CounterForPoolMembers": {
          "required": [],
          "optional": [],
          "description": "Storage item CounterForPoolMembers",
          "returnType": "number"
        },
        "BondedPools": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item BondedPools",
          "returnType": "unknown"
        },
        "CounterForBondedPools": {
          "required": [],
          "optional": [],
          "description": "Storage item CounterForBondedPools",
          "returnType": "number"
        },
        "RewardPools": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item RewardPools",
          "returnType": "unknown"
        },
        "CounterForRewardPools": {
          "required": [],
          "optional": [],
          "description": "Storage item CounterForRewardPools",
          "returnType": "number"
        },
        "SubPoolsStorage": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item SubPoolsStorage",
          "returnType": "unknown"
        },
        "CounterForSubPoolsStorage": {
          "required": [],
          "optional": [],
          "description": "Storage item CounterForSubPoolsStorage",
          "returnType": "number"
        },
        "Metadata": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item Metadata",
          "returnType": "Uint8Array"
        },
        "CounterForMetadata": {
          "required": [],
          "optional": [],
          "description": "Storage item CounterForMetadata",
          "returnType": "number"
        },
        "LastPoolId": {
          "required": [],
          "optional": [],
          "description": "Storage item LastPoolId",
          "returnType": "number"
        },
        "ReversePoolIdLookup": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item ReversePoolIdLookup",
          "returnType": "number"
        },
        "CounterForReversePoolIdLookup": {
          "required": [],
          "optional": [],
          "description": "Storage item CounterForReversePoolIdLookup",
          "returnType": "number"
        },
        "ClaimPermissions": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item ClaimPermissions",
          "returnType": "NominationPoolsClaimPermission"
        }
      },
      "FastUnstake": {
        "Head": {
          "required": [],
          "optional": [],
          "description": "Storage item Head",
          "returnType": "unknown"
        },
        "Queue": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Queue",
          "returnType": "bigint"
        },
        "CounterForQueue": {
          "required": [],
          "optional": [],
          "description": "Storage item CounterForQueue",
          "returnType": "number"
        },
        "ErasToCheckPerBlock": {
          "required": [],
          "optional": [],
          "description": "Storage item ErasToCheckPerBlock",
          "returnType": "number"
        }
      },
      "DelegatedStaking": {
        "Delegators": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Delegators",
          "returnType": "unknown"
        },
        "CounterForDelegators": {
          "required": [],
          "optional": [],
          "description": "Storage item CounterForDelegators",
          "returnType": "number"
        },
        "Agents": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Agents",
          "returnType": "unknown"
        },
        "CounterForAgents": {
          "required": [],
          "optional": [],
          "description": "Storage item CounterForAgents",
          "returnType": "number"
        }
      },
      "Configuration": {
        "ActiveConfig": {
          "required": [],
          "optional": [],
          "description": "Storage item ActiveConfig",
          "returnType": "unknown"
        },
        "PendingConfigs": {
          "required": [],
          "optional": [],
          "description": "Storage item PendingConfigs",
          "returnType": "unknown"
        },
        "BypassConsistencyCheck": {
          "required": [],
          "optional": [],
          "description": "Storage item BypassConsistencyCheck",
          "returnType": "boolean"
        }
      },
      "ParasShared": {
        "CurrentSessionIndex": {
          "required": [],
          "optional": [],
          "description": "Storage item CurrentSessionIndex",
          "returnType": "number"
        },
        "ActiveValidatorIndices": {
          "required": [],
          "optional": [],
          "description": "Storage item ActiveValidatorIndices",
          "returnType": "unknown"
        },
        "ActiveValidatorKeys": {
          "required": [],
          "optional": [],
          "description": "Storage item ActiveValidatorKeys",
          "returnType": "unknown"
        },
        "AllowedRelayParents": {
          "required": [],
          "optional": [],
          "description": "Storage item AllowedRelayParents",
          "returnType": "unknown"
        }
      },
      "ParaInclusion": {
        "V1": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item V1",
          "returnType": "unknown"
        }
      },
      "ParaInherent": {
        "Included": {
          "required": [],
          "optional": [],
          "description": "Storage item Included",
          "returnType": "null"
        },
        "OnChainVotes": {
          "required": [],
          "optional": [],
          "description": "Storage item OnChainVotes",
          "returnType": "unknown"
        }
      },
      "ParaScheduler": {
        "ValidatorGroups": {
          "required": [],
          "optional": [],
          "description": "Storage item ValidatorGroups",
          "returnType": "unknown"
        },
        "SessionStartBlock": {
          "required": [],
          "optional": [],
          "description": "Storage item SessionStartBlock",
          "returnType": "number"
        },
        "ClaimQueue": {
          "required": [],
          "optional": [],
          "description": "Storage item ClaimQueue",
          "returnType": "unknown"
        }
      },
      "Paras": {
        "PvfActiveVoteMap": {
          "required": [
            "Hash"
          ],
          "optional": [],
          "description": "Storage item PvfActiveVoteMap",
          "returnType": "unknown"
        },
        "PvfActiveVoteList": {
          "required": [],
          "optional": [],
          "description": "Storage item PvfActiveVoteList",
          "returnType": "unknown"
        },
        "Parachains": {
          "required": [],
          "optional": [],
          "description": "Storage item Parachains",
          "returnType": "unknown"
        },
        "ParaLifecycles": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item ParaLifecycles",
          "returnType": "ParachainsParasParaLifecycle"
        },
        "Heads": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item Heads",
          "returnType": "Uint8Array"
        },
        "MostRecentContext": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item MostRecentContext",
          "returnType": "number"
        },
        "CurrentCodeHash": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item CurrentCodeHash",
          "returnType": "Hash"
        },
        "PastCodeHash": {
          "required": [
            "Anonymize_I9jd27rnpm8ttv_"
          ],
          "optional": [],
          "description": "Storage item PastCodeHash",
          "returnType": "Hash"
        },
        "PastCodeMeta": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item PastCodeMeta",
          "returnType": "unknown"
        },
        "PastCodePruning": {
          "required": [],
          "optional": [],
          "description": "Storage item PastCodePruning",
          "returnType": "unknown"
        },
        "FutureCodeUpgrades": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item FutureCodeUpgrades",
          "returnType": "number"
        },
        "FutureCodeUpgradesAt": {
          "required": [],
          "optional": [],
          "description": "Storage item FutureCodeUpgradesAt",
          "returnType": "unknown"
        },
        "FutureCodeHash": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item FutureCodeHash",
          "returnType": "Hash"
        },
        "UpgradeGoAheadSignal": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item UpgradeGoAheadSignal",
          "returnType": "UpgradeGoAhead"
        },
        "UpgradeRestrictionSignal": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item UpgradeRestrictionSignal",
          "returnType": "UpgradeRestriction"
        },
        "UpgradeCooldowns": {
          "required": [],
          "optional": [],
          "description": "Storage item UpgradeCooldowns",
          "returnType": "unknown"
        },
        "UpcomingUpgrades": {
          "required": [],
          "optional": [],
          "description": "Storage item UpcomingUpgrades",
          "returnType": "unknown"
        },
        "ActionsQueue": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item ActionsQueue",
          "returnType": "unknown"
        },
        "UpcomingParasGenesis": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item UpcomingParasGenesis",
          "returnType": "unknown"
        },
        "CodeByHashRefs": {
          "required": [
            "Hash"
          ],
          "optional": [],
          "description": "Storage item CodeByHashRefs",
          "returnType": "number"
        },
        "CodeByHash": {
          "required": [
            "Hash"
          ],
          "optional": [],
          "description": "Storage item CodeByHash",
          "returnType": "Uint8Array"
        }
      },
      "Initializer": {
        "HasInitialized": {
          "required": [],
          "optional": [],
          "description": "Storage item HasInitialized",
          "returnType": "null"
        },
        "BufferedSessionChanges": {
          "required": [],
          "optional": [],
          "description": "Storage item BufferedSessionChanges",
          "returnType": "unknown"
        }
      },
      "Dmp": {
        "DownwardMessageQueues": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item DownwardMessageQueues",
          "returnType": "unknown"
        },
        "DownwardMessageQueueHeads": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item DownwardMessageQueueHeads",
          "returnType": "Hash"
        },
        "DeliveryFeeFactor": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item DeliveryFeeFactor",
          "returnType": "bigint"
        }
      },
      "Hrmp": {
        "HrmpOpenChannelRequests": {
          "required": [
            "Anonymize_I50mrcbubp554e_"
          ],
          "optional": [],
          "description": "Storage item HrmpOpenChannelRequests",
          "returnType": "unknown"
        },
        "HrmpOpenChannelRequestsList": {
          "required": [],
          "optional": [],
          "description": "Storage item HrmpOpenChannelRequestsList",
          "returnType": "unknown"
        },
        "HrmpOpenChannelRequestCount": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item HrmpOpenChannelRequestCount",
          "returnType": "number"
        },
        "HrmpAcceptedChannelRequestCount": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item HrmpAcceptedChannelRequestCount",
          "returnType": "number"
        },
        "HrmpCloseChannelRequests": {
          "required": [
            "Anonymize_I50mrcbubp554e_"
          ],
          "optional": [],
          "description": "Storage item HrmpCloseChannelRequests",
          "returnType": "null"
        },
        "HrmpCloseChannelRequestsList": {
          "required": [],
          "optional": [],
          "description": "Storage item HrmpCloseChannelRequestsList",
          "returnType": "unknown"
        },
        "HrmpWatermarks": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item HrmpWatermarks",
          "returnType": "number"
        },
        "HrmpChannels": {
          "required": [
            "Anonymize_I50mrcbubp554e_"
          ],
          "optional": [],
          "description": "Storage item HrmpChannels",
          "returnType": "unknown"
        },
        "HrmpIngressChannelsIndex": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item HrmpIngressChannelsIndex",
          "returnType": "unknown"
        },
        "HrmpEgressChannelsIndex": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item HrmpEgressChannelsIndex",
          "returnType": "unknown"
        },
        "HrmpChannelContents": {
          "required": [
            "Anonymize_I50mrcbubp554e_"
          ],
          "optional": [],
          "description": "Storage item HrmpChannelContents",
          "returnType": "unknown"
        },
        "HrmpChannelDigests": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item HrmpChannelDigests",
          "returnType": "unknown"
        }
      },
      "ParaSessionInfo": {
        "AssignmentKeysUnsafe": {
          "required": [],
          "optional": [],
          "description": "Storage item AssignmentKeysUnsafe",
          "returnType": "unknown"
        },
        "EarliestStoredSession": {
          "required": [],
          "optional": [],
          "description": "Storage item EarliestStoredSession",
          "returnType": "number"
        },
        "Sessions": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item Sessions",
          "returnType": "unknown"
        },
        "AccountKeys": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item AccountKeys",
          "returnType": "unknown"
        },
        "SessionExecutorParams": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item SessionExecutorParams",
          "returnType": "unknown"
        }
      },
      "ParasDisputes": {
        "LastPrunedSession": {
          "required": [],
          "optional": [],
          "description": "Storage item LastPrunedSession",
          "returnType": "number"
        },
        "Disputes": {
          "required": [],
          "optional": [],
          "description": "Storage item Disputes",
          "returnType": "unknown"
        },
        "BackersOnDisputes": {
          "required": [],
          "optional": [],
          "description": "Storage item BackersOnDisputes",
          "returnType": "unknown"
        },
        "Included": {
          "required": [],
          "optional": [],
          "description": "Storage item Included",
          "returnType": "number"
        },
        "Frozen": {
          "required": [],
          "optional": [],
          "description": "Storage item Frozen",
          "returnType": "unknown"
        }
      },
      "ParasSlashing": {
        "UnappliedSlashes": {
          "required": [],
          "optional": [],
          "description": "Storage item UnappliedSlashes",
          "returnType": "unknown"
        },
        "ValidatorSetCounts": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item ValidatorSetCounts",
          "returnType": "number"
        }
      },
      "OnDemandAssignmentProvider": {
        "ParaIdAffinity": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item ParaIdAffinity",
          "returnType": "unknown"
        },
        "QueueStatus": {
          "required": [],
          "optional": [],
          "description": "Storage item QueueStatus",
          "returnType": "unknown"
        },
        "FreeEntries": {
          "required": [],
          "optional": [],
          "description": "Storage item FreeEntries",
          "returnType": "unknown"
        },
        "AffinityEntries": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item AffinityEntries",
          "returnType": "unknown"
        },
        "Revenue": {
          "required": [],
          "optional": [],
          "description": "Storage item Revenue",
          "returnType": "unknown"
        },
        "Credits": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Credits",
          "returnType": "bigint"
        }
      },
      "CoretimeAssignmentProvider": {
        "CoreSchedules": {
          "required": [
            "Anonymize_I9jd27rnpm8ttv_"
          ],
          "optional": [],
          "description": "Storage item CoreSchedules",
          "returnType": "unknown"
        },
        "CoreDescriptors": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item CoreDescriptors",
          "returnType": "unknown"
        }
      },
      "Registrar": {
        "PendingSwap": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item PendingSwap",
          "returnType": "number"
        },
        "Paras": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item Paras",
          "returnType": "unknown"
        },
        "NextFreeParaId": {
          "required": [],
          "optional": [],
          "description": "Storage item NextFreeParaId",
          "returnType": "number"
        }
      },
      "Slots": {
        "Leases": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item Leases",
          "returnType": "unknown"
        }
      },
      "Auctions": {
        "AuctionCounter": {
          "required": [],
          "optional": [],
          "description": "Storage item AuctionCounter",
          "returnType": "number"
        },
        "AuctionInfo": {
          "required": [],
          "optional": [],
          "description": "Storage item AuctionInfo",
          "returnType": "unknown"
        },
        "ReservedAmounts": {
          "required": [
            "Anonymize_I6ouflveob4eli_"
          ],
          "optional": [],
          "description": "Storage item ReservedAmounts",
          "returnType": "bigint"
        },
        "Winning": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item Winning",
          "returnType": "unknown"
        }
      },
      "Crowdloan": {
        "Funds": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item Funds",
          "returnType": "unknown"
        },
        "NewRaise": {
          "required": [],
          "optional": [],
          "description": "Storage item NewRaise",
          "returnType": "unknown"
        },
        "EndingsCount": {
          "required": [],
          "optional": [],
          "description": "Storage item EndingsCount",
          "returnType": "number"
        },
        "NextFundIndex": {
          "required": [],
          "optional": [],
          "description": "Storage item NextFundIndex",
          "returnType": "number"
        }
      },
      "XcmPallet": {
        "QueryCounter": {
          "required": [],
          "optional": [],
          "description": "Storage item QueryCounter",
          "returnType": "bigint"
        },
        "Queries": {
          "required": [
            "u64"
          ],
          "optional": [],
          "description": "Storage item Queries",
          "returnType": "unknown"
        },
        "AssetTraps": {
          "required": [
            "Hash"
          ],
          "optional": [],
          "description": "Storage item AssetTraps",
          "returnType": "number"
        },
        "SafeXcmVersion": {
          "required": [],
          "optional": [],
          "description": "Storage item SafeXcmVersion",
          "returnType": "number"
        },
        "SupportedVersion": {
          "required": [],
          "optional": [],
          "description": "Storage item SupportedVersion",
          "returnType": "number"
        },
        "VersionNotifiers": {
          "required": [],
          "optional": [],
          "description": "Storage item VersionNotifiers",
          "returnType": "bigint"
        },
        "VersionNotifyTargets": {
          "required": [],
          "optional": [],
          "description": "Storage item VersionNotifyTargets",
          "returnType": "unknown"
        },
        "VersionDiscoveryQueue": {
          "required": [],
          "optional": [],
          "description": "Storage item VersionDiscoveryQueue",
          "returnType": "unknown"
        },
        "CurrentMigration": {
          "required": [],
          "optional": [],
          "description": "Storage item CurrentMigration",
          "returnType": "XcmPalletVersionMigrationStage"
        },
        "RemoteLockedFungibles": {
          "required": [],
          "optional": [],
          "description": "Storage item RemoteLockedFungibles",
          "returnType": "unknown"
        },
        "LockedFungibles": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item LockedFungibles",
          "returnType": "unknown"
        },
        "XcmExecutionSuspended": {
          "required": [],
          "optional": [],
          "description": "Storage item XcmExecutionSuspended",
          "returnType": "boolean"
        },
        "ShouldRecordXcm": {
          "required": [],
          "optional": [],
          "description": "Storage item ShouldRecordXcm",
          "returnType": "boolean"
        },
        "RecordedXcm": {
          "required": [],
          "optional": [],
          "description": "Storage item RecordedXcm",
          "returnType": "unknown"
        },
        "AuthorizedAliases": {
          "required": [
            "XcmVersionedLocation"
          ],
          "optional": [],
          "description": "Storage item AuthorizedAliases",
          "returnType": "unknown"
        }
      },
      "MessageQueue": {
        "BookStateFor": {
          "required": [
            "ParachainsInclusionAggregateMessageOrigin"
          ],
          "optional": [],
          "description": "Storage item BookStateFor",
          "returnType": "unknown"
        },
        "ServiceHead": {
          "required": [],
          "optional": [],
          "description": "Storage item ServiceHead",
          "returnType": "ParachainsInclusionAggregateMessageOrigin"
        },
        "Pages": {
          "required": [],
          "optional": [],
          "description": "Storage item Pages",
          "returnType": "unknown"
        }
      },
      "AssetRate": {
        "ConversionRateToNative": {
          "required": [
            "Anonymize_I2q3ri6itcjj5u_"
          ],
          "optional": [],
          "description": "Maps an asset to its fixed point representation in the native balance.",
          "returnType": "bigint"
        }
      },
      "Beefy": {
        "Authorities": {
          "required": [],
          "optional": [],
          "description": "Storage item Authorities",
          "returnType": "unknown"
        },
        "ValidatorSetId": {
          "required": [],
          "optional": [],
          "description": "Storage item ValidatorSetId",
          "returnType": "bigint"
        },
        "NextAuthorities": {
          "required": [],
          "optional": [],
          "description": "Storage item NextAuthorities",
          "returnType": "unknown"
        },
        "SetIdSession": {
          "required": [
            "u64"
          ],
          "optional": [],
          "description": "Storage item SetIdSession",
          "returnType": "number"
        },
        "GenesisBlock": {
          "required": [],
          "optional": [],
          "description": "Storage item GenesisBlock",
          "returnType": "unknown"
        }
      },
      "Mmr": {
        "RootHash": {
          "required": [],
          "optional": [],
          "description": "Storage item RootHash",
          "returnType": "Hash"
        },
        "NumberOfLeaves": {
          "required": [],
          "optional": [],
          "description": "Storage item NumberOfLeaves",
          "returnType": "bigint"
        },
        "Nodes": {
          "required": [
            "u64"
          ],
          "optional": [],
          "description": "Storage item Nodes",
          "returnType": "Hash"
        }
      },
      "BeefyMmrLeaf": {
        "BeefyAuthorities": {
          "required": [],
          "optional": [],
          "description": "Storage item BeefyAuthorities",
          "returnType": "unknown"
        },
        "BeefyNextAuthorities": {
          "required": [],
          "optional": [],
          "description": "Storage item BeefyNextAuthorities",
          "returnType": "unknown"
        }
      }
    }
  },
  "moonbeam": {
    "pallets": {
      "System": {
        "Account": {
          "required": [
            "HexString"
          ],
          "optional": [],
          "description": "Storage item Account",
          "returnType": "unknown"
        },
        "ExtrinsicCount": {
          "required": [],
          "optional": [],
          "description": "Storage item ExtrinsicCount",
          "returnType": "number"
        },
        "InherentsApplied": {
          "required": [],
          "optional": [],
          "description": "Storage item InherentsApplied",
          "returnType": "boolean"
        },
        "BlockWeight": {
          "required": [],
          "optional": [],
          "description": "Storage item BlockWeight",
          "returnType": "unknown"
        },
        "AllExtrinsicsLen": {
          "required": [],
          "optional": [],
          "description": "Storage item AllExtrinsicsLen",
          "returnType": "number"
        },
        "BlockHash": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item BlockHash",
          "returnType": "Hash"
        },
        "ExtrinsicData": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item ExtrinsicData",
          "returnType": "Uint8Array"
        },
        "Number": {
          "required": [],
          "optional": [],
          "description": "Storage item Number",
          "returnType": "number"
        },
        "ParentHash": {
          "required": [],
          "optional": [],
          "description": "Storage item ParentHash",
          "returnType": "Hash"
        },
        "Digest": {
          "required": [],
          "optional": [],
          "description": "Storage item Digest",
          "returnType": "unknown"
        },
        "Events": {
          "required": [],
          "optional": [],
          "description": "Storage item Events",
          "returnType": "unknown"
        },
        "EventCount": {
          "required": [],
          "optional": [],
          "description": "Storage item EventCount",
          "returnType": "number"
        },
        "EventTopics": {
          "required": [
            "Hash"
          ],
          "optional": [],
          "description": "Storage item EventTopics",
          "returnType": "unknown"
        },
        "LastRuntimeUpgrade": {
          "required": [],
          "optional": [],
          "description": "Storage item LastRuntimeUpgrade",
          "returnType": "unknown"
        },
        "UpgradedToU32RefCount": {
          "required": [],
          "optional": [],
          "description": "Storage item UpgradedToU32RefCount",
          "returnType": "boolean"
        },
        "UpgradedToTripleRefCount": {
          "required": [],
          "optional": [],
          "description": "Storage item UpgradedToTripleRefCount",
          "returnType": "boolean"
        },
        "ExecutionPhase": {
          "required": [],
          "optional": [],
          "description": "Storage item ExecutionPhase",
          "returnType": "Phase"
        },
        "AuthorizedUpgrade": {
          "required": [],
          "optional": [],
          "description": "Storage item AuthorizedUpgrade",
          "returnType": "unknown"
        }
      },
      "ParachainSystem": {
        "UnincludedSegment": {
          "required": [],
          "optional": [],
          "description": "Storage item UnincludedSegment",
          "returnType": "unknown"
        },
        "AggregatedUnincludedSegment": {
          "required": [],
          "optional": [],
          "description": "Storage item AggregatedUnincludedSegment",
          "returnType": "unknown"
        },
        "PendingValidationCode": {
          "required": [],
          "optional": [],
          "description": "Storage item PendingValidationCode",
          "returnType": "Uint8Array"
        },
        "NewValidationCode": {
          "required": [],
          "optional": [],
          "description": "Storage item NewValidationCode",
          "returnType": "Uint8Array"
        },
        "ValidationData": {
          "required": [],
          "optional": [],
          "description": "Storage item ValidationData",
          "returnType": "unknown"
        },
        "DidSetValidationCode": {
          "required": [],
          "optional": [],
          "description": "Storage item DidSetValidationCode",
          "returnType": "boolean"
        },
        "LastRelayChainBlockNumber": {
          "required": [],
          "optional": [],
          "description": "Storage item LastRelayChainBlockNumber",
          "returnType": "number"
        },
        "UpgradeRestrictionSignal": {
          "required": [],
          "optional": [],
          "description": "Storage item UpgradeRestrictionSignal",
          "returnType": "unknown"
        },
        "UpgradeGoAhead": {
          "required": [],
          "optional": [],
          "description": "Storage item UpgradeGoAhead",
          "returnType": "unknown"
        },
        "RelayStateProof": {
          "required": [],
          "optional": [],
          "description": "Storage item RelayStateProof",
          "returnType": "unknown"
        },
        "RelevantMessagingState": {
          "required": [],
          "optional": [],
          "description": "Storage item RelevantMessagingState",
          "returnType": "unknown"
        },
        "HostConfiguration": {
          "required": [],
          "optional": [],
          "description": "Storage item HostConfiguration",
          "returnType": "unknown"
        },
        "LastDmqMqcHead": {
          "required": [],
          "optional": [],
          "description": "Storage item LastDmqMqcHead",
          "returnType": "Hash"
        },
        "LastHrmpMqcHeads": {
          "required": [],
          "optional": [],
          "description": "Storage item LastHrmpMqcHeads",
          "returnType": "unknown"
        },
        "ProcessedDownwardMessages": {
          "required": [],
          "optional": [],
          "description": "Storage item ProcessedDownwardMessages",
          "returnType": "number"
        },
        "HrmpWatermark": {
          "required": [],
          "optional": [],
          "description": "Storage item HrmpWatermark",
          "returnType": "number"
        },
        "HrmpOutboundMessages": {
          "required": [],
          "optional": [],
          "description": "Storage item HrmpOutboundMessages",
          "returnType": "unknown"
        },
        "UpwardMessages": {
          "required": [],
          "optional": [],
          "description": "Storage item UpwardMessages",
          "returnType": "unknown"
        },
        "PendingUpwardMessages": {
          "required": [],
          "optional": [],
          "description": "Storage item PendingUpwardMessages",
          "returnType": "unknown"
        },
        "UpwardDeliveryFeeFactor": {
          "required": [],
          "optional": [],
          "description": "Storage item UpwardDeliveryFeeFactor",
          "returnType": "bigint"
        },
        "AnnouncedHrmpMessagesPerCandidate": {
          "required": [],
          "optional": [],
          "description": "Storage item AnnouncedHrmpMessagesPerCandidate",
          "returnType": "number"
        },
        "ReservedXcmpWeightOverride": {
          "required": [],
          "optional": [],
          "description": "Storage item ReservedXcmpWeightOverride",
          "returnType": "unknown"
        },
        "ReservedDmpWeightOverride": {
          "required": [],
          "optional": [],
          "description": "Storage item ReservedDmpWeightOverride",
          "returnType": "unknown"
        },
        "CustomValidationHeadData": {
          "required": [],
          "optional": [],
          "description": "Storage item CustomValidationHeadData",
          "returnType": "Uint8Array"
        }
      },
      "Timestamp": {
        "Now": {
          "required": [],
          "optional": [],
          "description": "Storage item Now",
          "returnType": "bigint"
        },
        "DidUpdate": {
          "required": [],
          "optional": [],
          "description": "Storage item DidUpdate",
          "returnType": "boolean"
        }
      },
      "ParachainInfo": {
        "ParachainId": {
          "required": [],
          "optional": [],
          "description": "Storage item ParachainId",
          "returnType": "number"
        }
      },
      "Balances": {
        "TotalIssuance": {
          "required": [],
          "optional": [],
          "description": "Storage item TotalIssuance",
          "returnType": "bigint"
        },
        "InactiveIssuance": {
          "required": [],
          "optional": [],
          "description": "Storage item InactiveIssuance",
          "returnType": "bigint"
        },
        "Account": {
          "required": [
            "HexString"
          ],
          "optional": [],
          "description": "Storage item Account",
          "returnType": "unknown"
        },
        "Locks": {
          "required": [
            "HexString"
          ],
          "optional": [],
          "description": "Storage item Locks",
          "returnType": "unknown"
        },
        "Reserves": {
          "required": [
            "HexString"
          ],
          "optional": [],
          "description": "Storage item Reserves",
          "returnType": "unknown"
        },
        "Holds": {
          "required": [
            "HexString"
          ],
          "optional": [],
          "description": "Storage item Holds",
          "returnType": "unknown"
        },
        "Freezes": {
          "required": [
            "HexString"
          ],
          "optional": [],
          "description": "Storage item Freezes",
          "returnType": "unknown"
        }
      },
      "TransactionPayment": {
        "NextFeeMultiplier": {
          "required": [],
          "optional": [],
          "description": "Storage item NextFeeMultiplier",
          "returnType": "bigint"
        },
        "StorageVersion": {
          "required": [],
          "optional": [],
          "description": "Storage item StorageVersion",
          "returnType": "TransactionPaymentReleases"
        }
      },
      "ParachainStaking": {
        "CollatorCommission": {
          "required": [],
          "optional": [],
          "description": "Storage item CollatorCommission",
          "returnType": "number"
        },
        "TotalSelected": {
          "required": [],
          "optional": [],
          "description": "Storage item TotalSelected",
          "returnType": "number"
        },
        "InflationDistributionInfo": {
          "required": [],
          "optional": [],
          "description": "Storage item InflationDistributionInfo",
          "returnType": "unknown"
        },
        "Round": {
          "required": [],
          "optional": [],
          "description": "Storage item Round",
          "returnType": "unknown"
        },
        "DelegatorState": {
          "required": [
            "HexString"
          ],
          "optional": [],
          "description": "Storage item DelegatorState",
          "returnType": "unknown"
        },
        "CandidateInfo": {
          "required": [
            "HexString"
          ],
          "optional": [],
          "description": "Storage item CandidateInfo",
          "returnType": "unknown"
        },
        "DelegationScheduledRequests": {
          "required": [
            "HexString"
          ],
          "optional": [],
          "description": "Storage item DelegationScheduledRequests",
          "returnType": "unknown"
        },
        "AutoCompoundingDelegations": {
          "required": [
            "HexString"
          ],
          "optional": [],
          "description": "Storage item AutoCompoundingDelegations",
          "returnType": "unknown"
        },
        "TopDelegations": {
          "required": [
            "HexString"
          ],
          "optional": [],
          "description": "Storage item TopDelegations",
          "returnType": "unknown"
        },
        "BottomDelegations": {
          "required": [
            "HexString"
          ],
          "optional": [],
          "description": "Storage item BottomDelegations",
          "returnType": "unknown"
        },
        "SelectedCandidates": {
          "required": [],
          "optional": [],
          "description": "Storage item SelectedCandidates",
          "returnType": "unknown"
        },
        "Total": {
          "required": [],
          "optional": [],
          "description": "Storage item Total",
          "returnType": "bigint"
        },
        "CandidatePool": {
          "required": [],
          "optional": [],
          "description": "Storage item CandidatePool",
          "returnType": "unknown"
        },
        "AtStake": {
          "required": [],
          "optional": [],
          "description": "Storage item AtStake",
          "returnType": "unknown"
        },
        "WasInactive": {
          "required": [],
          "optional": [],
          "description": "Storage item WasInactive",
          "returnType": "null"
        },
        "DelayedPayouts": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item DelayedPayouts",
          "returnType": "unknown"
        },
        "InflationConfig": {
          "required": [],
          "optional": [],
          "description": "Storage item InflationConfig",
          "returnType": "unknown"
        },
        "Points": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item Points",
          "returnType": "number"
        },
        "AwardedPts": {
          "required": [],
          "optional": [],
          "description": "Storage item AwardedPts",
          "returnType": "number"
        },
        "EnableMarkingOffline": {
          "required": [],
          "optional": [],
          "description": "Storage item EnableMarkingOffline",
          "returnType": "boolean"
        }
      },
      "AuthorInherent": {
        "Author": {
          "required": [],
          "optional": [],
          "description": "Storage item Author",
          "returnType": "HexString"
        },
        "InherentIncluded": {
          "required": [],
          "optional": [],
          "description": "Storage item InherentIncluded",
          "returnType": "boolean"
        }
      },
      "AuthorFilter": {
        "EligibleRatio": {
          "required": [],
          "optional": [],
          "description": "Storage item EligibleRatio",
          "returnType": "number"
        },
        "EligibleCount": {
          "required": [],
          "optional": [],
          "description": "Storage item EligibleCount",
          "returnType": "number"
        }
      },
      "AuthorMapping": {
        "MappingWithDeposit": {
          "required": [
            "Hash"
          ],
          "optional": [],
          "description": "Storage item MappingWithDeposit",
          "returnType": "unknown"
        },
        "NimbusLookup": {
          "required": [
            "HexString"
          ],
          "optional": [],
          "description": "Storage item NimbusLookup",
          "returnType": "Hash"
        }
      },
      "MoonbeamOrbiters": {
        "AccountLookupOverride": {
          "required": [
            "HexString"
          ],
          "optional": [],
          "description": "Storage item AccountLookupOverride",
          "returnType": "unknown"
        },
        "CollatorsPool": {
          "required": [
            "HexString"
          ],
          "optional": [],
          "description": "Storage item CollatorsPool",
          "returnType": "unknown"
        },
        "CounterForCollatorsPool": {
          "required": [],
          "optional": [],
          "description": "Storage item CounterForCollatorsPool",
          "returnType": "number"
        },
        "CurrentRound": {
          "required": [],
          "optional": [],
          "description": "Storage item CurrentRound",
          "returnType": "number"
        },
        "ForceRotation": {
          "required": [],
          "optional": [],
          "description": "Storage item ForceRotation",
          "returnType": "boolean"
        },
        "MinOrbiterDeposit": {
          "required": [],
          "optional": [],
          "description": "Storage item MinOrbiterDeposit",
          "returnType": "bigint"
        },
        "OrbiterPerRound": {
          "required": [],
          "optional": [],
          "description": "Storage item OrbiterPerRound",
          "returnType": "HexString"
        },
        "RegisteredOrbiter": {
          "required": [
            "HexString"
          ],
          "optional": [],
          "description": "Storage item RegisteredOrbiter",
          "returnType": "boolean"
        }
      },
      "AsyncBacking": {
        "SlotInfo": {
          "required": [],
          "optional": [],
          "description": "Storage item SlotInfo",
          "returnType": "unknown"
        }
      },
      "Proxy": {
        "Proxies": {
          "required": [
            "HexString"
          ],
          "optional": [],
          "description": "Storage item Proxies",
          "returnType": "unknown"
        },
        "Announcements": {
          "required": [
            "HexString"
          ],
          "optional": [],
          "description": "Storage item Announcements",
          "returnType": "unknown"
        }
      },
      "MaintenanceMode": {
        "MaintenanceMode": {
          "required": [],
          "optional": [],
          "description": "Storage item MaintenanceMode",
          "returnType": "boolean"
        }
      },
      "Identity": {
        "IdentityOf": {
          "required": [
            "HexString"
          ],
          "optional": [],
          "description": "Storage item IdentityOf",
          "returnType": "unknown"
        },
        "UsernameOf": {
          "required": [
            "HexString"
          ],
          "optional": [],
          "description": "Storage item UsernameOf",
          "returnType": "Uint8Array"
        },
        "SuperOf": {
          "required": [
            "HexString"
          ],
          "optional": [],
          "description": "Storage item SuperOf",
          "returnType": "unknown"
        },
        "SubsOf": {
          "required": [
            "HexString"
          ],
          "optional": [],
          "description": "Storage item SubsOf",
          "returnType": "unknown"
        },
        "Registrars": {
          "required": [],
          "optional": [],
          "description": "Storage item Registrars",
          "returnType": "unknown"
        },
        "AuthorityOf": {
          "required": [
            "bytes"
          ],
          "optional": [],
          "description": "Storage item AuthorityOf",
          "returnType": "unknown"
        },
        "UsernameInfoOf": {
          "required": [
            "bytes"
          ],
          "optional": [],
          "description": "Storage item UsernameInfoOf",
          "returnType": "unknown"
        },
        "PendingUsernames": {
          "required": [
            "bytes"
          ],
          "optional": [],
          "description": "Storage item PendingUsernames",
          "returnType": "unknown"
        },
        "UnbindingUsernames": {
          "required": [
            "bytes"
          ],
          "optional": [],
          "description": "Storage item UnbindingUsernames",
          "returnType": "number"
        }
      },
      "Migrations": {
        "FullyUpgraded": {
          "required": [],
          "optional": [],
          "description": "Storage item FullyUpgraded",
          "returnType": "boolean"
        },
        "MigrationState": {
          "required": [
            "bytes"
          ],
          "optional": [],
          "description": "Storage item MigrationState",
          "returnType": "boolean"
        },
        "ShouldPauseXcm": {
          "required": [],
          "optional": [],
          "description": "Storage item ShouldPauseXcm",
          "returnType": "boolean"
        }
      },
      "Multisig": {
        "Multisigs": {
          "required": [],
          "optional": [],
          "description": "Storage item Multisigs",
          "returnType": "unknown"
        }
      },
      "Parameters": {
        "Parameters": {
          "required": [
            "Anonymize_I7afhi9d8kt8k_"
          ],
          "optional": [],
          "description": "Storage item Parameters",
          "returnType": "unknown"
        }
      },
      "EthereumChainId": {
        "ChainId": {
          "required": [],
          "optional": [],
          "description": "Storage item ChainId",
          "returnType": "bigint"
        }
      },
      "EVM": {
        "AccountCodes": {
          "required": [
            "bytes"
          ],
          "optional": [],
          "description": "Storage item AccountCodes",
          "returnType": "Uint8Array"
        },
        "AccountCodesMetadata": {
          "required": [
            "bytes"
          ],
          "optional": [],
          "description": "Storage item AccountCodesMetadata",
          "returnType": "unknown"
        },
        "AccountStorages": {
          "required": [],
          "optional": [],
          "description": "Storage item AccountStorages",
          "returnType": "Hash"
        }
      },
      "Ethereum": {
        "Pending": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item Pending",
          "returnType": "unknown"
        },
        "CounterForPending": {
          "required": [],
          "optional": [],
          "description": "Storage item CounterForPending",
          "returnType": "number"
        },
        "CurrentBlock": {
          "required": [],
          "optional": [],
          "description": "Storage item CurrentBlock",
          "returnType": "unknown"
        },
        "CurrentReceipts": {
          "required": [],
          "optional": [],
          "description": "Storage item CurrentReceipts",
          "returnType": "unknown"
        },
        "CurrentTransactionStatuses": {
          "required": [],
          "optional": [],
          "description": "Storage item CurrentTransactionStatuses",
          "returnType": "unknown"
        },
        "BlockHash": {
          "required": [
            "Anonymize_I4totqt881mlti_"
          ],
          "optional": [],
          "description": "Storage item BlockHash",
          "returnType": "Hash"
        }
      },
      "Scheduler": {
        "IncompleteSince": {
          "required": [],
          "optional": [],
          "description": "Storage item IncompleteSince",
          "returnType": "number"
        },
        "Agenda": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item Agenda",
          "returnType": "unknown"
        },
        "Retries": {
          "required": [
            "Anonymize_I9jd27rnpm8ttv_"
          ],
          "optional": [],
          "description": "Storage item Retries",
          "returnType": "unknown"
        },
        "Lookup": {
          "required": [
            "Hash"
          ],
          "optional": [],
          "description": "Storage item Lookup",
          "returnType": "unknown"
        }
      },
      "Preimage": {
        "StatusFor": {
          "required": [
            "Hash"
          ],
          "optional": [],
          "description": "Storage item StatusFor",
          "returnType": "unknown"
        },
        "RequestStatusFor": {
          "required": [
            "Hash"
          ],
          "optional": [],
          "description": "Storage item RequestStatusFor",
          "returnType": "unknown"
        },
        "PreimageFor": {
          "required": [
            "Anonymize_I4pact7n2e9a0i_"
          ],
          "optional": [],
          "description": "Storage item PreimageFor",
          "returnType": "Uint8Array"
        }
      },
      "ConvictionVoting": {
        "VotingFor": {
          "required": [],
          "optional": [],
          "description": "Storage item VotingFor",
          "returnType": "unknown"
        },
        "ClassLocksFor": {
          "required": [
            "HexString"
          ],
          "optional": [],
          "description": "Storage item ClassLocksFor",
          "returnType": "unknown"
        }
      },
      "Referenda": {
        "ReferendumCount": {
          "required": [],
          "optional": [],
          "description": "Storage item ReferendumCount",
          "returnType": "number"
        },
        "ReferendumInfoFor": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item ReferendumInfoFor",
          "returnType": "unknown"
        },
        "TrackQueue": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item TrackQueue",
          "returnType": "unknown"
        },
        "DecidingCount": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item DecidingCount",
          "returnType": "number"
        },
        "MetadataOf": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item MetadataOf",
          "returnType": "Hash"
        }
      },
      "Whitelist": {
        "WhitelistedCall": {
          "required": [
            "Hash"
          ],
          "optional": [],
          "description": "Storage item WhitelistedCall",
          "returnType": "null"
        }
      },
      "TreasuryCouncilCollective": {
        "Proposals": {
          "required": [],
          "optional": [],
          "description": "Storage item Proposals",
          "returnType": "unknown"
        },
        "ProposalOf": {
          "required": [
            "Hash"
          ],
          "optional": [],
          "description": "Storage item ProposalOf",
          "returnType": "unknown"
        },
        "CostOf": {
          "required": [
            "Hash"
          ],
          "optional": [],
          "description": "Storage item CostOf",
          "returnType": "unknown"
        },
        "Voting": {
          "required": [
            "Hash"
          ],
          "optional": [],
          "description": "Storage item Voting",
          "returnType": "unknown"
        },
        "ProposalCount": {
          "required": [],
          "optional": [],
          "description": "Storage item ProposalCount",
          "returnType": "number"
        },
        "Members": {
          "required": [],
          "optional": [],
          "description": "Storage item Members",
          "returnType": "unknown"
        },
        "Prime": {
          "required": [],
          "optional": [],
          "description": "Storage item Prime",
          "returnType": "HexString"
        }
      },
      "OpenTechCommitteeCollective": {
        "Proposals": {
          "required": [],
          "optional": [],
          "description": "Storage item Proposals",
          "returnType": "unknown"
        },
        "ProposalOf": {
          "required": [
            "Hash"
          ],
          "optional": [],
          "description": "Storage item ProposalOf",
          "returnType": "unknown"
        },
        "CostOf": {
          "required": [
            "Hash"
          ],
          "optional": [],
          "description": "Storage item CostOf",
          "returnType": "unknown"
        },
        "Voting": {
          "required": [
            "Hash"
          ],
          "optional": [],
          "description": "Storage item Voting",
          "returnType": "unknown"
        },
        "ProposalCount": {
          "required": [],
          "optional": [],
          "description": "Storage item ProposalCount",
          "returnType": "number"
        },
        "Members": {
          "required": [],
          "optional": [],
          "description": "Storage item Members",
          "returnType": "unknown"
        },
        "Prime": {
          "required": [],
          "optional": [],
          "description": "Storage item Prime",
          "returnType": "HexString"
        }
      },
      "Treasury": {
        "ProposalCount": {
          "required": [],
          "optional": [],
          "description": "Storage item ProposalCount",
          "returnType": "number"
        },
        "Proposals": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item Proposals",
          "returnType": "unknown"
        },
        "Deactivated": {
          "required": [],
          "optional": [],
          "description": "Storage item Deactivated",
          "returnType": "bigint"
        },
        "Approvals": {
          "required": [],
          "optional": [],
          "description": "Storage item Approvals",
          "returnType": "unknown"
        },
        "SpendCount": {
          "required": [],
          "optional": [],
          "description": "Storage item SpendCount",
          "returnType": "number"
        },
        "Spends": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item Spends",
          "returnType": "unknown"
        },
        "LastSpendPeriod": {
          "required": [],
          "optional": [],
          "description": "Storage item LastSpendPeriod",
          "returnType": "number"
        }
      },
      "CrowdloanRewards": {
        "AccountsPayable": {
          "required": [
            "HexString"
          ],
          "optional": [],
          "description": "Storage item AccountsPayable",
          "returnType": "unknown"
        },
        "ClaimedRelayChainIds": {
          "required": [
            "Hash"
          ],
          "optional": [],
          "description": "Storage item ClaimedRelayChainIds",
          "returnType": "null"
        },
        "UnassociatedContributions": {
          "required": [
            "Hash"
          ],
          "optional": [],
          "description": "Storage item UnassociatedContributions",
          "returnType": "unknown"
        },
        "Initialized": {
          "required": [],
          "optional": [],
          "description": "Storage item Initialized",
          "returnType": "boolean"
        },
        "InitRelayBlock": {
          "required": [],
          "optional": [],
          "description": "Storage item InitRelayBlock",
          "returnType": "number"
        },
        "EndRelayBlock": {
          "required": [],
          "optional": [],
          "description": "Storage item EndRelayBlock",
          "returnType": "number"
        },
        "InitializedRewardAmount": {
          "required": [],
          "optional": [],
          "description": "Storage item InitializedRewardAmount",
          "returnType": "bigint"
        },
        "TotalContributors": {
          "required": [],
          "optional": [],
          "description": "Storage item TotalContributors",
          "returnType": "number"
        }
      },
      "XcmpQueue": {
        "InboundXcmpSuspended": {
          "required": [],
          "optional": [],
          "description": "Storage item InboundXcmpSuspended",
          "returnType": "unknown"
        },
        "OutboundXcmpStatus": {
          "required": [],
          "optional": [],
          "description": "Storage item OutboundXcmpStatus",
          "returnType": "unknown"
        },
        "OutboundXcmpMessages": {
          "required": [],
          "optional": [],
          "description": "Storage item OutboundXcmpMessages",
          "returnType": "Uint8Array"
        },
        "SignalMessages": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item SignalMessages",
          "returnType": "Uint8Array"
        },
        "QueueConfig": {
          "required": [],
          "optional": [],
          "description": "Storage item QueueConfig",
          "returnType": "unknown"
        },
        "QueueSuspended": {
          "required": [],
          "optional": [],
          "description": "Storage item QueueSuspended",
          "returnType": "boolean"
        },
        "DeliveryFeeFactor": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item DeliveryFeeFactor",
          "returnType": "bigint"
        }
      },
      "PolkadotXcm": {
        "QueryCounter": {
          "required": [],
          "optional": [],
          "description": "Storage item QueryCounter",
          "returnType": "bigint"
        },
        "Queries": {
          "required": [
            "u64"
          ],
          "optional": [],
          "description": "Storage item Queries",
          "returnType": "unknown"
        },
        "AssetTraps": {
          "required": [
            "Hash"
          ],
          "optional": [],
          "description": "Storage item AssetTraps",
          "returnType": "number"
        },
        "SafeXcmVersion": {
          "required": [],
          "optional": [],
          "description": "Storage item SafeXcmVersion",
          "returnType": "number"
        },
        "SupportedVersion": {
          "required": [],
          "optional": [],
          "description": "Storage item SupportedVersion",
          "returnType": "number"
        },
        "VersionNotifiers": {
          "required": [],
          "optional": [],
          "description": "Storage item VersionNotifiers",
          "returnType": "bigint"
        },
        "VersionNotifyTargets": {
          "required": [],
          "optional": [],
          "description": "Storage item VersionNotifyTargets",
          "returnType": "unknown"
        },
        "VersionDiscoveryQueue": {
          "required": [],
          "optional": [],
          "description": "Storage item VersionDiscoveryQueue",
          "returnType": "unknown"
        },
        "CurrentMigration": {
          "required": [],
          "optional": [],
          "description": "Storage item CurrentMigration",
          "returnType": "XcmPalletVersionMigrationStage"
        },
        "RemoteLockedFungibles": {
          "required": [],
          "optional": [],
          "description": "Storage item RemoteLockedFungibles",
          "returnType": "unknown"
        },
        "LockedFungibles": {
          "required": [
            "HexString"
          ],
          "optional": [],
          "description": "Storage item LockedFungibles",
          "returnType": "unknown"
        },
        "XcmExecutionSuspended": {
          "required": [],
          "optional": [],
          "description": "Storage item XcmExecutionSuspended",
          "returnType": "boolean"
        },
        "ShouldRecordXcm": {
          "required": [],
          "optional": [],
          "description": "Storage item ShouldRecordXcm",
          "returnType": "boolean"
        },
        "RecordedXcm": {
          "required": [],
          "optional": [],
          "description": "Storage item RecordedXcm",
          "returnType": "unknown"
        }
      },
      "Assets": {
        "Asset": {
          "required": [
            "u64"
          ],
          "optional": [],
          "description": "Storage item Asset",
          "returnType": "unknown"
        },
        "Account": {
          "required": [
            "AssetId",
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Account",
          "returnType": "unknown"
        },
        "Approvals": {
          "required": [
            "AssetId",
            "AccountId",
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Approvals",
          "returnType": "unknown"
        },
        "Metadata": {
          "required": [
            "u64"
          ],
          "optional": [],
          "description": "Storage item Metadata",
          "returnType": "unknown"
        },
        "NextAssetId": {
          "required": [],
          "optional": [],
          "description": "Storage item NextAssetId",
          "returnType": "bigint"
        }
      },
      "AssetManager": {
        "AssetIdType": {
          "required": [
            "u64"
          ],
          "optional": [],
          "description": "Storage item AssetIdType",
          "returnType": "unknown"
        },
        "AssetTypeId": {
          "required": [
            "Anonymize_Ics9mfhmor8iso_"
          ],
          "optional": [],
          "description": "Storage item AssetTypeId",
          "returnType": "bigint"
        }
      },
      "XcmTransactor": {
        "IndexToAccount": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item IndexToAccount",
          "returnType": "HexString"
        },
        "TransactInfoWithWeightLimit": {
          "required": [
            "Anonymize_If9iqq7i64mur8_"
          ],
          "optional": [],
          "description": "Storage item TransactInfoWithWeightLimit",
          "returnType": "unknown"
        },
        "DestinationAssetFeePerSecond": {
          "required": [
            "Anonymize_If9iqq7i64mur8_"
          ],
          "optional": [],
          "description": "Storage item DestinationAssetFeePerSecond",
          "returnType": "bigint"
        },
        "RelayIndices": {
          "required": [],
          "optional": [],
          "description": "Storage item RelayIndices",
          "returnType": "unknown"
        }
      },
      "EthereumXcm": {
        "Nonce": {
          "required": [],
          "optional": [],
          "description": "Storage item Nonce",
          "returnType": "unknown"
        },
        "EthereumXcmSuspended": {
          "required": [],
          "optional": [],
          "description": "Storage item EthereumXcmSuspended",
          "returnType": "boolean"
        }
      },
      "MessageQueue": {
        "BookStateFor": {
          "required": [
            "Anonymize_Iejeo53sea6n4q_"
          ],
          "optional": [],
          "description": "Storage item BookStateFor",
          "returnType": "unknown"
        },
        "ServiceHead": {
          "required": [],
          "optional": [],
          "description": "Storage item ServiceHead",
          "returnType": "unknown"
        },
        "Pages": {
          "required": [],
          "optional": [],
          "description": "Storage item Pages",
          "returnType": "unknown"
        }
      },
      "EvmForeignAssets": {
        "AssetsById": {
          "required": [
            "u64"
          ],
          "optional": [],
          "description": "Storage item AssetsById",
          "returnType": "unknown"
        },
        "CounterForAssetsById": {
          "required": [],
          "optional": [],
          "description": "Storage item CounterForAssetsById",
          "returnType": "number"
        },
        "AssetsByLocation": {
          "required": [
            "Anonymize_If9iqq7i64mur8_"
          ],
          "optional": [],
          "description": "Storage item AssetsByLocation",
          "returnType": "unknown"
        },
        "AssetsCreationDetails": {
          "required": [
            "u64"
          ],
          "optional": [],
          "description": "Storage item AssetsCreationDetails",
          "returnType": "unknown"
        }
      },
      "XcmWeightTrader": {
        "SupportedAssets": {
          "required": [
            "Anonymize_If9iqq7i64mur8_"
          ],
          "optional": [],
          "description": "Storage item SupportedAssets",
          "returnType": "unknown"
        }
      },
      "EmergencyParaXcm": {
        "Mode": {
          "required": [],
          "optional": [],
          "description": "Storage item Mode",
          "returnType": "unknown"
        }
      },
      "MultiBlockMigrations": {
        "Cursor": {
          "required": [],
          "optional": [],
          "description": "Storage item Cursor",
          "returnType": "unknown"
        },
        "Historic": {
          "required": [
            "bytes"
          ],
          "optional": [],
          "description": "Storage item Historic",
          "returnType": "null"
        }
      },
      "RelayStorageRoots": {
        "RelayStorageRoot": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item RelayStorageRoot",
          "returnType": "Hash"
        },
        "RelayStorageRootKeys": {
          "required": [],
          "optional": [],
          "description": "Storage item RelayStorageRootKeys",
          "returnType": "unknown"
        }
      },
      "Randomness": {
        "Requests": {
          "required": [
            "u64"
          ],
          "optional": [],
          "description": "Storage item Requests",
          "returnType": "unknown"
        },
        "RequestCount": {
          "required": [],
          "optional": [],
          "description": "Storage item RequestCount",
          "returnType": "bigint"
        },
        "LocalVrfOutput": {
          "required": [],
          "optional": [],
          "description": "Storage item LocalVrfOutput",
          "returnType": "unknown"
        },
        "RelayEpoch": {
          "required": [],
          "optional": [],
          "description": "Storage item RelayEpoch",
          "returnType": "bigint"
        },
        "InherentIncluded": {
          "required": [],
          "optional": [],
          "description": "Storage item InherentIncluded",
          "returnType": "null"
        },
        "NotFirstBlock": {
          "required": [],
          "optional": [],
          "description": "Storage item NotFirstBlock",
          "returnType": "null"
        },
        "RandomnessResults": {
          "required": [
            "Anonymize_I316f7rqm1ifg1_"
          ],
          "optional": [],
          "description": "Storage item RandomnessResults",
          "returnType": "unknown"
        },
        "PreviousLocalVrfOutput": {
          "required": [],
          "optional": [],
          "description": "Storage item PreviousLocalVrfOutput",
          "returnType": "Hash"
        }
      },
      "BridgeKusamaGrandpa": {
        "FreeHeadersRemaining": {
          "required": [],
          "optional": [],
          "description": "Storage item FreeHeadersRemaining",
          "returnType": "number"
        },
        "InitialHash": {
          "required": [],
          "optional": [],
          "description": "Storage item InitialHash",
          "returnType": "Hash"
        },
        "BestFinalized": {
          "required": [],
          "optional": [],
          "description": "Storage item BestFinalized",
          "returnType": "unknown"
        },
        "ImportedHashes": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item ImportedHashes",
          "returnType": "Hash"
        },
        "ImportedHashesPointer": {
          "required": [],
          "optional": [],
          "description": "Storage item ImportedHashesPointer",
          "returnType": "number"
        },
        "ImportedHeaders": {
          "required": [
            "Hash"
          ],
          "optional": [],
          "description": "Storage item ImportedHeaders",
          "returnType": "unknown"
        },
        "CurrentAuthoritySet": {
          "required": [],
          "optional": [],
          "description": "Storage item CurrentAuthoritySet",
          "returnType": "unknown"
        },
        "PalletOwner": {
          "required": [],
          "optional": [],
          "description": "Storage item PalletOwner",
          "returnType": "HexString"
        },
        "PalletOperatingMode": {
          "required": [],
          "optional": [],
          "description": "Storage item PalletOperatingMode",
          "returnType": "unknown"
        }
      },
      "BridgeKusamaParachains": {
        "PalletOwner": {
          "required": [],
          "optional": [],
          "description": "Storage item PalletOwner",
          "returnType": "HexString"
        },
        "PalletOperatingMode": {
          "required": [],
          "optional": [],
          "description": "Storage item PalletOperatingMode",
          "returnType": "unknown"
        },
        "ParasInfo": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item ParasInfo",
          "returnType": "unknown"
        },
        "ImportedParaHeads": {
          "required": [],
          "optional": [],
          "description": "Storage item ImportedParaHeads",
          "returnType": "Uint8Array"
        },
        "ImportedParaHashes": {
          "required": [],
          "optional": [],
          "description": "Storage item ImportedParaHashes",
          "returnType": "Hash"
        }
      },
      "BridgeKusamaMessages": {
        "PalletOwner": {
          "required": [],
          "optional": [],
          "description": "Storage item PalletOwner",
          "returnType": "HexString"
        },
        "PalletOperatingMode": {
          "required": [],
          "optional": [],
          "description": "Storage item PalletOperatingMode",
          "returnType": "unknown"
        },
        "InboundLanes": {
          "required": [
            "Hash"
          ],
          "optional": [],
          "description": "Storage item InboundLanes",
          "returnType": "unknown"
        },
        "OutboundLanes": {
          "required": [
            "Hash"
          ],
          "optional": [],
          "description": "Storage item OutboundLanes",
          "returnType": "unknown"
        },
        "OutboundMessages": {
          "required": [
            "Anonymize_I1udtl7slp3rsi_"
          ],
          "optional": [],
          "description": "Storage item OutboundMessages",
          "returnType": "Uint8Array"
        }
      },
      "BridgeXcmOverMoonriver": {
        "Bridges": {
          "required": [
            "Hash"
          ],
          "optional": [],
          "description": "Storage item Bridges",
          "returnType": "unknown"
        },
        "LaneToBridge": {
          "required": [
            "Hash"
          ],
          "optional": [],
          "description": "Storage item LaneToBridge",
          "returnType": "Hash"
        }
      }
    }
  },
  "paseo_asset_hub": {
    "pallets": {
      "System": {
        "Account": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Account",
          "returnType": "unknown"
        },
        "ExtrinsicCount": {
          "required": [],
          "optional": [],
          "description": "Storage item ExtrinsicCount",
          "returnType": "number"
        },
        "InherentsApplied": {
          "required": [],
          "optional": [],
          "description": "Storage item InherentsApplied",
          "returnType": "boolean"
        },
        "BlockWeight": {
          "required": [],
          "optional": [],
          "description": "Storage item BlockWeight",
          "returnType": "unknown"
        },
        "AllExtrinsicsLen": {
          "required": [],
          "optional": [],
          "description": "Storage item AllExtrinsicsLen",
          "returnType": "number"
        },
        "BlockHash": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item BlockHash",
          "returnType": "Hash"
        },
        "ExtrinsicData": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item ExtrinsicData",
          "returnType": "Uint8Array"
        },
        "Number": {
          "required": [],
          "optional": [],
          "description": "Storage item Number",
          "returnType": "number"
        },
        "ParentHash": {
          "required": [],
          "optional": [],
          "description": "Storage item ParentHash",
          "returnType": "Hash"
        },
        "Digest": {
          "required": [],
          "optional": [],
          "description": "Storage item Digest",
          "returnType": "unknown"
        },
        "Events": {
          "required": [],
          "optional": [],
          "description": "Storage item Events",
          "returnType": "unknown"
        },
        "EventCount": {
          "required": [],
          "optional": [],
          "description": "Storage item EventCount",
          "returnType": "number"
        },
        "EventTopics": {
          "required": [
            "Hash"
          ],
          "optional": [],
          "description": "Storage item EventTopics",
          "returnType": "unknown"
        },
        "LastRuntimeUpgrade": {
          "required": [],
          "optional": [],
          "description": "Storage item LastRuntimeUpgrade",
          "returnType": "unknown"
        },
        "UpgradedToU32RefCount": {
          "required": [],
          "optional": [],
          "description": "Storage item UpgradedToU32RefCount",
          "returnType": "boolean"
        },
        "UpgradedToTripleRefCount": {
          "required": [],
          "optional": [],
          "description": "Storage item UpgradedToTripleRefCount",
          "returnType": "boolean"
        },
        "ExecutionPhase": {
          "required": [],
          "optional": [],
          "description": "Storage item ExecutionPhase",
          "returnType": "Phase"
        },
        "AuthorizedUpgrade": {
          "required": [],
          "optional": [],
          "description": "Storage item AuthorizedUpgrade",
          "returnType": "unknown"
        },
        "ExtrinsicWeightReclaimed": {
          "required": [],
          "optional": [],
          "description": "Storage item ExtrinsicWeightReclaimed",
          "returnType": "unknown"
        }
      },
      "ParachainSystem": {
        "UnincludedSegment": {
          "required": [],
          "optional": [],
          "description": "Storage item UnincludedSegment",
          "returnType": "unknown"
        },
        "AggregatedUnincludedSegment": {
          "required": [],
          "optional": [],
          "description": "Storage item AggregatedUnincludedSegment",
          "returnType": "unknown"
        },
        "PendingValidationCode": {
          "required": [],
          "optional": [],
          "description": "Storage item PendingValidationCode",
          "returnType": "Uint8Array"
        },
        "NewValidationCode": {
          "required": [],
          "optional": [],
          "description": "Storage item NewValidationCode",
          "returnType": "Uint8Array"
        },
        "ValidationData": {
          "required": [],
          "optional": [],
          "description": "Storage item ValidationData",
          "returnType": "unknown"
        },
        "DidSetValidationCode": {
          "required": [],
          "optional": [],
          "description": "Storage item DidSetValidationCode",
          "returnType": "boolean"
        },
        "LastRelayChainBlockNumber": {
          "required": [],
          "optional": [],
          "description": "Storage item LastRelayChainBlockNumber",
          "returnType": "number"
        },
        "UpgradeRestrictionSignal": {
          "required": [],
          "optional": [],
          "description": "Storage item UpgradeRestrictionSignal",
          "returnType": "unknown"
        },
        "UpgradeGoAhead": {
          "required": [],
          "optional": [],
          "description": "Storage item UpgradeGoAhead",
          "returnType": "unknown"
        },
        "RelayStateProof": {
          "required": [],
          "optional": [],
          "description": "Storage item RelayStateProof",
          "returnType": "unknown"
        },
        "RelevantMessagingState": {
          "required": [],
          "optional": [],
          "description": "Storage item RelevantMessagingState",
          "returnType": "unknown"
        },
        "HostConfiguration": {
          "required": [],
          "optional": [],
          "description": "Storage item HostConfiguration",
          "returnType": "unknown"
        },
        "LastDmqMqcHead": {
          "required": [],
          "optional": [],
          "description": "Storage item LastDmqMqcHead",
          "returnType": "Hash"
        },
        "LastHrmpMqcHeads": {
          "required": [],
          "optional": [],
          "description": "Storage item LastHrmpMqcHeads",
          "returnType": "unknown"
        },
        "ProcessedDownwardMessages": {
          "required": [],
          "optional": [],
          "description": "Storage item ProcessedDownwardMessages",
          "returnType": "number"
        },
        "LastProcessedDownwardMessage": {
          "required": [],
          "optional": [],
          "description": "Storage item LastProcessedDownwardMessage",
          "returnType": "unknown"
        },
        "HrmpWatermark": {
          "required": [],
          "optional": [],
          "description": "Storage item HrmpWatermark",
          "returnType": "number"
        },
        "LastProcessedHrmpMessage": {
          "required": [],
          "optional": [],
          "description": "Storage item LastProcessedHrmpMessage",
          "returnType": "unknown"
        },
        "HrmpOutboundMessages": {
          "required": [],
          "optional": [],
          "description": "Storage item HrmpOutboundMessages",
          "returnType": "unknown"
        },
        "UpwardMessages": {
          "required": [],
          "optional": [],
          "description": "Storage item UpwardMessages",
          "returnType": "unknown"
        },
        "PendingUpwardMessages": {
          "required": [],
          "optional": [],
          "description": "Storage item PendingUpwardMessages",
          "returnType": "unknown"
        },
        "UpwardDeliveryFeeFactor": {
          "required": [],
          "optional": [],
          "description": "Storage item UpwardDeliveryFeeFactor",
          "returnType": "bigint"
        },
        "AnnouncedHrmpMessagesPerCandidate": {
          "required": [],
          "optional": [],
          "description": "Storage item AnnouncedHrmpMessagesPerCandidate",
          "returnType": "number"
        },
        "ReservedXcmpWeightOverride": {
          "required": [],
          "optional": [],
          "description": "Storage item ReservedXcmpWeightOverride",
          "returnType": "unknown"
        },
        "ReservedDmpWeightOverride": {
          "required": [],
          "optional": [],
          "description": "Storage item ReservedDmpWeightOverride",
          "returnType": "unknown"
        },
        "CustomValidationHeadData": {
          "required": [],
          "optional": [],
          "description": "Storage item CustomValidationHeadData",
          "returnType": "Uint8Array"
        }
      },
      "Timestamp": {
        "Now": {
          "required": [],
          "optional": [],
          "description": "Storage item Now",
          "returnType": "bigint"
        },
        "DidUpdate": {
          "required": [],
          "optional": [],
          "description": "Storage item DidUpdate",
          "returnType": "boolean"
        }
      },
      "ParachainInfo": {
        "ParachainId": {
          "required": [],
          "optional": [],
          "description": "Storage item ParachainId",
          "returnType": "number"
        }
      },
      "MultiBlockMigrations": {
        "Cursor": {
          "required": [],
          "optional": [],
          "description": "Storage item Cursor",
          "returnType": "unknown"
        },
        "Historic": {
          "required": [
            "bytes"
          ],
          "optional": [],
          "description": "Storage item Historic",
          "returnType": "null"
        }
      },
      "Balances": {
        "TotalIssuance": {
          "required": [],
          "optional": [],
          "description": "Storage item TotalIssuance",
          "returnType": "bigint"
        },
        "InactiveIssuance": {
          "required": [],
          "optional": [],
          "description": "Storage item InactiveIssuance",
          "returnType": "bigint"
        },
        "Account": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Account",
          "returnType": "unknown"
        },
        "Locks": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Locks",
          "returnType": "unknown"
        },
        "Reserves": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Reserves",
          "returnType": "unknown"
        },
        "Holds": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Holds",
          "returnType": "unknown"
        },
        "Freezes": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Freezes",
          "returnType": "unknown"
        }
      },
      "TransactionPayment": {
        "NextFeeMultiplier": {
          "required": [],
          "optional": [],
          "description": "Storage item NextFeeMultiplier",
          "returnType": "bigint"
        },
        "StorageVersion": {
          "required": [],
          "optional": [],
          "description": "Storage item StorageVersion",
          "returnType": "TransactionPaymentReleases"
        }
      },
      "Authorship": {
        "Author": {
          "required": [],
          "optional": [],
          "description": "Storage item Author",
          "returnType": "string"
        }
      },
      "CollatorSelection": {
        "Invulnerables": {
          "required": [],
          "optional": [],
          "description": "Storage item Invulnerables",
          "returnType": "unknown"
        },
        "CandidateList": {
          "required": [],
          "optional": [],
          "description": "Storage item CandidateList",
          "returnType": "unknown"
        },
        "LastAuthoredBlock": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item LastAuthoredBlock",
          "returnType": "number"
        },
        "DesiredCandidates": {
          "required": [],
          "optional": [],
          "description": "Storage item DesiredCandidates",
          "returnType": "number"
        },
        "CandidacyBond": {
          "required": [],
          "optional": [],
          "description": "Storage item CandidacyBond",
          "returnType": "bigint"
        }
      },
      "Session": {
        "Validators": {
          "required": [],
          "optional": [],
          "description": "Storage item Validators",
          "returnType": "unknown"
        },
        "CurrentIndex": {
          "required": [],
          "optional": [],
          "description": "Storage item CurrentIndex",
          "returnType": "number"
        },
        "QueuedChanged": {
          "required": [],
          "optional": [],
          "description": "Storage item QueuedChanged",
          "returnType": "boolean"
        },
        "QueuedKeys": {
          "required": [],
          "optional": [],
          "description": "Storage item QueuedKeys",
          "returnType": "unknown"
        },
        "DisabledValidators": {
          "required": [],
          "optional": [],
          "description": "Storage item DisabledValidators",
          "returnType": "unknown"
        },
        "NextKeys": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item NextKeys",
          "returnType": "Hash"
        },
        "KeyOwner": {
          "required": [
            "Anonymize_I82jm9g7pufuel_"
          ],
          "optional": [],
          "description": "Storage item KeyOwner",
          "returnType": "string"
        }
      },
      "Aura": {
        "Authorities": {
          "required": [],
          "optional": [],
          "description": "Storage item Authorities",
          "returnType": "unknown"
        },
        "CurrentSlot": {
          "required": [],
          "optional": [],
          "description": "Storage item CurrentSlot",
          "returnType": "bigint"
        }
      },
      "AuraExt": {
        "Authorities": {
          "required": [],
          "optional": [],
          "description": "Storage item Authorities",
          "returnType": "unknown"
        },
        "RelaySlotInfo": {
          "required": [],
          "optional": [],
          "description": "Storage item RelaySlotInfo",
          "returnType": "unknown"
        }
      },
      "XcmpQueue": {
        "InboundXcmpSuspended": {
          "required": [],
          "optional": [],
          "description": "Storage item InboundXcmpSuspended",
          "returnType": "unknown"
        },
        "OutboundXcmpStatus": {
          "required": [],
          "optional": [],
          "description": "Storage item OutboundXcmpStatus",
          "returnType": "unknown"
        },
        "OutboundXcmpMessages": {
          "required": [],
          "optional": [],
          "description": "Storage item OutboundXcmpMessages",
          "returnType": "Uint8Array"
        },
        "SignalMessages": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item SignalMessages",
          "returnType": "Uint8Array"
        },
        "QueueConfig": {
          "required": [],
          "optional": [],
          "description": "Storage item QueueConfig",
          "returnType": "unknown"
        },
        "QueueSuspended": {
          "required": [],
          "optional": [],
          "description": "Storage item QueueSuspended",
          "returnType": "boolean"
        },
        "DeliveryFeeFactor": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item DeliveryFeeFactor",
          "returnType": "bigint"
        }
      },
      "PolkadotXcm": {
        "QueryCounter": {
          "required": [],
          "optional": [],
          "description": "Storage item QueryCounter",
          "returnType": "bigint"
        },
        "Queries": {
          "required": [
            "u64"
          ],
          "optional": [],
          "description": "Storage item Queries",
          "returnType": "unknown"
        },
        "AssetTraps": {
          "required": [
            "Hash"
          ],
          "optional": [],
          "description": "Storage item AssetTraps",
          "returnType": "number"
        },
        "SafeXcmVersion": {
          "required": [],
          "optional": [],
          "description": "Storage item SafeXcmVersion",
          "returnType": "number"
        },
        "SupportedVersion": {
          "required": [],
          "optional": [],
          "description": "Storage item SupportedVersion",
          "returnType": "number"
        },
        "VersionNotifiers": {
          "required": [],
          "optional": [],
          "description": "Storage item VersionNotifiers",
          "returnType": "bigint"
        },
        "VersionNotifyTargets": {
          "required": [],
          "optional": [],
          "description": "Storage item VersionNotifyTargets",
          "returnType": "unknown"
        },
        "VersionDiscoveryQueue": {
          "required": [],
          "optional": [],
          "description": "Storage item VersionDiscoveryQueue",
          "returnType": "unknown"
        },
        "CurrentMigration": {
          "required": [],
          "optional": [],
          "description": "Storage item CurrentMigration",
          "returnType": "XcmPalletVersionMigrationStage"
        },
        "RemoteLockedFungibles": {
          "required": [],
          "optional": [],
          "description": "Storage item RemoteLockedFungibles",
          "returnType": "unknown"
        },
        "LockedFungibles": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item LockedFungibles",
          "returnType": "unknown"
        },
        "XcmExecutionSuspended": {
          "required": [],
          "optional": [],
          "description": "Storage item XcmExecutionSuspended",
          "returnType": "boolean"
        },
        "ShouldRecordXcm": {
          "required": [],
          "optional": [],
          "description": "Storage item ShouldRecordXcm",
          "returnType": "boolean"
        },
        "RecordedXcm": {
          "required": [],
          "optional": [],
          "description": "Storage item RecordedXcm",
          "returnType": "unknown"
        },
        "AuthorizedAliases": {
          "required": [
            "XcmVersionedLocation"
          ],
          "optional": [],
          "description": "Storage item AuthorizedAliases",
          "returnType": "unknown"
        }
      },
      "ToRococoXcmRouter": {
        "Bridge": {
          "required": [],
          "optional": [],
          "description": "Storage item Bridge",
          "returnType": "unknown"
        }
      },
      "MessageQueue": {
        "BookStateFor": {
          "required": [
            "Anonymize_Iejeo53sea6n4q_"
          ],
          "optional": [],
          "description": "Storage item BookStateFor",
          "returnType": "unknown"
        },
        "ServiceHead": {
          "required": [],
          "optional": [],
          "description": "Storage item ServiceHead",
          "returnType": "unknown"
        },
        "Pages": {
          "required": [],
          "optional": [],
          "description": "Storage item Pages",
          "returnType": "unknown"
        }
      },
      "SnowbridgeSystemFrontend": {
        "ExportOperatingMode": {
          "required": [],
          "optional": [],
          "description": "Storage item ExportOperatingMode",
          "returnType": "unknown"
        }
      },
      "Multisig": {
        "Multisigs": {
          "required": [],
          "optional": [],
          "description": "Storage item Multisigs",
          "returnType": "unknown"
        }
      },
      "Proxy": {
        "Proxies": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Proxies",
          "returnType": "unknown"
        },
        "Announcements": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Announcements",
          "returnType": "unknown"
        }
      },
      "Assets": {
        "Asset": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item Asset",
          "returnType": "unknown"
        },
        "Account": {
          "required": [
            "AssetId",
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Account",
          "returnType": "unknown"
        },
        "Approvals": {
          "required": [
            "AssetId",
            "AccountId",
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Approvals",
          "returnType": "unknown"
        },
        "Metadata": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item Metadata",
          "returnType": "unknown"
        },
        "NextAssetId": {
          "required": [],
          "optional": [],
          "description": "Storage item NextAssetId",
          "returnType": "number"
        }
      },
      "Uniques": {
        "Class": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item Class",
          "returnType": "unknown"
        },
        "OwnershipAcceptance": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item OwnershipAcceptance",
          "returnType": "number"
        },
        "Account": {
          "required": [],
          "optional": [],
          "description": "Storage item Account",
          "returnType": "null"
        },
        "ClassAccount": {
          "required": [],
          "optional": [],
          "description": "Storage item ClassAccount",
          "returnType": "null"
        },
        "Asset": {
          "required": [],
          "optional": [],
          "description": "Storage item Asset",
          "returnType": "unknown"
        },
        "ClassMetadataOf": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item ClassMetadataOf",
          "returnType": "unknown"
        },
        "InstanceMetadataOf": {
          "required": [],
          "optional": [],
          "description": "Storage item InstanceMetadataOf",
          "returnType": "unknown"
        },
        "Attribute": {
          "required": [],
          "optional": [],
          "description": "Storage item Attribute",
          "returnType": "unknown"
        },
        "ItemPriceOf": {
          "required": [],
          "optional": [],
          "description": "Storage item ItemPriceOf",
          "returnType": "unknown"
        },
        "CollectionMaxSupply": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item CollectionMaxSupply",
          "returnType": "number"
        }
      },
      "Nfts": {
        "Collection": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item Collection",
          "returnType": "unknown"
        },
        "OwnershipAcceptance": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item OwnershipAcceptance",
          "returnType": "number"
        },
        "Account": {
          "required": [],
          "optional": [],
          "description": "Storage item Account",
          "returnType": "null"
        },
        "CollectionAccount": {
          "required": [],
          "optional": [],
          "description": "Storage item CollectionAccount",
          "returnType": "null"
        },
        "CollectionRoleOf": {
          "required": [],
          "optional": [],
          "description": "Storage item CollectionRoleOf",
          "returnType": "number"
        },
        "Item": {
          "required": [],
          "optional": [],
          "description": "Storage item Item",
          "returnType": "unknown"
        },
        "CollectionMetadataOf": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item CollectionMetadataOf",
          "returnType": "unknown"
        },
        "ItemMetadataOf": {
          "required": [],
          "optional": [],
          "description": "Storage item ItemMetadataOf",
          "returnType": "unknown"
        },
        "Attribute": {
          "required": [],
          "optional": [],
          "description": "Storage item Attribute",
          "returnType": "unknown"
        },
        "ItemPriceOf": {
          "required": [],
          "optional": [],
          "description": "Storage item ItemPriceOf",
          "returnType": "unknown"
        },
        "ItemAttributesApprovalsOf": {
          "required": [],
          "optional": [],
          "description": "Storage item ItemAttributesApprovalsOf",
          "returnType": "unknown"
        },
        "NextCollectionId": {
          "required": [],
          "optional": [],
          "description": "Storage item NextCollectionId",
          "returnType": "number"
        },
        "PendingSwapOf": {
          "required": [],
          "optional": [],
          "description": "Storage item PendingSwapOf",
          "returnType": "unknown"
        },
        "CollectionConfigOf": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item CollectionConfigOf",
          "returnType": "unknown"
        },
        "ItemConfigOf": {
          "required": [],
          "optional": [],
          "description": "Storage item ItemConfigOf",
          "returnType": "bigint"
        }
      },
      "ForeignAssets": {
        "Asset": {
          "required": [
            "Anonymize_If9iqq7i64mur8_"
          ],
          "optional": [],
          "description": "Storage item Asset",
          "returnType": "unknown"
        },
        "Account": {
          "required": [
            "AssetId",
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Account",
          "returnType": "unknown"
        },
        "Approvals": {
          "required": [
            "AssetId",
            "AccountId",
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Approvals",
          "returnType": "unknown"
        },
        "Metadata": {
          "required": [
            "Anonymize_If9iqq7i64mur8_"
          ],
          "optional": [],
          "description": "Storage item Metadata",
          "returnType": "unknown"
        },
        "NextAssetId": {
          "required": [],
          "optional": [],
          "description": "Storage item NextAssetId",
          "returnType": "unknown"
        }
      },
      "NftFractionalization": {
        "NftToAsset": {
          "required": [
            "Anonymize_I9jd27rnpm8ttv_"
          ],
          "optional": [],
          "description": "Storage item NftToAsset",
          "returnType": "unknown"
        }
      },
      "PoolAssets": {
        "Asset": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item Asset",
          "returnType": "unknown"
        },
        "Account": {
          "required": [
            "AssetId",
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Account",
          "returnType": "unknown"
        },
        "Approvals": {
          "required": [
            "AssetId",
            "AccountId",
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Approvals",
          "returnType": "unknown"
        },
        "Metadata": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item Metadata",
          "returnType": "unknown"
        },
        "NextAssetId": {
          "required": [],
          "optional": [],
          "description": "Storage item NextAssetId",
          "returnType": "number"
        }
      },
      "AssetConversion": {
        "Pools": {
          "required": [
            "Anonymize_If21n82i0516em_"
          ],
          "optional": [],
          "description": "Storage item Pools",
          "returnType": "number"
        },
        "NextPoolAssetId": {
          "required": [],
          "optional": [],
          "description": "Storage item NextPoolAssetId",
          "returnType": "number"
        }
      },
      "AssetsFreezer": {
        "Freezes": {
          "required": [],
          "optional": [],
          "description": "Storage item Freezes",
          "returnType": "unknown"
        },
        "FrozenBalances": {
          "required": [],
          "optional": [],
          "description": "Storage item FrozenBalances",
          "returnType": "bigint"
        }
      },
      "ForeignAssetsFreezer": {
        "Freezes": {
          "required": [],
          "optional": [],
          "description": "Storage item Freezes",
          "returnType": "unknown"
        },
        "FrozenBalances": {
          "required": [],
          "optional": [],
          "description": "Storage item FrozenBalances",
          "returnType": "bigint"
        }
      },
      "PoolAssetsFreezer": {
        "Freezes": {
          "required": [],
          "optional": [],
          "description": "Storage item Freezes",
          "returnType": "unknown"
        },
        "FrozenBalances": {
          "required": [],
          "optional": [],
          "description": "Storage item FrozenBalances",
          "returnType": "bigint"
        }
      },
      "Revive": {
        "PristineCode": {
          "required": [
            "Hash"
          ],
          "optional": [],
          "description": "Storage item PristineCode",
          "returnType": "Uint8Array"
        },
        "CodeInfoOf": {
          "required": [
            "Hash"
          ],
          "optional": [],
          "description": "Storage item CodeInfoOf",
          "returnType": "unknown"
        },
        "AccountInfoOf": {
          "required": [
            "bytes"
          ],
          "optional": [],
          "description": "Storage item AccountInfoOf",
          "returnType": "unknown"
        },
        "ImmutableDataOf": {
          "required": [
            "bytes"
          ],
          "optional": [],
          "description": "Storage item ImmutableDataOf",
          "returnType": "Uint8Array"
        },
        "DeletionQueue": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item DeletionQueue",
          "returnType": "Uint8Array"
        },
        "DeletionQueueCounter": {
          "required": [],
          "optional": [],
          "description": "Storage item DeletionQueueCounter",
          "returnType": "unknown"
        },
        "OriginalAccount": {
          "required": [
            "bytes"
          ],
          "optional": [],
          "description": "Storage item OriginalAccount",
          "returnType": "string"
        }
      },
      "AssetRewards": {
        "PoolStakers": {
          "required": [],
          "optional": [],
          "description": "Storage item PoolStakers",
          "returnType": "unknown"
        },
        "Pools": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item Pools",
          "returnType": "unknown"
        },
        "PoolCost": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item PoolCost",
          "returnType": "unknown"
        },
        "NextPoolId": {
          "required": [],
          "optional": [],
          "description": "Storage item NextPoolId",
          "returnType": "number"
        }
      },
      "StateTrieMigration": {
        "MigrationProcess": {
          "required": [],
          "optional": [],
          "description": "Storage item MigrationProcess",
          "returnType": "unknown"
        },
        "AutoLimits": {
          "required": [],
          "optional": [],
          "description": "Storage item AutoLimits",
          "returnType": "unknown"
        },
        "SignedMigrationMaxLimits": {
          "required": [],
          "optional": [],
          "description": "Storage item SignedMigrationMaxLimits",
          "returnType": "unknown"
        }
      },
      "Sudo": {
        "Key": {
          "required": [],
          "optional": [],
          "description": "Storage item Key",
          "returnType": "string"
        }
      }
    }
  },
  "polkadot": {
    "pallets": {
      "System": {
        "Account": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Account",
          "returnType": "unknown"
        },
        "ExtrinsicCount": {
          "required": [],
          "optional": [],
          "description": "Storage item ExtrinsicCount",
          "returnType": "number"
        },
        "InherentsApplied": {
          "required": [],
          "optional": [],
          "description": "Storage item InherentsApplied",
          "returnType": "boolean"
        },
        "BlockWeight": {
          "required": [],
          "optional": [],
          "description": "Storage item BlockWeight",
          "returnType": "unknown"
        },
        "AllExtrinsicsLen": {
          "required": [],
          "optional": [],
          "description": "Storage item AllExtrinsicsLen",
          "returnType": "number"
        },
        "BlockHash": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item BlockHash",
          "returnType": "Hash"
        },
        "ExtrinsicData": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item ExtrinsicData",
          "returnType": "Uint8Array"
        },
        "Number": {
          "required": [],
          "optional": [],
          "description": "Storage item Number",
          "returnType": "number"
        },
        "ParentHash": {
          "required": [],
          "optional": [],
          "description": "Storage item ParentHash",
          "returnType": "Hash"
        },
        "Digest": {
          "required": [],
          "optional": [],
          "description": "Storage item Digest",
          "returnType": "unknown"
        },
        "Events": {
          "required": [],
          "optional": [],
          "description": "Storage item Events",
          "returnType": "unknown"
        },
        "EventCount": {
          "required": [],
          "optional": [],
          "description": "Storage item EventCount",
          "returnType": "number"
        },
        "EventTopics": {
          "required": [
            "Hash"
          ],
          "optional": [],
          "description": "Storage item EventTopics",
          "returnType": "unknown"
        },
        "LastRuntimeUpgrade": {
          "required": [],
          "optional": [],
          "description": "Storage item LastRuntimeUpgrade",
          "returnType": "unknown"
        },
        "UpgradedToU32RefCount": {
          "required": [],
          "optional": [],
          "description": "Storage item UpgradedToU32RefCount",
          "returnType": "boolean"
        },
        "UpgradedToTripleRefCount": {
          "required": [],
          "optional": [],
          "description": "Storage item UpgradedToTripleRefCount",
          "returnType": "boolean"
        },
        "ExecutionPhase": {
          "required": [],
          "optional": [],
          "description": "Storage item ExecutionPhase",
          "returnType": "Phase"
        },
        "AuthorizedUpgrade": {
          "required": [],
          "optional": [],
          "description": "Storage item AuthorizedUpgrade",
          "returnType": "unknown"
        },
        "ExtrinsicWeightReclaimed": {
          "required": [],
          "optional": [],
          "description": "Storage item ExtrinsicWeightReclaimed",
          "returnType": "unknown"
        }
      },
      "Scheduler": {
        "IncompleteSince": {
          "required": [],
          "optional": [],
          "description": "Storage item IncompleteSince",
          "returnType": "number"
        },
        "Agenda": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item Agenda",
          "returnType": "unknown"
        },
        "Retries": {
          "required": [
            "Anonymize_I9jd27rnpm8ttv_"
          ],
          "optional": [],
          "description": "Storage item Retries",
          "returnType": "unknown"
        },
        "Lookup": {
          "required": [
            "Hash"
          ],
          "optional": [],
          "description": "Storage item Lookup",
          "returnType": "unknown"
        }
      },
      "Preimage": {
        "StatusFor": {
          "required": [
            "Hash"
          ],
          "optional": [],
          "description": "Storage item StatusFor",
          "returnType": "PreimageOldRequestStatus"
        },
        "RequestStatusFor": {
          "required": [
            "Hash"
          ],
          "optional": [],
          "description": "Storage item RequestStatusFor",
          "returnType": "PreimageRequestStatus"
        },
        "PreimageFor": {
          "required": [
            "Anonymize_I4pact7n2e9a0i_"
          ],
          "optional": [],
          "description": "Storage item PreimageFor",
          "returnType": "Uint8Array"
        }
      },
      "Babe": {
        "EpochIndex": {
          "required": [],
          "optional": [],
          "description": "Storage item EpochIndex",
          "returnType": "bigint"
        },
        "Authorities": {
          "required": [],
          "optional": [],
          "description": "Storage item Authorities",
          "returnType": "unknown"
        },
        "GenesisSlot": {
          "required": [],
          "optional": [],
          "description": "Storage item GenesisSlot",
          "returnType": "bigint"
        },
        "CurrentSlot": {
          "required": [],
          "optional": [],
          "description": "Storage item CurrentSlot",
          "returnType": "bigint"
        },
        "Randomness": {
          "required": [],
          "optional": [],
          "description": "Storage item Randomness",
          "returnType": "Hash"
        },
        "PendingEpochConfigChange": {
          "required": [],
          "optional": [],
          "description": "Storage item PendingEpochConfigChange",
          "returnType": "BabeDigestsNextConfigDescriptor"
        },
        "NextRandomness": {
          "required": [],
          "optional": [],
          "description": "Storage item NextRandomness",
          "returnType": "Hash"
        },
        "NextAuthorities": {
          "required": [],
          "optional": [],
          "description": "Storage item NextAuthorities",
          "returnType": "unknown"
        },
        "SegmentIndex": {
          "required": [],
          "optional": [],
          "description": "Storage item SegmentIndex",
          "returnType": "number"
        },
        "UnderConstruction": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item UnderConstruction",
          "returnType": "unknown"
        },
        "Initialized": {
          "required": [],
          "optional": [],
          "description": "Storage item Initialized",
          "returnType": "unknown"
        },
        "AuthorVrfRandomness": {
          "required": [],
          "optional": [],
          "description": "Storage item AuthorVrfRandomness",
          "returnType": "unknown"
        },
        "EpochStart": {
          "required": [],
          "optional": [],
          "description": "Storage item EpochStart",
          "returnType": "unknown"
        },
        "Lateness": {
          "required": [],
          "optional": [],
          "description": "Storage item Lateness",
          "returnType": "number"
        },
        "EpochConfig": {
          "required": [],
          "optional": [],
          "description": "Storage item EpochConfig",
          "returnType": "unknown"
        },
        "NextEpochConfig": {
          "required": [],
          "optional": [],
          "description": "Storage item NextEpochConfig",
          "returnType": "unknown"
        },
        "SkippedEpochs": {
          "required": [],
          "optional": [],
          "description": "Storage item SkippedEpochs",
          "returnType": "unknown"
        }
      },
      "Timestamp": {
        "Now": {
          "required": [],
          "optional": [],
          "description": "Storage item Now",
          "returnType": "bigint"
        },
        "DidUpdate": {
          "required": [],
          "optional": [],
          "description": "Storage item DidUpdate",
          "returnType": "boolean"
        }
      },
      "Indices": {
        "Accounts": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item Accounts",
          "returnType": "unknown"
        }
      },
      "Balances": {
        "TotalIssuance": {
          "required": [],
          "optional": [],
          "description": "Storage item TotalIssuance",
          "returnType": "bigint"
        },
        "InactiveIssuance": {
          "required": [],
          "optional": [],
          "description": "Storage item InactiveIssuance",
          "returnType": "bigint"
        },
        "Account": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Account",
          "returnType": "unknown"
        },
        "Locks": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Locks",
          "returnType": "unknown"
        },
        "Reserves": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Reserves",
          "returnType": "unknown"
        },
        "Holds": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Holds",
          "returnType": "unknown"
        },
        "Freezes": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Freezes",
          "returnType": "unknown"
        }
      },
      "TransactionPayment": {
        "NextFeeMultiplier": {
          "required": [],
          "optional": [],
          "description": "Storage item NextFeeMultiplier",
          "returnType": "bigint"
        },
        "StorageVersion": {
          "required": [],
          "optional": [],
          "description": "Storage item StorageVersion",
          "returnType": "TransactionPaymentReleases"
        }
      },
      "Authorship": {
        "Author": {
          "required": [],
          "optional": [],
          "description": "Storage item Author",
          "returnType": "string"
        }
      },
      "Staking": {
        "ValidatorCount": {
          "required": [],
          "optional": [],
          "description": "Storage item ValidatorCount",
          "returnType": "number"
        },
        "MinimumValidatorCount": {
          "required": [],
          "optional": [],
          "description": "Storage item MinimumValidatorCount",
          "returnType": "number"
        },
        "Invulnerables": {
          "required": [],
          "optional": [],
          "description": "Storage item Invulnerables",
          "returnType": "unknown"
        },
        "Bonded": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Bonded",
          "returnType": "string"
        },
        "MinNominatorBond": {
          "required": [],
          "optional": [],
          "description": "Storage item MinNominatorBond",
          "returnType": "bigint"
        },
        "MinValidatorBond": {
          "required": [],
          "optional": [],
          "description": "Storage item MinValidatorBond",
          "returnType": "bigint"
        },
        "MinimumActiveStake": {
          "required": [],
          "optional": [],
          "description": "Storage item MinimumActiveStake",
          "returnType": "bigint"
        },
        "MinCommission": {
          "required": [],
          "optional": [],
          "description": "Storage item MinCommission",
          "returnType": "number"
        },
        "Ledger": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Ledger",
          "returnType": "unknown"
        },
        "Payee": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Payee",
          "returnType": "StakingRewardDestination"
        },
        "Validators": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Validators",
          "returnType": "unknown"
        },
        "CounterForValidators": {
          "required": [],
          "optional": [],
          "description": "Storage item CounterForValidators",
          "returnType": "number"
        },
        "MaxValidatorsCount": {
          "required": [],
          "optional": [],
          "description": "Storage item MaxValidatorsCount",
          "returnType": "number"
        },
        "Nominators": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Nominators",
          "returnType": "unknown"
        },
        "CounterForNominators": {
          "required": [],
          "optional": [],
          "description": "Storage item CounterForNominators",
          "returnType": "number"
        },
        "VirtualStakers": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item VirtualStakers",
          "returnType": "null"
        },
        "CounterForVirtualStakers": {
          "required": [],
          "optional": [],
          "description": "Storage item CounterForVirtualStakers",
          "returnType": "number"
        },
        "MaxNominatorsCount": {
          "required": [],
          "optional": [],
          "description": "Storage item MaxNominatorsCount",
          "returnType": "number"
        },
        "CurrentEra": {
          "required": [],
          "optional": [],
          "description": "Storage item CurrentEra",
          "returnType": "number"
        },
        "ActiveEra": {
          "required": [],
          "optional": [],
          "description": "Storage item ActiveEra",
          "returnType": "unknown"
        },
        "ErasStartSessionIndex": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item ErasStartSessionIndex",
          "returnType": "number"
        },
        "ErasStakers": {
          "required": [],
          "optional": [],
          "description": "Storage item ErasStakers",
          "returnType": "unknown"
        },
        "ErasStakersOverview": {
          "required": [],
          "optional": [],
          "description": "Storage item ErasStakersOverview",
          "returnType": "unknown"
        },
        "ErasStakersClipped": {
          "required": [],
          "optional": [],
          "description": "Storage item ErasStakersClipped",
          "returnType": "unknown"
        },
        "ErasStakersPaged": {
          "required": [],
          "optional": [],
          "description": "Storage item ErasStakersPaged",
          "returnType": "unknown"
        },
        "ClaimedRewards": {
          "required": [],
          "optional": [],
          "description": "Storage item ClaimedRewards",
          "returnType": "unknown"
        },
        "ErasValidatorPrefs": {
          "required": [],
          "optional": [],
          "description": "Storage item ErasValidatorPrefs",
          "returnType": "unknown"
        },
        "ErasValidatorReward": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item ErasValidatorReward",
          "returnType": "bigint"
        },
        "ErasRewardPoints": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item ErasRewardPoints",
          "returnType": "unknown"
        },
        "ErasTotalStake": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item ErasTotalStake",
          "returnType": "bigint"
        },
        "ForceEra": {
          "required": [],
          "optional": [],
          "description": "Storage item ForceEra",
          "returnType": "StakingForcing"
        },
        "MaxStakedRewards": {
          "required": [],
          "optional": [],
          "description": "Storage item MaxStakedRewards",
          "returnType": "number"
        },
        "SlashRewardFraction": {
          "required": [],
          "optional": [],
          "description": "Storage item SlashRewardFraction",
          "returnType": "number"
        },
        "CanceledSlashPayout": {
          "required": [],
          "optional": [],
          "description": "Storage item CanceledSlashPayout",
          "returnType": "bigint"
        },
        "UnappliedSlashes": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item UnappliedSlashes",
          "returnType": "unknown"
        },
        "BondedEras": {
          "required": [],
          "optional": [],
          "description": "Storage item BondedEras",
          "returnType": "unknown"
        },
        "ValidatorSlashInEra": {
          "required": [],
          "optional": [],
          "description": "Storage item ValidatorSlashInEra",
          "returnType": "unknown"
        },
        "NominatorSlashInEra": {
          "required": [],
          "optional": [],
          "description": "Storage item NominatorSlashInEra",
          "returnType": "bigint"
        },
        "SlashingSpans": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item SlashingSpans",
          "returnType": "unknown"
        },
        "SpanSlash": {
          "required": [
            "Anonymize_I6ouflveob4eli_"
          ],
          "optional": [],
          "description": "Storage item SpanSlash",
          "returnType": "unknown"
        },
        "CurrentPlannedSession": {
          "required": [],
          "optional": [],
          "description": "Storage item CurrentPlannedSession",
          "returnType": "number"
        },
        "ChillThreshold": {
          "required": [],
          "optional": [],
          "description": "Storage item ChillThreshold",
          "returnType": "number"
        }
      },
      "Offences": {
        "Reports": {
          "required": [
            "Hash"
          ],
          "optional": [],
          "description": "Storage item Reports",
          "returnType": "unknown"
        },
        "ConcurrentReportsIndex": {
          "required": [],
          "optional": [],
          "description": "Storage item ConcurrentReportsIndex",
          "returnType": "unknown"
        }
      },
      "Historical": {
        "HistoricalSessions": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item HistoricalSessions",
          "returnType": "unknown"
        },
        "StoredRange": {
          "required": [],
          "optional": [],
          "description": "Storage item StoredRange",
          "returnType": "unknown"
        }
      },
      "Session": {
        "Validators": {
          "required": [],
          "optional": [],
          "description": "Storage item Validators",
          "returnType": "unknown"
        },
        "CurrentIndex": {
          "required": [],
          "optional": [],
          "description": "Storage item CurrentIndex",
          "returnType": "number"
        },
        "QueuedChanged": {
          "required": [],
          "optional": [],
          "description": "Storage item QueuedChanged",
          "returnType": "boolean"
        },
        "QueuedKeys": {
          "required": [],
          "optional": [],
          "description": "Storage item QueuedKeys",
          "returnType": "unknown"
        },
        "DisabledValidators": {
          "required": [],
          "optional": [],
          "description": "Storage item DisabledValidators",
          "returnType": "unknown"
        },
        "NextKeys": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item NextKeys",
          "returnType": "unknown"
        },
        "KeyOwner": {
          "required": [
            "Anonymize_I82jm9g7pufuel_"
          ],
          "optional": [],
          "description": "Storage item KeyOwner",
          "returnType": "string"
        }
      },
      "Grandpa": {
        "State": {
          "required": [],
          "optional": [],
          "description": "Storage item State",
          "returnType": "GrandpaStoredState"
        },
        "PendingChange": {
          "required": [],
          "optional": [],
          "description": "Storage item PendingChange",
          "returnType": "unknown"
        },
        "NextForced": {
          "required": [],
          "optional": [],
          "description": "Storage item NextForced",
          "returnType": "number"
        },
        "Stalled": {
          "required": [],
          "optional": [],
          "description": "Storage item Stalled",
          "returnType": "unknown"
        },
        "CurrentSetId": {
          "required": [],
          "optional": [],
          "description": "Storage item CurrentSetId",
          "returnType": "bigint"
        },
        "SetIdSession": {
          "required": [
            "u64"
          ],
          "optional": [],
          "description": "Storage item SetIdSession",
          "returnType": "number"
        },
        "Authorities": {
          "required": [],
          "optional": [],
          "description": "Storage item Authorities",
          "returnType": "unknown"
        }
      },
      "AuthorityDiscovery": {
        "Keys": {
          "required": [],
          "optional": [],
          "description": "Storage item Keys",
          "returnType": "unknown"
        },
        "NextKeys": {
          "required": [],
          "optional": [],
          "description": "Storage item NextKeys",
          "returnType": "unknown"
        }
      },
      "Treasury": {
        "ProposalCount": {
          "required": [],
          "optional": [],
          "description": "Storage item ProposalCount",
          "returnType": "number"
        },
        "Proposals": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item Proposals",
          "returnType": "unknown"
        },
        "Deactivated": {
          "required": [],
          "optional": [],
          "description": "Storage item Deactivated",
          "returnType": "bigint"
        },
        "Approvals": {
          "required": [],
          "optional": [],
          "description": "Storage item Approvals",
          "returnType": "unknown"
        },
        "SpendCount": {
          "required": [],
          "optional": [],
          "description": "Storage item SpendCount",
          "returnType": "number"
        },
        "Spends": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item Spends",
          "returnType": "unknown"
        },
        "LastSpendPeriod": {
          "required": [],
          "optional": [],
          "description": "Storage item LastSpendPeriod",
          "returnType": "number"
        }
      },
      "ConvictionVoting": {
        "VotingFor": {
          "required": [],
          "optional": [],
          "description": "Storage item VotingFor",
          "returnType": "ConvictionVotingVoteVoting"
        },
        "ClassLocksFor": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item ClassLocksFor",
          "returnType": "unknown"
        }
      },
      "Referenda": {
        "ReferendumCount": {
          "required": [],
          "optional": [],
          "description": "Storage item ReferendumCount",
          "returnType": "number"
        },
        "ReferendumInfoFor": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item ReferendumInfoFor",
          "returnType": "unknown"
        },
        "TrackQueue": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item TrackQueue",
          "returnType": "unknown"
        },
        "DecidingCount": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item DecidingCount",
          "returnType": "number"
        },
        "MetadataOf": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item MetadataOf",
          "returnType": "Hash"
        }
      },
      "Whitelist": {
        "WhitelistedCall": {
          "required": [
            "Hash"
          ],
          "optional": [],
          "description": "Storage item WhitelistedCall",
          "returnType": "null"
        }
      },
      "Claims": {
        "Claims": {
          "required": [
            "bytes"
          ],
          "optional": [],
          "description": "Storage item Claims",
          "returnType": "bigint"
        },
        "Total": {
          "required": [],
          "optional": [],
          "description": "Storage item Total",
          "returnType": "bigint"
        },
        "Vesting": {
          "required": [
            "bytes"
          ],
          "optional": [],
          "description": "Storage item Vesting",
          "returnType": "unknown"
        },
        "Signing": {
          "required": [
            "bytes"
          ],
          "optional": [],
          "description": "Storage item Signing",
          "returnType": "ClaimsStatementKind"
        },
        "Preclaims": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Preclaims",
          "returnType": "Hash"
        }
      },
      "Vesting": {
        "Vesting": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Vesting",
          "returnType": "unknown"
        },
        "StorageVersion": {
          "required": [],
          "optional": [],
          "description": "Storage item StorageVersion",
          "returnType": "Version"
        }
      },
      "Proxy": {
        "Proxies": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Proxies",
          "returnType": "unknown"
        },
        "Announcements": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Announcements",
          "returnType": "unknown"
        }
      },
      "Multisig": {
        "Multisigs": {
          "required": [],
          "optional": [],
          "description": "Storage item Multisigs",
          "returnType": "unknown"
        }
      },
      "Bounties": {
        "BountyCount": {
          "required": [],
          "optional": [],
          "description": "Storage item BountyCount",
          "returnType": "number"
        },
        "Bounties": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item Bounties",
          "returnType": "unknown"
        },
        "BountyDescriptions": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item BountyDescriptions",
          "returnType": "Uint8Array"
        },
        "BountyApprovals": {
          "required": [],
          "optional": [],
          "description": "Storage item BountyApprovals",
          "returnType": "unknown"
        }
      },
      "ChildBounties": {
        "ChildBountyCount": {
          "required": [],
          "optional": [],
          "description": "Storage item ChildBountyCount",
          "returnType": "number"
        },
        "ParentChildBounties": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item ParentChildBounties",
          "returnType": "number"
        },
        "ParentTotalChildBounties": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item ParentTotalChildBounties",
          "returnType": "number"
        },
        "ChildBounties": {
          "required": [],
          "optional": [],
          "description": "Storage item ChildBounties",
          "returnType": "unknown"
        },
        "ChildBountyDescriptionsV1": {
          "required": [],
          "optional": [],
          "description": "Storage item ChildBountyDescriptionsV1",
          "returnType": "Uint8Array"
        },
        "V0ToV1ChildBountyIds": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item V0ToV1ChildBountyIds",
          "returnType": "unknown"
        },
        "ChildrenCuratorFees": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item ChildrenCuratorFees",
          "returnType": "bigint"
        }
      },
      "ElectionProviderMultiPhase": {
        "Round": {
          "required": [],
          "optional": [],
          "description": "Storage item Round",
          "returnType": "number"
        },
        "CurrentPhase": {
          "required": [],
          "optional": [],
          "description": "Storage item CurrentPhase",
          "returnType": "ElectionProviderMultiPhasePhase"
        },
        "QueuedSolution": {
          "required": [],
          "optional": [],
          "description": "Storage item QueuedSolution",
          "returnType": "unknown"
        },
        "Snapshot": {
          "required": [],
          "optional": [],
          "description": "Storage item Snapshot",
          "returnType": "unknown"
        },
        "DesiredTargets": {
          "required": [],
          "optional": [],
          "description": "Storage item DesiredTargets",
          "returnType": "number"
        },
        "SnapshotMetadata": {
          "required": [],
          "optional": [],
          "description": "Storage item SnapshotMetadata",
          "returnType": "unknown"
        },
        "SignedSubmissionNextIndex": {
          "required": [],
          "optional": [],
          "description": "Storage item SignedSubmissionNextIndex",
          "returnType": "number"
        },
        "SignedSubmissionIndices": {
          "required": [],
          "optional": [],
          "description": "Storage item SignedSubmissionIndices",
          "returnType": "unknown"
        },
        "SignedSubmissionsMap": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item SignedSubmissionsMap",
          "returnType": "unknown"
        },
        "MinimumUntrustedScore": {
          "required": [],
          "optional": [],
          "description": "Storage item MinimumUntrustedScore",
          "returnType": "unknown"
        }
      },
      "VoterList": {
        "ListNodes": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item ListNodes",
          "returnType": "unknown"
        },
        "CounterForListNodes": {
          "required": [],
          "optional": [],
          "description": "Storage item CounterForListNodes",
          "returnType": "number"
        },
        "ListBags": {
          "required": [
            "u64"
          ],
          "optional": [],
          "description": "Storage item ListBags",
          "returnType": "unknown"
        }
      },
      "NominationPools": {
        "TotalValueLocked": {
          "required": [],
          "optional": [],
          "description": "Storage item TotalValueLocked",
          "returnType": "bigint"
        },
        "MinJoinBond": {
          "required": [],
          "optional": [],
          "description": "Storage item MinJoinBond",
          "returnType": "bigint"
        },
        "MinCreateBond": {
          "required": [],
          "optional": [],
          "description": "Storage item MinCreateBond",
          "returnType": "bigint"
        },
        "MaxPools": {
          "required": [],
          "optional": [],
          "description": "Storage item MaxPools",
          "returnType": "number"
        },
        "MaxPoolMembers": {
          "required": [],
          "optional": [],
          "description": "Storage item MaxPoolMembers",
          "returnType": "number"
        },
        "MaxPoolMembersPerPool": {
          "required": [],
          "optional": [],
          "description": "Storage item MaxPoolMembersPerPool",
          "returnType": "number"
        },
        "GlobalMaxCommission": {
          "required": [],
          "optional": [],
          "description": "Storage item GlobalMaxCommission",
          "returnType": "number"
        },
        "PoolMembers": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item PoolMembers",
          "returnType": "unknown"
        },
        "CounterForPoolMembers": {
          "required": [],
          "optional": [],
          "description": "Storage item CounterForPoolMembers",
          "returnType": "number"
        },
        "BondedPools": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item BondedPools",
          "returnType": "unknown"
        },
        "CounterForBondedPools": {
          "required": [],
          "optional": [],
          "description": "Storage item CounterForBondedPools",
          "returnType": "number"
        },
        "RewardPools": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item RewardPools",
          "returnType": "unknown"
        },
        "CounterForRewardPools": {
          "required": [],
          "optional": [],
          "description": "Storage item CounterForRewardPools",
          "returnType": "number"
        },
        "SubPoolsStorage": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item SubPoolsStorage",
          "returnType": "unknown"
        },
        "CounterForSubPoolsStorage": {
          "required": [],
          "optional": [],
          "description": "Storage item CounterForSubPoolsStorage",
          "returnType": "number"
        },
        "Metadata": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item Metadata",
          "returnType": "Uint8Array"
        },
        "CounterForMetadata": {
          "required": [],
          "optional": [],
          "description": "Storage item CounterForMetadata",
          "returnType": "number"
        },
        "LastPoolId": {
          "required": [],
          "optional": [],
          "description": "Storage item LastPoolId",
          "returnType": "number"
        },
        "ReversePoolIdLookup": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item ReversePoolIdLookup",
          "returnType": "number"
        },
        "CounterForReversePoolIdLookup": {
          "required": [],
          "optional": [],
          "description": "Storage item CounterForReversePoolIdLookup",
          "returnType": "number"
        },
        "ClaimPermissions": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item ClaimPermissions",
          "returnType": "NominationPoolsClaimPermission"
        }
      },
      "FastUnstake": {
        "Head": {
          "required": [],
          "optional": [],
          "description": "Storage item Head",
          "returnType": "unknown"
        },
        "Queue": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Queue",
          "returnType": "bigint"
        },
        "CounterForQueue": {
          "required": [],
          "optional": [],
          "description": "Storage item CounterForQueue",
          "returnType": "number"
        },
        "ErasToCheckPerBlock": {
          "required": [],
          "optional": [],
          "description": "Storage item ErasToCheckPerBlock",
          "returnType": "number"
        }
      },
      "DelegatedStaking": {
        "Delegators": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Delegators",
          "returnType": "unknown"
        },
        "CounterForDelegators": {
          "required": [],
          "optional": [],
          "description": "Storage item CounterForDelegators",
          "returnType": "number"
        },
        "Agents": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Agents",
          "returnType": "unknown"
        },
        "CounterForAgents": {
          "required": [],
          "optional": [],
          "description": "Storage item CounterForAgents",
          "returnType": "number"
        }
      },
      "Configuration": {
        "ActiveConfig": {
          "required": [],
          "optional": [],
          "description": "Storage item ActiveConfig",
          "returnType": "unknown"
        },
        "PendingConfigs": {
          "required": [],
          "optional": [],
          "description": "Storage item PendingConfigs",
          "returnType": "unknown"
        },
        "BypassConsistencyCheck": {
          "required": [],
          "optional": [],
          "description": "Storage item BypassConsistencyCheck",
          "returnType": "boolean"
        }
      },
      "ParasShared": {
        "CurrentSessionIndex": {
          "required": [],
          "optional": [],
          "description": "Storage item CurrentSessionIndex",
          "returnType": "number"
        },
        "ActiveValidatorIndices": {
          "required": [],
          "optional": [],
          "description": "Storage item ActiveValidatorIndices",
          "returnType": "unknown"
        },
        "ActiveValidatorKeys": {
          "required": [],
          "optional": [],
          "description": "Storage item ActiveValidatorKeys",
          "returnType": "unknown"
        },
        "AllowedRelayParents": {
          "required": [],
          "optional": [],
          "description": "Storage item AllowedRelayParents",
          "returnType": "unknown"
        }
      },
      "ParaInclusion": {
        "V1": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item V1",
          "returnType": "unknown"
        }
      },
      "ParaInherent": {
        "Included": {
          "required": [],
          "optional": [],
          "description": "Storage item Included",
          "returnType": "null"
        },
        "OnChainVotes": {
          "required": [],
          "optional": [],
          "description": "Storage item OnChainVotes",
          "returnType": "unknown"
        }
      },
      "ParaScheduler": {
        "ValidatorGroups": {
          "required": [],
          "optional": [],
          "description": "Storage item ValidatorGroups",
          "returnType": "unknown"
        },
        "SessionStartBlock": {
          "required": [],
          "optional": [],
          "description": "Storage item SessionStartBlock",
          "returnType": "number"
        },
        "ClaimQueue": {
          "required": [],
          "optional": [],
          "description": "Storage item ClaimQueue",
          "returnType": "unknown"
        }
      },
      "Paras": {
        "PvfActiveVoteMap": {
          "required": [
            "Hash"
          ],
          "optional": [],
          "description": "Storage item PvfActiveVoteMap",
          "returnType": "unknown"
        },
        "PvfActiveVoteList": {
          "required": [],
          "optional": [],
          "description": "Storage item PvfActiveVoteList",
          "returnType": "unknown"
        },
        "Parachains": {
          "required": [],
          "optional": [],
          "description": "Storage item Parachains",
          "returnType": "unknown"
        },
        "ParaLifecycles": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item ParaLifecycles",
          "returnType": "ParachainsParasParaLifecycle"
        },
        "Heads": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item Heads",
          "returnType": "Uint8Array"
        },
        "MostRecentContext": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item MostRecentContext",
          "returnType": "number"
        },
        "CurrentCodeHash": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item CurrentCodeHash",
          "returnType": "Hash"
        },
        "PastCodeHash": {
          "required": [
            "Anonymize_I9jd27rnpm8ttv_"
          ],
          "optional": [],
          "description": "Storage item PastCodeHash",
          "returnType": "Hash"
        },
        "PastCodeMeta": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item PastCodeMeta",
          "returnType": "unknown"
        },
        "PastCodePruning": {
          "required": [],
          "optional": [],
          "description": "Storage item PastCodePruning",
          "returnType": "unknown"
        },
        "FutureCodeUpgrades": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item FutureCodeUpgrades",
          "returnType": "number"
        },
        "FutureCodeUpgradesAt": {
          "required": [],
          "optional": [],
          "description": "Storage item FutureCodeUpgradesAt",
          "returnType": "unknown"
        },
        "FutureCodeHash": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item FutureCodeHash",
          "returnType": "Hash"
        },
        "UpgradeGoAheadSignal": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item UpgradeGoAheadSignal",
          "returnType": "UpgradeGoAhead"
        },
        "UpgradeRestrictionSignal": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item UpgradeRestrictionSignal",
          "returnType": "UpgradeRestriction"
        },
        "UpgradeCooldowns": {
          "required": [],
          "optional": [],
          "description": "Storage item UpgradeCooldowns",
          "returnType": "unknown"
        },
        "UpcomingUpgrades": {
          "required": [],
          "optional": [],
          "description": "Storage item UpcomingUpgrades",
          "returnType": "unknown"
        },
        "ActionsQueue": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item ActionsQueue",
          "returnType": "unknown"
        },
        "UpcomingParasGenesis": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item UpcomingParasGenesis",
          "returnType": "unknown"
        },
        "CodeByHashRefs": {
          "required": [
            "Hash"
          ],
          "optional": [],
          "description": "Storage item CodeByHashRefs",
          "returnType": "number"
        },
        "CodeByHash": {
          "required": [
            "Hash"
          ],
          "optional": [],
          "description": "Storage item CodeByHash",
          "returnType": "Uint8Array"
        }
      },
      "Initializer": {
        "HasInitialized": {
          "required": [],
          "optional": [],
          "description": "Storage item HasInitialized",
          "returnType": "null"
        },
        "BufferedSessionChanges": {
          "required": [],
          "optional": [],
          "description": "Storage item BufferedSessionChanges",
          "returnType": "unknown"
        }
      },
      "Dmp": {
        "DownwardMessageQueues": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item DownwardMessageQueues",
          "returnType": "unknown"
        },
        "DownwardMessageQueueHeads": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item DownwardMessageQueueHeads",
          "returnType": "Hash"
        },
        "DeliveryFeeFactor": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item DeliveryFeeFactor",
          "returnType": "bigint"
        }
      },
      "Hrmp": {
        "HrmpOpenChannelRequests": {
          "required": [
            "Anonymize_I50mrcbubp554e_"
          ],
          "optional": [],
          "description": "Storage item HrmpOpenChannelRequests",
          "returnType": "unknown"
        },
        "HrmpOpenChannelRequestsList": {
          "required": [],
          "optional": [],
          "description": "Storage item HrmpOpenChannelRequestsList",
          "returnType": "unknown"
        },
        "HrmpOpenChannelRequestCount": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item HrmpOpenChannelRequestCount",
          "returnType": "number"
        },
        "HrmpAcceptedChannelRequestCount": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item HrmpAcceptedChannelRequestCount",
          "returnType": "number"
        },
        "HrmpCloseChannelRequests": {
          "required": [
            "Anonymize_I50mrcbubp554e_"
          ],
          "optional": [],
          "description": "Storage item HrmpCloseChannelRequests",
          "returnType": "null"
        },
        "HrmpCloseChannelRequestsList": {
          "required": [],
          "optional": [],
          "description": "Storage item HrmpCloseChannelRequestsList",
          "returnType": "unknown"
        },
        "HrmpWatermarks": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item HrmpWatermarks",
          "returnType": "number"
        },
        "HrmpChannels": {
          "required": [
            "Anonymize_I50mrcbubp554e_"
          ],
          "optional": [],
          "description": "Storage item HrmpChannels",
          "returnType": "unknown"
        },
        "HrmpIngressChannelsIndex": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item HrmpIngressChannelsIndex",
          "returnType": "unknown"
        },
        "HrmpEgressChannelsIndex": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item HrmpEgressChannelsIndex",
          "returnType": "unknown"
        },
        "HrmpChannelContents": {
          "required": [
            "Anonymize_I50mrcbubp554e_"
          ],
          "optional": [],
          "description": "Storage item HrmpChannelContents",
          "returnType": "unknown"
        },
        "HrmpChannelDigests": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item HrmpChannelDigests",
          "returnType": "unknown"
        }
      },
      "ParaSessionInfo": {
        "AssignmentKeysUnsafe": {
          "required": [],
          "optional": [],
          "description": "Storage item AssignmentKeysUnsafe",
          "returnType": "unknown"
        },
        "EarliestStoredSession": {
          "required": [],
          "optional": [],
          "description": "Storage item EarliestStoredSession",
          "returnType": "number"
        },
        "Sessions": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item Sessions",
          "returnType": "unknown"
        },
        "AccountKeys": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item AccountKeys",
          "returnType": "unknown"
        },
        "SessionExecutorParams": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item SessionExecutorParams",
          "returnType": "unknown"
        }
      },
      "ParasDisputes": {
        "LastPrunedSession": {
          "required": [],
          "optional": [],
          "description": "Storage item LastPrunedSession",
          "returnType": "number"
        },
        "Disputes": {
          "required": [],
          "optional": [],
          "description": "Storage item Disputes",
          "returnType": "unknown"
        },
        "BackersOnDisputes": {
          "required": [],
          "optional": [],
          "description": "Storage item BackersOnDisputes",
          "returnType": "unknown"
        },
        "Included": {
          "required": [],
          "optional": [],
          "description": "Storage item Included",
          "returnType": "number"
        },
        "Frozen": {
          "required": [],
          "optional": [],
          "description": "Storage item Frozen",
          "returnType": "unknown"
        }
      },
      "ParasSlashing": {
        "UnappliedSlashes": {
          "required": [],
          "optional": [],
          "description": "Storage item UnappliedSlashes",
          "returnType": "unknown"
        },
        "ValidatorSetCounts": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item ValidatorSetCounts",
          "returnType": "number"
        }
      },
      "OnDemand": {
        "ParaIdAffinity": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item ParaIdAffinity",
          "returnType": "unknown"
        },
        "QueueStatus": {
          "required": [],
          "optional": [],
          "description": "Storage item QueueStatus",
          "returnType": "unknown"
        },
        "FreeEntries": {
          "required": [],
          "optional": [],
          "description": "Storage item FreeEntries",
          "returnType": "unknown"
        },
        "AffinityEntries": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item AffinityEntries",
          "returnType": "unknown"
        },
        "Revenue": {
          "required": [],
          "optional": [],
          "description": "Storage item Revenue",
          "returnType": "unknown"
        },
        "Credits": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Credits",
          "returnType": "bigint"
        }
      },
      "CoretimeAssignmentProvider": {
        "CoreSchedules": {
          "required": [
            "Anonymize_I9jd27rnpm8ttv_"
          ],
          "optional": [],
          "description": "Storage item CoreSchedules",
          "returnType": "unknown"
        },
        "CoreDescriptors": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item CoreDescriptors",
          "returnType": "unknown"
        }
      },
      "Registrar": {
        "PendingSwap": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item PendingSwap",
          "returnType": "number"
        },
        "Paras": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item Paras",
          "returnType": "unknown"
        },
        "NextFreeParaId": {
          "required": [],
          "optional": [],
          "description": "Storage item NextFreeParaId",
          "returnType": "number"
        }
      },
      "Slots": {
        "Leases": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item Leases",
          "returnType": "unknown"
        }
      },
      "Auctions": {
        "AuctionCounter": {
          "required": [],
          "optional": [],
          "description": "Storage item AuctionCounter",
          "returnType": "number"
        },
        "AuctionInfo": {
          "required": [],
          "optional": [],
          "description": "Storage item AuctionInfo",
          "returnType": "unknown"
        },
        "ReservedAmounts": {
          "required": [
            "Anonymize_I6ouflveob4eli_"
          ],
          "optional": [],
          "description": "Storage item ReservedAmounts",
          "returnType": "bigint"
        },
        "Winning": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item Winning",
          "returnType": "unknown"
        }
      },
      "Crowdloan": {
        "Funds": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item Funds",
          "returnType": "unknown"
        },
        "NewRaise": {
          "required": [],
          "optional": [],
          "description": "Storage item NewRaise",
          "returnType": "unknown"
        },
        "EndingsCount": {
          "required": [],
          "optional": [],
          "description": "Storage item EndingsCount",
          "returnType": "number"
        },
        "NextFundIndex": {
          "required": [],
          "optional": [],
          "description": "Storage item NextFundIndex",
          "returnType": "number"
        }
      },
      "StateTrieMigration": {
        "MigrationProcess": {
          "required": [],
          "optional": [],
          "description": "Storage item MigrationProcess",
          "returnType": "unknown"
        },
        "AutoLimits": {
          "required": [],
          "optional": [],
          "description": "Storage item AutoLimits",
          "returnType": "unknown"
        },
        "SignedMigrationMaxLimits": {
          "required": [],
          "optional": [],
          "description": "Storage item SignedMigrationMaxLimits",
          "returnType": "unknown"
        }
      },
      "XcmPallet": {
        "QueryCounter": {
          "required": [],
          "optional": [],
          "description": "Storage item QueryCounter",
          "returnType": "bigint"
        },
        "Queries": {
          "required": [
            "u64"
          ],
          "optional": [],
          "description": "Storage item Queries",
          "returnType": "unknown"
        },
        "AssetTraps": {
          "required": [
            "Hash"
          ],
          "optional": [],
          "description": "Storage item AssetTraps",
          "returnType": "number"
        },
        "SafeXcmVersion": {
          "required": [],
          "optional": [],
          "description": "Storage item SafeXcmVersion",
          "returnType": "number"
        },
        "SupportedVersion": {
          "required": [],
          "optional": [],
          "description": "Storage item SupportedVersion",
          "returnType": "number"
        },
        "VersionNotifiers": {
          "required": [],
          "optional": [],
          "description": "Storage item VersionNotifiers",
          "returnType": "bigint"
        },
        "VersionNotifyTargets": {
          "required": [],
          "optional": [],
          "description": "Storage item VersionNotifyTargets",
          "returnType": "unknown"
        },
        "VersionDiscoveryQueue": {
          "required": [],
          "optional": [],
          "description": "Storage item VersionDiscoveryQueue",
          "returnType": "unknown"
        },
        "CurrentMigration": {
          "required": [],
          "optional": [],
          "description": "Storage item CurrentMigration",
          "returnType": "XcmPalletVersionMigrationStage"
        },
        "RemoteLockedFungibles": {
          "required": [],
          "optional": [],
          "description": "Storage item RemoteLockedFungibles",
          "returnType": "unknown"
        },
        "LockedFungibles": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item LockedFungibles",
          "returnType": "unknown"
        },
        "XcmExecutionSuspended": {
          "required": [],
          "optional": [],
          "description": "Storage item XcmExecutionSuspended",
          "returnType": "boolean"
        },
        "ShouldRecordXcm": {
          "required": [],
          "optional": [],
          "description": "Storage item ShouldRecordXcm",
          "returnType": "boolean"
        },
        "RecordedXcm": {
          "required": [],
          "optional": [],
          "description": "Storage item RecordedXcm",
          "returnType": "unknown"
        },
        "AuthorizedAliases": {
          "required": [
            "XcmVersionedLocation"
          ],
          "optional": [],
          "description": "Storage item AuthorizedAliases",
          "returnType": "unknown"
        }
      },
      "MessageQueue": {
        "BookStateFor": {
          "required": [
            "ParachainsInclusionAggregateMessageOrigin"
          ],
          "optional": [],
          "description": "Storage item BookStateFor",
          "returnType": "unknown"
        },
        "ServiceHead": {
          "required": [],
          "optional": [],
          "description": "Storage item ServiceHead",
          "returnType": "ParachainsInclusionAggregateMessageOrigin"
        },
        "Pages": {
          "required": [],
          "optional": [],
          "description": "Storage item Pages",
          "returnType": "unknown"
        }
      },
      "AssetRate": {
        "ConversionRateToNative": {
          "required": [
            "Anonymize_I2q3ri6itcjj5u_"
          ],
          "optional": [],
          "description": "Maps an asset to its fixed point representation in the native balance.",
          "returnType": "bigint"
        }
      },
      "Beefy": {
        "Authorities": {
          "required": [],
          "optional": [],
          "description": "Storage item Authorities",
          "returnType": "unknown"
        },
        "ValidatorSetId": {
          "required": [],
          "optional": [],
          "description": "Storage item ValidatorSetId",
          "returnType": "bigint"
        },
        "NextAuthorities": {
          "required": [],
          "optional": [],
          "description": "Storage item NextAuthorities",
          "returnType": "unknown"
        },
        "SetIdSession": {
          "required": [
            "u64"
          ],
          "optional": [],
          "description": "Storage item SetIdSession",
          "returnType": "number"
        },
        "GenesisBlock": {
          "required": [],
          "optional": [],
          "description": "Storage item GenesisBlock",
          "returnType": "unknown"
        }
      },
      "Mmr": {
        "RootHash": {
          "required": [],
          "optional": [],
          "description": "Storage item RootHash",
          "returnType": "Hash"
        },
        "NumberOfLeaves": {
          "required": [],
          "optional": [],
          "description": "Storage item NumberOfLeaves",
          "returnType": "bigint"
        },
        "Nodes": {
          "required": [
            "u64"
          ],
          "optional": [],
          "description": "Storage item Nodes",
          "returnType": "Hash"
        }
      },
      "BeefyMmrLeaf": {
        "BeefyAuthorities": {
          "required": [],
          "optional": [],
          "description": "Storage item BeefyAuthorities",
          "returnType": "unknown"
        },
        "BeefyNextAuthorities": {
          "required": [],
          "optional": [],
          "description": "Storage item BeefyNextAuthorities",
          "returnType": "unknown"
        }
      }
    }
  },
  "rococo": {
    "pallets": {
      "System": {
        "Account": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Account",
          "returnType": "unknown"
        },
        "ExtrinsicCount": {
          "required": [],
          "optional": [],
          "description": "Storage item ExtrinsicCount",
          "returnType": "number"
        },
        "InherentsApplied": {
          "required": [],
          "optional": [],
          "description": "Storage item InherentsApplied",
          "returnType": "boolean"
        },
        "BlockWeight": {
          "required": [],
          "optional": [],
          "description": "Storage item BlockWeight",
          "returnType": "unknown"
        },
        "AllExtrinsicsLen": {
          "required": [],
          "optional": [],
          "description": "Storage item AllExtrinsicsLen",
          "returnType": "number"
        },
        "BlockHash": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item BlockHash",
          "returnType": "Hash"
        },
        "ExtrinsicData": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item ExtrinsicData",
          "returnType": "Uint8Array"
        },
        "Number": {
          "required": [],
          "optional": [],
          "description": "Storage item Number",
          "returnType": "number"
        },
        "ParentHash": {
          "required": [],
          "optional": [],
          "description": "Storage item ParentHash",
          "returnType": "Hash"
        },
        "Digest": {
          "required": [],
          "optional": [],
          "description": "Storage item Digest",
          "returnType": "unknown"
        },
        "Events": {
          "required": [],
          "optional": [],
          "description": "Storage item Events",
          "returnType": "unknown"
        },
        "EventCount": {
          "required": [],
          "optional": [],
          "description": "Storage item EventCount",
          "returnType": "number"
        },
        "EventTopics": {
          "required": [
            "Hash"
          ],
          "optional": [],
          "description": "Storage item EventTopics",
          "returnType": "unknown"
        },
        "LastRuntimeUpgrade": {
          "required": [],
          "optional": [],
          "description": "Storage item LastRuntimeUpgrade",
          "returnType": "unknown"
        },
        "UpgradedToU32RefCount": {
          "required": [],
          "optional": [],
          "description": "Storage item UpgradedToU32RefCount",
          "returnType": "boolean"
        },
        "UpgradedToTripleRefCount": {
          "required": [],
          "optional": [],
          "description": "Storage item UpgradedToTripleRefCount",
          "returnType": "boolean"
        },
        "ExecutionPhase": {
          "required": [],
          "optional": [],
          "description": "Storage item ExecutionPhase",
          "returnType": "Phase"
        },
        "AuthorizedUpgrade": {
          "required": [],
          "optional": [],
          "description": "Storage item AuthorizedUpgrade",
          "returnType": "unknown"
        }
      },
      "Babe": {
        "EpochIndex": {
          "required": [],
          "optional": [],
          "description": "Storage item EpochIndex",
          "returnType": "bigint"
        },
        "Authorities": {
          "required": [],
          "optional": [],
          "description": "Storage item Authorities",
          "returnType": "unknown"
        },
        "GenesisSlot": {
          "required": [],
          "optional": [],
          "description": "Storage item GenesisSlot",
          "returnType": "bigint"
        },
        "CurrentSlot": {
          "required": [],
          "optional": [],
          "description": "Storage item CurrentSlot",
          "returnType": "bigint"
        },
        "Randomness": {
          "required": [],
          "optional": [],
          "description": "Storage item Randomness",
          "returnType": "Hash"
        },
        "PendingEpochConfigChange": {
          "required": [],
          "optional": [],
          "description": "Storage item PendingEpochConfigChange",
          "returnType": "BabeDigestsNextConfigDescriptor"
        },
        "NextRandomness": {
          "required": [],
          "optional": [],
          "description": "Storage item NextRandomness",
          "returnType": "Hash"
        },
        "NextAuthorities": {
          "required": [],
          "optional": [],
          "description": "Storage item NextAuthorities",
          "returnType": "unknown"
        },
        "SegmentIndex": {
          "required": [],
          "optional": [],
          "description": "Storage item SegmentIndex",
          "returnType": "number"
        },
        "UnderConstruction": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item UnderConstruction",
          "returnType": "unknown"
        },
        "Initialized": {
          "required": [],
          "optional": [],
          "description": "Storage item Initialized",
          "returnType": "unknown"
        },
        "AuthorVrfRandomness": {
          "required": [],
          "optional": [],
          "description": "Storage item AuthorVrfRandomness",
          "returnType": "unknown"
        },
        "EpochStart": {
          "required": [],
          "optional": [],
          "description": "Storage item EpochStart",
          "returnType": "unknown"
        },
        "Lateness": {
          "required": [],
          "optional": [],
          "description": "Storage item Lateness",
          "returnType": "number"
        },
        "EpochConfig": {
          "required": [],
          "optional": [],
          "description": "Storage item EpochConfig",
          "returnType": "unknown"
        },
        "NextEpochConfig": {
          "required": [],
          "optional": [],
          "description": "Storage item NextEpochConfig",
          "returnType": "unknown"
        },
        "SkippedEpochs": {
          "required": [],
          "optional": [],
          "description": "Storage item SkippedEpochs",
          "returnType": "unknown"
        }
      },
      "Timestamp": {
        "Now": {
          "required": [],
          "optional": [],
          "description": "Storage item Now",
          "returnType": "bigint"
        },
        "DidUpdate": {
          "required": [],
          "optional": [],
          "description": "Storage item DidUpdate",
          "returnType": "boolean"
        }
      },
      "Indices": {
        "Accounts": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item Accounts",
          "returnType": "unknown"
        }
      },
      "Balances": {
        "TotalIssuance": {
          "required": [],
          "optional": [],
          "description": "Storage item TotalIssuance",
          "returnType": "bigint"
        },
        "InactiveIssuance": {
          "required": [],
          "optional": [],
          "description": "Storage item InactiveIssuance",
          "returnType": "bigint"
        },
        "Account": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Account",
          "returnType": "unknown"
        },
        "Locks": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Locks",
          "returnType": "unknown"
        },
        "Reserves": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Reserves",
          "returnType": "unknown"
        },
        "Holds": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Holds",
          "returnType": "unknown"
        },
        "Freezes": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Freezes",
          "returnType": "unknown"
        }
      },
      "Parameters": {
        "Parameters": {
          "required": [
            "Anonymize_I4i0em5af770sp_"
          ],
          "optional": [],
          "description": "Storage item Parameters",
          "returnType": "unknown"
        }
      },
      "TransactionPayment": {
        "NextFeeMultiplier": {
          "required": [],
          "optional": [],
          "description": "Storage item NextFeeMultiplier",
          "returnType": "bigint"
        },
        "StorageVersion": {
          "required": [],
          "optional": [],
          "description": "Storage item StorageVersion",
          "returnType": "TransactionPaymentReleases"
        }
      },
      "Authorship": {
        "Author": {
          "required": [],
          "optional": [],
          "description": "Storage item Author",
          "returnType": "string"
        }
      },
      "Offences": {
        "Reports": {
          "required": [
            "Hash"
          ],
          "optional": [],
          "description": "Storage item Reports",
          "returnType": "unknown"
        },
        "ConcurrentReportsIndex": {
          "required": [],
          "optional": [],
          "description": "Storage item ConcurrentReportsIndex",
          "returnType": "unknown"
        }
      },
      "Historical": {
        "HistoricalSessions": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item HistoricalSessions",
          "returnType": "unknown"
        },
        "StoredRange": {
          "required": [],
          "optional": [],
          "description": "Storage item StoredRange",
          "returnType": "unknown"
        }
      },
      "Session": {
        "Validators": {
          "required": [],
          "optional": [],
          "description": "Storage item Validators",
          "returnType": "unknown"
        },
        "CurrentIndex": {
          "required": [],
          "optional": [],
          "description": "Storage item CurrentIndex",
          "returnType": "number"
        },
        "QueuedChanged": {
          "required": [],
          "optional": [],
          "description": "Storage item QueuedChanged",
          "returnType": "boolean"
        },
        "QueuedKeys": {
          "required": [],
          "optional": [],
          "description": "Storage item QueuedKeys",
          "returnType": "unknown"
        },
        "DisabledValidators": {
          "required": [],
          "optional": [],
          "description": "Storage item DisabledValidators",
          "returnType": "unknown"
        },
        "NextKeys": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item NextKeys",
          "returnType": "unknown"
        },
        "KeyOwner": {
          "required": [
            "Anonymize_I82jm9g7pufuel_"
          ],
          "optional": [],
          "description": "Storage item KeyOwner",
          "returnType": "string"
        }
      },
      "Grandpa": {
        "State": {
          "required": [],
          "optional": [],
          "description": "Storage item State",
          "returnType": "GrandpaStoredState"
        },
        "PendingChange": {
          "required": [],
          "optional": [],
          "description": "Storage item PendingChange",
          "returnType": "unknown"
        },
        "NextForced": {
          "required": [],
          "optional": [],
          "description": "Storage item NextForced",
          "returnType": "number"
        },
        "Stalled": {
          "required": [],
          "optional": [],
          "description": "Storage item Stalled",
          "returnType": "unknown"
        },
        "CurrentSetId": {
          "required": [],
          "optional": [],
          "description": "Storage item CurrentSetId",
          "returnType": "bigint"
        },
        "SetIdSession": {
          "required": [
            "u64"
          ],
          "optional": [],
          "description": "Storage item SetIdSession",
          "returnType": "number"
        },
        "Authorities": {
          "required": [],
          "optional": [],
          "description": "Storage item Authorities",
          "returnType": "unknown"
        }
      },
      "AuthorityDiscovery": {
        "Keys": {
          "required": [],
          "optional": [],
          "description": "Storage item Keys",
          "returnType": "unknown"
        },
        "NextKeys": {
          "required": [],
          "optional": [],
          "description": "Storage item NextKeys",
          "returnType": "unknown"
        }
      },
      "Treasury": {
        "ProposalCount": {
          "required": [],
          "optional": [],
          "description": "Storage item ProposalCount",
          "returnType": "number"
        },
        "Proposals": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item Proposals",
          "returnType": "unknown"
        },
        "Deactivated": {
          "required": [],
          "optional": [],
          "description": "Storage item Deactivated",
          "returnType": "bigint"
        },
        "Approvals": {
          "required": [],
          "optional": [],
          "description": "Storage item Approvals",
          "returnType": "unknown"
        },
        "SpendCount": {
          "required": [],
          "optional": [],
          "description": "Storage item SpendCount",
          "returnType": "number"
        },
        "Spends": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item Spends",
          "returnType": "unknown"
        }
      },
      "ConvictionVoting": {
        "VotingFor": {
          "required": [],
          "optional": [],
          "description": "Storage item VotingFor",
          "returnType": "ConvictionVotingVoteVoting"
        },
        "ClassLocksFor": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item ClassLocksFor",
          "returnType": "unknown"
        }
      },
      "Referenda": {
        "ReferendumCount": {
          "required": [],
          "optional": [],
          "description": "Storage item ReferendumCount",
          "returnType": "number"
        },
        "ReferendumInfoFor": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item ReferendumInfoFor",
          "returnType": "unknown"
        },
        "TrackQueue": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item TrackQueue",
          "returnType": "unknown"
        },
        "DecidingCount": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item DecidingCount",
          "returnType": "number"
        },
        "MetadataOf": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item MetadataOf",
          "returnType": "Hash"
        }
      },
      "FellowshipCollective": {
        "MemberCount": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item MemberCount",
          "returnType": "number"
        },
        "Members": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Members",
          "returnType": "number"
        },
        "IdToIndex": {
          "required": [],
          "optional": [],
          "description": "Storage item IdToIndex",
          "returnType": "number"
        },
        "IndexToId": {
          "required": [],
          "optional": [],
          "description": "Storage item IndexToId",
          "returnType": "string"
        },
        "Voting": {
          "required": [],
          "optional": [],
          "description": "Storage item Voting",
          "returnType": "unknown"
        },
        "VotingCleanup": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item VotingCleanup",
          "returnType": "Uint8Array"
        }
      },
      "FellowshipReferenda": {
        "ReferendumCount": {
          "required": [],
          "optional": [],
          "description": "Storage item ReferendumCount",
          "returnType": "number"
        },
        "ReferendumInfoFor": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item ReferendumInfoFor",
          "returnType": "unknown"
        },
        "TrackQueue": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item TrackQueue",
          "returnType": "unknown"
        },
        "DecidingCount": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item DecidingCount",
          "returnType": "number"
        },
        "MetadataOf": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item MetadataOf",
          "returnType": "Hash"
        }
      },
      "Whitelist": {
        "WhitelistedCall": {
          "required": [
            "Hash"
          ],
          "optional": [],
          "description": "Storage item WhitelistedCall",
          "returnType": "null"
        }
      },
      "Claims": {
        "Claims": {
          "required": [
            "bytes"
          ],
          "optional": [],
          "description": "Storage item Claims",
          "returnType": "bigint"
        },
        "Total": {
          "required": [],
          "optional": [],
          "description": "Storage item Total",
          "returnType": "bigint"
        },
        "Vesting": {
          "required": [
            "bytes"
          ],
          "optional": [],
          "description": "Storage item Vesting",
          "returnType": "unknown"
        },
        "Signing": {
          "required": [
            "bytes"
          ],
          "optional": [],
          "description": "Storage item Signing",
          "returnType": "ClaimsStatementKind"
        },
        "Preclaims": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Preclaims",
          "returnType": "Hash"
        }
      },
      "Identity": {
        "IdentityOf": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item IdentityOf",
          "returnType": "unknown"
        },
        "SuperOf": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item SuperOf",
          "returnType": "unknown"
        },
        "SubsOf": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item SubsOf",
          "returnType": "unknown"
        },
        "Registrars": {
          "required": [],
          "optional": [],
          "description": "Storage item Registrars",
          "returnType": "unknown"
        },
        "UsernameAuthorities": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item UsernameAuthorities",
          "returnType": "unknown"
        },
        "AccountOfUsername": {
          "required": [
            "bytes"
          ],
          "optional": [],
          "description": "Storage item AccountOfUsername",
          "returnType": "string"
        },
        "PendingUsernames": {
          "required": [
            "bytes"
          ],
          "optional": [],
          "description": "Storage item PendingUsernames",
          "returnType": "unknown"
        }
      },
      "Society": {
        "Parameters": {
          "required": [],
          "optional": [],
          "description": "Storage item Parameters",
          "returnType": "unknown"
        },
        "Pot": {
          "required": [],
          "optional": [],
          "description": "Storage item Pot",
          "returnType": "bigint"
        },
        "Founder": {
          "required": [],
          "optional": [],
          "description": "Storage item Founder",
          "returnType": "string"
        },
        "Head": {
          "required": [],
          "optional": [],
          "description": "Storage item Head",
          "returnType": "string"
        },
        "Rules": {
          "required": [],
          "optional": [],
          "description": "Storage item Rules",
          "returnType": "Hash"
        },
        "Members": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Members",
          "returnType": "unknown"
        },
        "Payouts": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Payouts",
          "returnType": "unknown"
        },
        "MemberCount": {
          "required": [],
          "optional": [],
          "description": "Storage item MemberCount",
          "returnType": "number"
        },
        "MemberByIndex": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item MemberByIndex",
          "returnType": "string"
        },
        "SuspendedMembers": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item SuspendedMembers",
          "returnType": "unknown"
        },
        "RoundCount": {
          "required": [],
          "optional": [],
          "description": "Storage item RoundCount",
          "returnType": "number"
        },
        "Bids": {
          "required": [],
          "optional": [],
          "description": "Storage item Bids",
          "returnType": "unknown"
        },
        "Candidates": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Candidates",
          "returnType": "unknown"
        },
        "Skeptic": {
          "required": [],
          "optional": [],
          "description": "Storage item Skeptic",
          "returnType": "string"
        },
        "Votes": {
          "required": [],
          "optional": [],
          "description": "Storage item Votes",
          "returnType": "unknown"
        },
        "VoteClearCursor": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item VoteClearCursor",
          "returnType": "Uint8Array"
        },
        "NextHead": {
          "required": [],
          "optional": [],
          "description": "Storage item NextHead",
          "returnType": "unknown"
        },
        "ChallengeRoundCount": {
          "required": [],
          "optional": [],
          "description": "Storage item ChallengeRoundCount",
          "returnType": "number"
        },
        "Defending": {
          "required": [],
          "optional": [],
          "description": "Storage item Defending",
          "returnType": "unknown"
        },
        "DefenderVotes": {
          "required": [],
          "optional": [],
          "description": "Storage item DefenderVotes",
          "returnType": "unknown"
        }
      },
      "Recovery": {
        "Recoverable": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Recoverable",
          "returnType": "unknown"
        },
        "ActiveRecoveries": {
          "required": [],
          "optional": [],
          "description": "Storage item ActiveRecoveries",
          "returnType": "unknown"
        },
        "Proxy": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Proxy",
          "returnType": "string"
        }
      },
      "Vesting": {
        "Vesting": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Vesting",
          "returnType": "unknown"
        },
        "StorageVersion": {
          "required": [],
          "optional": [],
          "description": "Storage item StorageVersion",
          "returnType": "Version"
        }
      },
      "Scheduler": {
        "IncompleteSince": {
          "required": [],
          "optional": [],
          "description": "Storage item IncompleteSince",
          "returnType": "number"
        },
        "Agenda": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item Agenda",
          "returnType": "unknown"
        },
        "Retries": {
          "required": [
            "Anonymize_I9jd27rnpm8ttv_"
          ],
          "optional": [],
          "description": "Storage item Retries",
          "returnType": "unknown"
        },
        "Lookup": {
          "required": [
            "Hash"
          ],
          "optional": [],
          "description": "Storage item Lookup",
          "returnType": "unknown"
        }
      },
      "Proxy": {
        "Proxies": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Proxies",
          "returnType": "unknown"
        },
        "Announcements": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Announcements",
          "returnType": "unknown"
        }
      },
      "Multisig": {
        "Multisigs": {
          "required": [],
          "optional": [],
          "description": "Storage item Multisigs",
          "returnType": "unknown"
        }
      },
      "Preimage": {
        "StatusFor": {
          "required": [
            "Hash"
          ],
          "optional": [],
          "description": "Storage item StatusFor",
          "returnType": "PreimageOldRequestStatus"
        },
        "RequestStatusFor": {
          "required": [
            "Hash"
          ],
          "optional": [],
          "description": "Storage item RequestStatusFor",
          "returnType": "PreimageRequestStatus"
        },
        "PreimageFor": {
          "required": [
            "Anonymize_I4pact7n2e9a0i_"
          ],
          "optional": [],
          "description": "Storage item PreimageFor",
          "returnType": "Uint8Array"
        }
      },
      "AssetRate": {
        "ConversionRateToNative": {
          "required": [
            "VersionedLocatableAsset"
          ],
          "optional": [],
          "description": "Maps an asset to its fixed point representation in the native balance.",
          "returnType": "bigint"
        }
      },
      "Bounties": {
        "BountyCount": {
          "required": [],
          "optional": [],
          "description": "Storage item BountyCount",
          "returnType": "number"
        },
        "Bounties": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item Bounties",
          "returnType": "unknown"
        },
        "BountyDescriptions": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item BountyDescriptions",
          "returnType": "Uint8Array"
        },
        "BountyApprovals": {
          "required": [],
          "optional": [],
          "description": "Storage item BountyApprovals",
          "returnType": "unknown"
        }
      },
      "ChildBounties": {
        "ChildBountyCount": {
          "required": [],
          "optional": [],
          "description": "Storage item ChildBountyCount",
          "returnType": "number"
        },
        "ParentChildBounties": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item ParentChildBounties",
          "returnType": "number"
        },
        "ChildBounties": {
          "required": [],
          "optional": [],
          "description": "Storage item ChildBounties",
          "returnType": "unknown"
        },
        "ChildBountyDescriptions": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item ChildBountyDescriptions",
          "returnType": "Uint8Array"
        },
        "ChildrenCuratorFees": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item ChildrenCuratorFees",
          "returnType": "bigint"
        }
      },
      "Nis": {
        "QueueTotals": {
          "required": [],
          "optional": [],
          "description": "Storage item QueueTotals",
          "returnType": "unknown"
        },
        "Queues": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item Queues",
          "returnType": "unknown"
        },
        "Summary": {
          "required": [],
          "optional": [],
          "description": "Storage item Summary",
          "returnType": "unknown"
        },
        "Receipts": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item Receipts",
          "returnType": "unknown"
        }
      },
      "NisCounterpartBalances": {
        "TotalIssuance": {
          "required": [],
          "optional": [],
          "description": "Storage item TotalIssuance",
          "returnType": "bigint"
        },
        "InactiveIssuance": {
          "required": [],
          "optional": [],
          "description": "Storage item InactiveIssuance",
          "returnType": "bigint"
        },
        "Account": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Account",
          "returnType": "unknown"
        },
        "Locks": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Locks",
          "returnType": "unknown"
        },
        "Reserves": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Reserves",
          "returnType": "unknown"
        },
        "Holds": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Holds",
          "returnType": "unknown"
        },
        "Freezes": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Freezes",
          "returnType": "unknown"
        }
      },
      "Configuration": {
        "ActiveConfig": {
          "required": [],
          "optional": [],
          "description": "Storage item ActiveConfig",
          "returnType": "unknown"
        },
        "PendingConfigs": {
          "required": [],
          "optional": [],
          "description": "Storage item PendingConfigs",
          "returnType": "unknown"
        },
        "BypassConsistencyCheck": {
          "required": [],
          "optional": [],
          "description": "Storage item BypassConsistencyCheck",
          "returnType": "boolean"
        }
      },
      "ParasShared": {
        "CurrentSessionIndex": {
          "required": [],
          "optional": [],
          "description": "Storage item CurrentSessionIndex",
          "returnType": "number"
        },
        "ActiveValidatorIndices": {
          "required": [],
          "optional": [],
          "description": "Storage item ActiveValidatorIndices",
          "returnType": "unknown"
        },
        "ActiveValidatorKeys": {
          "required": [],
          "optional": [],
          "description": "Storage item ActiveValidatorKeys",
          "returnType": "unknown"
        },
        "AllowedRelayParents": {
          "required": [],
          "optional": [],
          "description": "Storage item AllowedRelayParents",
          "returnType": "unknown"
        }
      },
      "ParaInclusion": {
        "V1": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item V1",
          "returnType": "unknown"
        }
      },
      "ParaInherent": {
        "Included": {
          "required": [],
          "optional": [],
          "description": "Storage item Included",
          "returnType": "null"
        },
        "OnChainVotes": {
          "required": [],
          "optional": [],
          "description": "Storage item OnChainVotes",
          "returnType": "unknown"
        }
      },
      "ParaScheduler": {
        "ValidatorGroups": {
          "required": [],
          "optional": [],
          "description": "Storage item ValidatorGroups",
          "returnType": "unknown"
        },
        "AvailabilityCores": {
          "required": [],
          "optional": [],
          "description": "Storage item AvailabilityCores",
          "returnType": "unknown"
        },
        "SessionStartBlock": {
          "required": [],
          "optional": [],
          "description": "Storage item SessionStartBlock",
          "returnType": "number"
        },
        "ClaimQueue": {
          "required": [],
          "optional": [],
          "description": "Storage item ClaimQueue",
          "returnType": "unknown"
        }
      },
      "Paras": {
        "PvfActiveVoteMap": {
          "required": [
            "Hash"
          ],
          "optional": [],
          "description": "Storage item PvfActiveVoteMap",
          "returnType": "unknown"
        },
        "PvfActiveVoteList": {
          "required": [],
          "optional": [],
          "description": "Storage item PvfActiveVoteList",
          "returnType": "unknown"
        },
        "Parachains": {
          "required": [],
          "optional": [],
          "description": "Storage item Parachains",
          "returnType": "unknown"
        },
        "ParaLifecycles": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item ParaLifecycles",
          "returnType": "ParachainsParasParaLifecycle"
        },
        "Heads": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item Heads",
          "returnType": "Uint8Array"
        },
        "MostRecentContext": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item MostRecentContext",
          "returnType": "number"
        },
        "CurrentCodeHash": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item CurrentCodeHash",
          "returnType": "Hash"
        },
        "PastCodeHash": {
          "required": [
            "Anonymize_I9jd27rnpm8ttv_"
          ],
          "optional": [],
          "description": "Storage item PastCodeHash",
          "returnType": "Hash"
        },
        "PastCodeMeta": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item PastCodeMeta",
          "returnType": "unknown"
        },
        "PastCodePruning": {
          "required": [],
          "optional": [],
          "description": "Storage item PastCodePruning",
          "returnType": "unknown"
        },
        "FutureCodeUpgrades": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item FutureCodeUpgrades",
          "returnType": "number"
        },
        "FutureCodeUpgradesAt": {
          "required": [],
          "optional": [],
          "description": "Storage item FutureCodeUpgradesAt",
          "returnType": "unknown"
        },
        "FutureCodeHash": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item FutureCodeHash",
          "returnType": "Hash"
        },
        "UpgradeGoAheadSignal": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item UpgradeGoAheadSignal",
          "returnType": "UpgradeGoAhead"
        },
        "UpgradeRestrictionSignal": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item UpgradeRestrictionSignal",
          "returnType": "UpgradeRestriction"
        },
        "UpgradeCooldowns": {
          "required": [],
          "optional": [],
          "description": "Storage item UpgradeCooldowns",
          "returnType": "unknown"
        },
        "UpcomingUpgrades": {
          "required": [],
          "optional": [],
          "description": "Storage item UpcomingUpgrades",
          "returnType": "unknown"
        },
        "ActionsQueue": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item ActionsQueue",
          "returnType": "unknown"
        },
        "UpcomingParasGenesis": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item UpcomingParasGenesis",
          "returnType": "unknown"
        },
        "CodeByHashRefs": {
          "required": [
            "Hash"
          ],
          "optional": [],
          "description": "Storage item CodeByHashRefs",
          "returnType": "number"
        },
        "CodeByHash": {
          "required": [
            "Hash"
          ],
          "optional": [],
          "description": "Storage item CodeByHash",
          "returnType": "Uint8Array"
        }
      },
      "Initializer": {
        "HasInitialized": {
          "required": [],
          "optional": [],
          "description": "Storage item HasInitialized",
          "returnType": "null"
        },
        "BufferedSessionChanges": {
          "required": [],
          "optional": [],
          "description": "Storage item BufferedSessionChanges",
          "returnType": "unknown"
        }
      },
      "Dmp": {
        "DownwardMessageQueues": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item DownwardMessageQueues",
          "returnType": "unknown"
        },
        "DownwardMessageQueueHeads": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item DownwardMessageQueueHeads",
          "returnType": "Hash"
        },
        "DeliveryFeeFactor": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item DeliveryFeeFactor",
          "returnType": "bigint"
        }
      },
      "Hrmp": {
        "HrmpOpenChannelRequests": {
          "required": [
            "Anonymize_I50mrcbubp554e_"
          ],
          "optional": [],
          "description": "Storage item HrmpOpenChannelRequests",
          "returnType": "unknown"
        },
        "HrmpOpenChannelRequestsList": {
          "required": [],
          "optional": [],
          "description": "Storage item HrmpOpenChannelRequestsList",
          "returnType": "unknown"
        },
        "HrmpOpenChannelRequestCount": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item HrmpOpenChannelRequestCount",
          "returnType": "number"
        },
        "HrmpAcceptedChannelRequestCount": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item HrmpAcceptedChannelRequestCount",
          "returnType": "number"
        },
        "HrmpCloseChannelRequests": {
          "required": [
            "Anonymize_I50mrcbubp554e_"
          ],
          "optional": [],
          "description": "Storage item HrmpCloseChannelRequests",
          "returnType": "null"
        },
        "HrmpCloseChannelRequestsList": {
          "required": [],
          "optional": [],
          "description": "Storage item HrmpCloseChannelRequestsList",
          "returnType": "unknown"
        },
        "HrmpWatermarks": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item HrmpWatermarks",
          "returnType": "number"
        },
        "HrmpChannels": {
          "required": [
            "Anonymize_I50mrcbubp554e_"
          ],
          "optional": [],
          "description": "Storage item HrmpChannels",
          "returnType": "unknown"
        },
        "HrmpIngressChannelsIndex": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item HrmpIngressChannelsIndex",
          "returnType": "unknown"
        },
        "HrmpEgressChannelsIndex": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item HrmpEgressChannelsIndex",
          "returnType": "unknown"
        },
        "HrmpChannelContents": {
          "required": [
            "Anonymize_I50mrcbubp554e_"
          ],
          "optional": [],
          "description": "Storage item HrmpChannelContents",
          "returnType": "unknown"
        },
        "HrmpChannelDigests": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item HrmpChannelDigests",
          "returnType": "unknown"
        }
      },
      "ParaSessionInfo": {
        "AssignmentKeysUnsafe": {
          "required": [],
          "optional": [],
          "description": "Storage item AssignmentKeysUnsafe",
          "returnType": "unknown"
        },
        "EarliestStoredSession": {
          "required": [],
          "optional": [],
          "description": "Storage item EarliestStoredSession",
          "returnType": "number"
        },
        "Sessions": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item Sessions",
          "returnType": "unknown"
        },
        "AccountKeys": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item AccountKeys",
          "returnType": "unknown"
        },
        "SessionExecutorParams": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item SessionExecutorParams",
          "returnType": "unknown"
        }
      },
      "ParasDisputes": {
        "LastPrunedSession": {
          "required": [],
          "optional": [],
          "description": "Storage item LastPrunedSession",
          "returnType": "number"
        },
        "Disputes": {
          "required": [],
          "optional": [],
          "description": "Storage item Disputes",
          "returnType": "unknown"
        },
        "BackersOnDisputes": {
          "required": [],
          "optional": [],
          "description": "Storage item BackersOnDisputes",
          "returnType": "unknown"
        },
        "Included": {
          "required": [],
          "optional": [],
          "description": "Storage item Included",
          "returnType": "number"
        },
        "Frozen": {
          "required": [],
          "optional": [],
          "description": "Storage item Frozen",
          "returnType": "unknown"
        }
      },
      "ParasSlashing": {
        "UnappliedSlashes": {
          "required": [],
          "optional": [],
          "description": "Storage item UnappliedSlashes",
          "returnType": "unknown"
        },
        "ValidatorSetCounts": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item ValidatorSetCounts",
          "returnType": "number"
        }
      },
      "MessageQueue": {
        "BookStateFor": {
          "required": [
            "ParachainsInclusionAggregateMessageOrigin"
          ],
          "optional": [],
          "description": "Storage item BookStateFor",
          "returnType": "unknown"
        },
        "ServiceHead": {
          "required": [],
          "optional": [],
          "description": "Storage item ServiceHead",
          "returnType": "ParachainsInclusionAggregateMessageOrigin"
        },
        "Pages": {
          "required": [],
          "optional": [],
          "description": "Storage item Pages",
          "returnType": "unknown"
        }
      },
      "OnDemandAssignmentProvider": {
        "ParaIdAffinity": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item ParaIdAffinity",
          "returnType": "unknown"
        },
        "QueueStatus": {
          "required": [],
          "optional": [],
          "description": "Storage item QueueStatus",
          "returnType": "unknown"
        },
        "FreeEntries": {
          "required": [],
          "optional": [],
          "description": "Storage item FreeEntries",
          "returnType": "unknown"
        },
        "AffinityEntries": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item AffinityEntries",
          "returnType": "unknown"
        },
        "Revenue": {
          "required": [],
          "optional": [],
          "description": "Storage item Revenue",
          "returnType": "unknown"
        }
      },
      "CoretimeAssignmentProvider": {
        "CoreSchedules": {
          "required": [
            "Anonymize_I9jd27rnpm8ttv_"
          ],
          "optional": [],
          "description": "Storage item CoreSchedules",
          "returnType": "unknown"
        },
        "CoreDescriptors": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item CoreDescriptors",
          "returnType": "unknown"
        }
      },
      "Registrar": {
        "PendingSwap": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item PendingSwap",
          "returnType": "number"
        },
        "Paras": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item Paras",
          "returnType": "unknown"
        },
        "NextFreeParaId": {
          "required": [],
          "optional": [],
          "description": "Storage item NextFreeParaId",
          "returnType": "number"
        }
      },
      "Slots": {
        "Leases": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item Leases",
          "returnType": "unknown"
        }
      },
      "Auctions": {
        "AuctionCounter": {
          "required": [],
          "optional": [],
          "description": "Storage item AuctionCounter",
          "returnType": "number"
        },
        "AuctionInfo": {
          "required": [],
          "optional": [],
          "description": "Storage item AuctionInfo",
          "returnType": "unknown"
        },
        "ReservedAmounts": {
          "required": [
            "Anonymize_I6ouflveob4eli_"
          ],
          "optional": [],
          "description": "Storage item ReservedAmounts",
          "returnType": "bigint"
        },
        "Winning": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item Winning",
          "returnType": "unknown"
        }
      },
      "Crowdloan": {
        "Funds": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item Funds",
          "returnType": "unknown"
        },
        "NewRaise": {
          "required": [],
          "optional": [],
          "description": "Storage item NewRaise",
          "returnType": "unknown"
        },
        "EndingsCount": {
          "required": [],
          "optional": [],
          "description": "Storage item EndingsCount",
          "returnType": "number"
        },
        "NextFundIndex": {
          "required": [],
          "optional": [],
          "description": "Storage item NextFundIndex",
          "returnType": "number"
        }
      },
      "XcmPallet": {
        "QueryCounter": {
          "required": [],
          "optional": [],
          "description": "Storage item QueryCounter",
          "returnType": "bigint"
        },
        "Queries": {
          "required": [
            "u64"
          ],
          "optional": [],
          "description": "Storage item Queries",
          "returnType": "XcmPalletQueryStatus"
        },
        "AssetTraps": {
          "required": [
            "Hash"
          ],
          "optional": [],
          "description": "Storage item AssetTraps",
          "returnType": "number"
        },
        "SafeXcmVersion": {
          "required": [],
          "optional": [],
          "description": "Storage item SafeXcmVersion",
          "returnType": "number"
        },
        "SupportedVersion": {
          "required": [],
          "optional": [],
          "description": "Storage item SupportedVersion",
          "returnType": "number"
        },
        "VersionNotifiers": {
          "required": [],
          "optional": [],
          "description": "Storage item VersionNotifiers",
          "returnType": "bigint"
        },
        "VersionNotifyTargets": {
          "required": [],
          "optional": [],
          "description": "Storage item VersionNotifyTargets",
          "returnType": "unknown"
        },
        "VersionDiscoveryQueue": {
          "required": [],
          "optional": [],
          "description": "Storage item VersionDiscoveryQueue",
          "returnType": "unknown"
        },
        "CurrentMigration": {
          "required": [],
          "optional": [],
          "description": "Storage item CurrentMigration",
          "returnType": "XcmPalletVersionMigrationStage"
        },
        "RemoteLockedFungibles": {
          "required": [],
          "optional": [],
          "description": "Storage item RemoteLockedFungibles",
          "returnType": "unknown"
        },
        "LockedFungibles": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item LockedFungibles",
          "returnType": "unknown"
        },
        "XcmExecutionSuspended": {
          "required": [],
          "optional": [],
          "description": "Storage item XcmExecutionSuspended",
          "returnType": "boolean"
        },
        "ShouldRecordXcm": {
          "required": [],
          "optional": [],
          "description": "Storage item ShouldRecordXcm",
          "returnType": "boolean"
        },
        "RecordedXcm": {
          "required": [],
          "optional": [],
          "description": "Storage item RecordedXcm",
          "returnType": "unknown"
        }
      },
      "Beefy": {
        "Authorities": {
          "required": [],
          "optional": [],
          "description": "Storage item Authorities",
          "returnType": "unknown"
        },
        "ValidatorSetId": {
          "required": [],
          "optional": [],
          "description": "Storage item ValidatorSetId",
          "returnType": "bigint"
        },
        "NextAuthorities": {
          "required": [],
          "optional": [],
          "description": "Storage item NextAuthorities",
          "returnType": "unknown"
        },
        "SetIdSession": {
          "required": [
            "u64"
          ],
          "optional": [],
          "description": "Storage item SetIdSession",
          "returnType": "number"
        },
        "GenesisBlock": {
          "required": [],
          "optional": [],
          "description": "Storage item GenesisBlock",
          "returnType": "unknown"
        }
      },
      "Mmr": {
        "RootHash": {
          "required": [],
          "optional": [],
          "description": "Storage item RootHash",
          "returnType": "Hash"
        },
        "NumberOfLeaves": {
          "required": [],
          "optional": [],
          "description": "Storage item NumberOfLeaves",
          "returnType": "bigint"
        },
        "Nodes": {
          "required": [
            "u64"
          ],
          "optional": [],
          "description": "Storage item Nodes",
          "returnType": "Hash"
        }
      },
      "MmrLeaf": {
        "BeefyAuthorities": {
          "required": [],
          "optional": [],
          "description": "Storage item BeefyAuthorities",
          "returnType": "unknown"
        },
        "BeefyNextAuthorities": {
          "required": [],
          "optional": [],
          "description": "Storage item BeefyNextAuthorities",
          "returnType": "unknown"
        }
      },
      "AssignedSlots": {
        "PermanentSlots": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item PermanentSlots",
          "returnType": "unknown"
        },
        "PermanentSlotCount": {
          "required": [],
          "optional": [],
          "description": "Storage item PermanentSlotCount",
          "returnType": "number"
        },
        "TemporarySlots": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item TemporarySlots",
          "returnType": "unknown"
        },
        "TemporarySlotCount": {
          "required": [],
          "optional": [],
          "description": "Storage item TemporarySlotCount",
          "returnType": "number"
        },
        "ActiveTemporarySlotCount": {
          "required": [],
          "optional": [],
          "description": "Storage item ActiveTemporarySlotCount",
          "returnType": "number"
        },
        "MaxTemporarySlots": {
          "required": [],
          "optional": [],
          "description": "Storage item MaxTemporarySlots",
          "returnType": "number"
        },
        "MaxPermanentSlots": {
          "required": [],
          "optional": [],
          "description": "Storage item MaxPermanentSlots",
          "returnType": "number"
        }
      },
      "ValidatorManager": {
        "ValidatorsToRetire": {
          "required": [],
          "optional": [],
          "description": "Storage item ValidatorsToRetire",
          "returnType": "unknown"
        },
        "ValidatorsToAdd": {
          "required": [],
          "optional": [],
          "description": "Storage item ValidatorsToAdd",
          "returnType": "unknown"
        }
      },
      "StateTrieMigration": {
        "MigrationProcess": {
          "required": [],
          "optional": [],
          "description": "Storage item MigrationProcess",
          "returnType": "unknown"
        },
        "AutoLimits": {
          "required": [],
          "optional": [],
          "description": "Storage item AutoLimits",
          "returnType": "unknown"
        },
        "SignedMigrationMaxLimits": {
          "required": [],
          "optional": [],
          "description": "Storage item SignedMigrationMaxLimits",
          "returnType": "unknown"
        }
      },
      "Sudo": {
        "Key": {
          "required": [],
          "optional": [],
          "description": "Storage item Key",
          "returnType": "string"
        }
      }
    }
  },
  "westend": {
    "pallets": {
      "System": {
        "Account": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Account",
          "returnType": "unknown"
        },
        "ExtrinsicCount": {
          "required": [],
          "optional": [],
          "description": "Storage item ExtrinsicCount",
          "returnType": "number"
        },
        "InherentsApplied": {
          "required": [],
          "optional": [],
          "description": "Storage item InherentsApplied",
          "returnType": "boolean"
        },
        "BlockWeight": {
          "required": [],
          "optional": [],
          "description": "Storage item BlockWeight",
          "returnType": "unknown"
        },
        "AllExtrinsicsLen": {
          "required": [],
          "optional": [],
          "description": "Storage item AllExtrinsicsLen",
          "returnType": "number"
        },
        "BlockHash": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item BlockHash",
          "returnType": "Hash"
        },
        "ExtrinsicData": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item ExtrinsicData",
          "returnType": "Uint8Array"
        },
        "Number": {
          "required": [],
          "optional": [],
          "description": "Storage item Number",
          "returnType": "number"
        },
        "ParentHash": {
          "required": [],
          "optional": [],
          "description": "Storage item ParentHash",
          "returnType": "Hash"
        },
        "Digest": {
          "required": [],
          "optional": [],
          "description": "Storage item Digest",
          "returnType": "unknown"
        },
        "Events": {
          "required": [],
          "optional": [],
          "description": "Storage item Events",
          "returnType": "unknown"
        },
        "EventCount": {
          "required": [],
          "optional": [],
          "description": "Storage item EventCount",
          "returnType": "number"
        },
        "EventTopics": {
          "required": [
            "Hash"
          ],
          "optional": [],
          "description": "Storage item EventTopics",
          "returnType": "unknown"
        },
        "LastRuntimeUpgrade": {
          "required": [],
          "optional": [],
          "description": "Storage item LastRuntimeUpgrade",
          "returnType": "unknown"
        },
        "UpgradedToU32RefCount": {
          "required": [],
          "optional": [],
          "description": "Storage item UpgradedToU32RefCount",
          "returnType": "boolean"
        },
        "UpgradedToTripleRefCount": {
          "required": [],
          "optional": [],
          "description": "Storage item UpgradedToTripleRefCount",
          "returnType": "boolean"
        },
        "ExecutionPhase": {
          "required": [],
          "optional": [],
          "description": "Storage item ExecutionPhase",
          "returnType": "Phase"
        },
        "AuthorizedUpgrade": {
          "required": [],
          "optional": [],
          "description": "Storage item AuthorizedUpgrade",
          "returnType": "unknown"
        },
        "ExtrinsicWeightReclaimed": {
          "required": [],
          "optional": [],
          "description": "Storage item ExtrinsicWeightReclaimed",
          "returnType": "unknown"
        }
      },
      "Babe": {
        "EpochIndex": {
          "required": [],
          "optional": [],
          "description": "Storage item EpochIndex",
          "returnType": "bigint"
        },
        "Authorities": {
          "required": [],
          "optional": [],
          "description": "Storage item Authorities",
          "returnType": "unknown"
        },
        "GenesisSlot": {
          "required": [],
          "optional": [],
          "description": "Storage item GenesisSlot",
          "returnType": "bigint"
        },
        "CurrentSlot": {
          "required": [],
          "optional": [],
          "description": "Storage item CurrentSlot",
          "returnType": "bigint"
        },
        "Randomness": {
          "required": [],
          "optional": [],
          "description": "Storage item Randomness",
          "returnType": "Hash"
        },
        "PendingEpochConfigChange": {
          "required": [],
          "optional": [],
          "description": "Storage item PendingEpochConfigChange",
          "returnType": "BabeDigestsNextConfigDescriptor"
        },
        "NextRandomness": {
          "required": [],
          "optional": [],
          "description": "Storage item NextRandomness",
          "returnType": "Hash"
        },
        "NextAuthorities": {
          "required": [],
          "optional": [],
          "description": "Storage item NextAuthorities",
          "returnType": "unknown"
        },
        "SegmentIndex": {
          "required": [],
          "optional": [],
          "description": "Storage item SegmentIndex",
          "returnType": "number"
        },
        "UnderConstruction": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item UnderConstruction",
          "returnType": "unknown"
        },
        "Initialized": {
          "required": [],
          "optional": [],
          "description": "Storage item Initialized",
          "returnType": "unknown"
        },
        "AuthorVrfRandomness": {
          "required": [],
          "optional": [],
          "description": "Storage item AuthorVrfRandomness",
          "returnType": "unknown"
        },
        "EpochStart": {
          "required": [],
          "optional": [],
          "description": "Storage item EpochStart",
          "returnType": "unknown"
        },
        "Lateness": {
          "required": [],
          "optional": [],
          "description": "Storage item Lateness",
          "returnType": "number"
        },
        "EpochConfig": {
          "required": [],
          "optional": [],
          "description": "Storage item EpochConfig",
          "returnType": "unknown"
        },
        "NextEpochConfig": {
          "required": [],
          "optional": [],
          "description": "Storage item NextEpochConfig",
          "returnType": "unknown"
        },
        "SkippedEpochs": {
          "required": [],
          "optional": [],
          "description": "Storage item SkippedEpochs",
          "returnType": "unknown"
        }
      },
      "Timestamp": {
        "Now": {
          "required": [],
          "optional": [],
          "description": "Storage item Now",
          "returnType": "bigint"
        },
        "DidUpdate": {
          "required": [],
          "optional": [],
          "description": "Storage item DidUpdate",
          "returnType": "boolean"
        }
      },
      "Indices": {
        "Accounts": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item Accounts",
          "returnType": "unknown"
        }
      },
      "Balances": {
        "TotalIssuance": {
          "required": [],
          "optional": [],
          "description": "Storage item TotalIssuance",
          "returnType": "bigint"
        },
        "InactiveIssuance": {
          "required": [],
          "optional": [],
          "description": "Storage item InactiveIssuance",
          "returnType": "bigint"
        },
        "Account": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Account",
          "returnType": "unknown"
        },
        "Locks": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Locks",
          "returnType": "unknown"
        },
        "Reserves": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Reserves",
          "returnType": "unknown"
        },
        "Holds": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Holds",
          "returnType": "unknown"
        },
        "Freezes": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Freezes",
          "returnType": "unknown"
        }
      },
      "TransactionPayment": {
        "NextFeeMultiplier": {
          "required": [],
          "optional": [],
          "description": "Storage item NextFeeMultiplier",
          "returnType": "bigint"
        },
        "StorageVersion": {
          "required": [],
          "optional": [],
          "description": "Storage item StorageVersion",
          "returnType": "TransactionPaymentReleases"
        }
      },
      "Authorship": {
        "Author": {
          "required": [],
          "optional": [],
          "description": "Storage item Author",
          "returnType": "string"
        }
      },
      "Staking": {
        "ValidatorCount": {
          "required": [],
          "optional": [],
          "description": "Storage item ValidatorCount",
          "returnType": "number"
        },
        "MinimumValidatorCount": {
          "required": [],
          "optional": [],
          "description": "Storage item MinimumValidatorCount",
          "returnType": "number"
        },
        "Invulnerables": {
          "required": [],
          "optional": [],
          "description": "Storage item Invulnerables",
          "returnType": "unknown"
        },
        "Bonded": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Bonded",
          "returnType": "string"
        },
        "MinNominatorBond": {
          "required": [],
          "optional": [],
          "description": "Storage item MinNominatorBond",
          "returnType": "bigint"
        },
        "MinValidatorBond": {
          "required": [],
          "optional": [],
          "description": "Storage item MinValidatorBond",
          "returnType": "bigint"
        },
        "MinimumActiveStake": {
          "required": [],
          "optional": [],
          "description": "Storage item MinimumActiveStake",
          "returnType": "bigint"
        },
        "MinCommission": {
          "required": [],
          "optional": [],
          "description": "Storage item MinCommission",
          "returnType": "number"
        },
        "Ledger": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Ledger",
          "returnType": "unknown"
        },
        "Payee": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Payee",
          "returnType": "StakingRewardDestination"
        },
        "Validators": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Validators",
          "returnType": "unknown"
        },
        "CounterForValidators": {
          "required": [],
          "optional": [],
          "description": "Storage item CounterForValidators",
          "returnType": "number"
        },
        "MaxValidatorsCount": {
          "required": [],
          "optional": [],
          "description": "Storage item MaxValidatorsCount",
          "returnType": "number"
        },
        "Nominators": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Nominators",
          "returnType": "unknown"
        },
        "CounterForNominators": {
          "required": [],
          "optional": [],
          "description": "Storage item CounterForNominators",
          "returnType": "number"
        },
        "VirtualStakers": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item VirtualStakers",
          "returnType": "null"
        },
        "CounterForVirtualStakers": {
          "required": [],
          "optional": [],
          "description": "Storage item CounterForVirtualStakers",
          "returnType": "number"
        },
        "MaxNominatorsCount": {
          "required": [],
          "optional": [],
          "description": "Storage item MaxNominatorsCount",
          "returnType": "number"
        },
        "CurrentEra": {
          "required": [],
          "optional": [],
          "description": "Storage item CurrentEra",
          "returnType": "number"
        },
        "ActiveEra": {
          "required": [],
          "optional": [],
          "description": "Storage item ActiveEra",
          "returnType": "unknown"
        },
        "ErasStartSessionIndex": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item ErasStartSessionIndex",
          "returnType": "number"
        },
        "ErasStakers": {
          "required": [],
          "optional": [],
          "description": "Storage item ErasStakers",
          "returnType": "unknown"
        },
        "ErasStakersOverview": {
          "required": [],
          "optional": [],
          "description": "Storage item ErasStakersOverview",
          "returnType": "unknown"
        },
        "ErasStakersClipped": {
          "required": [],
          "optional": [],
          "description": "Storage item ErasStakersClipped",
          "returnType": "unknown"
        },
        "ErasStakersPaged": {
          "required": [],
          "optional": [],
          "description": "Storage item ErasStakersPaged",
          "returnType": "unknown"
        },
        "ClaimedRewards": {
          "required": [],
          "optional": [],
          "description": "Storage item ClaimedRewards",
          "returnType": "unknown"
        },
        "ErasValidatorPrefs": {
          "required": [],
          "optional": [],
          "description": "Storage item ErasValidatorPrefs",
          "returnType": "unknown"
        },
        "ErasValidatorReward": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item ErasValidatorReward",
          "returnType": "bigint"
        },
        "ErasRewardPoints": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item ErasRewardPoints",
          "returnType": "unknown"
        },
        "ErasTotalStake": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item ErasTotalStake",
          "returnType": "bigint"
        },
        "ForceEra": {
          "required": [],
          "optional": [],
          "description": "Storage item ForceEra",
          "returnType": "StakingForcing"
        },
        "MaxStakedRewards": {
          "required": [],
          "optional": [],
          "description": "Storage item MaxStakedRewards",
          "returnType": "number"
        },
        "SlashRewardFraction": {
          "required": [],
          "optional": [],
          "description": "Storage item SlashRewardFraction",
          "returnType": "number"
        },
        "CanceledSlashPayout": {
          "required": [],
          "optional": [],
          "description": "Storage item CanceledSlashPayout",
          "returnType": "bigint"
        },
        "UnappliedSlashes": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item UnappliedSlashes",
          "returnType": "unknown"
        },
        "BondedEras": {
          "required": [],
          "optional": [],
          "description": "Storage item BondedEras",
          "returnType": "unknown"
        },
        "ValidatorSlashInEra": {
          "required": [],
          "optional": [],
          "description": "Storage item ValidatorSlashInEra",
          "returnType": "unknown"
        },
        "NominatorSlashInEra": {
          "required": [],
          "optional": [],
          "description": "Storage item NominatorSlashInEra",
          "returnType": "bigint"
        },
        "SlashingSpans": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item SlashingSpans",
          "returnType": "unknown"
        },
        "SpanSlash": {
          "required": [
            "Anonymize_I6ouflveob4eli_"
          ],
          "optional": [],
          "description": "Storage item SpanSlash",
          "returnType": "unknown"
        },
        "CurrentPlannedSession": {
          "required": [],
          "optional": [],
          "description": "Storage item CurrentPlannedSession",
          "returnType": "number"
        },
        "ChillThreshold": {
          "required": [],
          "optional": [],
          "description": "Storage item ChillThreshold",
          "returnType": "number"
        }
      },
      "Offences": {
        "Reports": {
          "required": [
            "Hash"
          ],
          "optional": [],
          "description": "Storage item Reports",
          "returnType": "unknown"
        },
        "ConcurrentReportsIndex": {
          "required": [],
          "optional": [],
          "description": "Storage item ConcurrentReportsIndex",
          "returnType": "unknown"
        }
      },
      "Historical": {
        "HistoricalSessions": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item HistoricalSessions",
          "returnType": "unknown"
        },
        "StoredRange": {
          "required": [],
          "optional": [],
          "description": "Storage item StoredRange",
          "returnType": "unknown"
        }
      },
      "Parameters": {
        "Parameters": {
          "required": [
            "Anonymize_I9h43amtitrqum_"
          ],
          "optional": [],
          "description": "Storage item Parameters",
          "returnType": "unknown"
        }
      },
      "Session": {
        "Validators": {
          "required": [],
          "optional": [],
          "description": "Storage item Validators",
          "returnType": "unknown"
        },
        "CurrentIndex": {
          "required": [],
          "optional": [],
          "description": "Storage item CurrentIndex",
          "returnType": "number"
        },
        "QueuedChanged": {
          "required": [],
          "optional": [],
          "description": "Storage item QueuedChanged",
          "returnType": "boolean"
        },
        "QueuedKeys": {
          "required": [],
          "optional": [],
          "description": "Storage item QueuedKeys",
          "returnType": "unknown"
        },
        "DisabledValidators": {
          "required": [],
          "optional": [],
          "description": "Storage item DisabledValidators",
          "returnType": "unknown"
        },
        "NextKeys": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item NextKeys",
          "returnType": "unknown"
        },
        "KeyOwner": {
          "required": [
            "Anonymize_I82jm9g7pufuel_"
          ],
          "optional": [],
          "description": "Storage item KeyOwner",
          "returnType": "string"
        }
      },
      "Grandpa": {
        "State": {
          "required": [],
          "optional": [],
          "description": "Storage item State",
          "returnType": "GrandpaStoredState"
        },
        "PendingChange": {
          "required": [],
          "optional": [],
          "description": "Storage item PendingChange",
          "returnType": "unknown"
        },
        "NextForced": {
          "required": [],
          "optional": [],
          "description": "Storage item NextForced",
          "returnType": "number"
        },
        "Stalled": {
          "required": [],
          "optional": [],
          "description": "Storage item Stalled",
          "returnType": "unknown"
        },
        "CurrentSetId": {
          "required": [],
          "optional": [],
          "description": "Storage item CurrentSetId",
          "returnType": "bigint"
        },
        "SetIdSession": {
          "required": [
            "u64"
          ],
          "optional": [],
          "description": "Storage item SetIdSession",
          "returnType": "number"
        },
        "Authorities": {
          "required": [],
          "optional": [],
          "description": "Storage item Authorities",
          "returnType": "unknown"
        }
      },
      "AuthorityDiscovery": {
        "Keys": {
          "required": [],
          "optional": [],
          "description": "Storage item Keys",
          "returnType": "unknown"
        },
        "NextKeys": {
          "required": [],
          "optional": [],
          "description": "Storage item NextKeys",
          "returnType": "unknown"
        }
      },
      "Identity": {
        "IdentityOf": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item IdentityOf",
          "returnType": "unknown"
        },
        "UsernameOf": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item UsernameOf",
          "returnType": "Uint8Array"
        },
        "SuperOf": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item SuperOf",
          "returnType": "unknown"
        },
        "SubsOf": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item SubsOf",
          "returnType": "unknown"
        },
        "Registrars": {
          "required": [],
          "optional": [],
          "description": "Storage item Registrars",
          "returnType": "unknown"
        },
        "AuthorityOf": {
          "required": [
            "bytes"
          ],
          "optional": [],
          "description": "Storage item AuthorityOf",
          "returnType": "unknown"
        },
        "UsernameInfoOf": {
          "required": [
            "bytes"
          ],
          "optional": [],
          "description": "Storage item UsernameInfoOf",
          "returnType": "unknown"
        },
        "PendingUsernames": {
          "required": [
            "bytes"
          ],
          "optional": [],
          "description": "Storage item PendingUsernames",
          "returnType": "unknown"
        },
        "UnbindingUsernames": {
          "required": [
            "bytes"
          ],
          "optional": [],
          "description": "Storage item UnbindingUsernames",
          "returnType": "number"
        }
      },
      "Recovery": {
        "Recoverable": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Recoverable",
          "returnType": "unknown"
        },
        "ActiveRecoveries": {
          "required": [],
          "optional": [],
          "description": "Storage item ActiveRecoveries",
          "returnType": "unknown"
        },
        "Proxy": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Proxy",
          "returnType": "string"
        }
      },
      "Vesting": {
        "Vesting": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Vesting",
          "returnType": "unknown"
        },
        "StorageVersion": {
          "required": [],
          "optional": [],
          "description": "Storage item StorageVersion",
          "returnType": "Version"
        }
      },
      "Scheduler": {
        "IncompleteSince": {
          "required": [],
          "optional": [],
          "description": "Storage item IncompleteSince",
          "returnType": "number"
        },
        "Agenda": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item Agenda",
          "returnType": "unknown"
        },
        "Retries": {
          "required": [
            "Anonymize_I9jd27rnpm8ttv_"
          ],
          "optional": [],
          "description": "Storage item Retries",
          "returnType": "unknown"
        },
        "Lookup": {
          "required": [
            "Hash"
          ],
          "optional": [],
          "description": "Storage item Lookup",
          "returnType": "unknown"
        }
      },
      "Preimage": {
        "StatusFor": {
          "required": [
            "Hash"
          ],
          "optional": [],
          "description": "Storage item StatusFor",
          "returnType": "PreimageOldRequestStatus"
        },
        "RequestStatusFor": {
          "required": [
            "Hash"
          ],
          "optional": [],
          "description": "Storage item RequestStatusFor",
          "returnType": "PreimageRequestStatus"
        },
        "PreimageFor": {
          "required": [
            "Anonymize_I4pact7n2e9a0i_"
          ],
          "optional": [],
          "description": "Storage item PreimageFor",
          "returnType": "Uint8Array"
        }
      },
      "Sudo": {
        "Key": {
          "required": [],
          "optional": [],
          "description": "Storage item Key",
          "returnType": "string"
        }
      },
      "Proxy": {
        "Proxies": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Proxies",
          "returnType": "unknown"
        },
        "Announcements": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Announcements",
          "returnType": "unknown"
        }
      },
      "Multisig": {
        "Multisigs": {
          "required": [],
          "optional": [],
          "description": "Storage item Multisigs",
          "returnType": "unknown"
        }
      },
      "ElectionProviderMultiPhase": {
        "Round": {
          "required": [],
          "optional": [],
          "description": "Storage item Round",
          "returnType": "number"
        },
        "CurrentPhase": {
          "required": [],
          "optional": [],
          "description": "Storage item CurrentPhase",
          "returnType": "ElectionProviderMultiPhasePhase"
        },
        "QueuedSolution": {
          "required": [],
          "optional": [],
          "description": "Storage item QueuedSolution",
          "returnType": "unknown"
        },
        "Snapshot": {
          "required": [],
          "optional": [],
          "description": "Storage item Snapshot",
          "returnType": "unknown"
        },
        "DesiredTargets": {
          "required": [],
          "optional": [],
          "description": "Storage item DesiredTargets",
          "returnType": "number"
        },
        "SnapshotMetadata": {
          "required": [],
          "optional": [],
          "description": "Storage item SnapshotMetadata",
          "returnType": "unknown"
        },
        "SignedSubmissionNextIndex": {
          "required": [],
          "optional": [],
          "description": "Storage item SignedSubmissionNextIndex",
          "returnType": "number"
        },
        "SignedSubmissionIndices": {
          "required": [],
          "optional": [],
          "description": "Storage item SignedSubmissionIndices",
          "returnType": "unknown"
        },
        "SignedSubmissionsMap": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item SignedSubmissionsMap",
          "returnType": "unknown"
        },
        "MinimumUntrustedScore": {
          "required": [],
          "optional": [],
          "description": "Storage item MinimumUntrustedScore",
          "returnType": "unknown"
        }
      },
      "VoterList": {
        "ListNodes": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item ListNodes",
          "returnType": "unknown"
        },
        "CounterForListNodes": {
          "required": [],
          "optional": [],
          "description": "Storage item CounterForListNodes",
          "returnType": "number"
        },
        "ListBags": {
          "required": [
            "u64"
          ],
          "optional": [],
          "description": "Storage item ListBags",
          "returnType": "unknown"
        },
        "NextNodeAutoRebagged": {
          "required": [],
          "optional": [],
          "description": "Storage item NextNodeAutoRebagged",
          "returnType": "string"
        },
        "Lock": {
          "required": [],
          "optional": [],
          "description": "Storage item Lock",
          "returnType": "null"
        }
      },
      "NominationPools": {
        "TotalValueLocked": {
          "required": [],
          "optional": [],
          "description": "Storage item TotalValueLocked",
          "returnType": "bigint"
        },
        "MinJoinBond": {
          "required": [],
          "optional": [],
          "description": "Storage item MinJoinBond",
          "returnType": "bigint"
        },
        "MinCreateBond": {
          "required": [],
          "optional": [],
          "description": "Storage item MinCreateBond",
          "returnType": "bigint"
        },
        "MaxPools": {
          "required": [],
          "optional": [],
          "description": "Storage item MaxPools",
          "returnType": "number"
        },
        "MaxPoolMembers": {
          "required": [],
          "optional": [],
          "description": "Storage item MaxPoolMembers",
          "returnType": "number"
        },
        "MaxPoolMembersPerPool": {
          "required": [],
          "optional": [],
          "description": "Storage item MaxPoolMembersPerPool",
          "returnType": "number"
        },
        "GlobalMaxCommission": {
          "required": [],
          "optional": [],
          "description": "Storage item GlobalMaxCommission",
          "returnType": "number"
        },
        "PoolMembers": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item PoolMembers",
          "returnType": "unknown"
        },
        "CounterForPoolMembers": {
          "required": [],
          "optional": [],
          "description": "Storage item CounterForPoolMembers",
          "returnType": "number"
        },
        "BondedPools": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item BondedPools",
          "returnType": "unknown"
        },
        "CounterForBondedPools": {
          "required": [],
          "optional": [],
          "description": "Storage item CounterForBondedPools",
          "returnType": "number"
        },
        "RewardPools": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item RewardPools",
          "returnType": "unknown"
        },
        "CounterForRewardPools": {
          "required": [],
          "optional": [],
          "description": "Storage item CounterForRewardPools",
          "returnType": "number"
        },
        "SubPoolsStorage": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item SubPoolsStorage",
          "returnType": "unknown"
        },
        "CounterForSubPoolsStorage": {
          "required": [],
          "optional": [],
          "description": "Storage item CounterForSubPoolsStorage",
          "returnType": "number"
        },
        "Metadata": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item Metadata",
          "returnType": "Uint8Array"
        },
        "CounterForMetadata": {
          "required": [],
          "optional": [],
          "description": "Storage item CounterForMetadata",
          "returnType": "number"
        },
        "LastPoolId": {
          "required": [],
          "optional": [],
          "description": "Storage item LastPoolId",
          "returnType": "number"
        },
        "ReversePoolIdLookup": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item ReversePoolIdLookup",
          "returnType": "number"
        },
        "CounterForReversePoolIdLookup": {
          "required": [],
          "optional": [],
          "description": "Storage item CounterForReversePoolIdLookup",
          "returnType": "number"
        },
        "ClaimPermissions": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item ClaimPermissions",
          "returnType": "NominationPoolsClaimPermission"
        }
      },
      "FastUnstake": {
        "Head": {
          "required": [],
          "optional": [],
          "description": "Storage item Head",
          "returnType": "unknown"
        },
        "Queue": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Queue",
          "returnType": "bigint"
        },
        "CounterForQueue": {
          "required": [],
          "optional": [],
          "description": "Storage item CounterForQueue",
          "returnType": "number"
        },
        "ErasToCheckPerBlock": {
          "required": [],
          "optional": [],
          "description": "Storage item ErasToCheckPerBlock",
          "returnType": "number"
        }
      },
      "ConvictionVoting": {
        "VotingFor": {
          "required": [],
          "optional": [],
          "description": "Storage item VotingFor",
          "returnType": "ConvictionVotingVoteVoting"
        },
        "ClassLocksFor": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item ClassLocksFor",
          "returnType": "unknown"
        }
      },
      "Referenda": {
        "ReferendumCount": {
          "required": [],
          "optional": [],
          "description": "Storage item ReferendumCount",
          "returnType": "number"
        },
        "ReferendumInfoFor": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item ReferendumInfoFor",
          "returnType": "unknown"
        },
        "TrackQueue": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item TrackQueue",
          "returnType": "unknown"
        },
        "DecidingCount": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item DecidingCount",
          "returnType": "number"
        },
        "MetadataOf": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item MetadataOf",
          "returnType": "Hash"
        }
      },
      "Whitelist": {
        "WhitelistedCall": {
          "required": [
            "Hash"
          ],
          "optional": [],
          "description": "Storage item WhitelistedCall",
          "returnType": "null"
        }
      },
      "Treasury": {
        "ProposalCount": {
          "required": [],
          "optional": [],
          "description": "Storage item ProposalCount",
          "returnType": "number"
        },
        "Proposals": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item Proposals",
          "returnType": "unknown"
        },
        "Deactivated": {
          "required": [],
          "optional": [],
          "description": "Storage item Deactivated",
          "returnType": "bigint"
        },
        "Approvals": {
          "required": [],
          "optional": [],
          "description": "Storage item Approvals",
          "returnType": "unknown"
        },
        "SpendCount": {
          "required": [],
          "optional": [],
          "description": "Storage item SpendCount",
          "returnType": "number"
        },
        "Spends": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item Spends",
          "returnType": "unknown"
        },
        "LastSpendPeriod": {
          "required": [],
          "optional": [],
          "description": "Storage item LastSpendPeriod",
          "returnType": "number"
        }
      },
      "DelegatedStaking": {
        "Delegators": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Delegators",
          "returnType": "unknown"
        },
        "CounterForDelegators": {
          "required": [],
          "optional": [],
          "description": "Storage item CounterForDelegators",
          "returnType": "number"
        },
        "Agents": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Agents",
          "returnType": "unknown"
        },
        "CounterForAgents": {
          "required": [],
          "optional": [],
          "description": "Storage item CounterForAgents",
          "returnType": "number"
        }
      },
      "Configuration": {
        "ActiveConfig": {
          "required": [],
          "optional": [],
          "description": "Storage item ActiveConfig",
          "returnType": "unknown"
        },
        "PendingConfigs": {
          "required": [],
          "optional": [],
          "description": "Storage item PendingConfigs",
          "returnType": "unknown"
        },
        "BypassConsistencyCheck": {
          "required": [],
          "optional": [],
          "description": "Storage item BypassConsistencyCheck",
          "returnType": "boolean"
        }
      },
      "ParasShared": {
        "CurrentSessionIndex": {
          "required": [],
          "optional": [],
          "description": "Storage item CurrentSessionIndex",
          "returnType": "number"
        },
        "ActiveValidatorIndices": {
          "required": [],
          "optional": [],
          "description": "Storage item ActiveValidatorIndices",
          "returnType": "unknown"
        },
        "ActiveValidatorKeys": {
          "required": [],
          "optional": [],
          "description": "Storage item ActiveValidatorKeys",
          "returnType": "unknown"
        },
        "AllowedRelayParents": {
          "required": [],
          "optional": [],
          "description": "Storage item AllowedRelayParents",
          "returnType": "unknown"
        }
      },
      "ParaInclusion": {
        "V1": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item V1",
          "returnType": "unknown"
        }
      },
      "ParaInherent": {
        "Included": {
          "required": [],
          "optional": [],
          "description": "Storage item Included",
          "returnType": "null"
        },
        "OnChainVotes": {
          "required": [],
          "optional": [],
          "description": "Storage item OnChainVotes",
          "returnType": "unknown"
        }
      },
      "ParaScheduler": {
        "ValidatorGroups": {
          "required": [],
          "optional": [],
          "description": "Storage item ValidatorGroups",
          "returnType": "unknown"
        },
        "SessionStartBlock": {
          "required": [],
          "optional": [],
          "description": "Storage item SessionStartBlock",
          "returnType": "number"
        },
        "ClaimQueue": {
          "required": [],
          "optional": [],
          "description": "Storage item ClaimQueue",
          "returnType": "unknown"
        }
      },
      "Paras": {
        "PvfActiveVoteMap": {
          "required": [
            "Hash"
          ],
          "optional": [],
          "description": "Storage item PvfActiveVoteMap",
          "returnType": "unknown"
        },
        "PvfActiveVoteList": {
          "required": [],
          "optional": [],
          "description": "Storage item PvfActiveVoteList",
          "returnType": "unknown"
        },
        "Parachains": {
          "required": [],
          "optional": [],
          "description": "Storage item Parachains",
          "returnType": "unknown"
        },
        "ParaLifecycles": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item ParaLifecycles",
          "returnType": "ParachainsParasParaLifecycle"
        },
        "Heads": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item Heads",
          "returnType": "Uint8Array"
        },
        "MostRecentContext": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item MostRecentContext",
          "returnType": "number"
        },
        "CurrentCodeHash": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item CurrentCodeHash",
          "returnType": "Hash"
        },
        "PastCodeHash": {
          "required": [
            "Anonymize_I9jd27rnpm8ttv_"
          ],
          "optional": [],
          "description": "Storage item PastCodeHash",
          "returnType": "Hash"
        },
        "PastCodeMeta": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item PastCodeMeta",
          "returnType": "unknown"
        },
        "PastCodePruning": {
          "required": [],
          "optional": [],
          "description": "Storage item PastCodePruning",
          "returnType": "unknown"
        },
        "FutureCodeUpgrades": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item FutureCodeUpgrades",
          "returnType": "number"
        },
        "FutureCodeUpgradesAt": {
          "required": [],
          "optional": [],
          "description": "Storage item FutureCodeUpgradesAt",
          "returnType": "unknown"
        },
        "FutureCodeHash": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item FutureCodeHash",
          "returnType": "Hash"
        },
        "AuthorizedCodeHash": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item AuthorizedCodeHash",
          "returnType": "unknown"
        },
        "UpgradeGoAheadSignal": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item UpgradeGoAheadSignal",
          "returnType": "UpgradeGoAhead"
        },
        "UpgradeRestrictionSignal": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item UpgradeRestrictionSignal",
          "returnType": "UpgradeRestriction"
        },
        "UpgradeCooldowns": {
          "required": [],
          "optional": [],
          "description": "Storage item UpgradeCooldowns",
          "returnType": "unknown"
        },
        "UpcomingUpgrades": {
          "required": [],
          "optional": [],
          "description": "Storage item UpcomingUpgrades",
          "returnType": "unknown"
        },
        "ActionsQueue": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item ActionsQueue",
          "returnType": "unknown"
        },
        "UpcomingParasGenesis": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item UpcomingParasGenesis",
          "returnType": "unknown"
        },
        "CodeByHashRefs": {
          "required": [
            "Hash"
          ],
          "optional": [],
          "description": "Storage item CodeByHashRefs",
          "returnType": "number"
        },
        "CodeByHash": {
          "required": [
            "Hash"
          ],
          "optional": [],
          "description": "Storage item CodeByHash",
          "returnType": "Uint8Array"
        }
      },
      "Initializer": {
        "HasInitialized": {
          "required": [],
          "optional": [],
          "description": "Storage item HasInitialized",
          "returnType": "null"
        },
        "BufferedSessionChanges": {
          "required": [],
          "optional": [],
          "description": "Storage item BufferedSessionChanges",
          "returnType": "unknown"
        }
      },
      "Dmp": {
        "DownwardMessageQueues": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item DownwardMessageQueues",
          "returnType": "unknown"
        },
        "DownwardMessageQueueHeads": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item DownwardMessageQueueHeads",
          "returnType": "Hash"
        },
        "DeliveryFeeFactor": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item DeliveryFeeFactor",
          "returnType": "bigint"
        }
      },
      "Hrmp": {
        "HrmpOpenChannelRequests": {
          "required": [
            "Anonymize_I50mrcbubp554e_"
          ],
          "optional": [],
          "description": "Storage item HrmpOpenChannelRequests",
          "returnType": "unknown"
        },
        "HrmpOpenChannelRequestsList": {
          "required": [],
          "optional": [],
          "description": "Storage item HrmpOpenChannelRequestsList",
          "returnType": "unknown"
        },
        "HrmpOpenChannelRequestCount": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item HrmpOpenChannelRequestCount",
          "returnType": "number"
        },
        "HrmpAcceptedChannelRequestCount": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item HrmpAcceptedChannelRequestCount",
          "returnType": "number"
        },
        "HrmpCloseChannelRequests": {
          "required": [
            "Anonymize_I50mrcbubp554e_"
          ],
          "optional": [],
          "description": "Storage item HrmpCloseChannelRequests",
          "returnType": "null"
        },
        "HrmpCloseChannelRequestsList": {
          "required": [],
          "optional": [],
          "description": "Storage item HrmpCloseChannelRequestsList",
          "returnType": "unknown"
        },
        "HrmpWatermarks": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item HrmpWatermarks",
          "returnType": "number"
        },
        "HrmpChannels": {
          "required": [
            "Anonymize_I50mrcbubp554e_"
          ],
          "optional": [],
          "description": "Storage item HrmpChannels",
          "returnType": "unknown"
        },
        "HrmpIngressChannelsIndex": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item HrmpIngressChannelsIndex",
          "returnType": "unknown"
        },
        "HrmpEgressChannelsIndex": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item HrmpEgressChannelsIndex",
          "returnType": "unknown"
        },
        "HrmpChannelContents": {
          "required": [
            "Anonymize_I50mrcbubp554e_"
          ],
          "optional": [],
          "description": "Storage item HrmpChannelContents",
          "returnType": "unknown"
        },
        "HrmpChannelDigests": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item HrmpChannelDigests",
          "returnType": "unknown"
        }
      },
      "ParaSessionInfo": {
        "AssignmentKeysUnsafe": {
          "required": [],
          "optional": [],
          "description": "Storage item AssignmentKeysUnsafe",
          "returnType": "unknown"
        },
        "EarliestStoredSession": {
          "required": [],
          "optional": [],
          "description": "Storage item EarliestStoredSession",
          "returnType": "number"
        },
        "Sessions": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item Sessions",
          "returnType": "unknown"
        },
        "AccountKeys": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item AccountKeys",
          "returnType": "unknown"
        },
        "SessionExecutorParams": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item SessionExecutorParams",
          "returnType": "unknown"
        }
      },
      "ParasDisputes": {
        "LastPrunedSession": {
          "required": [],
          "optional": [],
          "description": "Storage item LastPrunedSession",
          "returnType": "number"
        },
        "Disputes": {
          "required": [],
          "optional": [],
          "description": "Storage item Disputes",
          "returnType": "unknown"
        },
        "BackersOnDisputes": {
          "required": [],
          "optional": [],
          "description": "Storage item BackersOnDisputes",
          "returnType": "unknown"
        },
        "Included": {
          "required": [],
          "optional": [],
          "description": "Storage item Included",
          "returnType": "number"
        },
        "Frozen": {
          "required": [],
          "optional": [],
          "description": "Storage item Frozen",
          "returnType": "unknown"
        }
      },
      "ParasSlashing": {
        "UnappliedSlashes": {
          "required": [],
          "optional": [],
          "description": "Storage item UnappliedSlashes",
          "returnType": "unknown"
        },
        "ValidatorSetCounts": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item ValidatorSetCounts",
          "returnType": "number"
        }
      },
      "OnDemandAssignmentProvider": {
        "ParaIdAffinity": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item ParaIdAffinity",
          "returnType": "unknown"
        },
        "QueueStatus": {
          "required": [],
          "optional": [],
          "description": "Storage item QueueStatus",
          "returnType": "unknown"
        },
        "FreeEntries": {
          "required": [],
          "optional": [],
          "description": "Storage item FreeEntries",
          "returnType": "unknown"
        },
        "AffinityEntries": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item AffinityEntries",
          "returnType": "unknown"
        },
        "Revenue": {
          "required": [],
          "optional": [],
          "description": "Storage item Revenue",
          "returnType": "unknown"
        },
        "Credits": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item Credits",
          "returnType": "bigint"
        }
      },
      "CoretimeAssignmentProvider": {
        "CoreSchedules": {
          "required": [
            "Anonymize_I9jd27rnpm8ttv_"
          ],
          "optional": [],
          "description": "Storage item CoreSchedules",
          "returnType": "unknown"
        },
        "CoreDescriptors": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item CoreDescriptors",
          "returnType": "unknown"
        }
      },
      "Registrar": {
        "PendingSwap": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item PendingSwap",
          "returnType": "number"
        },
        "Paras": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item Paras",
          "returnType": "unknown"
        },
        "NextFreeParaId": {
          "required": [],
          "optional": [],
          "description": "Storage item NextFreeParaId",
          "returnType": "number"
        }
      },
      "Slots": {
        "Leases": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item Leases",
          "returnType": "unknown"
        }
      },
      "Auctions": {
        "AuctionCounter": {
          "required": [],
          "optional": [],
          "description": "Storage item AuctionCounter",
          "returnType": "number"
        },
        "AuctionInfo": {
          "required": [],
          "optional": [],
          "description": "Storage item AuctionInfo",
          "returnType": "unknown"
        },
        "ReservedAmounts": {
          "required": [
            "Anonymize_I6ouflveob4eli_"
          ],
          "optional": [],
          "description": "Storage item ReservedAmounts",
          "returnType": "bigint"
        },
        "Winning": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item Winning",
          "returnType": "unknown"
        }
      },
      "Crowdloan": {
        "Funds": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item Funds",
          "returnType": "unknown"
        },
        "NewRaise": {
          "required": [],
          "optional": [],
          "description": "Storage item NewRaise",
          "returnType": "unknown"
        },
        "EndingsCount": {
          "required": [],
          "optional": [],
          "description": "Storage item EndingsCount",
          "returnType": "number"
        },
        "NextFundIndex": {
          "required": [],
          "optional": [],
          "description": "Storage item NextFundIndex",
          "returnType": "number"
        }
      },
      "AssignedSlots": {
        "PermanentSlots": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item PermanentSlots",
          "returnType": "unknown"
        },
        "PermanentSlotCount": {
          "required": [],
          "optional": [],
          "description": "Storage item PermanentSlotCount",
          "returnType": "number"
        },
        "TemporarySlots": {
          "required": [
            "u32"
          ],
          "optional": [],
          "description": "Storage item TemporarySlots",
          "returnType": "unknown"
        },
        "TemporarySlotCount": {
          "required": [],
          "optional": [],
          "description": "Storage item TemporarySlotCount",
          "returnType": "number"
        },
        "ActiveTemporarySlotCount": {
          "required": [],
          "optional": [],
          "description": "Storage item ActiveTemporarySlotCount",
          "returnType": "number"
        },
        "MaxTemporarySlots": {
          "required": [],
          "optional": [],
          "description": "Storage item MaxTemporarySlots",
          "returnType": "number"
        },
        "MaxPermanentSlots": {
          "required": [],
          "optional": [],
          "description": "Storage item MaxPermanentSlots",
          "returnType": "number"
        }
      },
      "StakingAhClient": {
        "ValidatorSet": {
          "required": [],
          "optional": [],
          "description": "Storage item ValidatorSet",
          "returnType": "unknown"
        },
        "IncompleteValidatorSetReport": {
          "required": [],
          "optional": [],
          "description": "Storage item IncompleteValidatorSetReport",
          "returnType": "unknown"
        },
        "ValidatorPoints": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item ValidatorPoints",
          "returnType": "number"
        },
        "Mode": {
          "required": [],
          "optional": [],
          "description": "Storage item Mode",
          "returnType": "unknown"
        },
        "NextSessionChangesValidators": {
          "required": [],
          "optional": [],
          "description": "Storage item NextSessionChangesValidators",
          "returnType": "number"
        },
        "ValidatorSetAppliedAt": {
          "required": [],
          "optional": [],
          "description": "Storage item ValidatorSetAppliedAt",
          "returnType": "number"
        },
        "BufferedOffences": {
          "required": [],
          "optional": [],
          "description": "Storage item BufferedOffences",
          "returnType": "unknown"
        }
      },
      "MultiBlockMigrations": {
        "Cursor": {
          "required": [],
          "optional": [],
          "description": "Storage item Cursor",
          "returnType": "unknown"
        },
        "Historic": {
          "required": [
            "bytes"
          ],
          "optional": [],
          "description": "Storage item Historic",
          "returnType": "null"
        }
      },
      "XcmPallet": {
        "QueryCounter": {
          "required": [],
          "optional": [],
          "description": "Storage item QueryCounter",
          "returnType": "bigint"
        },
        "Queries": {
          "required": [
            "u64"
          ],
          "optional": [],
          "description": "Storage item Queries",
          "returnType": "unknown"
        },
        "AssetTraps": {
          "required": [
            "Hash"
          ],
          "optional": [],
          "description": "Storage item AssetTraps",
          "returnType": "number"
        },
        "SafeXcmVersion": {
          "required": [],
          "optional": [],
          "description": "Storage item SafeXcmVersion",
          "returnType": "number"
        },
        "SupportedVersion": {
          "required": [],
          "optional": [],
          "description": "Storage item SupportedVersion",
          "returnType": "number"
        },
        "VersionNotifiers": {
          "required": [],
          "optional": [],
          "description": "Storage item VersionNotifiers",
          "returnType": "bigint"
        },
        "VersionNotifyTargets": {
          "required": [],
          "optional": [],
          "description": "Storage item VersionNotifyTargets",
          "returnType": "unknown"
        },
        "VersionDiscoveryQueue": {
          "required": [],
          "optional": [],
          "description": "Storage item VersionDiscoveryQueue",
          "returnType": "unknown"
        },
        "CurrentMigration": {
          "required": [],
          "optional": [],
          "description": "Storage item CurrentMigration",
          "returnType": "XcmPalletVersionMigrationStage"
        },
        "RemoteLockedFungibles": {
          "required": [],
          "optional": [],
          "description": "Storage item RemoteLockedFungibles",
          "returnType": "unknown"
        },
        "LockedFungibles": {
          "required": [
            "AccountId"
          ],
          "optional": [],
          "description": "Storage item LockedFungibles",
          "returnType": "unknown"
        },
        "XcmExecutionSuspended": {
          "required": [],
          "optional": [],
          "description": "Storage item XcmExecutionSuspended",
          "returnType": "boolean"
        },
        "ShouldRecordXcm": {
          "required": [],
          "optional": [],
          "description": "Storage item ShouldRecordXcm",
          "returnType": "boolean"
        },
        "RecordedXcm": {
          "required": [],
          "optional": [],
          "description": "Storage item RecordedXcm",
          "returnType": "unknown"
        },
        "AuthorizedAliases": {
          "required": [
            "XcmVersionedLocation"
          ],
          "optional": [],
          "description": "Storage item AuthorizedAliases",
          "returnType": "unknown"
        }
      },
      "MessageQueue": {
        "BookStateFor": {
          "required": [
            "ParachainsInclusionAggregateMessageOrigin"
          ],
          "optional": [],
          "description": "Storage item BookStateFor",
          "returnType": "unknown"
        },
        "ServiceHead": {
          "required": [],
          "optional": [],
          "description": "Storage item ServiceHead",
          "returnType": "ParachainsInclusionAggregateMessageOrigin"
        },
        "Pages": {
          "required": [],
          "optional": [],
          "description": "Storage item Pages",
          "returnType": "unknown"
        }
      },
      "AssetRate": {
        "ConversionRateToNative": {
          "required": [
            "Anonymize_I2q3ri6itcjj5u_"
          ],
          "optional": [],
          "description": "Maps an asset to its fixed point representation in the native balance.",
          "returnType": "bigint"
        }
      },
      "Beefy": {
        "Authorities": {
          "required": [],
          "optional": [],
          "description": "Storage item Authorities",
          "returnType": "unknown"
        },
        "ValidatorSetId": {
          "required": [],
          "optional": [],
          "description": "Storage item ValidatorSetId",
          "returnType": "bigint"
        },
        "NextAuthorities": {
          "required": [],
          "optional": [],
          "description": "Storage item NextAuthorities",
          "returnType": "unknown"
        },
        "SetIdSession": {
          "required": [
            "u64"
          ],
          "optional": [],
          "description": "Storage item SetIdSession",
          "returnType": "number"
        },
        "GenesisBlock": {
          "required": [],
          "optional": [],
          "description": "Storage item GenesisBlock",
          "returnType": "unknown"
        }
      },
      "Mmr": {
        "RootHash": {
          "required": [],
          "optional": [],
          "description": "Storage item RootHash",
          "returnType": "Hash"
        },
        "NumberOfLeaves": {
          "required": [],
          "optional": [],
          "description": "Storage item NumberOfLeaves",
          "returnType": "bigint"
        },
        "Nodes": {
          "required": [
            "u64"
          ],
          "optional": [],
          "description": "Storage item Nodes",
          "returnType": "Hash"
        }
      },
      "BeefyMmrLeaf": {
        "BeefyAuthorities": {
          "required": [],
          "optional": [],
          "description": "Storage item BeefyAuthorities",
          "returnType": "unknown"
        },
        "BeefyNextAuthorities": {
          "required": [],
          "optional": [],
          "description": "Storage item BeefyNextAuthorities",
          "returnType": "unknown"
        }
      }
    }
  }
};

/**
 * Get storage parameters for a specific chain, pallet, and storage item
 */
export function getStorageParameters(chainKey: string, pallet: string, storage: string): string[] {
  return storageMetadata[chainKey]?.pallets?.[pallet]?.[storage]?.required || [];
}

/**
 * Check if a storage item exists
 */
export function hasStorage(chainKey: string, pallet: string, storage: string): boolean {
  return !!(storageMetadata[chainKey]?.pallets?.[pallet]?.[storage]);
}

/**
 * Get all supported chains
 */
export function getSupportedChains(): string[] {
  return Object.keys(storageMetadata);
}

/**
 * Get all supported pallets for a chain
 */
export function getSupportedPallets(chainKey: string): string[] {
  return Object.keys(storageMetadata[chainKey]?.pallets || {});
}

/**
 * Get all supported storage items for a pallet
 */
export function getSupportedStorage(chainKey: string, pallet: string): string[] {
  return Object.keys(storageMetadata[chainKey]?.pallets?.[pallet] || {});
}

/**
 * Get return type for a storage item
 */
export function getStorageReturnType(chainKey: string, pallet: string, storage: string): string {
  return storageMetadata[chainKey]?.pallets?.[pallet]?.[storage]?.returnType || 'unknown';
}
