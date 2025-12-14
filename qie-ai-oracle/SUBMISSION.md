📝 QIE AI Oracle — Hackathon Submission

QIE Blockchain Hackathon 2025
Team: Ravi Teja Medarametla

🚀 Project Title

QIE AI Oracle — On-Chain AI Response Infrastructure

📌 Problem Statement

Web3 lacks a trustable, verifiable, low-latency AI oracle.
DApps cannot directly use AI predictions or summaries because AI models run off-chain.

Current issues:
• No native AI oracle on QIE
• AI results cannot be verified
• Developers cannot automate AI workflows on-chain

🎯 Solution Overview

QIE AI Oracle creates a secure pipeline that allows:

Smart contracts to submit AI requests

An off-chain worker to run AI models (LLMs)

Worker to publish results on-chain

DApps to consume verified AI outputs

This brings AI → QIE blockchain in a clean, modular format.

🧩 Components

Smart Contract:
AiOracle.sol

Stores tasks

Emits events

Accepts worker-signed results

Low gas design

Frontend:

Submit text task

View AI result

MetaMask integration

Python Worker:

Polls tasks

Calls LLMs

Pushes result on-chain

Fully configurable

Tests:

Validate all flows

Hardhat-based

🛠 Technical Highlights

• Uses QIE Testnet (Chain ID 1983)
• Compatible with MetaMask
• Pure Solidity 0.8.20
• Modular oracle interface
• Off-chain model execution via Python
• Gas-optimized event flow

🔧 Deployment Details

Network: QIE Testnet
RPC: https://rpc1testnet.qie.digital/

Deployment Output: located in
qie-ai-oracle/deployment.json

Contracts Deployed:
AiOracle.sol → 0x6109D5921ec4E6DEF1B7d92cCC960eC39400604d

📽 Demo Instructions (Judges)

Open frontend folder

Run: python -m http.server 8080

Connect MetaMask → QIE Testnet

Submit an AI task

Worker pushes result back on-chain

Result appears in the dashboard

🏆 Prize Tracks This Project Targets

🧠 AI x Blockchain — Neural Chain Award
⚡ Speed Demon — Performance
👥 Community Builder — Engagement

📈 Impact & Use Cases

• Prediction markets
• Scoring engines
• Fraud detection
• Identity verification
• Summaries for DeFi governance
• AI assistants for dApps

📚 Future Extensions

• Multi-AI model consensus
• Zero-knowledge verified AI
• DID integration
• Oracle fee market
• Multi-chain expansion

✔ End of Submission

© 2025 — QIE AI Oracle
Team: Ravi Teja Medarametla