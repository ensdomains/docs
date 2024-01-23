import { FC } from 'react';
import { FiClock } from 'react-icons/fi';

import { MdxENSIPProps } from '@/lib/mdxPageProps';

export const ENSIPDetails: FC<{ mdxProperties: MdxENSIPProps }> = ({
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
                                    <span className="text-blue-500">
                                        ✍️ Draft
                                    </span>
                                ),
                                obsolete: (
                                    <span className="text-red-500">
                                        ❌ Obsolete
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
                        {new Date(mdxProperties.created).toLocaleDateString()}
                    </div>
                </div>
            )}
        </div>
    );
};
