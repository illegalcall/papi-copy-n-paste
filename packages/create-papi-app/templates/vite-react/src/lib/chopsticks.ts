{{#includeChopsticks}}import type { PolkadotProvider } from "polkadot-api"

/**
 * Chopsticks enhancer for local development
 * Provides additional development utilities for the local fork
 */
export function withChopsticksEnhancer(provider: PolkadotProvider): PolkadotProvider {
  // Add any chopsticks-specific enhancements here
  return provider
}

export const CHOPSTICKS_CONFIG = {
  wsUrl: "ws://localhost:8132",
  commands: {
    executeReferendum: (id: number) => `er ${id}`,
    jumpToNextSpendPeriod: () => "ts",
    produceNewBlock: () => "nb",
    jumpToBlock: (height: number) => `jb ${height}`
  }
}

/**
 * Execute a chopsticks command
 */
export async function executeChopsticksCommand(command: string): Promise<void> {
  try {
    // In a real implementation, this would connect to chopsticks and execute the command
    console.log(`Executing chopsticks command: ${command}`)
  } catch (error) {
    console.error("Failed to execute chopsticks command:", error)
  }
}{{/includeChopsticks}}