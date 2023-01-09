// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts (last updated v4.7.0) (token/ERC20/ERC20.sol)

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/proxy/beacon/UpgradeableBeacon.sol"; 

contract MyERC20Beacon {

    UpgradeableBeacon immutable beacon;
    
    address public vLogic;

    constructor(address _vLogic) {
        beacon = new UpgradeableBeacon(_vLogic);
        vLogic = _vLogic;
    }

    function update(address _vLogic) public {
        beacon.upgradeTo(_vLogic);
        vLogic = _vLogic;
    }

    function implementation() public view returns(address) {
        return beacon.implementation();
    }

}