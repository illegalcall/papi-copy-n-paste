/**
 * Storage query helper functions for parameter detection and formatting
 */

export function detectStorageParameters(palletName: string, storageName: string): string[] {
  const palletStorage: Record<string, Record<string, string[]>> = {
    System: {
      Account: ['AccountId'],
      BlockHash: ['u32'], 
      BlockWeight: ['u32']
    },
    Balances: {
      Account: ['AccountId'],
      Locks: ['AccountId'],
      Reserves: ['AccountId'],
      Holds: ['AccountId'],
      Freezes: ['AccountId']
    },
    Staking: {
      Bonded: ['AccountId'],
      Ledger: ['AccountId'],
      Validators: ['AccountId'],
      Nominators: ['AccountId'],
      Payee: ['AccountId']
    }
  }

  // First, check if we have specific parameter info
  const palletConfig = palletStorage[palletName]
  if (palletConfig && palletConfig[storageName]) {
    return palletConfig[storageName]
  }

  // Fall back to pattern matching
  const storagePatterns: Record<string, string[]> = {
    // Account-based storage
    'Account': ['AccountId'],
    'Locks': ['AccountId'],
    'Freezes': ['AccountId'],
    'Reserves': ['AccountId'],
    
    // Block-based storage
    'BlockHash': ['BlockNumber'],
    'BlockWeight': ['BlockNumber'],
    
    // Validator/Nominator patterns
    'Bonded': ['AccountId'],
    'Ledger': ['AccountId'],
    'Validators': ['AccountId'],
    'Nominators': ['AccountId'],
    'Payee': ['AccountId'],
    
    // Identity patterns  
    'IdentityOf': ['AccountId'],
    'SubsOf': ['AccountId'],
    
    // Council/Democracy patterns
    'Members': [],
    'Voting': ['AccountId'],
    'VotingOf': ['AccountId'],
    
    // Multisig patterns
    'Multisigs': ['AccountId', 'CallHash'],
    
    // Treasury patterns
    'Proposals': ['ProposalIndex'],
    'Approvals': [],
    
    // Preimage patterns
    'PreimageFor': ['Hash'],
    'StatusFor': ['Hash']
  }

  return storagePatterns[storageName] || []
}

export function isStorageQueryValid(
  selectedStorage: { pallet: string; storage: any } | undefined,
  storageParams: Record<string, any>
): boolean {
  if (!selectedStorage) return false
  
  const requiredParams = detectStorageParameters(selectedStorage.pallet, selectedStorage.storage.name)
  if (requiredParams.length === 0) return true
  
  // Check if all required parameters are provided and not empty
  for (const paramType of requiredParams) {
    const paramValue = storageParams[paramType.toLowerCase()] || 
                      storageParams[paramType] || 
                      storageParams['key'] || 
                      storageParams['param']
    
    if (!paramValue || paramValue.toString().trim() === '') {
      return false
    }
  }
  
  return true
}

export function generateStorageParams(storageParams: Record<string, any>, requiredParams: string[]): string {
  const params = requiredParams.map(paramType => {
    const value = storageParams[paramType.toLowerCase()] || storageParams[paramType] || 
                  storageParams['key'] || storageParams['param'] || ''
    
    // Handle different parameter types
    if (paramType === 'AccountId') {
      if (typeof value === 'string' && value.startsWith('//')) {
        const accountMap: Record<string, string> = {
          '//Alice': '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
          '//Bob': '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty',
          '//Charlie': '5FLSigC9HGRKVhB9FiEo4Y3koPsNmBmLJbpXg2mp1hXcS59Y'
        }
        return `"${accountMap[value] || accountMap['//Alice']}"`
      }
      return `"${value}"`
    } else if (paramType.includes('Number') || paramType.includes('Index')) {
      return String(parseInt(value || '0'))
    } else if (paramType === 'Hash') {
      return `"${value || '0x0000000000000000000000000000000000000000000000000000000000000000'}"`
    }
    
    return `"${value}"`
  })
  
  return params.join(', ')
}

