'use client';
import { Dialog, Transition } from '@headlessui/react';
import { motion } from 'framer-motion';
import { Fragment } from 'react';

import { Header } from '@/layout/header/Header';
import { Navigation } from '@/layout/sidebar/_legacy/sidenav';
import {
    IsInsideMobileNavigationContext,
    useIsInsideMobileNavigation,
    useMobileNavigationStore,
} from '@/lib/mobile';

import { MenuIcon } from '../../../components/icons/MenuIcon';
import { XIcon } from '../../../components/icons/XIcon';

export const MobileNavigation = () => {
    const isInsideMobileNavigation = useIsInsideMobileNavigation();
    const { isOpen, toggle, close } = useMobileNavigationStore();
    const ToggleIcon = isOpen ? XIcon : MenuIcon;

    return (
        <IsInsideMobileNavigationContext.Provider value={true}>
            <button
                type="button"
                className="flex h-6 w-6 items-center justify-center rounded-md transition hover:bg-zinc-900/5 dark:hover:bg-white/5"
                aria-label="Toggle navigation"
                onClick={toggle}
            >
                <ToggleIcon className="w-4 stroke-zinc-900 dark:stroke-white" />
            </button>
            {!isInsideMobileNavigation && (
                <Transition.Root show={isOpen} as={Fragment}>
                    <Dialog
                        onClose={close}
                        className="fixed inset-0 z-50 lg:hidden"
                    >
                        <Transition.Child
                            as={Fragment}
                            enter="duration-300 ease-out"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="duration-200 ease-in"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 top-14 bg-zinc-400/20 backdrop-blur-sm dark:bg-black/40" />
                        </Transition.Child>

                        <Dialog.Panel>
                            <Transition.Child
                                as={Fragment}
                                enter="duration-300 ease-out"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="duration-200 ease-in"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Header />
                            </Transition.Child>

                            <Transition.Child
                                as={Fragment}
                                enter="duration-500 ease-in-out"
                                enterFrom="-translate-x-full"
                                enterTo="translate-x-0"
                                leave="duration-500 ease-in-out"
                                leaveFrom="translate-x-0"
                                leaveTo="-translate-x-full"
                            >
                                <motion.div
                                    layoutScroll
                                    className="fixed bottom-0 left-0 top-14 z-50 w-full overflow-y-auto bg-white pb-8 shadow-lg shadow-zinc-900/10 ring-1 ring-zinc-900/7.5 dark:bg-zinc-900 dark:ring-zinc-800 min-[416px]:max-w-sm sm:pl-6"
                                >
                                    <Navigation />
                                </motion.div>
                            </Transition.Child>
                        </Dialog.Panel>
                    </Dialog>
                </Transition.Root>
            )}
        </IsInsideMobileNavigationContext.Provider>
    );
};
