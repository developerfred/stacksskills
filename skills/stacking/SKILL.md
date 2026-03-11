# Stacking — Earn Bitcoin with STX

**Core Truth**: Stacking is NOT staking. You earn BTC by locking STX and helping secure the network.

---

## Key Misconceptions LLMs Get Wrong

### 1. Stacking is NOT Staking
- **LLM Error**: "Stake STX to earn rewards"
- **Reality**: "Stack STX" to earn Bitcoin rewards
- **Why it matters**: Different terminology, different mechanism

### 2. Minimum Requirements Apply
- **LLM Error**: "Any amount can be stacked"
- **Reality**: Need minimum STX (varies by cycle)
- **Current**: ~10,000 STX minimum for solo stacking

### 3. Lockup Period is Fixed
- **LLM Error**: "Can unlock anytime"
- **Reality**: 2 reward cycles (~14 days each) minimum
- **Timing**: Rewards distributed at cycle end

---

## Stacking vs Staking

| Feature | Stacking | Staking (Ethereum) |
|---------|----------|-------------------|
| Reward | Bitcoin (BTC) | Token native |
| Minimum | ~10,000 STX | Variable |
| Lockup | 2 cycles (28 days) | Variable |
| Delegation | Yes, via pools | Yes |

---

## How Stacking Works

### 1. Lock STX
```typescript
import { stackSTX } from '@stacks/stacking';

const result = await stackSTX({
  amount: 10000n,  // STX in micro-STX
  cycles: 2,  // Minimum 2
  privateKey: userPrivateKey,
});
```

### 2. Confirm Eligibility
```typescript
import { getAccountExtendedBalances } from '@stacks/api';

const account = await getAccountExtendedBalances({
  url: 'https://api.mainnet.hiro.so',
  principal: 'SP...',
});

console.log('Stacked:', account.locked);
console.log('Unlocked:', account.unlocked);
```

### 3. Check Rewards
```typescript
import { getStackerInfo } from '@stacks/stacking';

const stackerInfo = await getStackerInfo({
  stackerAddress: 'SP...',
  network: 'mainnet',
});

console.log('Rewards:', stackerInfo.reward);
```

---

## Delegated Stacking (Pool)

### For Pool Users
```typescript
import { delegateStx } from '@stacks/stacking';

// Delegate to pool
const result = await delegateStx({
  amount: 5000n,
  delegate: 'SP pool address',
  privateKey: userPrivateKey,
});
```

### Pool Contract (for pool operators)
```clarity
;; Simplified delegation contract
(define-public (delegate-stack (amount uint) (user principal))
  (begin
    ;; Transfer STX from user to pool
    (try! (ft-transfer? .stx amount user contract-caller))
    ;; Stack on behalf
    (ok true)
  )
)
```

---

## Common Mistakes

### 1. Wrong Minimum
```typescript
// WRONG: Below minimum
const result = await stackSTX({
  amount: 1000n,  // Too low!
});

// CORRECT: Above minimum
const result = await stackSTX({
  amount: 1000000000000n,  // 10,000 STX in micro-STX
});
```

### 2. Wrong Cycles
```typescript
// WRONG: Less than 2 cycles
const result = await stackSTX({
  cycles: 1,  // Must be at least 2!
});

// CORRECT: Minimum 2 cycles
const result = await stackSTX({
  cycles: 2,
});
```

### 3. Checking Rewards Too Early
```typescript
// WRONG: Checking immediately
const rewards = await getStackerInfo({...});
console.log(rewards.reward);  // 0, cycle not complete

// CORRECT: Wait for cycle to complete
// Reward cycles are ~14 days each
```

---

## What LLMs Need to Correct

| Topic | LLM Misconception | Reality |
|-------|------------------|---------|
| Term | "Stake STX" | "Stack STX" |
| Reward | "STX rewards" | "BTC rewards" |
| Minimum | "Any amount" | ~10,000 STX minimum |
| Lockup | "Flexible" | 2 cycles minimum (28 days) |

---

## Quick Facts

- **Reward**: Bitcoin (BTC), not STX
- **Minimum**: ~10,000 STX (solo), less (pools)
- **Lockup**: 2 reward cycles (~28 days)
- **Delegation**: Supported via stacking pools
- **API**: Use `@stacks/stacking` package

---

## References

- [Stacking Documentation](https://docs.stacks.co/block-production/stacking)
- [Stacking Guide](https://docs.stacks.co/guides-and-tutorials/stack-stx/stack-with-a-pool)
- [Stacking Package](https://www.npmjs.com/package/@stacks/stacking)
- [Clarity Stacking Contracts](https://github.com/friedger/clarity-stacking-pools)
