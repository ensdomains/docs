---
description: Using the reveal secret as a way to have on chain information about the source of the registration
---

# ENSIP-14: On Chain Source Parameter

| **Author**    | Alex Slobo (@slobo.eth) and Alex Van de Sande (Avsa.eth)
| ------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| **Status**    | Draft                                                                                                                           |
| **Submitted** | 2023-02-07                                                                                                                      |

## Abstract

We have many reasons to measure user registration names. Knowing our ecosystem and which apps are popular is essential for identifying the creators who contribute. Retroactive funding via grants is often better than proactive funding, as it allows us to detect what has already worked, rather than relying on guesses. This community often sees unexpected successes that we can't predict.

At the same time, it's important to make the process transparent, open source, and privacy-preserving. Source data would also help create referral programs.

### Specification

The ETH Registrar Controller takes a random secret as part of its input. This secret parameter is random data that obscures the name before the final step of the registration process is complete. It is 32 bytes of entropy and the ens manager app on app.ens.domains generates it by calling `require('crypto').randomBytes(32)`.

This proposal suggests a social convention that generates the secret from a combination of the first **4 bytes of the namehash**, plus another **4 bytes for user referrals**, combined with the appropriate number of random bytes.

The first 16 chars of the secret would be the platform name and the next 14 would be used as an identifier of the user referral. For example, if the above was registered via ensfairy, the secret would be:

> 0x **1b7f8b3c** **612c63bc** c635528d3b7196bc89d13566c1be2068af0cad6fb3ecebf0
> 

With this, we can attribute registrations using the first 16 chars of the secret. The loss of entropy of 64 bits is not relevant, since the only goal of the secret is to obscure the details of the bid to avoid front-running during the short period (usually a few minutes, but it could be as long as a week) before the reveal transaction is executed. The secret still retains 192 bits, which is highly secure, especially for such a short time frame.

### User Referral Data

The goal of this ENSIP is to empower app makers and anyone who wants to start a registration campaign. Any app that conforms to this standard should accept a referral link in the form of `?ensref=12345678` (or a similar scheme for mobile apps and other platforms). When a new user arrives at the site via a referral code, the platform should try to remember the user if they later register an ENS name, by appending the code to the platform code, followed by the rest of the secret. Standard cookie and private data regulations apply. While we encourage users to derive their code from a namehash, any random code should be accepted.

The extra data can be used in this example:

- Alice refers Bob to an ENS registrar app using a custom link like `app.ens.domains/?ensref=deadbeef`
- If Bob clicks the link, the information is saved on the cookies/local storage (until it's overwritten by another referral code, Bob clears his memory, or the code expires).
- Later, Bob wants to register a name; the secret will be prepended by the first 8 letters of the platform, followed by the code provided by Alice.

This allows individuals who don't own a name registrar app, but have their own audience, to have a cross-registrar referral, which registrars can choose to share revenue with.

### Privacy Concerns

This action makes it public which apps users are using to register names, and may reveal who they are friends with or who they follow. It could also reveal some demographic information about accounts - if a registrar app is known to be popular in a certain country or to only have a UI in a certain language, it can indicate that a specific Ethereum address might be from that demographic. This is not unlike seeing a user send funds to a known exchange address.

To address these concerns, we ask app makers to make the process transparent and allow users to opt-out of either the referral code or the whole platform code being added to their secret.

This would also enable comparison of different clients' usage - again, this is by design. If a given platform doesn't want any of their numbers to be public, they can simply not implement it.

### A Reverse Code Registry

Since the source code is derived from the namehash, it's not reversible. Therefore, some sort of registry of names is needed to make sense of these names. Such registrars could be made on-chain or simply be a git text file with multiple forks across many repos. A registrar definition is outside the scope of this ENSIP, as if the ground truth was on-chain it would be relatively easy to game.

With a purely random number, it would take about 30,000 registrants to create a 10% chance of an accidental collision, and by 77,163 codes that chance increases to 50%. This means it should be quite rare for an accidental collision to happen, but it is still trivial to create such a collision or to spam a registry. Therefore, instead of trying to play the security cat and mouse game, we would rather leave the "truth" of the codes to their usage. If someone is using them to create a ranking website or launch a referral program, each should simply exercise common sense to maintain their own copy of the registry for the very top of the ranking, where it should be easier to disambiguate.


