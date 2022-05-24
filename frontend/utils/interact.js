const { createAlchemyWeb3 } = require('@alch/alchemy-web3')
const web3 = createAlchemyWeb3(process.env.NEXT_PUBLIC_ALCHEMY_RPC_URL)
import { config } from '../dapp.config'
const contract = require('../artifacts/contracts/TinyBears.sol/TinyBears.json')
const nftContract = new web3.eth.Contract(contract.abi, config.contractAddress)

export const getTotalMinted = async () => {
  const totalMinted = await nftContract.methods.currentTokenId().call()
  return totalMinted
}
