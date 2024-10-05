/* eslint-disable sonarjs/no-duplicate-string */
import { SectionData } from '../navigation';

export const showWIP = false;

export const navigation: SectionData[] = [
    {
        name: 'Intro',
        href: '/learn/protocol',
        icon: '🏠',
        activePattern: /^\/((learn|terminology|changelog|bugs|faq)(\/.*)?)?$/,
        links: [
            {
                title: 'Learn',
                icon: '🧑‍🎓',
                links: [
                    {
                        title: 'The Protocol',
                        href: '/learn/protocol',
                        icon: '📖',
                    },
                    {
                        title: 'Deployments',
                        href: '/learn/deployments',
                        icon: '📰',
                    },
                    {
                        title: 'Resolution',
                        href: '/learn/resolution',
                        icon: '🔍',
                    },
                    { title: 'DNS Names', href: '/learn/dns', icon: '🌐' },
                    {
                        title: 'Layer 2 & Offchain',
                        icon: '🔗',
                        href: '/learn/ccip-read',
                    },
                ],
            },
            {
                title: 'Other',
                icon: '📰',
                links: [
                    {
                        title: 'Frequently Asked Questions',
                        href: '/faq',
                        icon: '📓',
                    },
                    {
                        title: 'Terminology',
                        href: '/terminology',
                        icon: '📓',
                    },
                    {
                        title: 'Bug Bounties',
                        href: '/bugs',
                        icon: '🪲',
                    },
                    {
                        title: 'Changelog',
                        href: '/changelog',
                        icon: '📝',
                    },
                ],
            },
        ],
    },
    {
        name: 'Using ENS',
        href: '/web',
        icon: '📖',
        activePattern: /^\/d?web(\/.*)?/,
        links: [
            {
                title: '',
                links: [
                    {
                        title: 'Quickstart',
                        href: '/web/quickstart',
                        icon: '⚡',
                    },
                    {
                        title: 'Getting Started',
                        href: '/web',
                        icon: '👋',
                    },
                    {
                        title: 'Tools and Libraries',
                        href: '/web/libraries',
                        icon: '🛠️',
                    },
                ],
            },
            {
                title: 'Web & Querying',
                icon: '🌐',
                links: [
                    {
                        title: 'Addresses',
                        href: '/web/resolution',
                        icon: '🔍',
                    },
                    {
                        title: 'Text Records',
                        href: '/web/records',
                        icon: '🔍',
                    },
                    { title: 'Avatars', href: '/web/avatars', icon: '🔍' },
                    {
                        title: 'Primary Names',
                        href: '/web/reverse',
                        icon: '🔍',
                    },
                    {
                        title: 'Listing Names',
                        href: '/web/enumerate',
                        icon: '🔍',
                    },
                ],
            },
            {
                title: 'Advanced',
                icon: '⚙️',
                links: [
                    {
                        title: 'Decentralized Web',
                        href: '/dweb/intro',
                    },
                    {
                        title: 'Issuing Subdomains',
                        href: '/web/subdomains',
                    },
                    {
                        title: 'Naming Smart-contracts',
                        href: '/web/naming-contracts',
                    },
                    {
                        // eslint-disable-next-line quotes
                        title: "Layer 2's & Multichain",
                        href: '/web/multichain',
                        icon: '⛓️',
                    },
                    {
                        title: 'Subgraph',
                        href: '/web/subgraph',
                    },
                    // {
                    //     title: 'Sign In With Ethereum (SIWE)',
                    //     href: '/web/siwe',
                    //     wip: 80,
                    //     icon: '✍️',
                    // },
                ],
            },
            {
                title: 'Design',
                icon: '🖼️',
                links: [
                    // {
                    //     title: 'Guidelines',
                    //     href: '/web/design',
                    // },
                    {
                        title: 'Thorin',
                        href: 'https://thorin.ens.domains/',
                        external: true,
                    },
                    {
                        title: 'Brand',
                        href: 'https://ens.domains/brand',
                        external: true,
                    },
                ],
            },
        ],
    },
    {
        name: 'Smart Contracts',
        href: '/contracts',
        icon: '⚙️',
        activePattern:
            /^\/(resolvers|contracts|wrapper|registry|resolution|dns)(\/.*)?/,
        links: [
            {
                title: '',
                links: [
                    {
                        title: 'Overview',
                        href: '/contracts',
                        icon: '👋',
                    },
                ],
            },
            {
                title: 'Resolution',
                icon: '🌐',
                links: [
                    {
                        title: 'Resolution Process',
                        href: '/resolution',
                        wip: true,
                        icon: '✨',
                    },
                    {
                        title: 'Name Processing',
                        href: '/resolution/names',
                        icon: '⚙️',
                    },
                ],
            },
            {
                title: 'Resolvers',
                icon: '🗺️',
                links: [
                    {
                        title: 'Start Here',
                        href: '/resolvers/quickstart',
                        icon: '✨',
                    },
                    {
                        title: 'Public Resolver',
                        href: '/resolvers/public',
                        wip: 55,
                        icon: '🏛️',
                    },
                    {
                        title: 'Interacting with a resolver',
                        href: '/resolvers/interacting',
                        wip: 55,
                        icon: '👉',
                    },
                    {
                        title: 'Writing your own resolver',
                        href: '/resolvers/writing',
                        wip: 45,
                        icon: '✍️',
                    },
                    {
                        title: 'Cross Chain Resolvers',
                        href: '/resolvers/ccip-read',
                        icon: '⛓️',
                    },
                    {
                        title: 'Universal Resolver',
                        href: '/resolvers/universal',
                        wip: 70,
                        icon: '✍️',
                    },
                    {
                        title: 'Interface Reference',
                        href: '/resolvers/interfaces',
                        wip: 70,
                        icon: '✍️',
                    },
                ],
            },
            {
                title: 'Registries',
                icon: '🏛️',
                links: [
                    {
                        title: 'The Registry',
                        href: '/registry/ens',
                        icon: '🗒️',
                    },
                    {
                        title: 'ETH Registrar',
                        href: '/registry/eth',
                        icon: '🗒️',
                    },
                    {
                        title: 'DNS Registrar',
                        href: '/registry/dns',
                        icon: '🗒️',
                    },
                    {
                        title: 'TLDs List',
                        href: '/dns/tlds',
                    },
                    // {
                    //     title: 'Test Registrar',
                    //     href: '/registry/test',
                    //     wip: true,
                    //     icon: '🗒️',
                    // },
                    {
                        title: 'Reverse Registrar',
                        href: '/registry/reverse',
                        icon: '🗒️',
                    },
                    // {
                    //     title: 'Authoring a registry',
                    //     wip: true,
                    //     href: '/registry/writing',
                    //     icon: '✍️',
                    // },
                ],
            },
            {
                title: 'Namewrapper',
                icon: '🎁',
                links: [
                    {
                        title: 'Overview',
                        href: '/wrapper/overview',
                        icon: '📰',
                    },
                    {
                        title: 'Wrapped States',
                        href: '/wrapper/states',
                        icon: '🗒️',
                    },
                    {
                        title: 'Fuses',
                        href: '/wrapper/fuses',
                        icon: '🧨',
                    },
                    {
                        title: 'Expiry',
                        href: '/wrapper/expiry',
                        icon: '🕰️',
                    },
                    {
                        title: 'Contract Details',
                        href: '/wrapper/contracts',
                        icon: '🔍',
                    },
                    {
                        title: 'Use-Cases',
                        href: '/wrapper/usecases',
                        icon: '✨',
                    },
                    {
                        title: 'Creating a Subname Registrar',
                        href: '/wrapper/creating-subname-registrar',
                        icon: '🕹️',
                    },
                ],
            },
        ],
    },
    {
        name: 'Governance',
        href: '/dao',
        icon: '🏛️',
        activePattern: /^\/(dao|governance)(\/.*)?/,
        links: [
            {
                title: '',
                links: [{ title: 'Welcome', href: '/dao' }],
            },
            {
                title: 'The interesting bits',
                links: [
                    {
                        title: 'Constitution',
                        href: '/dao/constitution',
                    },
                    { title: 'Foundation', href: '/dao/foundation' },
                    { title: 'Token & Airdrop', href: '/dao/token' },
                ],
            },
            {
                title: 'Good to know',
                links: [
                    {
                        title: 'Submit Proposal',
                        href: '/dao/proposals/submit',
                    },
                    {
                        title: 'DAO Stewards',
                        href: '/dao/stewards',
                    },
                    {
                        title: 'Working Group Rules',
                        href: '/dao/wg/rules',
                    },
                ],
            },
            {
                title: 'Links',
                links: [
                    {
                        title: 'Discourse',
                        href: 'https://discuss.ens.domains',
                        external: true,
                    },
                    {
                        title: 'Snapshot',
                        href: 'https://snapshot.org/#/ens.eth',
                        external: true,
                    },
                    {
                        title: 'Tally',
                        href: 'https://www.withtally.com/governance/ens',
                        external: true,
                    },
                    {
                        title: 'Sybil',
                        href: 'https://sybil.org/#/delegates/ens',
                        external: true,
                    },
                ],
            },
            {
                title: 'Proposals Term 5',
                links: [
                    {
                        // eslint-disable-next-line prettier/prettier
                        title: '5.16 - [Executable] Reimbursement of ENS Labs’ legal fees in eth.link litigation',
                        href: '/dao/proposals/5.16',
                    },
                    {
                        // eslint-disable-next-line prettier/prettier
                        title: '5.15 - [Social] ENS Governor Improvement Proposal: ProposalBond',
                        href: '/dao/proposals/5.15',
                    },
                    {
                        // eslint-disable-next-line prettier/prettier
                        title: '5.14 - [Executable] Endowment permissions to karpatkey - Update #4',
                        href: '/dao/proposals/5.14',
                    },
                    {
                        // eslint-disable-next-line prettier/prettier
                        title: '5.13 - [Executable] Security Council',
                        href: '/dao/proposals/5.13',
                    },
                    {
                        // eslint-disable-next-line prettier/prettier
                        title: '5.12 - [Executable] Roles Modifier V2 Migration & Updates to Endowment Permissions',
                        href: '/dao/proposals/5.12',
                    },
                    {
                        // eslint-disable-next-line prettier/prettier
                        title: '5.11 - [Executable] Fund the Meta-Governance Working Group (Term 5)',
                        href: '/dao/proposals/5.11',
                    },
                    {
                        // eslint-disable-next-line prettier/prettier
                        title: '5.10 - [Social] Confirming the ENS DAO Security Council Members',
                        href: '/dao/proposals/5.10',
                    },
                    {
                        // eslint-disable-next-line prettier/prettier
                        title: '5.9 - [Social] Funding Request: ENS Meta-Governance Working Group Term 5 (Q1/Q2)',
                        href: '/dao/proposals/5.9',
                    },
                    {
                        // eslint-disable-next-line prettier/prettier
                        title: '5.8 - [Social] ENS Steward Vesting Proposal',
                        href: '/dao/proposals/5.8',
                    },
                    {
                        // eslint-disable-next-line prettier/prettier
                        title: '5.7 - [Social] Security Council',
                        href: '/dao/proposals/5.7',
                    },
                    {
                        // eslint-disable-next-line prettier/prettier
                        title: '5.6 - [Executable] Enable Self-Funding for the Endowment',
                        href: '/dao/proposals/5.6',
                    },
                    {
                        // eslint-disable-next-line prettier/prettier
                        title: '5.5 - [Executable] Funding Request: ENS Public Goods Working Group Term 5 (Q1/Q2)',
                        href: '/dao/proposals/5.5',
                    },
                    {
                        // eslint-disable-next-line prettier/prettier
                        title: '5.4.2 - [Social] Funding Request: ENS Meta-Governance Working Group Term 5 (Q1/Q2)',
                        href: '/dao/proposals/5.4.2',
                    },
                    {
                        // eslint-disable-next-line prettier/prettier
                        title: '5.4.1 - [Social] Funding Request: ENS Meta-Governance Working Group Term 5 (Q1/Q2)',
                        href: '/dao/proposals/5.4.1',
                    },
                    {
                        // eslint-disable-next-line prettier/prettier
                        title: '5.3 - [Social] Determine ENS Labs\' next steps in eth.link litigation',
                        href: '/dao/proposals/5.3',
                    },
                    {
                        title: '5.2 - [Executable] Commence Streams for Service Providers',
                        href: '/dao/proposals/5.2',
                    },
                    {
                        title: '5.1 - [Executable] Upgrade DNSSEC support',
                        href: '/dao/proposals/5.1',
                    },
                ],
            },
            {
                title: 'Proposals Term 4',
                links: [
                    {
                        title: '4.10 - [Social] Transfer ENS Root Key Ownership to the ENS DAO',
                        href: '/dao/proposals/4.10',
                    },
                    {
                        title: '4.9 - [Social] Select providers for EP4.7 streams',
                        href: '/dao/proposals/4.9',
                    },
                    {
                        title: '4.8 - [Social] Amend working groups rules to extend to a full year',
                        href: '/dao/proposals/4.8',
                    },
                    {
                        title: '4.7 - [Social] Create Service Provider Streams',
                        href: '/dao/proposals/4.7',
                    },
                    {
                        title: '4.6 - [Executable] October 2023 Working Group Funding',
                        href: '/dao/proposals/4.6',
                    },
                    {
                        title: '4.5 - [Executable] Endowment permissions to karpatkey - Update #3',
                        href: '/dao/proposals/4.5',
                    },
                    {
                        title: '4.4 - [Executable] ENS Working Group Budget Proposals',
                        href: '/dao/proposals/4.4',
                    },
                    {
                        title: '4.3 - [Executable] Refund Invalid .eth Names',
                        href: '/dao/proposals/4.3',
                    },
                    {
                        title: '4.2 - [Executable] Fund the Endowment (second tranche)',
                        href: '/dao/proposals/4.2',
                    },
                    {
                        title: '4.1 - [Executable] Approve further actions and strategies for the Endowment',
                        href: '/dao/proposals/4.1',
                    },
                ],
            },
            {
                title: 'Proposals Term 3',
                links: [
                    {
                        title: '3.7 - [Social] Approval of ENS Name Normalization Standard (ENSIP-15)',
                        href: '/dao/proposals/3.7',
                    },
                    {
                        title: '3.6 - [Social] Election of new ENS Foundation director',
                        href: '/dao/proposals/3.6',
                    },
                    {
                        title: '3.5 - [Executable] Activate new .eth Controller and Reverse Registrar',
                        href: '/dao/proposals/3.5',
                    },
                    {
                        title: '3.4 - [Executable] Fund the Endowment (first tranche)',
                        href: '/dao/proposals/3.4',
                    },
                    {
                        title: '3.3 - [Executable] Sell ETH to USDC',
                        href: '/dao/proposals/3.3',
                    },
                    {
                        title: '3.2 - [Executable] Q1/Q2 2023 Working Group Funding',
                        href: '/dao/proposals/3.2',
                    },
                    {
                        title: '3.1.3 - [Social] Q1/Q2 2023 Funding Request: Public Goods Working Group',
                        href: '/dao/proposals/3.1.3',
                    },
                    {
                        title: '3.1.2- [Social] Q1/Q2 2023 Funding Request: Meta-Governance Working Group',
                        href: '/dao/proposals/3.1.2',
                    },
                    {
                        title: '3.1.1 - [Social] Q1/Q2 2023 Funding Request: ENS Ecosystem Working Group',
                        href: '/dao/proposals/3.1.1',
                    },
                ],
            },
            {
                title: 'Proposals Term 2',
                links: [
                    {
                        title: '2.2.5 - [Social] Selection of an ENS endowment fund manager',
                        href: '/dao/proposals/2.2.5',
                    },
                    {
                        title: '2.2.4 - [Social] ENS Endaoment RFP',
                        href: '/dao/proposals/2.2.4',
                    },
                    {
                        title: '2.2.3 - [Executable] Q3 & Q4 2022 Public Goods WG Budget',
                        href: '/dao/proposals/2.2.3',
                    },
                    {
                        title: '2.2.2 - [Executable] Q3 & Q4 2022 Ecosystem WG Budget',
                        href: '/dao/proposals/2.2.2',
                    },
                    {
                        title: '2.2.1 - [Executable] Q3 & Q4 2022 Meta-Governance WG Budget',
                        href: '/dao/proposals/2.2.1',
                    },
                    {
                        title: '2.1 - [Executable] Funding True Names Ltd',
                        href: '/dao/proposals/2.1',
                    },
                ],
            },
            {
                title: 'Proposals Term 1',
                links: [
                    {
                        title: '1.9 - [Executable] Fund the Protocol Guild pilot with 200,000 $ENS',
                        href: '/dao/proposals/1.9',
                    },
                    {
                        title: '1.8 - [Social] Working Group Rules',
                        href: '/dao/proposals/1.8',
                    },
                    {
                        title: '1.7 - [Executable] End the $ENS and EP2 airdrops',
                        href: '/dao/proposals/1.7',
                    },
                    {
                        title: '1.6 - [Executable] A DAO-Governed Identity Server',
                        href: '/dao/proposals/1.6',
                    },
                    {
                        title: '1.5 - [Executable] Change to Exponential Premium Price Oracle',
                        href: '/dao/proposals/1.5',
                    },
                    {
                        title: '1.4 - [Executable] Reimburse True Names for expenses and tax obligations incurred for the DAO',
                        href: '/dao/proposals/1.4',
                    },
                    {
                        title: '1.3.4 - [Executable] Q1 & Q2 2022 Public Goods WG Budget',
                        href: '/dao/proposals/1.3.4',
                    },
                    {
                        title: '1.3.3 - [Executable] Q1 & Q2 2022 Community WG Budget',
                        href: '/dao/proposals/1.3.3',
                    },
                    {
                        title: '1.3.2 - [Executable] Q1 & Q2 2022 ENS Ecosystem WG Budget',
                        href: '/dao/proposals/1.3.2',
                    },
                    {
                        title: '1.3.1 - [Executable] Q1 & Q2 2022 Meta-Governance WG Budget',
                        href: '/dao/proposals/1.3.1',
                    },
                    {
                        title: '1.2.2 - [Social] Election of a new Director of The ENS Foundation',
                        href: '/dao/proposals/1.2.2',
                    },
                    {
                        title: '1.2.1 - [Social] Removal of Brantly Millegan as Director of the ENS Foundation',
                        href: '/dao/proposals/1.2.1',
                    },
                    {
                        title: '1.1 - [Executable] Set the temporary premium start price to $100,000',
                        href: '/dao/proposals/1.1',
                    },
                ],
            },
            {
                title: 'Proposals Term 0',
                links: [
                    {
                        title: '0.4 - [Social] Proposal: Creation of Foundational Working Groups and Working Group Rules',
                        href: '/dao/proposals/0.4',
                    },
                    {
                        title: '0.3 - [Social] Amend airdrop proposal to include accidentally returned funds',
                        href: '/dao/proposals/0.3',
                    },
                    {
                        title: '0.2 - [Executable] Retrospective airdrop for accounts that owned another account\'s primary ENS 1',
                        href: '/dao/proposals/0.2',
                    },
                    {
                        title: '0.1 - [Social] Proposal: Transfer ENS Treasury and Contract Ownership',
                        href: '/dao/proposals/0.1',
                    },
                ],
            },
        ],
    },
    {
        name: 'Improvement Proposals',
        href: '/ensip',
        icon: '📜',
        activePattern: /^\/(standards|ensip)(\/.*)?/,
        links: [
            {
                title: '',
                links: [
                    { title: 'What is an ENSIP?', href: '/ensip', icon: '👋' },
                ],
            },
            {
                title: 'Proposals',
                icon: '📖',
                links: [
                    { title: '1 - ENS', href: '/ensip/1' },
                    { title: '2 - Hash Registrar', href: '/ensip/2' },
                    {
                        title: '3 - Reverse Resolution',
                        href: '/ensip/3',
                    },
                    { title: '4 - Contract ABIs', href: '/ensip/4' },
                    { title: '5 - Text Records', href: '/ensip/5' },
                    { title: '6 - DNS-in-ENS', href: '/ensip/6' },
                    { title: '7 - Contenthash', href: '/ensip/7' },
                    {
                        title: '8 - Interface Discovery',
                        href: '/ensip/8',
                    },
                    {
                        title: '9 - Multichain Addresses',
                        href: '/ensip/9',
                    },
                    {
                        title: '10 - Wildcard Resolution',
                        href: '/ensip/10',
                    },
                    {
                        title: '11 - EVM Compatible Chain Address',
                        href: '/ensip/11',
                    },
                    {
                        title: '12 - Avatar Text Records',
                        href: '/ensip/12',
                    },
                    {
                        title: '13 - SAFE Authentication',
                        href: '/ensip/13',
                    },
                    {
                        title: '14 - On-chain Source Parameter',
                        href: '/ensip/14',
                    },
                    {
                        title: '15 - ENS Name Normalization Standard',
                        href: '/ensip/15',
                    },
                    {
                        title: '16 - Offchain Metadata',
                        href: '/ensip/16',
                    },
                    {
                        title: '17 - Gasless DNS Resolution',
                        href: '/ensip/17',
                    },
                    {
                        title: '18 - Profile Text Records',
                        href: '/ensip/18',
                    },
                    {
                        title: '19 - EVM-chain Reverse Resolution', // '19 - Multichain Primary Names',
                        href: '/ensip/19',
                    },
                ],
            },
        ],
    },
    // TODO: Uncomment this
    // {
    //     name: 'Learn',
    //     href: '/learn/protocol',
    //     icon: '🎓',
    //     activePattern: /^\/learn(\/.*)?/,
    //     links: [],
    // },
];
