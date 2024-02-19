'use client';

import clsx from 'clsx';
import { useScroll } from 'framer-motion';
import { useTransform } from 'framer-motion';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { forwardRef } from 'react';
import { FaGithub } from 'react-icons/fa';

import { ClientOnly } from '@/ClientOnly';
import { cx } from '@/lib/cx';
import {
    useIsInsideMobileNavigation,
    useMobileNavigationStore,
} from '@/lib/mobile';

import { MobileNavigation } from '../sidebar/_legacy/MobileNavigation';
import { MobileSearch, Search } from './search/Search';
import { SubHeader } from './subheader/SubHeader';
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
                                    src="/ens/primary/ens_logo_primary.svg"
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
                                            : '/ens/primary/ens_logo_primary.svg'
                                    }
                                    className="fill-ens-dao-400 ml-1 h-8"
                                    alt="ENS Logo"
                                    height={'32'}
                                />
                            </Link>
                        </div>

                        <div
                            className={cx(
                                'rounded-md px-2 text-xs font-bold',
                                isDao
                                    ? 'bg-ens-light-purple-surface dark:bg-ens-dark-purple-surface text-ens-light-purple-primary dark:text-ens-dark-purple-primary'
                                    : 'bg-ens-light-blue-surface dark:bg-ens-dark-blue-surface text-ens-light-blue-primary dark:text-ens-dark-blue-primary'
                            )}
                        >
                            Docs
                        </div>
                    </div>
                    <div
                        className={clsx(
                            'absolute inset-x-0 top-full h-px transition',
                            (isInsideMobileNavigation || !mobileNavIsOpen) &&
                                'bg-zinc-900/7.5 dark:bg-white/7.5'
                        )}
                    />
                    <div className="mx-auto w-full max-w-lg">
                        <Search />
                    </div>
                    <div className="float-right flex h-full items-center gap-4">
                        <ClientOnly child={() => <ThemeSwitcher />} />
                        <div className="md:dark:bg-white/15 hidden md:block md:h-5 md:w-px md:bg-zinc-900/10" />
                        <div className="flex gap-4">
                            <MobileSearch />
                            <Link
                                href="https://github.com/ensdomains/docs-v2"
                                target="_blank"
                            >
                                <FaGithub
                                    size={'1.4rem'}
                                    className="opacity-90 hover:opacity-100"
                                />
                            </Link>
                        </div>
                    </div>
                </motion.header>
                <SubHeader />
            </>
        );
    }
);
