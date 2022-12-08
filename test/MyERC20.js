const {
    time,
    loadFixture,
  } = require("@nomicfoundation/hardhat-network-helpers");
  const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
  const { expect } = require("chai");
const { isCallTrace } = require("hardhat/internal/hardhat-network/stack-traces/message-trace");
  let myERC20;
  describe("MyERC20", async function () {
    
      const MyERC20 = await ethers.getContractFactory("MyERC20");
      myERC20 = await MyERC20.deploy();
      await myERC20.deployed();
      console.log('Address of token: ', myERC20.address); //ok
      let from = '';
      let to = ['', ''];
      let amount = [500, 700];
      it("Massive", async function(){
        await myERC20.transferMassive(from, to, amount);
        console.log('transferMassive');
      });
    });
  
