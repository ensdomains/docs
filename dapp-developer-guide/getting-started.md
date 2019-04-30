### Meaning of ENS

The Ethereum Name Service (ENS) is a useful tool for dapp developers. ENS is like DNS (Domain Name System), in that it maps a memorable shortcut to an address. Using ENS we can map the friendly name ethereum.eth to the rather unfriendly 0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359. Subsequently, we can use the friendly name in-place of the address, making it easier to remember, and reducing the chance of errors.<br/>
An ENS name has a root name ethereum.eth which can contain sub-names like wallet.ethereum.eth. Whoever successfully bid for the root name in a Vickrey auction owns it.<br/>
ENS is the Ethereum Name Service, a distributed, open, and extensible naming system based on the Ethereum blockchain.

### Why Developers need to use the ENS
ENS doesn't just map to addresses. ENS is highly extensible and supports many types of mappings. It is possible to map the same friendly name to multiple endpoints at the same time. <br/>
ENS gets rid of the necessity of copying or typing lengthy hexadecimal addresses. With ENS, you’ll be able to send funds to the domain name instead of the long address, engage with your smart contract at mycontract.eth, and check out swarm-hosted sites at swarmsite.eth. <br/>

ENS is a completely decentralized system. Creating new domains under the “.eth” top-level domain is possible by an auction process that takes place on the Ethereum blockchain, and anyone can procure a domain for themselves by taking part.

For example the ethereum.eth name could point to:
- A multisig wallet contract address
- Public encryption keys for secure communication
- Website content (via IPFS hash or multihash)

It could be described with a phone-book metaphor, top-level domains, like ‘.eth’ and ‘.test’ are owned by smart contracts called registrars, which specify rules governing the allocation of their subdomains. Anyone may, by following the rules imposed by these registrar contracts, obtain ownership of a domain for their own use.
Because of the hierarchical nature of ENS, anyone who owns a domain at any level may configure subdomains - for themselves or others - as desired. For instance, if Alice owns 'alice.eth', she can create 'pay.alice.eth' and configure it as she wishes.


#### ENS Subdomains
They can also give more of an organizational feel to users, where the domain represents the organization and the subdomain resembles the structure of email addresses. A novel use case currently being implemented by Tenzorum Project is to use your subdomain as a username/login to Ethereum ĐApps. <br/>
Subdomains map names to addresses exactly the same way as domains do, but you don’t need to go through an auction process to create one. Luckily, there is no minimum length limit on ENS subdomains, either. To register a subdomain, you have to be the owner of the domain as a prerequisite.

