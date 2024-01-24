# Quickstart Guide for Frontend Developers

At a high level, the goal of ENS is to abstract away long Ethereum addresses with human-readable names. This makes it more enjoyable for users to interact with your application, and easier for you to build applications that are easy to use.

ENS names can also store other information besides addresses, such as metadata about a user in [text records](../ens-improvement-proposals/ensip-5-text-records.md). Think about it like a portable web3 profile.

The purpose of this guide is to get you up and running with an ENS-enabled application in just a few minutes, perfect for hackathon-like scenarios. For the sake of simplicity, we will assume that you are building a web application with React.

## Prerequisites

We will be using [wagmi](https://wagmi.sh/) and [Rainbowkit](https://www.rainbowkit.com/) in Next.js to interact with ENS and Ethereum.

{% hint style="info" %}
If you prefer to clone an already functioning example project, take a look at our [Next.js template](https://github.com/ensdomains/frontend-template).
{% endhint %}

Install the following dependencies:

{% tabs %}
{% tab title="yarn" %}

```bash
yarn add wagmi viem @rainbow-me/rainbowkit
```

{% endtab %}

{% tab title="npm" %}

```bash
npm install wagmi viem @rainbow-me/rainbowkit
```

{% endtab %}
{% endtabs %}

{% hint style="info" %}
This would be a good time to install a component library like [Thorin](https://thorin.ens.domains/), the ENS design system, but it is not required for this guide.
{% endhint %}

To configure wagmi, create a file called `providers.ts`:

```tsx
import { getDefaultWallets } from '@rainbow-me/rainbowkit'
import { configureChains, createConfig } from 'wagmi'
import { goerli, mainnet } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'

// Even if you're app doesn't use mainnet ETH, you still need it in this array for ENS
export const chains = [mainnet, goerli]

const { publicClient } = configureChains(chains, [publicProvider()])

const { connectors } = getDefaultWallets({
  // Get your own WalletConnect ID: https://cloud.walletconnect.com/sign-in
  projectId: '6a91f5d54cffa882391a51b006c01fc8',
  appName: 'ENS App',
  chains,
})

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
})
```

Then in your main `_app.tsx` file, wrap your app in the wagmi and Rainbowkit providers:

```tsx
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import { WagmiConfig } from 'wagmi'

import { chains, wagmiConfig } from './providers'

export default function App({ Component, pageProps }: AppProps) {
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => setIsMounted(true), [])

  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        {isMounted && <Component {...pageProps} />}
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
```

Now we have an app that is ready to interact with ENS and Ethereum.

## Name/address resolution

Resolution works in two directions: forward resolution, which is the process of fetching an address from a name, and reverse resolution, which is the process of fetching a name from an address.

### Forward resolution

To resolve an address from a name, we can use the `useEnsAddress` hook. You can use this to accept names as input from users in a recipient field, for example.

```tsx
import { useEnsAddress } from 'wagmi'

function App() {
  const name = 'nick.eth'
  const ensName = useEnsAddress({ name, chainId: 1 })

  if (ensName.isLoading) return <div>Fetching address…</div>
  if (ensName.isError) return <div>Error fetching address</div>
  return <div>Address: {ensName.data}</div>
}
```

### Reverse resolution

{% hint style="info" %}
Reverse resolution must be set by the user. [Learn more here](../contract-api-reference/reverseregistrar.md)
{% endhint %}

To reverse resolve a name and avatar from an address, we can use the `useEnsName` and `useEnsAvatar` hooks. You can use this to display a user's profile next to some action they've taken in your app, for example.

```tsx
import { useEnsAvatar, useEnsName } from 'wagmi'

function App() {
  const address = '0xb8c2C29ee19D8307cb7255e1Cd9CbDE883A267d5'
  const ensName = useEnsName({ address, chainId: 1 })
  const ensAvatar = useEnsAvatar({ name: ensName.data, chainId: 1 })

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
      }}
    >
      <img
        src={ensAvatar.data || 'https://i.imgur.com/UhV7H97.jpeg'}
        style={{ width: '2rem', height: '2rem', objectFit: 'cover' }}
      />
      <span>
        {ensName.isError
          ? 'Error loading name'
          : ensName.isLoading
          ? 'Loading...'
          : ensName.data || 'No name set'}
      </span>
    </div>
  )
}
```

If you want to fetch additional text records, [see this `useEnsText` hook](https://gist.github.com/gskril/b144d3edaab82e5f31c78b94ba61f872) while we wait for our PR to be merged into wagmi.

## Things to keep in mind

ENS is more complex than people often realize at first glance, and there are a few things to keep in mind when building an ENS-enabled application.

- ENS is more than .eth names (namely DNS TLDs). Instead of hardcoding `.eth` into your application, assume any input with a "`.`" can be an ENS name.
- Not all ENS names exist on a blockchain (see [ENS Layer2 and offchain data support](./ens-l2-offchain.md)). This logic is abstracted from you in libraries like wagmi, but it's important to keep in mind when thinking about indexing and searching for names.
- The source of truth for ENS names is the [ENS registry contract](../contract-api-reference/ens.md) on mainnet Ethereum. This means that even if a user is connected to a different chain, you should always resolve names on mainnet. This is why we pass `chainId: 1` to the hooks above.
