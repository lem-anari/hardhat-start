const { expect, assert } = require("chai");
const { keccak256 } = require("ethers/lib/utils");
const { ethers, upgrades } = require('hardhat');
const { toUtf8Bytes } = require('@ethersproject/strings');

describe("Contract Version 1 test", function () {
  let owner;
  let now = new Date();
  let user1 = keccak256(toUtf8Bytes(now.getDay())).substring(0, 42);
  let user2 = keccak256(toUtf8Bytes(now.getHours())).substring(0, 42);
  let user3 = keccak256(toUtf8Bytes(now.getMinutes())).substring(0, 42);
  console.log(`accounts: ${user1}, ${user2}, ${user3}`);
  let contract;
  beforeEach(async function () {
    [owner] = await ethers.getSigners();//5 //user1, user2, user3
    const MyERC20 = await ethers.getContractFactory("MyERC20");//, owner
    contract = await upgrades.deployProxy(
      MyERC20, 
      ["Nastya", "NAS", 42], //MyERC20.name, MyERC20.symbol, MyERC20.initialSupply
      { initializer: 'initialize'});
      console.log('test');
    await contract.deployed();
  });
  it("Should be deployed my contract", async function () {
    expect(contract.address).to.be.properAddress;
  });
  it("Should return the TransferArray function", async function () {    
    let amount1 = await contract.mint(owner.address, 20000000);
    let amount2 = await contract.mint(owner.address, 20000000);
    let amount3 = await contract.mint(owner.address, 30000000);
    let amount = [amount1.value, amount2.value, amount3.value];
    console.log(amount1);
    console.log(`BALANCE CONTRACT ${await contract.balanceOf(owner.address)}`);
    
    let address = [user1, user2, user3];
    console.log(`${owner.address}`);
    let tx = await contract.connect(owner).transferArray(owner.address, address, amount); //allowance need?
    console.log('check 2');
      //.connect(owner)
      
    await tx.wait();
    for (let i = 0; i < amount.length; i++) {
      await expect(() => tx).to.changeEtherBalances(
        [owner, address[i]],
        [amount[i], -amount[i]]
      );
    }
    console.log(`BALANCE OWNER ${await contract.balanceOf(owner.address)}`);
  });
});