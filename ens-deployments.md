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

Prior to the ENS migration, ENS registry addresses were:

* Mainnet, at [0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e](https://etherscan.io/address/0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e#code).
* Ropsten, at [0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e](https://ropsten.etherscan.io/address/0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e).
* Rinkeby, at [0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e](https://rinkeby.etherscan.io/address/0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e).
* Goerli, at [0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e](https://goerli.etherscan.io/address/0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e).



