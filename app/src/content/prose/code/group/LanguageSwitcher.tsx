'use client';

import { FC, useCallback, useEffect, useState } from 'react';

import { sortLanguagesByPreset } from '../languageSorter';
import { CodeSnippetProperties } from '../snippet/CodeSnippet';

const EVENT = 'l-language-';

class LLanguageEvent extends Event {
    constructor(language: string, preset: string) {
        super(EVENT + preset);
        this.language = language;
    }

    language: string;
}

export const LanguageSwitcher: FC<{
    snippets: CodeSnippetProperties[];
    identifier: string;
    presets: string;
}> = ({ snippets, identifier, presets }) => {
    console.log('rerender');
    // Get active language from localstorage
    const [activeLanguage, setActiveLanguage] = useState<string>(
        snippets.at(0).preset
    );

    const setPreset = useCallback(
        (preferred_preset_key: string) => {
            console.log(
                'From: ' + activeLanguage + ' To: ' + preferred_preset_key
            );

            // eslint-disable-next-line prefer-destructuring
            const best_match = sortLanguagesByPreset(
                snippets.map((s) => s.preset),
                preferred_preset_key
            );

            setActiveLanguage(best_match);
        },
        [setActiveLanguage]
    );

    useEffect(() => {
        const entries = document.querySelectorAll(
            '[data-code-group="' + identifier + '"]'
        );

        for (const entry of entries) {
            if (
                // @ts-ignore
                entry.dataset.codeVariant === activeLanguage
            ) {
                entry.classList.remove('hidden');
            } else {
                entry.classList.add('hidden');
            }
        }
    }, [activeLanguage]);

    useEffect(() => {
        console.log('onUpdateSnippets', activeLanguage);

        // when page first load
        // load query params
        const urlParameters = new URLSearchParams(
            (location as Location).search
        );

        // Prioritize query params
        // Then localstorage
        // Then default to first snippet
        const default_preset =
            urlParameters.get('preset') ??
            localStorage.getItem(EVENT + presets) ??
            snippets.at(0).preset;

        setPreset(default_preset.toLowerCase());

        const hook = (language: LLanguageEvent) => {
            setPreset(language.language);
        };

        // @ts-ignore
        document.addEventListener(EVENT + presets, hook);

        return () => {
            // @ts-ignore
            document.removeEventListener(EVENT + presets, hook);
        };
    }, [snippets]);

    if (!activeLanguage) return <></>;

    return (
        <div className="absolute left-auto right-2 top-1/2 w-fit -translate-y-1/2 text-right text-sm">
            <select
                onChange={(event) => {
                    localStorage.setItem(EVENT + presets, event.target.value);
                    // Inform the other codeblocks
                    document.dispatchEvent(
                        new LLanguageEvent(event.target.value, presets)
                    );
                }}
                value={activeLanguage}
                className="rounded-lg bg-ens-light-background-primary px-3 py-2 dark:bg-ens-dark-background-primary"
            >
                {snippets.map((snippet) => {
                    return (
                        <option value={snippet.preset} key={snippet.preset}>
                            {snippet.title ??
                                snippet.config?.name ??
                                snippet.preset}
                        </option>
                    );
                })}
            </select>
        </div>
    );
};
