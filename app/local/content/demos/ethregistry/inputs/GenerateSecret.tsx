// eslint-disable-next-line unicorn/prefer-node-protocol
import { randomBytes } from 'crypto';
import { FC } from 'react';
import { FiRefreshCcw } from 'react-icons/fi';

import { Button } from '@/components/Button';

export const GenerateSecret: FC<{
    secret: string;
    setSecret: (secret: string) => void;
}> = ({ secret, setSecret }) => {
    return (
        <div>
            <label className="label" htmlFor="secret">
                Secret (random bytes32):
            </label>
            <div className="flex items-center gap-2">
                <input
                    value={secret}
                    onChange={(event) => setSecret(event.target.value)}
                    className="input"
                    id="secret"
                    placeholder="0x0000000000000000000000000000000000000000000000000000000000000000"
                />
                <Button
                    variant="primary"
                    onClick={() => {
                        // generate random bytes32 hex prefixed with 0x
                        // '0x0000000000000000000000000000000000000000000000000000000000000000'
                        const random = '0x' + randomBytes(32).toString('hex');

                        setSecret(random);
                    }}
                >
                    <FiRefreshCcw />
                </Button>
            </div>
        </div>
    );
};
