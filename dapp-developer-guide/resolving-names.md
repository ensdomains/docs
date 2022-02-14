# Resolving Names

The ENS namespace includes both .eth names (which are native to ENS) and DNS names imported into ENS. Because the DNS suffix namespace expands over time, a hardcoded list of name suffixes for recognizing ENS names will regularly be out of date, leading to your application not recognizing all valid ENS names. To remain future-proof, **a correct integration of ENS treats any dot-separated name as a potential ENS name and will attempt a look-up**.

## Looking up cryptocurrency addresses

Names can have many types of data associated with them; the most common is cryptocurrency addresses. ENS supports storing and resolving the addresses of any arbitrary blockchain.

**Resolving a name to an Ethereum address** using a library is simple:

{% tabs %}
{% tab title="ensjs" %}
```javascript
var address = await ens.name('resolver.eth').getAddress();
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
```
address = ns.address('alice.eth')
```
{% endtab %}

{% tab title="web3j" %}
```java
String address = ens.resolve("alice.eth");
```

web3j also supports using ENS names anywhere you would use an address, meaning you often do not need to directly interact with the `EnsResolver` object. For example, to instantiate a contract interface, you can do:

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

**Resolution support for the addresses of other blockchains** is implemented with an additional overload on `addr()`. To resolve a non-Ethereum address, supply both the namehash and the [SLIP44](https://github.com/satoshilabs/slips/blob/master/slip-0044.md) chain ID of the cryptocurrency whose address you want to resolve. For example, to resolve a Bitcoin address, you would call `addr(hash, 0)`. Note that the returned address will be in binary representation, and so will need decoding to a text-format address; for details, see [EIP 2304](https://eips.ethereum.org/EIPS/eip-2304).

{% hint style="warning" %}
If you are resolving addr() records, you MUST treat a return value from the resolver of 0x00…00 as that record being unset. Failing to do so could result in users accidentally sending funds to the null address if they have configured a resolver in ENS, but not set the resolver record!
{% endhint %}

## Looking up other resources

ENS supports many types of resources besides Ethereum addresses, including other cryptocurrency addresses, content hashes (hashes for IPFS, Skynet, and Swarm, and Tor .onion addresses), contract interfaces (ABIs), and text-based metadata. The process for looking these up varies from library to library; for specific details see your chosen library's documentation.

Resolving these content types without a library follows the same 3-step process detailed above; simply call the relevant method on the resolver in step 3 instead of `addr()`.

{% tabs %}
{% tab title="ensjs" %}
```javascript
// Getting contenthash
await ens.name('abittooawesome.eth').getContent()
// Setting contenthash
await ens.name('abittooawesome.eth').setContenthash(contentHash)

// Getting other coins
await ens.name('brantly.eth').getAddress('BTC')
// Setting other coins
await ens.name('superawesome.eth').setAddress('ETC', '0x0000000000000000000000000000000000012345')
// Getting text
await ens.name('resolver.eth').getText('url')
// Setting text
await ens.name('superawesome.eth').setText('url', 'http://google.com')
```
{% endtab %}

{% tab title="web3.js" %}
```javascript
// Getting contenthash
web3.eth.ens.getContenthash('ethereum.eth').then(function (result) {
    console.log(result);
});
// Setting contenthash
web3.eth.ens.setContenthash('ethereum.eth', hash);
```
{% endtab %}

{% tab title="ethjs-ens" %}
```javascript
Not supported.
```
{% endtab %}

{% tab title="ethers.js" %}
```javascript
  const contentHash = await resolver.getContentHash();
  const btcAddress = await resolver.getAddress(0);
  const dogeAddress = await resolver.getAddress(3);
  const email = await resolver.getText("email");
```
{% endtab %}

{% tab title="go-ens" %}
```go
// Encoding
bin, err := ens.StringToContenthash("/ipfs/QmayQq2DWCkY3d4x3xKh4suohuRPEXe2fBqMBam5xtDj3t")
// Setting contenthash
resolver.SetContenthash(opts, data)
// Getting contenthash
resolver.Contenthash()
// Decoding
repr, err := ens.ContenthashToString(bin)

// Getting Multicoin
btcAddress, err := resolver.MultiAddress(0)
// Setting Multicoin
resolver.SetMultiAddress(opts, address)

// Setting text
resolver.SetText(opts, name, value)
// Getting text
resolver.Text(name)
```
{% endtab %}

{% tab title="web3.py" %}
```
Not supported.
```
{% endtab %}

{% tab title="web3j" %}
```java
Not supported.
```
{% endtab %}
{% endtabs %}

### Encoding and decoding contenthash

`contenthash` is used to store IPFSand Swarm content hashes, which permit resolving ENS addresses to distributed content (eg, websites) hosted on these distributed networks. [content-hash](https://github.com/ensdomains/content-hash) javascript library provides a convenient way to encode/decode these hashes.

```javascript
 const contentHash = require('content-hash')
