'use client';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiExternalLink } from 'react-icons/fi';

import { useSectionStore } from '@/components/SectionProvider';
import { Tag } from '@/components/Tag';
import { useIsInsideMobileNavigation } from '@/lib/mobile';
import { remToPx } from '@/lib/remToPx';

import { useInitialValue } from './useInitialValue';

function NavLink({ href, tag, active, isAnchorLink = false, children }) {
    // To hide the sections of a page, uncomment this line:
    if (isAnchorLink) return <></>;

    return (
        <Link
            href={href}
            aria-current={active ? 'page' : undefined}
            className={clsx(
                'ring-ens-light-blue-primary dark:ring-ens-dark-blue-primary flex justify-between gap-2 rounded-lg border-none py-1.5 pr-0 text-sm outline-none ring-offset-1 transition',
                isAnchorLink ? 'pl-8' : 'pl-4',
                active
                    ? 'bg-ens-light-blue-surface text-ens-light-text-primary dark:bg-ens-dark-blue-surface dark:text-ens-dark-text-primary'
                    : 'text-ens-light-text-primary hover:bg-ens-light-background-secondary dark:text-ens-dark-text-primary dark:hover:bg-ens-dark-background-secondary'
            )}
        >
            <span className="flex items-center gap-1 truncate leading-5">
                {children}
            </span>
            {tag && (
                <Tag variant="small" color="zinc">
                    {tag}
                </Tag>
            )}
        </Link>
    );
}

function ActivePageMarker({ group, pathname }) {
    const itemHeight = remToPx(2);
    const offset = remToPx(0.25);
    const activePageIndex = group.links?.findIndex(
        (link) => link.href === pathname
    );
    const top = offset + activePageIndex * itemHeight;

    return (
        <motion.div
            layout
            className="bg-ens-light-blue-500 absolute left-2 h-6 w-px"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.2 } }}
            exit={{ opacity: 0 }}
            style={{ top }}
        />
    );
}

// // Attempt at preventing next.js from rendering the bar in a semi-visible state
// if (typeof window == 'undefined') return <></>;

export const NavigationGroup = ({ group, className }) => {
    // If this is the mobile navigation then we always render the initial
    // state, so that the state does not change during the close animation.
    // The state will still update when we re-open (re-render) the navigation.
    const isInsideMobileNavigation = useIsInsideMobileNavigation();
    const [pathname, sections] = useInitialValue(
        [usePathname(), useSectionStore((s) => s.sections || [])],
        isInsideMobileNavigation
    );

    const isActiveGroup =
        group.links?.findIndex((link) => link.href === pathname) !== -1;

    return (
        <li className={clsx('', className)}>
            {group.title && (
                <motion.h2
                    layout="position"
                    className="text-ens-light-text-secondary dark:text-ens-dark-text-secondary py-2 pl-2 text-xs font-bold leading-5 dark:text-white"
                >
                    {/* {group.icon && group.icon + ' '} */}
                    {group.title}
                </motion.h2>
            )}
            <div className="">
                <ul className="">
                    {group.links?.map((link) => (
                        <li key={link.href} className="">
                            <NavLink
                                tag={undefined}
                                href={link.href}
                                active={link.href === pathname}
                            >
                                <span>{link.title}</span>
                                {link.external && <FiExternalLink />}
                                {link.wip && (
                                    <div className="bg-ens-light-blue-surface text-3xs text-ens-light-blue-primary dark:bg-ens-dark-blue-surface dark:text-ens-dark-blue-primary rounded-md px-1 font-bold">
                                        {link.wip == 1 ? 'WIP' : `${link.wip}%`}
                                    </div>
                                )}
                                {link.design_wip && (
                                    <div className="bg-ens-light-pink-primary dark:bg-ens-dark-pink-primary h-1.5 w-1.5 rounded-full"></div>
                                )}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </li>
    );
};
