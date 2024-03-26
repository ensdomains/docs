'use client';
import clsx from 'clsx';
import Link from 'next/link';
import { FC, useEffect, useRef } from 'react';

import { SearchResult } from './types/result';

export const SearchResults: FC<{
    data: SearchResult;
    select: any;
    setSelect: any;
    search: string;
}> = ({ data, select, setSelect, search }) => {
    const dataReference = useRef(data);

    dataReference.current = data;

    useEffect(() => {
        const thateventlistener = (event) => {
            switch (event.key) {
                case 'ArrowDown': {
                    event.preventDefault();
                    setSelect((select) => {
                        return Math.min(
                            select + 1,
                            dataReference.current?.hits.length - 1
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
        };

        document.addEventListener('keydown', thateventlistener);

        return () => {
            document.removeEventListener('keydown', thateventlistener);
        };
    }, []);

    useEffect(() => {
        if (select !== -2 && select !== -1) {
            const element = document.querySelector(
                '#search-result-link-' + select
            );

            if (element instanceof HTMLElement) {
                element.focus();
            }
        } else if (select === -2) {
            const element = document.querySelector('#search-input');

            if (element instanceof HTMLElement) {
                element.focus();
            }
        }
    }, [select]);

    if (search === '') {
        return <div className="w-full"></div>;
    }

    return (
        <>
            <div className="w-full">
                {!data.hits || data.hits.length === 0 ? (
                    <div className="flex w-full flex-col items-center rounded-b-xl py-8 text-center text-ens-light-text-primary dark:bg-ens-dark-grey-surface dark:text-ens-dark-text-primary">
                        <div className="text-4xl">🤷‍♀️</div>
                        <div className="">No results found</div>
                        <div className="text-sm">Try a different search</div>
                    </div>
                ) : (
                    <ul className="border-t border-t-ens-light-border dark:border-t-ens-dark-border">
                        {data.hits.map((hit, index) => (
                            <li
                                className="hlem outline-0 focus-within:bg-ens-light-background-secondary hover:bg-ens-light-background-secondary focus-within:dark:bg-ens-dark-background-secondary hover:dark:bg-ens-dark-background-secondary"
                                id={'search-result-' + index}
                                key={hit.slug}
                            >
                                <Link
                                    onFocus={() => {
                                        setSelect(index);
                                    }}
                                    onKeyDown={(event) => {
                                        if (event.key === 'Enter') {
                                            // setSelect(-1);
                                            // @ts-ignore
                                            event.target.click();
                                        }
                                    }}
                                    href={'/' + hit.slug}
                                    id={'search-result-link-' + index}
                                    className="z-10 flex w-full p-4 outline-ens-dark-blue-primary focus:outline-ens-light-blue-primary"
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
