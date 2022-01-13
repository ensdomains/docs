---
description: >-
  Introduces coinType for EVM compatible chains (amending ENSIP9).
---

# ENSIP-9: EVM compatible Chain Address Resolution

| **Author**    | Makoto Inoue \<makoto@ens.domains> |
| ------------- | -------------------------------- |
| **Status**    | Draft                            |
| **Submitted** | 2022-01-13                       |

### Motivation

The existing [ENSIP9(multichain address resolution)](./ensip-9-multichain-address-resolution.md) relies on the existence of coin types on [SLIP44](https://github.com/satoshilabs/slips/blob/master/slip-0044.md) which was designed to define address encoding type for deterministic wallets. As the majority of EVM compatible chains inherit the same encoding type as Ethereum, it is redundant to keep requesting the addition of EVM compatible chains into SLIP 44.

### Specification

This specification amends ENSIP9 by allocating all EVM cointype in the range of 0x800000000, which is currently reserved at SLIP44 as msb (most significant bit) and hence no coin types exist in that range.
To compute the new coin type for EVM chains, you have to do 0x800000000 | chainId


```typescript
export const convertEVMChainIdToCoinType = (chainId: number) =>{
  return  (0x80000000 | chainId) >>> 0
}
```

#### Implementation

An implementation of this interface is provided in the [ensdomains/address-encoder](https://github.com/ensdomains/address-encoder/) repository.

#### Example

To compute the new coin type for EVM chains, call `convertEVMChainIdToCoinType(chainId)`

```javascript
const encoder = require('@ensdomains/address-encoder')
>  encoder.convertEVMChainIdToCoinType(61)
2147483709
```

You can also use existing functions formatsByName and formatsByCoinType to derive these chain IDs

```javascript
> encoder.formatsByName['XDAI']
{
 coinType: 2147483748,
 decoder: [Function (anonymous)],
 encoder: [Function (anonymous)],
 name: 'XDAI'
}
> encoder.formatsByCoinType[2147483748]
{
 coinType: 2147483748,
 decoder: [Function (anonymous)],
 encoder: [Function (anonymous)],
 name: 'XDAI'
}
```

#### Exceptions

The following EVM chains are the exception to this standard.

- AVAX = AVAX has multiple chain address formats, and only c chain is EVM compatible
- RSK = RSK has its own additional validation

#### Backwards Compatibility

The following EVM compatible cointypes existed before introducing this new standard.

- NRG
- POA
- TT
- CELO
- CLO
- TOMO
- EWT
- THETA
- GO
- FTM
- XDAI
- ETC

When you display them for backward compatibility purposes, append `_LEGACY` to the cointype and make them read only.

### Copyright

Copyright and related rights waived via [CC0](https://creativecommons.org/publicdomain/zero/1.0/).
