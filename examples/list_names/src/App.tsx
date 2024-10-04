// Import thorin css
import '@ensdomains/thorin/style.css';

import { useNamesForAddress } from '@ensdomains/ensjs-react';
import { Card, Typography } from '@ensdomains/thorin';
import { useState } from 'react';
import type { Address } from 'viem';
import { usePublicClient } from 'wagmi';

import { Navbar } from './Navbar';
import { ResolutionInput } from './ResolutionInput';

// Create component
export const App = () => {
    const [address, setAddress] = useState<Address>();
    const client = usePublicClient();
    const disabled = !address;

    const { data: names } = useNamesForAddress({
        address: address!,
        client: client as any,
    });

    return (
        <div className="p-4 bg-ens-grey1 min-h-screen">
            <Navbar />
            <div className="w-full max-w-screen-xs mx-auto">
                <Card>
                    <Typography fontVariant="headingOne">List names</Typography>
                    <ResolutionInput
                        setAddress={(value) => setAddress(value)}
                    />
                </Card>
                {names && <div>hi {JSON.stringify(names)}</div>}
            </div>
        </div>
    );
};
