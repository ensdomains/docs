sidebar_position: 3
title: Sample Queries

---

# Querying

Below are some sample queries you can use to gather information from the ENS contracts.

You can build your own queries using a [GraphQL Explorer](https://graphiql-online.com/graphiql) and enter your endpoint to limit the data to exactly what you need.

## Get the top domain for an account based on the longest registry.

```graphql
query getDomainForAccount {
  account(id: "0xa508c16666c5b8981fa46eb32784fccc01942a71") {
    registrations(first: 1, orderBy: expiryDate, orderDirection: desc) {
      domain {
        name
      }
    }
    id
  }
}
```

### Returns

```graphql
{
  "data": {
    "account": {
      "registrations": [
        {
          "domain": {
            "name": "datanexus.eth"
          }
        }
      ],
      "id": "0xa508c16666c5b8981fa46eb32784fccc01942a71"
    }
  }
}
```

## Search for subdomain

```graphql
query getSubDomains($Account: String = "messari.eth") {
  domains(where: { name: "messari.eth" }) {
    name
    id
    subdomains(first: 10) {
      name
    }
    subdomainCount
  }
}
```

### Returns

```graphql
{
  "data": {
    "domains": [
      {
        "name": "messari.eth",
        "id": "0x498ada62251a1227664ace8d97b0de2dcc6652ddf61e6fb5d3150f43ccf599e6",
        "subdomains": [
          {
            "name": "subgraphs.messari.eth"
          },
          {
            "name": "bd.messari.eth"
          }
        ],
        "subdomainCount": 2
      }
    ]
  }
}
```

## Get an expiration for an ENS domain

```graphql
query getDomainExp($Account: String = "paulieb.eth") {
  registrations(
    where: { domain_: { name: $Account } }
    first: 1
    orderBy: expiryDate
    orderDirection: desc
  ) {
    expiryDate
  }
}
```

### Returns

```graphql
{
  "data": {
    "registrations": [
      {
        "expiryDate": "1714752524"
      }
    ]
  }
}
```
