import fs from 'fs/promises'
import path from 'path'
import { Hex } from 'viem'

// ENSv2 deployment addresses, sourced from what ENSjs v2 tracks.
//
// Pinned to a commit on the `feature/fet-1885-ensjs-refactor` branch so the
// build cannot break if the branch is force-pushed or deleted. To pick up new
// deployments, bump the SHA:
//   git ls-remote https://github.com/ensdomains/ensjs refs/heads/feature/fet-1885-ensjs-refactor
// and delete src/data/generated/ensv2-deployments.json to re-fetch.
//
// TODO: switch to ingesting a proper deployments file once ensjs/ens-contracts
// publish one for ENSv2 (only the fetch + parse below should need to change).
const ENSJS_COMMIT = 'd946c1fb520fe1989d9e50687b545f341d366e62'
const ENSJS_L1_URL = `https://raw.githubusercontent.com/ensdomains/ensjs/${ENSJS_COMMIT}/packages/ensjs/src/clients/l1.ts`

const CONTRACTS_V2_BLOB =
  'https://github.com/ensdomains/contracts-v2/blob/main/contracts'

// Deployment artifact snapshot in contracts-v2 that corresponds to the
// deployment set ensjs tracks (verified address-by-address; the generate step
// below re-checks this and fails on any mismatch). The newer `deployments/sepolia`
// set on main is NOT the one ensjs uses yet.
const ABI_SNAPSHOT = 'sepolia-official-v1-20260525-r2'
const ABI_BLOB = `https://github.com/ensdomains/contracts-v2/blob/main/contracts/deployments/${ABI_SNAPSHOT}`
const ABI_RAW = `https://raw.githubusercontent.com/ensdomains/contracts-v2/main/contracts/deployments/${ABI_SNAPSHOT}`

type ENSv2Deployment = {
  name: string
  ensjsKey: string
  abiFilename?: string // artifact name in the contracts-v2 snapshot
  address?: Hex
  sourceUrl?: string
  abiUrl?: string
}

export type ENSv2DeploymentsByChain = {
  name: string // Sepolia, etc.
  slug: string // sepolia, etc.
  contracts: ENSv2Deployment[]
}

// Exactly the `// v2` section of `supportedL1Contracts` in ensjs l1.ts,
// mapped to display names and contracts-v2 source files.
const ENSV2_CONTRACTS: ENSv2Deployment[] = [
  {
    name: 'ETHRegistry',
    ensjsKey: 'ensRegistry',
    abiFilename: 'ETHRegistry',
    sourceUrl: `${CONTRACTS_V2_BLOB}/src/registry/PermissionedRegistry.sol`,
  },
  {
    name: 'ETHRegistrar',
    ensjsKey: 'ensEthRegistrar',
    abiFilename: 'ETHRegistrar',
    sourceUrl: `${CONTRACTS_V2_BLOB}/src/registrar/ETHRegistrar.sol`,
  },
  {
    name: 'StandardRentPriceOracle',
    ensjsKey: 'ensStandardRentPriceOracle',
    abiFilename: 'StandardRentPriceOracle',
    sourceUrl: `${CONTRACTS_V2_BLOB}/src/registrar/StandardRentPriceOracle.sol`,
  },
  {
    name: 'VerifiableFactory',
    ensjsKey: 'ensVerifiableFactory',
    abiFilename: 'VerifiableFactory',
    sourceUrl:
      'https://github.com/ensdomains/verifiable-factory/blob/main/src/VerifiableFactory.sol',
  },
  {
    name: 'UserRegistryImpl',
    ensjsKey: 'ensUserRegistryImpl',
    abiFilename: 'UserRegistryImpl',
    sourceUrl: `${CONTRACTS_V2_BLOB}/src/registry/UserRegistry.sol`,
  },
  {
    name: 'PermissionedResolverImpl',
    ensjsKey: 'ensPermissionedResolverImpl',
    abiFilename: 'PermissionedResolverImpl',
    sourceUrl: `${CONTRACTS_V2_BLOB}/src/resolver/PermissionedResolver.sol`,
  },
  {
    name: 'HCAFactory',
    ensjsKey: 'ensHcaFactory',
    abiFilename: 'HCAFactory',
  },
  {
    name: 'LockedMigrationController',
    ensjsKey: 'ensLockedMigrationController',
    abiFilename: 'LockedMigrationController',
    sourceUrl: `${CONTRACTS_V2_BLOB}/src/migration/LockedMigrationController.sol`,
  },
  {
    name: 'UnlockedMigrationController',
    ensjsKey: 'ensUnlockedMigrationController',
    abiFilename: 'UnlockedMigrationController',
    sourceUrl: `${CONTRACTS_V2_BLOB}/src/migration/UnlockedMigrationController.sol`,
  },
  {
    name: 'MigrationHelper',
    ensjsKey: 'ensMigrationHelper',
    abiFilename: 'MigrationHelper',
    sourceUrl: `${CONTRACTS_V2_BLOB}/src/migration/MigrationHelper.sol`,
  },
  {
    name: 'USDC (payment token)',
    ensjsKey: 'usdc',
    abiFilename: 'MockUSDC',
  },
  {
    name: 'DAI (payment token)',
    ensjsKey: 'dai',
    abiFilename: 'MockDAI',
  },
]

