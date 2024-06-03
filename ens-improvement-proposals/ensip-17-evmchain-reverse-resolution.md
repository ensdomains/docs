---
description: >-
  Specifies reverse resolution in a cross-chain context
---

# ENSIP-XX: EVM-chain Reverse Resolution

| **Author**    | Jeff Lau \<jeff@ens.domains> |
| ------------- | ---------------------------- |
| **Status**    | Draft                        |
| **Submitted** | 2023-03-14                   |

## Abstract

This ENSIP specifies a way for reverse resolution to be used on other EVM chains. This allows setting primary names on L2s, as well as resolving any other records set on this specific reverse record, such as the avatar.

## Motivation

Reverse resolution has been in use since ENS's inception, however at the time Ethereum had no concrete scaling plans. In the past 5 years, we've seen layer 2s and sidechains become more prevalent and we first allowed support for these with ENSIP-9 (formerly EIP-2304) to allow addresses from other chains to be stored on ENS. To complete support for other EVM chains, reverse resolution needs to be expanded to allow reverse resolution to also exist.

## Specification

### Overview

* Reverse registrars will be setup on each EVM-chain, with a corresponding registry
* Reverse registrar will only allow setting the name and text record without resolver customisability. This is to allow a consistent storage slot that can be checked on L1.
* User can now claim their reverse on this chain and set it to their ENS name
* Their ENS name will need to set their record for the same EVM-cointype as the network, which is specified in [ENSIP-11](https://docs.ens.domains/ensip/11).
* A dapp can then detect the chainID that a user is on, convert that into coinType in hexadecimal and resolve their primary ens name by resolving the name record at [userAddress].[coinTypeAsHex].reverse. This will be resolved via a CCIP-read gateway and look up the reverse record on the corresponding EVM-chain. Depending on if the chain is an L2 that has state roots on L1 or sidechain, verification can be done with trusted signatures or trustlessly on Ethereum mainnet.
* Dapps will then resolve this name via ENS on L1 to check if the forward resolution matches. This forward resolution can be on L1, or the user can set up a CCIP-read resolver and records for each network and put those addresses wherever they want (such as on another L2)
* Once matched, the dapp can then also resolve any text records on the primary ENS name, such as avatar.
* Discovery of the reverse registrar on each chain will be done by looking up the `addr()` of [coinTypeAsHex].reverse.
* coinType in all instances will be the hex representation to reduce the length of the name

### Deployment and discovery of EVM Reverse registrars

When a new EVM reverse registrar is deployed, it will need to be setup by the owner of the `reverse` node, to setup a subdomain [coinTypeAsHex].reverse. It must then be setup with an Offchain resolver that has an onchain L1 address record that return the contract address of the reverse registrar for that chain. The Offchain resolver will also support wildcard of all the address subdomains with the format [address].[coinTypeAsHex].reverse. Additionally there must be a new EVM gateway setup to handle the CCIP-read revert errors that will go to the corresponding network to gather the chain-specific reverse record and verify this data on L1.

### Resolving Primary ENS Names by a dapp

Below is a step-by-step resolution process of ENS reverse resolution. A dapp must adhere to these rules to be compliant with the reverse resolution process. This reverse resolution process adds on to ENSIP-3's original reverse resolution process and will act as a replacement for applications that support Primary ENS names on multiple chains.

#### Glossary of terms

* `[address]` is the lowercase hexadecimal representation of an Ethereum address with prefix `0x` removed.

* `coinType` for chain ids is derived using [ENSIP-11](https://docs.ens.domains/ensip/11) by ORing the chainId with `0x80000000`

* `coinTypeAsHex` is the cointype converted to hexadecimal.

* Registry refers to the ENS registry on Ethereum L1

* Resolver refers to the resolver of the Reverse node whether on L1 or another chain

* Primary Name is the common name use for the reverse node's record `name`

#### Resolution process

1) If a dapp has a connected user it SHOULD first check the chainId of the user.
2) It will then construct the cointype using ENSIP-11: `coinType = 0x80000000 | chainId`, which must be converted to lower-case hexadecimal representation.
3) If the chainId is 1, it should call `[address].addr.reverse`, then skip to step 5.
4) If the chainId is not 1, it should then construct the ENS node representing the reverse node on that network using the coinType and the user's connected `address`: `node = namehash([address].[coinTypeAsHex].reverse)`
5) Call the registry with the namehash to retrieve the resolver `resolver = registry.resolver(node)`
6) Call name on the resolver `name = resolver.name(node)`
7) If a string is found, skip to step 13
8) If `name` is an empty string, it will check the default primary name for all EVM chains by constructing its node as follows: `node = namehash([address].default.reverse)`.
9) Call the registry with the namehash to retrieve the resolver `resolver = registry.resolver(node)`
10) Call name on the resolver `name = resolver.name(node)`
11) If a string is found, skip to step 13
12) If `name` is an empty string, the dapp assumes that a primary name does not exist and instead show the address instead. The name resolution process ends here.
13) If the dapp finds an ENS name, it first checks the forward resolution. This can be done by using the resolution processs in [ENSIP-10](https://docs.ens.domains/ensip/10)
14) In constructing the ENSIP-10 `resolve()` calldata it will construct the addr function with the appropriate coinType. If the chainId was 1, it uses chainId 60 (mainnet) without converting or using the legacy `addr(bytes32 node)` function without an additional cointype argument. If a name was found on step 7, it must use the `coinType` from the chainId of the user. If a name was found at step 10, which is the default Primary name for EoAs, it must check the coinType of chainId 0, which represents [an EoA across all EVM chains](https://namespaces.chainagnostic.org/eip155/caip10). `resolvedAddress = resolver.addr(coinType)`
15) If `resolvedAddress == address`, the dapp considers the Primary Name verified, and can now show this instead of the address within the application.
16) If `resolvedAddress != address` the dapp considers the Primary Name unverified and shows the address instead.
    
