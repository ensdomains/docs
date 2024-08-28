import clsx from 'clsx';
import Link from 'next/link';
import { FiExternalLink } from 'react-icons/fi';
import { createPublicClient, http, namehash } from 'viem';
import { mainnet } from 'viem/chains';

import { SmallCopy } from '@/components/SmallCopy';
import { TLDs } from '#/data/tlds';

const ADDRESS_MAP = {
    '0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85': {
        name: 'ETH Registrar',
        color: 'text-ens-light-blue-primary dark:text-ens-dark-blue-primary',
        surface:
            'bg-ens-light-blue-surface dark:bg-ens-dark-blue-surface border-ens-light-blue-surface dark:border-ens-dark-blue-surface',
    },
    '0x58774Bb8acD458A640aF0B88238369A167546ef2': {
        name: 'DNS Registrar',
        color: 'text-ens-light-green-primary dark:text-ens-dark-green-primary',
        surface:
            'bg-ens-light-green-surface dark:bg-ens-dark-green-surface border-ens-light-green-surface dark:border-ens-dark-green-surface',
    },
    '0xB32cB5677a7C971689228EC835800432B339bA2B': {
        name: 'DNS Registrar (Supports Gasless)',
        color: 'text-ens-light-green-primary dark:text-ens-dark-green-primary',
        surface:
            'bg-ens-light-green-surface dark:bg-ens-dark-green-surface border-ens-light-green-surface dark:border-ens-dark-green-surface',
    },
    '0x828D6e836e586B53f1da3403FEda923AEd431019': {
        name: '(Custom) Protocol.ART Registrar',
    },
    '0x0b9BB06Ebf35A755998B60353546ae8A055554d2': {
        name: '(Custom) Box Registrar',
    },
    '0x04ebA57401184A97C919b0B6b4e8dDE263BCb920': {
        name: '(Custom) HipHop Registrar',
    },
    '0x1eb4b8506fca65e6B229E346dfBfd349956A66e3': {
        name: '(Custom) Club Registrar',
    },
    '0x56ca9514363F68d622931dce1566070f86Ce5550': {
        name: '(Custom) Kred Registrar',
    },
    '0xA86ba3b6d83139a49B649C05DBb69E0726DB69cf': {
        name: '(Custom) Luxe Registrar',
    },
};

const classifyOwner = (owner_address: string) => {
    if (!owner_address) return 1;

    if (owner_address === '0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85')
        return 10;

    if (owner_address === '0x58774Bb8acD458A640aF0B88238369A167546ef2')
        return 3;

    if (ADDRESS_MAP[owner_address]) return 5;

    if (owner_address === '0x0000000000000000000000000000000000000000')
        return 0;

    return 4;
};

const computeTLD = (owner_address: string) => {
    if (!owner_address) return;

    if (ADDRESS_MAP[owner_address]) return ADDRESS_MAP[owner_address].name;

    if (owner_address === '0x0000000000000000000000000000000000000000')
        return (
            <span className="text-ens-light-grey-primary">
                Unsupported TLD (or no domains imported yet)
            </span>
        );

    return owner_address;
};

export const TLDList = async () => {
    const client = createPublicClient({
        chain: mainnet,
        transport: http(
            process.env.RPC_URL ?? '' //?? 'https://cloudflare-eth.com/rpc'
        ),
        batch: {
            multicall: {
                batchSize: 10_240,
            },
        },
    });

    const contract = {
        address: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
        abi: [
            {
                name: 'owner',
                type: 'function',
                stateMutability: 'view',
                inputs: [{ name: 'node', type: 'bytes32' }],
                outputs: [{ name: 'owner', type: 'address' }],
            },
        ],
    } as const;

    const chunks: string[][] = [];

    const batch_size = 400;

    for (let index = 0; index < TLDs.length; index += batch_size) {
        chunks.push(TLDs.slice(index, index + batch_size));
    }

    const results: [string[], any][] = [];

    for (const chunk of chunks) {
        const result = await client.multicall({
            contracts: chunk.map(
                (tld) =>
                    ({
                        ...contract,
                        args: [namehash(tld)],
                        functionName: 'owner',
                    } as any)
            ),
        } as any);

        results.push([chunk, result]);
    }

    const unique_results: Record<string, number> = {};

    for (const [chunks, returned] of results) {
        let index = 0;

        for (const _chunk in chunks) {
            const result = returned[index].result as string;

            const v = unique_results[result] || 0;

            unique_results[result] = v + 1;

            index++;
        }
    }

    return (
        <div>
            <h2>Totals</h2>
            <div className="">
                {Object.entries(unique_results)
                    .sort((a, b) => {
                        return classifyOwner(b[0]) - classifyOwner(a[0]);
                    })
                    .map(([k, v]) => {
                        const entry = ADDRESS_MAP[k];

                        return (
                            <div className="flex items-center gap-1">
                                <span
                                    className={clsx(
                                        'flex rounded-md border px-2 py-0.5 leading-5',
                                        entry?.surface ||
                                            'border-ens-light-border dark:border-ens-dark-border'
                                    )}
                                >
                                    {v}
                                </span>
                                <span>-</span>
                                <span>{computeTLD(k)}</span>
                            </div>
                        );
                    })}
            </div>
            <h2>By Name</h2>
            <table>
                <thead>
                    <tr>
                        <th>TLD</th>
                        <th>Controller</th>
                    </tr>
                </thead>
                <tbody>
                    {results
                        .flatMap(([chunks, result]) => {
                            return chunks.map((chunk, index) => {
                                return {
                                    result: result[index].result,
                                    owner_index: classifyOwner(
                                        result[index].result as string
                                    ),
                                    data: ADDRESS_MAP[
                                        result[index].result as string
                                    ],
                                    domain: chunk,
                                };
                            });
                        })
                        .sort((a, b) => {
                            return b.owner_index - a.owner_index;
                        })
                        .map((v) => {
                            return (
                                <tr key={v.domain}>
                                    <td>.{v.domain}</td>
                                    <td>
                                        <div className={v.data?.color}>
                                            {computeTLD(v.result as string)}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <span className="">
                                                {v.result as any}
                                            </span>
                                            {v.result && (
                                                <SmallCopy
                                                    data={v.result as string}
                                                    className="text-ens-light-blue-primary dark:text-ens-dark-blue-primary"
                                                />
                                            )}
                                            <Link
                                                href={`https://etherscan.io/address/${v.result}`}
                                                target="_blank"
                                            >
                                                <FiExternalLink />
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </div>
    );
};
