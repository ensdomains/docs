---
description: >-
  Defines a resolver profile for ENS that provides features for storage and
  lookup of DNS records (formerly EIP-1185).
---

# ENSIP-6: DNS-in-ENS


| **Author**  | Jim McDonald (@mcdee), Hasan Adams (@buffrr) |
| ----------- | --------------------- |
| **Status**  | Draft                 |
| **Created** | 2018-06-26            |

### Abstract

This ENSIP defines a resolver profile for ENS that provides features for storage and lookup of DNS records. This allows ENS to be used as a store of authoritative DNS information.

### Motivation

ENS is a highly desirable store for DNS information. It provides the distributed authority of DNS without conflating ownership and authoritative serving of information. With ENS, the owner of a domain has full control over their own DNS records. Also, ENS has the ability (through smart contracts) for a domain's subdomains to be irrevocably assigned to another entity.

### Specification

The key words “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”, “SHOULD NOT”, “RECOMMENDED”, “MAY”, and “OPTIONAL” in this document are to be interpreted as described in RFC 2119.

The resolver profile to support DNS on ENS follows the resolver specification as defined in #137.

Traditionally, DNS is a zone-based system in that all of the records for a zone are kept together in the same file. This has the benefit of simplicity and atomicity of zone updates, but when transposed to ENS can result in significant gas costs for simple changes. As a result, the resolver works on the basis of record sets. A record set is uniquely defined by the tuple (domain, name, resource record type), for example the tuple (example.com, www.example.com, A) defines the record set of A records for the name www.example.com in the domain example.com. A record set can contain 0 or more values, for example if www.example.com has A records 1.2.3.4 and 5.6.7.8 then the aforementioned tuple will have two values. 

In ENS, nodes map directly to a resolver contract and every node has full autonomy. In contrast, DNS follows a hierarchical model, with parent zones delegating authority to child zones, and so on. To construct a more accurate representation of ENS in DNS, these record sets MUST be considered as partial record sets in the top-level domain zone, regardless of the number of labels a node has. This enables ENS to be compatible with most DNS features such as delegating nodes to a standard nameserver and supporting DNSSEC. For example, assuming a tuple defines the following NS record set: (example.com, example.com, NS) and has the values ns1.example.org and ns2.example.org, the domain example.com would be delegated to the specified nameservers. Furthermore, this delegation can be secured by DNSSEC using a Delegation Signer (DS) record set: (example.com, example.com, DS), effectively enabling ENS domains to use DNS as a trustless layer 2 solution. Record sets MUST continue to adhere to all DNS rules. By scanning the chain, it should be possible to export a DNS-compliant zone file, any record sets that do not comply with the DNS specification, including record sets that contain out of bailiwick records, MUST be ignored.

The choice to work at the level of record sets that are part of the TLD zone rather than domains having their own zones means that this specification can still be compatible with most features of DNS while being relatively cost effective. It would be possible to build a different resolver profile that works at the zone level, however it would be very expensive to carry out updates and would not necessarily reflect an accurate view of ENS in DNS and so is not considered further for this ENSIP.

Here's an example of how these ENS nodes would translate to DNS:

| ENS Node                  | Record sets                                                     |
| --------------------------| ----------------------------------------------------------------|
| `example.com`             | `(example.com, www.example.com, A)`                             |
| `example-2.com`           | `(example-2.com, example-2.com, NS)`                            |
| `example-2.com`           | `(example-2.com, example-2.com, DS)`                            |  
| `foo.example.com`         | `(foo.example.com, static.foo.example.com, A)`                  |  
| `static.foo.example.com`  | `(static.foo.example.com, static.foo.example.com, TXT)`         |
| `example-3.com`           | `(example-3.com, example-3.com, CNAME)`                         |

As a DNS zone file:

