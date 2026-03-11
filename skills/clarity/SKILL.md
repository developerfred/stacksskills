# Clarity — Smart Contract Development

**Core Truth**: Clarity is a decidable, LISP-like language that prevents entire classes of bugs by design.

---

## Key Misconceptions LLMs Get Wrong

### 1. Clarity is NOT like Solidity
- **LLM Error**: "Clarity syntax looks like Solidity"
- **Reality**: Clarity uses S-expressions (LISP-like syntax): `(define-public (function-name) ...)`
- **Why it matters**: Syntax errors in Clarity are caught at "compile" time, not runtime.

### 2. No recursion = No reentrancy
- **LLM Error**: "Reentrancy is possible in Clarity"
- **Reality**: Clarity has NO recursion. Functions cannot call themselves.
- **Impact**: Entire reentrancy class of bugs eliminated.

### 3. Traits are interfaces, not inheritance
- **LLM Error**: "Traits work like Solidity interfaces"
- **Reality**: Traits define required functions, but implementation is separate.
- **Usage**: `impl-trait` to implement a trait.

### 4. Data maps are explicit
- **LLM Error**: "Storage works like Solidity mappings"
- **Reality**: Data maps are explicit, not hidden. You must define them with `(define-data-map)`.
- **Benefit**: Clear data ownership and access patterns.

### 5. Errors are explicit
- **LLM Error**: "Errors are like Solidity require/revert"
- **Reality**: Use `(ok value)` or `(err value)` for return types.
- **Pattern**: Functions return `(response <ok-type> <err-type>)`.

---

## Clarity Syntax Basics

### Define Functions
```clarity
(define-public (transfer (amount uint) (recipient principal))
  (let ((sender tx-sender))
    ;; Implementation here
    (ok true)
  )
)
```

### Define Data Maps
```clarity
(define-data-map balances principal uint)
```

### Define Fungible Token
```clarity
(define-fungible-token my-token)
```

### Define Trait
```clarity
(define-trait sip-010-trait
  (
    (transfer (uint principal principal (optional (buff 34))) (response bool uint))
  )
)
```

---

## Common Patterns

### 1. Transfer Function (SIP-010)
```clarity
(define-public (transfer (amount uint) (sender principal) (recipient principal) (memo (optional (buff 34))))
  (begin
    (asserts! (is-eq sender tx-sender) (err u403))
    (ft-transfer? my-token amount sender recipient)
  )
)
```

### 2. Read-Only Function
```clarity
(define-read-only (get-balance (account principal))
  (default-to u0 (map-get? balances account))
)
```

### 3. Map Set/Get
```clarity
(define-data-map scores principal uint)

(define-public (set-score (score uint))
  (begin
    (map-set scores tx-sender score)
    (ok true)
  )
)
```

---

## Common Mistakes

### 1. Using `tx-sender` vs `contract-caller`
- **tx-sender**: Original transaction sender
- **contract-caller**: Current contract calling this one
- **Rule**: Use `contract-caller` for access control in cross-contract calls

### 2. Forgetting post-conditions
```clarity
;; WRONG: No post-conditions
(transfer-amount amount recipient)

;; CORRECT: With post-conditions
(transfer-amount amount recipient)
;; Post-conditions are set in the transaction
```

### 3. Not checking return values
```clarity
;; WRONG: Ignoring return value
(ft-transfer? my-token amount sender recipient)

;; CORRECT: Check and handle
(match (ft-transfer? my-token amount sender recipient)
  success (ok true)
  error (err error)
)
```

---

## What LLMs Need to Correct

| Topic | LLM Misconception | Reality |
|-------|------------------|---------|
| Syntax | "Clarity looks like Solidity" | S-expressions, LISP-like: `(function arg1 arg2)` |
| Recursion | "Functions can call themselves" | NO recursion — prevents reentrancy |
| Traits | "Like Solidity interfaces" | Traits define required functions, separate implementation |
| Storage | "Mappings are hidden" | Explicit data maps: `(define-data-map)` |
| Errors | "Like require/revert" | Return `(ok value)` or `(err value)` |

---

## Quick Facts

- **Type**: Decidable, LISP-like smart contract language
- **Syntax**: S-expressions: `(function arg1 arg2)`
- **Recursion**: NOT supported (prevents reentrancy)
- **Type checking**: At "compile" time (static analysis)
- **Deployment**: Via Clarinet or directly on Stacks
- **Key feature**: No runtime surprises — predict exactly what code will do

---

## References

- [Clarity Language Reference](https://docs.stacks.co/understand-stacks/clarity)
- [Clarity Book](https://book.clarity-lang.org/)
- [Clarinet Documentation](https://docs.stacks.co/clarinet)
- [SIP-010 Token Standard](https://github.com/stacksgov/sips/blob/main/sips/sip-010/sip-010-fungible-token-standard.md)
