import { createHash } from 'node:crypto';
import { Children, cloneElement, FC, PropsWithChildren } from 'react';

import {
    CodePanel,
    CodeSnippetProperties,
} from '#/content/prose/code/snippet/CodeSnippet';

import { getLanguage } from '../languageSorter';
import { CodeGroupHeader } from './CodeGroupHeader';

export type CodeGroupProperties = {
    title?: string;
    isChild?: boolean;
    // Key for what type of presets to use
    presets?: string;
};

export const CodeGroup: FC<PropsWithChildren<CodeGroupProperties>> = ({
    children,
    title,
    presets = 'code',
    ...properties
}) => {
    // Generate a unique identifier to keep track of this code group across dev reloads
    const identifier = createHash('sha256')
        .update(title ?? Math.round(Math.random() * 10_000).toString())
        .digest('hex')
        .slice(0, 8);

    const codeSnippets = Children.map(children, (child) => {
        //
        const preset =
            child['props'].preset ??
            child['props'].variant ??
            child['props'].title ??
            child['props'].language;

        return {
            element: child,
            data: {
                title: child['props'].title,
                language: child['props'].language,
                preset,
                config: getLanguage(preset || child['props'].language),
            } as CodeSnippetProperties,
        };
    });

    const hasTabs = Children.count(children) > 1;

    return (
        <div className="text-ens-light-text-primary dark:text-ens-dark-text-primary my-6 bg-[--var(--shiki-color-background)] ">
            <CodeGroupHeader
                snippets={codeSnippets}
                title={title}
                identifier={identifier.toString()}
                presets={presets}
            />
            {hasTabs ? (
                <div className="not-prose">
                    {codeSnippets.map((child) => {
                        return cloneElement(child.element as any, {
                            isChild: true,
                            data: child.data,
                            identifier,
                            title: child.data.title,
                        });
                    })}
                </div>
            ) : (
                <CodePanel {...(properties as any)} identifier={identifier}>
                    {codeSnippets.map((v) => v.element)}
                </CodePanel>
            )}
        </div>
    );
};
