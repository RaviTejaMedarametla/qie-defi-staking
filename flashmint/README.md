# FlashMint — Instant Token Creator + Airdrop Engine
QIE Blockchain Hackathon 2025 — Project 2

FlashMint allows creators and developers to:
- Deploy a mintable ERC-20 token instantly
- Airdrop tokens to multiple addresses in a single transaction
- Integrate easily with any QIE-based dApp or community project

---

## Smart Contracts

### FlashMintToken.sol
- ERC-20 token built with OpenZeppelin
- Minting restricted to owner or distributor
- Fully compatible with QIE Testnet

### AirdropDistributor.sol
- Batch airdrop engine
- Emits transfer events per recipient
- Gas-efficient and modular

---

## Deployed on QIE Testnet

FlashMintToken:       0xEa0A25960f24033e769Def9257580D9711b6d5cA
AirdropDistributor:   0x535C934110682a179738339f1b691380C151b0B3
Explorer:             https://testnet.qie.digital/

Deployment file: flashmint/deployment.json

---

## Folder Structure

flashmint/
 ├── contracts/
 │    ├── FlashMintToken.sol
 │    └── AirdropDistributor.sol
 ├── scripts/
 │    └── deploy.js
 ├── test/
 │    ├── FlashMintToken.test.js
 │    └── AirdropDistributor.test.js
 ├── frontend/
 │    ├── index.html
 │    ├── app.js
 │    ├── components.js
 │    └── config.js
 ├── README.md
 └── SUBMISSION.md

---

## Hardhat Usage

### Install dependencies
npm install

### Compile
npx hardhat compile

### Test
npx hardhat test

Tests cover:
- Token permissions
- Airdrop distribution
- Event emission validation

---

## Deployment

Ensure .env contains:

QIE_TESTNET_RPC=https://rpc1testnet.qie.digital/
PRIVATE_KEY=0x<your_private_key>

Deploy:

npx hardhat run flashmint/scripts/deploy.js --network qie-testnet

Addresses are written to flashmint/deployment.json.

---

## Frontend

Start local static server:

cd flashmint/frontend
python -m http.server 8080

Open:
http://localhost:8080

Frontend supports:
- Connect MetaMask
- Mint tokens
- Execute batch airdrops

---

## Hackathon Scoring Alignment

Innovation:
- Instant token creation + bulk airdrops

Impact:
- Perfect for communities, DAOs, NFTs, GameFi

Technical Execution:
- Clean, minimal contracts
- Full test suite

Presentation:
- Simple UI, easy to demo

Bonus:
- Fully QIE-compatible, works with QIEDEX

---

## Future Extensions
- Merkle airdrops
- Oracle-triggered distributions
- Token launchpad workflows

---

© 2025 FlashMint — QIE Hackathon Project
