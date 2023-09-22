# ENS Deployments

If you are working with an [ENS library](dapp-developer-guide/ens-libraries.md), your library will automatically find the ENS deployment you need. If for whatever reason, you need to interact with ENS directly, details for the currently supported deployments are detailed here.

To use ENS on a test network, connect a wallet to [https://app.ens.domains](https://app.ens.domains) and switch networks. The app will automatically detect the connected network.

### Mainnet

These are also subdomains under [ens.eth](https://app.ens.domains/ens.eth?tab=subnames) for convenience.

| Name                     | Contract Address                           |
| ------------------------ | ------------------------------------------ |
| Base Registrar           | 0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85 |
| DNS Registrar            | 0x58774Bb8acD458A640aF0B88238369A167546ef2 |
| ETH Registrar Controller | 0x253553366Da8546fC250F225fe3d25d0C782303b |
| Name Wrapper             | 0xD4416b13d2b3a9aBae7AcD5D6C2BbDBE25686401 |
| Public Resolver          | 0x231b0Ee14048e9dCcD1d247744d114a4EB5E8E63 |
| Registry                 | 0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e |
| Reverse Registrar        | 0xa58E81fe9b61B5c3fE2AFD33CF304c454AbFc7Cb |

### Goerli:

| Name                     | Contract Address                           |
| ------------------------ | ------------------------------------------ |
| Base Registrar           | 0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85 |
| DNS Registrar            | 0x8edc487D26F6c8Fa76e032066A3D4F87E273515d |
| ETH Registrar Controller | 0xCc5e7dB10E65EED1BBD105359e7268aa660f6734 |
| Name Wrapper             | 0x114D4603199df73e7D157787f8778E21fCd13066 |
| Public Resolver          | 0xd7a4F6473f32aC2Af804B3686AE8F1932bC35750 |
| Registry                 | 0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e |
| Reverse Registrar        | 0x4f7A657451358a22dc397d5eE7981FfC526cd856 |

### Sepolia:

| Name                     | Contract Address                           |
| ------------------------ | ------------------------------------------ |
| Base Registrar           | 0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85 |
| ETH Registrar Controller | 0xFED6a969AaA60E4961FCD3EBF1A2e8913ac65B72 |
| Name Wrapper             | 0x0635513f179D50A207757E05759CbD106d7dFcE8 |
| Public Resolver          | 0x8FADE66B79cC9f707aB26799354482EB93a5B7dD |
| Registry                 | 0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e |
| Reverse Registrar        | 0xA0a1AbcDAe1a2a4A2EF8e9113Ff0e02DD81DC0C6 |

To find out the contract address of each TLD, check the "manager" address (eg: [https://app.ens.domains/tld/xyz](https://app.ens.domains/tld/xyz) for `.xyz`).
