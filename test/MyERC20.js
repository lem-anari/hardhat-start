const { expect } = require("chai");
const { ethers, upgrades, deployments, getNamedAccounts } = require("hardhat");

describe("Contract Version 1 test", function () {
  let owner;
  let user1;
  let user2;
  let user3;
  let contract;
  let factory;
  let amount = [20000000, 20000000, 30000000];

  beforeEach(async function () {
      [owner, user1, user2, user3] = await ethers.getSigners();
      await deployments.fixture(['Factory']);
      const { deployer } = await getNamedAccounts();
      const Factory = await ethers.getContract("Factory", deployer);
      factory = await ethers.getContractAt("Factory", Factory.address, owner);
      await factory.deployed();
      
      // console.log(factory);
      contr = await factory.getImplementation();
      // console.log("get Beacon: " + await factory.getBeacon());
      // console.log("get Implement: " + await factory.getImplementation());
      // console.log("get MyERC20: " + await factory.getMyERC20(contr));
      let beaconAddress = await factory.getBeacon();
      let beaconTry = await ethers.getContractAt("MyERC20Beacon", beaconAddress, owner);
      //don't need to deploy beacon as it was deployed by factory and it's contained beacon address, therefore I could call getContractAt  
      console.log(await beaconTry.implementation()); //and here I've got the address of my MyERC20V1 token, wow
      //SORRY FOR COMMENTS))))))))))))))
      let createdByFactory = await factory.create('TEST', 10, 1);
      //there is the transaction, so how could i get `getMyERC20` function from factory?
      await createdByFactory.wait();
      contract = await ethers.getContractAt("MyERC20V1", contr, owner);//do we need it also?
      contract.initialize('MyERC20V1', 'MN', 3000);//do we need it also?
      
      // return { factory }; how to use explain
  });
  describe("Deploying", function () {
    it("Should be deployed my contract", async function () {
      expect(contract.address).to.be.properAddress;
    });
    it("Should be deployed my factory", async function () {
      // const { factory } = ; how to use
      expect(factory.address).to.be.properAddress;
    });
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
});
