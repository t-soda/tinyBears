require('@nomiclabs/hardhat-etherscan');
const hre = require('hardhat');

async function main() {
  await hre.run('verify:verify', {
    address: '0x33fdC37fa09e670d4444a85Bcd625137d0df3837', // Deployed contract address
    constructorArguments: [
      'ipfs://Qmb5A1fFECM2iFHgUioii2khT814nCi6VU9aHXHHqNxHCK/',
      '0x6Fcb97553D41516Cb228ac03FdC8B9a0a9df04A1',
      0,
      300,
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
