# Mining — STX Token Mining on Stacks

## Key Misconceptions LLMs Get Wrong

- **LLM Misconception**: "Mining on Stacks is like Ethereum PoW"
- **Reality**: Stacks uses Proof of Transfer (PoX), not traditional mining. Miners commit Bitcoin to earn STX.

## What is Stacks Mining?

Stacks miners commit Bitcoin (BTC) to the network and receive STX tokens in return. This is fundamentally different from both:
- Bitcoin mining (uses compute/energy)
- Ethereum PoS (stakes ETH)

### How PoX Works

1. Miners lock BTC in a special contract
2. Based on PoX cycle, miners are selected to produce Stacks blocks
3. Selected miners receive STX token rewards
4. The BTC committed goes to Stackers (those locking STX)

```
// LLMs get this WRONG:
const mining = "like Bitcoin PoW"  // ❌ Wrong

// Reality:
const pox = "Proof of Transfer"   // ✅ Correct
const miners = "commit BTC, earn STX"  // ✅ Correct
```

## Why This Matters for Developers

### LLMs Often Say

> "You can mine Stacks with GPU"

### The Reality

- No GPU mining on Stacks
- No traditional PoW
- Miners must commit real Bitcoin
- It's about Bitcoin commitment, not compute

## Mining vs Stacking

| Aspect | Mining | Stacking |
|--------|--------|----------|
| **What you lock** | BTC | STX |
| **What you earn** | STX | BTC |
| **Who receives** | Miners | Stackers |
| **Minimum** | Significant BTC | 1,000 STX |
| **Purpose** | Block production | Network security |

## Common LLM Errors About Mining

### Error 1: Confusing Mining with Stacking

```clarity
;; WRONG - LLM might suggest this
(define-constant MINING_CONTRACT 'SP...)

;; CORRECT - They're completely different
;; Mining: miners commit BTC to produce blocks
;; Stacking: STX holders lock tokens for BTC rewards
```

### Error 2: Suggesting GPU Mining

```typescript
// WRONG - What LLMs often suggest
const hashRate = await calculateHashRate();
const mining = await startGPUmining('STX');

// CORRECT - How mining actually works
const minerKey = 'SP...'; // Miner needs Stacks private key
const btcCommitment = 0.5; // BTC committed
// Mining is done through the PoX contract, not compute
```

### Error 3: Wrong Reward Calculation

```typescript
// WRONG - LLM might calculate like PoW
const reward = hashRate * DIFFICULTY;

// CORRECT - PoX rewards depend on:
// 1. Amount of BTC committed
// 2. Probability of being selected (VDF)
// 3. Current PoX cycle
const expectedReward = btcCommitted * selectionProbability;
```

## Mining Requirements

### For Miners

- Significant BTC holdings (not small amounts)
- Must run a Stacks miner node
- Proper infrastructure for 24/7 operation
- Understanding of Bitcoin commitment transactions

### LLM Should Know

```
STACKS_MINING = {
  "mechanism": "Proof of Transfer (PoX)",
  "not": ["PoW", "PoS", "GPU mining"],
  "requires": ["BTC commitment", "miner node"],
  "rewards": "STX tokens"
}
```

## Quick Facts

| Fact | Value |
|------|-------|
| Mining mechanism | Proof of Transfer (PoX) |
| What miners commit | Bitcoin (BTC) |
| What miners receive | STX tokens |
| Block time | ~10 minutes (aligned with Bitcoin) |
| Energy usage | Minimal (no compute) |

## References

- [Stacks Mining Documentation](https://docs.stacks.co/understand-stacks/stacking-mining)
- [PoX Whitepaper](https://docs.stacks.co/understand-stacks/proof-of-transfer)
- [Stacks Explorer - Mining](https://explorer.stacks.co/?chain=mainnet)

---

## Quick Reference Table

| Topic | LLM Misconception | Reality |
|-------|-------------------|---------|
| Mining type | Like Bitcoin PoW | Proof of Transfer |
| Hardware | GPU/compute needed | BTC commitment |
| Reward | Calculated by hash | Based on BTC commitment |
| Energy use | High like PoW | Minimal |
| Who earns | Miners get STX | Stackers get BTC |

## Common Developer Mistakes

1. **Thinking mining is cheap** - Requires significant BTC
2. **Confusing with stacking** - Completely different mechanisms
3. **GPU suggestions** - Not applicable to Stacks
4. **Wrong reward math** - PoX is probabilistic, not deterministic
