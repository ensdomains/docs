---
description: >-
  ENS is a tool to simplify the experience for your users. Here are a series of
  guidelines and tools that will help you make design choices and implement the
  best ENS user experience.
---

# ENS Front-End Design Guidelines

### When to show ENS names

In every instance a user might otherwise see an Ethereum address or content hash, you can instead display an ENS name.  
There are two primary use cases for allowing users to display ENS names in your dapp:

1. **Replacing Ethereum addresses with ENS names**: When users are exploring the front-end of your dapp, wherever you would display an Ethereum address, you can instead display an ENS name. 
2. **Resolving input fields**: You can allow the user to write an ENS name in an input field that expects an Ethereum address, rather than entering the Ethereum address.

Beyond these use cases, remember that the [ENS Public Resolver](../contract-api-reference/publicresolver.md) allows you to link [different kinds of resources](https://docs.ens.domains/contract-api-reference/publicresolver), such as content stored on IPFS or Swarm, or any arbitrary data like text fields, to ENS names. This means there are other situations in which you might want to use ENS in your dapp. For example, if you are using complicated IPFS or Swarm hashes it is possible to convert the hashes to human readable names using ENS. Learn more about the different use cases in the chapter about [Enabling ENS in your DApp](ens-enabling-your-dapp.md).

## 1. Replacing Ethereum Addresses with ENS Names

{% hint style="warning" %}
An ENS name \(as a substitute for an Ethereum Address\) **should only be shown** if the user has set a [Reverse Record](https://docs.ens.domains/dapp-developer-guide/resolving-names#reverse-resolution) for their address, and if the reverse record \(address &gt; name\) matches the [forward resolution](https://docs.ens.domains/dapp-developer-guide/resolving-names#looking-up-ethereum-addresses) \(name &gt; address\).

As a dApp developer you should therefore first check if the Reverse Record for a given address has been set by the user, and, because users can set the reverse record to be anything they want, even a name they don't own or a random string, you should immediately after check that the resolved name also resolves to the same address by performing the forward resolution. Read more [here](https://docs.ens.domains/dapp-developer-guide/resolving-names#reverse-resolution) and in the _'other guidelines_' section further down.
{% endhint %}

### 1.1 - Displaying ENS names instead of Ethereum addresses

![example of showing just the name and the visual checksum](../.gitbook/assets/ensguidelines_01_onlydomain_2x.jpg)

When replacing Ethereum addresses with ENS names you should consider these facts and best practices:

* **Consider adding a visual checksum:** it is important to indicate to the user that a name is an ENS name that relates to an Ethereum address or other hash, rather than an http link. To do this, it is advisable to associate the ENS name with some form of visual checksum: [identicons, Blockies](http://discuss.conflux.network/t/comparing-the-efficacy-of-visual-checksums-identicons-vs-blockies-vs-custom/59) or other custom algorithmic representation of the address.

{% hint style="danger" %}
**Visual checksums** like [identicons can be spoofed](https://medium.com/@austin_48503/vanity-blockie-miner-for-ethereum-902fccf0a427) or imitated. Therefore they are **not meant as a security mechanism.** They are only meant as an indicator, to let the user understand that the name is **just a different representation of an Ethereum Address.**
{% endhint %}

* **Design a truncated version of the ENS name:** ENS names can be very long; besides not being character-limited, users can create an infinite number of subdomains and subdomains of subdomains. If you do show a truncated version of the name, you should provide a way to view the full name, such as expanding it on hover. 
* **Not all ENS names end with .eth**: ENS names normally end with .eth. However other top-level domains \(TLD\) are currently supported \(.xyz, .luxe, .kred, .art, .club\) and more will be in the future. Consider this if you are thinking about displaying the TLD part in the truncated view of long names.

### 1.2 - Always provide an option to see the Ethereum address associated with the ENS name

![by clicking the name, this expanded pop-up appears showing the name with the full address](../.gitbook/assets/ensguidelines_03_expanded1.jpg)

If you are showing the ENS name in its entirety or a truncated version, you should:

* **Always provide the user a way to display the full Ethereum address**: The above example illustrates a pop-up option. Another option would be to use a tooltip. However, consider that floating / pop-ups may be more appropriate than tooltips because the former also supports the other features described here. 
* **Provide a view where you display both the ENS name** _**and**_ **the Ethereum address together**: If the pop-up hides the name and only shows the address it's less friendly than showing both at the same time. 
* **Allow the user to copy the full Ethereum address**: Allow the user to copy the full address either through a copy button or by selecting it. Tooltips displaying the ENS name in this case should stay visible and not automatically disappear. 
* **Optionally give the user a way to automatically open the Ethereum address in a block explorer** such as Etherscan \(the external link icon in the above example\). 
* **Optionally show the** **balance amount, but only to the current signed-in user.** User research shows that users tend to recognise their own Ethereum address through their balance, as well as the address itself. This is meant only for the currently "signed in" user: only show their own balance and avoid showing the balance of other users.

### 1.3 - Displaying ENS names and Ethereum addresses together

![example of names with the address visible at the same time](../.gitbook/assets/ensguidelines_02_nameandaddress_2x.jpg)

In some situations you might want to display both the ENS name _and_ the Ethereum address to which it resolves. These layouts can be useful when:

* **Displaying the currently connected user**: For the user badge, for example, it could be appropriate to display both the ENS name and a short version of the Ethereum address. 
* **The user inputs an ENS name into an input field**: This will be described in greater detail in the next chapter that discusses input field resolution. 
* **In other high-risk situations**: These are situations where the user wants to confirm who a given user/address is, or if you notice that your users keep clicking ENS names because they want to see the Ethereum address in the pop-up, then you could substitute the simple version \(only the ENS name\) with one that displays both the name and the address.

## 2. Resolving Input Fields

![when resolving an input show both the ENS name and the Address together](../.gitbook/assets/ensguidelines_02b_nameandaddressclear.jpg)

Input fields where a user is supposed to insert Ethereum addresses should also accept and resolve ENS names. These inputs indicate that the user wants to interact with another user's Ethereum address or contract.

Follow these guidelines to create the best experience:

* **Wait before resolving the ENS name**: Wait until the user has typed the last TLD, e.g. .eth, .xyz, .luxe or .kred before resolving the name. Alternatively wait until 0.2 - 1.0 seconds after the user has stopped typing in the input field \(avoid the [eager resolution problem](https://github.com/MetaMask/metamask-extension/issues/4380)\).  
* **Don't overwrite the input field with the Ethereum address:** Show the resolved ENS name near the input field instead. 
* **Always display both the ENS name** _**and**_ **the Ethereum address together** : Do this after it has successfully been resolved and possibly add also a visual checksum following the suggestions in guideline 1.1.

## Other guidelines and tips

### What to do if the Reverse Record doesn't correspond to the Forward Resolution?

As mentioned before, user can set the [Reverse Record](https://docs.ens.domains/dapp-developer-guide/resolving-names#reverse-resolution) to be anything they want, even a name owned by another user or a completely random string. This is why, after retrieving the name written in the Reverse Record, a dApp developer should also check that it matches the forward resolution, which means the address that ENS name points to.  
**If the two don't match, you MUST NOT show the human readable name and simply leave the plain Ethereum Address.** If you don't, users may be able to impersonate other users in your dApp.  
The chapter on Reverse Resolution has [code](https://docs.ens.domains/dapp-developer-guide/resolving-names#reverse-resolution) for you to do this check.

### Options for displaying usernames

The obvious choice is to use the user's ENS name as a username. You can do this by providing a mechanism for your users to register a name under your own subdomain, or by looking up the user's ENS name using reverse resolution.

### **Caching and Updating ENS Names**

If your dApp needs to display many Ethereum Addresses or ENS Names in the UI, you can also consider **caching** the ENS Name after it has been resolved \(and verified\) or after the user has added the name in an input field.

Your **optimistic UI** can safely display the names from cache **in all non-risky situations**, in which your user for example is simply browsing, but doesn't need to act or make decisions, especially risky ones, based on the information displayed.  
However, **in all** _**risky**_ **situations** \(eg transferring ETH, tokens or other value\), or when the user is interacting with another ENS Name / Ethereum Address, you should **perform a direct live resolution** and get the most up to date information from the ENS Registry.

Also consider that users can change their information in the ENS registry at any time so you should **periodically validate the information you cached**. For this you can also subscribe to certain **Events** made available by the contracts \(especially [AddrChanged](https://docs.ens.domains/contract-api-reference/publicresolver#set-ethereum-address), and [NameChanged](https://docs.ens.domains/contract-api-reference/publicresolver#set-canonical-name)\).

\*\*\*\*

### Notes on displaying Ethereum Addresses \(with or without ENS names\)

Even when ENS names are not available, [research](https://medium.com/@lyricalpolymath/web3designdecisionframework-e84075816515) [shows](https://medium.com/@lyricalpolymath/web3-design-principles-f21db2f240c1) that there are some good practices to follow when displaying Ethereum addresses in dApps.

* **Always show the initial ' 0x '** to indicate it's an address. 
* When displaying the name in shorthand versions, **show the first 4 and last 4 characters of the address**. This is not a security requirement as vanity addresses can be spoofed relatively simply; this is a good practice because some users check the beginning of the name and others check the end of the name. Also, four is the highest number of elements that our mind can easily chunk, parse and remember well. 
* **Always provide a way to display the full Ethereum address.** Use the same pop-up component that you would use to display ENS names or a tooltip style.

![decentralandUI Tooltip showing the full Address](../.gitbook/assets/ensguidelines_03_expanded2simple_justatooltip2.jpg)

Other guidelines previously mentioned also apply for simple Ethereum addresses:

* **Allow the user to copy the full Ethereum address** \(which mean that tooltips might not be good practice\). 
* \(Optionally\) allow the user to automatically **open the address in a block explorer.** 

## Front-End tools

* **Thorin** - [React component library for the ENS design system](https://thorin.ens.domains/)