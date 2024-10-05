import { FC } from 'react';
import { FiX } from 'react-icons/fi';
import { formatEther } from 'viem';
import { useEstimateGas, useSimulateContract, useWriteContract } from 'wagmi';

import { Button } from '@/components/Button';

import { EthCall } from '../../call/EthCall';
import { ETHRegistrarABI } from '../ETHRegistryABI';

export const RegisterName: FC<{
    name: string;
    duration: number;
    owner: string;
    secret: string;
    resolver: string;
    rentPrice: bigint;
}> = ({ name, duration, owner, secret, resolver, rentPrice }) => {
    const isReady =
        name && duration && owner && secret && resolver && rentPrice > 0;

    const config = {
        abi: ETHRegistrarABI,
        to: '0xcc5e7db10e65eed1bbd105359e7268aa660f6734',
        functionName: 'register',
        args: [name, owner, duration, secret, resolver, [], false, 0],
        value: rentPrice,
        enabled: isReady,
    };

    const { data: registerCallResult, writeContract } = useWriteContract({});
    const { data, isError } = useSimulateContract(config);
    const { data: gas } = useEstimateGas(config);

    const rentPriceFormatted = formatEther(rentPrice || BigInt(0));

    return (
        <div>
            <EthCall
                type="transaction"
                description="Register the name."
                call={
                    <div>
                        <span className="text-ens-light-blue-primary">
                            ETHRegistrarController
                        </span>
                        .register(
                        <span className="text-ens-light-pink-primary">
                            "{name}"
                        </span>
                        ,{' '}
                        <span className="text-ens-light-purple-primary">
                            {owner}
                        </span>
                        ,
                        <span className="text-ens-light-orange-primary">
                            {duration}
                        </span>
                        ,
                        <span className="text-ens-light-pink-primary">
                            {secret}
                        </span>
                        ,
                        <span className="text-ens-light-indigo-primary">
                            {resolver}
                        </span>
                        , [], false, 0 )
                    </div>
                }
                gas={gas?.toString()}
            >
                <div className="flex w-full items-center justify-end gap-4">
                    <div>{gas?.toString()} gas</div>
                    <div>{rentPriceFormatted} eth</div>
                    <Button
                        onClick={() => {
                            writeContract({
                                ...(config as any),
                            } as any);
                        }}
                        variant="primary"
                    >
                        Register
                    </Button>
                </div>
                {!isReady && (
                    <div className="border-ens-light-red-primary bg-ens-light-red-surface text-ens-light-red-primary dark:border-ens-dark-red-primary dark:bg-ens-dark-red-surface flex items-center gap-1 rounded-lg px-3 py-2">
                        <FiX />
                        Not Ready
                    </div>
                )}
                {isError && (
                    <div className="border-ens-light-red-primary bg-ens-light-red-surface text-ens-light-red-primary dark:border-ens-dark-red-primary dark:bg-ens-dark-red-surface flex items-center gap-1 rounded-lg px-3 py-2">
                        <FiX />
                        Problem
                    </div>
                )}
            </EthCall>
        </div>
    );
};
