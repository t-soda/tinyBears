const { createAlchemyWeb3 } = require('@alch/alchemy-web3')
const web3 = createAlchemyWeb3(process.env.NEXT_PUBLIC_ALCHEMY_POLYGON_RPC_URL)
import { config } from '../dapp.config'
const contract = require('../artifacts/contracts/TinyBears.sol/TinyBears.json')
const nftContract = new web3.eth.Contract(contract.abi, config.contractAddress)

export const getTotalMinted = async () => {
  const totalMinted = await nftContract.methods.currentTokenId().call()
  return totalMinted
}

export const getBalanceOf = async () => {
  const balanceOf = await nftContract.methods
    .balanceOf(window.ethereum.selectedAddress)
    .call()
  return balanceOf
}

export const isPausedState = async () => {
  const paused = await nftContract.methods.paused().call()
  return paused
}

export const mint = async () => {
  if (!window.ethereum.selectedAddress) {
    return {
      success: false,
      status: 'To be able to mint, you need to connect your wallet'
    }
  }

  const nonce = await web3.eth.getTransactionCount(
    window.ethereum.selectedAddress,
    'latest'
  )

  // Set up our Ethereum transaction
  const tx = {
    to: config.contractAddress,
    from: window.ethereum.selectedAddress,
    value: parseInt(web3.utils.toWei(String(0), 'ether')).toString(16), // hex
    data: nftContract.methods.mint(1).encodeABI(),
    nonce: nonce.toString(16)
  }

  try {
    const txHash = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [tx]
    })

    return {
      success: true,
      status: (
        <a href={`https://rinkeby.etherscan.io/tx/${txHash}`} target="_blank">
          <p>✅ Check out your transaction on Etherscan:</p>
          <p>{`https://rinkeby.etherscan.io/tx/${txHash}`}</p>
        </a>
      )
    }
  } catch (error) {
    return {
      success: false,
      status: error.message
    }
  }
}
