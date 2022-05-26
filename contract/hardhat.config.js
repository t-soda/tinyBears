require('dotenv').config();
require('@nomiclabs/hardhat-waffle');

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    version: '0.8.9',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    ethereum: {
      url: `${process.env.NEXT_PUBLIC_ALCHEMY_ETHEREUM_RPC_URL}`,
      accounts: [`0x${process.env.METAMASK_PRIVATE_KEY}`],
    },
    polygon: {
      url: `${process.env.NEXT_PUBLIC_ALCHEMY_POLYGON_RPC_URL}`,
      accounts: [`0x${process.env.METAMASK_PRIVATE_KEY}`],
    },
    rinkeby: {
      url: `${process.env.NEXT_PUBLIC_ALCHEMY_RPC_URL}`,
      accounts: [`0x${process.env.METAMASK_PRIVATE_KEY}`],
    },
    testnet: {
      url: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
      accounts: [`0x${process.env.METAMASK_PRIVATE_KEY}`],
    },
  },
  paths: {
    sources: './contracts',
    tests: './test',
    cache: './cache',
    artifacts: './artifacts',
  },
  mocha: {
    timeout: 40000,
  },
  etherscan: {
    apiKey: {
      ethereum: `${process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY}`,
      polygon: `${process.env.NEXT_PUBLIC_POLYGONSCAN_API_KEY}`,
      rinkeby: `${process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY}`,
      bscTestnet: `${process.env.NEXT_PUBLIC_BNCSCAN_API_KEY}`,
    },
  },
};
