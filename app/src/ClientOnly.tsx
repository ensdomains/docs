'use client';

import { FC, ReactNode, useEffect, useState } from 'react';

export const ClientOnly: FC<{ child: () => ReactNode }> = ({ child }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setTimeout(() => {
                setVisible(true);
            }, 1);
        }
    }, []);

    return visible ? child() : undefined;
};
