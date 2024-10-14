import './style.css';

import { addEnsContracts } from '@ensdomains/ensjs';
import { ThemeProvider } from '@ensdomains/thorin';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { configureChains, createConfig, mainnet, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';

import { App } from './App';

// (Optional) API Key for the ENS Subgraph
// Setting this will enable subgraph functionality such as getNamesForAddress etc.
const ENS_MAINNET_SUBGRAPH_API_KEY = '';

const {
    chains: _chains,
    publicClient,
    webSocketPublicClient,
} = configureChains(
    [
        {
            ...addEnsContracts(mainnet),
            subgraphs: {
                ens: {
                    url: `https://gateway.thegraph.com/api/${ENS_MAINNET_SUBGRAPH_API_KEY}/subgraphs/id/5XqPmWe6gjyrJtFn9cLy237i4cWw2j9HcUJEXsP5qGtH`,
                },
            },
        },
    ],
    [publicProvider()]
);

const config = createConfig({
    autoConnect: true,
    publicClient,
    webSocketPublicClient,
});

const root = createRoot(document.querySelector('#root')!);

const queryClient = new QueryClient();

// Wrap app in ThemeProvider
root.render(
    <StrictMode>
        <ThemeProvider>
            <WagmiConfig config={config}>
                <QueryClientProvider client={queryClient}>
                    <App />
                </QueryClientProvider>
            </WagmiConfig>
        </ThemeProvider>
    </StrictMode>
);
