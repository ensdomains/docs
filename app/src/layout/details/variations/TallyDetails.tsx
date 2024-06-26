import { gql, request } from 'graphql-request';
import { FC } from 'react';

import { TruncatedAddress } from '@/components/TruncatedAddress';
import { MdxDAOProposalProps } from '@/lib/mdxPageProps';

const API_KEY = process.env.TALLY_API_KEY;

// eslint-disable-next-line prettier/prettier, unicorn/template-indent
const query = gql`
    query ProposalStatusHistory($governanceId: AccountID!, $proposalId: ID!) {
        proposal(proposalId: $proposalId, governanceId: $governanceId) {
            end {
                id
                timestamp
            }
            start {
                id
                timestamp
            }
            governance {
                chainId
                timelockId
                quorum
                tokens {
                    decimals
                }
            }
            voteStats {
                support
                weight
                percent
            }
            tallyProposal {
                createdAt
                creator {
                    name
                    address
                }
            }
            proposer {
                name
                address
                picture
            }
            createdTransaction {
                block {
                    id
                    timestamp
                }
            }
            statusChanges {
                type
                txHash
                block {
                    id
                    timestamp
                }
            }
        }
    }
`;

export type TallyProposalData = {
    createdTransaction: {
        block: {};
    };
    end: { timestamp: string };
    start: { timestamp: string };
    proposer: { name: string; address: string; picture: string };
    statusChanges: {
        type: 'PENDING' | 'ACTIVE' | 'SUCCEEDED' | 'QUEUED' | 'EXECUTED';
        txHash: string;
        block: {};
    }[];
    tallyProposal: {
        createdAt: string;
        creator: { name: string; address: string };
    };
    voteStats: { percent: string; support: string; weight: string }[];
};

export const fetchTallyData = async (proposal?: string) => {
    if (!proposal) return;

    const data = await request<{ proposal: TallyProposalData }>(
        'https://api.tally.xyz/query',
        query,
        {
            proposalId: proposal,
            // ens.eth governance id
            governanceId: 'eip155:1:0x323A76393544d5ecca80cd6ef2A560C6a395b7E3',
        },
        {
            'Api-Key': API_KEY,
        }
    );

    return data.proposal;
};

const large2Smol = (x: number) => {
    let newValue = x;
    const suffixes = ['', 'K', 'M', 'B', 'T'];
    let suffixNumber = 0;

    while (newValue >= 1000) {
        newValue /= 1000;
        suffixNumber++;
    }

    return Math.round(newValue * 100) / 100 + suffixes[suffixNumber];
};

export const TallyDetails: FC<{
    data: MdxDAOProposalProps;
}> = async ({ data }) => {
    // TODO: Re-enable Tally API
    const tallyData = undefined; // await fetchTallyData(data.tally);

    if (!tallyData) {
        return <></>;
    }

    return (
        <div>
            <a
                href={'https://www.tally.xyz/gov/ens/proposal/' + data.tally}
                target="_blank"
                className="mb-2 flex justify-between border-b border-ens-dao-400 font-bold"
            >
                <div>Results</div>
                <div>
                    <img
                        src="/icons/libraries/tally.ico"
                        alt="tally"
                        className="h-6"
                    />
                </div>
            </a>
            <div className="text-xs leading-6">
                <div className="flex items-center justify-between">
                    <div>Proposer</div>
                    <div className="truncate pl-4">
                        {tallyData.proposer.name ?? (
                            <TruncatedAddress
                                address={tallyData.proposer.address}
                            />
                        )}
                    </div>
                </div>

                <div className="space-y-1">
                    {tallyData?.voteStats.map(
                        ({ support, percent, weight }, _index) => (
                            <div key={support} className="space-y-1">
                                <div className="flex items-center justify-between">
                                    <div>{support}</div>

                                    <div>
                                        {large2Smol(
                                            Number.parseInt(weight) / 10e17
                                        )}
                                    </div>
                                </div>
                                <div className="h-2 w-full overflow-hidden rounded-md bg-gray-300">
                                    <div
                                        className="h-full w-0 bg-blue-500"
                                        style={{
                                            width: `${percent}%`,
                                        }}
                                    ></div>
                                </div>
                            </div>
                        )
                    )}
                </div>
                {/* {hasContributors && (
                    <div className="flex justify-between text-xs">
                        <div>Contributors</div>
                        <ContributorsSection
                            contributors={mdxProperties.meta.contributors}
                        />
                    </div>
                )} */}
            </div>
        </div>
    );
};
