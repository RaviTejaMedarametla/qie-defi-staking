async function connectWallet() {
  if (!window.ethereum) {
    alert("MetaMask not detected");
    return null;
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  return provider.getSigner();
}

function parseAirdropInput(input) {
  const lines = input.trim().split("\n");
  const recipients = [];
  const amounts = [];

  for (const line of lines) {
    const [addr, amt] = line.split(",");
    recipients.push(addr.trim());
    amounts.push(ethers.utils.parseEther(amt.trim()));
  }

  return { recipients, amounts };
}
