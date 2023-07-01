
const Transcation = artifacts.require("Transcation");

module.exports = function (deployer) {
    deployer.deploy(Transcation);
}