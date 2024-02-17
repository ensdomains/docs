import { FC, useEffect } from 'react';
import { FiCheck, FiX } from 'react-icons/fi';

import { EthCall } from '../../call/EthCall';
import { useCommitment } from '../hooks/useCommitment';

export const CommitmentCheck: FC<{
    name: string;
    duration: number;
    owner: string;
    secret: string;
    resolver: string;
    setCommithash?: (_commithash: string) => void;
}> = ({ name, duration, owner, secret, resolver, setCommithash }) => {
    const { commithash, isLoadingCommithash } = useCommitment(
        name,
        owner,
        duration,
        secret,
        resolver
    );

    const isReady =
        name && duration && owner && secret && resolver && !isLoadingCommithash;

    useEffect(() => {
        if (isReady) {
            setCommithash(commithash);
        } else {
            setCommithash('');
        }
    }, [commithash, isReady, isLoadingCommithash]);

    return (
        <div>
            <EthCall
                description="This generates the commitment hash that we will then commit to chain."
                call={
                    <div>
                        <span className="text-ens-light-blue-primary">
                            ETHRegistrarController
                        </span>
                        .makeCommitment(
                        <span className="text-ens-light-pink-primary">
                            "{name}"
                        </span>
                        ,{' '}
                        <span className="text-ens-light-purple-primary">
                            {owner}
                        </span>
                        ,
                        <span className="text-ens-light-orange-primary">
                            {duration}
                        </span>
                        ,
                        <span className="text-ens-light-pink-primary">
                            {secret}
                        </span>
                        ,
                        <span className="text-ens-light-indigo-primary">
                            {resolver}
                        </span>
                        , [], false, 0 )
                    </div>
                }
            >
                {isLoadingCommithash ? (
                    <div className="flex items-center gap-1 rounded-lg border-ens-light-blue-primary bg-ens-light-blue-surface px-3 py-2 text-ens-light-blue-primary dark:border-ens-dark-blue-primary dark:bg-ens-dark-blue-surface">
                        Loading...
                    </div>
                ) : (
                    <div>
                        {commithash ? (
                            <div className="flex items-center gap-1 rounded-lg border-ens-light-green-primary bg-ens-light-green-surface px-3 py-2 text-ens-light-green-primary dark:border-ens-dark-green-primary dark:bg-ens-dark-green-surface">
                                <FiCheck />
                                CommitHash: {commithash}
                            </div>
                        ) : (
                            <div className="flex items-center gap-1 rounded-lg border-ens-light-red-primary bg-ens-light-red-surface px-3 py-2 text-ens-light-red-primary dark:border-ens-dark-red-primary dark:bg-ens-dark-red-surface">
                                <FiX />
                                Problem
                            </div>
                        )}
                    </div>
                )}
            </EthCall>
        </div>
    );
};
