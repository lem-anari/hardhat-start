require("@nomicfoundation/hardhat-toolbox");
require('@openzeppelin/hardhat-upgrades');
const dotenv = require('dotenv');
dotenv.config();

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
      accounts: [`0x${process.env.PRIVATE_KEY}`]
    },
  },
  namedAccounts: {
    deployer: {
        default: 0, // here this will by default take the first account as deployer
    },
},
};
