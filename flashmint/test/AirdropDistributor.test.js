const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("AirdropDistributor", function () {
  let owner, user1, user2;
  let token;
  let distributor;

  beforeEach(async function () {
    [owner, user1, user2] = await ethers.getSigners();

    // Deploy token
    const FlashMintToken = await ethers.getContractFactory("FlashMintToken");
    token = await FlashMintToken.deploy(
      "FlashMint Token",
      "FMT",
      ethers.utils.parseEther("1000"),
      ethers.utils.parseEther("5000")
    );
    await token.deployed();

    // Deploy distributor
    const Distributor = await ethers.getContractFactory("AirdropDistributor");
    distributor = await Distributor.deploy(token.address);
    await distributor.deployed();

    // Approve distributor to spend owner's tokens
    await token.approve(
      distributor.address,
      ethers.utils.parseEther("1000")
    );
  });

  it("Should distribute tokens to multiple recipients", async function () {
    const recipients = [user1.address, user2.address];
    const amounts = [
      ethers.utils.parseEther("10"),
      ethers.utils.parseEther("20")
    ];

    await distributor.distribute(recipients, amounts);

    expect(await token.balanceOf(user1.address)).to.equal(
      ethers.utils.parseEther("10")
    );
    expect(await token.balanceOf(user2.address)).to.equal(
      ethers.utils.parseEther("20")
    );
  });

  it("Should revert on mismatched arrays", async function () {
    await expect(
      distributor.distribute(
        [user1.address],
        [ethers.utils.parseEther("10"), ethers.utils.parseEther("5")]
      )
    ).to.be.revertedWith("Array mismatch");
  });
});
