'use client';

import { usePathname } from 'next/navigation';
import { FC } from 'react';
import { FiGithub } from 'react-icons/fi';

const ROOT_REPO = 'ensdomains/docs';

export const ContributeLink: FC<{ url?: string }> = ({ url }) => {
    if (!url) {
        const asPath = usePathname();

        url = `/pages${asPath}.mdx`;
        console.warn(
            'Failed to get url, defaulting back to asPath from useRouter',
            url
        );

        return <></>;
    }

    // Get current git branch
    const branch = process.env.CF_PAGES_BRANCH || 'master';

    return (
        <a
            href={`https://github.com/${ROOT_REPO}/edit/${branch}${url}`}
            className="text-ens-light-blue-primary dark:text-ens-dark-blue-primary flex items-center gap-2 text-xs"
            target="_blank"
            rel="nofollow"
        >
            <FiGithub />
            <span>Edit this page on GitHub</span>
        </a>
    );
};
