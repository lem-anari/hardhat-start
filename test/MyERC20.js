const { expect } = require("chai");
const { ethers, upgrades, deployments, getNamedAccounts } = require("hardhat");

describe("Contract Version 1 test", function () {
  let owner;
  let user1;
  let user2;
  let user3;
  let contract;
  let contract2;
  let factory;
  let factoryMy;
  let tokensToMint;
  
  let amount = [20000000, 20000000, 30000000];

  beforeEach(async function () {
      [owner, user1, user2, user3] = await ethers.getSigners();
      const { deployer } = await getNamedAccounts();
      
      await deployments.fixture(['Factory']);
      const Factory = await ethers.getContract("Factory", deployer);
      factory = await ethers.getContractAt("Factory", Factory.address, owner);
      await factory.deployed();
      console.log('factory.address', factory.address);
      // console.log('owner.address', owner.address);
      await (await factory.create('Test', 'MTN', 10, owner.address, 1)).wait();
      let beaconProxy = await factory.getMyERC20(1);
      let beacon = await factory.getBeacon();
      console.log('beacon: ', beacon);
      console.log('beaconProxy: ', beaconProxy);

      await deployments.fixture(['MyERC20V2']);
      const Contr2 = await ethers.getContract("MyERC20V2", deployer);
      contract2 = await ethers.getContractAt("MyERC20V2", Contr2.address, owner);
      await contract2.deployed();

      await factory.upgrade(contract2.address);

      contract = await contract2.attach(beaconProxy);
      console.log('contractUpgraded: ', contract.address);

      let callingFrom2Contract = await contract.returningString();
  });
  describe("Deploying", function () {
    it("Should be deployed my contract", async function () {
      expect(contract.address).to.be.properAddress;
    });
    /*it("Should be deployed my factory", async function () {
      // const { factory } = ; how to use
      expect(factory.address).to.be.properAddress;
    });*/
  });
  describe("Minting And Transfering", function () {
    it("Should be minted and transfered tokens", async function () {
      tokensToMint = amount.reduce(function(sum, elem) {
        return sum + elem;
      }, 0);

      await contract.mint(owner.address, tokensToMint);
      expect(await contract.balanceOf(owner.address)).to.equal(70000000);
    
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
  });
  describe("Minting", function () {
    it("Should be minted tokens", async function () {
      tokensToMint = amount.reduce(function(sum, elem) {
        return sum + elem;
      }, 0);
      await contract.mint(owner.address, tokensToMint);
      expect(await contract.balanceOf(owner.address)).to.equal(70000000);
    });
    it("should NOT be possible to addToken token to contract by NOT minter", async function () {
      await expect(contract.connect(user3).mint(user3.address, tokensToMint)).to.be.revertedWith(
          `AccessControl: account ${(user3.address).toLowerCase()} is missing role ${await contract.MINTER_ROLE()}`
      );
  });
  });
  // describe("Transfering", function () {
  //   before(async function (){
  //     let tokensToMint = amount.reduce(function(sum, elem) {
  //       return sum + elem;
  //     }, 0);
  //     await contract.mint(owner.address, tokensToMint);
  //     expect(await contract.balanceOf(owner.address)).to.equal(140003000);
  //   });
  //   it("Should be transfered tokens", async function () {
  //     let address = [user1.address, user2.address, user3.address];
  //     console.log(await contract.balanceOf(owner.address));
  //     let tx = await contract
  //       .connect(owner)
  //       .transferArray(address, amount);
  //     await tx.wait();
  //     console.log(await contract.balanceOf(owner.address));
  //     console.log(await contract.balanceOf(user1.address));
      
  //     for (let i = 0; i < amount.length; i++) {
  //       await expect(() => tx).to.changeTokenBalance(
  //         contract, address[i], amount[i]
  //       );
  //     }
  //   });
  // });
});
