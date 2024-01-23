import { Button } from '@/components/Button';
import { Heading } from '@/components/mdx/heading';

const guides = [
    {
        href: '/forward-resolution',
        name: 'Forward Resolution',
        description:
            'Learn how to go from name to address, fetch records, and more.',
    },
    {
        href: '/reverse-resolution',
        name: 'Reverse Resolution',
        description:
            'Learn how to go from address to name, using the Reverse Registrar.',
    },
    {
        href: '/writing-a-resolver',
        name: 'Writing a Resolver',
        description:
            'Learn how to write a resolver to resolve on-chain names and subnames.',
    },
    {
        href: '/ccip',
        name: 'Cross Chain Interoperability',
        description:
            'Explore the CCIP, the protocol that allows your ENS resolvers to be off-chain or on other chains.',
    },
    {
        href: '/dns',
        name: 'DNSSEC',
        description:
            'Discover the DNSSEC functionality and use your DNS name in the world of ENS.',
    },
    // {
    //   href: '/pagination',
    //   name: 'Pagination',
    //   description: 'Understand how to work with paginated responses.',
    // },
    // {
    //   href: '/errors',
    //   name: 'Errors',
    //   description:
    //     'Read about the different types of errors returned by the API.',
    // },
    // {
    //   href: '/webhooks',
    //   name: 'Webhooks',
    //   description:
    //     'Learn how to programmatically configure webhooks for your app.',
    // },
    {
        href: '/quickstart-dapp',
        name: 'Identity in your dApps',
        description:
            'Learn how to programmatically configure webhooks for your app.',
    },
];

export function Guides() {
    return (
        <div className="my-16 xl:max-w-none">
            <Heading level={2} id="guides" tag={undefined} label={undefined}>
                Guides
            </Heading>
            <div className="not-prose mt-4 grid grid-cols-1 gap-8 border-t border-zinc-900/5 pt-10 dark:border-white/5 sm:grid-cols-2 xl:grid-cols-4">
                {guides.map((guide) => (
                    <div key={guide.href}>
                        <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">
                            {guide.name}
                        </h3>
                        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                            {guide.description}
                        </p>
                        <p className="mt-4">
                            <Button
                                className=""
                                href={guide.href}
                                variant="text"
                                arrow="right"
                            >
                                Read more
                            </Button>
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
