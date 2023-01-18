
module.exports = async ({ getNamedAccounts, deployments}) => {
    const {deploy} = deployments;
    const {deployer} = await getNamedAccounts();
    const MyERC20 = await deploy('MyERC20', {
      from: deployer,
      log: true
     });
     const MyERC20V2 = await deploy('MyERC20V2', {
        from: deployer,
        log: true
       });
    const Factory = await deploy('Factory', {
     from: deployer,
     log: true,
     args: [MyERC20.address]
    });
  };
  
  module.exports.tags = ['MyERC'];
  