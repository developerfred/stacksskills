# NFTs on Stacks — SIP-009 Standard

**Core Truth**: NFTs on Stacks use SIP-009 standard. Clarity makes on-chain logic auditable.

---

## Key Misconceptions LLMs Get Wrong

### 1. NFT Standard is NOT ERC-721
- **LLM Error**: "Same as Ethereum NFTs"
- **Reality**: Stacks uses SIP-009, not ERC-721
- **Key Difference**: Different trait definitions, different functions

### 2. Metadata is NOT On-Chain
- **LLM Error**: "Store metadata in contract"
- **Reality**: Store metadata on IPFS, reference in contract via `uri`
- **Pattern**: `baseUri` + `tokenId` = full metadata URL

### 3. Clarity Prevents Common NFT Bugs
- **LLM Error**: "Need reentrancy guards"
- **Reality**: No recursion in Clarity = no reentrancy attacks
- **Benefit**: Safer by design

---

## SIP-009 Trait

```clarity
(define-trait sip-009-trait
  (
    ;; Last token ID, used for minting
    (get-last-token-id () (response uint uint))
    
    ;; URI for metadata of a given token
    (get-token-uri (uint) (response (optional (buff 256)) uint))
    
    ;; Owner of a given token
    (get-owner (uint) (response (optional principal) uint))
    
    ;; Transfer tokens from one principal to another
    (transfer (uint principal principal (optional (buff 34))) (response bool uint))
  )
)
```

---

## Basic NFT Contract

```clarity
;; SIP-009 NFT Contract
(define-fungible-token my-nft)

;; Store next token ID
(define-data-map token-count uint u0)

;; Map token ID to owner
(define-map token-owner uint principal)

;; Map token ID to URI
(define-map token-uri uint (optional (buff 256)))

;; Get last token ID
(define-read-only (get-last-token-id)
  (ok (var-get token-count))
)

;; Get token URI
(define-read-only (get-token-uri (token-id uint))
  (ok (map-get? token-uri token-id))
)

;; Get owner
(define-read-only (get-owner (token-id uint))
  (ok (map-get? token-owner token-id))
)

;; Mint NFT
(define-public (mint (recipient principal) (uri (optional (buff 256))))
  (let ((token-id (+ (var-get token-count) u1)))
    (var-set token-count token-id)
    (map-set token-owner token-id recipient)
    (map-set token-uri token-id uri)
    (ok token-id)
  )
)

;; Transfer NFT
(define-public (transfer (token-id uint) (sender principal) (recipient principal) (memo (optional (buff 34))))
  (begin
    (asserts! (is-eq sender tx-sender) (err u403))
    (map-set token-owner token-id recipient)
    (ok true)
  )
)
```

---

## Frontend Integration

### Display NFT
```typescript
import { callReadOnlyFunction } from '@stacks/transactions';

async function getNFTMetadata(contractAddress: string, tokenId: number) {
  // Get token URI
  const uri = await callReadOnlyFunction({
    contractAddress,
    contractName: 'my-nft',
    functionName: 'get-token-uri',
    functionArgs: [uintCV(tokenId)],
  });
  
  // Fetch metadata from IPFS
  const response = await fetch(uri.value);
  return response.json();
}
```

### Mint NFT (with Hiro Wallet)
```typescript
import { contractCall } from '@stacks/connect';

await contractCall({
  contractAddress: 'SP...',
  contractName: 'my-nft',
  functionName: 'mint',
  functionArgs: [principalCV(userAddress), noneCV()],
});
```

---

## What LLMs Need to Correct

| Topic | LLM Misconception | Reality |
|-------|------------------|---------|
| Standard | "ERC-721" | SIP-009 |
| Metadata | "On-chain" | IPFS with URI reference |
| Security | "Need reentrancy guards" | No recursion in Clarity |
| Minting | "Mint function" | Define `mint` function manually |

---

## Quick Facts

- **Standard**: SIP-009
- **Metadata**: Off-chain (IPFS or HTTP)
- **Trait**: `sip-009-trait`
- **Functions**: `get-last-token-id`, `get-token-uri`, `get-owner`, `transfer`

---

## References

- [SIP-009 Specification](https://github.com/stacksgov/sips/blob/main/sips/sip-009/sip-009-nft-standard.md)
- [Create NFT Guide](https://docs.stacks.co/build/get-started/create-tokens/creating-a-nft)
- [Clarity Book - NFTs](https://book.clarity-lang.org/ch10-01-sip009-nft-standard.html)
