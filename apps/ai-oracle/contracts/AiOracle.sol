/*
// QIE AI Oracle — stores AI model outputs on-chain
*/

pragma solidity ^0.8.20;

contract AiOracle {

    struct Prediction {
        string inputHash;
        string outputHash;
        string model;
        uint256 confidence;
        uint256 timestamp;
        address sender;
    }

    mapping(uint256 => Prediction) public predictions;
    uint256 public counter;

    event NewPrediction(
        uint256 indexed id,
        string inputHash,
        string outputHash,
        string model,
        uint256 confidence,
        uint256 timestamp,
        address sender
    );

    function submitPrediction(
        string memory inputHash,
        string memory outputHash,
        string memory model,
        uint256 confidence
    ) public returns (uint256) {

        counter += 1;

        predictions[counter] = Prediction(
            inputHash,
            outputHash,
            model,
            confidence,
            block.timestamp,
            msg.sender
        );

        emit NewPrediction(
            counter,
            inputHash,
            outputHash,
            model,
            confidence,
            block.timestamp,
            msg.sender
        );

        return counter;
    }

    function getPrediction(uint256 id) public view returns (Prediction memory) {
        return predictions[id];
    }
}
