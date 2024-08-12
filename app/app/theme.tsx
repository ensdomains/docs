'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { useEffect } from 'react';
import { holesky, mainnet, sepolia } from 'viem/chains';
import { createConfig, http, WagmiProvider } from 'wagmi';
import { injected, walletConnect } from 'wagmi/connectors';

const config = createConfig({
    chains: [mainnet, sepolia, holesky],
    connectors: [
        injected({}),
        walletConnect({
            projectId: '3b205429cec06896f1d18c3b46dc5a68',
            metadata: {
                name: 'ENS Documentation',
                description: 'Ethereum Name Service Documentation',
                icons: ['https://docs.ens.domains/favicon.ico'],
                url: 'https://docs.ens.domains',
            },
            showQrModal: false,
        }),
    ],
    transports: {
        [mainnet.id]: http(),
        [sepolia.id]: http(),
        [holesky.id]: http(),
    },
});

declare module 'wagmi' {
    interface Register {
        config: typeof config;
    }
}

const queryClient = new QueryClient();

export const Theme = ({ children }) => {
    useEffect(() => {
        (async () => {
            const { setupConfig } = await import('@ens-tools/thorin-core');

            setupConfig(() => config as any);
        })();
    }, []);

    return (
        <ThemeProvider attribute="class">
            <QueryClientProvider client={queryClient}>
                <WagmiProvider config={config}>{children}</WagmiProvider>
            </QueryClientProvider>
        </ThemeProvider>
    );
};
