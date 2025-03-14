import { useQuery } from '@tanstack/react-query'
import { usePublicClient } from 'wagmi'

export type UseEnsTextsProps = {
  name: string
  keys: string[]
}

export function useEnsTexts({ name, keys }: UseEnsTextsProps) {
  const wagmiClient = usePublicClient({ chainId: 1 })

  return useQuery({
    queryKey: ['ens-texts', name, keys],
    queryFn: async () => {
      const promises = keys.map((key) => wagmiClient!.getEnsText({ name, key }))
      const results = await Promise.all(promises)

      return keys.map((key, index) => ({ key, value: results[index] }))
    },
  })
}
