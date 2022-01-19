# ENS Layer2 and offchain data support

With the proliferation of layer 2 solutions for Ethereum that are starting to reach maturity, it’s important that ENS is able to provide resolution services across the entire ecosystem, as well as making it possible for ENS users to take advantage of the efficiencies made possible by Layer 2 solutions. Subsequent to a post by [Vitalik](https://ethereum-magicians.org/t/a-general-purpose-l2-friendly-ens-standard/4591) that suggested a possible means for this, the ENS team and the wider ENS and L2 community have been working on a general-purpose "Layer 2 bridge" that makes cross-platform interoperability possible for both ENS and other applications that need to be able to retrieve data from a variety of offchain sources in a trustless fashion and came up with standards.

- [EIP-3668: CCIP Read: Secure offchain data retrieval](https://eips.ethereum.org/EIPS/eip-3668)
- [ENSIP 10: Wildcard Resolution](https://docs.ens.domains/ens-improvement-proposals/ensip-10-wildcard-resolution)
- [ENSIP 11: Wildcard Resolution](https://docs.ens.domains/ens-improvement-proposals/ensip-10-wildcard-resolution)

EIP 3668 allows for offchain (any data that resides outside of Ethereum Mainnet also known as L1. This includes both prepriorty database and layer 2 solutions such as Optimism, Arbitrum, Starkware, ZKSync, and so on) lookups of data in a way that is transparent to clients, and allows contract authors to implement whatever validation is necessary; in many cases this can be provided without any additional trust assumptions over and above those required if data is stored onchain.


## Dapps and wallets supporting Layer 2/ offchain data resolution.

If your dapps or wallets 

- ethersjs
- web3js

## Dapps and wallets issuing subdomains on Layer 2 / offchain


## FAQ

### Is the change backwards compatible?

Yes. The existing names on L1 will continute being resolved without clients nor applications supporting these standards. Only names on outside of L1 will not be resolved.

### Will L2/offchain data be supported by GraphQL?

Once each L2 is officially supported, we will need to spin up a subgraph for each L2 bridge, and we will use schema stitching to make using them transparent to callers.

For names that are not hosted on a supported L2, we won't be able to fetch data that's normally only available on the subgraph

### How do you support other EVM compatible chains?


### Can I have a tld unique to specific L2?

No.Please read ["Why ENS Doesn’t Create More TLDs: Responsible Citizenship in the Global Namespace"](https://medium.com/the-ethereum-name-service/why-ens-doesnt-create-more-tlds-responsible-citizenship-in-the-global-namespace-7e66658fe2b1) for more detail

### Can I set primary name to names on L2?

Yes, you can. However, reverse registrar (it is a hidden top level domain starting with .addr.reverse) currently resides on L1 hence you have to pay gas on L1. We may consider moving the reverse registrar to L2 in future.

### Can I register .eth name on L2?

Only when we migrate .eth name to a specific L2. This will be one of the last steps of our migration after we find out which l2 supports ENS integration the best.

## References and previous discussions

- [MVP of ENS on L2 with Optimism: Demo Video + How to Try It Yourself](https://medium.com/the-ethereum-name-service/mvp-of-ens-on-l2-with-optimism-demo-video-how-to-try-it-yourself-b44c390cbd67)
- [A general-purpose bridge for Ethereum Layer 2s](https://medium.com/the-ethereum-name-service/a-general-purpose-bridge-for-ethereum-layer-2s-e28810ec1d88)
- [A general-purpose L2-friendly ENS standard](https://ethereum-magicians.org/t/a-general-purpose-l2-friendly-ens-standard/4591)
- [Video: ENS Workshop on 18th Oct 2021 ](https://www.youtube.com/watch?v=L9N7U_bNmOU)
- [Video: ENS Workshop on 6th April 2021](https://www.youtube.com/watch?v=9DdL7AQgXTM)
- [Video: ENS on Layer 2 meeting #2 on 28th Oct 2020](https://www.youtube.com/watch?v=QwEiAedSNYI)
- [Video: ENS on Layer 2 meeting on 13th Oct 2020](https://www.youtube.com/watch?v=vloI0VT8DXE)
- [Video: ENS workshop on 29th Sep 2020](https://www.youtube.com/watch?v=65z_j4n8mTk&t=2s)
