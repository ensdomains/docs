---
description: Describes how to normalize and hash ENS names.
---

# Name Processing

In place of human-readable names, ENS works purely with fixed length 256-bit cryptographic hashes. In order to derive the hash from a name while still preserving its hierarchal properties, a process called Namehash is used. For example, the namehash of 'alice.eth' is _0x787192fc5378cc32aa956ddfdedbf26b24e8d78e40109add0eea2c1a012c3dec_; this is the representation of names that is used exclusively inside ENS.

Before being hashed with namehash, names are first normalized, using a process called UTS-46 normalization. This ensures that upper- and lower-case names are treated equivalently, and that invalid characters are prohibited. Anything that hashes and resolves a name **must** first normalize it, to ensure that all users get a consistent view of ENS.

## Normalising Names

Before a name can be converted to a node hash using Namehash, the name must first be normalized and checked for validity - for instance, converting _fOO.eth_ into _foo.eth_, and prohibiting names containing forbidden characters such as underscores. It is crucial that all applications follow the same set of rules for normalization and validation, as otherwise two users entering the same name on different systems may resolve the same human-readable name into two different ENS names.

Applications using ENS and processing human-readable names must follow [UTS46](http://unicode.org/reports/tr46/) for normalization and validation. Processing should be done with non-transitional rules, and with UseSTD3ASCIIRules=true.

The [eth-ens-namehash](https://www.npmjs.com/package/@ensdomains/eth-ens-namehash) Javascript library performs both normalization and hashing as described here. All of the [ENS libraries](../dapp-developer-guide/ens-libraries.md) covered in the DApp Developer Guide also perform normalization and hashing.

## Hashing Names

Namehash is a recursive process that can generate a unique hash for any valid domain name. Starting with the namehash of any domain - for example, 'alice.eth' - it's possible to derive the namehash of any subdomain - for example 'iam.alice.eth' - without having to know or handle the original human-readable name. It is this property that makes it possible for ENS to provide a hierarchal system, without having to deal with human-readable text strings internally.

### Terminology

* domain - The complete, human-readable form of a name; eg, _iam.alice.eth_.
* label - A single component of a domain - eg, _iam_, _alice_, or _eth_.
* label hash - the output of the keccak-256 function applied to a label; eg, `keccak256(‘eth’) = 0x4f5b812789fc606be1b3b16908db13fc7a9adf7ca72641f84d75b47069d3d7f0`
* node - The output of the `namehash` function, used to uniquely identify a name in ENS.

### Algorithm

First, a domain is divided into labels by splitting on periods \(‘.’\). So, ‘vitalik.wallet.eth’ becomes the list \[‘vitalik’, ‘wallet’, ‘eth’\].

The namehash function is then defined recursively as follows:

```text
namehash([]) = 0x0000000000000000000000000000000000000000000000000000000000000000
namehash([label, …]) = keccak256(namehash(…), keccak256(label))
```

A sample implementation in Python is provided below.

```python
def namehash(name):
  if name == '':
    return '\0' * 32
  else:
    label, _, remainder = name.partition('.')
    return sha3(namehash(remainder) + sha3(label))
```

Namehash is specified in [EIP 137](https://eips.ethereum.org/EIPS/eip-137).

### How do I find the labelhash/namehash of a name?

In some cases, you may need to know the hash of the name stored in ENS. labelhash means hash of the label of the domain \(eg: `makoto` for `makoto.eth`\) and namehash is the hash which combines labelhashes. We are currently working to include this information in our Manager app. In the meantime, you can query the information via [https://thegraph.com/explorer/subgraph/ensdomains/ens](https://thegraph.com/explorer/subgraph/ensdomains/ens) with the following query.

```text
{
  domains(where: {name:"vitalik.eth"}) {
    id
    name
    labelName
    labelhash
  }
}
```

## Handling of Ambiguous Names

Because of the large number of characters in unicode, and the wide variety of scripts represented, inevitably there are different Unicode characters that are similar or even identical when shown in common fonts. This can be abused to trick users into thinking they are visiting one site or resource, when in fact they are visiting another. This is known as a [homoglyph attack](https://en.wikipedia.org/wiki/Internationalized_domain_name#ASCII_spoofing_concerns).

User agents and other software that display names to users should take countermeasures against these attacks, such as by highlighting problematic characters, or showing warnings to users about mixed scripts. [Chromium’s IDNA strategy](https://www.chromium.org/developers/design-documents/idn-in-google-chrome) may serve as a useful reference for user-agent behaviour around rendering IDNA names.

