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
  let beacon;
  let proxy1;
  let proxy1_accessor;
  let amount = [20000000, 20000000, 30000000];

  before(async function () {//beforeEach
      [owner, user1, user2, user3] = await ethers.getSigners();
      contract = await ethers.getContractFactory("MyERC20V1");
      contract2 = await ethers.getContractFactory("MyERC20V2");

      beacon = await upgrades.deployBeacon(contract);
      await beacon.deployed();
      console.log("Beacon deployed to:", beacon.address);

      proxy1 = await upgrades.deployBeaconProxy(beacon, contract, ['My', 'MN', 3000]);
      await proxy1.deployed();
      console.log("Proxy1 deployed to:", proxy1.address);

      proxy1_accessor = contract.attach(proxy1.address);
      
  });
  describe("Testing", function () {
    it("Should be tessted my contract", async function () {
        const value = await proxy1_accessor.sayHi();
        expect(value.toString()).to.equal('204');
        let ttt = await upgrades.upgradeBeacon(beacon, contract2);
        proxy1_accessor = contract2.attach(proxy1.address);

        const setValueTx = await proxy1_accessor.returningString();
        // await setValueTx.wait();
        expect(setValueTx.toString()).to.equal('yeah');
    });
    it("Should be deployed my factory", async function () {
      
    });
  });
  // describe("Deploying", function () {
  //   it("Should be deployed my contract", async function () {
  //     expect(contract.address).to.be.properAddress;
  //   });
  //   /*it("Should be deployed my factory", async function () {
  //     // const { factory } = ; how to use
  //     expect(factory.address).to.be.properAddress;
  //   });*/
  // });
  // describe("Minting And Transfering", function () {
  //   it("Should be minted and transfered tokens", async function () {
  //     let tokensToMint = amount.reduce(function(sum, elem) {
  //       return sum + elem;
  //     }, 0);
  //     await contract.mint(owner.address, tokensToMint);
  //     expect(await contract.balanceOf(owner.address)).to.equal(70003000);
    
  //     let address = [user1.address, user2.address, user3.address];
  //     // console.log(await contract.balanceOf(owner.address));
  //     let tx = await contract
  //       .connect(owner)
  //       .transferArray(address, amount);
  //     await tx.wait();
  //     // console.log(await contract.balanceOf(owner.address));
  //     // console.log(await contract.balanceOf(user1.address));
      
  //     for (let i = 0; i < amount.length; i++) {
  //       await expect(() => tx).to.changeTokenBalance(
  //         contract, address[i], amount[i]
  //       );
  //     }
  //   });
  // });
  // describe("Minting", function () {
  //   it("Should be minted tokens", async function () {
  //     let tokensToMint = amount.reduce(function(sum, elem) {
  //       return sum + elem;
  //     }, 0);
  //     await contract.mint(owner.address, tokensToMint);
  //     expect(await contract.balanceOf(owner.address)).to.equal(70003000);
  //   });
  // });
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
