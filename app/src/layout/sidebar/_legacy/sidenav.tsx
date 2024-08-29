'use client';

import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { FC, useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';

import { useIsInsideMobileNavigation } from '@/lib/mobile';
import { navigation, SectionData } from '#/config/navigation';

import { NavigationGroup } from './navgroup';

const NavSect: FC<{ section: SectionData }> = ({ section }) => {
    const isInsideMobileNavigation = useIsInsideMobileNavigation();
    const [expanded, setExpanded] = useState(section.expanded);

    return (
        <div className="" style={{ fontFamily: 'Satoshi' }}>
            <div className="px-2 font-bold">
                <button
                    onClick={() => {
                        setExpanded(!expanded);
                    }}
                    className="hover:bg-ens-light-background-secondary dark:hover:bg-ens-dark-background-secondary flex w-full items-center justify-between rounded-md p-2"
                >
                    {section.name}
                    <FiChevronDown
                        className={clsx(
                            expanded ? 'rotate-180' : '',
                            'transition-all'
                        )}
                    />
                </button>
            </div>
            {expanded && (
                <ul className="mb-4 px-3">
                    {!!section && isInsideMobileNavigation && (
                        <li className="text-ens-light-text-primary dark:text-ens-dark-text-primary mb-2 text-sm font-medium">
                            {section.name}
                        </li>
                    )}
                    {section?.links.map((group) => (
                        <NavigationGroup
                            key={group.title}
                            group={group}
                            className="border-b-ens-light-border dark:border-b-ens-dark-border border-b py-2 last:border-b-0"
                        />
                    ))}
                </ul>
            )}
        </div>
    );
};

export const Navigation = (_properties) => {
    const pathname = usePathname();

    // const isDAO = pathname.match(/\/dao/);

    const activeNavigation = navigation['protocol'];

    // const activeSection = activeNavigation.find((group) => {
    //     return group.activePattern.test(pathname);
    // });

    return (
        <nav className="flex h-full flex-col py-2 pr-2">
            <div className="scrollbar size-full overflow-auto py-2 pt-0">
                {/* <ul className="border-ens-light-border dark:border-ens-dark-border w-full border-b px-[16px] pb-2">
                    {activeNavigation.map((section, sectionIndex) => (
                        <li key={section.name} className="">
                            <Link
                                href={section.href}
                                className={clsx(
                                    'text-ens-light-text-secondary dark:text-ens-light-text-secondary flex w-full items-center gap-2 rounded-md p-2 text-sm',
                                    section.activePattern.test(pathname)
                                        ? 'bg-ens-light-grey-surface dark:bg-ens-dark-background-surface dark:bg-ens-dark-blue-surface'
                                        : 'bg-ens-light-background-primary dark:bg-ens-dark-background-primary'
                                )}
                            >
                                <span className="text-md aspect-square">
                                    {section.icon}
                                </span>
                                <span>{section.name}</span>
                            </Link>
                        </li>
                    ))}
                </ul> */}
                {activeNavigation.map((activeSection, _sectionIndex) => (
                    <NavSect section={activeSection} key={activeSection.name} />
                ))}
            </div>
        </nav>
    );
};