```
$ORIGIN com.
@                   IN    SOA     ...


www.example         IN    A      1.2.3.4
www.example         IN    A      5.6.7.8

example-2           IN    NS     ns1.example.org.
example-2           IN    NS     ns2.example.org.
example-2           IN    DS     28057 15 2 BFF60...

static.foo.example  IN    TXT    "hello"

; valid cname because it isn't at the zone apex
example-3           IN    CNAME  example.org.
```

Since an ENS node exists at `static.foo.example.com` (has a resolver set in the ENS registry), any record sets defined at `foo.example.com` with the name `static.foo.example.com` MUST be ignored. Moreover, it would be problematic for a node to exist at `bar.example-2.com` when the parent node `example-2.com` has a DNS delegation. If the subdomain `bar.example-2.com` exists within ENS, it MUST take precedence, effectively rendering the parent delegation non-functional, and thus, if you were to export such a zone file, the record sets `(example-2.com, example-2.com, NS)` and `(example-2.com, example-2.com, DS)` MUST be removed to adhere to DNS rules. Consequently, nodes MUST NOT define any subnodes within ENS when they are opting for a DNS delegation.


The DNS resolver interface consists of two functions to set DNS information and two functions to query DNS information.

#### setDNSRecords(bytes32 node, bytes data)

`setDNSRecords()` sets, updates or clears 1 or more DNS records for a given node. It has function signature `0x0af179d7`.

The arguments for the function are as follows:

* node: the namehash of the fully-qualified domain in ENS for which to set the records. Namehashes are defined in #137
* data: 1 or more DNS records in DNS wire format. Any record that is supplied without a value will be cleared. Note that all records in the same RRset should be contiguous within the data; if not then the later RRsets will overwrite the earlier one(s)

#### clearDNSZone(bytes32 node)

`clearDNSZone()` removes all DNS records for the domain. It has function signature `0xad5780af`.

Although it is possible to clear records individually with `setDNSRecords()` as described above this requires the owner to know all of the records that have been set (as the resolver has no methods to iterate over the records for a given domain), and might require multiple transactions. `clearDNSZone()` removes all zone information in a single operation.

The arguments for the function is as follows:

* node: the namehash of the fully-qualified domain in ENS for which to clear the records. Namehashes are defined in #137

#### dnsRecords(bytes32 node, bytes32 name, uint16 resource) view returns (bytes)

`dnsRecords()` obtains the DNS records for a given node, name and resource. It has function signature `0x2461e851`.

The arguments for the function are as follows:

* node: the namehash of the fully-qualified domain in ENS for which to set the records. Namehashes are defined in #137
* name: the `keccak256()` hash of the name of the record in DNS wire format.
* resource: the resource record ID. Resource record IDs are defined in https://en.wikipedia.org/wiki/List\_of\_DNS\_record\_types

The function returns all matching records in DNS wire format. If there are no records present the function will return nothing.

#### hasDNSRecords(bytes32 node, bytes32 name) view returns (bool)

`hasDNSRecords()` reports if there are any records for the provided name in the domain. It has function signature `0x4cbf6ba4`.

This function is needed by DNS resolvers when working with wildcard resources as defined in https://tools.ietf.org/html/rfc4592

The arguments for the function are as follows:

* node: the namehash of the fully-qualified domain in ENS for which to set the records. Namehashes are defined in #137
* name: the `keccak256()` hash of the name of the record in DNS wire format.

The function returns `true` if there are any records for the provided node and name, otherwise `false`.


### Backwards compatibility

Not applicable.

### Implementation

The reference implementation of the DNS resolver is at https://github.com/ensdomains/ens-contracts/blob/master/contracts/resolvers/profiles/DNSResolver.sol

https://github.com/wealdtech/ethereal.git can be used to test the functionality of the resolver with the "dns set", "dns get" and "dns clear" commands.

### Test Cases

Test cases for the DNS resolver are at https://github.com/wealdtech/wealdtech-solidity/blob/master/test/ens/DNSResolver.js

### Copyright

Copyright and related rights waived via [CC0](https://creativecommons.org/publicdomain/zero/1.0/).