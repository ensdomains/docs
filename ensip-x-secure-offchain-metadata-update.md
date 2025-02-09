---
description: >-
  A protocol for secure, standardized off-chain ENS metadata updates with explicit user consent and detailed modification proposals.
---

# ENSIP-X: Secure Off-chain Metadata Update (SOMU)

| **Author**    | JustHadi.eth \<hadi@justalab.co>, JustGhadi.eth \<ghadi@justalab.co>  |
| ------------- | ----------------------------------------------------------------- |
| **Status**    | Draft                                                             |
| **Submitted** | 2024-02-14                                                        |


## Abstract

This ENS Improvement Proposal (ENSIP) details a secure protocol for the update of metadata linked with Ethereum Name Service (ENS) names, maintained in Off-chain decentralized storage/databases . The proposal aims to establish a standardized message format for updating  metadata, enhancing security and user awareness during the update process.
It focuses on ensuring that users are fully informed of the changes being proposed to their metadata, ultimately aiming to safeguard against unauthorized modifications that could, for instance, redirect a user's ENS name to a malicious address without their knowledge. Such unauthorized changes could mislead people into sending funds or sensitive information to unintended destinations, highlighting the critical need for enhanced security measures in the management of off-chain metadata.

## Motivation

With the rising adoption of Ethereum and related technologies like the Ethereum Name Service (ENS), there's a growing need for standardized protocols that ensure secure interactions between users and Off-chain data. The Sign-In With Ethereum (SIWE) protocol has been instrumental in facilitating Off-chain authentication across the Ethereum ecosystem. The objective of this proposal is to standardize the process of modifying Off-chain metadata, enhancing user understanding and control while maintaining robust security protocols.

Although the Sign-In With Ethereum protocol has paved the way for secure interactions involving Off-chain data, its current design overlooks a critical aspect of data authenticity; SIWE verifies the legitimacy of the signer and ensures the validity period of the signature has not lapsed. However, it does not validate the information being updated, which becomes a serious concern when it comes to modifying off-chain metadata. This means that a post request sent to a backend may differ significantly from the user's expectations and yet, under the existing SIWE framework, still be deemed as valid due to its valid signature. Given the rising importance of off-chain ENS technologies, it is crucial to establish a new specification that extends the security and usability principles of SIWE to this critical component of ENS metadata modification.

By adopting a SIWE-like message and signature mechanism, users can explicitly consent to specific changes in their metadata, thus fortifying the process against malicious attempts and hacks. Unlike the current SIWE signature that can be used for multiple operations, the proposed signature serves as a one-time validation for each update, thereby preventing any potential misuse. Sensitive data such as addresses embedded in metadata are of critical importance since they are often used by clients to determine the destination of fund transfers. Therefore, a one-time-use signature provides a safer solution, as it ensures that any alteration to this sensitive information matches exactly with the user's intent, reducing risks associated with unauthorized changes.

## Specification

### Message Format:

The standardized message for off-chain metadata updates will adopt a format that clearly specifies the changes being proposed. The message will include the ENS name, the current metadata, the proposed metadata changes, a nonce for replay protection, and a timestamp to ensure timeliness.

#### ABNF Message Format

A SOMU Message MUST conform with the following Augmented Backus–Naur Form (ABNF, RFC 5234) expression (note that `%s` denotes case sensitivity for a string term, as per RFC 7405).

```abnf
ensip-x-message =
    scheme "://" domain " requests an update for ENS Name: " ens LF
    LF
    "Proposed Metadata Changes:" LF 
    mod-changes
    LF
    "Final Metadata After Modification:" LF
    final-metadata 
    LF
    "URI: " uri LF
    "Version: " version LF
    "Chain ID: " chain-id LF
    "Nonce: " nonce LF
    "Issued At: " issued-at LF
    [ "Expiration Time: " expiration-time LF ]
    [ "Not Before: " not-before LF ]
    [ "Request ID: " request-id LF ]
    [ "Resources:" LF resources ]

scheme                  = ALPHA *( ALPHA / DIGIT / "+" / "-" / "." )
domain                  = authority
ens                     = 1*( ALPHA / DIGIT / "-" / "." )
mod-changes             = *( modification LF )
modification            = "- " mod-type 1*SPACE mod-value
mod-type                = *( ALPHA / DIGIT / "-" )
mod-value               = *( VCHAR / WSP )
final-metadata          = *( final-change LF )
final-change            = "- " change-field ":" LF [ final-value ]
change-field            = *( ALPHA / DIGIT / "-" )
final-value             = *( *( VCHAR / WSP ) LF )
uri                     = URI
version                 = "1"
chain-id                = 1*DIGIT
nonce                   = 8*( ALPHA / DIGIT )
issued-at               = date-time
expiration-time         = date-time
not-before              = date-time
request-id              = *pchar
resources               = *( LF resource )
resource                = "- " URI
```

