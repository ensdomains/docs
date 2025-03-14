import { ReactNode } from 'react'
import { FaJava, FaReact, FaRust } from 'react-icons/fa'
import { SiDelphi, SiKotlin, SiNuget, SiPython } from 'react-icons/si'
import { TbBrandGolang, TbBrandJavascript } from 'react-icons/tb'

type Language = {
  name: string
  logo: ReactNode | string
  libraries: Library[]
}

type Library = {
  name: string
  description: string
  href: string
  logo?: string
  official?: boolean
}

const ensLibraries: Language[] = [
  {
    name: 'React',
    logo: <FaReact />,
    libraries: [
      {
        href: 'https://wagmi.sh/',
        name: 'Wagmi',
        description: '',
        logo: undefined,
      },
    ],
  },
  {
    name: 'JavaScript',
    logo: <TbBrandJavascript />,
    libraries: [
      {
        href: 'https://viem.sh/',
        name: 'Viem',
        description: '',
        logo: undefined,
      },
      {
        href: 'https://docs.ethers.org/',
        name: 'Ethers',
        description: '',
        logo: '/img/libraries/ethers.svg',
      },
      {
        href: 'https://github.com/ensdomains/ensjs',
        name: 'ENSjs',
        description: '',
        logo: '/img/libraries/ensjs.svg',
        official: true,
      },
      {
        href: 'https://web3js.readthedocs.io/',
        name: 'Web3.js',
        description: '',
        logo: '/img/libraries/web3js.svg',
      },
      {
        href: 'https://portal.thirdweb.com/typescript/v5',
        name: 'Thirdweb',
        description: '',
        logo: '/img/libraries/thirdweb.svg',
      },
    ],
  },
  {
    name: 'Rust',
    logo: <FaRust />,
    libraries: [
      {
        href: 'https://ethers.rs/',
        name: 'Ethers.rs',
        description: '',
        logo: undefined,
      },
      {
        href: 'https://github.com/alloy-rs/',
        name: 'Alloy',
        description: '',
        logo: undefined,
      },
    ],
  },
  {
    name: 'Python',
    logo: <SiPython />,
    libraries: [
      {
        href: 'https://github.com/ethereum/web3.py',
        name: 'web3.py',
        description:
          'A python interface for interacting with the Ethereum blockchain and ecosystem.',
        logo: undefined,
      },
    ],
  },
  {
    name: 'NuGet',
    logo: <SiNuget />,
    libraries: [
      {
        href: 'https://github.com/Nethereum/Nethereum/',
        name: 'Nethereum',
        description: '',
        logo: '/img/libraries/nuget.svg',
      },
    ],
  },
  {
    name: 'Kotlin',
    logo: <SiKotlin />,
    libraries: [
      {
        href: 'https://github.com/komputing/KEthereum',
        name: 'KEthereum',
        description: '',
        logo: '/img/libraries/kethereum.png',
      },
    ],
  },
  {
    name: 'Java',
    logo: <FaJava />,
    libraries: [
      {
        href: 'https://docs.web3j.io/',
        name: 'web3j',
        description: '',
        logo: '/img/libraries/web3j.png',
      },
    ],
  },
  {
    name: 'Go',
    logo: <TbBrandGolang />,
    libraries: [
      {
        href: 'https://github.com/wealdtech/go-ens',
        name: 'go-ens',
        description: '',
        logo: '/img/libraries/go.svg',
      },
      {
        href: 'https://github.com/wealdtech/ethereal',
        name: 'ethereal',
        description: '',
        logo: undefined, // -
      },
    ],
  },
  {
    name: 'Delphi',
    logo: <SiDelphi />,
    libraries: [
      {
        href: 'https://github.com/svanas/delphereum',
        name: 'delphereum',
        description: '',
        logo: undefined, // -
      },
    ],
  },
]

// TODO: Make this a masonry grid
export function Libraries() {
  return (
    <div className="grid gap-x-4 gap-y-6 sm:grid-cols-2 xl:grid-cols-3">
      {ensLibraries.map((language) => (
        <div key={language.name} className="h-fit">
          <span className="mb-1 block text-base font-bold">
            {language.name}
          </span>
          <div className="flex flex-col gap-2">
            {language.libraries.map((library) => (
              <a
                href={library.href}
                className="border-grey-light block rounded-lg border p-2"
                target="_blank"
                key={library.name}
              >
                <div className="flex items-center gap-2 px-2 text-lg">
                  {library.logo ? (
                    <div className="flex size-5 items-center justify-center">
                      <img
                        src={library.logo}
                        alt={library.name}
                        className="size-5 object-contain"
                      />
                    </div>
                  ) : (
                    language.logo
                  )}
                  {library.name}
                </div>
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
