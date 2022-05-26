require('@nomiclabs/hardhat-etherscan');
const hre = require('hardhat');

async function main() {
  await hre.run('verify:verify', {
    address: '0x9E8c45bd37E909857660e97f0bb0FDA39a8A0e58', // Deployed contract address
    constructorArguments: [
      'ipfs://Qmb5A1fFECM2iFHgUioii2khT814nCi6VU9aHXHHqNxHCK/',
      '0x79a63d6d8BBD5c6dfc774dA79bCcD948EAcb53FA',
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
