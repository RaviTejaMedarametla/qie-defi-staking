const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("QIE Staking Platform", function () {
  let owner, user;
  let stakingToken;
  let rewardToken;
  let stakingPlatform;

  beforeEach(async function () {
    [owner, user] = await ethers.getSigners();

    // ------------------------------------------------------------
    // Deploy mock staking token (ERC20)
    // ------------------------------------------------------------
    const MockToken = await ethers.getContractFactory(
      "contracts/RewardToken.sol:RewardToken"
    );
    stakingToken = await MockToken.deploy();
    await stakingToken.deployed();

    // Give user some tokens to stake
    await stakingToken.transfer(user.address, ethers.utils.parseEther("1000"));

    // ------------------------------------------------------------
    // Deploy RewardToken
    // ------------------------------------------------------------
    const RewardToken = await ethers.getContractFactory("RewardToken");
    rewardToken = await RewardToken.deploy();
    await rewardToken.deployed();

    // ------------------------------------------------------------
    // Deploy StakingPlatform
    // ------------------------------------------------------------
    const StakingPlatform = await ethers.getContractFactory("StakingPlatform");
    stakingPlatform = await StakingPlatform.deploy(
      stakingToken.address,
      rewardToken.address
    );
    await stakingPlatform.deployed();

    // Allow staking contract to mint rewards
    await rewardToken.setStakingContract(stakingPlatform.address);
  });

  // ------------------------------------------------------------
  // TEST 1: Staking
  // ------------------------------------------------------------
  it("Should allow user to stake tokens", async function () {
    const amount = ethers.utils.parseEther("100");

    await stakingToken.connect(user).approve(stakingPlatform.address, amount);
    await stakingPlatform.connect(user).stake(amount);

    const stakeInfo = await stakingPlatform.getStake(user.address);
    expect(stakeInfo.amount).to.equal(amount);
  });

  // ------------------------------------------------------------
  // TEST 2: Rewards accrue over time
  // ------------------------------------------------------------
  it("Should calculate pending rewards", async function () {
    const amount = ethers.utils.parseEther("50");

    await stakingToken.connect(user).approve(stakingPlatform.address, amount);
    await stakingPlatform.connect(user).stake(amount);

    // Increase time by 1 day
    await ethers.provider.send("evm_increaseTime", [86400]);
    await ethers.provider.send("evm_mine");

    const rewards = await stakingPlatform.pendingRewards(user.address);
    expect(rewards).to.be.gt(0);
  });

  // ------------------------------------------------------------
  // TEST 3: Claiming rewards mints tokens
  // ------------------------------------------------------------
  it("Should allow user to claim rewards", async function () {
    const amount = ethers.utils.parseEther("25");

    await stakingToken.connect(user).approve(stakingPlatform.address, amount);
    await stakingPlatform.connect(user).stake(amount);

    // Wait 1 week so rewards accumulate
    await ethers.provider.send("evm_increaseTime", [7 * 86400]);
    await ethers.provider.send("evm_mine");

    const before = await rewardToken.balanceOf(user.address);
    await stakingPlatform.connect(user).claimRewards();
    const after = await rewardToken.balanceOf(user.address);

    expect(after).to.be.gt(before);
  });

  // ------------------------------------------------------------
  // TEST 4: Unstake after lock period
  // ------------------------------------------------------------
  it("Should allow unstaking after lock period", async function () {
    const amount = ethers.utils.parseEther("40");

    await stakingToken.connect(user).approve(stakingPlatform.address, amount);
    await stakingPlatform.connect(user).stake(amount);

    // Wait 8 days (lock = 7 days)
    await ethers.provider.send("evm_increaseTime", [8 * 86400]);
    await ethers.provider.send("evm_mine");

    await expect(
      stakingPlatform.connect(user).unstake(amount)
    ).to.not.be.reverted;
  });
});
