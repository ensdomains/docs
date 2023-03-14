---
description: >-
  Specifies reverse resolution in a cross-chain context
---

# ENSIP-16: EVM-chain Reverse Resolution

| **Author**    | Jeff Lau \<jeff@ens.domains> |
| ------------- | ---------------------------- |
| **Status**    | Draft                        |
| **Submitted** | 2023-03-14                   |

## Abstract

This ENSIP specifies a way for reverse resolution to be used on other EVM chains.

## Motivation

Reverse resolution has been in use since ENS's inception, however at the time Ethereum had no concrete scaling plans. In the past 5 years, we've seen layer 2s and sidechains become more prevalent and we first allowed support for these with ENSIP-9 (formerly EIP-2304) to allow addresses from other chains to be stored on ENS. Reverse resolution can be expanded to allow the forward resolution to first check the records for the chain that the user is on, before falling back to using the address record on mainnet.

## Specification

* Use ENSIP-3 to reverse resolve an address to a name.
* Detect EVM-compatible network that the user is on.
* Use ENSIP-11 to do a forward resolution on the `addr()` with the chain id retrieved.
* If no record is found, fallback to Ethereum forward resolution `addr()`.


## Further considerations

This only applies to reverse records stored on Ethereum mainnet. This specification could be extended to allow forward resolution on canonical registries on other chains.

### Copyright

Copyright and related rights waived via [CC0](https://creativecommons.org/publicdomain/zero/1.0/).
