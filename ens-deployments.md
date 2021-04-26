# ENS Deployments

If you are working with an [ENS library](dapp-developer-guide/ens-libraries.md), your library will automatically find the ENS deployment you need. If for whatever reason, you need to interact with ENS directly, details for the currently supported deployments are detailed here.

The ENS registry is deployed at 0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e. This same address is used across Mainnet, Ropsten, Rinkeby and Goerli.

On mainnet, the following registrars are deployed:

* .eth, using the auction registrar.
* .xyz, via DNS integration
* .luxe, via a [custom integration](http://join.luxe/) that allows any owner of a .luxe DNS name to use ENS.
* .kred, via a [custom integration](http://domains.kred/) that synchs and changes to a .kred ENS token to DNS automatically.
* .art, via a custom integration

All test networks have the .test registrar deployed. This registrar permits anyone to instantly register a domain for testing purposes; these domains persist for 28 days.

In addition, the test networks also have a deployment of the .eth registrar for testing purposes.

Back in February 2020, the ENS registry was migrated to the new contract address to patch security vulnabilities \(Read more detail [here](ens-migration-february-2020/technical-description.md)\). The prior registry addresses were:

* Mainnet, at [0x314159265dd8dbb310642f98f50c066173c1259b](https://etherscan.io/address/0x314159265dd8dbb310642f98f50c066173c1259b#code).
* Ropsten, at [0x112234455c3a32fd11230c42e7bccd4a84e02010](https://ropsten.etherscan.io/address/0x112234455c3a32fd11230c42e7bccd4a84e02010).
* Rinkeby, at [0xe7410170f87102df0055eb195163a03b7f2bff4a](https://rinkeby.etherscan.io/address/0xe7410170f87102df0055eb195163a03b7f2bff4a).
* Goerli, at [0x112234455c3a32fd11230c42e7bccd4a84e02010](https://goerli.etherscan.io/address/0x112234455c3a32fd11230c42e7bccd4a84e02010).

