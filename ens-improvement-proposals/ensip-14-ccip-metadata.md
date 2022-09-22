---
description: Allows metadata to be queried on CCIP enabled names
---

# ENSIP-14: CCIP metadata

| **Author**    | Jeff Lau \<jeff@ens.domains> |
| ------------- | ---------------------------- |
| **Status**    | Draft                        |
| **Submitted** | 2022-09-22                   |

### Abstract

This ENSIP allows metadata to be queried directly on the resolver for CCIP enabled names. CCIP-read will power many of the domains in the future, however since the retrieval mechanism uses wildcard + offchain resolver, there is no standardised way to retrieve important metadata information such as the owner (who can change the records), or L2/offchain database the records are stored on.

### Motivation

With CCIP-read subdomains already starting to get used by larger partners in the ENS ecosystem, it is important that there is a way of frontend interfaces to get important metadata to allow a smooth user interface. For instance the owner of a CCIP enabled name would need to be known, for a UI to show whether or not the currently connected account has the rights to edit the records. If the owner was not known, the only way to know would be to make the edit and wait for failure.

This ENSIP addresses this by adding a way of important metadata to be gathered on the offchain resolver, which would likely revert and be also resolved offchain, however there is an option for it to be also left onchain if there value was static and wouldn't need to be changed often.

### Specification

Add metadata functions to the resolver. The first argument MUST have the node if it is specific to a node.

```solidity


interface OffChainResolver {
    owner(bytes32 node);

    isApprovedForAll(address account, address operator)

    dataLocation(bytes32 node) returns (string);

    allRecords(bytes32 node) returns (Records);

    recordKeys(bytes32 node) returns (RecordsKeys)

}
```


#### Example

```javascript
const node = namehash('ccipreadsub.example.eth')
const resolver = await ens.resolver(node)
const owner = await resolver.owner(node) 
// 0x123...
const dataLocation = await.resolver.dataLocation(node)
// {
//   name: "Optimism",
//   type: "Layer 2",
//   chainId: 5   
// }

const recordKeys = await.resolver.recordKeys(node)
// {
//   addr: [60, 1]
//   textRecords: ['url', 'avatar']
//   contentHash: true
// }

```

#### Backwards Compatibility

None

### Copyright

Copyright and related rights waived via [CC0](https://creativecommons.org/publicdomain/zero/1.0/).
