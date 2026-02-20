# Tutorial: Submitting Transactions

This tutorial covers how to build and submit transactions using PAPI Copy-n-Paste.

## Transaction Flow

1. **Build** the transaction with parameters
2. **Sign** with a wallet or dev account
3. **Submit** to the chain
4. **Monitor** the result

## Basic Transfer

1. Select **Balances** > **Calls** > **transfer_keep_alive**
2. Fill in:
   - `dest`: The recipient address
   - `value`: Amount in DOT (the tool converts to planck)
3. Click **Run** to generate code, or **Sign & Execute** to submit

```typescript
import { createClient } from "polkadot-api";
import { polkadot } from "@polkadot-api/descriptors";

// ... connection setup ...

const typedApi = client.getTypedApi(polkadot);

const tx = typedApi.tx.Balances.transfer_keep_alive({
  dest: MultiAddress.Id("5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty"),
  value: 1_000_000_000_000n, // 1 DOT = 10^10 planck
});

const result = await tx.signAndSubmit(signer);
console.log("Transaction hash:", result.txHash);
```

## Wallet Integration

PAPI Copy-n-Paste supports browser wallet extensions (Polkadot.js, SubWallet, Talisman, etc.):

1. Click the wallet icon in the top bar
2. Connect your wallet
3. Select a call and fill parameters
4. Click **Sign & Execute** to sign with your wallet and submit

## Method Queue

For batch operations, you can queue multiple calls:

1. Select a call and fill parameters
2. Click **Add to Queue** instead of Run
3. Repeat for additional calls
4. Click **Run Queue** to execute all calls sequentially

## Error Handling

Common errors and their meanings:

- **InsufficientBalance**: Not enough tokens to complete the transfer
- **KeepAlive**: Transfer would kill the sender's account (use `transfer_allow_death` instead)
- **ExistentialDeposit**: Recipient would end up below the minimum balance

The tool shows error descriptions from the chain's Rust documentation to help you understand what went wrong.

## Tips

- **Test accounts**: Use `//Alice`, `//Bob`, `//Charlie` on testnets (Westend, Rococo). These are automatically resolved to real addresses.
- **Gas estimation**: PAPI handles gas estimation automatically when you use `signAndSubmit`.
- **Nonce management**: PAPI auto-increments nonces. For queued transactions, each one gets the correct nonce.
