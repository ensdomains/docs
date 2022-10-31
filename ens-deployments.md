# ENS Deployments

If you are working with an [ENS library](dapp-developer-guide/ens-libraries.md), your library will automatically find the ENS deployment you need. If for whatever reason, you need to interact with ENS directly, details for the currently supported deployments are detailed here.

The ENS registry is deployed at 0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e. This same address is used across Mainnet and [Goerli](https://www.alchemy.com/overviews/migrate-from-rinkeby-to-goerli).

On mainnet, the following registrars are deployed:

* .eth, using the .eth Permanent registrar.
* .xyz, via DNS integration
* .luxe, via a [custom integration](http://join.luxe/) that allows any owner of a .luxe DNS name to use ENS.
* .kred, via a [custom integration](http://domains.kred/) that synchs and changes to a .kred ENS token to DNS automatically.
* .art, via a custom integration

To find out the contract address of each tld, check the "controller" address of the tld \(eg: [https://app.ens.domains/name/xyz](https://app.ens.domains/name/xyz) for `.xyz`

![](.gitbook/assets/screenshot-2021-05-19-at-17.54.17.png)

Ropsten test network has the .test registrar deployed. This registrar permits anyone to instantly register a domain for testing purposes; these domains persist for 28 days.

In addition, the test networks also have a deployment of the .eth registrar for testing purposes.

For other contract addresses such as root, multisig, controller, public resolver, and so on, you can see their address under [https://app.ens.domains/name/ens.eth/subdomains](https://app.ens.domains/name/ens.eth/subdomains)

Back in February 2020, the ENS registry was migrated to the new contract address to patch security vulnerabilities \(Read more detail [here](ens-migration-february-2020/technical-description.md)\). The prior registry addresses were:

* Mainnet, at [0x314159265dd8dbb310642f98f50c066173c1259b](https://etherscan.io/address/0x314159265dd8dbb310642f98f50c066173c1259b#code).
* Goerli, at [0x112234455c3a32fd11230c42e7bccd4a84e02010](https://goerli.etherscan.io/address/0x112234455c3a32fd11230c42e7bccd4a84e02010).

