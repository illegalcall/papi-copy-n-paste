/**
 * Balances pallet transaction response templates
 */

export const balancesTransactionTemplates = {
  transfer: {
    success: `{
  success: true,
  txHash: "0x1234567890abcdef...",
  blockHash: "0xabcdef1234567890...",
  blockNumber: 12345678,
  events: [
    {
      pallet: "Balances",
      event: "Transfer",
      data: {
        from: "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY",
        to: "5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty",
        amount: 1000000000000n
      }
    },
    {
      pallet: "System",
      event: "ExtrinsicSuccess",
      data: { dispatchInfo: { weight: 195000000, class: "Normal" } }
    }
  ],
  fees: {
    baseFee: 125000000n,
    lengthFee: 5000000n,
    adjustedWeightFee: 1945000n,
    total: 131945000n
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
  transfer_allow_death: {
    success: `{
  success: true,
  txHash: "0x1234567890abcdef...",
  blockHash: "0xabcdef1234567890...",
  blockNumber: 12345678,
  events: [
    {
      pallet: "Balances",
      event: "Transfer",
      data: {
        from: "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY",
        to: "5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty",
        amount: 1000000000000n
      }
    },
    {
      pallet: "System",
      event: "ExtrinsicSuccess",
      data: { dispatchInfo: { weight: 195000000, class: "Normal" } }
    }
  ],
  fees: {
    baseFee: 125000000n,
    lengthFee: 5000000n,
    adjustedWeightFee: 1945000n,
    total: 131945000n
  }
}`,
    error: `{
  success: false,
  error: "InsufficientBalance",
  txHash: null,
  events: [],
  fees: null
}`
  }
}