# ENS Libraries

ENS support is available in many popular languages. If you know of a library that is not listed here, please [send us a PR](https://github.com/ensdomains/ens/compare).

### Javascript

* [ethereum-ens](https://www.npmjs.com/package/ethereum-ens), maintained by the ENS developers
* [ethjs-ens](https://www.npmjs.com/package/ethjs-ens)
* [ethers.js](https://github.com/ethers-io/ethers.js)
* [web3.js](https://web3js.readthedocs.io/en/1.0/web3-eth-ens.html)

#### Which Javascript library should I use?

If you are already using web3.js, and do not require functionality such as creating subdomains, transferring ownership, or updating resolvers, use web3.js's ENS support.

If you are already using ethjs, and only need to do forward and reverse resolution of ENS names, use ethjs's ENS support.

If you are already using ethers.js, and only need to do forward and reverse resolution of ENNS names, use ethers.js's ENS support.

Otherwise, use ethereum-ens.

#### Accessing smart contracts directly

All the ENS smart contracts are [Truffle](https://truffleframework.com) projects and published as npm modules \(eg: [ENS registry](https://www.npmjs.com/package/@ensdomains/ens)\). If you want to access to functions none of the above libraries support you can install the smart contracts via npm.

* [Resolver](https://www.npmjs.com/package/@ensdomains/resolver) = `Resolver.sol` contains all function names including the deprecated functions \(eg: `content`\)
* [Permanent Registrar](https://www.npmjs.com/package/@ensdomains/ethregistrar)
* [Registry and old Registrar](https://www.npmjs.com/package/@ensdomains/ens)

The bytecode and abi are precompiled and can be imported from the modules.

```text
import { abi , bytecode } from '@ensdomains/ens/build/contracts/ENS.json'
```

### Java

* [web3j](https://github.com/web3j/web3j)

### Python

* [web3.py](https://github.com/ethereum/web3.py) - also see [web3.py ENS docs](https://web3py.readthedocs.io/en/stable/ens_overview.html)

### Go

* [go-ens](https://github.com/wealdtech/go-ens)

### Command-line

* [ethereal](https://github.com/wealdtech/ethereal)
* [ethers-ens](https://github.com/ethers-io/ethers-ens)

### Delphi

* [delphereum](https://github.com/svanas/delphereum)

## Next Steps

Once you've chosen a library, read [Working with ENS](working-with-ens.md) to learn how to use your chosen ENS library in your application.

