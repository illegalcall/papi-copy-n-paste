/**
 * System pallet transaction response templates
 */

export const systemTransactionTemplates = {
  remark: {
    success: `{
  success: true,
  txHash: "0x9876543210fedcba...",
  blockHash: "0xfedcba0987654321...",
  blockNumber: 12345679,
  events: [
    {
      pallet: "System",
      event: "Remarked",
      data: {
        sender: "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY",
        hash: "0x1234567890abcdef..."
      }
    },
    {
      pallet: "System", 
      event: "ExtrinsicSuccess",
      data: { dispatchInfo: { weight: 125000000, class: "Normal" } }
    }
  ],
  fees: {
    baseFee: 125000000n,
    lengthFee: 3000000n,
    adjustedWeightFee: 1250000n,
    total: 129250000n
  }
}`,
    error: `{
  success: false,
  error: "BadOrigin",
  txHash: null,
  events: [],
  fees: null
}`
  }
}