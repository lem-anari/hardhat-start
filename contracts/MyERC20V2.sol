// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts (last updated v4.7.0) (token/ERC20/ERC20.sol)

pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/IERC20MetadataUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";


import "hardhat/console.sol";


contract MyERC20V2 is Initializable, ERC20Upgradeable {
    function initialize(
        string memory name,
        string memory symbol,
        uint256 initialSupply
    ) public virtual initializer {
        __ERC20_init(name, symbol);
        _mint(_msgSender(), initialSupply);
    }

    function mint(address account, uint256 amount) public virtual {
        _mint(account, amount);
    }
    function transferArray(
        address[] memory to, 
        uint256[] memory amount
    ) public virtual returns (bool) {
        for (uint256 i = 0; i < to.length; i++) {
            transfer(to[i], amount[i]);
        }
        return true;
    }
    function returningString() public view virtual returns (string memory){
        console.log('yeah :)');
        return 'yeah';
    }
}