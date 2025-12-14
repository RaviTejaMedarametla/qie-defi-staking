const hre = require("hardhat");
const fs = require("fs");

async function main() {

  console.log("🚀 Deploying OracleQuery...");

  // REAL QIE ORACLE ADDRESS (BTC as example)
  const ORACLE_ADDRESS = "0x9E596d809a20A272c788726f592c0d1629755440";

  const OracleQuery = await hre.ethers.getContractFactory("OracleQuery");
  const oracleQuery = await OracleQuery.deploy(ORACLE_ADDRESS);
  await oracleQuery.deployed();

  console.log("OracleQuery deployed at:", oracleQuery.address);

  // Save deployment file
  const output = {
    oracleQuery: oracleQuery.address,
    oracleAddressUsed: ORACLE_ADDRESS
  };

  fs.writeFileSync("oraclesight/deployment.json", JSON.stringify(output, null, 2));

  console.log("📦 Saved deployment.json");
  console.log("🎉 OracleSight deployment complete!");
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
