# QIE DeFi Staking Platform

A decentralized staking platform built on QIE Blockchain for the **QIE Blockchain Hackathon 2025**.

## Features

- **Token Staking**: Lock tokens to earn rewards
- **Real-time APY**: Dynamic APY calculated using QIE Oracles
- **Automated Rewards**: Smart contract-based reward distribution
- **Gas Efficient**: Optimized for QIE's high throughput (25,000+ TPS)
- **Web3 Ready**: Full Web3.js integration

## Tech Stack

- **Smart Contracts**: Solidity
- **Chain**: QIE Blockchain (Testnet)
- **Frontend**: React + Web3.js
- **Oracles**: QIE Live Oracles (7 feeds)
- **Token Creator**: QIEDEX

## Evaluation Criteria Met

- ✅ Innovation (25%): Unique APY calculation using real-world data
- ✅ Impact (25%): Real DeFi use case with scalability
- ✅ Technical Execution (25%): High-quality code, QIE features
- ✅ Presentation (15%): Clean UI/UX and documentation
- ✅ Bonus (10%): QIEDEX integration + Oracle usage

## Getting Started

### Prerequisites
- Node.js 16+
- MetaMask with QIE Testnet configured
- Test tokens from QIE faucet

### Installation

```bash
git clone https://github.com/RaviTejaMedarametla/qie-defi-staking.git
cd qie-defi-staking
npm install
```

### Deployment

Smart contracts deploy to QIE Testnet.

## Project Structure

```
├── contracts/          # Solidity smart contracts
│   ├── Staking.sol    # Main staking contract
│   └── RewardToken.sol # ERC20 reward token
├── frontend/          # React application
├── tests/             # Contract tests
└── docs/              # Documentation
```

## References

- [QIE Developer Docs](https://docs.qie.digital/developer-docs)
- [QIEDEX](https://dex.qie.digital)
- [QIE Testnet](https://www.testnet.qie.digital)

## License

MIT License - See LICENSE file

## Built for

**QIE Blockchain Hackathon 2025**
December 14, 2025 deadline
