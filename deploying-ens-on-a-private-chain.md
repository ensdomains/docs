# Deploying ENS on a Private Chain

If you’d like to deploy ENS on your own network, or deploy your own copy of ENS on a public network, this guide shows you how. If you want to use an existing ENS deployment, see [Resolving Names](dapp-developer-guide/resolving-names.md), [Managing Names](dapp-developer-guide/managing-names.md), and [Registering & Renewing Names](dapp-developer-guide/registering-and-renewing-names.md) instead.

On this page we will use Javascript, Web3, and [Truffle](https://truffleframework.com/) with npm for simplicity. You will find a complete migration file example [at the bottom of this page](deploying-ens-on-a-private-chain.md#migration-file-example).

## Importing contracts

The essential smart contracts are published as npm modules \(eg: [ENS registry and registrar](https://www.npmjs.com/package/@ensdomains/ens), [resolvers](https://www.npmjs.com/package/@ensdomains/resolver)\).
You can install them in your Truffle/npm project with `npm install @ensdomains/ens` and `npm install @ensdomains/resolver`.
Now, you can require them in a migration script as follows (see the [Truffle Documentation](https://truffleframework.com/docs/truffle/getting-started/package-management-via-npm) on working with contract artifacts and npm for details)

```javascript
var ENS = artifacts.require("@ensdomains/ens/ENSRegistry");
```

Including them within your smart contract is as follows

```javascript
import "@ensdomains/ens/contracts/ENS.sol";
```

`ENS` contains only an interface while `ENSRegistry` includes the actual implementation.



## Deploy the Registry
The registry is ENS’s central component and stores, among other things, who owns which domain.
You can deploy it in a Truffle migration script.

```javascript
var ENS = artifacts.require("@ensdomains/ens/ENSRegistry");

module.exports = function(deployer) {
  deployer.deploy(ENS);
};
```

Once deployed, you will have a fresh ENS registry, whose root node is owned by the account that submitted the transaction. This account has total control over the ENS registry - it can create and replace any node in the entire tree.

From here, it's possible to create and manage names by directly interacting with the registry, as described in [Managing Names](dapp-developer-guide/managing-names.md). However, you will probably want to [deploy a resolver](deploying-ens-on-a-private-chain.md#deploy-a-resolver), and you may want to [deploy a registrar](deploying-ens-on-a-private-chain.md#deploy-a-registrar) so other users can register names.

## Deploy a Resolver
Records in the registry can point to resolver contracts which store additional domain information.
The most common use-case is to store an address for a domain, but storing a contract ABI or text is also possible.
For most purposes on private networks it's convenient to have an unrestricted general-purpose resolver available. Deploying one is straightforward:

```javascript
const ENS = artifacts.require("@ensdomains/ens/ENSRegistry");
const PublicResolver = artifacts.require("@ensdomains/resolver/PublicResolver");

module.exports = function(deployer, network, accounts) {
  // Registry
  deployer.deploy(ENS)
  // Resolver
  .then(function(ensInstance) {
    return deployer.deploy(PublicResolver, ens.address);
  })
};
```
The [`PublicResolver`](https://github.com/ensdomains/resolvers/blob/master/contracts/PublicResolver.sol) looks up ownership in the registry, which is why the registry's address is required at deployment.

For ease of use, we can give this resolver a name:

```javascript
const utils = require('web3-utils');
const namehash = require('eth-ens-namehash');

async function setupResolver(ens, resolver, accounts) {
  const resolverNode = namehash.hash("resolver");
  const resolverLabel = utils.sha3("resolver");

  await ens.setSubnodeOwner("0x0000000000000000000000000000000000000000", resolverLabel, accounts[0]);
  await ens.setResolver(resolverNode, resolver.address);
  await resolver.setAddr(resolverNode, resolver.address);
}
```

Above, we first create a new top-level domain, "resolver", then set its resolver address to our newly deployed public resolver. Finally, we set up an address record for "resolver", pointing back to the resolver address. In effect, the resolver is answering queries about its own address. After this, anyone can find the public resolver at the special ENS name "resolver".
We call this function after deploying the public resolver in a `.then()` block as we did with the resolver.

## Deploy a Registrar
So far, domains can only be registered manually by the owner of the registry's root node.
Fortunately, contracts can also own nodes.
This means we can set up a registrar contract as the owner of a node, e.g. "test", in the registry which enables it to distribute subdomains such as "mycontract.test".
It allows us to have custom, on-chain logic which governs domain allocation.
Once we own a (sub-)node we are free to repeat this process and set up another registrar.
If you are part of the "myorg" organisation you could register "myorg.test" and let it point to your custom registrar which only allows certified members of your organisation to claim subdomains such as "bob.myorg.test".
 For our private network, we'll use the simple 'first come, first served' [FIFSRegistrar](https://github.com/ensdomains/ens/blob/master/contracts/FIFSRegistrar.sol), and set it as the owner of the top-level domain "test" in our migration script:

```javascript
...
.then(function() {
  return deployer.deploy(FIFSRegistrar, ens.address, ens.address, namehash.hash("test"));
})
.then(function(registrarInstance) {
  return ens.setSubnodeOwner("0x0000000000000000000000000000000000000000", sha3("test"), registrarInstance.address);
})
...
```


## Deploy the Reverse Registrar
Similarly, if you wish to enable reverse resolution on your deployment, you will need to deploy the reverse registrar:

```javascript
...
  .then(function() {
    return deployer.deploy(ReverseRegistrar, ens.address, resolver.address);
  })
  .then(function(reverseRegistrarInstance) {
    return setupReverseRegistrar(ens, resolver, reverseRegistrarInstance, accounts);
  })
...
})

async function setupReverseRegistrar(ens, resolver, reverseRegistrar, accounts) {
  await ens.setSubnodeOwner("0x0000000000000000000000000000000000000000", utils.sha3("reverse"), accounts[0]);
  await ens.setSubnodeOwner(namehash.hash("reverse"), utils.sha3("addr"), reverseRegistrar.address);
}
```

## Migration File Example
We can combine the steps above in a single Truffle migration file. This allows us to deploy ENS in one go:

```javascript
const ENS = artifacts.require("@ensdomains/ens/ENSRegistry");
const FIFSRegistrar = artifacts.require("@ensdomains/ens/FIFSRegistrar");
const ReverseRegistrar = artifacts.require("@ensdomains/ens/ReverseRegistrar");
const PublicResolver = artifacts.require("@ensdomains/resolver/PublicResolver");

const utils = require('web3-utils');
const namehash = require('eth-ens-namehash');

const tld = "test";

module.exports = function(deployer, network, accounts) {
  let ens;
  let resolver;
  let registrar;

  // Registry
  deployer.deploy(ENS)
  // Resolver
  .then(function(ensInstance) {
    ens = ensInstance;
    return deployer.deploy(PublicResolver, ens.address);
  })
  .then(function(resolverInstance) {
    resolver = resolverInstance;
    return setupResolver(ens, resolver, accounts);
  })
  // Registrar
  .then(function() {
    return deployer.deploy(FIFSRegistrar, ens.address, namehash.hash(tld));
  })
  .then(function(registrarInstance) {
    registrar = registrarInstance;
    return setupRegistrar(ens, registrar);
  })
  // Reverse Registrar
  .then(function() {
    return deployer.deploy(ReverseRegistrar, ens.address, resolver.address);
  })
  .then(function(reverseRegistrarInstance) {
    return setupReverseRegistrar(ens, resolver, reverseRegistrarInstance, accounts);
  })
};

async function setupResolver(ens, resolver, accounts) {
  const resolverNode = namehash.hash("resolver");
  const resolverLabel = utils.sha3("resolver");

  await ens.setSubnodeOwner("0x0000000000000000000000000000000000000000", resolverLabel, accounts[0]);
  await ens.setResolver(resolverNode, resolver.address);
  await resolver.setAddr(resolverNode, resolver.address);
}

async function setupRegistrar(ens, registrar) {
  await ens.setSubnodeOwner("0x0000000000000000000000000000000000000000", utils.sha3(tld), registrar.address);
}

async function setupReverseRegistrar(ens, resolver, reverseRegistrar, accounts) {
  await ens.setSubnodeOwner("0x0000000000000000000000000000000000000000", utils.sha3("reverse"), accounts[0]);
  await ens.setSubnodeOwner(namehash.hash("reverse"), utils.sha3("addr"), reverseRegistrar.address);
}
```
