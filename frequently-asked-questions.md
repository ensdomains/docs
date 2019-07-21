# Frequently Asked Questions

## About the ENS Registry

### Why are names registered as hashes?

Hashes are used for two main reasons. First, to prevent trivial enumeration of the entire set of domains, which helps preserve the privacy of names \(for instance, so you can register the domain for your startup before you publicly launch\). Second, because hashes provide a fixed length identifier that can easily be passed around between contracts with fixed overhead and no issues around passing around variable-length strings.

### Which wallets and DApps support ENS so far?

A partial list can be seen on [our homepage](https://ens.domains/).

### Once I own a name, can I create my own subdomains?

Yes! You can create whatever subdomains you wish, and assign ownership of them to other people if you desire. You can even set up your own registrar for your domain!

### Can I change the address my name points to after I’ve bought it?

Yes, you can update the addresses and other resources pointed to by your name at any time.

### Can I register a TLD of my own in the ENS?

No. We consider ENS to be part of the 'global namespace' inhabited by DNS, and so we do our best not to pollute that namespace. ENS-specific TLDs are restricted to only .eth \(on mainnet\), or .eth and .test \(on Ropsten\), plus any special purpose TLDs such as those required to permit reverse lookups.

In addition to that, we are deploying support for importing DNS domains from the majority of DNS top-level domains using an integration that relies on DNSSEC. For details on those plans, please read [this post](https://medium.com/the-ethereum-name-service/upcoming-changes-to-the-ens-root-a1b78fd52b38).

### Who owns the ENS rootnode? What powers does that grant them?

The root node is presently owned by a multisig contract, with keys held by trustworthy individuals in the Ethereum community. We expect that this will be very hands-off, with the root ownership only used to effect administrative changes, such as the introduction of a new TLD, or to recover from an emergency such as a critical vulnerability in a TLD registrar.

In the long term, the plan is to define a governance process for operations on the root node, and transfer ownership to a contract that enforces this process.

Since the owner of a node can change ownership of any subnode, the owner of the root can change any node in the ENS tree.

### What about foreign characters? What about upper case letters? Is any unicode character valid?

Since the ENS contracts only deal with hashes, they have no direct way to enforce limits on what can be registered; character length restrictions are implemented by allowing users to challenge a short name by providing its preimage to prove it’s too short.

This means that you can in theory register both ‘foo.eth’ and ‘FOO.eth’, or even &lt;picture of my cat&gt;.eth. However, resolvers such as browsers and wallets should apply the nameprep algorithm to any names users enter before resolving; as a result, names that are not valid outputs of nameprep will not be resolvable by standard resolvers, making them effectively useless. DApps that assist users with registering names should prevent users from registering unresolvable names by using nameprep to preprocess names being requested for registration.

### Nameprep isn’t enforced in the ENS system, is this a security/spoofing/phishing concern?

It’s not enforced by the ENS contracts, but as described, resolvers are expected to use it before resolving names. This means that non-nameprep names will not be resolvable.

### What are the differences between ENS and other naming services such as Namecoin, Blockstack, and Handshake?

ENS focuses first and foremost on providing decentralised, trustworthy name resolution for web3 resources such as blockchain addresses and distributed content, while Namecoin and Blockstack are efforts to replace DNS with a blockchain-based alternative.

Handshake also has different goals, seeking to replace the global DNS root with one governed and distributed by a blockchain system.

## About the .eth Permanent Registrar

### How do the DApp and the twitter bot know what names people are buying?

The DApp and the twitter bot have built in lists of common names, drawn from an English dictionary and Alexa’s list of top 1 million internet domain names. They use these lists to show you when common names are bought or renewed. We do this because if the app didn’t reveal these names, anyone with a little technical skill could find them out anyway, giving them an advantage over those who don’t have the capacity to build their own list and code to check names against it.

### How was the minimum character length of 7 chosen?

By an informal survey of common ‘high value’ short names.

We are currently working on making shorter names available. The timeline is as follows:

 **July 11th - August 10th 2019**: Reservation process for existing projects desiring a 3-6 character name. More information available on [the reservations page](https://reserve.ens.domains/).

**August 25th 2019**: Auctions for non-reserved 3-6 character names begin.

**TBD:** General availability of 3-6 character names.

### What kinds of behaviours are likely to result in losing ownership of a name?

The permanent registrar is structured such that names, once issued, cannot be revoked so long as an active registration is maintained.

