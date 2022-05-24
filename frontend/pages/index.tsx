import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import { config } from '../dapp.config'

const Home = () => {
  return (
    <div className="min-h-screen h-full w-full flex flex-col bg-brand-light overflow-hidden">
      <Head>
        <title>CreateNextApp</title>
        <meta name="description" content={`${config.description}`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="min-w-full text-gray-800 py-14 px-4 md:px-8">
        <div className="flex items-center container mx-auto max-w-5xl justify-between h-full"></div>
        <Link href="#">
          <a className="text-xl md:text-3xl font-bold font-LuckiestGuy">
            <span className="bg-gradient-to-br from-brand-blue to-brand-purple pr-2 bg-clip-text text-transparent">
              {config.title}
            </span>
          </a>
        </Link>
      </header>
      <div className="h-full w-full container max-w-5xl mx-auto flex flex-col items-center pt-4">
        <div className="flex flex-col items-center max-w-4xl w-full">
          <Link href="#" passHref>
            <a className="mt-16 font-LuckiestGuy uppercase inline-flex items-center px-6 text-sm md:text-2xl font-medium text-center rounded text-brand-green hover:bg-green-800">
              Go to minting page
            </a>
          </Link>
          <div className="flex flex-col md:flex-row md:space-x-16 space-y-10 items-center mt-20 w-full">
            <p>aaaaaaaaaaaaaaaaaaaaa</p>

            <div className="flex flex-col justify-center font-LuckiestGuy text-gray-800 px-4 md:px-0 py-10 mt-10">
              <h2 className="font-bold text-2xl md:text-4xl uppercase">
                About tiny bears.
              </h2>
              <p className="mt-6 text-lg md:text-2xl">
                {`tiny bears are cute.`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
