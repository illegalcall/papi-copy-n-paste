// Mock API Infrastructure for Testing

import { Observable, BehaviorSubject, Subject, of, throwError, interval } from 'rxjs'
import { map, delay, take, switchMap, startWith } from 'rxjs/operators'
import { MockApiConfig, MockStorageEntry } from './types'

/**
 * Mock storage entry implementation
 */
export class MockStorageEntryImpl implements MockStorageEntry {
  private mockData: any
  private mockEntries: Array<[any, any]> = []
  private valueSubject = new BehaviorSubject<any>(null)
  private entriesSubject = new BehaviorSubject<Array<[any, any]>>([])
  
  constructor(
    private storageKey: string,
    private config: {
      defaultValue?: any
      entries?: Array<[any, any]>
      latency?: number
      failureRate?: number
    } = {}
  ) {
    this.mockData = config.defaultValue || this.generateMockValue()
    this.mockEntries = config.entries || this.generateMockEntries()
    
    this.valueSubject.next(this.mockData)
    this.entriesSubject.next(this.mockEntries)
    
    // Simulate periodic updates
    interval(2000).pipe(
      take(10)
    ).subscribe(() => {
      this.simulateUpdate()
    })
  }

  async getValue(...args: any[]): Promise<any> {
    await this.simulateLatency()
    this.simulateFailure()
    
    if (args.length > 0) {
      // Return parameter-specific mock data
      return this.generateParameterSpecificValue(args[0])
    }
    
    return this.mockData
  }

  async getValues(keys: any[]): Promise<any[]> {
    await this.simulateLatency()
    this.simulateFailure()
    
    return keys.map(key => this.generateParameterSpecificValue(key))
  }

  async getEntries(): Promise<Array<[any, any]>> {
    await this.simulateLatency()
    this.simulateFailure()
    
    return [...this.mockEntries]
  }

  watchValue(...args: any[]): Observable<any> {
    const subject = new BehaviorSubject(
      args.length > 0 
        ? this.generateParameterSpecificValue(args[0])
        : this.mockData
    )
    
    // Simulate periodic updates
    interval(1000).pipe(
      map(() => this.generateRandomUpdate()),
      take(10)
    ).subscribe(newValue => {
      subject.next(newValue)
    })
    
    return subject.asObservable().pipe(
      delay(this.config.latency || 10)
    )
  }

  watchEntries(): Observable<{ block: any; deltas: any; entries: Array<[any, any]> }> {
    let blockNumber = 1000
    
    return interval(1500).pipe(
      map(() => {
        const block = {
          number: blockNumber++,
          hash: `0x${blockNumber.toString(16).padStart(64, '0')}`,
          parentHash: `0x${(blockNumber - 1).toString(16).padStart(64, '0')}`
        }
        
        // Simulate entry changes
        const shouldAddEntry = Math.random() > 0.7
        const shouldRemoveEntry = Math.random() > 0.8 && this.mockEntries.length > 1
        
        const deltas: any = { upserted: [], deleted: [] }
        
        if (shouldAddEntry) {
          const newEntry: [any, any] = [
            `key_${blockNumber}`,
            this.generateMockValue()
          ]
          this.mockEntries.push(newEntry)
          deltas.upserted.push(newEntry)
        }
        
        if (shouldRemoveEntry) {
          const removedEntry = this.mockEntries.splice(0, 1)[0]
          if (removedEntry) {
            deltas.deleted.push(removedEntry[0])
          }
        }
        
        return {
          block,
          deltas,
          entries: [...this.mockEntries]
        }
      }),
      take(8),
      startWith({
        block: { number: blockNumber, hash: '0x' + '0'.repeat(64) },
        deltas: { upserted: [], deleted: [] },
        entries: [...this.mockEntries]
      })
    )
  }

  getKey(...args: any[]): string {
    const baseKey = `0x${Buffer.from(this.storageKey).toString('hex')}`
    
    if (args.length === 0) {
      return baseKey
    }
    
    // Hash arguments into key
    const argsHash = Buffer.from(JSON.stringify(args)).toString('hex').slice(0, 32)
    return baseKey + argsHash
  }

