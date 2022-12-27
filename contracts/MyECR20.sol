// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts (last updated v4.7.0) (token/ERC20/ERC20.sol)

pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/IERC20MetadataUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";


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
// function abc (uint[] a) public {
//     uint[] memory c = new uint[](a.length);
// }
    function transferArray(
        // uint size,
        address from,
        address[] memory to,//address
        uint256[] memory amount //uint256
    ) public virtual returns (bool) {
        address spender = _msgSender();
        // to = new address[](size);
        // amount = new uint256[](size);
        for (uint256 i = 0; i < to.length; i++) {//to.length
            _spendAllowance(from, spender, amount[i]);
            _transfer(from, to[i], amount[i]);
        }
        return true;
    }
}
