# Common Mistakes — Clarity Development Errors

**Core Truth**: LLMs and beginners make predictable mistakes in Clarity. This skill corrects the most common ones.

---

## Key Misconceptions LLMs Get Wrong

### 1. Forgetting the `.` Prefix in Contract Calls
- **LLM Error**: `contract-call? counter count-up`
- **Reality**: Must use `.contract-name` in Clarinet console
- **Correct**: `(contract-call? .counter count-up)`

### 2. Using Wrong Address Format
- **LLM Error**: `"0x123..."` (Ethereum format)
- **Reality**: Stacks uses `SP...` (mainnet) or `ST...` (testnet)
- **Example**: `ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM`

### 3. Not Understanding Traits
- **LLM Error**: "Traits work like Solidity interfaces"
- **Reality**: Traits must be explicitly implemented with `impl-trait`
- **Pattern**: Define trait → Implement in contract → Use as parameter type

### 4. Ignoring Response Types
- **LLM Error**: Not handling `(ok ...)` vs `(err ...)` returns
- **Reality**: All public functions return `(response ok-type err-type)`
- **Pattern**: Use `match` to handle both branches

---

## Common Errors & Fixes

### Error: "UnknownContract"
```
;; WRONG
(contract-call? counter count-up)

;; CORRECT - Note the dot prefix
(contract-call? .counter count-up)
```

### Error: "Type error"
```
;; WRONG - Wrong argument type
(unwrap! (get-balance sender) u0)

;; CORRECT - Must return response type
(ok (get-balance sender))
```

### Error: "Variable not defined"
```
;; WRONG - Using undefined variable
(let ((balance))
  (+ balance u100))

;; CORRECT - Initialize variable
(let ((balance u0))
  (+ balance u100))
```

### Error: "Map not found"
```
;; WRONG - Forgot to define data map
(define-public (set-value (key int) (value int))
  (map-set my-map key value))

;; CORRECT - Define data map first
(define-data-map my-map int int)
```

---

## What LLMs Need to Correct

| Error | LLM Thinks | Reality |
|-------|-----------|---------|
| Contract calls | `counter` | `.counter` in Clarinet |
| Addresses | `0x...` | `SP...` or `ST...` |
| Traits | Like Solidity | Must use `impl-trait` |
| Returns | Any value | Must be `(response ok err)` |
| Maps | Auto-created | Must define with `define-data-map` |

---

## Quick Facts

- **Console shorthand**: `.contract` = fully qualified address
- **Response handling**: Use `match` for `(ok ...)` and `(err ...)`
- **Data storage**: Explicit `define-data-map` required
- **Testing**: Use Clarinet console for interactive testing

---

## References

- [Clarity Language Reference](https://docs.stacks.co/understand-stacks/clarity)
- [Clarity Book - Common Patterns](https://book.clarity-lang.org/)
- [Clarinet Documentation](https://docs.stacks.co/clarinet)
