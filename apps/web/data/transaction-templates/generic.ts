/**
 * Generic transaction response template for unknown operations
 */

export const genericTransactionTemplate = {
  success: `{
  success: true,
  txHash: "0x1234567890abcdef...",
  blockHash: "0xabcdef1234567890...",
  blockNumber: 12345678,
  events: [
    {
      pallet: "{{pallet}}",
      event: "OperationCompleted", // Event name varies by operation
      data: {
        // Operation-specific data
      }
    },
    {
      pallet: "System",
      event: "ExtrinsicSuccess",
      data: { 
        dispatchInfo: { 
          weight: 250000000, 
          class: "Normal",
          paysFee: "Yes"
        } 
      }
    }
  ],
  fees: {
    baseFee: 125000000n,      // Base transaction fee
    lengthFee: 5000000n,      // Fee based on tx size
    adjustedWeightFee: 2500000n, // Fee based on computational weight
    total: 132500000n         // Total fees paid
  }
}`,
  error: `{
  success: false,
  error: "Unknown error occurred",
  txHash: null,
  events: [],
  fees: null
}`
}