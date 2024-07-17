'use client';

import clsx from 'clsx';
import { FC, useMemo, useState } from 'react';

import { generateMeshGradientFromName } from './MeshGradient';

export const ProfileAvatar: FC<{ name: string }> = ({ name }) => {
    const [failedToLoad, setFailedToLoad] = useState(false);
    const mesh = useMemo(() => generateMeshGradientFromName(name), [name]);

    return (
        <div className="relative aspect-square size-full">
            <div className="absolute inset-0 size-full bg-ens-light-background-secondary"></div>
            <div className="absolute inset-0 size-full" style={mesh}></div>
            <img
                src={'https://enstate.rs/i/' + name}
                className={clsx(
                    'avatar-image absolute inset-0 size-full',
                    failedToLoad && 'hidden'
                )}
                alt=""
                onError={() => setFailedToLoad(true)}
            />
        </div>
    );
};
