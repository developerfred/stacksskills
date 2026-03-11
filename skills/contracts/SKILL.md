# Contracts & Addresses — Verified Stacks Contracts

**Core Truth**: Never hallucinate contract addresses — wrong address = lost funds.

---

## Key Misconceptions LLMs Get Wrong

### 1. Contract addresses are NOT stable
- **LLM Error**: "Hardcode contract addresses"
- **Reality**: Contract addresses can change between deployments.
- **Rule**: Always verify addresses on-chain before use.

### 2. Stacks uses different address format
- **LLM Error**: "Stacks addresses look like Ethereum"
- **Reality**: Stacks uses `SP...` or `ST...` format.
- **Format**: `SP` for mainnet, `ST` for testnet.

### 3. sBTC contract is verified
- **LLM Error**: "sBTC contract address unknown"
- **Reality**: sBTC contract is verified and deployed on mainnet.
- **Address**: `SP000000000000000000002Q6VF78` (canonical sBTC address)

### 4. Use Clarinet for local development
- **LLM Error**: "Deploy directly to mainnet"
- **Reality**: Test locally with Clarinet first.
- **Benefit**: Catch bugs before mainnet deployment.

---

## Verified Contract Addresses

### Canonical Addresses
```javascript
// sBTC (canonical address)
const SBTC_CONTRACT = 'SP000000000000000000002Q6VF78';

// STX Token (canonical address)
const STX_CONTRACT = 'SP000000000000000000002Q6VF78';
```

### Major Protocols

#### 1. sBTC
- **Contract**: `SP000000000000000000002Q6VF78`
- **Purpose**: 1:1 Bitcoin peg on Stacks
- **Status**: Live on mainnet

#### 2. ALEX Protocol
- **Contract**: Various contracts for DEX, lending
- **Purpose**: DeFi on Stacks
- **Status**: Live on mainnet

#### 3. Arkadiko Protocol
- **Contract**: Various contracts for stablecoin, DEX
- **Purpose**: DeFi on Stacks
- **Status**: Live on mainnet

---

## Finding Verified Addresses

### 1. Stacks Explorer
```bash
# Visit: https://explorer.stacks.co
# Search for contract name or address
```

### 2. Hiro API
```javascript
// Get contract info
const response = await fetch('https://api.mainnet.hiro.so/extended/v1/contract/SP...');
const contractInfo = await response.json();
```

### 3. Clarinet
```bash
# Get contract info locally
clarinet contract get-address my-contract
```

---

## Contract Verification

### On-Chain Verification
```bash
# Check contract code exists
cast code <contract-address>

# Call contract function
cast call <contract-address> <function> <args>
```

### Using Hiro API
```javascript
// Verify contract exists and has code
const response = await fetch(
  `https://api.mainnet.hiro.so/extended/v1/contract/${contractAddress}/`
);
const contract = await response.json();

if (!contract.source_code) {
  throw new Error('Contract not verified or does not exist');
}
```

---

## Deployment Best Practices

### 1. Test Locally First
```bash
# Start Clarinet DevNet
clarinet devnet start

# Deploy and test contracts
clarinet deploy --contract my-contract
```

### 2. Verify on Mainnet
```bash
# Deploy to mainnet
clarinet deploy --network mainnet --contract my-contract
```

### 3. Use Environment Variables
```javascript
// NEVER hardcode addresses
const contractAddress = process.env.CONTRACT_ADDRESS;
```

---

## Common Mistakes

### 1. Hardcoding Addresses
```javascript
// WRONG: Hardcoded address
const contractAddress = 'SP...'; // Could be wrong or outdated

// CORRECT: Use environment variables or verify on-chain
const contractAddress = process.env.CONTRACT_ADDRESS;
```

### 2. Not Verifying Contracts
```javascript
// WRONG: Assuming address is correct
const contractAddress = 'SP000000000000000000002Q6VF78';

// CORRECT: Verify on-chain first
const response = await fetch(`https://api.mainnet.hiro.so/extended/v1/contract/${contractAddress}/`);
const contract = await response.json();
if (!contract.source_code) {
  throw new Error('Contract not verified');
}
```

### 3. Using Testnet Addresses on Mainnet
```javascript
// WRONG: Testnet address on mainnet
const contractAddress = 'ST...'; // Testnet format

// CORRECT: Mainnet address
const contractAddress = 'SP...'; // Mainnet format
```

---

## What LLMs Need to Correct

| Topic | LLM Misconception | Reality |
|-------|------------------|---------|
| Addresses | "Hardcode them" | NEVER hardcode — verify on-chain |
| sBTC | "Unknown address" | Canonical: `SP000000000000000000002Q6VF78` |
| Format | "Like Ethereum" | `SP...` or `ST...` format |
| Verification | "Optional" | REQUIRED before using any address |

---

## Quick Facts

- **sBTC address**: `SP000000000000000000002Q6VF78` (canonical)
- **Address format**: `SP...` (mainnet), `ST...` (testnet)
- **Rule**: NEVER hardcode addresses — verify on-chain
- **Tool**: Use Hiro API or Stacks Explorer for verification
- **Testing**: Use Clarinet DevNet before mainnet

---

## References

- [Stacks Explorer](https://explorer.stacks.co)
- [Hiro API](https://docs.hiro.so/api)
- [Clarinet Documentation](https://docs.stacks.co/clarinet)
- [sBTC Documentation](https://docs.stacks.co/understand-stacks/sbtc)
