# ENS as NFT

When ENS .eth registrar migrated in May 2019, the .eth registrar became an [ERC721](https://github.com/ensdomains/ens/blob/master/docs/ethregistrar.rst#id3) compliant nonfungable token contract, meaning that .eth registrations can be transferred in the same fashion as other NFTs.

## Deriving tokenId from ENS name

The tokenId of ENS name is simply the uint256 representation of the hash of the label \(`vitalik` for `vitalik.eth`\).

```javascript
const name = 'vitalik'
const labelHash = web3.utils.sha3('vitalik')
const tokenId = web3.utils.toBN(labelHash).toString()
```

In the example above,[`79233663829379634837589865448569342784712482819484549289560981379859480642508`](https://opensea.io/assets/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/79233663829379634837589865448569342784712482819484549289560981379859480642508) is the tokenId of `vitalik.eth`

## Deriving ENS name from tokenId

Unlike deriving tokenId, deriving ENS name from tokenId is not as easy. This is because all ENS names are stored as fixed-length hash to allow registering infinite length of names. The downside of this architecture is that you cannot directly query ENS smart contracts to return ens name using tokenId.

Our recommended way is to query via [https://thegraph.com](https://thegraph.com) ENS subgraph. The graph decodes the hash to name as it indexes. The example code to query is as follows.

```javascript
const Web3 = require('web3')
const gr = require('graphql-request')
const { request, gql } = gr
const web3 = new Web3()
const tokenId = '79233663829379634837589865448569342784712482819484549289560981379859480642508'
const labelHash = web3.utils.toHex(tokenId) 
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

If you prefer not to rely on a third party like TheGraph, the team open-sourced [ens-rainbow](https://github.com/graphprotocol/ens-rainbow) containing a link to the original dataset \(6GB with 133 million entities\) so that you can host your own ENS name decoding service.

## Turning subdomain into NFT

Currently, all the subdomains nor non `.eth` domains are not NFT, unless the domain registrar itself supports NFT such as \(`dcl.eth`, and `.kred`\). If you want to turn all subdomains which you own, you have to create a registrar

1. Create a registrar contract as ERC721 compliant
2. Set ENS registry address \(mostly when you deploy the registrar\)
3. Create `register` function which calls `registry.setSubnodeOwner` then mint the token making the subdomain label hash as tokenId

```text
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
        // Mint an ERC721 token with the sud domain label hash as its id
        _mint(_beneficiary, uint256(subdomainLabelHash));
    }
}
```

Once deployed, then you have to transfer the controller address to the contract.

For non-technical users, we are currently working on upgrading our `SubdomainRegistrar` which allows you to turn your subdomain into NFT without any coding.

