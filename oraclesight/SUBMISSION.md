🔵 OracleSight — QIE Hackathon Submission

Category: Oracles & Real-World Data
Team: Ravi Teja Medarametla

🔥 Project Summary

OracleSight is a real-time multi-oracle dashboard built for the QIE Blockchain Hackathon 2025.
It fetches live on-chain price data from QIE’s seven official oracle contracts on the QIE Testnet and displays them in a clean, fast UI.

The project demonstrates accurate oracle integration, gas-optimized contract design, and a judge-friendly frontend.

🎯 Key Features

Reads official QIE Oracle contracts

Supports BTC, ETH, XRP, SOL, QIE, XAUt, BNB

Minimal, secure Solidity contract

Vanilla JS frontend (no frameworks)

MetaMask integration for QIE Testnet

Fully tested with Hardhat

Clean deployment scripts and documentation

📁 Smart Contract Files

contracts/OracleQuery.sol

Stores oracle address

Fetches price and timestamp

View-only, zero-write, gas-cheap

🧪 Testing

The test suite validates:

Contract deployment

Oracle address storage

Mock oracle price return

Timestamp verification

Command to execute tests:

npx hardhat test oraclesight/test/OracleQuery.test.js

🚀 Deployment

Deployment script:
oraclesight/scripts/deploy.js

Deployment command:

npx hardhat run oraclesight/scripts/deploy.js --network qie-testnet

Deployment output is written to:
oraclesight/deployment.json

🖥️ Frontend

Frontend includes:

index.html

app.js

config.js

Run locally:

cd oraclesight/frontend
python -m http.server 8080

Access at:

http://localhost:8080

MetaMask settings:

Network: QIE Testnet
RPC: https://rpc1testnet.qie.digital/

Chain ID: 1983
Symbol: QIE

🔗 Oracle Contracts Used (Official QIE Testnet)

BTC — 0x9E596d809a20A272c788726f592c0d1629755440
ETH — 0x4bb7012Fbc79fE4Ae9B664228977b442b385500d
XRP — 0x804582B1f8Fea73919e7c737115009f668f97528
SOL — 0xe86999c8e6C8eeF71bebd35286bCa674E0AD7b21
QIE — 0x3Bc617cF3A4Bb77003e4c556B87b13D556903D17
XAUt — 0x9aD0199a67588ee293187d26bA1BE61cb07A214c
BNB — 0x775A56117Fdb8b31877E75Ceeb68C96765b031e6

🎥 Demo Video Link

(Add after recording)

🌐 Deployed Contract Address

(Add after deployment)

🧰 Tech Stack

Solidity
Hardhat
ethers.js
Vanilla JavaScript
MetaMask

🏆 Why OracleSight Should Win

Uses official QIE Oracle network exactly as required

Real-time, accurate on-chain data retrieval

Very small and secure contract

Instant-loading frontend

Highly judge-friendly design

Perfect fit for multiple categories (Oracles, Speed Demon, Community Builder)

💡 Future Enhancements

Median aggregator across multiple oracle feeds

Historical data charting

AI-based anomaly detection

Notifications + webhook integrations