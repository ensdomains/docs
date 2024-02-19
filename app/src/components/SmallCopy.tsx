'use client';

import { FC } from 'react';
import { FiCopy } from 'react-icons/fi';

export const SmallCopy: FC<{ data: string; className?: string }> = ({
    data,
    className,
}) => {
    return (
        <button
            onClick={() => {
                navigator.clipboard.writeText(data as string);
            }}
            className={className}
        >
            <FiCopy />
        </button>
    );
};
