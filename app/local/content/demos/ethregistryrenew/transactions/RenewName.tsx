import { FC } from 'react';
import { FiX } from 'react-icons/fi';
import { formatEther } from 'viem';
import {
    useAccount,
    useEstimateGas,
    useSimulateContract,
    useWriteContract,
} from 'wagmi';

import { Button } from '@/components/Button';

import { EthCall } from '../../call/EthCall';
import { ETHRegistrarABI } from '../../ethregistry/ETHRegistryABI';

export const RenewName: FC<{
    name: string;
    duration: number;
    rentPrice: bigint;
}> = ({ name, duration, rentPrice }) => {
    const isReady = name && duration && rentPrice > 0;

    const { address } = useAccount();

    const { writeContract, isError: _isUserDecline } = useWriteContract();

    const config = {
        abi: ETHRegistrarABI,
        from: address,
        to: '0xcc5e7db10e65eed1bbd105359e7268aa660f6734',
        functionName: 'renew',
        args: [name, duration],
        value: rentPrice,
        enabled: isReady,
    };

    const { data: gas2, isError } = useSimulateContract(config);
    const { data: gas } = useEstimateGas(config);

    console.log({ gas, gas2 });

    const rentPriceFormatted = formatEther(rentPrice || BigInt(0));

    return (
        <div>
            <EthCall
                type="transaction"
                gas={gas?.toString()}
                description="Renew the name."
                call={
                    <div>
                        <span className="text-ens-light-blue-primary">
                            ETHRegistrarController
                        </span>
                        .renew(
                        <span className="text-ens-light-pink-primary">
                            "{name}"
                        </span>
                        ,{' '}
                        <span className="text-ens-light-orange-primary">
                            {duration}
                        </span>
                        )
                    </div>
                }
            >
                <div className="flex w-full items-center justify-end gap-4">
                    <div>{gas?.toString()} gas</div>
                    <div>{rentPriceFormatted} eth</div>
                    <Button
                        onClick={() => {
                            writeContract(config as any);
                        }}
                        variant="primary"
                    >
                        Renew
                    </Button>
                </div>
                {!isReady && (
                    <div className="flex items-center gap-1 rounded-lg border-ens-light-red-primary bg-ens-light-red-surface px-3 py-2 text-ens-light-red-primary dark:border-ens-dark-red-primary dark:bg-ens-dark-red-surface">
                        <FiX />
                        Not Ready
                    </div>
                )}
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
