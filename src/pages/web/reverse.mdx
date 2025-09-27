---
description: To lookup the name of an address we use a reverse resolution. This allows users to indicate a primary name.
---

import { EmbedLink } from '../../components/EmbedLink'
import { EnsProfile } from '../../components/EnsProfile'
import { QandA } from '../../components/QandA'
import { Badge } from '../../components/ui/Badge'
import { Card } from '../../components/ui/Card'

# Primary Names

:::info
Primary names are now supported on both Ethereum Mainnet and popular L2s (Base, OP Mainnet, Arbitrum One, Scroll, and Linea). This enables users to have an end-to-end experience with ENS on their preferred L2!
:::

A "primary name" is the result of a bi-directional relationship between an EVM address and a human-readable ENS name. The two directions are:

1. Name -> Address (forward resolution)
2. Address -> Name (reverse resolution)

The outcome of this relationship makes it safe for applications to display ENS names instead of EVM addresses, leading to a better user experience.

<Card className="flex items-center justify-center gap-2">
  <span className="font-medium">0xb8c...67d5</span>
  <span>to</span>
  <EnsProfile name="nick.eth" hideAddress />
</Card>

While forward resolution is configured in [Resolvers](/resolvers/quickstart), reverse records are typically set via smart contracts called Reverse Registrars which you can [read more about below](#setting-primary-names).

## L2 Primary Names

Before we dive into code examples, let's first understand why things work the way they do.

Prior to August 2025, ENS users had to make a transaction on Ethereum Mainnet (L1) to set a primary name. More specifically, they had to set a reverse record on the [Reverse Registrar](/registry/reverse) contract which was only available on L1.

<QandA
  open
  question="What is the difference between a reverse record and a primary name?"
  answer="A reverse record is a mapping from an EVM address to an ENS name, which is only part of a primary name. In order for a primary name to be valid, the name must also forward resolve to the same address on the respective chain."
/>

Since a majority of user activity is now on L2s, we've added the ability to set a reverse record on the following Ethereum Rollups:

- Arbitrum
- Base
- Linea
- OP Mainnet
- Scroll

In addition to these chains, we've also added the ability to set a default reverse record on Ethereum Mainnet (L1) that serves as a fallback when no chain-specific primary name is set. This is the simplest way to set a universal primary name for users who have a wallet that supports all EVM chains.

While this may sound simple in theory, it's easy to get tripped on the details in practice. Let's look at an example.

### Understanding the Verification Process

The key thing to understand is that the forward address _for a given chain_ must match the reverse record on the respective chain's reverse registrar.

Say I own `nick.eth`. The name resolves to `0x1234...5678` because I've set the ETH address for that name. I call `setName("nick.eth")` on the Base reverse registrar, and I expect that my primary name is now `nick.eth` on Base. But that's actually not the case.

ENS names can resolve to [different addresses on different chains](/web/resolution), and since `nick.eth` in the example above has only specified an Ethereum Mainnet address, the verification process will fail. In order to fix this, I need to set the Base address for `nick.eth` which is on L1 in this case. This is done by calling the following function on the resolver for the name.

```solidity
setAddr(
  namehash("nick.eth"), // node (see Name Processing)
  convertEVMChainIdToCoinType(8453), // coinType (see ENSIP-11)
  0x1234...5678 // the address to set
)
```

Now that `nick.eth` resolves to `0x1234...5678` via the Base cointype, and `name(0x1234...5678)` on the Base reverse registrar returns `nick.eth`, my primary name is fully set.

An alternative approach, which would be more efficient in this case, is to set the default EVM address for `nick.eth` on the latest [public resolver](/resolvers/public), and the default reverse record to `nick.eth` on the default reverse registrar. This would allow the name to resolve to the correct address on all chains.

## Getting a Primary Name

:::info
**Important**: After retrieving a name from reverse resolution, you **must** verify it by performing a forward resolution on that name to confirm it still resolves to the original address. This prevents spoofing or misconfiguration. If the addresses don't match, display the original address instead of the name. Most libraries will handle this for you.
:::

Looking up a users L1 primary name is very simple. In most web3 libraries (wagmi, viem, ethers, web3py, etc.), you will find a built-in function to do a lookup by address as shown below. In most cases, the library will handle the verification for you.

Remember that in all cases, ENS resolution always starts from Ethereum Mainnet.

:::code-group

```tsx [Wagmi]
// https://wagmi.sh/react/hooks/useEnsName
import { useEnsName } from 'wagmi'
import { mainnet } from 'wagmi/chains'

export const Name = () => {
  const { data: name } = useEnsName({
    address: '0xb8c2C29ee19D8307cb7255e1Cd9CbDE883A267d5',
    chainId: mainnet.id, // resolution always starts from L1
  })

  return <div>Name: {name}</div>
}
```

```ts [Ethers v5]
const address = '0xb8c2C29ee19D8307cb7255e1Cd9CbDE883A267d5';
const name = await provider.lookupAddress(address);

// Always verify the forward resolution
if (name) {
    const resolvedAddress = await provider.resolveName(name);
    if (resolvedAddress !== address) {
        // If verification fails, use the original address
        return address;
    }
}
```

```ts [Viem]
// https://viem.sh/docs/ens/actions/getEnsName.html
import { publicClient } from './client'

const ensName = await publicClient.getEnsName({
  address: '0xb8c2C29ee19D8307cb7255e1Cd9CbDE883A267d5',
})
```

```py [Web3.py]
# https://web3py.readthedocs.io/en/latest/ens_overview.html#get-the-ens-name-for-an-address
from ens.auto import ns

name = ns.name('0xb8c2C29ee19D8307cb7255e1Cd9CbDE883A267d5')
```

```go [Go]
package main

import (
	"fmt"

	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/ethclient"
	ens "github.com/wealdtech/go-ens/v3"
)

func main() {
	client, _ := ethclient.Dial("https://rpc.ankr.com/eth")

	name, _ := ens.ReverseResolve(client, common.HexToAddress("0xb8c2C29ee19D8307cb7255e1Cd9CbDE883A267d5"))
	fmt.Println("Name:", name)
	// Name: nick.eth
}
```

:::

As of September 2025, Wagmi and Viem are the only libraries that support L2 Primary Names, and they can be used like this:

```tsx [Wagmi]
// https://wagmi.sh/react/hooks/useEnsName
import { toCoinType } from 'viem'
import { useEnsName } from 'wagmi'
import { base, mainnet } from 'wagmi/chains'

export const Name = () => {
  const { data: name } = useEnsName({
    address: '0xb8c2C29ee19D8307cb7255e1Cd9CbDE883A267d5',
    chainId: mainnet.id, // resolution always starts from L1
    coinType: toCoinType(base.id), // [!code ++]
  })

  return <div>Name: {name}</div>
}
```

:::info
The official implementation of L2 Primary Names has a propogation period of up to 6 hours. If you're participating in a hackathon and need to resolve a name immediately, you can use [this implementation](https://github.com/ensdomains/frontend-template/blob/main/src/hooks/useEnsNameOptimistic.tsx) instead (not recommended for production use).
:::

🎉 And that's it! Now you can turn all your pages from this, to this:

<Card className="flex flex-col items-center gap-2">
  <div className="flex items-center gap-2">
    <Badge>0xb8c2...67d5</Badge>
    <span>sent 0.1 ETH to</span>
    <Badge>0xd8dA....6045</Badge>
  </div>
  <span className="text-grey text-sm">turns into</span>
  <div className="flex items-center gap-2">
    <Badge>nick.eth</Badge>
    <span>sent 0.1 ETH to</span>
    <Badge>vitalik.eth</Badge>
  </div>
</Card>

:::info
If you're a library developer looking to implement this functionality, we recommend using the [Universal Resolver](/resolvers/universal). It's a utility contract that greatly simplifies the process of resolving a name.
:::

## Setting Primary Names

Since primary names require two-way resolution, there are technically two steps to setting it up. Let's say that user `0x1234...5678` wants to set their primary name on Base to `nick.eth`.

First, the user would need to set the Base address for `nick.eth` to `0x1234...5678`. [Read more about multichain addresses](/web/resolution#multi-chain-addresses-btc-ltc-etc) to understand how this works.

Next, the user would need to set the reverse record for `0x1234...5678` to `nick.eth` in the Base Reverse Registrar. [Read more about reverse records](/registry/reverse) to understand how this works.

In order to avoid doing this manually for multiple chains, the user can set their default reverse record to `nick.eth` on the default reverse registrar, and their default EVM address to `0x1234...5678` on the latest [public resolver](/resolvers/public).

<EmbedLink
  href="/registry/reverse"
  title="Reverse Registrars"
  description="Learn more about the smart contracts that manage reverse records on L1 and L2s."
/>
