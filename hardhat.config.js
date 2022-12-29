require("@nomicfoundation/hardhat-toolbox");
require("@openzeppelin/hardhat-upgrades");
require("solidity-coverage");
const dotenv = require("dotenv");
dotenv.config();

/** @type import('hardhat/config').HardhatUserConfig */

//Q: Never use tesnet as default network. Use localhost
module.exports = {
  solidity: "0.8.17",
  networks: {
    testnet: {
      url: "https://quiet-blue-panorama.bsc-testnet.discover.quiknode.pro/307105036efae72d45d12dbdc26815509fa83b96/",
      //change
      //https://data-seed-prebsc-1-s1.binance.org:8545
      //Fktrc1lehfr
      chainId: 97,
      gasPrice: 20000000000,

      //Q: Why 0x? Private key don't start with 0x
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    },
  },
  //Q: It make sense only if you use harhdat-deploy or get named accounts
  namedAccounts: {
    deployer: {
      default: 0, // here this will by default take the first account as deployer
    },
  },
};
