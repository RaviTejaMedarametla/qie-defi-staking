const { expect } = require("chai");

describe("OracleQuery", function () {

  let owner, addr1, MockOracle, mockOracle, OracleQuery, oracleQuery;

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();

    // Mock Oracle contract
    MockOracle = await ethers.getContractFactory("MockOracle");
    mockOracle = await MockOracle.deploy();
    await mockOracle.deployed();

    OracleQuery = await ethers.getContractFactory("OracleQuery");
    oracleQuery = await OracleQuery.deploy(mockOracle.address);
    await oracleQuery.deployed();
  });

  it("Should store correct oracle address", async function () {
    expect(await oracleQuery.oracle()).to.equal(mockOracle.address);
  });

  it("Should read correct oracle price & timestamp", async function () {
    const price = 42000;
    const timestamp = 123456789;

    await mockOracle.setData(price, timestamp);

    const result = await oracleQuery.getLatestPrice();
    expect(result[0]).to.equal(price);
    expect(result[1]).to.equal(timestamp);
  });

});
