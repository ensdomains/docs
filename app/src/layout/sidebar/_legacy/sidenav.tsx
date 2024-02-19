'use client';

import { usePathname } from 'next/navigation';

import { navigation } from '@/config/navigation';

import { NavigationGroup } from './navgroup';

export const Navigation = (_properties) => {
    const pathname = usePathname();

    // const isDAO = pathname.match(/\/dao/);

    const activeNavigation = navigation['protocol'];

    const activeSection = activeNavigation.find((group) => {
        return group.activePattern.test(pathname);
    });

    return (
        <nav className="flex h-full flex-col">
            <div className="scrollbar flex h-full w-full flex-col justify-between overflow-auto py-2">
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
                {/* {activeSection?.href == section.href && ( */}
                <ul className="mb-32 px-3">
                    {activeSection?.links.map((group) => (
                        <NavigationGroup
                            key={group.title}
                            group={group}
                            className="border-b border-b-ens-light-border py-2 last:border-b-0 dark:border-b-ens-dark-border"
                        />
                    ))}
                </ul>
                <div className="px-6 text-sm">ENS Documentation (Alpha)</div>
                {/* )} */}
            </div>
        </nav>
    );
};
