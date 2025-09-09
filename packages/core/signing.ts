/**
 * Temporary stub for signing functionality
 * TODO: Implement proper signing functionality
 */

export type TestAccount = string; // Simple string type for now

export function createTestAccountSigner(account: TestAccount): any {
  // Create signer with both account name and address for compatibility
  const testAccountAddresses: Record<string, string> = {
    "//Alice": "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY",
    "//Bob": "5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty",
    "//Charlie": "5FLSigC9HGRKVhB9FiEo4Y3koPsNmBmLJbpXg2mp1hXcS59Y",
    "//Dave": "5DAAnrj7VEAwEyzeNmMysKzGNmJj4cMGQ3ELzKKsG47mQfHx",
    "//Eve": "5HGjWAeFDfFCWPsjFQdVV2Msvz2XtMktvgocEurrepxvMECm",
  };

  const address = testAccountAddresses[account] || account;

  return {
    account,
    address,
    name: account.replace("//", ""), // Clean name for display
    signer: null, // Placeholder for actual signer - used in real PAPI integration
  };
}

export function validateSigner(signer: any): boolean {
  // Stub validation - always return true for now
  return true;
}

export function formatSignerInfo(signer: any): string {
  // Format signer info with name and address
  if (signer?.name && signer?.address) {
    return `${signer.name} (${signer.address.substring(0, 8)}...)`;
  }
  return signer?.account || "unknown signer";
}
