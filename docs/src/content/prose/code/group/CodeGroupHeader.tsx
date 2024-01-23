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
        <div className="relative flex min-h-[calc(theme(spacing.12)+1px)] items-center justify-between gap-x-4 rounded-t-lg border border-b-0 border-ens-light-border bg-ens-light-grey-surface px-4 dark:border-ens-dark-border dark:bg-ens-dark-grey-surface">
            {title && (
                <div className="text-base text-ens-light-text-primary dark:text-ens-dark-text-primary">
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
