import { glob } from 'glob';
import { MetadataRoute } from 'next';
import { join } from 'node:path';
import simpleGit from 'simple-git';

const SLUG_IGNORE = new Set(['dissapeared']);

const processSlugs = (slug: string) => {
    return slug.replace('index', '');
};

const getGitLastUpdatedTimeStamp = async (slug: string) => {
    const git = simpleGit({
        baseDir: process.cwd().replace(/\/app$/, ''),
    });
    const lastUpdatedTimeStamp = await git.log({
        file: process.cwd().replace(/\/app$/, '') + `/docs/${slug}`,
    });

    return new Date(lastUpdatedTimeStamp.latest.date);
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const files = await glob('**/*.mdx', {
        cwd: join(process.cwd(), '../docs'),
    });

    const routes = await Promise.all(
        files.map(async (file) => {
            const slug = file.replace(/(\/index)?\.mdx$/, '');
            const lastUpdated = await getGitLastUpdatedTimeStamp(file);

            if (SLUG_IGNORE.has(slug)) {
                return;
            }

            return {
                url: 'https://docs.ens.domains/' + processSlugs(slug),
                lastModified: lastUpdated,
            };
        })
    );

    return routes.filter(Boolean);
}
