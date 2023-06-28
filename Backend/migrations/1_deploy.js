// this is helps in deploy our smart contract

const Lottery = artifacts.require("Lottery");

module.exports = function (deployer) {
    deployer.deploy(Lottery);
}