import { FC } from 'react';
import { FiFolderPlus, FiGitBranch, FiGithub, FiStar } from 'react-icons/fi';

import { RepositoryType } from '../Repository';
import { fetchGithubRepositoryData } from './fetch';

const getLanguageColor = (language: string) => {
    if (language === 'TypeScript') {
        return '#2b7489';
    }

    if (language === 'JavaScript') {
        return '#f1e05a';
    }

    if (language === 'HTML') {
        return '#e34c26';
    }

    if (language === 'Rust') {
        return '#dea584';
    }

    return '';
};

export const GithubRepository: FC<RepositoryType> = async ({
    src,
    name,
    description,
}) => {
    const {
        description: gh_description,
        html_url,
        forks_count,
        is_template,
        stargazers_count,
        language,
    } = await fetchGithubRepositoryData(src);

    name = name || src;
    description = description || gh_description;

    const languageColor = getLanguageColor(language);

    return (
        <span className="not-prose gh-repo block">
            <a
                href={html_url}
                target="_blank"
                className="mb-2 flex w-full rounded-lg border border-ens-light-border p-4 hover:bg-ens-light-background-secondary dark:border-ens-dark-border dark:hover:bg-ens-dark-background-secondary"
            >
                <span className="block pt-1">
                    {is_template ? <FiFolderPlus /> : <FiGithub />}
                </span>
                <span className="grow pl-2 leading-5">
                    <b>{name}</b>
                    <p>{description}</p>
                </span>
                <span className="hidden items-start gap-2 md:flex">
                    {language && (
                        <span
                            style={{ color: languageColor }}
                            className="flex items-center text-sm"
                        >
                            <span className="mr-0.5 text-xs leading-3">●</span>
                            <span className="leading-3">{language}</span>
                        </span>
                    )}
                    {stargazers_count > 10 && (
                        <span className="flex items-center text-gray-400">
                            <FiStar className="mr-0.5" />
                            <span className="leading-3">
                                {stargazers_count}
                            </span>
                        </span>
                    )}
                    {forks_count > 10 && (
                        <span className="flex items-center text-gray-400">
                            <FiGitBranch className="mr-0.5" />
                            <span className="leading-3">{forks_count}</span>
                        </span>
                    )}
                </span>
            </a>
        </span>
    );
};
