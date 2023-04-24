# ENSIP-15: ENS Name Normalization Standard

| **Author**  | Andrew Raffensperger \<raffy@me.com> |
| ----------- | ------------------------------------ |
| **Status**  | Draft                                |
| **Created** | 2023-04-03                           |

## Abstract

This ENSIP standardizes Ethereum Name Service (ENS) name normalization process outlined in [ENSIP-1 § Name Syntax](./ensip-1-ens#name-syntax).

## Motivation

* Since [ENSIP-1](./ensip-1-ens) (originally [EIP-137](https://eips.ethereum.org/EIPS/eip-137)) was finalized in 2016, Unicode has [evolved](https://unicode.org/history/publicationdates.html) from version 8.0.0 to 15.0.0 and incorporated many new characters, including complex emoji sequences. 
* ENSIP-1 does not state the version of Unicode.
* ENSIP-1 implies but does not state an explicit flavor of IDNA processing. 
* [UTS-46](https://unicode.org/reports/tr46/) is insufficient to normalize emoji sequences. Correct emoji processing is only possible with [UTS-51](https://www.unicode.org/reports/tr51/).
* Validation tests are needed to ensure implementation compliance.
* The success of ENS has encouraged spoofing via the following techniques:
	1. Insertion of zero-width characters.
	1. Using names which normalize differently between algorithms. 
	1. Using names which appear differently between applications and devices.
	1. Substitution of confusable (look-alike) characters.
	1. Mixing incompatible scripts.

## Specification

### Versioning
* Unicode version `15.0.0`
* [spec.json](./ensip-15/spec.json) contains all necessary data for normalization.
* [nf.json](./ensip-15/nf.json) contains all necessary data for [Unicode Normalization Forms](https://unicode.org/reports/tr15/) NFC and NFD.

### Algorithm

* Normalization is the process of canonicalizing a name before for hashing.
* It is idempotent: applying normalization multiple times produces the same result.
* For user convenience, leading and trailing whitespace should be trimmed before normalization, as all whitespace codepoints are disallowed.  Inner characters should remain unmodified.
* No string transformations (like case-folding) should be applied.

1. Split the name into [labels](./ensip-1-ens#name-syntax).
1. [Normalize](#normalize) each label.
1. Join the labels together into a name again. 
1. The result is normalized and ready for [hashing](./ensip-1-ens#namehash-algorithm).

### Normalize

1. [Tokenize](#tokenize) — transform the label into **Text** and **Emoji** tokens.
	* If there are no tokens, the label cannot be normalized.
1. Apply NFC to each **Text** token.
1. Strip `FE0F` from each **Emoji** token.
1. [Validate](#validate) — check if the tokens are valid and obtain the **Label Type**.
	* The **Label Type** and **Restricted** state may be presented to user for additional security.
1. Concatenate the tokens together.
	* Return the normalized label.

### Tokenize

Given a string, convert to codepoints, and produce a list of **Text** and **Emoji** tokens, each with a payload of codepoints.

1. Allocate an empty codepoint buffer.
1. Find the longest emoji sequence that matches the remaining input.
	* `FE0F` is optional from the input during matching.
	* Example: `Emoji[A FE0F B]` matches `[A FE0F B]` and `[A B]` but not `[A FE0F FE0F B]`
1. If an emoji sequence is found:
	* If the buffer is nonempty, emit a **Text** token, and clear the buffer.
	* Emit an **Emoji** token with the fully-qualified matching sequence.
	* Remove the matched sequence from the input.
1. Otherwise:
	1. Remove the leading codepoint from the input.
	1. Determine the codepoint type:
		* If **valid**, append the codepoint to the buffer.
			* This set can be precomputed from the union of characters in all groups and their NFD decompositions.
		* If **mapped**, append the corresponding mapped codepoint(s) to the buffer.
		* If **ignored**, do nothing.
		* Otherwise, the label cannot be normalized.
1. Repeat until all the input is consumed.
1. If the buffer is nonempty, emit a final **Text** token.

### Validate

Given a list of **Emoji** and **Text** tokens, determine if the composition is valid and return the **Label Type**.

1. If only **Emoji** tokens:
	* Return `"Emoji"`
1. If a single **Text** token and every characters is ASCII (`00..7F`):
	* `5F (_) LOW LINE` can only occur at the start.
		* Must match `/^_*[^_]*$/`
	* The 3rd and 4th characters must not both be `2D (-) HYPHEN-MINUS`.
		* Must not match `/^..--/`
	* Return `"ASCII"`
		* The label is free of **Fenced** and **Combining Mark** characters, and not confusable.
1. Concatenate all the tokens together.
	* `5F (_) LOW LINE` can only occur at the start.
		* Must match `/^_*[^_]$/u`
	* The first and last characters cannot be **Fenced**.
	* **Fenced** characters cannot be contiguous.
1. The first character of every **Text** token must not be a **Combining Mark**.
1. Concatenate the **Text** tokens together.
1. Find the first **Group** that contain every text character:
	* If no group is found, the label cannot be normalized.
1. If the group is not **CM Whitelisted**:
	* Apply NFD to the concatenated text characters.
	* For every contiguous sequence of **NSM** characters:
		* Each character must be unique.
		* Number of characters cannot exceed **Maximum NSM** (4).
1. [Wholes](#wholes) — check if text characters form a confusable.
1. The label is valid.
	* Return the name of the group.

### Wholes

A label is whole-script confusable if a similarly-looking valid label can be constructed using one alternative character from a different group.

1. Allocate an empty character buffer.
1. Start with the set of all groups.
1. For each unique character:
	* If the character is **Confused** (a member of a **Whole Confusable**):
		* Retain groups with **Whole Confusable** characters excluding the **Confusable Extent** of the matching **Confused** character.
			* The **Confusable Extent** is the fully-connected graph formed from different groups with the same confusable and different confusables of the same group.
			* This mapping from **Confused** to **Confusable Extent** can be precomputed.
			* Example: `"o"` **Whole Confusable** 
				1. `6F (o) LATIN SMALL LETTER O` → *Latin*, *Han*, *Japanese*, and *Korean*
				1. `3007 (〇) IDEOGRAPHIC NUMBER ZERO` → *Han*, *Japanese*, *Korean*, and *Bopomofo*
				1. **Confusable Extent** is [`6F`, `3007`] ⊗ [*Latin*, *Han*, *Japanese*, *Korean*, *Bopomofo*]
		* If no groups remain, the label is not confusable.
		* Example: `"тӕ" [442 4D5]`
			1. `"т"` → `442 (т) CYRILLIC SMALL LETTER TE` and `3C4 (τ) GREEK SMALL LETTER TAU`
				* **ALL** ∩ [*Cyrillic*, *Greek*] → [*Cyrillic*, *Greek*]
			1. `"ӕ"` → `E6 (æ) LATIN SMALL LETTER AE` and `4D5 (ӕ) CYRILLIC SMALL LIGATURE A IE`
				* [*Cyrillic*, *Greek*] ∩ [*Latin*, *Cyrillic*] → [*Cyrillic*]
	* If the character is **Unique**, the label is not confusable.
		* This set can be precomputed from characters that appear in exactly one group and are not **Confused**.
	* Otherwise:
		* Append the character to the buffer.
1. If any **Confused** characters were found:
	* Assert none of the remaining groups contain any buffered characters.
1. The label is not confusable.

## Description of `spec.json`

* [**Groups**](./ensip-15/groups.md) (`"groups"`) — groups of characters that can constitute a label
	* `"name"` — ASCII name of the group (or abbreviation if **Restricted**)
		* Example: *Latin*, *Japanese*, *Egyp*
	* **Restricted** (`"restricted"`) — **`true`** if [Excluded](https://www.unicode.org/reports/tr31#Table_Candidate_Characters_for_Exclusion_from_Identifiers) or [Limited-Use](https://www.unicode.org/reports/tr31/#Table_Limited_Use_Scripts) script
		* Example: *Latin* → **`false`**, *Egyp* → **`true`** 
	* `"primary"` — subset of characters that define the group
		* Example: `"a"` → *Latin*, `"あ"` → *Japanese*, `"𓀀"` → *Egyp*
	* `"secondary"` — subset of characters included with the group
		* Example: `"0"` → *Common* but mixable with *Latin*
	* **CM Whitelisted** (`"cm"`) — (optional) set of allowed compound sequences in NFC
		* Example: `[[BaseCP, CM, ...], ...]`
		* There are currently no compound sequences: **`true`** if `[]` otherwise **`false`**.
* **Ignored** (`"ignored"`) — characters that are ignored during normalization
	* Example: `34F (�) COMBINING GRAPHEME JOINER`
* **Mapped** (`"mapped"`) — characters that are mapped to a sequence of **valid** characters
	* Example: `41 (A) LATIN CAPITAL LETTER A` → `[61 (a) LATIN SMALL LETTER A]`
	* Example: `2165 (Ⅵ) ROMAN NUMERAL SIX` → `[76 (v) LATIN SMALL LETTER V, 69 (i) LATIN SMALL LETTER I]`
* **Whole Confusable** (`"wholes"`) — groups of characters that look similar
	* `"valid"` — subset of confusable characters that are allowed
		* Example: `34 (4) DIGIT FOUR`
	* **Confused** (`"confused"`) — subset of confusable characters that confuse
		* Example: `13CE (Ꮞ) CHEROKEE LETTER SE`
* **Fenced** (`"fenced"`) — set of characters that cannot be first, last, or contiguous
	* Example: `2044 (⁄) FRACTION SLASH`
* [**Emoji**](./ensip-15/emoji.md) (`"emoji"`) — allowed emoji sequences
	* Example: `[1F468 200D 1F4BB] (👨‍💻) man technologist`
* **Combining Marks / CM** (`"cm"`) — characters that are [Combining Marks](https://www.unicode.org/Public/15.0.0/ucd/extracted/DerivedGeneralCategory)
* **Non-spacing Marks / NSM** (`"nsm"`) — valid subset of **CM** with general category (`"Mn"` or `"Me"`)
* **Maximum NSM** (`"nsm_max"`) — maximum sequence length of unique **NSM**
* **Should Escape** (`"escape"`) — characters that shouldn't be printed
* **NFC Check** (`"nfc_check"`) — valid characters that [may require NFC](https://unicode.org/reports/tr15/#NFC_QC_Optimization)

## Derivation

* [IDNA 2003](https://unicode.org/Public/idna/15.0.0/IdnaMappingTable.txt)
 	* `UseSTD3ASCIIRules` is **`true`**
	* `VerifyDnsLength` is **`false`**
	* `Transitional_Processing` is **`false`**
	* The following deviations are **valid**:
		* `DF (ß) LATIN SMALL LETTER SHARP S`
		* `3C2 (ς) GREEK SMALL LETTER FINAL SIGMA`
	* `CheckHyphens` is **`false`** ([WhatWG URL Spec § 3.3](https://url.spec.whatwg.org/#idna))
	* `CheckBidi` is **`false`**
	* [ContextJ](https://datatracker.ietf.org/doc/html/rfc5892#appendix-A.1):
		* `200C (�) ZERO WIDTH NON-JOINER` (ZWNJ) is **disallowed everywhere**.
		* `200D (�) ZERO WIDTH JOINER` (ZWJ) is **only allowed** in emoji sequences.	
	* [ContextO](https://datatracker.ietf.org/doc/html/rfc5892#appendix-A.3): 
		* `B7 (·) MIDDLE DOT` is **disallowed**.
		* `375 (͵) GREEK LOWER NUMERAL SIGN` is **disallowed**.
		* `5F3 (׳) HEBREW PUNCTUATION GERESH` and `5F4 (״) HEBREW PUNCTUATION GERSHAYIM` are *Greek*.
		* `30FB (・) KATAKANA MIDDLE DOT` is **Fenced** and *Han*, *Japanese*, *Korean*, and *Bopomofo*. 
		* Some [Extended Arabic Numerals](https://en.wikipedia.org/wiki/Arabic_numerals) are **mapped**:
			* `6F0 (۰)` → `660 (٠) ARABIC-INDIC DIGIT ZERO`
			* `6F1 (۱)` → `661 (١) ARABIC-INDIC DIGIT ONE`
			* `6F2 (۲)` → `662 (٢) ARABIC-INDIC DIGIT TWO`
			* `6F3 (۳)` → `663 (٣) ARABIC-INDIC DIGIT THREE`
			* `6F7 (۷)` → `667 (٧) ARABIC-INDIC DIGIT SEVEN`
			* `6F8 (۸)` → `668 (٨) ARABIC-INDIC DIGIT EIGHT`
			* `6F9 (۹)` → `669 (٩) ARABIC-INDIC DIGIT NINE`
* [Punycode](https://datatracker.ietf.org/doc/html/rfc3492) is not decoded.
* The following ASCII characters are **valid**:
	* `24 ($) DOLLAR SIGN`
	* `5F (_) LOW LINE`
* Only label separator is `2E (.) FULL STOP`
	* No character maps to this character.
	* This simplifies unnormalized name detection in unstructured text.
	* The following alternatives are **disallowed**:
		* `3002 (。) IDEOGRAPHIC FULL STOP`
		* `FF0E (．) FULLWIDTH FULL STOP`
		* `FF61 (｡) HALFWIDTH IDEOGRAPHIC FULL STOP`
* [Many characters](./ensip-15/disallowed.md) are **disallowed** for various reasons:
	* Nearly all punctuation are **disallowed**.
	* All parentheses and brackets are **disallowed**.
	* Nearly all vocalization annotations are **disallowed**.
	* Obsolete, deprecated, and ancient characters are **disallowed**.
		* Example: `463 (ѣ) CYRILLIC SMALL LETTER YAT`
	* Combining, modifying, reversed, flipped, turned, and partial variations are **disallowed**.
		* Example: `218A (↊) TURNED DIGIT TWO`
	* When multiple weights of the same character exist, the variant closest to "heavy" is selected and the rest **disallowed**.
		* Example: `🞡🞢🞣🞤✚🞥🞦🞧` → `271A (✚) HEAVY GREEK CROSS`
		* This occasionally selects emoji.
	* Many visually confusable characters are **disallowed**.
		* Example: `131 (ı) LATIN SMALL LETTER DOTLESS I`
	* Many ligatures, *n*-graphs, and *n*-grams are **disallowed.**
		* Example: `A74F (ꝏ) LATIN SMALL LETTER OO`
	* Many esoteric characters are **disallowed**.
		* Example: `2376 (⍶) APL FUNCTIONAL SYMBOL ALPHA UNDERBAR`
* Many hyphen-like characters are **mapped** to `2D (-) HYPHEN-MINUS`:
	* `2010 (‐) HYPHEN`
	* `2011 (‑) NON-BREAKING HYPHEN`
	* `2012 (‒) FIGURE DASH`
	* `2013 (–) EN DASH`
	* `2014 (—) EM DASH`
	* `2015 (―) HORIZONTAL BAR`
	* `2043 (⁃) HYPHEN BULLET`
	* `2212 (−) MINUS SIGN`
	* `23AF (⎯) HORIZONTAL LINE EXTENSION`
	* `23E4 (⏤) STRAIGHTNESS`
	* `FE58 (﹘) SMALL EM DASH`
	* `2E3A (⸺) TWO-EM DASH` → `"--"`
	* `2E3B (⸻) THREE-EM DASH` → `"---"`
* Characters are assigned to **Groups** according to [Unicode Script_Extensions](https://www.unicode.org/reports/tr24/#Script_Extensions_Def).
* **Groups** may contain [multiple scripts](./ensip-15/groups.md):
	* Only *Latin*, *Greek*, *Cyrillic*, *Han*, *Japanese*, and *Korean* have access to *Common* characters.
	* *Latin*, *Greek*, *Cyrillic*, *Han*, *Japanese*, *Korean*, and *Bopomofo* only permit specific **Combining Mark** sequences.
	* *Han*, *Japanese*, and *Korean*  have access to `a-z`.
	* **Restricted** groups are always single-script.
* **Groups** with multiple scripts are inspired from [Unicode augmented script sets](https://www.unicode.org/reports/tr39/#Mixed_Script_Detection).
* *Braille*, *Linear A*, *Linear B*, and *Signwriting* scripts are **disallowed**.
* `27 (') APOSTROPHE` is **mapped** to `2019 (’) RIGHT SINGLE QUOTATION MARK` for convenience.
* Ethereum symbol (`39E (Ξ) GREEK CAPITAL LETTER XI`) is case-folded and *Common*.
* [Emoji sequences:](./ensip-15/emoji.md)
	* All sequences are [fully-qualified](https://www.unicode.org/reports/tr51/#def_fully_qualified_emoji).
	* Digits (`0-9`) are not emoji.
	* Emoji mapped to non-emoji by IDNA cannot be used as emoji.
	* Emoji disallowed by IDNA and have default text-presentation are **disabled**:
		* `203C (‼️) double exclamation mark`
		* `2049 (⁉️) exclamation question mark `
	* Remaining `Emoji` characters are marked as **disallowed** (for text processing).
	* All `RGI_Emoji_ZWJ_Sequence` are **enabled**.
	* All `Emoji_Keycap_Sequence` are **enabled**.
	* All `RGI_Emoji_Tag_Sequence` are **enabled**.
	* All `RGI_Emoji_Modifier_Sequence` are **enabled**.
	* All `RGI_Emoji_Flag_Sequence` are **enabled**.
	* `Basic_Emoji` of the form `[X FE0F]` are **enabled**.
	* `Emoji` with default emoji-presentation are **enabled** as `[X FE0F]`.
	* Remaining single-character `Emoji` are **enabled** as `[X FE0F]` (explicit emoji-styling).
	* All singular Skin-color Modifiers are **disabled**.
	* All singular Regional Indicators are **disabled**.
	* Blacklisted emoji are **disabled**.
	* Whitelisted emoji are **enabled**.
* Confusables:
	* Emoji are not confusable.
	* ASCII confusables are case-folded.
		* Example: `61 (a) LATIN SMALL LETTER A` confuses with `13AA (Ꭺ) CHEROKEE LETTER GO`

## Backwards Compatibility

* 99% of names are still valid.
* Preserves as much IDNA and WhatWG URL compatibility as possible.
* Only valid emoji sequences are allowed.

## Security Considerations

* Unicode presentation may vary between applications and devices.
	* Unicode text is ultimately subject to font-styling and display context.
	* Unsupported characters (`�`) may appear unremarkable.
	* Unsupported emoji sequences with ZWJ may appear indistinguishable from those without ZWJ.
* Names composed of labels with varying bidi properties may appear differently depending on context.
	* Normalization does not enforce single-directional names.
	* Names may be composed of labels of different directions but normalized labels are never bidirectional.
* Not all normalized names are visually unambiguous.
* This ENSIP only addresses **single-character** [confusables](https://www.unicode.org/reports/tr39/).
	* There exist confusable **multi-character** sequences:
		* `"ஶ்ரீ" [BB6 BCD BB0 BC0]`
		* `"ஸ்ரீ" [BB8 BCD BB0 BC0]`
	* There exist confusable **emoji** sequences: 
		* `🚴 [1F6B4]` and `🚴🏻 [1F6B4 1F3FB]`
		* `🇺🇸 [1F1FA 1F1F8]` and `🇺🇲 [1F1FA 1F1F2]` 
		* `♥ [2665] BLACK HEART SUIT` and `❤ [2764] HEAVY BLACK HEART`
		
## Copyright

Copyright and related rights waived via [CC0](https://creativecommons.org/publicdomain/zero/1.0/).

## Appendix: Reference Specifications

* [EIP-137: Ethereum Domain Name Service](https://eips.ethereum.org/EIPS/eip-137)
* [ENSIP-1: ENS](./ensip-1-ens)
* [UAX-15: Normalization Forms](https://unicode.org/reports/tr15/)
* [UAX-24: Script Property](https://www.unicode.org/reports/tr24/)
* [UAX-31: Identifier and Pattern Syntax](https://www.unicode.org/reports/tr31/)
* [UTS-39: Security Mechanisms](https://www.unicode.org/reports/tr39/)
* [UTS-46: IDNA Compatibility Processing](https://unicode.org/reports/tr46/)
* [UTS-51: Emoji](https://www.unicode.org/reports/tr51)
* [RFC-3492: Punycode](https://datatracker.ietf.org/doc/html/rfc3492)
* [RFC-5891: IDNA: Protocol](https://datatracker.ietf.org/doc/html/rfc5891) 
* [RFC-5892: The Unicode Code Points and IDNA](https://datatracker.ietf.org/doc/html/rfc5892)
* [Unicode CLDR](https://github.com/unicode-org/cldr)
* [WHATWG URL: IDNA](https://url.spec.whatwg.org/#idna)

## Appendix: Additional Resources

* [Supported Groups](./ensip-15/groups.md)
* [List of Disallowed Characters](./ensip-15/disallowed.md)
* [Emoji Considerations](./ensip-15/emoji.md)

## Appendix: Validation Tests

A list of [validation tests](./ensip-15/tests.json) are provided with the following interpretation:

* Already Normalized: `{name: "a"}` → `normalize("a")` is `"a"`
* Need Normalization: `{name: "A", norm: "a"}` → `normalize("A")` is `"a"`
* Expect Error: `{name: "@", error: true}` → `normalize("@")` throws

## Annex: Beautification

Follow [algorithm](#algorithm), except:

* Do not strip `FE0F` from **Emoji** tokens.
* Replace `3BE (ξ) GREEK SMALL LETTER XI` with `39E (Ξ) GREEK CAPITAL LETTER XI` if the label isn't *Greek*.
* Example: `normalize("‐Ξ1️⃣") [2010 39E 31 FE0F 20E3]` is `"-ξ1⃣" [2D 3BE 31 20E3]`
* Example: `beautify("-ξ1⃣") [2D 3BE 31 20E3]"` is `"-Ξ1️⃣" [2D 39E 31 FE0F 20E3]`