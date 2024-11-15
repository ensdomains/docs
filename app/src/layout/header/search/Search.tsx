'use client';

import clsx from 'clsx';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { SearchModal } from './SearchModal';

function SearchIcon(properties) {
    return (
        <svg
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
            className={clsx('size-5', properties.className)}
            {...properties}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12.01 12a4.25 4.25 0 1 0-6.02-6 4.25 4.25 0 0 0 6.02 6Zm0 0 3.24 3.25"
            />
        </svg>
    );
}

export function Search() {
    const [modifierKey, setModifierKey] = useState<string>('');
    const urlParameters = useSearchParams();
    const [isOpen, setOpen] = useState<boolean>(urlParameters.has('q'));

    // eslint-disable-next-line sonarjs/no-identical-functions
    useEffect(() => {
        setModifierKey(
            /(mac|iphone|ipod|ipad)/i.test(navigator.platform) ? '⌘' : 'ctrl '
        );
    }, []);

    useEffect(() => {
        // Register keydown event
        const onkeydown = (event: KeyboardEvent) => {
            // If user is focusing textbox ignore
            if (event.target instanceof HTMLInputElement) return;

            if (
                event.key === '/' ||
                ((event.ctrlKey || event.metaKey) && event.key === 'k')
            ) {
                event.preventDefault();
                setOpen(true);
            }
        };

        // Register keyup event
        document.addEventListener('keydown', onkeydown);

        // Unregister keydown event
        return () => {
            document.removeEventListener('keydown', onkeydown);
        };
    }, [isOpen, setOpen]);

    return (
        <div className="hidden lg:block lg:max-w-md lg:flex-auto">
            <button
                type="button"
                className={clsx(
                    'outline-ens-500 h-8 w-full items-center gap-2 rounded-lg bg-white pl-2 text-sm text-zinc-500 ring-1 ring-zinc-900/10 hover:ring-zinc-900/20 lg:flex dark:bg-white/5 dark:text-zinc-400 dark:ring-inset dark:ring-white/10 dark:hover:ring-white/20',
                    isOpen ? 'opacity-0' : 'opacity-100'
                )}
                onClick={() => setOpen(true)}
            >
                <SearchIcon className="size-5 stroke-current" />
                Search Content...
                <span className="ml-auto inline-flex p-1">
                    {modifierKey && (
                        <kbd className="border-ens-light-border text-2xs dark:border-ens-dark-border my-1 flex h-full items-center rounded-md border px-1">
                            <kbd className="font-sans">{modifierKey}</kbd>+
                            <kbd className="font-sans">k</kbd>
                        </kbd>
                    )}
                </span>
            </button>
            <SearchModal open={isOpen} onClose={() => setOpen(false)} />
        </div>
    );
}

export function MobileSearch() {
    const [isOpen, setOpen] = useState<boolean>(false);

    return (
        <div className="contents lg:hidden">
            <button
                type="button"
                className="flex size-6 items-center justify-center rounded-md transition-all hover:bg-zinc-900/5 lg:hidden dark:hover:bg-white/5"
                aria-label="Search Content..."
                onClick={() => setOpen(true)}
            >
                <SearchIcon className="size-5 stroke-zinc-900 dark:stroke-white" />
            </button>
            <SearchModal open={isOpen} onClose={() => setOpen(false)} />
        </div>
    );
}
