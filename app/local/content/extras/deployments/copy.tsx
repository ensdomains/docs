'use client';

import { FC } from 'react';
import { FiClipboard } from 'react-icons/fi';

import { Button } from '@/components/Button';

export const CopyButton: FC<{ text: string }> = ({ text }) => {
    return (
        <Button
            onClick={() => {
                navigator.clipboard.writeText(text);
            }}
            variant="primary"
        >
            <FiClipboard />
        </Button>
    );
};
