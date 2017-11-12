const RecongnizingBody = artifacts.require("./RecognizingBody.sol");
const University = artifacts.require("./University.sol");
const Certificate = artifacts.require("./Certificate.sol");

module.exports = (deployer, network, accounts) => {
  deployer.deploy(RecongnizingBody);
  deployer.deploy(University);
  deployer.deploy(Certificate);
};