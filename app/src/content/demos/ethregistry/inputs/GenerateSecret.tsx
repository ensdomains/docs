import { FC } from 'react';
import { FiRefreshCcw } from 'react-icons/fi';

import { Button } from '@/components/Button';

export const GenerateSecret: FC<{
    secret: string;
    setSecret: (secret: string) => void;
}> = ({ secret, setSecret }) => {
    return (
        <div>
            <p>Secret (random bytes32):</p>
            <div className="flex items-center gap-2">
                <input
                    value={secret}
                    onChange={(event) => setSecret(event.target.value)}
                    className="input"
                    placeholder="0x0000000000000000000000000000000000000000000000000000000000000000"
                />
                <Button
                    variant="primary"
                    onClick={() => {
                        setSecret(
                            '0x0000000000000000000000000000000000000000000000000000000000000000'
                        );
                    }}
                >
                    <FiRefreshCcw />
                </Button>
            </div>
        </div>
    );
};
