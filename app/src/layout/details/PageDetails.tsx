import { FC } from 'react';
import { FiClock, FiGitCommit } from 'react-icons/fi';

import { ContributorsSection } from '@/components/contribute/ContributorsSection';
import { TimeSince } from '@/components/Timestamp';
import { MdxPageProps } from '@/lib/mdxPageProps';

import { DAOProposalDetails } from './variations/DAOProposalDetails';
import { ENSIPDetails } from './variations/ENSIPDetails';
import { GitCommitLink } from './variations/GitCommitLink';
import { ProposalData, SnapshotDetails } from './variations/SnapshotDetails';
import { TallyDetails } from './variations/TallyDetails';

export const PageDetails: FC<{
    mdxProperties: MdxPageProps;
    snapshotData: ProposalData;
}> = ({ mdxProperties, snapshotData }) => {
    const shouldShowPageDetails = mdxProperties.meta?.showDetailsSection;

    // const pathname = usePathname();
    // const isDAO = pathname.startsWith('/dao');

    if (!shouldShowPageDetails) {
        return <></>;
    }

    const hasContributors = (mdxProperties.meta?.contributors?.length ?? 0) > 0;

    const hasCommit = mdxProperties.commit && mdxProperties.filepath;

    return (
        <>
            <div className="border-t border-ens-light-border pt-2 text-ens-light-text-primary dark:border-ens-dark-border dark:text-ens-dark-text-primary">
                <div className="leading-6">
                    {mdxProperties.meta?.ensip && (
                        <ENSIPDetails
                            mdxProperties={mdxProperties.meta.ensip}
                        />
                    )}
                    {mdxProperties.meta?.proposal && (
                        <DAOProposalDetails
                            mdxProperties={mdxProperties.meta.proposal}
                        />
                    )}
                    {hasContributors && (
                        <div className="flex justify-between text-xs">
                            <div>Contributors</div>
                            <ContributorsSection
                                contributors={mdxProperties.meta.contributors}
                            />
                        </div>
                    )}
                    {hasCommit && (
                        <div className="flex items-center justify-between text-xs">
                            <div>Hash</div>
                            <GitCommitLink
                                file={mdxProperties.filepath}
                                hash={mdxProperties.commit.hash}
                            >
                                <FiGitCommit />
                                {mdxProperties.commit.hash}
                            </GitCommitLink>
                        </div>
                    )}
                    {hasCommit && (
                        <div className="flex items-center justify-between text-xs">
                            <div>Last Modified</div>
                            <GitCommitLink
                                file={mdxProperties.filepath}
                                hash={mdxProperties.commit.hash}
                            >
                                <FiClock />
                                <TimeSince date={mdxProperties.commit.date} />
                            </GitCommitLink>
                        </div>
                    )}
                    {/* {mdxProperties.filepath && (
                            <div className="flex justify-between text-xs">
                                <div>Path</div>
                                <div>{mdxProperties.filepath}</div>
                                </div>
                            )} */}
                </div>
            </div>
            {mdxProperties.meta?.proposal?.snapshot && (
                <SnapshotDetails
                    snapshotData={snapshotData}
                    data={mdxProperties.meta.proposal}
                />
            )}
            {mdxProperties.meta?.proposal?.tally && (
                <TallyDetails data={mdxProperties.meta.proposal} />
            )}
        </>
    );
};
