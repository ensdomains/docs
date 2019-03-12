# Deploying ENS on a Private Chain

If you’d like to deploy ENS on your own network, or deploy your own copy of ENS on a public network, this guide shows you how. If you want to use an existing ENS deployment, see [Resolving Names](dapp-developer-guide/resolving-names.md), [Managing Names](dapp-developer-guide/managing-names.md), and [Registering & Renewing Names](dapp-developer-guide/registering-and-renewing-names.md) instead.

On this page we will use Javascript, Web3 and [Truffle](https://truffleframework.com/) for simplicity.

## Deploy the Registry

First, you need to deploy ENS’s central component, the registry.

```javascript
const ens = await ENS.new();
```

Once deployed, you will have a fresh ENS registry, whose root node is owned by the account that submitted the transaction. This account has total control over the ENS registry - it can create and replace any node in the entire tree.

From here, it's possible to create and manage names by directly interacting with the registry, as described in [Managing Names](dapp-developer-guide/managing-names.md). However, you will probably want to [deploy a resolver](deploying-ens-on-a-private-chain.md#deploy-a-resolver), and you may want to [deploy a registrar](deploying-ens-on-a-private-chain.md#deploy-a-registrar) so other users can register names.

## Deploy a Resolver

For most purposes, it's convenient to have a general-purpose resolver available that users can easily use for their names. Deploying one is straightforward:

```javascript
const publicResolver = await PublicResolver.new(ens.address);
```

For ease of use, we can give this resolver a name:

```javascript
const namehash = require('eth-ens-namehash');
await ens.setSubnodeOwner("0x0000000000000000000000000000000000000000", sha3("resolver"), accounts[0]);
await ens.setResolver(namehash.hash("resolver"), publicResolver.address);
await publicResolver.setAddr(namehash.hash("resolver"), publicResolver.address);
```

Above, we first create a new top-level domain, "resolver", then set its resolver address to our newly deployed public resolver. Finally, we set up an address record for "resolver", pointing back to the resolver address. In effect, the resolver is answering queries about its own address. After this, anyone can find the public resolver at the special ENS name "resolver".

## Deploy a Registrar

In order to allow others to register domains without your direct intervention, you will need to deploy a registrar contract, and set it as the owner of a top-level domain that you want it to assign subdomains of. Here, we'll use the simple [FIFSRegistrar](https://github.com/ensdomains/ens/blob/master/contracts/FIFSRegistrar.sol), and set it as the owner of the top-level domain _test_:

```javascript
const sha3 = require('web3-utils').sha3;
const testRegistrar = await FIFSRegistrar.new(ens.address, namehash.hash("test"));
ens.setSubnodeOwner("0x0000000000000000000000000000000000000000", sha3("test"), testRegistrar);
```

Any user can now register domains under _.test_ by calling the `register` function:

```javascript
await testRegistrar.register(sha3("alice"), accounts[0]);
```

After calling the above function, `accounts[0]` now has ownership of the name _alice.test_.

## Deploy the Reverse Registrar

If you wish to enable reverse resolution on your deployment, you will need to deploy the reverse registrar:

```javascript
const reverseRegistrar = await ReverseRegistrar.new(ens.address, publicResolver.address);
await ens.setSubnodeOwner("0x0000000000000000000000000000000000000000", sha3("reverse"), accounts[0]);
await ens.setSubnodeOwner(namehash.hash("reverse"), sha3("addr"), reverseRegistrar.address);
```

