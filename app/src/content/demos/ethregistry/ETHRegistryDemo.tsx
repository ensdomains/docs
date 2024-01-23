'use client';

import { useState } from 'react';
import { useAccount, useChainId } from 'wagmi';

import { ClientOnly } from '@/ClientOnly';
import { Button } from '@/components/Button';

import { ChainField } from './inputs/ChainField';
import { DurationField } from './inputs/DurationField';
import { GenerateSecret } from './inputs/GenerateSecret';
import { LabelField } from './inputs/LabelField';
import { OwnerField } from './inputs/OwnerField';
import { ResolverField } from './inputs/ResolverField';
import { AvailabilityCheck } from './stage/AvailabilityCheck';
import { CommitmentCheck } from './stage/CommitmentCheck';
import { RentPriceCheck } from './stage/RentPriceCheck';
import { MakeCommit } from './transactions/MakeCommit';
import { RegisterName } from './transactions/RegisterName';

const Demo = () => {
    const { address } = useAccount();
    const chainId = useChainId();

    /* User Configurable Values */
    const [label, setLabel] = useState('testname123456');
    const [owner, setOwner] = useState(
        '0x225f137127d9067788314bc7fcc1f36746a3c3B5'
    );
    const [resolver, setResolver] = useState(
        '0x225f137127d9067788314bc7fcc1f36746a3c3B5'
    );
    const [duration, setDuration] = useState(60 * 60 * 24 * 365);
    const [secret, setSecret] = useState(
        '0x0000000000000000000000000000000000000000000000000000000000000000'
    );

    /* State Values */
    const [available, setAvailable] = useState(false);
    const [commithash, setCommithash] = useState('');
    // eslint-disable-next-line unicorn/no-useless-undefined
    const [rentPrice, setRentPrice] = useState<bigint | null>(undefined);

    const { isConnected } = useAccount();

    return (
        <div className="-m-4">
            <div className="w-full border-b border-ens-light-border px-4 py-2 dark:border-ens-dark-border">
                Register a Name (Live Demo)
            </div>
            <div className="space-y-4 p-4">
                {!isConnected && (
                    <div>
                        <Button
                            variant="primary"
                            onClick={() => {
                                // connect();
                            }}
                        >
                            Connect
                        </Button>
                    </div>
                )}
                <ChainField />
                <LabelField label={label} setLabel={setLabel} />
                <AvailabilityCheck name={label} setAvailable={setAvailable} />
                <DurationField duration={duration} setDuration={setDuration} />
                <GenerateSecret secret={secret} setSecret={setSecret} />
                <OwnerField owner={owner} setOwner={setOwner} />
                <ResolverField resolver={resolver} setResolver={setResolver} />
                <CommitmentCheck
                    name={label}
                    duration={duration}
                    owner={owner}
                    secret={secret}
                    resolver={resolver}
                    setCommithash={setCommithash}
                />
                <MakeCommit commithash={commithash} />
                <div>Wait 60 seconds.</div>
                <RentPriceCheck
                    name={label}
                    duration={duration}
                    setRentPrice={setRentPrice}
                />
                <RegisterName
                    name={label}
                    duration={duration}
                    owner={owner}
                    secret={secret}
                    resolver={resolver}
                    rentPrice={rentPrice}
                />
            </div>
        </div>
    );
};

export const ETHRegistryDemo = () => {
    return <ClientOnly child={() => <Demo />} />;
};
