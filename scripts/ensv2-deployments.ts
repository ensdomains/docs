import fs from 'fs/promises'
import path from 'path'
import { Hex } from 'viem'

// ENSv2 deployment addresses, sourced from the auto-generated addresses files
// in contracts-v2 (`bun run docs:addresses` output).
//
// Each chain is pinned to a commit so the build cannot break if a branch
// moves. To pick up a new deployment set, bump that chain's SHA to a commit
// whose `contracts/docs/addresses/<slug>.md` and
// `contracts/deployments/<slug>/` describe the same deployment. The generated
// cache is refreshed automatically when a chain's pin changes.
const CHAINS = [
  {
    name: 'Mainnet',
    slug: 'mainnet',
    // deploy/mainnet-v2-20261002, deployment manifest dated 2026-10-26.
    commit: '4f47cbcc11462fb413196e6b5c0f8090247a6c08',
  },
  {
    name: 'Sepolia',
    slug: 'sepolia',
    // merge commit of contracts-v2 PR #460, deployment of 2026-10-01
    commit: '07e55a056f5b6a9c90119f501bdd05714e67dddd',
  },
] as const

type ENSv2Deployment = {
  name: string
  address?: Hex
  sourceUrl?: string
  abiUrl?: string
}

export type ENSv2DeploymentsByChain = {
  name: string // Sepolia, etc.
  slug: string // sepolia, etc.
  sourceCommit: string
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
function sourceUrlFromArtifact(
  artifact: {
    metadata?: string | { settings?: { compilationTarget?: Record<string, string> } }
  },
  contractsBlob: string
): string | undefined {
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
  return `${contractsBlob}/${sourcePath.slice('project/'.length)}`
}

// Parse `| Name | [0x...](explorer link) |` rows from the addresses markdown.
function parseAddressesMd(source: string, slug: string): Map<string, Hex> {
  const rows = new Map<string, Hex>()
  const entry = /^\|\s*([A-Za-z0-9]+)\s*\|\s*\[(0x[0-9a-fA-F]{40})\]/gm
  for (const match of source.matchAll(entry)) {
    rows.set(match[1], match[2] as Hex)
  }
  if (rows.size === 0)
    throw new Error(
      `ensv2-deployments: no address rows parsed from ${slug}.md, format changed?`
    )
  return rows
}

async function fetchChain(chain: (typeof CHAINS)[number]): Promise<ENSv2DeploymentsByChain> {
  const base = `https://raw.githubusercontent.com/ensdomains/contracts-v2/${chain.commit}`
  const blobBase = `https://github.com/ensdomains/contracts-v2/blob/${chain.commit}`
  const addressesMdRaw = `${base}/contracts/docs/addresses/${chain.slug}.md`
  const artifactsRaw = `${base}/contracts/deployments/${chain.slug}`
  const artifactsBlob = `${blobBase}/contracts/deployments/${chain.slug}`
  const contractsBlob = `${blobBase}/contracts`

  const source = await fetch(addressesMdRaw).then((res) => {
    if (!res.ok)
      throw new Error(`ensv2-deployments: fetch failed for ${chain.slug} (${res.status})`)
    return res.text()
  })
  const rows = parseAddressesMd(source, chain.slug)

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
      const res = await fetch(`${artifactsRaw}/${name}.json`)
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
            `ensv2-deployments: address mismatch for ${chain.slug}/${name}: addresses file ${address} vs artifact ${artifact.address}`
          )
        contract.abiUrl = `${artifactsBlob}/${name}.json`
        contract.sourceUrl ??= sourceUrlFromArtifact(artifact, contractsBlob)
      } else {
        console.warn(
          `ensv2-deployments: no artifact for ${chain.slug}/${name} (${res.status}), skipping ABI link`
        )
      }
      return contract
    })
  )

  return {
    name: chain.name,
    slug: chain.slug,
    sourceCommit: chain.commit,
    contracts,
  }
}

// Generate a JSON file with ENSv2 contract deployment info from contracts-v2.
// Reuse the generated file only while its source commits match the pins.
export async function ensv2Deployments() {
  const outFile = path.join(
    __dirname,
    '..',
    'src/data/generated/ensv2-deployments.json'
  )

  const cached = await fs
    .readFile(outFile, 'utf8')
    .then((source) => JSON.parse(source) as ENSv2DeploymentsByChain[])
    .catch(() => undefined)
  if (
    Array.isArray(cached) &&
    cached.length === CHAINS.length &&
    CHAINS.every((chain) =>
      cached.some(
        (entry) => entry.slug === chain.slug && entry.sourceCommit === chain.commit
      )
    )
  ) {
    return
  }

  console.log('Fetching ENSv2 deployments (contracts-v2)')

  const result: ENSv2DeploymentsByChain[] = []
  for (const chain of CHAINS) {
    result.push(await fetchChain(chain))
  }

  await fs.writeFile(outFile, JSON.stringify(result, null, 2))
}
