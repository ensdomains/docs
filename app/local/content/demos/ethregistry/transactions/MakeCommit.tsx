'use client';

import { FC } from 'react';
import { FiX } from 'react-icons/fi';
import { useEstimateGas, useWriteContract } from 'wagmi';

import { Button } from '@/components/Button';

import { EthCall } from '../../call/EthCall';
import { ETHRegistrarABI } from '../ETHRegistryABI';

export const MakeCommit: FC<{ commithash: string }> = ({ commithash }) => {
    const config = {
        abi: ETHRegistrarABI,
        to: '0xcc5e7db10e65eed1bbd105359e7268aa660f6734',
        functionName: 'commit',
        args: [commithash],
        enabled: !!commithash,
    };

    const { data: gas, isError } = useEstimateGas(config);

    const { writeContract } = useWriteContract({});

    return (
        <div>
            <EthCall
                type="transaction"
                gas={gas?.toString()}
                description="This checks if the name is available."
                call={
                    <div>
                        <span className="text-ens-light-blue-primary">
                            ETHRegistrarController
                        </span>
                        .commit(
                        <span className="text-ens-light-pink-primary">
                            "{commithash}"
                        </span>
                        )
                    </div>
                }
            >
                <div className="flex w-full items-center justify-end gap-4">
                    <div>{gas?.toString()} gas</div>
                    <Button
                        onClick={() => {
                            writeContract({
                                ...(config as any),
                            } as any);
                        }}
                        variant="primary"
                    >
                        Commit
                    </Button>
                </div>
                {isError && (
                    <div className="flex items-center gap-1 rounded-lg border-ens-light-red-primary bg-ens-light-red-surface px-3 py-2 text-ens-light-red-primary dark:border-ens-dark-red-primary dark:bg-ens-dark-red-surface">
                        <FiX />
                        Problem
                    </div>
                )}
            </EthCall>
        </div>
    );
};
