# ENS Libraries

ENS support is available in many popular languages. If you know of a library that is not listed here, please [send us a PR](https://github.com/ensdomains/ens/compare).

### Javascript

* [ensjs](https://www.npmjs.com/package/@ensdomains/ensjs), maintained by the ENS developers
* [ethereum-ens](https://www.npmjs.com/package/ethereum-ens) \(deprecated\)
* [react-ens-address](https://github.com/ensdomains/react-ens-address)
* [ethers.js](https://github.com/ethers-io/ethers.js)
* [web3.js](https://web3js.readthedocs.io/en/1.0/web3-eth-ens.html)
* [embark.io](https://framework.embarklabs.io/docs/naming_configuration.html)
* [waffle.io](https://ethereum-waffle.readthedocs.io/en/latest/ens.html)

#### Which Javascript library should I use?

If you are already using web3.js or ethers.js, and do not require functionality such as creating subdomains, transferring ownership, or updating resolvers, use built in ENS features of these libraries.

If you are using React and only need to do forward and reverse resolution of ENS names with built in UI, use react-ens-address.

If you want to have ENS instance deployed into your dev environment, you may want to use embark.io or waffle.io which allows you to configure/deploy ENS registry in your Ethereum test instance.

Otherwise, use ensjs.

#### Accessing smart contracts directly

All the ENS smart contracts are [Truffle](https://truffleframework.com) projects and published as npm modules \(eg: [ENS registry](https://www.npmjs.com/package/@ensdomains/ens)\). If you want to access to functions none of the above libraries support you can install the smart contracts via npm.

* [Resolver](https://www.npmjs.com/package/@ensdomains/resolver) = `Resolver.sol` contains all function names including the deprecated functions \(eg: `content`\)
* [Permanent Registrar](https://www.npmjs.com/package/@ensdomains/ethregistrar)
* [Registry and old Registrar](https://www.npmjs.com/package/@ensdomains/ens-contracts)

The bytecode and abi are precompiled and can be imported from the modules.

```text
import { abi , bytecode } from '@ensdomains/ens-contracts/build/contracts/ENS.json'
```

### Java

* [web3j](https://github.com/web3j/web3j)

### Kotlin

* [KEthereum](https://github.com/komputing/KEthereum/tree/master/ens)

### Python

* [web3.py](https://github.com/ethereum/web3.py) - also see [web3.py ENS docs](https://web3py.readthedocs.io/en/stable/ens_overview.html)

### Go

* [go-ens](https://github.com/wealdtech/go-ens)

### Command-line

* [ethereal](https://github.com/wealdtech/ethereal)

### Delphi

* [delphereum](https://github.com/svanas/delphereum)

## Next Steps

Once you've chosen a library, read [Working with ENS](working-with-ens.md) to learn how to use your chosen ENS library in your application.

