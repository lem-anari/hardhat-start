// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts (last updated v4.7.0) (token/ERC20/ERC20.sol)

pragma solidity ^0.8.0;

import "./MyERC20.sol";
import "hardhat/console.sol";


contract MyERC20V2 is MyERC20 {

    function returningString() public virtual returns (string memory){
        console.log('yeah :) from 2 contract');
        return 'yeah :)';
    }
}