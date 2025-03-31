import { useQuery } from '@tanstack/react-query'
import { usePublicClient } from 'wagmi'

export type UseEnsAddressesProps = {
  name: string
  coinTypes: number[]
}

export function useEnsAddresses({ name, coinTypes }: UseEnsAddressesProps) {
  const client = usePublicClient({ chainId: 1 })

  return useQuery({
    queryKey: ['ens-addresses', name, coinTypes],
    queryFn: async () => {
      const promises = coinTypes.map((coinType) =>
        client!.getEnsAddress({ name, coinType })
      )

      const results = await Promise.all(promises)

      return coinTypes.map((coinType, index) => ({
        coinType,
        address: results[index],
      }))
    },
  })
}
