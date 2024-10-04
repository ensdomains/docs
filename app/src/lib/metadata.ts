import { deepmerge } from 'deepmerge-ts';
import { Metadata, ResolvedMetadata } from 'next';

type CreateMetadataOptions = {
    title: string;
    description?: string;
    path: string;
};

export const createMetadata = (
    options: CreateMetadataOptions,
    parentMetadata?: ResolvedMetadata,
    extras?: Metadata
): Metadata => {
    const { title, path } = options;
    const description =
        options.description ?? parentMetadata?.description ?? undefined;

    const base: Metadata = {
        // For some reason Next.js is returning a very weird object for `metadataBase`
        // from the parentMetadata, so we need to always set it here even if it is
        // already set in app/layout.tsx
        metadataBase: new URL('https://docs.ens.domains'),
        title,
        description,
        alternates: {
            canonical: path,
        },
        openGraph: {
            title,
            description,
            url: path,
        },
        twitter: {
            title,
            description,
        },
    };

    return deepmerge(parentMetadata, base, extras ?? {});
};
