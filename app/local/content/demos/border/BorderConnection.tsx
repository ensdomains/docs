'use client';

import { formatAddress } from 'ens-tools';
import { FC, useLayoutEffect, useRef, useState } from 'react';
import { FaWallet } from 'react-icons/fa6';
import { useAccount, useEnsAvatar, useEnsName } from 'wagmi';

import { Button } from '@/components/Button';

import { ChainSwitcher } from './ChainSwitcher';

export const BorderConnection: FC<{ chains?: Set<number> }> = ({ chains }) => {
    const { isConnected, address, connector } = useAccount();
    const { data: name } = useEnsName({ address });
    const { data: avatar } = useEnsAvatar({ name });
    const [isOpen, setIsOpen] = useState(false);
    const connectModalReference = useRef(null);

    useLayoutEffect(() => {
        connectModalReference?.current?.addEventListener('onClose', () => {
            setIsOpen(false);
        });
    }, [connectModalReference]);

    return (
        <div>
            {/* <ConnectModal isOpen={isOpen} onClose={() => setIsOpen(false)} /> */}
            {!isConnected && (
                <Button onClick={() => setIsOpen(true)}>Connect Wallet</Button>
            )}
            {/* @ts-ignore */}
            <thorin-connect-modal
                open={isOpen ? true : undefined}
                ref={connectModalReference}
            >
                {/* @ts-ignore */}
            </thorin-connect-modal>

            {isConnected && (
                <div className="flex items-stretch gap-2">
                    <ChainSwitcher available={chains} />
                    <Button
                        onClick={() => setIsOpen(true)}
                        className="flex items-center justify-center !px-4"
                    >
                        <div className="flex items-center gap-2">
                            <div className="flex h-[1.4em] items-center justify-center">
                                {avatar ? (
                                    <img
                                        src={`https://enstate.rs/i/${name}`}
                                        className="size-8 rounded-full"
                                        alt={name}
                                    />
                                ) : (
                                    <FaWallet />
                                )}
                            </div>
                            <div>{name || formatAddress(address)}</div>
                        </div>
                    </Button>
                </div>
            )}
        </div>
    );
};
