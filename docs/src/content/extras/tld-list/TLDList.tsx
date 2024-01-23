import Link from 'next/link';
import { createPublicClient, http, MulticallReturnType, namehash } from 'viem';
import { mainnet } from 'viem/chains';

import { TLDs } from '#/data/tlds';

const ADDRESS_MAP = {
    '0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85': (
        <span className="text-ens-light-blue-primary">ETH Registrar</span>
    ),
    '0x58774Bb8acD458A640aF0B88238369A167546ef2': (
        <span className="text-ens-light-green-bright">DNS Registrar</span>
    ),
    '0x828D6e836e586B53f1da3403FEda923AEd431019':
        '(Custom) Protocol.ART Registrar',
    '0x0b9BB06Ebf35A755998B60353546ae8A055554d2': '(Custom) Box Registrar',
    '0x04ebA57401184A97C919b0B6b4e8dDE263BCb920': '(Custom) HipHop Registrar',
    '0x1eb4b8506fca65e6B229E346dfBfd349956A66e3': '(Custom) Club Registrar',
    '0x56ca9514363F68d622931dce1566070f86Ce5550': '(Custom) Kred Registrar',
    '0xA86ba3b6d83139a49B649C05DBb69E0726DB69cf': '(Custom) Luxe Registrar',
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

    if (ADDRESS_MAP[owner_address]) return ADDRESS_MAP[owner_address];

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

    for (let index = 0; index < TLDs.length; index += 100) {
        chunks.push(TLDs.slice(index, index + 100));
    }

    const results: [string[], MulticallReturnType][] = [];

    for (const chunk of chunks) {
        const result = await client.multicall({
            contracts: chunk.map((tld) => ({
                ...contract,
                args: [namehash(tld)],
                functionName: 'owner',
            })),
        });

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
            <div className="card1 p-4">
                {Object.entries(unique_results)
                    .sort((a, b) => {
                        return classifyOwner(b[0]) - classifyOwner(a[0]);
                    })
                    .map(([k, v]) => {
                        return (
                            <div className="flex items-center gap-1">
                                <span className="flex rounded-md border px-2 py-0.5 leading-5">
                                    {v}
                                </span>
                                <span>-</span>
                                <span>{computeTLD(k)}</span>
                                <span>-</span>
                                <Link
                                    className="text-xs"
                                    href={'https://etherscan.io/address/' + k}
                                    target="_blank"
                                >
                                    {k}
                                </Link>
                            </div>
                        );
                    })}
            </div>
            <h2>By Name</h2>
            <p>Lorem ipsum dolor</p>
            <table>
                <thead>
                    <tr>
                        <th>TLD</th>
                        <th>Controller</th>
                        <th>Notes</th>
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
                                    <td>{computeTLD(v.result as string)}</td>
                                    <td></td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </div>
    );
};
