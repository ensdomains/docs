import { FC } from 'react';

import { GithubRepository } from './github';

export type RepositoryType = {
    src: string;
    name?: string;
    description?: string;
    type?: 'github';
};

export const Repository: FC<RepositoryType> = async (properties) => {
    const { type = 'github' } = properties;

    if (type !== 'github') return <p>Unsupported Repository Type</p>;

    return <GithubRepository {...properties} />;
};
