# Preparing for ENSv2 [Everything you need to know to prepare your application for ENSv2.]

ENSv2 brings multi-chain support and improved architecture to ENS. While names can still be stored on Ethereum Mainnet, ENSv2 introduces Namechain as the primary Layer 2 for ENS, with support for additional L2s as well. To ensure your application works seamlessly with ENSv2, you'll need to make a few key updates.

The good news? For most applications, preparing for ENSv2 is as simple as updating to the latest version of a [supported library](/web/libraries). At the time of writing, not all libraries have added ENSv2 support yet. Here's the current status:

- [viem >= v2.35.0](https://github.com/wevm/viem/blob/main/src/CHANGELOG.md#2350)
- ethers.js: Not published yet. [Work in progress on v6.16.0](https://github.com/ethers-io/ethers.js/tree/wip-v6.16.0-ens)
- web3.js: Deprecated

:::info
**Using a supported library? You're done!** Everything is handled automatically.

The sections below are optional reading for those who want to understand the technical details or test their integration manually.
:::

## Universal Resolver

Even though ENSv2 is designed for multi-chain, all resolution still starts on Ethereum Mainnet. There is a [new Universal Resolver](/resolvers/universal) that acts as the canonical entry point. This is an upgradable proxy contract, owned be the ENS DAO, so its address won't change in the future if its implementation is changed.

Your application needs to use this new Universal Resolver in order to be ready for ENSv2. As mentioned above, updating to the latest version of your supported web3 library handles this automatically.

Learn more about the [Universal Resolver here](/resolvers/universal) and about the [resolution process in general here](/resolution).

### Testing Universal Resolver Support

To test if your integration uses the Universal Resolver, try resolving the address for `ur.gtest.eth`. It should return `0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE`. If it instead returns `0x1111111111111111111111111111111111111111`, you likely need to update your web3 library.

## Offchain and L2 Resolution with CCIP Read

ENSv1 already supports delegating resolution from Ethereum Mainnet to an L2 or completely offchain using [CCIP Read (ERC-3668)](/learn/ccip-read). All the libraries mentioned above implement CCIP Read. However, not all integrations handle it properly.

With ENSv2, users can store names on Ethereum Mainnet, Namechain, or any other supported L2. This makes CCIP Read support essential for your integration to work correctly.

In a nutshell, CCIP Read defers resolution to a gateway. Think of a gateway as an HTTP API. The response of the gateway can be verified with a read-call to the ENS contracts on Ethereum Mainnet (or Sepolia for testing). This means that your application needs to be able to send HTTP requests as part of the ENS resolution process. As mentioned above, this is already handled by the web3 libraries in the background.

Learn more about [CCIP-Read, Offchain and L2 resolvers here](/resolvers/ccip-read).

### Testing CCIP Read Support

To test if your integration properly implements CCIP Read, try resolving `test.offchaindemo.eth`. It should return the address `0x779981590E7Ccc0CFAe8040Ce7151324747cDb97`.

## DNS Names and Name Detection

ENS supports importing DNS names into ENS, allowing legacy domain names to work alongside .eth names. It's important that your application correctly also detects DNS names.

### Common Mistake: Only Matching .eth

Many integrations check if the input ends with `.eth` in order to detect an ENS name:

```js
if (input.endsWith('.eth') {
  // ...
}
```

This is **incorrect** because it excludes DNS names imported into ENS (like `ensfairy.xyz`).

### Correct Pattern: Match All Valid Domains

Instead, your integration should treat any dot-separated string as a potential ENS name. For example, `a.co` should be treated as a potential ENS name.

```js
if (input.includes('.') && input.length > 2) {
   // ...
}
```

This pattern correctly matches:

- `.eth` names like `vitalik.eth`
- DNS names like `ensfairy.xyz`
- Subdomains like `ses.fkey.id`
- Emoji domains like `🦇️🔊️🦇️🔊️🦇️🔊️.eth`

Learn more about [DNS integration here](/learn/dns). The full specification of name normalization is defined in [ENSIP-15](/ensip/15).

## Multichain Considerations

Even if your application only operates on an L2 like Base, ENS resolution always starts on Ethereum Mainnet. This means you need to configure a L1 client alongside your L2 chain.

### Configuring Both L2 and Mainnet

Here's how to set up your application to use Base (or another L2) while ensuring ENS resolution works correctly by including Mainnet:

:::code-group

```ts [Viem]
import { createPublicClient, http, toCoinType } from 'viem'
import { base, mainnet } from 'viem/chains'

// Client for Base transactions
const baseClient = createPublicClient({
  chain: base,
  transport: http(),
})

// Client for ENS resolution on Mainnet
const mainnetClient = createPublicClient({
  chain: mainnet,
  transport: http(),
})

// Get the Base address for this ENS name
const baseAddress = await mainnetClient.getEnsAddress({
  name: 'test.ses.eth',
  coinType: toCoinType(base.id),
})
```

```tsx [Wagmi]
import { createConfig, http, useEnsAddress } from 'wagmi'
import { toCoinType } from 'viem'
import { base, mainnet } from 'wagmi/chains'

export const config = createConfig({
  chains: [base, mainnet], // Include both your L2 and Mainnet
  transports: {
    [base.id]: http(),
    [mainnet.id]: http(),
  },
})

function MyComponent() {
  const { data: baseAddress } = useEnsAddress({
    name: "test.ses.eth",
    chainId: mainnet.id, // Always use mainnet for ENS resolution
    coinType: toCoinType(base.id) // Always specify the coinType (chain)
  });
}
```

```ts [Ethers]
import { ethers } from 'ethers'

// Provider for Base
const baseProvider = ethers.getDefaultProvider('base')

// Provider for ENS resolution on Mainnet
const mainnetProvider = ethers.getDefaultProvider('mainnet')

// Get the Base address for this ENS name
const resolver = await mainnetProvider.getResolver('test.ses.eth')
const baseAddress = await resolver?.getAddress(8453) // Base chain ID
```
:::

### Chain-Specific Addresses

It is possible to configure a different address per chain for the same name:
- `test.ses.eth` resolves to `0x2B0F09F23193de2Fb66258a10886B9f06903276c` for Ethereum Mainnet, but
- `test.ses.eth` resolves to `0x7d3a48269416507E6d207a9449E7800971823Ffa` for Base.

From an application point of view it is important to be aware and always request the address for the correct chain, even on Ethereum Mainnet. All examples above explicitly set the `coinType` to Base, since they request the Base address for a given name.

:::warning
Omitting the coinType currently resolves the Ethereum Mainnet (or Sepolia on testnet) address. This address is not guaranteed to work on L2s. Always double check with your user when sending funds to such an address.
:::