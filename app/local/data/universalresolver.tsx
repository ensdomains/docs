/* eslint-disable sonarjs/no-duplicate-string */
import { ContractMethod } from './interfaces';

export const universalresolver_methods: ContractMethod[] = [
    {
        name: 'supportsInterface(bytes4 interfaceID) external pure returns (bool)',
        interface: '0x01ffc9a7',
        usage: 'Check Interface Support',
        seeMore: 'EIP-165',
        input: [
            {
                name: 'interfaceID',
                type: 'bytes4',
                description:
                    'The interface identifier, as specified in ERC-165',
            },
        ],
        output: [
            {
                type: 'bool',
                description:
                    'True if the contract supports the specified interface.',
            },
        ],
    },
    {
        name: 'resolve(bytes calldata name, bytes memory data) external view returns (bytes memory, address)',
        interface: '0x9061b923',
        usage: 'Resolve Name',
        seeMore: 'ENSIP-10',
        input: [
            {
                name: 'name',
                type: 'bytes',
                description:
                    'The name to resolve, in normalised and DNS-encoded form.',
            },
            {
                name: 'data',
                type: 'bytes',
                description: 'The resolution data, as specified in ENSIP-10.',
            },
        ],
        output: [
            {
                type: 'bytes',
                description: 'The return data of the resolver call.',
            },
            {
                type: 'address',
                description: 'The address of the resolver contract.',
            },
        ],
    },
    {
        name: 'resolve(bytes calldata name, bytes memory data, string[] memory gateways) external view returns (bytes memory, address)',
        interface: '0x0667cfea',
        usage: 'Resolve Name (with custom gateways)',
        seeMore: 'ENSIP-10',
        input: [
            {
                name: 'name',
                type: 'bytes',
                description:
                    'The name to resolve, in normalised and DNS-encoded form.',
            },
            {
                name: 'data',
                type: 'bytes',
                description: 'The resolution data, as specified in ENSIP-10.',
            },
            {
                name: 'gateways',
                type: 'string[]',
                description: 'An array of custom CCIP Read gateway URLs.',
            },
        ],
        output: [
            {
                type: 'bytes',
                description: 'The return data of the resolver call.',
            },
            {
                type: 'address',
                description: 'The address of the resolver contract.',
            },
        ],
    },
    {
        name: 'resolve(bytes calldata name, bytes[] memory data) external view returns (Result[] memory, address)',
        interface: '0x206c74c9',
        usage: 'Resolve Name (multiple records)',
        seeMore: 'ENSIP-10',
        input: [
            {
                name: 'name',
                type: 'bytes',
                description:
                    'The name to resolve, in normalised and DNS-encoded form.',
            },
            {
                name: 'data',
                type: 'bytes[]',
                description: 'The resolution data, as specified in ENSIP-10.',
            },
        ],
        output: [
            {
                type: 'Result[]',
                description:
                    'The return data of the resolver call. This is a struct with: [bool success, bytes returnData]',
            },
            {
                type: 'address',
                description: 'The address of the resolver contract.',
            },
        ],
    },
    {
        name: 'resolve(bytes calldata name, bytes[] memory data, string[] memory gateways) public view returns (Result[] memory, address)',
        interface: '0x76286c00',
        usage: 'Resolve Name (multiple records with custom gateways)',
        seeMore: 'ENSIP-10',
        input: [
            {
                name: 'name',
                type: 'bytes',
                description:
                    'The name to resolve, in normalised and DNS-encoded form.',
            },
            {
                name: 'data',
                type: 'bytes[]',
                description: 'The resolution data, as specified in ENSIP-10.',
            },
            {
                name: 'gateways',
                type: 'string[]',
                description: 'An array of custom CCIP Read gateway URLs.',
            },
        ],
        output: [
            {
                type: 'Result[]',
                description:
                    'The return data of the resolver call. This is a struct with: [bool success, bytes returnData]',
            },
            {
                type: 'address',
                description: 'The address of the resolver contract.',
            },
        ],
    },
    {
        name: 'reverse(bytes calldata reverseName) external view returns (string memory, address, address, address)',
        interface: '0xec11c823',
        usage: 'Resolve Reverse Name',
        seeMore: '',
        input: [
            {
                name: 'reverseName',
                type: 'bytes',
                description:
                    'The reverse name to resolve, in normalised and DNS-encoded form.',
            },
        ],
        output: [
            {
                type: 'string',
                description: 'The resolved name.',
            },
            {
                type: 'address',
                description: 'The resolved address.',
            },
            {
                type: 'address',
                description: 'The reverse resolver address.',
            },
            {
                type: 'address',
                description: 'The resolver address.',
            },
        ],
    },
    {
        name: 'reverse(bytes calldata reverseName, string[] memory gateways) public view returns (string memory, address, address, address)',
        interface: '0xb241d0d3',
        usage: 'Resolve Reverse Name (with custom gateways)',
        seeMore: '',
        input: [
            {
                name: 'reverseName',
                type: 'bytes',
                description:
                    'The reverse name to resolve, in normalised and DNS-encoded form.',
            },
            {
                name: 'gateways',
                type: 'string[]',
                description: 'An array of custom CCIP Read gateway URLs.',
            },
        ],
        output: [
            {
                type: 'string',
                description: 'The resolved name.',
            },
            {
                type: 'address',
                description: 'The resolved address.',
            },
            {
                type: 'address',
                description: 'The reverse resolver address.',
            },
            {
                type: 'address',
                description: 'The resolver address.',
            },
        ],
    },
    {
        name: 'findResolver(bytes calldata name) public view returns (Resolver, bytes32, uint256)',
        interface: '0xa1cbcbaf',
        usage: 'Find Resolver',
        seeMore:
            'Finds a resolver by recursively querying the registry, starting at the longest name and progressively removing labels until it finds a result.',
        input: [
            {
                name: 'name',
                type: 'bytes',
                description:
                    'The name to resolve, in DNS-encoded and normalised form.',
            },
        ],
        output: [
            {
                type: 'address',
                description: 'The Resolver responsible for this name.',
            },
            {
                type: 'bytes32',
                description: 'The namehash of the full name.',
            },
            {
                type: 'uint256',
                description: 'The offset of the first label with a resolver.',
            },
        ],
    },
];
