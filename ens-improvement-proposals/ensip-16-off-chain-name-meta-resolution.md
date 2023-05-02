---
description: Standard interface for resolvers to provide their own index of supported records or list of subnames
---

# ENSIP-16: Off-chain Name Meta-Resolution

| **Author**    | Serenae.eth
| ------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| **Status**    | Draft                                                                                                                           |
| **Submitted** | 2023-05-02                                                                                                                      |

### Abstract

This ENSIP defines a resolver profile for ENS that permits the lookup of "meta-resolution" information for a particular name, such as:
* Existing subnames
* Resolvable [ENSIP-5](https://docs.ens.domains/ens-improvement-proposals/ensip-5-text-records) text record keys
* Resolvable [ENSIP-9](https://docs.ens.domains/ens-improvement-proposals/ensip-9-multichain-address-resolution) coin types

This allows clients to query this information for off-chain names that are resolved via [CCIP-read](https://eips.ethereum.org/EIPS/eip-3668).

### Motivation

Currently, clients may use a separate service like TheGraph to query the list of subnames, text record keys, or coin types for names. But this solution does not work for off-chain names, which don't exist in the ENS Registry, and are not indexed in the ENS subgraph.

With interface discovery, it's possible to determine whether a resolver supports various record types, like [ENSIP-5](https://docs.ens.domains/ens-improvement-proposals/ensip-5-text-records) text records. However, even if a client knows that text records are supported, it doesn't necessarily know **which** text records to resolve, if its goal is to simply resolve all available records for a name.

By implementing this ENSIP, resolvers have a standard format to provide this data directly to clients.

### Specification

The key words “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”, “SHOULD NOT”, “RECOMMENDED”, “MAY”, and “OPTIONAL” in this document are to be interpreted as described in RFC 2119.

#### IMetaResolver Interface

ENSIP-16-compliant ENS resolvers MAY implement the following function interface:

```
interface IMetaResolver {
    // @notice Returns the list of labels of existing subnames for an ENS name
    // @param node A nodehash for an ENS name
    // @return The array of labels for existing subnames
    function subLabels(bytes32 node) external view returns (string[] subLabels);

    // @notice Returns the list of resolvable text record keys for an ENS name
    // @param node A nodehash for an ENS name
    // @return The array of text record keys
    function texts(bytes32 node) external view returns (string[] texts);

    // @notice Returns the list of resolvable coin types for an ENS name
    // @param node A nodehash for an ENS name
    // @return The array of coin types
    function coinTypes(bytes32 node) external view returns (uint256[] coinTypes);

    // @notice Returns the text meta-information associated with a key for an ENS name
    // @param node A nodehash for an ENS name
    // @return The text meta-information
    function metaText(bytes32 node, string key) external view returns (string value);
}
```

If a resolver implements this function, it MUST return true when `supportsInterface()` is called on it with the interface's ID, `0xb5269b7c`.

ENS clients will call one or more of the above methods, depending on their goals:
* `subLabels`: Existing subnames
* `texts`: Resolvable text record keys
* `coinTypes`: Resolvable coin types
* `metaText`: Other custom meta-information

The results of these calls can then be used in a subsequent call to perform actual record resolution for the name.

#### Text Records

If the above interface is not implemented, ENSIP-16-compliant ENS resolvers MUST instead return this data with an [ENSIP-5](https://docs.ens.domains/ens-improvement-proposals/ensip-5-text-records) text record: `eth.ens.meta`

When resolved on an ENSIP-16-compliant ENS resolver, the value of `eth.ens.meta` MUST conform to this JSON Schema specification:

```
{
    "$schema": "http://json-schema.org/draft-04/schema#",
    "title": "ENS Resolver Meta-Information",
    "type": "object",
    "additionalProperties": true,
    "properties": {
        "subLabels": {
            "type": "array",
            "items": {
                "type": "string"
            },
            "description": "The list of labels of existing subnames for an ENS name"
        },
        "texts": {
            "type": "array",
            "items": {
                "type": "string"
            },
            "description": "The list of resolvable text record keys for an ENS name"
        },
        "coinTypes": {
            "type": "array",
            "items": {
                "type": "number"
            },
            "description": "The list of resolvable coin types for an ENS name"
        }
    }
}
```

ENS clients will resolve the `eth.ens.meta` text record. If the resolved value is not blank, then the client will parse the value according to the above JSON Schema specification. Then the client will use one or more of the properties in the parsed JSON Object, depending on their goals:
* `subLabels`: Existing subnames
* `texts`: Resolvable text record keys
* `coinTypes`: Resolvable coin types
* Other properties may be included in the JSON Object, which clients and resolvers can use for their own custom purposes.

ENSIP-16-compliant ENS resolvers are RECOMMENDED to use the above [IMetaResolver Interface](#imetaresolver-interface) instead of this text record, if possible.

### Rationale

#### Separate interface versus using text records

Having both the interface and text record as alternate implementation methods increases the complexity of this ENSIP. Perhaps this draft could be simplified by choosing one or the other, not both. Also see [Backwards Compatibility](#backwards-compatibility) below.

#### Future-proofing

There may be more information that clients will need to "meta-resolve" in the future. The `metaText` method (or additional properties in the JSON Object) was added for future extensibility.

### Backwards Compatibility

Using the [IMetaResolver Interface](#imetaresolver-interface) is recommended for new resolvers, but the alternate `eth.ens.meta` text record specification also allows existing resolvers to start conforming to this ENSIP as well.

### Security Considerations

This ENSIP is primarily meant for off-chain names, but it does not preclude resolvers from storing this "meta-resolution" data on-chain.

If this data is stored on-chain, then care should be taken to keep it "in sync". This may not be an issue for `texts` or `coinTypes` as those lists can easily be updated as the actual records are updated. But the same may not be true for `subLabels`, because subnames are created using the ENS Registry, not via resolver transactions.

### Copyright

Copyright and related rights waived via [CC0](https://creativecommons.org/publicdomain/zero/1.0/).
