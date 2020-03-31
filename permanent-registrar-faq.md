# Permanent Registrar Frequently Asked Questions

## About the ENS Permanent Registrar

### When you say ‘Permanent’ what do you mean, i.e how ‘permanent’ is ‘permanent’?

We intend for the permanent registrar to run until a deficiency is detected and/or determined. Unlike the interim registrar, which was intended to be replaced after two years, there are no plans to replace the permanent registrar - though changes may be made to registration and renewal fees as needed.

### What registration method does the permanent registrar use?

The permanent registrar uses a first-in-first-served \(FIFS\) registration system. It replaces the Vickery auction used in the interim registrar.

### How many transactions are required to register a name using the permanent registrar?

The permanent registrar uses two transactions \(register and reveal\) to register a name. This is one fewer transaction than the interim registrar required.

### How long does it take to register a name using the permanent registrar?

It takes less than 5 minutes to register a name. No more waiting 5 days, like the interim auction required!

### Do we need to do anything to ensure continued use of existing ENS names?

Names that were registered under the legacy registrar expire on May 4, 2020. There is a 90 day grace period during which you can renew the name to retain control of it, extending the effective expiration to August 3rd 2020.

In order to retain your name past May 4, 2020, you will need to renew your name at a cost of $5/name/year. If you don't renew your name, the name will become available for registration by others.

### What happens if I have several ENS names with different renewal dates?

You can renew any existing name at any time.

### What happens if I fail to migrate ENS names within the migration period?

Anyone can take ownership of the name, though you can always get your locked ETH back by pressing “Release” button on the manager.

### Do I have to renew my name to keep it?

Yes! Once you migrate your name to the permanent registrar, you will have to pay a fee to retain it. You can renew your name for any period of time at any time.

Note: For simplicity, the ENS Dapp initially only allows renewals on an annual basis. The underlying smart contracts support renewal periods defined in seconds.

### How do renewals work?

Anyone can extend the expiry date of any existing name by paying the required fee, at any time.

There is no maximum limitation of the renewal duration but there is a minimum renewal period of 28 days.

### Can someone grab my domains at the end of my subscription period?

You can renew your name at any time during the period you own it. Making sure you renew before the name expires will prevent someone else from registering the name.

There is also a 'grace period' of 90 days after your name expires. You can renew the name to retain ownership of it during the grace period.

### How much will the yearly renewals cost?

Yearly renewals cost $5/year for names that are 5 characters or longer. 4 character names cost $160/year, and 3 character names cost $640/year. Fees are paid in ETH. The ETH/USD exchange rate is set by the DAI USD oracle.

### What happens to the renewal fees? Do I get them back?

Rather than being locked and held, as in the interim registrar, renewal fees in the permanent registrar are spent. You will not get them back.

### How will ENS team manage and spend the funds? Will there be a foundation or transparent oversight?

Initially, funds will be sent to the ENS root multisig, for the keyholders to determine how funds get allocated. We're considering other options for the long-term, such as funding the core ENS team, as well as other teams building on ENS. There are also tax considerations to address.

### How are funds from rental income used?

It's ultimately up to the keyholders to allocate the funds. We hope they will fund ENS ecosystems projects. If available funds exceed the reasonable needs of the ENS ecosystem, we hope other Ethereum projects will receive them.

### Where can I manage all my ENS names?

ENS Listing has [an interface for this here](https://enslisting.com/manage/home). We will be adding support for this to our manager Dapp soon.

### Can I trade ENS domains on NFT exchanges?

Yes, .eth names are tradeable as NFT tokens.

### How can I transfer domains registered in the permanent registry to someone else?

You can do this using [our manager interface here](https://manager.ens.domains/), or using any tool with NFT support.

### Are subdomains handled the same way as before?

Only the registration and renewal process for .eth domains has changed. Resolution, and management of other names remains the same.

### What prohibits large scale domain grabbing besides registration fees?

The cost of doing this is the only limitation in place.

### What is a controller?

This is a new concept introduced by the permanent registrar. The domain name owner can set different address as a controller to delegate the management of domain so that a non-owner can change the name’s resolver and set its address, etc.

