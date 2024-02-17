import { formatAddress } from '@ens-tools/format';
import { FC } from 'react';
import { useAccount, useEnsAvatar, useEnsName } from 'wagmi';

export const ProfileInfo: FC = () => {
    const { address } = useAccount();
    const { data: name } = useEnsName({ address });
    const { data: ensAvatar } = useEnsAvatar({ name });

    return (
        <div>
            <div>You are signed in as:</div>
            <div className="card1 flex items-center gap-3 p-4">
                {ensAvatar && (
                    <div>
                        <div className="size-10">
                            <img
                                src={ensAvatar}
                                alt=""
                                className="rounded-full"
                            />
                        </div>
                    </div>
                )}
                <div>
                    <div className="font-bold">{name}</div>
                    <div className="text-sm">{formatAddress(address)}</div>
                </div>
            </div>
        </div>
    );
};
