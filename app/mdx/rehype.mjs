import { slugifyWithCounter } from '@sindresorhus/slugify';
import * as acorn from 'acorn';
import { toString } from 'mdast-util-to-string';
import { mdxAnnotations } from 'mdx-annotations';
import rehypeMdxTitle from 'rehype-mdx-title';
import {
    bundledLanguages,
    createCssVariablesTheme,
    getHighlighter,
} from 'shiki';
import { visit } from 'unist-util-visit';
/**
 * @type {import('unified').Plugin[]}
 */
function rehypeMermaidWrapper() {
    return (tree) => {
        visit(tree, 'element', (node, _nodeIndex, parentNode) => {
            if (
                node.tagName === 'svg' &&
                node.properties.role === 'graphics-document document'
            ) {
                const mermaidDiv = {
                    type: 'element',
                    tagName: 'div',
                    properties: {
                        className: ['mermaid'],
                    },
                    children: [node],
                };

                parentNode.children.splice(_nodeIndex, 1, mermaidDiv);
            }
        });
    };
}

function rehypeParseCodeBlocks() {
    return (tree) => {
        visit(tree, 'element', (node, _nodeIndex, parentNode) => {
            if (node.tagName === 'code' && node.properties.className) {
                parentNode.properties.language =
                    node.properties.className[0]?.replace(/^language-/, '');
            }
        });
    };
}

const rehypeShikiFromHighlighter = function (highlighter, options) {
    const {
        addLanguageClass = false,
        parseMetaString,
        cache,
        ...rest
    } = options;
    const prefix = 'language-';

    return function (tree) {
        visit(tree, 'element', (node, index, parent) => {
            if (!parent || index == undefined || node.tagName !== 'pre') return;

            const [head] = node.children;

            if (
                !head ||
                head.type !== 'element' ||
                head.tagName !== 'code' ||
                !head.properties
            )
                return;

            const [textNode] = head.children;

            const classes = head.properties.className;

            if (!Array.isArray(classes)) return;

            const language = classes.find(
                (d) => typeof d === 'string' && d.startsWith(prefix)
            );

            if (typeof language !== 'string') return;

            const code = toString(textNode);

            node.properties.code = textNode.value;

            const cachedValue = cache?.get(code);

            if (cachedValue) {
                textNode.value = cachedValue;

                return;
            }

            const metaString =
                head.data?.meta ?? head.properties.metastring ?? '';

            const meta = parseMetaString?.(metaString, node, tree) || {};
            const codeOptions = {
                ...rest,
                lang: language.slice(prefix.length),
                meta: {
                    ...rest.meta,
                    ...meta,
                    __raw: metaString,
                },
                transformers: [
                    {
                        root: ({ children }) => children.at(0),
                        pre: ({ children }) => children.at(0),
                        code: ({ children }) => children,
                    },
                ],
            };

            if (addLanguageClass) {
                codeOptions.transformers || (codeOptions.transformers = []);
                codeOptions.transformers.push({
                    name: 'rehype-shiki:code-language-class',
                    code(node2) {
                        this.addClassToHast(node2, language);

                        return node2;
                    },
                });
            }

            try {
                const fragment = highlighter.codeToHtml(code, codeOptions);

                cache?.set(code, fragment);
                textNode.value = fragment;
            } catch (error) {
                if (options.onError) options.onError(error);
                else throw error;
            }
        });
    };
};

const rehypeShiki = function (options = {}) {
    const themeNames = (
        'themes' in options ? Object.values(options.themes) : [options.theme]
    ).filter(Boolean);
    const langs = options.langs || Object.keys(bundledLanguages);
    // eslint-disable-next-line unicorn/no-this-assignment
    const context = this;
    let promise;

    return async function (tree) {
        if (!promise) {
            promise = getHighlighter({
                themes: themeNames,
                langs,
            }).then((highlighter) =>
                rehypeShikiFromHighlighter.call(context, highlighter, options)
            );
        }

        const handler = await promise;

        return handler(tree);
    };
};

