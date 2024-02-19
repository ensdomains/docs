/* eslint-disable unicorn/no-nested-ternary */
'use client';

import clsx from 'clsx';
import { useState } from 'react';
import { FiCheck, FiLoader, FiX } from 'react-icons/fi';
import { mainnet, sepolia } from 'viem/chains';
import { useAccount, useReadContract } from 'wagmi';

import { ALink } from '@/content/prose/link/ALink';

import { EthCall } from '../call/EthCall';

const REVERSE_REGISTRAR_ADDRESS = {
    [mainnet.id]: '0xa58E81fe9b61B5c3fE2AFD33CF304c454AbFc7Cb',
    [sepolia.id]: '',
};

export const ReverseSetNameForDemo = () => {
    const { address: account, isConnected, chainId } = useAccount();

    const [contractAddress, setContractAddress] = useState('');
    const [name, setName] = useState('');
    const [resolver, setResolver] = useState(
        '0x231b0Ee14048e9dCcD1d247744d114a4EB5E8E63'
    );
    const addr = contractAddress;
    const owner = account;

    const {
        data: ownsContractData,
        error: ownsContractError,
        isLoading: ownsContractLoading,
    } = useReadContract({
        abi: [
            {
                inputs: [],
                name: 'owner',
                outputs: [
                    { internalType: 'address', name: '', type: 'address' },
                ],
                stateMutability: 'view',
                type: 'function',
                constant: true,
            },
        ] as const,
        address: contractAddress as any,
        functionName: 'owner',
        args: [],
    });

    const ownsContract = ownsContractData === owner;
    const supportsOwnable = ownsContractData !== undefined;

    return (
        <div className="space-y-4 p-4">
            <div className="space-y-4">
                <div>
                    <label htmlFor={'address'} className="label">
                        Contract Address:
                    </label>
                    <input
                        type="text"
                        id="address"
                        placeholder="0x225...c3B5"
                        className="input"
                        value={contractAddress}
                        onChange={(event) => {
                            setContractAddress(event.target.value);
                        }}
                    />
                </div>
                <div>
                    <label htmlFor={'address'} className="label">
                        Name (including ".eth", ".com", etc):
                    </label>
                    <input
                        type="text"
                        id="name"
                        placeholder="luc.eth"
                        className="input"
                        value={name}
                        onChange={(event) => {
                            setName(event.target.value);
                        }}
                    />
                </div>
                <div>
                    <label htmlFor="resolver" className="label">
                        Owner (you)
                    </label>
                    <input
                        type="text"
                        id="owner"
                        placeholder="0x225...c3B5"
                        className="input"
                        value={account}
                        onChange={(event) => {
                            event.preventDefault();
                        }}
                        disabled
                    />
                </div>
                <div>
                    <label htmlFor="resolver" className="label">
                        Resolver (default)
                    </label>
                    <input
                        type="text"
                        id="resolver"
                        placeholder="0x225...c3B5"
                        className="input"
                        value={resolver}
                        onChange={(event) => {
                            setResolver(event.target.value);
                        }}
                    />
                </div>
            </div>
            <div className="card1 flex flex-col items-center gap-y-2 p-4">
                <div
                    className={clsx(
                        'card1 w-full px-4 py-2',
                        supportsOwnable ? 'card-green' : ''
                    )}
                >
                    <div className="flex w-full items-center gap-2">
                        {ownsContractLoading ? (
                            <FiLoader className="animate-spin" />
                        ) : supportsOwnable ? (
                            <FiCheck />
                        ) : (
                            <FiX />
                        )}
                        <span>
                            Supports{' '}
                            <ALink
                                hideExtras={false}
                                target="_blank"
                                href="https://docs.openzeppelin.com/contracts/5.x/api/access#Ownable"
                            >
                                Ownable
                            </ALink>
                        </span>
                    </div>
                </div>
                <div
                    className={clsx(
                        'card1 w-full px-4 py-2',
                        ownsContract ? 'card-green' : '',
                        ownsContractData && !ownsContract ? 'card-red' : ''
                    )}
                >
                    <div className="flex w-full items-center gap-2">
                        {ownsContractLoading ? (
                            <FiLoader className="animate-spin" />
                        ) : ownsContract ? (
                            <FiCheck />
                        ) : (
                            <FiX />
                        )}
                        <div>
                            <div>User is owner of contract</div>
                            {ownsContractData && !ownsContract && (
                                <span>
                                    Owner is{' '}
                                    <span className="font-bold">
                                        {ownsContractData}
                                    </span>
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <EthCall
                type="transaction"
                gas={undefined}
                description="Set Reverse Name."
                call={
                    <div className="">
                        <span className="text-ens-light-blue-primary">
                            ReverseRegistrar
                        </span>
                        <span>.setNameForAddr(</span>
                        <span className="">
                            <span>
                                <span className="text-ens-light-pink-primary">
                                    {addr || '<Address>'}
                                </span>
                                ,{' '}
                            </span>
                            <span>
                                <span className="text-ens-light-orange-primary">
                                    {owner || '<Owner>'}
                                </span>
                                ,{' '}
                            </span>
                            <span>
                                <span className="text-ens-light-indigo-primary">
                                    {resolver || '<Resolver>'}
                                </span>
                                ,{' '}
                            </span>
                            <span>
                                <span className="text-ens-light-green-primary">
                                    {name || '<Name>'}
                                </span>
                            </span>
                        </span>
                        <span className="h-full self-end">)</span>
                    </div>
                }
            >
                {/* <div className="flex w-full items-center justify-end gap-4">
                        <div>{gas?.toString()} gas</div>
                        <div>{rentPriceFormatted} eth</div>
                        <Button
                            onClick={() => {
                                writeContract(config);
                            }}
                            variant="primary"
                        >
                            Renew
                        </Button>
                    </div>
                    {!isReady && (
                        <div className="border-ens-light-red-primary bg-ens-light-red-surface text-ens-light-red-primary dark:border-ens-dark-red-primary dark:bg-ens-dark-red-surface flex items-center gap-1 rounded-lg px-3 py-2">
                            <FiX />
                            Not Ready
                        </div>
                    )}
                    {isError && (
                        <div className="border-ens-light-red-primary bg-ens-light-red-surface text-ens-light-red-primary dark:border-ens-dark-red-primary dark:bg-ens-dark-red-surface flex items-center gap-1 rounded-lg px-3 py-2">
                            <FiX />
                            Problem
                        </div>
                    )} */}
            </EthCall>
        </div>
    );
};
