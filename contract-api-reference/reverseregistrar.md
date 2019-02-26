---
description: >-
  The registrar responsible for managing reverse resolution via the
  .addr.reverse special-purpose TLD.
---

# ReverseRegistrar

[Source](https://github.com/ensdomains/ens/blob/master/contracts/ReverseRegistrar.sol)

Reverse resolution in ENS - the process of mapping from an Ethereum address \(eg, 0x1234...\) to an ENS name - is handled using a special namespace, _.addr.reverse_. A special-purpose registrar controls this namespace and allocates subdomains to any caller based on their address. 

For example, the account _0x314159265dd8dbb310642f98f50c066173c1259b_ can claim _314159265dd8dbb310642f98f50c066173c1259b.addr.reverse._ After doing so, it can configure a resolver and expose metadata, such as a canonical ENS name for this address.

The reverse registrar provides functions to claim a reverse record, as well as a convenience function to configure the record as it's most commonly used, as a way of specifying a canonical name for an address.

The reverse registrar is specified in [EIP 181](https://eips.ethereum.org/EIPS/eip-181).

## Claim Address

```text
function claim(address owner) public returns (bytes32);
```

Claims the caller's address in the reverse registrar, assigning ownership of the  reverse record to `owner`. Equivalent to calling `claimWithResolver(owner, 0)`.

## Claim Address with Resolver

```text
function claimWithResolver(address owner, address resolver) public returns (bytes32)
```

Claims the caller's address in the reverse registrar, assigning ownership of the reverse record to `owner`. If `resolver` is nonzero, also updates the record's resolver.

After calling this function:

* The reverse record for the caller \(_1234....addr.reverse_\) is owned by  `owner`.
* If `resolver` is nonzero, the reverse record for the caller has its resolver set to `resolver`; otherwise it is left unchanged.

## Set Name

```text
function setName(string memory name) public returns (bytes32)
```

Configures the caller's reverse ENS record to point to the provided `name`.

This convenience function streamlines the process of setting up a reverse record for the common case where a user only wants to configure a reverse name and nothing else. It performs the following steps:

1. Sets the reverse record for the caller to be owned by the ReverseRegistrar.
2. Sets the reverse record for the caller to have `defaultResolver` as its resolver.
3. Sets the `name()` field in the `defaultResolver`  for the caller's reverse record to `name`.

In short, after calling this, a user has a fully configured reverse record claiming the provided `name` as that account's canonical name.

Users wanting more flexibility will need to use `claim` or `claimWithResolver` and configure  records manually on their chosen resolver contract.

## Get Reverse Record Node

```text
function node(address addr) public pure returns (bytes32)
```

Accepts an address, and returns the node \(namehash output\) for the address's reverse record. This function is provided as a convenience for contracts wishing to look up metadata for an address, and avoids the need for those contracts to handle the hex encoding and hashing necessary to derive the required value.

## Get Default Resolver

```text
Resolver public defaultResolver;
```

Returns the address of the resolver contract that the `ReverseRegistrar` uses for `setName`.

