import { glob } from 'glob';
import { join } from 'node:path';
import { cache } from 'react';

const contentDirectory = join(process.cwd(), '../docs');

const _getAllPageSlugs = async () => {
    console.log('🧹 GLOBBING DA FILES');

    const files = await glob('**/*.mdx', { cwd: contentDirectory });

    return files.map((file) => file.replace(/(\/index)?\.mdx$/, ''));
};

export const getAllPageSlugs = cache(_getAllPageSlugs);
