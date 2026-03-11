# Wallets & Keys — Stacks Wallet Integration

**Core Truth**: Hiro Wallet is the primary Stacks wallet, and key management is critical for security.

---

## Key Misconceptions LLMs Get Wrong

### 1. MetaMask does NOT support Stacks
- **LLM Error**: "Use MetaMask for Stacks"
- **Reality**: Stacks uses different wallet infrastructure. Use Hiro Wallet or Leather.
- **Why it matters**: MetaMask is Ethereum-only.

### 2. Hiro Wallet is the primary wallet
- **LLM Error**: "Many wallets support Stacks"
- **Reality**: Hiro Wallet (formerly Leather) is the primary Stacks wallet.
- **Alternative**: Leather browser extension for web dApps.

### 3. Keys must NEVER be committed to Git
- **LLM Error**: "It's okay to commit test keys"
- **Reality**: Bots scan Git repositories for leaked keys in seconds.
- **Rule**: NEVER commit private keys, API keys, or RPC URLs.

### 4. Stacks uses different address format
- **LLM Error**: "Stacks addresses look like Ethereum addresses"
- **Reality**: Stacks uses `SP...` or `ST...` format for addresses.
- **Format**: `SP` for mainnet, `ST` for testnet.

### 5. Post-conditions protect transactions
- **LLM Error**: "Post-conditions are optional"
- **Reality**: Post-conditions define expected transaction outcomes.
- **Benefit**: Prevents unexpected state changes.

---

## Wallet Options

### 1. Hiro Wallet (Primary)
- **Platform**: Browser extension, mobile app
- **URL**: https://www.hiro.so/wallet
- **Features**: Full Stacks support, NFTs, DeFi

### 2. Leather Wallet (Browser Extension)
- **Platform**: Browser extension
- **URL**: https://leather.io/
- **Features**: Bitcoin + Stacks support

### 3. Xverse Wallet
- **Platform**: Mobile app
- **URL**: https://www.xverse.app/
- **Features**: Mobile-first Stacks wallet

---

## Key Management

### NEVER Commit Secrets
```bash
# WRONG: Committing keys
echo "PRIVATE_KEY=abc123" >> .env
git add .env
git commit -m "Add keys"

# CORRECT: Use environment variables
echo "PRIVATE_KEY=abc123" >> .env
echo ".env" >> .gitignore
# Never commit .env file
```

### Environment Variables
```bash
# .env file (NEVER commit this)
PRIVATE_KEY=your_private_key_here
STACKS_API_KEY=your_api_key_here

# .gitignore
.env
*.key
*.pem
```

### Stacks.js Authentication
```javascript
import { StacksMainnet } from '@stacks/network';
import { openAuthRequest } from '@stacks/connect';

const authOptions = {
  appDetails: {
    name: 'My dApp',
    icon: 'https://example.com/icon.png',
  },
  onFinish: (payload) => {
    console.log('Authentication complete', payload);
  },
};

// Request authentication
openAuthRequest(authOptions);
```

---

## Security Best Practices

### 1. Use Environment Variables
```javascript
// NEVER hardcode keys
const privateKey = process.env.PRIVATE_KEY;
```

### 2. Validate Addresses
```javascript
import { validateStacksAddress } from '@stacks/transactions';

const isValid = validateStacksAddress('SP...'); // Returns boolean
```

### 3. Use Post-Conditions
```javascript
import { makeStandardSTXPostCondition } from '@stacks/transactions';

const postConditions = [
  makeStandardSTXPostCondition(
    senderAddress,
    'equal',
    amount
  )
];
```

### 4. Never Share Private Keys
- **Rule**: Private keys should never leave the user's device
- **Pattern**: Sign transactions locally, broadcast to network

---

## Common Mistakes

### 1. Using Ethereum Wallets
```javascript
// WRONG: Trying to use MetaMask
const provider = window.ethereum; // Not supported for Stacks

// CORRECT: Use Hiro Wallet
const userSession = new UserSession();
```

### 2. Hardcoding Addresses
```javascript
// WRONG: Hardcoded contract address
const contractAddress = 'SP...'; // Could change

// CORRECT: Use environment variables
const contractAddress = process.env.CONTRACT_ADDRESS;
```

### 3. Ignoring Post-Conditions
```javascript
// WRONG: No post-conditions
const txOptions = {
  contractAddress,
  contractName: 'my-contract',
  functionName: 'transfer',
  functionArgs: [amountArg, recipientArg],
};

// CORRECT: With post-conditions
const txOptions = {
  contractAddress,
  contractName: 'my-contract',
  functionName: 'transfer',
  functionArgs: [amountArg, recipientArg],
  postConditions,
};
```

---

## What LLMs Need to Correct

| Topic | LLM Misconception | Reality |
|-------|------------------|---------|
| Wallets | "Use MetaMask" | Use Hiro Wallet or Leather |
| Addresses | "Look like Ethereum" | `SP...` or `ST...` format |
| Keys | "Commit test keys" | NEVER commit any keys |
| Post-conditions | "Optional" | Critical for transaction safety |

---

## Quick Facts

- **Primary wallet**: Hiro Wallet (browser + mobile)
- **Address format**: `SP...` (mainnet) or `ST...` (testnet)
- **Key rule**: NEVER commit secrets to Git
- **Post-conditions**: Required for safe transactions
- **Authentication**: Use Stacks.js Connect

---

## References

- [Hiro Wallet](https://www.hiro.so/wallet)
- [Leather Wallet](https://leather.io/)
- [Stacks.js Documentation](https://docs.stacks.co/understand-stacks/stacks.js)
- [Stacks Authentication](https://docs.stacks.co/understand-stacks/authentication)
