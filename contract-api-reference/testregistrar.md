# TestRegistrar

[Source](https://github.com/ensdomains/ens-contracts/blob/master/contracts/registry/TestRegistrar.sol)

The Test registrar facilitates easy testing of ENS on the Ethereum test networks. Typically deployed on the .test TLD, it provides functionality to instantly claim a domain for test purposes, which expires 28 days after it was claimed.

## Register a Domain

```text
function register(bytes32 label, address owner) public;
```

Registers the subdomain whose `keccak256` hash is provided in `label`, and assigns ownership to `owner`. For example, to register _myname.test_, call `register` with `keccak256('myname')` as the first argument.

Registrations after 28 days.

## Get expiration time

```text
mapping (bytes32 => uint) public expiryTimes;
```

Returns the unix timestamp at which the specified subdomain will expire. For example, to check the expiration time of _myname.test_, call  `expiryTimes(keccak256('myname'))`.

