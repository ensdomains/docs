'use client';

import { formatAddress } from '@ens-tools/format';
import clsx from 'clsx';
import { FC, useState } from 'react';
import { useDebounce } from 'use-debounce';

import { Button } from '@/components/Button';

import { useProfile } from './logic/useProfile';
import { Chains } from './parts/chains';
import { Records } from './parts/records';

export const NameLookupDemo: FC = () => {
    const [temporaryName, setTemporaryName] = useState('luc.eth');
    const [name] = useDebounce(temporaryName, 120);

    const { data, isLoading, error } = useProfile({ name });

    const isValidName = !isLoading && data && data['status'] === undefined;
    const isUnknownName =
        !isLoading && ((data && data['status'] == 404) || !data);
    const isOtherError = !isLoading && error && data['status'] !== 404;

    return (
        <div className="mx-auto space-y-2 p-4 text-ens-light-text-primary dark:text-ens-dark-text-primary">
            <div className="w-full">
                <input
                    className="input w-full rounded-md border border-ens-light-border pl-2 dark:border-ens-dark-border"
                    placeholder="Enter name or address..."
                    onChange={(event) => setTemporaryName(event.target.value)}
                    value={temporaryName}
                />
            </div>
            <div className="not-prose mt-2 flex h-fit flex-col gap-1.5 rounded-lg border border-ens-light-border p-4 dark:border-ens-dark-border">
                {isLoading && (
                    <div className="h-4 rounded-lg border border-ens-light-border bg-ens-light-background-secondary dark:border-ens-dark-border dark:bg-ens-dark-background-secondary">
                        <div
                            className={clsx(
                                'h-full rounded-lg bg-ens-light-blue-primary transition dark:bg-ens-dark-blue-primary',
                                temporaryName == name && 'load-width'
                            )}
                        ></div>
                    </div>
                )}
                <>
                    {isOtherError && <div>Error {JSON.stringify(error)}</div>}
                    {isUnknownName && (
                        <div>
                            <div>Unknown Name 🤷‍♀️</div>
                            <div className="flex gap-2">
                                Try{' '}
                                <ul>
                                    {['luc.eth', 'irc.eth', 'domico.eth'].map(
                                        (name) => (
                                            <li>
                                                <Button
                                                    variant="outline"
                                                    onClick={() => {
                                                        setTemporaryName(name);
                                                    }}
                                                >
                                                    <b>{name}</b>
                                                </Button>
                                            </li>
                                        )
                                    )}
                                </ul>
                            </div>
                        </div>
                    )}
                    {isValidName && (
                        <>
                            <div className="flex gap-2">
                                <div className="size-10 overflow-hidden rounded-full bg-ens-light-blue-100">
                                    {data?.avatar && (
                                        <img
                                            src={data.avatar}
                                            alt="Avatar"
                                            className="aspect-square w-full rounded-full"
                                        />
                                    )}
                                </div>
                                <div className="flex flex-col justify-center">
                                    <div className="font-bold leading-none">
                                        {data.name}
                                    </div>

                                    <div className="text-xs leading-none">
                                        {data?.address &&
                                            formatAddress(data.address)}
                                    </div>
                                </div>
                            </div>
                            <Records records={data?.records} />
                            <Chains chains={data?.chains} />
                        </>
                    )}
                </>
            </div>
        </div>
    );
};
