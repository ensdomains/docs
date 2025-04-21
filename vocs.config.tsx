import { remarkMermaid } from '@theguild/remark-mermaid'
import { defineConfig } from 'vocs'

const ensipSidebarItems = new Array()
try {
  ensipSidebarItems.push(...require('./src/data/generated/ensips-sidebar.json'))
} catch {}

const daoProposalsSidebarItems = new Array()
try {
  daoProposalsSidebarItems.push(
    ...require('./src/data/generated/dao-proposals-sidebar.json')
  )
} catch {}

// Cloudflare doesn't expose NODE_ENV, so checking the source branch is our easiest workaround
const isProd = process.env.CF_PAGES_BRANCH === 'master'
const baseUrl = isProd ? 'https://docs.ens.domains' : process.env.CF_PAGES_URL

export default defineConfig({
  title: 'ENS Documentation',
  titleTemplate: '%s | ENS Docs',
  rootDir: 'src',
  iconUrl: '/img/icon.svg',
  logoUrl: '/img/logo-mark.svg',
  baseUrl,
  ogImageUrl: baseUrl ? `${baseUrl}/api/og?title=%title` : undefined,
  editLink: {
    pattern: 'https://github.com/ensdomains/docs/edit/master/src/pages/:path',
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
    variables: {
      color: {
        background: {
          light: 'var(--ens-background)',
          dark: 'var(--ens-background)',
        },
        text: {
          light: 'var(--ens-text)',
          dark: 'var(--ens-text)',
        },
        textAccent: {
          light: 'var(--ens-blue-primary)',
          dark: 'var(--ens-blue-primary)',
        },
        borderAccent: {
          light: 'var(--ens-blue-primary)',
          dark: 'var(--ens-blue-bright)',
        },
      },
    },
  },
  markdown: {
    remarkPlugins: [remarkMermaid],
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
              link: '/learn/protocol',
            },
            {
              text: 'Deployments',
              link: '/learn/deployments',
            },
            {
              text: 'Resolution',
              link: '/learn/resolution',
            },
            {
              text: 'DNS Names',
              link: '/learn/dns',
            },
            {
              text: 'Layer 2 & Offchain',
              link: '/learn/ccip-read',
            },
          ],
        },
        {
          text: 'Other',
          items: [
            {
              text: 'Frequently Asked Questions',
              link: '/faq',
            },
            {
              text: 'Terminology',
              link: '/terminology',
            },
            {
              text: 'Bug Bounties',
              link: '/bugs',
            },
            {
              text: 'Changelog',
              link: '/changelog',
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
              link: '/web/reverse',
            },
            {
              text: 'Listing Names',
              link: '/web/enumerate',
            },
          ],
        },
        {
          text: 'Advanced',
          items: [
            {
              text: 'Decentralized Web',
              link: '/dweb/intro',
            },
            {
              text: 'Issuing Subdomains',
              link: '/web/subdomains',
            },
            {
              text: 'Naming Smart Contracts',
              link: '/web/naming-contracts',
            },
            {
              text: "Layer 2's & Multichain",
              link: '/web/multichain',
            },
            {
              text: 'Subgraph',
              link: '/web/subgraph',
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
          link: '/contracts',
        },
        {
          text: 'Resolution',
          items: [
            {
              text: 'Resolution Process',
              link: '/resolution',
            },
            {
              text: 'Name Processing',
              link: '/resolution/names',
            },
          ],
        },
        {
          text: 'Resolvers',
          items: [
            {
              text: 'Start Here',
              link: '/resolvers/quickstart',
            },
            {
              text: 'Public Resolver',
              link: '/resolvers/public',
            },
            {
              text: 'Interacting with a resolver',
              link: '/resolvers/interacting',
            },
            {
              text: 'Writing your own resolver',
              link: '/resolvers/writing',
            },
            {
              text: 'Offchain/L2 Resolvers',
              link: '/resolvers/ccip-read',
            },
            {
              text: 'Universal Resolver',
              link: '/resolvers/universal',
            },
            {
              text: 'Interface Reference',
              link: '/resolvers/interfaces',
            },
          ],
        },
        {
          text: 'Registries',
          items: [
            {
              text: 'The Registry',
              link: '/registry/ens',
            },
            {
              text: 'ETH Registrar',
              link: '/registry/eth',
            },
            {
              text: 'DNS Registrar',
              link: '/registry/dns',
            },
            {
              text: 'TLDs List',
              link: '/dns/tlds',
            },
            {
              text: 'Reverse Registrar',
              link: '/registry/reverse',
            },
          ],
        },
        {
          text: 'Namewrapper',
          items: [
            {
              text: 'Overview',
              link: '/wrapper/overview',
            },
            {
              text: 'Wrapped States',
              link: '/wrapper/states',
            },
            {
              text: 'Fuses',
              link: '/wrapper/fuses',
            },
            {
              text: 'Expiry',
              link: '/wrapper/expiry',
            },
            {
              text: 'Contract Details',
              link: '/wrapper/contracts',
            },
            {
              text: 'Use-Cases',
              link: '/wrapper/usecases',
            },
            {
              text: 'Creating a Subname Registrar',
              link: '/wrapper/creating-subname-registrar',
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
              text: 'Security Council',
              link: '/dao/security-council',
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
        ...daoProposalsSidebarItems,
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
