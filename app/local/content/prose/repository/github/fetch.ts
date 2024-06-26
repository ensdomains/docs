import { GithubRepositoryData } from './type';

export const fetchGithubRepositoryData = async (
    name: string
): Promise<GithubRepositoryData> => {
    const response = await fetch('https://api.github.com/repos/' + name);

    return (await response.json()) as GithubRepositoryData;
};
