'use client';

import { useState } from 'react';
import { useAccount, useChainId } from 'wagmi';

import { ClientOnly } from '@/ClientOnly';

import { DurationField } from '../ethregistry/inputs/DurationField';
import { LabelField } from '../ethregistry/inputs/LabelField';
import { RentPriceCheck } from '../ethregistry/stage/RentPriceCheck';
import { RenewName } from './transactions/RenewName';

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
                <LabelField label={label} setLabel={setLabel} />
                <DurationField duration={duration} setDuration={setDuration} />
                <RentPriceCheck
                    name={label}
                    duration={duration}
                    setRentPrice={setRentPrice}
                />
                <RenewName
                    name={label}
                    duration={duration}
                    rentPrice={rentPrice}
                />
            </div>
        </div>
    );
};

export const ETHRegistryRenewDemo = () => {
    return <ClientOnly child={() => <Demo />} />;
};
