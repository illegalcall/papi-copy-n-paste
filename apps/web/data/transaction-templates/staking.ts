/**
 * Staking pallet transaction response templates
 */

export const stakingTransactionTemplates = {
  bond: {
    success: `{
  success: true,
  txHash: "0xabcd1234efgh5678...",
  blockHash: "0x5678abcd1234efgh...",
  blockNumber: 12345680,
  events: [
    {
      pallet: "Staking",
      event: "Bonded",
      data: {
        stash: "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY",
        amount: 10000000000000n
      }
    },
    {
      pallet: "System",
      event: "ExtrinsicSuccess", 
      data: { dispatchInfo: { weight: 500000000, class: "Normal" } }
    }
  ],
  fees: {
    baseFee: 125000000n,
    lengthFee: 4000000n,
    adjustedWeightFee: 5000000n,
    total: 134000000n
  }
}`,
    error: `{
  success: false,
  error: "InsufficientBalance",
  txHash: null,
  events: [],
  fees: null
}`
  },
  unbond: {
    success: `{
  success: true,
  txHash: "0xabcd1234efgh5678...",
  blockHash: "0x5678abcd1234efgh...",
  blockNumber: 12345680,
  events: [
    {
      pallet: "Staking",
      event: "Unbonded",
      data: {
        stash: "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY",
        amount: 10000000000000n
      }
    },
    {
      pallet: "System",
      event: "ExtrinsicSuccess", 
      data: { dispatchInfo: { weight: 500000000, class: "Normal" } }
    }
  ],
  fees: {
    baseFee: 125000000n,
    lengthFee: 4000000n,
    adjustedWeightFee: 5000000n,
    total: 134000000n
  }
}`,
    error: `{
  success: false,
  error: "NotStash",
  txHash: null,
  events: [],
  fees: null
}`
  }
}