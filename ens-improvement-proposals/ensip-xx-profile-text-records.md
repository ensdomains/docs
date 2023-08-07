---
description: A standard for profile information as text records in ENS
---

# ENSIP-XX: Profile Text Records

| **Author**    | Tate \<tate@ens.domains> |
| ------------- | ------------------------ |
| **Status**    | Draft                    |
| **Submitted** | 2023-08-02               |

### Abstract

This ENSIP which extends [ENSIP-5: Text Records](ensip-5-text-records.md) defines a set of text records that should be used for profile information, along with the format that each should have.

### Motivation

ENS names have become increasingly popular to use as an identifying profile across the Ethereum ecosystem. Although many apps have started integrating ENS "profiles", the only defined global text record keys are in ENSIP-5. These global keys were defined based on the usecase of ENS names at the time, and were not created with profiles in mind.

This specification extends the existing set of global keys, as well as creating a new subset within global keys called "profile keys".

### Specification

The Profile Keys are a subset of Global Keys, the newly defined global keys are specified in the "Global Keys" section.

#### `name`

**Description:** A display name

**Format:** Any text

**Example:** `ENS`

**Design Considerations:** This should be displayed near the ENS name, but should not be displayed as a replacement for it and should be below it in the visual hierarchy. You can also choose not to show the display name at all.

#### `theme`

**Description:** A user customised theme to use

**Format:** An array of comma separated hex colours.
Order should be as follows: `<background>,<text>,<accent>,<accentText>,<border>`.
Colours can be full or half length hex codes (e.g. `FFFFFF`, or `FFF`). A colour scheme can be incomplete but still valid by skipping a value similar to CSV (e.g. `000000,,F6F6F6,FFFFFF,FFF700`)

**Example:** `3889FF,000,F6F6F6,FFFFFF,FFF700`

**Design Considerations:** These colours can be used wherever a profile context is used (e.g. more than just the name), but separate colour schemes should never be used together on the same page. The scheme can also be extended to site-wide themability based on the primary name of the connected wallet. Selected accent and text colours should maintain a 4.5:1 contrast ratio against the selected background colour. Contrast ratio should be validated on record submission, as well as retrieval. If on retrieval colours do not meet the required contrast ratio, they should not be used. If the context requires that colours from a specific theme be used (e.g. an app theme), you can use the closest match to a colour in the theme.

**Other Notes:** If allowing a user to select a theme that is specific to one vendor (e.g. `com.example`), you should use a vendor specific version of this record e.g. `com.example.theme`

#### `avatar`

**Description:** An avatar image

**Format:** See [ENSIP-12: Avatar Text Records](ensip-12-avatar-text-records.md)

**Example:** See [ENSIP-12: Avatar Text Records](ensip-12-avatar-text-records.md)

**Design Considerations:** This should be displayed next to the ENS name wherever possible. The image should be displayed with an aspect ratio of 1:1. If the source doesn't match the target ratio, the image should be cropped from the centre to fill the ratio. The image should not have any visible blank space.

#### `header`

**Description:** A header image

**Format:** See [ENSIP-12: Avatar Text Records](ensip-12-avatar-text-records.md)

**Example:** See [ENSIP-12: Avatar Text Records](ensip-12-avatar-text-records.md)

**Design Considerations:** This should be displayed above all other profile content, or not at all. The image should be displayed with an aspect ratio of between 3:1 and 6:1. If the source doesn't match the target ratio, the image should be cropped from the centre to fill the ratio. The image should not have any visible blank space.

#### `email`

**Description:** An email that can be used as contact

**Format:** Standard email address

**Example:** `test@example.com`

**Design Considerations:** None.

#### `description`

**Description:** A biography

**Format:** Any string not exceeding 160 characters in length.

**Example:** `Human readable names for Ethereum.`

**Design Considerations:** None.

#### `location`

**Description:** A location

**Format:** Any location, if location is layered should use `, ` for separation (e.g. `Melbourne, Australia`)

**Example:** `Melbourne, Australia`

**Design Considerations:** This shouldn't be resolved to real coordinates, as it can be a non-existent location.

#### `url`

**Description:** A website URL

**Format:** Any valid HTTP or HTTPS link.

**Example:** `https://ens.domains`

**Design Considerations:** This link should be clickable, and wherever possible shown at the bottom of the profile.

#### `timezone`

**Description:** A timezone

**Format:** Any timezone name from the [tz database](https://www.iana.org/time-zones). Follows `<area>/<location>[/<quantifier>]`

**Example:** `Australia/Melbourne`

**Design Considerations:** None.

#### `language`

**Description:** A language

**Format:** A two letter language code from [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes).

**Example:** `en`

**Design Considerations:** None.

#### Global Keys

Profile Keys are a subset of Global Keys, therefore these global keys extend the existing global keys defined in ENSIP-5.

- `name`
- `theme`
- `header`
- `timezone`
- `language`

#### Profile Service Keys

A profile service key is a service key at the base of the namespace's hierarchy.

When creating a profile service key record, the value should be **void of all service-specific formatting** such as prefixes like `/u/` or `@`.

### Backwards Compatibility

Not applicable

### Security Considerations

None.

### Copyright

Copyright and related rights waived via [CC0](https://creativecommons.org/publicdomain/zero/1.0/).
