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

## About the .eth Auction Registrar

### How do the DApp and the twitter bot know what names people are auctioning?

The DApp and the twitter bot have built in lists of common names, drawn from an English dictionary and Alexa’s list of top 1 million internet domain names. They use these lists to show you when common names are being auctioned. We do this because if the app didn’t reveal these names, anyone with a little technical skill could find them out anyway, giving them an advantage over those who don’t have the capacity to build their own list and code to check names against it.

### What is the disguise amount / extra amount?

Although it’s difficult for someone to determine what name you are bidding on, in some circumstances it’s possible to either determine the exact name, or narrow it down to one of several. The disguise amount allows you to send extra ether along with your bid, to disguise the true amount of your bid. This ether is returned to you as soon as you reveal your bid.

### Why is my reveal transaction failing?

Confirm all the values you put in during the bid, and try using a blockchain explorer to confirm the state of the ENS auction. These are situations that cause errors during the reveal transaction:

* You never successfully bid
* You’re trying to reveal too early
* The domain name is wrong
* The amount is wrong
* The secret phrase is wrong
* You already revealed

For more information, see MyCrypto's guidance on [debugging a reveal transaction](https://support.mycrypto.com/ens/ens-debugging-a-bad-instruction-reveal.html) and [manually revealing a bid](https://support.mycrypto.com/ens/manually-revealing-ens-bids-hard.html).

### I bid on an auction and didn’t win; why don’t I see the refund in my transaction list?

Refunds are sent as part of reveal transactions - when you reveal, if someone already outbid you, or when you’re outbid later, if not - and as part of finalise transactions. They’re not separate transactions, so they don’t show up as such. If you’re using etherscan, check the ‘internal transctions’ tab to find your refund information.

### I bid on one name, but Etherscan shows me as bidding on other name\(s\)! Why?

The registrar DApp opens up to three randomly selected auctions as ‘chaff’ every time you place a bid, to make it more difficult for people to guess what you are bidding on. The names you see are not necessarily the one you’re bidding on; that’s contained in the sealed bid hash that was submitted.

### How much do I have to deposit if I’m the only bidder?

If only one bid is revealed, that bidder deposits 0.01 ether, the minimum bid. The remainder of their bid is refunded as soon as they finalise the auction.

### Instead of burning funds in the auction for bidding costs and penalties, shouldn’t they be donated to the Ethereum Foundation?

Burning is fairly rare in the current registrar; it only burns fees if you reveal an illegal bid, or fail to reveal a bid during the reveal period. In all other circumstances they’re refunded to users, either when you’re outbid or when you relinquish the name. A small portion \(0.5%\) of the bids are burned with the intent of creating a cost for a large number of domains or for highly valuable domains without the intention of buying them.

Burning fees are impartial, and avoids both political concerns over the destination of the funds, and perverse incentives for the beneficiary of the fees. The value of the ether burned is not destroyed, but rather equally distributed among all ether holders.

### How was the minimum character length of 7 chosen?

By an informal survey of common ‘high value’ short names. This restriction is intended to be lifted once the permanent registrar is in place.

### What values will the permanent registrar try to optimize for?

This is something that the community will have to decide as part of the standardisation process for the permanent registrar. A few possible principles to consider include:

> * Accessibility: Registering a new name should be as easy and straightforward as possible.
> * Correct valuation: registering a known or popular name should be costly and intentional, not a matter of luck
> * Fairness: The system should not unduly favor people who happen to be in the right place at the right time.
> * Stability: Names should only be reallocated with the express will of the owner or according to objective rules that will be discussed and set with the whole community.
> * Principle of least surprise: Wherever possible, names should resolve to the resource most users would expect it to resolve to.

### What kinds of behaviours are likely to result in losing ownership of a name?

This is the most important aspect to be decided on the Permanent registrar and the one we want more open debate. At the minimum we want the owner of a name to have to execute some periodical transaction, just to prove that name hasn’t been abandoned or keys have been lost. This transaction would probably also require additional ether to be locked or burned. The method to which that amount is calculated is yet to be determined but would probably be dependent on some \(but not necessarily all\) of these factors:

> * The amount of ethers the domain was bought for originally
> * The average cost of a domain back when it was first bought
> * The average cost of a domain at the moment of renewal
> * The current market value of the domain \(to be calculated with some auction method\)
> * Other factors to be discussed

Just like the current model, this “fee” would not go to the Ethereum Foundation or any third party, but be locked or burned. Ideally, this financial \(opportunity and liquidity\) cost will make name squatting unprofitable – or at least make the name reselling market a dynamic and competitive one, focused on quick turnout and not on holding names long term for as much money as possible.

Another very possible option creating some sort of dispute resolution process for names, to ensure the “principle of least surprise” but this is a controversial idea and there are no clear ideas on how this process could be achieved in a fair way without risks of centralization and abuse of power.

### Can the bids be revealed during the auction period?

No, you can’t reveal during the auction period, only during the reveal period. Bids revealed during the auction period will have no effect and wouldn’t count for the reveal period.

