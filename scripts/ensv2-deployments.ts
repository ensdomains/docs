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
  metadata?:
    | string
    | { settings?: { compilationTarget?: Record<string, string> } }
}): string | undefined {
  let metadata = artifact.metadata
  if (typeof metadata === 'string') {
    try {
      metadata = JSON.parse(metadata)
    } catch {
      return undefined
    }
  }
  const target = (
    metadata as { settings?: { compilationTarget?: Record<string, string> } }
  )?.settings?.compilationTarget
  const sourcePath = target ? Object.keys(target)[0] : undefined
  if (
    !sourcePath?.startsWith('project/') ||
    sourcePath.startsWith('project/lib/')
  )
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

// HACKATHON(ETHOnline 2026): temporary override. The table serves the dedicated
// hackathon deployment (2026-09-03) instead of the pinned contracts-v2 set.
// This deployment has no contracts-v2 ref, so there are no ABI/source links.
// Remove this block (and restore the fetch path) together with the other
// hackathon commits before this branch merges.
const HACKATHON_CONTRACTS: ENSv2Deployment[] = [
  {
    name: 'BatchRegistrar',
    address: '0xc8efa80d9f645b26bacd1bae8638492df3bae8ca' as Hex,
  },
  {
    name: 'ContractNamer',
    address: '0x21a2b577709727119f1901314e0ba0150eafa15e' as Hex,
  },
  {
    name: 'DefaultReverseRegistrarAdapter',
    address: '0x0a8d7ed4061548fb3cb192d0cbe9e1a57b3b1ae9' as Hex,
  },
  {
    name: 'DNSAliasResolver',
    address: '0x005a3bf1d92ebe4b1e1641a0c6fa49f38e1762a6' as Hex,
  },
  {
    name: 'DNSSECGatewayProvider',
    address: '0xfedb5c2fea17cef8547d534c3125f7601d3e30bd' as Hex,
  },
  {
    name: 'DNSTLDResolver',
    address: '0x10107255fda20ab6c37a0efca1e9465f25066a00' as Hex,
  },
  {
    name: 'DNSTXTResolver',
    address: '0x0ebc944ac29f91cc24ee507a2d46aa4901bbc748' as Hex,
  },
  {
    name: 'ENSV1Resolver',
    address: '0x1f11e5b8bca2ccfe13bd8431853db159c4e9849c' as Hex,
  },
  {
    name: 'ENSV2Resolver',
    address: '0xb1b2d8c4d4886d0d567b6a6b8a4b885229fafae4' as Hex,
  },
  {
    name: 'ETHRegistrar',
    address: '0x7d1b7f586a62ac3f54b9a396849757814283270b' as Hex,
  },
  {
    name: 'ETHRegistry',
    address: '0x1d78834d97c1d7b1a38c1dedbd1a287cfed3971e' as Hex,
  },
  {
    name: 'ETHRenewerV1',
    address: '0x47bc0ab8f87db01383255e564cce92956ecc7c70' as Hex,
  },
  {
    name: 'Graveyard',
    address: '0x2c29661b216717650ba6d4836b2bd37a0fe19adb' as Hex,
  },
  {
    name: 'HCAOwnerAndSessionValidator',
    address: '0xeb099163a41912a94e56b2143feb6eb7979a51f0' as Hex,
  },
  {
    name: 'HCAUpgradeSet',
    address: '0xde59f9285edbe391fc32d3cba8909ea047cc0fc3' as Hex,
  },
  {
    name: 'LabelStore',
    address: '0xd7351f76866123a7e49381f38a30a96adba7e855' as Hex,
  },
  {
    name: 'LockedMigrationController',
    address: '0x7fa65c83dd80cca2fbd91e16a6dc4f66b64efe22' as Hex,
  },
  {
    name: 'ManagedUniversalResolverProxy',
    address: '0x1abed09f1f36383f27cf0b3a5e0ea1738e1fd921' as Hex,
  },
  {
    name: 'MigrationHelper',
    address: '0x540f222a6fd9a54e77989556f366940d1ad81aec' as Hex,
  },
  {
    name: 'MockDAI',
    address: '0x93403a98c3a6be906585cd0d68447c0fc600fb38' as Hex,
  },
  {
    name: 'MockRegistrationIntentExecutor',
    address: '0x9675de20abf0216d07e3f5782dd92d0c7d3bb2cb' as Hex,
  },
  {
    name: 'MockUSDC',
    address: '0xcbfd80f74375c54e545af34788ff465f96f66f05' as Hex,
  },
  {
    name: 'PermissionedResolverImpl',
    address: '0xa9d3814ab151bf6e37a427432795371a8361614e' as Hex,
  },
  {
    name: 'PublicResolverSet',
    address: '0x3866e84b54a78d1e3778421e0fbf3607fa9c402f' as Hex,
  },
  {
    name: 'PublicResolverV2',
    address: '0xf9de4979ddb290baf5b760d0e788125017bc33f6' as Hex,
  },
  {
    name: 'RegistryUpgradeSet',
    address: '0x658c43979721b6d30d173ea09622f2475761b382' as Hex,
  },
  {
    name: 'ReverseRegistrarAdapter',
    address: '0x67ee68067c74cb3ab595fb793860f98c8a0283f7' as Hex,
  },
  {
    name: 'RootBatchRegistrar',
    address: '0x9b30da91c1a3fb972d5a7d102390598d5ca70376' as Hex,
  },
  {
    name: 'RootRegistry',
    address: '0xe7f0d5724f8337e3aa9a9910540341ff4273fed9' as Hex,
  },
  {
    name: 'StandaloneHCAFactory',
    address: '0xb85152a8ef4db5caf37af6bffce66b559a9c0b58' as Hex,
  },
  {
    name: 'StandaloneHCAImplementation',
    address: '0x7328a1926b45f0339913ab654fb98d1a0f5ec894' as Hex,
  },
  {
    name: 'StandardRentPriceOracle',
    address: '0xfeba6589b5c1b35875c0389ccedf83148b6ee71b' as Hex,
  },
  {
    name: 'TestnetV1PremigrationRegistrar',
    address: '0x1a8c627dc167bcf6b991e9d6e0a76e2dfab7ee88' as Hex,
  },
  {
    name: 'UniversalHelper',
    address: '0x1d4cd7545d456f3b6a7e4380182279afcfa887b6' as Hex,
  },
  {
    name: 'UniversalResolverV2',
    address: '0xfea8d4b7fcce0b8765c793d6695eac384aaa458f' as Hex,
  },
  {
    name: 'UnlockedMigrationController',
    address: '0x97494264ad5437611cc2f43987c21f6f352d786a' as Hex,
  },
  {
    name: 'UpgradableUniversalResolverProxy',
    address: '0xd26f2040d083af1cd2962ba303f4bea0c4faf142' as Hex,
  },
  {
    name: 'UserRegistryImpl',
    address: '0x47b442d0cf617c41cabaff5f02f44dd1e5f72546' as Hex,
  },
  {
    name: 'VerifiableFactory',
    address: '0x894bc9cc8ff1ad96b8a288c86a8c71d662c07780' as Hex,
  },
  {
    name: 'WrapperRegistryImpl',
    address: '0x7c53b9dcef516662e9e8a229448cac30b90673cd' as Hex,
  },
]

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

  // HACKATHON(ETHOnline 2026): static list, skip fetching. Remove with the
  // other hackathon commits before merge.
  await fs.writeFile(
    outFile,
    JSON.stringify(
      [{ name: 'Sepolia', slug: 'sepolia', contracts: HACKATHON_CONTRACTS }],
      null,
      2
    )
  )
  if (HACKATHON_CONTRACTS.length > 0) {
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