const encoded = 'e3010170122029f2d17be6139079dc48696d1f582a8530eb9805b561eda517e22a892c7e3f1f'
const content = contentHash.decode(encoded)
// 'QmRAQB6YaCyidP37UdDnjFY5vQuiBrcqdyoW1CuDgwxkD4'

const onion = 'zqktlwi4fecvo6ri'
contentHash.encode('onion', onion);
// 'bc037a716b746c776934666563766f367269'

const encoded = 'e40101701b20d1de9994b4d039f6548d191eb26786769f580809256b4685ef316805265ea162'

const codec = contentHash.getCodec(encoded) // 'swarm-ns'
codec === 'ipfs-ns' // false
```

Note for ipns: For security reasons, the encoding of ipns is only allowed for `libp2p-key` codec. Decoding with other formats will show a deprecation warning. Please read [here](https://github.com/ensdomains/content-hash/pull/5) for more detail.

### Coin type and encoding/decoding

While some libraries allow you to query cryptocurrency addresses via their symbol (e.g.: `BTC`), others do not have the built-in support, and you have to call via each coin id (e.g.: `0` for `BTC`, `16` for \`ETH). For Javascript/Typescript, we have [@ensdomains/address-encoder](https://github.com/ensdomains/address-encoder) library that allows you to convert

```javascript
import { formatsByName, formatsByCoinType } from '@ensdomains/address-encoder';

formatsByName['BTC']
// {
//   coinType: 0,
//   decoder: [Function (anonymous)],
//   encoder: [Function (anonymous)],
//   name: 'BTC'
// }
```

To save storage space as well as prevent users from setting wrong token address, the library has `encoder` and `decoder`

```javascript
const data = formatsByName['BTC'].decoder('1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa');
console.log(data.toString('hex')); // 76a91462e907b15cbf27d5425399ebf6f0fb50ebb88f1888ac
const addr = formatsByCoinType[0].encoder(data);
console.log(addr); // 1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa
```

### Listing cryptocurrency addresses and text records

For cryptocurrency addresses and text records, you need to know the coin type or key names to get the value. If you want to list down all the cryptocurrency addresses and text records the user has set, you have to either retrieve the information from `Event` or query via [ENS subgraph](https://thegraph.com/explorer/subgraph/ensdomains/ens).

For example

```javascript
{
  domains(where:{name:"vitalik.eth"}) {
    id
    name
    resolver{
      texts
      coinTypes
    }
  }
}
```

will return the following result

```javascript
{
  "data": {
    "domains": [
      {
        "id": "0xee6c4522aab0003e8d14cd40a6af439055fd2577951148c14b6cea9a53475835",
        "name": "vitalik.eth",
        "resolver": {
          "coinTypes": [
            60
          ],
          "texts": [
            "url"
          ]
        }
      }
    ]
  }
}
```

## Reverse Resolution

While 'regular' resolution involves mapping from a name to an address, reverse resolution maps from an address back to a name. ENS supports reverse resolution to allow applications to display ENS names in place of hexadecimal addresses.

Reverse resolution is accomplished via the special purpose domain _addr.reverse_ and the resolver function `name()`. _addr.reverse_ is owned by a special purpose registrar contract that allocates subdomains to the owner of the matching address - for instance, the address _0x314159265dd8dbb310642f98f50c066173c1259b_ may claim the name _314159265dd8dbb310642f98f50c066173c1259b.addr.reverse_, and configure a resolver and records on it. The resolver in turn supports the `name()` function, which returns the name associated with that address.

{% hint style="danger" %}
ENS does not enforce the accuracy of reverse records - for instance, anyone may claim that the name for their address is 'alice.eth'. To be certain that the claim is accurate, you must always perform a forward resolution for the returned name and check it matches the original address.
{% endhint %}

Most libraries provide functionality for doing reverse resolution:

{% tabs %}
{% tab title="ensjs" %}
```javascript
const address = '0x1234...';
let ensName = null;
({ name: ensName } = await ens.getName(address))
// Check to be sure the reverse record is correct. skip check if the name is null
if(ensName == null || address != await ens.name(ensName).getAddress()) {
  ensName = null;
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
```
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

Reverse resolution without a library follows the same pattern as forward resolution: Get the resolver for `1234....addr.reverse`(where _1234..._ is the address you want to reverse-resolve), and call the `name()` function on that resolver. Then, perform a forward resolution to verify the record is accurate.

If you need to process many addresses (eg: showing reverse record of transaction histories), resolving both reverse and forward resolution for each item may not be practical. We have a seperate smart contract called [`ReverseRecords`](https://github.com/ensdomains/reverse-records) which allows you to lookup multiple names in one function call.

```javascript
const namehash = require('eth-ens-namehash');
const allnames = await ReverseRecords.getNames(['0x123','0x124'])
const validNames = allnames.filter((n) => namehash.normalize(n) === n )
```

Make sure to compare that the returned names match with the normalised names to prevent from [homograph attack](https://en.wikipedia.org/wiki/IDN\_homograph\_attack) as well as people simply using capital letters.
