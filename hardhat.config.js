require("@nomicfoundation/hardhat-toolbox");
require("@openzeppelin/hardhat-upgrades");
require("solidity-coverage");
const dotenv = require("dotenv");
dotenv.config();

/** @type import('hardhat/config').HardhatUserConfig */

module.exports = {
  solidity: "0.8.17",
  networks: {
    testnet: {
      url: "https://quiet-blue-panorama.bsc-testnet.discover.quiknode.pro/307105036efae72d45d12dbdc26815509fa83b96/",
      chainId: 97,
      gasPrice: 20000000000,
      accounts: [`${process.env.PRIVATE_KEY}`],
    },
  },
};
