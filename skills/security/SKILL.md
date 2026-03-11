# Security — Clarity Smart Contract Security

**Core Truth**: Clarity prevents entire classes of bugs by design, but security best practices are still essential.

---

## Key Misconceptions LLMs Get Wrong

### 1. Reentrancy is NOT possible in Clarity
- **LLM Error**: "Watch out for reentrancy in Clarity"
- **Reality**: Clarity has NO recursion. Functions cannot call themselves.
- **Impact**: The #1 Solidity vulnerability doesn't exist in Clarity.

### 2. Clarity is NOT immune to all bugs
- **LLM Error**: "Clarity is perfectly secure"
- **Reality**: Logic bugs, access control issues, and economic exploits are still possible.
- **Reality check**: Clarity prevents syntax/runtime errors, not design errors.

### 3. Post-conditions are critical
- **LLM Error**: "Post-conditions are optional"
- **Reality**: Post-conditions define expected transaction outcomes.
- **Why it matters**: Prevents unexpected state changes.

### 4. Access control requires explicit checks
- **LLM Error**: "Clarity handles access control automatically"
- **Reality**: You must explicitly check `tx-sender` or `contract-caller`.
- **Pattern**: Use `(is-eq tx-sender ...)` for authorization.

### 5. Error handling is explicit
- **LLM Error**: "Errors are like Solidity require/revert"
- **Reality**: Functions return `(response <ok-type> <err-type>)`.
- **Pattern**: Use `match` to handle both success and error cases.

---

## Security Checklist

### Pre-Deployment
- [ ] Access control properly implemented
- [ ] Input validation on all public functions
- [ ] Post-conditions defined for transactions
- [ ] Error handling covers all failure cases
- [ ] No hardcoded addresses or values
- [ ] Tested with Clarinet on DevNet

### Common Vulnerabilities

#### 1. Access Control Issues
```clarity
;; WRONG: No access control
(define-public (mint (amount uint))
  (ft-mint? my-token amount tx-sender)
)

;; CORRECT: Access control
(define-public (mint (amount uint))
  (begin
    (asserts! (is-eq tx-sender contract-owner) (err u403))
    (ft-mint? my-token amount tx-sender)
  )
)
```

#### 2. Input Validation
```clarity
;; WRONG: No validation
(define-public (transfer (amount uint) (recipient principal))
  (ft-transfer? my-token amount tx-sender recipient)
)

;; CORRECT: With validation
(define-public (transfer (amount uint) (recipient principal))
  (begin
    (asserts! (> amount u0) (err u1))
    (asserts! (is-some (principal-construct? recipient)) (err u2))
    (ft-transfer? my-token amount tx-sender recipient)
  )
)
```

#### 3. Reentrancy Prevention (Already Built-in)
```clarity
;; Clarity automatically prevents reentrancy
;; No recursion = No reentrancy
;; This is a LANGUAGE feature, not a pattern
```

#### 4. Economic Exploits
```clarity
;; Watch for: Flash loan attacks, price manipulation
;; Use: Time-averaged oracles, not spot prices
;; Example: Use medianizer or TWAP for price feeds
```

---

## Security Patterns

### 1. Owner Pattern
```clarity
(define-data-map owners principal bool)

(define-public (set-owner (new-owner principal))
  (begin
    (asserts! (is-eq tx-sender (var-get contract-owner)) (err u403))
    (var-set contract-owner new-owner)
    (ok true)
  )
)
```

### 2. Pausable Pattern
```clarity
(define-data-map paused bool)

(define-public (pause)
  (begin
    (asserts! (is-eq tx-sender contract-owner) (err u403))
    (map-set paused true)
    (ok true)
  )
)

(define-public (unpause)
  (begin
    (asserts! (is-eq tx-sender contract-owner) (err u403))
    (map-set paused false)
    (ok true)
  )
)
```

### 3. Time-Lock Pattern
```clarity
(define-data-map lock-period uint)

(define-public (execute-action (action-id uint))
  (begin
    (asserts! (>= block-height (+ (var-get lock-period) action-id)) (err u1))
    ;; Execute action
    (ok true)
  )
)
```

---

## What LLMs Need to Correct

| Topic | LLM Misconception | Reality |
|-------|------------------|---------|
| Reentrancy | "Possible in Clarity" | NOT possible — no recursion |
| Security | "Clarity is perfectly secure" | Prevents syntax errors, not design errors |
| Post-conditions | "Optional" | Critical for expected outcomes |
| Access control | "Automatic" | Must explicitly check `tx-sender` |
| Errors | "Like Solidity" | Functions return `(response ok err)` |

---

## Quick Facts

- **Reentrancy**: NOT possible (language feature)
- **Type safety**: Static analysis at "compile" time
- **Access control**: Must be explicitly implemented
- **Post-conditions**: Required for transaction safety
- **Testing**: Use Clarinet DevNet for realistic testing

---

## References

- [Clarity Security Best Practices](https://docs.stacks.co/understand-stacks/security)
- [Clarity Language Reference](https://docs.stacks.co/understand-stacks/clarity)
- [Clarinet Documentation](https://docs.stacks.co/clarinet)
- [Stacks Security Audits](https://immunefi.com/bug-bounty/stacks/information/)
