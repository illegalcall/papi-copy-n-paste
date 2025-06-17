import { start } from "polkadot-api/smoldot"
import { getSmProvider } from "polkadot-api/sm-provider"
import { createClient } from 'polkadot-api'
import { useEffect, useState } from 'react'
import chainsData from './chains.json'

export interface ChainConfig {
  key: string
  name: string
  ws: string
  specVersion: number
  paraId: number | null
  genesisHash: string
}

export interface ClientState {
  status: 'connecting' | 'ready' | 'error'
  head: number | null
  api: any | null
  error?: string
}

export const chains: ChainConfig[] = chainsData

export async function createSmoldotClient(chainKey: string) {
  const chain = chains.find(c => c.key === chainKey)
  if (!chain) {
    throw new Error(`Chain ${chainKey} not found`)
  }

  console.log(`Creating mock client for ${chainKey} (smoldot integration disabled for debugging)`)
  
  // For now, return a mock client to test the UI flow
  // TODO: Re-enable real smoldot once we have proper chain specs
  const mockClient = {
    mockClient: true,
    chainKey,
    apis: {
      Metadata: {
        metadata: async () => null
      }
    },
    tx: {},
    runtime: {}
  }

  return {
    client: mockClient,
    smoldot: { terminate: () => {} },
    chain: { mockChain: true }
  }
}

export function useClient(chainKey: string): ClientState {
  const [state, setState] = useState<ClientState>({
    status: 'connecting',
    head: null,
    api: null
  })

  useEffect(() => {
    let mounted = true
    let cleanup: (() => void) | undefined

    async function init() {
      try {
        setState(prev => ({ ...prev, status: 'connecting' }))
        
        const { client, smoldot, chain } = await createSmoldotClient(chainKey)
        
        if (!mounted) return

        setState({
          status: 'ready',
          head: null,
          api: client
        })

        cleanup = () => {
          smoldot.terminate()
        }
      } catch (error) {
        if (!mounted) return
        setState({
          status: 'error',
          head: null,
          api: null,
          error: error instanceof Error ? error.message : 'Unknown error'
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