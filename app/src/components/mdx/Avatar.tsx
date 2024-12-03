'use client';

import clsx from 'clsx';
import { useEnsAvatar } from 'wagmi';

type Properties = {
    name: string;
    width: number;
    rounded?: boolean;
};

export function Avatar({ name, width, rounded }: Properties) {
    const { data: ensAvatar } = useEnsAvatar({ name, chainId: 1 });

    return (
        <img
            src={ensAvatar ?? '/fallback-avatar.svg'}
            alt={name}
            width={width}
            className={clsx(
                'aspect-square object-cover',
                rounded && 'rounded-full'
            )}
        />
    );
}
