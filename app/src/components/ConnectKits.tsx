import { ReactNode } from 'react';
import { FaReact, FaSwift } from 'react-icons/fa';
import { SiRemix } from 'react-icons/si';
import {
    TbBrandAndroid,
    TbBrandFlutter,
    TbBrandJavascript,
    TbBrandNextjs,
    TbBrandVite,
    TbBrandVue,
} from 'react-icons/tb';

import { cx } from '@/lib/cx';

import { Button } from './Button';

type Template = {
    name: string;
    url: string;
    icon?: ReactNode;
};

type Kit = {
    name: string;
    creator: string;
    creator_url: string;
    logo: string;
    url: string;
    demo?: string;
    templates?: Template[];
};

export const kits: Kit[] = [
    {
        name: 'ConnectKit',
        creator: 'Family',
        creator_url: 'https://family.co',
        logo: '/icons/legacy/logos/connectkit.png',
        url: 'https://docs.family.co/connectkit/try-it-out',
        demo: 'https://docs.family.co/connectkit/try-it-out',
        templates: [
            {
                name: 'Create React App',
                url: 'https://github.com/family/connectkit/tree/main/examples/cra',
                icon: <FaReact />,
            },
            {
                name: 'Vite + React',
                url: 'https://github.com/family/connectkit/tree/main/examples/vite',
                icon: <TbBrandVite />,
            },
            {
                name: 'Next.js',
                url: 'https://github.com/family/connectkit/tree/main/examples/nextjs',
                icon: <TbBrandNextjs />,
            },
            {
                name: 'Next.js + Siwe',
                url: 'https://github.com/family/connectkit/tree/main/examples/nextjs-siwe',
                icon: <TbBrandNextjs />,
            },
        ],
    },
    {
        name: 'Rainbowkit',
        creator: 'Rainbow',
        creator_url: 'https://rainbow.me',
        logo: '/icons/legacy/logos/rainbow.svg',
        url: 'https://www.rainbowkit.com/docs/introduction',
        demo: 'https://rainbowkit-demo.vercel.app/',
        templates: [
            {
                name: 'Create React App',
                url: 'https://codesandbox.io/p/sandbox/github/rainbow-me/rainbowkit/tree/main/examples/with-create-react-app',
                icon: <FaReact />,
            },
            {
                name: 'Vite + React',
                url: 'https://codesandbox.io/p/sandbox/github/rainbow-me/rainbowkit/tree/main/examples/with-vite',
                icon: <TbBrandVite />,
            },
            {
                name: 'Next.js',
                url: 'https://codesandbox.io/p/sandbox/github/rainbow-me/rainbowkit/tree/main/examples/with-next',
                icon: <TbBrandNextjs />,
            },
            {
                name: 'Next.js App Router',
                url: 'https://codesandbox.io/p/sandbox/github/rainbow-me/rainbowkit/tree/main/examples/with-next-app',
                icon: <TbBrandNextjs />,
            },
            {
                name: 'Remix',
                url: 'https://codesandbox.io/p/sandbox/github/rainbow-me/rainbowkit/tree/main/examples/with-remix',
                icon: <SiRemix />,
            },
        ],
    },
    {
        name: 'Web3Modalv2',
        creator: 'WalletConnect',
        creator_url: 'https://walletconnect.org',
        logo: '/icons/legacy/logos/walletconnect.svg',
        url: 'https://docs.walletconnect.com/2.0/web3modal/about',
        demo: 'https://lab.web3modal.com/',
        templates: [
            {
                name: 'React',
                url: 'https://docs.walletconnect.com/web3modal/react/about',
                icon: <FaReact />,
            },
            {
                name: 'Vue',
                url: 'https://docs.walletconnect.com/web3modal/vue/about',
                icon: <TbBrandVue />,
            },
            {
                name: 'Javascript',
                url: 'https://docs.walletconnect.com/web3modal/javascript/about',
                icon: <TbBrandJavascript />,
            },
            {
                name: 'Flutter',
                url: 'https://docs.walletconnect.com/web3modal/flutter/about',
                icon: <TbBrandFlutter />,
            },
            {
                name: 'Android',
                url: 'https://docs.walletconnect.com/web3modal/android/about',
                icon: <TbBrandAndroid />,
            },
            {
                name: 'iOS',
                url: 'https://docs.walletconnect.com/web3modal/ios/about',
                icon: <FaSwift />,
            },
        ],
    },
];

export const ConnectKits = () => {
    return (
        <div className="">
            <div className="not-prose xl:max-w-none">
                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                    {kits.map((library) => (
                        <div
                            key={library.name}
                            className="not-prose card1 !m-0 flex w-full min-w-[12rem] flex-col items-stretch justify-center gap-4 p-4"
                        >
                            <div className="flex items-center justify-between gap-2">
                                <div className="flex items-center gap-2">
                                    <div className="flex aspect-square w-10 items-center">
                                        <img
                                            src={library.logo}
                                            className={cx(
                                                'w-10',
                                                library.name.toLowerCase() ==
                                                    'rainbowkit'
                                                    ? 'rounded-xl'
                                                    : ''
                                            )}
                                            alt={library.name}
                                        />
                                    </div>
                                    <div className="block text-left">
                                        <div className="font-bold leading-4">
                                            {library.name}
                                        </div>
                                        <span className="block text-xs leading-3 text-zinc-500">
                                            by{' '}
                                            <a
                                                href={library.creator_url}
                                                className="text-zinc-700 dark:text-zinc-100"
                                                target="_blank"
                                            >
                                                {library.creator}
                                            </a>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="grow text-left text-sm">
                                <ul>
                                    {library.templates?.map((template) => (
                                        <li className="px-2">
                                            <a
                                                href={template.url}
                                                target="_blank"
                                                className="inline-flex items-center gap-1 text-blue-500 hover:underline"
                                            >
                                                {template.icon && (
                                                    <span className="h-fit">
                                                        {template.icon}
                                                    </span>
                                                )}
                                                {template.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <div>
                                    {library.demo && (
                                        <Button
                                            variant="primary"
                                            href={library.demo}
                                            className="w-full"
                                            target="_blank"
                                        >
                                            Try it!
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
