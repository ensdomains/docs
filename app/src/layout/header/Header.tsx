'use client';

import clsx from 'clsx';
import { useScroll } from 'framer-motion';
import { useTransform } from 'framer-motion';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { forwardRef, Suspense } from 'react';
import { FaGithub } from 'react-icons/fa';

import { ClientOnly } from '@/ClientOnly';
import {
    useIsInsideMobileNavigation,
    useMobileNavigationStore,
} from '@/lib/mobile';

import { MobileNavigation } from '../sidebar/_legacy/MobileNavigation';
import { MobileSearch, Search } from './search/Search';
import { ThemeSwitcher } from './ThemeSwitcher';

export const Header = forwardRef<HTMLDivElement, { className?: string }>(
    ({ className }, reference) => {
        const { isOpen: mobileNavIsOpen } = useMobileNavigationStore();
        const isInsideMobileNavigation = useIsInsideMobileNavigation();
        const pathname = usePathname();

        const { scrollY } = useScroll();
        const bgOpacityLight = useTransform(scrollY, [0, 72], [0.5, 0.9]);
        const bgOpacityDark = useTransform(scrollY, [0, 72], [0.2, 0.8]);

        const isDao = pathname.match(/\/dao(\/.*)?/);

        return (
            <>
                <motion.header
                    ref={reference}
                    className={clsx(
                        className,
                        'fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-start gap-6 px-4 transition sm:px-6 lg:z-30 lg:px-4',
                        'bg-ens-light-background-primary dark:bg-ens-dark-background-primary'
                    )}
                    style={
                        {
                            '--bg-opacity-light': bgOpacityLight,
                            '--bg-opacity-dark': bgOpacityDark,
                        } as any
                    }
                >
                    <div className="flex w-fit items-center gap-2">
                        <div className="flex w-fit items-center gap-5 lg:hidden">
                            <MobileNavigation />
                            <Link
                                href="/"
                                aria-label="Home"
                                className="block h-8 w-20"
                            >
                                <img
                                    src="/ens/v2/ens-logo.svg"
                                    className="ml-1 h-8 w-auto"
                                    alt="ENS Logo"
                                    height={'32'}
                                />
                            </Link>
                        </div>
                        <div className="hidden w-fit lg:flex">
                            <Link href="/" aria-label="Home">
                                <img
                                    src={
                                        isDao
                                            ? '/ens/dao/ens_logo_dao.svg'
                                            : '/ens/v2/ens-logo.svg'
                                    }
                                    className="ml-1 h-8 fill-ens-dao-400"
                                    alt="ENS Logo"
                                    height={'32'}
                                />
                            </Link>
                        </div>

                        {/* @ts-ignore */}
                        {/* <thorin-tag>Docs</thorin-tag> */}
                    </div>
                    <div
                        className={clsx(
                            'absolute inset-x-0 top-full h-px transition',
                            (isInsideMobileNavigation || !mobileNavIsOpen) &&
                                'bg-zinc-900/7.5 dark:bg-white/7.5'
                        )}
                    />
                    <div className="mx-auto w-full max-w-lg">
                        <Suspense>
                            <Search />
                        </Suspense>
                    </div>
                    <div className="float-right flex h-full items-center gap-4">
                        <ClientOnly child={() => <ThemeSwitcher />} />
                        <div className="hidden md:block md:h-5 md:w-px md:bg-zinc-900/10 md:dark:bg-white/15" />
                        <div className="flex gap-4">
                            <Suspense>
                                <MobileSearch />
                            </Suspense>
                            <Link
                                href="https://github.com/ensdomains/docs"
                                target="_blank"
                                aria-label="GitHub Repository"
                            >
                                <FaGithub
                                    size={'1.4rem'}
                                    className="opacity-90 hover:opacity-100"
                                />
                            </Link>
                        </div>
                    </div>
                </motion.header>
                {/* <SubHeader /> */}
            </>
        );
    }
);
