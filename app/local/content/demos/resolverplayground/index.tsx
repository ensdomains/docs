'use client';

import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { encodeAbiParameters, zeroAddress } from 'viem';
import { namehash, normalize } from 'viem/ens';
import {
    useAccount,
    useCall,
    useChainId,
    useConnect,
    useReadContract,
} from 'wagmi';

import { ClientOnly } from '@/ClientOnly';
import { Button } from '@/components/Button';

import { supportsInterfaceABI } from './supportsInterfaceABI';

const RESOLVER_REGEX = /^0x[\dA-Fa-f]{40}$/;
const NAME_REGEX = /^[\w-]+$/;
const ALLOWED_METHODS = ['addr', 'text', 'contenthash', 'ttl'];

// 0x9061b923000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000009036c7563036574680000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000044f1cb7e06e1e7bcf2ca33c28a806ee265cfedf02fedf1b124ca73b2203ca80cc7c91a02ad000000000000000000000000000000000000000000000000000000000000003c00000000000000000000000000000000000000000000000000000000

const Demo = () => {
    const [resolver, setResolver] = useState(
        '0x231b0Ee14048e9dCcD1d247744d114a4EB5E8E63'
    );
    const [name, setName] = useState('luc.eth');
    const [shouldWildcard, setShouldWildcard] = useState(false);

    const [method, setMethod] = useState('addr');
    const chainId = useChainId();

    const { connect } = useConnect();

    const { isConnected } = useAccount();

    // resolver supports wildcard
    const { data: supportsWildcard, error } = useCall({
        to: resolver,
        account: zeroAddress,
        data:
            '0x01ffc9a7' +
            '9061b92300000000000000000000000000000000000000000000000000000000',
    });

    const { data: supportsWildcard2, error: error2 } = useReadContract({
        chainId,
        abi: supportsInterfaceABI,
        address: resolver as any,
        functionName: 'supportsInterface',
        args: ['0x9061b923'],
    });

    useEffect(() => {
        if (supportsWildcard == undefined) return;

        if (Number(supportsWildcard) == 0) {
            setShouldWildcard(false);
        }
    }, [supportsWildcard]);

    console.log({ supportsWildcard, error });

    const a1 = namehash(normalize('luc.eth'));
    const a2 =
        '0x3b3b57de' +
        encodeAbiParameters(
            [{ name: 'name', type: 'bytes32' }],
            [namehash(normalize(name))]
        ).replace('0x', '');

    console.log({ a1, a2 });

    console.log({ supportsWildcard2 });

    // const { data, refetch } = useCall({
    //     to: resolver,
    //     data: '0x3b3b57de' + a1.replace('0x', ''),
    // });

    // const { data, refetch } = useReadContract({
    //     chainId,
    //     address: resolver as `0x${string}`,
    //     abi: [
    //         {
    //             type: 'function',
    //             inputs: [
    //                 {
    //                     name: 'name',
    //                     type: 'bytes',
    //                 },
    //                 {
    //                     name: 'data',
    //                     type: 'bytes',
    //                 },
    //             ],
    //             name: 'resolve',
    //             outputs: [{ name: 'result', type: 'bytes' }],
    //             stateMutability: 'view',
    //         },
    //     ],
    //     functionName: 'resolve',
    //     args: [a1, a2 as any],
    // });

    return (
        <div className="space-y-2 py-3">
            {/* {data && JSON.stringify(data)} */}
            <div className="space-y-2">
                <div>
                    <div>Resolver</div>
                    <input
                        value={resolver}
                        onChange={(event) => setResolver(event.target.value)}
                        className="input"
                    />
                </div>
                <div className="flex gap-2">
                    {[
                        ['Direct', false],
                        ['Wildcard', true],
                    ].map(([name, value]) => (
                        <button
                            className={clsx(
                                'btn',
                                value && Number(supportsWildcard?.data) == 0
                                    ? 'btn-disabled'
                                    : // eslint-disable-next-line unicorn/no-nested-ternary
                                    shouldWildcard == value
                                    ? 'btn-blue-primary'
                                    : 'btn-blue-surface'
                            )}
                            disabled={
                                value && Number(supportsWildcard?.data) === 0
                            }
                        >
                            {name}
                            {value &&
                                Number(supportsWildcard?.data) === 0 &&
                                ' (Unsupported by Resolver)'}
                        </button>
                    ))}
                </div>
                <input
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className="input"
                />
            </div>
            <div>
                <Button
                    onClick={() => {
                        // refetch();
                    }}
                    variant="primary"
                >
                    Call
                </Button>
            </div>
        </div>
    );
};

export const ResolverPlaygroundDemo = () => {
    return (
        <ClientOnly
            child={() => (
                <div className="px-3">
                    <Demo />
                    {/* This demo is in under construction */}
                </div>
            )}
        />
    );
};
