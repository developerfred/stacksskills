# Frontend Integration — Stacks.js and Hiro Wallet

**Core Truth**: Use Stacks.js for all blockchain interactions, Hiro Wallet for authentication.

---

## Key Misconceptions LLMs Get Wrong

### 1. Stacks.js is NOT like ethers.js
- **LLM Error**: "Use ethers.js for Stacks"
- **Reality**: Stacks.js is the official Stacks library.
- **Why it matters**: Different APIs, different patterns.

### 2. Hiro Wallet is the primary wallet
- **LLM Error**: "Use MetaMask or WalletConnect"
- **Reality**: Use Hiro Wallet SDK for authentication.
- **Alternative**: Leather wallet for browser extension.

### 3. Post-conditions are required
- **LLM Error**: "Post-conditions are optional"
- **Reality**: Post-conditions define expected transaction outcomes.
- **Benefit**: Prevents unexpected state changes.

### 4. Read-only functions cost no gas
- **LLM Error**: "All function calls cost gas"
- **Reality**: Read-only functions cost zero gas.
- **Usage**: Use for queries, not state changes.

---

## Stacks.js Setup

### Installation
```bash
npm install @stacks/network @stacks/transactions @stacks/connect
```

### Network Configuration
```javascript
import { StacksMainnet, StacksTestnet } from '@stacks/network';

const network = new StacksMainnet(); // or StacksTestnet
```

---

## Authentication

### Hiro Wallet Authentication
```javascript
import { openAuthRequest } from '@stacks/connect';

const authOptions = {
  appDetails: {
    name: 'My dApp',
    icon: 'https://example.com/icon.png',
  },
  onFinish: (payload) => {
    console.log('Authentication complete', payload);
    // payload.stacksAddress contains user address
  },
  onCancel: () => {
    console.log('Authentication cancelled');
  },
};

openAuthRequest(authOptions);
```

### Check Authentication Status
```javascript
import { UserSession } from '@stacks/auth';

const userSession = new UserSession();

if (userSession.isUserSignedIn()) {
  const userData = userSession.loadUserData();
  console.log('User address:', userData.profile.stxAddress.mainnet);
}
```

---

## Reading Data

### Read-Only Functions (No Gas)
```javascript
import { callReadOnlyFunction } from '@stacks/transactions';

const balance = await callReadOnlyFunction({
  contractAddress: 'SP...', // Your contract address
  contractName: 'my-token',
  functionName: 'get-balance',
  functionArgs: [principalArg],
  network: new StacksMainnet(),
});

console.log('Balance:', balance);
```

### Querying Account Info
```javascript
import { getAccount } from '@stacks/api';

const accountInfo = await getAccount({
  url: 'https://api.mainnet.hiro.so',
  principal: userAddress,
});

console.log('Balance:', accountInfo.balance);
```

---

## Writing Data

### Transfer STX
```javascript
import { makeSTXTokenTransfer } from '@stacks/transactions';

const transaction = makeSTXTokenTransfer({
  recipient: recipientAddress,
  amount: amount,
  senderKey: privateKey, // NEVER commit this
  network: new StacksMainnet(),
});

const result = await broadcastTransaction(transaction, new StacksMainnet());
console.log('Transaction ID:', result.txid);
```

### Contract Call with Post-Conditions
```javascript
import { makeContractCall } from '@stacks/transactions';

const transaction = makeContractCall({
  contractAddress: 'SP...',
  contractName: 'my-contract',
  functionName: 'transfer',
  functionArgs: [amountArg, recipientArg],
  senderKey: privateKey,
  network: new StacksMainnet(),
  postConditions: [
    makeStandardSTXPostCondition(
      senderAddress,
      'equal',
      amount
    )
  ],
});

const result = await broadcastTransaction(transaction, new StacksMainnet());
```

---

## Common Patterns

### 1. Connect Wallet Button
```javascript
import { openAuthRequest } from '@stacks/connect';

function ConnectButton() {
  const handleClick = () => {
    openAuthRequest({
      appDetails: {
        name: 'My dApp',
        icon: 'https://example.com/icon.png',
      },
      onFinish: (payload) => {
        console.log('Connected:', payload.stacksAddress);
      },
    });
  };

  return <button onClick={handleClick}>Connect Wallet</button>;
}
```

### 2. Display User Balance
```javascript
import { callReadOnlyFunction } from '@stacks/transactions';

function UserBalance({ userAddress }) {
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    async function fetchBalance() {
      const result = await callReadOnlyFunction({
        contractAddress: 'SP...',
        contractName: 'my-token',
        functionName: 'get-balance',
        functionArgs: [userAddress],
        network: new StacksMainnet(),
      });
      setBalance(result);
    }
    fetchBalance();
  }, [userAddress]);

  return <div>Balance: {balance} STX</div>;
}
```

---

## Common Mistakes

### 1. Using ethers.js
```javascript
// WRONG: Trying to use ethers.js
import { ethers } from 'ethers'; // Not supported for Stacks

// CORRECT: Use Stacks.js
import { StacksMainnet } from '@stacks/network';
```

### 2. Ignoring Post-Conditions
```javascript
// WRONG: No post-conditions
const transaction = makeContractCall({
  contractAddress: 'SP...',
  contractName: 'my-contract',
  functionName: 'transfer',
  functionArgs: [amountArg, recipientArg],
});

// CORRECT: With post-conditions
const transaction = makeContractCall({
  contractAddress: 'SP...',
  contractName: 'my-contract',
  functionName: 'transfer',
  functionArgs: [amountArg, recipientArg],
  postConditions: [
    makeStandardSTXPostCondition(
      senderAddress,
      'equal',
      amount
    )
  ],
});
```

### 3. Hardcoding Private Keys
```javascript
// WRONG: Hardcoded private key
const privateKey = 'abc123...';

// CORRECT: Use environment variables
const privateKey = process.env.PRIVATE_KEY;
```

---

## What LLMs Need to Correct

| Topic | LLM Misconception | Reality |
|-------|------------------|---------|
| Library | "Use ethers.js" | Use Stacks.js |
| Wallet | "Use MetaMask" | Use Hiro Wallet |
| Post-conditions | "Optional" | Required for safety |
| Read-only | "Costs gas" | Zero gas cost |

---

## Quick Facts

- **Library**: Stacks.js (not ethers.js)
- **Wallet**: Hiro Wallet (primary)
- **Post-conditions**: Required for transactions
- **Read-only functions**: Zero gas cost
- **Authentication**: Use Stacks Connect

---

## References

- [Stacks.js Documentation](https://docs.stacks.co/understand-stacks/stacks.js)
- [Hiro Wallet](https://www.hiro.so/wallet)
- [Stacks Connect](https://docs.stacks.co/understand-stacks/authentication)
- [Stacks API](https://docs.hiro.so/api)
