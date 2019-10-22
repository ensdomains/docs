# Resolving Names

## Looking up Ethereum addresses

The simplest and most frequently used function in ENS is resolving a name. Names can have many types of data associated with them; the most common is an Ethereum address. Resolving a name to an Ethereum address using a library is simple:

{% tabs %}
{% tab title="ethereum-ens" %}
```javascript
var address = await ens.resolver('alice.eth').addr();
```
{% endtab %}

{% tab title="web3.js" %}
```javascript
var address = ens.getAddress('alice.eth');
```
{% endtab %}

{% tab title="ethjs-ens" %}
```javascript
var address = await ens.lookup('alice.eth');
```
{% endtab %}

{% tab title="ethers.js" %}
```javascript
var address = await provider.resolveName('alice.eth');
```

ethers.js also supports using ENS names anywhere you would use an address, meaning you often do not need to directly call `resolveName`. For example, to look up an account's balance, you can do:

```javascript
var balance = await provider.getBalance('alice.eth');
```

Or, to instantiate a contract:

```javascript
const abi = [
  "function getValue() view returns (string value)",
  "function setValue(string value)"
];
const contract = new ethers.Contract('contract.alice.eth', abi, provider);
```
{% endtab %}

{% tab title="go-ens" %}
```go
address, err := ens.Resolve(client, "alice.eth")
```
{% endtab %}

{% tab title="web3.py" %}
```text
address = ns.address('alice.eth')
```
{% endtab %}

{% tab title="web3j" %}
```java
String address = ens.resolve("alice.eth");
```

web3j also supports using ENS names anywhere you would use an address, meaning you often do not need to directly interact with the `EnsResolver` object. For example, t o instantiate a contract interface, you can do:

```java
YourSmartContract contract = YourSmartContract.load(
        "contract.alice.eth", web3j, credentials, GAS_PRICE, GAS_LIMIT);
```
{% endtab %}
{% endtabs %}

Resolution without a library is a three step process:

1. Normalise and hash the name - see [name processing](../contract-api-reference/name-processing.md) for details.
2. Call `resolver()` on the ENS registry, passing in the output of step 1. This returns the address of the resolver responsible for the name.
3. Using the [resolver interface](https://github.com/ensdomains/resolvers/blob/master/contracts/Resolver.sol), call `addr()` on the resolver address returned in step 2, passing in the hashed name calculated in step 1.

Multicoin address resolution support is implemented with an additional overload on `addr()`.  To resolve a multicoin address, supply both the namehash and the [SLIP44](https://github.com/satoshilabs/slips/blob/master/slip-0044.md) chain ID of the cryptocurrency whose address you want to resolve. For example, to resolve a Bitcoin address, you would call `addr(hash, 0)`. Note that the returned address will be in binary representation, and so will need decoding to a text-format address; for details, see [EIP 2304](https://eips.ethereum.org/EIPS/eip-2304).

{% hint style="warning" %}
If you are resolving addr\(\) records, you MUST treat a return value from the resolver of 0x00…00 as that record being unset. Failing to do so could result in users accidentally sending funds to the null address if they have configured a resolver in ENS, but not set the resolver record!
{% endhint %}

## Looking up other resources

ENS supports many types of resources besides Ethereum addresses, including content hashes for data stored in Swarm or IPFS, contract interfaces \(ABIs\), and text-based metadata. The process for looking these up varies from library to library; for specific details see your chosen library's documentation.

Resolving these content types without a library follows the same 3-step process detailed above; simply call the relevant method on the resolver in step 3 instead of `addr()`.

## Reverse Resolution

While 'regular' resolution involves mapping from a name to an address, reverse resolution maps from an address back to a name - or other metadata. ENS supports reverse resolution to allow applications to display ENS names in place of hexadecimal addresses.

Reverse resolution is accomplished via the special purpose domain _addr.reverse_ and the resolver function `name()`. _addr.reverse_ is owned by a special purpose registrar contract that allocates subdomains to the owner of the matching address - for instance, the address _0x314159265dd8dbb310642f98f50c066173c1259b_ may claim the name _314159265dd8dbb310642f98f50c066173c1259b.addr.reverse_, and configure a resolver and records on it. The resolver in turn supports the `name()` function, which returns the name associated with that address.

{% hint style="danger" %}
ENS does not enforce the accuracy of reverse records - for instance, anyone may claim that the name for their address is 'alice.eth'. To be certain that the claim is accurate, you must always perform a forward resolution for the returned name and check it matches the original address.
{% endhint %}

Most libraries provide functionality for doing reverse resolution:

{% tabs %}
{% tab title="ethereum-ens" %}
```javascript
const address = '0x1234...';
var name = await ens.reverse(address).name()
// Check to be sure the reverse record is correct.
if(address != await ens.resolver(name).addr()) {
  name = null;
}
```
{% endtab %}

{% tab title="web3.js" %}
Not supported.
{% endtab %}

{% tab title="ethjs-ens" %}
```javascript
var address = '0x1234...';
var name = await ens.reverse(address);
// Check to be sure the reverse record is correct.
if(address != await ens.lookup(name)) {
  name = null;
}
```
{% endtab %}

{% tab title="ethers.js" %}
```text
var address = '0x1234...';
var name = await provider.lookupAddress(address);
// ethers.js automatically checks that the forward resolution matches.
```
{% endtab %}

{% tab title="go-ens" %}
```go
name, err := ens.ReverseResolve(client, common.HexToAddress("0x1234...")
```
{% endtab %}

{% tab title="web3.py" %}
```python
address = '0x1234...'
name = ns.reverse(address)
# Check to be sure the reverse record is correct.
if address != ns.address(name):
  name = None
```
{% endtab %}

{% tab title="web3j" %}
```java
String address = "0x1234...";
String name = ens.reverseResolve(address);
// Check to be sure the reverse record is correct.
if(address != ens.resolve(name)) {
  name = null;
}
```
{% endtab %}
{% endtabs %}

Reverse resolution without a library follows the same pattern as forward resolution: Get the resolver for `1234....addr.reverse`\(where _1234..._ is the address you want to reverse-resolve\), and call the `name()` function on that resolver. Then, perform a forward resolution to verify the record is accurate.

