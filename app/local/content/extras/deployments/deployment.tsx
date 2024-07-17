import Link from 'next/link';
import { FC } from 'react';
import { FiExternalLink } from 'react-icons/fi';

import { CodeGroup } from '#/content/prose/code/group/CodeGroup';
import { BLOCKCHAIN_EXPLORERS } from '#/data/blockchain_explorers';
import { Deployment, DEPLOYMENTS } from '#/data/deployments';

import { CopyButton } from './copy';

type githubDeploymentReturn = {
    address: string;
    abi: [];
};

export type DeploymentData = {
    name: string;
    address?: string;
    path?: string;
    srcPath?: string;
    branch?: string;
};

export const getGithubDeployment = async (
    branch: string = 'staging',
    chain: string = 'mainnet',
    path: string = 'ENSRegistry'
) => {
    const url = `https://raw.githubusercontent.com/ensdomains/ens-contracts/${branch}/deployments/${chain}/${path}.json`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Failed to fetch ${url}`);
    }

    return (await response.json()) as githubDeploymentReturn;
};

const ChainDeployment: FC<{
    identifier?: string;
    preset: string;
    title: string;
    chain: Deployment;
}> = async ({ identifier, preset, chain }) => {
    return (
        <div
            className="hidable-code not-prose group overflow-hidden rounded-b-xl border border-ens-light-border dark:border-ens-dark-border"
            data-code-variant={preset}
            data-code-group={identifier}
        >
            {chain.contracts.map(
                withDeploymentData(chain.slug, (deployment, data) => (
                    <div
                        key={deployment.name}
                        className="group flex flex-col justify-between gap-2 border-b border-b-ens-light-border p-4 last:border-b-0 dark:border-b-ens-dark-border md:flex-row md:items-center"
                    >
                        <div className="">
                            <div className="text-base font-bold leading-5">
                                {deployment.name}
                            </div>
                            <div className="flex flex-wrap gap-x-2 text-sm font-bold text-ens-light-blue-primary">
                                {deployment.path && (
                                    <Link
                                        href={`https://github.com/ensdomains/ens-contracts/blob/${
                                            deployment.branch || 'staging'
                                        }/deployments/${chain.slug}/${
                                            deployment.path
                                        }.json`}
                                        target="_blank"
                                        className="inline-flex items-center text-xs font-bold leading-5"
                                    >
                                        <FiExternalLink />
                                        ABI
                                    </Link>
                                )}

                                {deployment.srcPath && (
                                    <Link
                                        href={`https://github.com/ensdomains/ens-contracts/blob/${
                                            deployment.branch || 'staging'
                                        }/${deployment.srcPath}`}
                                        target="_blank"
                                        className="inline-flex items-center text-xs font-bold leading-4"
                                    >
                                        <FiExternalLink />
                                        Source
                                    </Link>
                                )}
                                {data?.address &&
                                    BLOCKCHAIN_EXPLORERS[chain.id][0].name && (
                                        <Link
                                            href={BLOCKCHAIN_EXPLORERS[
                                                chain.id
                                            ][0].contract_url.replace(
                                                '%ADDRESS%',
                                                data?.address
                                            )}
                                            target="_blank"
                                            className="inline-flex items-center text-xs font-bold leading-5"
                                        >
                                            <FiExternalLink />
                                            {
                                                BLOCKCHAIN_EXPLORERS[
                                                    chain.id
                                                ][0].name
                                            }
                                        </Link>
                                    )}
                            </div>
                        </div>
                        <div
                            className={
                                'flex items-center justify-between gap-2 overflow-x-auto rounded-lg border border-ens-light-border bg-ens-light-background-secondary px-3 py-[10px] text-base md:w-[480px]'
                            }
                        >
                            <pre className="text-wrap break-all p-0 text-base">
                                {deployment.address || data.address}
                            </pre>

                            <CopyButton
                                text={deployment.address || data.address}
                            />
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export const ChainDeployments: FC = () => {
    return (
        <CodeGroup title="Contracts" presets="chain">
            {DEPLOYMENTS.map((chain) => (
                <ChainDeployment
                    chain={chain}
                    preset={chain.slug}
                    title={chain.name}
                    key={chain.slug}
                />
            ))}
        </CodeGroup>
    );
};

const withDeploymentData = <K extends object>(
    chain: string,
    callback: (_deployment: DeploymentData, _data: githubDeploymentReturn) => K
) => {
    return async (deployment: DeploymentData) => {
        const data = deployment.path
            ? await getGithubDeployment(
                  deployment.branch,
                  chain,
                  deployment.path
              )
            : ({
                  address: deployment.address,
                  abi: [],
              } as githubDeploymentReturn);

        return callback(deployment, data);
    };
};
