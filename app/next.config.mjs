/* eslint-disable sonarjs/no-duplicate-string */
import nextMDX from '@next/mdx';

import { recmaPlugins } from './mdx/recma.mjs';
import { rehypePlugins } from './mdx/rehype.mjs';
import { remarkPlugins } from './mdx/remark.mjs';

/** @type {import('@next/mdx').NextMDXOptions} */
const mdxOptions = {
    options: {
        remarkPlugins,
        rehypePlugins,
        recmaPlugins,
        // providerImportSource: '@mdx-js/react',
    },
};

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    reactStrictMode: true,
    pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
    experimental: {
        // scrollRestoration: process.env.NODE_ENV === 'production',
        // mdxRs: true,
    },
    images: {
        unoptimized: true,
    },
};

const withMDX = nextMDX(mdxOptions);

export default withMDX(nextConfig);
