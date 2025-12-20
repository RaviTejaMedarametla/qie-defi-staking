const hre = require("hardhat");
const fs = require("fs");

async function main() {
  console.log("\n🚀 Deploying FlashMint token + airdrop system...\n");

  // --------------------------------------------
  // 1. Deploy FlashMintToken
  // --------------------------------------------

  // NOTE: Customize these values when running the script.
  const NAME = "FlashMint Token";
  const SYMBOL = "FMT";
  const INITIAL_SUPPLY = hre.ethers.utils.parseEther("1000000"); // 1M
  const MAX_SUPPLY = hre.ethers.utils.parseEther("5000000"); // 5M (0 = unlimited)

  const FlashMintToken = await hre.ethers.getContractFactory("FlashMintToken");
  const token = await FlashMintToken.deploy(
    NAME,
    SYMBOL,
    INITIAL_SUPPLY,
    MAX_SUPPLY
  );
  await token.deployed();

  console.log("FlashMintToken deployed at:", token.address);

  // --------------------------------------------
  // 2. Deploy AirdropDistributor
  // --------------------------------------------

  const AirdropDistributor = await hre.ethers.getContractFactory(
    "AirdropDistributor"
  );
  const distributor = await AirdropDistributor.deploy(token.address);
  await distributor.deployed();

  console.log("AirdropDistributor deployed at:", distributor.address);

  // --------------------------------------------
  // 3. Save deployment results
  // --------------------------------------------

  const deployment = {
    token: token.address,
    distributor: distributor.address,
  };

  fs.writeFileSync(
    "./flashmint/deployment.json",
    JSON.stringify(deployment, null, 2)
  );

  console.log("\n📦 Saved to flashmint/deployment.json\n");
  console.log("🎉 FlashMint system deployed successfully!");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
