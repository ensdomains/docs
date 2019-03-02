# ENS Deployments

If you are working with an [ENS library](developer-guide/ens-libraries.md), your library will automatically find the ENS deployment you need. If for whatever reason, you need to interact with ENS directly, details for the currently supported deployments are detailed here.

The following are the official ENS registry deployments:

* Mainnet, at [0x314159265dd8dbb310642f98f50c066173c1259b](https://etherscan.io/address/0x314159265dd8dbb310642f98f50c066173c1259b#code).
* Ropsten, at [0x112234455c3a32fd11230c42e7bccd4a84e02010](https://ropsten.etherscan.io/address/0x112234455c3a32fd11230c42e7bccd4a84e02010).
* Rinkeby, at [0xe7410170f87102df0055eb195163a03b7f2bff4a](https://rinkeby.etherscan.io/address/0xe7410170f87102df0055eb195163a03b7f2bff4a).
* Goerli, at [0x112234455c3a32fd11230c42e7bccd4a84e02010](https://goerli.etherscan.io/address/0x112234455c3a32fd11230c42e7bccd4a84e02010).

On mainnet, the following registrars are deployed:

* .eth, using the auction registrar.
* .xyz, via DNS integration
* .luxe, via a [custom integration](http://join.luxe/) that allows any owner of a .luxe DNS name to use ENS.

All test networks have the .test registrar deployed. This registrar permits anyone to instantly register a domain for testing purposes; these domains persist for 28 days.

In addition, the Ropsten test network has a deployment of the .eth registrar for testing purposes.

