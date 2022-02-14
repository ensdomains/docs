---
description: The default public resolver.
---

# PublicResolver

[Source](https://github.com/ensdomains/resolvers/blob/master/contracts/PublicResolver.sol)

PublicResolver implements a general-purpose ENS resolver that is suitable for most standard ENS use-cases. The public resolver permits updates to ENS records by the owner of the corresponding name.

The public resolver implements the following EIPs:

* [EIP 137](https://eips.ethereum.org/EIPS/eip-137) - Contract address interface (`addr()`).
* [EIP 165 ](https://eips.ethereum.org/EIPS/eip-165)- Interface Detection (`supportsInterface()`).
* [EIP 181](https://eips.ethereum.org/EIPS/eip-181) - Reverse resolution (`name()`).
* [EIP 205](https://eips.ethereum.org/EIPS/eip-205) - ABI support (`ABI()`).
* [EIP 619](https://github.com/ethereum/EIPs/pull/619) - SECP256k1 public keys (`pubkey()`).
* [EIP 634](https://eips.ethereum.org/EIPS/eip-634) - Text records (`text()`).
* [EIP 1577](https://eips.ethereum.org/EIPS/eip-1577) - Content hash support (`contenthash()`).
* [EIP 2304](https://eips.ethereum.org/EIPS/eip-2304) - Multicoin support (`addr()`).

{% hint style="warning" %}
While the `PublicResolver`provides a convenient default implementation, many resolver implementations and versions exist. Callers **must not** assume that a domain uses the current version of the public resolver, or that all of the methods described here are present. To check if a resolver supports a feature, see [Check Interface Support](publicresolver.md#check-interface-support).
{% endhint %}

## Check Interface Support

```
function supportsInterface(bytes4 interfaceID) external pure returns (bool)
```

ENS uses [ERC 165](https://eips.ethereum.org/EIPS/eip-165) for interface detection. ERC 165 requires that supporting contracts implement a function, `supportsInterface`, which takes an interface ID and returns a boolean value indicating if this interface is supported or not.

Interface IDs are calculated as the exclusive-or of the four-byte function identifiers of each function included in the interface. For example, `addr(bytes32)` has the function ID _0x3b3b57de_. Because it is the only function in the Ethereum Address interface, its interface ID is also _0x3b3b57de_, and so calling `supportsInterface(0x3b3b57de)` will return _true_ for any resolver that supports `addr()`.

ERC 165 has an interface ID of _0x01ffc9a7_, so `supportsInterface(0x01ffc9a7)` will always return true for any ERC 165 supporting contract (and hence for any resolver).

Note that the public resolver does not expose explicit interfaces for setter functions, so there are no automated means to check for support for a given setter function.

## Get Ethereum Address

```
function addr(bytes32 node) external view returns (address)
```

Returns the Ethereum address associated with the provided `node`, or 0 if none.

This function has interface ID _0x3b3b57de_.

This function is specified in [EIP 137](https://eips.ethereum.org/EIPS/eip-137).

## Set Ethereum Address

```
function setAddr(bytes32 node, address addr) external;
```

Sets the Ethereum address associated with the provided `node` to `addr`.

Only callable by the owner of `node`.

Emits the following event:

```
event AddrChanged(bytes32 indexed node, address a);
```

## Get Blockchain Address

```
function addr(bytes32 node, uint coinType) external view returns(bytes memory);
```

Returns the Blockchain address associated with the provided `node` and `coinType`, or 0 if none.

This function has interface ID _0xf1cb7e06_.

This function is specified in [EIP 2304](https://eips.ethereum.org/EIPS/eip-2304).

The return value is the cryptocurrency address in its native binary format and each blockchain address has a different encoding and decoding method.

For example, the Bitcoin address `1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa` base58check decodes to the 21 bytes `0062e907b15cbf27d5425399ebf6f0fb50ebb88f18` then scriptPubkey encodes to 25 bytes `76a91462e907b15cbf27d5425399ebf6f0fb50ebb88f1888ac` whereas the BNB address `bnb1grpf0955h0ykzq3ar5nmum7y6gdfl6lxfn46h2` Bech32 decodes to the binary representation `40c2979694bbc961023d1d27be6fc4d21a9febe6`.

To convert the binary representation into the address, use `formatsByCoinType[SYMBOL].encoder(binary)` of [address-encoder](https://github.com/ensdomains/address-encoder).

A zero-length string will be returned if the specified coin ID does not exist on the specified node.

## Set Blockchain Address

```
function setAddr(bytes32 node, uint coinType, bytes calldata a) external;
```

Sets the blockchain address associated with the provided `node` and `coinType` to `addr`.

`coinType` is the cryptocurrency coin type index from [SLIP44](https://github.com/satoshilabs/slips/blob/master/slip-0044.md).

To convert the address into the binary representation, use `formatsByName[SYMBOL].decoder(text)` of [address-encoder](https://github.com/ensdomains/address-encoder)

Only callable by the owner of `node`.

Emits the following event:

```
event AddressChanged(bytes32 indexed node, uint coinType, bytes newAddress);
```

## Get Canonical Name

```
function name(bytes32 node) external view returns (string memory);
```

Returns the canonical ENS name associated with the provided `node`. Used exclusively for reverse resolution.

This function has interface ID _0x691f3431_.

This function is specified in [EIP 181](https://eips.ethereum.org/EIPS/eip-181).

## Set Canonical Name

```
function setName(bytes32 node, string calldata name) external;
```

Sets the canonical ENS name for the provided `node` to `name`.

Only callable by the owner of `node`.

Emits the following event:

```
event NameChanged(bytes32 indexed node, string name);
```

## Get Content Hash

```
function contenthash(bytes32 node) external view returns (bytes memory);
```

Returns the content hash for `node`, if one exists. Values are formatted as machine-readable [multicodecs](https://github.com/multiformats/multicodec), as specified in [EIP 1577](https://eips.ethereum.org/EIPS/eip-1577).

`contenthash` is used to store IPFS and Swarm content hashes, which permit resolving ENS addresses to distributed content (eg, websites) hosted on these distributed networks.

This function has interface ID _0xbc1c58d1_.

This function is specified in [EIP 1577](https://eips.ethereum.org/EIPS/eip-1157).

## Set Content Hash

```
function setContenthash(bytes32 node, bytes calldata hash) external;
```

Sets the content hash for the provided `node` to `hash`.

Only callable by the owner of `node`.

Values are formatted as machine-readable [multicodecs](https://github.com/multiformats/multicodec), as specified in [EIP 1577](https://eips.ethereum.org/EIPS/eip-1577).

Emits the following event:

```
event ContenthashChanged(bytes32 indexed node, bytes hash);
```

## Get Contract ABI

```
ABI(bytes32 node, uint256 contentTypes) external view returns (uint256, bytes memory);
```

Returns a matching ABI definition for the provided `node`, if one exists. `contentTypes` is the bitwise-OR of the encodings that the caller can accept. If multiple content types are specified, the resolver will select one to return. Currently supported content types are:

| Content Type ID | Description             |
| --------------- | ----------------------- |
| 1               | JSON                    |
| 2               | zlib-compressed JSON    |
| 4               | [CBOR](https://cbor.io) |
| 8               | URI                     |

`ABI` returns a two-tuple of the content type ID and the ABI data. If no data of the appropriate content type ID was found, 0 is returned for the content type ID, and the ABI data will be the empty string.

This function has interface ID _0x2203ab56_.

This function is specified in [EIP 205](https://eips.ethereum.org/EIPS/eip-205).

## Set Contract ABI

```
function setABI(bytes32 node, uint256 contentType, bytes calldata data) external
```

Sets or updates ABI data for `node`. `contentType` specifies the content type ID (see [Get Contract ABI](publicresolver.md#get-contract-abi) for valid values); exactly one type ID must be specified. `data` contains the encoded ABI data. To clear ABI data for a name, specify the empty string for `data`.

Only callable by the owner of `node`.

Emits the following event:

```
event ABIChanged(bytes32 indexed node, uint256 indexed contentType);
```

## Get Public Key

```
function pubkey(bytes32 node) external view returns (bytes32 x, bytes32 y)
```

Returns the ECDSA SECP256k1 public key for `node`, as a 2-tuple `(x, y)`. If no public key is set, `(0, 0)` is returned.

This function has interface ID _0xc8690233_.

This function is specified in [EIP 619](https://github.com/ethereum/EIPs/issues/619).

## Set Public Key

```
function setPubkey(bytes32 node, bytes32 x, bytes32 y) external
```

Sets the ECDSA SECP256k1 public key for `node` to `(x, y)`.

Only callable by the owner of `node`.

Emits the following event:

```
event PubkeyChanged(bytes32 indexed node, bytes32 x, bytes32 y);
```

## Get Text Data

```
function text(bytes32 node, string calldata key) external view returns (string memory)
```

Retrieves text metadata for `node`. Each name may have multiple pieces of metadata, identified by a unique string `key`. If no text data exists for `node` with the key `key`, the empty string is returned.

Standard values for `key` are:

| key         | Meaning                                                                                                                                                   |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| email       | An email address                                                                                                                                          |
| url         | A URL                                                                                                                                                     |
| avatar      | A URL to an image used as an avatar or logo                                                                                                               |
| description | A description of the name                                                                                                                                 |
| notice      | A notice regarding this name                                                                                                                              |
| keywords    | A list of comma-separated keywords, ordered by most significant first; clients that interpresent this field may choose a threshold beyond which to ignore |

In addition, anyone may specify vendor-specific keys, which must be prefixed with `vnd.`. The following vendor-specific keys are currently known:

| key         | Meaning         |
| ----------- | --------------- |
| com.twitter | Twitter handle  |
| com.github  | Github username |

This function has interface ID 0x59d1d43c.

This function is specified in [EIP 634](https://eips.ethereum.org/EIPS/eip-634).

## Set Text Data

```
function setText(bytes32 node, string calldata key, string calldata value) external
```

Sets text metadata for `node` with the unique key `key` to `value`, overwriting anything previously stored for `node` and `key`. To clear a text field, set it to the empty string.

Only callable by the owner of `node`.

Emits the following event:

```
event TextChanged(bytes32 indexed node, string indexedKey, string key);
```

## Multicall

```
function multicall(bytes[] calldata data) external returns(bytes[] memory results)
```

Permits users to set multiple records in a single operation.

Use `encodeABI` function to encode your contract calls and pass it to `data`.

The frontend usage will be as follows:

```javascript
var addrSet = resolver.contract.methods['setAddr(bytes32,address)'](node, accounts[1]).encodeABI();
var textSet = resolver.contract.methods.setText(node, "url", "https://ethereum.org/").encodeABI();
var tx = await resolver.multicall([addrSet, textSet], {from: accounts[0]});
```
