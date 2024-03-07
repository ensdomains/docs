import type { MDXComponents } from 'mdx/types';

import { contentComponents } from '#/content';

/**
 * This file needs to be named `mdx-components.ts` and needs to stay in this directory.
 * Moving it will cause the project to fail to build. Thank you next.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        ...contentComponents,
        ...components,
    };
}
