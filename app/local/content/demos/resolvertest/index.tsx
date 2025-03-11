'use client';

import { useState } from 'react';
import { encodeAbiParameters, labelhash } from 'viem';
import { namehash, normalize } from 'viem/ens';
import { useAccount, useChainId, useConnect, useReadContract } from 'wagmi';

import { ClientOnly } from '@/ClientOnly';
import { Button } from '@/components/Button';

const RESOLVER_REGEX = /^0x[\dA-Fa-f]{40}$/;
const NAME_REGEX = /^[\w-]+$/;
const ALLOWED_METHODS = ['addr', 'text', 'contenthash', 'ttl'];

// 0x9061b923000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000009036c7563036574680000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000044f1cb7e06e1e7bcf2ca33c28a806ee265cfedf02fedf1b124ca73b2203ca80cc7c91a02ad000000000000000000000000000000000000000000000000000000000000003c00000000000000000000000000000000000000000000000000000000

const Demo = () => {
    const [resolver, setResolver] = useState(
        '0xdCcB68ac05BB2Ee83F0873DCd0BF5F57E2968344'
    );
    const [name, setName] = useState('luc.willbreak.eth');

    const [method, setMethod] = useState('addr');
    const chainId = useChainId();

    const { connect } = useConnect();

    const { isConnected } = useAccount();

    const a1 = labelhash(normalize(name));
    const a2 =
        '0x3b3b57de' +
        encodeAbiParameters(
            [{ name: 'name', type: 'bytes32' }],
            [namehash(normalize(name))]
        ).replace('0x', '');

    console.log({ a1, a2 });

    const { data, refetch } = useReadContract({
        chainId,
        address: resolver as `0x${string}`,
        abi: [
            {
                type: 'function',
                inputs: [
                    {
                        name: 'name',
                        type: 'bytes',
                    },
                    {
                        name: 'data',
                        type: 'bytes',
                    },
                ],
                name: 'resolve',
                outputs: [{ name: 'result', type: 'bytes' }],
                stateMutability: 'view',
            },
        ],
        functionName: 'resolve',
        args: [a1, a2 as any],
    });

    if (!isConnected) {
        return (
            <div className="flex items-center justify-center">
                <Button
                    variant="primary"
                    onClick={() => {
                        // @ts-ignore
                        connect();
                    }}
                >
                    Connect Wallet
                </Button>
            </div>
        );
    }

    return (
        <div className="bg-ens-light-background-secondary">
            {data && JSON.stringify(data)}
            <div className="flex flex-col">
                <div className="">{chainId}</div>
                <input
                    value={resolver}
                    onChange={(event) => setResolver(event.target.value)}
                />
                <input
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />
            </div>
            <div>
                <Button
                    onClick={() => {
                        refetch();
                    }}
                    variant="primary"
                >
                    Call
                </Button>
            </div>
        </div>
    );
};

export const ResolverTestDemo = () => {
    return (
        <ClientOnly
            child={() => (
                <div className="px-3">
                    {/* <Demo /> */}
                    This demo is in under construction
                </div>
            )}
        />
    );
};
