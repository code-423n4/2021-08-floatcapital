module.exports = {
  networks: {
    development: {
      host: blockchainNodeHost, // Localhost (default: none)
      port: 8545, // Standard Ethereum port (default: none)
      network_id: "*", // Any network (default: none)
      gasPrice: 4000000000, // 40 gwei
      timeoutBlocks: 50000,
      networkCheckTimeout: 1000000,
    }
  },
  mocha: {
    reporter: "eth-gas-reporter",
    reporterOptions: {
      currency: "USD",
      gasPrice: 25, // in gwei
    },
  },
  compilers: {
    solc: {
      version: "0.8.3",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200,
        },
        evmVersion: "istanbul",
      },
    },
  }
};
