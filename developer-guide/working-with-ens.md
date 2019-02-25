# Working with ENS

Before you can begin interacting with ENS, you will need to obtain a reference to the ENS registry. How you do this depends on the library you are using.

{% tabs %}
{% tab title="ethereum-ens" %}
```javascript
var ENS = require('ethereum-ens');
var ens = new ENS(web3.currentProvider);
```
{% endtab %}

{% tab title="web3.js" %}
```javascript
var ens = web3.eth.ens;
```
{% endtab %}

{% tab title="ethjs-ens" %}
```javascript
const ENS = require('ethjs-ens');
// Currently requires both provider and
// either a network or registryAddress param
const ens = new ENS({ provider, network: '1' });
```
{% endtab %}

{% tab title="ethers.js" %}
ENS functionality is provided directly on the core `provider` object.
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
{% endtabs %}

Some web3 libraries - at present, ethers.js, web3j, and web3.py - have integrated support for name resolution. In these libraries, you can pass in an ENS name anywhere you can supply an address, meaning you do not need to interact directly with their ENS APIs unless you want to manually resolve names or do other ENS operations.

If no library is available for your platform, you can instantiate the ENS registry contract directly using the interface definition [here](https://github.com/ensdomains/ens/blob/master/contracts/ENS.sol). Addresses for the ENS registry on each supported network are available in the [ENS Deployments](ens-deployments.md) page.

