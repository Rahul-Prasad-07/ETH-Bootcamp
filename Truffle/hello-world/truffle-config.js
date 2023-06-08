const HDWalletProvider = require('@truffle/hdwallet-provider');
const fs = require('fs');
module.exports = {
  networks: {
    inf_TruffleHelloWorld_sepolia: {
      network_id: 11155111,
      gasPrice: 100000000000,
      provider: new HDWalletProvider(fs.readFileSync('c:\\Users\\Rahul Prasad\\Desktop\\memonic.env', 'utf-8'), "https://sepolia.infura.io/v3/1b4ba4a08ffd4842a54644537e66cc50")
    }
  },
  mocha: {},
  compilers: {
    solc: {
      version: "0.8.17"
    }
  }
};
