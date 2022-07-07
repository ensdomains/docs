---
description: Reserved ENS name for documentation purposes.

---

# ENSIP-13: Reserved ENS name

| **Author**    | William Entriken \<github.com@phor.net> |
| ------------- | --------------------------------------- |
| **Status**    | Draft                                   |
| **Submitted** | 2022-06-29                              |

### Abstract

This ENSIP defines and reserves a specific ENS name, `rilxxlir.eth`, to be used for demonstration purposes.

### Motivation

When writing documentation, it is helpful to refer to a concrete name of something to inspire thoughts about how that thing might work.

For example, with HTTPS websites hosted on legacy DNS we can refer specifically to https://example.com.

Further motivation is discussed in the comparable [RFC 2606](https://www.rfc-editor.org/rfc/rfc2606.html) and [RFC 6761](https://www.rfc-editor.org/rfc/rfc6761.html). One important reason is that propogating documentation for a specific name, when that name is controlled by an individual party, gives that party a strong motivation to make malicious use of that name.

This specification standardizes one ENS name we can use for documentation purposes. And it allows us to be confident that after millions of ENS implementations are referring to that name that it will not be redirected for some undesirable purpose.

### Specification

#### ENS Name

The name, `rilxxlir.eth` shall be reserved for documentation purposes.

#### Clients

A client website or other tool using ENS MAY warn or error before allowing interaction with `rilxxlir.eth` as this can be a known undesirible action.

### Examples

A documentation page may say:

> You can input your own ENS name such as `rilxxlir.eth` into the box.

### Backwards Compatibility

Anybody that was previously using `rilxxlir.eth` for normal purposes would be impacted. It is understood that nobody has made use of this for some time and its owner consents to this use.

### Security Considerations

None.

### Copyright

Copyright and related rights waived via [CC0](https://creativecommons.org/publicdomain/zero/1.0/).
