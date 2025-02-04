import { defineConfig } from 'vocs'

import { ensips } from './src/plugins/ensips'

const ensipSidebarItems = new Array()
try {
  ensipSidebarItems.push(...require('./src/pages/ensip/sidebar.json'))
} catch {}

export default defineConfig({
  title: 'ENS Documentation',
  titleTemplate: '%s | ENS Docs',
  rootDir: 'src',
  iconUrl: '/img/icon.svg',
  logoUrl: '/img/logo-mark.svg',
  baseUrl: 'https://docs.ens.domains',
  editLink: {
    pattern: 'https://github.com/ensdomains/docs/edit/vocs/src/pages/:path',
    text: 'Edit on Github',
  },
  socials: [
    {
      icon: 'github',
      link: 'https://github.com/ensdomains/docs',
    },
    {
      icon: 'telegram',
      link: 'https://t.me/+aLmF83si62ZhOGNh',
    },
  ],
  font: {
    google: 'Inter',
  },
  theme: {
    colorScheme: 'light',
    variables: {
      color: {
        text: 'var(--ens-grey-active)',
        textAccent: 'var(--ens-blue-dim)',
        backgroundAccent: 'var(--ens-blue-primary)',
        backgroundAccentHover: 'var(--ens-blue-bright)',
      },
    },
  },
  vite: {
    plugins: [ensips()],
  },
  head: {
    // TODO: Ideally this should get injected into <header> for semantics via a remark plugin.
    // Overriding styles will look the same and is easier for now.
    // https://vocs.dev/docs/api/config#markdownremarkplugins
    '/ensip/': (
      <>
        <style>{`
          .vocs_Header {
            margin-bottom: var(--vocs-space_16) !important;
            padding-bottom: 0 !important;
            border-bottom: none !important;
          }
        `}</style>
      </>
    ),
  },
  sidebar: [
    {
      text: 'Intro',
      collapsed: true,
      items: [
        {
          text: 'Learn',
          items: [
            {
              text: 'The Protocol',
              link: '',
            },
            {
              text: 'Deployments',
              link: '',
            },
            {
              text: 'Resolution',
              link: '',
            },
            {
              text: 'DNS Names',
              link: '',
            },
            {
              text: 'Layer 2 & Offchain',
              link: '',
            },
          ],
        },
        {
          text: 'Other',
          items: [
            {
              text: 'Frequently Asked Questions',
              link: '',
            },
            {
              text: 'Terminology',
              link: '',
            },
            {
              text: 'Bug Bounties',
              link: '',
            },
            {
              text: 'Changelog',
              link: '',
            },
          ],
        },
      ],
    },
    {
      text: 'Using ENS',
      collapsed: true,
      items: [
        {
          text: 'Quickstart',
          link: '/web/quickstart',
        },
        {
          text: 'Getting Started',
          link: '/web',
        },
        {
          text: 'Tools and Libraries',
          link: '/web/libraries',
        },
        {
          text: 'Web & Querying',
          items: [
            {
              text: 'Addresses',
              link: '/web/resolution',
            },
            {
              text: 'Text Records',
              link: '/web/records',
            },
            {
              text: 'Avatars',
              link: '/web/avatars',
            },
            {
              text: 'Primary Names',
              link: '',
            },
            {
              text: 'Listing Names',
              link: '',
            },
          ],
        },
        {
          text: 'Advanced',
          items: [
            {
              text: 'Decentralized Web',
              link: '',
            },
            {
              text: 'Issuing Subdomains',
              link: '',
            },
            {
              text: 'Naming Smart-contracts',
              link: '',
            },
            {
              text: "Layer 2's & Multichain",
              link: '',
            },
            {
              text: 'Subgraph',
              link: '',
            },
          ],
        },
        {
          text: 'Design',
          items: [
            {
              text: 'Thorin',
              link: 'https://thorin.ens.domains',
            },
            {
              text: 'Brand',
              link: 'https://brand.ens.domains',
            },
          ],
        },
      ],
    },
    {
      text: 'Smart Contracts',
      collapsed: true,
      items: [
        {
          text: 'Overview',
          link: '',
        },
        {
          text: 'Resolution',
          items: [
            {
              text: 'Resolution Process',
              link: '',
            },
            {
              text: 'Name Processing',
              link: '',
            },
          ],
        },
        {
          text: 'Resolvers',
          items: [
            {
              text: 'Start Here',
              link: '',
            },
            {
              text: 'Public Resolver',
              link: '',
            },
            {
              text: 'Interacting with a resolver',
              link: '',
            },
            {
              text: 'Writing your own resolver',
              link: '',
            },
            {
              text: 'Cross Chain Resolvers',
              link: '',
            },
            {
              text: 'Universal Resolver',
              link: '',
            },
            {
              text: 'Interface Reference',
              link: '',
            },
          ],
        },
        {
          text: 'Registries',
          items: [
            {
              text: 'The Registry',
              link: '',
            },
            {
              text: 'ETH Registrar',
              link: '',
            },
            {
              text: 'DNS Registrar',
              link: '',
            },
            {
              text: 'TLDs List',
              link: '',
            },
            {
              text: 'Reverse Registrar',
              link: '',
            },
          ],
        },
        {
          text: 'Namewrapper',
          items: [
            {
              text: 'Overview',
              link: '',
            },
            {
              text: 'Wrapped States',
              link: '',
            },
            {
              text: 'Fuses',
              link: '',
            },
            {
              text: 'Expiry',
              link: '',
            },
            {
              text: 'Contract Details',
              link: '',
            },
            {
              text: 'Use-Cases',
              link: '',
            },
            {
              text: 'Creating a Subname Registrar',
              link: '',
            },
          ],
        },
      ],
    },
    {
      text: 'Governance',
      collapsed: true,
      items: [
        {
          text: 'Welcome',
          link: '/dao',
        },
        {
          text: 'The interesting bits',
          items: [
            {
              text: 'Constitution',
              link: '/dao/constitution',
            },
            {
              text: 'Foundation',
              link: '/dao/foundation',
            },
            {
              text: 'Token & Airdrop',
              link: '/dao/token',
            },
          ],
        },
        {
          text: 'Good to know',
          items: [
            {
              text: 'Submit Proposal',
              link: '/dao/proposals/submit',
            },
            {
              text: 'DAO Stewards',
              link: '/dao/stewards',
            },
            {
              text: 'Working Group Rules',
              link: '/dao/wg/rules',
            },
          ],
        },
        {
          text: 'Links',
          items: [
            {
              text: 'Discourse',
              link: 'https://discuss.ens.domains',
            },
            {
              text: 'Snapshot',
              link: 'https://snapshot.org/#/ens.eth',
            },
            {
              text: 'Tally',
              link: 'https://www.withtally.com/governance/ens',
            },
            {
              text: 'Agora',
              link: 'https://agora.ensdao.org',
            },
          ],
        },
      ],
    },
    {
      text: 'Improvement Proposals',
      collapsed: true,
      items: [
        {
          text: 'What is an ENSIP?',
          link: '/ensip',
        },
        {
          text: 'Proposals',
          items: ensipSidebarItems,
        },
      ],
    },
  ],
})
