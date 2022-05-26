const { createAlchemyWeb3 } = require('@alch/alchemy-web3')
const web3 = createAlchemyWeb3(process.env.NEXT_PUBLIC_ALCHEMY_RPC_URL)
import { config } from '../dapp.config'
const contractPoly = require('../artifacts/contracts/polygon/TinyBears.sol/TinyBears.json')
const contractEth = require('../artifacts/contracts/ethereum/TinyBears.sol/TinyBears.json')
const nftContractPoly = new web3.eth.Contract(
  contractPoly.abi,
  config.contractAddressPoly
)
const nftContractEth = new web3.eth.Contract(
  contractEth.abi,
  config.contractAddressEth
)

export const getTotalMintedPoly = async () => {
  const totalMinted = await nftContractPoly.methods.currentTokenId().call()
  return totalMinted
}

export const getTotalMintedEth = async () => {
  const totalMinted = await nftContractEth.methods.currentTokenId().call()
  return totalMinted
}

export const getBalanceOfPoly = async () => {
  const balanceOf = await nftContractPoly.methods
    .balanceOf(window.ethereum.selectedAddress)
    .call()
  return balanceOf
}

export const getBalanceOfEth = async () => {
  const balanceOf = await nftContractEth.methods
    .balanceOf(window.ethereum.selectedAddress)
    .call()
  return balanceOf
}

export const isPausedStatePoly = async () => {
  const paused = await nftContractPoly.methods.paused().call()
  return paused
}

export const isPausedStateEth = async () => {
  const paused = await nftContractEth.methods.paused().call()
  return paused
}

export const mintPoly = async () => {
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
    to: config.contractAddressPoly,
    from: window.ethereum.selectedAddress,
    value: parseInt(web3.utils.toWei(String(0), 'ether')).toString(16), // hex
    data: nftContractPoly.methods.mint(1).encodeABI(),
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
          <p>Check out your transaction on Polygonscan:</p>
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

export const mintEth = async () => {
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
    to: config.contractAddressEth,
    from: window.ethereum.selectedAddress,
    value: parseInt(web3.utils.toWei(String(0), 'ether')).toString(16), // hex
    data: nftContractPoly.methods.mint(1).encodeABI(),
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
          <p>Check out your transaction on Ethereumscan:</p>
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
