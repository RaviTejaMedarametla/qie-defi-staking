const hre = require("hardhat");

async function main() {
  console.log("Deploying QIE DeFi Staking contracts...");

  // Deploy RewardToken
  const RewardToken = await hre.ethers.getContractFactory("RewardToken");
  const rewardToken = await RewardToken.deploy();
  await rewardToken.deployed();
  console.log("RewardToken deployed to:", rewardToken.address);

  // Deploy Staking
  const Staking = await hre.ethers.getContractFactory("Staking");
  const staking = await Staking.deploy(rewardToken.address);
  await staking.deployed();
  console.log("Staking deployed to:", staking.address);

  // Mint initial rewards
  const tx = await rewardToken.mint(staking.address, hre.ethers.utils.parseEther("10000"));
  await tx.wait();
  console.log("Minted 10000 tokens to Staking contract");

  console.log("\nDeployment Summary:");
  console.log("RewardToken:", rewardToken.address);
  console.log("Staking:", staking.address);

  // Export addresses for frontend
  const addresses = {
    rewardToken: rewardToken.address,
    staking: staking.address
  };

  const fs = require('fs');
  fs.writeFileSync('./deployment-addresses.json', JSON.stringify(addresses, null, 2));
  console.log("Addresses saved to deployment-addresses.json");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
