'use client';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BreadcrumbList, ListItem, WithContext } from 'schema-dts';

import {
    isRouteLink,
    isSectionData,
    routeElement,
    routeGroup,
} from '#/config/navigation';
import { navigation } from '#/config/navigation/protocol';

const getPageAndGroup = (
    routes: routeGroup[] | undefined,
    path: string
): routeElement[] | undefined => {
    for (const group of routes ?? []) {
        for (const link of group.links) {
            if (isRouteLink(link) && link.href == path) {
                return [group, link];
            }
        }
    }

    return undefined;
};

export const Breadcrumbs = () => {
    const path = usePathname();

    // Hide on homepage
    if (path == '/') return;

    const section = navigation.find((section) =>
        section.activePattern.test(path)
    );

    const [group, page] = getPageAndGroup(section?.links, path) || [
        undefined,
        undefined,
    ];

    const crumbs = [section, group, page].filter((a) => !!a);

    const crumbs2 = crumbs.map((crumb) => {
        if (isSectionData(crumb)) {
            return (
                <Link
                    href={crumb.href}
                    className="text-inherit hover:text-inherit"
                >
                    {crumb.name}
                </Link>
            );
        }

        if (isRouteLink(crumb)) {
            return (
                <Link
                    href={crumb.href}
                    className="text-inherit hover:text-inherit"
                >
                    {crumb.title}
                </Link>
            );
        }

        return crumb.title;
    });

    const schema: WithContext<BreadcrumbList> = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: '/',
            },
            ...crumbs
                .map((crumb, index): ListItem => {
                    if (isSectionData(crumb)) {
                        return {
                            '@type': 'ListItem',
                            position: index + 2,
                            name: crumb.name,
                            item: 'https://docs.ens.domains' + crumb.href,
                        };
                    }

                    if (isRouteLink(crumb)) {
                        return {
                            '@type': 'ListItem',
                            position: index + 2,
                            name: crumb.title,
                            item: 'https://docs.ens.domains' + crumb.href,
                        };
                    }

                    return {
                        '@type': 'ListItem',
                        position: index + 2,
                        name: crumb.title,
                    };
                })
                .filter((a) => {
                    return !!a.name;
                }),
        ],
    };

    return (
        <nav className="breadcrumb" aria-label="Breadcrumb">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(schema),
                }}
            />
            <ul className="flex items-center gap-1">
                {[
                    <Link
                        href="/"
                        className="text-inherit hover:scale-105 hover:text-inherit"
                    >
                        Home
                    </Link>,
                    ...crumbs2,
                ]
                    .filter((a) => !!a)
                    .map((item, index, array) => (
                        <li
                            key={index}
                            aria-current={
                                array.length - 1 == index ? 'page' : undefined
                            }
                            className={clsx(
                                'flex items-center',
                                index != array.length - 1 && 'opacity-70'
                            )}
                        >
                            {item}
                        </li>
                    ))}
            </ul>
        </nav>
    );
};
