import { start } from "polkadot-api/smoldot"
import { getSmProvider } from "polkadot-api/sm-provider"
import { createClient } from 'polkadot-api'
import { useEffect, useState } from 'react'
import chainsData from './chains.json' with { type: 'json' }

export interface ChainConfig {
  key: string
  name: string
  ws: string
  specVersion: number
  paraId: number | null
  genesisHash: string
  chainSpecPath?: string
}

export interface ClientState {
  status: 'connecting' | 'ready' | 'error'
  head: number | null
  api: any | null
  error?: string
  chainKey?: string
}

export const chains: ChainConfig[] = chainsData

export async function createSmoldotClient(chainKey: string) {
  const chainConfig = chains.find(c => c.key === chainKey)
  if (!chainConfig) {
    throw new Error(`Chain ${chainKey} not found`)
  }

  console.log(`Creating real smoldot client for ${chainKey}`)

  try {
    // Initialize smoldot
    const smoldot = start()

    // For now, only support Polkadot with embedded chainspec
    let chain;
    if (chainKey === 'polkadot') {
      console.log(`Loading Polkadot chainspec from @polkadot-api/known-chains`)
      const { chainSpec } = await import('polkadot-api/chains/polkadot')
      chain = await smoldot.addChain({ chainSpec })
    } else {
      // Other chains will be implemented in later phases
      console.log(`Chain ${chainKey} not yet supported with real connections`)
      throw new Error(`Chain ${chainKey} does not have real connection support yet. Only Polkadot is currently supported.`)
    }

    // Create the PAPI client
    const client = createClient(getSmProvider(chain))

    console.log(`✓ Successfully connected to ${chainKey}`)

    return {
      client,
      smoldot,
      chain
    }
  } catch (error) {
    console.error(`Failed to create smoldot client for ${chainKey}:`, error)
    throw error
  }
}

export function useClient(chainKey: string): ClientState {
  const [state, setState] = useState<ClientState>({
    status: 'connecting',
    head: null,
    api: null,
    chainKey
  })

  useEffect(() => {
    let mounted = true
    let cleanup: (() => void) | undefined

    async function init() {
      try {
        console.log(`🔄 Initializing connection to ${chainKey}...`)
        setState(prev => ({ ...prev, status: 'connecting', error: undefined }))

        const { client, smoldot, chain } = await createSmoldotClient(chainKey)

        if (!mounted) {
          console.log(`⚠️ Component unmounted, cleaning up ${chainKey} connection`)
          smoldot.terminate()
          return
        }

        console.log(`✅ Successfully connected to ${chainKey}`)
        setState({
          status: 'ready',
          head: null,
          api: client,
          chainKey
        })

        cleanup = () => {
          console.log(`🧹 Cleaning up ${chainKey} connection`)
          smoldot.terminate()
        }
      } catch (error) {
        if (!mounted) return

        const errorMessage = error instanceof Error ? error.message : 'Unknown error'
        console.error(`❌ Failed to connect to ${chainKey}:`, errorMessage)

        setState({
          status: 'error',
          head: null,
          api: null,
          error: errorMessage,
          chainKey
        })
      }
    }

    init()

    return () => {
      mounted = false
      cleanup?.()
    }
  }, [chainKey])

  return state
}