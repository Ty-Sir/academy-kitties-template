const CatContract = artifacts.require("CatContract");
const KittyMarketPlace = artifacts.require("KittyMarketPlace");

module.exports = function(deployer) {
  deployer.deploy(KittyMarketPlace, CatContract.address);
};
