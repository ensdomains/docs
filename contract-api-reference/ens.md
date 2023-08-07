---
description: The ENS registry.
---

# Registry

[Source](https://github.com/ensdomains/ens-contracts/blob/master/contracts/registry/ENS.sol)

The ENS registry is the core contract that lies at the heart of ENS resolution. All ENS lookups start by querying the registry. The registry maintains a list of domains, recording the owner, resolver, and TTL for each, and allows the owner of a domain to make changes to that data.

The ENS registry is specified in [EIP 137](https://eips.ethereum.org/EIPS/eip-137).

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

### Set Record

```text
function setRecord(bytes32 node, address owner, address resolver, uint64 ttl);
```

Sets the owner, resolver, and TTL for an ENS record in a single operation. This function is offered for convenience, and is exactly equivalent to calling `setResolver`, `setTTL` and `setOwner` in that order.

### Set Subdomain Record

```text
function setSubnodeRecord(bytes32 node, bytes32 label, address owner, address resolver, uint64 ttl);
```

Sets the owner, resolver and TTL for a subdomain, creating it if necessary. This function is offered for convenience, and permits setting all three fields without first transferring ownership of the subdomain to the caller.

### Set Approval

```text
function setApprovalForAll(address operator, bool approved);
```

Sets or clears an approval. Approved accounts can execute all ENS registry operations on behalf of the caller.

### Check Approval

```text
function isApprovedForAll(address owner, address operator) external view returns (bool);
```

Returns true if `operator` is approved to make ENS registry operations on behalf of `owner`.

### Check Record Existence

```text
function recordExists(bytes32 node) public view returns (bool);
```

Returns true if `node` exists in this ENS registry. This will return false for records that are in the legacy ENS registry but have not yet been migrated to the new one.

