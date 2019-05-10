# Getting started with ENS

## What is ENS

ENS (Ethereum Name Service) is analogous to DNS (Domain Name System) for IP addresses, in that it maps a memorable shortcut to an address. ENS is a distributed, decentralized, open, and extensible naming system based on the Ethereum blockchain and a useful tool for developers to create more memorable names for their dapps.

Creating new domains under the ".eth" top-level domain is possible through a registration process that takes place on the Ethereum blockchain. Anyone can procure a domain for themselves by participating.

Using ENS we can map a friendly ENS name, e.g., "ethereum.eth", to an unfriendly Ethereum address, e.g., `0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359`. Users can then use the friendly name instead of the address, making it easier to remember, and reducing the chance of errors.

The reverse is true too. The address can also be mapped back to the name. This creates a bi-directional mapping between names and addresses.

## Why Developers Should Use ENS

ENS eliminates the need to copy or type lengthy hexadecimal addresses. With ENS, you can send funds directly to the ENS name instead of the long Ethereum address, engage with your smart contract at "mycontract.eth" and browse swarm-hosted sites at "swarmsite.eth".

ENS doesn't only map to Ethereum addresses. ENS is highly extensible and supports many types of endpoint mappings, e.g., IPFS and swarm hashes. It's possible to map the same friendly name to multiple endpoints at the same time.

For example the ethereum.eth name could point to:

-   A multisig wallet contract address
-   Public encryption keys for secure communication
-   Website content (via IPFS hash or multihash)

## ENS Sub-names

An ENS name has a root name, e.g., ethereum.eth, which can contain sub-names, e.g., wallet.ethereum.eth. The owner of an ENS name can allocate subdomains of the root name.

Because of the hierarchical nature of ENS, anyone who owns a domain at any level may configure subdomains - for themselves or others - as desired. For instance, if Alice owns 'alice.eth', she can create 'pay.alice.eth' and configure it as she wishes, and doesn't need to go through a registration process to create one.

Smart contracts called registrars own top-level ENS names like 'myname.eth'. The registrars specify rules governing the allocation of the corresponding top-level domain's subdomains, e.g., hello.myname.eth.

