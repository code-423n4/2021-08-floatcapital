const path = require("path");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const {
  mnemonic,
  mainnetProviderUrl,
  rinkebyProviderUrl,
  kovanProviderUrl,
  goerliProviderUrl,
  etherscanApiKey,
  polygonscanApiKey,
} = require("./secretsManager.js");

const blockchainNodeHost = process.env.BLOCKCHAIN_NODE_HOST || "localhost";

const defaultLocalhostNetwork = {
  host: blockchainNodeHost, // Localhost (default: none)
  port: 8545, // Standard Ethereum port (default: none)
  network_id: "*", // Any network (default: none)
  gasPrice: 4000000000, // 40 gwei
  timeoutBlocks: 50000,
  networkCheckTimeout: 1000000,
};

const providerProxyHandler = (rpcUrl, provider) => {
  const get = (_target, property) => {
    if (!provider) {
      provider = new HDWalletProvider(mnemonic, rpcUrl, 0);
    }
    return provider[property];
  };
  return { get };
};

const lazyCreateNetwork = (rpcUrl) => {
  let provider = undefined;
  return new Proxy({}, providerProxyHandler(rpcUrl, provider));
};

module.exports = {
  plugins: ["truffle-plugin-verify"],
  networks: {
    mainnet: {
      network_id: 1,
      provider: lazyCreateNetwork(mainnetProviderUrl),
      // gas: 4700000,
      gasPrice: 45000000000, // 45 gwei
      skipDryRun: true,
    },
    rinkeby: {
      network_id: 4,
      provider: lazyCreateNetwork(rinkebyProviderUrl),
      gas: 4700000,
      gasPrice: 10000000000, // 10 gwe
      skipDryRun: true,
    },
    mumbai: {
      network_id: 80001,
      // provider: lazyCreateNetwork("https://rpc-mumbai.matic.today"),
      // provider: lazyCreateNetwork("https://rpc-mumbai.maticvigil.com/"),
      // provider: lazyCreateNetwork(
      //   "https://rpc-mumbai.maticvigil.com/v1/d68927e8a4cc85eb49e23c93e63f3b018a90efc0"
      // ),
      provider: lazyCreateNetwork("https://matic-mumbai.chainstacklabs.com"),
      // provider: lazyCreateNetwork("https://matic-testnet-archive-rpc.bwarelabs.com"),
      gasPrice: 1000000000, // 1 gwei
      skipDryRun: true,
    },
    kovan: {
      network_id: 42,
      provider: lazyCreateNetwork(kovanProviderUrl),
      // gas: 47000000,
      gasPrice: 10000000000, // 10 gwei
      skipDryRun: true,
    },
    goerli: {
      network_id: 5,
      provider: lazyCreateNetwork(goerliProviderUrl),
      gas: 8000000,
      gasPrice: 10000000000, // 10 gwei
      skipDryRun: true,
    },
    development: defaultLocalhostNetwork,
    graphTesting: defaultLocalhostNetwork,
    test: defaultLocalhostNetwork,
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
  },
  api_keys: {
    polygonscan: polygonscanApiKey,
    etherscan: etherscanApiKey,
  },
};