  private async simulateLatency(): Promise<void> {
    if (this.config.latency && this.config.latency > 0) {
      await new Promise(resolve => setTimeout(resolve, this.config.latency))
    }
  }

  private simulateFailure(): void {
    if (this.config.failureRate && Math.random() < this.config.failureRate) {
      throw new Error(`Mock failure for storage ${this.storageKey}`)
    }
  }

  private simulateUpdate(): void {
    this.mockData = this.generateRandomUpdate()
    this.valueSubject.next(this.mockData)
  }

  private generateMockValue(): any {
    switch (this.storageKey.toLowerCase()) {
      case 'number':
      case 'validatorcount':
      case 'totalvalidators':
        return Math.floor(Math.random() * 1000000)
      
      case 'account':
        return {
          nonce: Math.floor(Math.random() * 100),
          consumers: 0,
          providers: 1,
          sufficients: 0,
          data: {
            free: BigInt(Math.floor(Math.random() * 1000000000000)),
            reserved: BigInt(Math.floor(Math.random() * 1000000000)),
            miscFrozen: BigInt(0),
            feeFrozen: BigInt(0)
          }
        }
      
      case 'totalissuance':
        return BigInt('10000000000000000000')
      
      case 'bonded':
      case 'ledger':
        return '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY'
      
      case 'locks':
        return [
          {
            id: 'staking ',
            amount: BigInt(Math.floor(Math.random() * 1000000000000)),
            reasons: 'All'
          }
        ]
      
      default:
        return { value: `mock_${this.storageKey}_${Math.random().toString(36).slice(2)}` }
    }
  }

  private generateRandomUpdate(): any {
    const baseValue = this.generateMockValue()
    
    // Add some randomization to simulate real blockchain changes
    if (typeof baseValue === 'object' && baseValue !== null && !Array.isArray(baseValue)) {
      return {
        ...baseValue,
        _updated: Date.now()
      }
    }
    
    return baseValue
  }

  private generateParameterSpecificValue(param: any): any {
    const baseValue = this.generateMockValue()
    
    if (typeof baseValue === 'object' && baseValue !== null) {
      return {
        ...baseValue,
        _param: param,
        _timestamp: Date.now()
      }
    }
    
    return baseValue
  }

  private generateMockEntries(): Array<[any, any]> {
    const entries: Array<[any, any]> = []
    const count = Math.floor(Math.random() * 5) + 3 // 3-7 entries
    
    for (let i = 0; i < count; i++) {
      entries.push([
        `key_${i}`,
        this.generateMockValue()
      ])
    }
    
    return entries
  }
}

/**
 * Mock typed API factory
 */
export class MockTypedApiFactory {
  private config: MockApiConfig
  
  constructor(config: MockApiConfig) {
    this.config = config
  }

  createMockTypedApi(): any {
    const api: any = {
      query: this.createMockQueries(),
      tx: this.createMockTransactions(),
      constants: this.createMockConstants(),
      client: {
        _chainId: this.config.chain,
        _isMock: true
      }
    }
    
    return api
  }

  private createMockQueries(): any {
    const queries: any = {}
    
    // Common Substrate pallets
    const pallets = [
      'System', 'Balances', 'Staking', 'Democracy', 'Council',
      'TechnicalCommittee', 'Treasury', 'Vesting', 'Identity',
      'Proxy', 'Multisig', 'XcmPallet'
    ]
    
    for (const pallet of pallets) {
      queries[pallet] = this.createMockPalletQueries(pallet)
    }
    
    return queries
  }

  private createMockPalletQueries(pallet: string): any {
    const palletQueries: any = {}
    
    // Storage entries based on pallet
    const storageEntries = this.getStorageEntriesForPallet(pallet)
    
    for (const storage of storageEntries) {
      palletQueries[storage] = new MockStorageEntryImpl(
        `${pallet}.${storage}`,
        {
          latency: this.config.latency,
          failureRate: this.config.failureRate
        }
      )
    }
    
    return palletQueries
  }

