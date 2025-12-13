# QIE DeFi Staking Platform
A fully on-chain staking protocol built for the QIE Blockchain Hackathon 2025.

## Overview
This project enables users to:
- Stake any ERC-20 compatible token
- Earn time-based APY rewards
- Claim on-chain minted reward tokens
- Unstake after a secure lock period
- Integrate optional oracle-driven APY

All contracts follow EVM standards and compile on QIE Testnet.

------------------------------------------------------------

## Smart Contracts

### RewardToken.sol
- ERC20 reward token
- Hard-capped supply
- Staking contract has mint permission
- Burn function supports deflation

### StakingPlatform.sol
- Stake/unstake flow
- Dynamic APY (oracle optional)
- Time-based reward accumulation
- Lock mechanism for security
- Fully tested with Hardhat

------------------------------------------------------------

## Folder Structure

contracts/                    Solidity contracts
scripts/                      Deployment scripts
frontend/                     Minimal web UI
test/                         Hardhat tests
deployment-addresses.json     Written after deployment

------------------------------------------------------------

## Deployment

Update your .env:

QIE_TESTNET_RPC=
PRIVATE_KEY=

Deploy:

npx hardhat run scripts/deploy.js --network qie-testnet

Artifacts will be written to:

deployment-addresses.json

------------------------------------------------------------

## Testing

npx hardhat test

Covers:
- Stake
- Reward accrual
- Claim
- Unstake after lock

------------------------------------------------------------

## Frontend (Vanilla JS)

cd frontend
python -m http.server 8080

Then open in browser and connect MetaMask.

------------------------------------------------------------

## Features for Hackathon Scoring

Innovation (25%)
- Modular APY engine
- Oracle integration (optional)
- Deflationary reward mechanics

Impact (25%)
- Usable by DEXes, NFT projects, GameFi, communities
- Low gas
- Fully EVM compatible

Technical Execution (25%)
- Hardhat toolbox v2.x
- ethers v5
- Complete test suite
- Clean architecture

Presentation (15%)
- Clear UX
- Simple frontend
- Easy to demo

Bonus (10%)
- Oracle-ready
- Extensible design

------------------------------------------------------------

## Future Extensions
- Validator staking
- Lending markets
- Multi-token staking
- Oracle-based risk scoring

------------------------------------------------------------

© 2025 — QIE Hackathon Team Submission
