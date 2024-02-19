import { FC } from 'react';
import { FiExternalLink } from 'react-icons/fi';

export const ContributorsSection: FC<{
    contributors?: string[];
    expandSingle?: boolean;
}> = ({ contributors, expandSingle }) => {
    if (!contributors || contributors.length === 0) return <></>;

    return (
        <div className="flex -space-x-2">
            {contributors.length === 1 && expandSingle && (
                <a
                    href={`https://github.com/${contributors[0]}?ref=ens-docs`}
                    rel="nofollow"
                    target="_blank"
                    className="flex w-fit items-center gap-2 transition-all hover:scale-105"
                >
                    <img
                        src={`https://github.com/${contributors[0]}.png?size=100`}
                        className="my-0 aspect-square size-6 rounded-full shadow-md"
                        alt={contributors[0]}
                    />
                    <span className="flex items-center gap-1 py-1 text-xs">
                        <span>{contributors[0]}</span>
                        <FiExternalLink />
                    </span>
                </a>
            )}
            {contributors.length > (expandSingle ? 1 : 0) &&
                contributors.map((contributor) => (
                    <a
                        href={`https://github.com/${contributor}?ref=ens-docs`}
                        key={contributor}
                        rel="nofollow"
                        target="_blank"
                        className="group relative transition-all hover:scale-105"
                    >
                        <img
                            src={`https://github.com/${contributor}.png?size=100`}
                            className="my-0 aspect-square w-6 rounded-full shadow-md"
                            alt={contributor}
                        />
                        <span className="absolute left-1/2 top-0 size-0">
                            <span className="relative">
                                <span className="absolute top-[-0.2rem] hidden -translate-x-1/2 -translate-y-full items-center gap-1 rounded-lg border border-ens-light-border bg-ens-light-background-primary px-2 py-1 text-xs group-hover:flex dark:border-ens-dark-border dark:bg-ens-dark-background-primary">
                                    <span>{contributor}</span>
                                    <FiExternalLink />
                                </span>
                            </span>
                        </span>
                    </a>
                ))}
        </div>
    );
};
