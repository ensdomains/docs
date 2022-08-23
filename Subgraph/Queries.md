sidebar_position: 3
title: Sample Queries

---

# Querying

Below are some sample queries you can use to gather information from the ENS contracts.

You can build your own queries using a [GraphQL Explorer](https://graphiql-online.com/graphiql) and enter your endpoint to limit the data to exactly what you need.

## Get the top domain for an account based on the longest registry.

```graphql
query getDomainForAccount {
  account(id: "0xfee51ebbf276c1c3d91910a0b9a029e3ce731619") {
    registrations(first: 1, orderBy: expiryDate, orderDirection: desc) {
      domain {
        name
      }
    }
    id
  }
}
```

## Search for subdomain

```graphql
query getSubDomains($Account: String = "vitalik.eth") {
  domains(where: { name: "vitalik.eth" }) {
    name
    id
    subdomains(first: 10) {
      name
    }
    subdomainCount
  }
}
```

## Get an expiration for an ENS domain

```graphql
{
 query getDomainExp($Account: String = "vitalik.eth") {
  registrations(
    where: {domain_: {name: $Account}}
    first: 1
    orderBy: expiryDate
    orderDirection: desc
  ) {
    expiryDate
  }
}
```
