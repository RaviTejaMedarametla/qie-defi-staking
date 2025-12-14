import { ORACLE_QUERY_ADDRESS, ORACLES } from "./config.js";

let provider;
let signer;
let oracleQuery;

const abi = [
  "function getLatestPrice(address oracleAddr) external view returns (int256,uint256)"
];

async function init() {
  if (!window.ethereum) {
    alert("MetaMask required");
    return;
  }

  provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  signer = provider.getSigner();

  oracleQuery = new ethers.Contract(ORACLE_QUERY_ADDRESS, abi, signer);

  loadOracles();
}

async function loadOracles() {
  const container = document.getElementById("oracle-list");
  container.innerHTML = "";

  for (const o of ORACLES) {
    const div = document.createElement("div");
    div.className = "card";
    div.id = `card-${o.symbol}`;
    div.innerHTML = `
        <h2>${o.name}</h2>
        <div class="price" id="price-${o.symbol}">Loading...</div>
        <div class="timestamp" id="time-${o.symbol}"></div>
    `;
    container.appendChild(div);

    fetchOracle(o);
  }

  setInterval(() => {
    ORACLES.forEach(o => fetchOracle(o));
  }, 8000);
}

async function fetchOracle(o) {
  try {
    const result = await oracleQuery.getLatestPrice(o.address);
    const price = Number(result[0]) / 1e8;
    const ts = Number(result[1]);

    document.getElementById(`price-${o.symbol}`).innerText =
      "$" + price.toLocaleString();

    document.getElementById(`time-${o.symbol}`).innerText =
      "Updated: " + new Date(ts * 1000).toLocaleString();
  } catch (err) {
    document.getElementById(`price-${o.symbol}`).innerText = "Error";
  }
}

init();
