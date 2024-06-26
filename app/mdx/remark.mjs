import { mdxAnnotations } from 'mdx-annotations';
// import mdxmermaid from 'mdx-mermaid';
import gfm from 'remark-gfm';

export const remarkPlugins = [
    /**
     * Add support for annotations to MDX.
     * An annotation is a JavaScript object associated with an MDX node. The object properties are passed to the resulting JSX element as props.
     * @see https://www.npmjs.com/package/mdx-annotations
     */
    mdxAnnotations.remark,
    /**
     * Add support for GitHub Flavored Markdown.
     */
    gfm,
    // [mdxmermaid, { output: 'svg' }],
];
