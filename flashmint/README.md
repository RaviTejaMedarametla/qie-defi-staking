# FlashMint — Token Creator & Airdrop System
A simple and powerful ERC20 token generator plus on-chain airdrop distribution tool.  
Built for the QIE Blockchain Hackathon 2025.

This project provides:
1. An ERC20 token contract with optional max supply  
2. A batch airdrop distributor  
3. A minimal, judge-friendly frontend  
4. Full Hardhat test suite  

------------------------------------------------------------

## Overview
FlashMint enables users to instantly:
- Create a new ERC20 token
- Define supply and optional max cap
- Burn tokens
- Run on-chain airdrops to multiple recipients

All components follow standard EVM-compatible patterns.

------------------------------------------------------------

## Smart Contracts

### FlashMintToken.sol
- ERC20 token implementation  
- Optional max supply cap  
- Mint only by owner  
- Burn function for any user  

Constructor:
name, symbol, initialSupply, maxSupply  
If maxSupply = 0, minting is unlimited.

### AirdropDistributor.sol
- Batch distribution contract  
- Owner-only distribution  
- Uses transferFrom  
- Requires approval from token owner  

------------------------------------------------------------

## Folder Structure

flashmint/
  contracts/                 Solidity source
  scripts/                   Deployment scripts
  test/                      Hardhat tests
  frontend/                  Minimal web UI
  deployment.json            Written after deployment

------------------------------------------------------------

## Deployment

Set environment variables:

QIE_TESTNET_RPC=
PRIVATE_KEY=

Deploy contracts:

npx hardhat run flashmint/scripts/deploy.js --network qie-testnet

Deployment results saved to:

flashmint/deployment.json

------------------------------------------------------------

## Testing

Run the test suite:

npx hardhat test

Tests include:
- Token minting  
- Max supply enforcement  
- Burnable behavior  
- Airdrop distribution  
- Array mismatch and reverted cases  

------------------------------------------------------------

## Frontend Usage

Start a lightweight local server:

cd flashmint/frontend
python -m http.server 8080

Open browser at:

http://localhost:8080

Available actions:
- Deploy Token (name, symbol, initial supply, max supply)
- Airdrop (paste "address,amount" lines)
- MetaMask wallet connection

------------------------------------------------------------

## Hackathon Scoring Highlights

Innovation (25%)
- One-click ERC20 creator
- Airdrop mechanism that works for communities, DAOs, NFT projects

Impact (25%)
- Instant onboarding tool for QIE ecosystem
- Enables token launch campaigns, community rewards, and marketing drops

Technical Execution (25%)
- Clean contract architecture
- Fully tested with Hardhat
- No deprecated libraries
- Ethers v5 compatibility

Presentation (15%)
- Extremely simple UI
- Clear interaction flow
- Easy to demo to judges

Bonus (10%)
- Integrates seamlessly with QIEDEX token creation workflows

------------------------------------------------------------

© 2025 — FlashMint Hackathon Submission
