const {
    time,
    loadFixture,
  } = require("@nomicfoundation/hardhat-network-helpers");
  const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
  const { expect } = require("chai");
const { isCallTrace } = require("hardhat/internal/hardhat-network/stack-traces/message-trace");
  let myERC20;
  describe("MyERC20", async function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
    
      const MyERC20 = await ethers.getContractFactory("MyERC20");
      myERC20 = await MyERC20.deploy();
      await myERC20.deployed();
      console.log('Address of token: ', myERC20.address);
      let from = '';
      let to = ['', ''];
      let amount = [500, 700];
      it("Massive", async function(){
        await myERC20.transferMassive(from, to, amount);
        console.log('transferMassive: ', myERC20.address);
      });
    });
  
   
   /* describe("Transfers", function () {
        it("Should transfer the funds to the owner", async function () {
          const { lock, unlockTime, lockedAmount, owner } = await loadFixture(
            deployOneYearLockFixture
          );
  
          await time.increaseTo(unlockTime);
  
          await expect(lock.withdraw()).to.changeEtherBalances(
            [owner, lock],
            [lockedAmount, -lockedAmount]
          );
        });
      });
  });*/
  