import clsx from 'clsx';
import Link from 'next/link';
import { FC, PropsWithChildren } from 'react';
import { FiExternalLink } from 'react-icons/fi';

import { CopyButton } from '../_legacy/CopyButton';
import { getLanguage } from '../languageSorter';
import { LanguageSettings } from '../types/language';

export type CodeSnippetProperties = {
    language: string;
    title?: string;
    preset?: string;
    // Link out to external docs etc
    link?: string;
    // Link to stackblitz
    stackblitz?: string;
    config?: LanguageSettings;
};

export type CodePanelProperties = {
    tag?: string;
    label?: string;
    code?: string;
    hideCopy?: boolean;
    language?: string;
    variant?: string;
    title?: string;
    isChild?: boolean;
    identifier?: string;
} & CodeSnippetProperties;

export const CodePanel: FC<PropsWithChildren<CodePanelProperties>> = ({
    link,
    stackblitz,
    title,
    language,
    variant,
    children,
    identifier,
    isChild,
    code,
}) => {
    // TODO: move this to shiki rehype
    // const focus = (() => {
    //     if (!meta || !meta.includes('focus=')) return [];

    //     const focus = meta.split('focus=')[1].split(',');

    //     return focus.reduce((accumulator, part) => {
    //         const range = part.split(':');

    //         if (range.length === 1) {
    //             accumulator.push(Number.parseInt(range[0]) - 1);
    //         } else {
    //             const start = Number.parseInt(range[0]) - 1;
    //             const end = Number.parseInt(range[1]);

    //             for (let index = start; index < end; index++) {
    //                 accumulator.push(index);
    //             }
    //         }

    //         return accumulator;
    //     }, [] as number[]);
    // })();

    // if (focus.length === 0 || !preReference.current) return;

    // [...(preReference.current.children[0].children as any)].map(
    //     (node, index) => {
    //         if (focus.includes(index)) {
    //             node.classList.add('focus-code');
    //         } else {
    //             node.classList.add(
    //                 'opacity-40',
    //                 'blur-xs',
    //                 'group-hover:blur-0',
    //                 'group-hover:opacity-100',
    //                 'transition-all'
    //             );
    //         }
    //     }
    // );
    const preset = getLanguage(variant ?? language);

    // not sure why this works but it does
    const isStandaloneCodeSnippet = isChild;

    return (
        <div
            className="hidable-code not-prose group"
            data-code-variant={variant ?? title ?? language}
            data-code-group={identifier}
        >
            <div
                className={clsx(
                    'border-ens-light-border dark:border-ens-dark-border overflow-hidden border',
                    isStandaloneCodeSnippet ? 'rounded-xl' : 'rounded-b-xl'
                )}
            >
                {/* {isStandaloneCodeSnippet && preset && (
                    <div className="float-right flex items-center gap-1 pr-3.5 pt-3.5">
                        <div className="h-4 w-4 overflow-hidden rounded-full">
                            <img
                                src={preset?.icon}
                                alt={preset?.name}
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <div>{preset?.name ?? variant ?? language}</div>
                    </div>
                )} */}
                <div className="relative">
                    <pre
                    // ref={preReference}
                    >
                        {children}
                    </pre>
                    {!!code && <CopyButton code={code} />}
                </div>
            </div>
            {(link || stackblitz) && (
                <div className="flex w-full items-center justify-end p-1">
                    <div className="px-2">
                        {link && (
                            <Link
                                href={link}
                                target="_blank"
                                className="text-ens-light-blue-primary dark:text-ens-dark-blue-primary flex items-center gap-1 hover:underline"
                            >
                                <FiExternalLink />
                                Read more
                            </Link>
                        )}
                    </div>
                    <div>
                        {stackblitz && (
                            <Link
                                href={stackblitz}
                                target="_blank"
                                className="text-ens-light-blue-primary dark:text-ens-dark-blue-primary rounded-md p-1 pr-2 text-xs transition hover:bg-gray-100"
                            >
                                <img
                                    src="/icons/stackblitz.svg"
                                    alt="Stackblitz"
                                    className="mr-1 inline-block size-4"
                                />
                                Try it out
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
