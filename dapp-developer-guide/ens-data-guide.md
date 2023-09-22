# ENS Data guide

## Overview

Even though adding basic functionalities such as a single name lookup is just adding a few lines of code, analysing overall stats or integrating with historical info can be challenging due to the following reasons.

* The data is stored in storage efficient way to save gas costs, which requires decoding
* Some of the contracts can be extensible by end users leading to inconsistent interface
* Some names (.eth, wrapped names) expire without emitting events
* Smart contract structures have changed over time
* Some names are not available on the chain (eg: CCIP-read integrated names such as[ cb.id](http://cb.id))


In this section, I will go through the overall structure of ENS contracts and events to help you guide through the ENS data space.


## Target audience

The target audience of this article is developers and data analysts who are interested in labelling ENS names into the Ethereum transaction data such as NFT owners, Defi users, and ENS name trading history. It assumes that you have a basic understanding of how Ethereum smart contracts work (such as function calls and events). Some tools also require query language knowledge such as GraphQL and SQL.


## How to access ENS data



Just like many other Ethereum-based projects, ENS consists of a set of smart contracts. You can use tools of your choice to interact directly with ENS smart contracts (which we will explain in depth). If you want extra data about a single name, please refer to the ENS library section which explains how to interact with ENS via popular libraries such as ethers.js.

Extracting multiple entities tends to be slow and time-consuming because you have to make a function call to extract each record. [Ens-js v3 has a batch](https://github.com/ensdomains/ensjs-v3) call function to save some call time. If you are interested in extracting more than dozens of name records or want to access event-related information. There are currently three popular services: [The Graph](https://thegraph.com), [Dune Analytics](https://dune.com), and [Google Big Query](https://cloud.google.com/bigquery).

### The Graph

* [Mainnet](https://thegraph.com/hosted-service/subgraph/ensdomains/ens)&#x20;
* [Goerli](https://thegraph.com/hosted-service/subgraph/ensdomains/ensgoerli)&#x20;
* [RInkeby](https://thegraph.com/hosted-service/subgraph/ensdomains/ensrinkeby)&#x20;

The Graph is a decentralized indexing service that allows developers to turn smart contract events (and function calls) into GraphQL schema called subgraph. The ENS team maintains the subgraph that encapsulates multiple events data into a single entity such as Domain, Account, Registration and Resolver.


The following sample query lists all names

```graphql
account{
  domains {
    labelName
    labelhash
    name
  }
}
```

It is suitable to extract information such as the list of subdomains a name created, a list of names the address registered, and text keys (eg: Twitter, email, avatar). You can also use it to extract analytics information such as registered names though you need to traverse the data multiple times.

### Dune Analytics

* [ENS Dashboard ](https://dune.com/makoto/ens)

Dune is a popular social network to analyse and share blockchain data. Users (called Data wizards) can write SQL to analyse on-chain data. Others can fork (copy) SQL code, make modifications, and share the insight with visual charts. Unlike TheGraph, Dune has decoded many popular smart contract events and function calls including ENS and therefore no need to create its schema. The downside is that the available tables are less structured than the GraphQL subgraph and you will need more domain knowledge about the underlying smart contract events and function call structures.

Dune currently has v1 running on PostgreSQL and v2 running on Databrick which is a column-oriented database. Though v2 often runs faster, it lacks user-defined functions such as `namehash` functions.

The following example counts monthly .eth name registrations.

```sql
SELECT date_trunc('month', evt_block_time), COUNT(*)
FROM (
SELECT * FROM ethereumnameservice."ETHRegistrarController_1_evt_NameRegistered"
WHERE evt_block_time > (current_date - interval '1' year)
UNION 
SELECT * FROM ethereumnameservice."ETHRegistrarController_2_evt_NameRegistered"
WHERE evt_block_time > (current_date - interval '1' year)
UNION 
SELECT * FROM ethereumnameservice."ETHRegistrarController_3_evt_NameRegistered"
WHERE evt_block_time > (current_date - interval '1' year)
) AS r GROUP BY 1
```

Dune is good for data analytics purposes. CSV download is a paid option and their support for API isn’t public yet so not suitable to call from dapps and web services. There are some abstractions [in their spell book](https://github.com/duneanalytics/spellbook/tree/main/models/ens). To access abstractions, you must query via V2 ([example](https://dune.com/queries/1885750)). You need to replace “ens\_”. with “ens.” For example, If you want to access [ens\_node\_names.sql](https://github.com/duneanalytics/spellbook/blob/main/models/ens/ens\_node\_names.sql) , then you query as “select \* from ens.node\_names”.

### Google BigQuery

BigQuery is a data analytics platform similar to Dune Analytics without any “social” features. The query tends to run quicker than dune but it charges per query hence it could cost a lot. Google BigQuery allows you to export the query result into csv/google spreadsheet as well as to their “Data Studio” visualization platform.

* [ENS Revenue data sudio view](https://datastudio.google.com/u/0/reporting/8785928a-71d5-4b17-9fea-fe1c937b064f)&#x20;

The biggest advantage of BigQuery is to allow you to import javascript libraries as a user-defined function. This is particularly helpful if you want to make use of popular javascript libraries such as ethers.js



An example query: comparing normalised labels

```sql
CREATE TEMP FUNCTION ens_normalize(arg1 STRING)
RETURNS STRING
LANGUAGE js
  OPTIONS (
    library=['gs://jsassets/ens-normalize.js'])
AS r"""
  try{
    return ens_normalize(arg1)
  }catch(e){
    return null;
  }
""";
WITH Example AS
 (SELECT '50' as label UNION ALL
  SELECT '⁕⁕⁕⁕⁕' UNION ALL --* legacy error, new ok *--
  SELECT '🚀‍‍‍‍‍‍‍‍‍‍🚀‍‍‍‍‍‍‍‍‍‍🚀‍‍‍‍‍‍‍‍‍‍') --* legacy ok , new error *--
SELECT label, ens_normalize(label) FROM Example
```

## Contract structures

The full detail of each smart contract is covered in [the contract api reference section](https://docs.ens.domains/contract-api-reference). This section lists function names and events which are often used to access the data. To find out the deployed addresses, please refer to “[ENS Deployments](https://docs.ens.domains/ens-deployments)” section.

### ENSRegistry/ENSRegistryWithFallback

* "Transfer(node, owner)"
* "NewOwner(node, label, owner)"
* "NewResolver(node,resolver)"

The contract contains the name owner (aka “controller”) and resolver contract addresses that hold the actual record (such as ETH address, IPFS content hash) . The name is stored in [namehash](https://docs.ens.domains/contract-api-reference/name-processing#how-do-i-find-the-labelhash-namehash-of-a-name) format so that it can store an infinite length of the name. The name owner has the privilege to change the resolver contract and can create subdomains under the name you own.

`NewOwner` event is logged when the owner of a node assigns a new owner to a sub node. `Transfer` event is logged when the owner of a node transfers ownership to a new account. `NewResolver` event is logged when the resolver for a node changes.&#x20;

**NOTE:** The current ENS registry contract is `ENSRegistryWithFallback` that was deployed in 2020 Feb to resolve the bug found in the original Registry. Even though the majority of names have transferred to the new contract, there are some names (mostly names owned by smart contract) that couldn’t be migrated. If you want to extract all names existing, you have to query both registries and remove the duplicates.

### Resolver

* `AddressChanged(node,coinType,address)`
* `ContenthashChanged(node, name)`
* `NameChanged(node, value)`
* `TextChanged(node, key, key, value)`

The majority of the contracts use a default resolver which is set at the time of registration. However, the default resolver has changed a few times to add new functionalities (eg: coin type). To find out all the resolver addresses, you have to get the resolver address through `ENSRegistry`. `NewResolver` event (note: Users in the past have put their own ETH address by mistake hence there are 100s of addresses that are set as new resolver which don’t contain any record).&#x20;

### BaseRegistrar

* `NameRegistered(id, owner, expires)`
* `NameRenewed(id, expires)`
* `Transfer(from,to,tokenId)`\


BaseRegistrar is the owner of .eth and is a ERC721 NFT contract. `id` is the hash of the label (eg: for “matoken.eth”, the keccak256 of “matoken” becomes the id. For more information, read “[ENS as NFT](https://docs.ens.domains/dapp-developer-guide/ens-as-nft) section”).&#x20;

### EthRegistrarController

* `NameRegistered(name, label, owner, baseCost, premium, expires)`
* `NameRenewed(name, label, cost, expires)`

The `EthRegistrarController` contract contains the actual registration logic. The contract is upgradable via DAO vote and has been changed a few times in the past. The `Registered`/`Renewed` events contain the registration logic as well as domain names in plain text. The Graph uses this information to decode .eth id and lablehash into human readable names.

### NameWrapper

* `NameWrapped(node, name, owner, fuses, expiry)`
* `NameUnwrapped(node, owner)`
* `FusesSet(node, fuses)`
* `TransferSingle(operator, from, to, ids, value)`
* `TransferBatch(operator, from, to, ids, value)`

`NameWrapper` is the new feature that turns any subdomains into NFT (with extra access control to prevent parent domain owners from reverting the NFT ownership). `TransferSingle` and `TransferBatch` are ERC1155 defined events.

## FAQ

### Listing all primary names

* SmartContract = [reverse-records](https://github.com/ensdomains/reverse-records) smart contract allows you to resolve primary names for multiple addresses (does not support [ENSIP-10](../ens-improvement-proposals/ensip-10-wildcard-resolution.md)).&#x20;
* TheGraph = subgraph currently does not index primary name info ([github issue](https://github.com/ensdomains/ens-subgraph/issues/25)).&#x20;
* Dune = If you simply want to count the number, you can count the number of names registered under `addr.reverse` node ([example query](https://dune.com/queries/5341/10526)). To query all names, use “[ens.node\_names](https://github.com/duneanalytics/spellbook/blob/main/models/ens/ens\_node\_names.sql)” abstraction.

### Listing all registered names

* JS & SmartContract = There is no function to list all registered names.&#x20;
* TheGraph = Querying `Domains` object will give you the list of names.&#x20;
* Dune = Query `ENSRegistry_evt_NewOwner` and `ENSRegistryWithFallback_evt_NewOwner` tables\


If you want to exclude released names, you need to join the registration table and exclude where the expiration date is less than the current date - 90 days (90 days is the grace period where the name is expired but no one can register).

### Listing all records (ETH address/contenthash/text record)

* JS & SmartContract = There is no function to list all registered names.&#x20;
* Dune = Query `PublicResolver_call_*` [Example query](https://dune.com/makoto/ens-public-resolver) or use “[ens.resolver\_records](https://github.com/duneanalytics/spellbook/blob/main/models/ens/ens\_resolver\_records.sql)” abstraction.
* TheGraph = Querying \`Domains.resolver\` object will give you all the records.

Example

```graphql
{
  domains {
    name
      resolver{
      contentHash
      texts
      addr {
        id
      }
      coinTypes
    }
  }

```

NOTE: texts and coinTypes only return the keys so you still have to call smart contracts to get the value.

### Listing Offchain names

The offchain names cannot be tracked because they do not exist on the chain.

### Why are some subdomain names not decoded?

ENS names are stored as a hash on-chain so we have to decode the name using a list of possible names, and it shows in the hashed format if we don't have it on our list. You can still access and manage the name if you search for the name directly in the search bar.

### How do I find sub categories such as 10k club, 100k club, emoji, etc?

ENS Protocol itself does not have any mechanism to categorise names. You can either search with certain categories using regular expressions ([Dune example](https://dune.com/queries/1651428)) or may refer to third-party sites such as ​​https://ens.vision
