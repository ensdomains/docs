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
      <div className="overflow-x-auto" key={chain.slug}>
        <table data-v data-ens-table>
          <thead>
            <tr>
              <th>Contract</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {chain.contracts.map((contract) => (
              <tr key={contract.name}>
                <td>
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
                <td className="font-mono">{contract.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ))
}

function VocsExternalLink({
  href,
  children,
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      data-v-link
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
