# DNS Registrar guide

## Introduction

DNSSEC (The Domain Name System Security Extensions) establishes a chain of trust from the root key which signed by ICANN (.) and down through each key. Given DNSSEC is enabled and an ETH address is put into the subdomain of the domain you own (eg: `_ens.yourdomain.tld`), ENS manager allows anyone to submit the hash of the chain to `DNSSEC Oracle` smart contract

## Steps

Note: Currently only `.xyz`domain is supported. For other domains, please refer to the FAQ section.

### Step 1 Setting up DNSSEC signing

When you first land on ENS manager, you will see something like below.

![step1: dnnsec not enabled](<.gitbook/assets/dnssec\_step1 (1).png>)

If your DNS provider already supports DNSSEC-signed domains, all you do is to enable the option on the DNS manager.

If they don’t, you’ll need to migrate to someone who does. We recommend either [EasyDNS](https://www.easydns.com) or [Google Cloud DNS](https://cloudplatform.googleblog.com/2017/11/DNSSEC-now-available-in-Cloud-DNS.html). EasyDNS’s setup guide for DNSSEC is [here](https://fusion.easydns.com/Knowledgebase/Article/View/18/7/dnssec), while Google’s is [here](https://cloud.google.com/dns/dnssec-config).

Whatever provider you need, make sure you select RSA signatures and SHA256 hashing.

![sha|690x468](<.gitbook/assets/dnssec\_sha (1).png>)

### Step 2: Adding a TXT record

The DNS Registrar on ENS looks for a TXT record with a specific name and format in order to verify what Ethereum address should be given ownership of the domain. To claim ownership of mydomain.xyz, create a TXT record in your DNS zone, \_ens.mydomain.xyz, with text data of the form a=0x1234..., where 0x1234... is the Ethereum address you want to give control of the ENS record to.

![step2: add text](<.gitbook/assets/dnssec\_step2 (1).png>)

### Step 3: Registering the name into ENS

Once you get to this stage, you can complete the rest from ENS manager. Simply press "Register" and send the transaction.

![step3: owner submit proof](<.gitbook/assets/dnssec\_step3 (1).png>)

### Step 4: Go to the manager

![step4: owner](<.gitbook/assets/dnssec\_step4 (1).png>)

## FAQ

### Can I register any DNS domains through ENS app?

Technically speaking, [over 90% of domains](https://medium.com/the-ethereum-name-service/upcoming-changes-to-the-ens-root-a1b78fd52b38) can be supported. Some tlds (`ceo`, `.art`, `.club`, `.luxe` and `.kred`) are operated by each DNS registry.

### If I own `myname.xyz` DNS name, can I claim for `myname.eth` ?

You may be confused with [short name reservation process](https://medium.com/the-ethereum-name-service/timeline-for-3-6-character-name-reservation-auction-and-instant-registrations-e39aa2f89dc9). Under DNSSEC integration, you can only claim for the correspondent ENS name with the same top level domain (TLD). `.eth` is managed completely separately.

### Once I register the domain, how can I transfer or delete ownership?

Unlike `.eth` permanent registrar, there is no notion of `registrant` which can transfer the ownership of the controller. If you want to transfer the ownership to any address other than currently registered address, please update the corresponding DNS record from your DNS manager and click "Transfer" from our ENS manager.

We currently haven't enabled the ability to delete the ownership. Having said that, you can achieve the same effect if you set the owner record to `a= 0x0000000000000000000000000000000000000000` then click "Transfer" from the ENS manager.

### Can I register my DNS subdomain?

No. DNSSEC registration is only enabled for the second level domain (eg: yourname.xyz). If you want to create `subdomain.yourname.xyz`, then click "Subdomains" tab of our manager and create it from ENS manager just like other subdomains under `.eth`.
