'use client';

import { FC, useLayoutEffect, useRef, useState } from 'react';
import { FaWallet } from 'react-icons/fa6';
import { useAccount } from 'wagmi';

import { Button } from '@/components/Button';

import { ChainSwitcher } from './ChainSwitcher';

export const BorderConnection: FC<{ chains?: Set<number> }> = ({ chains }) => {
    const { isConnected, address, connector } = useAccount();
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
                    <div>
                        <div className="text-sm text-gray-400">
                            {connector.name}
                        </div>
                        <div className="text-sm font-bold">{address}</div>
                    </div>
                    <ChainSwitcher available={chains} />
                    <Button
                        onClick={() => setIsOpen(true)}
                        className="items-center justify-center"
                    >
                        <div className="flex h-[1.4em] items-center justify-center">
                            <FaWallet />
                        </div>
                    </Button>
                </div>
            )}
        </div>
    );
};
