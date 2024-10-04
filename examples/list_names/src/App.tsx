// Import thorin css
import '@ensdomains/thorin/style.css';

import { Button, Card, Typography } from '@ensdomains/thorin';
import { useState } from 'react';
import type { Address } from 'viem';

import { Navbar } from './Navbar';
import { ResolutionInput } from './ResolutionInput';

// Create component
export const App = () => {
    const [address, setAddress] = useState<Address>();

    const disabled = !address;

    return (
        <div className="p-4 bg-ens-grey1 min-h-screen">
            <Navbar />
            <div className="w-full max-w-screen-xs mx-auto">
                <Card>
                    <Typography fontVariant="headingOne">
                        Send Tokens
                    </Typography>
                    <ResolutionInput
                        setAddress={(value) => setAddress(value)}
                    />
                    <Button disabled={disabled}>Send</Button>
                </Card>
            </div>
        </div>
    );
};
