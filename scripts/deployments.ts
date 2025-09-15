import fs from 'fs/promises'
import path from 'path'
import { Abi, Hex, TransactionReceipt } from 'viem'

type Deployment = {
  name: string
  address?: Hex
  github: {
    filename: string
    srcPath?: string
  }
}

export type DeploymentsByChain = {
  name: string // Mainnet, Sepolia, etc.
  slug: string // mainnet, sepolia, etc.
  contracts: Deployment[]
}

type DeploymentFile = {
  address: Hex
  abi: Abi
  transactionHash: Hex
  receipt: TransactionReceipt
  args: unknown[]
}

let DEPLOYMENTS: DeploymentsByChain[] = [
  {
    name: 'Mainnet',
    slug: 'mainnet',
    contracts: [
      {
        name: 'Registry',
        github: {
          filename: 'ENSRegistry',
          srcPath: 'contracts/registry/',
        },
      },
      {
        name: 'Base Registrar',
        github: {
          filename: 'BaseRegistrarImplementation',
          srcPath: 'contracts/ethregistrar/',
        },
      },
      {
        name: 'ETH Registrar Controller (Latest)',
        github: {
          filename: 'ETHRegistrarController',
          srcPath: 'contracts/ethregistrar/',
        },
      },
      {
        name: 'Wrapped ETH Registrar Controller',
        github: {
          filename: 'WrappedETHRegistrarController',
        },
      },
      {
        name: 'DNS Registrar',
        github: {
          filename: 'DNSRegistrar',
          srcPath: 'contracts/dnsregistrar/',
        },
      },
      {
        name: 'L1 Reverse Registrar',
        github: {
          filename: 'ReverseRegistrar',
          srcPath: 'contracts/reverseRegistrar/',
        },
      },
      {
        name: 'Default Reverse Registrar',
        github: {
          filename: 'DefaultReverseRegistrar',
          srcPath: 'contracts/reverseRegistrar/',
        },
      },
      {
        name: 'Name Wrapper',
        github: {
          filename: 'NameWrapper',
          srcPath: 'contracts/wrapper/',
        },
      },
      {
        name: 'Public Resolver',
        github: {
          filename: 'PublicResolver',
          srcPath: 'contracts/resolvers/',
        },
      },
      {
        name: 'Universal Resolver',
        github: {
          filename: 'UniversalResolver',
          srcPath: 'contracts/utils/',
        },
      },
    ],
  },
  {
    name: 'Sepolia',
    slug: 'sepolia',
    contracts: [
      {
        name: 'Registry',
        github: {
          filename: 'ENSRegistry',
          srcPath: 'contracts/registry/',
        },
      },
      {
        name: 'Base Registrar',
        github: {
          filename: 'BaseRegistrarImplementation',
          srcPath: 'contracts/ethregistrar/',
        },
      },
      {
        name: 'ETH Registrar Controller',
        github: {
          filename: 'ETHRegistrarController',
          srcPath: 'contracts/ethregistrar/',
        },
      },
      {
        name: 'DNS Registrar',
        github: {
          filename: 'DNSRegistrar',
          srcPath: 'contracts/dnsregistrar/',
        },
      },
      {
        name: 'L1 Reverse Registrar',
        github: {
          filename: 'ReverseRegistrar',
          srcPath: 'contracts/reverseRegistrar/',
        },
      },
      {
        name: 'Default Reverse Registrar',
        github: {
          filename: 'DefaultReverseRegistrar',
          srcPath: 'contracts/reverseRegistrar/',
        },
      },
      {
        name: 'Name Wrapper',
        github: {
          filename: 'NameWrapper',
          srcPath: 'contracts/wrapper/',
        },
      },
      {
        name: 'Public Resolver',
        github: {
          filename: 'PublicResolver',
          srcPath: 'contracts/resolvers/',
        },
      },
      {
        name: 'Universal Resolver',
        github: {
          filename: 'UniversalResolver',
          srcPath: 'contracts/utils/',
        },
      },
    ],
  },
  {
    name: 'Holesky',
    slug: 'holesky',
    contracts: [
      {
        name: 'Registry',
        github: {
          filename: 'ENSRegistry',
          srcPath: 'contracts/registry/',
        },
      },
      {
        name: 'Base Registrar',
        github: {
          filename: 'BaseRegistrarImplementation',
          srcPath: 'contracts/ethregistrar/',
        },
      },
      {
        name: 'ETH Registrar Controller',
        github: {
          filename: 'ETHRegistrarController',
          srcPath: 'contracts/ethregistrar/',
        },
      },
      {
        name: 'DNS Registrar',
        github: {
          filename: 'DNSRegistrar',
          srcPath: 'contracts/dnsregistrar/',
        },
      },
      {
        name: 'L1 Reverse Registrar',
        github: {
          filename: 'ReverseRegistrar',
          srcPath: 'contracts/reverseRegistrar/',
        },
      },
      {
        name: 'Default Reverse Registrar',
        github: {
          filename: 'DefaultReverseRegistrar',
          srcPath: 'contracts/reverseRegistrar/',
        },
      },
      {
        name: 'Name Wrapper',
        github: {
          filename: 'NameWrapper',
          srcPath: 'contracts/wrapper/',
        },
      },
      {
        name: 'Public Resolver',
        github: {
          filename: 'PublicResolver',
          srcPath: 'contracts/resolvers/',
        },
      },
      {
        name: 'Universal Resolver',
        github: {
          filename: 'UniversalResolver',
          srcPath: 'contracts/utils/',
        },
      },
    ],
  },
]

// Generate a JSON file with contract deployment info
// Only runs once, no need for hot reloading
export async function deployments() {
  {
    const alreadyExists = await fs
      .access(path.join(__dirname, '..', 'src/data/generated/deployments.json'))
      .then(() => true)
      .catch(() => false)

    if (alreadyExists) {
      return
    }

    console.log('Fetching deployments')

    await Promise.all(
      DEPLOYMENTS.map(async (chain) => {
        await Promise.all(
          chain.contracts.map(async (contract) => {
            const res = await fetch(
              `https://raw.githubusercontent.com/ensdomains/ens-contracts/staging/deployments/${chain.slug}/${contract.github.filename}.json`
            ).then((res) => res.json() as Promise<DeploymentFile>)

            // Add the contract address to the deployment
            contract.address = res.address
          })
        )
      })
    )

    // Save deployments as JSON
    await fs.writeFile(
      path.join(__dirname, '..', 'src/data/generated/deployments.json'),
      JSON.stringify(DEPLOYMENTS, null, 2)
    )
  }
}
