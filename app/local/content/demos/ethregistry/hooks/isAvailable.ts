import { goerli, mainnet, sepolia } from 'viem/chains';
import { useChainId, useReadContract } from 'wagmi';

import { ETHRegistrarABI } from '../ETHRegistryABI';

const deployments = {
    [goerli.id]: '0xCc5e7dB10E65EED1BBD105359e7268aa660f6734',
    [mainnet.id]: '0x253553366Da8546fC250F225fe3d25d0C782303b',
    [sepolia.id]: '0xFED6a969AaA60E4961FCD3EBF1A2e8913ac65B72',
};

export const useIsAvailable = (name: string) => {
    const chainId = useChainId();

    const { data, isLoading } = useReadContract({
        address: deployments[chainId] as `0x${string}`,
        abi: ETHRegistrarABI,
        functionName: 'available',
        args: [name],
        // enabled: !!name && name.length >= 3,
        chainId,
    });

    return {
        isAvailable: data as boolean,
        isLoadingAvailability: isLoading,
    };
};