Sub-names can also give more of an organizational feel to users. For example, the top-level name can represent an organization and the sub-name the structure of email addresses. For example, a novel use case currently implemented by the [Tenzorum Project](https://tenzorum.org/) is to use your sub-name as a username/login to Ethereum ĐApps.

## Prerequisites

First install Node.js and npm by following the install instructions on the [Node.js website](https://nodejs.org/).

If you are not running a full mainnet Ethereum node, [you need to setup an Infura endpoint](https://kauri.io/article/9113c37841e5451fbb2cf2477a3a63e5/v1/infura-101-infrastructure-for-dapps). This is easy to do - just sign up on the [infura.io](https://infura.io/) website, create a new project and copy the mainnet URL. It should be something like "mainnet.infura.io/v3/{your project id}".

Now set your Infura URL including "https&#x3A;//" at the beginning, as an environment variable. This sets it for the current session so if you close your terminal window you need to do it again.<br/>

On Linux or macOS:

```shell
export INFURA_URL=https://mainnet.infura.io/v3/{your project id}
```

On Windows:

```posh
set INFURA_URL=https://mainnet.infura.io/v3/{your project id}
```

Create a new project directory called _enslookup_ and change directory into it:

```shell
mkdir enslookup
cd enslookup
```

### Web3.js

We are using Web3.js to interact with the ENS registry. To install Web3.js use the Node.js package manager.

Create a _package.json_ file:

```shell
npm init -y
```

Then install the Web3.js package:

```shell
npm install web3 --save
```

### Enslookup

Create a new file called _enslookup_ (with no file extension).

If you are on a Linux or macOS, make the file executable:

```shell
chmod +x enslookup
```

Edit the file in your favorite editor - don't worry too much about the code here but it:

-   Allows Node.js to execute the file
-   Allows us to use JavaScript async/await syntax
-   Gets the ENS name from the command's parameters
-   Checks that you have set the Infura URL environment variable

```javascript
#!/usr/bin/env node

(async () => {

    // get the ens name to lookup as the first argument to the command
    const [,,name] = process.argv;
    // bail if no name provided
    if(!name){
        console.error('No name provided for lookup\nUsage: enslookup <name>')
        return;
    }
    // bail if no infura url provided as environment variable
    if(!process.env.INFURA_URL){
        console.error(`Missing INFURA_URL environment variable`);
        return;
    }
    console.log(`Name:\t\t${name}`);

    // Remaining code goes here

})();
```

Next, setup Web3.js to connect to Ethereum:

```javascript
// load web3 library
const Web3 = require('web3');

// connect to an Infura endpoint to connect to Ethereum (passed as Environment Variable)
// feel free to use your own mainnet node
const web3 = new Web3(process.env.INFURA_URL);
```

Now, it is tempting to jump right in and lookup an address using `web3.eth.ens.getAddress(EnsName)` but there is something important to consider first.

To resolve an address, the ENS name's owner must have configured a resolver smart contract. It is likely that a resolver smart contract has not been configured for the ENS name. If you call `web3.eth.ens.getAddress(EnsName)` on an ENS name that has no resolver smart contract configured, Web3.js gives you an unhelpful error message.

First, we check the existence of the resolver smart contract for the ENS name:

```javascript
// get the resolver contract
const resolver = await web3.eth.ens.resolver(name);

// get the resolver contract address
const resolverAddress = resolver.address;
console.log(`Resolver:\t${resolverAddress}`);

// bail if resolver does not exist
if(resolverAddress === '0x0000000000000000000000000000000000000000'){
    return;
}
```

Looking up addresses has been part of ENS from day 1 but other types of mapping added later. Consequently, the resolver smart contracts configured for each ENS name may differ in what they support because they were deployed at different times.

### ENS Interfaces

ENS has standard interface detection to allow checking which mapping types a resolver smart contract supports.

An interface is a set of function selectors as defined by the [Ethereum ABI](https://solidity.readthedocs.io/en/develop/abi-spec.html#function-selector). This a subset of Solidity's concept of interfaces and the interface keyword definition which also defines return types, mutability and events.

In [eip165](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-165.md) is the standard interface detection implemented by ENS team to allow checking which mapping types a resolver smart contract supports.

Here is a list of the currently available interfaces (some are deprecated):

```javascript
const ensInterface = {
    address: '0x3b3b57de',
    contentHash: '0xbc1c58d1',
    pubKey: '0xc8690233'
}
```

Here is how you look up an address and its balance:

```javascript
if(await web3.eth.ens.supportsInterface(name, ensInterface.address)){
    const address = await web3.eth.ens.getAddress(name);
    const balanceWei = await web3.eth.getBalance(address);
    console.log(`Address:\t${address} (${web3.utils.fromWei(balanceWei, 'ether')} ether)`);
}
```

Here is how you look up a public encryption key:

```javascript
if(await web3.eth.ens.supportsInterface(name, ensInterface.pubKey)){
    const {x, y} = await web3.eth.ens.getPubkey(name);
    console.log(`Public Key:`);
    console.log(`\t\tx = ${x}`);
    console.log(`\t\ty = ${y}`);
}
```

Here is how you look up a content hash (see EIP-1577 for format):

```javascript
if(await web3.eth.ens.supportsInterface(name, ensInterface.contentHash)){
    const contentHash = await web3.eth.ens.getContenthash(name);
    console.log(`Content hash:\t${contentHash}`);
}
```

Before you run the `enslookup` command make sure you set the Infura URL environment variable, as described above.

When running the enslookup command on ethereum.eth:

```shell
$ ./enslookup ethereum.eth

    Name:		ethereum.eth
    Resolver:	0x1da022710dF5002339274AaDEe8D58218e9D6AB5
    Address:	0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359 (3295.179176904502385668 ether)
    Public Key:
    x = 0x0000000000000000000000000000000000000000000000000000000000000000
    y = 0x0000000000000000000000000000000000000000000000000000000000000000
```

On Windows you have to run:

```posh
node enslookup
```

## Configure an app to use ENS

To begin interacting with ENS, your app needs to get a reference to the ENS registry using a library such as [Ethereum-ens](https://www.npmjs.com/package/ethereum-ens), [Web3.js](https://github.com/ethereum/web3.js/), [Ethers.js](https://docs.ethers.io/ethers.js/html/), or libraries for other languages.

The rest of this tutorial uses ethereum-ens. First create a new project folder and install the package:

```shell
mkdir ensapp
cd ensapp
npm init -y
npm install ethereum-ens --save
```

And in a JavaScript file.

```javascript
var ENS = require("ethereum-ens");
var accounts = ethereum.enable();
var ens = new ENS(ethereum);
```

Some web3 libraries - at present: ethers.js, web3.js, and web3.py have integrated support for name resolution. In these libraries, you can pass in an ENS name anywhere you can supply an address, meaning you do not need to interact directly with the ENS APIs unless you want to manually resolve names or do other ENS operations.

If no library is available for your platform, you can instantiate the ENS registry contract directly [using the interface definition](https://github.com/ensdomains/ens/blob/master/contracts/ENS.sol). You can find addresses for the ENS registry contract directly [here](https://docs.ens.domains/ens-deployments).

## Adding ENS to a dapp

The first step to supporting ENS is making your application understand ENS names, and accepting them anywhere your app accepts an address.

If possible, when a user enters an ENS name instead of an address, remember the ENS name, not the address it currently resolves to. This makes it possible for users to update their ENS names and have applications they used the name in automatically resolve to the new address, in the same way that you would expect your browser to automatically direct you to the new IP address if a site you use changes servers.

If your application deals with user funds or other critical resources, you may want to keep track of the address a name resolves to and warn them when it changes, to ensure they are aware of the change.

### Resolving Names

Resolving an Ethereum address depends on the library you use.mple, there are many available options such as;

**Ethereum-ENS**

```javascript
var address = await ens.resolver("alice.eth").addr();
```

**Web3.js**

```javascript
var address = ens.getAddress("alice.eth");
```

Resolution without a library is a three step process:

1.  Normalise and hash the name.
2.  Call `resolver()` on the ENS registry, passing in the output of step 1. This returns the address of the resolver responsible for the name.
3.  Using the resolver interface, call `addr()` on the resolver address returned in step 2, passing in the hashed name calculated in step 1.

The next level of ENS integration involves displaying ENS names wherever your dapp displays addresses. If a user enters an ENS in your dApp, you should keep this name and show it to them whenever you would show the address.

If a user enters an address, or the address came from elsewhere, you may still be able to show an ENS name, by using reverse resolution. This permits you to find the canonical name for an address and display that when possible. If no canonical name is provided, your application can fall back to displaying the address as it did previously.

### Reverse Resolution

Reverse resolution maps from an address back to a name - or other metadata. It is accomplished via the special purpose domain `addr.reverse` and the resolver function `name()`.
A special purpose registrar contract that allocates subdomains to the matching address owns `addr.reverse`. For instance, the address `0x314159265dd8dbb310642f98f50c066173c1259b` may claim the name `314159265dd8dbb310642f98f50c066173c1259b.addr.reverse`, and configure a resolver and records on it. The resolver in turn supports the `name()` function, which returns the name associated with that address.

**Ethereum-ENS**

```javascript
const address = '0x1234….';
var name = await ens.reverse(address).name();

//check to be sure the reverse record is correct
if(address != await ens.resolver(name).addr()){
    name = null;
};
```

**Web3.py**

```python
address = '0x1234…..'
name = ns.reverse(address);

// check to be sure the reverse record is correct.
If address != ns.address(name):
    name = None
```

Web3.js doesn't support reverse resolution.

The final step for comprehensive ENS integration is to associate ENS names with resources created by or managed with your application. This can take two forms.

### Name Registration

By obtaining an ENS name for your product and allowing users to register subdomains, you can provide users with a way to name resources created in your DApp. For example, if your DApp is a cryptocurrency wallet, users can get a ENS domain of the form "theirname.yourwallet.eth", allowing them to give their name out to others more easily.

Example: <https://gitcoin.co/ens/>

### Registering and Renewing Names

When users want to get a domain for the first time, they must interact with a registrar. Registrars are smart contracts that own a domain, and have a defined process for handing out subdomains. The registrar a user needs to interact with depends on the domain they want to obtain. For example, a user wanting a `.eth` name has to interact with the `.eth` registrar. Each registrar defines its own API for name registrations (and renewals, where appropriate).

At present, there are no libraries for interacting with registrars. DApps wishing to do so must interact with the registrar contract using a generic Ethereum library such as web3.js or web3.py.

### Name Updates

By providing users with an easy way to update a name they own to point at your application’s resources, users can assign names they already own to your DApp's resources. Read [managing names](https://docs.ens.domains/dapp-developer-guide/managing-names) to learn more.
