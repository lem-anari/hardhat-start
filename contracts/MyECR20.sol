// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts (last updated v4.7.0) (token/ERC20/ERC20.sol)

pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "hardhat/console.sol";


contract MyERC20V1 is Initializable, ERC20Upgradeable, AccessControlUpgradeable{
    // address owner;
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    function initialize(
        string memory name,
        string memory symbol,
        uint256 initialSupply,
        address minter
    ) public virtual initializer {
        __ERC20_init(name, symbol);
        _mint(_msgSender(), initialSupply);
        _grantRole(MINTER_ROLE, minter);
    }

    function mint(address account, uint256 amount) public virtual onlyRole(MINTER_ROLE) {
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
    uint n;
    fallback() external {
        n = 0;
    }
    function sayHi() public virtual returns (bool) {
        console.log('hi from 1 contract');
        return true;
    }
}