'use client';
import clsx from 'clsx';
import Link from 'next/link';
import { FC, useEffect, useRef } from 'react';

import { SearchResult } from './types/result';

const SearchResultEntry: FC<{
    hit: any;
    index: number;
    select: number;
    setSelect: any;
}> = ({ hit, index, select, setSelect }) => {
    const entryReference = useRef<HTMLAnchorElement>(null);

    useEffect(() => {
        if (select === index) {
            entryReference.current?.focus();
        }
    }, [select]);

    return (
        <li
            className="hlem outline-0 focus-within:bg-ens-light-background-secondary hover:bg-ens-light-background-secondary focus-within:dark:bg-ens-dark-background-secondary hover:dark:bg-ens-dark-background-secondary"
            id={'search-result-' + index}
        >
            <Link
                onFocus={() => {
                    setSelect(index);
                }}
                onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                        // @ts-ignore
                        event.target.click();
                    }
                }}
                href={'/' + hit.slug}
                id={'search-result-link-' + index}
                className="z-10 flex w-full p-4 outline-ens-dark-blue-primary focus:outline-ens-light-blue-primary"
                ref={entryReference}
            >
                <span className="grow overflow-hidden">
                    <span className="w-full truncate font-bold">
                        {/* {hit.emoji || '✨'}&nbsp;&nbsp; */}
                        <span
                            dangerouslySetInnerHTML={{
                                __html: hit._formatted.title,
                            }}
                        />
                    </span>
                    <span
                        dangerouslySetInnerHTML={{
                            __html: hit.description,
                            // hit._formatted.content ??
                            // hit._formatted.description,
                        }}
                        className={clsx('block h-[2em] w-full truncate')}
                    />
                </span>
                <span className="flex gap-2">
                    {hit.slug.startsWith('dao') && (
                        <span className="tag tag-purple">DAO</span>
                    )}
                </span>
            </Link>
        </li>
    );
};

export const SearchResults: FC<{
    data: SearchResult;
    select: any;
    setSelect: any;
}> = ({ data, select, setSelect }) => {
    return (
        <>
            <div className="w-full">
                {!data.hits || data.hits.length === 0 ? (
                    <div className="flex w-full flex-col items-center py-8 text-center text-ens-light-text-primary dark:bg-ens-dark-grey-surface dark:text-ens-dark-text-primary">
                        <div className="text-4xl">🤷‍♀️</div>
                        <div className="">No results found</div>
                        <div className="text-sm">Try a different search</div>
                    </div>
                ) : (
                    <ul className="border-t border-t-ens-light-border dark:border-t-ens-dark-border">
                        {data.hits.map((hit, index) => (
                            <SearchResultEntry
                                hit={hit}
                                index={index}
                                key={hit.slug}
                                select={select}
                                setSelect={setSelect}
                            />
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
};
