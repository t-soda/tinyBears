import { useEffect, useState } from 'react'
import Image from 'next/image'
import { config } from '../dapp.config'
import { web3Onboard } from '../utils/onboard'
import { useConnectWallet, useSetChain, useWallets } from '@web3-onboard/react'
import { type OnboardAPI } from '@web3-onboard/core'
import { getTotalMinted } from '../utils/interact'

const Mint = () => {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet()
  const [{ chains, connectedChain, settingChain }, setChain] = useSetChain()
  const [onboard, setOnboard] = useState<OnboardAPI>()

  const connectedWallets = useWallets()

  useEffect(() => {
    ;(async () => {
      console.log(await getTotalMinted())
    })()
    setOnboard(web3Onboard)
  }, [])

  useEffect(() => {
    if (!connectedWallets.length) return

    const connectedWalletsLabelArray = connectedWallets.map(
      ({ label }) => label
    )
    window.localStorage.setItem(
      'connectedWallets',
      JSON.stringify(connectedWalletsLabelArray)
    )
  }, [connectedWallets])

  useEffect(() => {
    if (!onboard) return

    const previouslyConnectedWallets = JSON.parse(
      window.localStorage.getItem('connectedWallets') || ''
    )

    if (previouslyConnectedWallets?.length) {
      const setWalletFromLocalStorage = async () => {
        await connect({
          autoSelect: {
            label: previouslyConnectedWallets[0],
            disableModals: true
          }
        })
      }

      setWalletFromLocalStorage()
    }
  }, [onboard, connect])

  return (
    <div className="min-h-screen h-full w-full overflow-hidden flex flex-col items-center justify-center">
      <div className="relative w-full h-full flex flex-col items-center justify-center">
        <img
          src="/images/bg_natural_sougen.jpeg"
          className="-z-10 absolute inset-auto block w-full min-h-screen object-cover"
        />
        <div className="flex flex-col items-center justify-center h-full w-full p-2 md:px-10">
          <h1 className="font-PassionOne text-5xl bg-gradient-to-br from-brand-blue to-brand-green pr-2 bg-clip-text text-transparent">
            {config.title}
          </h1>
          <div className="mt-10 relative md:max-w-3xl w-full bg-white/70 filter backdrop-blur-sm py-4 rounded-md px-2 md:px-10 flex flex-col items-center">
            <h3 className="text-sm text-gray-500 tracking-widest">
              {/* {walletAddress ? walletAddress : ''} */}
            </h3>
            <div className="flex flex-col md:flex-row md:space-x-14 w-full mt-10 md:mt-14">
              <div className="relative w-full">
                <div className="z-10 absolute top-2 left-2 opacity-80 filter backdrop-blur-lg text-base px-4 py-2 bg-white border border-black rounded-md flex items-center justify-center text-black font-semibold">
                  <p>
                    <span>0</span> / 300
                  </p>
                </div>

                <Image
                  layout="responsive"
                  src="/images/69.png"
                  width={300}
                  height={300}
                  className="rounded-md"
                />
              </div>

              <div className="flex flex-col items-center w-full px-4 mt-16 md:mt-0">
                <div className="font-coiny flex items-center justify-between w-full">
                  <button className="w-14 h-10 md:w-16 md:h-12 flex items-center justify-center text-brand-background hover:shadow-lg bg-gray-300 font-bold rounded-md">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 md:h-8 md:w-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </button>

                  <p className="flex items-center justify-center flex-1 grow text-center font-bold text-brand-pink text-3xl md:text-4xl">
                    1
                  </p>

                  <button className="w-14 h-10 md:w-16 md:h-12 flex items-center justify-center text-brand-background hover:shadow-lg bg-gray-300 font-bold rounded-md">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 md:h-8 md:w-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M18 12H6"
                      />
                    </svg>
                  </button>
                </div>

                <p className="text-sm tracking-widest mt-3">
                  Max Mint Amount: 2
                </p>

                <div className="border-t border-b py-4 mt-16 w-full">
                  <div className="w-full text-xl font-coiny flex items-center justify-between text-brand-pink">
                    <p>Total</p>

                    <div className="flex items-center space-x-3">
                      <p>12 ETH</p> <span className="text-gray-400">+ GAS</span>
                    </div>
                  </div>
                </div>

                <button
                  className="font-coiny mt-12 w-full bg-gradient-to-br from-brand-yellow to-brand-pink shadow-lg px-6 py-3 rounded-md text-2xl text-white hover:shadow-yellow-400/50 mx-4 tracking-wide uppercase"
                  onClick={() => connect({})}
                >
                  Connect Wallet
                </button>
              </div>
            </div>
            <div className="border-t border-gray-800 flex flex-col items-center mt-10 py-2 w-full">
              <h3 className="font-coiny text-2xl text-brand-pink uppercase mt-6">
                Contract Address
              </h3>
              <a
                href={`https://rinkeby.etherscan.io/address/${`config.contractAddress`}#readContract`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 mt-4"
              >
                <span className="break-all ...">{`config.contractAddress`}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Mint
