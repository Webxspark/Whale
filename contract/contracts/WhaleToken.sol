// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// remix
// import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol";

contract WhaleToken is ERC20 {
    constructor() ERC20("WhaleToken", "WTK") {
        _mint(msg.sender, 10000000000 * 10**decimals());
    }

    function mint(address to, uint256 amount) public {
        _mint(to, amount * 10**decimals());
    }

    function burn(address to, uint256 amount) public {
        _burn(to, amount * 10**decimals());
    }
}
