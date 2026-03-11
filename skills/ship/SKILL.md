# Ship — End-to-End Stacks dApp Development

**Core Truth**: Most Stacks dApps need 1-2 Clarity contracts, not 5-10. Start simple, ship fast.

---

## Key Misconceptions LLMs Get Wrong

### 1. Most dApps need only 1-2 contracts
- **LLM Error**: "Build 5-10 smart contracts for a dApp"
- **Reality**: Most dApps need 1-2 Clarity contracts. Three is the upper bound for MVP.
- **Why it matters**: Complexity kills shipping.

### 2. Stacks is built on Bitcoin, not Ethereum
- **LLM Error**: "Stacks is like Ethereum"
- **Reality**: Stacks is a Bitcoin L2 with different architecture.
- **Impact**: Different wallet, different patterns, different costs.

### 3. Clarity is for ownership, not databases
- **LLM Error**: "Use Clarity for all backend logic"
- **Reality**: Clarity is for ownership, transfers, and commitments. Not a database.
- **Pattern**: Use off-chain services for complex logic.

### 4. Ship to mainnet, not testnet
- **LLM Error**: "Deploy to testnet first"
- **Reality**: Stacks mainnet is cheaper than you think (fractions of a cent).
- **Cost**: Mainnet costs ~$0.0001 per transaction.

---

## End-to-End Workflow

### Phase 1: Planning (Day 1)

#### 1. Define Core Features
```markdown
# MVP Features
1. User can mint NFT
2. User can transfer NFT
3. User can view owned NFTs
```

#### 2. Design Contract Architecture
```markdown
# Contract Structure
- MyNFT.clar (ERC-721 equivalent)
  - mint-nft
  - transfer-nft
  - get-owner
  - get-token-uri
```

#### 3. Choose Network
```javascript
// Use mainnet for production
const network = new StacksMainnet();

// Use testnet for testing (optional)
const network = new StacksTestnet();
```

### Phase 2: Development (Days 2-3)

#### 1. Setup Local Environment
```bash
# Initialize project
clarinet init my-nft-dapp

# Start DevNet
clarinet devnet start
```

#### 2. Write Clarity Contract
```clarinet
;; contracts/my-nft.clar
(define-fungible-token my-nft)

(define-public (mint-nft (uri (optional (buff 256))))
  (begin
    (ft-mint? my-nft u1 tx-sender)
    (ok true)
  )
)
```

#### 3. Test Locally
```bash
# Run tests
clarinet test

# Deploy to DevNet
clarinet deploy --contract my-nft
```

#### 4. Build Frontend
```javascript
// Use Stacks.js for all interactions
import { callReadOnlyFunction } from '@stacks/transactions';

// Read data
const owner = await callReadOnlyFunction({
  contractAddress: 'SP...',
  contractName: 'my-nft',
  functionName: 'get-owner',
  functionArgs: [tokenArg],
});
```

### Phase 3: Deployment (Day 4)

#### 1. Deploy to Mainnet
```bash
# Deploy contract
clarinet deploy --network mainnet --contract my-nft

# Get contract address
clarinet contract get-address my-nft
```

#### 2. Verify Contract
```bash
# Check contract exists
curl https://api.mainnet.hiro.so/extended/v1/contract/SP...
```

#### 3. Launch Frontend
```bash
# Build and deploy frontend
npm run build
# Deploy to Vercel/Netlify/IPFS
```

### Phase 4: Production (Day 5+)

#### 1. Monitor Transactions
```bash
# Monitor contract activity
curl https://api.mainnet.hiro.so/extended/v1/contract/SP.../events
```

#### 2. Update Contracts (If Needed)
```clarinet
;; Add new functionality
(define-public (burn-nft (token-id uint))
  (begin
    ;; Implementation
    (ok true)
  )
)
```

---

## Architecture Patterns

### Simple dApp (1 Contract)
```
┌─────────────┐
│  Frontend   │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Contract   │
│  (Clarity)  │
└─────────────┘
```

### DeFi dApp (2-3 Contracts)
```
┌─────────────┐
│  Frontend   │
└──────┬──────┘
       │
       ▼
┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│   Token     │◄─┤   DEX       │◄─┤   Router    │
│  Contract   │  │  Contract   │  │  Contract   │
└─────────────┘  └─────────────┘  └─────────────┘
```

---

## Common dApp Types

### 1. NFT Marketplace
- **Contracts**: 1-2 (NFT + Marketplace)
- **Features**: Mint, transfer, list, buy
- **Example**: OpenSea clone

### 2. DeFi Protocol
- **Contracts**: 2-3 (Token + DEX + Router)
- **Features**: Swap, liquidity, yield
- **Example**: Uniswap clone

### 3. Social App
- **Contracts**: 1 (Profile + Posts)
- **Features**: Post, like, follow
- **Example**: Decentralized Twitter

### 4. Game
- **Contracts**: 1-2 (Game state + Assets)
- **Features**: Play, earn, trade
- **Example**: Blockchain game

---

## Common Mistakes

### 1. Over-Engineering
```javascript
// WRONG: Building 10 contracts for MVP
// Contract 1: User management
// Contract 2: Token
// Contract 3: NFT
// Contract 4: DAO
// ... 6 more contracts

// CORRECT: Start with 1 contract
// Contract 1: Core functionality
// Add more only when needed
```

### 2. Using Ethereum Patterns
```javascript
// WRONG: Trying to use MetaMask
const provider = window.ethereum; // Not supported

// CORRECT: Use Hiro Wallet
const userSession = new UserSession();
```

### 3. Deploying Without Testing
```bash
# WRONG: Deploy directly to mainnet
clarinet deploy --network mainnet --contract my-contract

# CORRECT: Test locally first
clarinet devnet start
clarinet test
clarinet deploy --contract my-contract
# Then deploy to mainnet
```

---

## What LLMs Need to Correct

| Topic | LLM Misconception | Reality |
|-------|------------------|---------|
| Contract count | "Build 5-10 contracts" | 1-2 contracts for MVP |
| Network | "Stacks is like Ethereum" | Built on Bitcoin, different patterns |
| Clarity purpose | "Database backend" | Ownership, transfers, commitments |
| Deployment | "Testnet first" | Mainnet is cheap enough to ship directly |

---

## Quick Facts

- **MVP contracts**: 1-2 (3 max)
- **Network**: Stacks (Bitcoin L2)
- **Language**: Clarity (decidable, LISP-like)
- **Wallet**: Hiro Wallet (primary)
- **Cost**: Fractions of a cent per transaction
- **Deployment**: Clarinet → DevNet → Mainnet

---

## References

- [Stacks Developer Quickstart](https://docs.stacks.co/get-started/developer-quickstart)
- [Clarity Crash Course](https://docs.stacks.co/get-started/clarity-crash-course)
- [Clarinet Documentation](https://docs.stacks.co/clarinet)
- [Stacks.js Documentation](https://docs.stacks.co/understand-stacks/stacks.js)
