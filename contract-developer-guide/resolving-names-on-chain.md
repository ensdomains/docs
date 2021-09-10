# Resolving Names On-chain

Solidity libraries for on-chain resolution are not yet available, but ENS resolution is straightforward enough it can be done trivially without a library. First, we define some pared-down interfaces containing only the methods we need:

```text
abstract contract ENS {
    function resolver(bytes32 node) public virtual view returns (Resolver);
}

abstract contract Resolver {
    function addr(bytes32 node) public virtual view returns (address);
}
```

For resolution, only the `resolver` function in the ENS contract is required; other methods permit looking up owners and updating ENS from within a contract that owns a name.

With these definitions, looking up a name given its node hash is straightforward:

```text
contract MyContract {
    ENS ens;

    function MyContract(address ensAddress) public {
        ens = ENS(ensAddress);
    }

    function resolve(bytes32 node) public view returns(address) {
        Resolver resolver = ens.resolver(node);
        return resolver.addr(node);
    }
}
```

While it is possible for a contract to process a human-readable name into a node hash, we highly recommend working with node hashes instead, as they are easier and more efficient to work with, and allow contracts to leave the complex work of normalizing the name to their callers outside the blockchain. Where a contract always resolves the same names, those names may be converted to a node hash and stored in the contract as a constant.

