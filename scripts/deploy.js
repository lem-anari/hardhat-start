const { ethers, upgrades} = require('hardhat');


async function main() {
  // Deploying
  const ERC20 = await ethers.getContractFactory("MyERC20");
  const instance = await upgrades.deployProxy(ERC20, ['MyToken', 'MN', 1000000000],{
    initializer: "initialize"
  });
  await instance.deployed();
  console.log('MyERC20 deployed: ', instance.address);
  
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
