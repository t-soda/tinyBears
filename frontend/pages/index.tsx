import { useEffect, useState } from 'react'
import Image from 'next/image'
import { config } from '../dapp.config'
import { web3Onboard } from '../utils/onboard'
import { useConnectWallet, useSetChain, useWallets } from '@web3-onboard/react'
import { type OnboardAPI } from '@web3-onboard/core'
import {
  getTotalMinted,
  getBalanceOf,
  isPausedState,
  mint
} from '../utils/interact'
import { useInterval } from '../utils/useInterval'

type statusProps = {
  success: boolean
  message: string
}
const Anime = ({
  bottom,
  time,
  startRight = false,
  tokenId
}: {
  bottom: number
  time: number
  startRight?: boolean
  tokenId: number
}) => {
  const [isLeft, setIsLeft] = useState<boolean>(startRight)
  const [delay, setDelay] = useState(time * 1000)
  const [imageUrl, setImageUrl] = useState<string>('/images/69.png')

  useEffect(() => {
    setImageUrl(
      `https://gateway.pinata.cloud/ipfs/QmdBfRpRrBFxq1wTKHZJjkBTZiNRBSAs4uGBMChMYsaJBe/${tokenId}.png`
    )
  }, [])

  useInterval(() => {
    setIsLeft(isLeft ? false : true)
  }, delay)
  return (
    <div
      className={`z-10 w-full absolute ${startRight ? 'right-0' : ''}`}
      style={{ bottom: `${bottom}rem` }}
    >
      <div className="w-full relative">
        <a
          href={`https://testnets.opensea.io/assets/rinkeby/0x33fdc37fa09e670d4444a85bcd625137d0df3837/${tokenId}`}
          target="blank"
        >
          <div
            style={{
              transform: isLeft ? 'rotateY(180deg)' : 'rotateY(0deg)'
            }}
            className={
              isLeft
                ? `animate-[right_40s_linear_1_forwards] absolute`
                : `animate-[left_40s_linear_1_forwards] absolute`
            }
          >
            <Image
              src={imageUrl}
              // src="/images/69.png"
              width={50}
              height={50}
              className="object-cover relative duration-300 transition-transform animate-updown"
            />
          </div>
        </a>
      </div>
    </div>
  )
}
const Mint = () => {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet()
  const [{ chains, connectedChain, settingChain }, setChain] = useSetChain()
  const [onboard, setOnboard] = useState<OnboardAPI>()

  const [status, setStatus] = useState<statusProps>()
  const [totalMinted, setTotalMinted] = useState<number>(0)
  const [balanceOf, setBalanceOf] = useState<number>(0)
  const [paused, setPaused] = useState<number>(0)
  const [isMinting, setIsMinting] = useState(false)
  const [tokenIds, setTokenIds] = useState<number[]>([])

  const connectedWallets = useWallets()

  useEffect(() => {
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
      window.localStorage.getItem('connectedWallets') || '{}'
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

  useEffect(() => {
    ;(async () => {
      const totalMinted = await getTotalMinted()
      setBalanceOf(await getBalanceOf())
      setTotalMinted(totalMinted)
      setPaused(await isPausedState())

      const imageIdsArray: number[] = []

      const max = totalMinted < 5 ? totalMinted : 5
      for (let i = 0; i < max; i++) {
        while (true) {
          var tmp = Math.floor(Math.random() * totalMinted + 1)
          if (!imageIdsArray.includes(tmp)) {
            imageIdsArray.push(tmp)
            break
          }
        }
      }

      setTokenIds(imageIdsArray)
    })()
  }, [])

  const mintHandler = async () => {
    setIsMinting(true)

    const { success, status } = await mint()

    setStatus({
      success,
      message: status
    })

    if (success) {
      setBalanceOf((balanceOf) => Number(balanceOf) + 1)
    }

    setIsMinting(false)
  }

  return (
    <div className="min-h-screen h-full w-full overflow-hidden flex flex-col items-center justify-center bg-gradient-to-b from-blue-400 to-blue-100">
      <div className="relative w-full h-full flex flex-col items-center justify-center">
        {/* <img
          src="/images/bg_natural_sougen.jpeg"
          className="-z-10 absolute inset-auto block w-full min-h-screen object-cover"
        /> */}
        <div className="flex flex-col items-center justify-center h-full w-full p-2 md:p-10">
          <h1 className="font-PassionOne text-7xl bg-gradient-to-br from-brand-blue to-brand-green pr-2 mt-20 md:mt-0 bg-clip-text text-transparent">
            {config.title}
          </h1>
          <div className="mt-10 relative md:max-w-3xl w-full bg-white/70 filter backdrop-blur-sm p-4 rounded-md md:p-10 flex flex-col items-center">
            <h2 className="font-PassionOne text-gray-700 tracking-wide self-start text-xl">
              Tiny bears are running around the meadow today. Come capture your
              very own tiny bears. Tiny bears uses omnichain by LayerZero.
              Copyright cc0🎉
              <br />
              However, tiny bears are very few and limited. First come, first
              served, so don't delay!
              <br /> (Currently, the Ethereum Mint is in preparation. It will be
              available soon, so please look forward to it👋)
            </h2>
            <div className="flex flex-col md:flex-row md:space-x-14 w-full">
              <div className="w-full">
                <Image
                  layout="responsive"
                  src="/images/69.png"
                  width={300}
                  height={300}
                  className="rounded-md"
                />
              </div>

              <div className="flex flex-col items-center justify-center w-full md:mt-0">
                <div className="w-full flex justify-center">
                  <p>Total Minted</p>
                  <div className="flex flex-col ml-4 pl-4 border-l border-gray-400">
                    <p className="text-purple-600 rounded-md flex flex-row items-center">
                      <Image
                        layout="fixed"
                        src="/images/polygon-matic-logo.png"
                        width={20}
                        height={20}
                      />
                      <span className="ml-2">
                        {('000' + totalMinted).slice(-3)}{' '}
                      </span>{' '}
                      / 300
                    </p>
                    <p className="text-gray-600 rounded-md flex flex-row items-center">
                      <Image
                        layout="fixed"
                        src="/images/ethereum-eth-logo.png"
                        width={20}
                        height={20}
                      />
                      <span className="ml-2">000</span> / 200
                    </p>
                  </div>
                </div>
                {wallet ? (
                  paused || balanceOf >= 2 ? (
                    <button
                      className="mt-5 w-full bg-gradient-to-br from-gray-600 to-gray-800 shadow-lg px-6 py-3 text-sm rounded-md text-white tracking-wide cursor-default"
                      disabled={balanceOf >= 2}
                    >
                      {paused
                        ? `Mint is currently paused`
                        : `You have already mint to the limit.`}
                    </button>
                  ) : (
                    <button
                      className="mt-5 w-full bg-gradient-to-br from-brand-blue to-brand-green shadow-lg px-6 py-3 rounded-md text-2xl text-white hover:shadow-green-400/50 tracking-wide"
                      disabled={balanceOf >= 2}
                      onClick={mintHandler}
                    >
                      <p className="text-2xl">
                        {isMinting ? 'Minting...' : 'FREE MINT'}
                      </p>
                      <span className="text-xs">
                        (You pay the minting gas fee)
                      </span>
                    </button>
                  )
                ) : (
                  <button
                    className="mt-5 w-full bg-gradient-to-br from-brand-yellow to-brand-pink shadow-lg px-6 py-3 rounded-md text-2xl text-white hover:shadow-yellow-400/50 tracking-wide uppercase"
                    onClick={() => connect({})}
                  >
                    Connect Wallet
                  </button>
                )}
                <p className="text-gray-600 text-sm mt-3 text-center">
                  Max Mint Amount: 2
                </p>
                {wallet && (
                  <p className="text-gray-600 text-sm text-center">
                    (You already minted {balanceOf}/2)
                  </p>
                )}
              </div>
            </div>

            {/* status */}
            {status && (
              <div
                className={`border ${
                  status.success ? 'border-green-500' : 'border-brand-pink-400 '
                } rounded-md text-start h-full px-4 py-4 w-full mx-auto mt-4`}
              >
                <p className="flex flex-col space-y-2 text-gray-500 text-sm md:text-base break-words ...">
                  {status.message}
                </p>
              </div>
            )}

            {/* contact addres */}
            <div className="border-t border-gray-300 flex flex-col items-center py-2 w-full mt-10">
              <h3 className="text-sm text-gray-500 mt-6 font-bold">
                Contract Address
              </h3>
              <a
                href={`https://rinkeby.etherscan.io/address/${config.contractAddress}#readContract`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-gray-500"
              >
                <span className="break-all ...">{config.contractAddress}</span>
              </a>
            </div>
          </div>
        </div>
        <div className="relative h-80 w-full">
          {totalMinted > 0 && (
            <>
              {tokenIds.map((imageId, index) => {
                return (
                  <Anime
                    time={50 - index * 2}
                    bottom={15 - index * 2}
                    startRight={index % 2 == 0}
                    tokenId={imageId}
                    key={index}
                  />
                )
              })}
            </>
          )}
          <Image
            layout="fill"
            src="/images/bg_natural_sougen.png"
            className="inset-auto block w-full"
            objectFit="cover"
          />
        </div>
      </div>
    </div>
  )
}

export default Mint
