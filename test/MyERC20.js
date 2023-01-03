const { expect, assert } = require("chai");
const { keccak256 } = require("ethers/lib/utils");
const { ethers, upgrades } = require("hardhat");
const { toUtf8Bytes } = require("@ethersproject/strings");

describe("Contract Version 1 test", function () {
  let owner;
  let user1;
  let user2;
  let user3;
  let contract;
  let amount = [20000000, 20000000, 30000000];

  beforeEach(async function () {
    [owner, user1, user2, user3] = await ethers.getSigners();
    const MyERC20 = await ethers.getContractFactory("MyERC20");
    contract = await upgrades.deployProxy(
      MyERC20,
      ["Nastya", "NAS", 42],
      { initializer: "initialize" }
    );
    await contract.deployed();
  });
  describe("Deploying", function () {
    it("Should be deployed my contract", async function () {
      expect(contract.address).to.be.properAddress;
    });
  });
  describe("Minting And Transfering", function () {
    it("Should be minted and transfered tokens", async function () {
      let tokensToMint = amount.reduce(function(sum, elem) {
        return sum + elem;
      }, 0);
      await contract.mint(owner.address, tokensToMint);
      expect(await contract.balanceOf(owner.address)).to.equal(70000042);
    
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
