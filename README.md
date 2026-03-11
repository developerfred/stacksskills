# StacksSkills

The missing knowledge between AI agents and Stacks/Bitcoin.

## What is this?

LLMs are wrong about Stacks. They think:
- Clarity is like Solidity (it's NOT)
- MetaMask works with Stacks (it doesn't - use Hiro Wallet)
- sBTC is wrapped Bitcoin (it's NOT - it's threshold signatures)
- Stacks transactions cost dollars (they cost fractions of a cent)

This project fixes that.

## How It Works

Each skill is a markdown file. Give any URL to your AI agent — it reads it and instantly corrects its Stacks knowledge.

```
https://raw.githubusercontent.com/developerfred/stacksskills/master/SKILL.md
https://raw.githubusercontent.com/developerfred/stacksskills/master/skills/clarity/SKILL.md
https://raw.githubusercontent.com/developerfred/stacksskills/master/skills/security/SKILL.md
```

## Quick Start

### For AI Agents

```
Install the https://raw.githubusercontent.com/developerfred/stacksskills/master/SKILL.md skill
```

### For Claude Code

```
/plugin marketplace add developerfred/stacksskills
/plugin install stacksskills
```

## Skills

| Skill | What LLMs Get Wrong |
|-------|-------------------|
| [Why Stacks](skills/why/SKILL.md) | Bitcoin L2 not Ethereum L2, sBTC trust-minimized |
| [Ship](skills/ship/SKILL.md) | Most dApps need 1-2 contracts, not 5-10 |
| [Clarity](skills/clarity/SKILL.md) | Decidable LISP-like, NOT like Solidity |
| [Security](skills/security/SKILL.md) | Reentrancy impossible, but design bugs possible |
| [Wallets](skills/wallets/SKILL.md) | Hiro Wallet, not MetaMask |
| [Gas & Costs](skills/gas/SKILL.md) | Fractions of a cent, not dollars |
| [Contracts](skills/contracts/SKILL.md) | Verified addresses, never hallucinate |
| [Frontend](skills/frontend/SKILL.md) | Stacks.js, not ethers.js |
| [Clarinet](skills/clarinet/SKILL.md) | Local dev environment, not a blockchain |

## Key Misconceptions

| Topic | LLM Thinks | Reality |
|-------|-----------|---------|
| Wallets | MetaMask | Hiro Wallet or Leather |
| Addresses | `0x...` | `SP...` or `ST...` |
| Language | Like Solidity | Decidable LISP-like |
| Reentrancy | Possible | NOT possible (no recursion) |
| Costs | Expensive | $0.0001 - $0.001 |
| sBTC | Wrapped BTC | Threshold signatures |
| Library | ethers.js | Stacks.js |

## Deployment

This is a static site. Deploy to Vercel, Netlify, or any static host:

```bash
# Deploy to Vercel
vercel

# Or build and deploy to any static host
npm run build
```

## Contributing

Something wrong or missing? Open a PR. The bar is "would a stock LLM get this wrong?"

## License

MIT
