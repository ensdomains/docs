import { holesky, mainnet, sepolia } from 'viem/chains';

type BlockchainExplorer = {
    name: string;
    contract_url?: string;
    account_url?: string;
    name_url?: string;
};

export const BLOCKCHAIN_EXPLORERS: Record<number, BlockchainExplorer[]> = {
    [mainnet.id]: [
        {
            name: 'Etherscan',
            account_url: 'https://etherscan.io/address/%ADDRESS%',
            contract_url: 'https://etherscan.io/address/%ADDRESS%',
            name_url: 'https://etherscan.io/name-lookup-search?id=%NAME%',
        },
    ],
    [sepolia.id]: [
        {
            name: 'Etherscan',
            account_url: 'https://sepolia.etherscan.io/address/%ADDRESS%',
            contract_url: 'https://sepolia.etherscan.io/address/%ADDRESS%',
            name_url:
                'https://sepolia.etherscan.io/name-lookup-search?id=%NAME%',
        },
    ],
    [holesky.id]: [
        {
            name: 'Etherscan',
            account_url: 'https://holesky.etherscan.io/address/%ADDRESS%',
            contract_url: 'https://holesky.etherscan.io/address/%ADDRESS%',
            name_url:
                'https://holesky.etherscan.io/name-lookup-search?id=%NAME%',
        },
    ],
};
