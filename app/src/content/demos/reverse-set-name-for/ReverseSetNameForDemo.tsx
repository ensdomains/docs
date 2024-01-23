'use client';

import { useState } from 'react';
import { FiCheck } from 'react-icons/fi';
import { useAccount } from 'wagmi';

import { Button } from '@/components/Button';

import { ChainField } from '../ethregistry/inputs/ChainField';

export const ReverseSetNameForDemo = () => {
    const { address: account, isConnected } = useAccount();

    const [contractAddress, setContractAddress] = useState('');
    const [name, setName] = useState('');
    const [resolver, setResolver] = useState(
        '0x231b0Ee14048e9dCcD1d247744d114a4EB5E8E63'
    );
    const ownableOwner = undefined;

    return (
        <div className="space-y-4">
            <ChainField available={new Set([5, 1])} />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-4">
                    <input
                        type="text"
                        id="address"
                        placeholder="Contract Address"
                        className="input"
                        value={name}
                        onChange={(event) => {
                            setName(event.target.value);
                        }}
                    />
                    <input
                        type="text"
                        id="name"
                        placeholder="Name"
                        className="input"
                        value={contractAddress}
                        onChange={(event) => {
                            setContractAddress(event.target.value);
                        }}
                    />
                    <div>
                        <label htmlFor="resolver">Owner (you)</label>
                        {isConnected ? (
                            <input
                                type="text"
                                id="owner"
                                placeholder="Owner"
                                className="input"
                                value={account}
                                onChange={(event) => {
                                    event.preventDefault();
                                }}
                                disabled
                            />
                        ) : (
                            <Button
                                onClick={() => {
                                    alert('Unimplemented');
                                }}
                                className="block w-full"
                            >
                                Connect
                            </Button>
                        )}
                    </div>
                    <div>
                        <label htmlFor="resolver">Resolver (default)</label>
                        <input
                            type="text"
                            id="resolver"
                            placeholder="Resolver"
                            className="input"
                            value={resolver}
                            onChange={(event) => {
                                setResolver(event.target.value);
                            }}
                        />
                    </div>
                    <Button
                        variant="primary"
                        onClick={() => {
                            console.log('Set Name');
                        }}
                        className="w-full"
                    >
                        Set Name
                    </Button>
                </div>
                <div className="">
                    <ul>
                        <li>Contract Exists</li>
                        <li>Supports Ownable</li>
                        <li className="flex items-center gap-1">
                            <span>Is Owner?</span>
                            {ownableOwner == account ? (
                                <span>
                                    <FiCheck />
                                </span>
                            ) : (
                                <span className="text-ens-red">
                                    {ownableOwner}
                                </span>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
