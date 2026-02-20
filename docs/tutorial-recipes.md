# Recipes: Common Operations

Ready-to-use code snippets for common blockchain operations.

## Token Transfer

```typescript
import { createClient } from "polkadot-api";
import { start } from "polkadot-api/smoldot";
import { getSmProvider } from "polkadot-api/sm-provider";
import { chainSpec } from "polkadot-api/chains/polkadot";
import { polkadot } from "@polkadot-api/descriptors";

const smoldot = start();
const chain = await smoldot.addChain({ chainSpec });
const client = createClient(getSmProvider(chain));
const typedApi = client.getTypedApi(polkadot);

// Transfer 1 DOT
const tx = typedApi.tx.Balances.transfer_keep_alive({
  dest: MultiAddress.Id("5FHneW46..."),
  value: 10_000_000_000n, // 1 DOT
});

const result = await tx.signAndSubmit(signer);
console.log("Tx hash:", result.txHash);

client.destroy();
smoldot.terminate();
```

## Check Account Balance

```typescript
const accountInfo = await typedApi.query.System.Account.getValue(
  "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY"
);

const free = accountInfo.data.free;
const reserved = accountInfo.data.reserved;
const frozen = accountInfo.data.frozen;

console.log(`Free: ${Number(free) / 1e10} DOT`);
console.log(`Reserved: ${Number(reserved) / 1e10} DOT`);
console.log(`Frozen: ${Number(frozen) / 1e10} DOT`);
```

## Watch Balance Changes

```typescript
const sub = typedApi.query.System.Account
  .watchValue("5GrwvaEF...")
  .subscribe({
    next: (info) => {
      console.log(`Balance: ${Number(info.data.free) / 1e10} DOT`);
    },
  });

// Unsubscribe when done
// sub.unsubscribe();
```

## Staking: Bond Tokens

```typescript
const tx = typedApi.tx.Staking.bond({
  value: 100_000_000_000_000n, // 10,000 DOT
  payee: { type: "Staked" },   // Auto-compound rewards
});

await tx.signAndSubmit(signer);
```

## Staking: Nominate Validators

```typescript
const tx = typedApi.tx.Staking.nominate({
  targets: [
    MultiAddress.Id("5Validator1..."),
    MultiAddress.Id("5Validator2..."),
  ],
});

await tx.signAndSubmit(signer);
```

## Governance: Submit a Remark

```typescript
// Store arbitrary data on-chain
const encoder = new TextEncoder();
const data = encoder.encode("Hello from PAPI!");

const tx = typedApi.tx.System.remark({
  remark: Binary.fromBytes(data),
});

await tx.signAndSubmit(signer);
```

## List All Validators

```typescript
const validators = await typedApi.query.Session.Validators.getValue();
console.log(`Active validators: ${validators.length}`);

for (const validator of validators) {
  console.log(validator);
}
```

## Get Chain Constants

```typescript
// No network call needed - constants are in the metadata
const existentialDeposit = typedApi.constants.Balances.ExistentialDeposit();
console.log(`Existential deposit: ${Number(existentialDeposit) / 1e10} DOT`);

const maxNominators = typedApi.constants.Staking.MaxNominatorRewardedPerValidator();
console.log(`Max nominators rewarded: ${maxNominators}`);
```

## Parachain Connection (Moonbeam Example)

```typescript
import { createClient } from "polkadot-api";
import { getWsProvider } from "polkadot-api/ws-provider/web";
import { moonbeam } from "@polkadot-api/descriptors";

const wsProvider = getWsProvider("wss://wss.api.moonbeam.network");
const client = createClient(wsProvider);
const typedApi = client.getTypedApi(moonbeam);

const totalIssuance = await typedApi.query.Balances.TotalIssuance.getValue();
console.log("Total GLMR:", totalIssuance);

client.destroy();
```
