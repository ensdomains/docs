---
description: Allows metadata to be queried on CCIP enabled names
---

# ENSIP-XX: CCIP-read metadata

| **Author**    | Jeff Lau \<jeff@ens.domains> |
| ------------- | ---------------------------- |
| **Status**    | Draft                        |
| **Submitted** | 2022-09-22                   |

### Abstract

This ENSIP allows metadata to be queried directly on the resolver for CCIP-read enabled names. CCIP-read will power many of the domains in the future, however since the retrieval mechanism uses wildcard + offchain resolver, there is no standardised way to retrieve important metadata information such as the owner (who can change the records), or which L2/offchain database the records are stored on.

### Motivation

With CCIP-read subdomains already starting to get used by larger partners in the ENS ecosystem, it is important that there is a way of frontend interfaces to get important metadata to allow a smooth user interface. For instance the owner of a CCIP enabled name would need to be known, for a UI to show whether or not the currently connected account has the rights to edit the records. If the owner was not known, the only way to know would be to make the edit and wait for failure.

This ENSIP addresses this by adding a way of important metadata to be gathered on the offchain resolver, which would likely revert and be also resolved offchain, however there is an option for it to be also left onchain if there value was static and wouldn't need to be changed often.

### Specification

The metadata should include 2 different types of info

- Offchain data storage location related info: `graphqlUrl` includes the URL to fetch the metadata.

- Ownership related info: `owner`, `isApprovedForAll` defines who can own or update the given record. The specification also must comply with [OwnedNode](https://github.com/corpus-io/Optimism-Resolver/blob/main/contracts/l2/L2PublicResolver.sol) that consists of the hash of the node and `msg.sender`. The OwnedNode is used when the resolver does not depend on the canonical registry nor a bridge to verify the ownership of the name on L1.

#### Context

An optional field "context" is introduced by utilizing an arbitrary bytes string to define the namespace to which a record belongs.

For example, this "context" can refer to the address of the entity that has set a particular record. By associating records with specific addresses, users can confidently manage their records in a trustless manner on Layer 2 without direct access to the ENS Registry contract on the Ethereum mainnet. Please refer to [ENS-Bedrock-Resolver](https://github.com/corpus-io/ENS-Bedrock-Resolver#context) for the reference integration

#### Dynamic Metadata

Metadata serves a crucial role in providing valuable insights about a node owner and their specific resolver. In certain scenarios, resolvers may choose to adopt diverse approaches to resolve data based on the node. An example of this would be handling subdomains of a particular node differently. For instance, we could resolve "optimism.foo.eth" using a contract on optimism and "gnosis.foo.eth" using a contract on gnosis.
By passing the name through metadata, we empower the resolution process, enabling CcipResolve flows to become remarkably flexible and scalable. This level of adaptability ensures that our system can accommodate a wide array of use cases, making it more user-friendly and accommodating for a diverse range of scenarios.

### Implementation

```solidity

interface OffChainResolver {
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

##### GgraphQL schema

##### L1

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
  "context, resolver address if evm Chain"
  context: Bytes
  "optional field if the name has expirty date offchain"
  expiryDate: BigInt
}

type Resolver @entity {
  offchain: Offchain
}
```

##### L2

```graphql
type Domain @entity {
  id: ID! # concatenation of context and namehash delimited by `-`
  context: Bytes
  name: String
  namehash: Bytes
  labelName: String
  labelhash: Bytes
  resolvedAddress: Bytes
  parent: Domain
  subdomains: [Domain!]! @derivedFrom(field: "parent") # Can count domains from length of array
  resolver: Resolver
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
- OwnedResolver is permissionless. Need some sort of registry (requires `setResolver` equivalent) to collect these resolver names so that indexers will know which contracts to index (unless hardcode default owned resolver addresses).

### Copyright

Copyright and related rights waived via [CC0](https://creativecommons.org/publicdomain/zero/1.0/).
