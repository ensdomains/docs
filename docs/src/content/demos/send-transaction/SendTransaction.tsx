'use client';

import { FC, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { isAddress } from 'viem';
import { useEnsAddress } from 'wagmi';

import { Button } from '@/components/Button';

// TODO: make this look nice, for example https://ens-frontend-template.vercel.app/input
export const SendTransactionDemo: FC = () => {
    const [input, setInput] = useState('');

    const [debouncedInput] = useDebounce(input, 500);

    // Resolve potential ENS names (dot separated strings)
    const { data: ensAddress, isLoading: ensAddressIsLoading } = useEnsAddress({
        name: debouncedInput.includes('.') ? debouncedInput : undefined,
        chainId: 1,
    });

    // Set the address (address if provided directly or resolved address from ENS name)
    const address =
        input !== debouncedInput
            ? undefined
            : // TODO: fix linting, it's competing with prettier here
            // eslint-disable-next-line unicorn/no-nested-ternary
            isAddress(debouncedInput)
            ? debouncedInput
            : ensAddress;

    return (
        <div className="text-ens-light-text-primary bg-ens-light-background-primary flex flex-col gap-2">
            <label htmlFor="input" className="text-base font-semibold">
                Address or ENS Name
            </label>
            <input
                id="input"
                className="bg-ens-light-background-primary dark:bg-ens-dark-background-primary border-ens-light-border dark:border-ens-dark-border w-full rounded-md border px-3 py-2"
                placeholder="ens.eth"
                onChange={(event) => setInput(event.target.value)}
            />

            {ensAddress && address && <span>{address}</span>}

            <Button
                variant="primary"
                onClick={() => {
                    // TODO:
                }}
                disabled={!address}
            >
                Send ETH
            </Button>
        </div>
    );
};
