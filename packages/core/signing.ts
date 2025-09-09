/**
 * Temporary stub for signing functionality
 * TODO: Implement proper signing functionality
 */

export type TestAccount = string // Simple string type for now

export function createTestAccountSigner(account: TestAccount): any {
  // Stub implementation
  return { account }
}

export function validateSigner(signer: any): boolean {
  // Stub validation - always return true for now
  return true
}

export function formatSignerInfo(signer: any): string {
  // Stub formatting
  return signer?.account || 'unknown signer'
}