#### Message Fields:

**SOMU Proposed Additional Fields:**

- `ens` REQUIRED. The Ethereum Name Service (ENS) domain that is subject to the proposed changes. This includes the full ENS name including any subdomains.

- `proposed-metadata` REQUIRED. Detailed metadata changes proposed by the requestor. This includes specific modifications, additions, and deletions across different metadata categories like Multi-Chain Addresses, Text Records, and Content Hashes.

- `final-metadata` REQUIRED. The expected state of the ENS Name metadata after the proposed changes have been applied. This provides a clear understanding of the desired outcome.

***SIWE fields: (Reference:*** https://eips.ethereum.org/EIPS/eip-4361)

- `scheme` OPTIONAL. The URI scheme of the origin of the request. Its value MUST be an RFC 3986 URI scheme.*

- `domain` REQUIRED. The domain that is requesting the signing. Its value MUST be an RFC 3986 authority. The authority includes an OPTIONAL port. If the port is not specified, the default port for the provided `scheme` is assumed (e.g., 443 for HTTPS). If `scheme` is not specified, HTTPS is assumed by default.*

- `address` REQUIRED. The Ethereum address performing the signing. Its value SHOULD be conformant to mixed-case checksum address encoding specified in [ERC-55](https://eips.ethereum.org/EIPS/eip-55) where applicable.*

- `statement` OPTIONAL. A human-readable ASCII assertion that the user will sign which MUST NOT include `'\n'` (the byte `0x0a`).*

- `uri` REQUIRED. An RFC 3986 URI referring to the resource that is the subject of the signing (as in the subject of a claim).*

- `version` REQUIRED. The current version of the SIWE Message, which MUST be `1` for this specification.*

- `chain-id` REQUIRED. The [EIP-155](https://eips.ethereum.org/EIPS/eip-155) Chain ID to which the session is bound, and the network where Contract Accounts MUST be resolved.*

- `nonce` REQUIRED. A random string typically chosen by the relying party and used to prevent replay attacks, at least 8 alphanumeric characters.*

- `issued-at` REQUIRED. The time when the message was generated, typically the current time. Its value MUST be an ISO 8601 datetime string.*

- `expiration-time` OPTIONAL. The time when the signed authentication message is no longer valid. Its value MUST be an ISO 8601 datetime string.*

- `not-before` OPTIONAL. The time when the signed authentication message will become valid. Its value MUST be an ISO 8601 datetime string.*

- `request-id` OPTIONAL. A system-specific identifier that MAY be used to uniquely refer to the sign-in request.*

- `resources` OPTIONAL. A list of information or references to information the user wishes to have resolved as part of authentication by the relying party. Every resource MUST be an RFC 3986 URI separated by `"\n- "` where `\n` is the byte `0x0a`.*

#### Informal Message Template for ENSIP-X: Secure Off-chain Metadata Update

Here's an informal Bash-like template of the full message for updating off-chain metadata associated with an ENS name. This template enhances readability and understanding, offering a simplified yet comprehensive look at how to structure an update proposal according to the ENSIP-X specifications.

```
${scheme}:// ${domain} requests an update for ENS Name: 
${ens} with your account ${address}

Proposed Metadata Changes:
- Multi-Chain Addresses Modification:
    - CoinType ${mod-cointype[0]}:
        - Proposed Value: ${mod-cointype-value[0]}
        - Change Type: ${mod-cointype-change-type[0]}
    ...
    - CoinType ${mod-cointype[n]}:
        - Proposed Value: ${mod-cointype-value[n]}
        - Change Type: ${mod-cointype-change-type[n]}
- Text Record Modification:
    - Key: ${mod-key[0]}:
        - Proposed Value: ${mod-key-value[0]}
        - Change Type: ${mod-key-change-type[0]}
    ...
    - Key: ${mod-key[n]}:
        - Proposed Value: ${mod-key-value[n]}
        - Change Type: ${mod-key-change-type[n]}
    ...
- Content Hash Modification:
    - Proposed Value: ${mod-content-hash-value}
    - Change Type: Modification

Final Metadata After Modification:
- Multi-Chain Addresses:
    - ${final-cointype[0]}:
        - New Value: ${final-cointype-value[0]}
    ...
    - ${final-cointype[n]}:
        - New Value: ${final-cointype-value[n]}
- Text Records:
    - Key: ${final-text[0]}
        - New Value: ${final-text-value[0]}
    ...
    - Key: ${final-text[n]}
        - New Value: ${final-text-value[n]}
- Content Hash:
	- Current Value: ${final-content-hash-value}

URI: ${uri}
Version: ${version}
Chain ID: ${chain-id}
Nonce: ${nonce}
Issued At: ${issued-at}
Expiration Time: ${expiration-time}
Not Before: ${not-before}
Request ID: ${request-id}

Resources:
- ${resources[0]}
    ...
- ${resources[n]}

```

#### Metadata Update Request Message Example:

```
example.com requests an update for ENS Name:
test.example.eth by your account 0x23d3957BE879aBa6ca925Ee4F072d1A8C4E8c890

Proposed Metadata Changes:
- Multi-Chain Addresses Modification:
	- CoinType 0:
		- Proposed Value: 1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa
		- Change Type: Addition
- Text Record Modification:
	- Key: com.twitter
	  - Proposed Value: @newexample
	  - Change Type: Modification
	- Key: url
	  - Change Type: Deletion
	- Key: com.github
	  - Proposed Value: @exampledev
	  - Change Type: Addition
- Content Hash Modification:
	- Proposed Value: ipfs://QmRAQB6YaCyidP37UdDnjFY5vQuiBrcqdyoW1CuDgwxkD4
	- Change Type: Addition

Final Metadata After Modification:
- Multi-Chain Addresses:
	- CoinType 60:
		- New Value: 0x23d3957BE879aBa6ca925Ee4F072d1A8C4E8c890
	- CoinType 0:
		- New Value: 1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa
- Text Records:
	- Key: com.twitter
	  - New Value: @newexample
	- Key: url
	  - New Value:	
	- Key: com.github
	  - New Value: @exampledev
- Content Hash:
	- New Value: ipfs://QmRAQB6YaCyidP37UdDnjFY5vQuiBrcqdyoW1CuDgwxkD4

URI: https://example.com/update-metadata
Version: 1
Chain ID: 1
Nonce: 12345678
Issued At: 2021-10-01T10:00:00Z
Expiration Time: 2021-10-01T12:00:00Z
Not Before: 2021-10-01T10:15:00Z
Request ID: xyz123
Resources:
- https://example.com/terms
- https://example.com/privacy
```

## Explanation of the Final Metadata View

The Final Metadata after modification is designed to provide a clear representation of the new state of an ENS name's off-chain metadata following the proposed updates. It consists of several components:

- **Multi-Chain Addresses**: This section reflects the updated set of blockchain addresses linked to the ENS name. The example indicates maintenance of the existing Ethereum address (`CoinType 60`) and the addition of a Bitcoin address (`CoinType 0`), showcasing the protocol’s flexibility in accommodating multi-chain environments.
- **Text Records**: The modifications in text records illustrate three types of changes. The Twitter handle has been updated (`com.twitter`), demonstrating a modification; the website URL (`url`) has been removed, exemplifying a deletion; and a GitHub profile (`com.github`) has been added, indicating an addition. Together, these changes enhance the ENS name's digital representation across various platforms.
- **Content Hash**: The inclusion of a new Content Hash value represents the addition of a reference to immutable content. This could point to resources, documents, or applications associated with the ENS name in decentralized storage solutions.

### Structuring a POST Request with the Final Metadata

Following the details of the proposed updates, it's important to structure a POST request that matches the "Final Metadata After Modification". This POST request essentially serves as the final step in the communication process, clearly indicating to the server the exact modifications to be made to the off-chain metadata of an ENS name based on the user's approval.

The "Final Metadata After Modification" section in the update message serves as a human-readable format that outlines the desired state of the ENS name's metadata following the updates. This facilitates clear and unambiguous communication between the client (user or user-agent) and the server responsible for managing the ENS metadata. To ensure the POST request accurately reflects the agreed-upon modifications, it must be structured to carry all the details as presented in the "Final Metadata After Modification" section.

To aid in this process and reduce the potential for errors, a library or tool set will be provided. This library will enable easier conversion of the human-readable "Final Metadata After Modification" into a structured POST request body. This tool ensures that the communication between the client and the server is both efficient and accurate by abstracting away the complexity involved in manually crafting the POST request body. It facilitates a standardized approach to updating ENS metadata, enhancing the protocol's usability, and further bolstering the security measures aimed at protecting against unauthorized metadata modifications.

### Example POST Request Structure

Using the library or tools provided, the following JSON format serves as an example of how to structure a POST request that accurately communicates the final state of an ENS name's off-chain metadata:

```json
{
  "ens": "text.example.eth",
  "chainId": "1",
  "addresses": [
    {
      "coinType": 60,
      "address": "0x23d3957BE879aBa6ca925Ee4F072d1A8C4E8c890"
    },
    {
      "coinType": 0,
      "address": "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"
    }
  ],
  "text": [
    {
      "key": "com.twitter",
      "value": "@newexample"
    },
    {
      "key": "com.github",
      "value": "@exampledev"
    }
  ],
  "contentHash": "ipfs://QmRAQB6YaCyidP37UdDnjFY5vQuiBrcqdyoW1CuDgwxkD4",
}
```

This JSON structure, validated by the provided library, ensures that the POST request accurately represents the user’s confirmation of the metadata changes as depicted in the "Final Metadata After Modification". Thus, the server processing this request can unambiguously apply the modifications, ensuring the integrity and accuracy of the ENS name's off-chain metadata.

### Library Example

First, a payload object encompassing all necessary data for the metadata update request is constructed. This includes identifiers (such as the Ethereum address and ENS name), current and new metadata states, and essential SIWE fields:

```jsx
const payload = {
    address, // Ethereum address performing the update
    currentMetadata, // Current state of the ENS metadata
    newMetadata, // Desired state of the ENS metadata
    ens, // ENS name being updated
    scheme, // URI scheme, typically "https"
    domain, // Domain requesting the signature
    uri, // Reference URI for the metadata update
    version, // Protocol version
    chainId, // EIP-155 Chain ID
    issuedAt, // ISO 8601 datetime string when the message was generated
    expirationTime, // ISO 8601 datetime string when the request expires
};
```

#### Frontend

Once the payload is ready, it is used as a parameter and passed to a function named `generateMetadataUpdateRequest`, which constructs the update request's message alongside a new payload formatted according to the proposal’s requirements. This function also includes the Ethereum address associated with the update:

```jsx
const { message, newPayload, address } = generateMetadataUpdateRequest(
    payload,
);
```

The `message` generated needs to be signed by the user to authenticate the request. This can be achieved using a function such as `signMessageAsync`, which triggers a wallet interface that allows the user to review and sign the message:

```jsx
const signature = await signMessageAsync({
    message: message,
});
```

With the signature obtained, a final request object is constructed including the new payload, the user’s signature, the initial signed message, and the address. The `updateMetadataRequest` function captures all requisite elements, readying the request for submission to the backend or off-chain storage solution handling ENS metadata updates:

```jsx
const request = updateMetadataRequest({
    newPayload, // The payload prepared according to the protocol
    signature, // User's signature authenticating the request
    message, // The signed message containing the request details
    address, // Ethereum address of the user
});
```

This implementation sketch provides a clear pathway for developers intending to integrate secure, off-chain ENS metadata updates into their applications. By adhering to this scheme, developers ensure that metadata updates are carried out in a consistent, secure manner that aligns with the user's expectations and consents.

It's important to note that while this example outlines the basic flow, further customization and integration work is required to fully align with specific application architectures and user interaction models. Additionally, developers are encouraged to implement appropriate error handling and feedback mechanisms to enhance the user experience

#### Backend

To ensure the integrity and security of off-chain ENS metadata updates, the backend component plays a crucial role. It is responsible for validating the signature and verifying that the proposed metadata changes accurately reflect those outlined in the "Final Metadata After Modification" section of the update message. This ensures that the request has not been altered and that the changes are authentically signed by the user's Ethereum address. Below is a high-level approach to designing such backend functionality.

#### Verifying Signature and Authenticating Payload Changes:

The backend's primary task is to authenticate the signature attached to the update request. This verification process ensures that the signature was indeed generated by the known Ethereum address associated with the metadata change request. Additionally, it must confirm that the specifications in the new payload strictly match the described changes in the "Final Metadata After Modification" part of the message, thereby guaranteeing that the request payload has not been tampered with.

To achieve this, a backend function named `verifySignature` could be implemented:

```jsx
try {
    const isValidSignature = verifySignature({
        newPayload,
        signature,
        message,
        address,
    });

    // Proceed with the update process upon successful verification
} catch (error) {
    console.error("Failed to validate signature or payload integrity", error);
    // Handle the error scenario, potentially rejecting the update request
}

```

Upon validation failure, the function throws an error, indicating either an issue with the signature verification or a mismatch between the proposed changes and the update message. Handling this error appropriately ensures that only valid, authenticated requests proceed, thereby maintaining the integrity of the off-chain metadata update process.

This backend validation mechanism is a critical safeguard, ensuring that each update not only comes directly from the rightful owner of the wallet holding the ENS name ([EIP-4361](https://eips.ethereum.org/EIPS/eip-4361)) but also that the proposed changes are accurately represented and have not been altered during the submission process. Implementing such checks is essential for maintaining the security and trustworthiness of off-chain ENS metadata updates.

## Rationale

### Design Goals

1. Human-Friendly
2. Simple to Implement
3. Secure
4. Machine Readable

### Out Of Scope

This proposal’s primary goal is to establish a secure way for the user to modify his off-chain metadata, and isn’t targeting anything other than ENS off-chain storages implementations.

## Security Considerations

The core purpose of this ENSIP is to enhance security and promote a safer way for users to authenticate their names’ metadata changes in off-chain environments.

## **Open Items**

None

## **Copyright**

Copyright and related rights waived via [CC0](https://creativecommons.org/publicdomain/zero/1.0/).
