// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

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
 * @notice Minimal, safe, Hackathon-ready staking contract
 * Rewards = stake * APY% * (time / 365 days)
 */
contract StakingPlatform is Ownable, ReentrancyGuard {
    IERC20 public stakingToken;
    IRewardToken public rewardToken;
    IOracle public oracle;               // Optional

    uint256 public constant WITHDRAWAL_LOCK = 7 days;
    uint256 public totalStaked;

    // 10% APY = 1000 (basis points)
    uint256 public baseAPY = 1000;

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
    event OracleUpdated(address indexed oracle);
    event APYUpdated(uint256 apy);

    constructor(address _stakingToken, address _rewardToken) {
        require(_stakingToken != address(0), "Invalid stake token");
        require(_rewardToken != address(0), "Invalid reward token");

        stakingToken = IERC20(_stakingToken);
        rewardToken  = IRewardToken(_rewardToken);
    }

    /**
     * @notice Set oracle (optional)
     */
    function setOracle(address _oracle) external onlyOwner {
        require(_oracle != address(0), "Invalid oracle");
        oracle = IOracle(_oracle);
        emit OracleUpdated(_oracle);
    }

    /**
     * @notice Stake tokens
     */
    function stake(uint256 amount) external nonReentrant {
        require(amount > 0, "Amount must be > 0");
        require(stakingToken.transferFrom(msg.sender, address(this), amount), "Transfer failed");

        Stake storage user = stakes[msg.sender];

        if (user.amount > 0) {
            _claimInternal();
        }

        user.amount += amount;
        user.stakingTime = block.timestamp;
        user.lastClaimTime = block.timestamp;

        totalStaked += amount;

        emit Staked(msg.sender, amount, block.timestamp);
    }

    /**
     * @notice Get dynamic APY
     * Oracle optional; fallback to baseAPY
     */
    function getAPY() public view returns (uint256 apy) {
        apy = baseAPY;

        // Safe optional oracle use
        if (address(oracle) != address(0)) {
            try oracle.getLatestPrice("QIE/USD") returns (uint256 price) {
                if (price > 0) {
                    apy = price; // For Hackathon demo ONLY
                }
            } catch {
                // fallback to baseAPY silently
            }
        }
    }

    /**
     * @notice Calculate pending rewards
     */
    function pendingRewards(address userAddr) public view returns (uint256 pending) {
        Stake memory user = stakes[userAddr];
        if (user.amount == 0) return 0;

        uint256 timeStaked = block.timestamp - user.lastClaimTime;
        uint256 apy = getAPY();

        pending = (user.amount * apy * timeStaked) / (10000 * 365 days);
    }

    /**
     * @notice Public reward claim
     */
    function claimRewards() external nonReentrant {
        _claimInternal();
    }

    function _claimInternal() internal {
        uint256 rewards = pendingRewards(msg.sender);
        require(rewards > 0, "No rewards");

        Stake storage user = stakes[msg.sender];
        user.lastClaimTime = block.timestamp;
        user.accumulatedRewards += rewards;

        rewardToken.mintReward(msg.sender, rewards);

        emit RewardClaimed(msg.sender, rewards);
    }

    /**
     * @notice Unstake after lock period
     */
    function unstake(uint256 amount) external nonReentrant {
        Stake storage user = stakes[msg.sender];
        require(user.amount >= amount, "Insufficient stake");
        require(block.timestamp >= user.stakingTime + WITHDRAWAL_LOCK, "Lock active");

        uint256 rewards = pendingRewards(msg.sender);
        if (rewards > 0) _claimInternal();

        user.amount -= amount;
        totalStaked -= amount;

        require(stakingToken.transfer(msg.sender, amount), "Transfer failed");

        emit Unstaked(msg.sender, amount, block.timestamp);
    }

    /**
     * @notice View stake info
     */
    function getStake(address userAddr) external view returns (Stake memory) {
        return stakes[userAddr];
    }
}
