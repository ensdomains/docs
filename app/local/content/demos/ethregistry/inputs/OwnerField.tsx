import { FC } from 'react';
import { useAccount } from 'wagmi';

import { Button } from '@/components/Button';

export const OwnerField: FC<{
    owner: string;
    setOwner: (_owner: string) => void;
}> = ({ owner, setOwner }) => {
    const { address } = useAccount();

    return (
        <div>
            <label className="label" htmlFor="owner">
                Owner (address):
            </label>
            <div className="flex items-center gap-2">
                <input
                    value={owner}
                    onChange={(event) => setOwner(event.target.value)}
                    className="input"
                    id="owner"
                    placeholder="0x225f137127d9067788314bc7fcc1f36746a3c3B5"
                />
                {address && (
                    <Button
                        variant="primary"
                        onClick={() => {
                            setOwner(address);
                        }}
                    >
                        Self
                    </Button>
                )}
            </div>
        </div>
    );
};
