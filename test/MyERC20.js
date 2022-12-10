const { expect, assert } = require("chai");

describe("MyERC20", async function () {
  let myERC20;
  let owner;
  let otherAccount;
  let user1;
  let user2;
  let user3;

  before(async function () {
    [owner, otherAccount, user1, user2, user3] = await ethers.getSigners();

    const MyERC20 = await ethers.getContractFactory("MyERC20", owner);
    myERC20 = await MyERC20.deploy();
    await myERC20.deployed();
  });
  console.log("Address of token: ", myERC20.address);
  it("Should be deployed myERC", async function () {
    expect(myERC20.address).to.be.properAddress;
  });
  it("Should transfer the funds to the owner", async function () {
    let amount = [300, 400, 500];
    let address = [user1.address, user2.address, user3.address]; //mint
    let tx = await myERC20
      .connect(owner)
      .transferMassive("test text", { value: amount[i] });
    await tx.wait();
    tx = await myERC20.transferMassive(address, amount);
    await tx.wait();
    await expect(() => tx).to.changeEtherBalances(
      [owner, myERC20],
      [amount, -amount]
    );
  });
});
