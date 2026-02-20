# Tutorial: Storage Queries

This tutorial walks through the different types of storage queries you can build with PAPI Copy-n-Paste.

## Query Types

### getValue — Read a Single Value

The simplest query. Reads the current value of a storage item.

**Example: Get total issuance**
1. Select **Balances** > **Storage** > **TotalIssuance**
2. Query type: **Get Value**
3. Click **Run Query**

```typescript
const totalIssuance = await typedApi.query.Balances.TotalIssuance.getValue();
// Returns: 13_800_000_000_000_000n (BigInt, in planck)
```

### getValue with keys — Read a Map Entry

Some storage items are maps that require a key (e.g., an account address).

**Example: Get account balance**
1. Select **System** > **Storage** > **Account**
2. Enter an account address
3. Click **Run Query**

```typescript
const accountInfo = await typedApi.query.System.Account.getValue(
  "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY"
);
// Returns: { nonce, consumers, providers, sufficients, data: { free, reserved, frozen, flags } }
```

### getEntries — Read All Map Entries

Reads every entry in a storage map. Useful for enumeration.

**Example: List all accounts**
1. Select **System** > **Storage** > **Account**
2. Query type: **Get Entries**
3. Click **Run Query**

```typescript
const allAccounts = await typedApi.query.System.Account.getEntries();
for (const { keyArgs, value } of allAccounts) {
  console.log(`Account: ${keyArgs[0]}, Free: ${value.data.free}`);
}
```

### watchValue — Subscribe to Changes

Opens a real-time subscription that fires whenever the value changes.

**Example: Watch an account balance**
1. Select **System** > **Storage** > **Account**
2. Query type: **Watch Value**
3. Click **Start Watching**

```typescript
const subscription = typedApi.query.System.Account
  .watchValue("5GrwvaEF...")
  .subscribe({
    next: (value) => console.log("Balance updated:", value.data.free),
    error: (err) => console.error("Error:", err),
  });

// Later: subscription.unsubscribe();
```

## Tips

- **BigInt values**: Balance amounts are returned as `BigInt`. Divide by `10n ** 10n` to convert DOT planck to DOT.
- **Optional storage**: Some storage items may return `undefined` if no value is set. Use `getValue()` which returns the value or `undefined`.
- **Type safety**: PAPI provides full TypeScript types for all storage items when using descriptors. Your IDE will autocomplete field names.
