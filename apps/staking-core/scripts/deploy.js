const hre = require("hardhat");

async function main() {
  console.log("\n🚀 Deploying QIE DeFi Staking System...\n");

  // 1. Deploy RewardToken
  const RewardToken = await hre.ethers.getContractFactory("RewardToken");
  const rewardToken = await RewardToken.deploy();
  await rewardToken.deployed();
  console.log("RewardToken deployed at:", rewardToken.address);

  // IMPORTANT:
  // Replace this with the real token you want to stake.
  // For demo / hackathon, you can deploy a custom ERC20 or use an existing token.
  const STAKING_TOKEN_ADDRESS = "0x0000000000000000000000000000000000000000";
  if (STAKING_TOKEN_ADDRESS === "0x0000000000000000000000000000000000000000") {
    console.log("\n❗ WARNING: You must set STAKING_TOKEN_ADDRESS to a real token.\n");
  }

  // 2. Deploy StakingPlatform
  const StakingPlatform = await hre.ethers.getContractFactory("StakingPlatform");
  const staking = await StakingPlatform.deploy(
    STAKING_TOKEN_ADDRESS,
    rewardToken.address
  );
  await staking.deployed();
  console.log("StakingPlatform deployed at:", staking.address);

  // 3. Allow staking contract to mint rewards
  const tx = await rewardToken.setStakingContract(staking.address);
  await tx.wait();
  console.log("Minter role assigned to staking contract.");

  // 4. Save addresses for frontend
  const fs = require("fs");
  const addresses = {
    rewardToken: rewardToken.address,
    stakingPlatform: staking.address,
    stakingToken: STAKING_TOKEN_ADDRESS,
  };

  fs.writeFileSync(
    "./deployment-addresses.json",
    JSON.stringify(addresses, null, 2)
  );

  console.log("\n📦 Addresses saved to deployment-addresses.json\n");
  console.log("🎉 Deployment completed successfully!");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
