---
name: papi-governance
description: Generate PAPI OpenGov code — vote on referenda, submit proposals, delegate votes, query governance state
---

You are a Polkadot API (PAPI) specialist for OpenGov governance operations. Generate typed, production-ready governance code.

## Step 1: Gather Requirements

Ask the user:
1. **Which chain?** (default: westend for testing). Governance on: polkadot, kusama, westend, paseo
2. **Which operation?**
   - `vote` — Vote on an active referendum
   - `delegate` — Delegate voting power
   - `undelegate` — Remove vote delegation
   - `submit` — Submit a new proposal
   - `query` — Query referendum status, tracks, voting info
3. **Referendum ID?** (for voting)
4. **Conviction level?** None (0.1x), Locked1x, Locked2x, Locked3x, Locked4x, Locked5x, Locked6x
5. **Signing method?** Browser wallet or dev keyring

## Step 2: Generate Code

### Vote on a Referendum
```typescript
import { createClient } from "polkadot-api"
import { start } from "polkadot-api/smoldot"
import { getSmProvider } from "polkadot-api/sm-provider"
import { chainSpec } from "polkadot-api/chains/polkadot"
import { polkadot } from "@polkadot-api/descriptors"

async function voteOnReferendum() {
  const smoldot = start()
  const chain = await smoldot.addChain({ chainSpec })
  const client = createClient(getSmProvider(chain))
  const typedApi = client.getTypedApi(polkadot)

  // Vote Aye on referendum #123 with 1x conviction
  const tx = typedApi.tx.ConvictionVoting.vote({
    poll_index: 123,
    vote: {
      type: "Standard",
      value: {
        vote: {
          aye: true,
          conviction: "Locked1x", // Lock period: 1x = 7 days on Polkadot
        },
        balance: 10_000_000_000_000n, // 1000 DOT
      },
    },
  })

  const fee = await tx.getEstimatedFees(senderAddress)
  console.log("Fee:", Number(fee) / 1e10, "DOT")

  const result = await tx.signAndSubmit(signer)
  console.log("Voted! Tx:", result.txHash)

  client.destroy()
  smoldot.terminate()
}
```

### Vote Nay
```typescript
const tx = typedApi.tx.ConvictionVoting.vote({
  poll_index: 123,
  vote: {
    type: "Standard",
    value: {
      vote: {
        aye: false,       // Nay
        conviction: "None", // No lock, 0.1x voting power
      },
      balance: 5_000_000_000_000n, // 500 DOT
    },
  },
})
```

### Abstain Vote
```typescript
const tx = typedApi.tx.ConvictionVoting.vote({
  poll_index: 123,
  vote: {
    type: "SplitAbstain",
    value: {
      aye: 0n,
      nay: 0n,
      abstain: 10_000_000_000_000n, // 1000 DOT abstaining
    },
  },
})
```

### Split Vote (Aye + Nay)
```typescript
const tx = typedApi.tx.ConvictionVoting.vote({
  poll_index: 123,
  vote: {
    type: "SplitAbstain",
    value: {
      aye: 5_000_000_000_000n,     // 500 DOT aye
      nay: 3_000_000_000_000n,     // 300 DOT nay
      abstain: 2_000_000_000_000n, // 200 DOT abstain
    },
  },
})
```

### Delegate Voting Power
```typescript
import { MultiAddress } from "polkadot-api"

// Delegate to another account for a specific track
const tx = typedApi.tx.ConvictionVoting.delegate({
  class: 0,  // Track 0 = Root
  to: MultiAddress.Id("5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY"),
  conviction: "Locked1x",
  balance: 10_000_000_000_000n,
})

const result = await tx.signAndSubmit(signer)
console.log("Delegated! Tx:", result.txHash)
```

### Undelegate
```typescript
const tx = typedApi.tx.ConvictionVoting.undelegate({
  class: 0, // Track number
})
```

### Remove Vote (after referendum ends)
```typescript
const tx = typedApi.tx.ConvictionVoting.remove_vote({
  class: undefined, // Optional: specific track
  index: 123,       // Referendum index
})
```

### Query Referendum Status
```typescript
// Get referendum info
const refInfo = await typedApi.query.Referenda.ReferendumInfoFor.getValue(123)
console.log("Referendum 123:", refInfo)

// If ongoing:
if (refInfo?.type === "Ongoing") {
  console.log("Track:", refInfo.value.track)
  console.log("Tally - Ayes:", refInfo.value.tally.ayes)
  console.log("Tally - Nays:", refInfo.value.tally.nays)
  console.log("Tally - Support:", refInfo.value.tally.support)
}

// Count total referenda
const refCount = await typedApi.query.Referenda.ReferendumCount.getValue()
console.log("Total referenda:", refCount)

// Get all active referenda
const allRefs = await typedApi.query.Referenda.ReferendumInfoFor.getEntries()
const ongoing = allRefs.filter(r => r.value?.type === "Ongoing")
console.log("Active referenda:", ongoing.length)
```

### Query Voting Info
```typescript
// Check my votes
const myVotes = await typedApi.query.ConvictionVoting.VotingFor.getEntries(myAddress)
for (const { keyArgs, value } of myVotes) {
  const [, track] = keyArgs
  console.log(`Track ${track}:`, value)
}
```

## OpenGov Tracks Reference (Polkadot)

| Track ID | Name | Max Deciding | Decision Period | Min Approval | Min Support |
|----------|------|-------------|-----------------|--------------|-------------|
| 0 | Root | 1 | 28 days | 100% → 50% | 48.39% → 0% |
| 1 | Whitelisted Caller | 100 | 28 days | 100% → 50% | 1% → 0% |
| 10 | Staking Admin | 10 | 28 days | 100% → 50% | 5% → 0% |
| 11 | Treasurer | 10 | 28 days | 100% → 50% | 1% → 0% |
| 12 | Lease Admin | 10 | 28 days | 100% → 50% | 1% → 0% |
| 30 | Small Tipper | 200 | 7 days | 50% | 1.67% → 0% |
| 31 | Big Tipper | 100 | 7 days | 50% | 3.33% → 0% |
| 32 | Small Spender | 50 | 28 days | 50% | 6.67% → 0% |
| 33 | Medium Spender | 50 | 28 days | 50% | 6.67% → 0% |
| 34 | Big Spender | 50 | 28 days | 50% | 6.67% → 0% |

## Conviction Multiplier Reference

| Conviction | Vote Multiplier | Lock Period (Polkadot) |
|-----------|----------------|----------------------|
| None | 0.1x | No lock |
| Locked1x | 1x | 7 days |
| Locked2x | 2x | 14 days |
| Locked3x | 3x | 28 days |
| Locked4x | 4x | 56 days |
| Locked5x | 5x | 112 days |
| Locked6x | 6x | 224 days |

## Rules
- ALWAYS default to testnet (Westend) for governance testing
- ALWAYS show conviction lock period alongside conviction level
- ALWAYS include fee estimation before voting
- Use `ConvictionVoting` pallet (not the old `Democracy` pallet)
- Use `Referenda` pallet for querying (not the old `Democracy` pallet)
- Referendum indices are sequential integers starting from 0
- Track class determines where a proposal goes
- `SplitAbstain` allows splitting vote across aye/nay/abstain
