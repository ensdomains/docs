import { Fetcher } from 'swr';

import { SearchResult } from '../types/result';

export const searchFetcher: Fetcher<
    SearchResult,
    { search: string; tag: string }
> = async ({ search, tag }) => {
    // @ts-ignore
    const result = await fetch(
        'https://search.v3x.systems/indexes/ens-docs/search',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization:
                    'Bearer b77dacb494c3272351784097847e34c59b22510b30aa0ed662f1e79e1df658a0',
            } as any,
            body: JSON.stringify({
                q: search,
                limit: 5,
                showMatchesPosition: true,
                attributesToCrop: ['content'],
                attributesToRetrieve: [
                    'title',
                    'slug',
                    'description',
                    'authors',
                    'tag',
                    'emoji',
                ],
                filter: tag === 'All' ? undefined : `tag = '${tag}'`,
                cropLength: 10,
                attributesToHighlight: ['content', 'title'],
            }) as any,
        }
    );

    return result.json();
};
