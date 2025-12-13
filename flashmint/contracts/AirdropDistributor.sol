// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title AirdropDistributor
 * @notice Simple batch ERC20 airdrop for hackathon use.
 *
 * The contract does NOT hold funds. Owner must approve spending
 * or transfer tokens before calling distribute().
 */
contract AirdropDistributor is Ownable {
    IERC20 public token;

    event Distributed(address indexed to, uint256 amount);

    constructor(address tokenAddress) {
        require(tokenAddress != address(0), "Invalid token");
        token = IERC20(tokenAddress);
    }

    /**
     * @notice Batch distribute tokens to a list of recipients.
     * @dev Caller must have approved the distributor to spend tokens.
     */
    function distribute(address[] calldata recipients, uint256[] calldata amounts)
        external
        onlyOwner
    {
        require(recipients.length == amounts.length, "Array mismatch");

        for (uint256 i = 0; i < recipients.length; i++) {
            require(
                token.transferFrom(msg.sender, recipients[i], amounts[i]),
                "Transfer failed"
            );

            emit Distributed(recipients[i], amounts[i]);
        }
    }
}
