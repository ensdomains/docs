'use client';

import { formatAddress } from 'ens-tools';
import { FC } from 'react';

export const TruncatedAddress: FC<{ address?: string }> = ({ address }) => {
    try {
        return <>{formatAddress(address)}</>;
    } catch (error) {
        return <>{'FAILED TO TRUNCATE ADDRESS' + JSON.stringify(error)}</>;
    }
};
