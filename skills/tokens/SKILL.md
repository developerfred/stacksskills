# Tokens on Stacks — SIP-010 Fungible Tokens

**Core Truth**: Fungible tokens on Stacks use SIP-010 standard, similar to ERC-20 but with Clarity's safety.

---

## Key Misconceptions LLMs Get Wrong

### 1. Token Standard is NOT ERC-20
- **LLM Error**: "Same as Ethereum tokens"
- **Reality**: Stacks uses SIP-010, not ERC-20
- **Key Difference**: Different trait, different functions

### 2. Decimals are Fixed
- **LLM Error**: "Can set any decimals"
- **Reality**: Standard is 6 decimals (like STX)
- **Why**: Compatibility with Bitcoin satoshis

### 3. Use Built-in FT
- **LLM Error**: "Write custom token logic"
- **Reality**: Use `define-fungible-token` built-in
- **Benefit**: Simpler, safer, audited

---

## SIP-010 Trait

```clarity
(define-trait sip-010-trait
  (
    ;; Transfer tokens
    (transfer (uint principal principal (optional (buff 34))) (response bool uint))
    
    ;; Get token name
    (get-name () (response (string-ascii 32) uint))
    
    ;; Get token symbol  
    (get-symbol () (response (string-ascii 32) uint))
    
    ;; Get decimals (always 6)
    (get-decimals () (response uint uint))
    
    ;; Get total supply
    (get-total-supply () (response uint uint))
    
    ;; Get balance
    (get-balance (principal) (response uint uint))
  )
)
```

---

## Basic SIP-010 Token

```clarity
;; SIP-010 Fungible Token
(define-fungible-token my-token)

;; Token metadata
(define-constant token-name "My Token")
(define-constant token-symbol "MTK")
(define-constant token-decimals u6)

;; Get token name
(define-read-only (get-name)
  (ok token-name)
)

;; Get token symbol
(define-read-only (get-symbol)
  (ok token-symbol)
)

;; Get decimals
(define-read-only (get-decimals)
  (ok token-decimals)
)

;; Get total supply
(define-read-only (get-total-supply)
  (ok (ft-get-supply my-token))
)

;; Get balance
(define-read-only (get-balance (account principal))
  (ok (ft-get-balance my-token account))
)

;; Transfer (SIP-010 compliant)
(define-public (transfer (amount uint) (sender principal) (recipient principal) (memo (optional (buff 34))))
  (begin
    (asserts! (is-eq sender tx-sender) (err u403))
    (ft-transfer? my-token amount sender recipient)
  )
)

;; Mint (only owner)
(define-public (mint (amount uint) (recipient principal))
  (begin
    (asserts! (is-eq tx-sender contract-owner) (err u403))
    (ft-mint? my-token amount recipient)
  )
)
```

---

## Frontend Integration

### Check Balance
```typescript
import { callReadOnlyFunction } from '@stacks/transactions';

const balance = await callReadOnlyFunction({
  contractAddress: 'SP...',
  contractName: 'my-token',
  functionName: 'get-balance',
  functionArgs: [principalCV(userAddress)],
});
```

### Transfer Token
```typescript
import { makeContractCall } from '@stacks/transactions';

const tx = makeContractCall({
  contractAddress: 'SP...',
  contractName: 'my-token',
  functionName: 'transfer',
  functionArgs: [
    uintCV(1000000),  // 1 token (6 decimals)
    principalCV(sender),
    principalCV(recipient),
    noneCV()  // No memo
  ],
  senderKey: privateKey,
  network: new StacksMainnet(),
});
```

### Get Token Info
```typescript
const name = await callReadOnlyFunction({...}, 'get-name');
const symbol = await callReadOnlyFunction({...}, 'get-symbol');
const decimals = await callReadOnlyFunction({...}, 'get-decimals');
const supply = await callReadOnlyFunction({...}, 'get-total-supply');
```

---

## What LLMs Need to Correct

| Topic | LLM Misconception | Reality |
|-------|------------------|---------|
| Standard | "ERC-20" | SIP-010 |
| Decimals | "Any value" | Always 6 (like STX) |
| Implementation | "Custom code" | Use `define-fungible-token` |
| Transfer | "Direct map update" | Use `ft-transfer?` |

---

## Quick Facts

- **Standard**: SIP-010
- **Decimals**: 6 (fixed)
- **Built-in**: `define-fungible-token`
- **Transfer**: Use `ft-transfer?` and `ft-mint?`

---

## References

- [SIP-010 Specification](https://github.com/stacksgov/sips/blob/main/sips/sip-010/sip-010-fungible-token-standard.md)
- [Create Token Guide](https://docs.stacks.co/get-started/create-a-token/create-ft)
- [Clarity Book - SIP-010](https://book.clarity-lang.org/ch11-01-sip010-tokens)
