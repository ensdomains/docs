import Link from 'next/link';
import { FC } from 'react';
import { FiExternalLink } from 'react-icons/fi';

import { CopyButton } from './copy';

type githubDeploymentReturn = {
    address: string;
    abi: [];
};

type DeploymentData = {
    name: string;
    address?: string;
    path?: string;
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

export const ChainDeployments: FC<{
    chain: string;
    deployments: DeploymentData[];
}> = ({ chain, deployments }) => {
    return (
        <div className="card no-margin p-2">
            <div className="flex items-center gap-2 p-1 pt-0">
                <div className="h-4 w-4 rounded-full border bg-white"></div>
                <div>{chain}</div>
            </div>
            <div className="">
                {deployments.map(
                    withDeploymentData(chain, (deployment, data) => (
                        <div key={deployment.name} className="group">
                            <div className="flex justify-between gap-2 px-1 leading-4">
                                <div className="text-xs font-bold leading-4">
                                    {deployment.name}
                                </div>
                                <div className="hidden group-hover:block">
                                    {deployment.path && (
                                        <Link
                                            href={`https://github.com/ensdomains/ens-contracts/blob/${
                                                deployment.branch || 'staging'
                                            }/deployments/${chain}/${
                                                deployment.path
                                            }.json`}
                                            target="_blank"
                                            className="inline-flex items-center text-xs font-bold leading-4"
                                        >
                                            ABI <FiExternalLink />
                                        </Link>
                                    )}
                                </div>
                            </div>
                            <div className="flex justify-between gap-2 px-1 leading-4">
                                <div className="w-fit truncate text-xs">
                                    {deployment.address || data.address}
                                </div>
                                <div className="hidden group-hover:block">
                                    <CopyButton
                                        text={
                                            deployment.address || data.address
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
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
