import { gql, request } from 'graphql-request';

import { TruncatedAddress } from '@/components/TruncatedAddress';
import { MdxDAOProposalProps } from '@/lib/mdxPageProps';

// eslint-disable-next-line prettier/prettier, unicorn/template-indent
const query = gql`
    query Proposals($proposal: String!) {
        proposals(first: 1, where: { id: $proposal }) {
            id
            title
            choices
            scores
            start
            end
            state
            author
            scores_total
        }
    }
`;

export type ProposalData = {
    // 0xfe73d1b06675d6bc1cc074f440c347274d13c55b513ea02ec950efe639adbbb0
    id: string;
    // "[Social] Proposal: Transfer ENS Treasury and Contract Ownership"
    title: string;
    // ["Yes", "No"]
    choices: string[];
    // Start time of the proposal
    start: number;
    // End time of the proposal
    end: number;
    //
    state: 'closed' | '';
    // Author "0x5BFCB4BE4d7B43437d5A0c57E908c048a4418390"
    author: string;
    // Votes
    scores: number[];
    // Total votes
    scores_total: number;
};

export const fetchSnapshotData = async (proposal?: string) => {
    if (!proposal) return;

    const data = await request<{ proposals: ProposalData[] }>(
        'https://hub.snapshot.org/graphql',
        query,
        { proposal }
    );

    return data.proposals[0] as ProposalData;
};

export const SnapshotDetails = async ({
    data,
}: // snapshotData,
{
    data: MdxDAOProposalProps;
    snapshotData: ProposalData;
}) => {
    const snapshotData = await fetchSnapshotData(data.snapshot);

    return (
        <div>
            <a
                href={
                    'https://snapshot.org/#/ens.eth/proposal/' + data.snapshot
                }
                target="_blank"
                className="mb-2 flex justify-between border-b border-ens-dao-400 font-bold"
            >
                <div>Results</div>
                <div>
                    <img
                        src="/icons/snapshot.png"
                        alt="snapshot"
                        className="h-6"
                    />
                </div>
            </a>
            <div className="text-xs leading-6">
                <div className="flex items-center justify-between">
                    <div>Proposer</div>
                    <div className="truncate pl-4">
                        <TruncatedAddress address={snapshotData?.author} />
                    </div>
                </div>

                <div className="space-y-1">
                    {snapshotData?.choices.map((choice, index) => (
                        <div key={choice} className="space-y-1">
                            <div className="flex items-center justify-between">
                                <div>{choice}</div>

                                <div>
                                    {`${
                                        Math.round(
                                            (snapshotData.scores[index] /
                                                snapshotData.scores_total) *
                                                10_000
                                        ) / 100
                                    }%`}
                                </div>
                            </div>
                            <div className="h-2 w-full overflow-hidden rounded-md bg-gray-300">
                                <div
                                    className="h-full w-0 bg-blue-500"
                                    style={{
                                        width: `${
                                            (snapshotData.scores[index] /
                                                snapshotData.scores_total) *
                                            100
                                        }%`,
                                    }}
                                ></div>
                            </div>
                        </div>
                    ))}
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
