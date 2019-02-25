---
description: The ENS registry.
---

# ENS

[Source](https://github.com/ensdomains/ens/blob/master/contracts/ENS.sol)

## Get Owner

```text
function owner(bytes32 node) external view returns (address);
```

Returns the owner of the name specified by `node`.

## Get Resolver

```text
function resolver(bytes32 node) external view returns (address);
```

Returns the address of the resolver responsible for the name specified by `node`.

## Get TTL

```text
function ttl(bytes32 node) external view returns (uint64);
```

Returns the caching time-to-live of the name specified by `node`. Systems that wish to cache information about a name, including ownership, resolver address, and records, should respect this value. If TTL is zero, new data should be fetched on each query.

## Set Owner

```text
function setOwner(bytes32 node, address owner) external;
```

Reassigns ownership of the name identified by `node` to `owner`. Only callable by the current owner of the name.

Emits the following event:

```text
event Transfer(bytes32 indexed node, address owner);
```

## Set Resolver

```text
function setResolver(bytes32 node, address resolver) external;
```

Updates the resolver associated with the name identified by `node` to `resolver`.  Only callable by the current owner of the name. `resolver` must specify the address of a contract that implements the Resolver interface.

Emits the following event:

```text
event NewResolver(bytes32 indexed node, address resolver);
```

## Set TTL

```text
function setTTL(bytes32 node, uint64 ttl) external;
```

Updates the caching time-to-live of the name identified by `node`. Only callable by the current owner of the name.

Emits the following event:

```text
event NewTTL(bytes32 indexed node, uint64 ttl);
```

## Set Subdomain Owner

```text
function setSubnodeOwner(bytes32 node, bytes32 label, address owner) external;
```

Creates a new subdomain of `node`, assigning ownership of it to the specified `owner`. If the domain already exists, ownership is reassigned but the resolver and TTL are left unmodified.

`label` is the keccak256 hash of the subdomain label to create. For example, if you own _alice.eth_ and want to create the subdomain _iam.alice.eth_, supply  `namehash('alice.eth')` as the `node`, and `keccak256('iam')` as the `label`.

Emits the following event:

```text
event NewOwner(bytes32 indexed node, bytes32 indexed label, address owner);
```

