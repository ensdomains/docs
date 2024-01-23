'use client';

// eslint-disable-next-line unicorn/prefer-node-protocol
import crypto from 'crypto';
import { usePathname } from 'next/navigation';
import { FC, PropsWithChildren } from 'react';

import { cx } from '@/lib/cx';

const prefix = 'docs';
const repo = 'ensdomains/docs-v2';

export const GitCommitLink: FC<
    PropsWithChildren<{ file: string; hash: string }>
> = ({ file, hash, children }) => {
    const file_hash = crypto
        .createHash('sha256')
        .update(prefix + file)
        .digest('hex');
    const pathname = usePathname();
    const isDAO = pathname.startsWith('/dao');

    return (
        <a
            href={`https://github.com/${repo}/commit/${hash}#diff-${file_hash}`}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className={cx(
                'flex items-center gap-1 hover:underline',
                isDAO ? 'text-ens-light-blue-dao-400' : 'text-blue-500'
            )}
        >
            {children}
        </a>
    );
};
