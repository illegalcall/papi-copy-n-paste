import { sr25519CreateDerive } from "@polkadot-labs/hdkd"
import {
  DEV_PHRASE,
  entropyToMiniSecret,
  mnemonicToEntropy,
} from "@polkadot-labs/hdkd-helpers"
import { getPolkadotSigner } from "polkadot-api/signer"

export interface SignerInfo {
  name: string
  address: string
  signer: any // PolkadotSigner type
}

// Test accounts for development
export const TEST_ACCOUNTS = [
  "//Alice",
  "//Bob", 
  "//Charlie",
  "//Dave",
  "//Eve",
  "//Ferdie"
] as const

export type TestAccount = typeof TEST_ACCOUNTS[number]

/**
 * Create a signer from a test account mnemonic (like //Alice, //Bob, etc.)
 */
export function createTestAccountSigner(account: TestAccount): SignerInfo {
  try {
    console.log(`Creating signer for test account: ${account}`)
    
    // Generate entropy from the development phrase
    const entropy = mnemonicToEntropy(DEV_PHRASE)
    const miniSecret = entropyToMiniSecret(entropy)
    
    // Create the derive function
    const derive = sr25519CreateDerive(miniSecret)
    
    // Derive the specific account (//Alice, //Bob, etc.)
    const hdkdKeyPair = derive(account)

    console.log('hdkdKeyPair keys:', Object.keys(hdkdKeyPair))
    console.log('hdkdKeyPair.sign type:', typeof hdkdKeyPair.sign)

    // Create the Polkadot signer
    const polkadotSigner = getPolkadotSigner(
      hdkdKeyPair.publicKey,
      "Sr25519",
      (input: Uint8Array) => hdkdKeyPair.sign(input),
    )

    console.log('polkadotSigner keys:', Object.keys(polkadotSigner))
    console.log('polkadotSigner.sign type:', typeof polkadotSigner.sign)
    console.log('polkadotSigner.publicKey type:', typeof polkadotSigner.publicKey)

    // Generate a readable address (this is a simplified version)
    // In a real implementation, you'd use proper SS58 encoding
    const address = generateReadableAddress(hdkdKeyPair.publicKey, account)

    console.log(`✓ Created signer for ${account}: ${address}`)
    
    return {
      name: account,
      address,
      signer: polkadotSigner
    }
  } catch (error) {
    console.error(`Failed to create signer for ${account}:`, error)
    throw error
  }
}

/**
 * Generate a readable address from public key
 * This is a simplified implementation for development
 */
function generateReadableAddress(publicKey: Uint8Array, account: TestAccount): string {
  // For development, we'll use well-known addresses for test accounts
  const knownAddresses: Record<TestAccount, string> = {
    "//Alice": "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY",
    "//Bob": "5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty",
    "//Charlie": "5FLSigC9HGRKVhB9FiEo4Y3koPsNmBmLJbpXg2mp1hXcS59Y",
    "//Dave": "5DAAnrj7VHTznn2AWBemMuyBwZWs6FNFjdyVXUeYum3PTXFy",
    "//Eve": "5HGjWAeFDfFCWPsjFQdVV2Msvz2XtMktvgocEZcCj68kUMaw",
    "//Ferdie": "5CiPPseXPECbkjWCa6MnjNokrgYjMqmKndv2rSnekmSK2DjL"
  }
  
  return knownAddresses[account] || `5${publicKey.slice(0, 8).join('')}...`
}

/**
 * Get the default signer (Alice) for development
 */
export function getDefaultSigner(): SignerInfo {
  return createTestAccountSigner("//Alice")
}

/**
 * Get all available test account signers
 */
export function getAllTestSigners(): SignerInfo[] {
  return TEST_ACCOUNTS.map(account => createTestAccountSigner(account))
}

/**
 * Validate that a signer is properly configured
 */
export function validateSigner(signerInfo: SignerInfo): boolean {
  try {
    if (!signerInfo.signer) {
      console.error('Signer is missing')
      return false
    }
    
    if (!signerInfo.signer.publicKey) {
      console.error('Signer public key is missing')
      return false
    }
    
    if (typeof signerInfo.signer.signTx !== 'function') {
      console.error('Signer signTx function is missing')
      return false
    }

    if (typeof signerInfo.signer.signBytes !== 'function') {
      console.error('Signer signBytes function is missing')
      return false
    }
    
    console.log(`✓ Signer validation passed for ${signerInfo.name}`)
    return true
  } catch (error) {
    console.error('Signer validation failed:', error)
    return false
  }
}

/**
 * Format signer information for display
 */
export function formatSignerInfo(signerInfo: SignerInfo): string {
  return `${signerInfo.name} (${signerInfo.address.slice(0, 8)}...${signerInfo.address.slice(-8)})`
}

/**
 * Get signer by name
 */
export function getSignerByName(name: TestAccount): SignerInfo {
  return createTestAccountSigner(name)
}
