'use client';

import { useState } from 'react';
import useSWR from 'swr';
import { holesky, mainnet, sepolia } from 'viem/chains';
import { useAccount } from 'wagmi';

import { ClientOnly } from '@/ClientOnly';
import { Button } from '@/components/Button';
import { ProfileAvatar } from '#/content/prose/profile/ProfileAvatar';

import { OwnerField } from '../ethregistry/inputs/OwnerField';

const ENS_SUBGRAPH_API_KEY = '13ef776c0372f7c14eb7c019a0f80272';

const GRAPH_QL_URL = {
    [mainnet.id]: `https://gateway.thegraph.com/api/${ENS_SUBGRAPH_API_KEY}/subgraphs/id/5XqPmWe6gjyrJtFn9cLy237i4cWw2j9HcUJEXsP5qGtH`,
    [sepolia.id]:
        'https://api.studio.thegraph.com/proxy/49574/enssepolia/version/latest',
    [holesky.id]:
        'https://api.studio.thegraph.com/proxy/49574/ensholesky/version/latest',
};

type SubgraphResponse = {
    data: {
        domains: {
            name: string;
            expiryDate?: string;
            registration?: { expiryDate: string; registrationDate: string };
        }[];
    };
};

const fetcher = async ([address, chainId]: [string, number]) => {
    const url = GRAPH_QL_URL[chainId];

    if (!url) throw new Error('Unsupported chain id');

    const request = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: `
                query {
                    domains(where: {and: [{or: [{owner: "${address}"},{registrant:"${address}"},{wrappedOwner: "${address}"}]},{parent_not: "0x91d1777781884d03a6757a803996e38de2a42967fb37eeaca72729271025a9e2"},{or:[{expiryDate_gt: "1723472244"},{expiryDate: null}]},{or: [{owner_not: "0x0000000000000000000000000000000000000000"},{resolver_not: null},{and: [{registrant_not: "0x0000000000000000000000000000000000000000"},{registrant_not: null}]}]}]}) {
                        name
                        expiryDate
                        registration {
                            expiryDate
                            registrationDate
                        }
                    }
                }
            `,
        }),
    }).then((result) => result.json() as Promise<SubgraphResponse>);

    return request.data.domains.sort((a, b) => {
        // Sort by expiry date
        if (a.expiryDate && b.expiryDate) {
            return (
                Number.parseInt(b.expiryDate) - Number.parseInt(a.expiryDate)
            );
        }

        return 0;
    });
};

const Demo = () => {
    const { address, chainId } = useAccount();
    const [targetAddress, setAddress] = useState(address as string);
    const { data, isLoading } = useSWR(
        [targetAddress?.toLowerCase(), chainId],
        fetcher
    );

    return (
        <div className="space-y-4 p-4">
            <OwnerField owner={targetAddress} setOwner={setAddress} />
            <div>
                <label htmlFor="datasource" className="label">
                    Data Source
                </label>
                <div className="flex gap-2">
                    <Button onClick={() => {}}>Subgraph</Button>
                    <Button onClick={() => {}} disabled>
                        Airstack
                    </Button>
                    <Button onClick={() => {}} disabled>
                        Alchemy
                    </Button>
                </div>
            </div>
            <div>
                <label htmlFor="datasource" className="label">
                    Names {data?.length > 0 && `(${data.length})`}
                </label>
                <div className="not-prose">
                    {data?.length > 0 ? (
                        <div className="card1 grid max-h-96 grid-cols-2 gap-4 overflow-auto p-2 md:grid-cols-4">
                            {data.map((domain) => (
                                <div
                                    key={domain.name}
                                    className="card1 relative aspect-square overflow-hidden"
                                >
                                    <div className="absolute bottom-0 left-0 z-10 p-2">
                                        <span className="tag tag-blue">
                                            {domain.name}
                                        </span>
                                    </div>
                                    <div className="absolute inset-0">
                                        <ProfileAvatar
                                            name={domain.name as string}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div>
                            {isLoading ? (
                                <div>Loading...</div>
                            ) : (
                                <div>No names found</div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export const ListNamesDemo = () => {
    return <ClientOnly child={() => <Demo />} />;
};
