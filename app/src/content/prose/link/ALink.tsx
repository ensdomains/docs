import clsx from 'clsx';
import Link, { LinkProps } from 'next/link';
import React, { FC } from 'react';
import { FiExternalLink } from 'react-icons/fi';

export const ALink: FC<
    React.AnchorHTMLAttributes<HTMLAnchorElement> &
        LinkProps & { hideExtras: boolean }
> = ({ target, children, hideExtras, ...properties }) => {
    const isExternal = properties.href?.toString()?.startsWith('http');

    target = target ?? isExternal ? '_blank' : undefined;

    const className = hideExtras
        ? ''
        : clsx('my-0 inline-flex items-center gap-1', properties.className);

    return (
        <Link
            {...properties}
            target={target}
            className={clsx(properties.className, className)}
        >
            {children}
            {!hideExtras && isExternal ? <FiExternalLink /> : undefined}
        </Link>
    );
};
