
module.exports = async ({ getNamedAccounts, deployments}) => {
    const {deploy} = deployments;
    const {deployer} = await getNamedAccounts();
    const MyERC20V1 = await deploy('MyERC20V1', {
      from: deployer,
      // proxy: true,
      // kind: 'beacon',
      log: true
     });
     const MyERC20V2 = await deploy('MyERC20V2', {
        from: deployer,
        // proxy: true,
        // kind: 'beacon',
        log: true
       });
    //  console.log('MyERC20V1.address: ' + MyERC20V1.address);
    const Factory = await deploy('Factory', {
     from: deployer,
     log: true,
    //  proxy: true,
    //   kind: 'beacon',
     args: [MyERC20V1.address]
    });
  };
  
  module.exports.tags = ['MyERC20V1', 'Factory', 'MyERC20V2'];
  