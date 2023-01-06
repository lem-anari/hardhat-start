// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts (last updated v4.7.0) (token/ERC20/ERC20.sol)

pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/IERC20MetadataUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "hardhat/console.sol";


contract MyERC20 is Initializable, ContextUpgradeable, ERC20Upgradeable {
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
            // console.log("CONSOLE", _msgSender(), to[i], amount[i]);
            transfer(to[i], amount[i]);
        }
        return true;
    }
}

contract MyERC20V2 is Initializable, ContextUpgradeable, ERC20Upgradeable {
    
    function mint(address account, uint256 amount) public virtual {
        _mint(account, amount);
    }
    function transferArray(
        address[] memory to, 
        uint256[] memory amount
    ) public virtual returns (bool) {
        for (uint256 i = 0; i < to.length; i++) {
            console.log("Here is CONSOLE for MyERC20V2", _msgSender(), to[i], amount[i]);
            transfer(to[i], amount[i]);
        }
        return true;
    }
}