import { formatAddress } from '@ens-tools/format';
import { FC, Fragment } from 'react';

const multicoinIcons = {
    btc: '/icons/multicoin/bitcoin.svg',
    eth: '/icons/multicoin/ethereum.svg',
} as const;

export const Chains: FC<{ chains?: Record<string, string> }> = ({ chains }) => {
    if (!chains) return <></>;

    if (Object.keys(chains).length === 0) return <></>;

    return (
        <div
            className="grid w-full gap-x-3"
            style={{ gridTemplateColumns: 'auto 1fr' }}
        >
            {Object.keys(chains)
                .sort((a, b) => b.length - a.length)
                .map((chain) => (
                    <Fragment key={chain}>
                        <div>
                            {multicoinIcons[chain] ? (
                                <div className="flex items-center gap-0.5">
                                    <div className="flex size-4 items-center justify-center">
                                        <img
                                            src={multicoinIcons[chain]}
                                            alt={chain}
                                            className="aspect-square w-full rounded-full"
                                        />
                                    </div>
                                    <div className="font-bold leading-none">
                                        {chain}
                                    </div>
                                </div>
                            ) : (
                                <div className="font-bold leading-none">
                                    {chain}
                                </div>
                            )}
                        </div>
                        <div className="truncate leading-none">
                            {chain == 'eth'
                                ? formatAddress(chains[chain])
                                : chains[chain]}
                        </div>
                    </Fragment>
                ))}
        </div>
    );
};
