# ENS Layer2 and offchain data support

## Summary

With the proliferation of layer 2 solutions for Ethereum that are starting to reach maturity, it's important that ENS is able to provide resolution services across the entire ecosystem, as well as making it possible for ENS users to take advantage of the efficiencies made possible by Layer 2 solutions. Subsequent to a post by [Vitalik](https://ethereum-magicians.org/t/a-general-purpose-l2-friendly-ens-standard/4591) that suggested a possible means for this, the ENS team and the wider ENS and L2 community have been working on a general-purpose "Layer 2 bridge" that makes cross-platform interoperability possible for both ENS and other applications that need to be able to retrieve data from a variety of offchain sources (any data that resides outside of Ethereum Mainnet also known as layer 1/L1. This includes both propriety database and layer 2/L2 solutions such as Optimism, Arbitrum, Starkware, ZKSync, and so on) in a trustless fashion and came up with standards.

- [EIP-3668: CCIP Read: Secure offchain data retrieval](https://eips.ethereum.org/EIPS/eip-3668)
- [EIP-5559: Cross Chain Write Deferral Protocol](https://eips.ethereum.org/EIPS/eip-5559)
- [ENSIP 10: Wildcard Resolution](/ens-improvement-proposals/ensip-10-wildcard-resolution/)

**EIP 3668** (Final) allows for offchain (including Layer 2/L2) lookups of data in a way that is transparent to clients and provides contract authors to implement whatever validation is necessary; in many cases, this can be provided without any additional trust assumptions over and above those required if data is stored onchain.

**EIP 5559** (Draft) provides a mechanism in which smart contracts can request various tasks to be resolved by an external handler. This provides a mechanism in which protocols can reduce the gas fees associated with storing data on mainnet by deferring the handling of it to another system/network. These external handlers act as an extension to the core L1 contract.

**ENSIP 10** (Draft) is a general way to resolve wildcard (eg: \*.foo.eth) on L1. Issuing subdomains and moving the resolution of the parent name offchain allows dapps to create subdomains offchain yet make it accessible through L1.

## Steps required for Dapps and wallets to support offchain data lookup.

If your dapps or wallets use one of those libraries, the EIP 3668 and ENSIP 10 support will be built in, so simply update the library when ready. EIP 5559 is still in its early stage of draft and the content will be evolving

### [ethersjs](https://github.com/ethers-io/ethers.js)

ethers.js 5.6.2 supports both EIP3668 and ENSIP 10.

No code change is required as long as your app is interacting with ENS through [etherjs ENS methods](https://docs.ethers.io/v5/api/providers/provider/#Provider--ens-methods).

To try out these features, `offchainexample.eth` points to so-called "offchain resolver" that fetches data from JSON configuration file hosted on google app engine. It will reply data to any record for offchainexample.eth and its subdomain record such as `2.offchainexample.eth`. The example resolver is not using L2 data but the same mechanism works when the L2 resolver becomes ready.

```js
const { ethers } = require("ethers");
const url = `https://mainnet.infura.io/v3/${process.env.API_KEY}`;
const provider = new ethers.providers.JsonRpcProvider(url);

async function main() {
  let resolver = await provider.getResolver("1.offchainexample.eth");
  let address = await provider.resolveName("1.offchainexample.eth");
  let email = await resolver.getText("email");
  console.log({ resolver: resolver.address, address, email });
}
main();
```

The expected output is as follows.

```
$node index.js
{
  resolver: '0xC1735677a60884ABbCF72295E88d47764BeDa282',
  address: '0x41563129cDbbD0c5D3e1c86cf9563926b243834d',
  email: 'nick@ens.domains'
}
```

Please refer to [offchain resolver client example code](https://github.com/ensdomains/offchain-resolver/blob/main/packages/client/src/index.ts#L46) for more detail.

### Other supported libraries.

- [web3.py](https://web3py.readthedocs.io/en/stable/) (Python)
- [web3j](https://docs.web3j.io/) (Java)

If you use other libraries or custom integration, please raise the GitHub issue to the project repo or at [ENS project management repo](https://github.com/ensdomains/pm/issues) if the equivalent repo does not exist so that ENS team can keep track of the progress.

### Wallets integrated

- [Alpha Wallet](https://github.com/AlphaWallet)
- [Argent](https://github.com/argentlabs)
- [Coinbase Wallet](https://github.com/CoinbaseWallet)
- [Trust Wallet](https://github.com/trustwallet)
- [Umbra Wallet](https://github.com/ScopeLift/umbra-protocol)

## Steps required for Dapps and wallets to issue subdomains offchain

If you wish to issue subdomains using offchain data storage, please follow [offchain resolver](https://github.com/ensdomains/offchain-resolver) as a reference point. The example uses a flat file as a data source but can easily be replaced with database calls.

The following projects have integrated with the Offchain resolver for issuing their subdomains

- [cb.id by Coinbase](https://help.coinbase.com/en/wallet/managing-account/coinbase-ens-support)
- [optinames](https://optinames.eth.limo) = The code is closed sourced but you can read [the verified contract code](https://etherscan.io/address/0x4976fb03c32e5b8cfe2b6ccb31c09ba78ebaba41#code)

L2 support is still a work in progress.

## FAQ

### Is the change backwards compatible?

Yes. The existing names on L1 will continue working without clients nor applications supporting these standards. Only names that are outside of L1 will not be resolved.

### Will L2/offchain data be supported by GraphQL?

Once each L2 is officially supported, we will need to spin up a subgraph for each L2 bridge, and we will use schema stitching to make using them transparent to callers.

For names that are not hosted on a supported L2, we won't be able to fetch data that are normally only available on the subgraph

### How do you support other EVM compatible chains?

Non-L2 chains lack ways to verify data on L1 in the trustless manner. The alternative is for chain bridge operators to act as a trusted third-party and hosts the offchain gateway, or individual dapps hosts own gateway and sign each data with the private key of the ENS name.

### Can I issue a new tld unique to an offchain environment?

No. Please read ["Why ENS Doesn't Create More TLDs: Responsible Citizenship in the Global Namespace"](https://medium.com/the-ethereum-name-service/why-ens-doesnt-create-more-tlds-responsible-citizenship-in-the-global-namespace-7e66658fe2b1) for more detail

### Can I set a primary name to names on offchain?

Yes, you can. However, reverse registrar (it is a hidden top-level domain starting with .addr.reverse) currently resides on L1; hence you have to pay gas on L1. We may consider moving the reverse registrar to L2 in future.

### Can I register .eth name on offchain?

Only when we migrate .eth name to a specific L2 as one of the last steps of our migration after finding out which L2 supports ENS integration the best.

### How do I handle contract addresses?

Unlike EOA (Externally Owned Account), contract based accounts such as multisig may only be accessible in certain chains. [ENSIP-11](ens-improvement-proposals/ensip-11-evmchain-address-resolution.md) allows a single name to hold different addresses across multiple EVM compatible chains and recommendation is to store contract addresses to EVM chain specific address record field.

### Can I use libraries from other name services that support .eth?

`@unstoppabledomains/resolution` removed [ENS support as of December 2021](https://github.com/unstoppabledomains/resolution/releases/tag/v7.0.0). Other services tend not to support all ENS TLDs especially DNS based TLDs (.com, .net, etc) so we advise not to rely on these libraries resolving ENS names.

## References and previous discussions

- [MVP of ENS on L2 with Optimism: Demo Video + How to Try It Yourself](https://medium.com/the-ethereum-name-service/mvp-of-ens-on-l2-with-optimism-demo-video-how-to-try-it-yourself-b44c390cbd67)
- [A general-purpose bridge for Ethereum Layer 2s](https://medium.com/the-ethereum-name-service/a-general-purpose-bridge-for-ethereum-layer-2s-e28810ec1d88)
- [A general-purpose L2-friendly ENS standard](https://ethereum-magicians.org/t/a-general-purpose-l2-friendly-ens-standard/4591)
- [Video: ENS Workshop on 18th Oct 2021](https://www.youtube.com/watch?v=L9N7U_bNmOU)
- [Video: ENS Workshop on 6th April 2021](https://www.youtube.com/watch?v=9DdL7AQgXTM)
- [Video: ENS on Layer 2 meeting #2 on 28th Oct 2020](https://www.youtube.com/watch?v=QwEiAedSNYI)
- [Video: ENS on Layer 2 meeting on 13th Oct 2020](https://www.youtube.com/watch?v=vloI0VT8DXE)
- [Video: ENS workshop on 29th Sep 2020](https://www.youtube.com/watch?v=65z_j4n8mTk&t=2s)
