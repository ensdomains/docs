# Working with ENS

Before you can begin interacting with ENS, you will need to obtain a reference to the ENS registry. How you do this depends on the library you are using.

The Javascript libraries \(ethers.js, viem, wagmi, ensjs, and web3.js\) can be used in any environment. If you're building a React app, we recommend [wagmi](#React-hooks-for-ENS).

{% tabs %}
{% tab title="ethers.js" %}
```javascript
import { providers } from 'ethers'

const provider = new providers.JsonRpcProvider('RPC_URL_HERE');
// ENS functionality is provided directly on the core provider object.
```
{% endtab %}

{% tab title="viem" %}
```javascript
import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'

const client = createPublicClient({ chain: mainnet, transport: http() });
// ENS functionality is provided directly on the core client
```
{% endtab %}

{% tab title="ensjs" %}
```javascript
import { ENS } from '@ensdomains/ensjs'
import { providers } from 'ethers'

const ens = new ENS();
const provider = new providers.JsonRpcProvider('RPC_URL_HERE');
await ens.setProvider(provider);
```
{% endtab %}

{% tab title="web3.js" %}
```javascript
import { Web3 } from 'web3'

const web3 = new Web3('RPC_URL_HERE');
const ens = web3.eth.ens;
```
{% endtab %}

{% tab title="go-ens" %}
```go
import (
  ens "github.com/wealdtech/go-ens/v2"
  ethereum "github.com/ethereum/go-ethereum"
)

// Can dial up a connection through either IPC or HTTP/HTTPS
client, err := ethereum.Dial("/home/ethereum/.ethereum/geth.ipc")
registry, err := ens.Registry(client)
```
{% endtab %}

{% tab title="web3.py" %}
```python
from ens.auto import ns
```
{% endtab %}

{% tab title="web3j" %}
```java
EnsResolver ens = new EnsResolver(web3j, 300 /* sync threshold, seconds */);
```
{% endtab %}

{% tab title="nethereum" %}
```.net
var ensService = new Nethereum.ENS.ENSService(web3);
```
{% endtab %}

{% endtabs %}

Some web3 libraries - e.g., ethers.js, viem, web3j, and web3.py - have integrated support for name resolution. In these libraries, you can pass in an ENS name anywhere you can supply an address, meaning you do not need to interact directly with their ENS APIs unless you want to manually resolve names or do other ENS operations.

If no library is available for your platform, you can instantiate the ENS registry contract directly using the interface definition [here](https://github.com/ensdomains/ens-contracts/blob/master/contracts/registry/ENS.sol). Addresses for the ENS registry on each supported network are available in the [ENS Deployments](../ens-deployments.md) page.

## React hooks for ENS

[wagmi](https://wagmi.sh/) is a collection of React Hooks containing everything you need to start working with Ethereum, including ENS.

To get access to wagmi's ENS hooks, wrap your project in a `WagmiConfig` provider:

```jsx
import { WagmiConfig, configureChains, createConfig } from 'wagmi'
import { goerli, mainnet } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'

const chains = [mainnet, goerli]
const { publicClient } = configureChains(chains, [publicProvider()])

const wagmiConfig = createConfig({
  publicClient,
})

export default function App() {
  return (
    <WagmiConfig config={wagmiConfig}>
      {/* Your app here */}
    </WagmiConfig>
  )
}
```
