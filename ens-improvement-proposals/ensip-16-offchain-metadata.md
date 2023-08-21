---
description: Allows metadata to be queried on ERC-3668 enabled names
---

# ENSIP-16: Offchain metadata

| **Author**    | Jeff Lau \<jeff@ens.domains>, Makoto Inoue \<makoto@ens.domains> |
| ------------- | ---------------------------------------------------------------- |
| **Status**    | Draft                                                            |
| **Submitted** | 2022-09-22                                                       |

### Abstract

This ENSIP specifies APIs for querying metadata directly on the resolver for EIP-3668 (CCIP Read: Secure offchain data retrieval) enabled names. EIP-3668 will power many of the domains in the future, however since the retrieval mechanism uses wildcard + offchain resolver, there is no standardised way to retrieve important metadata information such as the owner (who can change the records), or which L2/offchain database the records are stored on.

### Motivation

With ERC-3668 subdomains already starting to see wide adoption, it is important that there is a way for frontend interfaces to get important metadata to allow a smooth user experience. For instance a UI needs to be able to check if the currently connected user has the right to update an EIP-3668 name.

This ENSIP addresses this by adding a way of important metadata to be gathered on the offchain resolver, which would likely revert and be also resolved offchain, however there is an option for it to be also left onchain if there value was static and wouldn't need to be changed often.

### Specification

The metadata should include 2 different types of info

- Offchain data storage location related info: `graphqlUrl` includes the URL to fetch the metadata.

- Ownership related info: `owner`, `isApprovedForAll` defines who can own or update the given record.

#### Context

An optional field "context" is introduced by utilizing an arbitrary bytes string to define the namespace to which a record belongs.

For example, this "context" can refer to the address of the entity that has set a particular record. By associating records with specific addresses, users can confidently manage their records in a trustless manner on Layer 2 without direct access to the ENS Registry contract on the Ethereum mainnet. Please refer to [ENS-Bedrock-Resolver](https://github.com/corpus-io/ENS-Bedrock-Resolver#context) for the reference integration

#### Dynamic Metadata

Metadata serves a crucial role in providing valuable insights about a node owner and their specific resolver. In certain scenarios, resolvers may choose to adopt diverse approaches to resolve data based on the node. An example of this would be handling subdomains of a particular node differently. For instance, we could resolve "optimism.foo.eth" using a contract on optimism and "gnosis.foo.eth" using a contract on gnosis.
By passing the name through metadata, we empower the resolution process, enabling CcipResolve flows to become remarkably flexible and scalable. This level of adaptability ensures that our system can accommodate a wide array of use cases, making it more user-friendly and accommodating for a diverse range of scenarios.

### Implementation

```solidity

// To be included in
// https://github.com/ensdomains/ens-contracts/blob/staging/contracts/resolvers/Resolver.sol
interface IOffChainResolver {
    /** @dev Returns the owner of the resolver on L2
     * @param node
     * @return owner in bytes32 instead of address to cater for non EVM based owner information
     */
    owner(bytes32 node) returns (bytes32 owner);

    isApprovedForAll(address account, address operator) returns (boolean);
    /** @dev Returns the owner of the resolver on L2
     * @return name can be l2 chain name or url if offchain
     * @return coinType according to https://github.com/ensdomains/address-encoder
     * @return graphqlUrl url of graphql endpoint that provides additional information about the offchain name and its subdomains
     * @return storageType 0 = EVM, 1 = Non blockchain, 2 = Starknet
     * @storageLocation = l2 contract address
     * @return context = an arbitrary bytes string to define the namespace to which a record belongs such as the name owner.
     */
    function metadata(bytes calldata name)
        external
        view
        returns (string memory, uint256, string memory, uint8, bytes memory, bytes memory)
    {
        return (name, coinType, graphqlUrl, storageType, storageLocation, context);
    }

    // Optional. If context is dynamic, the event won't be emitted.
    event MetadataChanged(
        string name,
        uint256 coinType,
        string graphqlUrl,
        uint8 storageType,
        bytes storageLocation,
        bytes context
    );
}
```

```javascript
const node = namehash('ccipreadsub.example.eth')
const resolver = await ens.resolver(node)
const owner = await resolver.owner(node)
// 0x123...
const dataLocation = await.resolver.graphqlUrl()
// {
//   url: 'http://example.com/ens/graphql',
// }
```

##### GraphQL schema

[GraphQL](https://graphql.org) is a query language for APIs and a runtime for fulfilling those queries with onchain event data. You can use the hosted/decentralised indexing service such as [The Graph](https://thegraph.com), [GodSky](https://docs.goldsky.com/indexing), [QuickNode](https://marketplace.quicknode.com/add-on/subgraph-hosting) or host your own using The Graph, or [ponder](https://ponder.sh)

##### L1

`Metada` is an optional schema that indexes `MetadataChanged` event.

```graphql

type Domain @entity{
  id
  metadata: Metadata
}

type Metadata @entity {
  "l1 resolver address"
  id: ID!
  "Name of the Chain"
  name: String
  "coin type"
  coinType: BigInt
  "url of the graphql endpoint"
  graphqlUrl: String
  "0 for evm, 1 for non blockchain, 2 for starknet"
  storageType: Int
  "l2 contract address"
  storageLocation: Bytes
  "optional field to store an arbitrary bytes string to define the namespace to which a record belongs"
  context: Bytes
  "optional field if the name has expirty date offchain"
  expiryDate: BigInt
}

```

##### L2

L2 graphql URL is discoverable via `metadata` function `graphqlUrl` field.
Because the canonical ownership of the name exists on L1, some L2/offchain storage may choose to allow multiple entities to update the same node namespaced by `context`. When quering the domain data, the query should be filtered by `context` that is returned by `metadata`function `context` field

```graphql
type Domain {
  id: ID! # concatenation of context and namehash delimited by `-`
  context: Bytes
  name: String
  namehash: Bytes
  labelName: String
  labelhash: Bytes
  resolvedAddress: Bytes
  parent: Domain
  subdomains: [Domain]
  subdomainCount: Int!
  resolver: Resolver!
  expiryDate: BigInt
}

type Resolver @entity {
  id: ID! # concatenation of node, resolver address and context delimited by `-`
  node: Bytes
  context: Bytes
  address: Bytes
  domain: Domain
  addr: Bytes
  contentHash: Bytes
  texts: [String!]
  coinTypes: [BigInt!]
}
```

### Backwards Compatibility

None

### Open Items

- Should `owner` and `isApprovedForAll` be within graphql or shoud be own metadata function?

### Copyright

Copyright and related rights waived via [CC0](https://creativecommons.org/publicdomain/zero/1.0/).