Note: The dapp MUST NOT use the reverse record set for Ethereum mainnet ([address].addr.reverse) even if the Primary ENS name has not been set on the target chain, and must treat this identically to an address with no primary name set. 

### Resolving an avatar by a dapp on another EVM chain

ENSIP-12 was concieved before the ENS L2 reverse resolution specification and therefore should be updated to reflect the current state of ENS primary name resolution. This means that all avatar records are able to be updated on a per-chain basis by updating the avatar record on their reverse node.

#### Example of resolving an avatar on an L2 or EVM chain

To determine the avatar URI for a specific EVM chain address, the client MUST reverse-resolve the address by querying the ENS registry on Ethereum for the resolver of `<address>.<coinTypeAsHex>.reverse`, where `<address>` is the lowercase hex-encoded Ethereum address, without leading '0x'. Then, the client SHOULD call `.text(namehash('<address>.<coinType>.reverse'), 'avatar')` to retrieve the avatar URI for the address.

If a resolver is returned for the reverse record, but calling `text` causes a revert or returns an empty string, the client CAN call `.name(namehash('<address>.<coinType>.reverse'))`. If this method returns a valid ENS name, the client MUST:

1. Validate that the reverse record is valid, by resolving the returned name and calling `addr` on the resolver, checking it matches the original evmChainId (converted to cointype) address.
2. Perform [ENSIP-12 Avatar text record resolution](https://docs.ens.domains/ensip/12) on the primary name.

A failure at any step of this process MUST be treated by the client identically as a failure to find a valid avatar URI.

### Examples of valid L2 reverse resolution

* Arbitrum: 0F32b753aFc8ABad9Ca6fE589F707755f4df2353.2147525809.reverse
* Optimism:
0F32b753aFc8ABad9Ca6fE589F707755f4df2353.2147483658.reverse
* Base: 0F32b753aFc8ABad9Ca6fE589F707755f4df2353.2147492101.reverse
* Polygon ZKEVM: 0F32b753aFc8ABad9Ca6fE589F707755f4df2353.2147484749.reverse
* ZKSync Era: 0F32b753aFc8ABad9Ca6fE589F707755f4df2353.2147483972.reverse

### Deprecating use of mainnet primary ENS name on other chains

ENS has not been explicit about how to use the mainnet `addr()` record and it is often used as a backup to a user not having an address record set. The mainnet reverse record has also historically been used on other EVM chains due to no alternative on that specific chain. There are a few reasons why it would undesirable to encourage use of mainnet primary name and/or `addr(node, 60)` record as a backup for it not being set on another EVM chain.

An example of why this could be confusing:

Dapp is on Arbitrum and uses mainnet primary ENS name. It resolves the ENS name's mainnet address and uses that to verify the reverse record is correct. It also uses the mainnet address to allow in-app transfers.

Mainnet primary ENS name that has an `addr(node, 60)` that is a smart contract wallet. The smart contract wallet is only on Ethereum and the user is unable to use `CREATE2` to deploy the same smart contract wallet on arbitrum. User 2 sees this Primary ENS name and wants to send funds to User 1. User 2 resolves the `addr()` of the ENS name and sends the funds to an address that doesn't exist on arbitrum and User 1 has no way to access the counterfactual address on that chain.

If we mandated that the address cannot use `addr(node, 60)`, but only the address of the chain in question, it would be possible to use mainnet as a backup. However the fact remains that you would still need to claim and set your Primary ENS name on mainnet, and the possibility for confusion seem to outweigh the benefits of using mainnet (high gas) as a catch-all back up for other L2 EVM chains (low gas). Additionally this would only be useful for EVM-compatible chains and would not benefit non-EVM L2s that have a different address format. 

## Being explicit about default Primary ENS Name

To make things explicit we will require the signing of a message to confirm that the address in question would like to use mainnet or another network as fallback. This would either resolve directly on mainnet. Defaults would only be applicable to EoAs that can sign a message. This is because smart contract accounts would not be able to reliably set a default on all chains.

### Setting default

1) Sign a message to set a default record
2) call `setName()` on the default registrar on L1

Possibility: Allowing L1 Primary ENS names to also use `default.reverse`. This could be incorporated into the public resolver's `name()` function.

### Copyright

Copyright and related rights waived via [CC0](https://creativecommons.org/publicdomain/zero/1.0/).