export function generateStorageParamValues(storageParams: Record<string, any>, requiredParams: string[]): any[] {
  return requiredParams.map(paramType => {
    const paramValue = storageParams[paramType.toLowerCase()] || storageParams[paramType] || 
                       storageParams['key'] || storageParams['param'] || ''
    
    // Handle different parameter types
    if (paramType === 'AccountId' && typeof paramValue === 'string') {
      if (paramValue.startsWith('//')) {
        // Convert test accounts to actual addresses
        const accountMap: Record<string, string> = {
          '//Alice': '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
          '//Bob': '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty',
          '//Charlie': '5FLSigC9HGRKVhB9FiEo4Y3koPsNmBmLJbpXg2mp1hXcS59Y'
        }
        return accountMap[paramValue] || accountMap['//Alice']
      }
      return paramValue
    } else if (paramType.includes('Number') || paramType.includes('Index')) {
      return parseInt(paramValue || '0')
    } else if (paramType === 'Hash') {
      return paramValue || '0x0000000000000000000000000000000000000000000000000000000000000000'
    }
    
    return paramValue
  })
}

export function formatStorageResult(result: any): string {
  if (result === null || result === undefined) {
    return 'null'
  }
  
  if (typeof result === 'bigint') {
    // For DOT amounts, also show converted value
    if (result > 1000000000n) {
      const dotValue = (Number(result) / 10000000000).toFixed(4)
      return `${result.toString()} planck (${dotValue} DOT)`
    }
    return `${result.toString()} (BigInt)`
  }
  
  if (result instanceof Uint8Array) {
    return `[Uint8Array: ${result.length} bytes] 0x${Array.from(result).map(b => b.toString(16).padStart(2, '0')).join('')}`
  }
  
  if (typeof result === 'object') {
    try {
      return JSON.stringify(result, (key, value) => {
        if (typeof value === 'bigint') {
          return value.toString() + 'n'
        }
        if (value instanceof Uint8Array) {
          return `[Uint8Array: ${value.length} bytes]`
        }
        return value
      }, 2)
    } catch (e) {
      return `[Object: ${result.constructor?.name || 'Unknown'}]`
    }
  }
  
  return String(result)
}

export function decodeStorageResult(hexResult: string, palletName: string, storageName: string): string {
  try {
    // Remove 0x prefix if present
    const hexValue = hexResult.startsWith('0x') ? hexResult.slice(2) : hexResult
    
    // Special case for known storage types
    if (palletName === 'Balances' && storageName === 'TotalIssuance') {
      // Decode as u128 (16 bytes, little endian)
      const bytes = hexValue.slice(0, 32).match(/.{1,2}/g)?.reverse().join('') || '0'
      const totalIssuance = BigInt('0x' + bytes)
      const dotAmount = (Number(totalIssuance) / 10000000000).toFixed(4)
      return `${totalIssuance.toString()} planck (${dotAmount} DOT)`
    }
    
    if (palletName === 'System' && storageName === 'Number') {
      // Decode as u32 (4 bytes, little endian)
      const bytes = hexValue.slice(0, 8).match(/.{1,2}/g)?.reverse().join('') || '0'
      const blockNumber = parseInt(bytes, 16)
      return `Block #${blockNumber}`
    }
    
    if (palletName === 'Timestamp' && storageName === 'Now') {
      // Decode as u64 timestamp (8 bytes, little endian)
      const bytes = hexValue.slice(0, 16).match(/.{1,2}/g)?.reverse().join('') || '0'
      const timestamp = parseInt(bytes, 16)
      const date = new Date(timestamp)
      return `${timestamp} ms (${date.toISOString()})`
    }
    
    // Generic hex display for unknown types
    return `0x${hexValue} (${hexValue.length / 2} bytes)`
    
  } catch (error) {
    return `Raw: ${hexResult} (decode failed: ${error instanceof Error ? error.message : 'unknown'})`
  }
}