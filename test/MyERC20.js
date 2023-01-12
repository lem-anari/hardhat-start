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

    //  await deployments.fixture(['MyERC20V2']);
    //  const Contr2 = await ethers.getContract("MyERC20V2", deployer);
    //   contract2 = await ethers.getContractAt("MyERC20V2", Contr2.address, owner);
    //   await contract2.initialize('MyERC20V2', 'MN2', 3000);
    //   await contract2.deployed();
      // console.log(await upgrades.upgradeProxy(contract.address, ));
      // await upgrades.deployBeaconProxy(contract2.address);
      await deployments.fixture(['Factory']);
      const Factory = await ethers.getContract("Factory", deployer);
      factory = await ethers.getContractAt("Factory", contract.address, owner);//Factory.address
      await factory.deployed();
      // console.log('factory: ', await factory.provider.getCode(factory.address));

      let createdByFactory = await factory.create('Test', 'MTN', 10, 1);
      await createdByFactory.wait();
      // console.log('created token from factory: ', factory);
      console.log('created token from factory: ', await factory.getMyERC20(1));
      // let factoriedContractAddr = await factoryMy.getMyERC20(1);
      // let contract = await ethers.getContractAt("TEST", factoriedContractAddr, owner);
      // await contract.initialize('TEST', 'TN', 3000);
      

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
