# Clarinet — Clarity Development Toolkit

**Core Truth**: Clarinet is the local development environment for Clarity smart contracts.

---

## Key Misconceptions LLMs Get Wrong

### 1. Clarinet is NOT a blockchain
- **LLM Error**: "Clarinet is a testnet"
- **Reality**: Clarinet is a local development toolkit.
- **Why it matters**: You don't deploy to Clarinet — you test locally.

### 2. DevNet simulates mainnet
- **LLM Error**: "DevNet is just a local network"
- **Reality**: DevNet simulates mainnet behavior including Bitcoin anchoring.
- **Benefit**: Realistic testing without mainnet costs.

### 3. You don't deploy to Clarinet
- **LLM Error**: "Deploy to Clarinet"
- **Reality**: Deploy to DevNet for testing, then mainnet for production.
- **Clarinet purpose**: Local development and testing.

### 4. Tests are separate from contracts
- **LLM Error**: "Tests are in the contract file"
- **Reality**: Tests are in separate test files using Clarinet's testing framework.
- **Structure**: Contract files in `contracts/`, tests in `tests/`.

---

## Clarinet Setup

### Installation
```bash
# macOS
brew install clarinet

# Linux
curl -L https://github.com/hirosystems/clarinet/releases/download/v1.0.0/clarinet-linux-x64 -o clarinet
chmod +x clarinet
sudo mv clarinet /usr/local/bin/

# Windows (via Chocolatey)
choco install clarinet
```

### Initialize Project
```bash
# Create new project
clarinet init my-project

# Directory structure:
# my-project/
# ├── contracts/
# │   └── my-contract.clar
# ├── tests/
# │   └── my-contract_test.ts
# ├── Clarinet.toml
# └── settings/Devnet.toml
```

---

## Project Structure

### Clarinet.toml
```toml
[project]
name = "my-project"
requirements = []

[contracts.my-contract]
path = "contracts/my-contract.clar"
```

### Devnet.toml
```toml
[devnet]
bitcoin_node_rpc_address = "http://127.0.0.1:18443"
bitcoin_node_username = "devnet"
bitcoin_node_password = "devnet"
```

---

## Development Workflow

### 1. Write Contract
```clarinet
;; contracts/my-contract.clar
(define-data-map balances principal uint)

(define-public (get-balance (account principal))
  (ok (default-to u0 (map-get? balances account)))
)
```

### 2. Start DevNet
```bash
# Start local blockchain
clarinet devnet start

# DevNet includes:
# - Stacks blockchain
# - Bitcoin node
# - Bitcoin miner
# - Hiro API
```

### 3. Deploy Contract
```bash
# Deploy to DevNet
clarinet deploy --contract my-contract

# Check deployment
clarinet contract get-address my-contract
```

### 4. Test Contract
```bash
# Run tests
clarinet test

# Run specific test
clarinet test tests/my-contract_test.ts
```

### 5. Interact with Contract
```bash
# Call contract function
clarinet contract call my-contract get-balance "SP..."

# Check contract state
clarinet contract get-state my-contract
```

---

## Testing

### Test File Structure
```typescript
// tests/my-contract_test.ts
import { Cl } from "@stacks/transactions";
import { describe, expect, it } from "vitest";

const contract = "my-contract";

describe("test my contract", () => {
  it("should get balance", () => {
    const { result } = simnet.callReadOnlyFn(
      contract,
      "get-balance",
      [Cl.principal("SP...")],
      simnet.deployer
    );
    expect(result).toBeOk(Cl.uint(0));
  });
});
```

### Running Tests
```bash
# Run all tests
clarinet test

# Run with verbose output
clarinet test --verbose

# Run specific test file
clarinet test tests/my-contract_test.ts
```

---

## Common Commands

### Project Management
```bash
# Initialize project
clarinet init my-project

# Check configuration
clarinet check

# Start DevNet
clarinet devnet start

# Stop DevNet
clarinet devnet stop

# Deploy contract
clarinet deploy --contract my-contract

# Run tests
clarinet test
```

### Contract Interaction
```bash
# Get contract address
clarinet contract get-address my-contract

# Call contract function
clarinet contract call my-contract my-function "arg1" "arg2"

# Get contract state
clarinet contract get-state my-contract
```

---

## Common Mistakes

### 1. Deploying Directly to Mainnet
```bash
# WRONG: Deploying without testing
clarinet deploy --network mainnet --contract my-contract

# CORRECT: Test locally first
clarinet devnet start
clarinet deploy --contract my-contract
clarinet test
# Then deploy to mainnet
```

### 2. Wrong Path in Clarinet.toml
```toml
# WRONG: Wrong path
[contracts.my-contract]
path = "src/my-contract.clar"  # Doesn't exist

# CORRECT: Correct path
[contracts.my-contract]
path = "contracts/my-contract.clar"
```

### 3. Not Starting DevNet
```bash
# WRONG: Trying to deploy without DevNet
clarinet deploy --contract my-contract
# Error: No network available

# CORRECT: Start DevNet first
clarinet devnet start
clarinet deploy --contract my-contract
```

---

## What LLMs Need to Correct

| Topic | LLM Misconception | Reality |
|-------|------------------|---------|
| Clarinet | "It's a blockchain" | Local development toolkit |
| DevNet | "Just a local network" | Simulates mainnet behavior |
| Deployment | "Deploy to Clarinet" | Deploy to DevNet/mainnet, test with Clarinet |
| Tests | "In contract file" | Separate test files in `tests/` directory |

---

## Quick Facts

- **Purpose**: Local development toolkit for Clarity
- **DevNet**: Simulates mainnet for realistic testing
- **Tests**: Separate files using Vitest framework
- **Deployment**: DevNet for testing, mainnet for production
- **Cost**: Free local development

---

## References

- [Clarinet Documentation](https://docs.stacks.co/clarinet)
- [Clarinet GitHub](https://github.com/hirosystems/clarinet)
- [Clarity Book](https://book.clarity-lang.org/)
- [Stacks Developer Quickstart](https://docs.stacks.co/get-started/developer-quickstart)
