// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts (last updated v4.7.0) (token/ERC20/ERC20.sol)

pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "hardhat/console.sol";


contract MyERC20 is Initializable, ERC20Upgradeable, AccessControlUpgradeable{

    uint8 public version;
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    function initialize(
        string memory name,
        string memory symbol,
        uint256 initialSupply,
        // uint8 version,
        address minter 
    ) public virtual initializer {
        __ERC20_init(name, symbol);
        _mint(_msgSender(), initialSupply);
        _grantRole(MINTER_ROLE, minter);
    }

    function mint(address account, uint256 amount) public onlyRole(MINTER_ROLE) {
        _mint(account, amount); 
    }
    function transferArray(
        address[] memory to, 
        uint256[] memory amount
    ) public returns (bool) {
        for (uint256 i = 0; i < to.length; i++) {
            transfer(to[i], amount[i]);
        }
        return true;
    }
     function sayHi() public returns (uint8) { //rename to returningString
        version = 1; 
        // console.log('hi from 1 contract');
        return version; 
    } 
}