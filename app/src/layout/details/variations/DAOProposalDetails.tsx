import { FC } from 'react';
import { FaDiscourse } from 'react-icons/fa';
import { FiClock } from 'react-icons/fi';

import { MdxDAOProposalProps } from '@/lib/mdxPageProps';

export const DAOProposalDetails: FC<{ mdxProperties: MdxDAOProposalProps }> = ({
    mdxProperties,
}) => {
    return (
        <div className="">
            {mdxProperties.status && (
                <div className="flex items-center justify-between text-xs">
                    <div>Status</div>
                    <div className="flex items-center gap-1">
                        {
                            {
                                final: (
                                    <span className="text-green-500">
                                        ✅ Final
                                    </span>
                                ),
                                draft: (
                                    <span className="text-ens-light-blue-dao-400">
                                        ✍️ Draft
                                    </span>
                                ),
                            }[mdxProperties.status]
                        }
                    </div>
                </div>
            )}
            {mdxProperties.created && (
                <div className="flex items-center justify-between text-xs">
                    <div>Created</div>
                    <div className="flex items-center gap-1">
                        <FiClock />
                        {mdxProperties.created}
                    </div>
                </div>
            )}
            {mdxProperties.discourse && (
                <div className="flex items-center justify-between text-xs">
                    <div>Discourse</div>
                    <a
                        href={`https://discuss.ens.domains/t/t/${mdxProperties.discourse}`}
                        className="text-ens-light-blue-dao-400 flex items-center gap-1 hover:underline"
                        target="_blank"
                    >
                        <FaDiscourse />#{mdxProperties.discourse}
                    </a>
                </div>
            )}
            {/* {mdxProperties.snapshot && (
                <div className="flex items-center justify-between text-xs">
                    <div>Vote</div>
                    <a
                        href={mdxProperties.snapshot}
                        className="flex items-center gap-1 text-blue-500 hover:underline"
                        target="_blank"
                    >
                        <FaScroll />
                        {mdxProperties.snapshot}
                    </a>
                </div>
            )} */}
            {mdxProperties.type && (
                <div className="flex items-center justify-between text-xs">
                    <div>Type</div>
                    <div className="flex items-center gap-1">
                        {
                            {
                                social: (
                                    <span className="text-ens-light-blue-dao-400">
                                        👨‍👩‍👧‍👦 Social
                                    </span>
                                ),
                                executable: (
                                    <span className="text-yellow-500">
                                        👷 Executable
                                    </span>
                                ),
                            }[mdxProperties.type]
                        }
                    </div>
                </div>
            )}
        </div>
    );
};
