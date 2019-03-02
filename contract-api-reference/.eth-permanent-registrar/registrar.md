# Registrar

[Source](https://github.com/ensdomains/ethregistrar/blob/master/contracts/BaseRegistrarImplementation.sol)

This contract implements the core functionality of the permanent registrar, with the following features:

* The owner of the registrar may add and remove 'controllers'.
* Controllers may register new domains and extend the expiry of \(renew\) existing domains. They can not change the ownership or reduce the expiration time of existing domains.
* Name owners may transfer ownership to another address.
* Name owners may reclaim ownership in the ENS registry if they have lost it.
* Owners of names in the legacy registrar may transfer them to the new registrar, during the 1 year transition period. When they do so, their deposit is returned to them in its entirety.

This section documents the parts of the registrar interface relevant to implementers of tools that interact with it. Functionality exclusive to the registrar owner or to controllers is omitted for brevity.

The registrar works exclusively with label hashes - the `keccak256` of the first component of the label \(eg, `keccak256('ens')` for `ens.eth`\). For compatibility with ERC721, these are expressed as uint256 values rather than bytes32, but can be cast backwards and forwards transparently. The namehash of a name can be derived by computing `keccak256(baseNode, labelHash)`, where `basenode` is the namehash of the TLD the registrar manages - eg, `namehash('eth')`.

Registrations and renewals are handled via the [controller](controller.md).

## Names and Registrations

All names inside ENS have an owner. The owner of a name can transfer the name to a new owner, set a resolver, and create and reassign subdomains. This functionality is all contained in the [ENS registry](../ens.md).

Allocation of names directly under .eth \(eg, second-level domains ending with .eth, such as _alice.eth_\) is governed by the .eth Permanent Registrar, described here. While buying a name from the registrar grants ownership of it in ENS, the registrar itself keeps independent track of who owns the **registration**. The concept of a **registrant** - the owner of a registration - is unique to the .eth permanent registrar.

The registrant of a name can transfer the registration to another account, and they can recover ownership of the name by calling [reclaim](registrar.md#reclaim-ens-record), which resets ownership of the ENS name to the registrant's account.

Separating the concept of owning a name from owning a registration makes it possible to more easily build systems that make automated updates to ENS. The registrant can transfer ownership of the name to another account or to a smart contract that manages records, subdomains, etc, while still retaining the ability to recover ownership for upgrades, or in the case of a compromise.

When thinking about ownership, it's important to be clear whether you're considering ownership of the **name** or the **registration**.

## Read Operations

### Get Name Expiry

```text
function nameExpires(uint256 label) external view returns(uint);
```

Returns the unix timestamp at which a registration currently expires. Names that do not exist or are not yet migrated from the legacy registrar will return 0.

### Check Name Availability

```text
function available(uint256 label) public view returns(bool);
```

Returns `true` if a name is available for registration. Takes into account not-yet-migrated registrations from the legacy registrar. Registrar controllers may impose more restrictions on registrations than this contract \(for example, a minimum name length\), so this function should not be used to check if a name can be registered by a user.

### Get Transfer Period End

```text
uint public transferPeriodEnds;
```

`transferPeriodEnds` documents the unix timestamp at which it is no longer possible to migrate over registrations from the legacy registrar, and any non-migrated registrations become available for registration by anyone.

### Get Controller Status

```text
mapping(address=>bool) public controllers;
```

`controllers` allows callers to check if the supplied address is authorized as a registrar controller.

### Check Token Approval

```text
function getApproved(uint256 tokenId) public view returns (address operator);
```

Returns the address of the approved operator for this name.

This function is part of ERC721.

### Check All Tokens Approval

```text
function isApprovedForAll(address owner, address operator) public view returns (bool);
```

Returns true if `operator` is authorized to transfer all tokens for `owner`.

This function is part of ERC721.

### Get Name Owner

```text
function ownerOf(uint256 label) external view returns(address);
```

`ownerOf` returns the address that owns the registration identified by the label hash, or reverts if the registration does not exist. Registrations that have not yet been migrated from the legacy registrar are treated the same as registrations that do not exist.

This function is part of [ERC721](https://github.com/ensdomains/ens/blob/master/docs/ethregistrar.rst#id7).

## Write Operations

### Transfer a Name

```text
function transferFrom(address from, address to, uint256 tokenId) public;
function safeTransferFrom(address from, address to, uint256 tokenId) public;
function safeTransferFrom(address from, address to, uint256 tokenId, bytes memory data) public;
```

These functions transfer the registration.

They behave as specified in [ERC721](https://github.com/ensdomains/ens/blob/master/docs/ethregistrar.rst#id9).

Emits the following event on a successful transfer:

```text
event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
```

### Approve Operator

```text
function approve(address to, uint256 tokenId) public;
function setApprovalForAll(address operator, bool _approved) public;
```

These functions manage approvals as documented in [ERC721](https://github.com/ensdomains/ens/blob/master/docs/ethregistrar.rst#id11).

### Reclaim ENS Record

```text
function reclaim(uint256 label) external;
```

Sets the owner record of the name in the ENS registry to match the owner of the registration in this registry. May only be called by the owner of the registration.

## Events

### Name Migrated

```text
event NameMigrated(uint256 indexed hash, address indexed owner, uint expires);
```

This event is emitted when a name is migrated from the legacy registrar.

### Name Registered

```text
event NameRegistered(uint256 indexed hash, address indexed owner, uint expires);
```

This event is emitted when a controller registers a new name.

### Name Renewed

```text
event NameRenewed(uint256 indexed hash, uint expires);
```

This event is emitted when a controller renews \(extends the registration of\) a name.

### Transfer

```text
event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
```

This event is emitted when registration is transferred to a new owner. This is distinct from the [ENS Registry](../ens.md)'s Transfer event, which records transfers of ownership of the ENS record.

