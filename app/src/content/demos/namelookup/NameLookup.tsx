'use client';

import { formatAddress } from '@ens-tools/format';
import { FC, useState } from 'react';
import { BiLoaderAlt } from 'react-icons/bi';
import { useDebounce } from 'use-debounce';

import { useProfile } from './logic/useProfile';
import { Chains } from './parts/chains';
import { Records } from './parts/records';

export const NameLookupDemo: FC = () => {
    const [temporaryName, setTemporaryName] = useState('luc.eth');
    const [name] = useDebounce(temporaryName, 120);

    const { data, isLoading, error } = useProfile({ name });

    return (
        <div className="mx-auto flex gap-2 p-4 text-ens-light-text-primary dark:text-ens-dark-text-primary">
            <div className="max-w-xs">
                <div>Find user</div>
                <input
                    className="w-full rounded-md border border-ens-light-border pl-2 dark:border-ens-dark-border"
                    placeholder="luc.eth"
                    onChange={(event) => setTemporaryName(event.target.value)}
                    value={temporaryName}
                />
            </div>
            <div className="mt-2 flex h-fit flex-col gap-1.5 rounded-lg border border-ens-light-border p-4 dark:border-ens-dark-border">
                {isLoading && <BiLoaderAlt className="animate-spin" />}
                {!isLoading && (
                    <>
                        {error && <div>Error {JSON.stringify(error)}</div>}
                        {!data && (
                            <div>
                                <div>Unknown Name 🤷‍♀️</div>
                                <div>
                                    Try <b>luc.eth</b>
                                </div>
                            </div>
                        )}
                        {data && (
                            <>
                                <div className="flex gap-2">
                                    <div className="size-8 overflow-hidden rounded-full bg-ens-light-blue-100">
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
                )}
            </div>
        </div>
    );
};
