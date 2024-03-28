import { FC, ReactNode } from 'react';

import { CodeSnippetProperties } from '../snippet/CodeSnippet';
import { LanguageSwitcher } from './LanguageSwitcher';

export const CodeGroupHeader: FC<{
    snippets: {
        element: ReactNode;
        data: CodeSnippetProperties;
    }[];
    identifier: string;
    title: string;
    presets: string;
}> = ({ title, snippets, identifier, presets }) => {
    const hasTabs = snippets.length > 1;

    if (!title && !hasTabs) {
        return;
    }

    return (
        <div className="border-ens-light-border bg-ens-light-grey-surface dark:border-ens-dark-border dark:bg-ens-dark-grey-surface relative flex min-h-[calc(theme(spacing.12)+1px)] items-center justify-between gap-x-4 rounded-t-lg border border-b-0 px-4">
            {title && (
                <div className="text-ens-light-text-primary dark:text-ens-dark-text-primary text-base">
                    {title}
                </div>
            )}
            {hasTabs && (
                <LanguageSwitcher
                    snippets={snippets.map((entry) => entry.data)}
                    identifier={identifier}
                    presets={presets}
                />
            )}
        </div>
    );
};