const CHAINS = [{ name: 'Sepolia', slug: 'sepolia', ensjsChainKey: 'sepolia' }]

// Extract `key: { address: '0x...' }` pairs from one chain block of the
// `ensL1Contracts` object in ensjs l1.ts. `zeroAddress` means not deployed.
function parseChainBlock(
  source: string,
  chainKey: string
): Map<string, Hex | undefined> {
  const exportStart = source.indexOf('export const ensL1Contracts')
  if (exportStart === -1)
    throw new Error('ensv2-deployments: ensL1Contracts not found in l1.ts')
  const exportEnd = source.indexOf('export ', exportStart + 1)
  const block = source.slice(
    exportStart,
    exportEnd === -1 ? undefined : exportEnd
  )

  const chainStart = block.indexOf(`[supportedL1Chains.${chainKey}]`)
  if (chainStart === -1)
    throw new Error(
      `ensv2-deployments: chain block ${chainKey} not found in ensL1Contracts`
    )
  const nextChain = block.indexOf('[supportedL1Chains.', chainStart + 1)
  const chainBlock = block.slice(
    chainStart,
    nextChain === -1 ? undefined : nextChain
  )

  const addresses = new Map<string, Hex | undefined>()
  const entry =
    /(\w+):\s*\{\s*address:\s*(?:'(0x[0-9a-fA-F]{40})'|zeroAddress)\s*,?\s*\}/g
  for (const match of chainBlock.matchAll(entry)) {
    addresses.set(match[1], match[2] as Hex | undefined)
  }
  if (addresses.size === 0)
    throw new Error(
      `ensv2-deployments: no addresses parsed for ${chainKey}, format changed?`
    )
  return addresses
}

// Generate a JSON file with ENSv2 contract deployment info from ensjs.
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

  console.log('Fetching ENSv2 deployments (ensjs)')

  const source = await fetch(ENSJS_L1_URL).then((res) => {
    if (!res.ok)
      throw new Error(`ensv2-deployments: fetch failed (${res.status})`)
    return res.text()
  })

  const result: ENSv2DeploymentsByChain[] = CHAINS.map((chain) => {
    const addresses = parseChainBlock(source, chain.ensjsChainKey)
    const contracts = ENSV2_CONTRACTS.map((contract) => {
      if (!addresses.has(contract.ensjsKey))
        throw new Error(
          `ensv2-deployments: key ${contract.ensjsKey} missing for ${chain.slug}`
        )
      const address = addresses.get(contract.ensjsKey)
      if (!address) {
        console.warn(
          `ensv2-deployments: ${contract.ensjsKey} is zeroAddress on ${chain.slug}, skipping`
        )
        return undefined
      }
      return { ...contract, address }
    }).filter((c): c is ENSv2Deployment => c !== undefined)
    return { name: chain.name, slug: chain.slug, contracts }
  })

  // Guard: the ABI snapshot in contracts-v2 must describe the same deployment
  // set as ensjs. If a future ENSJS_COMMIT bump moves to a newer deployment,
  // this fails the build until ABI_SNAPSHOT is updated to match.
  await Promise.all(
    result.flatMap((chain) =>
      chain.contracts
        .filter((c) => c.abiFilename)
        .map(async (contract) => {
          const artifact = (await fetch(
            `${ABI_RAW}/${contract.abiFilename}.json`
          ).then((res) => {
            if (!res.ok)
              throw new Error(
                `ensv2-deployments: artifact fetch failed for ${contract.abiFilename} (${res.status})`
              )
            return res.json()
          })) as { address: string }
          if (
            artifact.address.toLowerCase() !== contract.address!.toLowerCase()
          )
            throw new Error(
              `ensv2-deployments: address mismatch for ${contract.name}: ensjs ${contract.address} vs snapshot ${artifact.address}. Update ABI_SNAPSHOT to the deployment set ensjs tracks.`
            )
          contract.abiUrl = `${ABI_BLOB}/${contract.abiFilename}.json`
        })
    )
  )

  await fs.writeFile(outFile, JSON.stringify(result, null, 2))
}
