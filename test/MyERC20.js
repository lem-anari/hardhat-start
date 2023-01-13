const { expect } = require("chai");
const { ethers, upgrades } = require("hardhat");

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
});
