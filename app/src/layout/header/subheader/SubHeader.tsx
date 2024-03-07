import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { navigation } from '#/config/navigation';

export const SubHeader = () => {
    const pathname = usePathname();

    const sections = navigation.protocol;

    return (
        <div className="">
            <div className="fixed inset-x-0 top-16 z-50 hidden h-9 border-b border-b-ens-light-border bg-ens-light-background-primary px-6 dark:border-b-ens-dark-border dark:bg-ens-dark-background-primary lg:block">
                <ul className="mx-auto flex h-full w-fit gap-10">
                    {sections.map(({ name, href, activePattern }) => {
                        const active = activePattern.test(pathname);

                        return (
                            <li
                                key={href.toString()}
                                className={clsx(
                                    'translate-y-[1px]',
                                    active
                                        ? 'border-b border-b-ens-light-blue-primary dark:border-b-ens-dark-blue-primary'
                                        : ''
                                )}
                            >
                                <Link
                                    href={href.toString()}
                                    className={clsx(
                                        '',
                                        'text-sm',
                                        active
                                            ? 'text-ens-light-blue-primary hover:text-ens-light-blue-bright dark:text-ens-dark-blue-primary dark:hover:text-ens-dark-blue-bright'
                                            : 'text-ens-light-text-primary hover:text-ens-light-text-secondary dark:text-ens-dark-text-primary dark:hover:text-ens-dark-text-secondary'
                                    )}
                                >
                                    {name}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};
