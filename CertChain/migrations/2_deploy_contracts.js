const RecongnizingBody = artifacts.require("./RecognizingBody.sol");

module.exports = (deployer, network, accounts) => {
  deployer.deploy(RecongnizingBody);
};