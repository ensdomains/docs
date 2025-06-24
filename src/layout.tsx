import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PropsWithChildren } from 'react'
import { IntercomProvider } from 'react-use-intercom'
import { WagmiProvider, createConfig, http } from 'wagmi'
import { mainnet } from 'wagmi/chains'

const config = createConfig({
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(),
  },
})

const queryClient = new QueryClient()

export default function Layout({ children }: PropsWithChildren) {
  return (
    <WagmiProvider config={config}>
      <IntercomProvider autoBoot appId="re9q5yti">
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </IntercomProvider>
    </WagmiProvider>
  )
}
