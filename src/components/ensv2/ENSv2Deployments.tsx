import { AnchorHTMLAttributes } from 'react'

import { ENSv2DeploymentsByChain } from '../../../scripts/ensv2-deployments'
import deploymentsJson from '../../data/generated/ensv2-deployments.json' with { type: 'any' }

const deploymentsByChain = deploymentsJson as ENSv2DeploymentsByChain[]

export function ENSv2Deployments({
  chain,
}: {
  chain: ENSv2DeploymentsByChain['slug']
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
                {(contract.abiUrl || contract.sourceUrl) && (
                  <div className="flex gap-2 text-xs">
                    {contract.abiUrl && (
                      <VocsExternalLink href={contract.abiUrl}>
                        ABI
                      </VocsExternalLink>
                    )}
                    {contract.sourceUrl && (
                      <VocsExternalLink href={contract.sourceUrl}>
                        Source
                      </VocsExternalLink>
                    )}
                  </div>
                )}
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
