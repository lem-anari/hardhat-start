const { expect, assert } = require("chai");

// describe("MyERC20", async function () {
//   let myERC20;
//   let owner;
//   let otherAccount;
//   let user1;
//   let user2;
//   let user3;
//   let token1;
//   let token2;
//   let token3;

//   beforeEach(async function () {
//     [owner, otherAccount, user1, user2, user3] = await ethers.getSigners();
//     console.log("Deploying contract...");
//     const MyERC20 = await ethers.getContractFactory("MyERC20");
//     myERC20 = await upgrades.deployProxy(MyERC20, ["Nastya", "NAS", 42], {
//       initializer: "initialvalue",
//     });
//     await myERC20.deployed();
//     console.log("Address of token: ", myERC20.address);
//   });
//   console.log("Address of token: ", myERC20.address);
//   /*it('works before and after upgrading', async function () {
//     const instance = await upgrades.deployProxy(myERC20, [user1, user2, user3]);
//     assert.strictEqual(await instance.retrieve(), 42);
    
//   });*/
//   it("Should be deployed myERC", async function () {
//     expect(myERC20.address).to.be.properAddress;
//   });
//   it("Should transfer the funds to the owner", async function () {
//     let amount = [token1.mint(user1.address, 1000000000), token2.mint(user2.address, 2000000000), token3.mint(user3.address, 3000000000)];
//     let address = [user1.address, user2.address, user3.address];

//     let tx = await myERC20
//       .connect(owner)
//       .transferArray(owner, address, amount);
//     await tx.wait();
//     tx = await myERC20.transferArray(address, amount);
//     await tx.wait();
//     await expect(() => tx).to.changeEtherBalances(
//       [owner, myERC20],
//       [amount, -amount]
//     );
//   });
// });

describe("Contract Version 1 test", function () {
  let myERC20;
  let owner;
  let otherAccount;
  let user1;
  let user2;
  let user3;
  let token1;
  it("Should return the greeting after deployment", async function () {
    [owner, otherAccount, user1, user2, user3] = await ethers.getSigners();//5
    const MyERC20 = await ethers.getContractFactory("MyERC20");//, owner

    const contract = await upgrades.deployProxy(
      MyERC20, 
      [MyERC20.name, MyERC20.symbol, MyERC20.initialSupply], 
      { initializer: 'initialize'});
    await contract.deployed();
  });
  it("Should return the function", async function () {
    // expect(await contract.greeting()).to.equal("Hello, upgradeable world!");
    let amount = [contract.mint(owner.address, 10000), contract.mint(owner.address, 20000), contract.mint(owner.address, 30000)];
    let address = [user1.address, user2.address, user3.address];

    let tx = await contract.transferArray(owner, address, amount); //allowance need?
    // let tx = await myERC20.transferArray(owner, address, amount);
      //.connect(owner)
      
    await tx.wait();
    tx = await myERC20.transferArray(address, amount);
    await tx.wait();
    await expect(() => tx).to.changeEtherBalances(
      [owner, myERC20],
      [amount, -amount]
    );
  });
});