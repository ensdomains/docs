import { MDXProps } from 'mdx/types';
import { notFound } from 'next/navigation';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { cache, ReactNode } from 'react';

import {
    MdxPageProps as MdxPageProperties,
    mdxPagePropsSchema as mdxPagePropertiesSchema,
} from '../src/lib/mdxPageProps';

const contentDirectory = join(process.cwd(), '../docs');

const _getPageBySlug = async (
    // ex 'index' or 'web' or 'web/quickstart'
    slug: string
): Promise<{
    Page: (_properties: MDXProps) => ReactNode;
    pageProperties: MdxPageProperties;
}> => {
    console.log('🔍 -> ' + slug);

    const potentialPaths = [slug, slug + '/index'];
    let foundPath: string | undefined;

    for (const path of potentialPaths) {
        const exists = existsSync(join(contentDirectory, path + '.mdx'));

        if (exists) {
            foundPath = path;
            break;
        }
    }

    if (!foundPath) {
        console.warn('Tried to find page by slug but couldnt find:', slug);

        return notFound();
    }

    const file = await import('../../docs/' + foundPath + '.mdx');

    const { default: Page, ...rawPageProperties } =
        file as MdxPageProperties & {
            default: (_properties: MDXProps) => ReactNode;
        };

    const pageProperties = mdxPagePropertiesSchema.parse(rawPageProperties);

    if (!pageProperties.meta.title || pageProperties.meta.title == '')
        pageProperties.meta.title = pageProperties.title;

    return {
        pageProperties,
        Page,
    };
};

export const getPageBySlug = cache(_getPageBySlug);
