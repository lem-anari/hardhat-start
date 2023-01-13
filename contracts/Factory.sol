// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts (last updated v4.7.0) (token/ERC20/ERC20.sol) 

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/proxy/beacon/BeaconProxy.sol";
import "@openzeppelin/contracts/proxy/beacon/UpgradeableBeacon.sol"; 
import "./MyECR20.sol";

contract Factory {

    mapping(uint256 => address) private myERC20;
    
    UpgradeableBeacon public beacon;

    constructor(address intiBlueprint) {
        beacon = new UpgradeableBeacon(intiBlueprint);
    } 

    function create(string memory _name, string memory _symbol, uint256 _vaLue,uint256 x) external returns (address) {
        BeaconProxy proxy = new BeaconProxy(address(beacon), abi.encodeWithSelector(MyERC20V1(address(0)).initialize.selector, _name, _symbol, _vaLue));
        myERC20[x] = address(proxy);
        return address(proxy);
    }


    function upgrade(address intiBlueprint) external {
        beacon.upgradeTo(intiBlueprint); 
    }

    // function getImplementation() public view returns (address) {
    //     return beacon.implementation(); 
    // } 

     function getBeacon() public view returns (address) {
        return address(beacon);
    }

     function getMyERC20(uint256 x) public view returns (address) {
        return myERC20[x];
    }
}