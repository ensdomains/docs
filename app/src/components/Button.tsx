/* eslint-disable sonarjs/no-duplicate-string */
import clsx from 'clsx';
import Link from 'next/link';
import { FC, PropsWithChildren } from 'react';

import { cx } from '@/lib/cx';

const ArrowIcon: FC = (properties) => {
    return (
        <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...properties}>
            <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m11.5 6.5 3 3.5m0 0-3 3.5m3-3.5h-9"
            />
        </svg>
    );
};

const variantStyles = {
    primary: 'btn-blue-primary',
    disabled: 'btn-disabled',
    subtle: 'btn-subtle',
    red: 'btn-red-primary',
    secondary: 'btn-blue-surface',
    green: 'rounded-lg py-1 px-3 bg-green-400/10 text-green-600 ring-1 ring-inset ring-green-400/20 hover:bg-green-400/10 hover:text-green-300 hover:ring-green-300',
    filled: 'rounded-lg bg-zinc-900 py-1 px-3 text-white hover:bg-zinc-700 dark:bg-ens-light-blue-500 dark:text-white dark:hover:bg-ens-light-blue-400',
    outline:
        'rounded-lg py-1 px-3 text-zinc-700 ring-1 ring-inset ring-zinc-900/10 hover:bg-zinc-900/2.5 hover:text-zinc-900 dark:text-zinc-400 dark:ring-white/10 dark:hover:bg-white/5 dark:hover:text-white',
    text: 'text-ens-light-blue-500 hover:text-ens-light-blue-600 dark:text-ens-light-blue-400 dark:hover:text-ens-light-blue-500',
};

type HrefProperties = {
    href: string;
    target?: string;
};

type ButtonProperties = {
    onClick: () => void;
};

export const Button: FC<
    {
        variant?: string;
        className?: string;
        arrow?: 'left' | 'right';
        disabled?: boolean;
        width?: 'full' | string;
    } & (HrefProperties | ButtonProperties) &
        PropsWithChildren
> = ({
    variant = 'primary',
    disabled = false,
    className,
    children,
    arrow,
    ...properties
}) => {
    const Component = properties['href'] ? Link : 'button';

    const newVariant = disabled ? 'disabled' : variant;

    className = clsx('btn', variantStyles[newVariant], className);

    // const arrowIcon = (
    //     <ArrowIcon
    //         // @ts-ignore
    //         className={cx(
    //             'mt-0.5 h-5 w-5',
    //             variant === 'text' && 'relative top-px',
    //             arrow === 'left' && '-ml-1 rotate-180',
    //             arrow === 'right' && '-mr-1'
    //         )}
    //     />
    // );

    // return (
    //     // @ts-ignore
    //     <thorin-button
    //         href={properties['href']}
    //         onClick={properties['onClick']}
    //         target={properties['target']}
    //         width={properties['width']}
    //         variant={newVariant}
    //     >
    //         {arrow === 'left' && arrowIcon}
    //         {children}
    //         {arrow === 'right' && arrowIcon}
    //         {/* @ts-ignore */}
    //     </thorin-button>
    // );

    const arrowIcon = (
        <ArrowIcon
            // @ts-ignore
            className={cx(
                'mt-0.5 h-5 w-5',
                variant === 'text' && 'relative top-px',
                arrow === 'left' && '-ml-1 rotate-180',
                arrow === 'right' && '-mr-1'
            )}
        />
    );

    return (
        <Component
            href={properties['href']}
            target={properties['target']}
            onClick={properties['onClick']}
            className={className}
            disabled={disabled}
            {...properties}
        >
            {arrow === 'left' && arrowIcon}
            {children}
            {arrow === 'right' && arrowIcon}
        </Component>
    );
};
