'use client';

import { FC, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { isAddress } from 'viem';
import { useEnsAddress, useEnsAvatar } from 'wagmi';

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
    const { data: ensAvatar, isLoading: ensAvatarIsLoading } = useEnsAvatar({
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
        <div className="not-prose flex flex-col gap-2 p-4">
            <label htmlFor="input" className="text-base font-semibold">
                Address or ENS Name
            </label>
            <input
                id="input"
                className="w-full rounded-md border border-ens-light-border bg-ens-light-background-primary px-3 py-2 dark:border-ens-dark-border dark:bg-ens-dark-background-primary"
                placeholder="ens.eth"
                onChange={(event) => setInput(event.target.value)}
            />

            {ensAddress && address && (
                <div className="flex items-center gap-2">
                    {ensAvatar && (
                        <div className="size-4">
                            <img
                                src={ensAvatar}
                                alt="Avatar"
                                className="size-full rounded-full object-cover"
                            />
                        </div>
                    )}
                    <span>{address}</span>
                </div>
            )}

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
