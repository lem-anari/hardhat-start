require("@nomicfoundation/hardhat-toolbox");
require('@openzeppelin/hardhat-upgrades');
require("dotenv").config;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "testnet",
  solidity: "0.8.17",
  networks: {
    testnet: {
      url: "https://quiet-blue-panorama.bsc-testnet.discover.quiknode.pro/307105036efae72d45d12dbdc26815509fa83b96/",
      //https://data-seed-prebsc-1-s1.binance.org:8545
      //Fktrc1lehfr
      chainId: 97,
      gasPrice: 20000000000,
      accounts: [`0x10023bd2c1792f26c156efe051e3d0d3c00fd0e3065753b60e90a4b6bc9626e5`]//[`0x${process.env.MNEMONIC}`]
    },
  },
  namedAccounts: {
    deployer: {
        default: 0, // here this will by default take the first account as deployer
    },
},
};
