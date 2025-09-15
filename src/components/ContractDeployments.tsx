import { AnchorHTMLAttributes } from 'react'

import { DeploymentsByChain } from '../../scripts/deployments'
import deploymentsJson from '../data/generated/deployments.json' with { type: 'any' }

const deploymentsByChain = deploymentsJson as DeploymentsByChain[]

export function ContractDeployments({
  chain,
}: {
  chain: DeploymentsByChain['slug']
}) {
  return deploymentsByChain
    ?.filter((c) => c.slug === chain)
    .map((chain) => (
      <table className="vocs_Table" key={chain.slug}>
        <thead>
          <tr className="vocs_TableRow">
            <th className="vocs_TableHeader">Contract</th>
            <th className="vocs_TableHeader">Address</th>
          </tr>
        </thead>
        <tbody>
          {chain.contracts.map((contract) => (
            <tr className="vocs_TableRow" key={contract.name}>
              <td className="vocs_TableCell">
                <span>{contract.name}</span>
                <div className="flex gap-2 text-xs">
                  <VocsExternalLink
                    href={`https://github.com/ensdomains/ens-contracts/blob/staging/deployments/${chain.slug}/${contract.github.filename}.json`}
                  >
                    ABI
                  </VocsExternalLink>
                  {contract.github.srcPath && (
                    <VocsExternalLink
                      href={`https://github.com/ensdomains/ens-contracts/blob/staging/${contract.github.srcPath}/${contract.github.filename}.sol`}
                    >
                      Source
                    </VocsExternalLink>
                  )}
                </div>
              </td>
              <td className="vocs_TableCell font-mono">{contract.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    ))
}

function VocsExternalLink({
  href,
  children,
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      href={href}
      target="_blank"
      className="vocs_Anchor vocs_Link vocs_Link_accent_underlined vocs_ExternalLink"
      style={{
        // @ts-ignore
        '--vocs_ExternalLink_iconUrl': 'url(/.vocs/icons/arrow-diagonal.svg)',
      }}
    >
      {children}
    </a>
  )
}
