**DESCRIPTION:** DataURI (RFC-2397) Format in Contenthash

# ENSIP-XX: DataURI Format in Contenthash

| &nbsp; | &nbsp; |
| ------ | ------ |
| **Author(s)** | [sshmatrix.eth](@sshmatrix), [ethlimo.eth](@ethlimo), [freetib.eth](@0xc0de4c0ffee) |
| **Status**    | Draft |
| **Submitted** | `2023-10-31` |

### Abstract

This ENSIP introduces DataURI format in Contenthash field (ENSIP-07) for compatible ENS resolvers. DataURI format (RFC-2397) is desired and suitable for enabling dynamic dWeb content for ENS domains using on-chain and/or off-chain resources. 

## Motivation

ENS `contenthash` (ENSIP-07) currently enables linking to static content which is strictly off-chain. The off-chain content is entirely dependent on off-chain providers, and updating this content for ENS-based decentralised websites typically requires updating the on-chain `contenthash` explicitly (except for IPNS). ENS domains' `avatar` text records and their ERC-721/-1155 interfaces already support generated DataURI bytes (`data:uri`) to resolve JSON and image metadata. This specification enables a similar `data:uri` format in ENS `contenthash` field, allowing ENS Resolvers to fetch and serve on-chain and/or off-chain data. The off-chain resources for the DataURI content may use CCIP-Read and an appropriate `utf-8` decoder to render the encoded bytes.

## Specification

This specification is an extension of [ENSIP-07](https://docs.ens.domains/ens-improvement-proposals/ensip-7-contenthash-field) to support in-line bytes of data conforming to the `data:uri` scheme (RFC-2397) as ENS Contenthash. There are no changes to be made in the current ENS Resolvers since `contenthash` bytes are parsed as `utf-8` characters by default. Only a standardisation needs to be enacted for web3 providers to begin resolving ENS Contenthash in `data:uri` scheme. Simple details of the proposed standardisation are as follows:

### Decoded String

- DataURI is string-formatted according to RFC-2397:

```js
data:<media>/<type>;<encoding>,<payload>
```

### Encoded Bytes

- The raw string-formatted data is returned as encoded hexadecimal bytes. The encoded value returned by DataURI-compatible `contenthash` is always prefixed with the 5-byte identifier `0x646174613a` followed by the remaining variable encoded databytes.

``` js
stringTohex("data:")` = `0x646174613a`
```

 #### Examples

| Decoded String | Encoded Bytes |
| ---            | ---           |
| `data:text/plain;base64,SGVsbG8gV29ybGQ` | `0x646174613a746578742f706c61696e3b6261736536342c534756736247386756323979624751` |
| `data:text/plain,Hello World` | `0x646174613a746578742f706c61696e2c48656c6c6f20576f726c64` |
| `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII`  | `0x646174613a696d6167652f706e673b6261736536342c6956424f5277304b47676f414141414e5355684555674141414167414141414941514d414141442b77537a4941414141426c424d5645582f2f2f2b2f76372b6a5133593541414141446b6c45515651493132503441495838454167414c6741442f614e7062744541414141415355564f524b3543594949` |
| `data:image/svg+xml,<svgxmlns='http://www.w3.org/2000/svg'height='30'width='200'><textx='0'y='15'fill='red'>IamSVG</text></svg>` | `646174613a696d6167652f7376672b786d6c2c3c737667786d6c6e733d27687474703a2f2f7777772e77332e6f72672f323030302f737667276865696768743d2733302777696474683d27323030273e3c74657874783d273027793d2731352766696c6c3d27726564273e49616d5356473c2f746578743e3c2f7376673e` |
| `data:text/xml,<?xml version='1.0'?><note>I am XML</note>` | `0x646174613a746578742f786d6c2c3c3f786d6c2076657273696f6e3d27312e30273f3e3c6e6f74653e4920616d20584d4c3c2f6e6f74653e` |
| `data:text/html,Hello, <div>I am HTML</div>` | `0x646174613a746578742f68746d6c2c48656c6c6f2c203c6469763e4920616d2048544d4c3c2f6469763e` |

With this simple standardisation, web3 providers may now serve `data:uri` content from on-chain or off-chain resources allowing dynamic content on ENS dWebsites.

### Implementation

**GitHub** : https://github.com/namesys-eth/datauri-eth-resolver (`Work-In-Progress`)

### Copyright

Copyright and related rights waived via [CC0](https://creativecommons.org/publicdomain/zero/1.0/).