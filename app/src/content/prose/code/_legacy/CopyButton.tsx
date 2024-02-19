'use client';

import clsx from 'clsx';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FiPaperclip } from 'react-icons/fi';

import { ClipboardIcon } from '@/components/icons/ClipboardIcon';

const getCopiedLabel = (copyCount) => {
    if (copyCount > 120) {
        return 'Copied!';
    }

    if (copyCount > 100) {
        // Written by co-pilot
        return 'Determination... I like it';
    }

    if (copyCount > 60) {
        // Written by co-pilot
        return 'Sigh.... you are still copying?';
    }

    if (copyCount > 50) {
        // Written by co-pilot
        return 'You are a mad lad';
    }

    if (copyCount > 45) {
        // Written by co-pilot
        return 'Ok... you are just showing off now';
    }

    if (copyCount > 35) {
        // Written by co-pilot
        return 'I hope you actually know what code youre copying 🤔';
    }

    if (copyCount > 30) {
        // Written by co-pilot
        return 'BUILD BUILD BUILD BUILD BUILD BUILD!!!!';
    }

    if (copyCount > 25) {
        return 'Coding Powers Unlocked 😎🚀';
    }

    if (copyCount > 20) {
        return 'Seriously? You have got to be kidding right?!';
    }

    if (copyCount > 15) {
        return 'Aaaaaaaaaaaaaaaaaaaaaaaaaaahhhhhhh!';
    }

    if (copyCount > 10) {
        return 'Ok chill you have a copy!';
    }

    if (copyCount > 4) {
        return 'Yes its Copied!';
    }

    return 'Copied!';
};

export const CopyButton = ({ code }) => {
    const [copyCount, setCopyCount] = useState(0);
    const copied = copyCount > 0;

    useEffect(() => {
        if (copyCount > 0) {
            const timeout = setTimeout(() => setCopyCount(0), 1000);

            return () => {
                clearTimeout(timeout);
            };
        }
    }, [copyCount]);

    return (
        <AnimatePresence>
            <motion.button
                type="button"
                className={clsx(
                    'group/button absolute right-4 top-3.5 h-7 w-auto overflow-hidden whitespace-nowrap rounded-full py-1 pl-2 pr-3 text-2xs font-medium opacity-0 backdrop-blur transition focus:opacity-100 group-hover:opacity-100',
                    copied
                        ? 'ring-ens-400/20 bg-ens-light-blue-400/10 ring-1 ring-inset'
                        : 'hover:bg-white/7.5 dark:bg-white/2.5 bg-white/5 dark:hover:bg-white/5'
                )}
                onClick={() => {
                    window.navigator.clipboard.writeText(code).then(() => {
                        setCopyCount((count) => count + 1);
                    });
                }}
                initial={{ height: '1.75rem' }}
                animate={{ width: 'auto', height: '1.75rem' }}
            >
                <AnimatePresence>
                    <motion.span
                        aria-hidden={copied}
                        className={clsx(
                            'pointer-events-none flex items-center gap-0.5 text-zinc-400 transition duration-300',
                            copied && 'opacity-0'
                        )}
                        initial={{ y: 0 }}
                        animate={{ y: copied ? '-100%' : 0 }}
                        exit={{ y: '-200%' }}
                        hidden={copied}
                    >
                        <ClipboardIcon className="h-5 w-5 fill-zinc-500/20 stroke-zinc-500 transition-colors group-hover/button:stroke-zinc-400" />
                        Copy
                    </motion.span>
                    <motion.span
                        aria-hidden={!copied}
                        className={clsx(
                            'pointer-events-none flex w-full items-center justify-end gap-1 whitespace-nowrap text-ens-light-blue-400 transition duration-300',
                            !copied && 'opacity-0'
                        )}
                        initial={{ y: 0 }}
                        animate={{ y: copied ? '-100%' : 0 }}
                        exit={{ y: '-200%' }}
                        key={`copied-${getCopiedLabel(copyCount)}`}
                    >
                        <FiPaperclip /> {getCopiedLabel(copyCount)}
                    </motion.span>
                </AnimatePresence>
            </motion.button>
        </AnimatePresence>
    );
};
