import { mdxAnnotations } from 'mdx-annotations';
// import recmaNextjsStaticProps from 'recma-nextjs-static-props';
import { simpleGit } from 'simple-git';

const cwd = process.cwd().replace(/\/app$/, '');

/**
 * @type {import('unified').Plugin<[], import('estree').Program>}
 */
const recmaExportFilepath = () => {
    return (tree, file) => {
        const relativePath = file.path.replace(cwd, '');

        tree.body.push({
            type: 'ExportNamedDeclaration',
            declaration: {
                type: 'VariableDeclaration',
                kind: 'const',
                declarations: [
                    {
                        type: 'VariableDeclarator',
                        id: {
                            type: 'Identifier',
                            name: 'filepath',
                        },
                        init: {
                            type: 'Literal',
                            value: relativePath,
                        },
                    },
                ],
            },
        });
    };
};

/** @type {import('simple-git').SimpleGit} */
let git;

/**
 * @type {import('unified').Plugin<[], import('estree').Program>}
 */
const recmaExportCommit = () => {
    return async (tree, file) => {
        const filePath = file.path;

        if (!git) git = simpleGit();

        const log = await git
            .log({
                file: filePath,
                maxCount: 1,
                format: { hash: '%h', date: '%at' },
            })
            .then((log) => {
                if (log.total === 0) return;

                return {
                    hash: log.latest.hash,
                    date: Number(log.latest.date) * 1000,
                };
            })
            .catch((error) => {
                console.error(error);
            });

        if (!log) return;

        tree.body.push({
            type: 'ExportNamedDeclaration',
            declaration: {
                type: 'VariableDeclaration',
                kind: 'const',
                declarations: [
                    {
                        type: 'VariableDeclarator',
                        id: {
                            type: 'Identifier',
                            name: 'commit',
                        },
                        init: {
                            type: 'ObjectExpression',
                            properties: [
                                {
                                    type: 'Property',
                                    key: {
                                        type: 'Identifier',
                                        name: 'hash',
                                    },
                                    value: {
                                        type: 'Literal',
                                        value: log.hash,
                                    },
                                    kind: 'init',
                                },
                                {
                                    type: 'Property',
                                    key: {
                                        type: 'Identifier',
                                        name: 'date',
                                    },
                                    value: {
                                        type: 'Literal',
                                        value: log.date,
                                    },
                                    kind: 'init',
                                },
                            ],
                        },
                    },
                ],
            },
        });
    };
};

export const recmaPlugins = [
    /**
     * Add support for annotations to MDX.
     * An annotation is a JavaScript object associated with an MDX node. The object properties are passed to the resulting JSX element as props.
     * @see https://www.npmjs.com/package/mdx-annotations
     */
    mdxAnnotations.recma,
    /**
     * Add an `export const filepath` to MDX with the relative path to the file.
     */
    recmaExportFilepath,
    /**
     * Add an `export const commit` to MDX with the latest commit hash and date.
     */
    recmaExportCommit,
];
