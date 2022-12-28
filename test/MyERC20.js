const { expect, assert } = require("chai");
const { keccak256 } = require("ethers/lib/utils");
const { ethers, upgrades } = require('hardhat');
const abi = require('ethereumjs-abi');
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
  let now = new Date();
  let user1 = "0x000000000000000000000000a398cc72490f72048efa52c4e92067e8499672e7";
  // user1 = ethers.address(keccak256(abi.rawDecode(user1,[ "address" ],now)));
  // ethers.address(keccak256(abi.encodePacked(now)));
  // let user2 = address(keccak256(ethers.abi.encodePacked(now)));
  // let user3 = address(keccak256(abi.encodePacked(now)));
  let user2 = "0xc3ab5ca31a013757f26a88561f0ff5057a97dfcc33f43d6b479abc3ac2d1d595";
  let user3 = "0x344d8cb0711672efbdfe991f35943847c1058e1ecf515ff63ad936b91fd16231";
  let contract;
  //BEFORE EACH
  it("Should return the greeting after deployment", async function () {
    [owner] = await ethers.getSigners();//5 //user1, user2, user3
    const MyERC20 = await ethers.getContractFactory("MyERC20");//, owner
    contract = await upgrades.deployProxy(
      MyERC20, 
      ["Nastya", "NAS", 42], //MyERC20.name, MyERC20.symbol, MyERC20.initialSupply
      { initializer: 'initialize'});
      console.log('tesst');
    await contract.deployed();
  });
  it("Should return the function", async function () {
    // expect(await contract.greeting()).to.equal("Hello, upgradeable world!");
    // const contract = myERC20.attach(address);
    [owner] = await ethers.getSigners();//5 //user1, user2, user3
    const MyERC20 = await ethers.getContractFactory("MyERC20");//, owner
    contract = await upgrades.deployProxy(
      MyERC20, 
      ["Nastya", "NAS", 42], //MyERC20.name, MyERC20.symbol, MyERC20.initialSupply
      { initializer: 'initialize'});
    await contract.deployed();
    console.log(contract);
    let amount = [contract.mint(owner.address, ethers.utils.parseEther('10000')), contract.mint(owner.address, ethers.utils.parseEther('20000')), contract.mint(owner.address, ethers.utils.parseEther('30000'))];
    console.log('check 0');
    console.log(amount);
    let address = [user1, user2, user3];//user3.address
    console.log('check 1');
    let tx = await contract.transferArray(owner.address, address, amount); //allowance need?
    console.log('check 2');
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