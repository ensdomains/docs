import { getPageBySlug } from 'data/get_page';
import { ResolvingMetadata } from 'next';

import { Layout } from '@/layout/PageLayout';
import { createMetadata } from '@/lib/metadata';

export const generateMetadata = async (_x: any, parent: ResolvingMetadata) => {
    const {
        pageProperties: { meta },
    } = await getPageBySlug('index');
    const parentMetadata = await parent;

    return createMetadata(
        {
            title: 'ENS Documentation',
            description: meta.description,
            path: '/',
        },
        parentMetadata,
        {
            twitter: {
                card: 'summary_large_image',
            },
            openGraph: {
                type: 'article',
                images: '/opengraph.png',
            },
        }
    );
};

export default async function Page() {
    const { Page, pageProperties } = await getPageBySlug('index');

    return (
        <Layout
            mdxProperties={pageProperties}
            isHome={true}
            programmedSlug={'/'}
        >
            <Page {...pageProperties} />
        </Layout>
    );
}
