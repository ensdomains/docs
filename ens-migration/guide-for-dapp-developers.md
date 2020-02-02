# Guide for DApp Developers

If you maintain a DApp, wallet, or library that depends on ENS, you will need to take action to ensure no disruption occurs for your users during and after the migration period. This document describes what you will need to do in order to update your app.

## What you need to do

### Wallets, libraries, and DApps that resolve names

You should update the ENS registry address in your code to the new address of 0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e as soon as possible. This new address is functional now, and will return the same results as the old one. Switching now ensures your users will not experience any disruption or interruption of service.

If you do not update the registry address by the time the migration process begins on February 3rd, your users will begin to see out-of-date results: Names registered or updated after the migration will not resolve correctly for your users.

If you maintain a library, you should release a new version with the updated address, and notify users that they should update as soon as possible. You may wish to consider publishing instructions for ‘monkeypatching’ the new address, in situations where users cannot easily upgrade to the latest version.

All ENS deployments across mainnet and all testnets now use the same addresses.

### Wallets, libraries, and DApps that register or update names

If your DApp or library allows users to register names, or to make changes to existing names, you have two options:

1. Simply switch over to the new registry address as soon as possible. When you do, users will be temporarily unable to make changes to their names using your app until their name is migrated between the 3rd and 5th of February.
2. When making a change to a name, call the \`recordExists\` function on the new registry. If it returns \`true\`, send the modification transaction to the new registry; otherwise, send it to the old one. If you take this option, you should still prohibit transfers of .ETH ERC721 tokens; a transfer that happens as the name is migrated could result in confusing results for users.

The migration process will automatically transfer .ETH second-level domains \(eg, foo.eth\) to the new registry and registrar. Subdomains \(eg, bar.foo.eth\) and other top level domains \(eg, foo.xyz\) will need to be migrated by their owners. For more details on this process, see our documentation, or reach out to us for help.

### ENS Secondary Marketplaces

If you operate a marketplace that trades ENS names, you should immediately stop trading of them. Although this vulnerability has not been exploited so far, once its existence is publicised we expect that attackers will reverse-engineer it and exploit it. Halting trading on the current registrar will prevent your users being affected by this.

After a name has been migrated, tokens on the old registrar at 0xfac7bea255a6990f749363002136af6556b31e04 no longer correspond to ENS names, and are worthless; as a result you must disable trading of these before February 3rd 00:00UTC at the very latest.

You can immediately enable trading of names on the new registrar, at address 0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85. When names are migrated to this contract starting on February 3rd 00:00 UTC, domain owners will automatically have new ERC721 tokens created on this new registrar, with the same ID as those on the current registrar.  


