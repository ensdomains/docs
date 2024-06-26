import { getPageBySlug } from 'data/get_page';
import { getAllPageSlugs } from 'data/get_pages';
import { ResolvingMetadata } from 'next';

import { ClientOnly } from '@/ClientOnly';
import { Layout } from '@/layout/PageLayout';
import { redirectToIndex } from '@/layout/RouteCheck';
import { createMetadata } from '@/lib/metadata';
import { getLinkHref } from '@/utils/contributorHelper';

type PageProperties = {
    params: { slug: string[] };
};

export const generateMetadata = async (
    { params }: PageProperties,
    parent: ResolvingMetadata
) => {
    const {
        pageProperties: { meta },
    } = await getPageBySlug(params.slug.join('/'));
    const parentMetadata = await parent;

    return createMetadata(
        {
            title: `${meta.title} | ENS Docs`,
            description: meta.description,
            path: params.slug.join('/'),
        },
        parentMetadata,
        {
            openGraph: {
                type: 'article',
                title: meta.title,
                description: meta.description,
                images: `/opengraph/${params.slug.join('/')}.png`,
                tags: ['ENS', 'Ethereum Name Service', '.eth'],
                authors: meta.contributors?.map((contributor) =>
                    getLinkHref(contributor)
                ),
            },
            twitter: {
                card: 'summary_large_image',
            },
            authors: meta.contributors?.map((contributor) => ({
                name: contributor,
                url: getLinkHref(contributor),
            })),
        }
    );
};

// eslint-disable-next-line unicorn/prevent-abbreviations
export async function generateStaticParams() {
    const pages = await getAllPageSlugs();

    return pages.map((slug) => ({
        slug: slug.split('/'),
    }));
}

const Page = async ({ params }: PageProperties) => {
    console.log('🖥️ -> ' + params.slug.join('/'));

    if (params.slug.length == 1 && params.slug[0] == 'index') {
        return <ClientOnly child={redirectToIndex} />;
    }

    const { Page, pageProperties } = await getPageBySlug(params.slug.join('/'));

    return (
        <Layout
            mdxProperties={pageProperties}
            programmedSlug={'/' + params.slug.join('/')}
        >
            <Page {...pageProperties} />
        </Layout>
    );
};

export default Page;
