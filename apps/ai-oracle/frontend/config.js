const CONFIG = {
  contractAddress: "YOUR_DEPLOYED_ADDRESS",
  abi: [
    {
      "inputs": [
        { "internalType": "string", "name": "inputHash", "type": "string" },
        { "internalType": "string", "name": "outputHash", "type": "string" },
        { "internalType": "string", "name": "model", "type": "string" },
        { "internalType": "uint256", "name": "confidence", "type": "uint256" }
      ],
      "name": "submitPrediction",
      "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [{ "internalType": "uint256", "name": "id", "type": "uint256" }],
      "name": "getPrediction",
      "outputs": [
        {
          "components": [
            { "internalType": "string", "name": "inputHash", "type": "string" },
            { "internalType": "string", "name": "outputHash", "type": "string" },
            { "internalType": "string", "name": "model", "type": "string" },
            { "internalType": "uint256", "name": "confidence", "type": "uint256" },
            { "internalType": "uint256", "name": "timestamp", "type": "uint256" },
            { "internalType": "address", "name": "sender", "type": "address" }
          ],
          "internalType": "struct AiOracle.Prediction",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]
};
