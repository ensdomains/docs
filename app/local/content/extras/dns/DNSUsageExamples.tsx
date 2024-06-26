import { FiChevronRight } from 'react-icons/fi';

import { LinkCard } from '../linkcard/LinkCard';

export const DNSUsageExamples = () => {
    return (
        <div
            className="grid w-full grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4"
            style={{ gridAutoRows: '1fr' }}
        >
            {[
                [
                    'Lens',
                    'The Social Layer for Web3',
                    '.lens.xyz',
                    'https://www.lens.xyz/',
                    '/content/learn/dnssec/lens-logo.svg',
                    'rgb(255, 235, 184)',
                    'rgb(39, 46, 41)',
                ],
                [
                    'Coinbase Wallet',
                    'Self-custody crypto wallet built by Coinbase',
                    '.cb.id',
                    'https://cb.id/',
                    '/content/learn/dnssec/coinbase-wallet-logo.svg',
                    'rgb(20, 21, 25)',
                    'rgb(88, 138, 245)',
                ],
                [
                    'Argent',
                    'zk-sync & starknet powered smart-contract wallet',
                    '.argent.xyz',
                    'https://www.argent.xyz/',
                    '/content/learn/dnssec/argent-logo.svg',
                    '#000',
                    '#FF875B',
                ],
            ].map(
                (
                    [title, description, domain, link, logo, bgColor, fgColor],
                    index
                ) => (
                    <LinkCard
                        key={index}
                        title={title}
                        description={description}
                        domain={domain}
                        link={link}
                        logo={logo}
                        bgColor={bgColor}
                        fgColor={fgColor}
                    />
                )
            )}
            <div className="flex h-auto w-full grow flex-col rounded-md border p-4 text-inherit">
                <div className="leading-5">
                    <span>And many more...</span>
                    <span>
                        See{' '}
                        <a
                            href="https://ens.domains/"
                            target="_blank"
                            className="underline"
                        >
                            our integrations
                        </a>
                    </span>
                </div>
                <a
                    href="https://ens.domains/"
                    target="_blank"
                    className="flex grow items-end justify-end text-right"
                >
                    <div className="flex items-center">
                        <span>read more</span> <FiChevronRight />
                    </div>
                </a>
            </div>
        </div>
    );
};
