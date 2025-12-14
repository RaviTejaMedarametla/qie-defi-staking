let signer;
let contract;

async function connectWallet() {
  await window.ethereum.request({ method: "eth_requestAccounts" });
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  signer = provider.getSigner();

  contract = new ethers.Contract(
    CONFIG.contractAddress,
    CONFIG.abi,
    signer
  );

  alert("Wallet Connected!");
}

async function submitPrediction() {
  const tx = await contract.submitPrediction(
    document.getElementById("inputHash").value,
    document.getElementById("outputHash").value,
    document.getElementById("model").value,
    Number(document.getElementById("confidence").value)
  );
  
  await tx.wait();
  alert("Submitted!");
}

async function fetchPrediction() {
  const id = Number(document.getElementById("fetchId").value);
  const pred = await contract.getPrediction(id);
  document.getElementById("result").innerText = JSON.stringify(pred, null, 2);
}
