// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.8;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

// Whale Token Interface
interface IWhaleToken {
    function balanceOf(address account) external view returns (uint256);

    function transfer(address to, uint256 amount) external returns (bool);

    function mint(address to, uint256 amount) external; // 🔴

    function burn(address to, uint256 amount) external; // 🔴

    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) external returns (bool);
}

// PUSH Comm Contract Interface
interface IPUSHCommInterface {
    function sendNotification(
        address _channel,
        address _recipient,
        bytes calldata _identity
    ) external;
}

contract Whale {
    using Strings for address;
    using Strings for uint256;

    // Varibales
    // ---------

    address public userAddress;
    AggregatorV3Interface public priceFeedMatic;
    uint256 minimumTokenPurchase;
    address public owner;
    IWhaleToken public whaleTokenInterface;
    uint256 constant CONV_VAL = 1 ether;
    uint256 lastUpdated;

    // Schemas
    // -------

    struct User {
        uint256 id;
        bool admin;
    }

    struct Bounty {
        bytes32 id;
        uint256 prize;
        bool status;
        address closedBy;
        address createdBy;
    }

    // Constructor
    // -----------

    constructor(uint256 _minimumTokenPurchase, address _whaleTokenAddress) {
        owner = msg.sender;
        userAddress = msg.sender;
        minimumTokenPurchase = _minimumTokenPurchase;
        priceFeedMatic = AggregatorV3Interface(
            0xd0D5e3DB44DE05E9F294BB0a3bEEaF030DE24Ada
        );
        whaleTokenInterface = IWhaleToken(_whaleTokenAddress);
        lastUpdated = block.timestamp;
    }

    // Mappings
    // --------

    mapping(address => User) public Users;
    mapping(address => bool) public Admins;
    mapping(address => bool) public Subscribed;
    mapping(address => uint256) public SubscribedBounties;
    mapping(address => mapping(bytes32 => Bounty)) public Bounties;
    mapping(address => uint256) public BountiesCreated;
    mapping(address => uint256) public BountiesCompleted;
    address[] bountiesArray;

    // Modifiers
    // ---------

    modifier onlyAdmin() {
        require(
            Admins[userAddress],
            "You need to be admin to access this function"
        );
        _;
    }
    modifier onlySubscribed() {
        require(
            Subscribed[userAddress],
            "You need to subscribe first to get this functionality"
        );
        _;
    }
    modifier onlyOwner() {
        require(msg.sender == owner, "You are not allowed to withdraw");
        _;
    }

    // Events
    // ------

    // Functions
    // ---------

    // Function to check if number of days passed are interval of 30
    function _resetTimeOrNot() private {
        uint256 time = lastUpdated + 30 days;
        if (block.timestamp >= time) {
            lastUpdated = block.timestamp;
            // Reset the Mapping
            for (uint256 i = 0; i < bountiesArray.length; i++) {
                BountiesCompleted[bountiesArray[i]] = 0;
            }
        }
    }

    // To set the user as admin
    function setUserAsAdmin() public {
        Admins[msg.sender] = true;
        Users[msg.sender].admin = true;
    }

    // To get the latest realtime matic price
    function getMaticPrice() public view returns (uint256) {
        (, int256 answer, , , ) = priceFeedMatic.latestRoundData();
        return uint256(answer * 10000000000);
        // return 921241090000000000; // 🔴 For Testing
    }

    // Getting the conversion rate of matic in USD
    function getConversionRate(uint256 _amount) public view returns (uint256) {
        uint256 Price = getMaticPrice();
        uint256 AmountInUsd = (Price * _amount) / 1000000000000000000;
        return AmountInUsd;
    }

    // Function to convert USD to WTK
    function usdToWTK(uint256 _usdAmount) public view returns (uint256) {
        uint256 tokenPrice = CONV_VAL * getMaticPrice();
        return
            (_usdAmount * 1000000000000000000 * 1000000000000000000) /
            tokenPrice;
    }

    // Function to get Amount to pay
    function amountToPay(uint256 _amountOfTokens)
        public
        pure
        returns (uint256)
    {
        return (CONV_VAL * _amountOfTokens);
    }

    // Function to buy tokens
    function buyTokens(uint256 _amountOfTokens) public payable onlyAdmin {
        // 1 PRICE_MATIC = 1 WTK
        require(
            _amountOfTokens >= minimumTokenPurchase,
            "You need to buy atleast 10 tokens"
        );
        uint256 amountToPurchase = amountToPay(_amountOfTokens);
        require(
            msg.value >= amountToPurchase,
            "Insufficient funds in Wallet !!"
        );
        whaleTokenInterface.mint(userAddress, _amountOfTokens);
    }

    // Function to subscribe to Bounties
    function SubscribeToBounties(uint256 _option) public payable onlyAdmin {
        // PLANS
        // 100 WTK + 5 Bounty = 85 MATIC
        // 200 WTK + 7 Bounty = 150 MATIC
        // 300 WTK + 10 Bounty = 200 MATIC

        if (_option == 0) {
            require(
                msg.value >= amountToPay(85),
                "To subscribe to bounty you need to spend $85 worth of MATIC"
            );
            Subscribed[msg.sender] = true;
            SubscribedBounties[msg.sender] += 5;
            whaleTokenInterface.mint(userAddress, 100);
        } else if (_option == 1) {
            require(
                msg.value >= amountToPay(150),
                "To subscribe to bounty you need to spend $150 worth of MATIC"
            );
            Subscribed[msg.sender] = true;
            SubscribedBounties[msg.sender] += 7;
            whaleTokenInterface.mint(userAddress, 200);
        } else if (_option == 2) {
            require(
                msg.value >= amountToPay(200),
                "To subscribe to bounty you need to spend $200 worth of MATIC"
            );
            Subscribed[msg.sender] = true;
            SubscribedBounties[msg.sender] += 10;
            whaleTokenInterface.mint(userAddress, 300);
        }
    }

    // Function to generate bounty hash
    function _BountyHash(address _creator, uint256 _bountyID)
        private
        pure
        returns (bytes32)
    {
        return (keccak256(abi.encodePacked(_creator, _bountyID)));
    }

    // Function to Add Bounty
    function AddBounty(uint256 _prize)
        public
        payable
        onlyAdmin
        returns (bytes32)
    {
        // Whether we need to reset or not :)
        _resetTimeOrNot();
        // ----------------------------------
        if (SubscribedBounties[msg.sender] >= 1) {
            require(
                whaleTokenInterface.balanceOf(msg.sender) >= _prize,
                "Decrease the prize you don't have enough funds"
            );
            bytes32 bountyHash = _BountyHash(
                msg.sender,
                BountiesCreated[msg.sender]
            );
            Bounties[msg.sender][bountyHash].prize = _prize;
            Bounties[msg.sender][bountyHash].createdBy = msg.sender;
            Bounties[msg.sender][bountyHash].status = false;
            Bounties[msg.sender][bountyHash].id = bountyHash;
            SubscribedBounties[msg.sender]--;
            BountiesCreated[msg.sender]++;
            // Lock tokens
            whaleTokenInterface.burn(owner, _prize);
            // Notification Send (Broadcast)
            IPUSHCommInterface(0xb3971BCef2D791bc4027BbfedFb47319A4AAaaAa)
                .sendNotification(
                    0xE6Df4B432E3f690B787e1e91f41aB531aA05238d,
                    address(this),
                    bytes(
                        string(
                            abi.encodePacked(
                                "0",
                                "+",
                                "1", // Broadcast Notification Standard
                                "+",
                                "New Bounty Created By ",
                                msg.sender.toHexString(),
                                "+",
                                "New Bounty created by ",
                                msg.sender.toHexString(),
                                " for a prize of ",
                                _prize.toString(),
                                " WTK"
                            )
                        )
                    )
                );
            return bountyHash;
        } else {
            require(
                whaleTokenInterface.balanceOf(msg.sender) >= _prize + 1,
                "You don't have sufficient funds to add a bounty"
            );
            bytes32 bountyHash = _BountyHash(
                msg.sender,
                BountiesCreated[msg.sender]
            );
            Bounties[msg.sender][bountyHash].prize = _prize;
            Bounties[msg.sender][bountyHash].createdBy = msg.sender;
            Bounties[msg.sender][bountyHash].status = false;
            Bounties[msg.sender][bountyHash].id = bountyHash;
            BountiesCreated[msg.sender]++;
            // Lock Tokens
            whaleTokenInterface.burn(owner, _prize);
            // Notification Send (Broadcast)
            IPUSHCommInterface(0xb3971BCef2D791bc4027BbfedFb47319A4AAaaAa)
                .sendNotification(
                    0xE6Df4B432E3f690B787e1e91f41aB531aA05238d,
                    address(this),
                    bytes(
                        string(
                            abi.encodePacked(
                                "0",
                                "+",
                                "1", // Broadcast Notification Standard
                                "+",
                                "New Bounty Created By ",
                                msg.sender.toHexString(),
                                "+",
                                "New Bounty created by ",
                                msg.sender.toHexString(),
                                " for a prize of ",
                                _prize.toString(),
                                " WTK"
                            )
                        )
                    )
                );
            return bountyHash;
        }
    }

    // Function to close the bounty
    function CloseBounty(address _winner, bytes32 _bountyHash)
        public
        onlyAdmin
    {
        require(
            Bounties[msg.sender][_bountyHash].status == true,
            "Bounty cannot be closed again !!!"
        );
        Bounties[msg.sender][_bountyHash].status = true;
        Bounties[msg.sender][_bountyHash].closedBy = _winner;
        uint256 reward = Bounties[msg.sender][_bountyHash].prize;
        whaleTokenInterface.mint(_winner, reward);
        if (BountiesCompleted[_winner] <= 0) {
            bountiesArray.push(_winner);
        }
        BountiesCompleted[_winner] += 1;
        // Notification Send (Broadcast)
        IPUSHCommInterface(0xb3971BCef2D791bc4027BbfedFb47319A4AAaaAa)
            .sendNotification(
                0xE6Df4B432E3f690B787e1e91f41aB531aA05238d,
                address(this),
                bytes(
                    string(
                        abi.encodePacked(
                            "0",
                            "+",
                            "1", // Broadcast Notification Standard
                            "+",
                            "Bounty Closed By ",
                            msg.sender.toHexString(),
                            "+",
                            "Bounty is closed by ",
                            msg.sender.toHexString(),
                            " for a prize of ",
                            reward.toHexString(),
                            " WTK and the winner is ",
                            _winner.toHexString()
                        )
                    )
                )
            );
    }

    // Function to withdraw the funds
    function withdraw() public payable onlyOwner {
        payable(msg.sender).transfer(address(this).balance);
    }
}

// Author : w3Ts0ck3T_eth
// ----------------------
