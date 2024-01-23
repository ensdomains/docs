'use client';

import { FC, useEffect } from 'react';

export const RouteCheck: FC<{ slug: string }> = ({ slug }) => {
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const path = window.location.pathname;

            if (path !== slug) {
                console.log('Navigating in favor to ' + slug + ' from ' + path);
                window.location.pathname = slug;
            }
        }
    }, []);

    return <></>;
};

export const redirectToIndex = () => <RouteCheck slug="/" />;
