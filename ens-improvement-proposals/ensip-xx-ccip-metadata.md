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

```solidity

interface OffChainResolver {
  enum StorageType{ EVM, RESTAPI }
  getMetadata(name: bytes) returns (graphqlUrl: string, l2resolverAddress:bytes, context:bytes)
  dataLocation(name: bytes) returns (storageType: StorageType, location:string )
  canUpdate(name: bytes, address:bytes) returns(bool)
}
```

```javascript
const packet = require("dns-packet");
function encodeName(name) {
  return "0x" + packet.name.encode(name).toString("hex");
}
const encodedName = encodeName("ccipreadsub.example.eth");
const resolver = await ens.resolver(node);
const owner = await resolver.owner(node);
// 0x123...
foo.matoken.eth;
jeff.matoken.eth;
const metadata = await resolver.getMetadata(encodedName);
// ['http://example.com/ens/graphql','0x1234', '0x1234']
const dataLocation = await resolver.dataLocation(encodedName);
// [0, 60] Ethereum
// [1, 'https://example.com/api'] A REST API
const canUpdate = await resolver.canUpdate(encodedName, "0x1234");
// true
```

##### getMetadata

###### Request

- name(bytes) = dns encoded name (eg: tokenId for Namewrapper)

###### Response

- url = url of graphql. can be hardcoded within L1 resolver
- l2resolverAddress
- context = a hex string which could be l2 resolver address. This context comes via CCIP gateway

###### GgraphQL schema

```graphql
type L2ResolverEntry {
  #
  ## Identifiers
  #
  id: ID! # Concatenation of resolver address and text
  address: Bytes! # l2 resolver address
  context: Bytes!
  #
  ##  Equivalent to Resolver in L1 schema
  #
  contentHash: Bytes # Content hash, in binary format.
  texts: [Text!]! # Set of observed text record keys
  coin: [Coin!]! # Set of observed SLIP-44 coin types
  #
  ##  Equivalent to Domain in L1 schema
  #
  name: String # The human readable name, if known. Unknown
  labelName: String # The human readable label name (imported from CSV), if known
  labelhash: Bytes! # keccak256(labelName)
  namehash: Bytes!
  parent: Domain # The namehash (id) of the parent name
  subdomains: [L2ResolverEntry!]! @derivedFrom(field: "parent") # Can count domains from length of array
  createdAt: BigInt!
  events: [L2ResolverEvent!]! @derivedFrom(field: "entry")
}
```

##### dataLocation(name: bytes) returns (storageType: StorageType, location:string )

###### Request

- name(bytes) = dns encoded name (eg: tokenId for Namewrapper)

###### Response

- url = url of graphql. can be hardcoded within L1 resolver

##### canUpdate(name: bytes, address:bytes) returns(bool)

###### Request

- name(bytes) = dns encoded name (eg: tokenId for Namewrapper)
- address = The user address. This is required to work with [OwnedNode](https://github.com/corpus-io/Optimism-Resolver/blob/main/contracts/l2/L2PublicResolver.sol) that consists of the hash of the node and `msg.sender`. The OwnedNode is used when the resolver does not depend on the canonical registry nor a bridge to verify the ownership of the name on L1.

###### Response

- Returns True if the user can update the record.

#### Backwards Compatibility

None

### Copyright

Copyright and related rights waived via [CC0](https://creativecommons.org/publicdomain/zero/1.0/).
