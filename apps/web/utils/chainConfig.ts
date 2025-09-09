/**
 * Chain configuration utilities for PAPI setup commands and descriptors
 */

export function getSetupCommands(chainKey: string): string {
  // This function is kept for backward compatibility but should not be used for code generation
  // Setup instructions are now handled by the Setup tab in RightPane
  return ""
}

export function getChainSpecImport(chainKey: string): string {
  // Only major relay chains have built-in chainSpecs
  const builtInChainSpecs = {
    polkadot: "polkadot",
    kusama: "ksmcc3"
  }
  
  const specName = builtInChainSpecs[chainKey as keyof typeof builtInChainSpecs]
  if (specName) {
    return `import { chainSpec } from "polkadot-api/chains/${specName}"`
  }
  
  // For parachains, we need to connect via RPC (no built-in chainSpec)
  return `// Note: ${chainKey} connects directly via RPC endpoint`
}

export function getDescriptorImport(chainKey: string): string {
  const descriptorMap = {
    polkadot: "dot",
    kusama: "ksm", 
    moonbeam: "moonbeam",
    bifrost: "bifrost",
    astar: "astar",
    acala: "acala",
    hydration: "hydration",
    westend: "westend",
    rococo: "rococo"
  }
  
  const descriptorName = descriptorMap[chainKey as keyof typeof descriptorMap] || "dot"
  return `import { ${descriptorName} } from "@polkadot-api/descriptors"`
}

export function getDescriptorName(chainKey: string): string {
  const descriptorMap = {
    polkadot: "dot",
    kusama: "ksm", 
    moonbeam: "moonbeam",
    bifrost: "bifrost",
    astar: "astar",
    acala: "acala", 
    hydration: "hydration",
    westend: "westend",
    rococo: "rococo"
  }
  
  return descriptorMap[chainKey as keyof typeof descriptorMap] || "dot"
}

export function getChainConnection(chainKey: string): { imports: string, connection: string, cleanup?: string } {
  // Use smoldot connection pattern from documentation
  const chainConfigs = {
    polkadot: { chainSpec: "polkadot" },
    kusama: { chainSpec: "ksmcc3" },
    moonbeam: { chainSpec: "moonbeam" },
    bifrost: { chainSpec: "bifrost" },
    astar: { chainSpec: "astar" },
    acala: { chainSpec: "acala" },
    hydration: { chainSpec: "hydration" },
    westend: { chainSpec: "westend2" },
    rococo: { chainSpec: "rococo_v2_2" }
  }

  const config = chainConfigs[chainKey as keyof typeof chainConfigs] || chainConfigs.polkadot
  
  return {
    imports: `import { start } from "polkadot-api/smoldot"
import { getSmProvider } from "polkadot-api/sm-provider"
import { chainSpec } from "polkadot-api/chains/${config.chainSpec}"`,
    connection: `  const smoldot = start()
  const chain = await smoldot.addChain({ chainSpec })
  const client = createClient(getSmProvider(chain))`,
    cleanup: `
  // Cleanup
  smoldot.terminate()`
  }
}

export function getParameterDescription(paramName: string, paramType: string): string {
  const descriptions: Record<string, string> = {
    dest: 'destination account address',
    value: 'amount in planck units (10^10 planck = 1 DOT)',
    who: 'target account to perform action on',
    amount: 'quantity for the operation',
    target: 'target account or value',
    index: 'position or identifier',
    id: 'unique identifier',
    owner: 'account that owns the resource',
    beneficiary: 'account that receives benefits',
    validator: 'validator account for staking',
    nominator: 'nominator account for staking',
    remark: 'text data to store on-chain'
  }
  
  return descriptions[paramName] || `parameter of type ${paramType}`
}