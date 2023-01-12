// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts (last updated v4.7.0) (token/ERC20/ERC20.sol) 

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/proxy/beacon/BeaconProxy.sol";
import "./MyERC20Beacon.sol";
import "./MyECR20.sol";

contract Factory {

    mapping(uint256 => address) private myERC20;
    
    MyERC20Beacon immutable beacon;

    constructor(address _vLogic) {
        beacon = new MyERC20Beacon(_vLogic);
    } 

    function create(string calldata _name, uint256 _vaLue, uint256 x) external returns (address) {
        BeaconProxy proxy = new BeaconProxy(address(beacon), 
            abi.encodeWithSelector(MyERC20V1(address(0)).initialize.selector, _name, _vaLue)
        );
        myERC20[x] = address(proxy);
        return address(proxy);
    }

    function getImplementation() public view returns (address) {
        return beacon.implementation(); 
    } 

     function getBeacon() public view returns (address) {
        return address(beacon);
    }

     function getMyERC20(uint256 x) public view returns (address) {
        return myERC20[x];
    }
}