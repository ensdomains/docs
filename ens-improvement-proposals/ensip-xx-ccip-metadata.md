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

```solidity

interface OffChainResolver {
    owner(bytes32 node) returns (bytes32); // first 20 bytes are assumed to be the address if it's an evm chain, but gives space for longer address on non-evm chains.

    isApprovedForAll(address account, address operator) returns (boolean);
    graphqlUrl() returns (string);
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

```graphql
type Domain{
  id: ID!
  name: String
  labelName: String
  labelhash: Bytes
  parent: Domain
  subdomains: [Domain]
  offchain: Offchain
  resolver: (Resolver | OwnedResolver)
}

type Offchain(owner:){
  chainId: ID!        # Id of the Chain (either ChainID or SLIP44 if non evm chain)
  name: String        # Name of the Chain
  isEVM: Boolean      # True/False
}

type OwnedResolver implements Resolver @entity {
  ownedNode: String   # Hash of node and msg.sender
  owner: Account      # msg.sender
}

```

#### Backwards Compatibility

None

### Open Items

- Should `owner` and `isApprovedForAll` be within graphql or shoud be own metadata function?
- OwnedResolver is permissionless. Need some sort of registry (requires `setResolver` equivalent) to collect these resolver names so that indexers will know which contracts to index (unless hardcode default owned resolver addresses).

### Copyright

Copyright and related rights waived via [CC0](https://creativecommons.org/publicdomain/zero/1.0/).
