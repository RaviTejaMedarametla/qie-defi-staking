import hashlib
import json
from web3 import Web3
import openai  # or llama
                
openai.api_key = "YOUR_OPENAI_KEY"

RPC = "https://rpc1testnet.qie.digital/"
PRIVATE_KEY = "YOUR_PRIVATE_KEY"
CONTRACT_ADDR = "YOUR_DEPLOYED_CONTRACT"
ABI = json.load(open("AiOracleABI.json"))

def hash_text(t):
    return hashlib.sha256(t.encode()).hexdigest()

def main():
    prompt = input("Enter AI prompt: ")

    ai_output = openai.ChatCompletion.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}]
    ).choices[0].message["content"]

    w3 = Web3(Web3.HTTPProvider(RPC))
    acct = w3.eth.account.from_key(PRIVATE_KEY)

    contract = w3.eth.contract(address=CONTRACT_ADDR, abi=ABI)

    tx = contract.functions.submitPrediction(
        hash_text(prompt),
        hash_text(ai_output),
        "GPT-4o-mini",
        95
    ).build_transaction({
        "from": acct.address,
        "nonce": w3.eth.get_transaction_count(acct.address),
        "gas": 350000,
        "gasPrice": w3.eth.gas_price,
    })

    signed = acct.sign_transaction(tx)
    tx_hash = w3.eth.send_raw_transaction(signed.rawTransaction)

    print("Submitted! TX:", tx_hash.hex())

if __name__ == "__main__":
    main()
