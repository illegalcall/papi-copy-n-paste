/**
 * Common parameter education data for PAPI calls
 */

export interface ParameterEducation {
  description: string
  examples: string[]
  commonMistakes: string[]
  tipForBeginners?: string
}

export const commonParameterEducation: Record<string, ParameterEducation> = {
  dest: {
    description: "Destination account address - where you want to send tokens",
    examples: [
      "//Alice",
      "//Bob", 
      "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY"
    ],
    commonMistakes: ["Sending to wrong address"],
    tipForBeginners: "Always verify the destination address before sending!"
  },
  value: {
    description: "Amount in planck units (10^10 planck = 1 DOT)",
    examples: ["10000000000", "5000000000", "100000000000"],
    commonMistakes: ["Sending more than balance"],
    tipForBeginners: "DOT has 10 decimal places. 1 DOT = 10,000,000,000 planck"
  },
  amount: {
    description: "Quantity for the operation in planck units",
    examples: ["10000000000", "5000000000"],
    commonMistakes: ["Wrong units", "Amount exceeds balance"],
    tipForBeginners: "Check minimum requirements for this operation"
  },
  who: {
    description: "Target account to perform the action on",
    examples: ["//Alice", "//Bob"],
    commonMistakes: [
      "No permission to act on account", 
      "Account doesn't exist"
    ]
  },
  target: {
    description: "Target account, value, or object for the operation",
    examples: ["//Validator", "targetAddress"],
    commonMistakes: ["Target doesn't exist", "No permission"]
  },
  remark: {
    description: "Text data to store permanently on the blockchain",
    examples: ['"Hello World"', '"Transaction memo"'],
    commonMistakes: ["Storing sensitive data", "Too much text (expensive)"],
    tipForBeginners: "Keep it short - you pay for storage!"
  }
}