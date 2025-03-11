import { Button } from './ui/Button'
import { H1 } from './ui/Typography'

const navigation = [
  {
    title: 'Get Started',
    links: [
      ['Protocol Docs', '/learn/protocol'],
      ['Resolution', '/resolution'],
      ['Tools and Libraries', '/web/libraries'],
      ['Layer 2 & Offchain', '/learn/ccip-read'],
    ],
  },
  {
    title: 'Use ENS',
    links: [
      ['Address Lookup', '/web/resolution'],
      ['Text Records', '/web/records'],
      ['Avatars', '/web/avatars'],
      ['Primary Names', '/web/reverse'],
      ['List Names', '/web/enumerate'],
    ],
  },
  {
    title: 'Registries',
    links: [
      ['ENS Registrar', '/registry/ens'],
      ['ETH Registrar', '/registry/eth'],
      ['DNS Registrar', '/registry/dns'],
      ['Reverse Registrar', '/registry/reverse'],
    ],
  },
  {
    title: 'Resolvers',
    links: [
      ['Public Resolver', '/resolvers/public'],
      ['Writing a Resolver', '/resolvers/writing'],
      ['Interacting with a Resolver', '/resolvers/interacting'],
      ['Cross Chain Resolvers', '/resolvers/ccip-read'],
      ['Interface Reference', '/resolvers/interfaces'],
    ],
  },
  {
    title: 'Governance',
    links: [
      ['Welcome', '/dao'],
      ['Constitution', '/dao/constitution'],
      ['Foundation', '/dao/foundation'],
      ['Governance Token & Airdrop', '/dao/token'],
    ],
  },
  {
    title: 'Extra',
    links: [
      ['Naming Smart-Contracts', '/web/naming-contracts'],
      // ["Issuing Subdomains", "/web/subdomains"],
      ['Name Wrapper', '/wrapper/overview'],
      ['Subgraph', '/web/subgraph'],
      ['Sign In With Ethereum (SIWE)', '/web/siwe'],
    ],
  },
  {
    title: 'Design',
    links: [
      ['Thorin', 'https://thorin.ens.domains/'],
      [
        'Thorin (Figma)',
        'https://www.figma.com/community/file/1303431204471074291',
      ],
      ['Brand', 'https://ens.domains/brand'],
    ],
  },
  {
    title: 'Support',
    links: [
      ['Changelog', '/changelog'],
      ['Knowledgebase', 'https://support.ens.domains/'],
      ['Community Blog', 'https://blog.ens.domains'],
      ['Discord', 'https://chat.ens.domains/'],
    ],
  },
]

export function HomePage() {
  return (
    <>
      <div className="flex flex-col gap-4 py-16">
        <h1 className="text-3xl font-semibold sm:text-4xl">
          ENS Documentation
        </h1>
        <p>Build applications with decentralized self-sovereign identity.</p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href="/web/quickstart">Get Started</Button>
          <Button variant="outline" href="/learn/protocol">
            Learn about ENS
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 pt-6 lg:grid-cols-4 lg:gap-y-10">
        {navigation.map((column) => (
          <div key={column.title}>
            <div className="font-bold">{column.title}</div>
            {column.links.map(([title, href]) => (
              <div key={title} className="flex items-center gap-3">
                <a href={href}>{title}</a>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  )
}
