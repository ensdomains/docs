/* eslint-disable sonarjs/no-duplicate-string */
import { holesky, mainnet, sepolia } from 'viem/chains';

import { DeploymentData } from '#/content/extras/deployments/deployment';

export type Deployment = {
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
                srcPath: 'contracts/registry/ENSRegistry.sol',
            },
            {
                name: 'Base Registrar',
                path: 'BaseRegistrarImplementation',
                srcPath:
                    'contracts/ethregistrar/BaseRegistrarImplementation.sol',
            },
            {
                name: 'ETH Registrar Controller',
                path: 'ETHRegistrarController',
                srcPath: 'contracts/ethregistrar/ETHRegistrarController.sol',
            },
            {
                name: 'DNS Registrar',
                path: 'DNSRegistrar',
                srcPath: 'contracts/dnsregistrar/DNSRegistrar.sol',
            },
            {
                name: 'Reverse Registrar',
                path: 'ReverseRegistrar',
                srcPath: 'contracts/reverseRegistrar/ReverseRegistrar.sol',
            },
            {
                name: 'Name Wrapper',
                path: 'NameWrapper',
                srcPath: 'contracts/wrapper/NameWrapper.sol',
            },
            {
                name: 'Public Resolver',
                path: 'PublicResolver',
                srcPath: 'contracts/resolvers/PublicResolver.sol',
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
                srcPath: 'contracts/registry/ENSRegistry.sol',
            },
            {
                name: 'Base Registrar',
                path: 'BaseRegistrarImplementation',
                srcPath:
                    'contracts/ethregistrar/BaseRegistrarImplementation.sol',
            },
            {
                name: 'ETH Registrar Controller',
                path: 'ETHRegistrarController',
                srcPath: 'contracts/ethregistrar/ETHRegistrarController.sol',
            },
            {
                name: 'DNS Registrar',
                path: 'DNSRegistrar',
                srcPath: 'contracts/dnsregistrar/DNSRegistrar.sol',
            },
            {
                name: 'Reverse Registrar',
                path: 'ReverseRegistrar',
                srcPath: 'contracts/reverseRegistrar/ReverseRegistrar.sol',
            },
            {
                name: 'Name Wrapper',
                path: 'NameWrapper',
                srcPath: 'contracts/wrapper/NameWrapper.sol',
            },
            {
                name: 'Public Resolver',
                path: 'PublicResolver',
                srcPath: 'contracts/resolvers/PublicResolver.sol',
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
                srcPath: 'contracts/registry/ENSRegistry.sol',
            },
            {
                name: 'Base Registrar',
                path: 'BaseRegistrarImplementation',
                srcPath:
                    'contracts/ethregistrar/BaseRegistrarImplementation.sol',
            },
            {
                name: 'ETH Registrar Controller',
                path: 'ETHRegistrarController',
                srcPath: 'contracts/ethregistrar/ETHRegistrarController.sol',
            },
            {
                name: 'DNS Registrar',
                path: 'DNSRegistrar',
                srcPath: 'contracts/dnsregistrar/DNSRegistrar.sol',
            },
            {
                name: 'Reverse Registrar',
                path: 'ReverseRegistrar',
                srcPath: 'contracts/reverseRegistrar/ReverseRegistrar.sol',
            },
            {
                name: 'Name Wrapper',
                path: 'NameWrapper',
                srcPath: 'contracts/wrapper/NameWrapper.sol',
            },
            {
                name: 'Public Resolver',
                path: 'PublicResolver',
                srcPath: 'contracts/resolvers/PublicResolver.sol',
            },
        ],
    },
];
