'use client';

import { useState } from 'react';
import { FiClock } from 'react-icons/fi';
import { useAccount, useChainId } from 'wagmi';

import { ClientOnly } from '@/ClientOnly';

import { DemoSection } from './DemoSection';
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

const title = 'Register a Name (Live Demo)';

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
        <div className="">
            <div className="space-y-4 p-4">
                {!isConnected && <div>Please Connect Wallet</div>}
                <DemoSection name="Check Availability">
                    <LabelField label={label} setLabel={setLabel} />
                    <AvailabilityCheck
                        name={label}
                        setAvailable={setAvailable}
                    />
                </DemoSection>
                <DemoSection name="Commit">
                    <DurationField
                        duration={duration}
                        setDuration={setDuration}
                    />
                    <GenerateSecret secret={secret} setSecret={setSecret} />
                    <OwnerField owner={owner} setOwner={setOwner} />
                    <ResolverField
                        resolver={resolver}
                        setResolver={setResolver}
                    />
                    <CommitmentCheck
                        name={label}
                        duration={duration}
                        owner={owner}
                        secret={secret}
                        resolver={resolver}
                        setCommithash={setCommithash}
                    />
                    <MakeCommit commithash={commithash} />
                </DemoSection>
                <div className="card1 flex items-center gap-3 p-4">
                    <FiClock className="text-lg" />
                    Wait 60 seconds.
                </div>
                <DemoSection name="Register">
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
                </DemoSection>
            </div>
        </div>
    );
};

export const ETHRegistryDemo = () => {
    return <ClientOnly child={() => <Demo />} />;
};
