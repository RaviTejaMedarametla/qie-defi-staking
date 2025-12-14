🤖 QIE AI Oracle — On-Chain AI Result Feed

Built for the QIE Blockchain Hackathon 2025

AI Oracle enables any QIE smart contract to request AI-generated data
(scores, predictions, classifications, summaries) which are written
on-chain by a trusted off-chain worker.

Competes in:

🧠 AI x Blockchain (Neural Chain Award)

⚡ Speed Demon

👥 Community Builder

🛡️ Identity & Security

🚀 What This Project Does

Component — Description
AiOracle.sol — Smart contract storing tasks & results
Python Worker — Off-chain AI executor
Frontend UI — Dashboard for sending tasks
Test Suite — Hardhat tests validating logic

Workflow:

User submits AI task

Stored on-chain

Worker processes

Result posted back to QIE

Contract emits events & stores result

📁 Folder Structure

qie-ai-oracle/
• contracts/AiOracle.sol
• scripts/deploy.js
• test/AiOracle.test.js
• worker/ai_worker.py
• frontend/index.html
• frontend/app.js
• frontend/config.js
• deployment.json
• README.md
• SUBMISSION.md

⚙️ Smart Contract Summary

AiOracle.sol:
• Holds submitted AI tasks
• Only owner-designated worker can post results
• Emits TaskCreated & TaskProcessed
• Low-gas design

🔧 Deployment

Update .env values:
PRIVATE_KEY=0x_your_key
QIE_TESTNET_RPC=https://rpc1testnet.qie.digital/

Deploy:
npx hardhat run qie-ai-oracle/scripts/deploy.js --network qie-testnet

Deployment output saved to:
qie-ai-oracle/deployment.json

🧪 Testing

Run tests:
npx hardhat test qie-ai-oracle/test/AiOracle.test.js

Covers:
• Task creation
• Worker authorization
• Posting results
• Event validation

🖥 Frontend Demo

Start server:
cd qie-ai-oracle/frontend
python -m http.server 8080

Open:
http://localhost:8080

Features:
• Submit prompts
• MetaMask signing
• View AI results

🤖 AI Worker

Install & run:
pip install web3 requests python-dotenv
python ai_worker.py

Worker does:
• Poll tasks
• Call AI model
• Push results on-chain

🎯 Why This Project Should Win

• True functional AI × Blockchain bridge
• Lightweight and fast enough for QIE
• Extremely judge-friendly demo
• Real-world usefulness
• Extensible and modular

🧠 Future Enhancements

• Multi-model aggregation
• DID verified output
• AI-powered risk scoring
• Historical charts
• Consensus-based workers

© 2025 — QIE AI Oracle

Team: Ravi Teja Medarametla