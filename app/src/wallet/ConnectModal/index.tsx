'use client';

import { motion } from 'framer-motion';
import { FC } from 'react';
import { FiChevronLeft, FiLogOut, FiX } from 'react-icons/fi';
import { useAccount, useConnect, useConnectors, useDisconnect } from 'wagmi';

import { Button } from '@/components/Button';

import { ConnectModalInner } from './modal';
import { ProfileInfo } from './ProfileInfo';

export const ConnectModal: FC<{ isOpen: boolean; onClose: () => void }> = ({
    isOpen,
    onClose,
}) => {
    const connectors = useConnectors({});
    const { status, address, connector: activeConnector } = useAccount();
    const { disconnect } = useDisconnect();
    const { connect } = useConnect();

    return (
        <ConnectModalInner isOpen={isOpen} onClose={onClose}>
            <motion.div className="card1 w-full space-y-2 p-4" animate>
                {status === 'connecting' && (
                    <>
                        <div className="flex items-start justify-between">
                            <div className="font-bold">Connecting</div>
                            <button
                                className="hover:border-ens-light-border dark:hover:border-ens-dark-border rounded-full border border-transparent p-1"
                                onClick={onClose}
                            >
                                <FiX />
                            </button>
                        </div>
                        <div className="space-y-2">
                            <div className="bg-ens-light-background-secondary dark:bg-ens-dark-background-secondary flex aspect-square w-full flex-col items-center justify-center rounded-xl text-center">
                                <div>Check your Wallet</div>
                                <div>You might need to connect</div>
                            </div>
                            {/* <div className="flex items-center justify-center p-4">
                                <FiLoader />
                            </div> */}
                            {/* <Button onClick={() => {}} variant="transparent">
                                Try another Wallet
                            </Button> */}
                            <button
                                className="text-ens-light-text-secondary dark:text-ens-dark-text-secondary flex w-full items-center justify-center gap-2 text-center text-sm font-bold"
                                onClick={() => {
                                    disconnect({}, {});
                                }}
                            >
                                <FiChevronLeft />
                                <span>Try another wallet</span>
                            </button>
                        </div>
                    </>
                )}
                {status === 'connected' && (
                    <>
                        <div className="flex items-start justify-between">
                            <div className="font-bold">Connected</div>
                            <button
                                className="hover:border-ens-light-border dark:hover:border-ens-dark-border rounded-full border border-transparent p-1"
                                onClick={onClose}
                            >
                                <FiX />
                            </button>
                        </div>
                        <ProfileInfo />
                        <div className="flex items-stretch gap-2">
                            <div className="card1 flex w-full items-center gap-2 p-4">
                                <div className="text-sm">
                                    Connected with{' '}
                                    <span className="inline-flex items-baseline gap-1">
                                        {activeConnector?.icon && (
                                            <div className="size-4 translate-y-1 rounded-full pl-0.5">
                                                <img
                                                    src={activeConnector?.icon}
                                                    alt=""
                                                />
                                            </div>
                                        )}
                                        <span className="font-bold">
                                            {activeConnector?.name}
                                        </span>
                                    </span>
                                </div>
                            </div>

                            <Button
                                variant="red"
                                onClick={() => {
                                    disconnect({}, { onSuccess: onClose });
                                }}
                                className="items-center"
                            >
                                <FiLogOut />
                            </Button>
                        </div>
                        <div className="flex w-full flex-col gap-1">
                            <Button
                                onClick={() => {
                                    onClose();
                                }}
                            >
                                Awesome lets go
                            </Button>
                        </div>
                    </>
                )}
                {status === 'disconnected' && (
                    <>
                        <div className="flex items-start justify-between">
                            <div className="font-bold">Connect Wallet</div>
                            <button
                                className="hover:border-ens-light-border dark:hover:border-ens-dark-border rounded-full border border-transparent p-1"
                                onClick={onClose}
                            >
                                <FiX />
                            </button>
                        </div>{' '}
                        <div className="space-y-2">
                            {connectors.map((connector) => {
                                return (
                                    <Button
                                        variant="primary"
                                        key={connector.id}
                                        onClick={() => {
                                            connect(
                                                { connector },
                                                {
                                                    onSuccess: onClose,
                                                }
                                            );
                                        }}
                                        className="flex w-full items-center space-x-2"
                                    >
                                        <div className="flex items-center">
                                            {connector.icon && (
                                                <img
                                                    src={connector.icon}
                                                    className="aspect-square w-6 rounded-lg"
                                                    alt={connector.name}
                                                />
                                            )}
                                        </div>
                                        <div className="grow text-left">
                                            {connector.name}
                                        </div>
                                    </Button>
                                );
                            })}
                        </div>
                    </>
                )}
            </motion.div>
        </ConnectModalInner>
    );
};
