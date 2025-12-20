const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("FlashMintToken", function () {
  let owner, user;
  let token;

  beforeEach(async function () {
    [owner, user] = await ethers.getSigners();

    const FlashMintToken = await ethers.getContractFactory("FlashMintToken");
    token = await FlashMintToken.deploy(
      "FlashMint Token",
      "FMT",
      ethers.utils.parseEther("1000"),
      ethers.utils.parseEther("5000")
    );

    await token.deployed();
  });

  it("Should deploy with initial supply", async function () {
    const balance = await token.balanceOf(owner.address);
    expect(balance).to.equal(ethers.utils.parseEther("1000"));
  });

  it("Should allow owner to mint", async function () {
    await token.mint(owner.address, ethers.utils.parseEther("200"));
    const total = await token.totalMinted();
    expect(total).to.equal(ethers.utils.parseEther("1200"));
  });

  it("Should prevent minting above maxSupply", async function () {
    await expect(
      token.mint(owner.address, ethers.utils.parseEther("6000"))
    ).to.be.revertedWith("Max supply exceeded");
  });

  it("Should allow users to burn their tokens", async function () {
    await token.transfer(user.address, ethers.utils.parseEther("50"));
    await token.connect(user).burn(ethers.utils.parseEther("20"));

    const remaining = await token.balanceOf(user.address);
    expect(remaining).to.equal(ethers.utils.parseEther("30"));
  });
});
