
module.exports = async ({ getNamedAccounts, deployments}) => {
    const {deploy} = deployments;
    const {deployer} = await getNamedAccounts();
    const myERC20 = await deploy('MyERC20', {
      from: deployer,
      proxy: true,
      gasLimit: 4000000,
      // args: [],
     });
  };
  
  module.exports.tags = ['MyERC20'];
  