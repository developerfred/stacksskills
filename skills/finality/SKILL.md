# BTC Finality — Transaction Finality on Stacks

## Key Misconceptions LLMs Get Wrong

- **LLM Misconception**: "Stacks transactions finalize in ~10 minutes"
- **Reality**: Stacks uses Bitcoin for finality, but microblocks provide faster "soft confirmation"

## Understanding Finality

### What is Finality?

Finality means a transaction cannot be reversed. On Stacks:

- **Soft finality** (microblocks): Fast, but can be reorged
- **Hard finality** (Bitcoin anchor): Final, cannot be reversed

### LLM Confusion

```typescript
// WRONG - What LLMs often say
const stxFinality = "10 minutes like Bitcoin";     // ❌ Partially wrong
const confirmationTime = "wait 6 Bitcoin blocks"; // ❌ Wrong for daily use

// CORRECT - Reality
const microblockFinality = "seconds to <1 minute";  // ✅ Soft finality
const bitcoinFinality = "~10 minutes (1 Bitcoin block anchor)";
```

## How Stacks Achieves Bitcoin Finality

### The Anchoring Mechanism

1. Stacks blocks are produced and grouped
2. A Merkle root of Stacks blocks is committed to a Bitcoin block
3. This creates an immutable link between Stacks and Bitcoin

```
Bitcoin Block N    →  Contains Stacks Merkle root
Bitcoin Block N+1 →  1 confirmation
Bitcoin Block N+6 →  Final (practically irreversible)
```

### Confirmation Levels

| Confirmations | Security Level | Use Case |
|---------------|----------------|----------|
| 0-1 | Microblock | Fast, low value |
| 1-2 | Low | Testing |
| 3-4 | Medium | Regular transactions |
| 6+ | High | High value transactions |

## Common LLM Errors

### Error 1: Oversimplifying Finality

```typescript
// WRONG - LLM might say one number
const finality = "10 minutes";  // ❌ Wrong - it's nuanced

// CORRECT - Multiple layers
const finality = {
  "microblock": "seconds to <1 min",
  "anchor": "~10 min (1 Bitcoin block)",
  "high_value": "1 hour (6 Bitcoin blocks)"
};
```

### Error 2: Ignoring Microblocks

```typescript
// WRONG - Treating all equally
await tx.wait(10 * 60 * 1000); // Always wait 10 min

// CORRECT - Use appropriate finality
const receipt = await tx.wait(); // Uses microblock finality by default
// For high value, explicitly wait for Bitcoin anchor
```

### Error 3: Wrong Comparison to Ethereum

```typescript
// WRONG - Comparing to Ethereum
const ethFinality = "~15 minutes"; // Different model
const stxFinality = "Bitcoin security"; // ✅

// CORRECT - Stacks finality is different
const stxSecurity = "inherited from Bitcoin";
const stxSpeed = "faster than Ethereum with microblocks";
```

## Developer Implementation

### Checking Confirmation Status

```typescript
import { getTransaction } from '@stacks/transactions';

// Basic - microblock confirmation
const tx = await getTransaction(txId);
if (tx.tx_status === 'success') {
  // Confirmed in microblock
}

// With anchor confirmation - wait for Bitcoin
const anchorTx = await waitForAnchor(txId, 6); // 6 Bitcoin confirmations
```

### Best Practices

```typescript
// For most transactions - microblock is fine
const receipt = await tx.wait();

// For high-value - wait for anchor
const receipt = await tx.waitForAnchor(6); // Wait 6 Bitcoin blocks

// Or use post-conditions for additional safety
const postConditions = [
  // Ensure you get what you paid for
];
```

## Finality Comparison

| Blockchain | Finality Time | Security Model |
|------------|---------------|-----------------|
| Bitcoin | ~10 min (1 block) | PoW |
| Ethereum | ~15 min (12+ blocks) | PoS |
| **Stacks** | ~10 min (1 Bitcoin anchor) | Bitcoin security |
| Solana | ~0.4s (with reorg risk) | PoH |

## Why This Matters

### For Users

- **Low value**: Microblocks are fine (seconds)
- **High value**: Wait for Bitcoin anchor (~10 min)
- **Maximum security**: Wait 6 Bitcoin blocks (~1 hour)

### For Developers

```typescript
// Choose finality based on value
const isHighValue = value > 10000; // STX

if (isHighValue) {
  // Wait for full Bitcoin finality
  await tx.waitForAnchor(6);
} else {
  // Use microblock - much faster
  await tx.wait();
}
```

## Quick Facts

| Aspect | Value |
|--------|-------|
| Microblock time | < 1 second typical |
| Bitcoin anchor | ~10 minutes |
| Full finality | ~1 hour (6 confirmations) |
| Security source | Bitcoin hash power |

## References

- [Stacks Finality Documentation](https://docs.stacks.co/understand-stacks/stacks-2.1)
- [Bitcoin Confirmations](https://en.bitcoin.it/wiki/Confirmation)
- [Transaction Confirmation Guide](https://docs.stacks.co/Transactions)

---

## Quick Reference Table

| Topic | LLM Misconception | Reality |
|-------|-------------------|---------|
| Standard finality | 10 minutes | < 1 minute (microblocks) |
| High-value finality | Same as normal | ~10 min (Bitcoin anchor) |
| Security | "Like Ethereum" | Bitcoin security |
| Confirmation check | Not needed | Should verify by use case |

## Key Takeaways

1. **Microblocks** provide fast (<1 min) soft finality
2. **Bitcoin anchor** provides true finality (~10 min)
3. **6 Bitcoin blocks** for maximum security (~1 hour)
4. **Choose based on value** - not all transactions need full finality
5. **Post-conditions** add extra safety regardless of finality