  private getStorageEntriesForPallet(pallet: string): string[] {
    const storageMap: Record<string, string[]> = {
      System: ['Number', 'Account', 'BlockHash', 'ExtrinsicCount', 'BlockWeight'],
      Balances: ['TotalIssuance', 'Account', 'Locks', 'Reserves'],
      Staking: ['ValidatorCount', 'Bonded', 'Ledger', 'Validators', 'Nominators'],
      Democracy: ['ReferendumCount', 'ReferendumInfoOf', 'VotingOf', 'DepositOf'],
      Council: ['Members', 'ProposalCount', 'Proposals', 'ProposalOf', 'Voting'],
      Treasury: ['ProposalCount', 'Proposals', 'Approvals'],
      Vesting: ['Vesting'],
      Identity: ['IdentityOf', 'SuperOf', 'SubsOf', 'Registrars'],
      Proxy: ['Proxies', 'Announcements'],
      Multisig: ['Multisigs'],
      XcmPallet: ['QueryCounter', 'Queries', 'AssetTraps']
    }
    
    return storageMap[pallet] || ['Value', 'Data']
  }

  private createMockTransactions(): any {
    return {
      System: {
        remark: this.createMockTransaction('System', 'remark'),
        remarkWithEvent: this.createMockTransaction('System', 'remarkWithEvent')
      },
      Balances: {
        transfer: this.createMockTransaction('Balances', 'transfer'),
        transferAllowDeath: this.createMockTransaction('Balances', 'transferAllowDeath')
      }
    }
  }

  private createMockTransaction(pallet: string, call: string): any {
    return {
      sign: () => Promise.resolve({ hash: `0x${'0'.repeat(64)}` }),
      signAndSubmit: () => Promise.resolve({ hash: `0x${'0'.repeat(64)}` }),
      getEstimatedFees: () => Promise.resolve(BigInt(1000000))
    }
  }

  private createMockConstants(): any {
    return {
      System: {
        BlockHashCount: 2400,
        DbWeight: {
          read: 25000000,
          write: 100000000
        }
      },
      Balances: {
        ExistentialDeposit: BigInt('10000000000'),
        MaxLocks: 50
      }
    }
  }
}

/**
 * Mock client factory for different test scenarios
 */
export class MockClientFactory {
  /**
   * Create a standard mock client
   */
  static createStandardMock(chain: string): any {
    const config: MockApiConfig = {
      chain,
      mockResponses: {},
      latency: 50,
      failureRate: 0,
      observableEmissions: 5
    }
    
    return new MockTypedApiFactory(config).createMockTypedApi()
  }

  /**
   * Create a slow mock client (for performance testing)
   */
  static createSlowMock(chain: string): any {
    const config: MockApiConfig = {
      chain,
      mockResponses: {},
      latency: 2000,
      failureRate: 0,
      observableEmissions: 3
    }
    
    return new MockTypedApiFactory(config).createMockTypedApi()
  }

  /**
   * Create an unreliable mock client (for error testing)
   */
  static createUnreliableMock(chain: string): any {
    const config: MockApiConfig = {
      chain,
      mockResponses: {},
      latency: 100,
      failureRate: 0.3, // 30% failure rate
      observableEmissions: 4
    }
    
    return new MockTypedApiFactory(config).createMockTypedApi()
  }

  /**
   * Create a mock client that only has specific pallets
   */
  static createLimitedMock(chain: string, pallets: string[]): any {
    const fullMock = MockClientFactory.createStandardMock(chain)
    
    // Filter to only requested pallets
    const limitedQuery: any = {}
    for (const pallet of pallets) {
      if (fullMock.query[pallet]) {
        limitedQuery[pallet] = fullMock.query[pallet]
      }
    }
    
    return {
      ...fullMock,
      query: limitedQuery
    }
  }

  /**
   * Create a mock client with custom responses
   */
  static createCustomMock(chain: string, customResponses: Record<string, any>): any {
    const config: MockApiConfig = {
      chain,
      mockResponses: customResponses,
      latency: 10,
      failureRate: 0,
      observableEmissions: 5
    }
    
    return new MockTypedApiFactory(config).createMockTypedApi()
  }
}

// Export utilities
export type { MockApiConfig, MockStorageEntry }