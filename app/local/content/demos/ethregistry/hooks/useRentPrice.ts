import { mainnet, sepolia } from 'viem/chains';
import { useChainId, useReadContract } from 'wagmi';

import { ETHRegistrarABI } from '../ETHRegistryABI';

const deployments = {
    [mainnet.id]: '0x253553366Da8546fC250F225fe3d25d0C782303b',
    [sepolia.id]: '0xFED6a969AaA60E4961FCD3EBF1A2e8913ac65B72',
};

export const useRentPrice = (name: string, duration: number) => {
    const chainId = useChainId();

    const { data, isLoading } = useReadContract({
        address: deployments[chainId] as `0x${string}`,
        abi: ETHRegistrarABI,
        functionName: 'rentPrice',
        args: [name, duration],
        // enabled: !!name && name.length >= 3 && !!duration && duration > 0,
        chainId,
    });

    return {
        rentPrice: data as { base: bigint; premium: bigint },
        isLoadingRentPrice: isLoading,
    };
};
