'use client';

import clsx from 'clsx';
import { useState } from 'react';

type Properties = {
    name: string;
    width: number;
    rounded?: boolean;
};

export function Avatar({ name, width, rounded }: Properties) {
    const [url, setUrl] = useState(`https://enstate.rs/i/${name}`);

    return (
        <img
            src={url}
            alt={name}
            width={width}
            className={clsx(
                'aspect-square object-cover',
                rounded && 'rounded-full'
            )}
            onError={() => setUrl('/fallback-avatar.svg')}
        />
    );
}
