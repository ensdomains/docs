# Writing a Resolver

Resolvers are specified in [EIP137](https://github.com/ethereum/EIPs/issues/137). A resolver must implement the following method:

```text
function supportsInterface(bytes4 interfaceID) constant returns (bool);
```

`supportsInterface` is defined in [EIP165](https://github.com/ethereum/EIPs/issues/165), and allows callers to determine if a resolver supports a particular record type. Record types are specified as a set of one or more methods that a resolver must implement together. Currently defined record types include:

| Record type | Function\(s\) | Interface ID | Defined in |
| :--- | :--- | :--- | :--- |
| Ethereum address | addr | 0x3b3b57de | [EIP137](https://github.com/ethereum/EIPs/issues/137) |
| ENS Name | name | 0x691f3431 | [EIP181](https://github.com/ethereum/EIPs/issues/181) |
| ABI specification | ABI | 0x2203ab56 | [EIP205](https://github.com/ethereum/EIPs/pull/205) |
| Public key | pubkey | 0xc8690233 | [EIP619](https://github.com/ethereum/EIPs/pull/619) |
| Text records | text | 0x59d1d43c | [EIP634](https://eips.ethereum.org/EIPS/eip-634) |
| Content hash | contenthash | 0xbc1c58d1 |  |

`supportsInterface` must also return true for the interfaceID value 0x01ffc9a7, which is the interface ID of `supportsInterface` itself.

Additionally, the `content` interface was used as a defacto standard for Swarm hashes, and has an interface ID of 0xd8389dc5. New implementations should use `contenthash` instead.

## Example Resolver

A simple resolver that supports only the addr type might look something like this:

```text
contract SimpleResolver {
    function supportsInterface(bytes4 interfaceID) constant returns (bool) {
        return interfaceID == 0x3b3b57de;
    }

    function addr(bytes32 nodeID) constant returns (address) {
        return address(this);
    }
}
```

This trivial resolver always returns its own address as answer to all queries. Practical resolvers may use any mechanism they wish to determine what results to return, though they should be constant, and should minimise gas usage wherever possible.

