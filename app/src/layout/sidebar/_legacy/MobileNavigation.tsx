'use client';
import { Dialog, Transition } from '@headlessui/react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { Fragment, useEffect, useState } from 'react';
import { FiChevronLeft, FiChevronRight, FiExternalLink } from 'react-icons/fi';

import { Header } from '@/layout/header/Header';
import {
    IsInsideMobileNavigationContext,
    useIsInsideMobileNavigation,
    useMobileNavigationStore,
} from '@/lib/mobile';
import {
    isRouteGroup,
    isRouteLink,
    navigation,
    routeElement,
    routeGroup,
} from '#/config/navigation';
import { showWIP } from '#/config/navigation/protocol';

import { MenuIcon } from '../../../components/icons/MenuIcon';
import { XIcon } from '../../../components/icons/XIcon';
import { NavLink } from './navgroup';

export const MobileNavigation = () => {
    const isInsideMobileNavigation = useIsInsideMobileNavigation();
    const { isOpen, toggle, close } = useMobileNavigationStore();
    const ToggleIcon = isOpen ? XIcon : MenuIcon;

    return (
        <IsInsideMobileNavigationContext.Provider value={true}>
            <button
                type="button"
                className="flex size-6 items-center justify-center rounded-md transition hover:bg-zinc-900/5 dark:hover:bg-white/5"
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
                            <div className="fixed inset-0 top-16 bg-zinc-400/20 backdrop-blur-sm dark:bg-black/40" />
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
                                    className="border-zinc-900/7.5 fixed bottom-0 left-0 top-16 z-50 w-full overflow-y-auto border bg-white pb-8 shadow-lg shadow-zinc-900/10 min-[416px]:max-w-sm sm:pl-6 dark:bg-zinc-900 dark:ring-zinc-800"
                                >
                                    <ActualNavigation />
                                </motion.div>
                            </Transition.Child>
                        </Dialog.Panel>
                    </Dialog>
                </Transition.Root>
            )}
        </IsInsideMobileNavigationContext.Provider>
    );
};

const ActualNavigation = () => {
    const { navStack, setNav } = useMobileNavigationStore();
    const pathname = usePathname();

    useEffect(() => {
        const navStack = navStackCache[pathname];

        if (navStack) {
            setNav(navStack);
        }
    }, [pathname]);

    return (
        <ul className="mb-32 list-none p-4">
            {navStack.length === 0 ? (
                mobileOptimizedNavigation.map((section, sectionIndex) => (
                    <NavItem
                        key={sectionIndex}
                        item={{
                            title: section.title,
                            links: section.links,
                        }}
                        index={sectionIndex}
                    />
                ))
            ) : (
                <SectionItems />
            )}
        </ul>
    );
};

type NestedRouteElement = routeElement | NestedRouteElement[];

// for the desktop navigation to work routeGroups sometimes contain a sub routeGroup with an empty title. For this to work on mobile we need to render the links directly
const convertMobileOptimizedNavigation = (
    route: routeElement
): NestedRouteElement => {
    if (isRouteGroup(route) && route.title === '') {
        return route.links.map(convertMobileOptimizedNavigation);
    }

    return route;
};

const mobileOptimizedNavigation = navigation['protocol'].map((section) => {
    return {
        title: section.name,
        links: section.links.flatMap(
            convertMobileOptimizedNavigation
        ) as routeElement[],
    };
});

console.log('mobileOptimizedNavigation', mobileOptimizedNavigation);

// an object with keys of each link href and the value the navstack aka a list of indexes to get to the link
const navStackCache: Record<string, number[]> = Object.fromEntries(
    mobileOptimizedNavigation.flatMap((group, groupIndex) => {
        // routes can be infinitely nested so we need to flatten the array
        // we also need to keep track of the indexes to get to the link

        const visitor = (
            route: routeElement,
            indexes: number[] = []
        ): [string, number[]][] => {
            if (isRouteGroup(route)) {
                return route.links
                    .filter((link) => !isRouteLink(link) || !link.external)
                    .flatMap((link, linkIndex) => {
                        return visitor(link, [...indexes, linkIndex]);
                    });
            }

            return [[route.href, indexes.slice(0, -1)]];
        };

        return visitor(group, [groupIndex]);
    })
);

navStackCache['/'] = [];

const SectionItems = () => {
    const { navStack, popNav } = useMobileNavigationStore();

    const [activeGroup, setActiveGroup] = useState<routeGroup | undefined>();

    useEffect(() => {
        const items = navStack.reduce(
            (accumulator, index) => {
                const item = accumulator.links[index];

                return item && isRouteGroup(item) ? item : accumulator;
            },
            {
                title: 'root',
                links: mobileOptimizedNavigation,
            } as routeGroup
        );

        setActiveGroup(items);
    }, [navStack]);

    return (
        <>
            <li className="text-ens-light-text-primary dark:text-ens-dark-text-primary py-1.5 pl-3 text-base font-medium">
                <button onClick={popNav} className="flex w-full items-center">
                    <FiChevronLeft className="text-xl" />
                    <span className="ml-1">{activeGroup?.title}</span>
                </button>
            </li>

            <div className="border-ens-light-border dark:border-ens-dark-border my-3 border-b" />

            {activeGroup?.links.map((group, index) => (
                <NavItem key={group.title} item={group} index={index} />
            ))}
        </>
    );
};

const NavItem = ({ item, index }: { item: routeElement; index: number }) => {
    const { pushNav, close } = useMobileNavigationStore();
    const pathname = usePathname();

    if (isRouteGroup(item)) {
        return (
            <li key={item.title} className="">
                <button
                    onClick={() => pushNav(index)}
                    className="text-ens-light-text-primary hover:bg-ens-light-background-secondary dark:text-ens-dark-text-primary dark:hover:bg-ens-dark-background-secondary flex w-full items-center gap-2 rounded-lg border-none py-2 pl-4 pr-0 text-base outline-none ring-offset-1 transition"
                >
                    <span className="flex items-center gap-1 truncate leading-5">
                        {item.title || 'Untitled'}
                    </span>
                    <FiChevronRight className="ml-auto text-xl" />
                </button>
            </li>
        );
    }

    return (
        <li key={item.href} className="text-base">
            <NavLink
                tag={undefined}
                href={item.href}
                active={item.href === pathname}
                onClick={() => setTimeout(close, 100)}
                className="!text-base"
                target={item.external ? '_blank' : undefined}
            >
                <span>{item.title ?? 'Untitled'}</span>
                {item.external && <FiExternalLink />}
                {showWIP && item.wip && (
                    <div className="bg-ens-light-blue-surface text-3xs text-ens-light-blue-primary dark:bg-ens-dark-blue-surface dark:text-ens-dark-blue-primary rounded-md px-1 font-bold">
                        {item.wip == 1 ? 'WIP' : `${item.wip}%`}
                    </div>
                )}
                {showWIP && item.design_wip && (
                    <div className="bg-ens-light-pink-primary dark:bg-ens-dark-pink-primary size-1.5 rounded-full"></div>
                )}
            </NavLink>
        </li>
    );
};
