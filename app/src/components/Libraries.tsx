import Link from 'next/link';
import { ReactNode } from 'react';
import { FaJava, FaReact, FaRust } from 'react-icons/fa';
import { SiDelphi, SiKotlin, SiNuget, SiPython } from 'react-icons/si';
import { TbBrandGolang, TbBrandJavascript } from 'react-icons/tb';

type Language = {
    name: string;
    logo: ReactNode | string;
    libraries: Library[];
};

type Library = {
    name: string;
    description: string;
    href: string;
    logo?: string;
    official?: boolean;
};

export const ensLibraries: Language[] = [
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
                logo: '/icons/legacy/logos/ethers.svg',
            },
            {
                href: 'https://github.com/ensdomains/ensjs',
                name: 'ENSjs',
                description: '',
                logo: '/icons/legacy/logos/ensjs.svg',
                official: true,
            },
            {
                href: 'https://web3js.readthedocs.io/',
                name: 'Web3.js',
                description: '',
                logo: '/icons/legacy/logos/web3js.svg',
            },
            {
                href: 'https://portal.thirdweb.com/typescript/v5',
                name: 'Thirdweb',
                description: '',
                logo: '/icons/libraries/thirdweb.svg',
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
                logo: '/icons/legacy/logos/nuget.svg',
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
                logo: '/icons/legacy/logos/kethereum.png',
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
                logo: '/icons/legacy/logos/web3j.png',
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
                logo: '/icons/legacy/logos/go.svg',
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
];

export function Libraries() {
    return (
        <div className="mt-4">
            <div className="not-prose grid gap-x-4 sm:grid-cols-2 xl:grid-cols-3">
                {ensLibraries.map((language) => (
                    <div
                        className="h-fit space-y-1"
                        style={{
                            gridRow:
                                'span ' +
                                Math.round(language.libraries.length * 2) +
                                1,
                        }}
                    >
                        <div>
                            <div className="text-base font-bold">
                                {language.name}
                            </div>
                        </div>
                        <div className="space-y-2 pb-2">
                            {language.libraries.map((library) => (
                                <Link
                                    href={library.href}
                                    className="card1 block rounded-xl p-3"
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
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
