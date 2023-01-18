const { expect } = require("chai");
const { ethers, deployments, getNamedAccounts } = require("hardhat");
const Reverting = require("./helpers/reverting");

describe("Contract Version 1 test", function () {
  let owner;
  let user1;
  let user2;
  let user3;
  let contract;
  let contract2;
  let factory;
  let tokensToMint;
  let beaconProxy;
  const  reverted = new Reverting();
  
  let amount = [20000000, 20000000, 30000000];
  // let deployer; // deployer.deployer
  beforeEach(async function () {
      [owner, user1, user2, user3] = await ethers.getSigners();
      const { deployer } = await getNamedAccounts();
      await deployments.fixture(['MyERC']);
      const Factory = await ethers.getContract("Factory", deployer);
      factory = await ethers.getContractAt("Factory", Factory.address, owner);
      await factory.deployed();

      await (await factory.create('Test', 'MTN', 10, owner.address, 1)).wait();
      beaconProxy = await factory.getMyERC20(1);
      let beacon = await factory.getBeacon();
      contract2 = await ethers.getContract("MyERC20V2", deployer);

      await factory.upgrade(contract2.address);
      contract = await contract2.attach(beaconProxy);

      await contract.returningString();
      await reverted.snapshot();
  });
  afterEach("revert", function () {
    return reverted.revert();
});
  describe("Deploying", function () {
    it("Should be deployed my contract", async function () {
      expect(contract.address).to.be.properAddress;
    });
  });
  describe("getBeacon", function () {
    it("should be possible to get beacon address", async function () {
        const beaconAddress = await factory.getBeacon();
        expect(beaconAddress).to.not.equal(ethers.constants.AddressZero);
    });
    
  });
  describe("Minting", function () {
    it("Should be minted tokens", async function () {
      tokensToMint = amount.reduce(function(sum, elem) {
        return sum + elem;
      }, 0);
      let tx = await contract.connect(owner).mint(owner.address, tokensToMint);
      tx.wait();
      expect(await contract.balanceOf(owner.address)).to.equal(70000000);
    });
    it("should NOT be possible to mintToken token to contract by NOT minter", async function () {
      // let tx = contract.connect(user3).mint(user3.address, tokensToMint);
      // await tx.wait();
      await expect(contract.connect(user3).mint(user3.address, tokensToMint)).to.be.revertedWith(
          `AccessControl: account ${(user3.address).toLowerCase()} is missing role ${await contract.MINTER_ROLE()}`
      );
    });
    it("should NOT be equal contract balance and 70000000", async function () {
      let amount2 = [20000000, 20000000, 30000000, 4000];
      tokensToMint = amount2.reduce(function(sum, elem) {
        return sum + elem;
      }, 0);
      await contract.connect(owner).mint(owner.address, tokensToMint);
      expect(await contract.balanceOf(owner.address)).to.not.equal(70000000);
    });
  });
  describe("Transfering", function () {
    beforeEach(async function (){
      tokensToMint = amount.reduce(function(sum, elem) {
        return sum + elem;
      }, 0);
      await contract.connect(owner).mint(owner.address, tokensToMint);
      expect(await contract.balanceOf(owner.address)).to.equal(70000000);
    });
    it("Should be transfered tokens", async function () {
      let address = [user1.address, user2.address, user3.address];
      // console.log(await contract.balanceOf(owner.address));
      let tx = await contract
        .connect(owner)
        .transferArray(address, amount);
      await tx.wait();
      // console.log(await contract.balanceOf(owner.address));
      // console.log(await contract.balanceOf(user1.address));
      
      for (let i = 0; i < amount.length; i++) {
        await expect(() => tx).to.changeTokenBalance(
          contract, address[i], amount[i]
        );
      }
    });
    it("Should be reverted as array address.length != amount.length", async function () {
      let address = [user1.address, user2.address, user3.address, user3.address];
      let addrLength = address.length;
      let amountLength = amount.length;
      await expect(contract.transferArray(address, amount)).to.be.reverted;
    });
    it("Should be reverted with `transfer amount exceeds balance`", async function () {
      let address = [user1.address, user2.address, user3.address];
      let amount = [20000000, 20000000, 40000000];
      await expect(contract.transferArray(address, amount)).to.be.revertedWith('ERC20: transfer amount exceeds balance');
    });
  });
});
