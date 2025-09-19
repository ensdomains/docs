import { ContractMethod } from '../components/InterfaceDetails'
import { A, Code, CodeBlock, LI, P, UL } from '../components/ui/Typography'

export const resolver_methods: ContractMethod[] = [
  {
    name: 'supportsInterface(bytes4 interfaceID) external pure returns (bool)',
    interface: '0x01ffc9a7',
    usage: 'Check Interface Support',
    seeMore: 'EIP-165',
    input: [
      {
        name: 'interfaceID',
        type: 'bytes4',
        description: 'The interface identifier, as specified in ERC-165',
      },
    ],
    output: [
      {
        type: 'bool',
        description: 'True if the contract supports the specified interface.',
      },
    ],
  },
  {
    name: 'addr(bytes32 node) view returns (address)',
    interface: '0x3b3b57de',
    usage: 'Read Ethereum Address',
    seeMore: 'ENSIP-1 / EIP-137',
    input: [
      {
        name: 'node',
        type: 'bytes32',
        description: 'The ENS node to query.',
      },
    ],
    output: [
      {
        type: 'address',
        description:
          'Ethereum address or the zero address if no address is set.',
      },
    ],
  },
  {
    name: 'addr(bytes32 node, uint coinType) view returns (bytes memory)',
    interface: '0xf1cb7e06',
    usage: 'Read Multicoin Address',
    seeMore: 'ENSIP-9 / EIP-2304',
    input: [
      {
        name: 'node',
        type: 'bytes32',
        description: 'The ENS node to query.',
      },
      {
        name: 'coinType',
        type: 'uint',
        description: 'The ENSIP-9 coin type to query.',
      },
    ],
    output: [
      {
        type: 'bytes',
        description:
          'Cryptocurrency address in its native binary format. For example, the Bitcoin address `1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa` base58check decodes to the 21 bytes `0062e907b15cbf27d5425399ebf6f0fb50ebb88f18` then scriptPubkey encodes to 25 bytes `76a91462e907b15cbf27d5425399ebf6f0fb50ebb88f1888ac` whereas the BNB address `bnb1grpf0955h0ykzq3ar5nmum7y6gdfl6lxfn46h2` Bech32 decodes to the binary representation `40c2979694bbc961023d1d27be6fc4d21a9febe6`. A zero-length string ("") will be returned if the specified coin type is not set.',
      },
    ],
  },
  {
    name: 'contenthash(bytes32 node) view returns (bytes memory)',
    interface: '0xbc1c58d1',
    usage: 'Read Content Hash',
    seeMore: 'ENSIP-7 / EIP-1577',
    input: [
      {
        name: 'node',
        type: 'bytes32',
        description: 'The ENS node to query.',
      },
    ],
    output: [
      {
        type: 'bytes',
        description:
          'The contenthash set for the name, encoded in binary format.',
      },
    ],
  },
  {
    name: 'text(bytes32 node, string key) view returns (string memory)',
    interface: '0x59d1d43c',
    usage: 'Read Text Record',
    seeMore: 'ENSIP-5 / EIP-634',
    input: [
      {
        name: 'node',
        type: 'bytes32',
        description: 'The ENS node to query.',
      },
      {
        name: 'key',
        type: 'string',
        description: 'The text data key to query.',
      },
    ],
    output: [
      {
        type: 'string',
        description:
          'The value of the text record associated with key, or the empty string if no such record exists.',
      },
    ],
  },
  {
    name: 'ABI(bytes32 node, uint256 contentTypes) view returns (uint256, bytes memory)',
    interface: '0x2203ab56',
    usage: 'Read Contract ABI',
    seeMore: 'ENSIP-4 / EIP-205',
    input: [
      {
        name: 'node',
        type: 'bytes32',
        description: 'The ENS node to query.',
      },
      {
        name: 'contentTypes',
        type: 'uint256',
        description: 'A bitwise OR of the ABI formats accepted by the caller.',
      },
    ],
    output: [
      {
        type: '(uint256, bytes)',
        description:
          'ABI returns a two-tuple of the content type ID and the ABI data. If no data of the appropriate content type ID was found, 0 is returned for the content type ID, and the ABI data will be the empty string.',
      },
    ],
  },
  {
    name: 'pubkey(bytes32 node) view returns (bytes32 x, bytes32 y)',
    interface: '0xc8690233',
    usage: 'Read Public Key',
    seeMore: '',
    input: [
      {
        name: 'node',
        type: 'bytes32',
        description: 'The ENS node to query.',
      },
    ],
    output: [
      {
        type: '(bytes32, bytes32)',
        description:
          'The ECDSA SECP256k1 public key for node, as a 2-tuple (x, y). If no public key is set, (0, 0) is returned.',
      },
    ],
  },
  {
    name: 'name(bytes32 node) view returns (string memory)',
    interface: '0x691f3431',
    usage: 'Read Name (for reverse records)',
    seeMore: 'Implemented by Public Resolver',
    input: [
      {
        name: 'node',
        type: 'bytes32',
        description: 'The ENS node to query.',
      },
    ],
    output: [
      {
        type: 'string',
        description: 'The associated name.',
      },
    ],
  },
  {
    name: 'resolve(bytes memory name, bytes memory data) view returns (bytes memory)',
    interface: '0x9061b923',
    usage: 'Wildcard Resolution',
    seeMore: 'ENSIP-10',
    input: [
      { name: 'name', type: 'bytes', description: 'DNS-encoded name' },
      {
        name: 'data',
        type: 'bytes',
        description:
          'Encoded function data for other resolver calls like addr(), text(), etc.',
      },
    ],
  },
  {
    name: 'setAddr(bytes32 node, address a)',
    interface: '0xd5fa2b00',
    usage: 'Write Ethereum Address',
    seeMore: 'Implemented by Public Resolver',
    input: [
      {
        name: 'node',
        type: 'bytes32',
        description: 'The ENS node to update.',
      },
      {
        name: 'a',
        type: 'address',
        description: 'The Ethereum address to set.',
      },
    ],
    events: ['event AddrChanged(bytes32 indexed node, address a);'],
  },
  {
    name: 'setAddr(bytes32 node, uint256 coinType, bytes calldata a)',
    interface: '0x8b95dd71',
    usage: 'Set Multicoin Address',
    seeMore: 'Implemented by Public Resolver',
    input: [
      {
        name: 'node',
        type: 'bytes32',
        description: 'The ENS node to update.',
      },
      {
        name: 'coinType',
        type: 'uint256',
        description: 'The ENSIP-9 coin type to update.',
      },
      {
        name: 'a',
        type: 'bytes',
        description: 'The address to set.',
      },
    ],
    events: [
      'event AddressChanged(bytes32 indexed node, uint coinType, bytes newAddress);',
    ],
  },
  {
    name: 'setContenthash(bytes32 node, bytes calldata hash)',
    interface: '0x304e6ade',
    usage: 'Write Content Hash',
    seeMore: 'Implemented by Public Resolver',
    input: [
      {
        name: 'node',
        type: 'bytes32',
        description: 'The ENS node to update.',
      },
      {
        name: 'hash',
        type: 'bytes',
        description: 'The contenthash to set.',
      },
    ],
    events: ['event ContenthashChanged(bytes32 indexed node, bytes hash);'],
  },
  {
    name: 'setText(bytes32 node, string calldata key, string calldata value)',
    interface: '0x10f13a8c',
    usage: 'Write Text Record',
    seeMore: 'Implemented by Public Resolver',
    input: [
      {
        name: 'node',
        type: 'bytes32',
        description: 'The ENS node to update.',
      },
      {
        name: 'key',
        type: 'string',
        description: 'The key to set.',
      },
      {
        name: 'value',
        type: 'string',
        description: 'The text data value to set.',
      },
    ],
    events: [
      'event TextChanged(bytes32 indexed node, string indexed indexedKey, string key);',
    ],
  },
  {
    name: 'setABI(bytes32 node, uint256 contentType, bytes calldata data)',
    interface: '0x623195b0',
    usage: 'Write Contract ABI',
    seeMore: 'Implemented by Public Resolver',
    input: [
      {
        name: 'node',
        type: 'bytes32',
        description: 'The ENS node to update.',
      },
      {
        name: 'contentType',
        type: 'uint256',
        description: 'The content type of the ABI.',
      },
      {
        name: 'data',
        type: 'bytes',
        description: 'The ABI data.',
      },
    ],
    events: [
      'event ABIChanged(bytes32 indexed node, uint256 indexed contentType);',
    ],
  },
  {
    name: 'setPubkey(bytes32 node, bytes32 x, bytes32 y)',
    interface: '0x29cd62ea',
    usage: 'Write Public Key',
    seeMore: 'Implemented by Public Resolver',
    input: [
      {
        name: 'node',
        type: 'bytes32',
        description: 'The ENS node to update.',
      },
      {
        name: 'x',
        type: 'bytes32',
        description: 'The X coordinate of the curve point for the public key.',
      },
      {
        name: 'y',
        type: 'bytes32',
        description: 'The Y coordinate of the curve point for the public key.',
      },
    ],
    events: [
      'event PubkeyChanged(bytes32 indexed node, bytes32 x, bytes32 y);',
    ],
  },
  {
    name: 'setName(bytes32 node, string calldata name)',
    interface: '0x77372213',
    usage: 'Write Name (for reverse records)',
    seeMore: 'Implemented by Public Resolver',
    input: [
      {
        name: 'node',
        type: 'bytes32',
        description: 'The ENS node to update.',
      },
      {
        name: 'name',
        type: 'string',
        description: 'The associated name.',
      },
    ],
    events: ['event NameChanged(bytes32 indexed node, string name);'],
  },
  {
    name: 'multicall(bytes[] calldata data) view returns (bytes[] memory results)',
    interface: '0xac9650d8',
    usage: 'Batch Read/Write',
    seeMore: 'Implemented by Public Resolver',
    input: [
      {
        name: 'data',
        type: 'bytes[]',
        description: 'An array of ABI-encoded resolver function calls.',
      },
    ],
    output: [
      {
        name: 'results',
        type: 'bytes[]',
        description: 'An array of data for each resolver call result.',
      },
    ],
    examples: [
      <>
        <P>Set two different text records:</P>
        <UL>
          <LI>name: myname.eth</LI>
          <LI>key1: value1</LI>
          <LI>key2: value2</LI>
        </UL>
        <P>
          The corresponding function call is:{' '}
          <Code>
            <A href="#0x10f13a8c">
              setText(bytes32 node, string calldata key, string calldata value)
            </A>
          </Code>
          .
        </P>
        <P>So the input parameters would be:</P>
        <UL>
          <LI>
            node:{' '}
            <Code>
              0x6cbc8d00d20a89e588f430e62b937a6402557bf0bc2127fb1378457331aa463d
            </Code>
          </LI>
          <LI>
            key: <Code>key1</Code>
          </LI>
          <LI>
            value: <Code>value1</Code>
          </LI>
        </UL>
        <P>Therefore the ABI-encoded call (for key1/value1) would be:</P>
        <CodeBlock>
          0x10f13a8c6cbc8d00d20a89e588f430e62b937a6402557bf0bc2127fb1378457331aa463d000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000046b65793100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000676616c7565310000000000000000000000000000000000000000000000000000
        </CodeBlock>
        <P>
          The second the ABI-encoded call (for key2/value2) would be very
          similar:
        </P>
        <CodeBlock>
          0x10f13a8c6cbc8d00d20a89e588f430e62b937a6402557bf0bc2127fb1378457331aa463d000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000046b65793200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000676616c7565320000000000000000000000000000000000000000000000000000
        </CodeBlock>
        <P>
          Both of those byte arrays would be passed into the two-dimensional{' '}
          <Code>bytes[]</Code> input parameter.
        </P>
        <P>The full ABI-encoded multicall call would therefore be:</P>
        <CodeBlock>
          0xac9650d8000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000016000000000000000000000000000000000000000000000000000000000000000e410f13a8c6cbc8d00d20a89e588f430e62b937a6402557bf0bc2127fb1378457331aa463d000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000046b65793100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000676616c75653100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000e410f13a8c6cbc8d00d20a89e588f430e62b937a6402557bf0bc2127fb1378457331aa463d000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000046b65793200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000676616c756532000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
        </CodeBlock>
      </>,
    ],
  },
]
