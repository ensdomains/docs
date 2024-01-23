import { Glob } from 'bun';
import { convert } from 'html-to-text';
import { join } from 'node:path';

// Find all html files in the docs output directory
const glob = new Glob('**/*.html');

// Path to import.meta.url
// eslint-disable-next-line unicorn/prevent-abbreviations
const docsOutputDir = new URL('../out', import.meta.url).pathname;

console.log('=========================');
console.log(docsOutputDir);

type ContentMetadata = {
    title: string;
    description: string;
    emoji: string;
    showDetailsSection: boolean;
    contributors: string[];
    id: string;
    slug: string;
    tag: string;
};

// eslint-disable-next-line no-undef
const metadata = await Bun.file(
    join(docsOutputDir, 'content-metadata.json')
).json<ContentMetadata[]>();

const content: Record<string, string> = {};

const ignoredSlugs = new Set(['404']);

for await (const path of glob.scan({
    cwd: docsOutputDir,
    absolute: true,
})) {
    const slug = path
        .replace(docsOutputDir, '')
        .replace(/(?<!^)(\/index)?\.html$|^\//gm, '');

    if (ignoredSlugs.has(slug)) continue;

    // eslint-disable-next-line no-undef
    const file = Bun.file(path);

    const text = await file.text();

    // Convert the html to text to be used for search indexing
    const parsed = convert(text, {
        wordwrap: false,
        selectors: [
            { selector: 'img', format: 'skip' },
            { selector: 'a', options: { ignoreHref: true } },
            { selector: 'video', format: 'skip' },
            { selector: 'article > h1', format: 'skip' },
        ],
        baseElements: {
            selectors: ['article'],
        },
    });

    content[slug] = parsed.replace(/\n/g, ' ');

    console.log(slug, '🔍', path);
}

const out = metadata.map((meta) => ({
    ...meta,
    content: content[meta.slug],
}));

// eslint-disable-next-line no-undef
Bun.write(join(docsOutputDir, 'search.json'), JSON.stringify(out));
console.log('Done!');
