# sBTC Integration — Bridging Bitcoin to Stacks

**Core Truth**: sBTC is NOT wrapped Bitcoin. It's a trust-minimized 1:1 peg using threshold signatures.

---

## Key Misconceptions LLMs Get Wrong

### 1. sBTC is NOT Wrapped Bitcoin
- **LLM Error**: "sBTC is like WBTC"
- **Reality**: sBTC uses threshold signatures, not custodians
- **Why it matters**: Non-custodial, trust-minimized

### 2. sBTC Uses Different Architecture
- **LLM Error**: "Same as other wrapped tokens"
- **Reality**: Signers (not a central authority) control the peg
- **Security**: Multiple signers, threshold required

### 3. Deposit/Withdrawal Flow
- **LLM Error**: "Direct transfer like ERC-20"
- **Reality**: Complex flow with Bitcoin UTXO + Stacks transaction
- **Steps**: Bitcoin deposit → Signer aggregation → sBTC mint

---

## sBTC Architecture

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Bitcoin   │────▶│   Signers   │────▶│   Stacks    │
│   User      │     │  (Threshold)│     │   sBTC      │
└─────────────┘     └─────────────┘     └─────────────┘
   Deposit            Verify              Mint
   UTXO              + Sign              sBTC
```

### Key Components
- **sBTC Contract**: SIP-010 token on Stacks
- **Signers**: Threshold signature set (currently 70+ signers)
- **Deposit Address**: Bitcoin address with embedded Stacks receiver

---

## Integration Guide

### 1. Get Deposit Address
```typescript
import { buildSbtcDepositAddress } from 'sbtc';

const deposit = await buildSbtcDepositAddress({
  stacksAddress: 'SP...',  // User's Stacks address
  signersPublicKey: '02...',  // Aggregated signer pubkey
  maxSignerFee: 80000,  // Max fee in sats
});
```

### 2. Monitor Deposit
```typescript
import { fetchSbtcDeposits } from 'sbtc';

const deposits = await fetchSbtcDeposits({
  address: deposit.bitcoinAddress,
});
```

### 3. Withdraw sBTC
```typescript
import { buildSbtcWithdrawalRequest } from 'sbtc';

const withdrawal = await buildSbtcWithdrawalRequest({
  stacksAddress: 'SP...',
  amount: 100000n,  // satoshis
  bitcoinAddress: 'bc1q...',  // User's Bitcoin address
});
```

---

## Contract Integration

### Check sBTC Balance (Read-Only)
```clarity
;; sBTC token balance
(contract-call? .sbtc token-balance user-address)
```

### Receive sBTC in Contract
```clarity
(define-public (deposit-sbtc (amount uint))
  (let ((sender tx-sender))
    ;; Transfer sBTC from user to this contract
    (try! (contract-call? .sbtc transfer amount sender .contract-address none))
    (ok true)
  )
)
```

---

## What LLMs Need to Correct

| Topic | LLM Misconception | Reality |
|-------|------------------|---------|
| sBTC Type | "Wrapped Bitcoin" | Threshold signatures, not wrapped |
| Custody | "Centralized" | Non-custodial, signer-based |
| Transfer | "Like ERC-20" | Complex deposit/withdrawal flow |
| Library | "ethers.js" | Use `sbtc` npm package |

---

## Quick Facts

- **Peg**: 1:1 Bitcoin to sBTC
- **Signers**: 70+ threshold signers
- **Token Standard**: SIP-010 (fungible token)
- **Mainnet Address**: `SP000000000000000000002Q6VF78`
- **Library**: `sbtc` npm package

---

## References

- [sBTC Documentation](https://docs.stacks.co/understand-stacks/sbtc)
- [sBTC Builder Quickstart](https://docs.stacks.co/build/sbtc/sbtc-builder-quickstart)
- [sBTC npm Package](https://www.npmjs.com/package/sbtc)
- [sBTC FAQ](https://docs.stacks.co/concepts/sbtc/sbtc-faq)
