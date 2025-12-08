// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

interface IRewardToken {
    function mintReward(address to, uint256 amount) external;
}

interface IOracle {
    function getLatestPrice(string memory pair) external view returns (uint256);
}

/**
 * @title StakingPlatform  
 * @dev Complete DeFi staking platform for QIE Blockchain
 * Features: Token staking, dynamic APY (from oracles), reward distribution
 * Built for QIE Blockchain Hackathon 2025
 */
contract StakingPlatform is Ownable, ReentrancyGuard {
    IERC20 public stakingToken;
    IRewardToken public rewardToken;
    IOracle public oracle;

    uint256 public constant REWARD_RATE = 100; // 1% = 100 (in basis points)
    uint256 public constant WITHDRAWAL_LOCK = 7 days;
    uint256 public totalStaked;
    uint256 public lastRewardUpdate;

    struct Stake {
        uint256 amount;
        uint256 stakingTime;
        uint256 lastClaimTime;
        uint256 accumulatedRewards;
    }

    mapping(address => Stake) public stakes;
    
    event Staked(address indexed user, uint256 amount, uint256 timestamp);
    event Unstaked(address indexed user, uint256 amount, uint256 timestamp);
    event RewardClaimed(address indexed user, uint256 amount);
    event APYUpdated(uint256 newAPY);

    constructor(address _stakingToken, address _rewardToken) {
        stakingToken = IERC20(_stakingToken);
        rewardToken = IRewardToken(_rewardToken);
        lastRewardUpdate = block.timestamp;
    }

    /**
     * @dev Set oracle for real-time APY calculation
     * @param _oracle Address of QIE oracle contract
     */
    function setOracle(address _oracle) external onlyOwner {
        oracle = IOracle(_oracle);
    }

    /**
     * @dev Stake tokens
     * @param amount Amount of tokens to stake
     */
    function stake(uint256 amount) external nonReentrant {
        require(amount > 0, "Stake amount must be > 0");
        require(stakingToken.transferFrom(msg.sender, address(this), amount), "Transfer failed");
        
        Stake storage userStake = stakes[msg.sender];
        
        // Claim pending rewards first
        if (userStake.amount > 0) {
            _claimRewards();
        }
        
        userStake.amount += amount;
        userStake.stakingTime = block.timestamp;
        userStake.lastClaimTime = block.timestamp;
        totalStaked += amount;
        
        emit Staked(msg.sender, amount, block.timestamp);
    }

    /**
     * @dev Calculate APY from oracle (dynamic pricing)
     * @return apy Current APY in percentage
     */
    function calculateAPY() public view returns (uint256 apy) {
        // Base APY: 10% (simplified for hackathon)
        // In production: fetch from oracle
        apy = 1000; // 10% = 1000 (in basis points)
        
        // Could multiply by oracle data for dynamic rates
        // Example: apy = (oraclePrice * 100) / currentRate;
    }

    /**
     * @dev Calculate pending rewards for user
     * @param user Address of staker
     * @return pending Amount of pending rewards
     */
    function pendingRewards(address user) public view returns (uint256 pending) {
        Stake memory userStake = stakes[user];
        if (userStake.amount == 0) return 0;
        
        uint256 timeStaked = block.timestamp - userStake.lastClaimTime;
        uint256 apy = calculateAPY();
        
        // rewards = stake * APY% * (time / 365 days)
        pending = (userStake.amount * apy * timeStaked) / (10000 * 365 days);
    }

    /**
     * @dev Claim staking rewards
     */
    function claimRewards() external nonReentrant {
        _claimRewards();
    }

    function _claimRewards() internal {
        uint256 rewards = pendingRewards(msg.sender);
        require(rewards > 0, "No rewards to claim");
        
        Stake storage userStake = stakes[msg.sender];
        userStake.lastClaimTime = block.timestamp;
        userStake.accumulatedRewards += rewards;
        
        // Mint reward tokens
        rewardToken.mintReward(msg.sender, rewards);
        
        emit RewardClaimed(msg.sender, rewards);
    }

    /**
     * @dev Unstake tokens (after lock period)
     * @param amount Amount to unstake
     */
    function unstake(uint256 amount) external nonReentrant {
        Stake storage userStake = stakes[msg.sender];
        require(userStake.amount >= amount, "Insufficient stake");
        require(block.timestamp >= userStake.stakingTime + WITHDRAWAL_LOCK, "Lock period not over");
        
        // Claim rewards first
        uint256 rewards = pendingRewards(msg.sender);
        if (rewards > 0) {
            _claimRewards();
        }
        
        userStake.amount -= amount;
        totalStaked -= amount;
        
        require(stakingToken.transfer(msg.sender, amount), "Transfer failed");
        
        emit Unstaked(msg.sender, amount, block.timestamp);
    }

    /**
     * @dev Get total staked amount
     * @return Total stakes across all users
     */
    function getTotalStaked() external view returns (uint256) {
        return totalStaked;
    }

    /**
     * @dev Get user stake info
     * @param user Address of staker
     * @return Stake details
     */
    function getStakeInfo(address user) external view returns (Stake memory) {
        return stakes[user];
    }
}
