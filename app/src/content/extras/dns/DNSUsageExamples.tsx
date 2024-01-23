import { FiChevronRight } from 'react-icons/fi';

export const DNSUsageExamples = () => {
    return (
        <div
            className="not-prose grid w-full grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4"
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
                    <a
                        href={link}
                        key={index}
                        className="card !m-0 flex w-full flex-col p-2 px-4 pb-4 hover:outline focus:outline focus:outline-4"
                        style={{
                            borderColor: bgColor,
                            outlineColor: fgColor,
                            background: `${bgColor}`,
                            color: fgColor,
                        }}
                        target="_blank"
                        rel="nofollow"
                    >
                        <div className="mb-2 flex justify-between">
                            <div className="flex aspect-square w-8 items-center">
                                <img
                                    src={logo}
                                    alt={title}
                                    className="w-full"
                                />
                            </div>
                            <div
                                className="my-auto h-fit w-fit px-2 text-xs"
                                style={{ background: fgColor, color: bgColor }}
                            >
                                {domain}
                            </div>
                        </div>
                        <div className="font-bold">{title}</div>
                        <div className="leading-5">{description}</div>
                        <div className="flex grow items-end justify-end text-right">
                            <div className="flex items-center">
                                read more <FiChevronRight />
                            </div>
                        </div>
                    </a>
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
