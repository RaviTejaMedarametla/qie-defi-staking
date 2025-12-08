const { expect } = require("chai");
const hre = require("hardhat");

describe("Staking Contract", function () {
  let rewardToken;
  let staking;
  let owner;
  let addr1;

  beforeEach(async function () {
    [owner, addr1] = await hre.ethers.getSigners();

    // Deploy RewardToken
    const RewardToken = await hre.ethers.getContractFactory("RewardToken");
    rewardToken = await RewardToken.deploy();
    await rewardToken.deployed();

    // Deploy Staking
    const Staking = await hre.ethers.getContractFactory("Staking");
    staking = await Staking.deploy(rewardToken.address);
    await staking.deployed();

    // Mint tokens to staking contract
    const mint = hre.ethers.utils.parseEther("10000");
    await rewardToken.mint(staking.address, mint);
  });

  describe("Deployment", function () {
    it("Should set correct reward token address", async function () {
      expect(await staking.rewardToken()).to.equal(rewardToken.address);
    });

    it("Should have zero initial stake", async function () {
      expect(await staking.totalStaked()).to.equal(0);
    });
  });

  describe("Staking", function () {
    it("Should allow user to stake tokens", async function () {
      const stakeAmount = hre.ethers.utils.parseEther("100");
      await rewardToken.mint(addr1.address, stakeAmount);
      await rewardToken.connect(addr1).approve(staking.address, stakeAmount);
      await staking.connect(addr1).stake(stakeAmount);
      expect(await staking.stakedBalance(addr1.address)).to.equal(stakeAmount);
    });
  });
});
