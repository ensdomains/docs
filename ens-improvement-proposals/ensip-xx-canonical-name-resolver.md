---
description: Allows names to set a cname to alias records to another name
---

# ENSIP-XX: CNAME resolver

| **Author**    | Jeff Lau \<jeff@ens.domains>
| ------------- | ---------------------------------------------------------------- |
| **Status**    | Draft                                                            |
| **Submitted** | 2023-09-25                                                       |

### Abstract

Canonical Name records have existed for DNS since the 1987 in [RFC 1034](https://datatracker.ietf.org/doc/html/rfc1034). They allow aliasing a name to another name e.g. vitalik.eth to records.vitalik.eth. This specification outlines a resolver standard to implement CNAMEs at a resolver level without having to change the base ENS name resolution protocol.

### Specification

If a cname is found on a name, all records that are unset will be expected to proxy through the specified cname's records. Records that are already set on the resolver will ignore the cname.

### Implementation

```solidity
interface ICnameResolver {
    event CNameChanged(bytes32 indexed node, string name);
    function cname(bytes32 node) external view returns (string memory);
}
```

```solidity
contract CnameResolver {
    function addr(bytes32 node, uint256 coinType){
        bytes memory currentAddr = versionable_addresses[recordVersions[node]][node][coinType];

        if(currentAddr.length == 0 && cname.length != 0){
            return ens.resolver(namehash(cname)).addr();
        }

       return currentAddr
    }
}
```

### Motivation

* Allows separation of concerns between records and ownership of a high value name
* Allows mirroring records for other names without having to set the records manually

### Open Questions

* DNS does not allow other records (except DNSSEC) when a cname has been set. ENS could optionally allow records on the main name to overwrite the cname, or it could choose to ignore them until a cname has been deleted. In the above specification, I've chosen to respect the main resolver's records.
* We could also make the protocol more granular by allowing cnames per-record, which would allow you to delegate just a single record to a different name if necessary. This could be useful for allowing a service to take over that record for a name (e.g. contenthash)
