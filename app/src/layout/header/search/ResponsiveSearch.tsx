'use client';

import { MagnifyingGlassSVG } from '@ensdomains/thorin';
import clsx from 'clsx';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FC, useEffect, useRef, useState } from 'react';
import { FiLoader } from 'react-icons/fi';
import useSWR from 'swr';

import { useEvent } from '@/lib/useEvent';

import { searchFetcher } from './lib/fetcher';
import { SearchResults } from './SearchResults';

const Tag: FC<{
    tag: string;
    index: number;
    currentTag: string;
    setCurrentTag: (tag: string) => void;
    selectedTag: number;
    setSelectedTag: (tag: number) => void;
    select: number;
    setSelect: (select: number) => void;
}> = ({
    tag,
    index,
    currentTag,
    setCurrentTag,
    selectedTag,
    setSelectedTag,
    select,
    setSelect,
}) => {
    const tagReference = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (index === selectedTag && select === -1) {
            tagReference.current?.focus();
        }
    }, [selectedTag, select]);

    return (
        <button
            className={clsx(
                'tag focus:outline-1',
                tag === currentTag ? 'tag-blue' : 'tag-grey'
            )}
            onFocus={() => {
                if (selectedTag !== index) {
                    setSelectedTag(index);
                    setSelect(-1);
                }
            }}
            onClick={() => {
                setCurrentTag(tag);
            }}
            onKeyDown={(event) => {
                if (event.key === 'Enter') {
                    setCurrentTag(tag);
                }
            }}
            ref={tagReference}
        >
            {tag}
        </button>
    );
};
const TAGS = [
    'All',
    'Intro',
    'Using ENS',
    'Smart Contracts',
    'Governance',
    'Improvement Proposals',
];

const Tags: FC<{
    tag: string;
    setTag: (tag: string) => void;
    select: number;
    setSelect: (select: number) => void;
}> = ({ tag, setTag, select, setSelect }) => {
    const [selectedTag, setSelectedTag] = useState(0);

    useEvent('keydown', (event) => {
        if (select !== -1) return;

        switch (event.key) {
            case 'ArrowRight': {
                event.preventDefault();
                setSelectedTag((selectedTag) => {
                    return Math.min(selectedTag + 1, TAGS.length - 1);
                });

                if (select !== -1) {
                    setSelect(-1);
                }

                break;
            }
            case 'ArrowLeft': {
                event.preventDefault();
                setSelectedTag((selectedTag) => {
                    return Math.max(selectedTag - 1, 0);
                });

                if (select !== -1) {
                    setSelect(-1);
                }

                break;
            }
            case 'Enter': {
                event.preventDefault();
                setTag(TAGS[selectedTag]);
                break;
            }
        }
    });

    return TAGS.map((item, _index) => (
        <Tag
            tag={item}
            key={item}
            selectedTag={selectedTag}
            setSelectedTag={setSelectedTag}
            currentTag={tag}
            setCurrentTag={setTag}
            select={select}
            setSelect={setSelect}
            index={_index}
        />
    ));
};

export const ResponsiveSearch = () => {
    const [tag, setTag] = useState('All');
    const searchParameters = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const [search, setSearch] = useState(searchParameters.get('q') || '');

    const { data, error, isLoading, isValidating } = useSWR(
        { search, tag },
        searchFetcher,
        {
            keepPreviousData: true,
        }
    );

    const [select, setSelect] = useState(-2);
    const showSearch = search.length > 0 && data;

    useEvent('keydown', (event) => {
        switch (event.key) {
            case 'ArrowDown': {
                event.preventDefault();
                setSelect((select) => {
                    return Math.min(
                        select + 1,
                        (search.length > 0 && data?.hits.length) - 1
                    );
                });

                break;
            }
            case 'ArrowUp': {
                event.preventDefault();
                setSelect((select) => {
                    return Math.max(select - 1, -2);
                });

                break;
            }
            case 'Enter': {
                break;
            }
        }
    });

    const inputReference = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (select === -2) {
            inputReference.current?.focus();
        }
    }, [select]);

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
                        value={search}
                        onChange={(event) => {
                            setSearch(event.target.value);
                            router.replace(
                                pathname +
                                    '?q=' +
                                    encodeURIComponent(event.target.value || '')
                            );
                        }}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                                const firstHit = data?.hits?.at(0);

                                if (firstHit) {
                                    router.push('/' + firstHit.slug);
                                }
                            }
                        }}
                        ref={inputReference}
                        onFocus={() => {
                            setSelect(-2);
                        }}
                    />
                    <div className="absolute inset-y-0 left-4 flex h-full items-center text-neutral-300">
                        <MagnifyingGlassSVG className="size-4" />
                    </div>
                    <div className="absolute inset-y-0 right-3 flex h-full items-center text-neutral-300">
                        {isLoading && <FiLoader />}
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <div className="flex w-fit gap-2 whitespace-nowrap">
                        <Tags
                            tag={tag}
                            setTag={setTag}
                            select={select}
                            setSelect={setSelect}
                        />
                    </div>
                </div>
            </div>
            <div className="w-full">
                <div className="w-full">
                    {showSearch && (
                        <SearchResults
                            data={data}
                            select={select}
                            setSelect={setSelect}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};
