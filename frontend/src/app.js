import { connectWallet } from "./components/WalletConnect.js";

let signer;
let stakingContract;

async function init() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  signer = provider.getSigner();

  stakingContract = new ethers.Contract(
    CONTRACTS.stakingPlatform,
    STAKING_ABI,
    signer
  );

  document.getElementById("connectWallet").onclick = async () => {
    const account = await connectWallet();
    console.log("Connected:", account);
  };

  document.getElementById("stakeBtn").onclick = async () => {
    const amt = document.getElementById("stakeAmount").value;
    const tx = await stakingContract.stake(ethers.utils.parseEther(amt));
    await tx.wait();
    alert("Staked!");
  };

  document.getElementById("claimBtn").onclick = async () => {
    const tx = await stakingContract.claimRewards();
    await tx.wait();
    alert("Rewards claimed!");
  };
}

init();
