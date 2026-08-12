import fs from 'fs/promises'
import path from 'path'
import { Hex } from 'viem'

// ENSv2 deployment addresses, sourced from the auto-generated addresses file
// in contracts-v2 (`bun run docs:addresses` output).
//
// Pinned to a commit so the build cannot break if the branch moves. To pick up
// a new deployment set, bump the SHA to a commit whose
// `contracts/docs/addresses/sepolia.md` and `contracts/deployments/sepolia/`
// describe the same deployment, then delete
// src/data/generated/ensv2-deployments.json to re-fetch.
const CONTRACTS_V2_COMMIT = '97a57293f3b4279d94b571e678edb53ce62638f4'

const ADDRESSES_MD_RAW = `https://raw.githubusercontent.com/ensdomains/contracts-v2/${CONTRACTS_V2_COMMIT}/contracts/docs/addresses/sepolia.md`
const ARTIFACTS_RAW = `https://raw.githubusercontent.com/ensdomains/contracts-v2/${CONTRACTS_V2_COMMIT}/contracts/deployments/sepolia`
const ARTIFACTS_BLOB = `https://github.com/ensdomains/contracts-v2/blob/${CONTRACTS_V2_COMMIT}/contracts/deployments/sepolia`
const CONTRACTS_BLOB = `https://github.com/ensdomains/contracts-v2/blob/${CONTRACTS_V2_COMMIT}/contracts`

type ENSv2Deployment = {
  name: string
  address?: Hex
  sourceUrl?: string
  abiUrl?: string
}

export type ENSv2DeploymentsByChain = {
  name: string // Sepolia, etc.
  slug: string // sepolia, etc.
  contracts: ENSv2Deployment[]
}

// Source links for contracts whose implementation is NOT a plain in-repo file
// (e.g. it lives in a git submodule, which has no blob URL at our pin). All
// other source links are derived from the deployment artifact's
// `metadata.settings.compilationTarget`.
const SOURCE_URL_OVERRIDES: Record<string, string> = {
  VerifiableFactory:
    'https://github.com/ensdomains/verifiable-factory/blob/main/src/VerifiableFactory.sol',
}

// Derive the source blob URL from an artifact's compilation target, e.g.
// "project/src/hca/StandaloneSingleOwnerHCA.sol" -> contracts/src/... at the
// pinned commit. Submodule paths (project/lib/...) have no blob URL; skip.
function sourceUrlFromArtifact(artifact: {
  metadata?: string | { settings?: { compilationTarget?: Record<string, string> } }
}): string | undefined {
  let metadata = artifact.metadata
  if (typeof metadata === 'string') {
    try {
      metadata = JSON.parse(metadata)
    } catch {
      return undefined
    }
  }
  const target = (metadata as { settings?: { compilationTarget?: Record<string, string> } })
    ?.settings?.compilationTarget
  const sourcePath = target ? Object.keys(target)[0] : undefined
  if (!sourcePath?.startsWith('project/') || sourcePath.startsWith('project/lib/'))
    return undefined
  return `${CONTRACTS_BLOB}/${sourcePath.slice('project/'.length)}`
}

// Parse `| Name | [0x...](explorer link) |` rows from the addresses markdown.
function parseAddressesMd(source: string): Map<string, Hex> {
  const rows = new Map<string, Hex>()
  const entry = /^\|\s*([A-Za-z0-9]+)\s*\|\s*\[(0x[0-9a-fA-F]{40})\]/gm
  for (const match of source.matchAll(entry)) {
    rows.set(match[1], match[2] as Hex)
  }
  if (rows.size === 0)
    throw new Error(
      'ensv2-deployments: no address rows parsed from sepolia.md, format changed?'
    )
  return rows
}

// Generate a JSON file with ENSv2 contract deployment info from contracts-v2.
// Only runs once; delete the generated file to re-fetch.
export async function ensv2Deployments() {
  const outFile = path.join(
    __dirname,
    '..',
    'src/data/generated/ensv2-deployments.json'
  )

  const alreadyExists = await fs
    .access(outFile)
    .then(() => true)
    .catch(() => false)
  if (alreadyExists) {
    return
  }

  console.log('Fetching ENSv2 deployments (contracts-v2)')

  const source = await fetch(ADDRESSES_MD_RAW).then((res) => {
    if (!res.ok)
      throw new Error(`ensv2-deployments: fetch failed (${res.status})`)
    return res.text()
  })
  const rows = parseAddressesMd(source)

  const contracts: ENSv2Deployment[] = await Promise.all(
    [...rows.entries()].map(async ([name, address]) => {
      const contract: ENSv2Deployment = {
        name,
        address,
        sourceUrl: SOURCE_URL_OVERRIDES[name],
      }
      // Guard: the deployment artifact must exist and carry the same address
      // as the addresses file. A mismatch means the two describe different
      // deployment sets and the pin needs attention.
      const res = await fetch(`${ARTIFACTS_RAW}/${name}.json`)
      if (res.ok) {
        const artifact = (await res.json()) as {
          address?: string
          metadata?: string
        }
        if (
          artifact.address &&
          artifact.address.toLowerCase() !== address.toLowerCase()
        )
          throw new Error(
            `ensv2-deployments: address mismatch for ${name}: addresses file ${address} vs artifact ${artifact.address}`
          )
        contract.abiUrl = `${ARTIFACTS_BLOB}/${name}.json`
        contract.sourceUrl ??= sourceUrlFromArtifact(artifact)
      } else {
        console.warn(
          `ensv2-deployments: no artifact for ${name} (${res.status}), skipping ABI link`
        )
      }
      return contract
    })
  )

  const result: ENSv2DeploymentsByChain[] = [
    { name: 'Sepolia', slug: 'sepolia', contracts },
  ]

  await fs.writeFile(outFile, JSON.stringify(result, null, 2))
}
