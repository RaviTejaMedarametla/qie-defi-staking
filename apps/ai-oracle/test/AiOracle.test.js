const { expect } = require("chai");

describe("AiOracle", () => {
  let oracle;

  beforeEach(async () => {
    const Factory = await ethers.getContractFactory("AiOracle");
    oracle = await Factory.deploy();
    await oracle.deployed();
  });

  it("should submit and retrieve a prediction", async () => {
    const tx = await oracle.submitPrediction(
      "input123",
      "output456",
      "GPT-Model",
      92
    );

    await tx.wait();

    const pred = await oracle.getPrediction(1);

    expect(pred.inputHash).to.equal("input123");
    expect(pred.outputHash).to.equal("output456");
    expect(pred.model).to.equal("GPT-Model");
    expect(pred.confidence).to.equal(92);
  });
});
