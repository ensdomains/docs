# Technical Description

Recently, we were made aware of a vulnerability in the ENS registry contract. This vulnerability would make it possible for the owner of a domain to set a ‘back door’ such that they could transfer or sell the domain to another user, then, at a later time, claw back ownership of that domain without the new owner’s consent.

The nature of this vulnerability is such that the attacker must at one point have had legitimate ownership of the domain in question, and they must set this ‘back door’ before they relinquished ownership of the name. As a result, this vulnerability cannot be exploited retrospectively.

This vulnerability was reported via the Ethereum Foundation’s bug bounty process by Sam Sun. We have examined the ENS registry in detail, and are confident that nobody has previously exploited this vulnerability. As a result, ownership of all ENS names is secure.

Due to this, ENS is migrating to a new deployment. This document describes the exact technical steps being taken, along with a brief description of their implications for DApp authors and users.

This document is intended to provide a detailed description for anyone interested in the low-level details of the migration. Understanding this is not necessary for most users or developers; for a description of the vulnerability and its effect on users, see [our medium post](https://medium.com/the-ethereum-name-service/ens-registry-migration-bug-fix-new-features-64379193a5a); for a description of the migration steps for developers see the [guide for DApp developers](guide-for-dapp-developers.md).

## New ENS deployment

A new instance of most ENS contracts is being deployed. Several of these have changes, while others are being redeployed in order to reference the new registry instead of the old one.

### ENS Registry

A new version of the ENS registry has been deployed, and can be found at address 0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e Besides fixing the vulnerability, we have taken the opportunity to implement a couple of additional features that will improve ENS’s usability going forward:

* Addition of \`setRecord\` and \`setSubnodeRecord\` methods, which allow setting owner, resolver, and TTL in a single operation.
* Addition of an approval mechanism based on ERC721, that allows users to delegate control over their names to another address, without having to transfer their names.

The new registry implementation has been [audited by Sam Sun](https://gist.github.com/samczsun/2f0a2e266191042baada48c5407d8986), as well as [reviewed by Consensys Diligence](https://diligence.consensys.net/audits/2019/03/ens-permanent-registrar/); no issues were found by either auditor.

In order to make the migration as smooth as possible, the new registry has a fallback configured; if a record is not found in its own storage, it will look it up in the previous ENS registry contract. This fallback works only for read operations; if a record exists in the old registry but not yet in the new one, users cannot call functions to modify that record on the new registry.

This means that to migrate each name over from the previous registry, the name must be recreated as if from scratch - so, for example, if ‘foo.eth’ does not yet exist in the new registry, the owner of ‘eth’ must create it in the same fashion as if it were a new domain, by calling \`setSubnodeOwner\` \(or the new \`setSubnodeRecord\`\). Other top-level domain owners \(eg, .luxe, .kred, .club and .art\) will need to do this on behalf of their users, so those users can recover write access to their domains.

As a result of this fallback, if a record has not been migrated to the new registry, users and processes can continue to update records in the old registry; when they do, those changes will be reflected in the new one. At the point where a record is migrated to the new registry, it ceases to reflect any changes made in the old one. This ensures that names operated by smart contracts continue to function until their owners can take manual action to migrate them over.

Migration strategies for each class of name are outlined below:

* Top-level domains \(.eth, .luxe, .kred, .club, .art, .xyz, and .reverse\) were migrated over as part of the deployment process.
* .eth second-level domains \(eg, foo.eth\) will be migrated over automatically for users - see the ‘migration contract’ section below for details.
* Subdomains managed by the Subdomain Registrar will also be migrated over automatically for users.
* Subdomains created by other means will need to be recreated by the owner of the parent domain calling \`setSubnodeOwner\` or \`setSubnodeRecord\`. The ENS dapp at app.ens.domains provides a one-click button to to do this for domains that are owned directly by users.
* Reverse records \(.addr.reverse domains\) will need to be recreated by repeating the ‘claim’ process in the ENS dapp UI.
* .xyz records will need to be migrated by repeating the ‘claim’ process proving ownership of the corresponding DNS domain. This can be done via the ENS Manager UI.
* .kred, .art, and .club domains will be migrated by the operators of those top-level domains.

Name resolution will continue to work normally for names that have not yet been migrated to the new registry. Migration is only necessary in order for users to be able to change the name’s ownership, resolver, or TTL.

### .ETH Registrar

A new instance of the .eth registrar \(BaseRegistrarImplementation\) has been deployed, and can be found at 0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85. This registrar is largely unchanged, with only a couple of minor modifications made to support the migration.

### Migration Contract

A new contract, designed specifically for the migration process, has been deployed and can be found at 0x6109DD117AA5486605FC85e040ab00163a75c662. This contract is configured as a controller for the new .eth registrar, and will be set as the owner of .eth on the old registry once the migration process begins. Functions on this contract permit migrating .eth second-level names \(eg, foo.eth\) over from the old registry and registrar to the new ones.

Once activated, the ENS team will submit transactions to migrate over all presently registered .eth second-level domains to the new deployment. Registrations for all names will be automatically moved over to the new registrar, with the same expiry date as they had previously. Registry records will be automatically migrated over, unless they are controlled by a contract. Records controlled by contracts will not be automatically migrated in order to avoid breaking registrar contracts.

If you own a name that is controlled by a smart contract \(for example, you’re using a custom registrar to allocate subdomains\), you will need to deploy a new version of that contract that references the new ENS registry, then manually migrate the name yourself, by using the ‘Set controller’ functionality in the ENS manager dapp.

In addition, the ENS team is automatically migrating over records from the legacy \(auction-based\) registrar. Names on the legacy registrar that have not previously been migrated over will be automatically created in the new deployment, with their expiration dates set to their existing expiry of May 4, 2020, meaning users will no longer have to do this manually - though they will still have to send a transaction to recover their deposit, which they can do at any time. This permits the new ENS deployment to do away with legacy code for supporting this obsolete registrar.

### Public Resolver

A new instance of the public resolver has been deployed, and can be found at 0xDaaF96c344f63131acadD0Ea35170E7892d3dfBA. This instance references the new ENS registry, and has an additional ‘multicall’ feature implemented, which permits users to set multiple records in a single operation.

Since the public resolver looks up names in the ENS registry to determine who is permitted to configure records for them, while names - migrated or otherwise - pointed at an old instance of the public resolver will continue to function, they will need to migrate to the new public registrar in order to make changes. The ENS dapp at app.ens.domains facilitates this process using the new \`multicall\` function, making it possible to migrate over all records for a name in two transactions: the first one copying all records from the old resolver to the new one, and the second one updating the registry to point to the new resolver contract.

### .ETH Registrar Controller

All registration requests for ENS .eth second-level names are processed via a [‘controller’ contract](https://docs.ens.domains/contract-api-reference/.eth-permanent-registrar/controller). Once the migration is complete and all names from the old registry and registrar have been re-registered on the new one, the ENS team will enable the standard registrar controller, which permits registrations via the standard two-transaction process. The controller contract has no changes from the previous deployment.

### Reverse Registrar

A new instance of the reverse registrar has been deployed to point to the new registry. There are no changes to this compared to the old version. Reverse resolution will continue to function as normal throughout the transition.

### DNSSEC Registrar

A new instance of the DNSSEC registrar has been deployed. The new instance retains all the functionality of the old one, while incorporating a few improvements that will make rolling DNSSEC support out to more top-level domains easier. Resolution of .xyz names will continue to function as normal, but any owners of these names wanting to make changes will have to repeat the ‘claim’ process to reclaim ownership of the name.

### Subdomain Registrar

A new instance of the subdomain registrar has been deployed. This instance is largely unchanged from the previous version, except insofar as it supports migrating from that version to the new one.  


