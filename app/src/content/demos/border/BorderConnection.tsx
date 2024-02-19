'use client';

import { FC, useState } from 'react';
import { FaWallet } from 'react-icons/fa6';
import { useAccount } from 'wagmi';

import { Button } from '@/components/Button';
import { ConnectModal } from '@/wallet/ConnectModal';

import { ChainSwitcher } from './ChainSwitcher';

export const BorderConnection: FC<{ chains?: Set<number> }> = ({ chains }) => {
    const { isConnected } = useAccount();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <ConnectModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
            {!isConnected && (
                <Button onClick={() => setIsOpen(true)}>Connect Wallet</Button>
            )}
            {isConnected && (
                <div className="flex items-stretch gap-2">
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
