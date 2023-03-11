---
sidebar_position: 2
title: Subgraph Entities
---

# Entities

- [`Domain`](#domain)
- [`DomainEvent`](#domainevent)
- [`Transfer`](#transfer)
- [`NewOwner`](#newowner)
- [`NewResolver`](#newresolver)
- [`NewTTL`](#newttl)
- [`Account`](#account)
- [`Registration`](#registration)
- [`RegistrationEvent`](#resistrationevent)
- [`NameRegistered`](#nameregistered)
- [`NameRenewed`](#namerenewed)
- [`NameTransferred`](#nametransferred)
- [`Resolver`](#resolver)
- [`ResolverEvent`](#resolverevent)
- [`AddrChanged`](#addrchanged)
- [`MulticoinAddrChanged`](#multicoinaddrchanged)
- [`NameChanged`](#namechanged)
- [`AbiChanged`](#abichanged)
- [`PubKeyChanged`](#pubkeychanged)
- [`TextChanged`](#textchanged)
- [`ContentHashChanged`](#contenthashchanged)
- [`InterfaceChanged`](#interfacechanged)
- [`AuthorisationChanged`](#authorisationchanged)

# Domain

Description: Represents an Ethereum Name Service (ENS) domain.

| Field           | Type                           | Description                                                                                                    |
| --------------- | ------------------------------ | -------------------------------------------------------------------------------------------------------------- |
| id              | ID!                            | The namehash of the name                                                                                       |
| name            | String                         | The human readable name, if known. Unknown portions replaced with hash in square brackets (eg, foo.[1234].eth) |
| labelName       | String                         | The human readable label name (imported from CSV), if known                                                    |
| labelhash       | Bytes                          | keccak256(labelName)                                                                                           |
| parent          | Domain                         | The namehash (id) of the parent name                                                                           |
| subdomains      | [`Domain!`](#domain)           | Can count domains from length of array                                                                         |
| subdomainCount  | Int!                           | The number of subdomains                                                                                       |
| resolvedAddress | account                        | Address logged from current resolver, if any                                                                   |
| owner           | Account!                       | The Ethereum address that owns the domain.                                                                     |
| resolver        | Resolver                       | The resolver contract that resolves the domain name to an Ethereum address.                                    |
| ttl             | BigInt                         | The time-to-live (TTL) value of the domain name.                                                               |
| isMigrated      | Boolean!                       | Indicates whether the domain has been migrated to the ENS V2 registrar.                                        |
| createdAt       | BigInt!                        | The timestamp at which the domain was created.                                                                 |
| events          | [`DomainEvent!`](#domainevent) | An array of events related to the domain.                                                                      |

# Transfer

Description: Details of the transfer

| Field         | Type    | Description                                        |
| ------------- | ------- | -------------------------------------------------- |
| id            | ID!     | The ID of the transfer event                       |
| domain        | Domain! | The domain that was transferred                    |
| blockNumber   | Int!    | The block number in which the event occurred       |
| TransactionID | Bytes!  | The ID of the transaction that triggered the event |

# NewOwner

Description: details of the newowner

| Field         | Type     | Description                                        |
| ------------- | -------- | -------------------------------------------------- |
| id            | ID!      | The ID of the new owner event                      |
| parentDomain  | Domain!  | The parent domain of the domain being transferred  |
| domain        | Domain!  | The domain that has a new owner                    |
| TransactionID | Bytes!   | The ID of the transaction that triggered the event |
| owner         | Account! | The new owner of the domain                        |

# NewResolver

Description: details of the new resolver

| Field         | Type      | Description                                        |
| ------------- | --------- | -------------------------------------------------- |
| id            | ID!       | The ID of the new resolver event                   |
| domain        | Domain!   | The domain that has a new resolver                 |
| blockNumber   | Int!      | The block number in which the event occurred       |
| TransactionID | Bytes!    | The ID of the transaction that triggered the event |
| resolver      | Resolver! | The new resolver of the domain                     |

# NewTTL

Description: details of the newTTL

| Field         | Type    | Description                                                                     |
| ------------- | ------- | ------------------------------------------------------------------------------- |
| id            | ID!     | The ID of the event                                                             |
| domain        | Domain! | The domain that had its time-to-live (TTL) changed                              |
| blockNumber   | Int!    | The block number in which the TTL change occurred                               |
| transactionID | Bytes!  | The ID of the transaction that triggered the TTL change event (hash or receipt) |
| ttl           | BigInt! | The new time-to-live for the domain                                             |

# Account

Description: Represents an Ethereum account that owns or is associated with a domain.

| Field        | Type                             | Description                                                                                             |
| ------------ | -------------------------------- | ------------------------------------------------------------------------------------------------------- |
| id           | ID!                              | The Ethereum address of the account.                                                                    |
| domain       | [`Domain!`](#domain)             | The domains associated with this account. Can be an empty array if the account doesn't own any domains. |
| registration | [`Registration!`](#registration) | The registration information for the account.                                                           |

# Registration

Description: Represents the registration information for a domain

| Field            | Type                                       | Description                                                                                            |
| ---------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| id               | ID!                                        | The namehash of the domain.                                                                            |
| domain           | Domain                                     | The domain associated with this registration.                                                          |
| registrationDate | BigInt!                                    | The timestamp of when the domain was registered                                                        |
| expiryDate       | BigInt!                                    | The timestamp of when the domain registration will expire.                                             |
| cost             | BigInt!                                    | The cost, in wei, of registering the domain.                                                           |
| registrant       | Account!                                   | The Ethereum account that registered the domain                                                        |
| labelName        | String                                     | The human-readable label name (imported from CSV), if known                                            |
| events           | [`RegistrationEvent!`](#resistrationevent) | The events associated with this registration. Can be an empty array if there are no associated events. |

# RegistrationEvent

Description: Represents an event associated with a domain registration

| Field         | Type              | Description                                    |
| ------------- | ----------------- | ---------------------------------------------- |
| id            | ID!               | The ID of the registration event               |
| registration  | RegistrationEvent | The registration associated with this event    |
| blockNumber   | Int!              | The block number in which the event occurred   |
| transactionID | Bytes!            | The transaction ID in which the event occurred |

# NameRegistered

Description: details of the Name Registered.

| Field         | Type          | Description                                 |
| ------------- | ------------- | ------------------------------------------- |
| id            | ID!           | Unique identifier of the registration event |
| registration  | Registration! | The registration being registered           |
| blockNumber   | Int!          | The block number where the event occurred   |
| transactionID | Bytes!        | The transaction ID of the event             |
| registrant    | Account!      | The account that registered the name        |
| expiryDate    | BigInt!       | The new expiry date of the registration     |

# NameRenewed

Description: details of Name Renewed.

| Field         | Type          | Description                               |
| ------------- | ------------- | ----------------------------------------- |
| id            | ID!           | Unique identifier of the renewal event    |
| registration  | Registration! | The registration being renewed            |
| blockNumber   | Int!          | The block number where the event occurred |
| transactionID | Bytes!        | The transaction ID of the event           |
| expiryDate    | BigInt!       | The new expiry date of the registration   |

# NameTransferred

Description: Details of Name Transferred.

| Field         | Type          | Description                               |
| ------------- | ------------- | ----------------------------------------- |
| id            | ID!           | Unique identifier of the transfer event   |
| registration  | Registration! | The registration being transferred        |
| blockNumber   | Int!          | The block number where the event occurred |
| transactionID | Bytes!        | The transaction ID of the event           |
| newOwner      | Account!      | The new owner of the registration         |

# Resolver

Description: details of the resolver

| Field      | Type                               | Description                                      |
| ---------- | ---------------------------------- | ------------------------------------------------ |
| id         | ID!                                | Concatenation of resolver address and namehash   |
| domain     | Domain                             | The domain associated with this resolver         |
| address    | Bytes!                             | Address of resolver contract                     |
| addr       | Account                            | Current value of addr record (per events)        |
| contenHash | Bytes                              | Content hash, in binary format                   |
| texts      | [String!]                          | Set of observed text record keys                 |
| cointTypes | [BigInt!]                          | Set of observed SLIP-44 coin types               |
| events     | [`ResolverEvent!`](#resolverevent) | The list of events associated with this resolver |

# ResolverEvent

Description: details of resolver event

| Field         | Type      | Description                                   |
| ------------- | --------- | --------------------------------------------- |
| id            | ID!       | Concatenation of block number and log ID      |
| resolver      | Resolver! | Used to derive relationships to Resolvers     |
| blockNumber   | Int!      | The block number of the transaction           |
| transactionID | Bytes!    | The transaction ID associated with this event |

# AddrChanged

Description: details of address changed

| Field         | Type      | Description                                    |
| ------------- | --------- | ---------------------------------------------- |
| id            | ID!       | The unique identifier for this event           |
| resolver      | Resolver! | The resolver associated with this event        |
| blockNumber   | Int!      | The block number of the transaction            |
| transactionID | Bytes!    | The transaction ID associated with this event. |
| addr          | Account!  | The new value of the addr record               |

# MulticoinAddrChanged

Description: details of multi coin addr changed

| Field         | Type      | Description                                                        |
| ------------- | --------- | ------------------------------------------------------------------ |
| id            | ID!       | Concatenation of block number and log ID                           |
| resolver      | Resolver! | Used to derive relationships to Resolvers                          |
| blockNumber   | Int!      | Block number of the transaction                                    |
| transactionID | Bytes!    | Transaction ID of the MulticoinAddrChanged event                   |
| coinType      | BigInt!   | The SLIP-44 coin type of the changed address                       |
| addr          | Bytes!    | The new address of the specified SLIP-44 coin type in bytes format |

# NameChanged

Description: details of name changed.

| Field         | Type      | Description                                 |
| ------------- | --------- | ------------------------------------------- |
| id            | ID!       | Concatenation of block number and log ID    |
| resolver      | Resolver! | Used to derive relationships to Resolvers   |
| blockNumber   | Int!      | Block number of the transaction             |
| transactionID | Bytes!    | Transaction ID of the NameChanged event     |
| name          | String!   | The new name of the domain, in UTF-8 format |

# AbiChanged

Description: details of Abichanged

| Field         | Type      | Description                                               |
| ------------- | --------- | --------------------------------------------------------- |
| id            | ID!       | Concatenation of block number and log ID                  |
| resolver      | Resolver! | Used to derive relationships to Resolvers                 |
| blockNumber   | Int!      | Block number of the transaction                           |
| transactionID | Bytes!    | Transaction ID of the AbiChanged event                    |
| contentType   | BigInt!   | The content type of the ABI data in the Resolver contract |

# PubkeyChanged

Description: Details of PubkeyChanged

| Field         | Type      | Description                                                 |
| ------------- | --------- | ----------------------------------------------------------- |
| id            | ID!       | Concatenation of block number and log ID                    |
| resolver      | Resolver! | Used to derive relationships to Resolvers                   |
| blockNumber   | Int!      | The block number in which the log was emitted               |
| transactionID | Bytes!    | The transaction hash in which the log was emitted           |
| x             | Bytes!    | The x-coordinate of the new elliptic curve public key value |
| y             | Bytes!    | The y-coordinate of the new elliptic curve public key value |

# TextChanged

Description: Details of text changed.

| Field         | Type      | Description                                           |
| ------------- | --------- | ----------------------------------------------------- |
| id            | ID!       | Concatenation of block number and log ID              |
| resolver      | Resolver! | Used to derive relationships to Resolvers             |
| blockNumber   | Int!      | The block number in which the log was emitted         |
| transactionID | Bytes!    | The transaction hash in which the log was emitted     |
| key           | String!   | The key of the updated text record                    |
| value         | String    | The new value associated with the updated text record |

# ContenthashChanged

Description: details of content hash changed

| Field         | Type      | Description                                           |
| ------------- | --------- | ----------------------------------------------------- |
| id            | ID!       | Concatenation of block number and log ID              |
| resolver      | Resolver! | Used to derive relationships to Resolvers             |
| blockNumber   | Int!      | The block number in which the log was emitted         |
| transactionID | Bytes!    | The transaction hash in which the log was emitted     |
| hash          | Bytes!    | The new content hash value associated with the domain |

# InterfaceChanged

Description: details of interface changed

| Field         | Type      | Description                                            |
| ------------- | --------- | ------------------------------------------------------ |
| id            | ID!       | Concatenation of block number and log ID               |
| resolver      | Resolver! | Used to derive relationships to Resolvers              |
| blockNumber   | Int!      | Block number containing the transaction event          |
| transactionID | Bytes!    | Transaction hash containing the event                  |
| interfacedID  | Bytes!    | The ID of the interface being changed                  |
| implementer   | Bytes!    | The address of the contract implementing the interface |

# AuthorisationChanged

Description: details of authorisation changed

| Field         | Type      | Description                                      |
| ------------- | --------- | ------------------------------------------------ |
| id            | ID!       | Concatenation of block number and log ID         |
| resolver      | Resolver! | Resolver associated with the event               |
| blockNumber   | Int!      | The block number of the transaction              |
| transactionID | Bytes!    | The ID of the transaction                        |
| owner         | Bytes!    | The address of the owner of the authorization    |
| target        | Bytes!    | The address of the authorized target             |
| isAuthorized  | Boolean!  | A boolean indicating if the target is authorized |
