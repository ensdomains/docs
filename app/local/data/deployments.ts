/* eslint-disable sonarjs/no-duplicate-string */
import { goerli, holesky, mainnet, sepolia } from 'viem/chains';

import { DeploymentData } from '@/content/extras/deployments/deployment';

type Deployment = {
    name: string;
    slug: string;
    id: number;
    contracts: DeploymentData[];
};

export const DEPLOYMENTS: Deployment[] = [
    {
        name: 'Mainnet',
        slug: 'mainnet',
        id: mainnet.id,
        contracts: [
            {
                name: 'Registry',
                path: 'ENSRegistry',
            },
            {
                name: 'Base Registrar',
                path: 'BaseRegistrarImplementation',
            },
            {
                name: 'ETH Registrar Controller',
                path: 'ETHRegistrarController',
            },
            {
                name: 'DNS Registrar',
                path: 'DNSRegistrar',
            },
            {
                name: 'Reverse Registrar',
                path: 'ReverseRegistrar',
            },
            {
                name: 'Name Wrapper',
                path: 'NameWrapper',
            },
            {
                name: 'Public Resolver',
                path: 'PublicResolver',
            },
        ],
    },
    {
        name: 'Goerli',
        slug: 'goerli',
        id: goerli.id,
        contracts: [
            {
                name: 'Registry',
                path: 'ENSRegistry',
            },
            {
                name: 'Base Registrar',
                path: 'BaseRegistrarImplementation',
            },
            {
                name: 'ETH Registrar Controller',
                path: 'ETHRegistrarController',
            },
            {
                name: 'DNS Registrar',
                path: 'DNSRegistrar',
            },
            {
                name: 'Reverse Registrar',
                path: 'ReverseRegistrar',
            },
            {
                name: 'Name Wrapper',
                path: 'NameWrapper',
            },
            {
                name: 'Public Resolver',
                path: 'PublicResolver',
            },
        ],
    },
    {
        name: 'Sepolia',
        slug: 'sepolia',
        id: sepolia.id,
        contracts: [
            {
                name: 'Registry',
                path: 'ENSRegistry',
            },
            {
                name: 'Base Registrar',
                path: 'BaseRegistrarImplementation',
            },
            {
                name: 'ETH Registrar Controller',
                path: 'ETHRegistrarController',
            },
            {
                name: 'DNS Registrar',
                path: 'DNSRegistrar',
            },
            {
                name: 'Reverse Registrar',
                path: 'ReverseRegistrar',
            },
            {
                name: 'Name Wrapper',
                path: 'NameWrapper',
            },
            {
                name: 'Public Resolver',
                path: 'PublicResolver',
            },
        ],
    },
    {
        name: 'Holesky',
        slug: 'holesky',
        id: holesky.id,
        contracts: [
            {
                name: 'Registry',
                path: 'ENSRegistry',
            },
            {
                name: 'Base Registrar',
                path: 'BaseRegistrarImplementation',
            },
            {
                name: 'ETH Registrar Controller',
                path: 'ETHRegistrarController',
            },
            {
                name: 'DNS Registrar',
                path: 'DNSRegistrar',
            },
            {
                name: 'Reverse Registrar',
                path: 'ReverseRegistrar',
            },
            {
                name: 'Name Wrapper',
                path: 'NameWrapper',
            },
            {
                name: 'Public Resolver',
                path: 'PublicResolver',
            },
        ],
    },
];
