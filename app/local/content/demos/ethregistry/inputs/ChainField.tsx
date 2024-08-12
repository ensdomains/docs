/* eslint-disable unicorn/no-nested-ternary */
import { FC } from 'react';
import { holesky, mainnet, sepolia } from 'viem/chains';
import {
    useAccount,
    useChainId,
    useConnect,
    useDisconnect,
    useSwitchChain,
} from 'wagmi';

import { Button } from '@/components/Button';

export const ChainField: FC<{ available?: Set<number> }> = ({
    available = new Set([5]),
}) => {
    const { chains, error, switchChain } = useSwitchChain();
    const chainId = useChainId();
    const { isConnected, address, connector } = useAccount();
    const { connect, connectors } = useConnect();
    const { disconnectAsync } = useDisconnect();

    return (
        <div className="">
            <span>Chain (currently {chainId})</span>
            <div className="flex gap-4">
                {(
                    [
                        [mainnet.id, 'Mainnet'],
                        [sepolia.id, 'Sepolia'],
                        [holesky.id, 'Holesky'],
                    ] as [number, string][]
                ).map(([id, name]) => {
                    const is_active = id === chainId;
                    const is_available = available.has(id);
                    const variant = is_active
                        ? 'primary'
                        : is_available
                        ? 'secondary'
                        : 'disabled';

                    return (
                        <Button
                            key={id}
                            variant={variant}
                            onClick={async () => {
                                if (is_available) {
                                    if (isConnected) {
                                        switchChain({ chainId: id as any });
                                    } else {
                                        console.log({ connectors });
                                        connect({ connector: connectors[0] });
                                    }
                                }
                            }}
                        >
                            <span>{name}</span>
                        </Button>
                    );
                })}
            </div>
        </div>
    );
};
