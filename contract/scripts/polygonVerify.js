require('@nomiclabs/hardhat-etherscan');
const hre = require('hardhat');

async function main() {
  await hre.run('verify:verify', {
    address: '0xE4a0D3552aa32e4D7c7f0A49B00ec8951de2c80C', // Deployed contract address
    constructorArguments: [
      'ipfs://QmPSsYiC2cdy6GNBs5ytA8jYZLHFepkk852qbsf1WWXEdv/',
      '0x3c2269811836af69497E5F486A85D7316753cf62',
      0,
      250,
    ],
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
