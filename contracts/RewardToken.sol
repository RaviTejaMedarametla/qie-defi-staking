// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title RewardToken
 * @dev ERC20 token for staking rewards on QIE Blockchain
 * Built for QIE Blockchain Hackathon 2025
 */
contract RewardToken is ERC20, Ownable {
    // Minting limit
    uint256 public constant MAX_SUPPLY = 1000000 * 10**18; // 1 million tokens
    uint256 public totalMinted;

    // Staking contract can mint rewards
    address public stakingContract;

    event MinterSet(address indexed minter);
    event RewardsMinted(address indexed to, uint256 amount);

    constructor() ERC20("QIE Reward Token", "QRT") {
        // Initial supply
        _mint(msg.sender, 100000 * 10**18);
        totalMinted = 100000 * 10**18;
    }

    /**
     * @dev Set the staking contract that can mint rewards
     * @param _stakingContract Address of staking contract
     */
    function setStakingContract(address _stakingContract) external onlyOwner {
        require(_stakingContract != address(0), "Invalid address");
        stakingContract = _stakingContract;
        emit MinterSet(_stakingContract);
    }

    /**
     * @dev Mint rewards (only callable by staking contract)
     * @param to Recipient address
     * @param amount Amount of tokens to mint
     */
    function mintReward(address to, uint256 amount) external {
        require(msg.sender == stakingContract, "Only staking contract");
        require(totalMinted + amount <= MAX_SUPPLY, "Exceeds max supply");
        
        _mint(to, amount);
        totalMinted += amount;
        
        emit RewardsMinted(to, amount);
    }

    /**
     * @dev Burn tokens (for deflationary mechanism)
     * @param amount Amount to burn
     */
    function burn(uint256 amount) external {
        _burn(msg.sender, amount);
    }
}
