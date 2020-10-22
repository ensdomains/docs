# Managing Names

## Transferring a Name

Each name in ENS has an owner. This account or contract is the only one that may make changes to the name in the ENS registry. The owner of a name can transfer ownership to any other account.

{% tabs %}
{% tab title="ensjs" %}
```javascript
await ens.name('alice.eth').setOwner('0x1234...');
```
{% endtab %}

{% tab title="go-ens" %}
```go
// opts are go-ethereum's bind.TransactOpts
err := registry.SetOwner(opts, "alice.eth", common.HexToAddress("0x1234..."))
```
{% endtab %}

{% tab title="web3.py" %}
```python
ns.setup_owner('alice.eth', '0x1234...')
```
{% endtab %}
{% endtabs %}

## Creating Subdomains

The owner of any domain can configure subdomains as desired. This is achieved by creating a subdomain and setting its owner to the desired address - this can be the same as the owner of the parent domain, or any other address.

{% tabs %}
{% tab title="ensjs" %}
```text
await ens.name('alice.eth').createSubdomain('iam');
```
{% endtab %}

{% tab title="go-ens" %}
```go
// opts are go-ethereum's bind.TransactOpts
err := registry.SetSubdomainOwner(opts, "alice.eth", "iam", common.HexToAddress("0x1234..."))
```
{% endtab %}

{% tab title="web3.py" %}
```text
ns.setup_owner('iam.alice.eth', '0x1234...')
```

Additionally, web3.py provides a convenience method to create a subdomain, set a resolver, and configure an address record all at once:

```text
ns.setup_address('iam.alice.eth', '0x1234...')
```

In the common case that the name should be pointed to the owner's address, the second argument is optional.
{% endtab %}
{% endtabs %}

## Setting a Resolver

Before a newly created domain or subdomain can be used, a resolver address must be set. You may also want to do this if an updated resolver implementation is available that supports features that you want to make use of.

Most commonly, names are set to use a 'standard' resolver called the public resolver, which provides commonly-used functionality, but anyone may write and deploy their own special-purpose resolver; see the resolver interface definition for details.

{% tabs %}
{% tab title="ensjs" %}
```text
await ens.name('iam.alice.eth').setResolver('0x1234');
```

On mainnet and the Kovan test network, 'resolver.eth' is configured to point to the latest deployed version of the public resolver, making it possible to easily configure a name to use the public resolver:

```text
const resolver = await ens.resolver('resolver.eth').addr();
await ens.setResolver('iam.alice.eth', resolver, {from: ...});
```
{% endtab %}

{% tab title="go-ens" %}
```go
// opts are go-ethereum's bind.TransactOpts
err := registry.SetResolver(opts, "iam.alice.eth", common.HexToAddress("0x1234..."))
```
{% endtab %}

{% tab title="web3.py" %}
Not supported. web3.py automatically uses the public resolver when `setup_address` is called, and does not support setting custom resolvers.
{% endtab %}
{% endtabs %}

Note that changing the resolver for a name will not automatically migrate records from the old resolver over; to do this you will need to follow the process outlined below for updating records.

## Updating Records

To change the resources an address resolves to, it's necessary to update that name's records in its resolver.

Each resolver may specify its own mechanism for updating records, but a standard method is implemented by the public resolver and many others. Some libraries provide functionality for updating a resolver's records using this interface.

### Updating the Address Record

{% tabs %}
{% tab title="ensjs" %}
```javascript
await ens.name('iam.alice.eth').setAddr('ETH', '0x1234...');
```
{% endtab %}

{% tab title="go-ens" %}
```go
resolver, err := ens.NewResolver(client, "iam.alice.eth")
// opts are go-ethereum's bind.TransactOpts
err := resolver.SetAddress(opts, common.HexToAddress("0x1234..."))
```
{% endtab %}

{% tab title="web3.js" %}
```javascript
ens.setAddress('iam.alice.eth, '0x1234...', {from: ...});
```
{% endtab %}

{% tab title="web3.py" %}
```python
ns.setup_address('iam.alice.eth', '0x1234...')
```
{% endtab %}
{% endtabs %}

### Updating Other Records

Some libraries - presently only ensjs, go-ens and web3.js - support updating other record types, such as content hashes and text records, using the same pattern. For example, to set or update a text record:

{% tabs %}
{% tab title="ensjs" %}
```javascript
ens.name('iam.alice.eth').setText('test', 'Test record');
```
{% endtab %}

{% tab title="go-ens" %}
```go
// opts are go-ethereum's bind.TransactOpts
err := resolver.SetContenthash(opts, []byte{0x12, 0x34...})
err := resolver.SetAbi(opts, "Sample", `[{"constant":true,"inputs":...}]`, big.NewInt(1))
err := resolver.SetText(opts, "Sample", `Hello, world`)
```
{% endtab %}

{% tab title="web3.js" %}
```javascript
ens.setText('iam.alice.eth', 'Test', 'Test record', {from: ...});
```
{% endtab %}
{% endtabs %}

## Configuring Reverse Resolution

While 'regular' resolution involves mapping from a name to an address, reverse resolution maps from an address back to a name - or other metadata. ENS supports reverse resolution to allow applications to display ENS names in place of hexadecimal addresses.

Before this can be done, the owner of the address has to configure reverse resolution for their address. This is done by calling the `claim()` method on the reverse resolver, found at the special name 'addr.reverse'.

Most commonly this is accomplished via a user-interface such as the [ENS Manager DApp](https://manager.ens.domains/). go-ens and web3.py also provide functionality for this:

{% tabs %}
{% tab title="go-ens" %}
```go
reverseRegistrar, err := ens.NewReverseRegistrar(client)
// opts are go-ethereum's bind.TransactOpts
err := reverseRegistrar.SetName(opts, "iam.alice.eth")
```
{% endtab %}

{% tab title="web3.py" %}
```python
ns.setup_name('iam.alice.eth', '0x1234...')
```
{% endtab %}
{% endtabs %}

