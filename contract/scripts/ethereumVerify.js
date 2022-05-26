require('@nomiclabs/hardhat-etherscan');
const hre = require('hardhat');

async function main() {
  await hre.run('verify:verify', {
    address: '0x33fdC37fa09e670d4444a85Bcd625137d0df3837', // Deployed contract address
    constructorArguments: [
      'ipfs://QmPSsYiC2cdy6GNBs5ytA8jYZLHFepkk852qbsf1WWXEdv/',
      '0x66A71Dcef29A0fFBDBE3c6a460a3B5BC225Cd675',
      250,
      500,
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
