import { getPageBySlug } from 'data/get_page';
import { getAllPageSlugs } from 'data/get_pages';
import { NextResponse } from 'next/server';

import { navigation } from '../../local/config/navigation';

const { protocol } = navigation;

export async function GET() {
    if (process.env.NODE_ENV !== 'production') return NextResponse.json([]);

    console.log('🔍 Generating Search Index');

    const slugs = await getAllPageSlugs();

    const posts = await Promise.all(
        slugs.map(async (slug) => {
            const tag =
                protocol.find((section) => {
                    if (slug == 'index' && section.name == 'Intro') return true;

                    if (slug == 'dissapeared') return false;

                    return section.activePattern.test(`/${slug}`);
                })?.name || '';
            const { pageProperties } = await getPageBySlug(slug);

            return {
                pageProperties,
                slug,
                tag,
            };
        })
    );

    const data = posts.map((post) => ({
        ...post.pageProperties.meta,
        id: post.slug.replace('/', '--').replace(/[^\w-]/g, ''),
        slug: post.slug,
        tag: post.tag,
    }));

    return NextResponse.json(data);
}
