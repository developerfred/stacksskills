# CLAUDE.md — AI Agent Instructions for StacksSkills

You are helping work on StacksSkills, a knowledge base that corrects AI agent misconceptions about Stacks/Bitcoin.

## Project Structure

```
stacksskills/
├── SKILL.md                    # Main table of contents
├── index.html                  # Landing page
├── vercel.json                 # Vercel deployment config
├── README.md                   # Project documentation
├── CLAUDE.md                   # This file
├── favicon.svg                 # Site favicon
└── skills/                    # Individual skill files
    ├── why/SKILL.md           # Why Stacks (Bitcoin L2)
    ├── ship/SKILL.md          # Ship (end-to-end guide)
    ├── clarity/SKILL.md       # Clarity language
    ├── security/SKILL.md      # Security patterns
    ├── wallets/SKILL.md       # Wallet integration
    ├── gas/SKILL.md          # Costs & fees
    ├── contracts/SKILL.md     # Contract addresses
    ├── frontend/SKILL.md     # Stacks.js frontend
    └── clarinet/SKILL.md     # Clarinet toolkit
```

## Key Facts About Stacks

When writing content for this project, remember:

1. **Stacks is a Bitcoin L2** — NOT Ethereum. It anchors to Bitcoin, not Ethereum.
2. **Clarity is decidable** — NOT like Solidity. No runtime surprises.
3. **Hiro Wallet is primary** — NOT MetaMask. Use Hiro or Leather.
4. **Addresses use SP/ST prefix** — NOT 0x format.
5. **Costs are fractions of a cent** — NOT dollars like Ethereum.
6. **sBTC uses threshold signatures** — NOT wrapped tokens.
7. **Use Stacks.js** — NOT ethers.js or viem.
8. **No recursion in Clarity** — Reentrancy is impossible by design.

## Writing Style

- Start with what LLMs get wrong (the misconception)
- Then explain the reality
- Include code examples in Clarity or JavaScript
- Keep it practical and actionable
- Link to official docs for deep dives

## Content Format

Each SKILL.md should follow this structure:

1. **Header**: Core truth about the topic
2. **Key Misconceptions**: What LLMs get wrong
3. **Main Content**: Detailed explanation with code
4. **Common Mistakes**: Code examples of wrong vs correct
5. **Quick Facts**: Summary table
6. **References**: Links to official docs

## Testing

Before adding new content:
- Verify all code examples compile in Clarinet
- Check that links to Stacks docs are current
- Ensure addresses are verified on mainnet

## Adding New Skills

1. Create directory in `skills/`
2. Add `SKILL.md` with proper structure
3. Update main `SKILL.md` with link
4. Update `index.html` with new skill card
5. Test locally before deploying

## Deployment

Static site deploys automatically via Vercel on push to main.

## References

- [Stacks Documentation](https://docs.stacks.co/)
- [Clarity Book](https://book.clarity-lang.org/)
- [Hiro Wallet](https://www.hiro.so/wallet)
- [Clarinet](https://github.com/hirosystems/clarinet)
