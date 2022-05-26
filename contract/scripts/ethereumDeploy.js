// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require('hardhat');

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const TinyBears = await hre.ethers.getContractFactory('TinyBears');
  const tinyBears = await TinyBears.deploy(
    'ipfs://QmPSsYiC2cdy6GNBs5ytA8jYZLHFepkk852qbsf1WWXEdv/',
    '0x66A71Dcef29A0fFBDBE3c6a460a3B5BC225Cd675',
    250,
    500
  );

  await tinyBears.deployed();

  console.log('Greeter deployed to:', tinyBears.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
