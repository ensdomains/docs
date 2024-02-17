import { MDXComponents } from 'mdx/types';

import { demos } from './demos';
import { extras } from './extras';
import { prose } from './prose';

/**
 * Content Components
 * This includes examples, demos, and other content that is not suitable for markdown.
 * Names are transient and must match the name in the mdx file.
 */
export const contentComponents = {
    // Links, Buttons, Images
    ...prose,
    // Interactive Demos
    ...demos,
    // Other Content
    ...extras,
} as any as Record<string, MDXComponents>;
