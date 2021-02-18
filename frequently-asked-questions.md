# Frequently Asked Questions

## About the ENS Registry

### Why are names registered as hashes?

Hashes are used for two main reasons. First, to prevent trivial enumeration of the entire set of domains, which helps preserve the privacy of names \(for instance, so you can register the domain for your startup before you publicly launch\). Second, because hashes provide a fixed length identifier that can easily be passed around between contracts with fixed overhead and no issues passing around variable-length strings.

### Which wallets and dapps support ENS so far?

A partial list can be seen on [our homepage](https://ens.domains/).

### Once I own a name, can I create my own subdomains?

Yes! You can create whatever subdomains you wish and assign ownership of them to other people if you desire. You can even set up your own registrar for your domain!

### Can I change the address my name points to after I’ve bought it?

Yes, you can update the addresses and other resources pointed to by your name at any time.

### Can I register a TLD of my own in the ENS?

No. We consider ENS to be part of the 'global namespace' inhabited by DNS, and so we do our best not to pollute that namespace. ENS-specific TLDs are restricted to only .eth \(on mainnet\), or .eth and .test \(on Ropsten\), plus any special purpose TLDs such as those required to permit reverse lookups.

In addition to that, we are deploying support for importing DNS domains from the majority of DNS top-level domains using an integration that relies on DNSSEC. For details on those plans, please read [this post](https://medium.com/the-ethereum-name-service/upcoming-changes-to-the-ens-root-a1b78fd52b38).

### Who owns the ENS rootnode? What powers does that grant them?

The root node is presently owned by a multisig contract, with keys held by trustworthy individuals in the Ethereum community. We expect that this will be very hands-off, with the root ownership only used to effect administrative changes, such as the introduction of a new TLD, or to recover from an emergency such as a critical vulnerability in a TLD registrar.

Since the owner of a node can change ownership of any subnode, the owner of the root can change any node in the ENS tree. This means that the keyholders can replace the contracts that govern issuing and managing domains \(on .eth or any other top-level domain\), giving them ultimate control over the structure of the ENS system and the names registered in it.

To reduce this risk, the keyholders are drawn from respected members of the community, and with the exception of Nick Johnson, founder of ENS, are unaffiliated with ENS. We ask and expect them to exercise their individual judgement acting in the interests of the ENS community, rather than rubber-stamping requests made to them by ENS developers.

Over time, we plan to reduce and decentralise human control over the system. A first step towards that is disabling the ENS keyholders' ability to replace the .eth registrar contract, which would mean that even the keyholders could no longer affect the ownership of existing .eth domains. We plan to do this once the registrar contract has had an additional audit to assure us that there are no critical bugs in it.

Other powers held by the ENS root, such as those to set pricing and renewal conditions for domains, or to create and assign additional top-level domains, will be decentralised as robust systems become available to permit doing so.

### What about foreign characters? What about upper case letters? Is any unicode character valid?

Since the ENS contracts only deal with hashes, they have no direct way to enforce limits on what can be registered; character length restrictions are implemented by allowing users to challenge a short name by providing its preimage to prove it’s too short.

This means that you can in theory register both ‘foo.eth’ and ‘FOO.eth’, or even &lt;picture of my cat&gt;.eth. However, resolvers such as browsers and wallets should apply the nameprep algorithm to any names users enter before resolving; as a result, names that are not valid outputs of nameprep will not be resolvable by standard resolvers, making them effectively useless. Dapps that assist users with registering names should prevent users from registering unresolvable names by using nameprep to preprocess names being requested for registration.

### Nameprep isn’t enforced in the ENS system. Is this a security/spoofing/phishing concern?

It’s not enforced by the ENS contracts, but, as described, resolvers are expected to use it before resolving names. This means that non-nameprep names will not be resolvable.

### What are the differences between ENS and other naming services such as Namecoin, Blockstack, and Handshake?

ENS focuses first and foremost on providing decentralised, trustworthy name resolution for web3 resources such as blockchain addresses and distributed content, while Namecoin and Blockstack are efforts to replace DNS with a blockchain-based alternative.

Handshake also has different goals, seeking to replace the global DNS root with one governed and distributed by a blockchain system.

## About the .eth Permanent Registrar

### How do the dapp and the Twitter bot know what names people are buying?

The dapp and the twitter bot have built in lists of common names, drawn from an English dictionary and Alexa’s list of top 1 million internet domain names. They use these lists to show you when common names are bought or renewed. We do this because if the app didn’t reveal these names, anyone with a little technical skill could find them out anyway, giving them an advantage over those who don’t have the capacity to build their own list and code to check names against it.

### What does it cost to register a .eth domain?

Currently, registration costs are set at the following prices:

* 5+ character .eth names: $5 in ETH per year.
* 4 character .eth names: $160 in ETH per year.
* 3 character .eth names $640 in ETH per year.

3 and 4 character names have 'premium' pricing to reflect the small number of these names available.

### What kinds of behaviours are likely to result in losing ownership of a name?

The permanent registrar is structured such that names, once issued, cannot be revoked so long as an active registration is maintained. At present, the root keyholders can replace the registrar contract with one that implements different rules; this is a capability we intend to revoke in the future, once we are certain that the permanent registrar contract is safe and free of major bugs.

