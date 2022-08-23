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

Description:

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
| owner           | Account!                       |                                                                                                                |
| resolver        | Resolver                       |                                                                                                                |
| ttl             | BigInt                         |                                                                                                                |
| isMigrated      | Boolean!                       |                                                                                                                |
| createdAt       | BigInt!                        |                                                                                                                |
| events          | [`DomainEvent!`](#domainevent) |                                                                                                                |

# Transfer

Description:

| Field         | Type    | Description |
| ------------- | ------- | ----------- |
| id            | ID!     |             |
| domain        | Domain! |             |
| blockNumber   | Int!    |             |
| TransactionID | Bytes!  |             |

# NewOwner

Description:

| Field         | Type     | Description |
| ------------- | -------- | ----------- |
| id            | ID!      |             |
| parentDomain  | Domain!  |             |
| domain        | Domain!  |             |
| TransactionID | Bytes!   |             |
| owner         | Account! |             |

# NewResolver

Description:

| Field         | Type      | Description |
| ------------- | --------- | ----------- |
| id            | ID!       |             |
| domain        | Domain!   |             |
| blockNumber   | Int!      |             |
| TransactionID | Bytes!    |             |
| resolver      | Resolver! |             |

# NewTTL

Description:

| Field         | Type    | Description |
| ------------- | ------- | ----------- |
| id            | ID!     |             |
| domain        | Domain! |             |
| blockNumber   | Int!    |             |
| transactionID | Bytes!  |             |
| ttl           | BigInt! |             |

# Account

Description:

| Field        | Type                             | Description |
| ------------ | -------------------------------- | ----------- |
| id           | ID!                              |             |
| domain       | [`Domain!`](#domain)             |             |
| registration | [`Registration!`](#registration) |             |

# Registration

Description:

| Field            | Type                                      | Description |
| ---------------- | ----------------------------------------- | ----------- |
| id               | ID!                                       |             |
| domain           | Domain                                    |             |
| registrationDate | BigInt!                                   |             |
| expiryDate       | BigInt!                                   |             |
| cost             | BigInt!                                   |             |
| registrant       | Account!                                  |             |
| labelName        | String                                    |             |
| events           | [`RegistrationEven!`](#resistrationevent) |             |

# RegistrationEvent

Description:

| Field         | Type              | Description |
| ------------- | ----------------- | ----------- |
| id            | ID!               |             |
| registration  | RegistrationEvent |             |
| blockNumber   | Int!              |             |
| transactionID | Bytes!            |             |

# NameRegistered

Description:

| Field         | Type          | Description |
| ------------- | ------------- | ----------- |
| id            | ID!           |             |
| registration  | Registration! |             |
| blockNumber   | Int!          |             |
| transactionID | Bytes!        |             |
| registrant    | Account!      |             |
| expiryDate    | BigInt!       |             |

# NameRenewed

Description:

| Field         | Type          | Description |
| ------------- | ------------- | ----------- |
| id            | ID!           |             |
| registration  | Registration! |             |
| blockNumber   | Int!          |             |
| transactionID | Bytes!        |             |
| expiryDate    | BigInt!       |             |

# NameTransferred

Description:

| Field         | Type          | Description |
| ------------- | ------------- | ----------- |
| id            | ID!           |             |
| registration  | Registration! |             |
| blockNumber   | Int!          |             |
| transactionID | Bytes!        |             |
| newOwner      | Account!      |             |

# Resolver

Description:

| Field      | Type                               | Description                                    |
| ---------- | ---------------------------------- | ---------------------------------------------- | ------------------------------ |
| id         | ID!                                | Concatenation of resolver address and namehash |
| domain     | Domain                             |                                                |
| address    | Bytes!                             | Address of resolver contract                   |
| addr       | Account                            | Current value of addr record (per events)      |
| contenHash | Bytes                              |                                                | Content hash, in binary format |
| texts      | [String!]                          | Set of observed text record keys               |
| cointTypes | [BigInt!]                          | Set of observed SLIP-44 coin types             |
| events     | [`ResolverEvent!`](#resolverevent) |                                                |

# ResolverEvent

Description:

| Field         | Type      | Description                               |
| ------------- | --------- | ----------------------------------------- |
| id            | ID!       | Concatenation of block number and log ID  |
| resolver      | Resolver! | Used to derive relationships to Resolvers |
| blockNumber   | Int!      |                                           |
| transactionID | Bytes!    |                                           |

# AddrChanged

Description:

| Field         | Type      | Description |
| ------------- | --------- | ----------- |
| id            | ID!       |             |
| resolver      | Resolver! |             |
| blockNumber   | Int!      |             |
| transactionID | Bytes!    |             |
| addr          | Account!  |             |

# MulticoinAddrChanged

Description:

| Field         | Type      | Description |
| ------------- | --------- | ----------- |
| id            | ID!       |             |
| resolver      | Resolver! |             |
| blockNumber   | Int!      |             |
| transactionID | Bytes!    |             |
| coinType      | BigInt!   |             |
| addr          | Bytes!    |             |

# NameChanged

Description:

| Field         | Type      | Description |
| ------------- | --------- | ----------- |
| id            | ID!       |             |
| resolver      | Resolver! |             |
| blockNumber   | Int!      |             |
| transactionID | Bytes!    |             |
| name          | String!   |             |

# AbiChanged

Description:

| Field         | Type      | Description |
| ------------- | --------- | ----------- |
| id            | ID!       |             |
| resolver      | Resolver! |             |
| blockNumber   | Int!      |             |
| transactionID | Bytes!    |             |
| contentType   | BigInt!   |             |

# PubkeyChanged

Description:

| Field         | Type      | Description |
| ------------- | --------- | ----------- |
| id            | ID!       |             |
| resolver      | Resolver! |             |
| blockNumber   | Int!      |             |
| transactionID | Bytes!    |             |
| x             | Bytes!    |             |
| y             | Bytes!    |             |

# TextChanged

Description:

| Field         | Type      | Description |
| ------------- | --------- | ----------- |
| id            | ID!       |             |
| resolver      | Resolver! |             |
| blockNumber   | Int!      |             |
| transactionID | Bytes!    |             |
| key           | String!   |             |
| value         | String    |             |

# ContenthashChanged

Description:

| Field         | Type      | Description |
| ------------- | --------- | ----------- |
| id            | ID!       |             |
| resolver      | Resolver! |             |
| blockNumber   | Int!      |             |
| transactionID | Bytes!    |             |
| hash          | Bytes!    |             |

# InterfaceChanged

Description:

| Field         | Type      | Description |
| ------------- | --------- | ----------- |
| id            | ID!       |             |
| resolver      | Resolver! |             |
| blockNumber   | Int!      |             |
| transactionID | Bytes!    |             |
| interfacedID  | Bytes!    |             |
| implementer   | Bytes!    |             |

# AuthorisationChanged

Description:

| Field         | Type      | Description |
| ------------- | --------- | ----------- |
| id            | ID!       |             |
| resolver      | Resolver! |             |
| blockNumber   | Int!      |             |
| transactionID | Bytes!    |             |
| owner         | Bytes!    |             |
| target        | Bytes!    |             |
| isAuthorized  | Boolean!  |             |
