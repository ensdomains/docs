/* eslint-disable unicorn/no-nested-ternary */
import { FC } from 'react';
import { holesky, mainnet, sepolia } from 'viem/chains';
import { useChainId, useSwitchChain } from 'wagmi';

export const ChainSwitcher: FC<{ available?: Set<number> }> = ({
    available = new Set([5]),
}) => {
    const { chains, error, switchChainAsync } = useSwitchChain();
    const chainId = useChainId();
    // const { isConnected, address, connector } = useAccount();
    // const { connect, connectors } = useConnect();
    // const { disconnectAsync } = useDisconnect();

    const illegalChain = chainId && !available.has(chainId);

    return (
        <div className="flex items-center gap-x-2">
            {illegalChain && (
                <div>
                    <div className="text-red-500">Chain not available</div>
                </div>
            )}
            <select
                value={chainId}
                onChange={(event) => {
                    switchChainAsync({
                        chainId: Number.parseInt(event.target.value, 10) as any,
                    }).catch((error) => {
                        // TODO: trigger toast "failed to switch to chain, see wallet for details"
                        console.error(error);
                    });
                }}
                className="chainselector h-full rounded-xl border-ens-light-border bg-ens-light-background-primary px-2 dark:border-ens-dark-border dark:bg-ens-dark-background-primary"
            >
                {(
                    [
                        [mainnet.id, 'Mainnet'],
                        [sepolia.id, 'Sepolia'],
                        [holesky.id, 'Holesky'],
                    ] as [number, string][]
                ).map(([id, name]) => {
                    const is_active = id === chainId;
                    const is_available = available.has(id);

                    return (
                        <option
                            key={id}
                            disabled={!is_available}
                            value={id}
                            // onClick={async () => {
                            //     if (is_available) {
                            //         switchChain({ chainId: id as any });
                            //     }
                            // }}
                        >
                            <span>
                                {is_available ? (is_active ? '✓' : '○') : '-'}
                            </span>
                            <span className={is_available ? '' : 'italic'}>
                                {name}
                            </span>
                        </option>
                    );
                })}
            </select>
        </div>
    );
};