**Prerequisites**<br/>
First install Node.js and npm by following the install instructions on the [Node.js website](https://nodejs.org/).

If you are not running a full mainnet Ethereum node, [you need to setup an Infura endpoint](https://kauri.io/article/9113c37841e5451fbb2cf2477a3a63e5/v1/infura-101-infrastructure-for-dapps). This is easy to do - just sign up on the [infura.io](https://infura.io/) website, create a new project and copy the mainnet URL. It should be something like "mainnet.infura.io/v3/{your project id}". <br/>
Now set your Infura URL including "https://" at the beginning, as an environment variable. This sets it for the current session so if you close your terminal window you need to do it again.<br/>

On Linux or macOS:<br/>
`export INFURA_URL=https://mainnet.infura.io/v3/{your project id}` <br/>

On Windows:
`set INFURA_URL=https://mainnet.infura.io/v3/{your project id}`<br/>

Create a new project directory called enslookup and change directory into it.<br/>
`mkdir enslookup`
`cd enslookup`

**Web3.js**<br/>
We are using Web3.js to interact with the ENS registry. To install Web3.js use the Node.js package manager.<br/>

Create a _package.json_ file.<br/>
`npm init -y`<br/>

Then install the Web3.js package.<br/>
`npm install web3 --save`<br/>

**Enslookup** <br/>
Create a new file called enslookup (notice there is no file extension).<br/>

If you are on a Linux or macOS, make the file executable:<br/>
`chmod +x enslookup`

Edit the file in your favorite editor - don't worry too much about the code here but it:
- Allows Node.js to execute the file
- Allows us to use JavaScript async/await syntax
- Gets the ENS name from the command's parameters
- Checks that you have set the Infura URL environment variable

```
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

Next, we setup Web3.js to connect to Ethereum:
```
// load web3 library
const Web3 = require('web3');

// connect to an Infura endpoint to connect to Ethereum (passed as Environment Variable)
// feel free to use your own mainnet node
const web3 = new Web3(process.env.INFURA_URL);
```
Now, it is tempting to jump right in and lookup an address using web3.eth.ens.getAddress(EnsName) but there is something important to consider first. <br/>
To resolve an address, the ENS name's owner must have configured a resolver smart contract. It is likely that a resolver smart contract has not been configured for the ENS name. If you call web3.eth.ens.getAddress(EnsName) on an ENS name that has no resolver smart contract configured, Web3.js gives you an unhelpful error message.<br/>

First, we check the existence of the resolver smart contract for the ENS name:
```
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
Surely we are ready to lookup an ENS address... right? Yes, kinda...<br/>
Looking up addresses has been part of ENS from day 1 but other types of mapping have been added later. Consequently, the resolver smart contracts configured for each ENS name, may differ in what they support because they were deployed at different times.<br/>
The ENS team have implemented standard interface detection to allow checking which mapping types a resolver smart contract supports.<br/>

Here is a list of the currently available interfaces (there are more but some are deprecated):
```
const ensInterface = {
    address: '0x3b3b57de',
    contentHash: '0xbc1c58d1',
    pubKey: '0xc8690233'
}
```
Here is how you look up an address and its balance:
```
if(await web3.eth.ens.supportsInterface(name, ensInterface.address)){
    const address = await web3.eth.ens.getAddress(name);
    const balanceWei = await web3.eth.getBalance(address);
    console.log(`Address:\t${address} (${web3.utils.fromWei(balanceWei, 'ether')} ether)`);
}
```
Here is how you look up a public encryption key:
```
if(await web3.eth.ens.supportsInterface(name, ensInterface.pubKey)){
    const {x, y} = await web3.eth.ens.getPubkey(name);
    console.log(`Public Key:`);
    console.log(`\t\tx = ${x}`);
    console.log(`\t\ty = ${y}`);
}
```

Here is how you look up a content hash (see EIP-1577 for format):
```
if(await web3.eth.ens.supportsInterface(name, ensInterface.contentHash)){
    const contentHash = await web3.eth.ens.getContenthash(name);
    console.log(`Content hash:\t${contentHash}`);
}
```
Before you run the enslookup command make sure you set your Infura URL environment variable, as described above.

When running the enslookup command on ethereum.eth:<br/>
`$ ./enslookup ethereum.eth`

```
Name:		ethereum.eth
Resolver:	0x1da022710dF5002339274AaDEe8D58218e9D6AB5
Address:	0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359 (3295.179176904502385668 ether)
Public Key:
x = 0x0000000000000000000000000000000000000000000000000000000000000000
y = 0x0000000000000000000000000000000000000000000000000000000000000000
```

Note on Windows you have to run node enslookup
Source: ENS GUIDE


### Configure an app to use ENS
In other to begin interacting with the ENS, your app would need to obtain a reference to the ENS registry using any of the given libraries such as Ethereum-ens, Web3.js, Ethers.js, Web3.py etc.

Usage:
```
var ENS = require(“ethereum-ens”);
var accounts = ethereum.enable();
var ens = new ENS(ethereum);
```
Some web3 libraries - at present: ethers.js, web3js, and web3.py have integrated support for name resolution. In these libraries, you can pass in an ENS name anywhere you can supply an address, meaning you do not need to interact directly with their ENS APIs unless you want to manually resolve names or do other ENS operations.

If no library is available for your platform, you can instantiate the ENS registry contract directly using the interface definition [here](https://github.com/ensdomains/ens/blob/master/contracts/ENS.sol) <br/>
Addresses for the ENS registry contract directly are shown [here](https://docs.ens.domains/ens-deployments).

### How to add ENS to an app (Using ENS in a App)

By accepting ENS names in your application, you remove the need for users to copy and paste - or worse, type out - long and opaque Ethereum addresses, which leads to errors and lost funds.

Below, we outline three levels of ENS integration:
Level 1 is easily achieved and provides high impact for users, while levels 2 and 3 provide more functionality to your users, improving your DApp's usability and your users' experience interacting with your DApp.



**Level 1** <br/>
The first step to supporting ENS in your application is making your application understand ENS names, and accepting them anywhere an address is accepted. <br/>
If possible, when a user enters an ENS name instead of an address, remember the ENS name, not the address it currently resolves to. This makes it possible for users to update their ENS names and have applications they used the name in automatically resolve to the new address, in the same way that you would expect your browser to automatically direct you to the new IP address if a site you use changes servers. <br/>

If your application deals with user funds or other critical resources, you may want to keep track of the address a name resolves to and warn them when it changes, to ensure they are aware of the change.<br/>

_Resolving Names_ <br/>
Resolving a name to an Ethereum address using a library is simple, there are many available options such as;

- Ethereum-ENS <br/>
    `var address = await ens.resolver(“alice.eth”).addr();`

- Web3.js <br/>
    `var address = ens.getAddress(“alice.eth”);`

Resolution without a library is a three step process: <br/>
1. Normalise and hash the name - see name processing for details.
2. Call resolver() on the ENS registry, passing in the output of step 1. This returns the address of the resolver responsible for the name.
3. Using the resolver interface, call addr() on the resolver address returned in step 2, passing in the hashed name calculated in step 1.


**Level 2** <br/>
The second level of ENS integration involves displaying ENS names wherever your app currently displays addresses.
If a user entered an ENS in your DApp, you should retain this name and show it to them whenever you would normally show the address.<br/>

If a user entered an address, or the address was obtained from elsewhere, you may still be able to show an ENS name, by doing Reverse Resolution. This permits you to find the canonical name for an address and display that when possible. If no canonical name is provided, your application can fall back to displaying the address as it did previously.
By supporting reverse resolution, you make it easier for your users to identify accounts they interact with, associating them with a short human-readable name instead of a long opaque Ethereum address.
<br/>

_Reverse Resolution_ <br/>
reverse resolution maps from an address back to a name - or other metadata. It is accomplished via the special purpose domain addr.reverse and the resolver function name(). Addr.reverse is owned by a special purpose registrar contract that allocates subdomains to the owner of the matching address - for instance, the address 0x314159265dd8dbb310642f98f50c066173c1259b may claim the name 314159265dd8dbb310642f98f50c066173c1259b.addr.reverse, and configure a resolver and records on it. The resolver in turn supports the name() function, which returns the name associated with that address.

- Ethereum-ENS <br/>
```
const address = ‘0x1234….’;
var name = await ens.reverse(address).name();

//check to be sure the reverse record is correct
if(address != await ens.resolver(name).addr()){
   name = null;
};
```
- Web3.py <br/>
```
address = ‘0x1234…..’
name = ns.reverse(address);

//check to be sure the reverse record is correct.
If address != ns.address(name):
   name = None
```

NB: Web3.js doesn't support

**Level 3** <br/>

The final step for comprehensive ENS integration is to facilitate associating ENS names with resources created by or managed with your application. This can take two forms:

#### Name Registration <br/>
By obtaining an ENS name for your product and allowing users to easily register subdomains, you can provide users with an easy way to name resources created in your DApp. For example, if your DApp is a cryptocurrency wallet, you can make it easy for users to obtain an ENS domain of the form via theirname.yourwallet.eth, allowing them to give their name out to others more easily.

Example: https://gitcoin.co/ens/ 

_Registering and Renewing Names_ <br/>
When users want to obtain a domain for the first time, they must interact with a registrar. Registrars are smart contracts that own a domain, and have a defined process for handing out subdomains. The registrar a user needs to interact with depends on the domain they want to obtain; for instance, a user wanting a .eth name will have to interact with the .eth registrar. Each registrar defines its own API for name registrations (and renewals, where appropriate).<br/>

At present, there are no libraries for interacting with registrars; DApps wishing to do so must interact with the registrar contract using a generic Ethereum library such as web3.js or web3.py.

#### Name Updates <br/>
By providing users with an easy way to update a name they own to point at your application’s resources, users can assign names they already own to your DApp's resources. See [Managing Names](https://docs.ens.domains/dapp-developer-guide/managing-names) to learn how to do this.
<br/>

### ENS Interfaces <br/>
An interface is a set of function selectors as defined by the [Ethereum ABI](https://solidity.readthedocs.io/en/develop/abi-spec.html#function-selector). This a subset of Solidity's concept of interfaces and the interface keyword definition which also defines return types, mutability and events.

In [eip165](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-165.md) is the standard interface detection implemented by ENS team to allow checking which mapping types a resolver smart contract supports.

Here is a list of the currently available interfaces (there are more but some are deprecated):
```
const ensInterface = {
    address: '0x3b3b57de',
    contentHash: '0xbc1c58d1',
    pubKey: '0xc8690233'
}
```


