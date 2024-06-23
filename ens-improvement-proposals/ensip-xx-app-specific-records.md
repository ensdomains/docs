---
description: App-specific records
---

# ENSIP-XX: App-specific records

| **Author**    | Jeff Lau \<jeff@ens.domains> |
| ------------- | ---------------------------------- |
| **Status**    | Draft                              |
| **Submitted** | 2023-08-28                         |

### Abstract

This ENSIP extends [ENSIP 9 (multichain address resolution)](ensip-9-multichain-address-resolution.md) and [ENSIP 11 (multichain address resolution)](ensip-11-multichain-address-resolution.md) and [ENSIP 5 (Text Records)](ensip-5-text-records.md) to include a way to app specific addresses and public keys.

This allows a separation of concerns between a user's main Ethereum/EVM-chain account and a signing key specific to an application allowing easy rotation of those keys. 

### Motivation

Apps such as Farcaster that use Sign in with Ethereum as a primary login require the generation of a new EoA. It is also possible that you may want to split your address usage across different applications for address hygiene, security or privacy reason. Lastly with account abstraction becoming more popular, we may end up with an increasing amount of different addresses for different applications that man need to be connected.

In any of these situation we can now connect your main address, which could be an EoA, a smart contract wallet or an address derived from a [government id](https://ethglobal.com/showcase/myna-uxzdd), email or social media account to this app-specific signing key via an ENS name and/or reverse resolution. This gives a separation of concerns and allows you to also rotate signing keys if and when required by replacing the signing key stored in your ENS account.

Lastly this also gives flexibility with what kind of signing key is required, and allows applications to use a non-EoA to use Sign in with Ethereum.

With current state of L1, this kind of flexibility would be a rather large overhead, but with the move of data to L2s, this cost should come down considerably and we should be able to give users flexibility 

### Specification

Applications can decide whether or not to include a SECP256k1 public key, Ethereum address or even a separate public/private key scheme entirely. The public key could be exposed for secure messaging, or if the application only cares about authentication, then an address should be sufficient. 

```
resolver.binaryRecord(node, 'xyz.farcaster')
resolver.setBinaryRecord(node, 'xyz.farcaster', '0x123...')
```

#### Resolver Profile

A new resolver interface is defined, consisting of the following method:

```solidity
interface IBinaryResolver {
  /// @notice Returns the binary data associated with a key for an ENS name
  /// @param node A nodehash for an ENS name
  /// @param key A key to lookup text data for
  /// @return The binary data
  function binaryRecord(bytes32 node, string key) view returns (bytes data);
}
```

### Example use case

* If you have address 0x123... on Optimism
* You setup a reverse record for 0x123... to example.eth
* You setup forward resolution for optimism to 0x123 to complete reverse resolution
* You create 0x456... (could be non-ethereum address) on Farcaster
* You set the farcaster record on example.eth to 0x456...
* You now have a connection from 0x123... (your main optimism address) to 0x456... your farcaster address
* You add your ENS name to your account settings in Farcaster (stored in FC's hub servers)
* Now Farcaster can check your farcaster address in example.eth and show records from example.eth or NFTs you own on example.eth
* You can take the private key and put it onto any device, and login to Farcaster seemlessly by putting the key on the device
* This key gives access to your Farcaster account, but if a device is compromised, you can rotate the key to a new account rather than having to transfer all your assets out of your main account.

### Considerations

Should the spec also deal with chains? E.g.

```
    resolver.binaryRecord(node, 'farcaster')
    resolver.setBinaryRecord(node, 'xyz.farcaster[420]', '0x123...')
    addr(node, uint256(keccak256("farcaster['optimism']")))
    addr(node, uint256(keccak256("farcaster[420]")))
```

Some apps may only use one chain like farcaster. Some may use multiple chains (such as defi apps). This specification is more for applications that would 1) want to be be public about their signing keys, such as social applications