const shikiCssTheme = createCssVariablesTheme({
    name: 'css-variables',
    variablePrefix: '--shiki-',
    variableDefaults: {},
    fontStyle: true,
});

function rehypeSlugify() {
    return (tree) => {
        const slugify = slugifyWithCounter();

        visit(tree, 'element', (node) => {
            if (
                ['h2', 'h3', 'h4'].includes(node.tagName) &&
                !node.properties.id
            ) {
                node.properties.id = slugify(toString(node));
            }
        });
    };
}

function rehypeAddMDXExports(getExports) {
    return (tree) => {
        const exports = Object.entries(getExports(tree));

        for (const [name, value] of exports) {
            for (const node of tree.children) {
                if (
                    node.type === 'mdxjsEsm' &&
                    new RegExp(`export\\s+const\\s+${name}\\s*=`).test(
                        node.value
                    )
                ) {
                    return;
                }
            }

            const exportString = `export const ${name} = ${value}`;

            tree.children.push({
                type: 'mdxjsEsm',
                value: exportString,
                data: {
                    estree: acorn.parse(exportString, {
                        sourceType: 'module',
                        ecmaVersion: 'latest',
                    }),
                },
            });
        }
    };
}

function getSections(node) {
    const sections = [];

    for (const child of node.children ?? []) {
        if (
            child.type === 'element' &&
            ['h2', 'h3', 'h4'].includes(child.tagName)
        ) {
            const indent = ['h2', 'h3', 'h4'].indexOf(child.tagName);

            sections.push(
                `{title: ${JSON.stringify(
                    toString(child)
                )}, navtitle: ${JSON.stringify(
                    child.properties.navtitle ?? ''
                )}, id: ${JSON.stringify(
                    child.properties.id
                )}, indent: '${indent}', ...${child.properties.annotation}}`
            );
        } else if (child.children) {
            sections.push(...getSections(child));
        }
    }

    return sections;
}

/**
 * @type {import('unified').Plugin[]}
 */
const rehypeExportContent = () => {
    return (tree) => {
        const test = toString(tree, {
            includeHtml: false,
        }).replace(/\n/g, ' ');

        const exportString = `export const plainContent = ${JSON.stringify(
            test
        )}`;

        tree.children.push({
            type: 'mdxjsEsm',
            value: exportString,
            data: {
                estree: acorn.parse(exportString, {
                    sourceType: 'module',
                    ecmaVersion: 'latest',
                }),
            },
        });
    };
};

export const rehypePlugins = [
    /**
     * Add support for annotations to MDX.
     * An annotation is a JavaScript object associated with an MDX node. The object properties are passed to the resulting JSX element as props.
     * @see https://www.npmjs.com/package/mdx-annotations
     */
    mdxAnnotations.rehype,
    rehypeExportContent,
    /**
     * Add support for mermaid diagrams to MDX.
     */
    // [rehypeMermaid({ browser: 'chromium' }), { strategy: 'inline-svg' }],
    /**
     * Wraps all mermaid segments in a div with class="mermaid"
     */
    rehypeMermaidWrapper,
    /**
     * Parse code blocks to add the language to the properties
     */
    rehypeParseCodeBlocks,
    /**
     * Add syntax highlighting to code blocks
     */
    [
        rehypeShiki,
        {
            theme: shikiCssTheme,
            addLanguageClass: true,
        },
    ],
    /**
     * Add an id to h2 elements
     */
    rehypeSlugify,
    /**
     * Adds export const title = '...'; to the top of the MDX file from the first h1 element
     * @see https://github.com/remcohaszing/rehype-mdx-title
     */
    rehypeMdxTitle,
    /**
     * Adds export const sections = [{...}, {...}, ...]; to the top of the MDX file from the h2 elements
     */
    [
        rehypeAddMDXExports,
        (tree) => ({
            sections: `[${getSections(tree).join(',')}]`,
        }),
    ],
];
