'use client';

import { MagnifyingGlassSVG } from '@ensdomains/thorin';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { FiLoader } from 'react-icons/fi';
import useSWR from 'swr';

import { searchFetcher } from './lib/fetcher';
import { SearchResults } from './SearchResults';

export const ResponsiveSearch = () => {
    const [tag, setTag] = useState('All');
    const [search, setSearch] = useState('');
    const { data, error, isLoading, isValidating } = useSWR(
        { search, tag },
        searchFetcher,
        {
            keepPreviousData: true,
        }
    );
    const [select, setSelect] = useState(-2);

    const tags = [
        'All',
        'Intro',
        'Using ENS',
        'Smart Contracts',
        'Governance',
        'Improvement Proposals',
    ];

    useEffect(() => {
        if (select !== -1) return;

        const element = document.querySelector(
            '.filter-selected'
        ) as HTMLElement;

        if (element) {
            element.focus();
        }
    }, [select]);

    const selectReference = useRef(select);

    selectReference.current = select;

    const tagReference = useRef(tag);

    tagReference.current = tag;

    useEffect(() => {
        const thateventlistener = (event) => {
            if (selectReference.current !== -1) return;

            const index = tags.indexOf(tagReference.current);

            switch (event.key) {
                case 'ArrowRight': {
                    const realIndex = Math.min(index + 1, tags.length - 1);

                    event.preventDefault();
                    // Increment the index, except if it's the last element
                    setTag(tags[realIndex]);
                    const element = document.querySelectorAll('.filter-tag')[
                        realIndex
                    ] as HTMLElement;

                    if (element) {
                        element.focus();
                    }

                    break;
                }
                case 'ArrowLeft': {
                    const realIndex = Math.max(index - 1, 0);

                    event.preventDefault();
                    setTag(tags[realIndex]);
                    const element = document.querySelectorAll('.filter-tag')[
                        realIndex
                    ] as HTMLElement;

                    if (element) {
                        element.focus();
                    }

                    break;
                }
            }
        };

        document.addEventListener('keydown', thateventlistener);

        return () => {
            document.removeEventListener('keydown', thateventlistener);
        };
    }, []);

    return (
        <div
            id="searchbar"
            className="w-full rounded-2xl bg-ens-light-background-primary text-[#18181b] dark:bg-ens-dark-background-primary dark:text-white"
        >
            <div className="space-y-3 p-4">
                <div className="relative z-10">
                    <input
                        type="text"
                        onClick={() => {
                            setSelect(-2);
                        }}
                        className="w-full rounded-xl border border-ens-light-border py-2 pl-10 text-xl outline-ens-dark-blue-primary focus:outline-ens-light-blue-primary dark:border-ens-dark-border"
                        placeholder="Search Content..."
                        // eslint-disable-next-line jsx-a11y/no-autofocus
                        autoFocus={true}
                        id="search-input"
                        onChange={(event) => {
                            setSearch(event.target.value);
                        }}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                                const element = document.querySelector(
                                    '#search-result-link-0'
                                );

                                if (element && element instanceof HTMLElement) {
                                    element.focus();
                                    element.click();
                                }
                            }
                        }}
                    />
                    <div className="absolute inset-y-0 left-3 flex h-full items-center text-neutral-300">
                        <MagnifyingGlassSVG />
                    </div>
                    <div className="absolute inset-y-0 right-3 flex h-full items-center text-neutral-300">
                        {isLoading && <FiLoader />}
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <div className="flex w-fit gap-2 whitespace-nowrap">
                        {tags.map((item, _index) => (
                            <button
                                className={clsx(
                                    'tag filter-tag',
                                    tag === item
                                        ? 'tag-blue filter-selected'
                                        : 'tag-grey'
                                )}
                                key={_index}
                                onClick={() => {
                                    setTag(item);
                                    setSelect(-1);
                                }}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <div className="w-full">
                <div className="w-full">
                    <SearchResults
                        data={data}
                        select={select}
                        search={search}
                        setSelect={setSelect}
                    />
                </div>
            </div>
        </div>
    );
};
