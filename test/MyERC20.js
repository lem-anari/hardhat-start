
  const { expect } = require("chai");
  
  describe("MyERC20", async function () {
      let myERC20;
      let owner;
      let otherAccount;
      [owner, otherAccount] = await ethers.getSigners();
      
      const MyERC20 = await ethers.getContractFactory("MyERC20", owner);
      myERC20 = await MyERC20.deploy();
      await myERC20.deployed();

      //ok
      console.log('Address of token: ', myERC20.address);
      it("Should be deployed myERC", async function () {
        expect(myERC20.address).to.be.properAddress
      });
      it("Should transfer the funds to the owner", async function () {
        let amount = [300, 400];
        let address = ['0x1F83388880Aa1FD1f2Db28830e05B8E10DEB93c7', '0x73b72e77fde1f9f86f55423b0687f0efeb9501bbab2b0d1a7d0d91542350f171'];
        //for(let i=0; i<amount.length(); i++){
          //const tx = await myERC20.transferMassive('test text', {value: amount[i]});
          const tx = await myERC20.transferMassive(address, amount);
          await expect(()=>tx).to.changeEtherBalances(
            [owner, myERC20],
            [amount, -amount]
          );
        //}
        await tx.wait();
        
      });
    });
  
