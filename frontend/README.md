# QIE DeFi Staking Platform - Frontend

## Overview
React-based web interface for the QIE DeFi Staking Platform smart contracts.

## Features
- **Wallet Integration**: Connect MetaMask or other Web3 wallets
- **Stake Management**: Deposit and withdraw tokens
- **Reward Tracking**: Real-time APY and reward calculations
- **Dashboard**: View staking statistics and portfolio
- **Transaction History**: Track all staking activities

## Technology Stack
- React 18
- ethers.js (Web3 interaction)
- Web3Modal (Wallet connection)
- TailwindCSS (Styling)
- Vite (Build tool)

## Setup

### Prerequisites
- Node.js 16+
- npm or yarn
- MetaMask or other Web3 wallet

### Installation

```bash
npm install
npm run dev
```

## Key Components

### StakingDashboard.jsx
- Main interface for staking operations
- Real-time balance updates
- APY calculation display

### WalletConnect.jsx
- Web3 wallet connection logic
- Network switching support

### RewardTracker.jsx
- Reward accumulation display
- Claim rewards functionality

## Environment Variables

Create `.env.local`:

```
VITE_CONTRACT_ADDRESS=0x...
VITE_RPC_URL=https://rpc.qie.digital
VITE_CHAIN_ID=1
```

## Building for Production

```bash
npm run build
```

Output will be in the `dist/` directory.

## Integration with Smart Contracts

The frontend communicates with the deployed Staking and RewardToken contracts via ethers.js. Contract addresses must be configured in the environment.

## User Flow

1. Connect wallet
2. View staking opportunities
3. Approve token spending
4. Deposit tokens
5. Monitor rewards
6. Claim or withdraw as needed
