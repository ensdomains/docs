/* eslint-disable sonarjs/no-duplicate-string */

type ResolverMethod = {
    name: string;
    interface: string;
    usage: string;
    seeMore: string;
    output?: string;
    event?: string;
};

export const PUBLIC_RESOLVER_SUPPORTS = [
    //     'addr',
    //     'addr.reverse',
    //     'contenthash',
    //     'contenthash.set',
    //     'multicoin',
    //     'multicoin.set',
    //     'text',
    //     'text.set',
    //     'ABI',
    //     'ABI.set',
    //     'pubkey',
    //     'pubkey.set',
    //     'name',
    //     'name.set',
    //     'multicall',
];

export const resolver_methods: ResolverMethod[] = [
    {
        name: 'addr(bytes32 node) view returns (address)',
        interface: '0x3b3b57de',
        usage: 'Read Ethereum Address',
        seeMore: 'ENSIP-1 / EIP-137',
        output: 'Ethereum address or the zero address if no address is set.',
    },
    {
        name: 'addr(bytes32 node, uint coinType) view returns (byte memory)',
        interface: '0xf1cb7e06',
        usage: 'Read Multicoin Address',
        seeMore:
            'ENSIP-9 / [EIP-2304](https://eips.ethereum.org/EIPS/eip-2304)',
        output: 'Cryptocurrency address in its native binary format. For example, the Bitcoin address `1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa` base58check decodes to the 21 bytes `0062e907b15cbf27d5425399ebf6f0fb50ebb88f18` then scriptPubkey encodes to 25 bytes `76a91462e907b15cbf27d5425399ebf6f0fb50ebb88f1888ac` whereas the BNB address `bnb1grpf0955h0ykzq3ar5nmum7y6gdfl6lxfn46h2` Bech32 decodes to the binary representation `40c2979694bbc961023d1d27be6fc4d21a9febe6`. A zero-length string ("") will be returned if the specified coin type is not set.',
    },
    {
        name: 'contenthash(bytes32 node) view returns (bytes memory)',
        interface: '0xbc1c58d1',
        usage: 'Read Content Hash',
        seeMore: 'ENSIP-7 / EIP-1577',
    },
    {
        name: 'text(bytes32 node, string key) view returns (string memory)',
        interface: '0x59d1d43c',
        usage: 'Read Text Record',
        seeMore: 'ENSIP-5 / EIP-634',
        output: 'The value of the text record associated with key, or the empty string if no such record exists.',
    },
    {
        name: 'ABI(bytes32 node, uint256 contentTypes) view returns (uint256, bytes memory)',
        interface: '0x2203ab56',
        usage: 'Read Contract ABI',
        seeMore: 'ENSIP-4 / EIP-205',
        output: 'ABI returns a two-tuple of the content type ID and the ABI data. If no data of the appropriate content type ID was found, 0 is returned for the content type ID, and the ABI data will be the empty string.',
    },
    {
        name: 'pubkey(bytes32 node) view returns (bytes32 x, bytes32 y)',
        interface: '0xc8690233',
        usage: 'Read Public Key',
        seeMore: 'ENSIP- / EIP-619',
        output: 'The ECDSA SECP256k1 public key for node, as a 2-tuple (x, y). If no public key is set, (0, 0) is returned.',
    },
    {
        name: 'name(bytes32 node) view returns (string memory)',
        interface: '0x691f3431',
        usage: 'Read Name (for reverse records)',
        seeMore: 'Implemented by Public Resolver',
    },
    {
        name: 'setAddr(bytes32 node, address addr)',
        interface: '0x3b3b57de',
        usage: 'Write Ethereum Adress',
        seeMore: 'Implemented by Public Resolver',
        event: 'event AddrChanged(bytes32 indexed node, address a);',
    },
    {
        name: 'setAddr(bytes32 node, uint coinType, bytes calldata a)',
        interface: '0x8b95dd71',
        usage: 'Set Multicoin Address',
        seeMore: 'Implemented by Public Resolver',
        event: 'event AddressChanged(bytes32 indexed node, uint coinType, bytes newAddress);',
    },
    {
        name: 'setContenthash(bytes32 node, bytes calldata hash)',
        interface: '0x304e6ade',
        usage: 'Write Content Hash',
        seeMore: 'Implemented by Public Resolver',
        event: 'event ContenthashChanged(bytes32 indexed node, bytes hash);',
    },
    {
        name: 'setText(bytes32 node, string calldata key, string calldata value)',
        interface: '0xa4d3fbb2',
        usage: 'Write Text Record',
        seeMore: 'Implemented by Public Resolver',
        event: 'event TextChanged(bytes32 indexed node, string indexed indexedKey, string key);',
    },
    {
        name: 'setABI(bytes32 node, uint256 contentType, bytes calldata data)',
        interface: '0x623195b0',
        usage: 'Write Contract ABI',
        seeMore: 'Implemented by Public Resolver',
        event: 'event ABIChanged(bytes32 indexed node, uint256 indexed contentType);',
    },
    {
        name: 'setPubkey(bytes32 node, bytes32 x, bytes32 y)',
        interface: '0x29cd62ea',
        usage: 'Write Public Key',
        seeMore: 'Implemented by Public Resolver',
        event: 'event PubkeyChanged(bytes32 indexed node, bytes32 x, bytes32 y);',
    },
    {
        name: 'setName(bytes32 node, string calldata name)',
        interface: '0x77372213',
        usage: 'Write Name (for reverse records)',
        seeMore: 'Implemented by Public Resolver',
        event: 'event NameChanged(bytes32 indexed node, string name);',
    },
    {
        name: 'multicall(bytes[] calldata data) view returns (bytes[] memory results)',
        interface: '0xac9650d8',
        usage: 'Batch Read/Write',
        seeMore: 'Implemented by Public Resolver',
    },
];
