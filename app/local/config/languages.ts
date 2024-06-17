import { configureLanguages } from '#/content/prose/code/types/language';

export const LanguagePresets = configureLanguages({
    typescript: {
        icon: '/icons/libraries/typescript.png',
        name: 'Typescript',
        language: 'typescript',
        fallback: ['javascript'],
    },
    javascript: {
        icon: '/icons/libraries/javascript.png',
        name: 'Javascript',
        language: 'javascript',
        fallback: [],
    },
    'ethers-v5': {
        icon: '/icons/libraries/ethers.svg',
        language: 'typescript',
        name: 'Ethers.js v5',
        fallback: ['typescript', 'javascript'],
    },
    viem: {
        icon: '/icons/libraries/viem.svg',
        language: 'typescript',
        name: 'Viem',
        fallback: ['typescript', 'javascript'],
    },
    'ethers-rs': {
        icon: '/icons/libraries/rust.svg',
        name: 'Ethers.rs',
        language: 'rust',
    },
    'go-ens': {
        icon: '/icons/libraries/go.svg',
        name: 'Go',
        language: 'go',
    },
    'alchemy-sdk': {
        icon: '/icons/libraries/alchemy.svg',
        name: 'Alchemy SDK',
        language: 'typescript',
        fallback: ['typescript', 'javascript'],
    },
    react: {
        icon: '/icons/libraries/react.svg',
        name: 'React',
        language: 'typescript',
        fallback: ['typescript'],
    },
    wagmi: {
        icon: '/icons/libraries/wagmi.svg',
        name: 'Wagmi',
        language: 'typescript',
        fallback: ['enstools', 'react', 'viem', 'typescript', 'javascript'],
    },
    ensjs: {
        icon: '/icons/libraries/ensjs.svg',
        name: 'ENSjs v3',
        language: 'typescript',
        fallback: ['wagmi', 'react', 'viem', 'typescript', 'javascript'],
    },
    rainbowkit: {
        icon: '/icons/libraries/rainbow.svg',
        name: 'Rainbowkit',
        language: 'typescript',
        fallback: [
            'enstools',
            'wagmi',
            'react',
            'viem',
            'typescript',
            'javascript',
        ],
    },
    connectkit: {
        icon: '/icons/libraries/family.svg',
        name: 'Connectkit',
        language: 'typescript',
        fallback: [
            'enstools',
            'wagmi',
            'react',
            'viem',
            'typescript',
            'javascript',
        ],
    },
    enstools: {
        icon: '/icons/libraries/family.svg',
        name: 'ENS Tools',
        language: 'typescript',
        fallback: ['wagmi', 'react', 'viem', 'typescript', 'javascript'],
    },
    web3py: {
        icon: '',
        name: 'web3.py',
        language: 'python',
        fallback: [],
    },
    solidity: {
        icon: '/icons/libraries/solidity.svg',
        name: 'Solidity',
        language: 'solidity',
        fallback: [],
    },
    nethereum: {
        icon: '/icons/libraries/nethereum.svg',
        name: 'Nethereum',
        language: 'csharp',
        fallback: [],
    },
});

export type languages = keyof typeof LanguagePresets;
