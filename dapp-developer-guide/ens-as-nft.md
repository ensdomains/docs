# ENS as NFT

Since the .eth registrar migration in 2019, second level .eth names (eg: `alice` in `alice.eth`) are ERC721 (unwrapped) or ERC1155 (wrapped) NFTs, meaning that they can be transferred in the same fashion as other NFTs. Wrapped subdomains are also ERC1155 NFTs. To learn more about wrapped names, see [GitHub](https://github.com/ensdomains/ens-contracts/tree/master/contracts/wrapper).

## Deriving tokenId from ENS name

Depending on the contract you're working with, the process for deriving it's tokenId may be different.

To derive the ERC721 tokenId of a second level .eth name in the [base registrar](https://etherscan.io/address/0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85), use the uint256 representation of the hash of the label (eg: `nick` for `nick.eth`).

```javascript
const ethers = require('ethers') // v5
const { BigNumber, utils } = ethers
const label = 'nick'
const labelHash = utils.keccak256(utils.toUtf8Bytes(label))
const tokenId = BigNumber.from(labelHash).toString()
```

In the example above,[`42219085255511335250589442208301538195142221433306354426240614732612795430543`](https://opensea.io/assets/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/42219085255511335250589442208301538195142221433306354426240614732612795430543) is the tokenId of `nick.eth`

{% hint style="info" %}
All second level .eth names will be in the base registrar, including wrapped names, but their owner may be the NameWrapper contract. In that case, you can use the NameWrapper contract to get info about a name.
{% endhint %}

To derive the ERC1155 tokenId of any wrapped ENS name in the [Name Wrapper](https://etherscan.io/address/0xD4416b13d2b3a9aBae7AcD5D6C2BbDBE25686401), use the uint256 representation of the hash of the entire name (eg: `firstwrappedname.eth`). This distinction is important because subdomains and non-.eth names can also be wrapped.

```javascript
const ethers = require('ethers') // v5
const { BigNumber, utils } = ethers
const name = 'firstwrappedname.eth'
const nameHash = utils.namehash(name)
// 0xc44eec7fb870ae46d4ef4392d33fbbbdc164e7817a86289a1fe30e5f4d98ae85
const tokenId = BigNumber.from(nameHash).toString()
// 88792764648847811246521601599422014651201701211481889599094841418054356217477
```

## Deriving ENS name from tokenId

Unlike deriving tokenId, deriving ENS name from tokenId is not as easy. This is because all ENS names are stored as fixed-length hash to allow registering infinite length of names. The downside of this architecture is that you cannot directly query ENS smart contracts to return ENS name using tokenId.

Our recommended way is to query via [https://thegraph.com](https://thegraph.com) ENS subgraph. The graph decodes the hash to name as it indexes. The example code to query is as follows.

```javascript
const ethers = require('ethers')
const BigNumber = ethers.BigNumber
const gr = require('graphql-request')
const { request, gql } = gr
const tokenId = '79233663829379634837589865448569342784712482819484549289560981379859480642508'
// Should return 0xaf2caa1c2ca1d027f1ac823b529d0a67cd144264b2789fa2ea4d63a67c7103cc
const labelHash = BigNumber.from(tokenId).toHexString()

const url = 'https://api.thegraph.com/subgraphs/name/ensdomains/ens'
const GET_LABEL_NAME = gql`
query{
  domains(first:1, where:{labelhash:"${labelHash}"}){
    labelName
  }
}`

request(url, GET_LABEL_NAME).then((data) => console.log(data))
// { domains: [ { labelName: 'vitalik' } ] }
```

If you prefer not to rely on a third party like TheGraph, the team open-sourced [ens-rainbow](https://github.com/graphprotocol/ens-rainbow) containing a link to the original dataset (6GB with 133 million entities) so that you can host your own ENS name decoding service.

## Turning subdomain into NFT

The [Name Wrapper](https://github.com/ensdomains/ens-contracts/tree/master/contracts/wrapper) (released in March 2023) makes it easier to turn subdomains and other ENS names into NFTs. If you want to create your own NFT wrapper:

1. Create a registrar contract that is ERC721 or ERC1155 compliant
2. Set the ENS registry address (mostly when you deploy the registrar)
3. Create a `register` function which calls `registry.setSubnodeOwner` which mints a token making the subdomain label hash as tokenId

For example, Decentraland created a registrar contract that turns subdomains of dcl.eth into ERC721 tokens.

```
contract DCLRegistrar is ERC721Full, Ownable {
    constructor(
        IENSRegistry _registry,
    ) public ERC721Full("DCL Registrar", "DCLENS") {
        // ENS registry
        updateRegistry(_registry);
    }

    function register(
        string memory _subdomain,
        bytes32 subdomainLabelHash,
        address _beneficiary,
        uint256 _createdDate
    ) internal {
        // Create new subdomain and assign the _beneficiary as the owner
        registry.setSubnodeOwner(domainNameHash, subdomainLabelHash, _beneficiary);
        // Mint an ERC721 token with the subdomain label hash as its id
        _mint(_beneficiary, uint256(subdomainLabelHash));
    }
}
```

Once deployed, then you have to transfer the controller address to the contract.

## Metadata

We created a metadata service which NFT marketplaces like OpenSea can fetch metadata for ENS such as registration data, expiration date, name length, etc. For more detail, please refer to the metadata documentation site.

{% embed url="https://metadata.ens.domains/docs" %}
