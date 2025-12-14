const hre = require("hardhat");
const fs = require("fs");

async function main() {
  console.log("🚀 Deploying AiOracle...");

  const Factory = await hre.ethers.getContractFactory("AiOracle");
  const oracle = await Factory.deploy();
  await oracle.deployed();

  console.log("AiOracle deployed at:", oracle.address);

  fs.writeFileSync(
    "qie-ai-oracle/deployment.json",
    JSON.stringify({ aiOracle: oracle.address }, null, 2)
  );

  console.log("📦 Saved deployment.json");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
