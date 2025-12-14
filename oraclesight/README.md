🛰️ OracleSight — Multi-Oracle Dashboard for QIE Testnet

OracleSight is a lightweight blockchain oracle viewer built for the QIE Blockchain Hackathon 2025.
It reads live QIE Oracle prices for 7 assets and displays them in a simple UI.

Eligible for:

🏆 Oracles & Real-World Data

🏆 Speed Demon

🏆 Community Builder

🚀 Features

Reads official QIE Oracle contracts

Supports 7 assets (BTC, ETH, XRP, SOL, QIE, XAUt, BNB)

Clean backend contract

Frontend connects via MetaMask

Zero framework — pure HTML + JS

📦 Folder Structure
oraclesight/
├── contracts/
│     └── OracleQuery.sol
├── scripts/
│     └── deploy.js
├── test/
│     └── OracleQuery.test.js
├── frontend/
│     ├── index.html
│     ├── app.js
│     └── config.js
├── deployment.json
├── README.md
└── SUBMISSION.md

🔗 QIE Oracle Addresses (Official)
Asset	Address
BTC	0x9E596d809a20A272c788726f592c0d1629755440
ETH	0x4bb7012Fbc79fE4Ae9B664228977b442b385500d
XRP	0x804582B1f8Fea73919e7c737115009f668f97528
SOL	0xe86999c8e6C8eeF71bebd35286bCa674E0AD7b21
QIE	0x3Bc617cF3A4Bb77003e4c556B87b13D556903D17
XAUt	0x9aD0199a67588ee293187d26bA1BE61cb07A214c
BNB	0x775A56117Fdb8b31877E75Ceeb68C96765b031e6

These go into:
frontend/config.js

🧱 Smart Contract Summary

OracleQuery.sol

Stores oracle contract address

Reads price + timestamp

Returns tuple (price, time)

Works for any asset oracle

🧪 Testing

Run tests:

npx hardhat test oraclesight/test/OracleQuery.test.js


Covers:

Deployment

Oracle mock price

Return validation

🚀 Deployment

Update .env:

PRIVATE_KEY=your_private_key
QIE_TESTNET_RPC=https://rpc1testnet.qie.digital/


Deploy:

npx hardhat run oraclesight/scripts/deploy.js --network qie-testnet


Output written to:

oraclesight/deployment.json

🖥️ Frontend Usage

Start local server:

cd oraclesight/frontend
python -m http.server 8080


Open:

http://localhost:8080


MetaMask network settings:

Network Name: QIE Testnet
RPC URL: https://rpc1testnet.qie.digital/
Chain ID: 1983
Currency Symbol: QIE

🎯 Why OracleSight Should Win

Uses official QIE Oracles

Extremely simple and judge-friendly

Gas-optimized contract

Clear frontend for demo video

Modular for future expansion

🧠 Future Work

Median aggregation over multiple oracles

Historical charting

AI anomaly detection

Notifications & alerts

© 2025 QIE Hackathon — Team Ravi Teja Medarametla