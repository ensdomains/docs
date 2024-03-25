'use client';
import clsx from 'clsx';
import Link from 'next/link';
import { FC, useEffect } from 'react';

import { SearchResult } from './types/result';

export const SearchResults: FC<{
    data: SearchResult;
    select: any;
    setSelect: any;
    query: string;
}> = ({ data, select, setSelect, query }) => {
    useEffect(() => {
        const thateventlistener = (event) => {
            if (!data?.hits?.length) {
                return;
            }

            switch (event.key) {
                case 'ArrowDown': {
                    event.preventDefault();
                    setSelect((select) => {
                        return Math.min(select + 1, data.hits.length - 1);
                    });

                    break;
                }
                case 'ArrowUp': {
                    event.preventDefault();
                    setSelect((select) => {
                        return Math.max(select - 1, -1);
                    });

                    break;
                }
                case 'Enter': {
                    break;
                }
            }
        };

        document.addEventListener('keydown', thateventlistener);

        return () => {
            document.removeEventListener('keydown', thateventlistener);
        };
    }, []);

    useEffect(() => {
        if (select !== -1) {
            const element = document.querySelector(
                '#search-result-link-' + select
            );

            if (element instanceof HTMLElement) {
                element.focus();
            }
        } else {
            const element = document.querySelector('#search-input');

            if (element instanceof HTMLElement) {
                element.focus();
            }
        }
    }, [select]);

    useEffect(() => {
        setSelect(-1);
    }, [data.hits]);

    return (
        <>
            <div className="w-full">
                {!data.hits || data.hits.length === 0 ? (
                    <div className="text-ens-light-text-primary dark:bg-ens-dark-grey-surface dark:text-ens-dark-text-primary flex w-full flex-col items-center py-8 text-center">
                        <div className="text-4xl">🤷‍♀️</div>
                        <div className="">No results found</div>
                        <div className="text-sm">Try a different search</div>
                    </div>
                ) : (
                    <ul className="border-t-ens-light-border dark:border-t-ens-dark-border border-t">
                        {data.hits.map((hit, index) => (
                            <li
                                className="hlem focus-within:bg-ens-light-background-secondary hover:bg-ens-light-background-secondary focus-within:dark:bg-ens-dark-background-secondary hover:dark:bg-ens-dark-background-secondary outline-0"
                                id={'search-result-' + index}
                                key={hit.slug}
                            >
                                <Link
                                    onFocus={() => {
                                        setSelect(index);
                                    }}
                                    onKeyDown={(event) => {
                                        if (event.key === 'Enter') {
                                            event.preventDefault();
                                            // @ts-ignore
                                            event.target.click();
                                        }
                                    }}
                                    onClick={() => {
                                        // Here we will run a network request to log the click, but since that will take time we'll do it in the background. Luckily, NextJS doesn't replace the page, but only the content, so we can do this without any issues.
                                        // @ts-ignore
                                        const { plausible } = window;

                                        if (!plausible) return;

                                        plausible('Search', {
                                            props: {
                                                query: query,
                                                result: hit.title,
                                                index: index + 1,
                                            },
                                        });
                                    }}
                                    href={'/' + hit.slug}
                                    id={'search-result-link-' + index}
                                    className="outline-ens-dark-blue-primary focus:outline-ens-light-blue-primary z-10 flex w-full p-4"
                                >
                                    <span className="grow overflow-hidden">
                                        <span className="w-full truncate font-bold">
                                            {/* {hit.emoji || '✨'}&nbsp;&nbsp; */}
                                            <span
                                                dangerouslySetInnerHTML={{
                                                    __html: hit._formatted
                                                        .title,
                                                }}
                                            />
                                        </span>
                                        <span
                                            dangerouslySetInnerHTML={{
                                                __html: hit.description,
                                                // hit._formatted.content ??
                                                // hit._formatted.description,
                                            }}
                                            className={clsx(
                                                'block h-[2em] w-full truncate pl-8'
                                            )}
                                        />
                                    </span>
                                    <span className="flex gap-2">
                                        {hit.slug.startsWith('dao') && (
                                            <span className="tag tag-purple">
                                                DAO
                                            </span>
                                        )}
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            {/* <div className="text-2xs dark:bg-ens-dark-background-secondary border-t-ens-light-border dark:border-t-ens-dark-border flex w-full justify-between rounded-b-xl border-t bg-neutral-50 px-4 py-1 text-neutral-400">
            <div>{data.estimatedTotalHits} hits for search</div>
            <div>{data.processingTimeMs}ms</div>
            </div> */}
        </>
    );
};
