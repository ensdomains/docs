/* eslint-disable unicorn/prevent-abbreviations */
import { z } from 'zod';

export const mdxPagePropsSchema = z
    .object({
        /**
         * Auto generated title from first h1 element
         */
        title: z.string().optional(),
        /**
         * Meta data
         */
        meta: z.object({
            /**
             * Optional title, defaults to auto generated title
             */
            title: z.string().default(''),
            description: z.string(),
            /**
             * Emoji for the Resource
             */
            emoji: z.string().default('📑'),
            /**
             * Whether or not to show the details section
             */
            showDetailsSection: z.boolean().default(true),
            /**
             * Optional list of github usernames of contributors
             * @example ['lucemans', 'svemat01']
             */
            contributors: z
                .array(
                    // Validate using github username regex (source: https://github.com/shinnn/github-username-regex/blob/master/index.js)
                    z.string().regex(/^[\da-z](?:[\da-z]|-(?=[\da-z])){0,38}$/i)
                )
                .optional(),
            /**
             * ENSIP Additional Context
             */
            ensip: z
                .object({
                    created: z.string().optional(),
                    status: z.enum(['draft', 'final', 'obsolete']).optional(),
                })
                .optional(),
            /**
             * DAO Proposal Additional Context
             */
            proposal: z
                .object({
                    created: z.string().optional(),
                    type: z.enum(['social', 'executable']).optional(),
                    status: z.enum(['draft', 'final']).optional(),
                    // Discourse Topic ID (ex 12345)
                    discourse: z.string().optional(),
                    // Snapshot Proposal ID (ex 0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef)
                    snapshot: z.string().optional(),
                    // Tally Proposal ID (ex )
                    tally: z.string().optional(),
                })
                .optional(),
        }),
        sections: z.array(
            z.object({
                title: z.string(),
                navtitle: z.string(),
                id: z.string().optional(),
                indent: z.string().optional(),
            })
        ),
        filepath: z.string({
            errorMap: (error, ctx) => {
                if (
                    error.code === z.ZodIssueCode.invalid_type &&
                    error.received === 'undefined'
                ) {
                    return {
                        message:
                            'Missing filepath variable from recmaExportFilepath plugin',
                    };
                }

                return { message: ctx.defaultError };
            },
        }),
        commit: z
            .object(
                {
                    hash: z.string().optional(),
                    date: z.number().optional(),
                },
                {
                    errorMap: (error, ctx) => {
                        if (
                            error.code === z.ZodIssueCode.invalid_type &&
                            error.received === 'undefined'
                        ) {
                            return {
                                message:
                                    'Missing commit variable from recmaExportCommit plugin',
                            };
                        }

                        return { message: ctx.defaultError };
                    },
                }
            )
            .optional(),
        plainContent: z.string({
            errorMap: (error, ctx) => {
                if (
                    error.code === z.ZodIssueCode.invalid_type &&
                    error.received === 'undefined'
                ) {
                    return {
                        message:
                            'Missing plainContent variable from rehypeExportContent plugin',
                    };
                }

                return { message: ctx.defaultError };
            },
        }),
    })
    .passthrough();

export type MdxPageProps = z.infer<typeof mdxPagePropsSchema>;
export type MdxMetaProps = z.infer<
    (typeof mdxPagePropsSchema)['shape']['meta']
>;
export type MdxENSIPProps = z.infer<
    (typeof mdxPagePropsSchema)['shape']['meta']['shape']['ensip']
>;
export type MdxDAOProposalProps = z.infer<
    (typeof mdxPagePropsSchema)['shape']['meta']['shape']['proposal']
>;
