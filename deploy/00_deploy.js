
module.exports = async ({ getNamedAccounts, deployments}) => {
    const {deploy} = deployments;
    const {deployer} = await getNamedAccounts();
  console.log('deployer: ', await deployer);
    const myERC20 = await deploy('MyERC20', {
      from: deployer,
      proxy: true,
      gasLimit: 4000000,
      // args: [],
     });
  
    console.log("MyERC20 address:", myERC20.address)
    console.log("Deployer", deployer)
  
  };
  
  module.exports.tags = ['MyERC20'];
  