// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title FlashMintToken
 * @notice Minimal ERC20 token for QIE hackathon token-creation use cases.
 *
 * Features:
 * - Owner minting
 * - Optional max supply cap (0 = unlimited)
 * - Burn support
 */
contract FlashMintToken is ERC20, Ownable {
    uint256 public maxSupply; // 0 = unlimited minting
    uint256 public totalMinted;

    event Mint(address indexed to, uint256 amount);
    event Burn(address indexed from, uint256 amount);

    constructor(
        string memory name_,
        string memory symbol_,
        uint256 initialSupply,
        uint256 maxSupply_
    ) ERC20(name_, symbol_) {
        maxSupply = maxSupply_;

        if (initialSupply > 0) {
            _mint(msg.sender, initialSupply);
            totalMinted = initialSupply;
        }
    }

    /**
     * @notice Mint new tokens (owner only)
     */
    function mint(address to, uint256 amount) external onlyOwner {
        if (maxSupply > 0) {
            require(totalMinted + amount <= maxSupply, "Max supply exceeded");
        }

        _mint(to, amount);
        totalMinted += amount;

        emit Mint(to, amount);
    }

    /**
     * @notice Burn caller's tokens
     */
    function burn(uint256 amount) external {
        _burn(msg.sender, amount);
        emit Burn(msg.sender, amount);
    }
}
