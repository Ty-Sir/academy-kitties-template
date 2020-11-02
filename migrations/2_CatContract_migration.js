const CatContract = artifacts.require("CatContract");

module.exports = function(deployer) {
  deployer.deploy(CatContract);
};
