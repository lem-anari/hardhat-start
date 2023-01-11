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
  let amount = [20000000, 20000000, 30000000];

  beforeEach(async function () {
      [owner, user1, user2, user3] = await ethers.getSigners();
      await deployments.fixture(['MyERC20V1']);
      const { deployer } = await getNamedAccounts();
      const Contr = await ethers.getContract("MyERC20V1", deployer);
      contract = await ethers.getContractAt("MyERC20V1", Contr.address, owner);
      await contract.initialize('MyERC20V1', 'MN', 3000);
      await contract.deployed();

    /*  await deployments.fixture(['FactoryMy']);
      const FactoryMy = await ethers.getContract("FactoryMy", deployer);
      factoryMy = await ethers.getContractAt("FactoryMy", FactoryMy.address, owner);
      await factoryMy.deployed();

      let createdByFactory = await factoryMy.createMyERC20V1('TEST', 'T', 10, 1);
      await createdByFactory.wait();
      console.log('created token from factory V1: ', await factoryMy.getMyERC20(1));

      let createdByFactory2 = await factoryMy.createMyERC20V2('TEST2', 'T2', 10, 2);
      await createdByFactory2.wait();
      let factoriedContractAddr = await factoryMy.getMyERC20(2);
      console.log('created token from factory V2: ', factoriedContractAddr);
      let contractV2Fact = await ethers.getContractAt("MyERC20V2", factoriedContractAddr, owner);
      console.log('contractV2FactAddress: ', contractV2Fact.address);

      // const beacon = await upgrades.deployBeacon(contractV2Fact);
      // const beacon = await upgrades.deployBeacon(contract);
      // await beacon.deployed();
      // console.log("Beacon deployed to:", beacon.address);
      let deplBeacon = await upgrades.admin.getInstance();
      console.log('getInstance(): ', deplBeacon.address);*/

      // console.log('upgrades.beacon(): ', await upgrades.upgradeBeacon(contract.address, contractV2Fact));
      // console.log('upgrades.beacon(): ', await upgrades.beacon.getImplementationAddress());
      
      // console.log('upgrades.beacon(): ', beacon);

      await deployments.fixture(['Factory']);
      const Factory = await ethers.getContract("Factory", deployer);
      factory = await ethers.getContractAt("Factory", Factory.address, owner);
      await factory.deployed();

      let beaconAddress = await factory.getBeacon();

      let beaconTry = await ethers.getContractAt("MyERC20Beacon", beaconAddress, owner);
      //don't need to deploy beacon as it was deployed by factory and it's contained beacon address, therefore I could call getContractAt  
      console.log(await beaconTry.implementation()); //and here I've got the address of my MyERC20V1 token, wow

      let createdByFactory = await factory.create('TEST', 10, 1);
      await createdByFactory.wait();
      console.log('created token from factory: ', await factory.getMyERC20(1));

      let createdByFactory2 = await factory.create('MyV2', 10, 2);
      await createdByFactory2.wait();
      console.log('created token from factory: ', await factory.getMyERC20(2));
      let upgradedContract = await beaconTry.update(await factory.getMyERC20(2));
      console.log(await beaconTry.implementation());

      await deployments.fixture(['MyERC20V2']);
      const Contr2 = await ethers.getContract("MyERC20V2", deployer);
      contract2 = await ethers.getContractAt("MyERC20V2", Contr2.address, owner);
      await contract2.initialize('MyERC20V2', 'MN2', 3000);
      await contract2.deployed();
      
      console.log("contract2.address ", contract2.address);
      await beaconTry.update(contract2.address);
      console.log("beaconTry.implementation() ",await beaconTry.implementation());
      // console.log("beaconTry.implementation() ", contract2.sayHi());
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
      let tokensToMint = amount.reduce(function(sum, elem) {
        return sum + elem;
      }, 0);
      await contract.mint(owner.address, tokensToMint);
      expect(await contract.balanceOf(owner.address)).to.equal(70003000);
    
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
      let tokensToMint = amount.reduce(function(sum, elem) {
        return sum + elem;
      }, 0);
      await contract.mint(owner.address, tokensToMint);
      expect(await contract.balanceOf(owner.address)).to.equal(70003000);
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
