let signer;
let token;
let distributor;

async function init() {
  document.getElementById("connectBtn").onclick = async () => {
    signer = await connectWallet();
    const acc = await signer.getAddress();
    document.getElementById("account").innerText = "Connected: " + acc;
  };

  document.getElementById("createBtn").onclick = async () => {
    const name = document.getElementById("name").value;
    const symbol = document.getElementById("symbol").value;
    const initial = document.getElementById("initial").value;
    const max = document.getElementById("max").value;

    const FlashMintToken = await fetch("../artifacts/FlashMintToken.json")
      .then(r => r.json());

    const factory = new ethers.ContractFactory(
      FlashMintToken.abi,
      FlashMintToken.bytecode,
      signer
    );

    const tokenContract = await factory.deploy(
      name,
      symbol,
      ethers.utils.parseEther(initial),
      max === "0" ? 0 : ethers.utils.parseEther(max)
    );

    await tokenContract.deployed();
    CONTRACTS.token = tokenContract.address;

    document.getElementById("tokenAddress").innerText =
      "Token deployed at: " + CONTRACTS.token;
  };

  document.getElementById("airdropBtn").onclick = async () => {
    const data = document.getElementById("airdropData").value;
    const { recipients, amounts } = parseAirdropInput(data);

    const DistributorABI = await fetch("../artifacts/AirdropDistributor.json")
      .then(r => r.json());

    distributor = new ethers.Contract(
      CONTRACTS.distributor,
      DistributorABI.abi,
      signer
    );

    const tx = await distributor.distribute(recipients, amounts);
    await tx.wait();
    alert("Airdrop completed!");
  };
}

init();
