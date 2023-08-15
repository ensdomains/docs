# ENS Libraries

ENS support is available in many popular languages. If you know of a library that is not listed here, please [send us a PR](https://github.com/ensdomains/ens/compare).

### Javascript

* [ensjs](https://www.npmjs.com/package/@ensdomains/ensjs), maintained by the ENS developers
* [wagmi](https://www.npmjs.com/package/wagmi), React Hooks for Ethereum with native ENS support
* [viem](https://www.npmjs.com/package/viem)
* [ethers.js](https://github.com/ethers-io/ethers.js)
* [web3.js](https://web3js.readthedocs.io/en/1.0/web3-eth-ens.html)
* [embark.io](https://framework.embarklabs.io/docs/naming_configuration.html)
* [waffle.io](https://ethereum-waffle.readthedocs.io/en/latest/ens.html)

We also have a component library for React called [Thorin](https://thorin.ens.domains/) if you're looking for a design system to build your dapp with.

#### Which Javascript library should I use?

If you are already using web3.js or ethers.js, and do not require functionality such as creating subdomains, transferring ownership, or updating resolvers, use built in ENS features of these libraries.

If you are using React and only need to do forward and reverse resolution of ENS names, use wagmi.

If you want to have ENS instance deployed into your dev environment, you may want to use embark.io or waffle.io which allows you to configure/deploy ENS registry in your Ethereum test instance.

Otherwise, use ensjs.

#### Accessing smart contracts directly

All the ENS smart contracts are published as `@ensdomains/ens-contracts` [npm module.](https://github.com/ensdomains/ens-contracts)

This is how you include abi into your frontend code.

```text
import {
  ENS,
  PublicResolver
} from '@ensdomains/ens-contracts'`
```

This is how you import our smartcontract within Solidity.

```text
import '@ensdomains/ens-contracts/contracts/registry/ENS.sol';
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

